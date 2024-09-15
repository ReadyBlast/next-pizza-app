import { Header } from '@/shared/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Оформление заказа',
  description: 'Страница оформления заказа',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f5f3f3]">
      <Header className="border-gray-200" isCheckout />
      {children}
    </main>
  );
}
