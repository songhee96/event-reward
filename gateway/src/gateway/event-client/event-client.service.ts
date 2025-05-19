// 📁 src/gateway/event-client/event-client.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventClientService {
  constructor(private readonly httpService: HttpService) {}

  // ✅ 1. 이벤트 목록 가져오기
  async getEvents(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://event:3002/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('이벤트 조회 실패: ' + error.message);
    }
  }

  // ✅ 2. 이벤트 등록 (운영자/관리자 권한 필요)
  async createEvent(token: string, eventDto: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://event:3002/events', eventDto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('이벤트 등록 실패: ' + error.message);
    }
  }

  // ✅ 3. 유저 보상 요청
  async requestReward(token: string, eventId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`http://event:3002/events/${eventId}/rewards/request`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('보상 요청 실패: ' + error.message);
    }
  }

  // ✅ 4. 보상 요청 이력 조회 (유저 본인 or 관리자용)
  async getRewardHistory(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://event:3002/rewards/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('보상 이력 조회 실패: ' + error.message);
    }
  }
}
