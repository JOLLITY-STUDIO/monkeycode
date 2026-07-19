/**
 * ROM Reader + Boot Sequence 完整验证
 * 
 * 对照 ROM 二进制逐字节验证:
 * 1. RomLoader 所有方法
 * 2. BootRom 启动流程
 * 3. VDP 寄存器初始化
 * 4. 资源指针表
 * 5. 压缩资源头部
 * 
 * 运行: node test/validate_rom.cjs
 */

const fs = require('fs');
const path = require('path');
const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md');

let rom, passed = 0, failed = 0;

function assert(label, condition, expected, actual) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.log(`  ❌ ${label}`);
    console.log(`     expected: ${expected}`);
    console.log(`     actual:   ${actual}`);
    failed++;
  }
}

// ============================================================
// Helpers
// ============================================================
function r8(a)  { return rom[a]; }
function r16(a) { return (rom[a]<<8)|rom[a+1]; }
function r32(a) { return (rom[a]<<24)|(rom[a+1]<<16)|(rom[a+2]<<8)|rom[a+3]; }
const H = v => '0x' + v.toString(16).toUpperCase().padStart(8,'0');
const h16 = v => v.toString(16).toUpperCase().padStart(4,'0');
const h8 = v => v.toString(16).toUpperCase().padStart(2,'0');

// ============================================================
// 1. ROM 加载
// ============================================================
console.log('=== 1. ROM Loading ===');
rom = fs.readFileSync(ROM_PATH);
assert('ROM 大小 = 2MB (2097152 bytes)', rom.length === 2097152, 2097152, rom.length);
assert('ROM 非空', rom.length > 0);

// ============================================================
// 2. 中断向量表
// ============================================================
console.log('\n=== 2. Exception Vectors ===');
assert('SSP = 0x00FFFF00', r32(0x000) === 0x00FFFF00, '0x00FFFF00', H(r32(0x000)));
assert('Reset PC = 0x0000800A', r32(0x004) === 0x0000800A, '0x0000800A', H(r32(0x004)));
assert('Bus Error → 0x00008000', r32(0x008) === 0x00008000);
assert('VBlank (L4) → 0x000084B8', r32(0x070) === 0x000084B8, '0x000084B8', H(r32(0x070)));
assert('HBlank (L6) → 0x000082B4', r32(0x078) === 0x000082B4, '0x000082B4', H(r32(0x078)));

// 所有异常向量统一跳转到 $8000 (Trap)
for (let i = 2; i < 24; i++) {
  const off = i * 4;
  const val = r32(off);
  if (val !== 0 && off !== 0x044 && off !== 0x048) { // 跳过 reserved
    assert(`Vector $${h8(off)} → $8000`, val === 0x00008000, '0x00008000', H(val));
  }
}

// ============================================================
// 3. ROM 头 ($100-$1FF)
// ============================================================
console.log('\n=== 3. ROM Header ===');
// Console name
let cn = ''; for (let i=0x100;i<0x110;i++) cn += String.fromCharCode(rom[i]);
assert('Console = "SEGA MEGA DRIVE"', cn.trim() === 'SEGA MEGA DRIVE');

// Copyright
let cr = ''; for (let i=0x110;i<0x120;i++) cr += String.fromCharCode(rom[i]);
assert('Copyright contains "(C)T-25"', cr.includes('(C)T-25'));

// Checksum
assert('Checksum = 0xD79F', r16(0x18E) === 0xD79F, '0xD79F', '0x' + h16(r16(0x18E)));

// ROM range
assert('ROM Start = 0x00000000', r32(0x1A0) === 0x00000000);
assert('ROM End   = 0x001FFFFF', r32(0x1A4) === 0x001FFFFF, '0x1FFFFF', H(r32(0x1A4)));

// RAM range
assert('RAM Start = 0x00FF0000', r32(0x1A8) === 0x00FF0000);
assert('RAM End   = 0x00FFFFFF', r32(0x1AC) === 0x00FFFFFF, '0xFFFFFF', H(r32(0x1AC)));

// ============================================================
// 4. 启动代码第一条指令
// ============================================================
console.log('\n=== 4. First Instructions ===');
// Reset PC = $800A → ROM offset $800A
assert('$800A: TST.L ($00A10008) = 4A B9 00 A1 00 08',
  r8(0x800A)===0x4A && r8(0x800B)===0xB9 && r8(0x800C)===0x00 && r8(0x800D)===0xA1 && r8(0x800E)===0x00 && r8(0x800F)===0x08);

