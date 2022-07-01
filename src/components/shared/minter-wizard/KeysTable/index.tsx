import React, { useCallback, useMemo } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';

import { TokenKey, TOKEN_KEY } from '@utils/entity/TokenKeys';
import Error from '@components/shared/form/Error';
import FieldSelect from '@/components/shared/form/FieldSelect';
import classNames from 'classnames';

import './keys-table.scss'

export const TokenKeys = [
  { title: 'Treasury Account ID', value: TOKEN_KEY.TREASURY, required: true },
  { title: 'Supply key', value: TOKEN_KEY.SUPPLY, required: true },
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

  const tokenKeys = useMemo<MinterWizardKey[]>(() => data, [data]);

  const checkIfIsTokenKeyRequired = useCallback((index) => !!tokenKeys[index]?.required, [tokenKeys])

  const renderOptions = useCallback(() => {
    const keys = tokenKeys.map((key) => {
      // Form rows for required token keys are always rendered and
      // cannot be deleted, so required keys are not shown as select option.
      if (key.required) {
        return
      }

      //Check, if value is already selected,
      for (const { type } of field.value) {
        if (type === key.value) {
          // if yes, return option with passed disabled prop.
          return (
            <option key={key.value} disabled value={key.value}>
              {key.title} key
            </option>
          );
        }
      }

      return (
        <option key={key.value} value={key.value}>
          {key.title} key
        </option>
      );
    })

    keys.unshift((
      <option key={'key.blank'} value={''}>
        Select key
      </option>
    ))

    return keys
  },
    [field, tokenKeys]
  );

  const renderKey = useCallback((
    index: number,
    remove: (index: number) => void,
  ) => {
    const isTokenKeyRequired = checkIfIsTokenKeyRequired(index);
    const baseClassName = 'keys-table__row'
    const className = classNames(baseClassName, {
      [baseClassName + '_firsts']: isTokenKeyRequired
    })

    return (
      <div className={className}>
        <div className='keys-table__col'>
          {isTokenKeyRequired ? (
            <>
              <label htmlFor={`account_${ index }`} className='keys-table__col--label'>
                {tokenKeys[index].title !== 'Treasury Account ID' ? `${ tokenKeys[index].title } key` : tokenKeys[index].title}
              </label>
              <Field
                name={`${ name }.${ index }.type`}
                type='hidden'
                value={tokenKeys[index].value}
                checked
              />
            </>
          ) : (
            <FieldSelect name={`${ name }.${ index }.type`} className='keys-table__col--label'>
              {renderOptions()}
            </FieldSelect>
          )}
          <div className='keys-table__col--input'>
            <Field
              name={`${ name }.${ index }.value`}
              type='radio'
              value='account'
            />
          </div>
          <div className='keys-table__col--input-2'>
            <Field name={`${ name }.${ index }.value`} type='radio' value='custom' />
          </div>
          <div className='keys-table__col--remove-button'>
            {isTokenKeyRequired ? (
              <button type='button' disabled>
                Del
              </button>
            ) : (
              <button type='button' onClick={() => remove(index)}>
                Del
              </button>
            )}
          </div>

        </div>

        <SwitchTransition>
          <CSSTransition
            timeout={300}
            key={field.value[index].value}
            addEndListener={(node: HTMLElement, done: () => void) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames='form__group__item'
          >
            <div>
              {field.value[index]?.value === 'custom' && (
                <div className='mb-1'>
                  <label htmlFor={`${ name }.${ index }.key`}>Enter custom {tokenKeys[index].title} key:</label>
                  <div className='form__group__table__row__custom-key w-100'>
                    <Field name={`${ name }.${ index }.key`} type='text' />
                    <Error name={`${ name }.${ index }.key`} />
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }, [field, renderOptions, checkIfIsTokenKeyRequired, tokenKeys, label, name]);

  const keysTableClassNames = classNames('keys-table', {
    'keys-table--single': tokenKeys.length <= 1
  })
  const keysTableHeaderClassNames = classNames('keys-table__header', {
    'keys-table__header--single': tokenKeys.length <= 1
  })

  return (
    <div className='form__group-row form__group-row-mt'>
      <FieldArray
        name={name}
        render={({ push, remove }) => (
          <div className={keysTableClassNames}>
            <div className='form__group__label-wrapper'>
              <label htmlFor='null'>{label}</label>
              {tokenKeys.length > 1 && (
                <button
                  onClick={() =>
                    field.value.length < tokenKeys.length
                      ? push({ value: 'account', type: '', key: '' })
                      : toast.error('Enough!')
                  }
                  type='button'
                  className='btn--big'
                >
                  Add
                </button>
              )}
            </div>

            <div className={keysTableHeaderClassNames}>
              <label htmlFor='null'>{''}</label>
              <label htmlFor={'account_0'}>My account</label>
              <label htmlFor={'custom_0'}>Custom</label>
              {tokenKeys.length > 1 && (
                <label htmlFor='null'>{'Del'}</label>
              )}
            </div>

            <TransitionGroup >
              {field.value.map((_, index) =>
                <CSSTransition
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${ index }.form__group__item`}
                  timeout={300}
                  classNames='form__group__item'
                >
                  {renderKey(index, remove)}
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        )}
      />
    </div>
  );
};

export default MinterWizardKeys;
