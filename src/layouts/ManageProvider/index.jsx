import { useEffect } from "react";
import { useListener } from "helpers/hooks/useListener";
import { useAutoConnect } from "helpers/hooks/useAutoConnect";
import { useWeb3React } from "@web3-react/core";
import { ADD_CHAIN_ETHS_PARAMS } from "helpers/constants";
import config from "helpers/config";
import { callNotification } from "helpers/notification";

export const ManageProvider = ({ children }) => {
  const { account, library, chainId } = useWeb3React();

  const { connected } = useAutoConnect();

  const onSendCheck = async () => {
    if (chainId !== config.allowedChainId && !!account) {
      try {
        callNotification({
          type: "error",
          message: "Unsupported network! Switch to Smart Chain",
          autoClose: false,
          toastId: "unsupportedChainId",
        });

        await library?.send("wallet_switchEthereumChain", [
          { chainId: ADD_CHAIN_ETHS_PARAMS[config.allowedChainId].chainId },
          account,
        ]);
      } catch (e) {
        if (e.code === 4902) {
          library?.send("wallet_addEthereumChain", [
            {
              ...ADD_CHAIN_ETHS_PARAMS[config.allowedChainId],
            },
          ]);
        }
      }
    }
  };

  useEffect(() => {
    onSendCheck();
  }, [library, chainId, account]);

  useListener();

  if (connected) {
    return children;
  }

  return null;
};
