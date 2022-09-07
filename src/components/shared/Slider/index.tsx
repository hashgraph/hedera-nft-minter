import React, { CSSProperties, useRef, useState, useEffect, useCallback } from 'react';
import { JSX } from '@babel/types'
import map from 'lodash/map';
import filter from 'lodash/filter';
import sum from 'lodash/sum';

import useLayout from '@utils/hooks/useLayout';
import Tab from '@components/shared/minter-wizard/Slider/Tab';

const HORIZONTAL_PADDING_DESKTOP = 70
const SLIDE_HORIZONTAL_PADDING_DESKTOP = HORIZONTAL_PADDING_DESKTOP / 2
const SLIDE_HORIZONTAL_PADDING_OF_ONE_SIDE_DESKTOP = SLIDE_HORIZONTAL_PADDING_DESKTOP / 2

export type SliderTabData =  {
    key: string;
    content: string | (() => JSX.Element);
}

type SliderProps = {
    data: SliderTabData[];
    activeIndex: number
}


export default function Slider({ data, activeIndex }: SliderProps) {
  const [transitionWidth, setTransitionWidth] = useState(0);
  const { isDesktop } = useLayout()
  const ref = useRef<HTMLDivElement>(null);


  const containerRef = useRef<HTMLDivElement>(null)

  const getTransitionWidth = useCallback(() => {
    if(containerRef.current) {
      if(!isDesktop) {
        return (
          activeIndex < 1
            ? 0
            : sum(map(containerRef.current?.childNodes, (child : HTMLDivElement) => (
                child.clientWidth
              ))?.slice(0, activeIndex === 0 ? 1 : activeIndex))
        )
      }

      return (
        activeIndex <= 1
          ? 0
          : sum(map(containerRef.current?.childNodes, (_, index: number) => (
            index === activeIndex
              ? (containerRef.current?.clientWidth ?? 0) * .6
              : ((containerRef.current?.clientWidth ?? 0) * .4) - SLIDE_HORIZONTAL_PADDING_OF_ONE_SIDE_DESKTOP
          ))?.slice(0, activeIndex - 1))
      )
    }

    return 0

  }, [activeIndex, isDesktop])


  useEffect(() => {
    const handler = () => {
      setTransitionWidth(getTransitionWidth() )
    }
    handler()

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [getTransitionWidth, setTransitionWidth])


  return (
    <div className='minter-wizard__slider__tabs' ref={ref}>
      {data && data.length > 0 &&  (
        <div
          className='minter-wizard__slider__container'
          ref={containerRef}
          style={{'--translateDimension': `calc(${ -transitionWidth }px )` } as CSSProperties}
        >
          {filter(map(data, (el, index) => ( el &&
            <Tab
              key={el.key}
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
