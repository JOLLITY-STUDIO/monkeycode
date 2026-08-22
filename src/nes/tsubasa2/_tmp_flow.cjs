const fs = require('fs');
const lines = fs.readFileSync('docs/trace/Captain Tsubasa II - Super Striker (Japan)-openning3.log', 'utf8').split('\n');

// Mesen trace 格式: 前缀$XX = 16KB bank号, 8KB块 = 2N/2N+1
// 提取每条指令的: Mesen bank, 地址, 操作, A/X/Y 值

// 找第一个画面完整执行流: 从第一个 STA $ED=2 开始, 到第一个 NMI 结束
// 先找第一个 STA $ED
let startIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('STA $ED') || lines[i].includes('STA $00ED')) {
    startIdx = i;
    break;
  }
}
if (startIdx < 0) { console.log('No STA $ED found'); process.exit(0); }

// 从 startIdx-30 开始看上下文
console.log('=== 开场第一个画面执行流 (L' + Math.max(1,startIdx-29) + '-L' + (startIdx+50) + ') ===');
for (let i = Math.max(0, startIdx-30); i < Math.min(lines.length, startIdx+50); i++) {
  const l = lines[i];
  // 解析 Mesen bank 前缀和地址
  const m = l.match(/\$(\w{2}):(\w{4}):\s*(\w+)\s+(\S+)/);
  if (m) {
    const mesenBank = parseInt(m[1], 16);
    const block8k = mesenBank * 2; // 16KB bank N = 8KB 块 2N
    const addr = m[2];
    const op = m[3];
    const operand = m[4];
    console.log(`L${i+1} [blk${block8k}/${block8k+1}] $${addr}: ${op} ${operand}  | ${l.substring(l.indexOf('=') >= 0 ? l.indexOf('=') : 0, l.length).trim().substring(0, 60)}`);
  }
}
