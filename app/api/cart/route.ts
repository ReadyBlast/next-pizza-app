import prisma from '@/prisma/prisma-client';
import { findOrCreateCard, updateCartUserAmount } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCard(token);

    const data = (await req.json()) as CreateCartItemValues;
    const ingredientsArray = data.ingredients ?? [];

    // Находим элемент корзины вместе с ингредиентами
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
      include: {
        ingredients: true, // Загружаем связанные ингредиенты
      },
    });

    // Проверяем точное совпадение массива ингредиентов
    const ingredientsMatch =
      findCartItem &&
      findCartItem.ingredients.length === ingredientsArray.length &&
      findCartItem.ingredients.every((ingredient) =>
        ingredientsArray.includes(ingredient.id),
      );

    if (ingredientsMatch) {
      // Если ингредиенты совпали, обновляем количество
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Если не совпали, создаем новый элемент корзины
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updateUserCart = await updateCartUserAmount(token);
    const res = NextResponse.json(updateUserCart);

    res.cookies.set('cartToken', token);
    return res;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 },
    );
  }
}
