import type { NextApiRequest, NextApiResponse } from 'next';
export const config = { api: { bodyParser: false } };

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase    = createClient(supabaseUrl, serviceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();
  const path = (req.query.path as string) || '';
  const type = (req.query.type as string) || 'application/octet-stream';
  if (!path) return res.status(400).json({ error: 'missing path' });

  const buf: Buffer = await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end',  () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

  const blob = new Blob([buf], { type });
  const { error } = await supabase.storage.from('uploads').upload(path, blob, {
    upsert: false,
    contentType: type,
  });
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, path });
}
