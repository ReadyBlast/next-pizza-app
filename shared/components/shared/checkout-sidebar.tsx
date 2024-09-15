import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutPaymentDetails } from './checkout-payment-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

const VAT = 20;
const DELIVERY_COST = 500;

interface CheckoutSidebarProps {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatAmount = Math.ceil((totalAmount / 100) * VAT);
  const deliveryCost = DELIVERY_COST;
  const totalCost = totalAmount + vatAmount + deliveryCost;

  return (
    <div className={className}>
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Итого:</span>
          {loading ? (
            <Skeleton className="w-2/5 h-11" />
          ) : (
            <span className="h-11 text-[34px] font-extrabold">
              {totalCost} ₽
            </span>
          )}
        </div>

        <CheckoutPaymentDetails
          paymentName={
            <div className="flex items-center">
              <Package className="mr-2 text-gray-300" size={18} />
              Стоимость товаров
            </div>
          }
          paymentAmount={
            loading ? (
              <Skeleton className="w-16 h-8 rounded-[6px]" />
            ) : (
              `${totalAmount} ₽`
            )
          }
        />

        <CheckoutPaymentDetails
          paymentName={
            <div className="flex items-center">
              <Percent className="mr-2 text-gray-300" size={18} />
              НДС
            </div>
          }
          paymentAmount={
            loading ? (
              <Skeleton className="w-16 h-8 rounded-[6px]" />
            ) : (
              `${vatAmount} ₽`
            )
          }
        />
        <CheckoutPaymentDetails
          paymentName={
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-300" size={18} />
              Доставка
            </div>
          }
          paymentAmount={
            loading ? (
              <Skeleton className="w-16 h-8 rounded-[6px]" />
            ) : (
              `${deliveryCost} ₽`
            )
          }
        />
        <Button className="w-full h-14 rounded-2xl mt-6 text-base font-bold" loading={loading}>
          Оформить заказ
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
