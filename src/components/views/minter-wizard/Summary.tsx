import { HEDERA_NETWORK } from '@/../Global.d';
import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import placeholder from '@assets/images/placeholder.png';
import externalIcon from '@assets/images/icons/external.svg';
import nftIcon from '@assets/images/icons/nft_icon.svg';
import map from 'lodash/map';
import pick from 'lodash/pick';

export default function Summary({ mintedNFTData }: { mintedNFTData: FormikValues }) {
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
          {map(pick(mintedNFTData, ['name', 'symbol', 'edition_name', 'creator', 'description']), value => (
            value && <li>{value}</li>
          ))}
          <li className='green'>MINTED</li>
        </ul>

        <div className='minter-wizard__summary__token-id'>
          <img src={nftIcon} alt='nft_icon' />
          {mintedNFTData.tokenId}
        </div>

        <a
          href={`https://hashscan.io/#/${ HEDERA_NETWORK === 'testnet' ? 'testnet' : 'app' }/token/${ mintedNFTData.tokenId }`}
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
