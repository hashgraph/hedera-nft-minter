import { NumberSchema } from 'yup';

export default function validateQtyFormField(max: number, schema: NumberSchema) {
  if (max >= 10 || max === 0) {
    return schema.max(10, 'Max 10');
  }

  if (max < 0) {
    return schema.max(max, `Max ${ max }`);
  }

  return (max ? schema.max(max, `Max ${ max }` ) : schema)
}
