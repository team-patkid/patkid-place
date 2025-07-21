# CLAUDE.md - 프로젝트 개발 가이드

## 📋 프로젝트 정보

**프로젝트명**: Patkid Place Backend Server  
**목적**: MBTI 기반 개인화된 장소 추천 서비스의 백엔드 API  
**버전**: 0.0.1  
**프레임워크**: NestJS v9.0.0

## 🏗 아키텍처 개요

이 프로젝트는 NestJS를 기반으로 한 모듈형 아키텍처를 사용하며, SOLID 원칙을 준수하는 클린 아키텍처를 구현합니다.

### 핵심 디자인 패턴

- **Repository Pattern**: 데이터 접근 로직 분리
- **Dependency Injection**: NestJS의 DI 컨테이너 활용
- **Module-based Architecture**: 기능별 모듈 분리
- **DTO Pattern**: 데이터 전송 객체를 통한 유효성 검사

## 📂 디렉토리 구조

```
src/
├── config/                 # 환경별 설정 파일
│   ├── Dev.ts              # 개발 환경
│   ├── Local.ts            # 로컬 환경
│   ├── Prod.ts             # 프로덕션 환경
│   └── config.service.ts   # 설정 서비스
├── decorator/              # 커스텀 데코레이터
│   ├── dto/                # 응답 DTO
│   ├── response-data.decorator.ts
│   ├── response-error.decorator.ts
│   └── response-list.decorator.ts
├── exception/              # 예외 처리
│   ├── enum/error.enum.ts  # 에러 코드 정의
│   └── service.error.ts    # 서비스 에러 클래스
├── filter/                 # 글로벌 필터
│   └── service.exception.filter.ts
├── log/                    # 로깅 시스템
│   ├── logProvider.ts      # 로그 프로바이더
│   └── reportProvider.ts   # 리포트 프로바이더
├── module/
│   ├── database/           # 데이터베이스 모듈
│   ├── question/           # 질문 관련 API
│   ├── repository/         # 데이터 접근 계층
│   │   ├── entity/         # TypeORM 엔티티
│   │   ├── enum/           # 열거형 정의
│   │   └── service/        # 레포지토리 서비스
│   ├── user/               # 사용자 관련 API
│   └── main.module.ts      # 메인 모듈
└── global/                 # 글로벌 설정
    └── swagger.ts          # Swagger 설정
```

## 🗄 데이터베이스 스키마

### 엔티티 관계도

```
User (1:N) ← Place (N:1) → MBTI
Place (1:N) ← Tag
Question (1:N) ← QuestionSub
```

### 주요 엔티티

#### UserEntity

- **목적**: 서비스 사용자 정보 관리
- **주요 필드**: id (UUID), placeId, shareCount, status
- **관계**: Place와 Many-to-One 관계

#### PlaceEntity

- **목적**: 추천 장소 정보 관리
- **주요 필드**: name, naverUrl, x/y coordinates, content, imageUrl
- **관계**: MBTI와 Many-to-One, User/Tag와 One-to-Many

#### MbtiEntity

- **목적**: 16가지 MBTI 유형 관리
- **주요 필드**: mbti (enum), name, status
- **관계**: Place와 One-to-Many

#### QuestionEntity

- **목적**: 성향 분석 질문 관리
- **주요 필드**: content, sort, type, status
- **관계**: QuestionSub와 One-to-Many

## 🛠 개발 가이드

### 명령어

#### 개발 서버 실행

```bash
npm run start:local    # 로컬 환경
npm run start:dev      # 개발 환경
npm run start:prod     # 프로덕션 환경
```

#### 테스트

```bash
npm run test           # 단위 테스트
npm run test:e2e       # E2E 테스트
npm run test:cov       # 커버리지 포함 테스트
```

#### 코드 품질

```bash
npm run lint           # ESLint 실행
npm run format         # Prettier 포맷팅
```

### 환경 변수

프로젝트는 NODE_ENV에 따라 다른 설정을 로드합니다:

- `local`: Local.ts
- `dev`: Dev.ts
- `prod`: Prod.ts

### API 개발 가이드

#### 새 API 엔드포인트 추가 시

1. **DTO 정의**: `dto/` 디렉토리에 요청/응답 DTO 생성
2. **Controller 구현**: `@ApiTags`, `@ApiOperation` 데코레이터 추가
3. **Service 로직**: 비즈니스 로직 구현
4. **Repository**: 필요시 새로운 엔티티/서비스 추가
5. **테스트 작성**: `.spec.ts` 파일에 단위 테스트 구현

