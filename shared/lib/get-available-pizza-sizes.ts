import { ProductVariant } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../components/constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const filteredPizzaByType = variants.filter(
    (variant) => variant.pizzaDoughType === type,
  );
  const availablePizzas = pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !filteredPizzaByType.some(
      (pizza) => pizza.size === Number(variant.value),
    ),
  }));

  return availablePizzas;
}