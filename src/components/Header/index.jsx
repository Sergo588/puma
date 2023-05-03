import React, { useState, useMemo } from 'react';
import Logo from 'assets/logoWithText.svg';
import { Button, CustomLink } from 'components';
import { shortenAddress } from 'helpers/format';
import { useWeb3React } from '@web3-react/core';
import { OverviewModal } from 'components/Modals';
import { useModal } from 'helpers/hooks/useModal';
import { ActivateModal } from 'components/Modals';

export const Header = ({ isOverviewPage = false }) => {
  const { account } = useWeb3React();
  const { openedModal, onOpen, onClose } = useModal();
  const [searchingId, setSearchingId] = useState(null);


  const connectWalletBtn = useMemo(() => {
    if (account) {
      return <div className="bg-darkViolet h-[40px] rounded-[40px] flex items-center justify-center px-5">{shortenAddress(account)}</div>
    }
    return <div onClick={() => activateModalOnOpen()} className="cursor-pointer hover:bg-russianViolet bg-darkViolet h-[40px] rounded-[40px] flex items-center justify-center px-5"> Connect wallet </div>
  }, [account])

  const {
    openedModal: activateModalOpened,
    onOpen: activateModalOnOpen,
    onClose: activateModalOnClose,
  } = useModal();

 
  return (
    <header className="fixed top-0 bg-transparent text-white w-full py-5 px-5 flex item-center justify-center z-40 sm:py-2.5">
      <div className="max-w-desktop-full w-full flex items-center justify-between">
        <CustomLink href='/' className="flex items-center space-x-2 font-good-timing py-3">
          <Logo className="h-[22px] sm:h-5" />
        </CustomLink>
        {isOverviewPage && (
          <>
            <div className="flex items-center justify-end space-x-5">
              {/* <div className="bg-darkViolet rounded-[40px] flex items-center">
                <div className="h-[40px] flex items-center py-[5px] pl-4 pr-[5px] space-x-[5px]">
                  <img src="/icons/search.svg" alt="" />
                  <div className="flex items-center bg-white-100 rounded-[40px]">
                    <input className="text-sm bg-transparent" type="text" />
                    <Button onClick={onOpen} className='text-xs !py-1.5 !rounded-[40px]'>Search</Button>
                  </div>
                </div>
              </div> */}
              {connectWalletBtn}
            </div>
            <OverviewModal isSearching searchingId={1} openedModal={openedModal} handleCloseModal={onClose} />
          </>
        )}
      </div>
      {activateModalOpened && (
        <ActivateModal
          openedModal={activateModalOpened}
          handleCloseModal={activateModalOnClose}
        />
      )}
    </header>
  );
};
