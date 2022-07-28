import { NFTInfo, NFTInfoWithMetadata } from '@utils/entity/NFTInfo';

export type NFTOverviewPageProps = {
  collectionId: string,
  collectionNFTs?: NFTInfo[],
  edition: NFTInfoWithMetadata | null,
}

export type NFTOverviewPageParams = {
  collectionId: string;
  serialNumber: string;
}
