const fs = require('fs');
const src = fs.readFileSync('src/game/prg/data/audio/audio-rom.ts', 'utf8');
function getBytes(name) {
  const m = src.match(new RegExp(name + ': Readonly<Uint8Array> = new Uint8Array\\(\\[([\\s\\S]*?)\\]\\)'));
  const vals = m[1].replace(/\s/g, '').split(',').map(x => parseInt(x, 16));
  while (vals.length && isNaN(vals[vals.length - 1])) vals.pop();
  return vals;
}
const b7 = getBytes('BANK7_BYTES');
const b12 = getBytes('BANK12_BYTES');
const b13 = getBytes('BANK13_BYTES');
const b14 = getBytes('BANK14_BYTES');
const b15 = getBytes('BANK15_BYTES');
const bank = { 7: b7, 12: b12, 13: b13, 14: b14, 15: b15 };
const dump = (arr, off, len) => {
  const row = [];
  for (let i = off; i < off + len; i++) row.push((arr[i] !== undefined ? arr[i] : NaN).toString(16).padStart(2, '0'));
  return row.join(' ');
};
const m = src.match(/SONG_REQUEST_IDS: ReadonlyArray<number> = \[([\s\S]*?)\];/);
const ids = m[1].match(/0x[0-9a-f]+/g).map(x => parseInt(x, 16));
// 正确归属：SE 0x32-0x43→13, 0x44-0x50→14, 0x51-0x5B→15；BGM 0x03-0x30→12（0x21 例外→13）
function r7bankFor(req) {
  if (req >= 0x32 && req <= 0x43) return 13;
  if (req >= 0x44 && req <= 0x50) return 14;
  if (req >= 0x51 && req <= 0x5b) return 15;
  return 13; // BGM 默认 $07FC
}
console.log('=== 歌曲数据归属（按正确 R7 bank） ===');
const summary = {};
for (const req of ids) {
  const idx = req - 1;
  const a = b12[0x0bda + idx * 2] | (b12[0x0bdb + idx * 2] << 8);
  let realBank;
  if (a >= 0x8000 && a < 0xa000) { realBank = 12; }
  else if (a >= 0xa000) { realBank = r7bankFor(req); }
  else realBank = '?';
  const key = (req <= 0x30 ? 'BGM' : 'SE') + '@bank' + realBank;
  summary[key] = (summary[key] || 0) + 1;
  const content = realBank === 12 ? dump(b12, a - 0x8000, 8) : dump(bank[realBank], a - 0xa000, 8);
  const b7content = a >= 0xa000 ? dump(b7, a - 0xa000, 8) : '-';
  console.log('req=0x' + req.toString(16).padStart(2, '0') + ' -> 0x' + a.toString(16) + ' 真实bank=' + realBank + ' 内容=' + content + (b7content !== '-' ? ' | bank7同偏移=' + b7content : ''));
}
console.log('=== 汇总 ===');
console.log(summary);
console.log('=== bank07 是否有任何一首歌的数据 ===');
for (const req of ids) {
  const idx = req - 1;
  const a = b12[0x0bda + idx * 2] | (b12[0x0bdb + idx * 2] << 8);
  if (a >= 0xa000) {
    const off = a - 0xa000;
    if (b7[off] !== 0xff && b7[off] !== undefined) {
      console.log('req=0x' + req.toString(16) + ' bank7偏移0x' + off.toString(16) + ' = 0x' + b7[off].toString(16));
    }
  }
}
