// 提取 bank_01.asm 中的代码行，输出紧凑文本便于人工翻译
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '_tmp_bzk_out', 'bank_01.asm');
const out = path.join(__dirname, '_tmp_bzk_out', 'bank_01_code.txt');

const lines = fs.readFileSync(src, 'utf8').split(/\r?\n/);
const outLines = [];
let curAddr = -1;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) { outLines.push(''); continue; }
  // 格式: "C - - - - - 0x002010 00:8000: 4C 1E A0  JMP $A01E"
  const m = trimmed.match(/^(C|D)\s.*?\s(0x[0-9A-Fa-f]+)\s+(\d+):([0-9A-Fa-f]{4}):\s+(.*)$/);
  if (m) {
    const isCode = trimmed.startsWith('C');
    const isData = trimmed.startsWith('D');
    const offset = m[2];
    const fileAddr = m[3];
    const cpuAddr = parseInt(m[4], 16);
    const body = m[5];
    if (isCode) {
      outLines.push(`CODE 0x${offset} ${fileAddr}:${m[4]} ${body}`);
    } else {
      outLines.push(`DATA 0x${offset} ${fileAddr}:${m[4]} ${body}`);
    }
  } else if (/^\-+\s/.test(line)) {
    outLines.push(line.trim());
  } else {
    // 注释或段指令
    outLines.push(`;; ${line.trim()}`);
  }
}

fs.writeFileSync(out, outLines.join('\n'), 'utf8');
console.log(`done: ${outLines.length} lines -> ${out}`);
