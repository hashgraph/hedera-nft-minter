import { JSX } from '@babel/types';

interface GridProps {
  children: JSX.Element | JSX.Element[],
}

export default function Grid({
  children,
}: GridProps) {
  return (
    <div>
      {children}
    </div>
  );
}
