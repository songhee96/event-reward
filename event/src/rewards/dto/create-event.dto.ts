export class CreateRewardDto {
  eventId: string;            // 연결된 이벤트 ID
  type: 'ITEM' | 'POINT' | 'COUPON';  // 보상 종류
  name: string;               // 아이템 이름 등
  amount: number;             // 수량
  description?: string;       // 설명 (선택)
}