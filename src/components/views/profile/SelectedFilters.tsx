import map from 'lodash/map';
import { CloseCircleOutlined } from '@ant-design/icons';

type Value = string | number | boolean

interface FilterItemProps {
  value: Value,
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
    <div
      className='filter__item'
    >
      { typeof value === 'boolean' ? fieldKey : value}
      <CloseCircleOutlined
        className='arrow'
        onClick={() => onRemoveFilter(fieldKey)}
      />
    </div>
  )
}

interface SelectedFiltersProps {
  filters: { [key: string]: Value },
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
        <FilterItem key={key} fieldKey={key} value={value} onRemoveFilter={onRemoveFilter} />
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
