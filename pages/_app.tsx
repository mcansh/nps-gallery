import React from 'react';
import App from 'next/app';
import NextError from 'next/error';
import { NProgress } from '@mcansh/next-nprogress';

import Layout from '~/components/layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    if (pageProps.statusCode) {
      return <NextError statusCode={pageProps.statusCode} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
        <NProgress spinner={false} color="#009688" />
      </Layout>
    );
  }
}

export default MyApp;
