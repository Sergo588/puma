import React from 'react';
import { Header, SupportWidget } from 'components';

export const DefaultLayout = ({ children }) => {
  return (
    <div className="relative h-screen w-full flex flex-col bg-mainBg overflow-x-hidden">
      <Header />
      <div className="z-10 flex flex-col flex-1 w-full justify-center items-center text-white px-5 sm:px-0">{children}</div>
      <img src='/img/backgrounds/desktop.png' className='z-0 absolute h-full top-0 left-0 sm:hidden' />
      <SupportWidget />
    </div>
  );
};
