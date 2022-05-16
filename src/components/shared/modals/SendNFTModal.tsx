import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import useHederaWallets from '@hooks/useHederaWallets';
import HTS from '@services/HTS';
import { toast } from 'react-toastify';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';

const ModalForm = ({ serials }: { serials:  number[] }) => (
  <Form className='form'>
    <div className='form__row'>
      <label htmlFor='accountId'>Account Id:</label>
      <Field name='accountId' type='text' />
    </div>

    <div className='form__row'>
      <label htmlFor='serial'>Serial no.:</label>
      <Field name='serial' as='select'>
        {serials.map((no: number) => (
          <option key={no} value={no}>{no}</option>
        ))}
      </Field>
    </div>

    <div className='form__btns'>
      <button>Submit</button>
    </div>
  </Form>
)

interface SendNFTModalProps {
  info: TokenInfo,
  nfts?: NFTInfo[] | undefined;
}

export default function SendNFTModal({ info, nfts }: SendNFTModalProps) {
  const { userWalletId, sendTransaction } = useHederaWallets();

  const handleSendForm = useCallback(async ({ accountId }) => {
    try {
      if (!userWalletId) {
        throw new Error('No wallet connected!')
      }
      if (!nfts?.length) {
        throw new Error('No NFT\'s');
      }

      const tx = HTS.sendNFT(nfts[0].token_id, nfts[0].serial_number, userWalletId, accountId);

      await sendTransaction(tx);

      toast.success('NFT transfer success :)');
    } catch (e) {
      toast.error(e.message);
    }
  }, [nfts, userWalletId, sendTransaction]);

  return (
    <div>
      <h2>Manage Your NFT - {info.token_id}</h2>
      <Formik
        initialValues={{ accountId: '' }}
        onSubmit={handleSendForm}
      >
        {formProps => (
          <ModalForm
            {...formProps}
            serials={nfts?.filter(nft => nft.account_id === userWalletId).map(n => n.serial_number) || []}
          />
        )}
      </Formik>
    </div>
  )
}
