import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ramPath = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '17e953fa-Langrisser II (Japan)_68K-1.ram');
const ram = fs.readFileSync(ramPath);
const rom = fs.readFileSync(path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '1927e379-Langrisser II (Japan)-1.md'));

function rU8(a) { return ram[((a & 0xFFFFFF) - 0xFF0000)] ?? 0; }
function romU8(a) { return rom[a] ?? 0; }
function h(b) { return '0x' + b.toString(16).padStart(2, '0').toUpperCase(); }

// ============================================================
// 分析 0xFFFFA4CC 区域的交错结构
// 从 RAM dump 看到:
//   A4CA: 00 00 01 00 01 00 17 12  00 00 00 00 00 04 00 01
//   A4DA: 00 00 00 00 00 00 00 00  00 00 02 06 03 00 15 11
//   A4EA: 00 00 04 01 08 00 01 05  00 00 00 00 00 00 00 00
//
// 角色1 ROM (0x05E64A): 01 00 01 00 17 12 00 00 00 00 00 04 00 01 02 06 03 00 15 11 00 00 04 01
// 角色2 ROM (0x05E662): 08 00 01 05 02 05 01 00 14 14 00 00 00 00 08 00 01 09 01 01 09 0F 16 14
//
// RAM中角色1的数据分散在多行:
//   A4CC: 01 00 01 00 17 12 00 00 00 00 00 04 00 01
//   A4E6: 02 06 03 00 15 11
//   A4EC: 04 01
// 这些位置之间的间隔不是 0x18
//
// 让我数一下: 角色1 ROM的24字节在RAM中分散在三个位置:
//   01 00 01 00 17 12 00 00 00 00 00 04 00 01 (前14B) @ A4CC
//   02 06 03 00 15 11 (中间6B) @ A4E6
//   00 00 04 01 (最后4B) @ A4EC
//
// 不对，让我从A4CC开始数24字节:
// A4CC: 01 00 01 00 17 12 00 00 00 00 00 04 00 01 00 00 00 00 00 00 00 00 02 06
// 这和ROM角色1完全不匹配（ROM后10字节不是这样的）
//
// 等一下，ROM角色1是:
// 01 00 01 00 17 12 00 00 00 00 00 04 00 01 02 06 03 00 15 11 00 00 04 01
// 
// RAM A4CC开始24字节:
// 01 00 01 00 17 12 00 00 00 00 00 04 00 01 00 00 00 00 00 00 00 00 02 06
// 
// 前14字节(0x00-0x0D)匹配！0x0E-0x17不匹配
// ROM[0x0E-0x17] = 02 06 03 00 15 11 00 00 04 01
// RAM[0x0E-0x17] = 00 00 00 00 00 00 00 00 02 06
//
// 所以角色表在RAM中不是连续存储的！
// 前14字节在 A4CC+0x00 (偏移0-13)
// 然后有其他数据插入...
//
// 让我看看 RAM 0xFFFFA4CC 区域有多少个角色
// 如果有10个角色，每个角色的字段分散存储
// 比如 byte[0] 数组: 角色0.byte0, 角色1.byte0, ... 角色9.byte0
// 然后 byte[1] 数组: 角色0.byte1, 角色1.byte1, ...
// 这叫 "结构数组 vs 数组结构" (SoA vs AoS)
// ============================================================

console.log('=== 验证 SoA (Structure of Arrays) 假设 ===');
console.log('如果 RAM 中是按字段分组存储的（每字段10字节）：\n');

// ROM 角色1-10的 byte[0] 数组
const romByte0 = [];
for (let i = 0; i < 10; i++) {
  romByte0.push(romU8(0x05E64A + i * 0x18 + 0));
}
console.log('ROM byte[0] 数组 (10角色):', romByte0.map(h).join(' '));

// RAM A4CC 开始的10字节
const ramByte0 = [];
for (let i = 0; i < 10; i++) {
  ramByte0.push(rU8(0xFFFFA4CC + i));
}
console.log('RAM A4CC开始10字节:', ramByte0.map(h).join(' '));

