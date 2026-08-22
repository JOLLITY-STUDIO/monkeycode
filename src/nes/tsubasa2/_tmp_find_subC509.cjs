// 临时: 找所有 subC509 引用 (TS + asm)
const fs = require('fs');
function scanTs(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/subC509/.test(l)) console.log(`TS ${file}:${i + 1}| ${l.trim()}`);
  });
}
function scanDir(dir, ext) {
  const walk = (d) => {
    for (const n of fs.readdirSync(d)) {
      const p = d + '/' + n;
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (n.endsWith(ext)) scanTs(p);
    }
  };
  walk(dir);
}
scanDir('src/game/prg/code', '.ts');
// GameSystemService 网关定义
const gs = fs.readFileSync('src/game/prg/code/system/GameSystemService.ts', 'utf8').split('\n');
gs.forEach((l, i) => {
  if (/subC509|subC50C|subC54E|setHardwareInit/.test(l)) console.log(`TS GameSystemService:${i + 1}| ${l.trim()}`);
});
