(function(){
  if (localStorage.getItem('echo_cookie_ok')==='1') return;
  var bar = document.createElement('div');
  bar.setAttribute('role','dialog');
  bar.style.position='fixed'; bar.style.left='0'; bar.style.right='0'; bar.style.bottom='0';
  bar.style.background='rgba(0,0,0,.85)'; bar.style.color='#fff'; bar.style.padding='12px 16px';
  bar.style.display='flex'; bar.style.gap='12px'; bar.style.alignItems='center'; bar.style.justifyContent='space-between';
  bar.style.zIndex='9999';
  bar.innerHTML = '<span style="max-width:72ch;font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Inter,Roboto,Arial,sans-serif;">Мы используем только необходимые файлы cookie для работы сайта и анонимной аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</span>';
  var btn = document.createElement('button');
  btn.textContent='ОК'; btn.className='btn primary';
  btn.style.border='none'; btn.style.cursor='pointer';
  btn.onclick=function(){ localStorage.setItem('echo_cookie_ok','1'); bar.remove(); };
  bar.appendChild(btn);
  document.body.appendChild(bar);
})();