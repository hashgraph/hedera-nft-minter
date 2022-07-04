import React, { useCallback, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import useLayout from '@utils/hooks/useLayout';
import Arrow from '@assets/images/interior-nav-arrow-up.png';

type Props = {
  children?: React.ReactElement;
  className?: string;
};

const NAVBAR_HEIGHT = 80

const PageMenu = (
  { children }: Props,
  props: React.PropsWithChildren<Props>
) => {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [scrolledToTopOfPage, setScrolledToTopOfPage] = useState(false);
  const [scrollingBreakpoint, setScrollingBreakpoint] = useState(0);

  const { setPageMenuPositionY, isNavbarHidden, scrollPosition } = useLayout();

  const updatePageMenuPositionY = useCallback(() =>
    setPageMenuPositionY(wrapperRef?.current?.offsetTop ?? 0),
  [setPageMenuPositionY])

  const updateScrollingBreakpoint = useCallback(() =>
    setScrollingBreakpoint(wrapperRef?.current?.offsetTop - NAVBAR_HEIGHT ?? 0),
  [setScrollingBreakpoint])

  const updateScrolledToTopOfPage = useCallback(() => {
    if (wrapperRef) {
      if (scrolledToTopOfPage) {
        setScrolledToTopOfPage(scrollPosition.y > scrollingBreakpoint);
      } else {
        setScrolledToTopOfPage(
          scrollPosition.y > wrapperRef?.current?.offsetTop - NAVBAR_HEIGHT
        );
      }
    }
  }, [scrolledToTopOfPage, scrollingBreakpoint, scrollPosition])

  useEffect(() => {
    const handleResize = () => {
      updateScrollingBreakpoint()
      updateScrolledToTopOfPage()
      updatePageMenuPositionY()
    }

    window.addEventListener('resize', handleResize)
    handleResize();
    return () => handleResize()

  }, [updateScrollingBreakpoint, updateScrolledToTopOfPage, updatePageMenuPositionY]);

  const navClassnames = classNames({
    'page-menu': true,
    'page-menu__sticked-to-top': scrolledToTopOfPage,
    'page-menu__scrolled-to-top': isNavbarHidden,
    [props?.className as string]: !!props?.className,
  });

  const dividerClassnames = classNames({
    'page-menu-divider': true,
    'page-menu-divider__visible': scrolledToTopOfPage,
  });

  const scrollToTop = useCallback(
    () =>
      window.scroll({
        top: 0,
        behavior: 'smooth',
      }),
    []
  );

  return (
    <div className='page-menu-wrapper' ref={wrapperRef}>
      <nav className={navClassnames}>
        <div className='nav-links'>{children}

        </div>
        <button onClick={scrollToTop}>
          <img
            src={Arrow}
            height={30}
            width={30}
            alt='nav-links-scroll-arrow'
          />
        </button>
      </nav>
      <div className={dividerClassnames}></div>
    </div>
  );
};

export default PageMenu;
