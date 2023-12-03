import { Box, Skeleton, Typography, styled } from '@mui/material';
import useCoinInformation from 'hooks/coin/useCoinInformation';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
const Gap = 20;

const Container = styled(Box)(() => ({}));

const RankText = styled(Typography)(({ theme }) => ({
  display: 'inline-block',

  background: theme.palette.common.darkBlue,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  fontSize: 14,
  padding: '3px 8px',
  marginLeft: 10,
}));

const NameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: 28,
  },
  '& .coin-name-container': {
    display: 'flex',
    '& .coin-name': {
      color: theme.palette.common.black,
      fontWeight: 600,
      fontSize: 20,
      margin: '0 10px',
    },
    '& .coin-symbol': {
      color: theme.palette.common.lightGrey,
      fontWeight: 300,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  marginBottom: Gap,
  '& .coin-price': {
    '&-usd': {
      fontSize: 30,
      fontWeight: 600,
      '& .change-percentage': {
        fontSize: 20,
        fontWeight: 'inherit',
      },
      '.percentage-usd-icon': {
        width: 15,
        height: 15,
      },
    },
    '&-btc': {
      color: theme.palette.common.lightGrey,
      '& .change-percentage': {
        fontSize: 14,
      },
    },

    '&-btc,&-usd': {
      display: 'flex',
    },
  },
  '& .change-percentage.down,svg.down': {
    color: theme.palette.common.red,
  },
  '& .change-percentage.up,svg.up': {
    color: theme.palette.common.lightGreen,
  },

  '& svg.up': {
    transform: 'rotate(180deg)',
  },
  '& .change-percentage': {
    display: 'flex',
    color: theme.palette.common.lightGrey,
    margin: 0,
    alignItems: 'center',
    lineHeight: 0,
  },
}));

const PercentageContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
}));

const UpDownIcon = styled(AiFillCaretDown)(() => ({
  width: 15,
  aspectRatio: 1,
}));

const Coin = () => {
  const { coinId } = useParams();

  const { coinInfo, isFetching } = useCoinInformation(String(coinId));

  const coinPrice = useMemo(() => {
    return {
      usd: {
        currentPrice: coinInfo?.market_data.current_price.usd.toFixed(2),
        change24h:
          coinInfo?.market_data.market_cap_change_percentage_24h_in_currency
            .usd,
      },
      btc: {
        currentPrice: coinInfo?.market_data.current_price.btc.toFixed(2),
        change24h:
          coinInfo?.market_data.market_cap_change_percentage_24h_in_currency
            .btc,
      },
    };
  }, [coinInfo]);

  const getUpOrDownClassName = useCallback((value: number) => {
    return value < 0 ? 'down' : 'up';
  }, []);

  return (
    <Container className='coin-information'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '15px 0',
        }}
      >
        <NameContainer>
          {isFetching ? (
            <Skeleton variant='circular' height={20} />
          ) : (
            <img
              src={coinInfo?.image.small}
              alt={coinInfo?.name}
              loading='lazy'
            />
          )}
          {isFetching ? (
            <Skeleton width={150} />
          ) : (
            <Box className='coin-name-container'>
              <Typography className='coin-name' variant='h4'>
                {coinInfo?.name || <Skeleton width={50} />}
              </Typography>
              <Typography
                variant='h5'
                className='coin-symbol'
              >{`${coinInfo?.symbol.toUpperCase()} Price`}</Typography>
            </Box>
          )}
        </NameContainer>
        {isFetching ? (
          <Skeleton width={80} sx={{ marginLeft: 10 }} />
        ) : (
          <RankText> {`Rank  #${coinInfo?.market_cap_rank}`}</RankText>
        )}
      </Box>

      <PriceContainer>
        {isFetching ? (
          <Skeleton width={200} />
        ) : (
          <Typography className='coin-price-usd' variant='body2'>
            {`$ ${coinPrice.usd.currentPrice}`}

            <PercentageContainer>
              <UpDownIcon
                className={`percentage-usd-icon ${getUpOrDownClassName(
                  coinPrice.usd.change24h || 0
                )}`}
              />

              <Typography
                className={`change-percentage ${getUpOrDownClassName(
                  coinPrice.usd.change24h || 0
                )}`}
              >{`${coinPrice.usd.change24h}%`}</Typography>
            </PercentageContainer>
          </Typography>
        )}
        {isFetching ? (
          <Skeleton width={200} />
        ) : (
          <Typography className='coin-price-btc' variant='body2'>
            {`${coinPrice.btc.currentPrice} BTC`}

            <PercentageContainer>
              <UpDownIcon
                className={`${getUpOrDownClassName(
                  coinPrice.btc.change24h || 0
                )}`}
              />

              <Typography
                className={`change-percentage ${getUpOrDownClassName(
                  coinPrice.btc.change24h || 0
                )}`}
              >
                {`${coinPrice.btc.change24h}%`}
              </Typography>
            </PercentageContainer>
          </Typography>
        )}
      </PriceContainer>
    </Container>
  );
};

export default Coin;
