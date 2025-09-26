'use client';

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setProgress(Math.max(0, Math.min(1, scrolled)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,height:3,background:'transparent',zIndex:50}}>
      <div style={{width:`${progress*100}%`,height:'100%',background:'currentColor',opacity:0.2}} />
    </div>
  );
}
