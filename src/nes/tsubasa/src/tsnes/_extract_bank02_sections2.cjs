// 从 bank_02.asm 提取指定 CPU 地址段 - 第二部分
const fs = require('fs');
const path = require('path');

const asmPath = path.join(__dirname, '_tmp_bzk_out', 'bank_02.asm');
const lines = fs.readFileSync(asmPath, 'utf8').split(/\r?\n/);

function parseLine(line) {
  const m = line.match(/^([C-])([ -]) - - - - - (0x[0-9A-Fa-f]{6}) (01:[0-9A-Fa-f]{4}):(.*)$/);
  if (!m) return null;
  return {
    flag: m[1],
    prg: parseInt(m[3], 16),
    cpu: parseInt(m[4].slice(3), 16),
    rest: m[5].trim(),
  };
}

const entries = lines.map(parseLine).filter(Boolean);

function section(from, to, title) {
  console.log(`\n===== ${title} ($${from.toString(16)}-$${to.toString(16)}) =====`);
  for (const e of entries) {
    if (e.cpu >= from && e.cpu <= to) {
      console.log(`${e.flag} ${e.cpu.toString(16).toUpperCase()}: ${e.rest}`);
    }
  }
}

// 3. entryF 分发器 $A484 + 18 handlers $A4C0-$A782
section(0xA484, 0xA482, 'A484 dispatcher');
section(0xA4C0, 0xA782, 'A4C0-A782 handlers');
