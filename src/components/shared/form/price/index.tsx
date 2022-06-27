import './field-price.scss';
import { useField } from 'formik';
import { useCallback, useState } from 'react';

interface FieldPriceProps {
  name: string,
}

export default function FieldPrice({
  name,
}: FieldPriceProps) {
  const [field,,helpers] = useField(name);
  const [from, setFrom] = useState(field?.value?.from || 0);
  const [to, setTo] = useState(field?.value?.to || 0);

  const handleApply = useCallback(() => {
    helpers.setValue({from, to });
  }, [helpers, from, to]);

  return (
    <div className='field-price'>
      <input
        name={`${ name }.from`}
        type='number'
        value={from}
        onChange={({ target}) => setFrom(parseInt(target.value))}
      />
      <input
        name={`${ name }.to`}
        type='number'
        value={to}
        onChange={({ target}) => setTo(parseInt(target.value))}
      />

      <button type='button' onClick={handleApply}>Apply</button>

    </div>
  )
}
