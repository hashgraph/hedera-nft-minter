import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import MirrorNode from '@/services/MirrorNode';
import useHederaWallets from '@hooks/useHederaWallets';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { TokenInfo } from '@utils/entity/TokenInfo';
import { ModalContext } from '@utils/context/ModalContext';

import Loader from '@components/shared/loader/Loader';
import ManageNFTModal from '@components/shared/modals/ManageNFTModal';
import SendNFTModal from '@components/shared/modals/SendNFTModal';
import MintNFTModal from '@components/shared/modals/MintNFTModal';

import placeholder from '@assets/images/placeholder.png';
import './nft.scss';

interface NFTProps {
  nfts?: NFTInfo[] | undefined;
  info: TokenInfo;
}

export default function NFT(props: NFTProps) {
  const { nfts } = props;
  const [meta, setMeta] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const { showModal, setModalContent } = useContext(ModalContext);
  const { userWalletId } = useHederaWallets();

  const loadMetadata = useCallback(async (cid: string) => {
    try {
      const json = await MirrorNode.fetchNFTMetadata(cid);

      if (typeof json === 'object') {
        setMeta(json);
      }
    } catch (e) {
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, []);

  const handleManageNFT = useCallback(() => {
    setModalContent(<ManageNFTModal info={props.info} />);
    showModal();
  }, [setModalContent, showModal, props.info]);

  const handleSendNFT = useCallback(() => {
    setModalContent(<SendNFTModal {...props} />);
    showModal();
  }, [setModalContent, showModal, props]);

  const handleMintNFT = useCallback(() => {
    const tokenId = props.nfts?.length ? props.nfts[0].token_id : '';

    if (!props.nfts?.length || props.nfts[0].token_id) {
      toast.error('No token ID');
      return;
    }
    if (meta === null) {
      toast.error('No token metadata');
      return;
    }

    setModalContent(<MintNFTModal tokenId={tokenId} meta={meta} />);
    showModal();
  }, [setModalContent, showModal, props, meta]);

  useEffect(() => {
    if (nfts && Array.isArray(nfts) && nfts[0]?.metadata) {
      loadMetadata(atob(nfts[0].metadata));
    } else {
      setLoading(false);
    }
  }, [loadMetadata, nfts]);

  return (
    <div className={classNames('nft__table__row', { nft__loading: loading })}>
      {loading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : meta?.image ? (
        <div className='nft__table__row__image'>
          <img src={`https://ipfs.io/ipfs/${ meta.image }`} alt='' />
        </div>
      ) : (
        <div className='nft__table__row__image'>
          <img src={placeholder} alt='' />
        </div>
      )}
      <div className='nft__table__row__name'>
        <p>{meta?.name}</p>
      </div>
      <div className='nft__table__header'>
        <div className='nft__table__header__description'>Description</div>
        <div className='nft__table__header__owned'># owned</div>
      </div>

      <div className='nft__table__row__description'>
        <p>{meta?.description}</p>
      </div>
      <div className='nft__table__row__owned'>
        <p>{nfts?.filter((n) => n.account_id === userWalletId).length}</p>
      </div>
      <div className='nft__table__row__buttons'>
        <button
          type='button'
          className='btn--transparent-white'
          onClick={handleSendNFT}
        >
          Send
        </button>
        <button type='button' onClick={handleManageNFT}>
          Manage
        </button>
        {parseInt(props.info.total_supply as string, 10) <
          parseInt(props.info.max_supply as string, 10) && (
          <button type='button' onClick={handleMintNFT}>
            Mint
          </button>
        )}
      </div>
    </div>
  );
}
