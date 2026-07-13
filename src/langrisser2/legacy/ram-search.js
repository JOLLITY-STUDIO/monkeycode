import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newDir = path.join(__dirname, '20260713');
const ram = fs.readFileSync(path.join(newDir, 'Langrisser II (Japan)_68K-gens-ram-dump.ram'));
const rom = fs.readFileSync(path.join(newDir, 'Langrisser II (Japan).md'));

function rU8(a) { return ram[((a & 0xFFFFFF) - 0xFF0000)] ?? 0; }
function romU8(a) { return rom[a] ?? 0; }
function h(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }

// ============================================================
// 在ROM中搜索每个角色的RAM 14字节签名
// 确定ROM中角色数据的真实布局
// ============================================================
console.log('=== 在ROM中搜索每个角色的RAM签名 ===\n');

const ramStart = 0xFFFFA4CC;
const results = [];

for (let charIdx = 0; charIdx < 10; charIdx++) {
  const ramBase = ramStart + charIdx * 0x18;
  // 取RAM中角色的前12字节作为签名(后2字节可能是0)
  const sig = [];
  for (let i = 0; i < 12; i++) sig.push(rU8(ramBase + i));
  
  console.log(`角色${charIdx+1} RAM签名(12B): ${sig.map(h).join(' ')}`);
  
  // 在ROM 0x05E64A 附近搜索 (±512字节范围)
  let foundAt = -1;
  for (let off = 0x05E400; off < 0x05EA00; off++) {
    let match = true;
    for (let i = 0; i < 12; i++) {
      if (romU8(off + i) !== sig[i]) { match = false; break; }
    }
    if (match) { foundAt = off; break; }
  }
  
  if (foundAt >= 0) {
    const offsetFromBase = foundAt - 0x05E64A;
    // 读取ROM中该位置的14字节
    const rom14 = [];
    for (let i = 0; i < 14; i++) rom14.push(romU8(foundAt + i));
    // 读取RAM中的14字节
    const ram14 = [];
    for (let i = 0; i < 14; i++) ram14.push(rU8(ramBase + i));
    
    let match14 = true;
    for (let i = 0; i < 14; i++) {
      if (rom14[i] !== ram14[i]) { match14 = false; break; }
    }
    
    console.log(`  → ROM ${h(foundAt>>16)}${h((foundAt>>8)&0xFF)}${h(foundAt&0xFF)} (0x05E64A + ${offsetFromBase})`);
    console.log(`  ROM 14B: ${rom14.map(h).join(' ')}`);
    console.log(`  RAM 14B: ${ram14.map(h).join(' ')}`);
    console.log(`  14B完全匹配: ${match14}`);
    if (!match14) {
      console.log(`  差异: ROM[12-13]=${h(rom14[12])}${h(rom14[13])} RAM[12-13]=${h(ram14[12])}${h(ram14[13])}`);
    }
    results.push({ charIdx, romAddr: foundAt, offsetFromBase, match14 });
  } else {
    console.log(`  → 未找到!`);
    results.push({ charIdx, romAddr: -1, offsetFromBase: -1, match14: false });
  }
  console.log('');
}

// 计算步长
console.log('=== 各角色在ROM中的步长 ===');
for (let i = 1; i < results.length; i++) {
  if (results[i].romAddr >= 0 && results[i-1].romAddr >= 0) {
    const step = results[i].romAddr - results[i-1].romAddr;
    console.log(`  角色${i} → 角色${i+1}: 步长 = ${step} (0x${step.toString(16)})`);
  }
}

// ============================================================
// 重新分析角色槽结构 (旧dump有数据, 新dump全零)
// 关键发现: 新dump是标题画面, 旧dump是战斗中
// ============================================================
console.log('\n\n=== 新dump角色槽区域 (确认是否全零) ===');
let allZero = true;
for (let i = 0; i < 0x600; i++) {
  if (rU8(0xFF603C + i) !== 0) { allZero = false; break; }
}
console.log(`0xFF603C-0xFF663C 全零: ${allZero}`);

