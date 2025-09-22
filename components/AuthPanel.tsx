'use client';
import React, { useState } from 'react';
import { signIn, signUp } from '@/lib/messages';

export default function AuthPanel() {
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Неверный email');
    try { mode==='signin' ? await signIn(email,password) : await signUp(email,password); }
    catch(e:any){ alert(e.message||'Ошибка'); }
  }
  return (
    <form onSubmit={submit} className="max-w-sm w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-3">{mode==='signin'?'Вход':'Регистрация'}</h3>
      <label className="block text-sm">Email</label>
      <input className="w-full p-2 mb-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
             type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <label className="block text-sm">Пароль</label>
      <input className="w-full p-2 mb-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
             type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
      <button className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold">Продолжить</button>
      <div className="text-sm text-neutral-500 mt-2">
        {mode==='signin' ? <>Нет аккаунта? <a href="#" onClick={e=>{e.preventDefault();setMode('signup')}}>Зарегистрируйтесь</a></>
                         : <>Уже есть аккаунт? <a href="#" onClick={e=>{e.preventDefault();setMode('signin')}}>Войдите</a></>}
      </div>
    </form>
  );
}
