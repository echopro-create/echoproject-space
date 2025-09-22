"use client";

import { supabase } from "@/lib/supabase";

export default function UploadsPage() {
  async function signInAnon() {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) alert("Auth error: " + error.message);
    else alert("отово: анонимный вход ✓");
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const path = `web/${crypto.randomUUID()}_${f.name}`;
    const { data, error } = await supabase.storage.from("uploads").upload(path, f, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      alert("Upload error: " + error.message + "\n\nроверь: bucket 'uploads' существует и политика RLS разрешает загрузку аутентифицированным.");
      return;
    }
    const { data: pub } = supabase.storage.from("uploads").getPublicUrl(path);
    alert("агружено ✓\n\n" + pub.publicUrl);
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">агрузка в Supabase Storage</h1>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-neutral-300">
        <li>ажми «нонимный вход» (создаст временную сессию).</li>
        <li>ыбери файл - он уйдёт в bucket <code>uploads</code>.</li>
      </ol>
      <div className="flex gap-3 pt-2">
        <button onClick={signInAnon} className="px-4 py-2 rounded-xl bg-white text-black">нонимный вход</button>
        <label className="px-4 py-2 rounded-xl border border-white/15 cursor-pointer">
          ыбрать файл
          <input onChange={onFile} type="file" className="hidden" />
        </label>
      </div>
    </main>
  );
}
