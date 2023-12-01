import { Box, styled } from '@mui/material';
import LisTrendingCoins from '../ListTrendingCoins';
import CoinChart from './CoinChart';

const Container = styled(Box)(() => ({}));

const CoinInformation = () => {
  return (
    <Container>
      {/* <CoinChart /> */}
      <LisTrendingCoins />
    </Container>
  );
};

export default CoinInformation;
