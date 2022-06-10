import React from 'react';
import Error from '@/components/shared/form/Error';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';

export default function OffChain() {

  return (
    <div>
      <div className='form__row__two-columns'>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
          <DragAndDropFileInput name='image' />
          <div className='form__error_wrapper'>
            <Error name='image' />
          </div>
        </div>
        <div className='form__row'>
          <div>
            <FieldWrapper
              fastField
              name='name'
              type='text'
              label='Collection name'
              disabled
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              label='Collection symbol'
              disabled
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='edition_name'
              type='text'
              label='Edition name'
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='description'
              as='textarea'
              type='text'
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
    </div>
  );
}
