// 在 bank30/31 asm 中定位固定区 $C500+ 函数定义
const fs = require('fs');
const targets = ['C509', 'C50C', 'C515', 'C52D', 'C536', 'C539', 'C54E', 'C575', 'CB99', 'CD7C', 'CB0F', 'CC46', 'CDC9', 'CDE2', 'CBB0', 'E233', 'C6BE'];
for (const f of ['bank_30.asm', 'bank_31.asm']) {
  const t = fs.readFileSync('_tmp_bzk_out/' + f, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = [];
  for (const l of lines) {
    for (const tg of targets) {
      // 查找 CPU 地址格式 "xx:YYYY:" 中 YYYY 命中目标
      const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4}):/);
      if (m && m[2] === tg) { hits.push(l.trim().slice(0, 110)); break; }
      // 也查找 JMP $XXXX 引用
      if (l.includes('$' + tg)) { hits.push('REF> ' + l.trim().slice(0, 110)); break; }
    }
  }
  console.log('=== ' + f + ' (' + hits.length + ' hits) ===');
  for (const h of hits.slice(0, 40)) console.log(h);
  console.log();
}
