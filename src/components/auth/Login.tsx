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
import { signInWithEmailAndPassword } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = form;

  async function onSubmit(data: TLoginForm) {
    const result = await signInWithEmailAndPassword(data);

    const { error } = await JSON.parse(result);

    if (error) {
      return setError('root', { message: error.message });
    }

    router.push('/');
    window.location.reload();
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
          <Button type="submit" disabled={isSubmitting} className="gap-x-2">
            Login {isSubmitting && <Loader2 className="animate-spin ml-auto" />}
          </Button>
          {errors.root && <p>{errors.root.message}</p>}
        </form>
      </Form>
      <Link href="/sign-up" className="link w-full">
        Don&apos;t have an account? Sign Up.
      </Link>
    </>
  );
}
