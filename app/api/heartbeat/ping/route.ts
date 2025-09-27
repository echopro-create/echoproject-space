import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

export async function POST() {
  const supabase = createSupabaseAdmin();
  const timestamp = new Date().toISOString();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ heartbeat_last_at: timestamp })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, profile: data, timestamp });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed to update heartbeat" }, { status: 500 });
  }
}