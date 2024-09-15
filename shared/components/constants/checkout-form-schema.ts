import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2 символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должно содержать не менее 2 символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone: z.string().min(10, { message: 'Номер должен содержать 10 цифр' }),
  address: z.string().min(10, { message: 'Введите корректный адрес' }),
  comment: z.string().optional()
});

export type CheckoutFormSchemaValues = z.infer<typeof checkoutFormSchema>