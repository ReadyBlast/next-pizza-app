import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../components/constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  type: PizzaType,
  size: PizzaSize,
) => {
  const details = []
  
  if (type && size) {
    const typeName = mapPizzaType[type]
    details.push(`${typeName} ${size} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name))
  }

  return details.join(', ')
}