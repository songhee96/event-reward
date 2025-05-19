import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardClaimSchema } from './reward-claim.schema';
import { RewardClaimService } from './reward-claim.service';
import { RewardClaimController } from './reward-claim.controller';
import { EventSchema } from '../event/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RewardClaim', schema: RewardClaimSchema },
      { name: 'Event', schema: EventSchema },
    ]),
  ],
  controllers: [RewardClaimController],
  providers: [RewardClaimService],
})
export class RewardClaimModule {}
