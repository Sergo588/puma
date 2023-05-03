import React, { useEffect, useMemo } from "react";
import { useRequest } from "helpers/hooks/useRequest";
import { NftRepository } from "connectors/repositories/nft";
import { useWeb3React } from "@web3-react/core";
import { OverviewCard, Button, CustomLink } from "components";
import { shortenAddress } from "helpers/format";
import { OverviewLayout } from "layouts/OverviewLayout";

const Overview = () => {
  const { account } = useWeb3React();
  const { isLoading, call, data } = useRequest(NftRepository.getListNft, [{ owner_address: account }]);
  useEffect(() => {
    if (account) {
      call();
    }
  }, [account])

  const renderContent = useMemo(() => {
    if (!isLoading && data?.nfts) {
      if (data?.nfts?.length > 0) {
        return data?.nfts?.map((item, itemIndex) => {
          return (
            <div className="p-2.5">
              <OverviewCard result={item} key={itemIndex} />
            </div>
          )  
        })
      }
      return (
        <div className="flex flex-col items-center justify-center space-y-5">
          <span className="text-lg">
            You don't have NFT <br />
            Buy nft at OpenSea
          </span>
          
          <CustomLink 
            href='/https://opensea.io/collection/puma-labs'
          >
            <Button
              type="phloxRounded"
              className="flex items-between max-w-[250px] font-good-timing font-bold sm:max-w-full w-full"
            >
              <div className="flex items-center justify-start flex-1 px-2.5 py-1.5">
                <span className="flex flex-1 text-center items-center justify-center">
                 Go to OpenSea
                </span>
              </div>
          
            </Button>
          </CustomLink>
        </div>
      )
    } 
    return null;

  }, [isLoading, data.nfts])

  return (
    <div className="flex justify-center flex-col mt-[100px]">
      <div className="flex items-center justify-center">
        {account ? (
          <div className="flex flex-wrap justify-center overflow-auto mb-[100px]">
            {renderContent}
          </div>
        ) : (
          <div className="text-lg text-center">
            Connect your wallet <br/> to see your NFTs
          </div>
        )}
        
      </div>
    </div>
  )
}

Overview.Layout = OverviewLayout;

export default Overview;