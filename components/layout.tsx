import React from 'react';
import { ThemeProvider } from 'styled-components';
import Link from 'next/link';

import { Container } from './styles/container';

import theme from '~/config';
import GlobalStyle from '~/components/styles/global-style';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          /* eslint-disable no-console */
          .then(() => console.log('Service Worker registered successfully'))
          .catch(() => console.warn('Service Worker failed to register'));
        /* eslint-enable no-console */
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <GlobalStyle />
        <div
          css={{
            padding: 16,
          }}
        >
          <Link href="/">
            <a>NPS Gallery</a>
          </Link>
        </div>
        <div css={{ flex: '1 1 auto' }}>{children}</div>
        <div
          css={{
            padding: 16,
          }}
        >
          Data from the{' '}
          <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">
            NPS API
          </a>
          .
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