// ============================================================
// 验证: 新dump中ROM->RAM的复制是否完成
// (游戏初始化后, 角色能力表应该已加载)
// ============================================================
console.log('\n=== 验证角色能力表已加载 (新dump) ===');
const char1RAM = [];
for (let i = 0; i < 14; i++) char1RAM.push(rU8(0xFFFFA4CC + i));
console.log(`角色1 RAM: ${char1RAM.map(h).join(' ')}`);

const char1ROM = [];
for (let i = 0; i < 14; i++) char1ROM.push(romU8(0x05E64A + i));
console.log(`角色1 ROM: ${char1ROM.map(h).join(' ')}`);

let loaded = true;
for (let i = 0; i < 14; i++) {
  if (char1RAM[i] !== char1ROM[i]) { loaded = false; break; }
}
console.log(`角色1数据已加载: ${loaded}`);

// ============================================================
// 确定ROM中角色数据的真实步长
// 通过搜索所有10个角色的位置
// ============================================================
console.log('\n\n=== ROM中角色数据真实布局 ===');
console.log('角色 | ROM地址        | 距0x05E64A | 14B匹配');
console.log('-----|----------------|------------|--------');
for (const r of results) {
  if (r.romAddr >= 0) {
    console.log(`  ${r.charIdx+1}  | 0x${r.romAddr.toString(16).toUpperCase()}      | ${r.offsetFromBase.toString().padStart(6)}    | ${r.match14}`);
  }
}

// ============================================================
// 检查ROM中角色间的数据 (填充字段?)
// ============================================================
console.log('\n\n=== ROM中角色间的填充数据 ===');
for (let i = 0; i < results.length - 1; i++) {
  if (results[i].romAddr < 0 || results[i+1].romAddr < 0) continue;
  const start = results[i].romAddr + 14; // 当前角色14B后
  const end = results[i+1].romAddr;      // 下一角色起始
  const gap = end - start;
  
  if (gap > 0) {
    const fill = [];
    for (let j = 0; j < gap && j < 20; j++) {
      fill.push(h(romU8(start + j)));
    }
    console.log(`  角色${i+1} → 角色${i+2}: 间隔${gap}B, 填充=${fill.join(' ')}${gap > 20 ? '...' : ''}`);
  } else if (gap < 0) {
    console.log(`  角色${i+1} → 角色${i+2}: 重叠${-gap}B!`);
  } else {
    console.log(`  角色${i+1} → 角色${i+2}: 无间隔`);
  }
}

// ============================================================
// 看看旧dump中哪些区域有数据 (对比新旧)
// ============================================================
console.log('\n\n=== 新旧dump差异分布 (按区域统计) ===');
const oldRam = fs.readFileSync(path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files', '17e953fa-Langrisser II (Japan)_68K-1.ram'));

const regions = [
  ['0xFF0000-0xFF1FFF (低RAM)', 0x0000, 0x2000],
  ['0xFF2000-0xFF3FFF', 0x2000, 0x4000],
  ['0xFF4000-0xFF5FFF (地图/显示)', 0x4000, 0x6000],
  ['0xFF6000-0xFF6FFF (角色槽)', 0x6000, 0x7000],
  ['0xFF7000-0xFF8FFF', 0x7000, 0x9000],
  ['0xFF9000-0xFF9FFF (场景配置)', 0x9000, 0xA000],
  ['0xFFA000-0xFFAFFF (角色表)', 0xA000, 0xB000],
  ['0xFFB000-0xFFBFFF', 0xB000, 0xC000],
  ['0xFFC000-0xFFDFFF', 0xC000, 0xE000],
  ['0xFFE000-0xFFFFFF (高RAM)', 0xE000, 0x10000],
];

for (const [name, start, end] of regions) {
  let diff = 0;
  for (let i = start; i < end && i < 0x10000; i++) {
    if (oldRam[i] !== ram[i]) diff++;
  }
  const pct = ((diff / (end - start)) * 100).toFixed(1);
  console.log(`  ${name}: ${diff}处不同 (${pct}%)`);
}
