export function splitEveryFour(num: string): string[] {
  return num.toString().match(/.{1,4}/g) ?? [];
}
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
