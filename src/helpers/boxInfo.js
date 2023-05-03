import { NFT_TYPES } from "./nft";

export const BOX_NAMES = {
  DIAMOND: "Diamond",
  SAPPHIRE: "Sapphire",
  PEARL: "Pearl",
};

export const RARITY_NAMES = {
  COMMON: "Common",
  UNCOMMON: "Uncommon",
  RARE: "Rare",
  EPIC: "Epic",
  LEGENDARY: "Legendary",
};

export const RARITY_COLOR = {
  [RARITY_NAMES.COMMON]: "bg-white-100",
  [RARITY_NAMES?.UNCOMMON]: "bg-uncommonNft",
  [RARITY_NAMES?.RARE]: "bg-rareNft",
  [RARITY_NAMES?.EPIC]: "bg-epicNft",
  [RARITY_NAMES?.LEGENDARY]: "bg-legendaryNft",
};

export const BOX_NAME_TO_CONTRACT_TYPE = {
  [BOX_NAMES.PEARL]: 1,
  [BOX_NAMES.SAPPHIRE]: 2,
  [BOX_NAMES.DIAMOND]: 3,
};

export const BOX_FEATURES = {
  [BOX_NAMES?.PEARL]: {
    price: 25,
    url: `/img/boxes/${BOX_NAMES?.PEARL}.png`,
    possibleNFT: {
      [NFT_TYPES?.COMMON]: 55,
      [NFT_TYPES?.UNCOMMON]: 43,
      [NFT_TYPES?.RARE]: 2,
    },
    examples: ["C", "U", "R"],
  },
  [BOX_NAMES?.SAPPHIRE]: {
    price: 100,
    url: `/img/boxes/${BOX_NAMES?.SAPPHIRE}.png`,
    possibleNFT: {
      [NFT_TYPES?.UNCOMMON]: 60,
      [NFT_TYPES?.RARE]: 38,
      [NFT_TYPES?.EPIC]: 2,
    },
    examples: ["U", "R", "E"],
  },
  [BOX_NAMES?.DIAMOND]: {
    price: 250,
    url: `/img/boxes/${BOX_NAMES?.DIAMOND}.png`,
    possibleNFT: {
      [NFT_TYPES?.RARE]: 60,
      [NFT_TYPES?.EPIC]: 35,
      [NFT_TYPES?.LEGENDARY]: 5,
    },
    examples: ["R", "E", "L"],
  },
};
