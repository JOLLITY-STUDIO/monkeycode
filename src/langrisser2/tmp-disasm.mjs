import fs from 'fs';

const rom = fs.readFileSync('20260713/otherversionroms/Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin');
const r16 = (a) => (rom[a] << 8) | rom[a + 1];
const r32 = (a) => (rom[a] << 24) | (rom[a + 1] << 16) | (rom[a + 2] << 8) | rom[a + 3];
const r8 = (a) => rom[a] & 0xff;

function disasm(addr) {
  const op = r16(addr);
  let len = 2;
  let s = 'op 0x' + op.toString(16).padStart(4, '0');
  if (op === 0x4eb9) { s = 'jsr 0x' + r32(addr + 2).toString(16).padStart(8, '0'); len = 6; }
  else if (op === 0x4e75) { s = 'rts'; }
  else if (op === 0x60fe) { s = 'bra *'; }
  else if ((op & 0xff00) === 0x6700) { s = 'beq.w 0x' + (addr + 2 + ((r16(addr + 2) & 0x8000) ? r16(addr + 2) - 0x10000 : r16(addr + 2))).toString(16); len = 4; }
  else if ((op & 0xff00) === 0x6000) { s = 'bra.w 0x' + (addr + 2 + ((r16(addr + 2) & 0x8000) ? r16(addr + 2) - 0x10000 : r16(addr + 2))).toString(16); len = 4; }
  else if ((op & 0xf1f8) === 0x2040) { s = 'movea.l d0,a0'; }
  else if ((op & 0xffc0) === 0x21c0) { s = 'move.l d0,' + (op & 0x3f).toString(16); }
  else if ((op & 0xff00) === 0x7000) { s = 'moveq #' + ((op & 0xff) << 24 >> 24) + ',d' + (op >> 9); }
  else if ((op & 0xf100) === 0x1000) { s = 'move.b'; }
  else if ((op & 0xf100) === 0x3000) { s = 'move.w'; }
  else if ((op & 0xf000) === 0x6000) { s = 'bra'; }
  return { s, len };
}

let addr = 0xCA0A;
for (let i = 0; i < 80; i++) {
  const d = disasm(addr);
  console.log('0x' + addr.toString(16).padStart(6, '0') + '  ' + d.s);
  addr += d.len;
  if (addr > 0xCB00 || d.s === 'rts' || d.s === 'bra *') break;
}

console.log('\n--- CA0A -> CAF2 ---');

// 反汇编 CA0A 到 CAF2 之间的所有 JSR
for (let a = 0xCA0A; a < 0xCAF2; a += 2) {
  const op = r16(a);
  if (op === 0x4eb9) {
    const target = r32(a + 2);
    console.log('  0x' + a.toString(16).padStart(6, '0') + ' jsr 0x' + target.toString(16).padStart(8, '0'));
  }
}

// 搜索 CA0A 附近写 VDP 的代码
console.log('\n--- VDP writes in CA0A-CAF2 ---');
for (let a = 0xCA0A; a < 0xCAF2; a += 2) {
  const op = r16(a);
  // move.w #imm, (0xC00004).L  => 33FC xxxx 00C00004
  if (op === 0x33fc && r32(a + 4) === 0x00c00004) {
    console.log('  0x' + a.toString(16).padStart(6, '0') + ' VDP_CTRL = 0x' + r16(a + 2).toString(16).padStart(4, '0'));
    a += 6;
  }
  // move.w dn, (0xC00000).L => 3xF9 00C00000
  else if ((op & 0xf1) === 0x30 && r16(a + 2) === 0x00c0 && r32(a + 4) === 0x00000000) {
    console.log('  0x' + a.toString(16).padStart(6, '0') + ' VDP_DATA');
    a += 6;
  }
}

// 搜索 CA0A 附近对 nametable 地址 0xC000 的设置
console.log('\n--- address 0xC000 / 0xD000 / 0xE000 in code ---');
for (let a = 0xCA0A; a < 0xCC00; a += 2) {
  if (op === 0x33fc && r32(a + 4) === 0x00c00004) {
    const imm = r16(a + 2);
    if ((imm & 0x3f00) === 0x4000 || (imm & 0x3f00) === 0x5000 || (imm & 0x3f00) === 0x6000) {
      console.log('  0x' + a.toString(16).padStart(6, '0') + ' set addr 0x' + imm.toString(16).padStart(4, '0'));
    }
  }
}
