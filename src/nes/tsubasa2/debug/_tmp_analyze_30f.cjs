/**
 * _tmp_analyze_30f.cjs — 分析开场 30 帧 CPU trace:
 * 1. bank 窗口指令数分布 (前 20 个热点)
 * 2. 帧边界推断 (从指令数变化)
 * 3. JSR/JMP 目标热点 (可切窗口区 $8000-$BFFF 的调用)
 */
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'trace/opening-30f-cpu.log');
const lines = fs.readFileSync(file, 'utf8').split('\n');

const bankCount = {};      // "mesenBank:pcHi" → 指令数
const jumpTargets = {};    // "JSR/JMP $XXXX" → 次数
const addrVisits = {};     // 窗口指令地址 (bank*0x4000+pc) 热点
let total = 0;

for (const line of lines) {
  // i{count}  ${bank}:{pc}: {bytes} {mnemonic} {operand} ...
  const m = line.match(/^i\d+\s+\$(\w\w):([0-9A-F]{4}):\s+([0-9A-F ]+?)\s+(\w+)\s+(.*)$/);
  if (!m) continue;
  const bank = m[1];
  const pc = parseInt(m[2], 16);
  const mnem = m[4];
  const operand = m[5];
  total++;

  const key = '$' + bank + ':' + pc.toString(16).toUpperCase().padStart(4, '0');
  bankCount[key] = (bankCount[key] || 0) + 1;

  if (mnem === 'JSR' || mnem === 'JMP') {
    const tm = operand.match(/^\$([0-9A-F]{4})/i);
    if (tm) {
      const target = parseInt(tm[1], 16);
      if (target >= 0x8000 && target < 0xc000) {
        const jk = mnem + ' $' + target.toString(16).toUpperCase().padStart(4, '0');
        jumpTargets[jk] = (jumpTargets[jk] || 0) + 1;
      }
    }
  }
}

console.log('总指令数: ' + total);
console.log('\n=== 执行热点 (bank:pc) 前 30 ===');
const sorted = Object.entries(bankCount).sort((a, b) => b[1] - a[1]);
for (const [k, v] of sorted.slice(0, 30)) {
  console.log('  ' + k + ' ×' + v);
}

console.log('\n=== JSR/JMP 目标热点 ($8000-$BFFF 窗口区) 前 40 ===');
const jSorted = Object.entries(jumpTargets).sort((a, b) => b[1] - a[1]);
for (const [k, v] of jSorted.slice(0, 40)) {
  console.log('  ' + k + ' ×' + v);
}

// bank 窗口整体分布
console.log('\n=== bank 窗口指令数分布 ===');
const bankAgg = {};
for (const [k, v] of sorted) {
  const bk = k.split(':')[0];
  bankAgg[bk] = (bankAgg[bk] || 0) + v;
}
for (const [k, v] of Object.entries(bankAgg).sort((a, b) => b[1] - a[1])) {
  console.log('  $' + k + ' ×' + v);
}
