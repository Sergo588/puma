import { useState } from "react";
import { useGetContract } from "helpers/hooks/useGetContract";
import { CONTRACT_NAMES } from "helpers/constants";

export const useCheckBalanceForBox = () => {
  const { getContract } = useGetContract();

  const [isLoadingCheckBalance, setIsLoadingCheckBalance] = useState(false);
  const [isDoneCheckBalance, setIsDoneCheckBalance] = useState(false);
  const [hasBalance, setHasBalance] = useState(false);

  const onCheckBalance = async (address, summ) => {
    if (!isLoadingCheckBalance) {
      setIsLoadingCheckBalance(true);
      setIsDoneCheckBalance(false);

      try {
        const contract = await getContract(CONTRACT_NAMES.BUSD_TOKEN);
        let balanceBusd = await contract.balanceOf(address);

        balanceBusd = parseInt(balanceBusd) / 1e18;

        setHasBalance(summ <= balanceBusd);
      } catch (e) {
        setHasBalance(false);
      }

      setIsLoadingCheckBalance(false);
      setIsDoneCheckBalance(true);
    }
  };

  return {
    hasBalance,
    isLoadingCheckBalance,
    isDoneCheckBalance,
    onCheckBalance,
  };
};
