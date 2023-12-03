import { Box, Tab, Tabs, styled } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { CHART_RANGES } from './const';
import { useChartData } from './Chart.context';
import { CoinOhlcDay } from 'app-types/Coin';

export interface Range {
  key: CoinOhlcDay;
  title: string;
}

const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: 'inline-block',
  border: `0.5px solid ${theme.palette.common.lightGrey}`,
  borderRadius: theme.shape.borderRadius,
  marginBottom: 20,
  '& .MuiTabs-scroller': {
    display: 'block',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .Mui-selected': {
    color: `${theme.palette.common.white} !important`,
    background: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 14,
  padding: 0,
  height: 30,
  borderRight: `0.5px solid ${theme.palette.common.lightGrey}`,
  '&:last-child': {
    borderRight: 'none',
  },
}));

const ChartRange: FC = () => {
  const { params, handleChangeParams } = useChartData();

  const onChange: ComponentProps<typeof Tabs>['onChange'] = (_e, value) => {
    handleChangeParams?.({
      days: value,
    });
  };

  return (
    <Container>
      <StyledTabs value={params?.days} onChange={onChange}>
        {CHART_RANGES.map((range) => (
          <StyledTab key={range.key} label={range.title} value={range.key} />
        ))}
      </StyledTabs>
    </Container>
  );
};

export default ChartRange;
