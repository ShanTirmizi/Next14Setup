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
import { resetPassword } from '@/utils/supabase/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpFormSchema = z
  .object({
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

export default function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
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
    const result = await resetPassword(data);
    const { error } = await JSON.parse(result);
    if (error) {
      setError('root', { message: error.message });
      return;
    }

    setValue('password', '');
    setValue('confirmPassword', '');
  }

  return (
    <div className="space-y-6 w-full">
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-x-2"
          >
            Update{' '}
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
    </div>
  );
}
