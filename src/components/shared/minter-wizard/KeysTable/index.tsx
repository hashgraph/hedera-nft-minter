import React, { useCallback } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import find from 'lodash/find'

import { TokenKey, TOKEN_KEY } from '@utils/entity/TokenKeys';
import Error from '@components/shared/form/Error';
import FieldSelect from '@/components/shared/form/FieldSelect';
import classNames from 'classnames';

import './keys-table.scss'
import map from 'lodash/map';
import FieldWrapper from '../../form/FieldWrapper';
import CheckboxField from '../../form/CheckboxField';
import CheckboxFieldGroup from '../../form/CheckboxFieldGroup';
import Tooltip from '../../form/Tooltip';

export const TokenKeys = [
  { title: 'Treasury Account ID', value: TOKEN_KEY.TREASURY, required: true },
  { title: 'Supply', value: TOKEN_KEY.SUPPLY, required: true },
  { title: 'Admin', value: TOKEN_KEY.ADMIN },
  { title: 'Freeze', value: TOKEN_KEY.FREEZE },
  { title: 'Wipe', value: TOKEN_KEY.WIPE },
  { title: 'Pause', value: TOKEN_KEY.PAUSE },
]

export type MinterWizardKey = {
    title: string;
    value: TOKEN_KEY;
    required?: boolean;
}

export interface MinterWizardKeysProps {
  data: MinterWizardKey[],
  label: string,
  name: string
}

const MinterWizardKeys = ({ data, label, name }: MinterWizardKeysProps) => {
  const [field] = useField<TokenKey[]>(name);

  return (
    <>
      <p className='title--medium title--strong'>Keys:</p>
      <div role='group' aria-labelledby='checkbox-group-keys' className='minter-wizard__keys'>
        {map(data, (el) => (
          <div className='minter-wizard__keys__checkbox'>
            <p className='title title--small'>
              {el.title}
              <Tooltip >
                Here is key tooltip.

                {el.required && (
                  <strong>
                    {el.title} key is always set!
                  </strong>
                )}
              </Tooltip>
            </p>

          <label className=''>
            {/* {el.title}
            <Tooltip >
              XD
            </Tooltip> */}
            <span
              className={classNames('minter-wizard__keys__pseudo-checkbox', {
                'required': el.required,
                'minter-wizard__keys__pseudo-checkbox--active': el.required ?? field.value.includes(el.value)
              })}
            />
            {el.required ? (
                <input type='checkbox' checked={true}/>
              ) : (
                <Field type='checkbox' name='keys' value={el.value} />
                )}
          </label>
          </div>
        ))}

      </div>
    </>
  )
}


export default MinterWizardKeys;
