// lib/types.ts

export type Profile = {
  id: string; // auth.users id
  created_at: string;
  updated_at: string;
  display_name: string | null;
  locale: 'ru' | 'en';
  heartbeat_freq: 'daily' | 'weekly' | 'monthly';
  heartbeat_last_at: string | null;
  heartbeat_grace_days: number;
};

export type Recipient = {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  relation: string | null;
  note: string | null;
  created_at: string;
};

export type MessageType = 'text' | 'audio' | 'video';
export type MessageStatus = 'draft' | 'scheduled' | 'queued' | 'sent' | 'failed';
export type DeliveryMode = 'date' | 'dms';

export type Message = {
  id: string;
  user_id: string;
  type: MessageType;
  title: string | null;
  body: string | null; // markdown for text
  storage_path: string | null; // path in storage for media
  status: MessageStatus;
  delivery_mode: DeliveryMode;
  deliver_at: string | null; // for 'date' mode
  grace_days: number | null; // for 'dms', overrides profile
  created_at: string;
  updated_at: string;
  // Дополнительные поля для фронтенда
  recipients?: Recipient[];
};

export type DeliveryAttempt = {
  id: number;
  message_id: string;
  recipient_email: string;
  status: 'queued' | 'sent' | 'bounced' | 'failed';
  detail: any | null; // jsonb
  created_at: string;
};

export type Heartbeat = {
  id: number;
  user_id: string;
  source: 'manual' | 'email_link' | 'schedule';
  created_at: string;
};

// Тип для API ответа с подписанным URL
export type SignedUrlResponse = {
  uploadUrl: string; // URL для PUT-запроса загрузки
  storagePath: string; // Путь, который нужно сохранить в БД (messages.storage_path)
  viewUrl: string; // URL для предпросмотра (временный)
};