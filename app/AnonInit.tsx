'use client';
import { useEffect } from 'react';
import { getSupabaseBrowserClient } from '../lib/supabase.client';

export default function AnonInit() {
  useEffect(() => {
    (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        await supabase.auth.signInAnonymously();
        console.log('РЅРѕРЅРёРјРЅР°СЏ СЃРµСЃСЃРёСЏ СЃРѕР·РґР°РЅР°');
      }
    })();
  }, []);

  return null;
}

