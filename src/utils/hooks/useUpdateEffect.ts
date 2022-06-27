import { useEffect } from 'react';
import { useIsMounted } from './useIsMounted';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useIsMounted();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
