import map from 'lodash/map';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Filters } from '@utils/hooks/useSearch';

interface FilterItemProps {
  value: Filters,
  fieldKey: string,
  onRemoveFilter: (k: string) => void
}

function FilterItem({
  fieldKey,
  value,
  onRemoveFilter
}: FilterItemProps) {
  if (!value || fieldKey === 'clear') {
    return null;
  }

  return (
    <div className='filter__item'>
      { typeof value === 'boolean' ? fieldKey : value}
      <CloseCircleOutlined
        className='arrow'
        onClick={() => onRemoveFilter(fieldKey)}
      />
    </div>
  )
}

interface SelectedFiltersProps {
  filters: Filters,
  clearAll: () => void,
  onRemoveFilter: (key: string) => void,
}

export default function SelectedFilters({
  filters,
  clearAll,
  onRemoveFilter,
}: SelectedFiltersProps) {

  return (
    <>
      {map(filters, (value, key) => (
        ['price'].includes(key)
          ? null
          : (
            Array.isArray(value) ? map(value, (v) => (
              <FilterItem
                key={`${ key }_${ v }`}
                fieldKey={key}
                value={v}
                onRemoveFilter={onRemoveFilter}
              />
            )) : (
              <FilterItem
                key={key}
                fieldKey={key}
                value={value}
                onRemoveFilter={onRemoveFilter}
              />
            )
          )
      ))}

      <button
        className='filter__item all'
        onClick={clearAll}
      >
        Clear all
      </button>
    </>
  )

}
