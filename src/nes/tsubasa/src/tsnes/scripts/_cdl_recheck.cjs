const fs = require('fs');
const path = require('path');
const cdlPath = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl';
const cdl = fs.readFileSync(cdlPath);
const PRG_SIZE = 0x40000;
function flagName(v) {
  const a = [];
  if (v & 1) a.push('C');
  if (v & 2) a.push('D');
  if (v & 4) a.push('I');
  if (v & 0x40) a.push('W');
  return a.length ? a.join('') : '-';
}
function recheck(file, cpuBase, range) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  console.log(`\n=== ${path.basename(file)} ${cpuBase ? 'CPU '+cpuBase.toString(16).padStart(4,'0') : 'variable'} ===`);
  let out = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^.{12}0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]{2}):([0-9A-Fa-f]{4}):\s*(.*)$/);
    if (!m) continue;
    const romOff = parseInt(m[1], 16);
    const prgOff = romOff - 0x10;
    if (prgOff < 0 || prgOff >= PRG_SIZE) continue;
    const v = cdl[prgOff];
    const f = flagName(v);
    const addrInBank = parseInt(m[3], 16);
    const cpu = cpuBase ? (cpuBase + (addrInBank - 0x8000)) : null;
    if (range && cpu != null && (cpu < range[0] || cpu > range[1])) continue;
    out.push(`${(i+1).toString().padStart(5)} | new ${f.padEnd(3)} | 0x${romOff.toString(16).padStart(5,'0')} ${m[2]}:${m[3]} | ${m[4].substring(0,60)}`);
  }
  console.log('matched lines: '+out.length);
  console.log(out.slice(0, 400).join('\n'));
}

recheck('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', 0xE000, [0xE000, 0xFFFF]);
recheck('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 0x8000, [0x8000, 0xBFFF]);
recheck('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_00.asm', 0x8000, [0x8000, 0x9FFF]);