// 对比
let match0 = true;
for (let i = 0; i < 10; i++) {
  if (romByte0[i] !== ramByte0[i]) { match0 = false; break; }
}
console.log('byte[0] 完全匹配:', match0);

// ROM byte[1]
const romByte1 = [];
for (let i = 0; i < 10; i++) {
  romByte1.push(romU8(0x05E64A + i * 0x18 + 1));
}
console.log('\nROM byte[1] 数组:', romByte1.map(h).join(' '));
// RAM A4CC+10开始？还是+16？
// 如果每字段16字节对齐...
for (let stride = 10; stride <= 32; stride++) {
  let ok = true;
  for (let i = 0; i < 10; i++) {
    if (rU8(0xFFFFA4CC + stride + i) !== romByte1[i]) { ok = false; break; }
  }
  if (ok) {
    console.log(`  byte[1] 在 stride ${stride} (0x${stride.toString(16)}) 处匹配!`);
    console.log('  RAM:', Array.from({length:10},(_,j)=>h(rU8(0xFFFFA4CC + stride + j))).join(' '));
  }
}

// 让我系统地找所有24个字段的位置
console.log('\n=== 系统查找各字段在RAM中的位置 ===');
const ramStart = 0xFFFFA4CC;
const fieldOffsets = []; // 每个字段在RAM中的起始偏移 (相对于A4CC)

for (let field = 0; field < 0x18; field++) {
  const romVals = [];
  for (let c = 0; c < 10; c++) {
    romVals.push(romU8(0x05E64A + c * 0x18 + field));
  }
  
  // 在 RAM A4CC 到 A600 范围内搜索
  let foundAt = -1;
  for (let off = 0; off < 0x140; off++) {
    let match = true;
    for (let c = 0; c < 10; c++) {
      if (rU8(ramStart + off + c) !== romVals[c]) { match = false; break; }
    }
    if (match) { foundAt = off; break; }
  }
  fieldOffsets.push(foundAt);
  if (foundAt >= 0) {
    console.log(`  字段 0x${field.toString(16).padStart(2,'0')}: RAM 偏移 +0x${foundAt.toString(16).padStart(3,'0')} (${foundAt})  → ${romVals.slice(0,5).map(h).join(' ')}...`);
  } else {
    console.log(`  字段 0x${field.toString(16).padStart(2,'0')}: 未找到`);
  }
}

// 检查哪些字段值全是0（可能在RAM中被清零了）
console.log('\n=== 检查 ROM 中哪些字段有非零值 ===');
for (let field = 0; field < 0x18; field++) {
  const vals = [];
  let hasNonZero = false;
  for (let c = 0; c < 10; c++) {
    const v = romU8(0x05E64A + c * 0x18 + field);
    vals.push(v);
    if (v !== 0) hasNonZero = true;
  }
  if (!hasNonZero) {
    console.log(`  字段 0x${field.toString(16).padStart(2,'0')}: ROM中全0`);
  }
}

