export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ko-KR");
};

export const formatDateTime = (date: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1);
  const day = String(d.getDate());
  const hours = String(d.getHours());
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

export const formatToLocaleDate = (date: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1);
  const day = String(d.getDate());

  return `${year}/${month}/${day}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    maximumFractionDigits: 0, // 소수점 제거
  }).format(amount);
};
