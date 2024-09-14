'use client';

import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variants[0].pizzaDoughType);
  const firstItem = product.variants[0];
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  // const onAddProduct = () => {
  //   addCartItem({ productItemId: firstItem.id });
  // };

  // const onAddPizza = async (productItemId: number, ingredients: number[]) => {
  //   try {
  //     await ;
  //     toast.success('Пицца добавлена в корзину');
  //     router.back();
  //   } catch (error) {
  //     toast.error('Не удалось добавить пиццу в корзину');
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      
      await addCartItem({ productItemId: itemId, ingredients });

      toast.success('Добавлено в корзину');
      router.back();
    } catch (error) {
      toast.error('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
