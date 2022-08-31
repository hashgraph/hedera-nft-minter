import React, { useContext, useCallback, useEffect } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import useMinterWizardSummary from '@/utils/hooks/useMinterWizardSummary'
import { MinterWizardContext } from '@/components/shared/minter-wizard/MinterWizardForm'
import placeholder from '@assets/images/placeholder.png';
import './summary.scss'
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';
import loadingHammer from '@assets/images/loading_hammer.svg'
import pick from 'lodash/pick';
import map from 'lodash/map';
import useLayout from '@/utils/hooks/useLayout';
type Props = {
  goToCreator: () => void;
}

export default function MinterWizardSummary({ goToCreator, lastStep }: Props) {
  const { creatorStep, setShowWarning, showWarning, setCreatorStepToBackFromSummary, creatorStepToBackFromSummary } = useContext(MinterWizardContext)
  const minterWizardSummary = useMinterWizardSummary(creatorStep)
  const { isSubmitting } = useFormikContext()
  const {setWasWizardSummaryScreen, wasWizardSummaryScreen} = useLayout();
  const { values } = useFormikContext<FormikValues>()

  const handleGoToCreator = useCallback(() => {
    console.log({wasWizardSummaryScreen})
    if(!wasWizardSummaryScreen) {
      setWasWizardSummaryScreen(true)
      setCreatorStepToBackFromSummary(lastStep);
      goToCreator()
    }
  }, [setCreatorStepToBackFromSummary, lastStep, setWasWizardSummaryScreen, goToCreator, wasWizardSummaryScreen])

  useEffect(() => {
    setCreatorStepToBackFromSummary(lastStep)
  }, [creatorStep, creatorStepToBackFromSummary, lastStep, setCreatorStepToBackFromSummary])

  return (
    <>
      <div className='minter-wizard__final-summary minter-wizard__animation-container container--padding'>
        <div className='summary'>
          <SwitchTransition>
            <CSSTransition
              key={isSubmitting ? 'submitting' : 'waiting'}
              addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
              classNames='fade'
            >
              {isSubmitting ? (
                <div className='minter-wizard__summary'>
                 <div>

                  <p className='title--small title--strong'>Processing...</p>
                  <div className='minter-wizard__summary__image'>
                    <img
                      src={values?.image
                        ? URL.createObjectURL(values?.image)
                        : placeholder
                      }
                      alt='Thumb'
                    />
                    <ul className='minter-wizard__summary__item-list'>
                      {map(pick(values, ['name', 'symbol', 'edition_name', 'creator', 'description']), value => (
                        value && <li>{value}</li>
                      ))}
                      {/* <li>{values?.symbol}</li>
                      <li>{values?.edition_name}</li>
                      <li>{values?.creator}</li>
                      <li>{values?.description}</li> */}
                    </ul>
                  </div>
                 </div>
                  <div className='minter-wizard__summary__loader'>
                    <img src={loadingHammer} alt='loader_hammer' />
                    <p className='title title--small title--strong'>
                      Minting <br />
                      in progress...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {minterWizardSummary}

                  <div className='minter-wizard__creator__nav--summary'>
                    <div className='prev'>
                      <button
                        className='btn--arrow-left'
                        type='button'
                        onClick={showWarning ? () => setShowWarning(false) : handleGoToCreator }
                      >
                        Back
                      </button>
                    </div>
                    <div className='next'>
                      <SwitchTransition>
                        <CSSTransition
                          key={showWarning ? 'warning' : 'submit'}
                          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                          classNames='fade'
                        >
                          {!showWarning ? (
                            <button
                              className='btn--arrow'
                              type='button'
                              onClick={() => setShowWarning(true)}
                              disabled={isSubmitting}
                            >
                              Mint it!
                            </button>
                          ) : (
                            <button
                              className='btn--arrow-green'
                              type='submit'
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Finish in wallet...' : 'YES! Mint it!'}
                            </button>
                          )}
                        </CSSTransition>
                      </SwitchTransition>

                    </div>
                  </div>
                </>
              )}
            </CSSTransition>
          </SwitchTransition>

        </div>

      </div>
      {/* </CSSTransition> */}

    </>
  )
}
