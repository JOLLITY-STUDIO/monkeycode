/**
 * 审计: Service 的十进制 bank 编号 vs import 的 prg-bank 十六进制文件
 * 规则: service bank N (十进制) 应 import prg-bank-${N.toString(16)}.ts
 */
const fs = require('fs');
const path = require('path');

const SERVICE_DIR = path.resolve(__dirname, '../src/game/service');

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { walk(p, out); continue; }
    if (f.endsWith('.ts')) out.push(p);
  }
  return out;
}

const files = walk(SERVICE_DIR);
let mismatch = 0;

for (const p of files) {
  const c = fs.readFileSync(p, 'utf8');
  const name = path.basename(p);

  // 从文件名提取十进制 bank 号
  const mName = /^bank(\d{1,2})_/.exec(name);
  const decBank = mName ? parseInt(mName[1], 10) : null;

  // 所有 prg-bank import
  const imports = [];
  const re = /from\s+'[^']*prg-bank-(\w+)'/g;
  let m;
  while ((m = re.exec(c)) !== null) imports.push(m[1]);

  if (!decBank) { console.log(`${name.padEnd(42)} [无bank编号] imports=${imports.join(',') || '-'}`); continue; }
  const expectedHex = decBank.toString(16).padStart(2, '0');
  const expectedFile = `prg-bank-${expectedHex}.ts`;

  if (imports.length === 0) {
    console.log(`${name.padEnd(42)} bank=${decBank} (0x${expectedHex}) NO prg-bank import`);
    continue;
  }
  for (const imp of imports) {
    const ok = imp === expectedHex;
    if (!ok) mismatch++;
    console.log(`${name.padEnd(42)} bank=${decBank} → import prg-bank-${imp} ${ok ? 'OK' : `✗ 应为 prg-bank-${expectedHex}`}`);
  }
}

console.log(`\n=== mismatch count: ${mismatch} ===`);
