export default function bad(items: string[], options: { count: number }): string {
  let total = 0;
  for (let index = 0; index < items.length; index++) {
    total += 1;
  }
  options.count = total;
  const first: string = items[0];
  if (total == 2) {
    Promise.resolve(1);
  }
  const value: any = first;
  return 'total: ' + String(value);
}
