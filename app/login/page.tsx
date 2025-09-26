"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase.client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const [error, setError] = useState("");
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/messages/new";

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setStage("code");
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    if (error) setError(error.message);
    else if (data.session) router.push(next);
  }

  return (
    <div className="form-container">
      <header className="form-header">
        <h1 className="form-title">Вход в ECHO</h1>
        <p className="form-description">Напишите послание и сохраните его в цифровом архиве.</p>
      </header>

      {stage === "email" && (
        <form className="message-form" onSubmit={sendCode}>
          <div className="form-group full-width">
            <label>Ваш email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="cta-button">Получить код</button>
          </div>
        </form>
      )}

      {stage === "code" && (
        <form className="message-form" onSubmit={verifyCode}>
          <div className="form-group full-width">
            <label>Код из письма</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Например, 123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="cta-button">Войти</button>
          </div>
        </form>
      )}

      {error && <p className="form-description" style={{color: 'crimson'}}>{error}</p>}
    </div>
  );
}

