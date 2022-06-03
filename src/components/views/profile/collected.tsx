import { useCallback, useState, useMemo } from 'react';
import { Formik } from 'formik';
import reduce from 'lodash/reduce';

import Grid from '@components/shared/grid';
import SearchBar from '@components/views/profile/SearchBar';
import Filters from '@components/views/profile/Filters';
import SelectedFilters from '@components/views/profile/SelectedFilters';

export default function Collected() {
  const [initialFilters, setInitialFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string | number | boolean}>({});

  const hasSelectedFilters = useMemo(() => {
    delete selectedFilters.clear;
    return Object.values(selectedFilters).filter(Boolean).length > 0
  }, [selectedFilters])

  const removeFilter = useCallback((f: string) => {
    setInitialFilters(
      reduce(selectedFilters, (res, value, key) => {
        res[key] = key !== f ? value : typeof value === 'boolean' ? false : '';

        return res;
      }, {} as {[key: string]: boolean | string | number })
    );
  }, [selectedFilters])

  return (
    <div className='collected'>
      <div className='collected__searchbar'>
        <Formik
          initialValues={{}}
          onSubmit={() => Promise.resolve(null)}
          component={SearchBar}
        />
      </div>

      <div className='collected__filters'>
        <Formik
          enableReinitialize
          initialValues={initialFilters}
          onSubmit={setSelectedFilters}
          component={Filters}
        />
      </div>

      <div className='collected__info'>
        {hasSelectedFilters && (
          <SelectedFilters
            filters={selectedFilters}
            onRemoveFilter={removeFilter}
            clearAll={() => setInitialFilters({ clear: Math.random() })}
          />
        )}
      </div>

      <Grid>

        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
      </Grid>

    </div>
  );
}
