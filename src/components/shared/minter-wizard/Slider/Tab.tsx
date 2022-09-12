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
      tabIndex={el.index === activeIndex ? 0 : -1}
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
