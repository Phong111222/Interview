export const CoinApi = {
  trendingCoins: {
    key: 'trending-coins',
    url: `/search/trending`,
  },
  listCoins: {
    key: 'list-coins',
    url: `/coins/list`,
  },
  coinInfo: (id: string) => ({
    key: `coin-${id}`,
    url: `coins/${id}`,
  }),

  searchCoin: {
    key: 'search-coin',
    url: `/search`,
  },
  coinOhlc: (id: string) => ({
    key: `coinOHLC-${id}`,
    url: `coins/${id}/ohlc`,
  }),
};
