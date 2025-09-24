'use client';
import { useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase.client';

export default function AnonInit() {
  useEffect(() => {
    (async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        await supabase.auth.signInAnonymously();
        console.log('нонимная сессия создана');
      }
    })();
  }, []);

  return null;
}
