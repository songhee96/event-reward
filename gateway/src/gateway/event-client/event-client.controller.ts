// 📁 src/gateway/event-client/event-client.controller.ts

import { Controller, Get, Post, Body, Headers, Param } from '@nestjs/common';
import { EventClientService } from './event-client.service';

@Controller('events')
export class EventClientController {
  constructor(private readonly eventClient: EventClientService) {}

  @Get()
  getAllEvents(@Headers('authorization') auth: string) {
    return this.eventClient.getEvents(auth);
  }

  @Post()
  createEvent(
    @Headers('authorization') auth: string,
    @Body() eventDto: any,
  ) {
    return this.eventClient.createEvent(auth, eventDto);
  }

  @Post(':id/rewards/request')
  requestReward(
    @Headers('authorization') auth: string,
    @Param('id') eventId: string,
  ) {
    return this.eventClient.requestReward(auth, eventId);
  }
}
