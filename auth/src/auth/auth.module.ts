import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // JWT 발급 설정
import { MongooseModule } from '@nestjs/mongoose'; // MongoDB 연결 설정
import { PassportModule } from '@nestjs/passport'; // Passport 모듈 (JWT 인증 처리)
import { AuthController } from './auth.controller'; // AuthController
import { AuthService } from './auth.service'; // AuthService (JWT 발급 로직)
import { JwtStrategy } from './jwt.strategy'; // JWT 검증 전략
import { User, UserSchema } from './users.schema'; // 사용자 스키마
import { ConfigService } from '@nestjs/config'; // ConfigService (환경변수 관리)

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // User 모델
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport와 JWT 설정
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // .env 파일에서 JWT_SECRET을 가져옴
        signOptions: { expiresIn: '60s' }, // JWT 만료 시간
      }),
      inject: [ConfigService], // ConfigService 주입
    }),
  ],
  providers: [AuthService, JwtStrategy], // AuthService, JwtStrategy만 등록 (RolesGuard 제거)
  controllers: [AuthController], // AuthController 등록
})
export class AuthModule {}
