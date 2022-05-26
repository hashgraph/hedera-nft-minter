import './switch.scss';

import React, { useCallback } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

interface Option {
  name: string;
  value: any;
}

interface SwitchProps {
  options: Option[];
  name: string;
  label?: string;
}

export default function Switch({ options, name, label }: SwitchProps) {
  const [field, , helpers] = useField(name);
  const classess = useCallback(
    (val) =>
      classNames({
        active: val === field.value,
      }),
    [field.value]
  );

  return (
    <div className='switch-wrapper'>
      <label htmlFor={name}>{label}:</label>
      <div className='switch'>
        {options.map(({ name, value }) => (
          <button
            key={value}
            type='button'
            className={classess(value)}
            onClick={() => helpers.setValue(value)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}