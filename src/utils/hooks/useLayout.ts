import { useContext, useMemo } from 'react';
import { LayoutContext } from '@utils/context/LayoutContext';
import { useScrollDirection } from '@/utils/hooks/useScrollDir';

const useLayout = () => {
  const { pageMenuPositionY, setPageMenuPositionY, scrollPosition } =
    useContext(LayoutContext);

  const scrollDirection = useScrollDirection();

  const isPageMenu = useMemo(
    () => pageMenuPositionY && pageMenuPositionY !== 0,
    [pageMenuPositionY]
  );

  const isNavbarHidden = useMemo(
    () =>
      scrollPosition.y &&
      !!(
        isPageMenu &&
        pageMenuPositionY &&
        scrollPosition.y > pageMenuPositionY &&
        scrollDirection === 'down'
      ),
    [isPageMenu, pageMenuPositionY, scrollDirection, scrollPosition.y]
  );

  return {
    pageMenuPositionY,
    setPageMenuPositionY,
    isPageMenu,
    scrollPosition,
    isNavbarHidden,
  };
};

export default useLayout;
