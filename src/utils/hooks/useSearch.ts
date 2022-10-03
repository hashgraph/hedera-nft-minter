import { useCallback, useEffect, useReducer, useState } from 'react';
import { stringify, parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { useIsMounted } from '@hooks/useIsMounted';

export type Price = { from: number, to: number };

export interface Filters {
  [key: string]: string | number | boolean | Price | undefined,
  price?: Price,
}

interface SearchState {
  page: number
  filters: Filters,
  sort: string,
  loading: boolean,
}

const initialState: SearchState = {
  page: 0,
  sort: '',
  loading: false,
  filters: {
    price: { from: 0, to: 1 }
  },
};

enum ActionType {
  SET_FILTERS = 'setFilters',
  SET_SORT = 'setSort',
  CLEAR_FILTERS = 'clearFilters',
  SET_PAGE = 'setPage',
}

type Action = { type: ActionType.SET_FILTERS, filters: Filters }
  | { type: ActionType.SET_SORT, sort: string }
  | { type: ActionType.CLEAR_FILTERS }
  | { type: ActionType.SET_PAGE, page: number }
;

function reducer(state: SearchState, action: Action): SearchState {
  switch (action.type) {
    case ActionType.SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
        page: 0,
      }
    case ActionType.SET_SORT:
      return {
        ...state,
        sort: action.sort,
        page: 0,
      }
    case ActionType.CLEAR_FILTERS:
      return {
        ...state,
        filters: { clear: Math.random() },
        page: 0,
      }
    case ActionType.SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    default:
      return state;
  }
}

export default function useSearch() {
  const isMounted = useIsMounted();
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(new Array(30).fill(true));
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadResults = useCallback((params: Filters) => {
    setLoading(true);

    setTimeout(() => {
      setResult(new Array(30).fill(true));
      setLoading(false);
    }, 1000);
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreResults = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setResult(old => old.concat(new Array(30).fill(true)));
      setLoading(false);
    }, 1000);

  }, [setResult]);

  const setFilters = useCallback((filters) => {
    dispatch({
      filters,
      type: ActionType.SET_FILTERS,
    })
  }, []);

  const setSort = useCallback((sort) => {
    dispatch({
      sort,
      type: ActionType.SET_SORT,
    });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({
      page,
      type: ActionType.SET_PAGE,
    });

    loadMoreResults(page);
  }, [loadMoreResults]);

  const clearFilters = useCallback(() => {
    dispatch({ type: ActionType.CLEAR_FILTERS });
  }, []);

  useEffect(() => {
    if (isMounted) {
      const parsedFilters = {
        ...state.filters,
        ...(state.sort ? {sort: state.sort } : {}),
        ...(state.filters.price ? { 'price.from': state.filters.price.from, 'price.to': state.filters.price.to } : {})
      };

      delete parsedFilters.price;

      const query = stringify(parsedFilters, {
        skipNull: true,
        arrayFormat: 'bracket'
      });

      if (query !== location.search.slice(1)) {
        history.push(`${ location.pathname }?${ query }`);
      }
    }
  }, [history, isMounted, state.filters, state.sort]);

  // fetch new results on url change
  useEffect(() => {
    const searchParams = parse(location.search.slice(1), { arrayFormat: 'bracket'}) as Filters;

    dispatch({ type: ActionType.SET_FILTERS, filters: {
      ...searchParams,
      ...(searchParams.price)
    }});
    loadResults(searchParams);
  }, [location, loadResults]);

  return {
    ...state,
    result,
    loading,
    setSort,
    setPage,
    setFilters,
    clearFilters,
  };
}
