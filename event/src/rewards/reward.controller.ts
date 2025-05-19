// src/rewards/reward.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

@Controller('rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  create(@Body() createDto: CreateRewardDto) {
    return this.rewardService.create(createDto);
  }

  @Get()
  getAll() {
    return this.rewardService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.rewardService.findById(id);
  }
}
