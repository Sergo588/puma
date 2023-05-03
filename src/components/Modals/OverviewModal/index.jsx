import React, { useMemo, useEffect } from "react";
import { Modal } from "components";
import { useRequest } from "helpers/hooks/useRequest";
import { NftRepository } from "connectors/repositories/nft";


export const OverviewModal = ({ isSearching = false, searchingId, result = [], openedModal, handleCloseModal }) => {
  const { data, isLoading, call } = useRequest(NftRepository.getNft(searchingId));

  useEffect(() => {
    if (searchingId) {
      call();
    }
  }, [searchingId])

  const finalResult = useMemo(() => {
    if (isSearching) {

    } else {
      return {
        image: result?.image, 
        name: result?.name, 
        desc: result?.description, 
      }
    }
    
  }, [isSearching, result])

  return (
    <Modal
      isOpened={openedModal}
      onClose={handleCloseModal}
      className="!w-[412px]"
    >
      <div className="flex flex-col items-center justify-center border-gradient p-1 sm:p-0 w-full rounded-[65px] sm:h-full sm:rounded-none sm:!bg-transparent">
        <div className="flex flex-col justify-center items-center w-full rounded-[60px] sm:rounded-none py-[50px] bg-russianViolet text-white flex-1">
          <img className="w-[140px] h-[140px]" src={finalResult?.image} alt="" />
          <div className="flex flex-col items-left">
            <span>{finalResult?.description}</span>
            <span>{finalResult?.name}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}