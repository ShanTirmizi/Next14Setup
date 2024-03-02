import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const Profile = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  if (!user) {
    return null;
  }

  console.log('user', user);

  const profile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.user.create({
    data: {
      id: user.id,
      email: user.email || '',
    },
  });

  return newProfile;
};
