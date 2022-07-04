import React from 'react';
import FormGroup from '@/components/shared/form/FormGroup';

export default function OffChainPropertiesAndAttributes() {
  return (
    <div>
      <div className='form__row'>
        <p className='label'>This attributes describe the NFT in often used to identify rarity</p>
        <FormGroup
          name='attributes'
          label='NFT attributes'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'text',
              label: 'Trait type',
              placeholder: 'e.g color'
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g blue'
            },
          ]}
        />
      </div>
      <div className='form__row'>
        <FormGroup
          name='properties'
          label='General properties'
          inputsSchema={[
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              placeholder: 'e.g website'
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g www.mysite.com'
            },
          ]}
        />
      </div>
    </div>
  );
}
