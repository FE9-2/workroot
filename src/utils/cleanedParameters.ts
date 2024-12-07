/**
 * URL 쿼리 파라미터에서 null, undefined, 빈 문자열, 'null' 문자열을 제거하는 함수
 * @param params - 정제할 파라미터 객체
 * @returns 정제된 파라미터 객체
 */
export const cleanedParameters = (params: Record<string, string | null>) => {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== "" && value !== "null") {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );
};
