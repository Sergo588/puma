import React from "react";
import { Button, CardNFT } from "components";

export const Result = ({ onClear, result, closeModal }) => {

  const isModal = typeof (closeModal) === "function";

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-5">
      <span className="uppercase title-gradient font-bold text-4xl font-good-timing">
        Your NFT
      </span>
      <CardNFT result={result} />
      <Button
        onClick={isModal ? closeModal : onClear}
        type="phloxRounded"
        className="min-w-[200px] sm:!mt-10 !py-4"
      >
        Return to boxes
      </Button>
    </div>
  );
};
