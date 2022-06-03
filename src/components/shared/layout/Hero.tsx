import React from 'react';

export default function Hero ({
  title,
  children,
}: {
  title?: string,
  children?: React.ReactNode,
  profile?: boolean
}) {
  return (
    <div className='hero'>
      {Boolean(title) && (
        <h1>{title}</h1>
      )}
      {children}
    </div>
  );
}
