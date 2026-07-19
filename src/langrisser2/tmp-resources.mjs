import fs from 'fs';
const rom = fs.readFileSync('20260713/otherversionroms/Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin');
const r8 = (a) => rom[a] & 0xff;
const r16 = (a) => (r8(a) << 8) | r8(a + 1);
const r32 = (a) => (r16(a) << 16) | r16(a + 2);

function getResourceOffset(i) { return r32(0xB0000 + i * 4); }

const ids = [0x8001, 0x8003, 0x8008, 0x80E1, 0x80E2, 0x80E3, 0x80E6, 0x80DF];
for (const id of ids) {
  const shift = id & 0x3F;
  const entry = (id & 0x7FFF) >> shift;
  const off = getResourceOffset(entry);
  const next = getResourceOffset(entry + 1);
  const size = next - off;
  const type = r8(off);
  console.log('ID 0x' + id.toString(16) + ' -> entry ' + entry + ' @ 0x' + off.toString(16) + ' size ' + size + ' type ' + type);
}

// 也检查 entry 1,3,8 直接
for (const entry of [1, 3, 8]) {
  const off = getResourceOffset(entry);
  const next = getResourceOffset(entry + 1);
  const size = next - off;
  const type = r8(off);
  console.log('Entry ' + entry + ' @ 0x' + off.toString(16) + ' size ' + size + ' type ' + type + ' tiles ' + Math.floor(size / 32));
}

// 找标题画面区域其他资源加载
console.log('\n--- 0xC000-0xD000 calls with context ---');
for (let i = 0xC000; i < 0xD000; i += 2) {
  if (r16(i) === 0x4eb9 && r32(i + 2) === 0x000099b2) {
    console.log('0x' + i.toString(16).padStart(6, '0') + ' jsr 0x99b2');
  }
}
