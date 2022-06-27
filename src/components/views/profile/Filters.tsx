import { useEffect } from 'react';
import { FormikProps, FormikValues } from 'formik';

import { useIsMounted } from '@hooks/useIsMounted';
import Collapse from '@components/shared/collapse';
import FieldPrice from '@components/shared/form/price';
import FieldWrapper from '@components/shared/form/FieldWrapper';

export default function Filters({
  values,
  submitForm,
}: FormikProps<FormikValues>) {
  const isMount = useIsMounted();

  useEffect(() => {
    if (isMount) {
      submitForm()
    }
  }, [values, submitForm, isMount]);

  return (
    <div className='filters'>
      <Collapse title='Status'>
        <FieldWrapper
          inverse
          hideError
          isArray
          name='checkbox'
          type='checkbox'
          value='test1'
          label='Test'
        />
        <FieldWrapper
          inverse
          hideError
          isArray
          name='checkbox'
          type='checkbox'
          value='test2'
          label='Test2'
        />
        <FieldWrapper
          inverse
          hideError
          isArray
          name='checkbox'
          type='checkbox'
          value='test3'
          label='Test3'
        />
        <FieldWrapper
          inverse
          hideError
          isArray
          name='checkbox'
          type='checkbox'
          value='test4'
          label='Test4'
        />
      </Collapse>

      <Collapse title='Radio'>
        <FieldWrapper
          inverse
          hideError
          name='test'
          type='radio'
          value='test'
          label='Test'
        />
        <FieldWrapper
          inverse
          hideError
          name='test'
          type='radio'
          value='test2'
          label='Test2'
        />
        <FieldWrapper
          inverse
          hideError
          name='test'
          type='radio'
          value='test3'
          label='Test3'
        />
        <FieldWrapper
          inverse
          hideError
          name='test'
          type='radio'
          value='test4'
          label='Test4'
        />
      </Collapse>

      <Collapse title='Price'>
        <FieldPrice name='price' />
      </Collapse>
    </div>
  );
}
