import { ChartData } from 'chart.js';
import useCoinOhlc from 'hooks/coin/useGetCoinOHLC';
import React, { createContext, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

type ChartOhlc = ReturnType<typeof useCoinOhlc>;

export type ChartContext = {
  chartData: ChartData<'ohlc'>;
  handleChangeParams: ChartOhlc['handleChangeParams'];
  params: ChartOhlc['params'];
};

const initialValue: Partial<ChartContext> = {};

const chartContext = createContext(initialValue);

const useChartData = () => useContext(chartContext);

const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  const { coinId } = useParams();

  const { ohlcData, handleChangeParams, params } = useCoinOhlc(String(coinId));

  const chartData = useMemo((): ChartData<'ohlc'> => {
    return {
      datasets: [
        {
          data: ohlcData || [],
        },
      ],
    };
  }, [ohlcData]);

  return (
    <chartContext.Provider
      value={{
        chartData,
        params,
        handleChangeParams,
      }}
    >
      {children}
    </chartContext.Provider>
  );
};

export { useChartData };

export default ChartProvider;
