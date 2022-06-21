import classNames from 'classnames';
import React from 'react';

export default function Hero ({
  title,
  children,
  darkSchema,
}: {
  title?: string,
  children?: React.ReactNode,
  profile?: boolean;
  darkSchema?: boolean;
}) {
  const heroClassName = classNames('hero', {
    'hero--dark-schema': darkSchema,
  })

  return (
    <div className={heroClassName}>
      {Boolean(title) && (
        <h1>{title}</h1>
      )}
      {children}
    </div>
  );
}
