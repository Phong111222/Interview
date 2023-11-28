import { Box, Grid, styled } from '@mui/material';
import TrendingCoinItem from './TrendingCoinItem';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useListTrendingCoins from 'hooks/coin/useListTredingCoins';

const Container = styled(Box)(() => ({}));

const LisTrendingCoins = () => {
  const { trendingCoins } = useListTrendingCoins();

  const navigate = useNavigate();

  const location = useLocation();

  const onClickCoin = useCallback((coinId: string) => {
    navigate(`${location.pathname}?coinId=${coinId}`);
  }, []);

  return (
    <Container className="coin-trending-list">
      <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }}>
        {trendingCoins?.coins?.map((coin) => (
          <Grid key={coin.item.coin_id} item xs={6}>
            <TrendingCoinItem
              coin={coin.item}
              onClick={() => onClickCoin(String(coin.item.coin_id))}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LisTrendingCoins;
