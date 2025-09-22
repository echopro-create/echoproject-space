"use client";

import React, { useRef, useState } from "react";

type UploadKind = "text" | "audio" | "video";

async function createUpload(kind: UploadKind, file: File) {
  const res = await fetch("/api/uploads/create", {
    method: "POST",
    headers: { "Content-Type": file.type || (kind === "text" ? "text/plain" : `${kind}/*`) },
  });
  if (!res.ok) throw new Error(`CREATE failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<{ file_url: string; path: string }>;
}

async function linkUpload(kind: UploadKind, file_url: string) {
  const res = await fetch("/api/uploads/link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, file_url }),
  });
  if (!res.ok) throw new Error(`LINK failed: ${res.status} ${res.statusText}`);
}

async function signPath(path: string) {
  const res = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, expiresIn: 3600 }),
  });
  if (!res.ok) throw new Error(`SIGN failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<{ url?: string; signedUrl?: string }>;
}

export default function CabinetPage() {
  const [kind, setKind] = useState<UploadKind>("audio"); // РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ audio
  const [status, setStatus] = useState("");
  const [signedUrl, setSignedUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onChoose(file: File) {
    try {
      setStatus("Р°РіСЂСѓР·РєР°...");
      const { file_url, path } = await createUpload(kind, file);

      const put = await fetch(file_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "application/octet-stream" },
      });
      if (!put.ok) throw new Error(`PUT failed: ${put.status} ${put.statusText}`);

      await linkUpload(kind, file_url);
    // MIRROR to FTP (fire-and-forget)
    fetch("/api/mirror", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch(() => {});

      const s = await signPath(path);
      const url = s.url ?? s.signedUrl ?? "";
      if (!url) throw new Error("SIGN: РїСѓСЃС‚РѕР№ url");
      setSignedUrl(url);
      setStatus("РѕС‚РѕРІРѕ вњ…");
    } catch (e: any) {
      console.error(e);
      setStatus("С€РёР±РєР°: " + (e?.message ?? e));
    }
  }

  // СЃР»Рё Р·Р°С…РѕС‡РµС€СЊ РІРєР»СЋС‡РёС‚СЊ Р·Р°РїРёСЃСЊ РјРµРґРёР° РёР· Р±СЂР°СѓР·РµСЂР° вЂ” РІР°Р¶РµРЅ РєРѕСЂСЂРµРєС‚РЅС‹Р№ С‚РµСЂРЅР°СЂРЅРёРє:
  // const constraints: MediaStreamConstraints =
  //   kind === "video" ? { audio: true, video: true } : { audio: true };

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto", fontFamily: "system-ui" }}>
      <h1>Cabinet</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setKind("text")}  disabled={kind === "text"}>text</button>
        <button onClick={() => setKind("audio")} disabled={kind === "audio"}>audio</button>
        <button onClick={() => setKind("video")} disabled={kind === "video"}>video</button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept={kind === "text" ? ".txt,text/plain" : kind === "audio" ? "audio/*" : "video/*"}
        onChange={(e) => {
          const f = e.currentTarget.files?.[0];
          if (f) void onChoose(f);
        }}
      />

      <p style={{ marginTop: 12 }}>{status}</p>

      {signedUrl && (
        <p style={{ marginTop: 8 }}>
          <a href={signedUrl} target="_blank" rel="noreferrer">С‚РєСЂС‹С‚СЊ Р·Р°РіСЂСѓР¶РµРЅРЅС‹Р№ С„Р°Р№Р»</a>
        </p>
      )}
    </main>
  );
}

