import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<any>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const created = new this.eventModel({
      ...createEventDto,
      createdAt: new Date(),
    });
    return created.save();
  }

  async findAll(isActive?: string) {
    if (isActive === undefined) return this.eventModel.find().exec();
    const activeFlag = isActive === 'true';
    return this.eventModel.find({ isActive: activeFlag }).exec();
  }

  async findById(id: string) {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('이벤트를 찾을 수 없습니다');
    return event;
  }

  async update(id: string, updateData: Partial<CreateEventDto>) {
    const updated = await this.eventModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updated) throw new NotFoundException('수정할 이벤트를 찾을 수 없습니다');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('삭제할 이벤트를 찾을 수 없습니다');
    return { message: '이벤트가 삭제되었습니다' };
  }
}
