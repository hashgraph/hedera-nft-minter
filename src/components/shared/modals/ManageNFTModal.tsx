import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import upperFirst from 'lodash/upperFirst';
import HTS from '@services/HTS';
import useHederaWallets from '@hooks/useHederaWallets';
import { TokenInfo } from '@utils/entity/TokenInfo';

const ModalForm = () => (
  <Form className='form dark-schema'>
    <div className='form__row'>
      <label htmlFor='name'>Token name:</label>
      <Field name='name' type='text' />
    </div>

    <div className='form__row'>
      <label htmlFor='symbol'>Symbol:</label>
      <Field name='symbol' type='text' />
    </div>

    <div className='form__row'>
      <label htmlFor='memo'>Memo:</label>
      <Field name='memo' type='text' placeholder='empty' />
    </div>

    <div className='form__btns'>
      <button>Submit</button>
    </div>
  </Form>
)

interface FormikFields {
  name?: string | null,
  symbol?: string | null,
  memo?: string | null,
}

interface ManageNFTModalProps {
  info: TokenInfo,
}

export default function ManageNFTModal({ info }: ManageNFTModalProps) {
  const { userWalletId ,sendTransaction } = useHederaWallets();

  const handleManageForm = useCallback(async (values) => {
    try {
      if (!userWalletId) {
        throw new Error('No wallet connected!')
      }
      if (!info.token_id) {
        throw new Error('Token ID not exist!')
      }

      const orignValues: FormikFields = pick(info, ['name', 'symbol', 'memo']);
      const newValues: FormikFields = pick(values, ['name', 'symbol', 'memo']);
      const changedValues = reduce<FormikFields>(newValues, (final: FormikFields, field, key: 'name' | 'symbol' | 'memo') => {
        if (orignValues[key] !== newValues[key]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          final[`token${ upperFirst(key) }`] = newValues[key];
        }

        return final;
      }, {}) as { tokenName: string, tokenMemo: string, tokenSymbol: string};

      const tx = HTS.updateToken(info.token_id, userWalletId, changedValues);

      await sendTransaction(tx);
      toast.success('NFT update success :)');
    } catch (e) {
      toast.error(e.message);
    }
  }, [info, sendTransaction, userWalletId]);


  return (
    <div>
      <h2>Manage Your NFT - {info.token_id}</h2>
      <Formik
        initialValues={info}
        onSubmit={handleManageForm}
        component={ModalForm}
      />
    </div>
  )
}
