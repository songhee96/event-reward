import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';
import { CreateRewardClaimDto } from './dto/create-reward-claim.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('reward-claims')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardClaimController {
  constructor(private readonly rewardClaimService: RewardClaimService) {}

  @Post()
  @Roles('USER')
  requestReward(
    @Request() req,
    @Body() dto: CreateRewardClaimDto,
  ) {
    const userId = req.user.sub; // JWT payload 기준
    return this.rewardClaimService.requestReward(userId, dto);
  }
}
