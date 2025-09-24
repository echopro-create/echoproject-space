import Link from "next/link";

export default function RecipientsPage() {
  return (
    <section className="container" aria-labelledby="rec-title">
      <div className="page-header">
        <h1 id="rec-title" className="page-title">Получатели</h1>
        <Link href="#" className="button button--primary" aria-disabled>Добавить получателя</Link>
      </div>

      <div className="list" role="list">
        <article className="card" role="listitem">
          <h3 className="card-title">Алексей Петров</h3>
          <p className="card-meta">email: alex@example.com</p>
        </article>
        <article className="card" role="listitem">
          <h3 className="card-title">Мария</h3>
          <p className="card-meta">email: maria@example.com</p>
        </article>
      </div>

      {/* Пустое состояние на будущее:
      <div className="empty">
        <h3>Получателей пока нет</h3>
        <p>Добавьте хотя бы одного, чтобы отправить послание.</p>
      </div>
      */}
    </section>
  );
}