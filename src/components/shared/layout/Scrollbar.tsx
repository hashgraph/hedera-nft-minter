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

import React, { useMemo } from 'react'
import { JSX } from '@babel/types';
import Scrollbar from 'react-scrollbars-custom';
import omit from 'lodash/omit';
import RenderWrapperOn, { RenderOnProps } from '@components/hoc/RenderWraperOn';

type ScrollerProps = {
  children: JSX.Element;
  renderOn?: RenderOnProps
}

const INITIAL_SCROLLER_RENDER_ON_PROPS: RenderOnProps = {
  mobileSmall: true,
  mobile: true,
  tablet: true,
  laptop: true,
  desktop: true,
  desktopWide: true,
  desktopExtraWide: true,
}

export default function ScrollbarWrapper({ children, renderOn }: ScrollerProps) {

  const renderOnBreakpoints = useMemo(() => ({
    ...INITIAL_SCROLLER_RENDER_ON_PROPS,
    ...renderOn,
  }), [renderOn])

  return (
    <RenderWrapperOn
      renderOnBreakpoints={ renderOnBreakpoints }
      wrapper={
        <Scrollbar
          className='scrollbar'
          noScrollX
          children={children}
          scrollerProps={{
            renderer: ({ elementRef, ...restProps }) => (
              <div
                { ...restProps }
                ref={ elementRef }
                className='scrollbar__scroller'
                style={ {
                  ...omit(restProps.style, ['paddingRight']),
                } }
              />
            ),
          }}
          wrapperProps={{
            renderer: ({ elementRef, ...restProps }) => (
              <div { ...omit(restProps, ['style']) } ref={ elementRef } />
            ),
          }}
          trackYProps={{
            renderer: ({ elementRef, ...restProps }) => (
              <div { ...restProps } ref={ elementRef } className='scrollbar__track-y' />
            )
          }}
        />
      }
    >
      { children }
    </RenderWrapperOn>
  )
}
