"use client";

import { useEffect, useState } from "react";

export default function HeartbeatPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function ping() {
    try {
      const res = await fetch("/api/heartbeat/ping", { method: "POST" });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    ping();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-4">Пульс ECHO</h1>
      <p className="text-muted mb-6">
        Здесь можно проверить активность вашей учётной записи для Dead-Man Switch.
      </p>
      <div className="p-4 rounded-lg border text-center">
        {status === "idle" && <p>Проверяем статус</p>}
        {status === "ok" && <p className="text-green-600"> Пульс зафиксирован!</p>}
        {status === "error" && <p className="text-red-600"> Не удалось обновить пульс.</p>}
      </div>
    </div>
  );
}