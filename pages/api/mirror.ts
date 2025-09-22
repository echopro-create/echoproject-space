import type { NextApiRequest, NextApiResponse } from "next";

type Body = { path: string };

const REQ_ENVS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "FTP_HOST",
  "FTP_USER",
  "FTP_PASSWORD",
  "FTP_BASE_DIR",
] as const;

function cleanEnv(name: string, def = ""): string {
  const raw = (process.env[name] ?? def).toString();
  const parts = raw.replace(/\r/g, "").split("\n").map(s => s.trim()).filter(Boolean);
  const v = (parts.length ? parts[parts.length - 1] : "").trim();
  return v.replace(/^(plain|encrypted)$/i, "").trim() || def;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  for (const k of REQ_ENVS) {
    if (!process.env[k]) return res.status(500).json({ error: `Missing env ${k}` });
  }

  const body: Body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body as any);
  const rawPath = (body?.path ?? "").toString();
  if (!rawPath) return res.status(400).json({ error: "path required" });

  try {
    // --- 1) Supabase download (bucket 'uploads') ---
    const base = cleanEnv("NEXT_PUBLIC_SUPABASE_URL");
    const key  = cleanEnv("SUPABASE_SERVICE_ROLE_KEY");

    const p0 = rawPath.replace(/^\/+/, "");
    const candidates = [p0];
    if (p0.startsWith("uploads/")) candidates.push(p0.replace(/^uploads\//, ""));

    let buf: Buffer | null = null;
    let lastErr: any = null;

    for (const cand of candidates) {
      const objectKey = ["uploads", ...cand.split("/").map(encodeURIComponent)].join("/");
      const url = `${base}/storage/v1/object/${objectKey}`;
      const rsp = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (rsp.ok) {
        buf = Buffer.from(await rsp.arrayBuffer());
        break;
      } else {
        lastErr = { status: rsp.status, body: await rsp.text().catch(() => "") };
      }
    }

    if (!buf) {
      return res.status(502).json({ error: "supabase download failed", lastErr });
    }

    // --- 2) FTP upload ---
    const ftpMod: any = await import("basic-ftp");
    const Client: any = ftpMod?.Client ?? ftpMod?.default?.Client ?? ftpMod?.default;
    if (!Client) return res.status(500).json({ error: "basic-ftp not loaded (no Client export)" });

    const FTP_HOST = cleanEnv("FTP_HOST");
    const FTP_USER = cleanEnv("FTP_USER");
    const FTP_PASSWORD = cleanEnv("FTP_PASSWORD");
    const FTP_BASE_DIR = cleanEnv("FTP_BASE_DIR", "/").replace(/\/$/, "");
    const FTP_SECURE = /^true$/i.test(cleanEnv("FTP_SECURE"));

    const client = new Client(15000);
    client.ftp.verbose = false;

    try {
      await client.access({ host: FTP_HOST, user: FTP_USER, password: FTP_PASSWORD, secure: FTP_SECURE });
      await client.ensureDir(`${FTP_BASE_DIR}/uploads`);

      const baseName = p0.split("/").pop()!;
      const remotePath = `${FTP_BASE_DIR}/uploads/${baseName}`;

      const { Readable } = await import("stream");
      await client.uploadFrom(Readable.from(buf), remotePath);

      return res.status(200).json({ ok: true, remotePath });
    } finally {
      client.close();
    }
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? String(e) });
  }
}
