import { PaymentCallbackData } from '@/@types/yookassa';
import prisma from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components/shared';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ не оформлен',
        'Ваш заказ был отменен. Проверьте реквизиты оплаты. Если вы не совершали оплату, свяжитесь с нами.',
      );
    }

    return NextResponse.json('OK', { status: 200 });
  } catch (error) {
    console.error('[CHECKOUT_CALLBACK] Server error', error);

    return NextResponse.json('Error', { status: 500 });
  }
}
