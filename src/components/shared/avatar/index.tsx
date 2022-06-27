import './avatar.scss';

import React from 'react';
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
