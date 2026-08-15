/** 找出所有切换 bank29 (#$1D) 的代码位置 + 查看 bank29 数据结构 */
const fs = require('fs');
const path = require('path');

const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

// MMC3: STA $8000 (select) / LDA #$1D / STA $8001 (data)
// 模式A: lda #$1d 后紧跟 sta $8001
const patternA = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (/LDA\s+#\$1D\s*$/i.test(l)) {
      const next = t[i + 1] || '';
      const prev = t[i - 1] || '';
      if (/STA\s+\$8001/i.test(next)) {
        patternA.push({ f, line: i + 1, ctx: (prev + '\n' + l + '\n' + next).trim() });
      }
    }
  }
}
console.log('=== 模式A: LDA #$1D + STA $8001 ===');
console.log('total:', patternA.length);
patternA.slice(0, 30).forEach(h => console.log('[' + h.f + ' L' + h.line + ']\n' + h.ctx + '\n---'));

// 模式B: 通过 ram 变量切 bank: lda ram_xxxx / sta $8001，然后看 ram_xxxx 常量
// 先列出所有 bank_xx.asm 里的 .byte 数据引用模式 —— 太难。改为：
// 找出所有 "sta $8001" 之前 2 行的 lda 立即数，统计所有 bank 编号
const bankMap = {};
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    if (/STA\s+\$8001/i.test(t[i])) {
      // 向上找最近的 LDA #$XX
      for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
        const m = t[j].match(/LDA\s+#\$([0-9A-F]{2})\s*$/i);
        if (m) {
          const bank = parseInt(m[1], 16);
          if (bank < 64) {
            if (!bankMap[bank]) bankMap[bank] = [];
            bankMap[bank].push(f + ' L' + (j + 1));
          }
          break;
        }
      }
    }
  }
}
console.log('\n=== 各 bank 编号被加载的位置 (编号 -> 加载位置) ===');
Object.entries(bankMap).sort((a, b) => a[0] - b[0]).forEach(([b, arr]) => {
  console.log('bank#' + b + ' (' + (b.toString(16).toUpperCase()) + ') x' + arr.length + ': ' + [...new Set(arr)].slice(0, 8).join(', '));
});
