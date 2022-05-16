import React from 'react';

const Hero = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className='hero'>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Hero;
