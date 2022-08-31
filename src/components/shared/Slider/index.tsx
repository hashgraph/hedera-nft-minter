import React, { CSSProperties, useContext, useRef, useState, useEffect, useCallback } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';

import './slider.scss';
import { sum } from 'lodash';
import useLayout from '@utils/hooks/useLayout';
import { MinterWizardStepWrapperContext } from '@components/shared/minter-wizard/StepWrapper';
import Tab from './Tab';

export type SliderTabData =  {
    title: string;
    content: string | React.ReactNode
}

type SliderProps = {
    data: SliderTabData[];
    activeIndex: number
}

export default function Slider({ data, activeIndex }: SliderProps) {

    const ref = useRef<HTMLDivElement>(null);
    const [transitionWidth, setTransitionWidth] = useState(0);
    const { isMobile, wasWizardSummaryScreen } = useLayout()
    const { isFirstScreen } = useContext(MinterWizardStepWrapperContext)


    const containerRef = useRef<HTMLDivElement>(null)

    const getTransitionWidth = useCallback(() => {
      if(containerRef.current) {
        if(isMobile) {
          return (
            activeIndex < 1
              ? 0
              : sum(map(containerRef.current?.childNodes, (child : HTMLDivElement) => (
                  child.clientWidth
                ))?.slice(0, activeIndex === 0 ? 1 : activeIndex))
          )
        }

        return (
          activeIndex < 1
            ? 0
            : sum(map(containerRef.current?.childNodes, (child : HTMLDivElement) => (
                child.clientWidth
            ))?.slice(0, isFirstScreen ? activeIndex : activeIndex - 1))
        )
      }

      return 0

    }, [activeIndex, isMobile, isFirstScreen])


    useEffect(() => {
      const handler = () => {
        setTransitionWidth(getTransitionWidth() )

        // console.log({wasWizardSummaryScreen, xd: getTransitionWidth() * (wasWizardSummaryScreen ? 0.64 : 1)})
        // if(wasWizardSummaryScreen) {
        //     setWasWizardSummaryScreen(false)
        //     // if(getTransitionWidth() > 0)
        //     return

        //   }

        // setTransitionWidth(getTransitionWidth() * (wasWizardSummaryScreen ? 1 : 0.64))
        // if(wasWizardSummaryScreen) {
        //   setWasWizardSummaryScreen(false)
        // }
      }
      handler()

      window.addEventListener('resize', handler)

      return () => window.removeEventListener('resize', handler)
    }, [getTransitionWidth, setTransitionWidth, wasWizardSummaryScreen])


    return (
        <div className='slider__tabs' ref={ref}>
            {data && data.length > 0 &&  (
                <div
                  className='slider__container'
                  ref={containerRef}
                  style={{'--translateDimension': `calc(${ -transitionWidth }px )` } as CSSProperties}

                >
                    {filter(map(data, (el, index) => ( el &&
                        <Tab
                          key={el.title}
                          el={{
                            index,
                            ...el
                          }}
                          activeIndex={activeIndex}
                        />
                    )), Boolean)}
                </div>
            )}
        </div>
    );
}
