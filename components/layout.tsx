import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';

import theme from '~/config';
import GlobalStyle from '~/components/styles/global-style';
import { Container } from '~/components/styles/container';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  footer {
    font-size: 1.6rem;
    padding: 1.6rem;
    background: #212121;

    a {
      color: #2196f3;
    }
  }

  header {
    background: #424242;
    height: 5.6rem;
    display: flex;
    align-items: center;
    padding: 0 1.6rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    z-index: 1;

    a {
      text-transform: uppercase;
      border-radius: 0.4rem;
      min-width: 6.4rem;
      height: 3.6rem;
      padding: 0 1.6rem;
      font-size: 1.4rem;
      color: white;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      &:hover {
        background: rgba(255, 255, 255, 0.24);
      }
    }
  }
`;

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
      <Wrapper>
        <GlobalStyle />
        <header>
          <Link href="/">
            <a>
              <span>NPS Gallery</span>
            </a>
          </Link>
        </header>
        <Container
          css={`
            width: 100%;
            flex: 1 1 auto;
            margin-top: 8rem;
            margin-bottom: 2.4rem;
          `}
        >
          {children}
        </Container>
        <footer>
          Data from the{' '}
          <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">
            NPS API
          </a>
          .
        </footer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
