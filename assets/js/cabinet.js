(() => {
  const API_BASE = (window.API_BASE || window.api_base || "https://api.echoproject.space").replace(/\/+$/,'');
  const $ = (id) => document.getElementById(id);
  const debug = (obj, title = "") => {
    const pre = $("debug");
    try {
      const text = (title ? ("# " + title + "\n") : "") + JSON.stringify(obj, null, 2);
      pre.textContent = text + "\n\n" + pre.textContent;
    } catch(e) {
      pre.textContent = (title ? ("# " + title + "\n") : "") + String(obj) + "\n\n" + pre.textContent;
    }
  };
  const setText = (id, text, cls="") => { const el=$(id); el.textContent=text; el.className=cls; };

  const endpoints = {
    recipients: "/api/recipients",
    messages:   "/api/messages",
  };

  const http = async (method, path, body) => {
    const url = API_BASE + path;
    const init = {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    };
    debug({url, method, body}, "REQUEST");
    const res = await fetch(url, init);
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw:text }; }
    debug({status: res.status, data}, "RESPONSE");
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || ("HTTP " + res.status);
      throw new Error(msg);
    }
    return data;
  };

  // UI init
  $("apiBaseView").textContent = API_BASE;

  // 1) Add recipient
  $("btnAdd").addEventListener("click", async () => {
    setText("addMsg", "Сохраняю…");
    const payload = {
      name: $("rName").value.trim(),
      channel: $("rChannel").value,
      address: $("rAddress").value.trim(),
    };
    try {
      const data = await http("POST", endpoints.recipients, payload);
      setText("addMsg", "Готово", "ok");
      await loadRecipients(); // refresh list & select
    } catch(e) {
      setText("addMsg", "Ошибка: " + e.message, "err");
    }
  });

  // 2) Load recipients
  async function loadRecipients() {
    $("recipientsTbl").querySelector("tbody").innerHTML = "<tr><td colspan='4' class='muted'>Загружаю…</td></tr>";
    try {
      const data = await http("GET", endpoints.recipients);
      const arr = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      const tbody = $("recipientsTbl").querySelector("tbody");
      tbody.innerHTML = "";
      const sel = $("msgRecipient");
      sel.innerHTML = "";
      for (const r of arr) {
        const id = r.id ?? r._id ?? r.uuid ?? r.recipient_id ?? "";
        const name = r.name ?? r.title ?? "";
        const channel = r.channel ?? r.type ?? "";
        const address = r.address ?? r.contact ?? r.email ?? r.username ?? "";
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${id}</td><td>${name}</td><td>${channel}</td><td>${address}</td>`;
        tbody.appendChild(tr);
        if (id) {
          const opt = document.createElement("option");
          opt.value = id; opt.textContent = name ? `${name} (${id})` : id;
          sel.appendChild(opt);
        }
      }
      if (!arr.length) {
        tbody.innerHTML = "<tr><td colspan='4' class='muted'>Пусто</td></tr>";
      }
    } catch(e) {
      $("recipientsTbl").querySelector("tbody").innerHTML =
        `<tr><td colspan='4' class='err'>Ошибка загрузки: ${e.message}</td></tr>`;
    }
  }
  $("btnLoad").addEventListener("click", loadRecipients);

  // 3) Schedule message
  $("btnSend").addEventListener("click", async () => {
    setText("sendMsg", "Отправляю…");
    const rid = $("msgRecipient").value;
    const text = $("msgText").value.trim();
    const when = $("msgWhen").value; // yyyy-mm-ddThh:mm
    if (!rid || !text || !when) { setText("sendMsg","Заполни все поля","err"); return; }
    const iso = new Date(when).toISOString();
    const payload = {
      recipient_id: rid,
      content: text,
      send_at: iso,
    };
    try {
      const data = await http("POST", endpoints.messages, payload);
      setText("sendMsg", "Запланировано", "ok");
      $("msgText").value = "";
    } catch(e) {
      setText("sendMsg", "Ошибка: " + e.message, "err");
    }
  });

  // Auto-load on start
  loadRecipients().catch(()=>{});
})();
