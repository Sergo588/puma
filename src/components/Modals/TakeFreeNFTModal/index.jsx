import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "components";
import { useCheckFreeMint } from "helpers/hooks/useCheckFreeMint";
import { useWeb3React } from "@web3-react/core";
import { useMint } from "helpers/hooks/useMint";
import { Mint } from "components/Mint";
import config from "helpers/config";
import { useCheckUserIsExists } from "helpers/hooks/useCheckUserIsExists";
import { Animations } from "./Animations";

export const TakeFreeNFTModal = ({ openedModal, onClose }) => {
  const { account, chainId } = useWeb3React();
  const isAllowedChainId = chainId === config.allowedChainId;

  const { checkFreeMintStates, checkFreeMint } = useCheckFreeMint();
  const { isExistAccount, isLoadingUserExists, checkAccountExist } =
    useCheckUserIsExists();

  const allChecksLoading =
    checkFreeMintStates?.isLoading || isLoadingUserExists;

  const {
    onMintBox,
    isLoadingBox,
    isMinting,
    mintResult,
    isErrorBox,
    onClear,
    showResult,
  } = useMint();

  useEffect(() => {
    if (account) {
      checkFreeMint();
      checkAccountExist(account);
    }
  }, [account]);

  const modalWidth = isMinting || mintResult || isErrorBox || showResult ? '' : '!max-w-[900px] sm:!max-w-full';

  const renderContent = useMemo(() => {
    if (isMinting || mintResult || isErrorBox || showResult) {
      return (
        <Mint
          closeModal={() => onClose()}
          isLoading={isLoadingBox}
          isMinting={isMinting}
          result={mintResult}
          isError={isErrorBox}
          showResult={showResult}
          onTryAgain={() => onMintBox(null, true)}
          onClear={onClear}
          errorTitle="Check again"
        />
      );
    }

    return (
      <div className="relative flex items-center px-5 w-full justify-around sm:flex-col sm:px-0">
        <div className="flex flex-col items-center">
          <div className="relative pb-[50px] px-10">      
            <Animations
              isLoading={allChecksLoading}
              isMinted={checkFreeMintStates.isMintedNft}
            />
            {!allChecksLoading && (
              <>
                <div className="absolute bottom-[-16px] text-center left-1/2 -translate-x-1/2 max-w-[225px] w-full sm:text-xs">
                  {!isExistAccount && (
                    <span className="font-semibold text-rareNft max-h-[100px] h-full">
                      Register in Forsage BUSD and activate 1 more level <br />{" "}
                      and mint you NFT
                    </span>
                  )}
                  {isExistAccount && checkFreeMintStates.isMintedNft && (
                    <span className="font-semibold text-rareNft">
                      Free mint
                      <br />
                      already used
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          
            <Button
              className="mt-8 max-w-[242px] w-full !px-5"
              type="purpleRounded"
              onClick={() => onMintBox(null, true)}
              disabled={
                allChecksLoading ||
                checkFreeMintStates.isMintedNft ||
                !checkFreeMintStates.isDone ||
                !isAllowedChainId ||
                !isExistAccount
              }
            >
              {allChecksLoading
                ? "Loading..."
                : !isExistAccount
                ? "Mint nft unavailable"
                : checkFreeMintStates.isMintedNft
                ? "Already minted"
                : "Take free nft"}
            </Button>
          </div>
          <div className="absolute bottom-5 w-[160px] flex items-center sm:relative sm:bottom-auto sm:pt-3.5 sm:pb-2.5"> 
              <div className="border-t border-purpleNavy flex-1" />
              <span className="px-2.5 font-good-timing font-xl">OR</span>
              <div className="border-t border-purpleNavy flex-1" />
          </div>
          <div className="flex flex-col items-center">
            <div className="relative pb-[50px] px-10">    
              <Animations
                isFreeBox
                isLoading={allChecksLoading}
                isMinted={checkFreeMintStates.isMintedBox}
              />
              {!allChecksLoading && (
                <>
                  <div className="absolute bottom-[-16px] text-center left-1/2 -translate-x-1/2 max-w-[225px] w-full sm:text-xs">
                    {!checkFreeMintStates.isAllowedBox && (
                      <span className="font-semibold text-rareNft max-h-[100px] h-full">
                        Activate 5 levels in all programs(x3,x4,xXx,xGold) <br />
                        and mint you NFT Box
                      </span>
                    )}
                    {isExistAccount && checkFreeMintStates.isMintedBox && (
                      <span className="font-semibold text-rareNft">
                        Free Box mint
                        <br />
                        already used
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            
              <Button
                className="mt-8 max-w-[242px] w-full !px-5"
                type="purpleRounded"
                onClick={() => onMintBox(null, false, true)}
                disabled={
                  allChecksLoading ||
                  checkFreeMintStates.isMintedBox ||
                  !checkFreeMintStates.isDone ||
                  !isAllowedChainId ||
                  !checkFreeMintStates.isAllowedBox
                }
              >
                {allChecksLoading
                  ? "Loading..."
                  : !checkFreeMintStates.isAllowedBox
                  ? "Mint Box unavailable"
                  : checkFreeMintStates.isMintedBox
                  ? "Already minted Box"
                  : "Take free Box"}
              </Button>
            </div>
          </div>
    );
  }, [
    checkFreeMintStates,
    isErrorBox,
    isLoadingBox,
    isMinting,
    mintResult,
    showResult,
    isExistAccount,
    allChecksLoading,
  ]);

  return (
    <Modal
      className={`${modalWidth} w-full flex items-center justify-center sm:h-screen`}
      isOpened={openedModal}
      onClose={onClose}
    >
      <div className="flex flex-col items-center justify-center border-gradient p-1 sm:p-0 w-full rounded-[65px] sm:h-full sm:rounded-none sm:!bg-transparent">
        <div className="flex flex-col justify-center items-center w-full rounded-[60px] sm:rounded-none py-[50px] bg-russianViolet text-white flex-1">
          {renderContent}
        </div>
      </div>
    </Modal>
  );
};
