import useListTrendingCoins from 'hooks/coin/useListTrendingCoins';
import React, { ElementRef, useMemo, useRef } from 'react';
import SearchInputDropdown, { Option } from './SearchInputDropdown';
import { Box, Input, TextField, styled } from '@mui/material';
import useSearchCoins from 'hooks/coin/useSearchCoins';
import useGoToCoinInfo from 'hooks/useGoToCoinInfo';
import useDebounce from 'hooks/useDebounce';
import { useQueryClient } from 'react-query';
import { CoinApi } from 'api/index';

const Container = styled(Box)(() => ({}));

const SearchCoinInput = () => {
  const { trendingCoins } = useListTrendingCoins();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    searchedCoins,
    handleChangeParams: handleChangeSearchCoinsParams,
    searchCoinsParams,
  } = useSearchCoins({ query: inputRef.current?.nodeValue || '' });

  const onNavigateCoinInfo = useGoToCoinInfo();

  const debounceChangeSearchParamsCoin = useDebounce((value: string) => {
    queryClient.cancelQueries({ queryKey: [CoinApi.searchCoin.key] });
    handleChangeSearchCoinsParams({ query: value });
  }, 500);

  const onSelectOption = (option: Option) => {
    onNavigateCoinInfo(String(option.key));
  };

  const options = useMemo((): Option[] => {
    if (!trendingCoins) {
      return [];
    }

    if (!searchCoinsParams.query?.length) {
      return trendingCoins.coins?.map<Option>(({ item }) => ({
        key: item.id,
        label: item.name,
        icon: item.thumb,
      }));
    }

    if (!searchedCoins) {
      return [];
    }

    return searchedCoins.coins?.map<Option>((coin) => ({
      key: coin.id,
      label: coin.name,
      icon: coin.thumb,
    }));
  }, [trendingCoins, searchedCoins]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceChangeSearchParamsCoin(e.target.value);
  };

  return (
    <Container className="coin-search">
      <SearchInputDropdown
        ref={(ref) => (inputRef.current = ref)}
        defaultValue={inputRef.current?.value}
        options={options}
        onChange={handleChange}
        onOptionSelect={onSelectOption}
      />
    </Container>
  );
};

export default SearchCoinInput;
