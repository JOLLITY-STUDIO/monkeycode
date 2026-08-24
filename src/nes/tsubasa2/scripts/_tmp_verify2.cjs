// 临时：dump bank12 $8E42 歌曲头（request 0x01 真实数据位置）+ 验证 bank 映射
const fs = require('fs');
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/audio-rom.ts', 'utf8');
const grab = (name) => {
  const m = t.match(new RegExp(name + '[^=]*= new Uint8Array\\(\\[([\\s\\S]*?)\\]\\)'));
  return m ? m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v)) : null;
};
const b12 = grab('BANK12_BYTES');
console.log('bank12 $8E42 起 24B（request 0x01 歌曲数据）:');
const hdr = [];
for (let k = 0; k < 24; k++) hdr.push(b12[0x8e42 - 0x8000 + k]);
console.log(hdr.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(' '));
// $8BDA 主表 req1-8 指针落点首字节（判断是否都是有效歌曲头：首字节<0x80 且 chNum 合理）
const u16 = (cpu) => b12[cpu - 0x8000] | (b12[cpu - 0x8000 + 1] << 8);
console.log('\nreq → ptr → 首字节:');
for (let r = 1; r <= 8; r++) {
  const p = u16(0x8bda + (r - 1) * 2);
  const b0 = p >= 0x8000 && p <= 0x9fff ? b12[p - 0x8000] : -1;
  console.log('  req 0x' + r.toString(16).padStart(2, '0') + ' → $' + p.toString(16).toUpperCase() + ' → 首字节 0x' + (b0 >= 0 ? b0.toString(16).padStart(2, '0') : '??'));
}
