// 临时：dump bank12 $82C0-$84E0（$8349 请求分发例程）
const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/audio-rom.ts';
const t = fs.readFileSync(f, 'utf8');
const m = t.match(/BANK12_BYTES[^=]*= new Uint8Array\(\[([\s\S]*?)\]\)/);
const bytes = m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v));
for (let a = 0x82c0; a < 0x84e0; a += 16) {
  const row = [];
  for (let k = 0; k < 16; k++) row.push(bytes[a - 0x8000 + k].toString(16).padStart(2, '0'));
  console.log('$' + a.toString(16).toUpperCase() + ': ' + row.join(' '));
}
// 找 $8798 引用（BD 98 87 / B9 98 87 / 98 87 其他寻址）
console.log('\n--- 含 98 87 的位置 ---');
for (let i = 0; i < bytes.length - 1; i++) {
  if (bytes[i] === 0x98 && bytes[i + 1] === 0x87) {
    console.log('$' + (0x8000 + i - 2).toString(16).toUpperCase() + ': ' +
      bytes.slice(i - 2, i + 3).map((v) => v.toString(16).padStart(2, '0')).join(' '));
  }
}
