'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function forgotPassword(email: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.resetPasswordForEmail(email);
  return JSON.stringify(result);
}

export async function resetPassword(data: {
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) {
    return JSON.stringify({ error });
  }

  revalidatePath('/login', 'layout');
  redirect('/login');
}
