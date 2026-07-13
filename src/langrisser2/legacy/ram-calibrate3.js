import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ramPath = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '17e953fa-Langrisser II (Japan)_68K-1.ram');
const romPath = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '1927e379-Langrisser II (Japan)-1.md');

const ram = fs.readFileSync(ramPath);
const rom = fs.readFileSync(romPath);

function rU8(addr) {
  const off = (addr & 0xFFFFFF) - 0xFF0000;
  return off >= 0 && off < ram.length ? ram[off] : 0;
}
function romU8(a) { return rom[a]; }

function h(b) { return '0x' + b.toString(16).padStart(2, '0').toUpperCase(); }

// ============================================================
// 验证假设: RAM 中角色能力表大小不是 0x18, 而是别的
// 方法: 找一段 ROM 中连续的字节序列, 在 RAM 中搜索
// ============================================================

// 角色1 ROM 0x05E64A 的前8字节
const sig = [0x01, 0x00, 0x01, 0x00, 0x17, 0x12, 0x00, 0x00];
console.log('搜索角色1 ROM签名在RAM中的位置...');
for (let off = 0; off < ram.length - 8; off++) {
  let match = true;
  for (let i = 0; i < 8; i++) {
    if (ram[off + i] !== sig[i]) { match = false; break; }
  }
  if (match) {
    const ramAddr = 0xFF0000 + off;
    console.log(`  找到匹配 @ RAM ${h(ramAddr >> 8).slice(0,4)}${(off & 0xFF).toString(16).padStart(2,'0').toUpperCase()}  (偏移 0x${off.toString(16)})`);
  }
}

// 也搜索角色2签名: 08 00 01 05 02 05 01 00
const sig2 = [0x08, 0x00, 0x01, 0x05, 0x02, 0x05, 0x01, 0x00];
console.log('\n搜索角色2 ROM签名...');
for (let off = 0; off < ram.length - 8; off++) {
  let match = true;
  for (let i = 0; i < 8; i++) {
    if (ram[off + i] !== sig2[i]) { match = false; break; }
  }
  if (match) {
    const ramAddr = 0xFF0000 + off;
    console.log(`  找到匹配 @ 偏移 0x${off.toString(16)} (RAM ${h(ramAddr >> 16)}...)`);
  }
}

// ============================================================
// 重新分析: 0xFFFFA4CC 可能不是角色能力表
// 检查 FUN_00010a94 真正复制到哪里
// ============================================================
console.log('\n\n=== 检查 0xFFFFA4CC 区域的实际内容 ===');
// 打印 0xFFFFA4AA 到 0xFFFFA600
for (let row = 0; row < 24; row++) {
  const base = 0xFFFFA4AA + row * 16;
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(h(rU8(base + i)).slice(2));
  console.log(`  ${h(base & 0xFFFF).padEnd(5,' ')}: ${bytes.join(' ')}`);
}

// ============================================================
// 检查 0xFFFFA000 区域 (可能是场景数据区)
// ============================================================
console.log('\n\n=== 0xFFFFA000 区域抽样 ===');
for (let row = 0; row < 8; row++) {
  const base = 0xFFFFA000 + row * 16;
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(h(rU8(base + i)).slice(2));
  console.log(`  A${row.toString().padStart(3,'0')}: ${bytes.join(' ')}`);
}

// ============================================================
// 角色槽字段重新分析
// 槽0 玩家单位, CLASS=0x03 (ROM 角色1的 classId=0x03)
// 在槽0中找值为 0x03 的字节
// ============================================================
console.log('\n\n=== 槽0中值=0x03的字节位置 ===');
for (let i = 0; i < 0x60; i++) {
  if (rU8(0xFF603C + i) === 0x03) {
    console.log(`  [0x${i.toString(16).padStart(2,'0')}] = 0x03`);
  }
}

// 槽2 单位类型 0x97=龙骑士? 如果 classId=0x16=龙骑士, 找0x16
console.log('\n槽2中值=0x16(龙骑士?)的字节位置:');
for (let i = 0; i < 0x60; i++) {
  if (rU8(0xFF60FC + i) === 0x16) {
    console.log(`  [0x${i.toString(16).padStart(2,'0')}] = 0x16`);
  }
}

