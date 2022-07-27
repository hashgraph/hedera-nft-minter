import React from 'react';
import { NFTOverviewPageProps } from '@/utils/types/overview.types';
import TransactionHistory from '@/components/shared/overview/TransactionHistory';
import Description from '@/components/shared/overview/Description';
import Avatar from '@/components/shared/overview/Avatar';
import Info from '@/components/shared/overview/Info';
import useLayout from '@/utils/hooks/useLayout';

export default function NFTOverviewLayout({
  edition,
  collectionId,
}: NFTOverviewPageProps) {
  const { isLaptop } = useLayout()

  return (
    <>
      {isLaptop ? (
        <>
          <div className='overview--desktop-side'>
            <Avatar image={edition?.meta?.image} />
            <Description
              creator={edition?.meta?.creator}
              description={edition?.meta?.description}
              attributes={edition?.meta?.attributes}
            />
          </div>

          <div className='overview--desktop-side'>
            <Info
              symbol={edition?.collection_info?.symbol}
              collectionName={edition?.collection_info?.name}
              collectionId={collectionId}
              editionName={edition?.meta?.name}
              account_id={edition?.account_id}
            />
          </div>
        </>
      ) : (
        <>
          <div className='overview__info'>
            <Info
              symbol={edition?.collection_info?.symbol}
              collectionName={edition?.collection_info?.name}
              editionName={edition?.meta?.name}
              account_id={edition?.account_id}
              collectionId={collectionId}
            />
          </div>

          <Avatar image={edition?.meta?.image} />

          <Description
            creator={edition?.meta?.creator}
            description={edition?.meta?.description}
            attributes={edition?.meta?.attributes}
          />
        </>
      )}

      {edition?.collection_info?.token_id && (
        <div className='overview--item-activity overview--collapse overview--box'>
          <TransactionHistory
            collectionId={edition?.collection_info?.token_id}
            serialNumber={edition?.serial_number}
          />
        </div>
      )}
    </>
  );
}
