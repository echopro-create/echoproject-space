export default function MessagesPage() {
  return (
    <div className="messages-list-container">
      <h1 className="form-title">Р’Р°С€Рё РїРѕСЃР»Р°РЅРёСЏ</h1>
      <p className="form-description">Р¦РёС„СЂРѕРІРѕР№ Р°СЂС…РёРІ СЃР»РѕРІ, РѕР¶РёРґР°СЋС‰РёС… СЃРІРѕРµРіРѕ С‡Р°СЃР°.</p>

      <div className="message-card">
        <div className="card-details">
          <span className="card-recipient">РђРґСЂРµСЃР°С‚: РњРѕСЏ Р”РѕС‡СЊ</span>
          <span className="card-status">РЎС‚Р°С‚СѓСЃ: РћР¶РёРґР°РµС‚</span>
        </div>
        <div className="card-info">
          <p className="card-excerpt">"Р’ С‚РѕС‚ РґРµРЅСЊ, РєРѕРіРґР° С‚С‹ РїСЂРѕС‡С‚РµС€СЊ СЌС‚Рѕ, Р·РЅР°Р№, С‡С‚Рѕ СЏ РІСЃРµРіРґР°..."</p>
        </div>
        <div className="card-actions">
          <button className="action-btn primary">Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ</button>
          <button className="action-btn secondary">РЈРґР°Р»РёС‚СЊ</button>
        </div>
      </div>

      <div className="message-card delivered">
        <div className="card-details">
          <span className="card-recipient">РђРґСЂРµСЃР°С‚: РњРѕР№ Р‘СЂР°С‚</span>
          <span className="card-status">РЎС‚Р°С‚СѓСЃ: Р”РѕСЃС‚Р°РІР»РµРЅРѕ (2045-01-01)</span>
        </div>
        <div className="card-info">
          <p className="card-excerpt">"РџРѕРјРЅРё Рѕ РЅР°С€РµРј РїСѓС‚РµС€РµСЃС‚РІРёРё Рє РѕР·РµСЂСѓ. Р­С‚Рѕ Р±С‹Р» Р»СѓС‡С€РёР№..."</p>
        </div>
        <div className="card-actions">
          <button className="action-btn secondary">РџСЂРѕСЃРјРѕС‚СЂРµС‚СЊ</button>
        </div>
      </div>
    </div>
  );
}

