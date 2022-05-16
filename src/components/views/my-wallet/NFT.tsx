import './nft.scss';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import Loader from '@components/shared/loader/Loader';
import placeholder from '@assets/images/placeholder.png';
import { ModalContext } from '@utils/context/ModalContext';
import ManageNFTModal from '@components/shared/modals/ManageNFTModal';
import SendNFTModal from '@components/shared/modals/SendNFTModal';
import useHederaWallets from '@hooks/useHederaWallets';
import MintNFTModal from '@components/shared/modals/MintNFTModal';
import { TokenInfo } from '@utils/entity/TokenInfo';
import { toast } from 'react-toastify';

interface NFTProps {
  nfts?: NFTInfo[] | undefined;
  info: TokenInfo
}

export default function NFT(props: NFTProps) {
  const { nfts } = props;
  const [meta, setMeta] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const { showModal, setModalContent } = useContext(ModalContext);
  const { userWalletId } = useHederaWallets()

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
    setModalContent(
      <ManageNFTModal info={ props.info } />
    );
    showModal();
  }, [setModalContent, showModal, props.info]);

  const handleSendNFT = useCallback(() => {
    setModalContent(
      <SendNFTModal {...props} />
    );
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

    setModalContent(
      <MintNFTModal tokenId={tokenId} meta={meta} />
    );
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
    <figure className={classNames('nft', { nft__loading: loading })}>
      <div className='nft__image'>
        {loading ? (
          <Loader />
        ) : meta?.image ? (
          <img src={`https://ipfs.io/ipfs/${ meta.image }`} alt='' />
        ) : (
          <img src={placeholder} alt='' />
        )}
      </div>
      <figcaption>
        <p>{meta?.name}</p>
        <p>{meta?.description}</p>
        <p>{nfts?.filter(n => n.account_id === userWalletId).length}</p>

        <div className='nft__buttons'>
          <button type='button' onClick={handleSendNFT}>
            Send
          </button>
          <button type='button' onClick={handleManageNFT}>
            Manage
          </button>
          {parseInt(props.info.total_supply, 10) < parseInt(props.info.max_supply, 10) && (
            <button type='button' onClick={handleMintNFT}>Mint</button>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
