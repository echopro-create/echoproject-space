export type UploadKind = 'text' | 'audio' | 'video';

export async function createUpload(kind: UploadKind, file: File): Promise<{ file_url: string; path: string }> {
  const res = await fetch('/api/uploads/create', {
    method: 'POST',
    headers: { 'Content-Type': file.type || 'application/octet-stream' }
  });
  if (!res.ok) throw new Error('create failed');
  return res.json();
}

export async function linkUpload(kind: UploadKind, file_url: string): Promise<{ ok: true }> {
  const res = await fetch('/api/uploads/link', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, file_url })
  });
  if (!res.ok) throw new Error('link failed');
  return res.json();
}

export async function signPath(path: string, expiresIn = 3600): Promise<{ url: string }> {
  const res = await fetch('/api/uploads/sign', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, expiresIn })
  });
  if (!res.ok) throw new Error('sign failed');
  return res.json();
}
