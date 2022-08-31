import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { JSX } from '@babel/types'
import { Scrollbar } from 'react-scrollbars-custom';

import { inRange } from 'lodash';
import classNames from 'classnames';
import useLayout from '@utils/hooks/useLayout';
import { SliderTabData } from './';

type SliderTab = SliderTabData & { index: number}
type SliderTabProps = {
  el: SliderTab,
  activeIndex: number,
}

export default function Tab({ activeIndex, el} : SliderTabProps) {
  const { isMobile } = useLayout()
  const ref = useRef<HTMLDivElement>(null)
  const [needsScrollPadding, setNeedsScrollPadding] = useState(false)

  const checkIsCardVisible = useCallback((cardIndex: number) => (
    isMobile
      ? (
          cardIndex === activeIndex
        ) : (
          inRange(cardIndex, activeIndex-1, activeIndex+1)
      )
  ), [activeIndex, isMobile])

  const childNode = useMemo(() => ref?.current?.childNodes[0] as HTMLElement | undefined, [ref])

  const needsScroll = useMemo(() => childNode && childNode?.scrollHeight > childNode?.clientHeight, [childNode])

  useEffect(() => {
    const curr = ref.current
    const handler = () => {
      if(curr) {
        const child = curr.childNodes[0] as  HTMLDivElement | null

        if(child && inRange(el.index, activeIndex-1, activeIndex+1)) {
          setNeedsScrollPadding(child.scrollHeight > child.clientHeight);
        }
      }
    }

    if(curr) {

      handler()


      ref.current.addEventListener('resize', handler)

      return () => curr.removeEventListener('resize', handler)
    }
  }, [activeIndex, el.index, ref])

  return (
    <div
      ref={ref}
      tabIndex={el.index === activeIndex ? 0 : -1}
      className={classNames('slider__tabs__tab', {
        'slider__tabs__tab--visible': checkIsCardVisible(el.index),
        first: el.index === activeIndex - 1,
        second: el.index === activeIndex,
        veryFirst: el.index === 0,
        'w40': el.index < activeIndex - 1,
        'w60': el.index > activeIndex + 1,
        'needsScrollPadding': needsScroll
      })}
    >
      <Scrollbar
        // noDefaultStyles
        wrapperProps={{
          renderer: (props) => {
            const { elementRef, ...restProps } = props;
            return <div {...restProps} ref={elementRef} style={{}} />;
          },
        }}
      >
        <div className='minter-wizard__tab'>
          <el.content creatorStep={activeIndex}/>
        </div>
      </Scrollbar>
    </div>
  );
}
