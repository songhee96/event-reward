import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config'; // ConfigService 임포트
import { User } from './users.schema';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'; // 예외처리 임포트

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService, // ConfigService 주입
  ) {}

  // 회원가입
  async register(
    username: string,
    password: string,
    role: string = 'USER',
  ): Promise<User> {
    // username 중복 검사
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 ID입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });

    try {
      return await user.save(); // 사용자 저장
    } catch (error) {
      throw new BadRequestException('관리자에게 문의바랍니다.'); // 예외 발생 시 메시지 반환
    }
  }

  // 로그인 및 JWT 발급
  async login(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('회원정보가 없습니다.'); // 유저가 없을 때
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.'); // 비밀번호가 틀린 경우
    }

    const payload = { username: user.username, sub: user._id, role: user.role };

    // 환경 변수에서 JWT 비밀 키를 가져오기
    const secret = this.configService.get<string>('JWT_SECRET'); // 환경 변수에서 JWT_SECRET 가져오기

    try {
      const token = this.jwtService.sign(payload, { secret }); // JWT 발급
      return {
        access_token: token, // 발급된 토큰 반환
      };
    } catch (error) {
      throw new BadRequestException('토큰 생성 중 오류가 발생했습니다'); // 토큰 생성 에러 처리
    }
  }
}
