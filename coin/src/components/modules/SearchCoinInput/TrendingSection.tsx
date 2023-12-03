import { Box, Typography, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

const Container = styled(Box)(() => ({
  display: 'flex',
}));

const IconContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
}));

interface Props {
  text: string;
  icon?: ReactNode;
  isFetching?: boolean;
}

const CoinSection: FC<Props> = ({ text, icon, isFetching }) => {
  if (isFetching) {
    return <Box>Fetching</Box>;
  }

  return (
    <Container>
      <Typography variant='body1'>{text}</Typography>
      <IconContainer>{icon}</IconContainer>
    </Container>
  );
};

export default CoinSection;
