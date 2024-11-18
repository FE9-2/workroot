module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(feat|fix|build|chore|delete|ci|docs|style|refactor|test):\s(.*)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능에 대한 커밋
        "fix", // 버그 수정에 대한 커밋
        "build", // 빌드 관련 파일 수정에 대한 커밋
        "chore", // 그 외 자잘한 수정에 대한 커밋
        "delete", // 기능 삭제에 대한 커밋
        "ci", // CI 관련 설정 수정에 대한 커밋
        "docs", // 문서 수정에 대한 커밋
        "style", // 코드 스타일 혹은 포맷 등에 관한 커밋
        "refactor", // 코드 리팩토링에 대한 커밋
        "test", // 테스트 코드 수정에 대한 커밋
      ],
    ],
    "subject-empty": [2, "never"], // subject가 비어있지 않도록 규칙 설정
    "type-empty": [2, "never"], // type이 비어있지 않도록 규칙 설정
    "type-case": [2, "always", "lower"], // type은 소문자만 허용
    "subject-case": [0], // subject case 규칙 비활성화
    "subject-full-stop": [0], // 마침표 규칙 비활성화
    "subject-exclamation-mark": [0], // 느낌표 규칙 비활성화
    "header-max-length": [0], // 헤더 길이 제한 비활성화
    "scope-case": [0], // scope case 규칙 비활성화
  },
};
