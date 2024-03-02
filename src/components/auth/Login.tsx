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
import { login } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { login, signup } from './actions';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  // formAction: z.string(),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export default function Login() {
  const supabase = createClientComponentClient();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      // formAction: 'login',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    setError,
  } = form;

  // async function login(formData: TLoginForm) {
  //   // type-casting here for convenience
  //   // in practice, you should validate your inputs
  //   console.log('formData', formData);
  //   const data = {
  //     email: formData.email,
  //     password: formData.password,
  //   };
  //   const { error } = await supabase.auth.signInWithPassword(data);

  //   if (error) {
  //     return setError(error?.message, { shouldFocus: true });
  //   }
  //   revalidatePath('/', 'layout');
  //   redirect('/');
  // }

  // const onSubmit = async (data: TLoginForm) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('email', data.email);
  //     formData.append('password', data.password);
  //     if (data.formAction === 'login') {
  //       await login(formData);
  //     } else if (data.formAction === 'signup') {
  //       await signup(formData);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button formAction={login}>Login</Button>
        </form>
      </Form>
      <Link href="/sign-up" className="link w-full">
        Don&apos;t have an account? Sign Up.
      </Link>
    </>
  );
}
