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
      if (!data?.user) {
        window.location.href = "/login";
        return;
      }
      setUser(data.user);
      setLoading(false);
    })();
  }, [supabase]);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) return <main className="max-w-md mx-auto p-6">агрузка…</main>;

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">ой профиль</h1>
      <div className="rounded-2xl border p-4">
        <div className="text-sm text-gray-500">Email</div>
        <div className="text-lg">{user?.email}</div>
      </div>
      <button
        onClick={signOut}
        className="w-full rounded-2xl border px-4 py-2 hover:bg-gray-50 transition"
      >
        ыйти
      </button>
    </main>
  );
}
