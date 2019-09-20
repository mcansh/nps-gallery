import React from 'react';
import { NextPage } from 'next';
import { getBaseURL } from '@mcansh/next-now-base-url';
import ky from 'ky-universal';
import Head from 'next/head';

import { ParkData } from '~/pages/api/state/[code]';
import { getFirstParam } from '~/utils/get-first-param';
import { states } from '~/utils/states';

interface Props {
  state?: string;
  statusCode?: number;
  data?: ParkData[];
}

const State: NextPage<Props> = ({ state, data }) => (
  <>
    <Head>
      <title>{state} - NPS Gallery</title>
    </Head>
    <h1>National Parks for {state}</h1>

    <div
      css={{
        display: 'grid',
        gridGap: 16,
        gridTemplateColumns: 'repeat(3, 1fr)',
        paddingTop: '1rem',
      }}
    >
      {data &&
        data.map(park => (
          <div
            key={park.id}
            css={{
              borderRadius: '0.4rem',
              overflow: 'hidden',
              background: '#424242',
            }}
          >
            <div
              css={{
                position: 'relative',
                height: 150,
                h2: {
                  position: 'absolute',
                  bottom: '0.8rem',
                  left: 0,
                  fontSize: '2.4rem',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  width: '100%',
                  padding: '0 1.6rem',
                },
              }}
            >
              {park.image && (
                <img
                  src={park.image.url}
                  alt={park.image.altText}
                  css={{
                    height: 150,
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                  }}
                />
              )}
              <h2>{park.name}</h2>
            </div>

            <p>{park.description}</p>

            {park.url && <a href={park.url}>Learn more</a>}
          </div>
        ))}
    </div>
  </>
);

State.getInitialProps = async ({ query, req }) => {
  const { code } = query;

  if (!code) return { statusCode: 404 };

  const state = Object.entries(states).find(
    entry =>
      entry[0].toLowerCase() === getFirstParam(code).toLowerCase() ||
      entry[1].toLowerCase() === getFirstParam(code).toLowerCase()
  );

  if (!state) return { statusCode: 404 };

  const base = getBaseURL(req);

  try {
    const data: ParkData[] = await ky(`${base}/api/state/${state[0]}`).json();
    return { state: state[1], data };
  } catch (error) {
    throw new Error(error);
  }
};

export default State;
