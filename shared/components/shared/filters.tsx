'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface FiltersProps {
  className?: string;
}

// interface PriceRange {
//   min?: number;
//   max?: number;
// }

// interface QueryFilters extends PriceRange {
//   pizzaDoughTypes: string;
//   sizes: string;
//   ingredients: string;
// }

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map(({ id, name }) => ({
    value: String(id),
    text: name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('min', prices[0]);
    filters.setPrices('max', prices[1]);
  };

  return (
    <div className={className}>
      <Title className="mb-5 font-bold" text="Фильтры" size="sm" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaDoughTypes}
        selectedValues={filters.pizzaDoughTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selectedValues={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mt-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            min={0}
            max={1000}
            placeholder="0"
            value={String(filters.prices.min)}
            onChange={(e) => filters.setPrices('min', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            value={String(filters.prices.max)}
            onChange={(e) => filters.setPrices('max', Number(e.target.value))}
            placeholder="1000"
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={1}
          value={[filters.prices.min || 0, filters.prices.max || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Фильтр ингридиентов */}
      <CheckboxFiltersGroup
        title={'Ингредиенты'}
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selectedValues={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
