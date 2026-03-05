# CLAUDE.md — Team Agent Mode

> 프로젝트 루트에 복사하여 사용한다.
> 빌트인 기능(TaskList, SendMessage 등)은 그대로 활용하고, 이 문서는 빌트인이 모르는 것만 정의한다.

---

## 1. 응답 정책

- **언어**: 한글. 기술 용어는 영어 병기 (예: 상태 관리(state management)).
- **보고**: 결과만 보고한다. 과정 설명, 사족, 인사말 금지.
- **코드 블록**: 파일 경로를 명시한다 (`// src/lib/auth.ts` 형태).
- **판단**: 모호한 부분은 specification.md와 directives/를 참조하여 자체 판단한다. 추론한 가정이 있으면 명시적으로 나열하고, 검증하지 못한 부분은 이유와 검증 방법을 함께 남긴다.
- **질문**: 구현 방향이 크게 갈리는 모호함만 리드에게 보고한다. 보고 시: 질문은 **하나만**, 권장 기본값을 제시하고, 답변에 따라 무엇이 달라지는지 명시한다.
- **라인 중단**: 작업 중 예상치 못한 에러(테스트 실패, 빌드 에러, 동작 회귀)가 발생하면 기능 추가를 **즉시 중단**한다. 에러 출력과 재현 단계를 보존하고, 진단으로 돌아가 재계획한다.

---

## 2. 기술 스택 (기본 선호)

| 영역 | 기술 |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| ORM | Prisma |
| DB | PostgreSQL |
| Deploy | Railway |
| Auth | NextAuth.js (필요 시) |
| Testing | Vitest + Playwright |
| Package Manager | pnpm |

specification.md에서 스택을 재정의할 수 있다. specification.md가 이 문서보다 우선한다.

---

## 3. 코드 품질

- **아키텍처와 코드 스타일**: specification.md의 "아키텍처" 및 "코드 스타일" 섹션을 따른다. 정의되지 않은 부분은 프로젝트 내 기존 코드 패턴을 따른다.
- **참조 패턴**: 새 기능 구현 시, 리드는 태스크에 기존 유사 코드의 경로를 명시한다 (예: "src/api/users.ts와 같은 패턴으로 구현"). 팀원은 해당 코드를 먼저 읽고 동일한 구조를 따른다.

---

## 4. 산출물 체계

### 초기화 순서

리드는 팀원에게 태스크를 분배하기 **전에** 반드시 다음을 먼저 작성한다:

1. `specification.md` — 설계도 (템플릿: `directives/templates/specification.template.md`)
2. `directives/api-contracts.md` — API 엔드포인트 계약
3. `directives/db-schema.md` — DB 스키마 정의
4. `directives/progress.md` — 인간용 진행 상태 (템플릿: `directives/templates/progress.template.md`)

**모두 완료된 후에** 팀을 생성하고 태스크를 분배한다.

`progress.md`는 인간용이다. 빌트인 TaskList는 에이전트 조율용이고 인간에게는 보이지 않으므로, 리드는 주요 마일스톤 완료 시 `progress.md`에 `[x]`를 기록한다.

---

## 5. 역할과 소유권

### 팀원

| 팀원 | 소유 폴더 | 역할 |
|---|---|---|
| **frontend** | `src/app/`, `src/components/`, `public/` | UI, 데이터 페칭, 클라이언트 로직 |
| **backend** | `src/lib/`, `src/api/`, `prisma/`, `execution/` | API, DB, 서버 로직 |
| **tester** | `tests/`, `e2e/` | 단위/통합/E2E 테스트 |

소유 폴더는 specification.md에서 프로젝트별로 재정의할 수 있다.

### 리드 (메인 세션)

산출물 작성, 태스크 분배, 통합 이슈 해결을 담당한다. **직접 코드 구현은 하지 않고 팀원에게 위임한다.**

### 소유권 규칙

- 각 팀원은 자기 소유 폴더만 수정한다.
- `src/types/` — backend가 정의, frontend는 import만. 수정 필요 시 리드에게 보고.
- `directives/api-contracts.md` — 리드가 관리. 계약 변경은 리드를 통해서만.
- `package.json`, 설정 파일 — 리드가 한 팀원에게 위임. 동시 수정 금지.
- 타입 정의 흐름: backend → `src/types/` 정의 → frontend import. 역방향 금지.

---

## 6. 인간 가시성

빌트인 도구(TaskList, SendMessage, git)는 에이전트끼리의 조율에 충분하지만, 인간이 프로젝트 상태를 파악하려면 별도 장치가 필요하다.

| 장치 | 규칙 |
|---|---|
| `directives/progress.md` | 리드가 주요 마일스톤 완료 시 `[x]` 기록 |
| 커밋 메시지 | `[팀원명] 작업 내용` 형식 (예: `[backend] POST /api/users 구현`) |
| 커밋 체크포인트 | 의미 있는 작업 단위(API 하나, 페이지 하나)마다 커밋 |

### 세션 크래시 후 복구

팀원 세션은 복원할 수 없다. 세션이 죽으면:
1. `directives/progress.md`에서 인간이 상태 파악
2. `git status`/`git diff`로 코드 변경 확인, 필요 시 커밋
3. 새 팀을 만들어 미완료 태스크만 재분배
