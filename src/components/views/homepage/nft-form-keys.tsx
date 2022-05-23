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

const NftFormKeys = () => {
  const [field] = useField<TokenKey[]>('keys');
  const tokenKeys = useMemo(() => [
    { title: 'KYC', value: TOKEN_KEY.KYC },
    { title: 'Admin', value: TOKEN_KEY.ADMIN },
    { title: 'Freeze', value: TOKEN_KEY.FREEZE },
    { title: 'Wipe', value: TOKEN_KEY.WIPE },
    { title: 'Pause', value: TOKEN_KEY.PAUSE },
    { title: 'Supply', value: TOKEN_KEY.SUPPLY },
  ], []);

  const renderOptions = useCallback(
    () =>
      tokenKeys.map((key) => {
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
      }),
    [field, tokenKeys]
  );

  const renderKey = useCallback((
    index: number,
    remove: (index: number) => void,
  ) => {
    return (
      <div className='form__group__table__row-container'>
        <div className='form__group__table__row flex'>
          <div className='form__select_row'>
            <FieldSelect name={`keys.${ index }.type`}>
              {renderOptions()}
            </FieldSelect>
          </div>
          <div className='flex-center'>
            <Field
              name={`keys.${ index }.value`}
              type='radio'
              value='account'
            />
          </div>
          <div className='flex-center'>
            <Field name={`keys.${ index }.value`} type='radio' value='custom' />
          </div>
            <div className='form__group__table__row__remove-buton'>
              <button type='button' onClick={() => remove(index)}>
                Del
              </button>
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
                <div className='form__group__table__row w-100'>
                  <label htmlFor={`keys.${ index }.key`}>Value: </label>
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
                    ? push({})
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
            <div className='form__group__table__row-container'>
              <div className='flex form__group__table__row '>
                <label htmlFor={'account_0'}>Treasury account ID</label>
                <div className='flex-center'>
                  <Field name={'keys.0.value'} type='radio' value='account' />
                </div>
                <div className='flex-center'>
                  <Field name={'keys.0.value'} type='radio' value='custom' />
                </div>
                <div className='form__group__table__row-disabled-buton'>
                  <button type='button'>Del</button>
                </div>
              </div>

              <SwitchTransition>
                <CSSTransition
                  timeout={300}
                  key={field.value[0].value}
                  addEndListener={(node: HTMLElement, done: () => void) =>
                    node.addEventListener('transitionend', done, false)
                  }
                  classNames='form__group__item'
                >
                  <div>
                    {field.value[0]?.value === 'custom' && (
                      <div className='form__group__table__row w-100'>
                        <label htmlFor={'keys.0.key'}>Value: </label>
                        <div className='form__group__table__row__custom-key w-100'>
                          <Field name={'keys.0.key'} type='text' />
                          <Error name={'keys.0.key'} />
                        </div>
                      </div>
                    )}
                  </div>
                </CSSTransition>
              </SwitchTransition>
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
