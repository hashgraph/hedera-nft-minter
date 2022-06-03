import { Form } from 'formik';
import FieldSelect from '@components/shared/form/FieldSelect';
import FieldWrapper from '@components/shared/form/FieldWrapper';

export default function TestForm() {
  return (
    <Form>
      <h2>Test Form</h2>
      {/* eslint-disable-next-line max-len */}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam harum quibusdam tenetur! Excepturi facere iste itaque modi? Ab et facere harum maiores numquam qui, quibusdam sint unde ut voluptas!</p>
      <FieldWrapper name='test' type='text' placeholder='Lorem ipsum dolor sit amet...' />
      <FieldWrapper name='test3' type='number' placeholder='number' />

      <FieldSelect name='test2'>
        <option value=''>Select Option</option>
        <option value='1'>test</option>
        <option value='2'>test2</option>
      </FieldSelect>


      <FieldWrapper
        type='checkbox'
        name='checkbox'
        label='Checkbox'
      />
      <FieldWrapper
        type='radio'
        name='radio'
        label='Radio'
      />
    </Form>
  )
}
