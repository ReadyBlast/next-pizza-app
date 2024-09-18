import { InfoBlock } from '@/shared/components/shared';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

// export const dynamic = 'force-dynamic';

export default async function UnauthorizedPage() {
  const session = await getUserSession();

  if (session) {
    return redirect('/profile');
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
