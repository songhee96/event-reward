import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { AuthClientService } from './auth-client/auth-client.service';
import { EventClientService } from './event-client/event-client.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('gateway')
@UseGuards(JwtAuthGuard, RolesGuard) // 기본 인증/인가 전역 적용 (라우트 개별도 가능)
export class GatewayController {
  constructor(
   private readonly authClient: AuthClientService,
   private readonly eventClient: EventClientService,
  ) {}

  // 유틸 함수: JWT 토큰 추출
  private extractToken(authHeader: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization 헤더가 잘못되었습니다');
    }
    return authHeader.split(' ')[1];
  }

  // 로그인 요청 (Auth 서버에 위임)
  @Post('login')
  @UseGuards() // 로그인은 인증 필요 없음
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
     const response = await this.authClient.login(
        loginDto.username,
        loginDto.password,
      );
      const { access_token } = response.data;
      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('로그인 실패: ' + error?.message || '');
    }
  }

  // 인증된 유저 모두 접근 가능
  @Get('public-data')
  async getPublicData(@Request() req) {
    return {
      message: 'Public data accessible',
      user: req.user, // JWT에서 추출된 유저 정보
    };
  }

  // USER 역할만 접근 가능
  @Get('user-events')
  @Roles('USER')
  async getUserEvents(@Request() req) {
    return {
      message: 'User events list',
      user: req.user,
    };
  }

  // ADMIN 역할만 접근 가능
  @Get('admin-dashboard')
  @Roles('ADMIN')
  async getAdminDashboard(@Request() req) {
    return {
      message: 'Admin dashboard',
      user: req.user,
    };
  }

// 일부만 예시
@Get('events')
async getEvents(@Headers('Authorization') authHeader: string) {
  const token = this.extractToken(authHeader);
  return await this.eventClient.getEvents(token);
}
}
