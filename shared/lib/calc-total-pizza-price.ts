import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaSize, PizzaType } from '../components/constants/pizza';

  /**
   * Функция для подсчета итоговой стоимости пиццы
   * 
   * @param size - размер пиццы
   * @param type - тип теста пиццы
   * @param ingredients - список ингредиентов
   * @param variants - список вариаций
   * @param selectedIngredients - выбранные ингредиенты
   * @returns number общую стоимость
   */

export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  variants: ProductVariant[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    variants.find(
      (variant) => variant.pizzaDoughType === type && variant.size === size,
    )?.price || 0;
  const totalIngredientsCost = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsCost;

  return totalPrice;
};
