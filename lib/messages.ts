import { supabase } from './supabaseClient';

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}
export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}
export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}
export async function signOut() { await supabase.auth.signOut(); }

export type DBMessage = {
  id: string;
  user_id: string;
  content_text: string;
  recipient_email: string;
  mode: 'dms'|'date';
  delivery_at: string|null;
  status: 'draft'|'sealed'|'delivered';
  sealed_at: string|null;
  created_at: string;
  updated_at: string;
};

export async function listMessages(): Promise<DBMessage[]> {
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) throw error; return data as DBMessage[];
}
export async function createMessage(input: {
  content_text: string; recipient_email: string; mode: 'dms'|'date'; delivery_at?: string|null;
}): Promise<DBMessage> {
  const { data: u } = await supabase.auth.getUser();
  if (!u?.user) throw new Error('Нет авторизации');
  const { data, error } = await supabase.from('messages')
    .insert({ user_id: u.user.id, ...input, delivery_at: input.mode === 'date' ? (input.delivery_at ?? null) : null, status: 'draft' })
    .select().single();
  if (error) throw error; return data as DBMessage;
}
export async function updateMessage(id: string, patch: Partial<DBMessage>): Promise<DBMessage> {
  const { data, error } = await supabase.from('messages').update(patch).eq('id', id).select().single();
  if (error) throw error; return data as DBMessage;
}
export async function sealMessage(id: string): Promise<DBMessage> {
  const { data, error } = await supabase.from('messages').update({ status: 'sealed', sealed_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error; return data as DBMessage;
}
export async function deleteMessage(id: string) {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
}
