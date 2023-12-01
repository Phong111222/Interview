import axiosConfig from 'configs/axios';
import { useQuery } from 'react-query';
import { CoinApi } from 'api';
import { AxiosResponse } from 'axios';
import { TrendingCoinsResponse } from 'app-types/Coin';
const getListTrendingCoins = (): Promise<
  AxiosResponse<TrendingCoinsResponse>
> => axiosConfig.get(CoinApi.trendingCoins.url);

const useListTrendingCoins = () => {
  const { isFetching, data } = useQuery(CoinApi.trendingCoins.key, () =>
    getListTrendingCoins()
  );

  return {
    trendingCoins: data?.data,
    isFetching,
  };
};

export default useListTrendingCoins;
