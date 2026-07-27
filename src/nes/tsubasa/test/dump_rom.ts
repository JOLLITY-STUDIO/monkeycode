/**
 * dump_rom.ts — ROM 数据转储工具
 *
 * 分析 ROM 结构、脚本数据、CHR patterns 等，
 * 帮助诊断 ROM 加载和脚本解析是否正确。
 */
import { romUint8Array } from '../src/rom_data';
import { setRomBuffer } from '../src/tsubasanes/scene/script_loader';

const PRG_START = 16;
const BANK_SIZE = 8192;

function hex(n: number, pad = 4): string {
  return '0x' + n.toString(16).toUpperCase().padStart(pad, '0');
}

export function dumpRomHeader(): {
  nesHeader: string;
  prgPages: number;
  chrPages: number;
  prgSizeKB: number;
  chrSizeKB: number;
  mapperLo: number;
  mapperHi: number;
  mapper: number;
  mirroring: string;
} {
  const rom = romUint8Array();
  const prgPages = rom[4];
  const chrPages = rom[5];
  const mapperLo = (rom[6] >> 4) & 0xF;
  const mapperHi = rom[7] & 0xF0;
  const mapper = mapperHi | mapperLo;

  return {
    nesHeader: String.fromCharCode(...rom.slice(0, 4)),
    prgPages,
    chrPages,
    prgSizeKB: prgPages * 16,
    chrSizeKB: chrPages * 8,
    mapperLo,
    mapperHi,
    mapper,
    mirroring: (rom[6] & 1) ? 'Vertical' : 'Horizontal',
  };
}

/** 读取 Bank 3 指针表中的脚本指针 */
export function dumpScriptPointer(scriptNum: number): {
  scriptNum: number;
  rawLo: number;
  rawHi: number;
  absAddr: number;
  bank4Offset: number;
} | null {
  const rom = romUint8Array();
  const ptrBase = PRG_START + 3 * BANK_SIZE;
  const ptrOffset = scriptNum * 2;

  if (ptrBase + ptrOffset + 1 >= rom.length) return null;
  const lo = rom[ptrBase + ptrOffset];
  const hi = rom[ptrBase + ptrOffset + 1];
  const absAddr = lo + (hi << 8);

  return {
    scriptNum,
    rawLo: lo,
    rawHi: hi,
    absAddr,
    bank4Offset: absAddr - 0xA000,
  };
}

/** 读取脚本数据 (Bank 4, 以 FF 结束) */
export function dumpScriptData(scriptNum: number): {
  scriptNum: number;
  offset: number;
  length: number;
  dataHex: string;
  firstBytes: number[];
} | null {
  const rom = romUint8Array();
  const ptr = dumpScriptPointer(scriptNum);
  if (!ptr) return null;

  const dataBase = PRG_START + 4 * BANK_SIZE;
  const start = dataBase + ptr.bank4Offset;
  if (start >= rom.length) return null;

  let end = start;
  while (end < rom.length && rom[end] !== 0xFF) end++;
  if (rom[end] === 0xFF) end++;

  const len = end - start;
  const data = Array.from(rom.slice(start, end));
  const first16 = data.slice(0, 16);

  return {
    scriptNum,
    offset: ptr.bank4Offset,
    length: len,
    dataHex: data.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '),
    firstBytes: first16,
  };
}

/** 转储 CHR bank 0 的前 128 字节 (前 8 个 tile 的数据) */
export function dumpChrFirst128(): { tileIndex: number; dataHex: string }[] {
  const rom = romUint8Array();
  const prgPages = rom[4];
  const chrStart = PRG_START + prgPages * 16384;
  const tiles: { tileIndex: number; dataHex: string }[] = [];

  for (let t = 0; t < 8; t++) {
    const offset = chrStart + t * 16;
    if (offset + 16 > rom.length) break;
    const bytes: number[] = [];
    for (let i = 0; i < 16; i++) bytes.push(rom[offset + i]);
    tiles.push({
      tileIndex: t,
      dataHex: bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '),
    });
  }
  return tiles;
}

/** 打印 ROM 头部详情 */
export function printRomHeader(): void {
  const h = dumpRomHeader();
  console.log('══════ ROM Header ══════');
  console.log(`  Header: "${h.nesHeader}"`);
  console.log(`  PRG: ${h.prgPages} × 16KB = ${h.prgSizeKB}KB`);
  console.log(`  CHR: ${h.chrPages} × 8KB = ${h.chrSizeKB}KB`);
  console.log(`  Mapper: ${h.mapper} (${h.mapper === 4 ? 'MMC3' : 'other'})`);
  console.log(`  Mirroring: ${h.mirroring}`);
  console.log('');
}

/** 打印 ROM 进度表 (Table 1-4 for scene 0) */
export function printProgressTables(): void {
  const rom = romUint8Array();
  const bank0 = PRG_START + 0 * BANK_SIZE;

  // Table 1: $83DC → bank0 offset $03DC
  // Table 2: $83FE → bank0 offset $03FE
  // Table 3: $8420 → bank0 offset $0420
  // Table 4: $8442 → bank0 offset $0442
  // Transition table: $8398 → bank0 offset $0398

  const tables = [
    { name: 'Table 1 ($83DC)', offset: 0x03DC, len: 35 },
    { name: 'Table 2 ($83FE)', offset: 0x03FE, len: 33 },
    { name: 'Table 3 ($8420)', offset: 0x0420, len: 34 },
    { name: 'Table 4 ($8442)', offset: 0x0442, len: 34 },
  ];

  console.log('══════ Progress Tables (scene 0) ══════');
  for (const t of tables) {
    const val = rom[bank0 + t.offset];
    console.log(`  ${t.name}: scene_0 → ${val === 0 ? '(none)' : `script ${val.toString(16)}`}`);
  }

  // Transition for scene 0
  const transition = rom[bank0 + 0x0398];
  console.log(`  Scene transition ($8398): scene_0 → ${transition === 0 ? '(stay)' : `scene ${transition.toString(16)}`}`);
  console.log('');
}

/** 打印 ROM 脚本 2 和 3 的数据 */
export function printScripts(): void {
  console.log('══════ Script Data ══════');
  for (const num of [0, 1, 2, 3, 4]) {
    const data = dumpScriptData(num);
    if (data) {
      console.log(`  Script ${num} (${data.length}B): ${data.dataHex.slice(0, 80)}${data.dataHex.length > 80 ? '...' : ''}`);
    } else {
      console.log(`  Script ${num}: NOT FOUND`);
    }
  }
  console.log('');
}

/** 运行完整诊断 */
export function runFullDump(): void {
  setRomBuffer(romUint8Array());
  printRomHeader();
  printProgressTables();
  printScripts();
}
