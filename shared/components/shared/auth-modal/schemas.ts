import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message:
      'Введите корректный пароль. Пароль должен содержать 8 символов, включая одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
  })
  .regex(new RegExp('.*[A-Z].*'), 'Одна буква должна быть заглавной')
  .regex(new RegExp('.*[a-z].*'), 'Одна буква должна быть строчной')
  .regex(new RegExp('.*\\d.*'), 'Пароль должен содержать одну цифру')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'Пароль должен содержать один специальный символ',
  );

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema.merge(
  z.object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    confirmPassword: passwordSchema,
  }),
).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
