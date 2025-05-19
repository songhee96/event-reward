import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthClientService } from './auth-client.service';
import { GatewayAuthController } from './auth.controller';

@Module({
  imports: [HttpModule],
  controllers: [GatewayAuthController],
  providers: [AuthClientService],
})
export class AuthClientModule {}
