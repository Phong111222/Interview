import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import queryClient from 'configs/queryClient';
import theme from 'theme';
import { ThemeProvider } from '@mui/material';
ReactDOM.createRoot(document.getElementById('coin-root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
