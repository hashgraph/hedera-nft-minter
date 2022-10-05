import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { CSSTransition } from 'react-transition-group';
import { useOnClickAway } from 'use-on-click-away';

import './tooltip.scss'

type TooltipProps = {
  title?: string,
  children?: React.ReactNode,
  showLabel?: boolean,
};

export default function Tooltip({showLabel, title, children}: TooltipProps) {
  const [showPopper, setShowPopper] = useState(false);

  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

  const { styles } = usePopper(buttonRef.current, popperRef.current, {
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
    ],
  });

  useOnClickAway(buttonRef, () => {
    setShowPopper(false);
  });

  return (
    <div className='tooltip__container'>
      <div className='tooltip__button' ref={buttonRef} onClick={() => setShowPopper(true)}>
        {showLabel && 'Show hint'}
      </div>
      <CSSTransition
        in={showPopper}
        timeout={300}
        classNames='tooltip__wrapper'
        unmountOnExit
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      >
        <div ref={setArrowRef} className='tooltip__wrapper' style={{...styles.popper}} >
          {title && <h1>{title}</h1>}
          <p>{children}</p>
          <button type='button' onClick={() => setShowPopper(false)}>
            Close hint
          </button>
        </div>
      </CSSTransition>
    </div>
  )
}
