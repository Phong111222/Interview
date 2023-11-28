import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (error) => console.error(error),
      retry: 1,
    },
    mutations: {
      onError: (error) => error as Promise<unknown>,
    },
  },
});

export default queryClient;
