// https://github.com/zeit/next.js/pull/8684/
import React from 'react';
import NextError, { ErrorProps } from 'next/error';
import * as Sentry from '@sentry/node';
import { NextPage } from 'next';

interface Props extends ErrorProps {
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const MyError: NextPage<Props> = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextError statusCode={statusCode} />;
};

MyError.getInitialProps = async context => {
  const { res, err, asPath } = context;
  const errorInitialProps = await NextError.getInitialProps(context);
  const errorProps = { ...errorInitialProps, hasGetInitialPropsRun: true };

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404 };
    }

    if (err) {
      Sentry.captureException(err);

      return errorProps;
    }
  } else if (err) {
    Sentry.captureException(err);

    return errorProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorProps;
};

export default MyError;
