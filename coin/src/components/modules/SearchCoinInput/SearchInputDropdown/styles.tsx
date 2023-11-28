import { Box, TextField, styled, Autocomplete } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledTextField = styled(TextField)(({}) => ({
  height: '100%',
}));

export const StyledAutoComplete = styled(Autocomplete)(({}) => ({
  width: '100%',
  height: '60px',
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    padding: '0px 12px',
    transition: '100ms linear',
    height: '100%',
  },
  '& .MuiFormControl-root': {
    height: '100%',
  },
}));

export const StyledOption = styled;
