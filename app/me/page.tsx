"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string|null>(null);

  useEffect(() => {
    const run = async () => {
      const supabase = createClientComponentClient();
      const { data: { user } } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
      setLoading(false);
    };
    run();
  }, []);

  if (loading) return <main className="p-6">роверяем сессию…</main>;
  if (!email) return <main className="p-6">❌ е авторизован</main>;
  return <main className="p-6">✅ вторизован: <b>{email}</b></main>;
}