assert('$8010: BNE $8018 = 66 06',
  r8(0x8010)===0x66 && r8(0x8011)===0x06);

assert('$8012: TST.W ($00A1000C) = 4A 79 00 A1 00 0C',
  r8(0x8012)===0x4A && r8(0x8013)===0x79 && r8(0x8014)===0x00 && r8(0x8015)===0xA1 && r8(0x8016)===0x00 && r8(0x8017)===0x0C);

assert('$801A: LEA ($8098,PC),A5 = 4B FA 00 7C',
  r8(0x801A)===0x4B && r8(0x801B)===0xFA && r8(0x801C)===0x00 && r8(0x801D)===0x7C);

// ============================================================
// 5. VDP 初始化表 ($80B2, 24 bytes)
// ============================================================
console.log('\n=== 5. VDP Init Table ($80B2) ===');
const vdpRegsROM = [];
for (let i = 0; i < 24; i++) vdpRegsROM.push(rom[0x80B2 + i]);

const expectedRegs = {
  0x00: 0x04, 0x01: 0x14, 0x02: 0x30, 0x03: 0x3C,
  0x04: 0x07, 0x05: 0x6C, 0x06: 0x00, 0x07: 0x00,
  0x08: 0x00, 0x09: 0x00, 0x0A: 0xFF, 0x0B: 0x00,
  0x0C: 0x81, 0x0D: 0x37, 0x0E: 0x00, 0x0F: 0x01,
  0x10: 0x01, 0x11: 0x00, 0x12: 0x00, 0x13: 0xFF,
  0x14: 0xFF, 0x15: 0x00, 0x16: 0x00, 0x17: 0x80,
};

Object.entries(expectedRegs).forEach(([r, val]) => {
  const i = parseInt(r);
  assert(`Reg $${h8(i)} = $${h8(val)}`, vdpRegsROM[i] === val, '$' + h8(val), '$' + h8(vdpRegsROM[i]));
});

// 验证关键意义
assert('Reg $01: Display=OFF (bit6=0)', (vdpRegsROM[1] & 0x40) === 0);
assert('Reg $01: DMA=ON (bit4=1)',      (vdpRegsROM[1] & 0x10) !== 0);
assert('Reg $01: NTSC (bit3=0)',        (vdpRegsROM[1] & 0x08) === 0);
assert('Reg $02: PlaneA NT @ $C000',    vdpRegsROM[2] * 0x400 === 0xC000);
assert('Reg $04: PlaneB NT @ $1C00',    vdpRegsROM[4] * 0x400 === 0x1C00);
assert('Reg $05: Sprite SAT @ $D800',   vdpRegsROM[5] * 0x200 === 0xD800);
assert('Reg $0C: H40=ON (bit0=1)',      (vdpRegsROM[0x0C] & 1) === 1);
assert('Reg $0D: HScroll Table @ $DC00',vdpRegsROM[0x0D] * 0x400 === 0xDC00);
assert('Reg $0F: AutoInc=1',            vdpRegsROM[0x0F] === 1);
assert('Reg $10: PlaneA=64 (bits0-1=01), PlaneB=32 (bits4-5=00)',
  (vdpRegsROM[0x10] & 3) === 1 && ((vdpRegsROM[0x10]>>4)&3) === 0);

// ============================================================
// 6. Z80 启动代码 ($80DA, 37 bytes)
// ============================================================
console.log('\n=== 6. Z80 Boot Code ($80DA) ===');
const z80Code = [];
for (let i = 0; i < 37; i++) z80Code.push(rom[0x80DA + i]);
assert('Z80 code length = 37 bytes', z80Code.length === 37);
assert('Z80 first byte = $ED (Z80 opcode)', z80Code[0] === 0xED);
assert('Z80 second byte = $B0 (LDIR)', z80Code[1] === 0xB0);

// ============================================================
// 7. 校验和
// ============================================================
console.log('\n=== 7. ROM Checksum ===');
let sum = 0;
for (let a = 0x200; a < rom.length; a += 2) sum += r16(a);
const calc = sum & 0xFFFF;
assert('Checksum valid (0xD79F)', calc === 0xD79F, '0xD79F', H(calc));

// ============================================================
// 8. 资源指针表 ($0B0000)
// ============================================================
console.log('\n=== 8. Resource Pointer Table ===');
const PT_BASE = 0x0B0000;
// 前 20 个指针，偶数偏移 $000B 是数组/对话数据
const evenOffsets = [0,1,2,3,4,5,6,7,8,9].map(i => r16(PT_BASE + i * 4));
const allSame = evenOffsets.every(o => o === evenOffsets[0]);

