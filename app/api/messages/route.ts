﻿import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase.server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return NextResponse.json({ error: "ользователь не авторизован" }, { status: 401 });
  return NextResponse.json({ ok: true, user: user.id });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // const body = await req.json(); // при необходимости
  return NextResponse.json({ ok: true, user: session.user.id });
}

