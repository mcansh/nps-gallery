const withSourceMaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');

const nextConfig = {
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },

  crossOrigin: 'anonymous',
  target: 'serverless',
};

module.exports = withSourceMaps(withOffline(nextConfig));
