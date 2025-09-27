"use client";

import { useEffect, useState } from "react";

type Profile = {
  display_name: string | null;
  heartbeat_freq: string;
  heartbeat_grace_days: number;
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then(r => r.json())
      .then(d => setProfile(d.profile));
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    setSaving(false);
    if (res.ok) alert(" Настройки сохранены!");
    else alert(" Ошибка при сохранении.");
  }

  if (!profile) return <p className="p-8 text-center">Загрузка...</p>;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Настройки</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Имя профиля"
          value={profile.display_name || ""}
          onChange={e => setProfile({ ...profile, display_name: e.target.value })}
          className="border rounded-lg px-4 py-3"
        />

        <select
          value={profile.heartbeat_freq}
          onChange={e => setProfile({ ...profile, heartbeat_freq: e.target.value })}
          className="border rounded-lg px-4 py-3"
        >
          <option value="daily">Ежедневно</option>
          <option value="weekly">Еженедельно</option>
          <option value="monthly">Ежемесячно</option>
        </select>

        <input
          type="number"
          min={7}
          placeholder="Период ожидания (дней)"
          value={profile.heartbeat_grace_days}
          onChange={e => setProfile({ ...profile, heartbeat_grace_days: parseInt(e.target.value) })}
          className="border rounded-lg px-4 py-3"
        />

        <button
          onClick={save}
          disabled={saving}
          className="btn w-full mt-4"
        >
          {saving ? "Сохраняем..." : "Сохранить"}
        </button>
      </div>
    </div>
  );
}