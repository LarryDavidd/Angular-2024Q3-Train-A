export const formatPrice = (number: number): string => {
  const str = number.toFixed(2);

  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
