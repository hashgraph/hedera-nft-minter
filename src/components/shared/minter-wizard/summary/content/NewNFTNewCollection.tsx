import React, {useContext} from 'react';
import { FormikValues, useFormikContext } from 'formik'
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';
import SummaryProperties from '@/components/shared/minter-wizard/summary/SummaryProperties';
import SummaryAttributes from '@/components/shared/minter-wizard/summary/SummaryAttributes';
import placeholder from '@assets/images/placeholder.png';
import SummaryAdvanced, { AdvancedTypes } from '../SummaryAdvanced';
import { MinterWizardContext } from '../../MinterWizardForm';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
export default function NewNftNewCollectionSideSummary() {
  const { values } = useFormikContext<FormikValues>()
  const { showWarning } = useContext(MinterWizardContext)

  return (
    <div className='minter-wizard__summary'>
      <div>
        <p className='title title--small title--strong'>NFT Summary:</p>
        <div className='minter-wizard__summary__image'>
          <img
            src={values?.image
              ? URL.createObjectURL(values?.image)
              : placeholder
            }
            alt='Thumb'
            />
        </div>
      </div>

      <div className='minter-wizard__summary__column--gutter-top'>
        <SummaryRows
          data={[
            {
              title: 'Collection name:',
              fieldValue: values?.name,
            },
            {
              title: 'Collection symbol:',
              fieldValue: values?.symbol
            },
            {
              title: 'NFT name:',
              fieldValue: values?.edition_name
            },
            {
              title: 'NFT created by:',
              fieldValue: values?.creator
            },
            {
              title: 'NFT description:',
              fieldValue: values?.description,
            },
          ]}
        />
        <SummaryAttributes />
        <SummaryProperties />
      </div>
        <SwitchTransition>
            <CSSTransition
              key={showWarning ? 'warning' : 'submit'}
              addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
              classNames='fade'
            >
              {!showWarning
                ? (
                  <div className='minter-wizard__summary__column--gutter-top'>
                    <SummaryRows
                      data={[
                        {
                          title: 'Max supply:',
                          fieldValue: values?.maxSupply
                        },
                        {
                          title: 'NFT to mint:',
                          fieldValue: values?.qty
                        },
                      ]}
                    />

                    <SummaryAdvanced name={AdvancedTypes.fees} />
                    <SummaryAdvanced name={AdvancedTypes.keys} />
                  </div>
                ) : (
                  <div className='minter-wizard__summary__warning'>
                    <p className='title--small title--strong'>
                      Remember... <br />
                      Minting <br />
                      is immutable.
                    </p>
                    <br />
                    <p className='title--small title--strong'>
                      If everything looks <br />
                      fine, go ahead and <br />
                      mint your new NFT!
                    </p>
                  </div>
                )
              }
            </CSSTransition>
          </SwitchTransition>


    </div>
  )
}
