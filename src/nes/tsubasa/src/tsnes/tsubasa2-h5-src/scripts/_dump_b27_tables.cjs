const fs = require('fs');
const src = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts', 'utf8');
const m = src.match(/B27_DATA: readonly number\[\] = \[([\s\S]*?)\];/);
const raw = m[1];
const items = raw.split(',').map(s => s.trim()).filter(s => /^0x[0-9A-F]+$/i.test(s));
const D = items.map(s => parseInt(s, 16));
console.log('array len:', D.length);

function hex(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }

// 提取 CPU 地址 (物理偏移 = cpuAddr - 0x8000, 但 $A000 窗口 = cpuAddr - 0xA000)
function dumpCpu(cpuAddr, n, label) {
  const off = cpuAddr - 0xA000; // $A000 窗口
  console.log('--- ' + label + ' CPU $' + cpuAddr.toString(16).toUpperCase() + ' (off 0x' + off.toString(16) + ') ---');
  const rows = [];
  for (let i = 0; i < n; i += 16) {
    const line = [];
    for (let j = 0; j < 16 && i + j < n; j++) {
      line.push(hex(D[off + i + j]));
    }
    rows.push(line.join(' '));
  }
  console.log(rows.join('\n'));
}

dumpCpu(0xA1DC, 16, 'A1DC 递减表');
dumpCpu(0xA292, 48, 'A292 动画指针表(lo,hi)');
dumpCpu(0xA42A, 32, 'A42A 精灵动画指针表(lo,hi)');
dumpCpu(0xA6AD, 64, 'A6AD 场景指针lo表');
dumpCpu(0xAB65, 64, 'AB65 场景指针lo表');
