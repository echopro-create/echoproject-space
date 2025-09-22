'use client';
import React, { useEffect, useState } from 'react';
import AuthPanel from '@/components/AuthPanel';
import { supabase } from '@/lib/supabaseClient';
import { getSession, listMessages, createMessage, updateMessage, deleteMessage, sealMessage, type DBMessage } from '@/lib/messages';

type UIMessage = {
  id: string|null;
  content: string;
  recipientEmail: string;
  mode: 'dms'|'date';
  delivery_at?: string;
  status: 'draft'|'sealed'|'delivered';
  sealed_at?: string;
};

export default function MessagesPage() {
  const canUseDOM = typeof window !== 'undefined';
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (!canUseDOM) return false;
    const saved = localStorage.getItem('echo_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(()=>{ if (canUseDOM) document.documentElement.classList.toggle('dark', isDarkMode); },[isDarkMode]);
  useEffect(()=>{ if (canUseDOM) localStorage.setItem('echo_theme', isDarkMode?'dark':'light'); },[isDarkMode]);
  useEffect(()=>{ if (!canUseDOM) return; const mq=window.matchMedia('(prefers-color-scheme: dark)'); const h=(e:MediaQueryListEvent)=>setIsDarkMode(e.matches); mq.addEventListener?.('change',h); return ()=>mq.removeEventListener?.('change',h);},[]);

  useEffect(() => {
    getSession().then(setSession);
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setMessages([]); setLoading(false); return; }
    (async () => {
      setLoading(true);
      try { setMessages(await listMessages()); }
      catch(e:any){ alert(e.message||'Ошибка загрузки'); }
      finally { setLoading(false); }
    })();
  }, [session]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState<UIMessage|null>(null);

  const openNew = () => { setCurrent({ id:null, content:'', recipientEmail:'', mode:'dms', delivery_at:'', status:'draft' }); setIsModalOpen(true); };
  const openEdit = (m: DBMessage) => {
    setCurrent({ id: m.id, content: m.content_text, recipientEmail: m.recipient_email, mode: m.mode, delivery_at: m.delivery_at??undefined, status: m.status, sealed_at: m.sealed_at??undefined });
    setIsModalOpen(true);
  };
  const save = async (e:React.FormEvent) => {
    e.preventDefault();
    const email = current?.recipientEmail?.trim();
    if (!current?.content?.trim() || !email) return alert('Заполните текст и email');
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Email неверный');

    try {
      if (current?.id) {
        const row = await updateMessage(current.id, {
          content_text: current.content,
          recipient_email: email,
          mode: current.mode,
          delivery_at: current.mode==='date' ? (current.delivery_at||null) : null
        } as any);
        setMessages(arr => arr.map(x => x.id===row.id ? row : x));
      } else {
        const row = await createMessage({
          content_text: current!.content,
          recipient_email: email,
          mode: current!.mode,
          delivery_at: current!.mode==='date' ? (current!.delivery_at||null) : null
        });
        setMessages(arr => [row, ...arr]);
      }
      setIsModalOpen(false);
    } catch(e:any){ alert(e.message||'Ошибка сохранения'); }
  };
  const seal = async (m: DBMessage) => {
    if (m.mode==='date' && !m.delivery_at) return alert('Укажи дату для режима \"по дате\"');
    try { const row = await sealMessage(m.id); setMessages(arr => arr.map(x => x.id===row.id?row:x)); }
    catch(e:any){ alert(e.message||'Не удалось запечатать'); }
  };
  const remove = async (id: string) => {
    if (!confirm('Удалить послание?')) return;
    try { await deleteMessage(id); setMessages(arr => arr.filter(x => x.id!==id)); }
    catch(e:any){ alert(e.message||'Не удалось удалить'); }
  };

  const statusLabel = (s: DBMessage['status']) => s==='draft'?'Черновик':s==='sealed'?'Запечатано':s==='delivered'?'Доставлено':'—';

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-50 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-50 dark:from-neutral-800 dark:to-neutral-500 bg-clip-text text-transparent cursor-default">Echo</div>
        <div className="flex gap-2">
          {session && (
            <button onClick={()=>supabase.auth.signOut()} className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">Выйти</button>
          )}
          <button onClick={()=>setIsDarkMode(v=>!v)} className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
            {isDarkMode ? 'Светлая' : 'Тёмная'}
          </button>
        </div>
      </header>

      {!session ? (
        <AuthPanel />
      ) : (
        <main className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">Мои послания</h1>
            <button onClick={openNew} className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
              + Создать
            </button>
          </div>

          {loading ? (
            <div className="text-center p-8 text-neutral-500">Загрузка…</div>
          ) : messages.length===0 ? (
            <div className="text-center p-8 text-neutral-500"><p>У вас пока нет посланий. Начните с первого.</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((m, i) => (
                <div key={m.id} className="animate-fadeIn p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 shadow-sm flex flex-col" style={{ animationDelay: ${i*0.06}s }}>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold truncate">Послание для {m.recipient_email}</h3>
                    <p className="text-neutral-500 text-sm mt-2 line-clamp-3">{m.content_text}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{statusLabel(m.status)}</span>
                      <span className="text-neutral-500">{m.mode==='dms' ? 'Dead-man switch' : (m.delivery_at ? Дата:  : 'Дата: —')}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {m.status==='draft' && (
                        <>
                          <button onClick={()=>openEdit(m)} className="flex-1 px-4 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800">Изменить</button>
                          <button onClick={()=>seal(m)} className="flex-1 px-4 py-2 text-sm rounded-lg border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:opacity-80">Запечатать</button>
                        </>
                      )}
                      <button onClick={()=>remove(m.id)} className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800">Удалить</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Модалка создания/редактирования */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl w-full max-w-xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-center">{current?.id ? 'Редактировать послание' : 'Создать послание'}</h2>
            <form onSubmit={save}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Текст послания</label>
                <textarea name="content" value={current?.content||''} onChange={(e)=>setCurrent(v=>({ ...(v as any), content:e.target.value }))} required className="w-full h-32 p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 resize-y focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email получателя</label>
                <input type="email" name="recipientEmail" value={current?.recipientEmail||''} onChange={(e)=>setCurrent(v=>({ ...(v as any), recipientEmail:e.target.value }))} required className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700" />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm"><input type="radio" name="mode" checked={current?.mode==='dms'} onChange={()=>setCurrent(v=>({ ...(v as any), mode:'dms' }))} className="mr-2" />Отправка по Dead-man switch</label>
                <label className="flex items-center text-sm mt-2"><input type="radio" name="mode" checked={current?.mode==='date'} onChange={()=>setCurrent(v=>({ ...(v as any), mode:'date' }))} className="mr-2" />Отправка по дате</label>
              </div>
              {current?.mode==='date' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Дата отправки</label>
                  <input type="date" name="delivery_at" value={current?.delivery_at ? current.delivery_at.substring(0,10) : ''} onChange={(e)=>setCurrent(v=>({ ...(v as any), delivery_at:e.target.value }))} required className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700" />
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button type="button" onClick={()=>setIsModalOpen(false)} className="px-6 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700">Отмена</button>
                <button type="submit" className="px-6 py-2 text-sm font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-80">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
