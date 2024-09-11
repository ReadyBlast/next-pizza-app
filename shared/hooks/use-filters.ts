import { Filters } from '../components/shared/filters';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceRange {
  min?: number;
  max?: number;
}

interface QueryFilters extends PriceRange {
  pizzaDoughTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaDoughTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRange;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRange, value: number) => void;
  setPizzaDoughTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  // Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [],
    ),
  );

  // Фильтр типа теста
  const [pizzaDoughTypes, { toggle: toggleDoughTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaDoughTypes')
        ? searchParams.get('pizzaDoughTypes')?.split(',')
        : [],
    ),
  );

  // Фильтр стоимости
  const [prices, setPrices] = React.useState<PriceRange>({
    min: Number(searchParams.get('min')) || undefined,
    max: Number(searchParams.get('max')) || undefined,
  });

  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    //
    sizes,
    pizzaDoughTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaDoughTypes: toggleDoughTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
