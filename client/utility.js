export function formatAsDollars(amount) {
  const setMaxFractionDigits = amount > 0.01 ? 2 : 5;
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: setMaxFractionDigits,
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
}

export function formatAsPercent(amount) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}

export function formatBigFloat(amount) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}
