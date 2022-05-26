import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import useHederaWallets from '@hooks/useHederaWallets';
import HTS from '@services/HTS';
import { toast } from 'react-toastify';
import IPFS from '@services/IPFS';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import Tooltip from '../form/Tooltip';

const ModalForm = () => (
  <>
    <Tooltip showLabel>
      Token has to been associated with reciver account first.
    </Tooltip>
    <Form className='form'>
      <div className='form__row'>
        <label htmlFor='qty'>Count:</label>
        <Field name='qty' type='number' min={1} max={10} />
      </div>

      <div className='form__btns'>
        <button>Submit</button>
      </div>
    </Form>
  </>
)

interface MintNFTModalProps {
  tokenId: string,
  meta: NFTMetadata,
}

export default function MintNFTModal({ tokenId, meta }: MintNFTModalProps) {
  const { userWalletId, sendTransaction } = useHederaWallets();

  const handleMintForm = useCallback(async ({ qty }) => {
    try {
      if (!userWalletId) {
        throw new Error('No wallet connected!')
      }

      const metaCIDs = await Promise.all(
        Array.from(new Array(qty)).map(() =>
          IPFS.createMetadataFile(meta)
            .then(res => res.data)
        )
      );

      const tokenMintTx = HTS.mintToken(tokenId, userWalletId, metaCIDs.map(({ value }) => value.cid));

      await sendTransaction(tokenMintTx);

      toast.success('NFT mint success :)');
    } catch (e) {
      toast.error(e.message);
    }
  }, [userWalletId, tokenId, sendTransaction, meta]);

  return (
    <div>
      <h2>Mint more editions of Your NFT - {tokenId}</h2>
      <Formik
        initialValues={{ qty: 1 }}
        onSubmit={handleMintForm}
        component={ModalForm}
      />
    </div>
  )
}
