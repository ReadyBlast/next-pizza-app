'use server';

import { CheckoutFormSchemaValues } from '@/shared/components/constants/checkout-form-schema';
import prisma from '@/prisma/prisma-client';
import { cookies } from 'next/headers';
import { OrderStatus } from '@prisma/client';
import { createPayment, sendEmail } from '@/shared/lib';
import { PrepayOrderTemplate } from '@/shared/components/shared';

export async function createOrder(data: CheckoutFormSchemaValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        items: JSON.stringify(userCart.items),
        status: OrderStatus.PENDING,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      description: 'Заказ #' + order.id,
      orderId: order.id,
      amount: order.totalAmount,
    });

    if(!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      }
    })

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      'Next Pizza | Заказ #' + order.id,
      PrepayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (error) {
    console.error('[CreateOrder] Server error', error);
  }
}
