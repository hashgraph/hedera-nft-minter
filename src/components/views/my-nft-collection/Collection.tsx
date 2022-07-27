import React, {
  useCallback,
  useContext,
} from 'react';

import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo, TokenSupplyType } from '@utils/entity/TokenInfo';
import { ModalContext } from '@utils/context/ModalContext';

import ManageNFTModal from '@components/shared/modals/ManageNFTModal';
import SendNFTModal from '@components/shared/modals/SendNFTModal';
import ShowNFTsModal from '@components/shared/modals/ShowNFTsModal';

import './collection.scss';

interface CollectionProps {
  nfts?: NFTInfo[] | undefined;
  info: TokenInfo;
}

export default function Collection(props : CollectionProps) {
  const { nfts, info } = props;
  const { showModal, setModalContent } = useContext(ModalContext);


  const handleManageNFT = useCallback(() => {
    setModalContent(<ManageNFTModal info={props.info} />);
    showModal();
  }, [setModalContent, showModal, props.info]);

  const handleSendNFT = useCallback(() => {
    setModalContent(<SendNFTModal {...props} />);
    showModal();
  }, [setModalContent, showModal, props]);

  const handleShowNFTs = useCallback(() => {
    setModalContent(<ShowNFTsModal {...props} />);
    showModal();
  }, [setModalContent, showModal, props]);

  return (
    <div className='collection'>
      <div className='collection__header'>
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
              <>
                {TokenSupplyType.INFINITE}
              </>
            ) : (
              <>
                {info.max_supply}
              </>
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
  )
}
