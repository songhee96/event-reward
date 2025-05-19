import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module'; // ✅ 추가

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일 자동 로드
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
    }),
    // ... 다른 모듈
    AuthModule
  ],
})
export class AppModule {}
