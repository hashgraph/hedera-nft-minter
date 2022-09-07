import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

type Position = { x: number; y: number };

export const LayoutContext = React.createContext<{
  pageMenuPositionY: null | number;
  setPageMenuPositionY: React.Dispatch<React.SetStateAction<number | null>>;
  scrollPosition: Position;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMinterWizardWelcomeScreen: boolean;
  setIsMinterWizardWelcomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  pageMenuPositionY: null,
  setPageMenuPositionY: () => null,
  scrollPosition: { x: 0, y: 0 },
  isMobile: true,
  isDesktop: true,
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

  const [isMobile, setIsMobile] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const isTablet = useMemo(() => (
    !isMobile && !isDesktop
  ), [isMobile, isDesktop])

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
        setIsMobile(true);
      } else {
        clearAllBodyScrollLocks();
        setIsMobile(false);
      }

      if (window.matchMedia('(min-width: 1200px)').matches) {
        setIsDesktop(true);
      } else {
        clearAllBodyScrollLocks();
        setIsDesktop(false);
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
        isDesktop,
        isMobile,
        isTablet,
        isMinterWizardWelcomeScreen,
        setIsMinterWizardWelcomeScreen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
