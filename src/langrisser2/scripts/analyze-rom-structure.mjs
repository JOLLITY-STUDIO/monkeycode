import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

console.log('=== ROM 结构分析 ===\n');

const ROM_SIZE = rom.length;
console.log(`ROM 总大小: ${ROM_SIZE} 字节 (${(ROM_SIZE / 1024 / 1024).toFixed(2)} MB)`);

// 分析ROM头部
console.log('\n--- ROM 头部信息 ---');
console.log(`SSP (初始栈指针): 0x${((rom[0]<<24)|(rom[1]<<16)|(rom[2]<<8)|rom[3]).toString(16)}`);
console.log(`Reset 向量: 0x${((rom[4]<<24)|(rom[5]<<16)|(rom[6]<<8)|rom[7]).toString(16)}`);

// 读ROM头
const readStr = (addr, len) => {
  let s = '';
  for (let i = 0; i < len; i++) {
    const b = rom[addr + i];
    if (b >= 0x20 && b <= 0x7E) s += String.fromCharCode(b);
    else s += '.';
  }
  return s;
};

console.log(`SEGA 标志: ${readStr(0x100, 4)}`);
console.log(`厂商: ${readStr(0x110, 16)}`);
console.log(`游戏名(日): ${readStr(0x120, 48)}`);
console.log(`游戏名(美): ${readStr(0x150, 48)}`);
console.log(`产品编号: ${readStr(0x180, 14)}`);
console.log(`国别: ${readStr(0x1F0, 1)}`);

// 分析Ghidra反编译的函数
console.log('\n--- Ghidra 反编译函数统计 ---');

const ghidraPath = path.join(__dirname, '..', 'ghidra-decompile.c');
const ghidraContent = fs.readFileSync(ghidraPath, 'utf8');

const funcMatches = ghidraContent.match(/FUN_00([0-9a-f]+)/g);
const funcSet = new Set(funcMatches || []);
console.log(`函数总数: ${funcSet.size}`);

const funcAddrs = [...funcSet].map(f => parseInt(f.substring(4), 16)).sort((a, b) => a - b);
console.log(`第一个函数: 0x${funcAddrs[0].toString(16)}`);
console.log(`最后一个函数: 0x${funcAddrs[funcAddrs.length - 1].toString(16)}`);

// 按区域统计函数
const regions = [
  { name: '启动/初始化', start: 0x00000, end: 0x01000 },
  { name: 'VDP/硬件IO', start: 0x01000, end: 0x02000 },
  { name: '主循环/任务调度', start: 0x08000, end: 0x0A000 },
  { name: '场景管理', start: 0x0A000, end: 0x0C000 },
  { name: 'UI/菜单渲染', start: 0x0C000, end: 0x10000 },
  { name: '地图/战斗系统', start: 0x10000, end: 0x20000 },
  { name: '角色/单位系统', start: 0x20000, end: 0x30000 },
  { name: '魔法/道具系统', start: 0x30000, end: 0x40000 },
  { name: 'AI系统', start: 0x40000, end: 0x50000 },
  { name: '存档系统', start: 0x50000, end: 0x60000 },
];

console.log('\n--- 函数按区域分布 ---');
let totalCodeFuncs = 0;
for (const region of regions) {
  const count = funcAddrs.filter(a => a >= region.start && a < region.end).length;
  totalCodeFuncs += count;
  const pct = ((count / funcSet.size) * 100).toFixed(1);
  console.log(`  0x${region.start.toString(16).padStart(5, '0')}-0x${region.end.toString(16).padStart(5, '0')} ${region.name.padEnd(15)}: ${count.toString().padStart(4)} 个函数 (${pct}%)`);
}

// 分析数据区域
console.log('\n--- 数据区域识别 ---');

const dataRegions = [
  { name: '资源表', start: 0x0B0000, end: 0x0B8000, type: 'pointers' },
  { name: '图形/精灵数据', start: 0x0B8000, end: 0x090000, type: 'graphics' },
  { name: '音乐数据(Z80)', start: 0x1EC000, end: 0x200000, type: 'music' },
];

// 统计0x050000-0x080000区域的数据特征
console.log('\n--- 0x05E000-0x080000 区域数据分析 ---');

let asciiCount = 0;
let highByteCount = 0;
let zeroCount = 0;
let ffCount = 0;

for (let i = 0x5E000; i < 0x80000; i++) {
  const b = rom[i];
  if (b === 0) zeroCount++;
  else if (b === 0xFF) ffCount++;
  else if (b >= 0x20 && b <= 0x7E) asciiCount++;
  else if (b >= 0x80) highByteCount++;
}

const total = 0x80000 - 0x5E000;
console.log(`区域大小: ${total} 字节`);
console.log(`ASCII字符: ${asciiCount} (${((asciiCount/total)*100).toFixed(1)}%)`);
console.log(`高字节(日文): ${highByteCount} (${((highByteCount/total)*100).toFixed(1)}%)`);
console.log(`0x00: ${zeroCount} (${((zeroCount/total)*100).toFixed(1)}%)`);
console.log(`0xFF: ${ffCount} (${((ffCount/total)*100).toFixed(1)}%)`);

// 查找对话脚本指针表
console.log('\n--- 搜索对话脚本数据 ---');

// 查找0x060400附近的日文文本
let hasText = false;
for (let addr = 0x60400; addr < 0x60600; addr += 32) {
  let line = '';
  let highByteInLine = 0;
  for (let i = 0; i < 32; i++) {
    const b = rom[addr + i];
    if (b >= 0x80 && b !== 0xFF) highByteInLine++;
  }
  if (highByteInLine > 8) {
    if (!hasText) {
      console.log('发现疑似日文文本区域:');
      hasText = true;
    }
    console.log(`  0x${addr.toString(16).padStart(6, '0')}: ${highByteInLine} 个高字节`);
  }
}

// 统计整个ROM的代码/数据比例
console.log('\n--- 整体代码/数据比例估算 ---');

// 简单估算：Ghidra识别的函数区域
let codeSize = 0;
const funcBodies = ghidraContent.match(/FUN_00[0-9a-f]+\s*\([^)]*\)\s*\{[^}]*\}/g);
if (funcBodies) {
  // 粗略估算每个函数的大小
  console.log(`Ghidra识别函数体: ${funcBodies.length} 个`);
}

// 按256KB块统计00/FF比例
console.log('\n--- ROM 各区域 00/FF 比例 (每256KB) ---');
const BLOCK_SIZE = 256 * 1024;
for (let block = 0; block < ROM_SIZE; block += BLOCK_SIZE) {
  let zeros = 0;
  let ffs = 0;
  const end = Math.min(block + BLOCK_SIZE, ROM_SIZE);
  for (let i = block; i < end; i++) {
    if (rom[i] === 0) zeros++;
    else if (rom[i] === 0xFF) ffs++;
  }
  const size = end - block;
  console.log(`  0x${block.toString(16).padStart(6, '0')}: 00=${((zeros/size)*100).toFixed(1)}%, FF=${((ffs/size)*100).toFixed(1)}%`);
}

console.log('\n=== 分析完成 ===');
