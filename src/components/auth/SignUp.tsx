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
// import { signup } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [message, setMessage] = useState('');
  const supabase = createClientComponentClient();

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
  } = form;
  // const onSubmit = async (data: TSignUpForm) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('email', data.email);
  //     formData.append('password', data.password);
  //     const res = await signup(formData);
  //     console.log('res', res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  async function onSubmit(formData: TSignUpForm) {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error } = await supabase.auth.signUp(data);
    console.log('error', error);
    if (error) {
      return router.push('/error');
    }

    setValue('email', '');
    setValue('password', '');
    setValue('confirmPassword', '');

    // revalidatePath('/', 'layout');

    setMessage('Success! Please check your email for further instructions.');
  }

  // console.log('errors', errors);

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
          <Button type="submit">Sign up</Button>
        </form>
      </Form>
      <Link href="/login" className="link w-full">
        Already have an account? Sign In.
      </Link>
      {isSubmitting && <Loader2 />}
      {message && <p>{message}</p>}
    </>
  );
}
