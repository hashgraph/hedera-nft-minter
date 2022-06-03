import React from 'react';

type FieldWrapperProps = React.HTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
};

export default function DisabledFieldWrapper(
  { label, value }: FieldWrapperProps,
) {

  return (
    <>
      <label htmlFor={'null'}>{label}:</label>
      <input type='text' disabled value={value} />
      <div className='form__error_wrapper' />
    </>
  );
}

