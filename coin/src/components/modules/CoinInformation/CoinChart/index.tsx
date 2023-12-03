import { Box, styled } from '@mui/material';
import {
  OhlcController,
  OhlcElement,
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';
import {
  Chart as ChartJS,
  TimeSeriesScale,
  LinearScale,
  ChartData,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { useRef } from 'react';

import ChartRange from './ChartRange';
import { useChartData } from './Chart.context';
const Container = styled(Box)({
  marginBottom: 20,
});

ChartJS.register(
  OhlcController,
  OhlcElement,
  CandlestickController,
  CandlestickElement,
  TimeSeriesScale,
  LinearScale,
  Tooltip
);

const chartOptions: ChartOptions<'ohlc'> = {
  plugins: {
    tooltip: {
      position: 'nearest',
    },
  },
};

const CoinChart = () => {
  const chartRef = useRef<any>(null);

  const { chartData } = useChartData();

  return (
    <Container className='coin-chart'>
      <ChartRange />
      <Chart
        ref={chartRef}
        type='ohlc'
        data={chartData as ChartData<'ohlc'>}
        options={chartOptions}
      />
    </Container>
  );
};

export default CoinChart;
