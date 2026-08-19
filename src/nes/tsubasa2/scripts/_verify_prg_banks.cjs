/**
 * 校验 32 个 prg-bank-XX.ts 的内容是否与 ROM 逐字节一致。
 * 兼容两种格式: 十六进制(0xXX) 与 十进制(165, 39)。
 * 输出: 每个 bank 的匹配状态; 不匹配的列出前 8 字节差异。
 */
const fs = require('fs');
const path = require('path');

const ROM_PATH = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const DATA_DIR = path.resolve(__dirname, '../src/game/data');
const rom = fs.readFileSync(ROM_PATH);
const BANK = 0x2000;

function parseBankFile(content) {
  // 仅取数组体: 第一个 [ 到最后一个 ]
  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  if (start < 0 || end < 0) return [];
  const body = content.slice(start + 1, end);
  const tokens = body.split(/[,\s\[\]\(\)]+/).filter(Boolean);
  const bytes = [];
  for (const t of tokens) {
    const m = /^0[xX]([0-9a-fA-F]{1,2})$/.exec(t);
    if (m) { bytes.push(parseInt(m[1], 16)); continue; }
    const d = /^(\d{1,3})$/.exec(t);
    if (d) { bytes.push(parseInt(d[1], 10)); continue; }
  }
  return bytes;
}

let allMatch = true;
const table = [];
for (let b = 0; b < 32; b++) {
  const f = `prg-bank-${b.toString(16).padStart(2, '0')}.ts`;
  const p = path.join(DATA_DIR, f);
  const expect = Array.from(rom.subarray(0x10 + b * BANK, 0x10 + (b + 1) * BANK));
  if (!fs.existsSync(p)) {
    table.push({ b, status: 'MISSING' });
    allMatch = false;
    continue;
  }
  const got = parseBankFile(fs.readFileSync(p, 'utf8'));
  const ok = got.length === expect.length && got.every((v, i) => v === expect[i]);
  if (!ok) allMatch = false;
  let diff = '';
  if (!ok) {
    const n = Math.min(8, expect.length, got.length);
    const d1 = [], d2 = [];
    for (let i = 0; i < n; i++) {
      if (got[i] !== expect[i]) { d1.push(`exp:${expect[i].toString(16)}`); d2.push(`got:${got[i]?.toString(16)}`); }
    }
    diff = ` len=${got.length}/${expect.length} diff=${d1.join(',')} vs ${d2.join(',')}`;
  }
  table.push({ b, status: ok ? 'OK' : 'DIFF', diff });
  console.log(`Bank ${b.toString(16).padStart(2, '0').toUpperCase()}  ${ok ? 'OK  ' : 'DIFF'}  ${ok ? '' : diff}`);
}

const nOk = table.filter((t) => t.status === 'OK').length;
console.log(`\n=== ${nOk}/32 banks match ROM ===`);
if (allMatch) console.log('ALL 32 PRG BANKS VERIFIED 100%');
else console.log('MISMATCHES REMAIN — need regeneration for the DIFF banks');
