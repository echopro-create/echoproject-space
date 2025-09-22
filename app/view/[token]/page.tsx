'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewToken() {
  const params = useParams() as Record<string, string> | null;
  const token = params?.token ?? '';
  const [kind,setKind]=useState<'text'|'audio'|'video'>('text');
  const [content,setContent]=useState<string>('');
  const [url,setUrl]=useState<string>('');

  useEffect(()=>{
    if (!token) return;
    if (token.startsWith('a_')) setKind('audio');
    else if (token.startsWith('v_')) setKind('video');
    else setKind('text');
    setContent('Спасибо, что вы с нами. Это демо-сообщение.');
    // В реале тут: запрос данных по токену и установка url для аудио/видео
  },[token]);

  return (
    <div className="space-y-4">
      <Link className="link text-sm" href="/">← На главную</Link>
      <h1 className="text-xl font-semibold">Послание</h1>
      {kind==='text' && <div className="card whitespace-pre-wrap">{content}</div>}
      {kind==='audio' && <audio className="w-full" controls src={url} />}
      {kind==='video' && <video className="w-full rounded-xl" controls src={url} />}
      <a className="btn" href={url || '#'} download>Скачать копию</a>
    </div>
  );
}