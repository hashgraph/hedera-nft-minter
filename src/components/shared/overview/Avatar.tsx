import React from 'react';
import placeholder from '@assets/images/placeholder.png';

type AvatarProps = {
  image?: string | null;
};

export default function Avatar({ image }: AvatarProps) {
  return (
    <div className='overview__avatar overview--box'>
      {image
        ? (
          <img
            src={image && image.includes('https://')
              ? image
              : `https://ipfs.io/ipfs/${ image.replace('ipfs://', '') }`
            }
            alt='edition_image'
          />
        ) : (
          <img src={placeholder} alt='edition_image' />
      )}
    </div>
  );
}
