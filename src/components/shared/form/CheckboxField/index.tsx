import './checkbox-field.scss'

export type CheckboxFieldProps = {
  name: string;
  title: string;
  description: string;
  onChange?: () => void;
}

export default function CheckboxField({ name, title, description, onChange }: CheckboxFieldProps) {

  return (
    <div className='checkbox-field'>
      <div className='checkbox-field__input'>
        <input type='checkbox' name={name} onChange={onChange} />
      </div>
      <div className='checkbox-field__description'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
