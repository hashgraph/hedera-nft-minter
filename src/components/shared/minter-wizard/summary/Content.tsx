import React, { useContext } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import { MinterWizardContext } from '@/components/views/minter-wizard';

import Scrollbar from '@components/shared/layout/Scrollbar';
import SummaryRow from '@/components/shared/minter-wizard/summary/SummaryRow';
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';
import SummaryProperties from '@/components/shared/minter-wizard/summary/Properties';
import SummaryAttributes from '@/components/shared/minter-wizard/summary/Attributes';
import SummaryAdvanced, {
  AdvancedTypes,
} from '@/components/shared/minter-wizard/summary/Advanced';

import placeholder from '@assets/images/placeholder.png';

export default function SummaryContent() {
  const { values } = useFormikContext<FormikValues>();
  const { showWarning } = useContext(MinterWizardContext);

  return (
    <Scrollbar
      renderOn={{
        laptop: false,
        desktop: false,
        desktopWide: false,
        desktopExtraWide: false,
      }}
    >
      <div className='minter-wizard__summary__content'>
        <div className='minter-wizard__summary__content--avatar'>
          <p className='title title--small title--strong'>NFT Summary:</p>
          <div className='minter-wizard__summary__image'>
            <img
              src={
                values?.image ? URL.createObjectURL(values?.image) : placeholder
              }
              alt='Thumb'
            />
          </div>
        </div>

        <div className='minter-wizard__summary__content--offchain minter-wizard__summary__column--gutter'>
          <Scrollbar
            renderOn={{
              mobileSmall: false,
              mobile: false,
              tablet: false,
            }}
          >
            <div className='minter-wizard__summary__column'>
              <SummaryRows
                data={[
                  {
                    title: 'Collection name:',
                    fieldValue: values?.name,
                  },
                  {
                    title: 'Collection symbol:',
                    fieldValue: values?.symbol,
                  },
                  {
                    title: 'NFT name:',
                    fieldValue: values?.edition_name,
                  },
                  {
                    title: 'NFT created by:',
                    fieldValue: values?.creator,
                  },
                ]}
              />
              <SummaryRow
                className='minter-wizard__summary__row--description'
                fieldValue={values?.description}
                title='NFT description'
              />
              <SummaryAttributes />
              <SummaryProperties />
            </div>
          </Scrollbar>
        </div>
        <div className='minter-wizard__summary__content--onchain minter-wizard__summary__column--gutter-left'>
          <Scrollbar
            renderOn={{
              mobileSmall: false,
              mobile: false,
              tablet: false,
            }}
          >
            <>
              <SwitchTransition>
                <CSSTransition
                  key={showWarning ? 'warning' : 'submit'}
                  addEndListener={(node, done) =>
                    node.addEventListener('transitionend', done, false)
                  }
                  classNames='fade'
                >
                  {!showWarning ? (
                    <div className='minter-wizard__summary__column--mobile-invisible'>
                      <div className='minter-wizard__summary__column'>
                        <SummaryRows
                          data={[
                            {
                              title: 'Max supply:',
                              fieldValue: values?.maxSupply,
                            },
                            {
                              title: 'NFT to mint:',
                              fieldValue: values?.qty,
                            },
                          ]}
                        />

                        <SummaryAdvanced name={AdvancedTypes.fees} />
                        <SummaryAdvanced name={AdvancedTypes.keys} />
                      </div>
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
                  )}
                </CSSTransition>
              </SwitchTransition>
              <div className='minter-wizard__summary__column--mobile-visible'>
                <div className=''>
                  <div className='minter-wizard__summary__column'>
                    <SummaryRows
                      data={[
                        {
                          title: 'Max supply:',
                          fieldValue: values?.maxSupply,
                        },
                        {
                          title: 'NFT to mint:',
                          fieldValue: values?.qty,
                        },
                      ]}
                    />

                    <SummaryAdvanced name={AdvancedTypes.fees} />
                    <SummaryAdvanced name={AdvancedTypes.keys} />
                  </div>
                </div>
              </div>
            </>
          </Scrollbar>
        </div>
      </div>
    </Scrollbar>
  );
}
