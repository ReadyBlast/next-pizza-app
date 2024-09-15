'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';

interface AddressInputProps {
  onChange?: (value?: string) => void;
  className?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  onChange,
  className,
}) => {
  const token = process.env.NEXT_PUBLIC_DADATA_API_KEY || '';
  const id = React.useId();

  return (
    <AddressSuggestions
      inputProps={{
        className:
          'h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', // Tailwind для поля ввода
        placeholder: 'Адрес доставки',
      }}
      containerClassName="relative flex flex-col" // Tailwind для контейнера
      suggestionsClassName="absolute flex flex-col items-start top-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10" // Tailwind для блока с подсказками
      suggestionClassName="p-2 hover:bg-gray-100 cursor-pointer w-full text-start first:rounded-t-lg last:rounded-b-lg" // Tailwind для каждой подсказки
      currentSuggestionClassName="p-2 bg-gray-400 text-white" // Tailwind для выделенной подсказки
      hintClassName="text-gray-500 text-sm mt-1" // Tailwind для блока с пояснением
      highlightClassName="font-semibold text-primary bg-inherit"
      token={token}
      onChange={(data) => onChange?.(data?.value)}
      uid={id}
    />
  );
};
