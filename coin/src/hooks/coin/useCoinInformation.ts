import axiosConfig from 'configs/axios';
import { useQuery } from 'react-query';
import { CoinApi } from 'api';
import { AxiosResponse } from 'axios';
import { CoinInformationParams, CoinResponse } from 'app-types/Coin';
import { useCallback, useEffect, useState } from 'react';
const getCoinInformation = (
  coinId: string
): Promise<AxiosResponse<CoinResponse>> =>
  axiosConfig.get(CoinApi.coinInfo(coinId).url);

const useCoinInformation = (
  coinId: string,
  initParams?: Partial<CoinInformationParams>
) => {
  const [params, setParams] = useState(initParams);

  const { data, ...rest } = useQuery(CoinApi.coinInfo(coinId).key, () =>
    getCoinInformation(coinId)
  );

  const handleChangeParams = useCallback((params: CoinInformationParams) => {
    setParams((prev) => ({ ...prev, ...params }));
  }, []);

  useEffect(() => {
    rest.refetch();
  }, [params, coinId]);

  return {
    ...rest,
    coinInfo: data?.data,
    handleChangeParams,
  };
};

export default useCoinInformation;
