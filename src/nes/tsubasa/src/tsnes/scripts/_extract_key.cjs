const fs = require('fs');

// Print code around a specific line in a file
function showCode(filename, lineNum, context) {
  const lines = fs.readFileSync(filename, 'utf8').split('\n');
  const start = Math.max(0, lineNum - context);
  const end = Math.min(lines.length, lineNum + context);
  for (let i = start; i < end; i++) {
    const marker = (i === lineNum) ? '>>>' : '   ';
    console.log(marker + ' L' + (i+1).toString().padStart(6) + ': ' + lines[i].trim().substring(0, 110));
  }
  console.log('');
}

// Find line number for address
function findLine(filename, addr) {
  const lines = fs.readFileSync(filename, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(':' + addr + ':')) return i;
  }
  return -1;
}

console.log('========= BANK 31: E0DF main loop =========');
const df = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', 'E0DF');
if (df >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', df, 25);

console.log('========= BANK 31: E233 =========');
const e233 = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', 'E233');
if (e233 >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', e233, 20);

console.log('========= BANK 02: A21B =========');
const a21b = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 'A21B');
if (a21b >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', a21b, 30);

console.log('========= BANK 02: A1CB =========');
const a1cb = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 'A1CB');
if (a1cb >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', a1cb, 20);

console.log('========= BANK 02: 8200 dispatch area =========');
const b8200 = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', '8200');
if (b8200 >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', b8200, 35);

console.log('========= BANK 30: C503 =========');
const c503 = findLine('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'C503');
if (c503 >= 0) showCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', c503, 30);
