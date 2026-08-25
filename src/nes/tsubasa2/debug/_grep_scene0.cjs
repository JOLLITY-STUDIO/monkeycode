const fs = require('fs');
const path = require('path');
const ls = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).log'), 'utf8').split('\n');

// 场景 0 正确 CPU 地址（code_sub.s 的 asm 地址就是 CPU 地址）
const targets = [
  '84C1', '84C4', '84C6', '84C9', '84CB', '84CD', '84D0', '84D2', '84D5', '84D6',
  '84D8', '84DA', '84DC', '84DE', '84E0', '84E3', '84E5', '84E7', '84E9',
  '84EC', '84EE', '84F0', '84F2', '84F4', '84F6', '84F9', '84FC',
  '84FF', '8501', '8504', '8506', '8508', '850A', '850C', '850D', '850F',
  '8511', '8513', '8515', '8517', '851A', '851C', '851E', '8520', '8522',
  '8525', '8527', '852A', '852C', '852E', '8530', '8532', '8534', '8536',
  '8538', '853B', '853E', '8541', '8543', '8545', '8547', '8549', '854B',
  '854D', '854F', '8552', '8554', '8557', '8559',
];

const hit = new Map();
for (let i = 0; i < ls.length; i++) {
  const l = ls[i];
  for (const t of targets) {
    if (l.includes(':' + t + ':')) {
      if (!hit.has(t)) {
        console.log('=== first ' + t + ' @ line ' + (i + 1));
        for (let j = Math.max(0, i - 2); j <= Math.min(ls.length - 1, i + 2); j++) console.log(ls[j]);
        console.log();
      }
      hit.set(t, (hit.get(t) || 0) + 1);
    }
  }
}
console.log('===== hit counts =====');
for (const [k, v] of [...hit.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log('$' + k, v);
}
