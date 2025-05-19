import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'USER' })
  role: string;

  // 유저가 출석한 날짜들 (배열로 저장)
  @Prop([Date])
  attendanceDates: Date[];
  // 연속 출석 일수 (최대 7일)
  @Prop({ default: 0 })
  attendanceCount: number;

  // 유저 생성 일시
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// User 스키마를 만들어내기
export const UserSchema = SchemaFactory.createForClass(User);

// Document에 User 타입을 연결하여 Mongoose 모델에 접근할 때 사용할 수 있도록 처리
export type UserDocument = User & Document;
