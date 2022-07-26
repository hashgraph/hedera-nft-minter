import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo, TokenSupplyType } from '@/utils/entity/TokenInfo';
import classNames from 'classnames';
import React from 'react'
import './collection-summary.scss'

type Props = {
  collection: { nfts: NFTInfo[]; info: TokenInfo }
}

export default function CollectionSummary({ collection }: Props) {
  return (
    <div className={classNames('collectionsummary')}>
      <div className='collectionsummary__values'>
        <p>
          Max supply:{' '}
          <b>
            {collection?.info.supply_type === TokenSupplyType.INFINITE
                ? TokenSupplyType.INFINITE
                : collection?.info?.max_supply
            }
          </b>
        </p>
        <p>
          Tokens minted: <b>{collection?.nfts?.length}</b>
        </p>
        <p>
          {collection?.info?.supply_type !== TokenSupplyType.INFINITE && (
            <>
              Left to mint: <b>{
                parseInt(collection.info.max_supply ?? '0')
                - collection.nfts.length
              }</b>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
