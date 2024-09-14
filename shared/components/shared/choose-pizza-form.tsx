'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '../constants/pizza';
import { Ingredient, ProductVariant } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  variants: ProductVariant[];
  ingredients: Ingredient[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
  name,
  variants,
  ingredients,
  imageUrl,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availablePizzas,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variants);

  const { textDetails, totalPrice } = getPizzaDetails(
    size,
    type,
    ingredients,
    variants,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-3 mt-10">
          <GroupVariants
            variants={availablePizzas}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            variants={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 rounded-[18px] text-base w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
