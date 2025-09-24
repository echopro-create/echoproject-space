import Link from "next/link";

export default function RecipientsPage() {
  return (
    <section className="container" aria-labelledby="rec-title">
      <div className="page-header">
        <h1 id="rec-title" className="page-title">РџРѕР»СѓС‡Р°С‚РµР»Рё</h1>
        <Link href="#" className="button button--primary" aria-disabled>Р”РѕР±Р°РІРёС‚СЊ РїРѕР»СѓС‡Р°С‚РµР»СЏ</Link>
      </div>

      <div className="list" role="list">
        <article className="card" role="listitem">
          <h3 className="card-title">РђР»РµРєСЃРµР№ РџРµС‚СЂРѕРІ</h3>
          <p className="card-meta">email: alex@example.com</p>
        </article>
        <article className="card" role="listitem">
          <h3 className="card-title">РњР°СЂРёСЏ</h3>
          <p className="card-meta">email: maria@example.com</p>
        </article>
      </div>

      {/* РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РЅР° Р±СѓРґСѓС‰РµРµ:
      <div className="empty">
        <h3>РџРѕР»СѓС‡Р°С‚РµР»РµР№ РїРѕРєР° РЅРµС‚</h3>
        <p>Р”РѕР±Р°РІСЊС‚Рµ С…РѕС‚СЏ Р±С‹ РѕРґРЅРѕРіРѕ, С‡С‚РѕР±С‹ РѕС‚РїСЂР°РІРёС‚СЊ РїРѕСЃР»Р°РЅРёРµ.</p>
      </div>
      */}
    </section>
  );
}
