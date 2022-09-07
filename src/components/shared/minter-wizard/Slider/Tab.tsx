import React, { useCallback, useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import { inRange } from 'lodash';
import classNames from 'classnames';
import useLayout from '@utils/hooks/useLayout';
import { SliderTabData } from '.';

type SliderTab = SliderTabData & { index: number}
type SliderTabProps = {
  el: SliderTab,
  activeIndex: number,
}

export default function Tab({ activeIndex, el} : SliderTabProps) {
  const { isDesktop } = useLayout()
  const ref = useRef<HTMLDivElement>(null)

  const checkIsCardVisible = useCallback((cardIndex: number) => (
    isDesktop
      ? (
        inRange(cardIndex, activeIndex-1, activeIndex+1)
      ) : (
        cardIndex === activeIndex
      )
  ), [activeIndex, isDesktop])

  return (
    <div
      ref={ref}
      tabIndex={el.index === activeIndex ? 0 : -1}
      className={classNames('minter-wizard__slider__tab', {
        'minter-wizard__slider__tab--visible': checkIsCardVisible(el.index),
        'first': el.index === activeIndex - 1,
        'second': el.index === activeIndex && activeIndex > 0,
        'veryFirst': el.index === 0,
        'w40': el.index < activeIndex - 1,
        'w60': el.index > activeIndex + 1,
      })}
    >
      <div className='minter-wizard__slider__tab-content'>
        <Scrollbar
          wrapperProps={{
            renderer: ({ elementRef, ...restProps }) => (
              <div {...restProps} ref={elementRef} style={{}} />
            ),
          }}
        >
          <el.content />
        </Scrollbar>
      </div>
    </div>
  );
}
