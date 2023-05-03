import React, { useMemo } from "react";
// import {useRive} from '@rive-app/react-canvas';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Rive from "@rive-app/react-canvas";
import { ProgressLoadingNumbers } from "features";

export const Loading = ({ isHaveResult }) => {

  const renderCarousel = () => {
    return (
      <Carousel 
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        autoPlay 
        interval={1500}
        fade={true}
        className="fade absolute rounded-full w-[135px] h-[135px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden"
      >
        {['C', 'U', 'R', 'E', 'L'].map((rarity, indexRarityMap) => 
          Array.from(new Array(6)).map((v, indexMap) => (
            <img src={`/img/boxes/examples/${rarity}${indexMap + 1}.png`} key={indexMap} alt={`loader_${indexMap}`} />
          ))   
        )}
      </Carousel>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="relative">
        <Rive
          className="w-[350px] h-[350px] sm:w-[325px] sm:h-[325px]"
          src="/animations/mint_loader.riv"
        />
        {renderCarousel()}
        {/* <div className="absolute rounded-full w-[135px] h-[135px] bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div> */}
       </div>
      <div className="flex flex-col items-center justify-center font-good-timing pt-[30px] pb-[50px]">
        <span className="text-xl text-xl font-bold uppercase">Minting</span>
        <ProgressLoadingNumbers isHaveResult={isHaveResult} />
      </div>
    </div>
  );
};
