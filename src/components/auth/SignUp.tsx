'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpWithEmailAndPassword } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: 'Passwords do not match', path: ['confirmPassword'] },
  );

type TSignUpForm = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const [message, setMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = form;

  async function onSubmit(data: TSignUpForm) {
    const result = await signUpWithEmailAndPassword(data);
    const { error } = await JSON.parse(result);
    if (error) {
      return setError('root', { message: error.message });
    }

    setValue('email', '');
    setValue('password', '');
    setValue('confirmPassword', '');

    setMessage('Success! Please check your email for further instructions.');
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <Button type="submit" disabled={isSubmitting}>
            Sign up{' '}
            {isSubmitting && <Loader2 className="animate-spin ml-auto" />}
          </Button>
          {errors.root && <p>{errors?.root.message}</p>}
        </form>
      </Form>
      <Link href="/login" className="link w-full">
        Already have an account? Sign In.
      </Link>
      {message && <p>{message}</p>}
    </>
  );
}
