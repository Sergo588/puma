import { useState } from "react";
import { useGetContract } from "helpers/hooks/useGetContract";
import { CONTRACT_NAMES } from "helpers/constants";

export const useCheckUserIsExists = () => {
  const { getContract } = useGetContract();

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isExistAccount, setIsExistAccount] = useState(false);

  const checkAccountExist = async (address) => {
    if (!isLoading) {
      setIsLoading(true);
      setIsDone(false);

      try {
        const contract = await getContract(CONTRACT_NAMES.XBASE);

        if (address.match(/^0x[a-f0-9]{40}$/i)) {
          const result = await contract.isUserExists(address);

          const isActiveMoreOneX3 = await contract.usersActiveX3Levels(
            address,
            2
          );
          const isActiveMoreOneX4 = await contract.usersActiveX6Levels(
            address,
            2
          );

          setIsExistAccount(
            !!result && (isActiveMoreOneX3 || isActiveMoreOneX4)
          );
        } else {
          setIsExistAccount(false);
        }
      } catch (e) {
        setIsExistAccount(false);
      }

      setIsLoading(false);
      setIsDone(true);
    }
  };

  return {
    isLoadingUserExists: isLoading,
    isDoneUserExists: isDone,
    isExistAccount: isExistAccount,
    checkAccountExist,
  };
};
