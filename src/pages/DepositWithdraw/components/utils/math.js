export const getFixedPointRemittanceAmount = (number) => {
  return Number.parseFloat(number).toFixed(0);
};

export const isNumberExceedSecondDecimalPlace = (number) => {
  const decimal = String(number).split(".")[1];
  return decimal?.length > 2;
};
