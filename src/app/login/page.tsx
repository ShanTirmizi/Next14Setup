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
    <div className="flex justify-center items-center h-screen">
      <Login />
    </div>
  );
}
