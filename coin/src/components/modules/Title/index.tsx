import { Box, Typography, styled } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'routers/index';

const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LogoContainer = styled(Box)(() => ({
  '& img': {
    width: 80,
    aspectRatio: 1,
  },
}));

const StyledTypography = styled(Typography)(() => ({
  fontSize: 80,
  fontWeight: 600,
  marginLeft: 12,
}));

const ClickContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const CoinTitle = () => {
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate(AppRoutes.home);
  }, []);

  return (
    <Container className='coin-title'>
      <ClickContainer onClick={navigateToHome}>
        <LogoContainer>
          <img src='/coin.svg' alt='coin' />
        </LogoContainer>
        <StyledTypography variant='h1'>Coin</StyledTypography>
      </ClickContainer>
    </Container>
  );
};

export default CoinTitle;
