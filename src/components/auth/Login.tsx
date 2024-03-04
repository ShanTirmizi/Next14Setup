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
    <div className="max-w-[350px] space-y-6 w-full">
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-x-2 w-full"
          >
            Login{' '}
            {isSubmitting && (
              <span>
                <Loader2 className="animate-spin ml-auto" />
              </span>
            )}
          </Button>
          {errors.root && (
            <div className="p-4 rounded-md border border-gray-200 dark:border-gray-800 bg-red-50 dark:bg-red-900">
              {errors.root.message}
            </div>
          )}
        </form>
      </Form>
      <div className="text-center text-sm mt-4">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
