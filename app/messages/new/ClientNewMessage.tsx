"use client";
import { useState } from "react";
export default function ClientNewMessage(){
  const [tab, setTab] = useState<"text"|"audio"|"video">("text");
  return (
    <section className="container py-12">
      <h1 className="text-2xl font-semibold mb-4">Новое послание</h1>
      <div className="flex gap-2 mb-4">
        {(["text","audio","video"] as const).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-2xl border ${tab===t?"bg-black text-white":"border-border"}`}>
            {t==="text"?"Текст":t==="audio"?"Аудио":"Видео"}
          </button>
        ))}
      </div>
      {tab==="text" && (
        <textarea className="w-full h-48 rounded-2xl border border-border p-3" placeholder="Напишите что-то важное..." />
      )}
      {tab==="audio" && (
        <div className="p-4 rounded-2xl border border-dashed border-border">Рекордер аудио будет здесь.</div>
      )}
      {tab==="video" && (
        <div className="p-4 rounded-2xl border border-dashed border-border">Рекордер видео будет здесь.</div>
      )}
      <div className="mt-6">
        <button className="px-5 py-3 rounded-2xl bg-black text-white">Сохранить</button>
      </div>
    </section>
  );
}
