import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("profiles").select("*").single();
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, profile: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      display_name: body.display_name ?? null,
      heartbeat_freq: body.heartbeat_freq ?? "weekly",
      heartbeat_grace_days: body.heartbeat_grace_days ?? 14
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, profile: data });
}