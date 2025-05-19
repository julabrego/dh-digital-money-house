export function splitEveryFour(num: string): string[] {
  return num.toString().match(/.{1,4}/g) ?? [];
}