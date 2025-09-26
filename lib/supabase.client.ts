// lib/supabase.client.ts
import { createBrowserClient } from '@supabase/ssr';

// Переменные окружения автоматически берутся из NEXT_PUBLIC_...
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClient = () => createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);

// Экспортируем основной клиент для удобства в клиентских компонентах
export const supabaseClient = createSupabaseClient();