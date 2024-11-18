export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ko-KR");
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    maximumFractionDigits: 0, // 소수점 제거
  }).format(amount);
};
