import React, { useState, useEffect, useCallback } from 'react';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

type Position = { x: number; y: number };

export const LayoutContext = React.createContext<{
  pageMenuPositionY: null | number;
  setPageMenuPositionY: React.Dispatch<React.SetStateAction<number | null>>;
  scrollPosition: Position;
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
  pageMenuPositionY: null,
  setPageMenuPositionY: () => null,
  scrollPosition: { x: 0, y: 0 },
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
  const [pageMenuPositionY, setPageMenuPositionY] = useState<number | null>(
    null
  );

  const [scrollPosition, setScrollPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
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
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
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


  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 599px)').matches) {
        setIsMobileSmall(true);
      } else {
        clearAllBodyScrollLocks();
        setIsMobileSmall(false);
      }

      if (window.matchMedia('(min-width: 600px)').matches) {
        setIsMobile(true);
      } else {
        clearAllBodyScrollLocks();
        setIsMobile(false);
      }

      if (window.matchMedia('(min-width: 768px)').matches) {
        setIsTablet(true);
      } else {
        clearAllBodyScrollLocks();
        setIsTablet(false);
      }

      if (window.matchMedia('(min-width: 992px)').matches) {
        setIsLaptop(true);
      } else {
        clearAllBodyScrollLocks();
        setIsLaptop(false);
      }

      if (window.matchMedia('(min-width: 1200px)').matches) {
        setIsDesktop(true);
      } else {
        clearAllBodyScrollLocks();
        setIsDesktop(false);
      }

      if (window.matchMedia('(min-width: 1600px)').matches) {
        setIsDesktopWide(true);
      } else {
        clearAllBodyScrollLocks();
        setIsDesktopWide(false);
      }

      if (window.matchMedia('(min-width: 1920px)').matches) {
        setIsDesktopExtraWide(true);
      } else {
        clearAllBodyScrollLocks();
        setIsDesktopExtraWide(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDocDimensions();
    window.addEventListener('orientationchange', () => setDocDimensions());

    return () =>
      window.removeEventListener('orientationchange', () => setDocDimensions());
  }, [setDocDimensions]);

  return (
    <LayoutContext.Provider
      value={{
        pageMenuPositionY,
        setPageMenuPositionY,
        scrollPosition,
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
