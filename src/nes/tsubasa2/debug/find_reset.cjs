const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.resolve(__dirname, 'trace/mmc3.log'), 'utf8').split('\n').filter(l => l.length > 0);

// 找 RESET 特征: STA $8000=$06 + STA $8001=$00 (R6=bank0) 然后 STA $8000=$07 + STA $8001=$02 (R7=bank2)
// 这是 $C4C0/$C4C3 的初始化序列
console.log('=== R6/R7 bank 切换序列 (去重连续相同) ===');
let prevR6 = -1, prevR7 = -1;
let resetCount = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // PRG_8000 (R6)
  const m6 = l.match(/PRG_8000=#\$(\w{2}) .*8KB\xe5\x9d\x97(\d+)/);
  if (m6) {
    const val = parseInt(m6[1], 16);
    const block = parseInt(m6[2]);
    if (block !== prevR6) {
      const ii = l.match(/i(\d+)/)?.[1] || '?';
      console.log(`i${ii} R6=bank${block} ($${val.toString(16).toUpperCase().padStart(2,'0')})`);
      prevR6 = block;
      // R6=0 可能是 RESET
      if (block === 0 && prevR7 === 2) resetCount++;
    }
  }
  // PRG_A000 (R7)
  const m7 = l.match(/PRG_A000=#\$(\w{2}) .*8KB\xe5\x9d\x97(\d+)/);
  if (m7) {
    const val = parseInt(m7[1], 16);
    const block = parseInt(m7[2]);
    if (block !== prevR7) {
      const ii = l.match(/i(\d+)/)?.[1] || '?';
      console.log(`i${ii} R7=bank${block} ($${val.toString(16).toUpperCase().padStart(2,'0')})`);
      prevR7 = block;
    }
  }
}

console.log('\n=== RESET 检测 (R6=0 后 R7=2) ===');
console.log('检测到 ' + resetCount + ' 次 RESET 模式');

// 也找 $0F:FFF1 (RESET 向量区代码)
console.log('\n=== RESET 向量区 ($0F:FFxx) 执行 ===');
let resetVecCount = 0;
for (const l of lines) {
  if (l.includes('$0F:FF')) {
    resetVecCount++;
    if (resetVecCount <= 5) console.log('  ' + l.substring(l.indexOf(']') + 1).trim());
  }
}
console.log('RESET 向量区执行次数: ' + resetVecCount);
