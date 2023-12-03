import { Box, FormControl, TextField, styled } from '@mui/material';

export const Container = styled(FormControl)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
}));

export const StyledTextField = styled(TextField)(({}) => ({
  height: '100%',
  width: '100%',
}));

export const OptionContainer = styled(Box)<{ open: boolean }>(
  ({ theme, open }) => {
    return {
      background: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      zIndex: 9999,
      transition: '300s linear',
      position: 'absolute',
      width: '100%',
      maxHeight: 500,
      bottom: 0,
      color: 'black',
      transform: 'translateY(100%)',
      border: `0.5px solid ${theme.palette.common.lightGrey}`,

      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      overflowY: 'auto',
      ...(open
        ? {
            display: 'block',
          }
        : { display: 'none' }),
    };
  }
);

export const SectionContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.common.lightGrey,
  padding: '12px 8px',
  fontSize: 14,
  borderBottom: `0.5px solid ${theme.palette.common.lightGrey}`,
}));
