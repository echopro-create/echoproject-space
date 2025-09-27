import { createSupabaseAdmin } from "@/lib/supabase.server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Мой профиль  ECHO",
  description: "Общая информация об аккаунте, активности и статистике."
};

async function getProfile() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("profiles").select("*").single();
  if (error) return null;
  return data;
}

async function getStats() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.rpc("user_message_stats"); // необязательная функция
  return error ? null : data;
}

export default async function MePage() {
  const profile = await getProfile();
  const stats = await getStats();

  return (
    <div className="container py-[var(--spacing-lg)] max-w-[700px] mx-auto space-y-[var(--spacing-md)]">
      <h1 className="text-3xl font-semibold">Мой профиль</h1>

      {!profile ? (
        <p className="text-[var(--colors-muted)]">Не удалось загрузить профиль.</p>
      ) : (
        <div className="space-y-2">
          <p><strong>Имя:</strong> {profile.display_name || ""}</p>
          <p><strong>Email:</strong> (автоматически из auth)</p>
          <p><strong>Частота пульса:</strong> {profile.heartbeat_freq}</p>
          <p><strong>Grace-период:</strong> {profile.heartbeat_grace_days} дн.</p>
          <p>
            <strong>Последний пинг:</strong>{" "}
            {profile.heartbeat_last_at
              ? new Date(profile.heartbeat_last_at).toLocaleString("ru-RU")
              : "ещё не было"}
          </p>
        </div>
      )}

      {stats && (
        <div className="mt-[var(--spacing-lg)] space-y-1">
          <h2 className="text-xl font-medium"> Статистика</h2>
          <p>Всего посланий: {stats.total}</p>
          <p>Черновиков: {stats.draft}</p>
          <p>Готовых к отправке: {stats.ready}</p>
          <p>Отправленных: {stats.sent}</p>
        </div>
      )}

      <div className="mt-[var(--spacing-lg)]">
        <a href="/settings" className="btn w-full">Изменить настройки</a>
      </div>
    </div>
  );
}