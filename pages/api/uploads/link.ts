import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: тут можно писать запись о сообщении в БД; пока-заглушка:
  res.status(200).json({ ok: true });
}
