import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  getAllEvents(@Query('isActive') isActive?: string) {
    return this.eventService.findAll(isActive);
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.findById(id);
  }

  @Patch(':id')
  @Roles('OPERATOR', 'ADMIN')
  updateEvent(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateEventDto>,
  ) {
    return this.eventService.update(id, updateData);
  }

  @Delete(':id')
  @Roles('ADMIN')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
