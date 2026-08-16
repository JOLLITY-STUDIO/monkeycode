const fs = require('fs');
const path = require('path');
const base = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';

function readBank(bank) {
  const dir = path.join(base, 'bank_' + String(bank).padStart(2, '0'));
  let out = '';
  for (const f of fs.readdirSync(dir).sort()) {
    out += fs.readFileSync(path.join(dir, f), 'utf8') + '\n';
  }
  return out;
}

// bank00: $84E7 分派器, $8464 启动函数, $8AEC ID 映射表
const b00 = readBank(0);
const lines00 = b00.split(/\r?\n/);
console.log('=== bank00 head (first 5) ===');
console.log(lines00.slice(0, 5).join('\n'));

function showRange(lines, fromAddr, toAddr, label) {
  console.log('\n=== ' + label + ' ($' + fromAddr.toString(16).toUpperCase() + '-$' + toAddr.toString(16).toUpperCase() + ') ===');
  let started = false, count = 0;
  for (const l of lines) {
    const m = l.match(/^\s*([0-9A-Fa-f]{4,6})\s*:/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr >= fromAddr && addr <= toAddr) {
      started = true;
      console.log(l.replace(/^\s+/, '').slice(0, 160));
      count++;
      if (count > 120) { console.log('...(truncated)'); break; }
    } else if (started && addr > toAddr) break;
  }
  if (!count) console.log('(no lines found)');
}

// bank00 分派器区域
showRange(lines00, 0x8464, 0x8545, 'bank00 $8464 启动函数 + $84E7 分派器');
