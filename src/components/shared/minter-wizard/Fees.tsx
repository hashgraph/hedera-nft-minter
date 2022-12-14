/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, { useCallback, useMemo } from 'react';
import { FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';

import { Fees, FEE } from '@utils/entity/Fees';
import FieldSelect from '@components/shared/form/FieldSelect';
import RoyaltyFee from '@components/shared/minter-wizard/Fees/Royalty';
import FixedFee from '@components/shared/minter-wizard/Fees/Fixed';

import thrashIcon from '@assets/images/icons/thrash.svg'
import plusIcon from '@assets/images/icons/plus.svg'

const MinterWizardFees = () => {
  const [field] = useField<Fees[]>('fees');

  const renderFeeFieldset = useCallback((fee: FEE, arrayIndex: number) => {
    switch (fee) {
      case FEE.ROYALTY:
        return <RoyaltyFee index={arrayIndex} />;
      case FEE.FIXED:
        return <FixedFee index={arrayIndex} />;
      default:
        return;
    }
  }, []);

  const hasAnyValues = useMemo(() =>
    field.value.length > 0,
  [field.value])

  return (
    <div className='form__group__row'>
      <FieldArray
        name='fees'
        render={({ push, remove }) => (
          <div className='form__row__fees'>
            <div className='form__group__label__wrapper'>
              <p className='title title--medium title--strong'>Royalty Fees:</p>
              <button
                onClick={() =>
                  field.value.length < 10 ? push({
                    type: '',
                    feeCollectorAccountId: '',
                  }) : toast.error('Enough!')
                }
                type='button'
                className='form__group__button'
              >
                <img width={15} height={15} src={plusIcon} alt='plus_icon' />
              </button>
            </div>
            {!hasAnyValues && (
              <div className='form__row'>
                <p>Click the + to add Royalties to the Collection</p>
              </div>
            )}
            <TransitionGroup className='form__group__list'>
              {field.value.map((_, index) => (
                <CSSTransition
                  // eslint-disable-next-line react/no-array-index-key
                  key={`fee_field_${ index }.form__group__item`}
                  timeout={500}
                  classNames='form__group__item'
                >
                  <div className='form__row__fees-container'>
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`fees_${ index }_row`}
                      className='form__row__fees-wrapper'
                    >
                      <div className='form__row__fees__fee-container'>
                        <div className='form__select_row'>
                          <FieldSelect name={`fees.${ index }.type`}>
                            <option value=''>Select a fee type...</option>
                            <option value={FEE.ROYALTY}>Royalty Fee</option>
                            <option value={FEE.FIXED}>Fixed Fee</option>
                          </FieldSelect>
                        </div>
                        <button
                          type='button'
                          className='form__group__button'
                          onClick={() => remove(index)}
                        >
                          <img width={13} height={16} src={thrashIcon} alt='thrash' />
                        </button>
                        </div>
                        <SwitchTransition>
                          <CSSTransition
                            timeout={300}
                            key={field.value[index].type}
                            addEndListener={(
                              node: HTMLElement,
                              done: () => void
                            ) =>
                              node.addEventListener('transitionend', done, false)
                            }
                            classNames='form__group__item'
                          >
                            <>
                              {renderFeeFieldset(field.value[index].type, index)}
                            </>
                          </CSSTransition>
                        </SwitchTransition>
                      </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        )}
      />
    </div>
  );
};

export default MinterWizardFees;
