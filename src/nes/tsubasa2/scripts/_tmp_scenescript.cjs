// 临时侦察: 场景脚本 $8464 映射表 + 脚本指针解析 (修正版)
// $8464: Y 从 2 开始, 每步 +2; CMP $8AEE,Y(high); BCS loop; SBC $8AEC,Y(low); LDX $8AED,Y(slot)
const fs = require('fs');
const path = require('path');

function loadBank(file) {
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'game', 'data', file), 'utf8');
  const m = src.match(/=\s*\[([\s\S]*?)\];/);
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{1,2})/g;
  let mm;
  while ((mm = re.exec(m[1]))) bytes.push(parseInt(mm[1], 16));
  return bytes;
}

const b00 = loadBank('prg-bank-00.ts'); // index i = CPU $8000+i
const b01 = loadBank('prg-bank-01.ts'); // index i = CPU $A000+i
const b31 = loadBank('prg-bank-31.ts'); // index i = CPU $E000+i (假设固定上 bank)

console.log('=== $8464 映射表解析 (Y=2 起) ===');
const lowT = (i) => b00[0x8AEC - 0x8000 + i];
const slotT = (i) => b00[0x8AED - 0x8000 + i];
const highT = (i) => b00[0x8AEE - 0x8000 + i];
for (let y = 2; y < 0x12; y += 2) {
  const lo = lowT(y), sl = slotT(y), hi = highT(y);
  console.log(`Y=${y} range[$${lo.toString(16)},$${hi.toString(16)}) slot=$${sl.toString(16)}`);
}

// 解析: scriptId → wordIdx = delta*2 → 指针
function resolveScript(scriptId) {
  let y = 2;
  while (y < 0x20) {
    const hi = highT(y);
    if (scriptId < hi) break;
    y += 2;
  }
  const lo = lowT(y);
  const delta = (scriptId - lo) & 0xFF;
  const wi = delta * 2;
  const pLo = b01[wi] ?? -1;
  const pHi = b01[wi + 1] ?? -1;
  const ptr = (pLo | (pHi << 8)) & 0xFFFF;
  return { y, lo, delta, wi, word: [pLo, pHi], ptr };
}

// 解析指针指向的字节流 (CPU 地址 → bank 文件 + 偏移)
function readPtr(ptr, len) {
  if (ptr >= 0xE000 && ptr <= 0xFFFF) {
    const off = ptr - 0xE000;
    const arr = b31.slice(off, off + len);
    return { bank: 'prg-bank-31', addr: ptr, bytes: arr };
  }
  if (ptr >= 0xA000 && ptr <= 0xBFFF) {
    const off = ptr - 0xA000;
    const arr = b01.slice(off, off + len);
    return { bank: 'prg-bank-01', addr: ptr, bytes: arr };
  }
  if (ptr >= 0x8000 && ptr <= 0x9FFF) {
    const off = ptr - 0x8000;
    const arr = b00.slice(off, off + len);
    return { bank: 'prg-bank-00', addr: ptr, bytes: arr };
  }
  return { bank: '??', addr: ptr, bytes: [] };
}

console.log('\n=== 场景脚本解析 (SCENE_STAT 表值 + SCENE_SUB_TBL) ===');
const ids = [0x23, 0x24, 0x25, 0x26, 0x2A, 0x30, 0x3F, 0x43, 0x44, 0x45, 0x46, 0x47, 0x49, 0x4B, 0x4D, 0x4E, 0x4F, 0x51, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x4C, 0x50, 0x52];
for (const id of ids) {
  const r = resolveScript(id);
  const stream = readPtr(r.ptr, 24);
  const hex = stream.bytes.slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`script=$${id.toString(16)} → slot=$${b00[0x8AED - 0x8000 + r.y].toString(16)} delta=${r.delta} word@$${(0xA000 + r.wi).toString(16)}=$${r.ptr.toString(16)} [${stream.bank}] bytes: ${hex}`);
}

// 顺带: dump bank01 word 区 $A006-$A0C0 附近原始字节 (确认 word 表布局)
console.log('\n=== bank01 $A000-$A0C0 逐字节 (word 表区) ===');
for (let a = 0; a <= 0xC0; a += 0x10) {
  const row = [];
  for (let i = 0; i < 16; i++) row.push((b01[a + i] ?? 0).toString(16).padStart(2, '0'));
  console.log(`$A${a.toString(16).padStart(2, '0')}: ${row.join(' ')}`);
}
