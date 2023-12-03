import { Box, styled } from '@mui/material';
import LisTrendingCoins from '../ListTrendingCoins';
import CoinChart from './CoinChart/index';

import Coin from './Coin';
import ChartProvider from './CoinChart/Chart.context';

const Container = styled(Box)(() => ({}));

const CoinInformation = () => {
  return (
    <Container>
      <Coin />
      <ChartProvider>
        <CoinChart />
      </ChartProvider>
      <LisTrendingCoins />
    </Container>
  );
};

export default CoinInformation;