// ============================================================
// 关键验证: 角色1 CLASS_ID=0x03 (剑士)
// 在槽0中找到值为3的字节，看哪个是CLASS_ID
// 对比槽0和槽1的职业
// 槽0: 单位类型 0x01 = 战士? 剑士?
// 槽1: 单位类型 0x03 = 领主? 魔法骑士?
// 如果职业0x01和0x03的基础属性分别是:
//   职业0x01: MV=5, Range=2, AT=0, DF=2, MP=50  ← 不对 AT=0 说不通
//   职业0x03: MV=5, Range=2, AT=4, DF=2, MP=60
// 而槽0在 0x44=5, 0x45=2, 0x46=1, 0x47=3, 0x50=50
// 如果 0x44=MV, 0x45=Range, 那这两个是对的 (都是5和2)
// 0x46=1 0x47=3 (如果是AT/DF的话，应该加了修正)
// 职业0x03 AT=4 DF=2 + 角色修正AT+1 DF+1 = AT=5 DF=3 不对
// 职业0x01 AT=0 DF=2 + 修正AT+1 DF+1 = AT=1 DF=3 ✓ 匹配!

// 所以槽0的职业是 0x01 = 战士!
// 那 ROM 角色1的 classId=0x03 不是战士...

// 等一下，也许我搞反了。让我重新看角色1 ROM数据。
// 角色1 ROM 0x05E64A:
//   [0x00]=0x01 (baseClassId? 战士)
//   [0x10]=0x03 (classId? 剑士)
// 如果角色1当前是战士职业(class=0x01), 那[0x00]才是当前职业ID
// 而[0x10]可能是别的东西

// 让我验证: 职业0x01的基础属性 MV=5 Range=2 AT=0 DF=2 MP=50
// 槽0: MV=5 Range=2 AT(0x46)=1 DF(0x47)=3 MP=50
// 1 = 0 + 1 (角色修正AT+1) ✓
// 3 = 2 + 1 (角色修正DF+1) ✓
// 完美匹配!

// 所以 CLASS_ID 在 0x00 位置？不对，0x00 是单位类型/职业类型
// 但 Ghidra 说写入到 0x0B 偏移...
// 槽0 0x0B = 0x00

// 也许我理解错了 Ghidra 代码。让我重新看...
// 也许 in_A1 + 0x0B 不是角色槽, 而是别的结构...

// 实际上，如果槽0[0x00] = 0x01 = 职业ID
// 而 0x44=MV 0x45=Range 0x46=AT 0x47=DF 0x50=MP
// 那这些数据是在佣兵4的区域...

// 让我换个思路。也许角色槽结构不是 12B主+7*12B佣兵，
// 而是 有一个 0x30 或 0x40 字节的主单位头，然后是佣兵。
// 或者佣兵只有 8B 而不是 12B？

// 槽0前48字节:
// 01 01 00 0A 00 00 0B 11 00 00 00 00  ← 12B
// FF 01 00 0A 00 01 00 00 00 00 00 00  ← 佣兵0 (12B)
// FF 01 00 0A 00 02 00 00 01 00 00 00  ← 佣兵1 (12B)
// FF 01 00 0A 00 03 00 00 00 00 01 00  ← 佣兵2 (12B)

// 注意佣兵的字节0=FF(不存在) 字节1=01(同主单位的类型)
// 字节3=0A(都是10) 字节5=编号(01/02/03)
// 字节6-7=坐标(都是0/0 或 0/0... 不对，应该有坐标)

// 等一下，活动的佣兵有坐标。槽2的佣兵0:
// 71 20 00 0A 02 01 0A 09 46 01 02 11
// 字节6-7 = 0x0A, 0x09 = (10,9) 这是坐标！
// 主单位坐标在字节6-7: 0x0B, 0x09 = (11,9)
// 相邻！符合"指挥官和佣兵在一起"

// 所以12B结构是对的。问题是指挥官的AT/DF/MP在哪？
// 0x3A=0x17=23, 0x3B=0x12=18 (佣兵3的第10-11字节? 不对)

// 让我重新数。槽0中:
// 0x38-0x3B 区域值: 00 00 17 12
// 0x3A=23 0x3B=18 = AT=23 DF=18? 这是佣兵的最大HP/当前HP？
// 不对，23和18看起来像是职业的 AT/DF 上限值

// 职业0x01: AT=0 DF=2... 不对

// 等一下，如果 0x38-0x39 是当前/最大HP，0x3A-0x3B 是当前/最大AT？
// 不对，00 00 17 12 = HP 0/0, AT 23/18... 说不通

// 反过来想，23和18是一个战士/剑士级别的合理AT/DF数值
// 指挥官AT 23, DF 18
// 那 0x3A=当前AT=23, 0x3B=最大AT=18? 不对，当前>最大

