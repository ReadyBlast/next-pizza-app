'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Button, DropdownMenu } from '../ui';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../ui/dropdown-menu';
import { SortOption, useSortStore } from '@/shared/store';

interface SortPopupProps {
  className?: string;
}

const sortTypes = [
  { value: 'popularity', name: 'по популярности' },
  { value: 'price', name: 'по цене' },
  { value: 'alphabet', name: 'по алфавиту' },
] as const;

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
  const { sortOption, setSortOption } = useSortStore();
  const sortType = sortTypes.find((item) => item.value === sortOption);

  const handleSortChange = (
    option: 'price' | 'popularity' | 'alphabet',
  ) => {
    setSortOption(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className,
          )}
        >
          <ArrowUpDown size={16} />
          <b>Сортировка:</b>
          <b className="text-primary">{sortType?.name}</b>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => handleSortChange(value as SortOption)}>
          <DropdownMenuRadioItem value="popularity">
            по популярности
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price">по цене</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="alphabet">
            по алфавиту
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
