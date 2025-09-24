# === fix-encoding.ps1 (без Add-Type) ===

function Write-Utf8NoBom {
  param([string]$Path,[string]$Text)
  $enc = [System.Text.UTF8Encoding]::new($false)   # UTF-8 без BOM
  [System.IO.File]::WriteAllText($Path,$Text,$enc)
}

function Count-Cyrillic {
  param([string]$s)
  return ([regex]::Matches($s,'\p{IsCyrillic}')).Count
}

function Try-Fix-Mojibake {
  param([string]$s)
  $before = Count-Cyrillic $s
  $bytes  = [System.Text.Encoding]::GetEncoding(1251).GetBytes($s)
  $fixed  = [System.Text.Encoding]::UTF8.GetString($bytes)
  $after  = Count-Cyrillic $fixed
  if ($after -gt $before) { return $fixed } else { return $s }
}

# какие файлы правим
$files = Get-ChildItem -Path . -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.css,*.md,*.json

foreach ($f in $files) {
  # читаем байты и срезаем BOM при наличии
  $raw = Get-Content -Path $f.FullName -Raw -Encoding Byte
  if ($raw.Length -ge 3 -and $raw[0]-eq 0xEF -and $raw[1]-eq 0xBB -and $raw[2]-eq 0xBF) {
    $raw = $raw[3..($raw.Length-1)]
  }
  # в UTF-8 строку
  $text = [System.Text.Encoding]::UTF8.GetString($raw)
  # убираем zero-width символы
  $text = $text -replace '[\u200B\u200C\u200D\uFEFF]',''
  # пробуем починить «Р/С/Ð/Ñ/â/€»-кракозябры
  $text2 = Try-Fix-Mojibake $text
  if ($text2 -ne $text) { Write-Host "fixed mojibake -> $($f.FullName)" }
  # сохраняем как UTF-8 без BOM
  Write-Utf8NoBom -Path $f.FullName -Text $text2
}

Write-Host "Done: UTF-8(no BOM), zero-width removed, mojibake fixed where detected."
