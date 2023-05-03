import React, { useMemo } from "react";
import Rive from "@rive-app/react-canvas";

export const Animations = ({ isLoading, isMinted, isFreeBox }) => {

  const renderImg = useMemo(() => {
    if (isFreeBox) {
      return (
        <img
          src="/img/Sapphire-darkened.png"
          className="h-[225px] sm:h-[125px]"
          alt=""
        />
      )
    } else {
      return (
        <>
          <img
            src="/img/loading_free_nft_border.png"
            className="h-[275px] sm:h-[150px]"
            alt=""
          />
          <div className="">

          </div>
        </>
      )
    }
  }, [isFreeBox])
  
  const renderAnimation = useMemo(() => {
      if (isLoading) {
        return <Rive
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125px] h-[125px] sm:w-[75px] sm:h-[75px]"
        src="/animations/loader_paw.riv"
      />
      } else {
        if (isMinted) {
          return <Rive
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125px] h-[125px] sm:w-[75px] sm:h-[75px]"
          src="/animations/loaded_agree.riv"
        />
        } else {
          return <Rive
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125px] h-[125px] sm:w-[75px] sm:h-[75px]"
          src="/animations/loader_paw.riv"
        />
        }
      }
  }, [isLoading, isMinted])

  return (
    <div className="relative">
      <div className="relative h-[300px] flex justify-center items-center sm:h-[150px]">
        {renderAnimation}
        {renderImg}      
      </div>
    </div>
  );
}