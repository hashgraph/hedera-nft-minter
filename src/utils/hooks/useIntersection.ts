import { useEffect, useState, RefObject } from 'react';
import { IntersectionOptions } from 'react-intersection-observer';

export default function useIntersection(
  ref: RefObject<HTMLDivElement>,
  options: IntersectionOptions,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
      })
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [options, ref]);

  return isIntersecting;
}
