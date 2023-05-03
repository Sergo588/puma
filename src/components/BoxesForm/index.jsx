import React, { useMemo, useState } from "react";
import { CurrentBox } from "./CurrentBox";
import { BoxList } from "./BoxList";
import { BOX_FEATURES } from "helpers/boxInfo";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "components/BoxesForm/ConnectWallet";
import { BoxesCountDown } from "components/BoxesForm/BoxesCountDown";
import { isSameOrBefore } from "helpers/dates";
import { fromUnixTime } from "date-fns";
import { NFT_SALE_END } from "helpers/constants";
import { CustomLink } from "components/CustomLink";

export const BoxesForm = ({ currentBoxType, setCurrentBoxType }) => {
  const { account } = useWeb3React();
  const [countDownFinished, setCountDownFinished] = useState(
    isSameOrBefore(fromUnixTime(NFT_SALE_END))
  );

  const renderContent = useMemo(() => {
    if (countDownFinished) {
      return (
        <div className="flex flex-col w-full space-y-5 sm:px-5">
          <CustomLink className="w-full" href={'https://opensea.io/collection/puma-labs'} targetBlank>
            <img className="w-full" src="/img/marketplaces/openSea.png" alt="" />
          </CustomLink>
          <div className="relative w-full">
            <span className="text-2xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-[90%]">Coming soon</span>
            <img className="w-full" src="/img/marketplaces/binance.png" alt="" />
          </div>
        </div>
      )
    } else {
      if (!account) {
        return <ConnectWallet />;
      }
  
      if (currentBoxType) {
        return (
          <CurrentBox
            onClickAnotherBox={setCurrentBoxType}
            box={{ ...BOX_FEATURES[currentBoxType], type: currentBoxType }}
            onBack={() => setCurrentBoxType(null)}
            isFinishedTimer={countDownFinished}
          />
        );
      }
  
      return <BoxList onClickBoxItem={setCurrentBoxType} />;
    }
    
  }, [account, setCurrentBoxType, currentBoxType, countDownFinished]);

  return (
    <div
      className={`h-full flex flex-col max-h-[90vh] sm:min-h-auto overflow-auto w-full max-w-[525px] ${countDownFinished ? '!min-h-auto sm:max-h-auto' : 'min-h-[650px] sm:max-h-full bg-darkPurple2'}  px-[30px] py-10 rounded-5 z-10 sm:rounded-none sm:max-w-full sm:px-0 ${
        currentBoxType ? "sm:pt-[65px]" : ""
      }`}
    >
      {account && !countDownFinished && !currentBoxType && (
        <BoxesCountDown
          onFinished={() => setCountDownFinished(true)}
          styles="w-full flex justify-center mb-5 sm:hidden"
        />
      )}
      {renderContent}
    </div>
  );
};
