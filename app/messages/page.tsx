import { createSupabaseAdmin } from "@/lib/supabase.server";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Мои послания  ECHO",
  description: "Список всех созданных посланий: текст, аудио, видео и файлы."
};

async function loadMessages() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export default async function MessagesPage() {
  const messages = await loadMessages();

  return (
    <div className="container py-[var(--spacing-lg)] space-y-[var(--spacing-md)]">
      <h1 className="text-3xl font-semibold">Мои послания</h1>
      {messages.length === 0 && (
        <p className="text-[var(--colors-muted)]">Вы ещё не создали ни одного послания.</p>
      )}

      <div className="grid gap-[var(--spacing-md)]">
        {messages.map((m: any) => (
          <Link
            key={m.id}
            href={`/messages/${m.id}`}
            className="block rounded-xl border border-[var(--colors-border)] p-4 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm uppercase tracking-wide text-[var(--colors-muted)]">{m.type}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-black text-white">
                {m.status === "draft" ? "Черновик" : m.status === "ready" ? "Готово" : "Отправлено"}
              </span>
            </div>
            {m.text && <p className="line-clamp-2 text-[var(--colors-text)]">{m.text}</p>}
            <div className="mt-2 text-xs text-[var(--colors-muted)]">
              Создано: {new Date(m.created_at).toLocaleString("ru-RU")}
              {m.delivery_at && <>  Доставка: {new Date(m.delivery_at).toLocaleDateString("ru-RU")}</>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}