"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewMessagePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"dms" | "scheduled">("dms");
  const [deliveryAt, setDeliveryAt] = useState(""); // yyyy-MM-ddTHH:mm
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) await supabase.auth.signInAnonymously();
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setNote(null);
    try {
      const payload: any = {
        recipient_email: email || null,
        content_text: text || null,
        status: "draft",
        mode,
        delivery_at: deliveryAt ? new Date(deliveryAt).toISOString() : null,
      };
      const { error } = await supabase.from("messages").insert([payload]);
      if (error) throw error;
      router.push("/messages");
    } catch (err: any) {
      setNote(err.message ?? String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">овое послание</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">ому (email)</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                 placeholder="user@example.com"
                 className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
        </div>
        <div>
          <label className="block text-sm mb-1">Текст послания</label>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={6}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">ежим</label>
            <select value={mode} onChange={e=>setMode(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3">
              <option value="dms">Dead-man switch</option>
              <option value="scheduled">о расписанию</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">ата доставки (если по расписанию)</label>
            <input value={deliveryAt} onChange={e=>setDeliveryAt(e.target.value)} type="datetime-local"
                   className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3"/>
          </div>
        </div>
        <div className="flex gap-3">
          <button disabled={busy} type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black disabled:opacity-60">
            {busy ? "Сохраняю..." : "Сохранить"}
          </button>
          <a href="/messages" className="px-5 py-2 rounded-xl border border-white/15">тмена</a>
        </div>
        {note && <p className="text-red-500 text-sm">{note}</p>}
      </form>
    </main>
  );
}
