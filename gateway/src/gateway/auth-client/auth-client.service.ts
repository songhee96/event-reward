import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthClientService {
  constructor(private readonly httpService: HttpService) {}

  async login(username: string, password: string) {
    const url = 'http://auth:3001/auth/login';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, { username, password }),
      );
      return response.data;
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404) {
        throw new NotFoundException('회원정보가 없습니다.');
      }

      if (status === 401) {
        throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
      }

      throw new InternalServerErrorException('로그인 요청 중 오류가 발생했습니다.');
    }
  }

  async register(username: string, password: string) {
    const url = 'http://auth:3001/auth/register';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, { username, password }),
      );
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || '회원가입 실패';

    if (status === 400 || status === 409) {
      throw new UnauthorizedException(message); // or BadRequestException
    }
      throw new InternalServerErrorException('회원가입 요청 중 오류가 발생했습니다.');
    }
  }
}
