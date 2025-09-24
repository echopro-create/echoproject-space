"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase.client";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    })();
  }, [supabase]);

  if (loading) return <p>Р В°Р С–РЎР‚РЎС“Р В·Р С”Р В°...</p>;
  if (!user) return <p>РЎвЂ№ Р Р…Р Вµ Р В°Р Р†РЎвЂљР С•РЎР‚Р С‘Р В·Р С•Р Р†Р В°Р Р…РЎвЂ№</p>;

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Р С•Р в„– Р С—РЎР‚Р С•РЎвЂћР С‘Р В»РЎРЉ</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}




