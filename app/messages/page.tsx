import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase.server';

const formatRU = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' }) : '—';

export default async function MessagesPage() {
  const supabase = createSupabaseServerClient(cookies());
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;

  let items: any[] = [];
  if (user) {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    items = data ?? [];
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ваши послания</h1>
        <p className="text-lg text-gray-600 mb-8">Список всех сообщений, которые вы создали.</p>
        <a href="/messages/new" className="inline-flex px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-black">Создать новое послание</a>
      </section>

      {!user ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg">Чтобы увидеть послания, выполните вход/создайте сессию.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg">У вас пока нет посланий.</p>
          <a href="/messages/new" className="mt-4 inline-block text-sm text-blue-600 hover:underline">Создать первое послание</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="mb-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Статус:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  m.status === 'sent' ? 'bg-green-100 text-green-800' :
                  m.status === 'queued' ? 'bg-blue-100 text-blue-800' :
                  m.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {m.status === 'sent' ? 'Отправлено' :
                   m.status === 'queued' ? 'В очереди' :
                   m.status === 'failed' ? 'Ошибка' : 'Черновик'}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Для: {m.recipient_email}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{m.content_text}</p>
              <div className="text-sm text-gray-500">
                <p><span className="font-medium text-gray-700">Режим:</span> {m.mode === 'dms' ? 'Немедленно' : 'Запланировано'}</p>
                <p><span className="font-medium text-gray-700">Дата доставки:</span> {formatRU(m.delivery_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
