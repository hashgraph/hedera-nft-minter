import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Formik } from 'formik';
import reduce from 'lodash/reduce';

import Grid from '@components/shared/grid';
import SearchBar from '@components/views/profile/SearchBar';
import Filters from '@components/views/profile/Filters';
import SelectedFilters from '@components/views/profile/SelectedFilters';
import useSearch from '@hooks/useSearch';
import Loader from '@components/shared/loader/Loader';
import useIntersection from '@hooks/useIntersection';
import NFT from '@components/shared/nft/nft';

export default function Collected() {
  const {
    loading,
    filters,
    sort,
    result,
    page,
    setSort,
    setFilters,
    setPage,
    clearFilters,
  } = useSearch();

  const ref = useRef(null);
  const isIntersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0
  })

  const hasSelectedFilters = useMemo(() => {
    delete filters.clear;
    return Object.values(filters).filter(Boolean).length > 0
  }, [filters])

  const removeArrayTypeFilterValue = useCallback(value => (
    Array.isArray(value) ? value : []
  ), [])

  const removeBooleanTypeFilterValue = useCallback(value => (
    typeof value === 'boolean'
      ? false
      : ''
  ), [])

  const removeFilter = useCallback((f: string) => {
    setFilters(
      reduce(filters, (res, value, key) => {
        res[key] = key !== f
          ? removeArrayTypeFilterValue(value)
          : removeBooleanTypeFilterValue(value)
        ;

        return res;
      }, {} as {[key: string]: boolean | string | number })
    );
  }, [filters, removeArrayTypeFilterValue, removeBooleanTypeFilterValue, setFilters]);

  const handleSearchBarSubmit = useCallback(({ sort: newSort, search}) => {
    if (sort != newSort) {
      setSort(newSort);
    }

    if (filters.search !== search) {
      setFilters({
        ...filters,
        search,
      });
    }
  }, [setSort, setFilters, sort, filters]);

  useEffect(() => {
    if (isIntersection) {
      setPage(page + 1);
    }
  }, [isIntersection, setPage])

  return (
    <div className='collected'>
      <div className='collected__searchbar'>
        <Formik
          enableReinitialize
          initialValues={{
            search: filters.search,
            sort,
          }}
          onSubmit={handleSearchBarSubmit}
          component={SearchBar}
        />
      </div>

      <div className='collected__filters'>
        <Formik
          enableReinitialize
          initialValues={filters}
          onSubmit={(values) => setFilters({
            search: filters.search,
            ...values,
          })}
          component={Filters}
        />
      </div>

      <div className='collected__info'>
        {hasSelectedFilters && (
          <SelectedFilters
            filters={filters}
            onRemoveFilter={removeFilter}
            clearAll={clearFilters}
          />
        )}
      </div>

      <Grid>
        <>
          {result.map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <NFT key={`nft_${ i }`} />
          ))}

          {loading && <Loader />}
        </>
      </Grid>

      <div ref={ref}  />
    </div>
  );
}
