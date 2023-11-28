import { CoinApi } from 'api/index';
import { ListCoinParams } from 'app-types/Coin';
import axiosConfig from 'configs/axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const getListCoin = (params: ListCoinParams): Promise<any> =>
  axiosConfig.get(CoinApi.listCoins.url, {
    params,
  });

const useListCoins = (initParams: ListCoinParams) => {
  const [params, setParams] = useState(initParams);

  const { refetch, isFetching, data } = useQuery(CoinApi.listCoins.key, () =>
    getListCoin(params)
  );

  useEffect(() => {
    refetch();
  }, [params]);

  const handleChangeParams = useCallback((params: ListCoinParams) => {
    setParams((prev) => ({ ...prev, ...params }));
  }, []);

  return {
    data,
    isFetching,
    setParams,
    handleChangeParams,
  };
};

export default useListCoins;
