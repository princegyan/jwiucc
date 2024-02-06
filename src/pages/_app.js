// pages/_app.js
import { QueryClientProvider } from 'react-query';
import queryClient from '../queryClient';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
