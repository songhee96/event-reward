import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRewardClaimDto } from './dto/create-reward-claim.dto';

@Injectable()
export class RewardClaimService {
  constructor(
    @InjectModel('RewardClaim') private readonly claimModel: Model<any>,
    @InjectModel('Event') private readonly eventModel: Model<any>,
  ) {}

  async requestReward(userId: string, dto: CreateRewardClaimDto) {
    // 중복 체크
    const exists = await this.claimModel.findOne({
      userId,
      eventId: dto.eventId,
      status: 'SUCCESS',
    });

    if (exists) {
      throw new ConflictException('이미 보상을 받았습니다.');
    }

    // TODO: 조건 검사 로직
    const event = await this.eventModel.findById(dto.eventId);
    if (!event) {
      return this.claimModel.create({
        userId,
        eventId: dto.eventId,
        status: 'FAILED',
        message: '이벤트가 존재하지 않습니다',
      });
    }

    // 예시: 출석 7일 조건이라면, 임시로 무조건 성공 처리
    const isEligible = true; // 추후 진짜 출석 기록 기반으로 판단

    const claim = await this.claimModel.create({
      userId,
      eventId: dto.eventId,
      status: isEligible ? 'SUCCESS' : 'FAILED',
      message: isEligible ? '보상 지급 성공' : '조건 미충족',
    });

    return claim;
  }
}
