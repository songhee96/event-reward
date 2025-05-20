## 🚀 실행 방법 (Docker Compose 기준)

이 프로젝트는 `docker-compose.yml`을 통해 **Auth / Event / Gateway / MongoDB** 4개의 컨테이너를 한 번에 실행할 수 있도록 구성하였습니다.

### 📂 폴더 구조 예시 (최상위 기준)


![image](https://github.com/user-attachments/assets/6fd0e480-613c-48c0-a621-75d0f0cbcaf1)


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




"과제를 진행하면서 시간이 부족했던 점이 아쉬운 부분입니다. 재직 중이라 시간 내기가 어려워서 모든 기능을 완성하지 못했지만, 주어진 시간 내에서 최대한 노력했습니다. 보상 처리와 유저 인증 기능은 더 다듬고 싶지만, 이번 기회를 통해 더 나은 코드 작성에 대해 많이 배웠습니다."
