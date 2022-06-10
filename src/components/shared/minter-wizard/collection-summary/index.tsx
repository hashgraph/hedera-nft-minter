import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import classNames from 'classnames';
import React from 'react'
import './collection-summary.scss'

type Props = {
  collection: { nfts: NFTInfo[]; info: TokenInfo }
}

export default function CollectionSummary({ collection }: Props) {
  return (
    <div className={classNames('collectionsummary')}>
      <p className='collectionsummary__title'>
        {collection.info.symbol} | {collection.info.name}
      </p>
      <div className='collectionsummary__values'>
        <p>
          Max supply: <b>{collection?.info.max_supply}</b>
        </p>
        <p>
          Tokens minted: <b>{collection?.nfts?.length}</b>
        </p>
        <p>
          Left to mint: <b>{
            parseInt(collection.info.max_supply as string)
            - collection.nfts.length
          }</b>
        </p>
      </div>
    </div>
  )
}
