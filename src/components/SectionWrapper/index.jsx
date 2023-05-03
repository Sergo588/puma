import React from 'react';

export const SectionWrapper = ({ children, className }) => {
  return (
    <div className={`flex flex-col items-center w-full sm:h-full ${className}`}>
      <div className="flex flex-col w-full max-w-desktop-full sm:h-full">{children}</div>
    </div>
  );
};
