// 📁 src/gateway/event-client/event-client.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventClientService } from './event-client.service';
import { EventClientController } from './event-client.controller';

@Module({
  imports: [HttpModule],
  controllers: [EventClientController],
  providers: [EventClientService],
})
export class EventClientModule {}
