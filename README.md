# 워크루트(WorkRoot) 프로젝트

## 소개

**워크루트(WorkRoot) 프로젝트**는 Next.js, React, TypeScript, TailwindCSS 등 최신 기술 스택을 기반으로 한 프로젝트입니다.

## 기술 스택

### 주요 의존성

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

### 상태 관리 & 데이터 페칭

[![React Query](https://img.shields.io/badge/@tanstack/react--query-5.59.19-FF4154?logo=react-query)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.1-brown)](https://github.com/pmndrs/zustand)
[![Axios](https://img.shields.io/badge/Axios-1.7.7-5A29E4?logo=axios)](https://axios-http.com/)

### 폼 & 유효성 검사

[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.53.0-EC5990)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3.23.8-3068B7)](https://zod.dev/)
[![HookForm Resolvers](https://img.shields.io/badge/@hookform/resolvers-3.9.0-EC5990)](https://github.com/react-hook-form/resolvers)

### UI 컴포넌트

[![React DatePicker](https://img.shields.io/badge/React%20DatePicker-7.4.0-216BA5)](https://reactdatepicker.com/)
[![React Modal](https://img.shields.io/badge/React%20Modal-3.16.1-black)](https://github.com/reactjs/react-modal)
[![React Icons](https://img.shields.io/badge/React%20Icons-5.3.0-E91E63)](https://react-icons.github.io/react-icons)
[![React Spinners](https://img.shields.io/badge/React%20Spinners-0.14.1-36D7B7)](https://www.davidhu.io/react-spinners/)
[![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-2.4.1-FF4444)](https://react-hot-toast.com/)

### 개발 도구

[![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.3.3-F7B93E?logo=prettier)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-9.1.6-yellow?logo=git)](https://typicode.github.io/husky/)
[![Commitlint](https://img.shields.io/badge/Commitlint-19.5.0-green?logo=commitlint)](https://commitlint.js.org/)

## 개발 환경 설정

### 커밋 메시지 컨벤션

commitlint를 사용하여 다음과 같은 커밋 메시지 형식을 강제합니다:

```
type: Subject
```

#### 커밋 타입:

- feat: 새로운 기능에 대한 커밋
  - 예: feat: 회원가입 기능 구현
- fix: 버그 수정에 대한 커밋
  - 예: fix: 회원가입 유효성 검사 오류 수정
- build: 빌드 관련 파일 수정에 대한 커밋
  - 예: build: next.config.js 업데이트
- chore: 그 외 자잘한 수정에 대한 커밋
  - 예: chore: 불필요한 console.log 제거
- delete: 기능 삭제에 대한 커밋
  - 예: delete: 사용하지 않는 컴포넌트 제거
- ci: CI/CD 관련 설정 수정에 대한 커밋
  - 예: ci: github actions workflow 추가
- docs: 문서 수정에 대한 커밋
  - 예: docs: readme.md 업데이트
- style: 코드 스타일 혹은 포맷 등에 관한 커밋
  - 예: style: 들여쓰기 수정
- refactor: 코드 리팩토링에 대한 커밋
  - 예: refactor: 회원가입 로직 개선
- test: 테스트 코드 수정에 대한 커밋
  - 예: test: 회원가입 테스트 케이스 추가

#### 커밋 메시지 규칙:

- type은 소문자로 시작합니다
- type은 위 목록 중 하나여야 합니다
- Subject는 필수이며 비어있을 수 없습니다
- type과 Subject 사이에는 ': ' (콜론+공백)이 있어야 합니다

#### 예시:

```bash
feat: 회원가입 기능 구현
fix: 로그인 버튼 클릭 시 오류 수정
docs: API 문서 업데이트
style: 코드 포맷팅 적용
```

### ESLint 설정

```json
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "lf" }],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

### Prettier 설정

```json
{
  "printWidth": 120, // 한 줄의 최대 길이를 120자로 제한
  "tabWidth": 2, // 들여쓰기 시 사용할 공백 문자 수
  "useTabs": false, // 탭 문자 대신 공백 문자 사용
  "semi": true, // 문장 끝에 세미콜론 추가
  "singleQuote": false, // 문자열에 작은따옴표 대신 큰따옴표 사용
  "quoteProps": "as-needed", // 객체 속성에 따옴표 사용 방식 (필요한 경우에만 사용)
  "trailingComma": "es5", // 객체, 배열 등의 마지막 항목 뒤에 쉼표 추가
  "bracketSpacing": true, // 객체 리터럴의 괄호 사이에 공백 추가
  "arrowParens": "always", // 화살표 함수의 매개변수를 항상 괄호로 감싸기
  "proseWrap": "preserve", // 마크다운 텍스트의 줄바꿈 처리 방식
  "endOfLine": "lf", // 줄 끝 문자를 LF(Line Feed)로 통일
  "plugins": [
    "@trivago/prettier-plugin-sort-imports", // 임포트 구문 자동 정렬 플러그인
    "prettier-plugin-tailwindcss" // Tailwind CSS 클래스 자동 정렬 플러그인
  ],
  "importOrder": [
    // 임포트 구문 정렬 순서 설정
    "^@/lib/(.*)$", // 1순위: lib 디렉토리 임포트
    "^@/app/(.*)$", // 2순위: app 디렉토리 임포트
    "^@/components/(.*)$", // 3순위: components 디렉토리 임포트
    "^[./]" // 4순위: 상대 경로 임포트
  ],
  "importOrderSeparation": true, // 임포트 그룹 사이에 빈 줄 추가
  "importOrderSortSpecifiers": true // 임포트 구문 내부의 요소들 정렬
}
```

### TailwindCSS 설정

```typescript
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Helvetica Neue",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
    },
  },
};
```

### Git Hooks (Husky)

- pre-commit: lint-staged를 실행하여 커밋 전 코드 품질 검사
- commit-msg: commitlint를 통한 커밋 메시지 형식 검사

### 스크립트

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "clean": "rimraf .next out",
    "prepare": "husky",
    "lint-staged": "lint-staged",
    "format": "prettier --write .",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
  }
}
```

## 시작하기

1. 저장소 클론:

```bash
git clone [repository-url]
```

2. 의존성 설치:

```bash
npm install
```

3. 개발 서버 실행:

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── app/              # Next.js 14+ App Router
├── components/       # 재사용 가능한 컴포넌트
├── hooks/           # 커스텀 훅
├── lib/             # 유틸리티 함수
├── store/           # 상태 관리
├── types/           # TypeScript 타입 정의
└── zod/             # Zod 스키마 정의
```

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
