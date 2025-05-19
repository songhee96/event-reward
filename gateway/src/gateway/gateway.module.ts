import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './gateway.controller';
import { AuthClientService } from './auth-client/auth-client.service';
// import { EventClientService } from './event-client/event-client.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [HttpModule],
  controllers: [GatewayController],
  providers: [
    AuthClientService,
    // EventClientService,
    JwtAuthGuard,
    RolesGuard,

    // 전역 가드 설정 (선택 사항)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 모든 라우트에 기본 적용
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,   // RolesGuard도 전역으로 적용
    },
  ],
})
export class GatewayModule {}
