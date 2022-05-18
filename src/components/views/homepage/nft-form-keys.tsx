import React, { useCallback } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { TokenKey, TOKEN_KEY } from '@utils/entity/TokenKeys';
import Error from '@components/shared/form/Error';

export default function NftFormKeys() {
  const [field] = useField<TokenKey[]>('keys');

  const renderKey = useCallback((key: TokenKey, index: number, remove: (index: number) => void) => {
    return (
      <div key={field.value[index].type}>
        <Field name={`keys.${ index }.type`} as='select'>
          <option value={TOKEN_KEY.TREASURY}>Tresaury</option>
          <option value={TOKEN_KEY.KYC}>KYC</option>
          <option value={TOKEN_KEY.ADMIN}>Admin</option>
          <option value={TOKEN_KEY.FREEZE}>Freeze</option>
          <option value={TOKEN_KEY.WIPE}>Wipe</option>
          <option value={TOKEN_KEY.PAUSE}>Pause</option>
          <option value={TOKEN_KEY.SUPPLY}>Supply</option>
        </Field>
        <label htmlFor={`account_${ index }`}>
          <Field name={`keys.${ index }.value`} type='radio' value='account' />
          My account key
        </label>
        <label htmlFor={`custom_${ index }`}>
          <Field name={`keys.${ index }.value`} type='radio' value='custom' />
          Custom key
        </label>

        {field.value[index]?.value === 'custom' && (
          <div>
            <Field name={`keys.${ index }.key`} type='input' />
            <Error name={`keys.${ index }.key`} />
          </div>
        )}

        {index !== 0 && (
          <button type='button' onClick={() => remove(index)}>Remove</button>
        )}
      </div>
    )
  }, [field])

  return (
    <div className='form__row'>
      <label htmlFor={'null'}>Custom keys</label>


      <FieldArray
        name='keys'
        render={({ push, remove }) => (
          <div>
            <button type='button' onClick={() => push({})}>Add</button>

            <div>
              {field.value.map((key, index) => renderKey(key, index, remove))}
            </div>
          </div>
        )}
      />
    </div>
  )
}
