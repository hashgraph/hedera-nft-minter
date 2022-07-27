import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { NFTInfo } from '@utils/entity/NFTInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { ModalContext } from '@/utils/context/ModalContext';

import Loader from '@components/shared/loader/Loader';

import placeholder from '@assets/images/placeholder.png';
import './nft.scss';

type NFTProps = (NFTInfo & NFTMetadata & { loading?: boolean })

export default function NFT({
  loading,
  token_id,
  serial_number,
  image,
  name,
}: NFTProps) {
  const { closeModal } = useContext(ModalContext);

  return (
    <Link
      to={`/nft-overview/${ token_id }/${ serial_number }`}
      className={classNames('nft nft--card', { nft__loading: loading })}
      onClick={closeModal}
    >
      {loading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : image ? (
        <div className='nft--card__image'>
          <img
            src={
              image && image.includes('https://')
                ? image
                : `https://ipfs.io/ipfs/${ image.replace('ipfs://', '') }`
              }
            alt=''
          />
        </div>
      ) : (
        <div className='nft--card__image'>
          <img src={placeholder} alt='' />
        </div>
      )}
      <div className='nft--card__content'>
        <div className='nft--card__serial'>
          <p>NFT #{serial_number}</p>
        </div>
        <div className='nft--card__name'>
          <p>{name}</p>
        </div>

        <div className='nft--card__buttons'>
          <button
            type='button'
          >
            Show NFT
          </button>
        </div>
      </div>
    </Link>
  );
}
