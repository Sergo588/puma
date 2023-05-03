import React, { useMemo, useRef, useState } from "react";
import { SectionWrapper, BoxesForm, Button, CustomLink } from "components";
import { TitleWrapper } from "components/SectionWrapper/TitleWrapper";
import ArrowRightIcon from "assets/icons/arrow-right-pink.svg";
import { BoxesCountDown } from "components/BoxesForm/BoxesCountDown";
import { isSameOrBefore } from "helpers/dates";
import { fromUnixTime } from "date-fns";
import { NFT_SALE_END } from "helpers/constants";
import OpenSeaLogo from 'assets/otherLogo/openSea.svg';

export const First = () => {
  const [currentBoxType, setCurrentBoxType] = useState(null);
  const [countDownFinished, setCountDownFinished] = useState(
    isSameOrBefore(fromUnixTime(NFT_SALE_END))
  );

  const styleForInfoBlock = !!currentBoxType ? "sm:hidden" : "sm:mb-10";
  const styleForFuncBlock = !!currentBoxType ? "sm:h-screen" : "";
  const refBoxesWrapper = useRef(null);

  const buttonHandler = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const finalText = useMemo(() => {
    if (countDownFinished) {
      return {
        title1: 'NFT mint',
        title2: 'is over',
        desc: () => (
          <>
            As of now, the emission has stopped. No more new NFT can be minted.
            From now on, the only way to get extra NFT is to purchase it directly from other holders at marketplaces.
          </>
        )
      }
    } 
    return {
      title1: 'Open a box',
      title2: 'and get your NFT',
      desc: () => (
        <>
          Puma Labs is a decentralised hub for DeFi tools. <br />
          It features easy-to-use apps for working with NFT.
        </>
      )
    }
  }, [countDownFinished])

  const actionButton = useMemo(() => {
    if (countDownFinished) {
      return (
        <CustomLink 
          href='/overview'
        >
          <Button
            type="phloxRounded"
            onClick={() => buttonHandler(refBoxesWrapper)}
            className="flex items-between max-w-[250px] font-good-timing font-bold sm:max-w-full w-full"
          >
            <div className="flex items-center justify-start flex-1 pl-2.5">
              <span className="flex flex-1 text-center items-center justify-center">
                View your NFTs
              </span>
            </div>
              
            <ArrowRightIcon className="w-10 h-10" />
          </Button>
        </CustomLink>
      )
    }
    return (
      <Button
        type="phloxRounded"
        onClick={() => buttonHandler(refBoxesWrapper)}
        className="hidden sm:flex min-w-[206px] font-good-timing font-bold mb-16 max-w-full w-full"
      >
        <span className="flex flex-1 text-center items-center justify-center">
          Buy NFT
        </span>
        <ArrowRightIcon className="w-10 h-10" />
      </Button>
    )
  }, [countDownFinished])

  return (
    <SectionWrapper className="items-center ">
      <div className="flex items-center justify-center w-full space-x-12 sm:flex-col sm:space-x-0 sm:flex-1">
        <div
          className={`flex flex-col max-w-[600px] w-full flex-1 sm:max-w-full sm:px-5 sm:flex-auto ${countDownFinished ? 'sm:min-h-[70vh]' : 'sm:min-h-[80vh]'}  sm:justify-end sm:h-full ${styleForInfoBlock}`}
        >
          {!countDownFinished && (
            <BoxesCountDown
              onFinished={() => setCountDownFinished(true)}
              styles="w-full hidden justify-center mt-24 mb-10 sm:flex"
            />
          )}
          <TitleWrapper className="mb-5 uppercase">
            <span className="title-gradient">{finalText?.title1} </span>
            <span className="text-[42px] leading-[50px] sm:text-3xl sm:leading-[36px]">
              {finalText?.title2}
            </span>
          </TitleWrapper>
          <span className="w-full mb-10 max-w-[533px] text-[18px] leading-[24px] text-lightWhite sm:text-sm sm:leading-[21px] sm:text-center">
            {finalText?.desc()}
          </span>
          {actionButton}
        </div>
        <div
          className={`relative flex h-full flex-col flex-1 sm:w-full ${styleForFuncBlock}`}
          ref={refBoxesWrapper}
        >
          <BoxesForm
            countDownFinished={countDownFinished}
            currentBoxType={currentBoxType}
            setCurrentBoxType={setCurrentBoxType}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
