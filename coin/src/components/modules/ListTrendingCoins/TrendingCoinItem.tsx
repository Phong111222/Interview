import { Box, BoxProps, Typography, styled } from '@mui/material';
import { TrendingCoinsResponse } from 'app-types/Coin';
import { FC } from 'react';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: `0.5px solid ${theme.palette.common.lightGrey}`,
  borderRadius: theme.shape.borderRadius,

  padding: '10px 8px',
  transition: '200ms ease-out',

  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  },
}));

const CoinLogo = styled(Box)(() => ({
  '& img': {
    borderRadius: '100%',
    width: 40,
  },
}));

const NameContainer = styled(Box)(() => ({
  marginLeft: 10,
}));

const CoinName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
}));

const CoinSymbol = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.common.lightGrey,
}));

interface Props extends BoxProps<'div'> {
  coin: TrendingCoinsResponse['coins'][number]['item'];
}

const TrendingCoinItem: FC<Props> = ({ coin, ...rest }) => {
  return (
    <Container {...rest} className='trending-coin-item'>
      <CoinLogo>
        <img src={coin.thumb} alt={coin.name} loading='lazy' />
      </CoinLogo>
      <NameContainer>
        <CoinName variant='body1'>{coin.name}</CoinName>
        <CoinSymbol variant='body2'>{coin.symbol}</CoinSymbol>
      </NameContainer>
    </Container>
  );
};

export default TrendingCoinItem;
