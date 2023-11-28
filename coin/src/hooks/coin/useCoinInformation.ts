import axiosConfig from 'configs/axios';
import { useQuery } from 'react-query';
import { CoinApi } from 'api';
import { AxiosResponse } from 'axios';
import { TrendingCoinsResponse } from 'app-types/Coin';
const getCoinInformation = (
  coinId: string
): Promise<AxiosResponse<TrendingCoinsResponse>> =>
  axiosConfig.get(CoinApi.coinInfo(coinId).url);

const useCoinInformation = (coinId: string) => {
  const { isFetching, data } = useQuery(CoinApi.coinInfo(coinId).key, () =>
    getCoinInformation(coinId)
  );

  return {
    trendingCoins: data?.data,
    isFetching,
  };
};

export default useCoinInformation;
