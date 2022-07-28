import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo, TokenSupplyType } from '@utils/entity/TokenInfo';
import { ModalContext } from '@utils/context/ModalContext';
import MirrorNode from '@/services/MirrorNode';

import ManageNFTModal from '@components/shared/modals/ManageNFTModal';
import SendNFTModal from '@components/shared/modals/SendNFTModal';
import ShowNFTsModal from '@components/shared/modals/ShowNFTsModal';
import Loader from '@/components/shared/loader/Loader';

import placeholder from '@assets/images/placeholder.png';
import './collection.scss';

interface CollectionProps {
  nfts?: NFTInfo[] | undefined;
  info: TokenInfo;
}

export default function Collection({ nfts, info } : CollectionProps) {
  const { showModal, setModalContent } = useContext(ModalContext);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null)
  const [isImageLoading, setImageLoading] = useState(true);


  const handleManageNFT = useCallback(() => {
    setModalContent(<ManageNFTModal info={info} />);
    showModal();
  }, [setModalContent, showModal, info]);

  const handleSendNFT = useCallback(() => {
    setModalContent(<SendNFTModal nfts={nfts} info={info} />);
    showModal();
  }, [setModalContent, showModal, nfts, info]);

  const handleShowNFTs = useCallback(() => {
    setModalContent(<ShowNFTsModal nfts={nfts} info={info} />);
    showModal();
  }, [setModalContent, showModal, nfts, info]);

  const getFirstAvailableNftImage = useCallback(async() => {
    if(nfts){
      for(const nft of nfts) {
        if(nft.metadata) {
          try {
            const meta = await MirrorNode.fetchNFTMetadata(atob(nft?.metadata));

            if(meta?.image) {
              setPreviewImageSrc(meta.image)
              setImageLoading(false)
              return;
            }
          } catch(e) {
            continue
          }
        }
      }
    }
    setImageLoading(false)
  }, [nfts, setImageLoading, setPreviewImageSrc])

  useEffect(() => {
    getFirstAvailableNftImage()
  }, [getFirstAvailableNftImage])

  return (
    <div className='collection'>
      <div className='collection__image'>
      {isImageLoading
        ? (
          <Loader />
        ) : (
          <img
            src={
              previewImageSrc
               ? (
                previewImageSrc && previewImageSrc.includes('https://')
                  ? previewImageSrc
                  : `https://ipfs.io/ipfs/${ previewImageSrc?.replace('ipfs://', '') }`
               ) : (
                 placeholder
               )
            }
            alt='collection_preview_image'
          />
        )
      }
      </div>
      <div className='collection__wrapper'>
        <div className='collection__header'>
          <div className='collection__header__token_id'>
            <p>{info?.token_id}</p>
          </div>
          <div className='collection__header__symbol'>
            <p>{info?.symbol}</p>
          </div>
          <div className='collection__header__name'>
            <p>{info?.name}</p>
          </div>
        </div>

        <div className='collection__stats'>
          <div className='collection__stats__supply'>
            Max supply:{' '}
            <b>
              {info.supply_type === TokenSupplyType.INFINITE ? (
                TokenSupplyType.INFINITE
              ) : (
                info.max_supply
              )}
            </b>
          </div>

          <div className='collection__stats__minted'>
            Tokens minted: <b> {nfts?.length ?? 0} </b>
          </div>
        </div>

        <hr />

        <div className='collection__buttons'>
          <button
            type='button'
            className='btn--transparent-white'
            onClick={handleSendNFT}
          >
            Send
          </button>
          <button
            type='button'
            onClick={handleManageNFT}
            className='btn--transparent-white'
          >
            Manage
          </button>
          <button
            type='button'
            onClick={handleShowNFTs}
            className='btn--transparent-white'
          >
            Show NFTs
          </button>
        </div>
      </div>
    </div>
  )
}
