import { Ingredient, ProductVariant } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../components/constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  variants: ProductVariant[],
  selectedIngredients: Set<number>,
) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    ingredients,
    variants,
    selectedIngredients,
  );

  return { textDetails, totalPrice };
};