#### 응답 형식

모든 API는 일관된 응답 형식을 사용합니다:

```typescript
// 단일 데이터
@ResponseData(ResponseDto)
return new ResponseDataDto(data);

// 리스트 데이터
@ResponseList(ResponseDto)
return new ResponseListDto(dataArray);

// 에러 처리
throw new ServiceError('에러 메시지', ServiceErrorCode.NOT_FOUND_DATA);
```

## 🧪 테스트 전략

### 단위 테스트

- 각 서비스별 `.spec.ts` 파일 작성
- Repository 레이어 모킹
- 비즈니스 로직 검증

### E2E 테스트

- 전체 API 플로우 테스트
- 데이터베이스 연동 테스트
- 인증/인가 플로우 검증

## 🔐 보안 고려사항

### 적용된 보안 기능

- **Helmet**: HTTP 보안 헤더 설정
- **JWT**: 토큰 기반 인증 (준비)
- **Class-validator**: 입력 데이터 검증
- **GlobalPipes**: 화이트리스트 기반 데이터 필터링
- **ServiceError**: 간편한 에러 로그 관리 시스템

### 데이터 보호

- 민감한 정보 로깅 방지
- SQL Injection 방지 (TypeORM 활용)
- XSS 방지 (class-validator)

### 에러 처리 시스템

새로운 ServiceErrorCode 기반 에러 관리:

```typescript
// ServiceErrorCode enum 사용
export enum ServiceErrorCode {
  NOT_FOUND_DATA = 'NOT_FOUND_DATA',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  FORBIDDEN = 'FORBIDDEN',
  GONE = 'GONE',
}

// ServiceError 클래스로 간편한 에러 던지기
throw new ServiceError(
  '사용자를 찾을 수 없습니다.',
  ServiceErrorCode.NOT_FOUND_DATA,
);
```

## 📊 로깅 시스템

### LogProvider 사용법

```typescript
import { LogProvider } from 'src/log/logProvider';

// 정보 로그
LogProvider.info(data, 'Method Name');

// 에러 로그
LogProvider.error(error, 'Error Context');
```

### 로그 레벨

- **Info**: 일반 정보성 로그
- **Error**: 에러 및 예외 상황
- **Http**: HTTP 요청/응답 로그 (morgan-body)

## 🚀 배포 정보

### Docker 지원

- **Dockerfile**: 프로덕션 이미지 빌드
- **docker-compose.yaml**: 개발 환경
- **docker-compose-test.yaml**: 테스트 환경

### CI/CD 파이프라인

- **Jenkins**: 자동화된 빌드/배포
- **환경별 배포**: Local → Dev → Prod

## 📋 체크리스트

### 새 기능 개발 시

- [ ] DTO 정의 및 유효성 검사 추가
- [ ] Swagger 문서화 (@ApiTags, @ApiOperation)
- [ ] 단위 테스트 작성
- [ ] 에러 핸들링 구현
- [ ] 로깅 추가
- [ ] 코드 리뷰 요청

### 릴리스 전 확인사항

- [ ] 모든 테스트 통과
- [ ] ESLint/Prettier 검사 통과
- [ ] 환경별 설정 확인
- [ ] API 문서 업데이트
- [ ] 성능 테스트 완료

## 🤝 컨벤션

### 코딩 컨벤션

- **파일명**: kebab-case (example-file.ts)
- **클래스명**: PascalCase (ExampleClass)
- **메서드명**: camelCase (exampleMethod)
- **상수명**: UPPER_SNAKE_CASE (EXAMPLE_CONSTANT)

### 커밋 메시지

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
```

## 📞 문제해결

### 자주 발생하는 문제

1. **TypeORM 연결 실패**

   - 데이터베이스 설정 확인
   - 환경 변수 NODE_ENV 확인

2. **테스트 실패**

   - 테스트 데이터베이스 설정 확인
   - Mock 객체 설정 검토

3. **JWT 토큰 관련**
   - 시크릿 키 설정 확인
   - 토큰 만료 시간 검토

### 성능 최적화 팁

- Repository 쿼리 최적화
- 불필요한 JOIN 제거
- 캐싱 전략 검토
- 데이터베이스 인덱스 활용
