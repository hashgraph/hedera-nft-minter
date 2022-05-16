import React, { useCallback, useRef, useEffect, useState } from 'react';
import Arrow from '@assets/images/interior-nav-arrow-up.png';
import classNames from 'classnames';

const Navbar = ({ children }: { children: React.ReactElement }) => {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const scrollToTop = useCallback(
    () =>
      window.scroll({
        top: 0,
        behavior: 'smooth',
      }),
    []
  );
  const [scrolledToTopOfPage, setScrolledToTopOfPage] = useState(false);
  const [scrollingBreakpoint, setScrollingBreakpoint] = useState(0);

  useEffect(() => {
    setScrollingBreakpoint(navRef?.current?.offsetTop ?? 0);
  }, [setScrollingBreakpoint]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef) {
        scrolledToTopOfPage
          ? setScrolledToTopOfPage(window.scrollY > scrollingBreakpoint)
          : setScrolledToTopOfPage(window.scrollY > navRef.current.offsetTop);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolledToTopOfPage, scrollingBreakpoint]);

  const navClassnames = classNames({
    'minter-nav': true,
    'minter-nav__scrolled-to-top': scrolledToTopOfPage,
  });

  const deviderClassnames = classNames({
    'minter-nav-divider': scrolledToTopOfPage,
  });

  return (
    <>
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
    </>
  );
};

export default Navbar;
