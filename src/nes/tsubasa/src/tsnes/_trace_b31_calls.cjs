// 分析 bank 31 中音频相关函数：$E59E, $E9FF, $F011
// 以及追踪它们的子函数调用
const fs = require('fs');
const path = require('path');

// 读取 bank 31 asm
const asm = fs.readFileSync(path.join(__dirname, '_tmp_bzk_out/bank_31.asm'), 'utf-8');
const lines = asm.split('\n');

// 解析所有地址映射
const addrMap = new Map(); // address -> {line, label}
for (const line of lines) {
  const m = line.match(/0F:([0-9A-F]{4}):\s+(.+)$/);
  if (m) {
    const addr = parseInt(m[1], 16);
    const bytes = m[2].trim();
    addrMap.set(addr, { bytes, line: line.trim() });
  }
}

// 找 $E59E 周围 200 字节
function dumpRange(start, len) {
  console.log(`\n=== $${start.toString(16).toUpperCase()} +${len}B ===`);
  for (let a = start; a < start + len; a++) {
    const info = addrMap.get(a);
    if (info) {
      console.log(`  $${a.toString(16).toUpperCase()}: ${info.bytes}`);
    }
  }
}

dumpRange(0xE59E, 100);
dumpRange(0xE9FF, 80);
dumpRange(0xF011, 50);

// 追踪 Bank 31 内部调用
// 收集 $E59E, $E9FF, $F011 调用的所有 Bank31 内部地址
console.log('\n=== 追踪子函数调用 ===');
const targets = new Set([0xE59E, 0xE9FF, 0xF011]);
const visited = new Set();
const callGraph = [];

function traceCalls(startAddr, depth) {
  if (depth > 5) return;
  for (let a = startAddr; a < startAddr + 200; a++) {
    const info = addrMap.get(a);
    if (!info) continue;
    const bytes = info.bytes;
    // JSR $xxxx = 20 xx xx
    if (bytes.match(/^20\s+([0-9A-F]{2})\s+([0-9A-F]{2})/)) {
      const addr = parseInt(`0x${RegExp.$2}${RegExp.$1}`, 16);
      if (addr >= 0xE000 && addr <= 0xFFEF && !visited.has(addr)) {
        visited.add(addr);
        targets.add(addr);
        callGraph.push({ caller: startAddr, callee: addr, depth });
        traceCalls(addr, depth + 1);
      }
    }
    // JMP $xxxx = 4C xx xx
    if (bytes.match(/^4C\s+([0-9A-F]{2})\s+([0-9A-F]{2})/)) {
      const addr = parseInt(`0x${RegExp.$2}${RegExp.$1}`, 16);
      if (addr >= 0xE000 && addr <= 0xFFEF && !visited.has(addr)) {
        visited.add(addr);
        targets.add(addr);
        callGraph.push({ caller: startAddr, callee: addr, depth, isJump: true });
        traceCalls(addr, depth + 1);
      }
    }
    // RTS = 60 => stop
    if (bytes.match(/^60$/)) break;
  }
}

for (const t of [0xE59E, 0xE9FF, 0xF011]) {
  visited.add(t);
  traceCalls(t, 0);
}

console.log(`音频相关函数入口: ${[...targets].length} 个`);
console.log([...targets].sort((a, b) => a - b).map(a => '$' + a.toString(16).toUpperCase()).join(', '));

// 找出每个函数覆盖的最小范围
console.log('\n函数范围:');
const sorted = [...targets].sort((a, b) => a - b);
for (const addr of sorted) {
  let end = addr;
  for (let a = addr; a < addr + 500; a++) {
    if (addrMap.has(a)) {
      const bytes = addrMap.get(a).bytes;
      end = a;
      if (bytes.match(/^(60|4C)/)) break;
    } else {
      break;
    }
  }
  console.log(`  $${addr.toString(16).toUpperCase()} - $${end.toString(16).toUpperCase()} (${end-addr+1}B)`);
}
