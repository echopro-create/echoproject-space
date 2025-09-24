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
        console.log('Р Р…Р С•Р Р…Р С‘Р СР Р…Р В°РЎРЏ РЎРѓР ВµРЎРѓРЎРѓР С‘РЎРЏ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р В°');
      }
    })();
  }, []);

  return null;
}





