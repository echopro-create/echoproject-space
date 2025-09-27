import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const { name, email, relation, note } = await req.json();

  if (!email) {
    return NextResponse.json({ ok: false, error: "Email обязателен" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("recipients")
      .insert({
        email,
        name: name ?? null,
        relation: relation ?? null,
        note: note ?? null
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, recipient: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed to create recipient" }, { status: 500 });
  }
}