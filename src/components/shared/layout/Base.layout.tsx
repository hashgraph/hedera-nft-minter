import React, { FC } from 'react';

export const BaseLayout: FC = ({ children }) => {
  return (
    <div className='ant-layout--auth'>
      <div style={{ margin: '0 16px' }}>{children}</div>
    </div>
  );
};
