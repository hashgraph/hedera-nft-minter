import React from 'react';
import { NFTOverviewPageProps } from '@/utils/types/overview.types';
import TransactionHistory from '@/components/shared/overview/TransactionHistory';
import Description from '@/components/shared/overview/Description';
import Avatar from '@/components/shared/overview/Avatar';
import Info from '@/components/shared/overview/Info';

export default function NFTOverviewLayout({
  edition,
  collectionId,
}: NFTOverviewPageProps) {

  return (
    <div className='overview overview--nft mc--h container--padding container--max-width bg--transparent'>
      <div className='overview__section--description'>
        <Avatar image={edition?.meta?.image} />

        <Description
          creator={edition?.meta?.creator}
          description={edition?.meta?.description}
          attributes={edition?.meta?.attributes}
        />
      </div>

      <div className='overview__section--info'>
        <Info
          symbol={edition?.collection_info?.symbol}
          collectionName={edition?.collection_info?.name}
          collectionId={collectionId}
          editionName={edition?.meta?.name}
          account_id={edition?.account_id}
        />
      </div>


      {edition?.collection_info?.token_id && (
        <div className='overview__section--item-activity overview--collapse overview--box'>
          <TransactionHistory
            collectionId={edition?.collection_info?.token_id}
            serialNumber={edition?.serial_number}
          />
        </div>
      )}
    </div>
  );
}
