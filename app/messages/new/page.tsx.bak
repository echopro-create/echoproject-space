"use client";
import Link from "next/link";
import { useState } from "react";

export default function NewMessagePage() {
  const [title, setTitle] = useState("");
  const [text, setText]   = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Здесь позже добавим логику сохранения.
    alert("Черновик создан (заглушка).");
  }

  return (
    <section className="container" aria-labelledby="newmsg-title">
      <div className="page-header">
        <h1 id="newmsg-title" className="page-title">Создать послание</h1>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Заголовок</label>
          <input id="title" type="text" placeholder="Например, Письмо семье"
                 value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="text">Текст послания</label>
          <textarea id="text" placeholder="Напишите главное" value={text} onChange={e => setText(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="when">Когда отправить</label>
          <select id="when" defaultValue="date">
            <option value="date">Точная дата</option>
            <option value="event">По событию</option>
            <option value="after">После ухода</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button--primary">Сохранить черновик</button>
          <Link href="/messages" className="button button--ghost">Отмена</Link>
        </div>
      </form>
    </section>
  );
}