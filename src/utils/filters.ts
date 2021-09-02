function comma(value: number): string {
  return value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function date(date: string): string {
  return new Date(date).toLocaleDateString().slice(5, -1);
}
export { comma, date };
