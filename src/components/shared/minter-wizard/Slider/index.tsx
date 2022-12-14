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

import React, { CSSProperties, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { JSX } from '@babel/types'
import map from 'lodash/map';
import filter from 'lodash/filter';
import sum from 'lodash/sum';

import useLayout from '@utils/hooks/useLayout';
import Tab from '@components/shared/minter-wizard/Slider/Tab';

const HORIZONTAL_PADDING_DESKTOP = 70
const SLIDE_HORIZONTAL_PADDING_DESKTOP = HORIZONTAL_PADDING_DESKTOP / 2
const SLIDE_HORIZONTAL_PADDING_OF_ONE_SIDE_DESKTOP = SLIDE_HORIZONTAL_PADDING_DESKTOP / 2
const BIG_COLUMN_WIDTH_PERCENTAGE = .6
const SMALL_COLUMN_WIDTH_PERCENTAGE = .4

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { isDesktop } = useLayout()

  const getTransitionWidth = useCallback(() => {
    if (!containerRef.current) {
      return 0
    }

    if (isDesktop) {
      const bigColumnWidth = ((containerRef.current?.clientWidth ?? 0) * BIG_COLUMN_WIDTH_PERCENTAGE)

      const smallColumnWidth =
        ((containerRef.current?.clientWidth ?? 0) * SMALL_COLUMN_WIDTH_PERCENTAGE)
          - SLIDE_HORIZONTAL_PADDING_OF_ONE_SIDE_DESKTOP

      return (
        activeIndex <= 1
          ? 0
          : sum(map(containerRef.current?.childNodes, (_, index: number) => (
              index === activeIndex
                ? bigColumnWidth
                : smallColumnWidth
            ))?.slice(0, activeIndex - 1))
      )
    }

    const isFirstSlide = activeIndex === 0
    const slidesToShow = isFirstSlide ? 1 : activeIndex

    return (
      activeIndex < 1
        ? 0
        : sum(map(containerRef.current?.childNodes, (child : HTMLDivElement) => (
            child.clientWidth
          ))?.slice(0, slidesToShow))
    )
  }, [activeIndex, isDesktop])

  const tabsProps = useMemo(() => (
    filter(map(data, (el, index) => (el && {
      key: el.key,
      el: {
        index,
        ...el
      },
      activeIndex
    })), Boolean)
  ), [activeIndex, data])

  const renderTabs = useCallback(() => (
    map(tabsProps, tabProps => (
      <Tab {...tabProps} />
    ))
  ), [tabsProps])

  useEffect(() => {
    const handler = () => {
      setTransitionWidth(getTransitionWidth())
    }

    handler()

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [getTransitionWidth, setTransitionWidth])

  return (
    <div className='minter-wizard__slider__tabs'>
      {data && data.length > 0 &&  (
        <div
          className='minter-wizard__slider__container'
          ref={containerRef}
          style={{'--translateDimension': `${ -transitionWidth }px` } as CSSProperties}
        >
          {renderTabs()}
        </div>
      )}
    </div>
  );
}
