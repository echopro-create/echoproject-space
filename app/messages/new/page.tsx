"use client";

import { useState } from "react";
import VideoRecorder from "@/app/components/Media/VideoRecorder";
import FileAttachments from "@/app/components/Media/FileAttachments";

type Tab = "text" | "audio" | "video" | "files";

export default function NewMessagePage() {
  const [tab, setTab] = useState<Tab>("text");
  const [text, setText] = useState("");

  async function save() {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: tab, text })
    });
    if (res.ok) alert(" Послание сохранено!");
    else alert(" Ошибка при сохранении.");
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Новое послание</h1>

      <div className="flex gap-3 mb-6">
        {(["text", "audio", "video", "files"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg border ${tab === t ? "bg-black text-white" : ""}`}
          >
            {t === "text" && "Текст"}
            {t === "audio" && "Аудио"}
            {t === "video" && "Видео"}
            {t === "files" && "Файлы"}
          </button>
        ))}
      </div>

      {tab === "text" && (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Введите текст послания..."
          className="w-full min-h-[200px] border rounded-lg p-4 mb-4"
        />
      )}

      {tab === "audio" && <p className="text-muted"> Аудиозапись будет доступна позже</p>}
      {tab === "video" && <VideoRecorder />}
      {tab === "files" && <FileAttachments />}

      <button onClick={save} className="btn w-full mt-8">Сохранить</button>
    </div>
  );
}