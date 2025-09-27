"use client";

import { useState } from "react";

export default function AddRecipientPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/recipients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, note })
    });
    if (res.ok) alert(" Получатель добавлен!");
    else alert(" Не удалось добавить получателя.");
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Добавить получателя</h1>

      <form onSubmit={save} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email получателя"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-lg px-4 py-3"
        />
        <input
          type="text"
          placeholder="Имя получателя (необязательно)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded-lg px-4 py-3"
        />
        <textarea
          placeholder="Заметка (например: друг, сын, коллега...)"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="border rounded-lg px-4 py-3 min-h-[100px]"
        />
        <button type="submit" className="btn w-full mt-4">Сохранить</button>
      </form>
    </div>
  );
}