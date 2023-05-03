import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useGetContract } from "helpers/hooks/useGetContract";
import { CONTRACT_NAMES } from "helpers/constants";

export const useCheckFreeBox = () => {
  const { account } = useWeb3React();
  const { getContract } = useGetContract();

  const [checkFreeBoxStates, setCheckFreeBoxStates] = useState({
    isLoading: false,
    isAllow: false,
    isMinted: false,
    isDone: false,
  });

  const checkFreeBox = async () => {
    if (!checkFreeMintStates.isLoading) {
      try {
        setCheckFreeBoxStates((prev) => ({ ...prev, isLoading: true }));

        const contract = await getContract(CONTRACT_NAMES.NFT_ROUTER);
        const isAllow = await contract.checkFreeBoxForLevel5Allowed(account);
        const isMinted = await contract.freeMintForLevel5Used(account);

        setCheckFreeBoxStates((prev) => ({ ...prev, isAllow, isMinted }));
      } catch (e) {}

      setCheckFreeBoxStates((prev) => ({
        ...prev,
        isDone: true,
        isLoading: false,
      }));
    }
  };

  return {
    checkFreeBox,
    checkFreeBoxStates,
  };
};
