import { Box, styled } from '@mui/material';
import LisTrendingCoins from '../ListTrendingCoins';

const Container = styled(Box)(() => ({}));

const CoinInformation = () => {
  return (
    <Container>
      <LisTrendingCoins />
    </Container>
  );
};

export default CoinInformation;
