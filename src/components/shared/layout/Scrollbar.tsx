import React, { useMemo } from 'react'
import { Scrollbar as ScrollbarCustom } from 'react-scrollbars-custom';
import omit from 'lodash/omit';
import { JSX } from '@babel/types'
import useRenderWrapperOn, { RenderOnProps } from '@utils/hooks/useRenderWrapperOn'

type ScrollerProps = {
  children: JSX.Element;
  renderOn?: RenderOnProps
}

const INITIAL_SCROLLER_RENDER_ON_PROPS : RenderOnProps = {
  mobileSmall: true,
  mobile: true,
  tablet: true,
  laptop: true,
  desktop: true,
  desktopWide: true,
  desktopExtraWide: true,
}

export default function Scrollbar({children, renderOn} : ScrollerProps) {

  const renderOnBreakpoints = useMemo(() => ({
    ...INITIAL_SCROLLER_RENDER_ON_PROPS,
    ...renderOn,
  }), [renderOn])

  const scrollbarProps = useMemo<{[key: string]: {
    elementRef?: React.Ref<HTMLElement>,
    renderer?: React.ReactElement<HTMLElement>,
  }} | {className: string}>(() => ({
    className: 'scrollbar',
    children,
    scrollerProps: {
      renderer: ({ elementRef, ...restProps }) => {
        return (
          <span
            {...restProps}
            style={{
              ...omit(restProps.style, ['paddingRight']),
            }}
            ref={elementRef}
            className='scrollbar__scroller'
          />
        );
      },
    },
    wrapperProps: {
      renderer: ({ elementRef, ...restProps }) => (
        <div {...omit(restProps, ['style'])} ref={elementRef}  />
      ),
    },
    trackYProps: {
      renderer: ({ elementRef, ...restProps }) => {
        return <span {...restProps} ref={elementRef} className='scrollbar__track-y' />;
      },
    },
  }), [children])

  return useRenderWrapperOn(
    renderOnBreakpoints,
    <ScrollbarCustom {...scrollbarProps} />,
    children
  )
}
