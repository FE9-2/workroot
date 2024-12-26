# 코드잇 프론트엔드 9기 2팀 워크루트(WorkRoot) 프로젝트

<div align="center">
  <img src="https://www.workroot.life/brand.png" width="auto" height="300">
</div>

## 배포 사이트: https://www.workroot.life

## 프로젝트 소개

- WorkRoot 소개: 🌳 "일"을 통해 자신의 뿌리를 내리며 "성장"하는 구인구직 사이트
- 개발 기간: 2024. 11. 21 ~ 2024. 12. 30
- 개발 인원: 4명

|                                           김원                                            |                                           김예지                                           |                                           김태준                                           |                                           홍예림                                           |
| :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/10387266?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/128662353?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/140049433?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/167871589?v=4" width="100" height="100"> |
|                                          cccwon2                                          |                                          yyezzzy                                           |                                         imtaejunk                                          |                                        hongggyelim                                         |

- 역할
  - 김원: 팀장, 레포지토리 세팅, 로그인/회원가입, 마이페이지, 공고 목록 페이지, 게시판 목록 페이지, 공고 카드 컴포넌트, 모달 컴포넌트, SEO 설정, 지도 API 연동, Supabase 연동, 회의록 작성
  - 김예지: 소셜로그인/회원가입, 알바폼 상세페이지, 로고, 랜딩페이지 디자인 및 기획, 공통 버튼 컴포넌트, 스토리북 세팅, 크로매틱 배포 세팅
  - 김태준: 랜딩 페이지, 게시판 상세 페이지, 게시판 카드 컴포넌트, 전역 에러 페이지, 404 페이지
  - 홍예림: 공고 작성 페이지, 공고 수정 페이지, 공통 인풋 컴포넌트, 데이터피커 커스텀, 마우스 커서 커스텀, 깃헙 액션 CI 세팅

## 기술 스택

### 주요 의존성

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

### 상태 관리 & 데이터 페칭

