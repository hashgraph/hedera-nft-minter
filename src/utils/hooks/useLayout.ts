import { useContext } from 'react';
import { LayoutContext } from '@utils/context/LayoutContext';

const useLayout = () => {
  const layoutContext = useContext(LayoutContext);

  return layoutContext;
};

export default useLayout;
