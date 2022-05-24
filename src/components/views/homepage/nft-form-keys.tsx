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

const NftFormKeys = () => {
  const [field] = useField<TokenKey[]>('keys');

  const tokenKeys = useMemo(() => [
    { title: 'Treasury', value: TOKEN_KEY.TREASURY },
    { title: 'Supply', value: TOKEN_KEY.SUPPLY },
    { title: 'KYC', value: TOKEN_KEY.KYC },
    { title: 'Admin', value: TOKEN_KEY.ADMIN },
    { title: 'Freeze', value: TOKEN_KEY.FREEZE },
    { title: 'Wipe', value: TOKEN_KEY.WIPE },
    { title: 'Pause', value: TOKEN_KEY.PAUSE },
  ], []);

  const renderOptions = useCallback(() => {
      const keys = tokenKeys.map((key, index) => {
        if(index < 2) {
          return
        }
        for (const { type } of field.value) {
          if (type === key.value) {
            return (
              <option key={key.value} disabled value={key.value}>
                {key.title}
              </option>
            );
          }
        }
        return (
          <option key={key.value} value={key.value}>
            {key.title}
          </option>
        );
      })
      keys.unshift((
        <option key={'key.blank'} value={''}>
          Select
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
    const baseClassName = 'form__group__table__row-container'
    const className = classNames(baseClassName ,{
      [baseClassName+'_firsts']: index < 2
    })
    return (
      <div className={className}>
        <div className='form__group__table__row flex'>
          {index < 2 ?
            <>
              <label htmlFor={`account_${ index }`}>
                {index === 0 ? 'Treasury account ID' : 'Supply key'}
              </label>
              <Field
                name={`keys.${ index }.type`}
                type='hidden'
                value={index === 0 ? 'treasuryAccountId' : 'supplyKey'}
                checked
              />
            </>
            :
            <FieldSelect name={`keys.${ index }.type`}>
              {renderOptions()}
            </FieldSelect>
          }
          <div className='form__select_row__radios flex-center'>
            <Field
              name={`keys.${ index }.value`}
              type='radio'
              value='account'
            />
          </div>
          <div className='form__select_row__radios flex-center'>
            <Field name={`keys.${ index }.value`} type='radio' value='custom' />
          </div>
          {
            index < 2 ?
              <div className='form__group__table__row-disabled-buton'>
                <button type='button'>Del</button>
              </div>
            :
              <div className='form__group__table__row__remove-buton'>
                <button type='button' onClick={() => remove(index)}>
                  Del
                </button>
              </div>
          }
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
                <div className='form__group__table__row w-100'>
                  <label htmlFor={`keys.${ index }.key`}>Value: {field.value[index]?.value}</label>
                  <div className='form__group__table__row__custom-key w-100'>
                    <Field name={`keys.${ index }.key`} type='text' />
                    <Error name={`keys.${ index }.key`} />
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }, [field, renderOptions]);

  return (
    <div className='form__group-row form__group-row-mt'>
      <FieldArray
        name='keys'
        render={({ push, remove }) => (
          <div>
            <div className='form__group__label-wrapper'>
              <label htmlFor='null'>Keys</label>
              <button
                onClick={() =>
                  field.value.length < tokenKeys.length + 1
                    ? push({value: 'account', type: '', key: ''})
                    : toast.error('Enough!')
                }
                type='button'
              >
                Add +
              </button>
            </div>

            <div className='form__group__table__labels__wrapper flex'>
              <label htmlFor='null'>Key name:</label>
              <label htmlFor={'account_0'}>My account value</label>
              <label htmlFor={'custom_0'}>Custom value</label>
            </div>

            <TransitionGroup className='form__group__list'>
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

export default NftFormKeys;