[![React Query](https://img.shields.io/badge/@tanstack/react--query-5.59.19-FF4154?logo=react-query)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.1-brown)](https://github.com/pmndrs/zustand)
[![Axios](https://img.shields.io/badge/Axios-1.7.7-5A29E4?logo=axios)](https://axios-http.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.47.10-3ECF8E?logo=supabase)](https://supabase.io/)

### 폼 & 유효성 검사

[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.53.0-EC5990)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3.23.8-3068B7)](https://zod.dev/)
[![HookForm Resolvers](https://img.shields.io/badge/@hookform/resolvers-3.9.0-EC5990)](https://github.com/react-hook-form/resolvers)

### UI/UX

[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.15.0-0055FF?logo=framer)](https://www.framer.com/motion/)
[![React DatePicker](https://img.shields.io/badge/React%20DatePicker-7.5.0-216BA5)](https://reactdatepicker.com/)
[![React Icons](https://img.shields.io/badge/React%20Icons-5.3.0-E91E63)](https://react-icons.github.io/react-icons)
[![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-2.4.1-FF4444)](https://react-hot-toast.com/)
[![Yet Another React Lightbox](https://img.shields.io/badge/Yet%20Another%20React%20Lightbox-3.17.0-00A5E0)](https://yet-another-react-lightbox.com/)
[![Hello Pangea DnD](https://img.shields.io/badge/Hello%20Pangea%20DnD-17.0.0-yellow)](https://github.com/hello-pangea/dnd)

### 지도 & 소셜

[![React Kakao Maps SDK](https://img.shields.io/badge/React%20Kakao%20Maps%20SDK-1.1.27-FFCD00)](https://www.npmjs.com/package/react-kakao-maps-sdk)
[![Next Auth](https://img.shields.io/badge/Next%20Auth-4.24.10-000000?logo=next.js)](https://next-auth.js.org/)
[![Channel Talk](https://img.shields.io/badge/Channel%20Talk%20SDK-2.0.0-00A6B4)](https://channel.io/)

### 개발 도구

[![ESLint](https://img.shields.io/badge/ESLint-8.57.1-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.3.3-F7B93E?logo=prettier)](https://prettier.io/)
[![Storybook](https://img.shields.io/badge/Storybook-8.4.4-FF4785?logo=storybook)](https://storybook.js.org/)
[![React Query DevTools](https://img.shields.io/badge/React%20Query%20DevTools-5.59.20-FF4154)](https://tanstack.com/query/latest/docs/react/devtools)

## 개발 환경 설정

### ESLint 설정

```json
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "lf"
      }
    ],
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": "off",
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
    "prettier-plugin-tailwindcss" // Tailwind CSS 클래스 자동 정렬 플러그인
  ]
}
```

### TailwindCSS 설정

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        black: {
          100: "#6B6B6B",
          200: "#525252",
          300: "#373737",
          400: "#1F1F1F",
          500: "#040404",
        },
        grayscale: {
          50: "#FFFFFF",
          100: "#DEDEDE",
          200: "#C4C4C4",
          300: "#ABABAB",
          400: "#999999",
          500: "#808080",
        },
        primary: {
          orange: {
            50: "#fbfffd",
            100: "#8ab08c",
            200: "#64a466",
            300: "#388e3c",
            400: "#156719",
          },
          blue: {
            100: "#535779",
            200: "#3E415B",
            300: "#2A2C3D",
          },
        },
        background: {
          100: "#FCFCFC",
          200: "#F7F7F7",
          300: "#EFEFEF",
        },
        line: {
          100: "#F2F2F2",
          200: "#E6E6E6",
        },
        state: {
          error: "#FC4100",
        },
      },
      fontFamily: {
        nexon: ["var(--font-nexon)", "sans-serif"],
        hakgyo: ["var(--font-hakgyo)", "sans-serif"],
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
};

export default config;
```

## 시작하기

1. 저장소 클론:

```bash
git clone [repository-url]
```

2. 환경 변수 설정:
   프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가합니다:

```bash
# 클라이언트 사이드
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_TEAM_ID=your-team-id

# 서버 사이드
CHROMATIC_PROJECT_TOKEN=your-chromatic-project-token

# 도메인
NEXT_PUBLIC_DOMAIN_URL=your-domain-url

# 테스트 계정(지원자)
NEXT_PUBLIC_TEST_APPLICANT_ID=your-test-applicant-id
NEXT_PUBLIC_TEST_APPLICANT_PASSWORD=your-test-applicant-password

# 테스트 계정(사장님)
NEXT_PUBLIC_TEST_OWNER_ID=your-test-owner-id
NEXT_PUBLIC_TEST_OWNER_PASSWORD=your-test-owner-password

# 페이스북
NEXT_PUBLIC_FB_APP_ID=your-facebook-app-id

# 카카오맵
NEXT_PUBLIC_KAKAO_APP_KEY=your-kakao-app-key

# 수파베이스
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# 카카오 클라이언트 아이디
NEXT_PUBLIC_KAKAO_CLIENT_ID=your-kakao-client-id

# 구글 클라이언트 아이디
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# 채널톡 플러그인 키
NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY=your-channel-io-plugin-key

# 구글 애널리틱스
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

3. 의존성 설치:

```bash
npm install
```

4. 개발 서버 실행:

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js 14+ App Router
│   ├── (auth)/            # 인증 관련 라우트 (로그인, 회원가입)
│   ├── (home)/            # 홈 페이지 관련 라우트
│   ├── (pages)/           # 주요 페이지 라우트
│   │   ├── (workform)/    # 워크폼 관련 페이지
│   │   ├── my-workform/   # 마이 워크폼 페이지
│   │   └── work-talk/     # 워크톡 게시판 페이지
│   └── components/        # 공통 컴포넌트
│       ├── animation/     # 애니메이션 컴포넌트
│       ├── button/        # 버튼 컴포넌트
│       ├── card/          # 카드 컴포넌트
│       ├── chip/          # 칩 컴포넌트
│       ├── input/         # 입력 컴포넌트
│       ├── layout/        # 레이아웃 컴포넌트
│       ├── loading-spinner/ # 로딩 스피너 컴포넌트
│       └── pagination/    # 페이지네이션 컴포넌트
├── constants/             # 상수 정의
├── hooks/                 # 커스텀 훅
│   └── queries/          # React Query 관련 훅
├── lib/                   # 유틸리티 함수
├── schemas/              # Zod 스키마 정의
├── store/                # 상태 관리 (Zustand)
├── types/                # TypeScript 타입 정의
└── utils/                # 유틸리티 함수
```

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
