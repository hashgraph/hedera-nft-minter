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
    'hero__dark-schema': themeSchema === HeroSchemaTypes.DARK,
    'hero__light-schema': themeSchema === HeroSchemaTypes.LIGHT,
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
