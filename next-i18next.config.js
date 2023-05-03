const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

module.exports = {
  backend: {
    backendOptions: [{ expirationTime: process.env.NODE_ENV === 'development' ? 0 : 60 * 60 * 1000 }],
    backends: typeof window !== 'undefined' ? [LocalStorageBackend, HttpBackend] : [],
  },
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
};
