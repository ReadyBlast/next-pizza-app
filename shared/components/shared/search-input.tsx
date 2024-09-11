'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef<HTMLInputElement>(null);

  useClickAway(ref, () => setFocused(false));

  const onClickCLearStates = () => {
    setProducts([]);
    setSearchQuery('');
    setFocused(false);
  };

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    },
    250,
    [searchQuery],
  );

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
      )}
      <div
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className,
        )}
        ref={ref}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full pl-11 bg-gray-100"
          type="text"
          placeholder="Найти пиццу"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickCLearStates}
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-sm h-8 w-8"
                />
                <div>{product.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
