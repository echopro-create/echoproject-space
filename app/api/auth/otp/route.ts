import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({} as any));
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Требуется email" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "ECHO <no-reply@echoproject.space>";
  if (!resendKey) {
    return NextResponse.json({ ok: false, error: "Нет RESEND_API_KEY" }, { status: 500 });
  }

  const code = genCode();
  const supabase = createSupabaseAdmin();

  // Пишем код в таблицу (TTL 10 минут задан в БД)
  const { error: insErr } = await supabase
    .from("otp_codes")
    .insert({ email: email.toLowerCase().trim(), code });
  if (insErr) {
    return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });
  }

  // Отправляем письмо
  const resend = new Resend(resendKey);
  const subject = "Ваш код входа в ECHO";
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:16px;color:#222">
      <p>Ваш код входа:</p>
      <p style="font-size:28px;letter-spacing:6px;"><strong>${code}</strong></p>
      <p style="color:#666;font-size:14px">Код действует 10 минут. Если вы не запрашивали вход, просто игнорируйте это письмо.</p>
    </div>
  `;

  try {
    await resend.emails.send({ from, to: email, subject, html });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Не удалось отправить письмо" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}