import React, { useState, useEffect } from 'react';

type Position = { x: number; y: number };

export const LayoutContext = React.createContext<{
  pageMenuPositionY: null | number;
  setPageMenuPositionY: React.Dispatch<React.SetStateAction<number | null>>;
  scrollPosition: Position;
}>({
  pageMenuPositionY: null,
  setPageMenuPositionY: () => null,
  scrollPosition: { x: 0, y: 0 },
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        pageMenuPositionY,
        setPageMenuPositionY,
        scrollPosition,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
