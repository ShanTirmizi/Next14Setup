import SignUp from '@/components/auth/SignUp';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/');
  }

  return (
    <>
      <SignUp />
    </>
  );
}
