'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  recipient_email: z.string().email('Р СњР ВµР Р†Р ВµРЎР‚Р Р…РЎвЂ№Р в„– email'),
  content_text: z.string().min(1, 'Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ РЎвЂљР ВµР С”РЎРѓРЎвЂљ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘РЎРЏ').max(5000, 'Р РЋР В»Р С‘РЎв‚¬Р С”Р С•Р С Р Т‘Р В»Р С‘Р Р…Р Р…Р С•Р Вµ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘Р Вµ'),
  mode: z.enum(['dms','scheduled']).default('dms'),
  delivery_at: z.string().optional(),
  _hp: z.string().optional(), // honeypot
  passphrase: z.string().optional()
});

const toUTC = (local?: string) => {
  if (!local) return null;
  const d = new Date(local);
  // convert "local time" to UTC ISO without shifting meaning
  const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
  return iso;
};

export default function NewMessagePage() {
  const [formData, setFormData] = useState({
    recipient_email: '',
    content_text: '',
    mode: 'dms',
    delivery_at: '',
    _hp: '',
    passphrase: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const parsed = schema.parse(formData);
      if (parsed._hp) throw new Error('Spam detected');

      const payload: any = {
        recipient_email: parsed.recipient_email,
        content_text: parsed.content_text,
        mode: parsed.mode
      };
      if (parsed.mode === 'scheduled') payload.delivery_at = toUTC(parsed.delivery_at);

      // (Optional) you could encrypt content_text with passphrase here using WebCrypto

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Р С›РЎв‚¬Р С‘Р В±Р С”Р В° РЎРѓР ВµРЎР‚Р Р†Р ВµРЎР‚Р В°');

      setMessage({ text: 'Р СџР С•РЎРѓР В»Р В°Р Р…Р С‘Р Вµ РЎС“РЎРѓР С—Р ВµРЎв‚¬Р Р…Р С• РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С•!', type: 'success' });
      setFormData({ recipient_email: '', content_text: '', mode: 'dms', delivery_at: '', _hp: '', passphrase: '' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Р СџРЎР‚Р С•Р С‘Р В·Р С•РЎв‚¬Р В»Р В° Р С•РЎв‚¬Р С‘Р В±Р С”Р В°', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col">
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">Р СњР С•Р Р†Р С•Р Вµ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘Р Вµ</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">Р СњР В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р†Р В°Р В¶Р Р…Р С•Р Вµ РЎРѓР С•Р С•Р В±РЎвЂ°Р ВµР Р…Р С‘Р Вµ, Р С”Р С•РЎвЂљР С•РЎР‚Р С•Р Вµ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С• Р Р† Р Р…РЎС“Р В¶Р Р…РЎвЂ№Р в„– Р СР С•Р СР ВµР Р…РЎвЂљ.</p>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <input type="text" name="_hp" value={formData._hp} onChange={handleChange} className="hidden" aria-hidden="true" tabIndex={-1} />
          
          <div>
            <label htmlFor="recipient_email" className="block text-sm font-medium text-gray-700">Email Р С—Р С•Р В»РЎС“РЎвЂЎР В°РЎвЂљР ВµР В»РЎРЏ</label>
            <input id="recipient_email" name="recipient_email" type="email" required value={formData.recipient_email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
          </div>

          <div>
            <label htmlFor="content_text" className="block text-sm font-medium text-gray-700">Р СћР ВµР С”РЎРѓРЎвЂљ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘РЎРЏ</label>
            <textarea id="content_text" name="content_text" rows={5} required value={formData.content_text}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"></textarea>
          </div>

          <div>
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Р В Р ВµР В¶Р С‘Р С Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С”Р С‘</label>
            <select id="mode" name="mode" value={formData.mode} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm">
              <option value="dms">Р СњР ВµР СР ВµР Т‘Р В»Р ВµР Р…Р Р…Р С• (Р С”Р В°Р С” РЎвЂљР С•Р В»РЎРЉР С”Р С• Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•)</option>
              <option value="scheduled">Р вЂ”Р В°Р С—Р В»Р В°Р Р…Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С•</option>
            </select>
          </div>

          {formData.mode === 'scheduled' && (
            <div>
              <label htmlFor="delivery_at" className="block text-sm font-medium text-gray-700">Р вЂќР В°РЎвЂљР В° Р С‘ Р Р†РЎР‚Р ВµР СРЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР В°Р Р†Р С”Р С‘</label>
              <input id="delivery_at" name="delivery_at" type="datetime-local" required value={formData.delivery_at}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
              <p className="mt-1 text-xs text-gray-500">Р вЂРЎС“Р Т‘Р ВµРЎвЂљ РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С• Р Р† UTC, Р В»Р С•Р С”Р В°Р В»РЎРЉ: Europe/Oslo</p>
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-base font-medium text-white transition-colors duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'}`}>
            {isLoading ? 'Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘Р Вµ...' : 'Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘Р Вµ'}
          </button>
        </form>
      </section>
    </div>
  );
}




