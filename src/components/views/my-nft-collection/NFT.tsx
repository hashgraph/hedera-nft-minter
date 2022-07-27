import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { NFTInfo } from '@utils/entity/NFTInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { ModalContext } from '@/utils/context/ModalContext';

import Loader from '@components/shared/loader/Loader';

import placeholder from '@assets/images/placeholder.png';
import './nft.scss';


export default function NFT(props: (NFTInfo & NFTMetadata & { loading?: boolean })) {
  const { closeModal } = useContext(ModalContext);

  return (
    <Link
      to={`/nft-overview/${ props.token_id }/${ props.serial_number }`}
      className={classNames('nft nft--card', { nft__loading: props?.loading })}
      onClick={closeModal}
    >
      {props.loading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : props?.image ? (
        <div className='nft--card__image'>
          <img
            src={
              props.image && props.image.includes('https://')
                ? props.image
                : `https://ipfs.io/ipfs/${ props.image.replace('ipfs://', '') }`
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
          <p>NFT #{props.serial_number}</p>
        </div>
        <div className='nft--card__name'>
          <p>{props?.name}</p>
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
