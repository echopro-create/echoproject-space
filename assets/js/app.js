/* ECHO front script: i18n + interactions, no frameworks */
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll
  $$('.top-nav [data-scroll-target]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const sel = btn.getAttribute('data-scroll-target');
      const el = $(sel);
      if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
  const scrollBtn = $('#scroll-down');
  if (scrollBtn){
    scrollBtn.addEventListener('click', ()=>{
      const anchor = document.getElementById('how');
      if(anchor){ anchor.scrollIntoView({behavior:'smooth'}); }
    });
  }

  // i18n
  const select = $('#lang-select');
  const saved = localStorage.getItem('echo_lang');
  const browser = (navigator.language||'ru').slice(0,2).toLowerCase();
  const initial = saved || (['ru','en','no'].includes(browser) ? browser : 'ru');
  if (select) select.value = initial;

  function applyI18n(dict){
    // <title> and <meta> with data-i18n attributes
    $$('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = key.split('.').reduce((o,k)=> (o||{})[k], dict);
      if (!val) return;
      if (el.tagName === 'META'){
        el.setAttribute('content', val);
      } else {
        el.textContent = val;
      }
    });
    document.documentElement.lang = dict.meta.lang || 'ru';
  }

  async function loadLocale(lang){
    try{
      const res = await fetch(`assets/i18n/${lang}.json`, {cache:'no-cache'});
      if(!res.ok) throw new Error('i18n load failed');
      const dict = await res.json();
      applyI18n(dict);
      localStorage.setItem('echo_lang', lang);
    }catch(e){
      console.error('i18n error:', e);
    }
  }

  if (select){
    select.addEventListener('change', e=>{
      loadLocale(select.value);
    });
  }

  loadLocale(initial);

  // CTA buttons — configurable via config.js
  function wireLinks(){
    const login = $('#btn-login');
    const cta = $('#cta-start');
    if (window.ECHO_CONFIG && window.ECHO_CONFIG.login_url){
      if (login) login.href = window.ECHO_CONFIG.login_url;
      if (cta) cta.href = window.ECHO_CONFIG.login_url;
    }
  }
  wireLinks();

})();
