import React, { useState, useEffect, useCallback } from 'react';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

type Position = { x: number; y: number };

export const LayoutContext = React.createContext<{
  pageMenuPositionY: null | number;
  setPageMenuPositionY: React.Dispatch<React.SetStateAction<number | null>>;
  scrollPosition: Position;
  isMobile: boolean;
  isMinterWizardWelcomeScreen: boolean;
  setIsMinterWizardWelcomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  pageMenuPositionY: null,
  setPageMenuPositionY: () => null,
  scrollPosition: { x: 0, y: 0 },
  isMobile: true,
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
  const [isMobile, setIsMobile] = useState(true);
  const [isMinterWizardWelcomeScreen, setIsMinterWizardWelcomeScreen] = useState(false);
  const [wasWizardSummaryScreen, setWasWizardSummaryScreen] = useState(false)

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
        isMobile,
        isMinterWizardWelcomeScreen,
        setIsMinterWizardWelcomeScreen,
        wasWizardSummaryScreen,
        setWasWizardSummaryScreen
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
