import { BigNumber } from "@ethersproject/bignumber";

export const SOCIAL_LINKS = [
  {
    title: "telegram",
    link: "",
  },
];

export const NFT_START = 1675270800;
export const NFT_SALE_END = 1677585600;

export const ADD_CHAIN_ETHS_PARAMS = {
  56: {
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
    chainId: "0x38",
  },
  97: {
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    chainId: "0x61",
  },
};

export const DEFAULT_GAS_LIMIT = BigNumber.from(2000000);

export const MAX_VALUE =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const CONTRACT_NAMES = {
  NFT_ROUTER: "nftrouter",
  BUSD_TOKEN: "busdtoken",
  XBASE: "xbase",
};

export const MENU_LINKS = [
  {
    title: "Documents",
    link: "/",
  },
  {
    title: "Documents",
    link: "/",
  },
  {
    title: "Documents",
    link: "/",
  },
];
