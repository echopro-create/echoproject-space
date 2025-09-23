import { supabaseServer } from "@/lib/supabaseServer";

type Message = {
  id: string;
  recipient_email: string | null;
  content_text: string | null;
  status: string | null;
  mode: string | null;           // "dms" или иное
  delivery_at: string | null;    // ISO-строка или null
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function statusLabel(s?: string | null) {
  switch ((s ?? "").toLowerCase()) {
    case "draft": return "ерновик";
    case "queued": return " очереди";
    case "sent": return "тправлено";
    case "failed": return "шибка";
    default: return "еизвестно";
  }
}

function fmtDate(v: string | null) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("ru-RU");
}

export default async function MessagesPage() {
  const { data, error } = await supabaseServer
    .from("messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Сообщения</h1>
        <p className="text-red-500 mt-4">шибка загрузки: {error.message}</p>
      </main>
    );
  }

  const messages: Message[] = data ?? [];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Сообщения</h1>

      {messages.length === 0 ? (
        <p className="text-neutral-500 mt-4">ока нет посланий.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {messages.map((m, i) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 shadow-sm flex flex-col"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold truncate">
                  ослание для {m.recipient_email ?? "—"}
                </h3>
                <p className="text-neutral-500 text-sm mt-2 line-clamp-3">
                  {m.content_text ?? "—"}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {statusLabel(m.status)}
                  </span>
                  <span className="text-neutral-500">
                    {m?.mode === "dms" ? "Dead-man switch" : `ата: ${fmtDate(m.delivery_at)}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

