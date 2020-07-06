const withSourceMaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const pkgJSON = require('./package.json');

const env = {};

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('dotenv').config();
  env.NPS_KEY = process.env.NPS_KEY;
}

const nextConfig = {
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },

  crossOrigin: 'anonymous',
  target: 'serverless',
  env: {
    SENTRY_DSN: 'https://5ad7b8bd79054e27939e531708e19837@sentry.io/1757277',
    SENTRY_RELEASE: `npsgallery@${pkgJSON.version}`,
    VERSION: pkgJSON.version,
    ...env,
  },
  experimental: {
    modern: true,
    plugins: true,
    rewrites: () => [{ source: '/sw.js', destination: '/_next/static/sw.js' }],
    headers: () => [
      {
        source: '/api/state/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
          { key: 'Cache-Control', value: 'immutable, max-age=43200' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'max-age=0' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ],
  },
  webpack: (config, { isServer, buildId, webpack }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(withSourceMaps(withOffline(nextConfig)));
