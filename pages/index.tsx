import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Link from '~/components/link';
import { states } from '~/utils/states';

const Index: NextPage = () => (
  <>
    <Head>
      <title>NPS Gallery</title>
    </Head>
    <div
      css={`
        display: grid;
        grid-gap: 1.6rem;
        grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
      `}
    >
      {Object.entries(states).map(([code, name]) => (
        <Link
          key={name.toLowerCase()}
          href="/state/[code]"
          as={`/state/${code.toLowerCase()}`}
          passHref
        >
          <a
            css={`
              display: inline-block;
              background: #009688;
              border: #009688;
              height: 3.6rem;
              padding: 0 1.6rem;
              color: white;
              box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
              text-align: center;
              border-radius: 0.4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.4rem;
              line-height: normal;
              text-decoration: none;
              text-transform: uppercase;
            `}
          >
            {name}
          </a>
        </Link>
      ))}
    </div>
  </>
);

export default Index;
