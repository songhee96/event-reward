import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthClientModule } from './gateway/auth-client/auth-client.module';
import { EventClientModule  } from './gateway/event-client/event-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthClientModule,
    EventClientModule 
  ],
})
export class AppModule {}
