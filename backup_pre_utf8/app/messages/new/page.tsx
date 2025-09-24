'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  recipient_email: z.string().email('РќРµРІРµСЂРЅС‹Р№ email'),
  content_text: z.string().min(1, 'Р’РІРµРґРёС‚Рµ С‚РµРєСЃС‚ РїРѕСЃР»Р°РЅРёСЏ').max(5000, 'РЎР»РёС€РєРѕРј РґР»РёРЅРЅРѕРµ РїРѕСЃР»Р°РЅРёРµ'),
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
      if (!res.ok) throw new Error(data.error || 'РћС€РёР±РєР° СЃРµСЂРІРµСЂР°');

      setMessage({ text: 'РџРѕСЃР»Р°РЅРёРµ СѓСЃРїРµС€РЅРѕ СЃРѕС…СЂР°РЅРµРЅРѕ!', type: 'success' });
      setFormData({ recipient_email: '', content_text: '', mode: 'dms', delivery_at: '', _hp: '', passphrase: '' });
    } catch (err: any) {
      setMessage({ text: err.message || 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col">
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">РќРѕРІРѕРµ РїРѕСЃР»Р°РЅРёРµ</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">РќР°РїРёС€РёС‚Рµ РІР°Р¶РЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ, РєРѕС‚РѕСЂРѕРµ Р±СѓРґРµС‚ РѕС‚РїСЂР°РІР»РµРЅРѕ РІ РЅСѓР¶РЅС‹Р№ РјРѕРјРµРЅС‚.</p>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <input type="text" name="_hp" value={formData._hp} onChange={handleChange} className="hidden" aria-hidden="true" tabIndex={-1} />
          
          <div>
            <label htmlFor="recipient_email" className="block text-sm font-medium text-gray-700">Email РїРѕР»СѓС‡Р°С‚РµР»СЏ</label>
            <input id="recipient_email" name="recipient_email" type="email" required value={formData.recipient_email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
          </div>

          <div>
            <label htmlFor="content_text" className="block text-sm font-medium text-gray-700">РўРµРєСЃС‚ РїРѕСЃР»Р°РЅРёСЏ</label>
            <textarea id="content_text" name="content_text" rows={5} required value={formData.content_text}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"></textarea>
          </div>

          <div>
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Р РµР¶РёРј РѕС‚РїСЂР°РІРєРё</label>
            <select id="mode" name="mode" value={formData.mode} onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm">
              <option value="dms">РќРµРјРµРґР»РµРЅРЅРѕ (РєР°Рє С‚РѕР»СЊРєРѕ РІРѕР·РјРѕР¶РЅРѕ)</option>
              <option value="scheduled">Р—Р°РїР»Р°РЅРёСЂРѕРІР°РЅРѕ</option>
            </select>
          </div>

          {formData.mode === 'scheduled' && (
            <div>
              <label htmlFor="delivery_at" className="block text-sm font-medium text-gray-700">Р”Р°С‚Р° Рё РІСЂРµРјСЏ РґРѕСЃС‚Р°РІРєРё</label>
              <input id="delivery_at" name="delivery_at" type="datetime-local" required value={formData.delivery_at}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
              <p className="mt-1 text-xs text-gray-500">Р‘СѓРґРµС‚ СЃРѕС…СЂР°РЅРµРЅРѕ РІ UTC, Р»РѕРєР°Р»СЊ: Europe/Oslo</p>
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-base font-medium text-white transition-colors duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'}`}>
            {isLoading ? 'РЎРѕС…СЂР°РЅРµРЅРёРµ...' : 'РћС‚РїСЂР°РІРёС‚СЊ РїРѕСЃР»Р°РЅРёРµ'}
          </button>
        </form>
      </section>
    </div>
  );
}



