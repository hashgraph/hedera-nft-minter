import FieldWrapper from '@components/shared/form/FieldWrapper';
import FieldSelect from '@components/shared/form/FieldSelect';
import ButtonGroup from '@components/shared/form/button-group';

export default function SearchBar() {
  return (
    <>
      <FieldWrapper
        hideError
        type='text'
        name={'search'}
        placeholder='Search...'
      />
      <FieldSelect hideError name='sort'>
        <option value=''>Random</option>
        <option value='name:asc'>Price A to Z</option>
        <option value='name:desc'>Price Z to A</option>
        <option value='price:asc'>Price Lo to Hi</option>
        <option value='price:desc'>Price Hi to Lo</option>
      </FieldSelect>

      <ButtonGroup
        name='list'
        options={[
          { label: 'List', value: 'list' },
          { label: 'Grid', value: 'grid' },
        ]}
      />
    </>
  )
}
