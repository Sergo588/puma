import React from "react";
import { Item } from "./Item";
import { BOX_FEATURES } from "helpers/boxInfo";

export const BoxList = ({ onClickBoxItem }) => {
  return (
    <div className="flex flex-col w-full flex-1 space-y-5 sm:px-5">
      {Object.keys(BOX_FEATURES)?.map((item, itemIndex) => {
        const price = BOX_FEATURES?.[item]?.price;
        const listNFT = BOX_FEATURES?.[item]?.possibleNFT;
        const imgUrl = BOX_FEATURES?.[item]?.url;
        
        return (
          <Item
            onClick={() => onClickBoxItem(item)}
            name={item}
            price={price}
            possibleNFT={listNFT}
            key={itemIndex}
            imgUrl={imgUrl}
          />
        );
      })}
    </div>
  );
};
