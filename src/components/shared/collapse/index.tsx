import './collapse.scss';

import { useMemo, useState } from 'react';
import { JSX } from '@babel/types';
import classNames from 'classnames';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface CollapseProps {
  title: string | JSX.Element,
  children: JSX.Element | JSX.Element[],
}

export default function Collapse({
  title,
  children,
}: CollapseProps) {
  const [active, setActive] = useState(false);
  const collapseClassNames = useMemo(() => classNames(
    'collapse',
    {
      'collapse__active': active
    }
  ), [active])

  return (
    <div className={collapseClassNames}>
      <div
        className='collapse__header'
        onClick={() => setActive(old => !old)}
      >
        {title}
        {active ? <UpOutlined /> : <DownOutlined />}
      </div>
      {active && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}
