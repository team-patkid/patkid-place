# Patkid Place Backend Server

## 📍 프로젝트 개요

MBTI 기반 개인화된 장소 추천 서비스의 백엔드 API 서버입니다. 사용자의 MBTI 성향을 분석하여 맞춤형 장소를 추천하고, 질문 기반 테스트를 통해 개인의 성향에 가장 적합한 장소를 제공합니다.

## 🎯 주요 기능

- **MBTI 기반 장소 추천**: 16가지 MBTI 유형별 맞춤 장소 추천
- **질문 기반 성향 분석**: 사용자 질문 응답을 통한 성향 파악  
- **참여자 통계**: 총 참여자 수 조회 기능
- **인기 장소 제공**: 핫플레이스 정보 제공
- **장소 상세 정보**: 네이버 URL, 좌표, 태그 등 상세 정보

## 🛠 기술 스택

### Backend Framework
- **NestJS** v9.0.0 - Progressive Node.js framework
- **TypeScript** v4.7.4 - Type-safe JavaScript
- **Node.js** - JavaScript runtime

### Database & ORM
- **PostgreSQL** - 메인 데이터베이스
- **TypeORM** v0.3.19 - Object-Relational Mapping
- **typeorm-transactional** v0.5.0 - 트랜잭션 관리

### Authentication & Security
- **JWT** (@nestjs/jwt v10.2.0) - JSON Web Token 인증
- **Helmet** v7.1.0 - HTTP 보안 헤더
- **class-validator** v0.14.1 - 데이터 검증

### API Documentation
- **Swagger** (@nestjs/swagger v7.1.17) - API 문서화
- **class-transformer** v0.5.1 - 객체 변환

### Utilities
- **Moment.js** v2.30.1 - 날짜/시간 처리
- **axios** v1.6.5 - HTTP 클라이언트
- **uuid** v9.0.1 - 고유 식별자 생성
- **morgan-body** v2.6.9 - HTTP 요청/응답 로깅

### Development & Testing
- **Jest** v29.3.1 - 테스트 프레임워크
- **ESLint** v8.0.1 - 코드 품질 관리
- **Prettier** v2.3.2 - 코드 포맷팅
- **Supertest** v6.1.3 - HTTP 테스트

## 📂 프로젝트 구조

```
src/
├── config/                 # 환경 설정
│   ├── Dev.ts              # 개발 환경 설정
│   ├── Local.ts            # 로컬 환경 설정
│   └── Prod.ts             # 프로덕션 환경 설정
├── decorator/              # 커스텀 데코레이터
├── exception/              # 예외 처리
├── filter/                 # 글로벌 필터
├── log/                    # 로깅 시스템
├── module/
│   ├── database/           # 데이터베이스 설정
│   ├── question/           # 질문 관련 API
│   ├── repository/         # 데이터 접근 계층
│   │   ├── entity/         # 데이터베이스 엔티티
│   │   └── service/        # 레포지토리 서비스
│   └── user/               # 사용자 관련 API
└── global/                 # 글로벌 설정
```

## 🗄 데이터베이스 스키마

### 주요 엔티티
- **User**: 사용자 정보 (UUID, placeId, shareCount, status)
- **Place**: 장소 정보 (이름, 위치, URL, 설명, 이미지)
- **MBTI**: MBTI 유형 정보 (16가지 성격 유형)
- **Question**: 성향 분석 질문
- **Tag**: 장소 태그 정보

## 🚀 시작하기

### 설치
```bash
npm install
```

### 실행
```bash
# 개발 모드
npm run start:dev

# 로컬 환경
npm run start:local

# 프로덕션 모드
npm run start:prod
```

### 테스트
```bash
# 단위 테스트
npm run test

# E2E 테스트  
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

### 코드 품질
```bash
# 린팅
npm run lint

# 포맷팅
npm run format
```

## 📋 API 엔드포인트

### User API
- `GET /user/total-count` - 참여자 수 조회
- `POST /user/result` - MBTI 기반 테스트 결과 조회

### Question API  
- `GET /question/list` - 질문 목록 조회

## 🏗 아키텍처 특징

- **모듈형 구조**: NestJS의 모듈 시스템을 활용한 확장 가능한 구조
- **SOLID 원칙**: 객체지향 설계 원칙을 준수하는 클린 아키텍처
- **Repository Pattern**: 데이터 접근 로직의 분리와 테스트 용이성
- **트랜잭션 관리**: typeorm-transactional을 통한 안정적인 데이터 처리
- **글로벌 예외 처리**: 일관된 에러 응답 구조
- **로깅 시스템**: 구조화된 로그를 통한 모니터링

## 🔧 환경 설정

프로젝트는 다음 환경을 지원합니다:
- **Local**: 로컬 개발 환경
- **Dev**: 개발 서버 환경  
- **Prod**: 프로덕션 환경

각 환경별 설정은 `src/config/` 디렉토리에서 관리됩니다.

## 🐳 Docker 지원

프로젝트는 Docker 컨테이너화를 지원합니다:
- **Dockerfile**: 프로덕션 이미지 빌드
- **docker-compose.yaml**: 개발 환경 구성
- **docker-compose-test.yaml**: 테스트 환경 구성

## 🔄 CI/CD

- **Jenkins**: 자동화된 빌드 및 배포 파이프라인
- **Docker**: 컨테이너 기반 배포

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
