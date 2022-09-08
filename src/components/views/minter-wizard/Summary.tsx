import { useCallback, useMemo } from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import { HEDERA_NETWORK } from '@/../Global.d';
import placeholder from '@assets/images/placeholder.png';
import externalIcon from '@assets/images/icons/external.svg';
import nftIcon from '@assets/images/icons/nft_icon.svg';

export default function Summary({ mintedNFTData }: { mintedNFTData: FormikValues }) {
  const summaryValues = useMemo(() => (
    map(pick(mintedNFTData, ['name', 'symbol', 'edition_name', 'creator', 'description']))
  ), [mintedNFTData])

  const renderSummaryValuesList = useCallback(() => (
    map(summaryValues, value => (
      value && <li>{value}</li>
    ))
  ), [summaryValues])

  const hashScanLink = useMemo(() => (
    `https://hashscan.io/#/${ HEDERA_NETWORK === 'testnet' ? 'testnet' : 'app' }/token/${ mintedNFTData.tokenId }`
  ), [mintedNFTData.tokenId])

  return (
    <div className='minter-wizard__summary--done minter-wizard__animation-container container--padding'>
      <div className='minter-wizard__summary__image'>
        <img
          src={mintedNFTData?.image
            ? URL.createObjectURL(mintedNFTData?.image)
            : placeholder
          }
          alt='Thumb'
        />
      </div>
      <div className='minter-wizard__summary__column'>
        <div>
          <p className='title title--strong'>Congratulations!</p>
          <p className='title title--small'>Your NFT has been minted!</p>
        </div>
        <ul className='minter-wizard__summary__item-list'>
          {renderSummaryValuesList()}
          <li className='green'>MINTED</li>
        </ul>

        <div className='minter-wizard__summary__token-id'>
          <img src={nftIcon} alt='nft_icon' />
          {mintedNFTData.tokenId}
        </div>

        <a
          href={hashScanLink}
          target='_blank'
          className='minter-wizard__summary__hashscan'
        >
          <img src={externalIcon} alt='external_icon' />
          <p>
            View token in <span>Hashscan.io</span>
          </p>
        </a>

        <Link to='/my-nft-collection' className='minter-wizard__summary__collection btn btn--arrow'>
          View your collection
        </Link>
      </div>
    </div>
  )
}
