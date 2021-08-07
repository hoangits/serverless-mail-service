export const isNumberic = (n: any): boolean => {
  return /^-?[0-9][0-9,\.]*$/.test(n);
};
