import { Box, styled } from '@mui/material';
import {
  OhlcController,
  OhlcElement,
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';
import {
  ChartData,
  Chart as ChartJS,
  TimeSeriesScale,
  LinearScale,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { useEffect, useRef, useState } from 'react';

const Container = styled(Box)({});

ChartJS.register(
  OhlcController,
  OhlcElement,
  CandlestickController,
  CandlestickElement,
  TimeSeriesScale,
  LinearScale
);

const CoinChart = () => {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<ChartData<'ohlc'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData: ChartData<'ohlc'> = {
      // ...data,
      // datasets: data.datasets.map(dataset => ({
      //   ...dataset,

      // })),
      xLabels: [1, 2, 3, 4, 5, , 6],
      yLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      labels: [
        new Date(86400000), // Day 1
        new Date(2 * 86400000), // Day 2
        new Date(3 * 86400000), // Day 3
        new Date(4 * 86400000), // Day 4
        new Date(6 * 86400000), // Day 6
        new Date(7 * 86400000), // Day 7
      ],
      datasets: [
        {
          data: [
            {
              o: 1,
              h: 2,
              l: -1,
              c: 1,
              x: new Date().valueOf(),
            },
          ],
        },
        {
          data: [
            {
              o: 4,
              h: 5,
              l: 2,
              c: 3,
              x: new Date().valueOf(),
            },
          ],
        },
        {
          data: [
            {
              o: 4,
              h: 5,
              l: 2,
              c: 3,
              x: new Date().valueOf(),
            },
          ],
        },
        {
          data: [
            {
              o: 4,
              h: 5,
              l: 2,
              c: 3,
              x: new Date().valueOf(),
            },
          ],
        },
      ],
    };

    setChartData(chartData);
  }, []);

  return (
    <Container className="coin-chart">
      <Chart ref={chartRef} type="ohlc" data={chartData} />
    </Container>
  );
};

export default CoinChart;
