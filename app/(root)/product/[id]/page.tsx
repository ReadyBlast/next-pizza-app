import { Container, ProductForm } from '@/shared/components/shared';
import prisma from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      variants: true,
      category: {
        include: {
          products: {
            include: { variants: true },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Container className="my-10 flex flex-col">
        <ProductForm product={product} />
      </Container>
    </>
  );
}
