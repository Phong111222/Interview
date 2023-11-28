import { Box, styled } from '@mui/material';
import SearchCoinInput from './SearchCoinInput';
import CoinTitle from './Title';
import { Outlet } from 'react-router-dom';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
  margin: 'auto',
  '& .coin-title': {
    marginBottom: 20,
  },
  '& .coin-search': {
    marginBottom: 20,
  },
}));

const CoinLayout = () => {
  return (
    <Container>
      <CoinTitle />
      <SearchCoinInput />
      <Outlet />
    </Container>
  );
};

export default CoinLayout;
