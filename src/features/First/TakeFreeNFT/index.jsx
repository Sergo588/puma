import React from "react";
import { ActivateModal, TakeFreeNFTModal } from "components/Modals";
import { useModal } from "helpers/hooks/useModal";
import { useWeb3React } from "@web3-react/core";

export const TakeFreeNFT = () => {
  const { account } = useWeb3React();

  const {
    openedModal: takeNftModalOpen,
    onOpen: takeNftModalOnOpen,
    onClose: takeNftModalOnClose,
  } = useModal();

  const {
    openedModal: activateModalOpened,
    onOpen: activateModalOnOpen,
    onClose: activateModalOnClose,
  } = useModal();

  const onClickButton = () => {
    if (!account) {
      activateModalOnOpen();
    } else {
      takeNftModalOnOpen();
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div
        onClick={onClickButton}
        className="bg-darkViolet rounded-[20px] text-phlox cursor-pointer font-good-timing text-[18px] leading-[27px] flex items-center justify-center group hover:bg-darkViolet500 sm:w-full"
      >
        <img
          className="h-[135px] ml-[-20px] my-[-20px]"
          src="img/takeFreeNFT-group.png"
          alt=""
        />
        <div className="py-[30px] pr-16 sm:pr-[30px]">
          <div className="relative">
            <span>{!account ? "Connect wallet" : "Take Free NFT"}</span>
            <div className="absolute bottom-0 group-hover:block hidden w-full h-[1.5px] bg-phlox" />
          </div>
        </div>
      </div>
      {takeNftModalOpen && (
        <TakeFreeNFTModal
          openedModal={takeNftModalOpen}
          onClose={takeNftModalOnClose}
        />
      )}
      {activateModalOpened && (
        <ActivateModal
          openedModal={activateModalOpened}
          handleCloseModal={activateModalOnClose}
        />
      )}
    </div>
  );
};
