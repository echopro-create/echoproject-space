// app/page.tsx
import { Button } from './components/UI/Button';
import Link from 'next/link';
import { getSessionAndUser } from '@/lib/auth';

export const dynamic = 'force-static'; // SSG/ISR

export default async function HomePage() {
  const { user } = await getSessionAndUser();
  const ctaLink = user ? '/messages/new' : '/login';

  return (
    <div className="container mx-auto px-container-x lg:px-container-lg-x py-16 lg:py-24">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-5xl font-extrabold mb-6 tracking-tight text-primary-text">
          Ваш голос в будущее
        </h1>
        <p className="text-xl lg:text-2xl text-secondary-text mb-10 leading-base">
          ECHO — сервис, который гарантирует доставку ваших посланий близким в тот момент, 
          когда вы уже не сможете сказать им это лично. Создайте капсулу времени, которая откроется 
          по расписанию или... **после вас**.
        </p>
        
        <Link href={ctaLink} passHref legacyBehavior>
          <Button size="lg" className="shadow-xl">
            Оставить послание
          </Button>
        </Link>
        
        <p className="text-sm text-secondary-text mt-4">
          {user 
            ? 'Продолжить создание' 
            : 'Вход по email-коду. Быстро и безопасно.'
          }
        </p>
      </section>

      <hr className="my-16 border-border-light" />

      {/* --- Манифест --- */}
      <section className="grid md:grid-cols-3 gap-8 text-left">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-text">Режим DMS</h2>
          <p className="text-secondary-text">
            Dead-Man Switch. Пока вы регулярно подтверждаете свой «пульс», 
            ваше послание остаётся в тайне. Если подтверждение прекращается 
            на заданный грейс-период, система автоматически активирует доставку.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-text">Аудио и Видео</h2>
          <p className="text-secondary-text">
            Не только текст. Запишите видео-обращение или голосовое послание 
            прямо в браузере. Мы позаботимся о надежном хранении и своевременной доставке.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-text">Максимальная приватность</h2>
          <p className="text-secondary-text">
            Все данные шифруются. Доставка происходит только после подтверждения 
            смерти (через грейс-период) или по указанной вами дате. Мы гарантируем, 
            что прочтете его только вы и ваши адресаты.
          </p>
        </div>
      </section>
      
      <div className="mt-16 text-center">
        <Link href="/how" className="text-accent hover:underline font-medium">
          Узнать, как это работает →
        </Link>
      </div>
    </div>
  );
}