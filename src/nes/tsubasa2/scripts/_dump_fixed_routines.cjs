/**
 * 提取 bank30 固定例程 code 行（按地址范围）
 */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../_tmp_bzk_out/bank_30');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.asm')).sort();

// [start, end, name]
const RANGES = [
  [0xCB99, 0xCBFF, 'CB99 dispatch ($C509)'],
  [0xCBC2, 0xCC00, 'CBC2 char map ($C524)'],
  [0xCB0F, 0xCB2E, 'CB0F frame sync ($C515)'],
  [0xCBB0, 0xCBC1, 'CBB0 text helper ($C54E)'],
  [0xCC02, 0xCC46, 'CC02 sprite/text set ($C530)'],
  [0xCC46, 0xCCD2, 'CC46 attr mode ($C52D)'],
  [0xCCD2, 0xCD7C, 'CCD2 PPU queue ($C533)'],
  [0xCD7C, 0xCDFF, 'CD7C name ptr ($C50C)'],
];

const out = [];
for (const [lo, hi, name] of RANGES) {
  out.push(`\n########## ${name} ##########`);
  let count = 0;
  for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    for (const ln of lines) {
      const m = /^([\-CDIW\s]+) 0x\w+ \w{2}:(\w{4}):\s+(.*)$/.exec(ln);
      if (!m) continue;
      const addr = parseInt(m[2], 16);
      if (addr >= lo && addr <= hi) {
        out.push(ln);
        count++;
      }
    }
  }
  if (count === 0) out.push('  (no code lines found)');
}

const target = path.resolve(__dirname, '../_tmp_fixed_routines.txt');
fs.writeFileSync(target, out.join('\n') + '\n');
console.log(`wrote ${out.length} lines → ${target}`);
