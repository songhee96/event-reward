import { Controller, Post, Body } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly authClient: AuthClientService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authClient.login(body.username, body.password);
  }

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.authClient.register(body.username, body.password);
  }
}
