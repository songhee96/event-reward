// src/rewards/reward.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRewardDto } from './dto/create-event.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<any>,
  ) {}

  async create(createDto: CreateRewardDto) {
    const reward = new this.rewardModel(createDto);
    return reward.save();
  }

  async findAll() {
    return this.rewardModel.find().populate('eventId').exec();
  }

  async findById(id: string) {
    return this.rewardModel.findById(id).populate('eventId').exec();
  }
}