// ============================================================
// 角色槽结构重新验证
// 关键发现: 槽0 0x44=5(MV), 0x45=2(Range), 0x46=1(AT), 0x47=3(DF), 0x50=50(MP)
// 职业0x01: MV=5, Range=2, AT=0, DF=2, MP=50
// 角色1修正: AT+1, DF+1
// 0+1=1 ✓  2+1=3 ✓  MV=5 ✓  Range=2 ✓  MP=50 ✓
// 完美匹配！所以槽0的职业是 0x01 = 战士
// 那 CLASS_ID 在哪里？如果 0x00 = 0x01 = 单位类型/职业ID...
// 但 Ghidra 说写入到 0x0B... 槽0 0x0B = 0
//
// 让我再看 Ghidra 代码
// *(byte *)((int)in_A1 + 0x0b) = DAT_ffffa4cc + (int)(uint8_t)param_1[0x10];
// 
// 如果 DAT_ffffa4cc 是 SoA 格式，byte[0] 数组在 A4CC
// 那么 "DAT_ffffa4cc + (int)(uint8_t)param_1[0x10]" 
// 实际意思是: 以 param_1[0x10] 为索引，读取某个数组元素
// 不对，这是字节指针加法
//
// 等等，我之前对 Ghidra 的解读可能有误。
// 让我重新看:
//   DAT_ffffa4cc 是一个字节数组的起始
//   (uint8_t)param_1[0x10] 是角色索引 (0-9)
//   DAT_ffffa4cc + idx 就是第idx个角色的某个字段
//   但如果是 SoA，那读取的是 byte[0] 数组的第idx个，也就是baseClassId
//   写入到 in_A1 + 0x0B，也就是角色槽的0x0B偏移
//   
//   但槽0的0x0B=0，而角色1(索引0?)的baseClassId=1
//   不对...
//
// 让我重新想：也许 param_1 是角色索引(1-based)，而不是0-based
// 如果角色1=索引1，那 DAT_ffffa4cc + 1 = A4CD = 0x00 (第二个字节)
// 写入到 0x0B... 还是不对

// 让我直接看：槽0的 0x0B = 0x00，而 RAM 中 A4CC+0 = 0x01
// 不匹配。A4CC+1 = 0x00，匹配！
// 所以如果 0x0B = RAM[A4CC + 角色索引 + field1_offset]
// field1_offset = 1?
// 
// 不对，这太简单了。让我看看槽0的每个字节和RAM角色表的关系
// ============================================================

console.log('\n=== 槽0每个字节 vs RAM角色表 (找字段对应) ===');
const slot0 = [];
for (let i = 0; i < 0x60; i++) slot0.push(rU8(0xFF603C + i));

// 对于槽0中的每个非零字节，看看它是否等于角色1(索引0)的某个ROM字段
const char1Rom = [];
for (let i = 0; i < 0x18; i++) char1Rom.push(romU8(0x05E64A + i));

for (let i = 0; i < 0x60; i++) {
  if (slot0[i] === 0) continue;
  // 在ROM角色1字段中找匹配
  const matches = [];
  for (let f = 0; f < 0x18; f++) {
    if (char1Rom[f] === slot0[i]) matches.push(`ROM字段${f.toString(16)}`);
  }
  // 也看看职业0x01的字段
  const classFields = {
    0x0D: romU8(0x05EDDC + 1*0x1C + 0x0D), // MV
    0x0E: romU8(0x05EDDC + 1*0x1C + 0x0E), // Range
    0x0F: romU8(0x05EDDC + 1*0x1C + 0x0F), // AT
    0x10: romU8(0x05EDDC + 1*0x1C + 0x10), // DF
    0x13: romU8(0x05EDDC + 1*0x1C + 0x13), // MP
  };
  const classMatches = [];
  for (const [k, v] of Object.entries(classFields)) {
    if (v === slot0[i]) classMatches.push(`职业${k}`);
  }
  if (matches.length > 0 || classMatches.length > 0) {
    console.log(`  槽[0x${i.toString(16).padStart(2,'0')}] = ${h(slot0[i])}  → ${[...matches, ...classMatches].join(', ')}`);
  }
}

