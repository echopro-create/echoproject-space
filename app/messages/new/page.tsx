"use client";
import Link from "next/link";
import { useState } from "react";

export default function NewMessagePage() {
  const [title, setTitle] = useState("");
  const [text, setText]   = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Р—РґРµСЃСЊ РїРѕР·Р¶Рµ РґРѕР±Р°РІРёРј Р»РѕРіРёРєСѓ СЃРѕС…СЂР°РЅРµРЅРёСЏ.
    alert("Р§РµСЂРЅРѕРІРёРє СЃРѕР·РґР°РЅ (Р·Р°РіР»СѓС€РєР°).");
  }

  return (
    <section className="container" aria-labelledby="newmsg-title">
      <div className="page-header">
        <h1 id="newmsg-title" className="page-title">РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ</h1>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Р—Р°РіРѕР»РѕРІРѕРє</label>
          <input id="title" type="text" placeholder="РќР°РїСЂРёРјРµСЂ, РџРёСЃСЊРјРѕ СЃРµРјСЊРµ"
                 value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="text">РўРµРєСЃС‚ РїРѕСЃР»Р°РЅРёСЏ</label>
          <textarea id="text" placeholder="РќР°РїРёС€РёС‚Рµ РіР»Р°РІРЅРѕРµ" value={text} onChange={e => setText(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="when">РљРѕРіРґР° РѕС‚РїСЂР°РІРёС‚СЊ</label>
          <select id="when" defaultValue="date">
            <option value="date">РўРѕС‡РЅР°СЏ РґР°С‚Р°</option>
            <option value="event">РџРѕ СЃРѕР±С‹С‚РёСЋ</option>
            <option value="after">РџРѕСЃР»Рµ СѓС…РѕРґР°</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button--primary">РЎРѕС…СЂР°РЅРёС‚СЊ С‡РµСЂРЅРѕРІРёРє</button>
          <Link href="/messages" className="button button--ghost">РћС‚РјРµРЅР°</Link>
        </div>
      </form>
    </section>
  );
}
