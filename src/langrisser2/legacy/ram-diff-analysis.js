import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldRam = fs.readFileSync(path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files', '17e953fa-Langrisser II (Japan)_68K-1.ram'));
const newRam = fs.readFileSync(path.join(__dirname, '20260713', 'Langrisser II (Japan)_68K-gens-ram-dump.ram'));

function h(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }

// ============================================================
// 问题: 为什么两个RAM dump有24653处差异?
// 答案: RAM是动态状态, 不是一次性加载的静态数据
// ============================================================

console.log('=== 1. 验证角色能力表区域 (0xFFFFA4CC) 的差异 ===');
// 这个区域应该是"已加载+被修改"
const charTableStart = 0xA4CC;
const charTableEnd = charTableStart + 10 * 14; // 10角色×14B

let charTableDiff = 0;
const charTableDiffs = [];
for (let i = charTableStart; i < charTableEnd; i++) {
  if (oldRam[i] !== newRam[i]) {
    charTableDiff++;
    const charIdx = Math.floor((i - charTableStart) / 14);
    const fieldOff = (i - charTableStart) % 14;
    charTableDiffs.push(`  角色${charIdx+1} 字段0x${fieldOff.toString(16).padStart(2,'0')}: 旧=${h(oldRam[i])} 新=${h(newRam[i])}`);
  }
}
console.log(`角色能力表区域差异: ${charTableDiff}处`);
charTableDiffs.forEach(d => console.log(d));

// ============================================================
// 分析每个区域差异的性质
// ============================================================
console.log('\n=== 2. 按区域分析差异性质 ===');

const regions = [
  ['0xFF0000-0xFF1FFF (低RAM/栈/临时)', 0x0000, 0x2000],
  ['0xFF2000-0xFF3FFF (变量区)', 0x2000, 0x4000],
  ['0xFF4000-0xFF5FFF (显示缓存)', 0x4000, 0x6000],
  ['0xFF6000-0xFF6FFF (角色槽)', 0x6000, 0x7000],
  ['0xFF7000-0xFF8FFF (单位数据)', 0x7000, 0x9000],
  ['0xFF9000-0xFF9FFF (场景配置)', 0x9000, 0xA000],
  ['0xFFA000-0xFFAFFF (角色表)', 0xA000, 0xB000],
  ['0xFFB000-0xFFBFFF', 0xB000, 0xC000],
  ['0xFFC000-0xFFDFFF', 0xC000, 0xE000],
  ['0xFFE000-0xFFFFFF (高RAM)', 0xE000, 0x10000],
];

for (const [name, start, end] of regions) {
  let diff = 0;
  let oldNonZero = 0;
  let newNonZero = 0;
  for (let i = start; i < end; i++) {
    if (oldRam[i] !== newRam[i]) diff++;
    if (oldRam[i] !== 0) oldNonZero++;
    if (newRam[i] !== 0) newNonZero++;
  }
  console.log(`\n${name}:`);
  console.log(`  差异: ${diff}处  旧非零: ${oldNonZero}  新非零: ${newNonZero}`);
  
  // 判断差异性质
  if (diff === 0) {
    console.log(`  → 完全相同 (静态数据)`);
  } else if (oldNonZero > 0 && newNonZero === 0) {
    console.log(`  → 旧dump有数据, 新dump全零 (运行时才填充)`);
  } else if (diff > (end-start) * 0.5) {
    console.log(`  → 大量差异 (>50%, 可能是显示缓存或栈)`);
  } else {
    console.log(`  → 部分差异 (运行时修改)`);
  }
}

// ============================================================
// 3. 角色能力表的逐字段对比 (这是关键!)
// ============================================================
console.log('\n\n=== 3. 角色能力表逐字段对比 (理解"运行时修改") ===');
console.log('角色 | 字段 | 旧dump(游戏界面) | 新dump(标题画面) | 说明');
console.log('-----|------|------------------|------------------|------');

const fieldNames = [
  'baseClassId', 'baseMP', 'atModLo', 'atModHi', 'dfModLo', 'dfModHi',
  'skill0', 'skill1', 'skill2', 'skill3', 'reservedA', 'reservedB',
  'moveRange', 'portraitIdx'
];

for (let c = 0; c < 10; c++) {
  const base = 0xA4CC + c * 14;
  for (let f = 0; f < 14; f++) {
    const oldV = oldRam[base + f];
    const newV = newRam[base + f];
    if (oldV !== newV) {
      console.log(`  ${c+1}  | 0x${f.toString(16).padStart(2,'0')}  | ${h(oldV).padEnd(16)} | ${h(newV).padEnd(16)} | ${fieldNames[f]||'?'}`);
    }
  }
}

// ============================================================
// 4. 关键洞察: 两个dump的差异本质
// ============================================================
console.log('\n\n=== 4. 差异本质分析 ===');
console.log(`
RAM 不是"一次性塞进去"的, 而是分阶段填充的:

【阶段1: 游戏启动 (标题画面)】
  - FUN_0000c80c 主初始化
  - FUN_00010a94 从ROM加载角色能力表到 0xFFFFA4CC (14B×10)
  - 清零其他区域 (角色槽/场景配置等)
  - 新dump = 这个状态

【阶段2: 进入战斗 (游戏界面)】
  - FUN_0000a122 加载场景单位配置到 0xFFFF9F62
  - FUN_0000a16a 初始化角色槽 0xFF603C (20槽×96B)
  - FUN_00010bbe 从角色能力表读CLASS_ID, 应用职业属性+修正到角色槽
  - 玩家操作修改角色HP/MP/位置/经验等
  - 旧dump = 这个状态

【为什么角色能力表也有差异?】
  - FUN_0000e2da/FUN_00011c78 会把角色槽的运行时数据写回 0xFFFFA4CC
  - 玩家升级/转职后, 角色能力表被更新
  - 这就是为什么角色1的字段0x0D(头像)等位置有差异
`);

// ============================================================
// 5. 统计: 哪些区域是"静态加载"vs"运行时生成"
// ============================================================
console.log('=== 5. 区域分类 ===');
console.log('\n【静态加载区】(ROM→RAM, 两个dump应相同):');
console.log('  - 0xFFFFA4CC 角色能力表 (14B×10) ← 两个dump基本相同, 只有少量运行时修改');

console.log('\n【运行时填充区】(旧dump有数据, 新dump全零):');
// 检查角色槽
let slotOldNonZero = 0;
for (let i = 0x603C; i < 0x6700; i++) {
  if (oldRam[i] !== 0) slotOldNonZero++;
}
console.log(`  - 0xFF603C 角色槽: 旧dump ${slotOldNonZero}个非零字节, 新dump全零`);

console.log('\n【动态变化区】(两个dump都不同, 都是运行时数据):');
console.log('  - 0xFF0000-0xFF1FFF 栈/临时变量');
console.log('  - 0xFF4000-0xFF5FFF 显示缓存 (DMA目标)');
console.log('  - 0xFFB000-0xFFFFFF 各种运行时状态');
