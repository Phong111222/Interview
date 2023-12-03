import { Avatar, Box, BoxProps, Typography, styled } from '@mui/material';
import { FC } from 'react';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '12px 8px',
  cursor: 'pointer',
  alignItems: 'center',
  '&:hover': {
    background: theme.palette.primary.main,
    color: 'white',
  },
}));

const StyledCoinIcon = styled(Avatar)(() => ({
  borderRadius: '100%',

  width: 20,
  height: 20,
}));

const NameContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)(() => ({
  marginLeft: 12,
  fontSize: 14,
}));

const CoinSymbol = styled(Box)(() => ({
  fontSize: 10,
  marginLeft: 8,
}));

interface Props extends BoxProps<'div'> {
  name: string;
  icon?: string;
  symbol?: string;
  data: Record<string, any>;
}

const Option: FC<Props> = ({ name, icon, symbol, data, ...rest }) => {
  return (
    <Container {...rest}>
      <StyledCoinIcon src={icon} alt={name} />
      <NameContainer>
        <StyledTypography variant='body1'>{name}</StyledTypography>
        {Boolean(symbol?.length) && <CoinSymbol>{`(${symbol})`}</CoinSymbol>}
      </NameContainer>
    </Container>
  );
};

export default Option;
