// 临时脚本: 按行尾地址匹配提取 asm 地址段 (处理跨文件)
const fs = require('fs');
const path = require('path');
const targets = [
  { start: 0x8C00, lines: 0x130, label: 'bank28 8C00-8D2F (sub8C06+8C3B表+8C84表)' },
  { start: 0x8D30, lines: 0x100, label: 'bank28 8D30-8E2F (8D41/4E/55+sub8D58+8E1B)' },
  { start: 0x8680, lines: 0x70, label: 'bank28 8680-86EF (sub868E 003F分派表)' },
  { start: 0x8750, lines: 0x70, label: 'bank28 8750-87BF (sub875D/879C 003F分派表)' },
  { start: 0x8438, lines: 0x100, label: 'bank20 8438-8537 (sub8438 分派表)' },
  { start: 0x857A, lines: 0x80, label: 'bank20 857A-85F9 (sub857A 分派表)' },
];
function tailAddr(line) {
  // 行尾注释 ; $XXXX 是真实地址; 取最后一个 $XXXX
  const matches = [...line.matchAll(/\$([0-9A-F]{4})/gi)];
  if (!matches.length) return null;
  return parseInt(matches[matches.length - 1][1], 16);
}
let out = [];
for (const dir of ['asm/bank28', 'asm/bank20']) {
  for (const fname of fs.readdirSync(dir)) {
    if (!fname.endsWith('.s')) continue;
    const text = fs.readFileSync(path.join(dir, fname), 'utf8');
    for (const t of targets) {
      const which = t.label.startsWith('bank28') ? 'asm/bank28' : 'asm/bank20';
      if (dir !== which) continue;
      let buf = [];
      for (const line of text.split(/\r?\n/)) {
        const addr = tailAddr(line);
        if (addr === null) continue;
        if (addr >= t.start && addr < t.start + t.lines) buf.push(line);
      }
      if (buf.length) {
        out.push(`===== ${dir}/${fname} ${t.label} =====`);
        out.push(...buf);
        out.push('');
      }
    }
  }
}
fs.writeFileSync('_tmp_dump_out.txt', out.join('\n'));
console.log('done, lines=' + out.length);
