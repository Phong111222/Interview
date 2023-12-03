import axiosConfig from 'configs/axios';
import { useQuery } from 'react-query';
import { CoinApi } from 'api';
import { AxiosResponse } from 'axios';
import { CoinOhlcParams, CoinOhlcResponse } from 'app-types/Coin';
import { useCallback, useEffect, useState } from 'react';

const getCoinOhlc = (
  coinId: string,
  params: CoinOhlcParams
): Promise<AxiosResponse<CoinOhlcResponse>> =>
  axiosConfig.get(CoinApi.coinOhlc(coinId).url, { params });

const useCoinOhlc = (
  coinId: string,
  initParams: CoinOhlcParams = {
    vs_currency: 'usd',
    days: '1',
  }
) => {
  const [params, setParams] = useState(initParams);

  const { data, ...rest } = useQuery(CoinApi.coinOhlc(coinId).key, () =>
    getCoinOhlc(coinId, params)
  );

  const handleChangeParams = useCallback((params: Partial<CoinOhlcParams>) => {
    setParams((prev) => ({ ...prev, ...params }));
  }, []);

  useEffect(() => {
    rest.refetch();
  }, [params, coinId]);

  return {
    ...rest,
    ohlcData: data?.data?.map((ohlc) => {
      const [x, o, h, l, c] = ohlc;

      return {
        x,
        o: o.toFixed(10),
        h: h.toFixed(10),
        l: l.toFixed(10),
        c: c.toFixed(10),
      };
    }),
    handleChangeParams,
    params,
  };
};

export default useCoinOhlc;
