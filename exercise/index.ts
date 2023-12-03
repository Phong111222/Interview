export const calculateMaxProfit = (stockPrices: number[]): number => {
  if (stockPrices.length <= 1) {
    return 0;
  }

  let buyIndex = 0;

  let maxProfit = 0;

  for (let sellIndex = 1; sellIndex < stockPrices.length; sellIndex++) {
    if (stockPrices[sellIndex] > stockPrices[buyIndex]) {
      const profit = stockPrices[sellIndex] - stockPrices[buyIndex];

      if (profit > maxProfit) {
        maxProfit = profit;
      }

      continue;
    }

    buyIndex = sellIndex;
  }

  return maxProfit;
};
