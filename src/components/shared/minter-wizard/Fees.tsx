import React, { useCallback, useMemo } from 'react';
import { FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Switch from '@/components/shared/form/switch/Switch';
import { Fees, FEE, FIXED_FEE_COLLECTING_TYPE, FixedFee } from '@utils/entity/Fees';
import FieldSelect from '@/components/shared/form/FieldSelect';
import Tooltip from '@/components/shared/form/Tooltip';

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
        <div className='form__row__two-columns-flex'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.feeCollectorAccountId`}
              type='text'
              label='Fee collector account ID'
            />
          </div>
          <div className='form__row__two-columns-flex'>
          <div >
            <FieldWrapper
              name={`fees.${ index }.fallbackFee`}
              type='number'
              label='Fallback fee'
            />
          </div>
            <div>
              <FieldWrapper
                name={`fees.${ index }.percent`}
                type='number'
                label='% of royalty'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ),[]);

  const renderFractionalFeeFormFields = useCallback((index: number) => (
    <>
      <Tooltip title='Fractional fee' showLabel>
      A fraction of the transferred units of a token to assess as a fee.
      The amount assessed will never be less than the given minimum_amount,
      and never greater than the given maximum_amount. The denomination is always
      units of the token to which this fractional fee is attached. <br />
        <a
          href='https://docs.hedera.com/guides/docs/hedera-api/token-service/customfees/fractionalfee'
          target='_blank'
        >
            Link to docs
        </a>
      </Tooltip>
      <div className='form__row__fees__fee'>
        <FieldWrapper
          name={`fees.${ index }.feeCollectorAccountId`}
          type='text'
          label='Fee collector account ID'
        />
        <div className='form__row__number-columns'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.min`}
              type='number'
              label='Min'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.max`}
              type='number'
              label='Max'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.percent`}
              type='number'
              label='% of royalty'
            />
          </div>
        </div>

        <Switch
          label='Assessment method'
          name={`fees.${ index }.assessmentMethod`}
          options={[
            { name: 'Inclusive', value: false },
            { name: 'Exclusive', value: true },
          ]}
        />
      </div>
    </>
  ),[]);

  const renderFixedFeeCollectingFormFields = useCallback((index) => {
    switch((field.value[index] as FixedFee).collectingFeeType){
      case FIXED_FEE_COLLECTING_TYPE.TOKEN:
        return (
          <div className='form__row__fees__fee-fixed'>
            <div>
              <FieldWrapper
                name={`fees.${ index }.denominatingTokenId`}
                type='text'
                label='Denominating token ID'
              />
            </div>
            <div>
              <FieldWrapper
                name={`fees.${ index }.amount`}
                type='number'
                label='# amount'
              />
            </div>
          </div>
        )

      case FIXED_FEE_COLLECTING_TYPE.HBARS:
        return (
          <div>
            <FieldWrapper
              name={`fees.${ index }.hbarAmount`}
              type='number'
              label='ℏ amount'
            />
          </div>
        )
      default:
        return null;
    }
  },[field]);

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
        <div className='form__row__two-columns-flex'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.feeCollectorAccountId`}
              type='text'
              label='Fee collector account ID'
            />
          </div>
          <div>
            <label htmlFor={`fees.${ index }.collectingFeeType`}>
            What to collect
            </label>
            <FieldSelect name={`fees.${ index }.collectingFeeType`}>
              <option value=''>Select...</option>
              <option value={FIXED_FEE_COLLECTING_TYPE.TOKEN}>Token</option>
              <option value={FIXED_FEE_COLLECTING_TYPE.HBARS}>HBars</option>
            </FieldSelect>
          </div>
        </div>
        { renderFixedFeeCollectingFormFields(index) }
      </div>
    </>
  ), [renderFixedFeeCollectingFormFields]);

  const renderFeeFieldset = useCallback((fee: FEE, arrayIndex: number) => {
    switch (fee) {
      case FEE.ROYALTY:
        return renderRoyaltyFeeFormFields(arrayIndex);
      case FEE.FRACTIONAL:
        return renderFractionalFeeFormFields(arrayIndex);
      case FEE.FIXED:
        return renderFixedFeeFormFields(arrayIndex);
      default:
        return;
    }
  },[
    renderRoyaltyFeeFormFields,
    renderFractionalFeeFormFields,
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
              <label htmlFor='null'>Transfer fees</label>
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
                Add
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
                            <option value={FEE.FRACTIONAL}>Fractional Fee</option>
                            <option value={FEE.FIXED}>Fixed Fee</option>
                          </FieldSelect>
                        </div>
                        <button type='button' onClick={() => remove(index)}>Del</button>
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
