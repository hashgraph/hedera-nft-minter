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

import { useCallback, useMemo } from 'react'
import map from 'lodash/map';
import find from 'lodash/find';
import { JSX } from '@babel/types'
import useLayout from '@utils/hooks/useLayout';

export type RenderOnProps = {
  mobileSmall?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  laptop?: boolean;
  desktop?: boolean;
  desktopWide?: boolean;
  desktopExtraWide?: boolean;
}

type RenderWrapperOnProps = {
  renderOnBreakpoints: RenderOnProps,
  wrapper: JSX.Element,
  children: JSX.Element
}

export default function RenderWrapperOn({
  renderOnBreakpoints,
  wrapper,
  children
} : RenderWrapperOnProps) {
  const {
    isDesktopExtraWide,
    isDesktopWide,
    isDesktop,
    isLaptop,
    isTablet,
    isMobile,
    isMobileSmall
  } = useLayout();

  const renderWrapperOnTable = useMemo(() => ([
    {
      isLayoutBreakpointAchived: isDesktopExtraWide,
      renderOnBreakpoint: renderOnBreakpoints.desktopExtraWide
    },
    {
      isLayoutBreakpointAchived: isDesktopWide,
      renderOnBreakpoint: renderOnBreakpoints.desktopWide
    },
    {
      isLayoutBreakpointAchived: isDesktop,
      renderOnBreakpoint: renderOnBreakpoints.desktop
    },
    {
      isLayoutBreakpointAchived: isLaptop,
      renderOnBreakpoint: renderOnBreakpoints.laptop
    },
    {
      isLayoutBreakpointAchived: isTablet,
      renderOnBreakpoint: renderOnBreakpoints.tablet
    },
    {
      isLayoutBreakpointAchived: isMobile,
      renderOnBreakpoint: renderOnBreakpoints.mobile
    },
    {
      isLayoutBreakpointAchived: isMobileSmall,
      renderOnBreakpoint: renderOnBreakpoints.mobileSmall
    },
  ]), [
    isDesktop,
    isDesktopExtraWide,
    isDesktopWide,
    isLaptop,
    isMobile,
    isMobileSmall,
    isTablet,
    renderOnBreakpoints.desktop,
    renderOnBreakpoints.desktopExtraWide,
    renderOnBreakpoints.desktopWide,
    renderOnBreakpoints.laptop,
    renderOnBreakpoints.mobile,
    renderOnBreakpoints.mobileSmall,
    renderOnBreakpoints.tablet
  ])

  const renderWrapperOn = useCallback(() => {
    const rendererElement = find(map(renderWrapperOnTable, renderWrapperOnTableElement => (
      renderWrapperOnTableElement.isLayoutBreakpointAchived && (
        renderWrapperOnTableElement.renderOnBreakpoint
          ? wrapper
          : children
      )
    )))

    return rendererElement ? rendererElement : children
  }, [renderWrapperOnTable, children, wrapper])

  return renderWrapperOn()
}
