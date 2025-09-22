import fs from "fs";
import path from "path";

// -------- utils --------
function clean(x){
  if (!x && x !== 0) return "";
  return String(x)
    .replace(/\r?\n/g,"")
    .replace(/\\r\\n/gi,"")
    .replace(/\/r\/n/gi,"")
    .replace(/^["']|["']$/g,"")
    .trim();
}
function readDotEnv(file){
  if (!fs.existsSync(file)) return {};
  const out={};
  for (const line of fs.readFileSync(file,"utf8").split(/\r?\n/)){
    if (!line || /^\s*[#;]/.test(line)) continue;
    const m=line.match(/^\s*([^=]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1].trim()] = m[2];
  }
  return out;
}
function arg(name, def=""){
  const i = process.argv.indexOf(name);
  return i>-1 ? process.argv[i+1] : def;
}

// -------- config --------
const envProd  = readDotEnv(".vercel/.env.production.local");
const envLocal = readDotEnv(".env.local");

const BASE_RAW =
  envProd.NEXT_PUBLIC_SUPABASE_URL ??
  envLocal.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const SR_KEY_RAW =
  envProd.SUPABASE_SERVICE_ROLE_KEY ??
  envLocal.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const ANON_KEY_RAW =
  envProd.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  envLocal.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let BASE   = clean(BASE_RAW).replace(/\/+$/,"");
const SR_KEY   = clean(SR_KEY_RAW);
const ANON_KEY = clean(ANON_KEY_RAW) || SR_KEY;

const OUT    = path.resolve(arg("--out","C:\\Projects\\OUT\\uploads"));
const BUCKET = clean(arg("--bucket","uploads"));
const ONE    = clean(arg("--one",""));

if (!/^https:\/\//i.test(BASE)) throw new Error(`BASE не https-URL: "${BASE_RAW}" → "${BASE}"`);
if (!SR_KEY) throw new Error("устой SUPABASE_SERVICE_ROLE_KEY (проверь .vercel/.env.production.local)");

console.log("BASE =", BASE);
console.log("KEY  = *** (len="+SR_KEY.length+")");
console.log("OUT  =", OUT);
console.log("BUCKET =", BUCKET);
if (ONE) console.log("ONE =", ONE);

// -------- HTTP --------
async function api(p, init={}){
  const url = `${BASE}${p}`;
  const headers = {
    ...(init.headers||{}),
    Authorization: `Bearer ${SR_KEY}`,
    apikey: ANON_KEY,
  };
  const res = await fetch(url, { ...init, headers });
  return res;
}

async function listAll(prefix=""){
  const out=[]; let offset=0; const limit=1000;
  for(;;){
    const body={ prefix, limit, offset, sortBy:{column:"name",order:"asc"} };
    const res = await api(`/storage/v1/object/list/${encodeURIComponent(BUCKET)}`,{
      method:"POST",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok){
      const txt = await res.text().catch(()=> "");
      throw new Error(`bucket list failed: ${res.status} ${txt}`);
    }
    const items = await res.json();
    out.push(...items);
    if (!items || items.length<limit) break;
    offset += limit;
  }
  return out.filter(x => x && x.name && !x.name.endsWith("/"));
}

async function downloadOne(relName, destFile){
  const res = await api(`/storage/v1/object/${encodeURIComponent(BUCKET)}/${encodeURIComponent(relName)}`);
  if (!res.ok){
    const t = await res.text().catch(()=> "");
    throw new Error(`download failed: ${res.status} ${t}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.writeFileSync(destFile, buf);
}

// -------- main --------
async function main(){
  fs.mkdirSync(OUT, { recursive:true });

  if (ONE){
    const rel = ONE.replace(/^uploads\//,"");
    const dest = path.join(OUT, rel);
    await downloadOne(rel, dest);
    console.log("↓", rel);
    return;
  }

  const items = await listAll("");
  let downloaded=0;
  for (const it of items){
    const rel = String(it.name);
    const dest = path.join(OUT, rel);
    if (fs.existsSync(dest)) continue;
    await downloadOne(rel, dest);
    console.log("↓", rel);
    downloaded++;
  }
  console.log(`отово. овых файлов: ${downloaded}. апка: ${OUT}`);
}

main().catch(e => { console.error(e.stack || e.message || String(e)); process.exit(1); });
