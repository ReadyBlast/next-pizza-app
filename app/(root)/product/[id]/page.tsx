import {
  Container,
  GroupVariants,
  ProductImage,
  Title,
} from '@/shared/components/shared';
import prisma from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Container className="my-10 flex flex-col">
        <div className="flex flex-1">
          <ProductImage imageUrl={product.imageUrl} size={20} />

          <div className="w-[490px] bg-[#FCFCFC] p-7">
            <Title text={product.name} size="md" className="font-extrabold" />

            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur hic maxime sapiente consectetur labore provident
              suscipit cupiditate blanditiis ipsa alias, nobis amet eveniet
              corrupti adipisci. Eveniet ab iusto suscipit consequuntur.
            </p>

            <GroupVariants
              variants={[
                {
                  name: 'Маленькая',
                  value: '1',
                },
                {
                  name: 'Средняя',
                  value: '2',
                },
                {
                  name: 'Большая',
                  value: '3',
                },
              ]}
              value="2"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
