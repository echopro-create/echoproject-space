import Link from "next/link";

export default function MessagesPage() {
  return (
    <section className="container" aria-labelledby="messages-title">
      <div className="page-header">
        <h1 id="messages-title" className="page-title">Послания</h1>
        <Link href="/messages/new" className="button button--primary">Создать послание</Link>
      </div>

      <div className="list" role="list">
        {/* Заглушки карточек  позже заменим на реальные данные */}
        <article className="card" role="listitem">
          <h3 className="card-title">Письмо сыну</h3>
          <p className="card-meta">Отправка: 15.11.2025  Получатели: 1</p>
        </article>
        <article className="card" role="listitem">
          <h3 className="card-title">Важные инструкции</h3>
          <p className="card-meta">По событию: подтверждение нотариуса  Получатели: 2</p>
        </article>
      </div>

      {/* Пустое состояние на будущее:
      <div className="empty">
        <h3>Пока нет посланий</h3>
        <p>Создайте первое, чтобы важные слова не потерялись.</p>
        <p><Link href="/messages/new" className="button button--primary">Создать послание</Link></p>
      </div>
      */}
    </section>
  );
}