// ============================================================
// 关键验证: 槽0 0x46=1 = 职业0x01.AT(0) + 角色修正AT(1) = 1 ✓
// 那职业数据来自 0x05EDDC[classId * 0x1C]
// 0x46 = baseAT + 角色修正AT
// 0x47 = baseDF + 角色修正DF
// 0x44 = baseMV
// 0x45 = baseRange
// 0x50 = baseMP
// 
// 但等等，如果是指挥官自己的属性，为什么在 0x44-0x50 这么深的位置？
// 之前我以为0x0C-0x5F是7个佣兵...
// 
// 让我重新计算：如果指挥官的战斗数据在0x44-0x53附近
// 那前面的0x00-0x43是什么？
// 
// 0x00-0x0B = 12B = 指挥官基本信息
// 0x0C-0x3B = 48B = 4个佣兵 × 12B
// 0x3C-0x47 = 12B = 第5个佣兵 (也可能是指挥官自己)
// 不对，0x44-0x47 正好在第5个"12B组"的 0x08-0x0B 位置
//
// 让我重新排列：
// 组0 (0x00-0x0B): 01 01 00 0A 00 00 0B 11 00 00 00 00
// 组1 (0x0C-0x17): FF 01 00 0A 00 01 00 00 00 00 00 00
// 组2 (0x18-0x23): FF 01 00 0A 00 02 00 00 01 00 00 00
// 组3 (0x24-0x2F): FF 01 00 0A 00 03 00 00 00 00 01 00
// 组4 (0x30-0x3B): FF 01 00 0A 00 04 00 00 00 00 17 12
// 组5 (0x3C-0x47): FF 01 00 0A 00 05 00 00 05 02 01 03
// 组6 (0x48-0x53): FF 01 00 0A 00 06 00 00 32 00 00 00
// 组7 (0x54-0x5F): FF 01 00 0A 00 07 00 00 00 00 00 01
//
// 8组 × 12B = 96B = 0x60 ✓
// 每组结构 (12B):
//   [0] 单位类型ID (FF=不存在)
//   [1] ?
//   [2] 00
//   [3] 0A = 10 (恒定?)
//   [4] 阵营?
//   [5] 编号/索引
//   [6] X坐标
//   [7] Y坐标
//   [8] ?
//   [9] ?
//   [10] AT/HP?
//   [11] DF/?
//
// 现在关键问题：组0是指挥官自己吗？
// 组0: 01 01 00 0A 00 00 0B 11 00 00 00 00
//   [0]=0x01(战士职业ID) [6-7]=(11,17)=坐标 [8-11]=全0
// 但指挥官的AT/DF/MP不应该是0啊...
//
// 除非：指挥官的详细战斗数据不在这个96B槽里
// 而是在另一个表（0xFFFFA4XX）里？
//
// 但组5 (0x3C-0x47):
// FF 01 00 0A 00 05 00 00 05 02 01 03
// [8-11] = 05 02 01 03 = MV Range AT DF
// 05=5 02=2 01=1 03=3
// 职业0x01: MV=5 Range=2 AT=0 DF=2 + 角色修正AT+1 DF+1 = 1,3 ✓
// 完美匹配！
//
// 但组5的[0]=FF，表示不存在...
// 这是怎么回事？
//
// 哦！我知道了！这是"模板数据"！
// 每个单位槽里存了8个12B条目，但它们不全是实际存在的单位
// 有些是"备份/模板"数据，比如指挥官自己的战斗属性模板
// 第5组(索引5)存的是指挥官的职业属性模板？
//
// 不对，让我看看槽2(敌方单位)的组5:
// 槽2组5 (0xFF60FC + 0x3C = 0xFF6138):
// 从之前的数据:
// 槽2完整: 97 20 00 0A 02 00 0B 09 00 00 00 00  (组0)
//         71 20 00 0A 02 01 0A 09 46 01 02 11  (组1)
//         71 20 00 0A 02 02 0C 09 03 00 04 0A  (组2)
//         71 20 00 0A 02 03 0B 08 00 00 02 00  (组3)
//         FF 20 00 0A 02 04 00 00 03 03 14 11  (组4)
//         FF 20 00 0A 02 05 00 00 05 02 00 04  (组5)
//
// 组5: FF 20 00 0A 02 05 00 00 05 02 00 04
// [8-11] = 05 02 00 04 = MV=5 Range=2 AT=0 DF=4
// 职业0x02: MV=5 Range=2 AT=0 DF=4 ✓ 完全匹配！
// 
// 组5存的是职业基础属性 (MV, Range, AT, DF)！
// 而且职业ID 0x02 正好对应... 
// 组0 [0]=0x97, 组5的职业属性对应职业0x02... 不对，0x97 != 0x02
//
// 等等，组0 [1] = 0x20 = 32，这是等级？
// 组5 [8-11] = MV, Range, AT, DF
// 这看起来像是"职业基础属性"的缓存
//
// 那组6呢？
// 槽2组6 (0x48-0x53): FF 20 00 0A 02 06 00 00 46 00 04 01
// [8-11] = 46 00 04 01 = 70 0 4 1
// 70是MP？职业0x02 MP=70 ✓
// 4是 指挥AT？1是 指挥DF？
//
// 组7呢？
// 槽2组7 (0x54-0x5F): FF 20 00 0A 02 07 00 00 00 00 00 2F
// [11] = 0x2F = 47
// 47是什么？
//
// 让我列一下槽0各组的[8-11]:
console.log('\n=== 槽0各组的第8-11字节 ===');
for (let g = 0; g < 8; g++) {
  const base = 0xFF603C + g * 12;
  const b8 = rU8(base + 8);
  const b9 = rU8(base + 9);
  const b10 = rU8(base + 10);
  const b11 = rU8(base + 11);
  console.log(`  组${g} [8-11] = ${h(b8)} ${h(b9)} ${h(b10)} ${h(b11)}  = (${b8}, ${b9}, ${b10}, ${b11})`);
}

