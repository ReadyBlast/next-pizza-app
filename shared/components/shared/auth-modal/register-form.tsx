import React from 'react';
import { Button } from '../../ui';
import { FormInput } from '../form';
import { FormProvider, useForm } from 'react-hook-form';
import { registerFormSchema, RegisterFormValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/app/actions';
import toast from 'react-hot-toast';

interface RegisterFormProps {
  onClose?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
 const form = useForm<RegisterFormValues>({
   resolver: zodResolver(registerFormSchema),
   defaultValues: {
     email: '',
     fullName: '',
     password: '',
     confirmPassword: '',
   },
 });

 const onSubmit = async (data: RegisterFormValues) => {
   try {
     await registerUser({
       email: data.email,
       fullName: data.fullName,
       password: data.password,
     });

     toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
       icon: '✅',
     });

     onClose?.();
   } catch (error) {
     return toast.error('Неверный E-Mail или пароль', {
       icon: '❌',
     });
   }
 };

 return (
   <FormProvider {...form}>
     <form
       className="flex flex-col gap-5"
       onSubmit={form.handleSubmit(onSubmit)}
     >
       <FormInput name="email" label="E-Mail" required />
       <FormInput name="fullName" label="Полное имя" required />
       <FormInput name="password" label="Пароль" type="password" required />
       <FormInput
         name="confirmPassword"
         label="Подтвердите пароль"
         type="password"
         required
       />

       <Button
         loading={form.formState.isSubmitting}
         className="h-12 text-base"
         type="submit"
       >
         Зарегистрироваться
       </Button>
     </form>
   </FormProvider>
 );
};