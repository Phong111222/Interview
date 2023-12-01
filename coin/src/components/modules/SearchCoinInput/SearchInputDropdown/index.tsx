import { ElementRef, forwardRef, useState } from 'react';
import { Container, OptionContainer, StyledTextField } from './styles';

import Option from './Option';
import { Input, InputProps, TextField, TextFieldProps } from '@mui/material';

export interface Option {
  label: string;
  key: string | number;
  icon?: string;
  [key: string]: any;
}

interface Props extends TextFieldProps<'standard'> {
  options: Option[];
  selected?: Option['key'];
  onOptionSelect?: (option: Option) => void;
}

const SearchInputDropdown = forwardRef<HTMLInputElement, Props>(
  (
    {
      options,

      onOptionSelect,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const onOpenDropdown = () => {
      setOpen(true);
    };
    const onCloseDropdown = () => setOpen(false);

    const _onSelect = (option: Option) => {
      onOptionSelect?.(option);
      onCloseDropdown();
    };

    return (
      <Container>
        <StyledTextField
          {...rest}
          inputRef={ref}
          onClick={() => onOpenDropdown()}
          onBlur={() => onCloseDropdown()}
        />
        <OptionContainer open={open}>
          {options.map((option) => (
            <Option
              onClick={() => _onSelect(option)}
              key={option.key}
              name={option.label}
              icon={option.icon}
              data={option}
            />
          ))}
        </OptionContainer>
      </Container>
    );
  }
);

export default SearchInputDropdown;
