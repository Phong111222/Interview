import { FC, useState } from 'react';
import { Container, StyledAutoComplete, StyledTextField } from './styles';

import Option from './Option';

export interface Option {
  label: string;
  key: string | number;
  icon?: string;
  [key: string]: any;
}

interface Props {
  searchValue: string;
  options: Option[];
  selected?: Option['key'];
  onSelect?: (option: Option) => void;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInputDropdown: FC<Props> = ({
  searchValue,
  options,
  onChange,
  placeholder,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  const onOpenDropdown = () => setOpen(true);
  const onCloseDropdown = () => setOpen(false);

  const _onSelect = (option: Option) => {
    onSelect?.(option);
    onCloseDropdown();
  };

  return (
    <Container>
      <StyledAutoComplete
        open={open}
        options={options}
        inputValue={searchValue}
        onInputChange={(_e, value) => onChange(value)}
        popupIcon={<></>}
        clearIcon={<></>}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            onFocus={onOpenDropdown}
            onBlur={onCloseDropdown}
            placeholder={placeholder}
          />
        )}
        renderOption={(_props, option) => {
          const item = option as Option;
          return (
            <Option
              key={item.key}
              icon={item.icon}
              name={item.label}
              data={item.data}
              onClick={() => _onSelect(item)}
            />
          );
        }}
      />
    </Container>
  );
};

export default SearchInputDropdown;
