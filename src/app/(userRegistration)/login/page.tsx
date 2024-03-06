import GoogleLogin from '@/components/auth/GoogleLogin';
import Login from '@/components/auth/Login';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect('/');
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="max-w-[350px]">
        <div className="space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
        </div>
        <GoogleLogin />
        <Login />
      </div>
    </div>
  );
}
