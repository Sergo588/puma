const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  publicRuntimeConfig: {
    STAND: process.env.STAND,
    ALLOWED_CHAIN_ID: process.env.ALLOWED_CHAIN_ID,
    NFT_ROUTER_ADDRESS: process.env.NFT_ROUTER_ADDRESS,
    BUSD_ADDRESS: process.env.BUSD_ADDRESS,
    CONTRACT_XBASE: process.env.CONTRACT_XBASE,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
