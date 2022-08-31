import React, { useCallback, useMemo } from 'react';
import { FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import { Fees, FEE } from '@utils/entity/Fees';
import FieldSelect from '@/components/shared/form/FieldSelect';
import Tooltip from '@/components/shared/form/Tooltip';

import thrashIcon from '@assets/images/icons/thrash.svg'
import plusIcon from '@assets/images/icons/plus.svg'

const MinterWizardFees = () => {
  const [field] = useField<Fees[]>('fees');

  const renderRoyaltyFeeFormFields = useCallback((index: number) => (
    <>
      <Tooltip title='Royalty fee' showLabel>
      A fee to assess during a CryptoTransfer that changes ownership of an NFT.
      Defines the fraction of the fungible value exchanged for an NFT that the
      ledger should collect as a royalty. ("Fungible value" includes both ℏ and units of
      fungible HTS tokens.) When the NFT sender does not receive any fungible value, the
      ledger will assess the fallback fee, if present, to the new NFT owner. <br />
        <a
          href='https://docs.hedera.com/guides/docs/hedera-api/token-service/customfees/royaltyfee'
          target='_blank'
        >
            Link to docs
        </a>
      </Tooltip>
      <div className='form__row__fees__fee'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.feeCollectorAccountId`}
              type='text'
              placeholder='e.g. 0.0.1'
              label='Fee collector account ID'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.fallbackFee`}
              type='number'
              label='Fallback fee'
              placeholder='e.g. 5'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.percent`}
              type='number'
              label='% of royalty'
              placeholder='e.g. 10'
            />
          </div>
      </div>
    </>
  ),[]);

  const renderFixedFeeFormFields = useCallback((index: number) => (
    <>
      <Tooltip title='Fixed fee' showLabel>
        A fixed number of units (hbar or token) to ssess as a
        fee during a CryptoTransfer that transfers units of
        the token to which this fixed fee is attached. <br />
        <a
          href='https://docs.hedera.com/guides/docs/hedera-api/token-service/customfees/fixedfee'
          target='_blank'
        >
            Link to docs
        </a>
      </Tooltip>
      <div className='form__row__fees__fee'>
        <FieldWrapper
          name={`fees.${ index }.amount`}
          type='number'
          placeholder='e.g. 15'
          label='# amount ℏ'
        />
      </div>
    </>
  ), []);

  const renderFeeFieldset = useCallback((fee: FEE, arrayIndex: number) => {
    switch (fee) {
      case FEE.ROYALTY:
        return renderRoyaltyFeeFormFields(arrayIndex);
      case FEE.FIXED:
        return renderFixedFeeFormFields(arrayIndex);
      default:
        return;
    }
  },[
    renderRoyaltyFeeFormFields,
    renderFixedFeeFormFields
  ]);

  const hasAnyValues = useMemo(() =>
    field.value.length > 0,
  [field.value])

  return (
    <div className='form__group-row'>
      <FieldArray
        name='fees'
        render={({ push, remove }) => (
          <div className='form__row__fees'>
            <div className='form__group__label-wrapper'>
              <p className='title title--medium title--strong'>Transfer fees:</p>
              <button
                onClick={() =>
                  field.value.length < 10 ? push({
                    type: '',
                    feeCollectorAccountId: '',
                    percent: '',
                  }) : toast.error('Enough!')
                }
                type='button'
                className='btn--big'
              >
                <img width={15} height={15} src={plusIcon} alt='plus_icon' />
              </button>
            </div>
            {!hasAnyValues && (
              <div className='form__row'>
                <p>To add fees click the button above.</p>
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
                        <button type='button' onClick={() => remove(index)}>
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
