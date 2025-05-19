import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventSchema } from './event.schema';

import { JwtStrategy } from '../guards/jwt.strategy'; // ✅ 경로 확인

@Module({
  imports: [
    ConfigModule, // ✅ 환경변수 접근
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService, JwtStrategy], // ✅ JwtStrategy 추가
})
export class EventModule {}
