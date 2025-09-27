"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoRecorder({
  onRecorded
}: {
  onRecorded?: (file: File) => void;
}) {
  const liveRef = useRef<HTMLVideoElement | null>(null);
  const playbackRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: true });
    streamRef.current = stream;
    if (liveRef.current) {
      // @ts-ignore
      liveRef.current.srcObject = stream;
      liveRef.current.play();
    }
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;

    const chunks: BlobPart[] = [];
    mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File([blob], `echo-video-${Date.now()}.webm`, { type: blob.type });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      onRecorded?.(file);
      stream.getTracks().forEach(t => t.stop());
    };
    mr.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (liveRef.current) {
      // @ts-ignore
      liveRef.current.srcObject = null;
    }
  };

  const reset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
  };

  return (
    <div className="space-y-3">
      <div className="aspect-video w-full rounded-lg border border-[var(--colors-border)] overflow-hidden bg-black/5">
        {videoUrl ? (
          <video ref={playbackRef} src={videoUrl} controls className="w-full h-full" />
        ) : (
          <video ref={liveRef} autoPlay muted playsInline className="w-full h-full" />
        )}
      </div>
      <div className="flex gap-2">
        {!recording ? (
          <button type="button" className="btn" onClick={start}>Запись</button>
        ) : (
          <button type="button" className="btn" onClick={stop}>Стоп</button>
        )}
        {videoUrl && (
          <button type="button" className="btn" onClick={reset}>Сбросить</button>
        )}
      </div>
      <p className="text-[var(--colors-muted)] text-sm">
        Формат: WebM/VP9. 720p. Дальше отправим на сервер как файл.
      </p>
    </div>
  );
}