export const filterPublicOptions = [
  { label: "전체", value: null },
  { label: "공개", value: true },
  { label: "비공개", value: false },
] as const;

export const filterRecruitingOptions = [
  { label: "전체", value: null },
  { label: "모집중", value: true },
  { label: "모집마감", value: false },
] as const;
