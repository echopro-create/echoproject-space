"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioRecorder({
  onRecorded
}: {
  onRecorded?: (file: File) => void;
}) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;

    const chunks: BlobPart[] = [];
    mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const file = new File([blob], `echo-audio-${Date.now()}.webm`, { type: blob.type });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      onRecorded?.(file);
      stream.getTracks().forEach(t => t.stop());
    };
    mr.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {!recording ? (
          <button type="button" className="btn" onClick={start}>Запись</button>
        ) : (
          <button type="button" className="btn" onClick={stop}>Стоп</button>
        )}
        {audioUrl && (
          <button type="button" className="btn" onClick={reset}>Сбросить</button>
        )}
      </div>
      {audioUrl && (
        <audio controls src={audioUrl} className="w-full" />
      )}
      <p className="text-[var(--colors-muted)] text-sm">
        Формат: WebM/Opus. Подходит для современных браузеров.
      </p>
    </div>
  );
}