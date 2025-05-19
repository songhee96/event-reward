// /JWT Payload의 인터페이스를 정의
export interface JwtPayload {
  username: string;
  sub: string; // 유저 ID
  role: string; // 유저 역할
}
