import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useGetContract } from "helpers/hooks/useGetContract";
import { CONTRACT_NAMES } from "helpers/constants";

export const useCheckFreeMint = () => {
  const { account } = useWeb3React();
  const { getContract } = useGetContract();

  const [checkFreeMintStates, setCheckFreeMintStates] = useState({
    isLoading: false,
    isDone: false,
    isMintedNft: false,
    isMintedBox: false,
    isAllowedBox: false,
  });

  const checkFreeMint = async () => {
    if (!checkFreeMintStates.isLoading) {
      try {
        setCheckFreeMintStates((prev) => ({ ...prev, isLoading: true }));

        const contract = await getContract(CONTRACT_NAMES.NFT_ROUTER);

        const isMintedNft = await contract.freeMintUsed(account);
        const isAllowedBox = await contract.checkFreeBoxForLevel5Allowed(account);
        const isMintedBox = await contract.freeMintForLevel5Used(account);

        setCheckFreeMintStates((prev) => ({ ...prev, isMintedNft, isMintedBox, isAllowedBox }));
      } catch (e) {}

      setCheckFreeMintStates((prev) => ({
        ...prev,
        isDone: true,
        isLoading: false,
      }));
    }
  };

  return {
    checkFreeMint,
    checkFreeMintStates,
  };
};
