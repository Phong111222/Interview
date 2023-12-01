import { CoinApi } from 'api/index';
import { SearchCoinParams, SearchCoinsResponse } from 'app-types/Coin';
import { AxiosResponse } from 'axios';
import axiosConfig, { CancelToken } from 'configs/axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const searchCoins = (
  params: SearchCoinParams,
  signal: AbortSignal
): Promise<AxiosResponse<SearchCoinsResponse>> => {
  const cancelToken = CancelToken;
  const source = cancelToken.source();

  signal?.addEventListener('abort', () => {
    source.cancel('Query was cancelled by TanStack Query');
  });

  return axiosConfig.get(CoinApi.searchCoin.url, {
    params,
    signal,
  });
};

const useSearchCoins = (initParams: SearchCoinParams, enable?: boolean) => {
  const [params, setParams] = useState(initParams);

  const { refetch, isFetching, data } = useQuery(
    CoinApi.searchCoin.key,
    ({ signal }) => searchCoins(params, signal as AbortSignal),
    {
      enabled: Boolean(enable),
    }
  );

  useEffect(() => {
    refetch();
  }, [params]);

  // useEffect(() => {}, [getCoinWorker]);

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
