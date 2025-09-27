import { createSupabaseAdmin } from "@/lib/supabase.server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Получатели  ECHO",
  description: "Управление списком получателей ваших посланий."
};

async function loadRecipients() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("recipients").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export default async function RecipientsPage() {
  const recipients = await loadRecipients();

  return (
    <div className="container py-[var(--spacing-lg)] space-y-[var(--spacing-md)]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Получатели</h1>
        <Link href="/recipients/add" className="btn">Добавить</Link>
      </div>

      {recipients.length === 0 && (
        <p className="text-[var(--colors-muted)]">Вы ещё не добавили ни одного получателя.</p>
      )}

      <div className="grid gap-[var(--spacing-md)]">
        {recipients.map((r: any) => (
          <div
            key={r.id}
            className="border border-[var(--colors-border)] rounded-xl p-4 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-medium">{r.name || "Без имени"}</h2>
                <p className="text-sm text-[var(--colors-muted)]">{r.email}</p>
              </div>
              <span className="text-xs text-[var(--colors-muted)]">
                {new Date(r.created_at).toLocaleDateString("ru-RU")}
              </span>
            </div>
            {r.note && <p className="text-sm text-[var(--colors-text)]">{r.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}