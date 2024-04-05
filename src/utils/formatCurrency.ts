export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
  }).format(n);
