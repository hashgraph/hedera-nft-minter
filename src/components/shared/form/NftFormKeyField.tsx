import React, { useMemo } from 'react';
import Error from '@/components/shared/form/Error';
import { Field, useFormikContext } from 'formik';

type Props = {
  name: string;
};

type FormikContextType = {
  values: string;
};

const NftFormKeyField = ({ name }: Props) => {
  const { values } = useFormikContext<FormikContextType>();

  const value = useMemo(
    () => Object.entries(values).filter((e) => e[0] === name)[0][1],
    [values, name]
  );

  return (
    <>
      <label htmlFor={name}>
        {name} key:
        <span>
          <label htmlFor={`${ name }_no`}>
            <Field name={name} type='radio' value='no' />
            No key
          </label>
          <label htmlFor={`${ name }_account`}>
            <Field name={name} type='radio' value='account' />
            My account key
          </label>
          <label htmlFor={`${ name }_custom`}>
            <Field name={name} type='radio' value='custom' />
            Custom key
          </label>
        </span>
      </label>
      {value === 'custom' && (
        <>
          <Field name={`${ name }_key`} type='input' />
          <Error name={`${ name }_key`} />
        </>
      )}
    </>
  );
};

export default NftFormKeyField;
