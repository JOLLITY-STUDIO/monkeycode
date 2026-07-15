import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('=== 函数映射分析 ===\n');

// 从execution-trace.md中提取已识别的函数
const tracePath = path.join(__dirname, '..', 'docs', 'execution-trace.md');
const traceContent = fs.readFileSync(tracePath, 'utf8');

const identifiedFunctions = new Map();

// 提取FUN_xxxx模式和对应的描述
const patterns = [
  /FUN_00([0-9a-f]+)[^\n]*[：:]\s*([^\n]+)/g,
  /FUN_00([0-9a-f]+)[^\n]*\(\)[^\n]*\/\/\s*([^\n]+)/g,
  /(\$|0x)([0-9a-fA-F]{5,6})[^\n]*[（(]([^)）]+)[)）]/g,
];

for (const pattern of patterns) {
  let match;
  while ((match = pattern.exec(traceContent)) !== null) {
    const addr = parseInt(match[1] || match[2], 16);
    const desc = match[3] || match[2] || '';
    if (addr && desc && desc.length > 2) {
      const key = '0x' + addr.toString(16).padStart(6, '0');
      if (!identifiedFunctions.has(key)) {
        identifiedFunctions.set(key, desc.trim());
      }
    }
  }
}

console.log(`从execution-trace.md提取了 ${identifiedFunctions.size} 个已识别函数\n`);

// 读取Ghidra反编译文件，提取所有函数
const ghidraPath = path.join(__dirname, '..', 'ghidra-decompile.c');
const ghidraContent = fs.readFileSync(ghidraPath, 'utf8');

const allFuncMatches = ghidraContent.match(/^\w+\s+FUN_00([0-9a-f]+)\s*\(/gm);
const allFuncs = new Set();
if (allFuncMatches) {
  for (const m of allFuncMatches) {
    const addrMatch = m.match(/FUN_00([0-9a-f]+)/);
    if (addrMatch) {
      allFuncs.add(parseInt(addrMatch[1], 16));
    }
  }
}

console.log(`Ghidra识别的总函数数: ${allFuncs.size}`);

// 按模块分类
const modules = [
  { name: '硬件初始化', start: 0x00000, end: 0x01000 },
  { name: 'VDP/显示', start: 0x01000, end: 0x02000 },
  { name: '主循环/任务系统', start: 0x08000, end: 0x0A000 },
  { name: '场景/状态管理', start: 0x0A000, end: 0x0C000 },
  { name: 'UI渲染/菜单', start: 0x0C000, end: 0x0E000 },
  { name: '名称输入', start: 0x0C800, end: 0x0D000 },
  { name: '地图系统', start: 0x10000, end: 0x18000 },
  { name: '战斗系统', start: 0x18000, end: 0x20000 },
  { name: '角色/单位管理', start: 0x20000, end: 0x28000 },
  { name: '装备/道具', start: 0x28000, end: 0x30000 },
  { name: '魔法系统', start: 0x30000, end: 0x38000 },
  { name: 'AI系统', start: 0x40000, end: 0x50000 },
  { name: '存档系统', start: 0x50000, end: 0x58000 },
  { name: '音效系统', start: 0x90000, end: 0xA0000 },
  { name: 'Z80音频驱动', start: 0x1EC000, end: 0x200000 },
];

console.log('\n--- 按模块统计函数 ---');
for (const mod of modules) {
  const count = [...allFuncs].filter(a => a >= mod.start && a < mod.end).length;
  const identified = [...identifiedFunctions.keys()].filter(k => {
    const addr = parseInt(k, 16);
    return addr >= mod.start && addr < mod.end;
  }).length;
  const pct = allFuncs.size ? ((count / allFuncs.size) * 100).toFixed(1) : '0';
  console.log(`  ${mod.name.padEnd(18)}: ${count.toString().padStart(4)} 个 (${pct}%) - 已识别 ${identified} 个`);
}

// 导出已识别的函数列表
console.log('\n--- 已识别的函数列表 ---');
const sortedFuncs = [...identifiedFunctions.entries()].sort((a, b) => {
  return parseInt(a[0], 16) - parseInt(b[0], 16);
});

for (const [addr, desc] of sortedFuncs.slice(0, 30)) {
  console.log(`  ${addr}: ${desc.substring(0, 50)}`);
}

if (sortedFuncs.length > 30) {
  console.log(`  ... 还有 ${sortedFuncs.length - 30} 个`);
}

// 生成函数映射表JSON
const funcMap = {};
for (const [addr, desc] of identifiedFunctions) {
  funcMap[addr] = desc;
}

const outputPath = path.join(__dirname, '..', 'game', 'data', 'function-map.json');
fs.writeFileSync(outputPath, JSON.stringify(funcMap, null, 2));
console.log(`\n函数映射表已保存到: ${outputPath}`);

console.log('\n=== 分析完成 ===');
