import React from "react";
import { useModal } from "helpers/hooks/useModal";
import { OverviewModal } from "components/Modals";

export const OverviewCard = ({ result }) => {
  // const { openedModal, onOpen, onClose } = useModal();
  return (
    <div className="nftCard-lineGradient flex items-center justify-center rounded-[40px] overflow-hidden">
      <img src={result?.image} className="h-[240px] w-[240px] sm:h-[150px] sm:w-[150px]" alt="" />
      {/* <OverviewModal result={result} openedModal={openedModal} handleCloseModal={onClose} /> */}
    </div>
  )
}