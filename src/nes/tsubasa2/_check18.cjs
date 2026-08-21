// PRG_BANK_18 长度 + bank18 $9000 区域内容 + fn_85C2 第三调用点上下文
const fs = require('fs');
const c = fs.readFileSync('src/game/prg/data/prg-bank-18.ts', 'utf8');
console.log('prg-bank-18.ts lines:', c.split(/\r?\n/).length);
const m = c.match(/0x[0-9A-Fa-f]+/g);
console.log('0x literals:', m ? m.length : 0);

const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b18 = Array.from(rom.slice(0x10 + 18 * 0x2000, 0x10 + 19 * 0x2000));
console.log('bank18 $9000 (0x1000):', b18.slice(0x1000, 0x1040).map(v => v.toString(16).toUpperCase().padStart(2, '0')).join(' '));

const b11 = fs.readFileSync('src/game/prg/code/bank11_match-turn.ts', 'utf8').split(/\r?\n/);
console.log('\n--- line 930-985 (第三调用点上下文) ---');
for (let i = 929; i < 985; i++) console.log((i + 1) + ': ' + b11[i]);
