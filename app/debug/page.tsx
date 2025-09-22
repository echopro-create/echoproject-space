export default function DebugText(){
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Тест букв</h1>
      <p>роверка: бвгдеёжз лья — Echo стартует. 1234567890.</p>
      <p style={{fontFamily:"system-ui, -apple-system, Segoe UI, Roboto"}}>
        System UI: бвгдеёжз лья — Echo.
      </p>
      <p style={{fontFamily:"monospace"}}>
        Monospace: бвгдеёжз лья — Echo.
      </p>
      <p style={{letterSpacing:0, wordSpacing:0}}>ез трекинга: бвгдеёжз Echo.</p>
    </main>
  );
}
