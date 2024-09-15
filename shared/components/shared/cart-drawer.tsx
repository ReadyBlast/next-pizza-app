'use client';

import React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Title } from './title';
import { useCart } from '@/shared/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f5f3f3]">
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex items-center justify-center flex-col mx-auto w-72 h-full">
            <Image
              src="/assets/images/empty-box.png"
              alt="Empty cart"
              width={100}
              height={100}
            />
            <Title
              className="text-center font-bold my-2"
              text="Ваша корзина пуста"
              size="sm"
            />
            <p className="text-center mb-5 text-neutral-500">
              Добавьте в нее что-нибудь, чтобы совершить заказ
            </p>

            <SheetClose>
              <Button className="w-56 h-12 text-base" size={'lg'}>
                <ArrowLeft className="mr-2 w-5" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className={cn('-mx-6 mt-5 overflow-auto scrollbar flex-1')}>
              {items.map((item) => (
                <div key={item.id} className="mb-2">
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                    )}
                    disabled={loading}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="-mx-6 p-8 bg-white">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={loading || redirecting}
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
