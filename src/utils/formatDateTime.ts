export const formatDateTime = (date: Date | string) => {
  const d = new Date(date as string);
  return `${d.toLocaleDateString('en-gb')} ${d.toLocaleTimeString('en-gb')}`;
};
