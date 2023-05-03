import config from "helpers/config";
import { CONTRACT_NAMES, MAX_VALUE } from "helpers/constants";
import { useGetContract } from "helpers/hooks/useGetContract";
import { useState } from "react";
import { callNotification } from "helpers/notification";
import { useWeb3React } from "@web3-react/core";

export const useApprove = () => {
  const { account } = useWeb3React();

  const { getContract } = useGetContract();

  const [isApproved, setIsApproved] = useState(false);
  const [isLoadingApprove, setIsLoadingApprove] = useState(false);
  const [isDoneApprove, setIsDoneApprove] = useState(false);
  const [isWaitingApprove, setIsWaitingApprove] = useState(false);

  const [isLoadingCheckApproveBusd, setIsLoadingCheckApproveBusd] =
    useState(false);
  const [isDoneCheckApproveBusd, setIsDoneCheckApproveBusd] = useState(false);

  const callApprove = async (contractAddress = config.NFTLootBoxAddress) => {
    if (!isLoadingApprove) {
      setIsWaitingApprove(false);
      setIsLoadingApprove(true);
      setIsDoneApprove(false);
      setIsApproved(false);

      try {
        const contractToken = await getContract(CONTRACT_NAMES.BUSD_TOKEN);

        const result = await contractToken.approve(contractAddress, MAX_VALUE);

        setIsWaitingApprove(true);

        callNotification({
          type: "info",
          message: "Transaction was sent. Please wait",
          autoClose: 10000,
        });

        const waitResult = await result.wait();

        if (waitResult.status === 0) {
          setIsApproved(false);

          callNotification({
            type: "error",
            message:
              "Something went wrong with transaction. Please, try again.",
          });
        } else {
          setIsWaitingApprove(false);
          setIsApproved(true);
        }
      } catch (e) {
        setIsApproved(false);

        callNotification({
          type: "error",
          message: "Transaction rejected by user",
        });
      }

      setIsLoadingApprove(false);
      setIsDoneApprove(true);
      setIsLoadingApprove(false);
    }
  };

  const onCheckApprove = async (contractAddress = config.NFTLootBoxAddress) => {
    const MIN_BALANCE = parseInt(MAX_VALUE, 16);

    if (!isLoadingCheckApproveBusd) {
      setIsDoneCheckApproveBusd(false);
      setIsLoadingCheckApproveBusd(true);
      setIsApproved(false);

      try {
        const contractToken = await getContract(CONTRACT_NAMES.BUSD_TOKEN);
        const approveBalance = await contractToken.allowance(
          account,
          contractAddress
        );

        if (approveBalance >= MIN_BALANCE) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      } catch (e) {
        setIsApproved(false);
      }

      setIsLoadingCheckApproveBusd(false);
      setIsDoneCheckApproveBusd(true);
    }
  };

  return {
    isApproved,
    isDoneApprove,
    isWaitingApprove,
    isLoadingApprove,
    isDoneCheckApproveBusd,
    isLoadingCheckApproveBusd,
    callApprove,
    onCheckApprove,
  };
};
