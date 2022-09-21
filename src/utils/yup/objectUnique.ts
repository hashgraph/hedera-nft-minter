import * as yup from 'yup';
import filter from 'lodash/filter';
import some from 'lodash/some';

export default function objectUnique() {
  return yup.addMethod(yup.object, 'unique', function (message, arrayValueKey) {
    return this.test('unique', message, (current, context) => {
      if (!current || !current[arrayValueKey]) {
        return true;
      }

      const otherValues = filter(context.parent, (value) => (
        value !== current
      ));

      const isDuplicate = some(otherValues, (value) => (
        current[arrayValueKey] === value[arrayValueKey]
      ));

      return isDuplicate
        ? context.createError({ path: `${ context.path }.${ arrayValueKey }` })
        : true;
    });
  });
}
