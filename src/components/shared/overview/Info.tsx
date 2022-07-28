import React from 'react';
import { VerifiedOutlined } from '@ant-design/icons';

type InfoProps = {
  symbol?: string | null;
  collectionName?: string | null;
  collectionId?: string;
  editionName?: string;
  account_id?: string;
};

export default function Info({
  symbol,
  collectionName,
  collectionId,
  editionName,
  account_id,
}: InfoProps) {
  return (
    <div className='overview__info'>
      <p className='symbol'>
        {symbol}
      </p>
      <p className='collection_name'>
        <a href={`https://hashscan.io/#/testnet/token/${ collectionId }`}>
          {collectionName}
        </a>
      </p>
      <h1>{editionName}</h1>
      {account_id && (
        <a href={`https://hashscan.io/#/testnet/account/${ account_id }`}>
          Author {account_id}
          <VerifiedOutlined />
        </a>
      )}
    </div>
  );
}
