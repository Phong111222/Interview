import useListTrendingCoins from 'hooks/coin/useListTrendingCoins';
import React, { ReactNode, useMemo, useRef } from 'react';
import SearchInputDropdown, { Option } from './SearchInputDropdown';
import { Box, keyframes, styled } from '@mui/material';
import useSearchCoins from 'hooks/coin/useSearchCoins';
import useGoToCoinInfo from 'hooks/useGoToCoinInfo';
import useDebounce from 'hooks/useDebounce';
import { useQueryClient } from 'react-query';
import { CoinApi } from 'api/index';
import CoinSection from './TrendingSection';
import { ImFire } from 'react-icons/im';
import { SlDiamond } from 'react-icons/sl';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Container = styled(Box)(() => ({}));

const SectionLabels = {
  trending: 'Trending',
  result: 'Search Result',
};

const TrendingIcon = styled(ImFire)(() => ({
  color: 'red',
}));

const SearchResultIcon = styled(SlDiamond)(() => ({
  color: '#77D0FF',
}));

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SearchingCoinIcon = styled(AiOutlineLoading3Quarters)(({ theme }) => ({
  animation: `${spin} 1s infinite ease`,
  color: theme.palette.primary.main,
}));

const SearchCoinInput = () => {
  const { trendingCoins } = useListTrendingCoins();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    searchedCoins,
    handleChangeParams: handleChangeSearchCoinsParams,
    searchCoinsParams,
    isFetching: isSearchingCoins,
  } = useSearchCoins({ query: inputRef.current?.nodeValue || '' });

  const onNavigateCoinInfo = useGoToCoinInfo();

  const debounceChangeSearchParamsCoin = useDebounce((value: string) => {
    queryClient.cancelQueries({ queryKey: [CoinApi.searchCoin.key] });
    handleChangeSearchCoinsParams({ query: value });
  }, 500);

  const onSelectOption = (option: Option) => {
    onNavigateCoinInfo(String(option.key));
  };

  const searchDropdownProps = useMemo((): {
    options: Option[];
    sectionLabel: ReactNode;
  } | null => {
    if (!trendingCoins) {
      return null;
    }

    if (!searchCoinsParams.query?.length) {
      return {
        options: trendingCoins.coins?.map<Option>(({ item }) => ({
          key: item.id,
          label: item.name,
          icon: item.thumb,
        })),
        sectionLabel: (
          <CoinSection text={SectionLabels.trending} icon={<TrendingIcon />} />
        ),
      };
    }

    if (!searchedCoins) {
      return null;
    }

    return {
      options: searchedCoins.coins?.map<Option>((coin) => ({
        key: coin.id,
        label: coin.name,
        icon: coin.thumb,
      })),
      sectionLabel: (
        <CoinSection text={SectionLabels.result} icon={<SearchResultIcon />} />
      ),
    };
  }, [trendingCoins, searchedCoins]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceChangeSearchParamsCoin(e.target.value);
  };

  return (
    <Container className='coin-search'>
      <SearchInputDropdown
        ref={inputRef}
        options={searchDropdownProps?.options || []}
        section={
          isSearchingCoins ? (
            <CoinSection text='Searching' icon={<SearchingCoinIcon />} />
          ) : (
            searchDropdownProps?.sectionLabel || ''
          )
        }
        onChange={handleChange}
        onOptionSelect={onSelectOption}
      />
    </Container>
  );
};

export default SearchCoinInput;
