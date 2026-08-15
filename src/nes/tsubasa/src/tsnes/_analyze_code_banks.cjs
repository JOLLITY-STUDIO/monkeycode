/**
 * 分析 6 个待翻译 Bank (11/16/19/20/22/27) 的 asm code 结构:
 * - 提取所有 C(code) 标记行的地址区间 (code 段)
 * - 提取跳转表 (开头的 JMP 序列)
 * - 收集所有被 JSR/JMP 调用的本地入口
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '_tmp_bzk_out');
const BANKS = [11, 16, 19, 20, 22, 27];

function parseAsm(file) {
  const raw = fs.readFileSync(file, 'utf8');
  // 行以 \r 分隔, \n 是续行符 → 替换为空格
  const lines = raw.split('\r').map(l => l.replace(/\n/g, ' ').trim());
  const code = [];
  for (const line of lines) {
    if (!line.startsWith('C - - - - - ')) continue;
    const m = line.match(/^C - - - - - 0x([0-9A-F]{6}) ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$/);
    if (!m) continue;
    const addr = parseInt(m[3], 16);
    const rest = m[4];
    const parts = rest.split(/\s{2,}/);
    let op = '', operand = '';
    if (parts.length >= 2) { op = parts[1].trim(); operand = parts.slice(2).join(' ').trim(); }
    else { op = parts[0] ? parts[0].trim() : ''; }
    code.push({ addr, op, operand });
  }
  return code;
}

for (const b of BANKS) {
  const file = path.join(DIR, `bank_${String(b).padStart(2, '0')}.asm`);
  if (!fs.existsSync(file)) { console.log(`MISSING ${file}`); continue; }
  const code = parseAsm(file);
  console.log(`\n══════ Bank ${b} ══════ code lines: ${code.length}`);

  // 1. 连续 code 段 (gap <= 8 bytes 视为连续)
  const segments = [];
  let cur = null;
  for (const c of code) {
    if (!cur) { cur = { start: c.addr, end: c.addr }; }
    else if (c.addr - cur.end <= 8) { cur.end = c.addr; }
    else { segments.push(cur); cur = { start: c.addr, end: c.addr }; }
  }
  if (cur) segments.push(cur);
  console.log(`--- code 段 (${segments.length}):`);
  for (const s of segments) {
    const bytes = s.end - s.start + 1;
    console.log(`    $${s.start.toString(16)}-$${s.end.toString(16)}  (${bytes} B)`);
  }

  // 2. 前 16 条指令 (通常含跳转表)
  console.log(`--- 前 16 条指令:`);
  for (const c of code.slice(0, 16)) {
    console.log(`    $${c.addr.toString(16)}: ${c.op} ${c.operand}`.trim());
  }

  // 3. 被 JSR/JMP 调用的本地入口
  const jsr = new Map(), jmp = new Map();
  for (const c of code) {
    const t = c.operand.match(/\$([0-9A-F]{4})/i);
    if (!t) continue;
    const a = parseInt(t[1], 16);
    if (a < 0x8000 || a >= 0xC000) continue;
    const map = c.op === 'JSR' ? jsr : jmp;
    map.set(a, (map.get(a) || 0) + 1);
  }
  const fmt = (map) => [...map.entries()].sort((a, b) => a[0] - b[0])
    .map(([a, n]) => `$${a.toString(16)}×${n}`).join(' ');
  console.log(`--- 本地 JSR 目标 (${jsr.size}): ${fmt(jsr)}`);
  console.log(`--- 本地 JMP 目标 (${jmp.size}): ${fmt(jmp)}`);
}
