export const capitalizeString = (s: string, d: string = ' ') =>
  s
    .split(d)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(d);
