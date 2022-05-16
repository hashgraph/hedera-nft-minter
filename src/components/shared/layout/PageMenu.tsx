import React, { useCallback, useRef, useEffect, useState } from 'react';
import Arrow from '@assets/images/interior-nav-arrow-up.png';
import classNames from 'classnames';
import useLayout from '@utils/hooks/useLayout';

type Props = {
  children?: React.ReactElement;
  className?: string;
};

const PageMenu = (
  { children }: Props,
  props: React.PropsWithChildren<Props>
) => {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { setPageMenuPositionY, isNavbarHidden, scrollPosition } = useLayout();

  useEffect(() => {
    if (navRef) {
      setPageMenuPositionY(navRef.current.offsetTop);
    }
  }, [setPageMenuPositionY]);

  const [scrolledToTopOfPage, setScrolledToTopOfPage] = useState(false);
  const [scrollingBreakpoint, setScrollingBreakpoint] = useState(0);

  useEffect(() => {
    setScrollingBreakpoint(navRef?.current?.offsetTop - 80 ?? 0);
  }, [setScrollingBreakpoint]);

  useEffect(() => {
    if (navRef) {
      if (scrolledToTopOfPage) {
        setScrolledToTopOfPage(scrollPosition.y > scrollingBreakpoint);
      } else {
        setScrolledToTopOfPage(
          scrollPosition.y > navRef.current.offsetTop - 80
        );
      }
    }
  }, [scrolledToTopOfPage, scrollingBreakpoint, scrollPosition]);

  const navClassnames = classNames({
    'page-menu': true,
    'page-menu__sticked-to-top': scrolledToTopOfPage,
    'page-menu__scrolled-to-top': isNavbarHidden,
    [props?.className as string]: !!props?.className,
  });

  const deviderClassnames = classNames({
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
    <div className='page-menu-wrapper'>
      <nav ref={navRef} className={navClassnames}>
        <div className='nav-links'>{children}</div>
        <button onClick={scrollToTop}>
          <img
            src={Arrow}
            height={30}
            width={30}
            alt='nav-links-scroll-arrow'
          />
        </button>
      </nav>
      <div className={deviderClassnames}></div>
    </div>
  );
};

export default PageMenu;
