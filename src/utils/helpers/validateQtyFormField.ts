import { NumberSchema } from 'yup';

export default function validateQtyFormField(max: number, schema: NumberSchema) {
  if ((max >= 10 || max <= 0) || !max) {
    return schema.max(10, 'Max 10');
  } else {
    return schema.max(max, `Max ${ max }` )
  }
}
