// 12400000 -> "12 400 000 so'm"
export function formatPrice(amount, currency = "so'm") {
  const rounded = Math.round(Number(amount) || 0);
  const withSpaces = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${withSpaces} ${currency}`;
}
