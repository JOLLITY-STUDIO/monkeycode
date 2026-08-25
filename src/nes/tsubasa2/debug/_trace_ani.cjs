// 分析动画场景 trace：分段结构 + 关键状态 (v2 单行格式)
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8').split(/\r?\n/);
const lines = [];
for (const l of t) {
  const m = /^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2}) P:(\S+)\s+\$?([0-9A-F]{2})?:?([0-9A-F]{4}):\s*(.+)$/.exec(l);
  if (m) lines.push({ f: +m[1], a: m[4], x: m[5], y: m[6], bank: m[9], pc: m[10], asm: m[11] });
}
console.log('parsed', lines.length, 'instructions');

const watch = [
  { re: /STA \(\$94\),Y @ \$0568/, name: 'script[0]' },
  { re: /STA \$4A = /, name: 'fadeA' },
  { re: /STA \$4B = /, name: 'fadeB' },
  { re: /ADC \$4A = /, name: 'use4A' },
  { re: /STA \$062A,/, name: 'palSrc' },
  { re: /STA \$4D = /, name: 'ptrLo' },
  { re: /STA \$4E = /, name: 'ptrHi' },
  { re: /STA \$ED = /, name: 'ED' },
  { re: /STA \$25 = /, name: 'S25' },
  { re: /STA \$0468,/, name: 'sprX' },
  { re: /STA \$046B,/, name: 'sprY' },
  { re: /STA \$046A,/, name: 'sprDir' },
  { re: /JSR \$9085/, name: 'ani_init' },
  { re: /STA \$2007 = /, name: 'ntWrite' },
  { re: /STA \$2006 = /, name: 'ntAddr' },
  { re: /LDA \(\$4D\),Y @ \$A/, name: 'stream' },
];

const hits = {};
for (const w of watch) hits[w.name] = [];
for (const l of lines) {
  for (const w of watch) {
    if (w.re.test(l.asm)) {
      const h = hits[w.name];
      if (h.length && h[h.length - 1].f === l.f && (w.name === 'ntWrite' || w.name === 'stream' || w.name === 'use4A')) {
        h[h.length - 1].n = (h[h.length - 1].n || 1) + 1;
        if (w.name === 'stream' && h[h.length - 1].n < 8) h[h.length - 1].d += ' | ' + l.asm.trim().slice(0, 60);
      } else {
        h.push({ f: l.f, d: l.asm.trim().slice(0, 80), n: 0 });
      }
    }
  }
}

for (const w of watch) {
  const h = hits[w.name];
  if (!h.length) continue;
  console.log('\n=== ' + w.name + ' (' + h.length + ' 事件) ===');
  let lastF = -1, shown = 0;
  for (const e of h) {
    if (e.f !== lastF) {
      console.log('  f' + e.f + (e.n ? ' x' + e.n : '') + ': ' + e.d.slice(0, 120));
      lastF = e.f;
      if (++shown > 80) { console.log('  ... 截断'); break; }
    }
  }
}
