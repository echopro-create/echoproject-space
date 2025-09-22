import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const ct = (req.headers['content-type'] as string) || 'application/octet-stream';
  const name = `uploads/${Date.now()}_${Math.random().toString(36).slice(2)}.bin`;
  const file_url = `/api/uploads/put?path=${encodeURIComponent(name)}&type=${encodeURIComponent(ct)}`;
  res.status(200).json({ file_url, path: name });
}
