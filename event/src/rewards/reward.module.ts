// src/rewards/reward.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { RewardSchema } from './reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reward', schema: RewardSchema }])
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
