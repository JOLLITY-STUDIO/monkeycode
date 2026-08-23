/**
 * _tmp_analyze_30f2.cjs — 分析开场 30 帧 trace 的关键地址执行情况
 * 1. $801E 区域 (bank0 首次运行协程) 是否执行
 * 2. $A8D4 热点循环是什么
 * 3. JSR/JMP 目标统计 (修正正则)
 * 4. 帧数/指令数分段 (推断每帧指令数)
 */
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'trace/opening-30f-cpu.log');
const lines = fs.readFileSync(file, 'utf8').split('\n');

const jumpTargets = {};
const executed = new Set();
let total = 0;
const addrSeq = [];

for (const line of lines) {
  const m = line.match(/^i(\d+)\s+\$(\w\w):([0-9A-F]{4}):\s+[0-9A-F ]+\s+(\w+)\s+(.*)$/);
  if (!m) continue;
  const count = parseInt(m[1]);
  const bank = m[2];
  const pc = parseInt(m[3], 16);
  const mnem = m[4];
  const operand = m[5];
  total++;

  const key = '$' + bank + ':' + pc.toString(16).toUpperCase().padStart(4, '0');
  executed.add(key);
  if (addrSeq.length < 500000) addrSeq.push(count);

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

console.log('总指令数: ' + total + ', 唯一地址: ' + executed.size);

console.log('\n=== JSR/JMP 目标 ($8000-$BFFF) 前 50 ===');
Object.entries(jumpTargets)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50)
  .forEach(([k, v]) => console.log('  ' + k + ' ×' + v));

console.log('\n=== $801E-$80D1 区域执行检查 (bank0) ===');
const s = [];
for (const k of executed) {
  const [bk, pcHex] = k.split(':');
  const pcV = parseInt(pcHex, 16);
  if (pcV >= 0x801e && pcV <= 0x80d1) s.push(k);
}
console.log(s.length ? s.slice(0, 40).join(' ') : '(未执行 $801E 区域)');

console.log('\n=== $A8D4 区域执行检查 ===');
const a = [];
for (const k of executed) {
  const [bk, pcHex] = k.split(':');
  const pcV = parseInt(pcHex, 16);
  if (pcV >= 0xa8d0 && pcV <= 0xa900) a.push(k);
}
console.log(a.length ? a.slice(0, 40).join(' ') : '(未执行 $A8D4 区域)');

console.log('\n=== $82EC-$8387 区域执行检查 (bank0 场景装载器) ===');
const z = [];
for (const k of executed) {
  const [bk, pcHex] = k.split(':');
  const pcV = parseInt(pcHex, 16);
  if (pcV >= 0x82ec && pcV <= 0x8387) z.push(k);
}
console.log(z.length ? z.slice(0, 40).join(' ') : '(未执行 $82EC)');

console.log('\n=== $9085-$9142 区域执行检查 (场景数据装载器) ===');
const g = [];
for (const k of executed) {
  const [bk, pcHex] = k.split(':');
  const pcV = parseInt(pcHex, 16);
  if (pcV >= 0x9085 && pcV <= 0x9142) g.push(k);
}
console.log(g.length ? g.slice(0, 40).join(' ') : '(未执行 $9085)');
