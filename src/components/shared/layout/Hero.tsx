import classNames from 'classnames';
import React from 'react';

export enum HeroSchemaTypes {
  DARK = 'dark',
  LIGHT = 'light'
}

export default function Hero ({
  title,
  children,
  themeSchema,
}: {
  title?: string,
  children?: React.ReactNode,
  profile?: boolean;
  themeSchema?: HeroSchemaTypes;
}) {
  const heroClassName = classNames('hero', {
    'hero--dark-schema': themeSchema === HeroSchemaTypes.DARK,
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
