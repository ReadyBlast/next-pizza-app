import prisma from '@/prisma/prisma-client';
export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaDoughTypes?: string;
  ingredients?: string;
  min?: string;
  max?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const pizzaDoughType = params.pizzaDoughTypes?.split(',').map(Number);
  const ingredientsIdsArray = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.min) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.max) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsIdsArray
            ? {
                some: {
                  id: {
                    in: ingredientsIdsArray,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              pizzaDoughType: {
                notIn: pizzaDoughType,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  if (params.sortBy === 'price') {
    categories.forEach((category) => {
      category.products.sort(
        (a, b) => a.variants[0].price - b.variants[0].price,
      );
    });
  }

  if (params.sortBy === 'alphabet') {
    categories.forEach((category) => {
      category.products.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  return categories;
};
