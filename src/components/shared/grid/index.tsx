import './grid.scss';

import { JSX } from '@babel/types';
import classNames from 'classnames';

interface GridProps {
  children: JSX.Element | JSX.Element[],
  className?: string;
}

export default function Grid({
  children,
  className
}: GridProps) {

  const gridClassNames = classNames('grid', className)

  return (
    <div className={gridClassNames}>
      { children }
    </div>
  );
}
