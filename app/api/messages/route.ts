import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase.server";

export const runtime = "nodejs";

async function ensureBucket() {
  const supabase = createSupabaseAdmin();
  const { data: list } = await supabase.storage.listBuckets();
  const has = (list || []).some(b => b.name === "messages");
  if (!has) {
    await supabase.storage.createBucket("messages", {
      public: false,
      fileSizeLimit: 1024 * 1024 * 512 // 512MB
    });
  }
}

async function uploadFile(file: File, prefix: string) {
  const supabase = createSupabaseAdmin();
  const arrayBuf = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuf);
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from("messages").upload(path, bytes, {
    contentType: file.type,
    upsert: false
  });
  if (error) throw error;
  return data?.path || path;
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Use multipart/form-data" }, { status: 400 });
  }

  const form = await req.formData();
  const type = String(form.get("type") || "text");
  const text = String(form.get("text") || "");

  const audio = form.get("audio") as File | null;
  const video = form.get("video") as File | null;
  const files = form.getAll("files") as File[];

  try {
    await ensureBucket();

    const uploads: { audio?: string; video?: string; files?: string[] } = {};
    if (audio) uploads.audio = await uploadFile(audio, "audio");
    if (video) uploads.video = await uploadFile(video, "video");
    if (files?.length) {
      uploads.files = [];
      for (const f of files) {
        uploads.files.push(await uploadFile(f, "files"));
      }
    }

    // Пишем в таблицу messages, если она существует (иначе просто вернём сводку)
    let dbInsert: unknown = null;
    try {
      const supabase = createSupabaseAdmin();
      const { data, error } = await supabase.from("messages").insert({
        type,
        text,
        audio_path: uploads.audio ?? null,
        video_path: uploads.video ?? null,
        file_paths: uploads.files ?? [],
        status: "draft"
      }).select().single();
      if (error) throw error;
      dbInsert = data;
    } catch {
      // Таблицы нет или RLS кусается  не падаем, просто продолжаем.
    }

    return NextResponse.json({
      ok: true,
      saved: Boolean(dbInsert),
      message: dbInsert ?? null,
      summary: {
        type,
        textLen: text.length,
        hasAudio: Boolean(audio),
        hasVideo: Boolean(video),
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
      },
      storage: uploads
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Upload failed" }, { status: 500 });
  }
}