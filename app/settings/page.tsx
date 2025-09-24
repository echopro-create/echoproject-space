"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [emails, setEmails] = useState(true);
  const [promos, setPromos] = useState(false);

  return (
    <section className="container" aria-labelledby="settings-title">
      <div className="page-header">
        <h1 id="settings-title" className="page-title">РќР°СЃС‚СЂРѕР№РєРё</h1>
      </div>

      <div className="stack-12" role="group" aria-labelledby="settings-title">
        <div className="card">
          <h3 className="card-title">РЈРІРµРґРѕРјР»РµРЅРёСЏ</h3>
          <p className="card-meta">РЈРїСЂР°РІР»СЏР№С‚Рµ СЃРїРѕСЃРѕР±Р°РјРё СЃРІСЏР·Рё</p>
          <div className="field" style={{ marginTop: 12 }}>
            <label>
              <input type="checkbox" checked={emails} onChange={e => setEmails(e.target.checked)} />
              &nbsp; Email-СѓРІРµРґРѕРјР»РµРЅРёСЏ
            </label>
            <label>
              <input type="checkbox" checked={promos} onChange={e => setPromos(e.target.checked)} />
              &nbsp; РРЅС„РѕСЂРјР°С†РёРѕРЅРЅС‹Рµ РїРёСЃСЊРјР° Рѕ РїСЂРѕРґСѓРєС‚Р°С…
            </label>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">РљРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ</h3>
          <p className="card-meta">Р’РёРґРёРјРѕСЃС‚СЊ Рё С…СЂР°РЅРµРЅРёРµ РґР°РЅРЅС‹С…</p>
          <div className="field" style={{ marginTop: 12 }}>
            <label>
              <input type="checkbox" defaultChecked />
              &nbsp; РЁРёС„СЂРѕРІР°С‚СЊ С‡РµСЂРЅРѕРІРёРєРё РЅР° СѓСЃС‚СЂРѕР№СЃС‚РІРµ (Р·Р°РіР»СѓС€РєР°)
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
