/**
 * rom.ts — Langrisser II MD ROM 基础读取工具 (TypeScript版)
 *
 * 严格基于 md.js 逻辑转写
 * - read8 / read16BE / read32BE: 大端读取 (与 md.js 中 readU8/readU16/readU32 一致)
 * - parseROM: 严格对应 md.js parseROM, 返回 { systemType, title, romEnd }
 */

// === 基础读取工具 (与 md-map.js / md-character.js 内部 readU8/readU16/readU32 一致) ===

/** 读取单字节 (无符号) */
export function read8(rom: Uint8Array, addr: number): number {
  if (addr >= rom.length) return 0;
  return rom[addr] & 0xFF;
}

/** 读取大端16位 (与 md.js readU16 一致) */
export function read16BE(rom: Uint8Array, addr: number): number {
  if (addr + 1 >= rom.length) return 0;
  const dv = new DataView(rom.buffer, rom.byteOffset, rom.byteLength);
  return dv.getUint16(addr, false);
}

/** 读取大端32位 (与 md.js readU32 一致, 含越界保护) */
export function read32BE(rom: Uint8Array, addr: number): number {
  if (addr + 3 >= rom.length) return 0;
  const dv = new DataView(rom.buffer, rom.byteOffset, rom.byteLength);
  return dv.getUint32(addr, false) >>> 0;
}

/** 读取连续字节 */
export function readBytes(rom: Uint8Array, addr: number, len: number): Uint8Array {
  return rom.slice(addr, addr + len);
}

/** 读取ASCII字符串 (trim空字符) */
export function readString(rom: Uint8Array, addr: number, len: number): string {
  const bytes = rom.slice(addr, addr + len);
  return new TextDecoder().decode(bytes).replace(/\0/g, '').trim();
}

// === parseROM 返回类型 (严格按 md.js) ===
export interface ROMInfo {
  systemType: string;   // 0x100-0x110, 通常为 "SEGA MEGA DRIVE" / "SEGA GENESIS"
  title: string;        // 0x120-0x150, ROM 标题
  romEnd: number;       // ROM 实际结束地址 (基于 0x1A4-0x1A8 范围计算)
}

// === parseROM (严格按 md.js, 完全相同逻辑) ===
//
// md.js 原始实现:
//   export function parseROM(data) {
//     const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
//     const systemType = new TextDecoder().decode(data.slice(0x100, 0x110)).replace(/\0/g, '').trim();
//     const title = new TextDecoder().decode(data.slice(0x120, 0x150)).replace(/\0/g, '').trim();
//     let romEnd = data.length;
//     for (let addr = 0x1A4; addr < 0x1A8; addr += 2) {
//       const v = view.getUint16(addr, false);
//       if (v !== 0xFFFF && v > 0) {
//         romEnd = Math.min((v + 1) * 0x80000, data.length);
//       }
//     }
//     return { systemType, title, romEnd };
//   }
export function parseROM(data: Uint8Array): ROMInfo {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  const systemType = new TextDecoder().decode(data.slice(0x100, 0x110)).replace(/\0/g, '').trim();
  const title = new TextDecoder().decode(data.slice(0x120, 0x150)).replace(/\0/g, '').trim();

  let romEnd = data.length;
  for (let addr = 0x1A4; addr < 0x1A8; addr += 2) {
    const v = view.getUint16(addr, false);
    if (v !== 0xFFFF && v > 0) {
      romEnd = Math.min((v + 1) * 0x80000, data.length);
    }
  }

  return { systemType, title, romEnd };
}

// === ROM 偏移表 (与各 md-*.js 中的地址常量保持一致, 供统一引用) ===
export const ROM_OFFSETS = {
  // md-classes.js
  CLASS_NAME_ADDR: 0x05E958,
  CLASS_DATA_ADDR: 0x05EDDC,
  CLASS_ENTRY_SIZE: 0x1C,
  // 注: 0x060000 已确认不是转职路线表 (Ghidra无引用)

  // md-character.js
  CHAR_INIT_TABLE: 0x05E64A,
  CHAR_INIT_ENTRY_SIZE: 0x0E,
  CHAR_INIT_DATA_SIZE: 0x0E,
  CHAR_COUNT: 10,
  CHAR_MODIFIER_TABLE: 0x082A59,
  CHAR_MODIFIER_SIZE: 6,
  CHAR_RAM_PTR_TABLE: 0x05E5D8,
  CHAR_RAM_PTR_COUNT: 16,
  RAM_CHAR_TABLE: 0xFFFFA4CC,

  // md-character.js 场景配置
  SCENARIO_UNIT_CONFIG_PTR_TABLE: 0x0821BE,
  SCENARIO_CONFIG_SIZE: 128,
  SCENARIO_CONFIG_DWORD_COUNT: 32,
  SCENARIO_COUNT: 31,

  // md-map.js
  LEVEL_MAP_TABLE: 0x61CB0,
  LEVEL_AUX1_TABLE: 0x61D2C,
  LEVEL_AUX2_TABLE: 0x61D30,
  TILE_REMAP1_TABLE: 0x61E24,
  TILE_REMAP2_TABLE: 0x61E28,

  // md-units.js
  SCENARIO_INIT_TABLE: 0x18005E,    // PTR_LAB_0018005e 关卡配置指针表
  UNIT_SIZE: 0x60,                  // RAM 单位槽大小
} as const;
