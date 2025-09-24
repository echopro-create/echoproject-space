"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [emails, setEmails] = useState(true);
  const [promos, setPromos] = useState(false);

  return (
    <section className="container" aria-labelledby="settings-title">
      <div className="page-header">
        <h1 id="settings-title" className="page-title">Настройки</h1>
      </div>

      <div className="stack-12" role="group" aria-labelledby="settings-title">
        <div className="card">
          <h3 className="card-title">Уведомления</h3>
          <p className="card-meta">Управляйте способами связи</p>
          <div className="field" style={{ marginTop: 12 }}>
            <label>
              <input type="checkbox" checked={emails} onChange={e => setEmails(e.target.checked)} />
              &nbsp; Email-уведомления
            </label>
            <label>
              <input type="checkbox" checked={promos} onChange={e => setPromos(e.target.checked)} />
              &nbsp; Информационные письма о продуктах
            </label>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Конфиденциальность</h3>
          <p className="card-meta">Видимость и хранение данных</p>
          <div className="field" style={{ marginTop: 12 }}>
            <label>
              <input type="checkbox" defaultChecked />
              &nbsp; Шифровать черновики на устройстве (заглушка)
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}