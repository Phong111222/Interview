import { CoinApi } from 'api/index';
import { SearchCoinParams, SearchCoinsResponse } from 'app-types/Coin';
import { AxiosResponse } from 'axios';
import axiosConfig from 'configs/axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const searchCoins = (
  params: SearchCoinParams
): Promise<AxiosResponse<SearchCoinsResponse>> =>
  axiosConfig.get(CoinApi.searchCoin.url, {
    params,
  });

const useSearchCoins = (initParams: SearchCoinParams, enable?: boolean) => {
  const [params, setParams] = useState(initParams);

  const { refetch, isFetching, data } = useQuery(
    CoinApi.searchCoin.key,
    () => searchCoins(params),
    {
      enabled: Boolean(enable),
    }
  );

  useEffect(() => {
    refetch();
  }, [params]);

  const handleChangeParams = useCallback((params: SearchCoinParams) => {
    setParams((prev) => ({ ...prev, ...params }));
  }, []);

  return {
    searchedCoins: data?.data,
    isFetching,
    handleChangeParams,
    searchCoinsParams: params,
  };
};

export default useSearchCoins;
