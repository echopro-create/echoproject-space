'use client';
import { useEffect, useState } from "react";
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setProgress(Math.max(0, Math.min(1, scrolled)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{position:"sticky", top:0, left:0, right:0, height:3, background:"rgba(0,0,0,0.06)", zIndex:50}}>
      <div style={{height:"100%", width: `${progress*100}%`, transition:"width .1s linear", background:"rgba(0,0,0,0.8)"}} />
    </div>
  );
}
