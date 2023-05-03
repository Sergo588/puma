import React from "react";
import { WALLETS } from "connectors/wallets";
import { useTryActivation } from "helpers/hooks/useTryActivation";
import { useTranslation } from "next-i18next";
import { Modal } from "components";

export const ActivateModal = ({ openedModal, handleCloseModal }) => {
  const { tryActivation } = useTryActivation();
  const { t } = useTranslation("common");

  const onWalletClick = (wallet) => () => {
    tryActivation(wallet.connector);
    handleCloseModal();
  };

  return (
    <Modal
      isOpened={openedModal}
      onClose={handleCloseModal}
      className="!w-[412px]"
    >
      <div className="flex flex-col items-center justify-start w-full p-10 bg-blackMain rounded-5 sm:rounded-none sm:bg-blackMain sm:p-5 sm:pt-20">
        <span className="swap_title-gradient text-2xl font-bold text-center uppercase text-lightViolet">
          {t("connectWallet")}
        </span>
        <div className="flex w-full flex-col overflow-auto mt-5 space-y-3.5">
          {WALLETS?.map((wallet) => {
            const Icon = wallet.icon;

            return (
              <div
                className="flex w-full p-4 cursor-pointer items-center rounded-2.5 bg-darkViolet hover:bg-darkPurple sm:text-sm sm:py-2.5"
                onClick={onWalletClick(wallet)}
                key={wallet.title}
              >
                {Icon && (
                  <Icon className="bg-white rounded-full flex-shrink-0 w-7.5 h-7.5" />
                )}
                <div className="flex flex-col ml-5">
                  <span className="text-base text-lightViolet">
                    {wallet.title}
                  </span>
                  <span className="text-sm text-lightPurpleDescription">
                    {wallet.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
