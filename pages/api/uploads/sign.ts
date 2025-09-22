import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase    = createClient(supabaseUrl, serviceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { path, expiresIn = 3600 } = (req.body || {});
  if (!path) return res.status(400).json({ error: 'missing path' });
  const { data, error } = await supabase.storage.from('uploads').createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) return res.status(500).json({ error: error?.message || 'sign failed' });
  return res.status(200).json({ url: data.signedUrl });
}
