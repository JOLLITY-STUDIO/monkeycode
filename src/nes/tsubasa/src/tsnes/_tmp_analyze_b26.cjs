// 分析 bank_26.asm: 提取指令、函数边界、跳转表
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_26.asm', 'utf8').split('\n');

// 解析每行: 0xPRGOFF PRG:8000: XX XX OP ARG
const parsed = [];
for (const l of lines) {
  const m = l.match(/0x([0-9A-F]{6})\s+([0-9A-F]{2}):([0-9A-F]{4}):\s+((?:[0-9A-F]{2} ){1,3})(.*?)\s*$/);
  if (!m) continue;
  parsed.push({
    prg: parseInt(m[1], 16),
    cpu: parseInt(m[3], 16),
    bytes: m[4].trim(),
    text: m[5].trim(),
    raw: l,
  });
}

console.log('total instr lines:', parsed.length);

// 收集跳转表 (JMP 直接跳转目标) — 入口候选
const jumps = new Map();
const jsrs = new Map();
for (const p of parsed) {
  const tm = p.text.match(/JMP \$([0-9A-F]{4})/);
  const sm = p.text.match(/JSR \$([0-9A-F]{4})/);
  if (tm) { const t = tm[1]; jumps.set(t, (jumps.get(t) || 0) + 1); }
  if (sm) { const t = sm[1]; jsrs.set(t, (jsrs.get(t) || 0) + 1); }
}

// 打印 JMP/JSR 目标统计 (热区)
console.log('\n=== JMP targets (top) ===');
[...jumps.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => console.log(`$${k}: ${v}`));

console.log('\n=== JSR targets (top) ===');
[...jsrs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, v]) => console.log(`$${k}: ${v}`));

// 函数候选: 被 JSR/JMP 引用
const funcCands = new Set();
for (const k of jumps.keys()) funcCands.add(k);
for (const k of jsrs.keys()) funcCands.add(k);

console.log('\n=== candidate funcs count:', funcCands.size);
console.log([...funcCands].sort().join(' '));
