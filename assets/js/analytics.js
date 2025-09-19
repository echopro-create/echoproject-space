(function(){
  const cfg = (window.ECHO_CONFIG||{});
  // Plausible (privacy-friendly)
  if (cfg.plausible_domain){
    var s = document.createElement('script');
    s.defer = true; s.setAttribute('data-domain', cfg.plausible_domain);
    s.src = 'https://plausible.io/js/plausible.js';
    document.head.appendChild(s);
  }
  // Sentry (errors)
  if (cfg.sentry_dsn){
    var s = document.createElement('script');
    s.crossOrigin = 'anonymous';
    s.src = 'https://browser.sentry-cdn.com/7.120.1/bundle.tracing.replay.min.js';
    s.integrity = 'sha384-+placeholder';
    s.onload = function(){
      Sentry.init({ dsn: cfg.sentry_dsn, tracesSampleRate: 0.1, replaysSessionSampleRate: 0.0, replaysOnErrorSampleRate: 0.1 });
    };
    document.head.appendChild(s);
  }
})();