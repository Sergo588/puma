import React from "react";
import { Button } from "components";
import ErrorIcon from "assets/icons/error-circle.svg";

export const Error = ({ onTry, errorTitle, onErrorReturnCallback }) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex-1 flex flex-col items-center justify-center mb-[30px]">
        <ErrorIcon className="w-[125px]" />
        <div className="flex flex-col text-center items-center justify-center sm:space-y-1.5">
          <span className="text-2xl font-bold">Minting error</span>
          <span className="text-base ">Something went wrong</span>
        </div>
      </div>
      <div className="flex space-x-2.5 sm:flex-col sm:space-y-2.5 sm:space-x-0 sm:w-full sm:items-center sm:px-5">
        <Button
          onClick={onTry}
          type="phloxRounded"
          className="min-w-[200px] !py-4 sm:w-full sm:!max-w-full"
        >
          Try again
        </Button>

        <Button
          onClick={onErrorReturnCallback}
          type="phloxBordered"
          className="min-w-[200px] !py-4 sm:w-full sm:!max-w-full"
        >
          {errorTitle}
        </Button>
      </div>
    </div>
  );
};
