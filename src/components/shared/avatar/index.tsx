import './avatar.scss';

import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import placeholder from '@assets/images/black-cutout.svg';

interface AvatarProps {
  url?: string
}

export default function Avatar({ url }: AvatarProps) {
  return (
    <div className='avatar'>
      <img src={url ?? placeholder} alt='' />
    </div>
  )
}
