const fs = require('fs');
const path = require('path');
const root = 'src/game/prg';
const out = { prgBank: [], addrAccess: [], bankIdx: [] };
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules'].includes(e.name)) walk(p); }
    else if (e.name.endsWith('.ts')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split(/\r?\n/);
      lines.forEach((l, i) => {
        if (/PRG_BANK/.test(l)) out.prgBank.push(`${p}:${i + 1}: ${l.trim().slice(0, 110)}`);
        if (/bankpage|BANKPAGE|prgBankMap|readBank|readMem|readBankByte/.test(l)) out.bankIdx.push(`${p}:${i + 1}: ${l.trim().slice(0, 110)}`);
        // 裸地址访问: PRG_BANK[i] / bank[x] 数组下标查表
        if (/\b(?:PRG_BANK_\w+|B\d+_?DATA|DATA)\s*\[[^\]]*\]/.test(l) && /0x[0-9A-Fa-f]+/.test(l)) out.addrAccess.push(`${p}:${i + 1}: ${l.trim().slice(0, 110)}`);
      });
    }
  }
}
walk(root);
for (const k of Object.keys(out)) {
  console.log(`\n===== ${k} (${out[k].length}) =====`);
  out[k].slice(0, 80).forEach(x => console.log(x));
}
