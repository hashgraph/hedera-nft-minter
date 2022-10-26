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

export default function Tooltip({ showLabel, title, children }: TooltipProps) {
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
      <div className='tooltip__button' ref={ buttonRef } onClick={ () => setShowPopper(true) }>
        { showLabel && 'Show hint' }
      </div>
      <CSSTransition
        in={ showPopper }
        timeout={ 300 }
        classNames='tooltip__wrapper'
        unmountOnExit
        addEndListener={ (node, done) => node.addEventListener('transitionend', done, false) }
      >
        <div ref={ setArrowRef } className='tooltip__wrapper' style={ { ...styles.popper } }>
          { title && (
            <p className='tooltip__wrapper__title'>
              { title }
            </p>
          ) }
          <p>{ children }</p>
          <button type='button' onClick={ () => setShowPopper(false) }>
            Close hint
          </button>
        </div>
      </CSSTransition>
    </div>
  )
}