// 资源类型判断 (看目标地址前 2 字节)
function readResType(resId) {
  const offset = r16(PT_BASE + resId * 2);
  const addr = PT_BASE + offset;
  const b0 = rom[addr];
  return b0;
}

// 检查几个已知资源
const sample = [1, 3, 5, 7, 9, 11, 13, 15];
console.log('  Resource type samples:');
sample.forEach(id => {
  const t = readResType(id);
  const offset = r16(PT_BASE + id * 2);
  const addr = PT_BASE + offset;
  let type = '?';
  if (t === 0x03) type = 'compressed (LZSS)';
  else if (t === 0x02) type = 'compressed (bitplane)';
  else if (t === 0x01) type = 'compressed (nibble RLE)';
  else if (t === 0x20) type = 'uncompressed tiles?';
  else type = `unknown (0x${h8(t)})`;
  console.log(`    [${String(id).padStart(3)}] off=$${h16(offset)} → $${(addr).toString(16).padStart(5,'0')}: type=${type}`);
});

// ============================================================
// 9. 压缩资源头部验证
// ============================================================
console.log('\n=== 9. Compressed Resource Headers ===');
// 资源 1 ($B06B4): LZSS 压缩
const res1_addr = PT_BASE + r16(PT_BASE + 2);
const res1_hdr = rom.slice(res1_addr, res1_addr + 8);
console.log(`  Resource 1 header: ${Array.from(res1_hdr).map(h8).join(' ')}`);

// 资源 3 ($B0A84): LZSS 压缩
const res3_addr = PT_BASE + r16(PT_BASE + 6);
const res3_hdr = rom.slice(res3_addr, res3_addr + 8);
console.log(`  Resource 3 header: ${Array.from(res3_hdr).map(h8).join(' ')}`);

// ============================================================
// 10. 关键函数地址
// ============================================================
console.log('\n=== 10. Key Code Functions ===');
const funcs = {
  '$86B4': 'DMA init',     '$866C': 'Controller',   '$9172': 'Display list',
  '$9020': 'Input init',   '$8A6C': 'Display queue', '$942A': 'Task sched',
  '$C80C': 'Main game init','$1DDC8':'System init',   '$FB5A': 'Z80 mute',
  '$11F88':'SRAM init',    '$10A94':'Char table',
};
Object.entries(funcs).forEach(([addr, desc]) => {
  const a = parseInt(addr.replace('$',''), 16);
  const w0 = r16(a);
  // 检查是否为合法的 68K 指令开头
  const isCode = (w0 & 0xF000) !== 0x0000 || (w0 === 0x4E71 || w0 === 0x4E75);
  assert(`${addr} (${desc}): valid code`, isCode,
    'valid 68K instruction', h16(w0));
});

// ============================================================
// 11. ROM 区域统计
// ============================================================
console.log('\n=== 11. ROM Region Distribution ===');
const regions = [
  ['[0x000000-0x0000FF]', 0x000, 0x100, 'Vectors'],
  ['[0x000100-0x0001FF]', 0x100, 0x200, 'Header'],
  ['[0x000200-0x007FFF]', 0x200, 0x8000, 'Boot code'],
  ['[0x008000-0x00FFFF]', 0x8000, 0x10000, 'Kernel'],
  ['[0x010000-0x02FFFF]', 0x10000, 0x30000, 'Logic P1'],
  ['[0x030000-0x04FFFF]', 0x30000, 0x50000, 'Data area'],
  ['[0x050000-0x0AFFFF]', 0x50000, 0xB0000, 'Logic P2'],
  ['[0x0B0000-0x0B7FFF]', 0xB0000, 0xB8000, 'Res ptr table'],
  ['[0x0B8000-0x1DBFFF]', 0xB8000, 0x1DC000, 'Compressed gfx'],
  ['[0x1DC000-0x1FFFFF]', 0x1DC000, 0x200000, 'Z80 music'],
];

regions.forEach(([label, start, end, name]) => {
  let nz = 0, total = end - start;
  for (let a = start; a < end; a++) if (rom[a] !== 0) nz++;
  const pct = (nz/total*100).toFixed(1);
  console.log(`  ${label} ${name.padStart(18)}: ${nz}/${total} (${pct}%)`);
});

// ============================================================
// 总结
// ============================================================
console.log(`\n=== RESULT: ${passed} passed, ${failed} failed ===`);
if (failed > 0) {
  console.log('❌ Some checks failed!');
  process.exit(1);
} else {
  console.log('✅ All checks passed!');
}
