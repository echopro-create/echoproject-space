"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginInner() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/messages/new";

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    setStage("code");
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, next })
    });
    if (res.redirected) window.location.href = res.url;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        {stage === "email" && (
          <form onSubmit={sendEmail} className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Вход в ECHO</h1>
            <input
              type="email"
              placeholder="Ваш email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />
            <button type="submit" className="btn">Получить код</button>
          </form>
        )}

        {stage === "code" && (
          <form onSubmit={verifyCode} className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Введите код</h1>
            <input
              type="text"
              placeholder="123456"
              required
              maxLength={6}
              value={code}
              onChange={e => setCode(e.target.value)}
              className="border rounded-lg px-4 py-3 tracking-widest text-center text-lg"
            />
            <button type="submit" className="btn">Войти</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Загрузка</div>}>
      <LoginInner />
    </Suspense>
  );
}