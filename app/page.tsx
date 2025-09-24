/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title" className="hero-title">
            РџРѕСЃР»Р°РЅРёСЏ РїРѕСЃР»Рµ Р¶РёР·РЅРё, РєРѕРіРґР° СЃР»РѕРІР° РїРѕ-РЅР°СЃС‚РѕСЏС‰РµРјСѓ РЅСѓР¶РЅС‹
          </h1>
          <p className="hero-subtitle">
            ECHO СЃРѕС…СЂР°РЅРёС‚ РІР°С€Рё РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° Рё РїРµСЂРµРґР°СЃС‚ РёС… С‚РµРј, РєС‚Рѕ РґРѕСЂРѕРі, РІ РЅСѓР¶РЅС‹Р№ РјРѕРјРµРЅС‚ 
            РїРѕ РґР°С‚Рµ, СЃРѕР±С‹С‚РёСЋ РёР»Рё РїРѕСЃР»Рµ СѓС…РѕРґР°. Р‘РµСЂРµР¶РЅРѕ Рё Р±РµР·РѕРїР°СЃРЅРѕ.
          </p>
          <div className="hero-actions">
            <Link href="/messages/new" className="button button--primary">
              РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ
            </Link>
            <Link href="#how-it-works" className="button button--secondary">
              РљР°Рє СЌС‚Рѕ СЂР°Р±РѕС‚Р°РµС‚
            </Link>
          </div>
        </div>
      </section>

      {/* РљР°Рє СЌС‚Рѕ СЂР°Р±РѕС‚Р°РµС‚ */}
      <section id="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <h2 className="section-title">РљР°Рє СЌС‚Рѕ СЂР°Р±РѕС‚Р°РµС‚</h2>
          <div className="steps-list" style={{ marginTop: 24 }}>
            <div className="step-item">
              <img src="/icons/messages.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">РќР°РїРёС€РёС‚Рµ СЃР»РѕРІР°</h3>
              <p className="step-description">
                РЎРѕР·РґР°Р№С‚Рµ РїРѕСЃР»Р°РЅРёРµ: С‚РµРєСЃС‚, С„РѕС‚Рѕ, РёРЅСЃС‚СЂСѓРєС†РёРё  РІСЃС‘, С‡С‚Рѕ РЅСѓР¶РЅРѕ РїРµСЂРµРґР°С‚СЊ Р±Р»РёР·РєРёРј.
              </p>
            </div>

            <div className="step-item">
              <img src="/icons/recipients.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">Р’С‹Р±РµСЂРёС‚Рµ РїРѕР»СѓС‡Р°С‚РµР»РµР№</h3>
              <p className="step-description">
                РЈРєР°Р¶РёС‚Рµ Р»СЋРґРµР№ Рё СЃРїРѕСЃРѕР±С‹ РґРѕСЃС‚Р°РІРєРё: email, РјРµСЃСЃРµРЅРґР¶РµСЂС‹ РёР»Рё РЅРµСЃРєРѕР»СЊРєРѕ РєР°РЅР°Р»РѕРІ СЃСЂР°Р·Сѓ.
              </p>
            </div>

            <div className="step-item">
              <img src="/icons/settings.svg" alt="" aria-hidden="true" />
              <h3 className="step-title">РќР°Р·РЅР°С‡СЊС‚Рµ СѓСЃР»РѕРІРёСЏ</h3>
              <p className="step-description">
                РўРѕС‡РЅР°СЏ РґР°С‚Р°, СЃРѕР±С‹С‚РёРµ РёР»Рё РїРѕСЃР»Рµ СѓС…РѕРґР°. ECHO РѕС‚РїСЂР°РІРёС‚ РїРѕСЃР»Р°РЅРёРµ РІРѕРІСЂРµРјСЏ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ */}
      <section>
        <div className="container">
          <h2 className="section-title">Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ Рё РїСЂРёРІР°С‚РЅРѕСЃС‚СЊ</h2>
          <div className="security-list" style={{ marginTop: 24 }}>
            <div className="security-item">
              <img src="/icons/settings.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">РЁРёС„СЂРѕРІР°РЅРёРµ</h3>
              <p className="step-description">
                Р”Р°РЅРЅС‹Рµ Р·Р°С€РёС„СЂРѕРІР°РЅС‹ РЅР° С…СЂР°РЅРµРЅРёРё Рё РїСЂРё РїРµСЂРµРґР°С‡Рµ. Р”РѕСЃС‚СѓРї СЃС‚СЂРѕРіРѕ РєРѕРЅС‚СЂРѕР»РёСЂСѓРµС‚СЃСЏ.
              </p>
            </div>

            <div className="security-item">
              <img src="/icons/messages.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">РџСЂРёРІР°С‚РЅРѕСЃС‚СЊ</h3>
              <p className="step-description">
                РњС‹ РЅРµ РїСЂРѕРґР°С‘Рј РґР°РЅРЅС‹Рµ Рё РЅРµ РёСЃРїРѕР»СЊР·СѓРµРј РёС… РґР»СЏ СЂРµРєР»Р°РјС‹. РўРѕР»СЊРєРѕ РІС‹ СЂРµС€Р°РµС‚Рµ, РєС‚Рѕ СѓРІРёРґРёС‚ РїРѕСЃР»Р°РЅРёСЏ.
              </p>
            </div>

            <div className="security-item">
              <img src="/icons/recipients.svg" alt="" aria-hidden="true" />
              <h3 className="security-title">РќР°РґС‘Р¶РЅРѕСЃС‚СЊ</h3>
              <p className="step-description">
                Р РµРїР»РёРєР°С†РёРё Рё СЂРµР·РµСЂРІРЅС‹Рµ РєРѕРїРёРё. РЎРёСЃС‚РµРјР° РєРѕРЅС‚СЂРѕР»СЏ СѓСЃР»РѕРІРёР№, С‡С‚РѕР±С‹ РґРѕСЃС‚Р°РІРєР° РЅРµ РїРѕРґРІРµР»Р°.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">РќР°С‡РЅРёС‚Рµ РіРѕРІРѕСЂРёС‚СЊ РіР»Р°РІРЅРѕРµ СЃРµРіРѕРґРЅСЏ.</h2>
          <div className="hero-actions" style={{ marginTop: 24 }}>
            <Link href="/messages/new" className="button button--primary">
              РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

