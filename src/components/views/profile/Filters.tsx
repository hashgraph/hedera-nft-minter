import Collapse from '@components/shared/collapse';
import FieldWrapper from '@components/shared/form/FieldWrapper';
import { useEffect } from 'react';
import { useIsMounted } from '@hooks/useIsMounted';
import { FormikProps, FormikValues } from 'formik';

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
          name='testa'
          type='checkbox'
          label='Test'
        />
        <FieldWrapper
          inverse
          hideError
          name='test1'
          type='checkbox'
          label='Test2'
        />
        <FieldWrapper
          inverse
          hideError
          name='test2'
          type='checkbox'
          label='Test3'
        />
        <FieldWrapper
          inverse
          hideError
          name='test3'
          type='checkbox'
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
    </div>
  );
}
