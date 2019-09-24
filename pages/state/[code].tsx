import React from 'react';
import { NextPage } from 'next';
import { getBaseURL } from '@mcansh/next-now-base-url';
import ky from 'ky-universal';
import Head from 'next/head';
import { decode } from 'he';
import { SimpleImg } from 'react-simple-img';

import Link from '~/components/link';
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
              display: 'flex',
              flexDirection: 'column',
              '.content': {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                color: 'rgba(255, 255, 255, 0.7)',
                padding: 16,
                fontSize: 14,
                lineHeight: 1.57,
                p: { flexGrow: 1 },
                a: {
                  height: 36,
                  minWidth: 64,
                  fontSize: '1.4rem',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  marginTop: 8,
                },
              },
            }}
          >
            <div
              css={{
                position: 'relative',
                h2: {
                  position: 'absolute',
                  bottom: '0.8rem',
                  left: 0,
                  fontSize: '2.4rem',
                  fontWeight: 'normal',
                  width: '100%',
                  padding: '0 1.6rem',
                },
              }}
            >
              {park.image && (
                <SimpleImg
                  src={park.image.url}
                  alt={park.image.altText}
                  height={200}
                  placeholder={false}
                  imgStyle={{
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'bottom',
                  }}
                />
              )}
              <h2>{decode(park.name)}</h2>
            </div>

            <div className="content">
              <p>{park.description}</p>

              {park.url && (
                <Link href={park.url}>
                  <a>Learn more</a>
                </Link>
              )}
            </div>
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
