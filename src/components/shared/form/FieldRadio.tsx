import React from 'react'
import { Field } from 'formik';

type Props = {
  name: string;
  value: string | boolean | number;
  label: string;
}

export default function FieldRadio({ name, value, label } : Props) {
  return (
    <label className='form__radio'>
      <Field type='radio' name={name} value={value} /> {label}
    </label>

  )
}
