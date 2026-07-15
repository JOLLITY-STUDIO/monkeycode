/**
 * debug-unit-struct-v2.mjs
 * 根据 asm 反汇编确认的正确结构重新解析 Stage 1
 *
 * 关键发现 (from rom.asm loc_010CB4-010D0C):
 * - 场景配置指针表: 0x18005E, 每项 4 字节 (32-bit pointer)
 * - 配置结构:
 *   +0: word -> A610
 *   +2: word -> A611
 *   +4: ptr -> player unit list (由 loc_010E64 处理)
 *   +8: ptr -> enemy unit list (主循环读取)
 *   +0xC: ?
 * - 单位列表: 首 word 为单位数量
 * - 单位 struct (stride 0x1E):
 *   +0x00: classId
 *   +0x06: x
 *   +0x07: y
 *   +0x08: status flags (RAM 0x20)
 *   +0x09: item ID (RAM 0x21)
 *   +0x0A: HP (word)
 *   +0x0C: MP (word)
 *   +0x18: ? (word)
 *   +0x1A: commanderId / character index
 *   +0x1C: extra flags
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const LEVEL = 0; // Stage 1
const mapPtr = readU32(0x61CB0 + LEVEL * 4);
const mapW = readU16(mapPtr);
const mapH = readU16(mapPtr + 2);
console.log(`Map ${mapW}x${mapH}\n`);

const cfgPtr = readU32(0x18005E + LEVEL * 4) & 0xFFFFFF;
console.log(`Config pointer: 0x${cfgPtr.toString(16).padStart(6, '0')}`);
console.log('Config header:');
for (let off = 0; off <= 16; off += 4) {
  const u = readU32(cfgPtr + off);
  console.log(`  +0x${off.toString(16).padStart(2, '0')}: 0x${u.toString(16).padStart(8, '0')}`);
}
console.log('  (as words)');
for (let off = 0; off <= 16; off += 2) {
  const u = readU16(cfgPtr + off);
  console.log(`  +0x${off.toString(16).padStart(2, '0')}: 0x${u.toString(16).padStart(4, '0')} (${u})`);
}

function parseUnitList(label, ptr) {
  if (!ptr || ptr >= rom.length) {
    console.log(`\n${label}: invalid pointer 0x${ptr.toString(16)}`);
    return;
  }
  const count = readU16(ptr);
  console.log(`\n${label} at 0x${ptr.toString(16).padStart(6, '0')}: count=${count}`);
  const units = [];
  for (let i = 0; i < count && i < 50; i++) {
    const a = ptr + 2 + i * 0x1E;
    if (a + 0x1E > rom.length) break;
    const cls = rom[a];
    const x = rom[a + 6], y = rom[a + 7];
    const status = rom[a + 8];
    const item = rom[a + 9];
    const hp = readU16(a + 0x0A);
    const mp = readU16(a + 0x0C);
    const w18 = readU16(a + 0x18);
    const cmd = rom[a + 0x1A];
    const extra = rom[a + 0x1C];
    const valid = (x > 0 && x < mapW && y > 0 && y < mapH);
    units.push({ cls, cmd, x, y, hp, mp, w18, status, item, extra, valid });
  }
  console.log(`| # | classId | cmdId | 坐标 | HP | MP | w18 | status | item | extra | valid |`);
  console.log(`|---|---|---|---|---|---|---|---|---|---|---|`);
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    console.log(`| ${i+1} | 0x${u.cls.toString(16).padStart(2,'0')} | 0x${u.cmd.toString(16).padStart(2,'0')} | (${u.x},${u.y})${u.valid?'':'⚠'} | ${u.hp} | ${u.mp} | ${u.w18} | 0x${u.status.toString(16)} | 0x${u.item.toString(16)} | 0x${u.extra.toString(16)} |`);
  }
}

parseUnitList('Player list (+4)', readU32(cfgPtr + 4));
parseUnitList('Enemy list (+8)', readU32(cfgPtr + 8));
parseUnitList('Unknown list (+C)', readU32(cfgPtr + 0x0C));
parseUnitList('Unknown list (+10)', readU32(cfgPtr + 0x10));
parseUnitList('Unknown list (+14)', readU32(cfgPtr + 0x14));
