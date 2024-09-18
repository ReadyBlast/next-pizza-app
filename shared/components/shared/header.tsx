'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Container } from './container';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileButton } from './profile-button';
import { AuthModal } from './auth-modal';

interface HeaderProps {
  isCheckout?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ isCheckout, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Заказ отменен';
    }

    if (searchParams.has('expired')) {
      toastMessage = 'Действие кода активации истекло. Пожалуйста, пройдите регистрацию еще раз';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 2500,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="inline-flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Turbo Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {!isCheckout && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {!isCheckout && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
