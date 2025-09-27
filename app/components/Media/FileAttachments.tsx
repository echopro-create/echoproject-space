"use client";
import { useState } from "react";

export default function FileAttachments({
  accept = "*",
  multiple = true,
  onChange
}: {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files ? Array.from(e.target.files) : [];
    setFiles(fl);
    onChange?.(fl);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        className="block w-full rounded-lg border border-[var(--colors-border)] px-4 py-3"
        accept={accept}
        multiple={multiple}
        onChange={handle}
      />
      {files.length > 0 && (
        <ul className="space-y-1 text-sm">
          {files.map((f, i) => (
            <li key={i} className="text-[var(--colors-muted)]">
              {f.name}  {(f.size/1024/1024).toFixed(2)} MB
            </li>
          ))}
        </ul>
      )}
      <p className="text-[var(--colors-muted)] text-sm">
        Допустимые вложения: документы, изображения, архивы. Ограничения зададим на сервере.
      </p>
    </div>
  );
}