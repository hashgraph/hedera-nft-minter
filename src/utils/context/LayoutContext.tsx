import React, { useState, useEffect, useCallback } from 'react';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

type Position = { x: number; y: number };

export const LayoutContext = React.createContext<{
  pageMenuPositionY: null | number;
  setPageMenuPositionY: React.Dispatch<React.SetStateAction<number | null>>;
  scrollPosition: Position;
  isMobile: boolean;
}>({
  pageMenuPositionY: null,
  setPageMenuPositionY: () => null,
  scrollPosition: { x: 0, y: 0 },
  isMobile: true,
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

  const setDocHeight = useCallback(() => {
    if (document && window) {
      document.documentElement.style.setProperty(
        '--vh',
        `${ window.innerHeight }px`
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
      setDocHeight();
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDocHeight]);

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
    setDocHeight();
    window.addEventListener('orientationchange', () => setDocHeight());

    return () =>
      window.removeEventListener('orientationchange', () => setDocHeight());
  }, [setDocHeight]);

  return (
    <LayoutContext.Provider
      value={{
        pageMenuPositionY,
        setPageMenuPositionY,
        scrollPosition,
        isMobile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
