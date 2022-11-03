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
import inRange from 'lodash/inRange';
import classNames from 'classnames';

import useLayout from '@utils/hooks/useLayout';
import Scrollbar from '@components/shared/layout/Scrollbar'
import { SliderTabData } from '@components/shared/minter-wizard/Slider';

type SliderTab = SliderTabData & { index: number}
type SliderTabProps = {
  el: SliderTab,
  activeIndex: number,
}

export default function Tab({ activeIndex, el} : SliderTabProps) {
  const { isDesktop } = useLayout()

  const checkIsCardVisible = useCallback((cardIndex: number) => (
    isDesktop
      ? (
        inRange(cardIndex, activeIndex - 1, activeIndex + 1)
      ) : (
        cardIndex === activeIndex
      )
  ), [activeIndex, isDesktop])

  const tabClassNames = useMemo(() => (
    classNames('minter-wizard__slider__tab', {
      'minter-wizard__slider__tab--visible': checkIsCardVisible(el.index),
      'minter-wizard__slider__tab--small-column': el.index === activeIndex - 1,
      'minter-wizard__slider__tab--big-column': el.index === activeIndex && activeIndex > 0,
      'minter-wizard__slider__tab--very-first-column': el.index === 0,
      'minter-wizard__slider__tab--w40': el.index < activeIndex - 1,
    })
  ), [activeIndex, checkIsCardVisible, el.index])

  return (
    <div
      className={tabClassNames}
    >
      <div className='minter-wizard__slider__tab-content'>
        <Scrollbar>
          <el.content />
        </Scrollbar>
      </div>
    </div>
  );
}
