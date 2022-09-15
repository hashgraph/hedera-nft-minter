import { useCallback } from 'react'
import { JSX } from '@babel/types'
import useLayout from '@/utils/hooks/useLayout';

export type RenderOnProps = {
  mobileSmall?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  laptop?: boolean;
  desktop?: boolean;
  desktopWide?: boolean;
  desktopExtraWide?: boolean;
}

export default function useRenderWrapperOn(
  renderOnBreakpoints: RenderOnProps,
  wrapper: JSX.Element,
  children: JSX.Element
) {
  const {
    isDesktopExtraWide,
    isDesktopWide,
    isDesktop,
    isLaptop,
    isTablet,
    isMobile,
    isMobileSmall
  } = useLayout();

  const renderWrapperOn = useCallback(() => {
    if(isDesktopExtraWide) {
      return (
        renderOnBreakpoints.desktopExtraWide
          ? wrapper
          : children
      )
    }

    if(isDesktopWide) {
      return (
        renderOnBreakpoints.desktopWide
          ? wrapper
          : children
      )
    }

    if(isDesktop) {
      return (
        renderOnBreakpoints.desktop
          ? wrapper
          : children
      )
    }

    if(isLaptop) {
      return (
        renderOnBreakpoints.laptop
          ? wrapper
          : children
      )
    }

    if(isTablet) {
      return (
        renderOnBreakpoints.tablet
          ? wrapper
          : children
      )
    }

    if(isMobile) {
      return (
        renderOnBreakpoints.mobile
          ? wrapper
          : children
      )
    }

    if(isMobileSmall) {
      return (
        renderOnBreakpoints.mobileSmall
          ? wrapper
          : children
      )
    }

    return children
  }, [
    children,
    isMobileSmall,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isDesktopWide,
    isDesktopExtraWide,
    renderOnBreakpoints,
    wrapper,
  ])

  return renderWrapperOn()
}
