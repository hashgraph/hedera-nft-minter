import React from 'react';
import {  useFormikContext } from 'formik';
import { WizardValues } from '@/utils/const/minter-wizard';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import ButtonGroup from '@/components/shared/form/button-group';
import Tooltip from '@/components/shared/form/Tooltip';
import MultipleToken from '@assets/images/multiple_token.png'
import SingleToken from '@assets/images/single_token.png'

export default function OnChain() {
  const { values } = useFormikContext<WizardValues>()

  return (
    <div>
      <ButtonGroup
        name='is_multiple_mint'
        square
        size='md'
        options={[
          {
            label: 'CREATE COLLECTION WITH SINGLE NFT',
            value: 'false',
            image: SingleToken
          },
          {
            label: 'CREATE COLLECTION WITH MULTIPLIE COPIES OF NFT',
            value: 'true',
            image: MultipleToken
          },
        ]}
      />

      <h4>How many tokens do you want to have in collection?</h4>
      <p className='form__text'>Remember, this field can't be unchanged in the future</p>
      <div>
        <FieldWrapper
          fastField
          name='maxSupply'
          type='number'
          label='# max supply'
        />
      </div>
      {values.is_multiple_mint === 'true' &&
        <>
          <hr />
          <Tooltip showLabel>
            You can mint maxiumum 10 tokens at once
          </Tooltip>

          <h4>
            How many tokens do you want to have in collection?
          </h4>

          <FieldWrapper
            fastField
            name='qty'
            type='number'
            label='Qty of tokens'
            max='10'
          />
        </>
      }
    </div>
  );
}
