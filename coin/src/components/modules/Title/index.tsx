import { Box, Typography, styled } from '@mui/material';

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

const CoinTitle = () => {
  return (
    <Container className="coin-title">
      <LogoContainer>
        <img src="/coin.svg" alt="coin" />
      </LogoContainer>
      <StyledTypography variant="h1">Coin</StyledTypography>
    </Container>
  );
};

export default CoinTitle;
