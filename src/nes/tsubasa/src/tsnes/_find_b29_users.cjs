/**
 * 找出哪些 bank 加载了 bank29 (#$1D) 以及哪些地址被引用
 * bank29 数据被映射在 $8000-$9FFF (MMC3 PRG 窗口)
 */
const fs = require('fs');
const path = require('path');

const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));
const hits = [];

// 1) 查找 MMC3 bank select: lda #$XX / sta $A000 (bank 编号 -> PRG)
//    MMC3 写 $A000 的时机：sta $8001 设置 bank select 寄存器，sta $A000 提交 bank 编号
//    实际 Tsubasa 使用的可能是 mirror of $8000
const bankSwitchRe = /^\s*LDA\s+#\$(1D|29|0D)\b/im;

for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    // MMC3: 设置 bank select 编号 (#$1D 是 PRG 编号? MMC3 PRG bank 值在 $8000/$A000)
    const sw = l.match(/^\s*(LDA|LDX|LDY)\s+#\$1D\s*$/i);
    if (sw) {
      // 向前后各看 4 行确认是不是 sta $A000/$8000
      const ctx = t.slice(Math.max(0, i - 4), i + 5);
      if (ctx.some(c => /STA\s+\$(?:8000|8001|A000|A001)/i.test(c))) {
        hits.push({ f, line: i + 1, ctx: ctx.join(' | ') });
      }
    }
  }
}

console.log('=== MMC3 bank select #$1D hits ===');
console.log('total:', hits.length);
hits.slice(0, 30).forEach(h => console.log(h.f + ' L' + h.line + ' :: ' + h.ctx));

// 2) 查找直接引用 $9xxx 地址（bank29 映射窗口）的代码
//    bank29 切到 $8000 后，数据在 $8000-$9FFF
const refHits = [];
const addrRe = /\b(?:LDA|STA|LDX|STX|LDY|STY|CMP|JSR|JMP)\s+\$(?:8000|8[0-9A-F]{3}|9[0-9A-F]{3})/i;
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    const m = l.match(addrRe);
    if (m) {
      refHits.push({ f, line: i + 1, txt: l.trim() });
    }
  }
}
console.log('\n=== 引用 $8000-$9FFF 地址(潜在bank29窗口) ===');
console.log('total:', refHits.length);
const grouped = {};
refHits.forEach(h => { grouped[h.f] = (grouped[h.f] || 0) + 1; });
console.log(Object.entries(grouped).sort((a, b) => b[1] - a[1]).join('\n'));
