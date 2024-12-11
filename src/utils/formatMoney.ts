const formatMoney = (value: string) => {
  let numericValue = value.replaceAll(/,/g, "");
  if (numericValue.startsWith("0")) {
    numericValue = numericValue.slice(1);
  }
  const formatNumber = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatNumber;
};
export default formatMoney;
