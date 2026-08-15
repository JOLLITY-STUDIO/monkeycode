/** 搜索 bank29 (#$1D) 切换代码 + bank29 数据被读取的方式 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

// 1) 所有 #$1D 出现的位置
console.log('=== 所有 #$1D (bank29编号) 出现位置 ===');
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    if (/#\$1D\b/i.test(t[i])) {
      const ctx = t.slice(Math.max(0, i - 1), i + 2).join(' || ');
      console.log('[' + f + ' L' + (i + 1) + '] ' + ctx);
    }
  }
}

// 2) 搜索间接读取 (LDA ($xx),Y) 的模式 —— 太多。改为搜索 ram 指针表
//    直接看 bank_00.asm 中 $9Bxx 附近的实际代码，了解这些地址是不是 bank00 内部代码
console.log('\n=== bank_00.asm $9B10-$9C00 区域前几行 ===');
const b0 = fs.readFileSync(path.join(dir, 'bank_00.asm'), 'utf8').split(/\r?\n/);
for (let i = 0; i < b0.length; i++) {
  if (/00:9B(1[0-9A-F]|2|3|4|5|6|7|8|9|A|B|C|D|E|F)/.test(b0[i])) {
    console.log(b0[i].trim());
    if (++i > 12) break;
  }
}
