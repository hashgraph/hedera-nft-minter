import React from 'react';
import { Field, useField } from 'formik';
import classNames from 'classnames';
import map from 'lodash/map';

import { TOKEN_KEY } from '@utils/entity/TokenKeys';

import Tooltip from '@components/shared/form/Tooltip';


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
    tooltip?: string,
}

export interface MinterWizardKeysProps {
  data: MinterWizardKey[],
  label: string,
  name: string,
}

const MinterWizardKeys = ({ data, name }: MinterWizardKeysProps) => {
  const [field] = useField<TOKEN_KEY[]>(name);

  return (
    <>
      <p className='title--medium title--strong'>Keys:</p>
      <div role='group' aria-labelledby='checkbox-group-keys' className='minter-wizard__keys'>
        {map(data, (el) => (
          <div className='minter-wizard__keys__checkbox'>
            <p className='title'>
              {el.title}
              {el?.tooltip && (
                <Tooltip >
                  {el.tooltip}

                  {el?.required && (
                    <>
                      <br />
                      <strong>
                        {el.title} key has to be always set!
                      </strong>
                    </>
                  )}
                </Tooltip>
              )}
            </p>

            <label className=''>
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
                )
              }
            </label>
          </div>
        ))}
      </div>
    </>
  )
}


export default MinterWizardKeys;
