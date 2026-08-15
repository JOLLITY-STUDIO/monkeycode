/** 查看消费方 bank 中读取 bank29 数据区 ($9B1A-$9CEE) 的代码上下文 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';

function show(fname, pattern, max = 12) {
  const t = fs.readFileSync(path.join(dir, fname), 'utf8').split(/\r?\n/);
  let cnt = 0;
  for (let i = 0; i < t.length && cnt < max; i++) {
    const m = t[i].match(pattern);
    if (m && !/^[0-9A-F]{4}:/.test(t[i].replace(/^.*?([0-9A-F]{4}:)/, ''))) {
      // 跳过纯数据行
    }
    if (m && /(LDA|STA|LDX|STX|LDY|STY|CMP|JSR|JMP|ADC|SBC)\s+\$(9B|9C)/i.test(t[i])) {
      console.log('--- ' + fname + ' L' + (i + 1) + ' ---');
      console.log(t.slice(Math.max(0, i - 3), i + 4).join('\n'));
      cnt++;
    }
  }
  console.log('\n==== ' + fname + ' total shown: ' + cnt + ' ====\n');
}

show('bank_02.asm', /\$9[BC]/i, 6);
show('bank_26.asm', /\$9[BC]/i, 8);
show('bank_01.asm', /\$9[BC]/i, 6);
