const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
// 全 PRG 找 JSR/JMP $A212 / $A484 / $A200
const targets = [0xa212, 0xa484, 0xa200, 0xa20f, 0xa20c, 0xa218];
for (const t of targets) {
  const hits = [];
  for (let i = 0; i < prg.length - 2; i++) {
    if ((prg[i] === 0x20 || prg[i] === 0x4c) && prg[i + 1] === (t & 0xff) && prg[i + 2] === (t >> 8)) {
      const bank = Math.floor(i / 0x2000);
      const cpu = (i % 0x2000) + 0x8000;
      hits.push(`bank${bank} cpu$${cpu.toString(16).toUpperCase()} (PRG 0x${i.toString(16)})`);
    }
  }
  console.log(`JSR/JMP $${t.toString(16).toUpperCase()}: ${hits.length > 0 ? hits.join(', ') : 'none'}`);
}
// $ED 作为场景索引被谁读：找 LDA $ED / ASL / TAX 模式（$A484 是唯一派发入口）
const hits = [];
for (let i = 0; i < prg.length - 1; i++) {
  if (prg[i] === 0xa5 && prg[i + 1] === 0xed) {
    hits.push(`LDA $ED @ bank${Math.floor(i / 0x2000)} cpu$${((i % 0x2000) + 0x8000).toString(16).toUpperCase()} (PRG 0x${i.toString(16)})`);
  }
}
console.log('\nLDA $ED 全部位置:');
console.log(hits.join('\n') || 'none');
