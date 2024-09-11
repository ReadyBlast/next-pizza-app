import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  name,
  imageUrl,
  onClickAdd,
  className,
}) => {
  const textDetails = '30 sm traditional';
  const totalPrice = '3768';

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>
        <Button className="h-[55px] px-10 rounded-[18px] text-base w-full mt-10">
          Add to cart {totalPrice}
        </Button>
      </div>
    </div>
  );
};
