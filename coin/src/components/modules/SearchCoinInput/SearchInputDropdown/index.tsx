import React, { ReactNode, forwardRef, useCallback, useState } from 'react';
import {
  Container,
  OptionContainer,
  StyledTextField,
  SectionContainer,
} from './styles';

import Option from './Option';
import { ClickAwayListener, TextFieldProps } from '@mui/material';

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
  section?: ReactNode;
}

const SearchInputDropdown = forwardRef<HTMLInputElement, Props>(
  ({ options, onOptionSelect, section, ...rest }, ref) => {
    const [open, setOpen] = useState(false);

    const onOpenDropdown = useCallback(() => {
      setOpen(true);
    }, []);
    const onCloseDropdown = useCallback(() => {
      setOpen(false);
    }, []);

    const _onSelect = (e: React.MouseEvent, option: Option) => {
      e.stopPropagation();
      onOptionSelect?.(option);
      onCloseDropdown();
    };

    return (
      <ClickAwayListener onClickAway={onCloseDropdown}>
        <Container onClick={() => onOpenDropdown()}>
          <StyledTextField {...rest} inputRef={ref} />
          <OptionContainer open={open}>
            {section && <SectionContainer>{section}</SectionContainer>}
            {options.map((option) => (
              <Option
                key={option.key}
                onClick={(e) => _onSelect(e, option)}
                name={option.label}
                icon={option.icon}
                data={option}
              />
            ))}
          </OptionContainer>
        </Container>
      </ClickAwayListener>
    );
  }
);

SearchInputDropdown.displayName = 'SearchInputDropdown';

export default SearchInputDropdown;
