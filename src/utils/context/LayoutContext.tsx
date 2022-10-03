import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import { map } from 'lodash';

export const LayoutContext = React.createContext<{
  isMobileSmall: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isLaptop: boolean;
  isDesktopWide: boolean;
  isDesktopExtraWide: boolean;
  isTablet: boolean;
  isMinterWizardWelcomeScreen: boolean;
  setIsMinterWizardWelcomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isMobileSmall: true,
  isMobile: true,
  isLaptop: true,
  isDesktop: true,
  isDesktopWide: true,
  isDesktopExtraWide: true,
  isTablet: true,
  isMinterWizardWelcomeScreen: false,
  setIsMinterWizardWelcomeScreen: () => false,
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [isMinterWizardWelcomeScreen, setIsMinterWizardWelcomeScreen] = useState(false);

  const [isMobileSmall, setIsMobileSmall] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopWide, setIsDesktopWide] = useState(false);
  const [isDesktopExtraWide, setIsDesktopExtraWide] = useState(false);

  const setDocDimensions = useCallback(() => {
    if (document && window) {
      document.documentElement.style.setProperty(
        '--vh',
        `${ window.innerHeight }px`
      );
      document.documentElement.style.setProperty(
        '--vw',
        `${ window.innerWidth }px`
      );
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      setDocDimensions();
    };

    handler();

    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
    }
  }, [setDocDimensions]);

  const breakpointsAndSetters = useMemo(() => ([
    {
      breakpoint: '(max-width: 599px)',
      setter: setIsMobileSmall
    },
    {
      breakpoint: '(min-width: 600px)',
      setter: setIsMobile
    },
    {
      breakpoint: '(min-width: 768px)',
      setter: setIsTablet
    },
    {
      breakpoint: '(min-width: 992px)',
      setter: setIsLaptop
    },
    {
      breakpoint: '(min-width: 1200px)',
      setter: setIsDesktop
    },
    {
      breakpoint: '(min-width: 1600px)',
      setter: setIsDesktopWide
    },
    {
      breakpoint: '(min-width: 1920px)',
      setter: setIsDesktopExtraWide
    },
  ]), [])

  useEffect(() => {
    const handleResize = () => {
      map(breakpointsAndSetters, breakpointAndSetter => {
        if (window.matchMedia(breakpointAndSetter.breakpoint).matches) {
          breakpointAndSetter.setter(true)
        } else {
          clearAllBodyScrollLocks();
          breakpointAndSetter.setter(false)
        }
      })
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpointsAndSetters]);

  useEffect(() => {
    setDocDimensions();
    window.addEventListener('orientationchange', () => setDocDimensions());

    return () =>
      window.removeEventListener('orientationchange', () => setDocDimensions());
  }, [setDocDimensions]);

  return (
    <LayoutContext.Provider
      value={{
        isDesktopExtraWide,
        isDesktopWide,
        isDesktop,
        isLaptop,
        isMobile,
        isMobileSmall,
        isTablet,
        isMinterWizardWelcomeScreen,
        setIsMinterWizardWelcomeScreen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
