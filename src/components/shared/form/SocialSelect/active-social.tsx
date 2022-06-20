import { FastField } from 'formik';
import React from 'react'

type Props = {
  data: {
    icon: string,
    alt: string,
    placeholder: string
  };
  onClick: () => void;
  name: string;
}

export default function ActiveSocial({name, data, onClick} : Props) {
  return (
    <div className='social-select__row'>
      <div className='social-select__icon' onClick={onClick}>
        <img
          src={data.icon}
          alt={data.alt}
          width={30}
          height={30}
        />
      </div>
      <FastField
        placeholder={data.placeholder}
        type='text'
        name={name}
      />
    </div>
  )
}
