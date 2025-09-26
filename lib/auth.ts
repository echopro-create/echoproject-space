// lib/auth.ts
import 'server-only';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase.server';
import { Profile } from './types';

// Получение сессии и пользователя на сервере
export async function getSessionAndUser() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, user: null };
  }

  return { session, user: session.user };
}

// Защита приватных роутов
export async function ensureAuthenticated() {
  const { user } = await getSessionAndUser();

  if (!user) {
    // Редирект на страницу входа
    redirect('/login');
  }

  return user;
}

// Получение профиля пользователя
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { 
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return (data as Profile) || null;
}