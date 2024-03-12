import ForgotPasswordForms from '@/components/auth/ForgotPasswordForm';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ForgotPassword() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect('/');
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="max-w-[350px]">
        <div className="space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold">Recover your password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email to recover your password
          </p>
        </div>
        <ForgotPasswordForms />
      </div>
    </div>
  );
}
