// 从 bank00.asm 提取更多子程序区段（文本行匹配法）
const fs = require('fs');
const path = require('path');

const asm = fs.readFileSync(path.join(__dirname, 'bank_00.asm'), 'utf8');
const lines = asm.split('\n');

// 匹配 "00:XXXX:" 形式的地址标签（在行中的某个位置）
function extract(addr, len, name) {
  // 找行包含 ":<addr>:" 且后面有指令
  const pat = new RegExp(addr + ':');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(':' + addr + ':') || lines[i].includes(addr + ':')) {
      // 确认是地址标签而非数据: 检查是否有两个 hex 字节+助记符
      if (/[0-9A-Fa-f]{2} [0-9A-Fa-f]{2} [0-9A-Fa-f]{2}/.test(lines[i])) { start = i; break; }
    }
  }
  if (start < 0) { console.log(`!! ${name} @${addr}: NOT FOUND`); return; }
  // 收集直到地址超过 addr+len
  const out = [];
  let cur = parseInt(addr, 16);
  let end = addr + len;
  for (let i = start; i < lines.length; i++) {
    const m = lines[i].match(/([0-9A-F]{4}):\s+((?:[0-9A-F]{2} ){1,3})\s+(\S.*)$/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= parseInt(addr,16) && a < parseInt(addr,16) + len) {
        out.push(lines[i]);
      }
    }
  }
  console.log(`\n===== ${name} @$${addr} =====`);
  console.log(out.join('\n'));
}

extract('98E8', 0x60, '98E8-ppuWrite');
extract('9071', 0x30, '9071-helper');
extract('8B93', 0x90, '8B93-sceneload-tail');
extract('8976', 0x30, '8976-palDMA');
