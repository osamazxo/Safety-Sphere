export function getLastDates(n: number) {
  const dates = [];
  const today = new Date();
  today.setDate(today.getDate() - n);
  for (let i = 0; i < n; i++) {
    today.setDate(today.getDate() + 1);
    dates.push(today.toISOString().slice(0, 10));
  }
  return dates;
}
