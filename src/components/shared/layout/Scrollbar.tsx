import React from 'react'
import { JSX } from '@babel/types'
import { Scrollbar as ScrollbarCustom } from 'react-scrollbars-custom';
import omit from 'lodash/omit';

export default function Scrollbar({children} : {children: JSX.Element}) {
  return (
    <ScrollbarCustom
      className='scrollbar'
      scrollerProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className='scrollbar__scroller' />;
        },
      }}
      wrapperProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <div {...omit(restProps, ['style'])} ref={elementRef}  />
        ),
      }}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className='scrollbar__track-y' />;
        },
      }}
    >
      {children}
    </ScrollbarCustom>
  )
}
