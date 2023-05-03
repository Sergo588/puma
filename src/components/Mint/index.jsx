import React, { useMemo } from "react";
import { Loading } from "./Loading";
import { Result } from "./Result";
import { Error } from "./Error";

export const Mint = ({
  isLoading,
  isMinting,
  isError,
  result,
  onTryAgain,
  onClear,
  showResult,
  closeModal,
  errorTitle,
}) => {
  return useMemo(() => {
    if (isMinting || (result && !showResult)) {
      return <Loading isHaveResult={!!result} />;
    }

    if (isError) {
      return (
        <Error
          errorTitle={errorTitle}
          onErrorReturnCallback={onClear}
          onTry={onTryAgain}
        />
      );
    }

    if (showResult) {
      return (
        <Result result={result} onClear={onClear} closeModal={closeModal} />
      );
    }

    return null;
  }, [
    isLoading,
    result,
    isMinting,
    isError,
    showResult,
    closeModal,
    errorTitle,
  ]);
};
