import useListTrendingCoins from 'hooks/coin/useListTredingCoins';
import { ComponentProps, useMemo, useState } from 'react';
import SearchInputDropdown, { Option } from './SearchInputDropdown';
import { Box, styled } from '@mui/material';
import useSearchCoins from 'hooks/coin/useSearchCoins';
import useGoToCoinInfo from 'hooks/useGoToCoinInfo';
import useDebounce from 'hooks/useDebounce';

const Container = styled(Box)(() => ({}));

const SearchCoinInput = () => {
  const { trendingCoins } = useListTrendingCoins();

  const [searchValue, setSearchValue] = useState<string>('');

  const {
    searchedCoins,
    handleChangeParams: handleChangeSearchCoinsParams,
    searchCoinsParams,
  } = useSearchCoins({ q: searchValue });

  const onNavigateCoinInfo = useGoToCoinInfo();

  const debounceChangeSearchParamsCoin = useDebounce(
    handleChangeSearchCoinsParams,
    300
  );

  const onChange: ComponentProps<typeof SearchInputDropdown>['onChange'] = (
    value
  ) => {
    setSearchValue(value);

    debounceChangeSearchParamsCoin({ q: value });
  };

  const onSelectOption = (option: Option) => {
    onNavigateCoinInfo(String(option.key));
  };

  const options = useMemo((): Option[] => {
    if (!trendingCoins) {
      return [];
    }

    if (!searchCoinsParams.q?.length) {
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
  }, [trendingCoins, searchedCoins, searchCoinsParams.q]);

  return (
    <Container className="coin-search">
      <SearchInputDropdown
        searchValue={searchValue}
        options={options}
        onChange={onChange}
        onSelect={onSelectOption}
        placeholder="Search Coin"
      />
    </Container>
  );
};

export default SearchCoinInput;
