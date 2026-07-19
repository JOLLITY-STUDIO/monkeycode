import fs from 'fs';

const romPath = '20260713/otherversionroms/Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin';
const rom = new Uint8Array(fs.readFileSync(romPath));

const r8 = (a) => rom[a] & 0xff;
const r16 = (a) => ((r8(a) << 8) | r8(a + 1));
const r32 = (a) => ((r16(a) << 16) | r16(a + 2));

function getResourceOffset(i) {
  return r32(0xB0000 + i * 4);
}

const calls = [];
for (let i = 0; i < rom.length - 6; i += 2) {
  if (r16(i) === 0x4eb9 && r32(i + 2) === 0x000099b2) {
    calls.push(i);
  }
}

console.log('Total 99b2 calls:', calls.length);
console.log('Title region 0xC000-0xD000 calls:');

for (const ca of calls.filter((a) => a >= 0xC000 && a < 0xD000)) {
  let d0 = null;
  let a1 = null;
  let a1IsD0 = false;
  for (let b = 2; b <= 80; b += 2) {
    const ad = ca - b;
    if (ad < 0) break;
    const op = r16(ad);
    if ((op & 0xfff8) === 0x203c && d0 === null) {
      d0 = r32(ad + 2);
      b += 4;
    } else if ((op & 0xfff8) === 0x303c && d0 === null) {
      d0 = r16(ad + 2);
      b += 2;
    } else if ((op & 0xfff8) === 0x43f8 && a1 === null) {
      a1 = r32(ad + 2);
      b += 4;
    } else if ((op & 0xffc0) === 0x2240 && a1 === null) {
      a1IsD0 = true;
    } else if (d0 !== null && a1 !== null) break;
  }

  console.log(
    '  0x' + ca.toString(16).padStart(6, '0') +
    ': D0=' + (d0 !== null ? '0x' + d0.toString(16).padStart(4, '0') : '?') +
    ' A1=' + (a1 !== null ? '0x' + a1.toString(16).padStart(6, '0') : a1IsD0 ? '=D0' : '?')
  );

  if (d0 !== null && d0 >= 0x8000) {
    const idx = (d0 - 0x8000) >> 1;
    const off = getResourceOffset(idx);
    const next = getResourceOffset(idx + 1);
    console.log('    -> entry ' + idx + ', offset 0x' + off.toString(16).padStart(6, '0') + ', size ' + (next - off));
  }
}

// 列出场景表
console.log('\nScene table at 0x61CB0:');
for (let i = 0; i < 8; i++) {
  const p = r32(0x61CB0 + i * 4);
  if (p > 0 && p < 0x200000) {
    console.log('  Scene ' + (i + 1) + ': 0x' + p.toString(16) + ' w=' + r16(p) + ' h=' + r16(p + 2));
  }
}

// 列出 0x61E24 / 0x61D2C 表
console.log('\nTable at 0x61E24 (per scene):');
for (let i = 0; i < 8; i++) {
  const off = 0x61E24 + i * 8;
  const l1 = r32(off);
  const l2 = r32(off + 4);
  console.log('  ' + i + ': 0x' + l1.toString(16).padStart(8, '0') + ' 0x' + l2.toString(16).padStart(8, '0'));
}

console.log('\nTable at 0x61D2C (per scene):');
for (let i = 0; i < 8; i++) {
  const off = 0x61D2C + i * 8;
  const l1 = r32(off);
  const l2 = r32(off + 4);
  console.log('  ' + i + ': 0x' + l1.toString(16).padStart(8, '0') + ' 0x' + l2.toString(16).padStart(8, '0'));
}

console.log('\nTable at 0x82142 (per scene):');
for (let i = 0; i < 8; i++) {
  const off = 0x82142 + i * 4;
  const l1 = r32(off);
  console.log('  ' + i + ': 0x' + l1.toString(16).padStart(8, '0'));
}
