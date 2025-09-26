import fs from "node:fs";
import path from "node:path";
const file = path.resolve("tokens.json");
const out = path.resolve("styles/_tokens.css");
const watch = process.argv.includes("--watch");
function gen(){
  const json = JSON.parse(fs.readFileSync(file,"utf-8"));
  const { colors, typography, radii } = json;
  const toRgb = (a)=>Array.isArray(a)?a.join(" "):a;
  const css = `:root{
  --bg: ${toRgb(colors.bg)};
  --text: ${toRgb(colors.text)};
  --muted: ${toRgb(colors.muted)};
  --primary: ${toRgb(colors.primary)};
  --primary-text: ${toRgb(colors["primary-text"])};
  --font-family: ${typography.fontFamily};
  --radius-xl: ${radii.xl};
  --radius-2xl: ${radii["2xl"]};
}
`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, css, "utf-8");
  console.log(" styles/_tokens.css updated");
}
gen();
if (watch){
  console.log(" watching tokens.json...");
  fs.watchFile(file, { interval: 500 }, ()=>{ try{ gen(); }catch(e){ console.error(e);} });
}
