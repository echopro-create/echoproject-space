import Link from "next/link";

export default function MessagesPage() {
  return (
    <section className="container" aria-labelledby="messages-title">
      <div className="page-header">
        <h1 id="messages-title" className="page-title">РџРѕСЃР»Р°РЅРёСЏ</h1>
        <Link href="/messages/new" className="button button--primary">РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ</Link>
      </div>

      <div className="list" role="list">
        {/* Р—Р°РіР»СѓС€РєРё РєР°СЂС‚РѕС‡РµРє  РїРѕР·Р¶Рµ Р·Р°РјРµРЅРёРј РЅР° СЂРµР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ */}
        <article className="card" role="listitem">
          <h3 className="card-title">РџРёСЃСЊРјРѕ СЃС‹РЅСѓ</h3>
          <p className="card-meta">РћС‚РїСЂР°РІРєР°: 15.11.2025  РџРѕР»СѓС‡Р°С‚РµР»Рё: 1</p>
        </article>
        <article className="card" role="listitem">
          <h3 className="card-title">Р’Р°Р¶РЅС‹Рµ РёРЅСЃС‚СЂСѓРєС†РёРё</h3>
          <p className="card-meta">РџРѕ СЃРѕР±С‹С‚РёСЋ: РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РЅРѕС‚Р°СЂРёСѓСЃР°  РџРѕР»СѓС‡Р°С‚РµР»Рё: 2</p>
        </article>
      </div>

      {/* РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РЅР° Р±СѓРґСѓС‰РµРµ:
      <div className="empty">
        <h3>РџРѕРєР° РЅРµС‚ РїРѕСЃР»Р°РЅРёР№</h3>
        <p>РЎРѕР·РґР°Р№С‚Рµ РїРµСЂРІРѕРµ, С‡С‚РѕР±С‹ РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° РЅРµ РїРѕС‚РµСЂСЏР»РёСЃСЊ.</p>
        <p><Link href="/messages/new" className="button button--primary">РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ</Link></p>
      </div>
      */}
    </section>
  );
}
