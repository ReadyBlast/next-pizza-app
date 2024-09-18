import qs from 'qs';
import React from 'react';
import { Filters } from './use-filters';
import { useRouter } from 'next/navigation';
import { useSortStore } from '../store';

export const useQueryFilters = (filters: Filters) => {
  const { sortOption } = useSortStore((state) => state);
  const sort = sortOption === "popularity" ? null : sortOption

  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaDoughTypes: Array.from(filters.pizzaDoughTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
        sortBy: sortOption,
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [
    filters.sizes,
    filters.pizzaDoughTypes,
    filters.selectedIngredients,
    filters.prices,
    sort,
  ]);
};
