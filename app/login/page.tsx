"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase.client";

export default function Page() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = getSupabaseBrowserClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://echoproject.space";

    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });

    setSent(true);
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">РЎвЂ¦Р С•Р Т‘ Р С—Р С• e-mail</h1>
      {sent ? (
        <p>Р С‘РЎРѓРЎРЉР СР С• Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С•. РЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉ Р С—Р С•РЎвЂЎРЎвЂљРЎС“ Р С‘ Р С—Р ВµРЎР‚Р ВµР в„–Р Т‘Р С‘ Р С—Р С• РЎРѓРЎРѓРЎвЂ№Р В»Р С”Р Вµ.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button type="submit" className="w-full border rounded px-3 py-2">
            РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ РЎРѓРЎРѓРЎвЂ№Р В»Р С”РЎС“
          </button>
        </form>
      )}
    </main>
  );
}




