import ArrowLeftLongIcon from "assets/icons/arrow_left_long.svg";
import { Button } from "components";
import { useEffect, useMemo, useState } from "react";
import { BOX_FEATURES, BOX_NAME_TO_CONTRACT_TYPE } from "helpers/boxInfo";
import { useMint } from "helpers/hooks/useMint";
import { Mint } from "components/Mint";
import { useWeb3React } from "@web3-react/core";
import config from "helpers/config";
import { useApprove } from "helpers/hooks/useApprove";
import { useCheckBalanceForBox } from "helpers/hooks/useCheckBalanceForBox";

export const CurrentBox = ({
  onBack,
  box,
  onClickAnotherBox,
  isFinishedTimer,
}) => {
  const { chainId, account } = useWeb3React();

  const {
    isLoadingCheckBalance,
    hasBalance,
    onCheckBalance,
    isDoneCheckBalance,
  } = useCheckBalanceForBox();

  const {
    onMintBox,
    isErrorBox,
    isLoadingBox,
    mintResult,
    onClear,
    isMinting,
    showResult,
  } = useMint();

  const {
    onCheckApprove,
    isLoadingApprove,
    isWaitingApprove,
    isApproved,
    callApprove,
    isLoadingCheckApproveBusd,
  } = useApprove();

  const isLoadingOrNotDone =
    !isFinishedTimer ||
    isLoadingBox ||
    isLoadingCheckApproveBusd ||
    isWaitingApprove ||
    isLoadingApprove ||
    isLoadingCheckBalance;

  const isAllowedChainId = chainId === config.allowedChainId;

  const otherBoxes = useMemo(() => {
    const keys = Object.keys(BOX_FEATURES).filter((item) => item !== box.type);

    return keys.map((key) => ({ type: key, ...BOX_FEATURES[key] }));
  }, [box]);

  const onClickButton = () => {
    if (isApproved) {
      onMintBox(BOX_NAME_TO_CONTRACT_TYPE[box.type]);
    } else if (!isApproved) {
      callApprove();
    }
  };

  useEffect(() => {
    if (account) {
      onCheckApprove();
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      onCheckBalance(account, parseInt(box.price));
    }
  }, [account, box.price]);

  if (isMinting || mintResult || isErrorBox || showResult) {
    return (
      <Mint
        isLoading={isLoadingBox}
        isMinting={isMinting}
        showResult={showResult}
        result={mintResult}
        isError={isErrorBox}
        onTryAgain={onClickButton}
        onClear={onClear}
        errorTitle="Return to list"
      />
    );
  }

  return (
    <div className="relative flex flex-col flex-1 h-full">
      <div
        className="absolute top-[-10px] flex justify-start items-center cursor-pointer group sm:px-1.5 z-40"
        onClick={onBack}
      >
        <div className="flex itemsc-center justify-start py-2.5 px-4 group-hover:bg-darkViolet900 rounded-[10px]">
          <ArrowLeftLongIcon className="group-hover:fill-current group-hover:text-white" />
          <span className="ml-1.5 text-base leading-6 text-purpleNavy group-hover:text-white">
            Back
          </span>
        </div>
      </div>
      <div className="flex h-full relative w-full flex-col justify-center items-center sm:flex-1">
        <img
          alt={box.url}
          src={box.url}
          className="block h-[200px] sm:h-[175px]"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-start overflow-auto space-x-3 pb-5 sm:py-5 sm:px-5 sm:w-[calc(100vw - 10px)] hide-scroll">
          {BOX_FEATURES[box?.type]?.examples.map((item, itemIndex) =>
            Array.from(new Array(6)).map((v, indexMap) => (
              <img
                className="w-[50px] h-[50px] rounded-[10px]"
                src={`/img/boxes/examples/${item}${indexMap + 1}.png`}
                key={indexMap}
              />
            ))
          )}
        </div>

        <div className="flex w-full bg-darkViolet p-5 items-center rounded-5 sm:rounded-none sm:flex-col">
          <div className="flex w-full justify-center items-center sm:flex-col">
            <div className="flex flex-col flex-1 sm:w-full sm:border-b sm:border-purpleNavy sm:pb-5 sm:mb-5">
              <span className="uppercase text-xl leading-7 font-bold text-violet font-good-timing">
                {box.type} <br className="sm:hidden" /> BOX
              </span>
              <div className="flex flex-col mt-4 text-sm">
                {Object.keys(box.possibleNFT).map((key) => (
                  <li>
                    {key} - {box.possibleNFT[key]}%
                  </li>
                ))}
              </div>
            </div>
            <div className="w-1 border-l border-purpleNavy mx-[30px] h-full"></div>
            <div className="flex flex-col flex-1 sm:w-full">
              <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:ml-0 sm:w-full">
                <span className="text-white text-2xl leading-8 font-bold text-center">
                  {box.price} BUSD
                </span>
              </div>
              <Button
                disabled={
                  isLoadingOrNotDone || !isAllowedChainId || !hasBalance
                }
                onClick={onClickButton}
                type="phlox"
                className={`font-good-timing flex-shrink-0 max-w-full w-[200px] mt-2.5 !rounded-[40px] ${
                  !isLoadingOrNotDone && !isApproved ? "!py-2 sm:!py-4" : "!py-4"
                } sm:w-full ${
                  !hasBalance && !isLoadingCheckBalance && isDoneCheckBalance
                    ? "bg-redNotification"
                    : ""
                }`}
              >
                {isLoadingCheckApproveBusd ||
                isWaitingApprove ||
                isLoadingApprove ||
                isLoadingCheckBalance
                  ? "Loading..."
                  : isApproved
                  ? "Open Box"
                  : "Approve BUSD"}
              </Button>
              {!hasBalance && !isLoadingCheckBalance && isDoneCheckBalance && (
                <div className="flex flex-col sm:flex-row items-center justify-center text-center text-xs mt-2.5 text-redNotification">
                  <span>Not enough balance.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-2.5 sm:px-5 sm:pt-5">
          {otherBoxes.map((anotherBox) => (
            <div
              onClick={() => onClickAnotherBox(anotherBox.type)}
              key={anotherBox.type}
              className="flex mt-[30px] bg-darkViolet hover:bg-purpleNavy200 rounded-2xl px-4 py-3 flex-1 cursor-pointer sm:flex-col sm:items-center sm:justify-center sm:pt-8"
            >
              <div className="w-[75px] relative sm:flex-1">
                <img
                  className="absolute bottom-0 left-0 right-0 sm:right-auto sm:-left-1/2 sm:translate-x-1/2"
                  src={anotherBox.url}
                  alt={anotherBox.url}
                />
              </div>
              <div className="flex ml-2.5 text-sm uppercase text-violet font-bold font-good-timing sm:text-center sm:flex-col sm:ml-0 sm:mt-1.5">
                {anotherBox.type} <br /> BOX
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
