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

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [positionY, setPositionY] = useState(0);

  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickAway(tooltipRef, () => {
    setShow(false);
  });

  const updatePositionY = useCallback(()=>{
    if (containerRef?.current) {
      setPositionY(containerRef.current?.offsetTop ?? 0)
      if (tooltipRef.current) {
        tooltipRef.current.style.setProperty('--position-y', `${ positionY.toString() }px`)
      }
    }
  },[positionY, setPositionY])

  useEffect(()=>{
    updatePositionY()

    window.addEventListener('resize', updatePositionY)
    return () => window.removeEventListener('resize', updatePositionY)
  },[updatePositionY])


  return <div className='tooltip__container' ref={containerRef}>
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
      <div ref={tooltipRef} className='tooltip__wrapper'>
        {title && <h1>{title}</h1>}
        <p>{children}</p>
        <button type='button' onClick={ () => setShow(false) }>
          Close hint
        </button>
      </div>
    </CSSTransition>

  </div>;
};

export default Tooltip;


















