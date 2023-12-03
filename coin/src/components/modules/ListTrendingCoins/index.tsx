import useListTrendingCoins from 'hooks/coin/useListTrendingCoins';
import useGoToCoinInfo from 'hooks/useGoToCoinInfo';
import CustomTable from 'components/common/Table';
import useTableTrendingCoinCols from './hook';

import { Box, Typography, styled } from '@mui/material';
import { TrendingCoinsResponse } from 'app-types/Coin';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from 'routers/index';

const Container = styled(Box)(() => ({}));

const TrendingTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: 32,
  fontWeight: 600,
  marginBottom: 20,
}));

const LisTrendingCoins = () => {
  const { trendingCoins } = useListTrendingCoins();

  const goToCoinInfo = useGoToCoinInfo();

  const location = useLocation();

  const onClickCoin = useCallback((coinId: string) => {
    goToCoinInfo(coinId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cols = useTableTrendingCoinCols();

  const rows = useMemo(() => {
    return trendingCoins?.coins.map((coin) => coin.item) || [];
  }, [trendingCoins]);

  return (
    <Container className='coin-trending-list'>
      {!location.pathname.includes(AppRoutes.home) && (
        <TrendingTitle>Trending Coins</TrendingTitle>
      )}

      <CustomTable<TrendingCoinsResponse['coins'][number]['item']>
        columns={cols}
        rows={rows}
        onRowClick={(row) => onClickCoin(String(row.id))}
      />
    </Container>
  );
};

export default LisTrendingCoins;
