'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    }
    router.push('/');
    window.location.reload();
  }

  return (
    <Button className="button-inverse" onClick={handleSignOut}>
      Logout
    </Button>
  );
}
