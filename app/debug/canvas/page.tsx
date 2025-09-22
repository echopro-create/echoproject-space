"use client";
import { useEffect, useRef } from "react";

export default function CanvasDebug(){
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(() => {
    const c = ref.current!;
    const dpr = window.devicePixelRatio || 1;
    c.width = 1000 * dpr;
    c.height = 400 * dpr;
    c.style.width = "1000px";
    c.style.height = "400px";
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#eaeaea";
    ctx.fillRect(0,0,1000,400);
    ctx.fillStyle = "#111";
    ctx.font = "24px Segoe UI, system-ui, Arial";
    const lines = [
      "роверка: бвгдеёжз лья - Echo стартует. 1234567890.",
      "System UI: бвгдеёжз лья - Echo.",
      "Monospace: бвгдеёжз лья - Echo.",
      "ез трекинга: бвгдеёжз Echo."
    ];
    lines.forEach((t,i)=> ctx.fillText(t, 24, 50 + i*50));
  }, []);
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <canvas ref={ref} />
    </main>
  );
}
