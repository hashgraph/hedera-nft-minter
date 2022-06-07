import React from 'react';
import { useFormikContext } from 'formik';

import { WizardValues } from '@/utils/const/minter-wizard';

import Error from '@/components/shared/form/Error';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';

export default function OffChain() {
  const { values } = useFormikContext<WizardValues>()

  return (
    <div>
      <div className='form__row__two-columns'>
        <div className='form__row__two-columns'>
          <div>
            <FieldWrapper name='name' disabled label='Collection name' value={values.name} />
          </div>
          <div>
            <FieldWrapper name='symbol' disabled label='Collection symbol' value={values.symbol as string} />
          </div>
        </div>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
          <DragAndDropFileInput name='image' />
          <div className='form__error_wrapper'>
            <Error name='image' />
          </div>
        </div>
      </div>
      <div className='form__row__two-columns'>
        <div>
          <FieldWrapper
            fastField
            name='edition_name'
            type='test'
            label='Edition name'
          />
          <FieldWrapper
            fastField
            name='description'
            type='test'
            label='Description'
          />
        </div>
        <div className='form__row__two-columns'>
          <div>
            <FieldWrapper
              fastField
              name='creator'
              type='text'
              label='Creator'
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='creatorDID'
              type='text'
              label='Creator DID'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
