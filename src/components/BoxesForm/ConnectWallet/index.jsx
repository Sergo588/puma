import React from "react";
import ConnectWalletIcon from "assets/icons/wallet_connect.svg";
import { Button } from "components";
import { useModal } from "helpers/hooks/useModal";
import { ActivateModal } from "components/Modals";

export const ConnectWallet = () => {
  const { onOpen, openedModal, onClose } = useModal();

  return (
    <>
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col items-center w-[377px]">
          <ConnectWalletIcon className="flex-shrink-0" />
          <span className="text-lightViolet font-bold text-[26px] mt-5">
            Wallet connect
          </span>
          <span className="text-base  text-center mt-5">
            Connect your wallet to purchase NFT boxes
          </span>
          <Button
            onClick={onOpen}
            type="phlox"
            className="font-good-timing flex-shrink-0 max-w-full w-[200px] mt-5 !rounded-[40px] !py-4"
          >
            Connect wallet
          </Button>
        </div>
      </div>
      <ActivateModal openedModal={openedModal} handleCloseModal={onClose} />
    </>
  );
};
