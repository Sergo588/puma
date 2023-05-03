import React from 'react';

export const TitleWrapper = ({ className, children, isCenterAlign }) => {
  return (
    <div
      className={`uppercase flex flex-col text-white font-semibold font-good-timing text-[60px] leading-[66px] sm:text-3xl sm:leading-[36px] sm:items-center ${
        isCenterAlign ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </div>
  );
};
