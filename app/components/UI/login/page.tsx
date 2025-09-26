// app/login/page.tsx
'use client';

import { useState, FormEvent, useCallback } from 'react';
import { Button } from '@/app/components/UI/Button';
import { Input } from '@/app/components/UI/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect_to') || '/messages/new';

  const handleSendCode = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 429) {
        setError('Слишком много попыток. Пожалуйста, попробуйте через час.');
      } else if (res.ok) {
        setStep('code');
        setError('Код отправлен на вашу почту. Проверьте папку "Спам"!');
      } else {
        // Даже при ошибке, для безопасности, показываем, что код отправлен.
        setStep('code'); 
        setError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
      }
    } catch (e) {
      setError('Ошибка сети. Проверьте подключение.');
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const handleVerifyCode = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        // Успешный вход, редирект
        router.push(redirectTo);
      } else {
        const data = await res.json();
        setError(data.error || 'Неверный код. Попробуйте снова.');
      }
    } catch (e) {
      setError('Ошибка сети. Не удалось подтвердить код.');
    } finally {
      setIsLoading(false);
    }
  }, [email, code, router, redirectTo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-border-light shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary-text">
          {step === 'email' ? 'Вход по email' : 'Введите код'}
        </h1>

        <form onSubmit={step === 'email' ? handleSendCode : handleVerifyCode} className="space-y-4">
          {error && (
            <div className={twMerge(
                "p-3 rounded-lg text-sm",
                error.includes('Too many') ? "bg-red-100 text-red-700" : "bg-blue-100 text-accent"
            )}>
              {error}
            </div>
          )}

          {step === 'email' && (
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              required
              aria-label="Email для входа"
            />
          )}

          {step === 'code' && (
            <Input
              id="code"
              type="text"
              placeholder="6-значный код"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(null); }}
              pattern="\d{6}"
              maxLength={6}
              inputMode="numeric"
              required
              aria-label="Код подтверждения"
            />
          )}

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
            disabled={isLoading || (step === 'email' ? !email : !code)}
          >
            {step === 'email' ? 'Получить код' : 'Войти'}
          </Button>
          
          {step === 'code' && (
            <button 
              type="button" 
              className="w-full text-center text-sm text-secondary-text hover:text-primary-text mt-2"
              onClick={() => { setStep('email'); setCode(''); setError(null); }}
            >
              Изменить email
            </button>
          )}

        </form>
      </div>
    </div>
  );
}