import React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { decode } from 'he';
import { SimpleImg } from 'react-simple-img';

import { Link } from '~/components/link';
import { findStateByName, stateKeys } from '~/utils/states';
import { ParkData, getParks } from '~/utils/get-parks';
import { getFirstParam } from '~/utils/get-first-param';

interface Props {
  state?: string;
  statusCode?: number;
  data?: ParkData[];
}

type MyUrlQuery = {
  code: string;
};

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
      {data?.map(park => (
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
              height: 200,
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

export const getStaticPaths: GetStaticPaths<MyUrlQuery> = () =>
  Promise.resolve({
    fallback: false,
    paths: stateKeys.map(code => `/state/${code}`),
  });

export const getStaticProps: GetStaticProps<Props, MyUrlQuery> = async ({
  params,
}) => {
  if (!params || !params.code) {
    return { props: { statusCode: 404 }, unstable_revalidate: 1 };
  }
  const [stateCode, stateName] = findStateByName(getFirstParam(params.code));
  if (!stateCode || !stateName) {
    return { props: { statusCode: 404 }, unstable_revalidate: 1 };
  }
  const parkData = await getParks(stateCode);
  return {
    props: { state: stateName, data: parkData },
    unstable_revalidate: 60 * 60 * 24, // 1 day
  };
};

export default State;
