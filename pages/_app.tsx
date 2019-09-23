import React from 'react';
import App from 'next/app';
import NextError from 'next/error';
import { NProgress } from '@mcansh/next-nprogress';
import * as Sentry from '@sentry/node';

import Layout from '~/components/layout';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: `npsgallery@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
  sampleRate: process.env.NODE_ENV === 'production' ? 1 : 0,
});

class MyApp extends App<{ err?: Error }> {
  render() {
    const { Component, pageProps, err } = this.props;
    // https://github.com/zeit/next.js/pull/8684
    const modifiedPageProps = { ...pageProps, err };

    if (pageProps.statusCode) {
      return <NextError statusCode={pageProps.statusCode} />;
    }

    return (
      <Layout>
        <Component {...modifiedPageProps} />
        <NProgress spinner={false} color="#009688" />
      </Layout>
    );
  }
}

export default MyApp;
