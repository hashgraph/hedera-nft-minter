import { Field, useField } from 'formik'
import useUpdateEffect from '@/utils/hooks/useUpdateEffect';
import './checkbox-field.scss'

export type CheckboxFieldProps = {
  name: string;
  title: string;
  description: string;
  onChange?: () => void;
}

export default function CheckboxField({ name, title, description, onChange }: CheckboxFieldProps) {
  const [field] = useField(name)

  useUpdateEffect(() =>
    onChange && onChange()
  , [field.value]);

  return (
    <div className='checkbox-field'>
      <div className='checkbox-field__input'>
        <Field type='checkbox' name={name} />
      </div>
      <div className='checkbox-field__description'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