// 也许 0x3A=最大AT 0x3B=最大DF? 23 18 合理
// 那 0x38-0x39 呢？00 00 = 当前HP/最大HP=0？不对，单位是活的

// 让我看槽2(龙骑士 等级30?)的 0x38-0x3B:
// 槽2偏移0x30-0x3B: FF 20 00 0A 02 04 00 00 03 03 14 11
// 0x38=03, 0x39=03, 0x3A=14, 0x3B=11
// 3/3 和 20/17

// 槽2主单位 0x08-0x0B: 00 00 00 00 (全0)
// 主单位没有AT/DF字段？那主单位的战斗数据在哪？

// 哦！我知道了！指挥官单位本身没有详细战斗数据在12B头里。
// 指挥官的详细数据在 0x30 之后的区域？
// 0x30-0x5F 不是佣兵，而是指挥官的扩展数据 + 佣兵？

// 让我重新计算：如果0x00-0x2F是7个佣兵(每个12B是84B，不对)
// 0x0C-0x6B = 6个佣兵 × 12B = 72B？不对 0x60 = 96B

// 让我重新看槽0中佣兵数量。字节3=0x0A=10？
// 10个佣兵？10个佣兵 × 12B = 120B > 96

// 不对，字节3=10可能不是佣兵数。让我看槽2:
// 主单位字节3=0x0A=10, 活动佣兵有3个(#0-2)
// 字节3=10 可能是某种单位上限或指挥容量？

// 让我换个完全不同的思路：
// 也许 0x60 字节的结构中:
//   0x00-0x0B = 指挥官数据 (12B, 简化)
//   0x0C-0x5F = 7个佣兵 × 12B = 84B
// 但指挥官的详细AT/DF/MP在0x30+的"自己的佣兵槽"里？
// 比如指挥官自己占用佣兵槽4？

// 槽0 0x30-0x3B: FF 01 00 0A 00 04 00 00 00 00 17 12
// 字节0=FF(不存在) 不对，指挥官是存在的

// 也许我搞错了，0x00-0x0B 是佣兵0，0x0C-0x17 是佣兵1，...
// 然后指挥官在最后？0x54-0x5F?
// 槽0 0x54-0x5F: FF 01 00 0A 00 07 00 00 00 00 00 01
// 也是FF开头...

// 或者，0x00 = 单位类型 (01=战士) 也是职业ID
// 指挥官的数据分散在不同偏移

// 让我用另一组数据验证。槽11是个BOSS/龙:
// 单位类型=0x45, MV=12, Range=4, AT=11, DF=8, MP=85
// 职业 0x12 (0xC=12):
//   MV=5 Range=3 AT=5 DF=4 MP=85
// 不对 MV=5 不是12

// 职业 0x0C: MV=11 Range=4 AT=5 DF=3 MP=60
// 11接近12但不对

// 职业 0x0E: MV=10 Range=4 AT=6 DF=2 MP=90
// 不对

// 让我直接找 MV=12 的职业...
console.log('\n\n=== 找 MV=12 的职业 (槽11 MV=12) ===');
for (let i = 0; i < 64; i++) {
  const base = 0x05EDDC + i * 0x1C;
  const mv = romU8(base + 0x0D);
  if (mv >= 10) {
    console.log(`  职业 0x${i.toString(16).padStart(2,'0')}: MV=${mv} Range=${romU8(base+0x0E)} AT=${romU8(base+0x0F)} DF=${romU8(base+0x10)} MP=${romU8(base+0x13)}`);
  }
}

// 槽11: 单位类型=0x45, 等级=30, MV=12, Range=4, 指挥AT=11, 指挥DF=8, MP=85
// 如果职业数据在 0x05EDDC, class ID = 0x45？
// 职业表应该没有 0x45 那么多职业。梦幻模拟战2大概30-40种职业
console.log('\n\n=== 职业0x40-0x4F数据 ===');
for (let i = 0x40; i <= 0x4F; i++) {
  const base = 0x05EDDC + i * 0x1C;
  const allZero = [];
  let isZero = true;
  for (let o = 0; o < 0x1C; o++) {
    const v = romU8(base + o);
    allZero.push(v.toString(16).padStart(2, '0'));
    if (v !== 0) isZero = false;
  }
  if (!isZero) {
    console.log(`  职业 0x${i.toString(16).padStart(2,'0')}: ${allZero.join(' ')}`);
  }
}