console.log('\n=== 槽2各组的第8-11字节 ===');
for (let g = 0; g < 8; g++) {
  const base = 0xFF60FC + g * 12;
  const b8 = rU8(base + 8);
  const b9 = rU8(base + 9);
  const b10 = rU8(base + 10);
  const b11 = rU8(base + 11);
  console.log(`  组${g} [8-11] = ${h(b8)} ${h(b9)} ${h(b10)} ${h(b11)}  = (${b8}, ${b9}, ${b10}, ${b11})`);
}

// 我的假设：
// 组0: 指挥官自身 (但战斗属性不全，只有类型/坐标等)
// 组1-4: 实际存在的佣兵 (最多4个？不对，有10个佣兵的说法)
// 组5: 职业基础属性模板 (MV, Range, AT, DF)
// 组6: 更多职业属性 (MP, 指挥AT, 指挥DF, ?)
// 组7: 其他属性 (头像/技能/?)
//
// 不对，梦幻模拟战2中指挥官带的佣兵数量和职业有关
// 战士初始带10个步兵... 但这里只有8组
//
// 等等，也许0x60 = 96字节 = 指挥官(12B) + 10个佣兵(各8B) = 12+80=92 不对
// 或者 指挥官(24B) + 8个佣兵(各9B) = ...
//
// 让我换个角度：10个佣兵是常见设定
// 如果每个佣兵 6B，10个 = 60B + 指挥官 36B = 96B？
// 不对

// 让我看看有"10个佣兵"的单位（比如槽2有3个活动佣兵71,71,71）
// 71是什么？佣兵类型ID？比如枪兵？
// 如果有10个佣兵，应该有10个这样的条目
// 但8组 × 12B = 96B... 没有10个的空间
//
// 除非每组不是12B而是8B？
// 8B × 10组 = 80B + 16B 头 = 96B
// 让我验证
console.log('\n=== 假设是 10个8B佣兵+16B头 ===');
console.log('头16B:');
for (let i = 0; i < 16; i++) {
  console.log(`  [0x${i.toString(16).padStart(2,'0')}] = ${h(rU8(0xFF60FC+i))}`);
}
console.log('佣兵0-9 (各8B):');
for (let m = 0; m < 10; m++) {
  const base = 0xFF60FC + 16 + m * 8;
  const v = [];
  for (let j = 0; j < 8; j++) v.push(h(rU8(base+j)).slice(2));
  console.log(`  佣兵${m}: ${v.join(' ')}`);
}

// 不对，16B+80B=96B，但数据看起来不像...
// 0x10 (16) = 02  → 佣兵0的[0]=02
// 但活动佣兵是71类型，不是02
