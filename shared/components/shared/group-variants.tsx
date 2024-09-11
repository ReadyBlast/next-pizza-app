'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface GroupVariantsProps {
  variants: readonly Variant[];
  // defaultValue?: string;
  onClick?: (value: Variant['value']) => void;
  value?: Variant['value'];
  className?: string;
}

export const GroupVariants: React.FC<GroupVariantsProps> = ({
  variants,
  onClick,
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
        className,
      )}
    >
      {variants.map((variant) => (
        <button
          key={variant.value}
          onClick={() => onClick?.(variant.value)}
          className={cn(
            'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': variant.value === value,
              'text-gray-500 opacity-50 pointer-events-none': variant.disabled,
            },
          )}
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
};
