'use client';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';

export default function GoogleLogin() {
  const supabase = createClient();
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Button onClick={loginWithGoogle} className="w-full my-2">
      Sign in with Google
    </Button>
  );
}
