export const exactMatch = (re, str) => {
  const match = str.match(re);
  return match && str === match[0];
};
