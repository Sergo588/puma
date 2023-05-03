import React from "react";
import { Button } from "components";

export const Item = ({ name, price, imgUrl, possibleNFT, onClick }) => {
  const possibleTitles = () => {
    return Object.keys(possibleNFT)?.map((item, itemIndex) => {
      return (
        <div className="flex items-center sm:text-base" key={itemIndex}> 
          <span className="sm:hidden mr-1 sm:mr-0"> {itemIndex !== 0 && '|'} </span>
          <span className="hidden sm:block sm:mr-1">&#x2022;</span>
          {item}
        </div>
      ) ;
    });
  };

  const buyButton = () => {
    return (
        <Button className="!mt-3.5 font-good-timing w-full flex flex-col items-center justify-center text-center w-full !max-w-full sm:text-base sm:leading-[22px]" type="borderPhloxRounded">
          <span>Open Box</span>
          <span>{price} BUSD</span>
        </Button>
    )
  }

  return (
    <div onClick={onClick} className="flex flex-1 items-center w-full sm:flex-col">
      <div className="flex w-full items-center justify-start">      
        <div className="flex items-center justify-center flex-shrink-0">
          <img className="w-[180px] px-[15px] sm:pr-[30px] sm:w-[180px] sm:h-[145px]" src={imgUrl} alt="" />
        </div>
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex flex-col justify-start items-start space-y-1.5 max-w-[250px] w-full">
            <span className="font-good-timing text-lightPurple2 text-xl sm:text-2xl">
              {name}
            </span>
            <div className="flex text-sm space-x-1 sm:flex-col sm:space-x-0 sm:space-y-0">{possibleTitles()}</div>
            <div className="sm:hidden">{buyButton()}</div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex w-full sm:mt-2.5">
        {buyButton()}
      </div>
    </div>
  );
};
