import React from 'react';
import { AppProps } from 'next/app';
import NextError from 'next/error';
import { NProgress } from '@mcansh/next-nprogress';

import Layout from '~/components/layout';

const App = ({ Component, pageProps }: AppProps) => {
  if (pageProps.statusCode) {
    return <NextError statusCode={pageProps.statusCode} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
      <NProgress spinner={false} color="#009688" />
    </Layout>
  );
};

export default App;
