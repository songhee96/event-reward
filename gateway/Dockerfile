# Dockerfile

# 1. Node.js LTS 이미지 사용
FROM node:18

# 2. 앱 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 소스 복사 및 빌드
COPY . .
RUN npm run build

# 5. 앱 실행
CMD ["node", "dist/main"]
