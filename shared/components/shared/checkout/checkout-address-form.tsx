'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface CheckoutAddressFormProps {
  className?: string;
}

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({
  className,
}) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          render={({ field, fieldState }) => (
            <div>
              <AddressInput onChange={field.onChange} />
              {fieldState.error && fieldState.error.message && (
                <ErrorText text={fieldState.error.message} className="mt-2" />
              )}
            </div>
          )}
          name="address"
          control={control}
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
