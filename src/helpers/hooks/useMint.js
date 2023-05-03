import { useEffect, useRef, useState } from "react";
import { useGetContract } from "helpers/hooks/useGetContract";
import { CONTRACT_NAMES } from "helpers/constants";
import { useWeb3React } from "@web3-react/core";
import { increaseByPercent } from "helpers/numbers";
import { NftRepository } from "connectors/repositories/nft";
import { callNotification } from "helpers/notification";
import { parseErrorToUserReadableMessage } from "helpers/errors";
import { DEFAULT_GAS_LIMIT } from "helpers/constants";

export const useMint = () => {
  const tmInterval = useRef(null);
  const { account } = useWeb3React();
  const { getContract } = useGetContract();

  const [isLoadingBox, setIsLoadingBox] = useState(false);
  const [isErrorBox, setIsErrorBox] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [mintResult, setMintResult] = useState(null);

  const fetchNft = async (txHash) => {
    tmInterval.current && clearInterval(tmInterval.current);
    tmInterval.current = null;

    return new Promise(async (resolve) => {
      const apicall = async () => {
        try {
          const result = await NftRepository.getNft(txHash);

          if (result) {
            resolve(result);
            clearInterval(tmInterval.current);
            setMintResult(result);
          }
        } catch (e) {}
      };

      apicall();

      tmInterval.current = setInterval(apicall, 2000);
    });
  };

  const onMintBox = async (contractType, isFreeNft = false, isFreeBox = false) => {
    if (!isLoadingBox) {
      try {
        setIsLoadingBox(true);
        setIsErrorBox(false);
        setIsMinting(false);
        setShowResult(false);
        setMintResult(null);

        const contract = await getContract(CONTRACT_NAMES.NFT_ROUTER);

        let gas = null;
        try {
          gas = isFreeNft
            ? await contract.estimateGas.mintFreeBox()
            : isFreeBox ? await contract.estimateGas.mintFreeBoxForLevel5() 
            : await contract.estimateGas.buy(account, contractType);
        } catch (e) {
          //
        }

        const transaction = isFreeNft
          ? await contract.mintFreeBox({
              gasLimit: parseInt(gas)
                ? increaseByPercent(gas)
                : DEFAULT_GAS_LIMIT,
            })
          : isFreeBox ? await contract.mintFreeBoxForLevel5({
            gasLimit: parseInt(gas)
              ? increaseByPercent(gas)
              : DEFAULT_GAS_LIMIT,
          })
          : await contract.buy(account, contractType, {
              gasLimit: parseInt(gas)
                ? increaseByPercent(gas)
                : DEFAULT_GAS_LIMIT,
            });

        setIsMinting(true);

        const waitResult = await transaction.wait();

        if (waitResult.status === 0) {
          setIsErrorBox(true);
        } else {
          await fetchNft(waitResult.transactionHash);

          setTimeout(() => {
            setShowResult(true);
          }, 1000);
        }
      } catch (e) {
        if (e?.data?.message || e?.message) {
          callNotification({
            type: "error",
            message: parseErrorToUserReadableMessage(e),
          });
        }
      }

      setIsMinting(false);
      setIsLoadingBox(false);
    }
  };

  const onClear = () => {
    setIsLoadingBox(false);
    setMintResult(null);
    setIsErrorBox(false);
    setShowResult(false);
  };

  useEffect(() => {
    return () => {
      tmInterval.current && clearInterval(tmInterval.current);
    };
  }, []);

  return {
    onClear,
    isMinting,
    onMintBox,
    showResult,
    mintResult,
    isErrorBox,
    isLoadingBox,
    setIsErrorBox,
  };
};
