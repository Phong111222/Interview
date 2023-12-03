import { useMemo } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { TrendingCoinsResponse } from 'app-types/Coin';
import { ColumnProps } from 'components/common/Table';

const NameCol = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& .logo': {
    height: 20,
    marginRight: 8,
  },
  '& .col-coin-name': {
    cursor: 'pointer',
    fontWeight: 600,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const RankContainer = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  fontSize: 14,
  fontWeight: 600,
  padding: '5px 10px',
  minWidth: 50,
  textAlign: 'center',
}));

const useTableTrendingCoinCols = () => {
  const cols = useMemo((): ColumnProps<
    TrendingCoinsResponse['coins'][number]['item']
  >[] => {
    return [
      {
        title: 'Name',
        key: 'name',
        sortBy: 'name',
        sorter: true,
        renderNode: (row) => {
          return (
            <NameCol>
              <img className="logo" src={row.small} alt={row.name} />
              <Typography className="col-coin-name">{row.name}</Typography>
            </NameCol>
          );
        },
      },
      {
        title: 'Symbol',
        key: 'symbol',
        sortBy: 'symbol',
        sorter: true,
      },
      {
        title: 'Price (BTC)',
        key: 'price_btc',
        sortBy: 'price_btc',
        sorter: true,
        renderNode: (row) => (
          <>{Number.parseFloat(String(row.price_btc)).toFixed(10)}</>
        ),
      },
      {
        title: 'Market Cap Rank',
        key: 'market_cap_rank',
        sortBy: 'market_cap_rank',
        sorter: true,
        sx: {
          textAlign: 'center',
        },
        renderNode: (row) => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <RankContainer>#{row.market_cap_rank}</RankContainer>
            </Box>
          );
        },
      },
    ];
  }, []);

  return cols;
};

export default useTableTrendingCoinCols;
