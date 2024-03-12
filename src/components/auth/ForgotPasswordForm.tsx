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
import { forgotPassword } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email(),
});

type TLoginForm = z.infer<typeof loginFormSchema>;

export default function ForgotPasswordForms() {
  const [message, setMessage] = useState('');
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
    setValue,
  } = form;

  async function onSubmit(data: TLoginForm) {
    setMessage('');
    const result = await forgotPassword(data?.email);

    const { error } = await JSON.parse(result);

    if (error) {
      return setError('root', { message: error.message });
    }

    setMessage('Check your email for a password reset link');
    setValue('email', '');
  }

  return (
    <div className="space-y-6 w-full">
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-x-2 w-full"
          >
            Send{' '}
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
      {message && (
        <div className="p-4 rounded-md border border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-900">
          {message}
        </div>
      )}
    </div>
  );
}
