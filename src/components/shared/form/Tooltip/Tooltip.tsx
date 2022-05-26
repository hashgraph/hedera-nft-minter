import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickAway } from 'use-on-click-away';

import './tooltip.scss'

type Props = {
  title?: string,
  children?: React.ReactNode,
  showLabel?: boolean,
};

const Tooltip = ({showLabel, title, children }: Props) => {
  const [isShowed, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickAway(ref, () => {
    setShow(false);
  });

  return <div className='tooltip__container'>
    <div
      className='tooltip__button'
      onClick={() => {
      setShow(prev => !prev)
    }}
    >
      {showLabel && 'Show hint'}
    </div>
    <CSSTransition
      in={isShowed}
      timeout={300}
      classNames='tooltip__wrapper'
      unmountOnExit
    >
      <div ref={ref} className='tooltip__wrapper'>
        {title && <h1>{title}</h1>}
        <p>{children}</p>
        <button onClick={()=>setShow(false)}>Close hint</button>
      </div>
    </CSSTransition>

  </div>;
};

export default Tooltip;


















