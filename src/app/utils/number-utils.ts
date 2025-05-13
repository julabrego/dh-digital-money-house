export function formatArgentinePesos(value: number) {
  const formattedValue = value.toFixed(2).replace(".", ",");
  return value < 0 ? `-$ ${formattedValue.slice(1)}` : `$${formattedValue}`;
}
