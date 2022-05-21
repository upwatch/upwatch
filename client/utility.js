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

export function formatHistoricalData(rawData) {
  let formattedData = [];
  for (let i = 0; i < rawData.length; i++) {
    let date = new Date(rawData[i][0] * 1000);
    formattedData.push({
      date,
      low: rawData[i][1],
      high: rawData[i][2],
      open: rawData[i][3],
      close: rawData[i][4],
      volume: rawData[i][5],
    });
  }
  return formattedData;
}

export const formatDate = (dateObj) => {
  const date = new Date(Date.parse(dateObj));
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
