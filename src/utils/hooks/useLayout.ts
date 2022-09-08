import { useContext, useMemo } from 'react';
import { LayoutContext } from '@utils/context/LayoutContext';
import {
  ScrollDirection,
  useScrollDirection,
} from '@/utils/hooks/useScrollDir';

const useLayout = () => {
  const {
    pageMenuPositionY,
    setPageMenuPositionY,
    scrollPosition,
    isMobile,
    isDesktop,
    isTablet,
    isMinterWizardWelcomeScreen,
    setIsMinterWizardWelcomeScreen,
  } = useContext(LayoutContext);

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
        scrollDirection === ScrollDirection.down
      ),
    [isPageMenu, pageMenuPositionY, scrollDirection, scrollPosition.y]
  );


  return {
    pageMenuPositionY,
    setPageMenuPositionY,
    isPageMenu,
    scrollPosition,
    isNavbarHidden,
    isMobile,
    isDesktop,
    isTablet,
    isMinterWizardWelcomeScreen,
    setIsMinterWizardWelcomeScreen,
  };
};

export default useLayout;
