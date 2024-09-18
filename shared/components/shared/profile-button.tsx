import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';

interface ProfileButtonProps {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();
  const [loading] = useCartStore((state) => [state.loading]);

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className={cn('flex items-center gap-1', {
            'w-[100px]': loading,
          })}
          // loading={loading && session === undefined}
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
          >
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
