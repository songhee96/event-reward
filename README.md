## 🚀 실행 방법 (Docker Compose 기준)

이 프로젝트는 `docker-compose.yml`을 통해 **Auth / Event / Gateway / MongoDB** 4개의 컨테이너를 한 번에 실행할 수 있도록 구성하였습니다.

### 📂 폴더 구조 예시 (최상위 기준)

event-reward-platform/
├── auth/ # Auth Server (회원가입, 로그인, JWT 발급)
├── event/ # Event Server (이벤트 및 보상 관리)
├── gateway/ # Gateway Server (모든 요청 라우팅 및 인증)
├── docker-compose.yml
└── ...

---

### 📦 Docker로 실행하기

**1. 도커 환경이 설치되어 있어야 합니다.**
docker -v
docker-compose -v

2. 프로젝트 루트로 이동 후 실행
cd event-reward-platform
docker-compose up --build

🧪 실행 결과

Auth Server: http://localhost:3001

Event Server: http://localhost:3002

Gateway: http://localhost:3000

MongoDB (내부용): mongodb://mongo:27017

📬 Postman 테스트

예시: 회원가입
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "test@example.com",
  "password": "1234"
}

예시: 로그인
POST http://localhost:3000/auth/login


🧹 종료 및 정리
컨테이너 종료 (터미널에서 Ctrl+C) 또는 백그라운드 실행 시
docker-compose down

불필요한 도커 이미지/캐시 정리 (선택)
docker system prune -a
