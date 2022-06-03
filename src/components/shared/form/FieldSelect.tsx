import React, { SelectHTMLAttributes, useMemo } from 'react';
import { FastField, Field, FieldAttributes } from 'formik';
import Error from '@/components/shared/form/Error';
import { DownOutlined } from '@ant-design/icons';

type FieldWrapperProps = FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>> & {
  name: string;
  label?: string;
  fastField?: boolean;
  max?: string | number;
  hideError?: boolean,
};

const FieldSelect = ({
  name,
  label,
  fastField = false,
  hideError = false,
  children,
  ...restProps
}: FieldWrapperProps) => {
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);

  return (
    <div className='form__row form__select'>
      {Boolean(label) && <label htmlFor={name}>{label}:</label>}
      <div className='select__component'>
        <Component name={name} as='select' {...restProps}>
          {children}
        </Component>
        <DownOutlined className='arrow' />
      </div>
      {!hideError && (
        <Error name={name} />
      )}
    </div>
  );
};

export default FieldSelect;
