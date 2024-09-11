import React from "react";
import { PizzaSize, PizzaType } from "../components/constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariant } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzas: Variant[]
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (
  variants: ProductVariant[],
): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet<number>(
    new Set([]),
  );

  const availablePizzas = getAvailablePizzaSizes(type, variants);

  React.useEffect(() => {
    const isAvailableSize = availablePizzas.find(
      (variant) => Number(variant.value) === size && !variant.disabled,
    );
    const availableSize = availablePizzas.find((variant) => !variant.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize?.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzas,
    setSize,
    setType,
    addIngredient
  }
}
