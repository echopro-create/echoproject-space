/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title" className="hero-title">
            Послания после жизни, когда слова по-настоящему нужны
          </h1>
          <p className="hero-subtitle">
            ECHO сохранит ваши важные слова и передаст их тем, кто дорог, в нужный момент 
            по дате, событию или после ухода. Бережно и безопасно.
          </p>
          <div className="hero-actions">
            <Link href="/messages/new" className="button button--primary">
              Создать послание
            </Link>
            <Link href="#how-it-works" className="button button--secondary">
              Как это работает
            </Link>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section id="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <h2 className="section-title">Как это работает</h2>
          <div className="steps-list" style={{ marginTop: 24 }}>
            <div className="step-item">
              <img src="/icons/messages.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">Напишите слова</h3>
              <p className="step-description">
                Создайте послание: текст, фото, инструкции  всё, что нужно передать близким.
              </p>
            </div>

            <div className="step-item">
              <img src="/icons/recipients.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">Выберите получателей</h3>
              <p className="step-description">
                Укажите людей и способы доставки: email, мессенджеры или несколько каналов сразу.
              </p>
            </div>

            <div className="step-item">
              <img src="/icons/settings.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">Назначьте условия</h3>
              <p className="step-description">
                Точная дата, событие или после ухода. ECHO отправит послание вовремя.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Безопасность */}
      <section>
        <div className="container">
          <h2 className="section-title">Безопасность и приватность</h2>
          <div className="security-list" style={{ marginTop: 24 }}>
            <div className="security-item">
              <img src="/icons/settings.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">Шифрование</h3>
              <p className="step-description">
                Данные зашифрованы на хранении и при передаче. Доступ строго контролируется.
              </p>
            </div>

            <div className="security-item">
              <img src="/icons/messages.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">Приватность</h3>
              <p className="step-description">
                Мы не продаём данные и не используем их для рекламы. Только вы решаете, кто увидит послания.
              </p>
            </div>

            <div className="security-item">
              <img src="/icons/recipients.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">Надёжность</h3>
              <p className="step-description">
                Репликации и резервные копии. Система контроля условий, чтобы доставка не подвела.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Начните говорить главное сегодня.</h2>
          <div className="hero-actions" style={{ marginTop: 24 }}>
            <Link href="/messages/new" className="button button--primary">
              Создать послание
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


