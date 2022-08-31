import map from 'lodash/map'

import toDashCase from '@/utils/helpers/toDashCase';
import TRANSITION_GROUP_ANIMATION_KEYS from '@/utils/const/transition-group-animation-keys';


const generateMultipleTransitionGroupClassNames = (classNames: string[]) => (
  Object.fromEntries(
    map(TRANSITION_GROUP_ANIMATION_KEYS, key => (
      [
        key,
        map(classNames, className => (
          `${ className }-${ toDashCase(key) }`)
        ).join(' ')
      ]
    )))
)

export default generateMultipleTransitionGroupClassNames
