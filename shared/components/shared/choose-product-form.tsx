import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7 flex flex-col justify-between">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 rounded-[18px] text-base w-full mt-10"
        >
          Добавить в корзину за {price}
        </Button>
      </div>
    </div>
  );
};
