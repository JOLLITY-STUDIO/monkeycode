/**
 * MATCH_SCRIPTS_BANK_10 — bank10 比赛场景脚本 ($A000-$BFFF 窗口)
 * @bank 10
 *
 * 按场景段拆分: 每个脚本 = 多个场景段, 每段一个 readonly number[]。
 * 场景段边界 = sceneLoad(0xFA) / jump(0xFE) / end(0xFF)。
 * 消费方: bank19 (比赛场景) 通过 $0441 场景bank号 + 指针读, 不走 ScriptEngine/scriptIdLookup。
 */

// ═══ 脚本 0x00 (entryAddr=0xbe, 8B, 1个场景段) ═══
/** SCRIPT_0x00_SCENE_0 — 场景段0 (8B) */
export const SCRIPT_0x00_SCENE_0: readonly number[] = [
  0x3d,  // text(1B)
  0xf5, 0xf1,  // $F5 setPtr(0xf1)
  0x1e, 0x36, 0x88, 0x37,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x00 的场景段列表 */
export const SCRIPT_0x00: readonly (readonly number[])[] = [
  SCRIPT_0x00_SCENE_0,
];

// ═══ 脚本 0x01 (entryAddr=0xc6, 42B, 1个场景段) ═══
/** SCRIPT_0x01_SCENE_0 — 场景段0 (42B) */
export const SCRIPT_0x01_SCENE_0: readonly number[] = [
  0x00,  // text(1B)
  0xf1, 0x1e, 0xf6,  // $F1 textPtr(0x1e,0xf6)
  0xf7,  // $F7 toggle()
  0x05, 0x00, 0x00,  // text(3B)
  0xe2,  // lineEdit(0xe2)
  0xf5, 0x88,  // $F5 setPtr(0x88)
  0x37, 0x01, 0x88, 0x6f, 0x01, 0x88, 0xba, 0x01, 0x89, 0x08, 0x01,  // text(11B)
  0xf0, 0xf5, 0x88,  // $F0 textPos(0xf5,0x88)
  0x37,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x02, 0x03, 0x88, 0x6f, 0x03, 0x88, 0xba, 0x03, 0x89, 0x08, 0x03, 0xa0,  // text(14B)
  0xdd,  // wait(80帧)
];

/** 脚本 0x01 的场景段列表 */
export const SCRIPT_0x01: readonly (readonly number[])[] = [
  SCRIPT_0x01_SCENE_0,
];

// ═══ 脚本 0x02 (entryAddr=0xf0, 42B, 1个场景段) ═══
/** SCRIPT_0x02_SCENE_0 — 场景段0 (42B) */
export const SCRIPT_0x02_SCENE_0: readonly number[] = [
  0x2d,  // text(1B)
  0xf1, 0x1e, 0xf6,  // $F1 textPtr(0x1e,0xf6)
  0xf7,  // $F7 toggle()
  0x05, 0x00, 0x00,  // text(3B)
  0xe2,  // lineEdit(0xe2)
  0xf5, 0x88,  // $F5 setPtr(0x88)
  0x52, 0x01, 0x88, 0x93, 0x01, 0x88,  // text(6B)
  0xdf,  // wait(240帧)
  0x01, 0x89, 0x2f, 0x01,  // text(4B)
  0xf0, 0xf5, 0x88,  // $F0 textPos(0xf5,0x88)
  0x52,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x02, 0x03, 0x88, 0x93, 0x03, 0x88,  // text(8B)
  0xdf,  // wait(240帧)
  0x03, 0x89, 0x2f, 0x03, 0xa1, 0x07,  // text(6B)
];

/** 脚本 0x02 的场景段列表 */
export const SCRIPT_0x02: readonly (readonly number[])[] = [
  SCRIPT_0x02_SCENE_0,
];

// ═══ 脚本 0x03 (entryAddr=0x11a, 12B, 2个场景段) ═══
/** SCRIPT_0x03_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x03_SCENE_0: readonly number[] = [
  0x3c,  // text(1B)
  0xf1, 0xae, 0x44,  // $F1 textPtr(0xae,0x44)
  0x89, 0x59,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x03_SCENE_1 — 场景段1 (3B) */
export const SCRIPT_0x03_SCENE_1: readonly number[] = [
  0x00, 0x50,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x03 的场景段列表 */
export const SCRIPT_0x03: readonly (readonly number[])[] = [
  SCRIPT_0x03_SCENE_0,
  SCRIPT_0x03_SCENE_1,
];

// ═══ 脚本 0x04 (entryAddr=0x126, 38B, 2个场景段) ═══
/** SCRIPT_0x04_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x04_SCENE_0: readonly number[] = [
  0x3c,  // text(1B)
  0xf1, 0xab, 0x44,  // $F1 textPtr(0xab,0x44)
  0x89, 0x73,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x04_SCENE_1 — 场景段1 (29B) */
export const SCRIPT_0x04_SCENE_1: readonly number[] = [
  0x00, 0x50,  // text(2B)
  0xea,  // $EA fadeOutClear()
  0xf7,  // $F7 toggle()
  0x2e, 0x00, 0x00, 0x89, 0x73, 0x01,  // text(6B)
  0xf7,  // $F7 toggle()
  0xe2,  // lineEdit(0xe2)
  0x00, 0x00, 0x89, 0x73, 0x01,  // text(5B)
  0xf0, 0xf7, 0x79,  // $F0 textPos(0xf7,0x79)
  0x00, 0x00, 0x03,  // text(3B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x89, 0x73,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x04 的场景段列表 */
export const SCRIPT_0x04: readonly (readonly number[])[] = [
  SCRIPT_0x04_SCENE_0,
  SCRIPT_0x04_SCENE_1,
];

// ═══ 脚本 0x05 (entryAddr=0x14c, 12B, 1个场景段) ═══
/** SCRIPT_0x05_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x05_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0x1e, 0x4e,  // $F1 textPtr(0x1e,0x4e)
  0x90, 0x6b,  // text(2B)
  0xf7,  // $F7 toggle()
  0x2e, 0x00, 0x00, 0x07,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x05 的场景段列表 */
export const SCRIPT_0x05: readonly (readonly number[])[] = [
  SCRIPT_0x05_SCENE_0,
];

// ═══ 脚本 0x06 (entryAddr=0x158, 13B, 1个场景段) ═══
/** SCRIPT_0x06_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x06_SCENE_0: readonly number[] = [
  0x37,  // text(1B)
  0xf1, 0x30, 0x54,  // $F1 textPtr(0x30,0x54)
  0x8a, 0x19, 0x01,  // text(3B)
  0xf1, 0x30, 0xbe,  // $F1 textPtr(0x30,0xbe)
  0x8a, 0x19,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x06 的场景段列表 */
export const SCRIPT_0x06: readonly (readonly number[])[] = [
  SCRIPT_0x06_SCENE_0,
];

// ═══ 脚本 0x07 (entryAddr=0x165, 33B, 1个场景段) ═══
/** SCRIPT_0x07_SCENE_0 — 场景段0 (33B) */
export const SCRIPT_0x07_SCENE_0: readonly number[] = [
  0x37,  // text(1B)
  0xf1, 0x30, 0x44,  // $F1 textPtr(0x30,0x44)
  0x89,  // text(1B)
  0xdd,  // wait(80帧)
  0x01,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0xf1, 0x30, 0x3c,  // $F1 textPtr(0x30,0x3c)
  0x8a, 0x3e, 0x01,  // text(3B)
  0xf1, 0x30, 0x3b,  // $F1 textPtr(0x30,0x3b)
  0x8a, 0x3e, 0x01,  // text(3B)
  0xf0, 0xf1, 0x30,  // $F0 textPos(0xf1,0x30)
  0x20, 0x8a, 0x80, 0x01,  // text(4B)
  0xf1, 0x30, 0xa0,  // $F1 textPtr(0x30,0xa0)
  0x8a, 0x80,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x07 的场景段列表 */
export const SCRIPT_0x07: readonly (readonly number[])[] = [
  SCRIPT_0x07_SCENE_0,
];

// ═══ 脚本 0x08 (entryAddr=0x186, 9B, 1个场景段) ═══
/** SCRIPT_0x08_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x08_SCENE_0: readonly number[] = [
  0x01,  // text(1B)
  0xf1, 0x30, 0xbc,  // $F1 textPtr(0x30,0xbc)
  0x8a, 0x8c,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x1e,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x08 的场景段列表 */
export const SCRIPT_0x08: readonly (readonly number[])[] = [
  SCRIPT_0x08_SCENE_0,
];

// ═══ 脚本 0x09 (entryAddr=0x18f, 10B, 1个场景段) ═══
/** SCRIPT_0x09_SCENE_0 — 场景段0 (10B) */
export const SCRIPT_0x09_SCENE_0: readonly number[] = [
  0x01,  // text(1B)
  0xf1, 0x30, 0xc0,  // $F1 textPtr(0x30,0xc0)
  0xf5, 0x8a,  // $F5 setPtr(0x8a)
  0xe7,  // lineEdit(0xe7)
  0xf9,  // $F9 flagBit()
  0x1e,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x09 的场景段列表 */
export const SCRIPT_0x09: readonly (readonly number[])[] = [
  SCRIPT_0x09_SCENE_0,
];

// ═══ 脚本 0x0a (entryAddr=0x199, 9B, 1个场景段) ═══
/** SCRIPT_0x0a_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x0a_SCENE_0: readonly number[] = [
  0x06,  // text(1B)
  0xf1, 0x30, 0xbc,  // $F1 textPtr(0x30,0xbc)
  0x8b, 0x4a,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x1e,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x0a 的场景段列表 */
export const SCRIPT_0x0a: readonly (readonly number[])[] = [
  SCRIPT_0x0a_SCENE_0,
];

// ═══ 脚本 0x0b (entryAddr=0x1a2, 9B, 1个场景段) ═══
/** SCRIPT_0x0b_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x0b_SCENE_0: readonly number[] = [
  0x22,  // text(1B)
  0xf1, 0x30, 0xbc,  // $F1 textPtr(0x30,0xbc)
  0x8b, 0xa8,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x1e,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x0b 的场景段列表 */
export const SCRIPT_0x0b: readonly (readonly number[])[] = [
  SCRIPT_0x0b_SCENE_0,
];

// ═══ 脚本 0x0c (entryAddr=0x1ab, 7B, 1个场景段) ═══
/** SCRIPT_0x0c_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x0c_SCENE_0: readonly number[] = [
  0x30,  // text(1B)
  0xf1, 0x30, 0x3c,  // $F1 textPtr(0x30,0x3c)
  0x8b,  // text(1B)
  0xf9,  // $F9 flagBit()
  0xff,  // $FF end()
];

/** 脚本 0x0c 的场景段列表 */
export const SCRIPT_0x0c: readonly (readonly number[])[] = [
  SCRIPT_0x0c_SCENE_0,
];

// ═══ 脚本 0x0d (entryAddr=0x1b2, 8B, 1个场景段) ═══
/** SCRIPT_0x0d_SCENE_0 — 场景段0 (8B) */
export const SCRIPT_0x0d_SCENE_0: readonly number[] = [
  0x2e,  // text(1B)
  0xf1, 0x30, 0x30,  // $F1 textPtr(0x30,0x30)
  0xf5, 0x8c,  // $F5 setPtr(0x8c)
  0x5a,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x0d 的场景段列表 */
export const SCRIPT_0x0d: readonly (readonly number[])[] = [
  SCRIPT_0x0d_SCENE_0,
];

// ═══ 脚本 0x0e (entryAddr=0x1ba, 7B, 1个场景段) ═══
/** SCRIPT_0x0e_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x0e_SCENE_0: readonly number[] = [
  0x2f,  // text(1B)
  0xf1, 0x30, 0x4c,  // $F1 textPtr(0x30,0x4c)
  0x8c, 0xbd,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x0e 的场景段列表 */
export const SCRIPT_0x0e: readonly (readonly number[])[] = [
  SCRIPT_0x0e_SCENE_0,
];

// ═══ 脚本 0x0f (entryAddr=0x1c1, 9B, 1个场景段) ═══
/** SCRIPT_0x0f_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x0f_SCENE_0: readonly number[] = [
  0x08,  // text(1B)
  0xf1, 0x30, 0xc4,  // $F1 textPtr(0x30,0xc4)
  0x8d, 0x14,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x1e,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x0f 的场景段列表 */
export const SCRIPT_0x0f: readonly (readonly number[])[] = [
  SCRIPT_0x0f_SCENE_0,
];

// ═══ 脚本 0x10 (entryAddr=0x1ca, 50B, 3个场景段) ═══
/** SCRIPT_0x10_SCENE_0 — 场景段0 (25B) */
export const SCRIPT_0x10_SCENE_0: readonly number[] = [
  0x07,  // text(1B)
  0xf1, 0x06, 0x4e,  // $F1 textPtr(0x6,0x4e)
  0xec, 0xf7, 0x2f,  // $EC textSeq(0xf7,0x2f)
  0x00, 0x00, 0x8d, 0x72, 0x01,  // text(5B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x8d, 0x72, 0x01,  // text(6B)
  0xf0, 0xe6, 0xf7,  // $F0 textPos(0xe6,0xf7)
  0x00, 0x01,  // text(2B)
  0xff,  // $FF end()
];

/** SCRIPT_0x10_SCENE_1 — 场景段1 (17B) */
export const SCRIPT_0x10_SCENE_1: readonly number[] = [
  0x8d, 0xc2, 0x01, 0x92, 0x58, 0x01, 0x92, 0x97, 0x01, 0x92,  // text(10B)
  0xda,  // wait(20帧)
  0x01,  // text(1B)
  0xf0, 0xf7, 0x00,  // $F0 textPos(0xf7,0x0)
  0x01,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x10_SCENE_2 — 场景段2 (8B) */
export const SCRIPT_0x10_SCENE_2: readonly number[] = [
  0x8d, 0x9a, 0x01, 0x8d, 0x9a, 0x01, 0xa1,  // text(7B)
  0xf0,  // $F0 textPos()
];

/** 脚本 0x10 的场景段列表 */
export const SCRIPT_0x10: readonly (readonly number[])[] = [
  SCRIPT_0x10_SCENE_0,
  SCRIPT_0x10_SCENE_1,
  SCRIPT_0x10_SCENE_2,
];

// ═══ 脚本 0x11 (entryAddr=0x1fc, 32B, 1个场景段) ═══
/** SCRIPT_0x11_SCENE_0 — 场景段0 (32B) */
export const SCRIPT_0x11_SCENE_0: readonly number[] = [
  0x31,  // text(1B)
  0xf1, 0xd6, 0x56,  // $F1 textPtr(0xd6,0x56)
  0x8d, 0x7c,  // text(2B)
  0xf7,  // $F7 toggle()
  0x4e, 0x00, 0x00, 0x12,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xe6,  // lineEdit(0xe6)
  0x8d, 0xcc, 0x01, 0x92, 0x62, 0x01, 0x92, 0xa1, 0x01, 0x92,  // text(10B)
  0xe4,  // lineEdit(0xe4)
  0x01,  // text(1B)
  0xf0, 0x8d, 0xa4,  // $F0 textPos(0x8d,0xa4)
  0xff,  // $FF end()
];

/** 脚本 0x11 的场景段列表 */
export const SCRIPT_0x11: readonly (readonly number[])[] = [
  SCRIPT_0x11_SCENE_0,
];

// ═══ 脚本 0x12 (entryAddr=0x21c, 34B, 1个场景段) ═══
/** SCRIPT_0x12_SCENE_0 — 场景段0 (34B) */
export const SCRIPT_0x12_SCENE_0: readonly number[] = [
  0x12,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0xf1, 0x06, 0x4e,  // $F1 textPtr(0x6,0x4e)
  0x8d, 0x86,  // text(2B)
  0xf7,  // $F7 toggle()
  0x2e, 0x00, 0x00, 0x0e,  // text(4B)
  0xf0, 0xf7, 0x00,  // $F0 textPos(0xf7,0x0)
  0x00, 0x00,  // text(2B)
  0xe6,  // lineEdit(0xe6)
  0x92, 0x2d, 0x01, 0x92, 0x6c, 0x01, 0x92, 0xab, 0x01, 0x92,  // text(10B)
  0xee,  // $EE clearText()
  0x01,  // text(1B)
  0xf0, 0x8d, 0xae,  // $F0 textPos(0x8d,0xae)
  0xff,  // $FF end()
];

/** 脚本 0x12 的场景段列表 */
export const SCRIPT_0x12: readonly (readonly number[])[] = [
  SCRIPT_0x12_SCENE_0,
];

// ═══ 脚本 0x13 (entryAddr=0x23e, 12B, 1个场景段) ═══
/** SCRIPT_0x13_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x13_SCENE_0: readonly number[] = [
  0x38,  // text(1B)
  0xf1, 0x06, 0x3a,  // $F1 textPtr(0x6,0x3a)
  0xf7,  // $F7 toggle()
  0x21, 0x00, 0x00, 0x8d, 0x90, 0x0b,  // text(6B)
  0xff,  // $FF end()
];

/** 脚本 0x13 的场景段列表 */
export const SCRIPT_0x13: readonly (readonly number[])[] = [
  SCRIPT_0x13_SCENE_0,
];

// ═══ 脚本 0x14 (entryAddr=0x24a, 21B, 1个场景段) ═══
/** SCRIPT_0x14_SCENE_0 — 场景段0 (21B) */
export const SCRIPT_0x14_SCENE_0: readonly number[] = [
  0x13,  // text(1B)
  0xf1, 0x24, 0x4e,  // $F1 textPtr(0x24,0x4e)
  0xef,  // $EF spriteFlip()
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00, 0x96, 0xd1, 0x01,  // text(6B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x96, 0xd1, 0x01,  // text(6B)
  0xf0, 0xff,  // $F0 textPos(0xff)
];

/** 脚本 0x14 的场景段列表 */
export const SCRIPT_0x14: readonly (readonly number[])[] = [
  SCRIPT_0x14_SCENE_0,
];

// ═══ 脚本 0x15 (entryAddr=0x25f, 63B, 1个场景段) ═══
/** SCRIPT_0x15_SCENE_0 — 场景段0 (61B) */
export const SCRIPT_0x15_SCENE_0: readonly number[] = [
  0x02,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0xf1, 0x0e, 0xfe,  // $F1 textPtr(0xe,0xfe)
  0x8d,  // text(1B)
  0xf0, 0xf7, 0x26,  // $F0 textPos(0xf7,0x26)
  0x00, 0x00, 0x0a,  // text(3B)
  0xf0, 0xf7, 0x00,  // $F0 textPos(0xf7,0x0)
  0x00, 0x00,  // text(2B)
  0xe6,  // lineEdit(0xe6)
  0x8e, 0x12,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x01, 0x8e, 0x29,  // text(5B)
  0xf7,  // $F7 toggle()
  0x20, 0x00, 0x00, 0x01, 0x8e, 0x38,  // text(6B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x01, 0x8e, 0x4c,  // text(5B)
  0xf7,  // $F7 toggle()
  0x20, 0x00, 0x00, 0x01,  // text(4B)
  0xf0, 0xf7, 0xf0,  // $F0 textPos(0xf7,0xf0)
  0x00, 0x00, 0x8e, 0x08, 0x01,  // text(5B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x8e, 0x08, 0x01, 0xa2, 0x8e,  // text(8B)
];

/** 脚本 0x15 的场景段列表 */
export const SCRIPT_0x15: readonly (readonly number[])[] = [
  SCRIPT_0x15_SCENE_0,
];

// ═══ 脚本 0x16 (entryAddr=0x29e, 45B, 1个场景段) ═══
/** SCRIPT_0x16_SCENE_0 — 场景段0 (45B) */
export const SCRIPT_0x16_SCENE_0: readonly number[] = [
  0x2d,  // text(1B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x8e,  // $F6 waitAnim(0x8e)
  0xa6, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x8e,  // $F5 setPtr(0x8e)
  0xb6, 0x01,  // text(2B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x93,  // $F6 waitAnim(0x93)
  0x1b, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x93,  // $F5 setPtr(0x93)
  0x2f, 0x01,  // text(2B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x93,  // $F6 waitAnim(0x93)
  0x43, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x93,  // $F5 setPtr(0x93)
  0x7c, 0x01, 0xa2, 0x9f,  // text(4B)
];

/** 脚本 0x16 的场景段列表 */
export const SCRIPT_0x16: readonly (readonly number[])[] = [
  SCRIPT_0x16_SCENE_0,
];

// ═══ 脚本 0x17 (entryAddr=0x2cb, 45B, 1个场景段) ═══
/** SCRIPT_0x17_SCENE_0 — 场景段0 (45B) */
export const SCRIPT_0x17_SCENE_0: readonly number[] = [
  0x00,  // text(1B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x8e,  // $F6 waitAnim(0x8e)
  0x9e, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x8e,  // $F5 setPtr(0x8e)
  0xae, 0x01,  // text(2B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x93,  // $F6 waitAnim(0x93)
  0x11, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x93,  // $F5 setPtr(0x93)
  0x25, 0x01,  // text(2B)
  0xf1, 0x22, 0x38,  // $F1 textPtr(0x22,0x38)
  0xf6, 0x93,  // $F6 waitAnim(0x93)
  0x39, 0x01,  // text(2B)
  0xf1, 0x22, 0x3e,  // $F1 textPtr(0x22,0x3e)
  0xf5, 0x8d,  // $F5 setPtr(0x8d)
  0xb8, 0x01, 0xa2, 0xcc,  // text(4B)
];

/** 脚本 0x17 的场景段列表 */
export const SCRIPT_0x17: readonly (readonly number[])[] = [
  SCRIPT_0x17_SCENE_0,
];

// ═══ 脚本 0x18 (entryAddr=0x2f8, 13B, 1个场景段) ═══
/** SCRIPT_0x18_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x18_SCENE_0: readonly number[] = [
  0x35,  // text(1B)
  0xf1, 0x30, 0x3c,  // $F1 textPtr(0x30,0x3c)
  0xf5, 0x8e,  // $F5 setPtr(0x8e)
  0xbe, 0x01, 0x8f, 0x1c, 0x01, 0xa2,  // text(6B)
  0xfc,  // $FC vramAdvance()
];

/** 脚本 0x18 的场景段列表 */
export const SCRIPT_0x18: readonly (readonly number[])[] = [
  SCRIPT_0x18_SCENE_0,
];

// ═══ 脚本 0x19 (entryAddr=0x305, 19B, 1个场景段) ═══
/** SCRIPT_0x19_SCENE_0 — 场景段0 (19B) */
export const SCRIPT_0x19_SCENE_0: readonly number[] = [
  0x35,  // text(1B)
  0xf1, 0x30, 0x3c,  // $F1 textPtr(0x30,0x3c)
  0xe2,  // lineEdit(0xe2)
  0xf5, 0x8f,  // $F5 setPtr(0x8f)
  0x1c, 0x01, 0x8e, 0xbe, 0x01,  // text(5B)
  0xf0, 0xf1, 0x30,  // $F0 textPos(0xf1,0x30)
  0x3c, 0x8f, 0x7a,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x19 的场景段列表 */
export const SCRIPT_0x19: readonly (readonly number[])[] = [
  SCRIPT_0x19_SCENE_0,
];

// ═══ 脚本 0x1a (entryAddr=0x318, 78B, 2个场景段) ═══
/** SCRIPT_0x1a_SCENE_0 — 场景段0 (55B) */
export const SCRIPT_0x1a_SCENE_0: readonly number[] = [
  0x26,  // text(1B)
  0xf1, 0x22, 0xc4,  // $F1 textPtr(0x22,0xc4)
  0x90, 0x63,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x11,  // text(1B)
  0xf1, 0x22, 0x44,  // $F1 textPtr(0x22,0x44)
  0x90, 0x63, 0x01,  // text(3B)
  0xf1, 0x24, 0x42,  // $F1 textPtr(0x24,0x42)
  0x90, 0x5b, 0x01,  // text(3B)
  0xf1, 0x26, 0x40,  // $F1 textPtr(0x26,0x40)
  0x90, 0x53, 0x01,  // text(3B)
  0xf1, 0x26, 0x3c,  // $F1 textPtr(0x26,0x3c)
  0x90, 0x44, 0x01,  // text(3B)
  0xf1, 0x28, 0x3a,  // $F1 textPtr(0x28,0x3a)
  0x90, 0x35, 0x01,  // text(3B)
  0xf1, 0x28, 0x39,  // $F1 textPtr(0x28,0x39)
  0x90, 0x26, 0x01,  // text(3B)
  0xf1, 0x26, 0x39,  // $F1 textPtr(0x26,0x39)
  0x90, 0x17, 0x01,  // text(3B)
  0xf1, 0x22, 0x39,  // $F1 textPtr(0x22,0x39)
  0x8f,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x1a_SCENE_1 — 场景段1 (23B) */
export const SCRIPT_0x1a_SCENE_1: readonly number[] = [
  0x01,  // text(1B)
  0xf1, 0x1e, 0x39,  // $F1 textPtr(0x1e,0x39)
  0x8f,  // text(1B)
  0xe4,  // lineEdit(0xe4)
  0x01,  // text(1B)
  0xf1, 0x16, 0x39,  // $F1 textPtr(0x16,0x39)
  0xf6, 0x8f,  // $F6 waitAnim(0x8f)
  0xc3, 0x01,  // text(2B)
  0xf1, 0x16, 0x3d,  // $F1 textPtr(0x16,0x3d)
  0xf5, 0x8f,  // $F5 setPtr(0x8f)
  0xc3, 0x01, 0xa3, 0x56,  // text(4B)
];

/** 脚本 0x1a 的场景段列表 */
export const SCRIPT_0x1a: readonly (readonly number[])[] = [
  SCRIPT_0x1a_SCENE_0,
  SCRIPT_0x1a_SCENE_1,
];

// ═══ 脚本 0x1b (entryAddr=0x366, 9B, 1个场景段) ═══
/** SCRIPT_0x1b_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x1b_SCENE_0: readonly number[] = [
  0x26,  // text(1B)
  0xf1, 0x1e, 0xce,  // $F1 textPtr(0x1e,0xce)
  0x90, 0x6b,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x14,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x1b 的场景段列表 */
export const SCRIPT_0x1b: readonly (readonly number[])[] = [
  SCRIPT_0x1b_SCENE_0,
];

// ═══ 脚本 0x1c (entryAddr=0x36f, 73B, 3个场景段) ═══
/** SCRIPT_0x1c_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x1c_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0xee, 0x3c,  // $F1 textPtr(0xee,0x3c)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xfe, 0x00, 0xe3,  // $FE jump(0x0,0xe3)
];

/** SCRIPT_0x1c_SCENE_1 — 场景段1 (41B) */
export const SCRIPT_0x1c_SCENE_1: readonly number[] = [
  0xef,  // $EF spriteFlip()
  0x90, 0x7d, 0x01, 0x90, 0x94, 0x01,  // text(6B)
  0xf0, 0xf0, 0xf7,  // $F0 textPos(0xf0,0xf7)
  0x00, 0x00, 0x00,  // text(3B)
  0xe4,  // lineEdit(0xe4)
  0xef,  // $EF spriteFlip()
  0x90, 0x7d, 0x01, 0x90, 0x94, 0x01,  // text(6B)
  0xf0, 0xf0, 0xf7,  // $F0 textPos(0xf0,0xf7)
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0xef,  // $EF spriteFlip()
  0x90, 0x7d, 0x01, 0x90, 0x94, 0x01,  // text(6B)
  0xf0, 0xf1, 0xb0,  // $F0 textPos(0xf1,0xb0)
  0x30,  // text(1B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x1c_SCENE_2 — 场景段2 (23B) */
export const SCRIPT_0x1c_SCENE_2: readonly number[] = [
  0x00,  // text(1B)
  0xe4,  // lineEdit(0xe4)
  0xef,  // $EF spriteFlip()
  0x90, 0x7d, 0x01, 0x90, 0x94, 0x01,  // text(6B)
  0xf0, 0xf0, 0xf7,  // $F0 textPos(0xf0,0xf7)
  0x00, 0x00, 0x00, 0x90, 0x7d, 0x01, 0x90, 0x94, 0x01, 0xa3, 0xac,  // text(11B)
];

/** 脚本 0x1c 的场景段列表 */
export const SCRIPT_0x1c: readonly (readonly number[])[] = [
  SCRIPT_0x1c_SCENE_0,
  SCRIPT_0x1c_SCENE_1,
  SCRIPT_0x1c_SCENE_2,
];

// ═══ 脚本 0x1d (entryAddr=0x3b8, 13B, 1个场景段) ═══
/** SCRIPT_0x1d_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x1d_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x2a, 0x44,  // $F1 textPtr(0x2a,0x44)
  0x90, 0xb9, 0x0f,  // text(3B)
  0xf7,  // $F7 toggle()
  0x00, 0x04,  // text(2B)
  0xfe, 0x0f, 0xff,  // $FE jump(0xf,0xff)
];

/** 脚本 0x1d 的场景段列表 */
export const SCRIPT_0x1d: readonly (readonly number[])[] = [
  SCRIPT_0x1d_SCENE_0,
];

// ═══ 脚本 0x1e (entryAddr=0x3c5, 7B, 1个场景段) ═══
/** SCRIPT_0x1e_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x1e_SCENE_0: readonly number[] = [
  0x24,  // text(1B)
  0xf1, 0x2c, 0x44,  // $F1 textPtr(0x2c,0x44)
  0x90,  // text(1B)
  0xf0, 0xff,  // $F0 textPos(0xff)
];

/** 脚本 0x1e 的场景段列表 */
export const SCRIPT_0x1e: readonly (readonly number[])[] = [
  SCRIPT_0x1e_SCENE_0,
];

// ═══ 脚本 0x1f (entryAddr=0x3cc, 7B, 1个场景段) ═══
/** SCRIPT_0x1f_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x1f_SCENE_0: readonly number[] = [
  0x12,  // text(1B)
  0xf1, 0x35, 0x3e,  // $F1 textPtr(0x35,0x3e)
  0x91, 0x37,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x1f 的场景段列表 */
export const SCRIPT_0x1f: readonly (readonly number[])[] = [
  SCRIPT_0x1f_SCENE_0,
];

// ═══ 脚本 0x20 (entryAddr=0x3d3, 7B, 1个场景段) ═══
/** SCRIPT_0x20_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x20_SCENE_0: readonly number[] = [
  0x36,  // text(1B)
  0xf1, 0x30, 0x28,  // $F1 textPtr(0x30,0x28)
  0x91, 0x5b,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x20 的场景段列表 */
export const SCRIPT_0x20: readonly (readonly number[])[] = [
  SCRIPT_0x20_SCENE_0,
];

// ═══ 脚本 0x21 (entryAddr=0x3da, 7B, 1个场景段) ═══
/** SCRIPT_0x21_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x21_SCENE_0: readonly number[] = [
  0x24,  // text(1B)
  0xf1, 0x0a, 0x36,  // $F1 textPtr(0xa,0x36)
  0x91, 0xcb,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x21 的场景段列表 */
export const SCRIPT_0x21: readonly (readonly number[])[] = [
  SCRIPT_0x21_SCENE_0,
];

// ═══ 脚本 0x22 (entryAddr=0x3e1, 7B, 1个场景段) ═══
/** SCRIPT_0x22_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x22_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x28, 0x50,  // $F1 textPtr(0x28,0x50)
  0x91,  // text(1B)
  0xda,  // wait(20帧)
  0xff,  // $FF end()
];

/** 脚本 0x22 的场景段列表 */
export const SCRIPT_0x22: readonly (readonly number[])[] = [
  SCRIPT_0x22_SCENE_0,
];

// ═══ 脚本 0x23 (entryAddr=0x3e8, 7B, 1个场景段) ═══
/** SCRIPT_0x23_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x23_SCENE_0: readonly number[] = [
  0x18,  // text(1B)
  0xf1, 0x1c, 0x44,  // $F1 textPtr(0x1c,0x44)
  0x92, 0x18,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x23 的场景段列表 */
export const SCRIPT_0x23: readonly (readonly number[])[] = [
  SCRIPT_0x23_SCENE_0,
];

// ═══ 脚本 0x24 (entryAddr=0x3ef, 7B, 1个场景段) ═══
/** SCRIPT_0x24_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x24_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x1c, 0x00,  // $F1 textPtr(0x1c,0x0)
  0x96, 0x8b,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x24 的场景段列表 */
export const SCRIPT_0x24: readonly (readonly number[])[] = [
  SCRIPT_0x24_SCENE_0,
];

// ═══ 脚本 0x25 (entryAddr=0x3f6, 22B, 1个场景段) ═══
/** SCRIPT_0x25_SCENE_0 — 场景段0 (22B) */
export const SCRIPT_0x25_SCENE_0: readonly number[] = [
  0x0c,  // text(1B)
  0xf1, 0x1f, 0x5e,  // $F1 textPtr(0x1f,0x5e)
  0x64, 0x97, 0xb3,  // text(3B)
  0xf7,  // $F7 toggle()
  0x19, 0x00,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x0b,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x97, 0xb3,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x25 的场景段列表 */
export const SCRIPT_0x25: readonly (readonly number[])[] = [
  SCRIPT_0x25_SCENE_0,
];

// ═══ 脚本 0x26 (entryAddr=0x40c, 40B, 2个场景段) ═══
/** SCRIPT_0x26_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x26_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0x9f, 0x44,  // $F1 textPtr(0x9f,0x44)
  0x89, 0x73,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x26_SCENE_1 — 场景段1 (31B) */
export const SCRIPT_0x26_SCENE_1: readonly number[] = [
  0x00, 0x64,  // text(2B)
  0xe5,  // lineEdit(0xe5)
  0xed,  // $ED findSlot()
  0xf7,  // $F7 toggle()
  0x1f, 0x00, 0x00, 0x89, 0x73, 0x01,  // text(6B)
  0xf7,  // $F7 toggle()
  0xf1, 0x00, 0x00,  // $F1 textPtr(0x0,0x0)
  0x89, 0x73, 0x01,  // text(3B)
  0xf0, 0xf0, 0xf7,  // $F0 textPos(0xf0,0xf7)
  0x79, 0x00, 0x00, 0x03,  // text(4B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x89, 0x73,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x26 的场景段列表 */
export const SCRIPT_0x26: readonly (readonly number[])[] = [
  SCRIPT_0x26_SCENE_0,
  SCRIPT_0x26_SCENE_1,
];

// ═══ 脚本 0x27 (entryAddr=0x434, 21B, 1个场景段) ═══
/** SCRIPT_0x27_SCENE_0 — 场景段0 (21B) */
export const SCRIPT_0x27_SCENE_0: readonly number[] = [
  0x31,  // text(1B)
  0xf1, 0x06, 0xa8,  // $F1 textPtr(0x6,0xa8)
  0x8d, 0xd6,  // text(2B)
  0xf7,  // $F7 toggle()
  0x29, 0x00, 0x00, 0x12,  // text(4B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x8d, 0xd6,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x27 的场景段列表 */
export const SCRIPT_0x27: readonly (readonly number[])[] = [
  SCRIPT_0x27_SCENE_0,
];

// ═══ 脚本 0x28 (entryAddr=0x449, 13B, 1个场景段) ═══
/** SCRIPT_0x28_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x28_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x30, 0xef,  // $F1 textPtr(0x30,0xef)
  0x94, 0x3d, 0x0a,  // text(3B)
  0xf7,  // $F7 toggle()
  0x07, 0x00, 0x00, 0x0b,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x28 的场景段列表 */
export const SCRIPT_0x28: readonly (readonly number[])[] = [
  SCRIPT_0x28_SCENE_0,
];

// ═══ 脚本 0x29 (entryAddr=0x456, 13B, 1个场景段) ═══
/** SCRIPT_0x29_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x29_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x30, 0x89,  // $F1 textPtr(0x30,0x89)
  0x92, 0x37, 0x0a,  // text(3B)
  0xf7,  // $F7 toggle()
  0x09, 0x00, 0x00, 0x0b,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x29 的场景段列表 */
export const SCRIPT_0x29: readonly (readonly number[])[] = [
  SCRIPT_0x29_SCENE_0,
];

// ═══ 脚本 0x2a (entryAddr=0x463, 13B, 1个场景段) ═══
/** SCRIPT_0x2a_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x2a_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x44, 0x3c,  // $F1 textPtr(0x44,0x3c)
  0x92, 0x76, 0x0f,  // text(3B)
  0xf7,  // $F7 toggle()
  0xb0, 0x00, 0x00, 0x04,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x2a 的场景段列表 */
export const SCRIPT_0x2a: readonly (readonly number[])[] = [
  SCRIPT_0x2a_SCENE_0,
];

// ═══ 脚本 0x2b (entryAddr=0x470, 7B, 1个场景段) ═══
/** SCRIPT_0x2b_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x2b_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x34, 0x2c,  // $F1 textPtr(0x34,0x2c)
  0x92, 0xb5,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x2b 的场景段列表 */
export const SCRIPT_0x2b: readonly (readonly number[])[] = [
  SCRIPT_0x2b_SCENE_0,
];

// ═══ 脚本 0x2c (entryAddr=0x477, 13B, 1个场景段) ═══
/** SCRIPT_0x2c_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x2c_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x18, 0x3c,  // $F1 textPtr(0x18,0x3c)
  0x92, 0xb5, 0x1e,  // text(3B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x18,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x2c 的场景段列表 */
export const SCRIPT_0x2c: readonly (readonly number[])[] = [
  SCRIPT_0x2c_SCENE_0,
];

// ═══ 脚本 0x2d (entryAddr=0x484, 12B, 2个场景段) ═══
/** SCRIPT_0x2d_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x2d_SCENE_0: readonly number[] = [
  0x3c,  // text(1B)
  0xf1, 0xae, 0x2e,  // $F1 textPtr(0xae,0x2e)
  0x93, 0xab,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x2d_SCENE_1 — 场景段1 (3B) */
export const SCRIPT_0x2d_SCENE_1: readonly number[] = [
  0x00, 0x50,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x2d 的场景段列表 */
export const SCRIPT_0x2d: readonly (readonly number[])[] = [
  SCRIPT_0x2d_SCENE_0,
  SCRIPT_0x2d_SCENE_1,
];

// ═══ 脚本 0x2e (entryAddr=0x490, 7B, 1个场景段) ═══
/** SCRIPT_0x2e_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x2e_SCENE_0: readonly number[] = [
  0x25,  // text(1B)
  0xf1, 0x38, 0x3c,  // $F1 textPtr(0x38,0x3c)
  0x92,  // text(1B)
  0xf8, 0xff,  // $F8 external(0xff)
];

/** 脚本 0x2e 的场景段列表 */
export const SCRIPT_0x2e: readonly (readonly number[])[] = [
  SCRIPT_0x2e_SCENE_0,
];

// ═══ 脚本 0x2f (entryAddr=0x497, 19B, 1个场景段) ═══
/** SCRIPT_0x2f_SCENE_0 — 场景段0 (19B) */
export const SCRIPT_0x2f_SCENE_0: readonly number[] = [
  0x24,  // text(1B)
  0xf1, 0x30, 0xc3,  // $F1 textPtr(0x30,0xc3)
  0x93, 0x4d,  // text(2B)
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x01, 0xa4, 0x9d,  // text(6B)
  0xff,  // $FF end()
];

/** 脚本 0x2f 的场景段列表 */
export const SCRIPT_0x2f: readonly (readonly number[])[] = [
  SCRIPT_0x2f_SCENE_0,
];

// ═══ 脚本 0x30 (entryAddr=0x4aa, 13B, 1个场景段) ═══
/** SCRIPT_0x30_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x30_SCENE_0: readonly number[] = [
  0x18,  // text(1B)
  0xf1, 0x1c, 0x38,  // $F1 textPtr(0x1c,0x38)
  0x93, 0xba, 0x28,  // text(3B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x01, 0x2c,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x30 的场景段列表 */
export const SCRIPT_0x30: readonly (readonly number[])[] = [
  SCRIPT_0x30_SCENE_0,
];

// ═══ 脚本 0x31 (entryAddr=0x4b7, 12B, 2个场景段) ═══
/** SCRIPT_0x31_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x31_SCENE_0: readonly number[] = [
  0x3b,  // text(1B)
  0xf1, 0xa2, 0x44,  // $F1 textPtr(0xa2,0x44)
  0x89, 0x59,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x31_SCENE_1 — 场景段1 (3B) */
export const SCRIPT_0x31_SCENE_1: readonly number[] = [
  0x00, 0x64,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x31 的场景段列表 */
export const SCRIPT_0x31: readonly (readonly number[])[] = [
  SCRIPT_0x31_SCENE_0,
  SCRIPT_0x31_SCENE_1,
];

// ═══ 脚本 0x32 (entryAddr=0x4c3, 40B, 2个场景段) ═══
/** SCRIPT_0x32_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x32_SCENE_0: readonly number[] = [
  0x3b,  // text(1B)
  0xf1, 0x9f, 0x44,  // $F1 textPtr(0x9f,0x44)
  0x89, 0x73,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x32_SCENE_1 — 场景段1 (31B) */
export const SCRIPT_0x32_SCENE_1: readonly number[] = [
  0x00, 0x64,  // text(2B)
  0xe2,  // lineEdit(0xe2)
  0xee,  // $EE clearText()
  0xf7,  // $F7 toggle()
  0x2e, 0x00, 0x00, 0x89, 0x73, 0x01,  // text(6B)
  0xf7,  // $F7 toggle()
  0xe2,  // lineEdit(0xe2)
  0x00, 0x00, 0x89, 0x73, 0x01,  // text(5B)
  0xf0, 0xf0, 0xf7,  // $F0 textPos(0xf0,0xf7)
  0x79, 0x00, 0x00, 0x03,  // text(4B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x89, 0x73,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x32 的场景段列表 */
export const SCRIPT_0x32: readonly (readonly number[])[] = [
  SCRIPT_0x32_SCENE_0,
  SCRIPT_0x32_SCENE_1,
];

// ═══ 脚本 0x33 (entryAddr=0x4eb, 12B, 1个场景段) ═══
/** SCRIPT_0x33_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x33_SCENE_0: readonly number[] = [
  0x38,  // text(1B)
  0xf1, 0x16, 0x8e,  // $F1 textPtr(0x16,0x8e)
  0xf7,  // $F7 toggle()
  0x29, 0x00, 0x07, 0x8d, 0xd6, 0x0b,  // text(6B)
  0xff,  // $FF end()
];

/** 脚本 0x33 的场景段列表 */
export const SCRIPT_0x33: readonly (readonly number[])[] = [
  SCRIPT_0x33_SCENE_0,
];

// ═══ 脚本 0x34 (entryAddr=0x4f7, 23B, 1个场景段) ═══
/** SCRIPT_0x34_SCENE_0 — 场景段0 (23B) */
export const SCRIPT_0x34_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0x1e, 0x36,  // $F1 textPtr(0x1e,0x36)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xf5, 0x88,  // $F5 setPtr(0x88)
  0x37, 0x03, 0x88, 0x6f, 0x03, 0x88, 0xba, 0x03, 0x89, 0x08, 0x03, 0xa4,  // text(12B)
  0xff,  // $FF end()
];

/** 脚本 0x34 的场景段列表 */
export const SCRIPT_0x34: readonly (readonly number[])[] = [
  SCRIPT_0x34_SCENE_0,
];

// ═══ 脚本 0x35 (entryAddr=0x50e, 28B, 1个场景段) ═══
/** SCRIPT_0x35_SCENE_0 — 场景段0 (28B) */
export const SCRIPT_0x35_SCENE_0: readonly number[] = [
  0x07,  // text(1B)
  0xf1, 0x12, 0x8e,  // $F1 textPtr(0x12,0x8e)
  0xec, 0xf7, 0x29,  // $EC textSeq(0xf7,0x29)
  0x00, 0x00, 0x8d, 0xd6, 0x01,  // text(5B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x01,  // text(4B)
  0xf0, 0xf7, 0x00,  // $F0 textPos(0xf7,0x0)
  0x00, 0x00,  // text(2B)
  0xf1, 0x3e, 0xbe,  // $F1 textPtr(0x3e,0xbe)
  0x8d, 0xd6,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x35 的场景段列表 */
export const SCRIPT_0x35: readonly (readonly number[])[] = [
  SCRIPT_0x35_SCENE_0,
];

// ═══ 脚本 0x36 (entryAddr=0x52a, 28B, 1个场景段) ═══
/** SCRIPT_0x36_SCENE_0 — 场景段0 (27B) */
export const SCRIPT_0x36_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x34, 0x3c,  // $F1 textPtr(0x34,0x3c)
  0x8e, 0x5d,  // text(2B)
  0xe5,  // lineEdit(0xe5)
  0xf7,  // $F7 toggle()
  0x20, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x01,  // text(3B)
  0xf0, 0xf7, 0x10,  // $F0 textPos(0xf7,0x10)
  0x00, 0x00, 0x02,  // text(3B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x36 的场景段列表 */
export const SCRIPT_0x36: readonly (readonly number[])[] = [
  SCRIPT_0x36_SCENE_0,
];

// ═══ 脚本 0x37 (entryAddr=0x546, 7B, 1个场景段) ═══
/** SCRIPT_0x37_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x37_SCENE_0: readonly number[] = [
  0x01,  // text(1B)
  0xf1, 0x30, 0x3c,  // $F1 textPtr(0x30,0x3c)
  0x8a, 0x8c,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x37 的场景段列表 */
export const SCRIPT_0x37: readonly (readonly number[])[] = [
  SCRIPT_0x37_SCENE_0,
];

// ═══ 脚本 0x38 (entryAddr=0x54d, 12B, 2个场景段) ═══
/** SCRIPT_0x38_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x38_SCENE_0: readonly number[] = [
  0x3b,  // text(1B)
  0xf1, 0xa2, 0x2e,  // $F1 textPtr(0xa2,0x2e)
  0x93, 0xab,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x38_SCENE_1 — 场景段1 (3B) */
export const SCRIPT_0x38_SCENE_1: readonly number[] = [
  0x00, 0x64,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x38 的场景段列表 */
export const SCRIPT_0x38: readonly (readonly number[])[] = [
  SCRIPT_0x38_SCENE_0,
  SCRIPT_0x38_SCENE_1,
];

// ═══ 脚本 0x39 (entryAddr=0x559, 23B, 1个场景段) ═══
/** SCRIPT_0x39_SCENE_0 — 场景段0 (23B) */
export const SCRIPT_0x39_SCENE_0: readonly number[] = [
  0x12,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0xf1, 0x12, 0x8e,  // $F1 textPtr(0x12,0x8e)
  0x8d, 0xd6,  // text(2B)
  0xf7,  // $F7 toggle()
  0x29, 0x00, 0x00, 0x0e,  // text(4B)
  0xf0, 0xf1, 0x3e,  // $F0 textPos(0xf1,0x3e)
  0xbe,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x8d, 0xd6,  // text(5B)
  0xff,  // $FF end()
];

/** 脚本 0x39 的场景段列表 */
export const SCRIPT_0x39: readonly (readonly number[])[] = [
  SCRIPT_0x39_SCENE_0,
];

// ═══ 脚本 0x3a (entryAddr=0x570, 101B, 1个场景段) ═══
/** SCRIPT_0x3a_SCENE_0 — 场景段0 (101B) */
export const SCRIPT_0x3a_SCENE_0: readonly number[] = [
  0x1e,  // text(1B)
  0xf1, 0x1c, 0x3c,  // $F1 textPtr(0x1c,0x3c)
  0x94, 0x5e,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x7f, 0x21,  // text(5B)
  0xf7,  // $F7 toggle()
  0x00, 0x04, 0x00, 0x07,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x02,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x04, 0x00, 0x1b,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x05,  // text(1B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x05,  // text(4B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x04,  // text(1B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x04,  // text(4B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x03,  // text(1B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x03,  // text(4B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x02,  // text(1B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x02,  // text(4B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x01,  // text(1B)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x2d,  // text(4B)
  0xe3,  // lineEdit(0xe3)
  0xeb,  // $EB animSeq()
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x01,  // text(4B)
  0xf0, 0xf0, 0xff,  // $F0 textPos(0xf0,0xff)
];

/** 脚本 0x3a 的场景段列表 */
export const SCRIPT_0x3a: readonly (readonly number[])[] = [
  SCRIPT_0x3a_SCENE_0,
];

// ═══ 脚本 0x3b (entryAddr=0x5d5, 24B, 1个场景段) ═══
/** SCRIPT_0x3b_SCENE_0 — 场景段0 (24B) */
export const SCRIPT_0x3b_SCENE_0: readonly number[] = [
  0x1e,  // text(1B)
  0xf1, 0x2c, 0x3c,  // $F1 textPtr(0x2c,0x3c)
  0x94, 0x87, 0x7f, 0x7f, 0x12,  // text(5B)
  0xe3,  // lineEdit(0xe3)
  0xeb,  // $EB animSeq()
  0xf7,  // $F7 toggle()
  0x01, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x01,  // text(4B)
  0xf0, 0xf0, 0xff,  // $F0 textPos(0xf0,0xff)
];

/** 脚本 0x3b 的场景段列表 */
export const SCRIPT_0x3b: readonly (readonly number[])[] = [
  SCRIPT_0x3b_SCENE_0,
];

// ═══ 脚本 0x3c (entryAddr=0x5ed, 21B, 3个场景段) ═══
/** SCRIPT_0x3c_SCENE_0 — 场景段0 (9B) */
export const SCRIPT_0x3c_SCENE_0: readonly number[] = [
  0x27,  // text(1B)
  0xf1, 0x2e, 0x9e,  // $F1 textPtr(0x2e,0x9e)
  0xf7,  // $F7 toggle()
  0x0f,  // text(1B)
  0xfe, 0x00, 0x94,  // $FE jump(0x0,0x94)
];

/** SCRIPT_0x3c_SCENE_1 — 场景段1 (7B) */
export const SCRIPT_0x3c_SCENE_1: readonly number[] = [
  0xa6, 0x01,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00,  // text(1B)
  0xfe, 0x00, 0x94,  // $FE jump(0x0,0x94)
];

/** SCRIPT_0x3c_SCENE_2 — 场景段2 (5B) */
export const SCRIPT_0x3c_SCENE_2: readonly number[] = [
  0xa6, 0x01, 0xa5,  // text(3B)
  0xf1, 0xff,  // $F1 textPtr(0xff)
];

/** 脚本 0x3c 的场景段列表 */
export const SCRIPT_0x3c: readonly (readonly number[])[] = [
  SCRIPT_0x3c_SCENE_0,
  SCRIPT_0x3c_SCENE_1,
  SCRIPT_0x3c_SCENE_2,
];

// ═══ 脚本 0x3d (entryAddr=0x602, 30B, 2个场景段) ═══
/** SCRIPT_0x3d_SCENE_0 — 场景段0 (11B) */
export const SCRIPT_0x3d_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0x9b, 0x48,  // $F1 textPtr(0x9b,0x48)
  0x78, 0x78, 0x89, 0x73,  // text(4B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x3d_SCENE_1 — 场景段1 (19B) */
export const SCRIPT_0x3d_SCENE_1: readonly number[] = [
  0x00, 0x78,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0x2e, 0x00, 0x00, 0x01,  // text(4B)
  0xf7,  // $F7 toggle()
  0xe2,  // lineEdit(0xe2)
  0x00, 0x00, 0x01, 0xa6, 0x14,  // text(5B)
];

/** 脚本 0x3d 的场景段列表 */
export const SCRIPT_0x3d: readonly (readonly number[])[] = [
  SCRIPT_0x3d_SCENE_0,
  SCRIPT_0x3d_SCENE_1,
];

// ═══ 脚本 0x3e (entryAddr=0x620, 7B, 1个场景段) ═══
/** SCRIPT_0x3e_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x3e_SCENE_0: readonly number[] = [
  0x32,  // text(1B)
  0xf1, 0x30, 0x4e,  // $F1 textPtr(0x30,0x4e)
  0x94,  // text(1B)
  0xf8, 0xff,  // $F8 external(0xff)
];

/** 脚本 0x3e 的场景段列表 */
export const SCRIPT_0x3e: readonly (readonly number[])[] = [
  SCRIPT_0x3e_SCENE_0,
];

// ═══ 脚本 0x3f (entryAddr=0x627, 16B, 1个场景段) ═══
/** SCRIPT_0x3f_SCENE_0 — 场景段0 (16B) */
export const SCRIPT_0x3f_SCENE_0: readonly number[] = [
  0x32,  // text(1B)
  0xf1, 0x30, 0x92,  // $F1 textPtr(0x30,0x92)
  0x94,  // text(1B)
  0xf8, 0x7f, 0x7f,  // $F8 external(0x7f,0x7f)
  0x7f, 0x3d,  // text(2B)
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00, 0x44,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x3f 的场景段列表 */
export const SCRIPT_0x3f: readonly (readonly number[])[] = [
  SCRIPT_0x3f_SCENE_0,
];

// ═══ 脚本 0x40 (entryAddr=0x637, 7B, 1个场景段) ═══
/** SCRIPT_0x40_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x40_SCENE_0: readonly number[] = [
  0x3a,  // text(1B)
  0xf1, 0x28, 0x3c,  // $F1 textPtr(0x28,0x3c)
  0x95, 0x7c,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x40 的场景段列表 */
export const SCRIPT_0x40: readonly (readonly number[])[] = [
  SCRIPT_0x40_SCENE_0,
];

// ═══ 脚本 0x41 (entryAddr=0x63e, 7B, 1个场景段) ═══
/** SCRIPT_0x41_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x41_SCENE_0: readonly number[] = [
  0x3a,  // text(1B)
  0xf1, 0x28, 0x3c,  // $F1 textPtr(0x28,0x3c)
  0x95, 0x47,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x41 的场景段列表 */
export const SCRIPT_0x41: readonly (readonly number[])[] = [
  SCRIPT_0x41_SCENE_0,
];

// ═══ 脚本 0x42 (entryAddr=0x645, 11B, 1个场景段) ═══
/** SCRIPT_0x42_SCENE_0 — 场景段0 (11B) */
export const SCRIPT_0x42_SCENE_0: readonly number[] = [
  0x3a,  // text(1B)
  0xf1, 0x28, 0xcc,  // $F1 textPtr(0x28,0xcc)
  0x95, 0x7c,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x7f, 0x7f, 0x7f,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x42 的场景段列表 */
export const SCRIPT_0x42: readonly (readonly number[])[] = [
  SCRIPT_0x42_SCENE_0,
];

// ═══ 脚本 0x43 (entryAddr=0x650, 12B, 1个场景段) ═══
/** SCRIPT_0x43_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x43_SCENE_0: readonly number[] = [
  0x3a,  // text(1B)
  0xf1, 0x48, 0xa6,  // $F1 textPtr(0x48,0xa6)
  0x95, 0xac,  // text(2B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0xfd,  // $F0 textPos(0x0,0xfd)
  0x14,  // text(1B)
  0xff,  // $FF end()
];

/** 脚本 0x43 的场景段列表 */
export const SCRIPT_0x43: readonly (readonly number[])[] = [
  SCRIPT_0x43_SCENE_0,
];

// ═══ 脚本 0x44 (entryAddr=0x65c, 12B, 1个场景段) ═══
/** SCRIPT_0x44_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x44_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x30, 0x28,  // $F1 textPtr(0x30,0x28)
  0x95,  // text(1B)
  0xdc,  // wait(60帧)
  0x0f, 0x95,  // text(2B)
  0xe3,  // lineEdit(0xe3)
  0x0f, 0xa6, 0x60,  // text(3B)
];

/** 脚本 0x44 的场景段列表 */
export const SCRIPT_0x44: readonly (readonly number[])[] = [
  SCRIPT_0x44_SCENE_0,
];

// ═══ 脚本 0x45 (entryAddr=0x668, 12B, 1个场景段) ═══
/** SCRIPT_0x45_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x45_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x30, 0x28,  // $F1 textPtr(0x30,0x28)
  0x95,  // text(1B)
  0xea,  // $EA fadeOutClear()
  0x0f, 0x95,  // text(2B)
  0xf4, 0x0f,  // $F4 subDispatch(0xf)
  0xa6, 0x6c,  // text(2B)
];

/** 脚本 0x45 的场景段列表 */
export const SCRIPT_0x45: readonly (readonly number[])[] = [
  SCRIPT_0x45_SCENE_0,
];

// ═══ 脚本 0x46 (entryAddr=0x674, 13B, 1个场景段) ═══
/** SCRIPT_0x46_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x46_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x30, 0x28,  // $F1 textPtr(0x30,0x28)
  0x95,  // text(1B)
  0xea,  // $EA fadeOutClear()
  0x0f, 0x95,  // text(2B)
  0xf4, 0x0f,  // $F4 subDispatch(0xf)
  0x95,  // text(1B)
  0xfe, 0xff,  // $FE jump(0xff)
];

/** 脚本 0x46 的场景段列表 */
export const SCRIPT_0x46: readonly (readonly number[])[] = [
  SCRIPT_0x46_SCENE_0,
];

// ═══ 脚本 0x47 (entryAddr=0x681, 20B, 1个场景段) ═══
/** SCRIPT_0x47_SCENE_0 — 场景段0 (20B) */
export const SCRIPT_0x47_SCENE_0: readonly number[] = [
  0x27,  // text(1B)
  0xf1, 0xf3, 0x3e,  // $F1 textPtr(0xf3,0x3e)
  0xf7,  // $F7 toggle()
  0x10, 0x00, 0x00, 0x94, 0xa6, 0x01,  // text(6B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x94, 0xa6, 0x01, 0xa6, 0x85,  // text(8B)
];

/** 脚本 0x47 的场景段列表 */
export const SCRIPT_0x47: readonly (readonly number[])[] = [
  SCRIPT_0x47_SCENE_0,
];

// ═══ 脚本 0x48 (entryAddr=0x695, 14B, 1个场景段) ═══
/** SCRIPT_0x48_SCENE_0 — 场景段0 (14B) */
export const SCRIPT_0x48_SCENE_0: readonly number[] = [
  0x32,  // text(1B)
  0xf1, 0x30, 0x92,  // $F1 textPtr(0x30,0x92)
  0x94,  // text(1B)
  0xf8, 0x7f, 0x3e,  // $F8 external(0x7f,0x3e)
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00, 0x44,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x48 的场景段列表 */
export const SCRIPT_0x48: readonly (readonly number[])[] = [
  SCRIPT_0x48_SCENE_0,
];

// ═══ 脚本 0x49 (entryAddr=0x6a3, 7B, 1个场景段) ═══
/** SCRIPT_0x49_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x49_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x30, 0x50,  // $F1 textPtr(0x30,0x50)
  0x94,  // text(1B)
  0xe6,  // lineEdit(0xe6)
  0xff,  // $FF end()
];

/** 脚本 0x49 的场景段列表 */
export const SCRIPT_0x49: readonly (readonly number[])[] = [
  SCRIPT_0x49_SCENE_0,
];

// ═══ 脚本 0x4a (entryAddr=0x6aa, 10B, 2个场景段) ═══
/** SCRIPT_0x4a_SCENE_0 — 场景段0 (6B) */
export const SCRIPT_0x4a_SCENE_0: readonly number[] = [
  0x35,  // text(1B)
  0xf1, 0x3c, 0x44,  // $F1 textPtr(0x3c,0x44)
  0xfa, 0x2b,  // $FA sceneLoad(0x2b)
];

/** SCRIPT_0x4a_SCENE_1 — 场景段1 (4B) */
export const SCRIPT_0x4a_SCENE_1: readonly number[] = [
  0xb6, 0xa0, 0xb6,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x4a 的场景段列表 */
export const SCRIPT_0x4a: readonly (readonly number[])[] = [
  SCRIPT_0x4a_SCENE_0,
  SCRIPT_0x4a_SCENE_1,
];

// ═══ 脚本 0x4b (entryAddr=0x6b4, 7B, 1个场景段) ═══
/** SCRIPT_0x4b_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x4b_SCENE_0: readonly number[] = [
  0x35,  // text(1B)
  0xf1, 0x3c, 0x44,  // $F1 textPtr(0x3c,0x44)
  0x96, 0x58,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x4b 的场景段列表 */
export const SCRIPT_0x4b: readonly (readonly number[])[] = [
  SCRIPT_0x4b_SCENE_0,
];

// ═══ 脚本 0x4c (entryAddr=0x6bb, 7B, 1个场景段) ═══
/** SCRIPT_0x4c_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x4c_SCENE_0: readonly number[] = [
  0x3a,  // text(1B)
  0xf1, 0x28, 0x4c,  // $F1 textPtr(0x28,0x4c)
  0x95, 0x7c,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x4c 的场景段列表 */
export const SCRIPT_0x4c: readonly (readonly number[])[] = [
  SCRIPT_0x4c_SCENE_0,
];

// ═══ 脚本 0x4d (entryAddr=0x6c2, 27B, 1个场景段) ═══
/** SCRIPT_0x4d_SCENE_0 — 场景段0 (27B) */
export const SCRIPT_0x4d_SCENE_0: readonly number[] = [
  0x37,  // text(1B)
  0xe4,  // lineEdit(0xe4)
  0xf1, 0x2c, 0x3c,  // $F1 textPtr(0x2c,0x3c)
  0x94, 0x0e, 0x04,  // text(3B)
  0xf1, 0x2b, 0x3c,  // $F1 textPtr(0x2b,0x3c)
  0x89, 0x8f, 0x04,  // text(3B)
  0xf0, 0xe3, 0xf1,  // $F0 textPos(0xe3,0xf1)
  0x2c, 0x3c, 0x94, 0x0e, 0x04, 0x89, 0xbe, 0x04,  // text(8B)
  0xf0, 0xff,  // $F0 textPos(0xff)
];

/** 脚本 0x4d 的场景段列表 */
export const SCRIPT_0x4d: readonly (readonly number[])[] = [
  SCRIPT_0x4d_SCENE_0,
];

// ═══ 脚本 0x4e (entryAddr=0x6dd, 22B, 1个场景段) ═══
/** SCRIPT_0x4e_SCENE_0 — 场景段0 (22B) */
export const SCRIPT_0x4e_SCENE_0: readonly number[] = [
  0x37,  // text(1B)
  0xf1, 0x16, 0x94,  // $F1 textPtr(0x16,0x94)
  0x93,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0xf7,  // $F7 toggle()
  0x09, 0x00, 0x00, 0x12,  // text(4B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x28,  // text(4B)
  0xf7,  // $F7 toggle()
  0x07, 0x00, 0x00, 0x12,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x4e 的场景段列表 */
export const SCRIPT_0x4e: readonly (readonly number[])[] = [
  SCRIPT_0x4e_SCENE_0,
];

// ═══ 脚本 0x4f (entryAddr=0x6f3, 7B, 1个场景段) ═══
/** SCRIPT_0x4f_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x4f_SCENE_0: readonly number[] = [
  0x36,  // text(1B)
  0xf1, 0x50, 0x28,  // $F1 textPtr(0x50,0x28)
  0x91, 0x5b,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x4f 的场景段列表 */
export const SCRIPT_0x4f: readonly (readonly number[])[] = [
  SCRIPT_0x4f_SCENE_0,
];

// ═══ 脚本 0x50 (entryAddr=0x6fa, 7B, 1个场景段) ═══
/** SCRIPT_0x50_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x50_SCENE_0: readonly number[] = [
  0x0c,  // text(1B)
  0xf1, 0x40, 0xfe,  // $F1 textPtr(0x40,0xfe)
  0x96, 0x8b,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x50 的场景段列表 */
export const SCRIPT_0x50: readonly (readonly number[])[] = [
  SCRIPT_0x50_SCENE_0,
];

// ═══ 脚本 0x51 (entryAddr=0x701, 61B, 2个场景段) ═══
/** SCRIPT_0x51_SCENE_0 — 场景段0 (18B) */
export const SCRIPT_0x51_SCENE_0: readonly number[] = [
  0x26,  // text(1B)
  0xf1, 0x12, 0x39,  // $F1 textPtr(0x12,0x39)
  0x8f, 0xc3, 0x01,  // text(3B)
  0xf1, 0x1a, 0x39,  // $F1 textPtr(0x1a,0x39)
  0x8f,  // text(1B)
  0xe4,  // lineEdit(0xe4)
  0x01,  // text(1B)
  0xf1, 0x1e, 0x39,  // $F1 textPtr(0x1e,0x39)
  0x8f,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x51_SCENE_1 — 场景段1 (43B) */
export const SCRIPT_0x51_SCENE_1: readonly number[] = [
  0x01,  // text(1B)
  0xf1, 0x22, 0x39,  // $F1 textPtr(0x22,0x39)
  0x90, 0x17, 0x01,  // text(3B)
  0xf1, 0x24, 0x39,  // $F1 textPtr(0x24,0x39)
  0x90, 0x26, 0x01,  // text(3B)
  0xf1, 0x26, 0x39,  // $F1 textPtr(0x26,0x39)
  0x90, 0x35, 0x01,  // text(3B)
  0xf1, 0x28, 0x39,  // $F1 textPtr(0x28,0x39)
  0x90, 0x44, 0x01,  // text(3B)
  0xf1, 0x2b, 0x3b,  // $F1 textPtr(0x2b,0x3b)
  0x90, 0x53, 0x01,  // text(3B)
  0xf1, 0x2c, 0x3b,  // $F1 textPtr(0x2c,0x3b)
  0x90, 0x5b, 0x01,  // text(3B)
  0xf1, 0x2d, 0x3b,  // $F1 textPtr(0x2d,0x3b)
  0x90, 0x63,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x51 的场景段列表 */
export const SCRIPT_0x51: readonly (readonly number[])[] = [
  SCRIPT_0x51_SCENE_0,
  SCRIPT_0x51_SCENE_1,
];

// ═══ 脚本 0x52 (entryAddr=0x73e, 18B, 2个场景段) ═══
/** SCRIPT_0x52_SCENE_0 — 场景段0 (11B) */
export const SCRIPT_0x52_SCENE_0: readonly number[] = [
  0x14,  // text(1B)
  0xf1, 0x9e, 0x48,  // $F1 textPtr(0x9e,0x48)
  0x89, 0x59, 0x78, 0x78,  // text(4B)
  0xf7,  // $F7 toggle()
  0x20,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x52_SCENE_1 — 场景段1 (7B) */
export const SCRIPT_0x52_SCENE_1: readonly number[] = [
  0x00, 0x78,  // text(2B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00,  // text(3B)
  0xff,  // $FF end()
];

/** 脚本 0x52 的场景段列表 */
export const SCRIPT_0x52: readonly (readonly number[])[] = [
  SCRIPT_0x52_SCENE_0,
  SCRIPT_0x52_SCENE_1,
];

// ═══ 脚本 0x53 (entryAddr=0x750, 7B, 1个场景段) ═══
/** SCRIPT_0x53_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x53_SCENE_0: readonly number[] = [
  0x07,  // text(1B)
  0xf1, 0x04, 0x04,  // $F1 textPtr(0x4,0x4)
  0x96,  // text(1B)
  0xeb,  // $EB animSeq()
  0xff,  // $FF end()
];

/** 脚本 0x53 的场景段列表 */
export const SCRIPT_0x53: readonly (readonly number[])[] = [
  SCRIPT_0x53_SCENE_0,
];

// ═══ 脚本 0x54 (entryAddr=0x757, 14B, 1个场景段) ═══
/** SCRIPT_0x54_SCENE_0 — 场景段0 (14B) */
export const SCRIPT_0x54_SCENE_0: readonly number[] = [
  0x02,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0xf1, 0x04, 0xfc,  // $F1 textPtr(0x4,0xfc)
  0x97, 0x11,  // text(2B)
  0xf7,  // $F7 toggle()
  0x05, 0x00, 0x00, 0x0a,  // text(4B)
  0xf0, 0xff,  // $F0 textPos(0xff)
];

/** 脚本 0x54 的场景段列表 */
export const SCRIPT_0x54: readonly (readonly number[])[] = [
  SCRIPT_0x54_SCENE_0,
];

// ═══ 脚本 0x55 (entryAddr=0x765, 31B, 1个场景段) ═══
/** SCRIPT_0x55_SCENE_0 — 场景段0 (31B) */
export const SCRIPT_0x55_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x38, 0x78,  // $F1 textPtr(0x38,0x78)
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00,  // text(3B)
  0xef,  // $EF spriteFlip()
  0x97, 0x39, 0x02, 0x97, 0x46, 0x02,  // text(6B)
  0xf0, 0xf7, 0x00,  // $F0 textPos(0xf7,0x0)
  0x00, 0x00, 0x97, 0x53, 0x2a, 0x97, 0x62, 0x0f, 0x97, 0x53, 0x0f, 0xa7, 0x7c,  // text(13B)
];

/** 脚本 0x55 的场景段列表 */
export const SCRIPT_0x55: readonly (readonly number[])[] = [
  SCRIPT_0x55_SCENE_0,
];

// ═══ 脚本 0x56 (entryAddr=0x784, 26B, 1个场景段) ═══
/** SCRIPT_0x56_SCENE_0 — 场景段0 (26B) */
export const SCRIPT_0x56_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x38, 0x3c,  // $F1 textPtr(0x38,0x3c)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x97, 0x53, 0x3c,  // text(6B)
  0xf7,  // $F7 toggle()
  0x0f, 0x00, 0x00,  // text(3B)
  0xe2,  // lineEdit(0xe2)
  0xef,  // $EF spriteFlip()
  0x97, 0x39, 0x02, 0x97, 0x46, 0x02,  // text(6B)
  0xf0, 0xf0, 0xff,  // $F0 textPos(0xf0,0xff)
];

/** 脚本 0x56 的场景段列表 */
export const SCRIPT_0x56: readonly (readonly number[])[] = [
  SCRIPT_0x56_SCENE_0,
];

// ═══ 脚本 0x57 (entryAddr=0x79e, 58B, 1个场景段) ═══
/** SCRIPT_0x57_SCENE_0 — 场景段0 (57B) */
export const SCRIPT_0x57_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x38, 0x3c,  // $F1 textPtr(0x38,0x3c)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x97, 0x62, 0x12,  // text(5B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x7f, 0x11,  // text(5B)
  0xf1, 0x1c, 0x0a,  // $F1 textPtr(0x1c,0xa)
  0x97, 0x53,  // text(2B)
  0xf7,  // $F7 toggle()
  0xf0, 0x00, 0x00,  // $F0 textPos(0x0,0x0)
  0x04,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x7f, 0x2b,  // text(5B)
  0xf7,  // $F7 toggle()
  0x20, 0x00, 0x00, 0x97, 0x71, 0x21,  // text(6B)
  0xf1, 0x5b, 0x0a,  // $F1 textPtr(0x5b,0xa)
  0xf7,  // $F7 toggle()
  0x00, 0x00, 0x00, 0x97, 0x53, 0x1e, 0x97, 0x62, 0x0f, 0x97, 0x53, 0x0f, 0xa7, 0xd0,  // text(14B)
];

/** 脚本 0x57 的场景段列表 */
export const SCRIPT_0x57: readonly (readonly number[])[] = [
  SCRIPT_0x57_SCENE_0,
];

// ═══ 脚本 0x58 (entryAddr=0x7d8, 21B, 1个场景段) ═══
/** SCRIPT_0x58_SCENE_0 — 场景段0 (21B) */
export const SCRIPT_0x58_SCENE_0: readonly number[] = [
  0x15,  // text(1B)
  0xf1, 0x14, 0x00,  // $F1 textPtr(0x14,0x0)
  0x96,  // text(1B)
  0xeb,  // $EB animSeq()
  0x7f, 0x23,  // text(2B)
  0xf1, 0x1c, 0x00,  // $F1 textPtr(0x1c,0x0)
  0x96,  // text(1B)
  0xeb,  // $EB animSeq()
  0x7f, 0x31,  // text(2B)
  0xf7,  // $F7 toggle()
  0x20, 0x00, 0x00, 0x10,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x58 的场景段列表 */
export const SCRIPT_0x58: readonly (readonly number[])[] = [
  SCRIPT_0x58_SCENE_0,
];

// ═══ 脚本 0x59 (entryAddr=0x7ed, 13B, 1个场景段) ═══
/** SCRIPT_0x59_SCENE_0 — 场景段0 (13B) */
export const SCRIPT_0x59_SCENE_0: readonly number[] = [
  0x00,  // text(1B)
  0xf1, 0x44, 0x80,  // $F1 textPtr(0x44,0x80)
  0x97, 0x80, 0x45,  // text(3B)
  0xf7,  // $F7 toggle()
  0x07, 0x00, 0x07, 0x1d,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x59 的场景段列表 */
export const SCRIPT_0x59: readonly (readonly number[])[] = [
  SCRIPT_0x59_SCENE_0,
];

// ═══ 脚本 0x5a (entryAddr=0x7fa, 23B, 1个场景段) ═══
/** SCRIPT_0x5a_SCENE_0 — 场景段0 (23B) */
export const SCRIPT_0x5a_SCENE_0: readonly number[] = [
  0x00,  // text(1B)
  0xf1, 0x44, 0xbe,  // $F1 textPtr(0x44,0xbe)
  0x5a,  // text(1B)
  0xf1, 0x44, 0x3c,  // $F1 textPtr(0x44,0x3c)
  0x97, 0x97, 0x01, 0x97, 0xa6, 0x01, 0x97, 0x97, 0x01,  // text(9B)
  0xf1, 0x44, 0xbe,  // $F1 textPtr(0x44,0xbe)
  0x97, 0x97,  // text(2B)
  0xff,  // $FF end()
];

/** 脚本 0x5a 的场景段列表 */
export const SCRIPT_0x5a: readonly (readonly number[])[] = [
  SCRIPT_0x5a_SCENE_0,
];

// ═══ 脚本 0x5b (entryAddr=0x811, 7B, 1个场景段) ═══
/** SCRIPT_0x5b_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x5b_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x48, 0x00,  // $F1 textPtr(0x48,0x0)
  0x96,  // text(1B)
  0xeb,  // $EB animSeq()
  0xff,  // $FF end()
];

/** 脚本 0x5b 的场景段列表 */
export const SCRIPT_0x5b: readonly (readonly number[])[] = [
  SCRIPT_0x5b_SCENE_0,
];

// ═══ 脚本 0x5c (entryAddr=0x818, 7B, 1个场景段) ═══
/** SCRIPT_0x5c_SCENE_0 — 场景段0 (7B) */
export const SCRIPT_0x5c_SCENE_0: readonly number[] = [
  0x21,  // text(1B)
  0xf1, 0x18, 0x00,  // $F1 textPtr(0x18,0x0)
  0x96,  // text(1B)
  0xeb,  // $EB animSeq()
  0xff,  // $FF end()
];

/** 脚本 0x5c 的场景段列表 */
export const SCRIPT_0x5c: readonly (readonly number[])[] = [
  SCRIPT_0x5c_SCENE_0,
];

// ═══ 脚本 0x5d (entryAddr=0x81f, 12B, 1个场景段) ═══
/** SCRIPT_0x5d_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x5d_SCENE_0: readonly number[] = [
  0x36,  // text(1B)
  0xf1, 0x34, 0x85,  // $F1 textPtr(0x34,0x85)
  0x97, 0xbb,  // text(2B)
  0xf7,  // $F7 toggle()
  0x09, 0x00, 0x07, 0x0d,  // text(4B)
  0xff,  // $FF end()
];

/** 脚本 0x5d 的场景段列表 */
export const SCRIPT_0x5d: readonly (readonly number[])[] = [
  SCRIPT_0x5d_SCENE_0,
];

// ═══ 脚本 0x5e (entryAddr=0x82b, 6101B, 1020个场景段) ═══
/** SCRIPT_0x5e_SCENE_0 — 场景段0 (12B) */
export const SCRIPT_0x5e_SCENE_0: readonly number[] = [
  0x36,  // text(1B)
  0xf1, 0x48, 0x86,  // $F1 textPtr(0x48,0x86)
  0x97, 0xbb,  // text(2B)
  0xf7,  // $F7 toggle()
  0x09, 0x00, 0x07, 0x0e,  // text(4B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1 — 场景段1 (6B) */
export const SCRIPT_0x5e_SCENE_1: readonly number[] = [
  0x08, 0x09, 0x0a, 0x0b,  // text(4B)
  0xfa, 0x10,  // $FA sceneLoad(0x10)
];

/** SCRIPT_0x5e_SCENE_2 — 场景段2 (27B) */
export const SCRIPT_0x5e_SCENE_2: readonly number[] = [
  0xb9, 0xbf, 0x34, 0x2c, 0x38, 0x28, 0x3c, 0x2a, 0xa0, 0x34, 0x2d, 0x38, 0x29, 0x3c, 0x2b, 0xa1, 0x38, 0x2e,  // text(18B)
  0xfb,  // $FB clearBuf()
  0xcf, 0xb7, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x10,  // $FA sceneLoad(0x10)
];

/** SCRIPT_0x5e_SCENE_3 — 场景段3 (29B) */
export const SCRIPT_0x5e_SCENE_3: readonly number[] = [
  0xb9, 0xbf, 0x34, 0x2f, 0x38, 0x38, 0x3c, 0x3a, 0xa0, 0x34, 0x39, 0x38, 0x3b, 0x3c, 0x2b, 0xa1, 0x34, 0x3c, 0x38, 0x3e,  // text(20B)
  0xfb,  // $FB clearBuf()
  0xcf, 0xb7, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x1b,  // $FA sceneLoad(0x1b)
];

/** SCRIPT_0x5e_SCENE_4 — 场景段4 (36B) */
export const SCRIPT_0x5e_SCENE_4: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xce, 0x3c, 0x2c, 0xc6, 0x3c, 0x2d, 0xce, 0x1c, 0x28, 0xc6, 0x1c, 0x29, 0x9f, 0xce, 0x3c, 0x2a, 0xc6, 0x3c, 0x2b, 0xa1, 0x9e, 0xce, 0x3c, 0x2e,  // text(27B)
  0xfb,  // $FB clearBuf()
  0x21, 0xb8, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x1b,  // $FA sceneLoad(0x1b)
];

/** SCRIPT_0x5e_SCENE_5 — 场景段5 (39B) */
export const SCRIPT_0x5e_SCENE_5: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xce, 0x3c, 0x2f, 0xc6, 0x3c, 0x39, 0xce, 0x1c, 0x38, 0xc6, 0x1c, 0x3b, 0x9f, 0xce, 0x3c, 0x3a, 0xc6, 0x3c, 0x2b, 0xa1, 0x9d, 0xce, 0x3c, 0x3c, 0xce, 0x1c, 0x3e,  // text(30B)
  0xfb,  // $FB clearBuf()
  0x21, 0xb8, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x30,  // $FA sceneLoad(0x30)
];

/** SCRIPT_0x5e_SCENE_6 — 场景段6 (37B) */
export const SCRIPT_0x5e_SCENE_6: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xce, 0x00, 0x2c, 0xc6, 0x00, 0x2d, 0x9e, 0xce, 0x00, 0x28, 0xc6, 0x00, 0x29, 0x9f, 0xce, 0x00, 0x2a, 0xc6, 0x00, 0x2b, 0xa1, 0x9e, 0xce, 0x00, 0x2e,  // text(28B)
  0xfb,  // $FB clearBuf()
  0x6d, 0xb8, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x30,  // $FA sceneLoad(0x30)
];

/** SCRIPT_0x5e_SCENE_7 — 场景段7 (41B) */
export const SCRIPT_0x5e_SCENE_7: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xce, 0x00, 0x2f, 0xc6, 0x00, 0x39, 0x9e, 0xce, 0x00, 0x38, 0xc6, 0x00, 0x3b, 0x9f, 0xce, 0x00, 0x3a, 0xc6, 0x00, 0x2b, 0xa1, 0x9d, 0xce, 0x00, 0x3c, 0x9e, 0xce, 0x00, 0x3e,  // text(32B)
  0xfb,  // $FB clearBuf()
  0x6d, 0xb8, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x3b,  // $FA sceneLoad(0x3b)
];

/** SCRIPT_0x5e_SCENE_8 — 场景段8 (39B) */
export const SCRIPT_0x5e_SCENE_8: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xc0, 0x3c, 0x2c, 0xc0, 0x1c, 0x28, 0x9f, 0xc0, 0x3c, 0x2a, 0xa0, 0x9d, 0xc0, 0x3c, 0x2d, 0xc0, 0x1c, 0x29, 0x9f, 0xc0, 0x3c, 0x2b, 0xa1, 0x9e, 0xc0, 0x3c, 0x2e,  // text(30B)
  0xfb,  // $FB clearBuf()
  0xc3, 0xb8, 0x08, 0x09, 0x0a, 0x0b,  // text(6B)
  0xfa, 0x3b,  // $FA sceneLoad(0x3b)
];

/** SCRIPT_0x5e_SCENE_9 — 场景段9 (90B) */
export const SCRIPT_0x5e_SCENE_9: readonly number[] = [
  0xb9, 0xbf, 0x9d, 0xc0, 0x3c, 0x2f, 0xc0, 0x1c, 0x38, 0x9f, 0xc0, 0x3c, 0x3a, 0xa0, 0x9d, 0xc0, 0x3c, 0x39, 0xc0, 0x1c, 0x3b, 0x9f, 0xc0, 0x3c, 0x2b, 0xa1, 0x9d, 0xc0, 0x3c, 0x3c, 0xc0, 0x1c, 0x3e,  // text(33B)
  0xfb,  // $FB clearBuf()
  0xc3, 0xb8, 0x10, 0x11, 0x12, 0x5f, 0xbe, 0x38, 0x11, 0x3c, 0x13, 0xbf, 0x38, 0x14, 0x3c, 0x16, 0x00, 0x19, 0xa0, 0x38, 0x15, 0x3c, 0x17, 0x00, 0x1c,  // text(25B)
  0xfb,  // $FB clearBuf()
  0x4c, 0xb9, 0x10, 0x11, 0x12, 0x5f, 0xbe, 0x08, 0x86, 0xbf, 0x04, 0x84, 0x08, 0x87, 0xa0, 0x00, 0x82, 0x04, 0x85, 0xa1, 0x3d, 0x88, 0x01, 0x83, 0xa2, 0x39, 0x8c, 0x3d, 0x89,  // text(29B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_10 — 场景段10 (138B) */
export const SCRIPT_0x5e_SCENE_10: readonly number[] = [
  0x6a, 0x6b, 0x7a, 0x7b, 0xbf, 0x03, 0x52, 0x07, 0x58, 0x0b, 0x5a, 0xa0, 0x03, 0x5c, 0x03, 0x53, 0x07, 0x5e, 0x07, 0x59, 0x0b, 0x74, 0x0b, 0x5b, 0xa1, 0x43, 0x5c, 0x43, 0x53, 0x47, 0x5e, 0x47, 0x59, 0x4b, 0x74, 0x4b, 0x5b, 0xa2, 0x43, 0x52, 0x47, 0x58, 0x4b, 0x5a,  // text(44B)
  0xfb,  // $FB clearBuf()
  0x90, 0xbc, 0x6a, 0x6b, 0x7a, 0x7b, 0xbf, 0x3f, 0x54, 0xa0, 0x3b, 0x5f, 0x3f, 0x55, 0x03, 0x57, 0x07, 0x5d, 0xa1, 0x7b, 0x5f, 0x7f, 0x55, 0x43, 0x57, 0x47, 0x5d, 0xa2, 0x7f, 0x54,  // text(30B)
  0xfb,  // $FB clearBuf()
  0xaa, 0xb9, 0x06, 0x07, 0x5e, 0x5f, 0xbf, 0x39, 0x4f, 0x3d, 0x65, 0x01, 0x67, 0x05, 0x6d, 0x09, 0x6f, 0xa0, 0x39, 0x5a, 0x3d, 0x70, 0x01, 0x72, 0x05, 0x78, 0x09, 0x7a, 0xa1, 0x39, 0x5b, 0x3d, 0x71, 0x01, 0x73, 0x05, 0x79, 0x09, 0x7b, 0xa2, 0x39, 0x5e, 0x3d, 0x74, 0x01, 0x76, 0x05, 0x7c, 0x09, 0x7e, 0xa3, 0x39, 0x5f, 0x3d, 0x75, 0x01, 0x77, 0x05, 0x7d, 0x09, 0x7f,  // text(61B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_11 — 场景段11 (37B) */
export const SCRIPT_0x5e_SCENE_11: readonly number[] = [
  0x06, 0x07, 0x5e, 0x5f, 0xbf, 0x38, 0x42, 0xa0, 0x38, 0x43, 0x9f, 0xcc, 0x00, 0x44, 0xc4, 0x00, 0x45, 0x01, 0x47, 0x05, 0x51, 0x09, 0x53, 0xa1, 0x38, 0x41, 0x3d, 0x50, 0x00, 0x46, 0x01, 0x52, 0x05, 0x54, 0x09, 0x56,  // text(36B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_12 — 场景段12 (66B) */
export const SCRIPT_0x5e_SCENE_12: readonly number[] = [
  0x06, 0x07, 0x5e, 0x5f, 0xbf, 0x39, 0x4a, 0x3d, 0x60, 0x01, 0x62, 0x05, 0x68, 0x09, 0x6a, 0xa0, 0x39, 0x4b, 0x3d, 0x61, 0x01, 0x63, 0x05, 0x69, 0x09, 0x6b, 0xa1, 0x3d, 0x64, 0x01, 0x66, 0x05, 0x6c, 0x09, 0x6e, 0xa2, 0x01, 0x4d, 0x05, 0x4c, 0x09, 0x4e, 0xa3, 0x01, 0x58, 0x05, 0x59, 0x09, 0x5c, 0xa1, 0x38, 0x55, 0x3c, 0x57, 0x0d, 0x53, 0xa2, 0x38, 0x48, 0x3c, 0x49, 0x00, 0x40, 0x0d, 0x56,  // text(65B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_13 — 场景段13 (12B) */
export const SCRIPT_0x5e_SCENE_13: readonly number[] = [
  0x06, 0x07, 0x5e, 0x5f, 0xa0, 0x39, 0x58, 0x3d, 0x59, 0x01, 0x5c,  // text(11B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_14 — 场景段14 (91B) */
export const SCRIPT_0x5e_SCENE_14: readonly number[] = [
  0x33, 0x5d, 0x5e, 0x5f, 0xbd, 0x3c, 0x28, 0xbe, 0x38, 0x02, 0x3c, 0x08, 0x00, 0x0a, 0x04, 0x20, 0x08, 0x22, 0xbf, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x0b, 0x04, 0x21, 0x09, 0x23, 0x0c, 0x29, 0xa0, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x06, 0x24, 0x09, 0x26, 0x0c, 0x2c, 0xa1, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x06, 0x25, 0x09, 0x27, 0x0c, 0x2d, 0xa2, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x30, 0x08, 0x32, 0x0c, 0x38, 0xa3, 0x38, 0x0e, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x31, 0x08, 0x33, 0xa4, 0x38, 0x0f, 0x3c, 0x03, 0x00, 0x09, 0x04, 0x39,  // text(90B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_15 — 场景段15 (99B) */
export const SCRIPT_0x5e_SCENE_15: readonly number[] = [
  0x30, 0x31, 0x32, 0x5f, 0xbd, 0x38, 0x81, 0xbe, 0x38, 0x80, 0x3c, 0x82, 0x00, 0x88, 0x04, 0x8a, 0x08, 0x22, 0xbf, 0x38, 0x01, 0x3c, 0x01, 0x02, 0x89, 0x04, 0x8b, 0x05, 0x83, 0x09, 0xa1, 0x0c, 0x46, 0xa0, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x8c, 0x09, 0x8e, 0x0c, 0xa4, 0xa1, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x8d, 0x08, 0x8f, 0x0c, 0x2d, 0xa2, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x98, 0x08, 0x9a, 0x0c, 0x53, 0xa3, 0x38, 0x84, 0x3c, 0x01, 0x00, 0x90, 0x04, 0x92, 0x08, 0x86, 0xa4, 0x38, 0x85, 0x3c, 0x87, 0x00, 0x91, 0x04, 0x93, 0xa5, 0x0c, 0xa5, 0xa6, 0x0c, 0xb0,  // text(98B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_16 — 场景段16 (94B) */
export const SCRIPT_0x5e_SCENE_16: readonly number[] = [
  0x36, 0x37, 0x5e, 0x5f, 0xbe, 0x39, 0x04, 0x3d, 0x02, 0x01, 0x08, 0x04, 0x0a, 0x08, 0x20, 0xbf, 0x39, 0x33, 0x3d, 0x03, 0x01, 0x09, 0x02, 0x05, 0x04, 0x0b, 0x06, 0x07, 0x0a, 0x21, 0x0c, 0x23, 0xa0, 0x39, 0x33, 0x3d, 0x06, 0x01, 0x0c, 0x05, 0x0e, 0x0a, 0x24, 0x0c, 0x26, 0xa1, 0x39, 0x33, 0x3d, 0x33, 0x01, 0x0d, 0x05, 0x0f, 0x08, 0x25, 0x0a, 0x22, 0x0c, 0x27, 0xa2, 0x39, 0x33, 0x3d, 0x33, 0x01, 0x33, 0x05, 0x1a, 0x09, 0x30, 0x0c, 0x32, 0xa3, 0x39, 0x11, 0x3d, 0x33, 0x01, 0x10, 0x05, 0x12, 0x09, 0x18, 0xa4, 0x39, 0x13, 0x3d, 0x19, 0x01, 0x1b, 0x05, 0x31,  // text(93B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_17 — 场景段17 (81B) */
export const SCRIPT_0x5e_SCENE_17: readonly number[] = [
  0x30, 0x31, 0x32, 0x5f, 0xbe, 0x39, 0x3c, 0x3d, 0x3e, 0x01, 0x04, 0x04, 0x06, 0x08, 0x22, 0xbf, 0x39, 0x3d, 0x3d, 0x3f, 0x01, 0x05, 0x04, 0x07, 0x0a, 0x1d, 0x0c, 0x1f, 0xa0, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x10, 0x04, 0x12, 0x05, 0x14, 0x0a, 0x35, 0x0c, 0x37, 0xa1, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x11, 0x05, 0x13, 0x0a, 0x2e, 0x0c, 0x3b, 0xa2, 0x39, 0x2b, 0x3d, 0x02, 0x01, 0x02, 0x05, 0x16, 0x09, 0x2f, 0x0f, 0x1b, 0xa3, 0x39, 0x28, 0x3d, 0x2a, 0x01, 0x15, 0x05, 0x17, 0x09, 0x3a,  // text(80B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_18 — 场景段18 (97B) */
export const SCRIPT_0x5e_SCENE_18: readonly number[] = [
  0x30, 0x31, 0x32, 0x5f, 0xbe, 0x39, 0x09, 0x3d, 0x08, 0x01, 0x0a, 0x04, 0x20, 0x08, 0x22, 0xbf, 0x39, 0x0c, 0x3d, 0x02, 0x01, 0x0b, 0x04, 0x21, 0x0a, 0x23, 0x0c, 0x29, 0xa0, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x0e, 0x05, 0x24, 0x0a, 0x26, 0x0c, 0x2c, 0xa1, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x02, 0x05, 0x25, 0x07, 0x18, 0x0a, 0x27, 0x0b, 0x1a, 0x0c, 0x2d, 0xa2, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x02, 0x05, 0x30, 0x09, 0x32, 0x0c, 0x38, 0xa3, 0x39, 0x19, 0x3d, 0x02, 0x01, 0x31, 0x05, 0x33, 0x09, 0x39, 0xa4, 0x39, 0x1c, 0x3d, 0x1e, 0x01, 0x34, 0x05, 0x36, 0xa5, 0x39, 0x0d, 0x3d, 0x0f,  // text(96B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_19 — 场景段19 (99B) */
export const SCRIPT_0x5e_SCENE_19: readonly number[] = [
  0x30, 0x31, 0x32, 0x5f, 0xbd, 0x39, 0x40, 0x3d, 0x42, 0x01, 0x48, 0xbe, 0x39, 0x41, 0x3d, 0x43, 0x01, 0x49, 0x04, 0x4b, 0x08, 0x22, 0xbf, 0x39, 0x02, 0x01, 0x4c, 0x04, 0x4e, 0x0a, 0x44, 0x0c, 0x46, 0xa0, 0x01, 0x4d, 0x04, 0x4f, 0x0a, 0x45, 0x0c, 0x47, 0xa1, 0x07, 0x5a, 0x08, 0x50, 0x0a, 0x4a, 0x0c, 0x2d, 0xa2, 0x39, 0x02, 0x05, 0x5b, 0x09, 0x51, 0x0c, 0x53, 0xa3, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x02, 0x05, 0x5e, 0x09, 0x54, 0xa4, 0x39, 0x02, 0x3d, 0x56, 0x01, 0x02, 0x05, 0x5f, 0x09, 0x55, 0xa5, 0x39, 0x02, 0x3d, 0x5c, 0x01, 0x52, 0x05, 0x58, 0xa6, 0x39, 0x57, 0x3d, 0x5d, 0x01, 0x59,  // text(98B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_20 — 场景段20 (87B) */
export const SCRIPT_0x5e_SCENE_20: readonly number[] = [
  0x30, 0x31, 0x32, 0x5f, 0xbc, 0x39, 0xa0, 0xbd, 0x39, 0xa2, 0x3d, 0xa8, 0xbe, 0x39, 0xa3, 0x3d, 0xa9, 0x01, 0xa6, 0x04, 0xac, 0x08, 0x22, 0xbf, 0x39, 0x02, 0x3d, 0x02, 0x01, 0xa7, 0x04, 0xad, 0x0a, 0xaf, 0x0c, 0xb1, 0xa0, 0x39, 0x02, 0x3d, 0x02, 0x01, 0xb2, 0x04, 0xb8, 0x0a, 0xba, 0x0c, 0x9b, 0xa1, 0x39, 0x02, 0x3d, 0x02, 0x01, 0xb3, 0x04, 0xb9, 0x07, 0xae, 0x08, 0xbb, 0x0c, 0x2d, 0xa2, 0x39, 0x02, 0x3d, 0x02, 0x01, 0x94, 0x05, 0x96, 0x09, 0x99, 0x0c, 0x53, 0xa3, 0x39, 0xaa, 0x3d, 0xab, 0x01, 0x95, 0x05, 0x97,  // text(86B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_21 — 场景段21 (94B) */
export const SCRIPT_0x5e_SCENE_21: readonly number[] = [
  0x38, 0x39, 0x3a, 0x3b, 0xbd, 0x81, 0xc0, 0x0e, 0x20, 0x0e, 0x04, 0xbe, 0x3a, 0x02, 0x3e, 0x08, 0x02, 0x0a, 0x05, 0x21, 0x0e, 0x05, 0xbf, 0x3a, 0x03, 0x3e, 0x09, 0x02, 0x0b, 0x05, 0x24, 0x08, 0x26, 0x0c, 0x2c, 0x0e, 0x10, 0xa0, 0x3a, 0x06, 0x3e, 0x0c, 0x01, 0x0e, 0x05, 0x25, 0x0b, 0x27, 0x0c, 0x2d, 0xa1, 0x3a, 0x07, 0x3e, 0x0d, 0x01, 0x0f, 0x05, 0x30, 0x0b, 0x32, 0x0c, 0x38, 0xa2, 0x3a, 0x12, 0x3e, 0x18, 0x01, 0x1a, 0x05, 0x1e, 0x04, 0x31, 0x08, 0x33, 0x0c, 0x39, 0xa3, 0x3a, 0x13, 0x3c, 0x19, 0x3e, 0x1c, 0x00, 0x1b, 0x04, 0x34, 0x08, 0x36, 0x0c, 0x3c,  // text(93B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_22 — 场景段22 (6B) */
export const SCRIPT_0x5e_SCENE_22: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b,  // text(4B)
  0xfa, 0x88,  // $FA sceneLoad(0x88)
];

/** SCRIPT_0x5e_SCENE_23 — 场景段23 (10B) */
export const SCRIPT_0x5e_SCENE_23: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0x88,  // $FA sceneLoad(0x88)
];

/** SCRIPT_0x5e_SCENE_24 — 场景段24 (10B) */
export const SCRIPT_0x5e_SCENE_24: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0x88,  // $FA sceneLoad(0x88)
];

/** SCRIPT_0x5e_SCENE_25 — 场景段25 (10B) */
export const SCRIPT_0x5e_SCENE_25: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0x88,  // $FA sceneLoad(0x88)
];

/** SCRIPT_0x5e_SCENE_26 — 场景段26 (10B) */
export const SCRIPT_0x5e_SCENE_26: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x6e, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0x9c,  // $FA sceneLoad(0x9c)
];

/** SCRIPT_0x5e_SCENE_27 — 场景段27 (10B) */
export const SCRIPT_0x5e_SCENE_27: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0x9c,  // $FA sceneLoad(0x9c)
];

/** SCRIPT_0x5e_SCENE_28 — 场景段28 (10B) */
export const SCRIPT_0x5e_SCENE_28: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0x9c,  // $FA sceneLoad(0x9c)
];

/** SCRIPT_0x5e_SCENE_29 — 场景段29 (10B) */
export const SCRIPT_0x5e_SCENE_29: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0x03,  // $FA sceneLoad(0x3)
];

/** SCRIPT_0x5e_SCENE_30 — 场景段30 (10B) */
export const SCRIPT_0x5e_SCENE_30: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x3d, 0xbc, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0xa2,  // $FA sceneLoad(0xa2)
];

/** SCRIPT_0x5e_SCENE_31 — 场景段31 (10B) */
export const SCRIPT_0x5e_SCENE_31: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0xa2,  // $FA sceneLoad(0xa2)
];

/** SCRIPT_0x5e_SCENE_32 — 场景段32 (27B) */
export const SCRIPT_0x5e_SCENE_32: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b, 0xbf, 0x3f, 0x48, 0x03, 0x4a, 0x07, 0x60, 0xa0, 0x3f, 0x49, 0x03, 0x4b, 0x07, 0x61, 0xa1, 0x3f,  // text(22B)
  0xfd,  // $FD fillWait()
  0x03,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_33 — 场景段33 (4B) */
export const SCRIPT_0x5e_SCENE_33: readonly number[] = [
  0x07,  // text(1B)
  0xfe, 0xff, 0x28,  // $FE jump(0xff,0x28)
];

/** SCRIPT_0x5e_SCENE_34 — 场景段34 (29B) */
export const SCRIPT_0x5e_SCENE_34: readonly number[] = [
  0x29, 0x2a, 0x2b, 0xbf, 0x07, 0x50, 0x0b, 0x52, 0xa0, 0x07, 0x51, 0x0b, 0x53, 0xa1, 0x07, 0x54, 0x09, 0x56, 0x0b, 0x2e,  // text(20B)
  0xfb,  // $FB clearBuf()
  0x06, 0xba, 0x28, 0x29, 0x2a, 0x2b,  // text(6B)
  0xfa, 0x65,  // $FA sceneLoad(0x65)
];

/** SCRIPT_0x5e_SCENE_35 — 场景段35 (23B) */
export const SCRIPT_0x5e_SCENE_35: readonly number[] = [
  0xba,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x71, 0xba, 0x28, 0x29, 0x2a, 0x2b, 0xa1, 0x03, 0x70, 0xa2, 0x03, 0x75, 0x07, 0x77, 0x0b, 0x4f, 0xa0, 0x03, 0x65,  // text(19B)
  0xfa, 0x65,  // $FA sceneLoad(0x65)
];

/** SCRIPT_0x5e_SCENE_36 — 场景段36 (121B) */
export const SCRIPT_0x5e_SCENE_36: readonly number[] = [
  0xba,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x7c, 0xba, 0x28, 0x29, 0x2a, 0x2b, 0xa1, 0x03, 0x67, 0xa2, 0x03, 0x72, 0x07, 0x73,  // text(14B)
  0xfb,  // $FB clearBuf()
  0x1e, 0xae, 0x28, 0x29, 0x2a, 0x2b, 0xbf, 0x07, 0x76, 0x0b, 0x6d, 0x0f, 0x6f, 0xa0, 0x0f, 0x7a, 0xa1, 0x0f, 0x74,  // text(19B)
  0xfb,  // $FB clearBuf()
  0x71, 0xba, 0x28, 0x29, 0x2a, 0x2b, 0xbf, 0x07, 0x78, 0x0b, 0x79, 0x0f, 0x7b, 0xa0, 0x0f, 0x7c,  // text(16B)
  0xfb,  // $FB clearBuf()
  0x46, 0xae, 0x74, 0x75, 0x76, 0x77, 0xbd, 0x30, 0x1f, 0x34, 0x08, 0x38, 0x0a, 0xbe, 0x34, 0x09, 0x38, 0x0b, 0x3c, 0x13, 0xbf, 0x34, 0x0c, 0x38, 0x0e, 0x3c, 0x04, 0x00, 0x06, 0xa0, 0x34, 0x0d, 0x38, 0x0f, 0x3c, 0x05, 0x00, 0x07, 0xa1, 0x34, 0x18, 0x38, 0x1a, 0x3c, 0x10, 0x00, 0x12, 0xa2, 0x34, 0x19, 0x38, 0x1b, 0x3c, 0x11, 0xa3, 0x34, 0x14, 0x38, 0x16, 0xa4, 0x30, 0x03, 0x34, 0x5b, 0x38, 0x17,  // text(66B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_37 — 场景段37 (6B) */
export const SCRIPT_0x5e_SCENE_37: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0xd4,  // $FA sceneLoad(0xd4)
];

/** SCRIPT_0x5e_SCENE_38 — 场景段38 (2B) */
export const SCRIPT_0x5e_SCENE_38: readonly number[] = [
  0xbb,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_39 — 场景段39 (6B) */
export const SCRIPT_0x5e_SCENE_39: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0xe8,  // $FA sceneLoad(0xe8)
];

/** SCRIPT_0x5e_SCENE_40 — 场景段40 (2B) */
export const SCRIPT_0x5e_SCENE_40: readonly number[] = [
  0xbb,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_41 — 场景段41 (6B) */
export const SCRIPT_0x5e_SCENE_41: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0x03,  // $FA sceneLoad(0x3)
];

/** SCRIPT_0x5e_SCENE_42 — 场景段42 (2B) */
export const SCRIPT_0x5e_SCENE_42: readonly number[] = [
  0xbc,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_43 — 场景段43 (6B) */
export const SCRIPT_0x5e_SCENE_43: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0x1a,  // $FA sceneLoad(0x1a)
];

/** SCRIPT_0x5e_SCENE_44 — 场景段44 (2B) */
export const SCRIPT_0x5e_SCENE_44: readonly number[] = [
  0xbc,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_45 — 场景段45 (94B) */
export const SCRIPT_0x5e_SCENE_45: readonly number[] = [
  0x3b, 0x47, 0x5e, 0x5f, 0xa0, 0x30, 0x04, 0x34, 0x06, 0x38, 0x12, 0x3c, 0x0a, 0x00, 0x20, 0x04, 0x1c, 0x08, 0x05, 0x0c, 0x02, 0xa1, 0x34, 0x07, 0x38, 0x09, 0x3c, 0x0b, 0x00, 0x21, 0x04, 0x1d, 0x08, 0x10, 0x0c, 0x03, 0xa2, 0x34, 0x12, 0x38, 0x0c, 0x3c, 0x0e, 0x00, 0x24, 0x04, 0x1e, 0x08, 0x11, 0xa3, 0x34, 0x13, 0x38, 0x0d, 0x3c, 0x0f, 0x00, 0x25, 0x04, 0x1f, 0x08, 0x14, 0xa4, 0x34, 0x16, 0x38, 0x18, 0x3c, 0x1a, 0x00, 0x30, 0x04, 0x35, 0x08, 0x15, 0xa5, 0x38, 0x19, 0x3c, 0x1b, 0x00, 0x31, 0x04, 0x22, 0xa6, 0x38, 0x17, 0x3c, 0x08, 0x00, 0x34, 0x04, 0x36,  // text(93B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_46 — 场景段46 (94B) */
export const SCRIPT_0x5e_SCENE_46: readonly number[] = [
  0x3b, 0x47, 0x5e, 0x5f, 0xa0, 0x30, 0x04, 0x34, 0x06, 0x38, 0x12, 0x3c, 0x28, 0x00, 0x2a, 0x04, 0x1c, 0x08, 0x05, 0x0c, 0x02, 0xa1, 0x34, 0x07, 0x38, 0x23, 0x3c, 0x29, 0x00, 0x2b, 0x04, 0x37, 0x08, 0x10, 0x0c, 0x03, 0xa2, 0x34, 0x12, 0x38, 0x26, 0x3c, 0x2c, 0x00, 0x2e, 0x04, 0x3d, 0x08, 0x11, 0xa3, 0x34, 0x13, 0x38, 0x27, 0x3c, 0x2d, 0x00, 0x2f, 0x04, 0x3f, 0x08, 0x14, 0xa4, 0x34, 0x16, 0x38, 0x32, 0x3c, 0x38, 0x00, 0x3a, 0x04, 0x58, 0x08, 0x15, 0xa5, 0x38, 0x33, 0x3c, 0x39, 0x00, 0x3b, 0x04, 0x59, 0xa6, 0x38, 0x17, 0x3c, 0x3c, 0x00, 0x3e, 0x04, 0x36,  // text(93B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_47 — 场景段47 (73B) */
export const SCRIPT_0x5e_SCENE_47: readonly number[] = [
  0x3b, 0x47, 0x5e, 0x5f, 0xa0, 0x30, 0x04, 0x34, 0x06, 0x38, 0x4e, 0x04, 0x53, 0x08, 0x05, 0x0c, 0x02, 0xa1, 0x34, 0x07, 0x38, 0x4f, 0x3c, 0x64, 0x00, 0x66, 0x04, 0x56, 0x08, 0x10, 0x0c, 0x03, 0xa2, 0x34, 0x12, 0x38, 0x5a, 0x3c, 0x65, 0x00, 0x67, 0x04, 0x57, 0x08, 0x11, 0xa3, 0x34, 0x13, 0x38, 0x5b, 0x3c, 0x51, 0x04, 0x5c, 0x08, 0x14, 0xa4, 0x34, 0x16, 0x38, 0x5e, 0x3c, 0x54, 0x04, 0x5d, 0x08, 0x15, 0xa5, 0x38, 0x5f, 0x3c, 0x55,  // text(72B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_48 — 场景段48 (33B) */
export const SCRIPT_0x5e_SCENE_48: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xbf, 0x03, 0x08, 0x07, 0x0a, 0xa0, 0x3f, 0x02, 0x03, 0x09, 0x07, 0x0b, 0x0b, 0x20, 0xa1, 0x3f, 0x03, 0x03, 0x0c, 0x07, 0x0e, 0x0b, 0x21, 0xa2, 0x03, 0x0d, 0x07, 0x0f,  // text(32B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_49 — 场景段49 (27B) */
export const SCRIPT_0x5e_SCENE_49: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xbf, 0x03, 0x22, 0x07, 0x28, 0xa0, 0x3f, 0x24, 0x03, 0x23, 0x07, 0x29, 0xa1, 0x3f, 0x25, 0x03, 0x26, 0x07, 0x2c, 0xa2, 0x03, 0x27,  // text(26B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_50 — 场景段50 (24B) */
export const SCRIPT_0x5e_SCENE_50: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xbf, 0x03, 0x06, 0x07, 0x28, 0xa0, 0x3f, 0x04, 0x03, 0x07, 0x07, 0x18, 0xa1, 0x3f, 0x05, 0x03, 0x12, 0x07, 0x19,  // text(23B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_51 — 场景段51 (15B) */
export const SCRIPT_0x5e_SCENE_51: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x10, 0x07, 0x2d, 0xa1, 0x03, 0x11, 0x07, 0x13,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_52 — 场景段52 (15B) */
export const SCRIPT_0x5e_SCENE_52: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x1a, 0x07, 0x30, 0xa1, 0x03, 0x1b, 0x07, 0x31,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_53 — 场景段53 (15B) */
export const SCRIPT_0x5e_SCENE_53: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x32, 0x07, 0x38, 0xa1, 0x03, 0x33, 0x07, 0x39,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_54 — 场景段54 (15B) */
export const SCRIPT_0x5e_SCENE_54: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x2a, 0x07, 0x2e, 0xa1, 0x03, 0x2b, 0x07, 0x2f,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_55 — 场景段55 (8B) */
export const SCRIPT_0x5e_SCENE_55: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x3a,  // text(7B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_56 — 场景段56 (8B) */
export const SCRIPT_0x5e_SCENE_56: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x3b,  // text(7B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_57 — 场景段57 (8B) */
export const SCRIPT_0x5e_SCENE_57: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xa0, 0x03, 0x14,  // text(7B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_58 — 场景段58 (18B) */
export const SCRIPT_0x5e_SCENE_58: readonly number[] = [
  0x06, 0x26, 0x21, 0x5f, 0xbf, 0x01, 0x7c, 0xa0, 0x3f, 0xb4, 0x01, 0x7d, 0x05, 0x7e, 0xa1, 0x05, 0x7f,  // text(17B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_59 — 场景段59 (23B) */
export const SCRIPT_0x5e_SCENE_59: readonly number[] = [
  0x10, 0x11, 0x12, 0x5f, 0xa0, 0x3b, 0xb8, 0x7f, 0xbb, 0x03, 0xbc, 0x47, 0xbf, 0xa1, 0x3b, 0xb9, 0x3f, 0xbb, 0x43, 0xbc, 0x07, 0xbf,  // text(22B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_60 — 场景段60 (37B) */
export const SCRIPT_0x5e_SCENE_60: readonly number[] = [
  0x10, 0x11, 0x12, 0x5f, 0xa0, 0x9e, 0xc0, 0x73, 0xb6, 0x9f, 0xc0, 0x73, 0xbb, 0xc0, 0x13, 0xbc, 0x80, 0xc0, 0x53, 0xbf, 0xa1, 0x9e, 0xc0, 0x33, 0xb6, 0x9f, 0xc0, 0x33, 0xbb, 0xc0, 0x53, 0xbc, 0x80, 0xc0, 0x13, 0xbf,  // text(36B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_61 — 场景段61 (55B) */
export const SCRIPT_0x5e_SCENE_61: readonly number[] = [
  0x74, 0x75, 0x76, 0x77, 0xbe, 0x3b, 0x20, 0x3f, 0x22, 0x03, 0x24, 0xbf, 0x38, 0x1c, 0x3b, 0x21, 0x3c, 0x1e, 0x3f, 0x23, 0x03, 0x25, 0x07, 0x27, 0xa0, 0x38, 0x18, 0x3c, 0x1a, 0x00, 0x1d, 0x03, 0x26, 0x07, 0x28, 0xa1, 0x38, 0x19, 0x3c, 0x1b, 0x00, 0x11, 0xa2, 0x38, 0x14, 0x3c, 0x16, 0xa3, 0x34, 0x03, 0x38, 0x5b, 0x3c, 0x17,  // text(54B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_62 — 场景段62 (71B) */
export const SCRIPT_0x5e_SCENE_62: readonly number[] = [
  0x2c, 0x2d, 0x5e, 0x5f, 0xbc, 0x08, 0x22, 0x0c, 0x28, 0xbd, 0x04, 0x24, 0x08, 0x23, 0x0c, 0x29, 0xbe, 0x39, 0x02, 0x9f, 0xcc, 0x01, 0x08, 0xc4, 0x01, 0x09, 0x00, 0x0a, 0x04, 0x20, 0x08, 0x26, 0xbf, 0x39, 0x03, 0x9f, 0xc4, 0x01, 0x0c, 0x00, 0x0b, 0x04, 0x21, 0xa0, 0x00, 0x0e, 0xa1, 0x00, 0x2a, 0x04, 0x2f, 0xa2, 0x3c, 0x2c, 0x00, 0x2b, 0x04, 0x3a, 0xa3, 0x38, 0x27, 0x3c, 0x2d, 0x00, 0x2e, 0xa4, 0x38, 0x32, 0x3c, 0x38,  // text(70B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_63 — 场景段63 (36B) */
export const SCRIPT_0x5e_SCENE_63: readonly number[] = [
  0x04, 0x05, 0x1e, 0x1f, 0xbf, 0x3c, 0x82, 0x02, 0x88, 0x06, 0x8a, 0x0a, 0xa0, 0xa0, 0x3c, 0xb9, 0x02, 0x84, 0x01, 0x89, 0x06, 0x85, 0x05, 0x8b, 0x0a, 0xa1, 0xa1, 0x3c, 0x86, 0x02, 0x8c, 0x06, 0x8e, 0x0a, 0xa4,  // text(35B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_64 — 场景段64 (17B) */
export const SCRIPT_0x5e_SCENE_64: readonly number[] = [
  0x7c, 0x71, 0x52, 0x53, 0xbf, 0x34, 0x50, 0x0a,  // text(8B)
  0xf6, 0x0e,  // $F6 waitAnim(0xe)
  0xfc,  // $FC vramAdvance()
  0x11,  // text(1B)
  0xea,  // $EA fadeOutClear()
  0x12,  // text(1B)
  0xfe, 0xa0, 0x9d,  // $FE jump(0xa0,0x9d)
];

/** SCRIPT_0x5e_SCENE_65 — 场景段65 (11B) */
export const SCRIPT_0x5e_SCENE_65: readonly number[] = [
  0xce, 0x01,  // text(2B)
  0xe6,  // lineEdit(0xe6)
  0x9e, 0xce, 0x00, 0x52, 0xce, 0x01,  // text(6B)
  0xfa, 0xc6,  // $FA sceneLoad(0xc6)
];

/** SCRIPT_0x5e_SCENE_66 — 场景段66 (54B) */
export const SCRIPT_0x5e_SCENE_66: readonly number[] = [
  0x00, 0x53, 0xc6, 0x01,  // text(4B)
  0xfb,  // $FB clearBuf()
  0x3c, 0x58, 0x3d,  // text(3B)
  0xe5,  // lineEdit(0xe5)
  0x00, 0x5a, 0x01,  // text(3B)
  0xe7,  // lineEdit(0xe7)
  0x81, 0xcc, 0x00, 0x56, 0xc4, 0x00, 0x57, 0x05,  // text(8B)
  0xed,  // $ED findSlot()
  0x82, 0xcc, 0x00, 0x5c, 0xc4, 0x00, 0x5d, 0xca, 0x01,  // text(9B)
  0xee,  // $EE clearText()
  0xc2, 0x01,  // text(2B)
  0xef,  // $EF spriteFlip()
  0x83, 0xcc, 0x00, 0x5e, 0xc4, 0x00, 0x5f, 0xca, 0x01,  // text(9B)
  0xe8, 0xc2,  // $E8 tableLoad(0xc2)
  0x01,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0x10, 0x55, 0x11,  // text(3B)
  0xeb,  // $EB animSeq()
  0x12,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_67 — 场景段67 (45B) */
export const SCRIPT_0x5e_SCENE_67: readonly number[] = [
  0xa1, 0x3c, 0x59, 0x3d,  // text(4B)
  0xf0, 0x00, 0x5b,  // $F0 textPos(0x0,0x5b)
  0x01,  // text(1B)
  0xf2, 0x81,  // $F2 lineLen(0x81)
  0xc4, 0x00, 0x54, 0x05,  // text(4B)
  0xf8, 0xa2, 0x02,  // $F8 external(0xa2,0x2)
  0xf7,  // $F7 toggle()
  0x00, 0x51, 0x01,  // text(3B)
  0xf3, 0x05,  // $F3 palette(0x5)
  0xf9,  // $F9 flagBit()
  0x06,  // text(1B)
  0xfd,  // $FD fillWait()
  0xbf, 0x05,  // text(2B)
  0xec, 0xff, 0x70,  // $EC textSeq(0xff,0x70)
  0x71, 0x72, 0x73, 0xa0, 0x02,  // text(5B)
  0xed,  // $ED findSlot()
  0x06,  // text(1B)
  0xef,  // $EF spriteFlip()
  0xa1, 0x42,  // text(2B)
  0xed,  // $ED findSlot()
  0x46,  // text(1B)
  0xef,  // $EF spriteFlip()
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_68 — 场景段68 (62B) */
export const SCRIPT_0x5e_SCENE_68: readonly number[] = [
  0x6c, 0x6d, 0x6e, 0x6f, 0xbc, 0x38,  // text(6B)
  0xf3, 0xbd,  // $F3 palette(0xbd)
  0x38,  // text(1B)
  0xf6, 0xbe,  // $F6 waitAnim(0xbe)
  0x38,  // text(1B)
  0xf6, 0xbf,  // $F6 waitAnim(0xbf)
  0x38,  // text(1B)
  0xf6, 0x83,  // $F6 waitAnim(0x83)
  0xc0, 0x32, 0x5d, 0xc0, 0x12, 0x5f, 0xa0, 0x38,  // text(8B)
  0xf6, 0x00,  // $F6 waitAnim(0x0)
  0xf6, 0x04,  // $F6 waitAnim(0x4)
  0xf7,  // $F7 toggle()
  0x83, 0xc0, 0x72, 0x5d, 0xc0, 0x52, 0x5f, 0xa1, 0x38,  // text(9B)
  0xf6, 0x00,  // $F6 waitAnim(0x0)
  0xf6, 0xa2,  // $F6 waitAnim(0xa2)
  0x38,  // text(1B)
  0xf6, 0x00,  // $F6 waitAnim(0x0)
  0xf6, 0xa3,  // $F6 waitAnim(0xa3)
  0x3c,  // text(1B)
  0xf7,  // $F7 toggle()
  0x00,  // text(1B)
  0xf3, 0xa4,  // $F3 palette(0xa4)
  0x00,  // text(1B)
  0xf6, 0xa5,  // $F6 waitAnim(0xa5)
  0x00,  // text(1B)
  0xf6, 0xa6,  // $F6 waitAnim(0xa6)
  0x04,  // text(1B)
  0xf7,  // $F7 toggle()
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_69 — 场景段69 (7B) */
export const SCRIPT_0x5e_SCENE_69: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xbf,  // text(5B)
  0xfa, 0xed,  // $FA sceneLoad(0xed)
];

/** SCRIPT_0x5e_SCENE_70 — 场景段70 (4B) */
export const SCRIPT_0x5e_SCENE_70: readonly number[] = [
  0xba, 0xa0,  // text(2B)
  0xfa, 0xed,  // $FA sceneLoad(0xed)
];

/** SCRIPT_0x5e_SCENE_71 — 场景段71 (4B) */
export const SCRIPT_0x5e_SCENE_71: readonly number[] = [
  0xba, 0xa1,  // text(2B)
  0xfa, 0xed,  // $FA sceneLoad(0xed)
];

/** SCRIPT_0x5e_SCENE_72 — 场景段72 (4B) */
export const SCRIPT_0x5e_SCENE_72: readonly number[] = [
  0xba, 0xa2,  // text(2B)
  0xfa, 0xed,  // $FA sceneLoad(0xed)
];

/** SCRIPT_0x5e_SCENE_73 — 场景段73 (2B) */
export const SCRIPT_0x5e_SCENE_73: readonly number[] = [
  0xba,  // text(1B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_74 — 场景段74 (6B) */
export const SCRIPT_0x5e_SCENE_74: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b,  // text(4B)
  0xfa, 0xa2,  // $FA sceneLoad(0xa2)
];

/** SCRIPT_0x5e_SCENE_75 — 场景段75 (37B) */
export const SCRIPT_0x5e_SCENE_75: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x6c, 0x6d, 0x6e, 0x6f, 0xbf, 0x3f, 0x01, 0x03, 0x01, 0x07, 0x01, 0xa0, 0x3f, 0x4f, 0x03, 0x4f, 0x07, 0x4f, 0xa1, 0x3f, 0x58, 0x03, 0x58, 0x07, 0x58, 0xa2, 0x3f, 0x03, 0x03, 0x03, 0x07, 0x03,  // text(34B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_76 — 场景段76 (6B) */
export const SCRIPT_0x5e_SCENE_76: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b,  // text(4B)
  0xfa, 0xb0,  // $FA sceneLoad(0xb0)
];

/** SCRIPT_0x5e_SCENE_77 — 场景段77 (10B) */
export const SCRIPT_0x5e_SCENE_77: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0xb0,  // $FA sceneLoad(0xb0)
];

/** SCRIPT_0x5e_SCENE_78 — 场景段78 (10B) */
export const SCRIPT_0x5e_SCENE_78: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0xb0,  // $FA sceneLoad(0xb0)
];

/** SCRIPT_0x5e_SCENE_79 — 场景段79 (37B) */
export const SCRIPT_0x5e_SCENE_79: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x6c, 0x6d, 0x6e, 0x6f, 0xbf, 0x3e, 0x01, 0x02, 0x02, 0x06, 0x03, 0xa0, 0x3e, 0x01, 0x02, 0x02, 0x06, 0x03, 0xa1, 0x3e, 0x01, 0x02, 0x02, 0x06, 0x03, 0xa2, 0x3e, 0x01, 0x02, 0x02, 0x06, 0x03,  // text(34B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_80 — 场景段80 (6B) */
export const SCRIPT_0x5e_SCENE_80: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b,  // text(4B)
  0xfa, 0xbe,  // $FA sceneLoad(0xbe)
];

/** SCRIPT_0x5e_SCENE_81 — 场景段81 (10B) */
export const SCRIPT_0x5e_SCENE_81: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0xbe,  // $FA sceneLoad(0xbe)
];

/** SCRIPT_0x5e_SCENE_82 — 场景段82 (10B) */
export const SCRIPT_0x5e_SCENE_82: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0xbe,  // $FA sceneLoad(0xbe)
];

/** SCRIPT_0x5e_SCENE_83 — 场景段83 (15B) */
export const SCRIPT_0x5e_SCENE_83: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x6c, 0x6d, 0x6e, 0x6f, 0xbf, 0x3d, 0x01, 0x41,  // text(10B)
  0xfe, 0x05, 0x01,  // $FE jump(0x5,0x1)
];

/** SCRIPT_0x5e_SCENE_84 — 场景段84 (25B) */
export const SCRIPT_0x5e_SCENE_84: readonly number[] = [
  0xa0, 0x7d,  // text(2B)
  0xd8,  // wait(1帧)
  0x80, 0xc4, 0x00, 0x51, 0x41, 0xb4, 0x45,  // text(7B)
  0xfc,  // $FC vramAdvance()
  0xa1, 0x3d,  // text(2B)
  0xd8,  // wait(1帧)
  0x01, 0xb4, 0x05,  // text(3B)
  0xfc,  // $FC vramAdvance()
  0xa2, 0x3d, 0x01, 0x01,  // text(4B)
  0xfe, 0x05, 0x01,  // $FE jump(0x5,0x1)
];

/** SCRIPT_0x5e_SCENE_85 — 场景段85 (1B) */
export const SCRIPT_0x5e_SCENE_85: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_86 — 场景段86 (6B) */
export const SCRIPT_0x5e_SCENE_86: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b,  // text(4B)
  0xfa, 0xc9,  // $FA sceneLoad(0xc9)
];

/** SCRIPT_0x5e_SCENE_87 — 场景段87 (10B) */
export const SCRIPT_0x5e_SCENE_87: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xfc,  // $FC vramAdvance()
  0xba, 0x18, 0x19, 0x1a, 0x1b,  // text(5B)
  0xfa, 0xc9,  // $FA sceneLoad(0xc9)
];

/** SCRIPT_0x5e_SCENE_88 — 场景段88 (10B) */
export const SCRIPT_0x5e_SCENE_88: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x14, 0xbb, 0x18, 0x19, 0x1a, 0x1b,  // text(6B)
  0xfa, 0xc9,  // $FA sceneLoad(0xc9)
];

/** SCRIPT_0x5e_SCENE_89 — 场景段89 (29B) */
export const SCRIPT_0x5e_SCENE_89: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x56, 0xbb, 0x70, 0x71, 0x72, 0x73, 0xb7, 0x03,  // text(8B)
  0xde,  // wait(120帧)
  0x07,  // text(1B)
  0xf4, 0xb8,  // $F4 subDispatch(0xb8)
  0x03,  // text(1B)
  0xdf,  // wait(240帧)
  0x07,  // text(1B)
  0xf5, 0xba,  // $F5 setPtr(0xba)
  0x43,  // text(1B)
  0xf8, 0x47, 0xfa,  // $F8 external(0x47,0xfa)
  0xaa, 0x01,  // text(2B)
  0xf8, 0x05, 0xfa,  // $F8 external(0x5,0xfa)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_90 — 场景段90 (6B) */
export const SCRIPT_0x5e_SCENE_90: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0xd4,  // $FA sceneLoad(0xd4)
];

/** SCRIPT_0x5e_SCENE_91 — 场景段91 (10B) */
export const SCRIPT_0x5e_SCENE_91: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x2c, 0xbc, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0xe8,  // $FA sceneLoad(0xe8)
];

/** SCRIPT_0x5e_SCENE_92 — 场景段92 (10B) */
export const SCRIPT_0x5e_SCENE_92: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x2c, 0xbc, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0x03,  // $FA sceneLoad(0x3)
];

/** SCRIPT_0x5e_SCENE_93 — 场景段93 (10B) */
export const SCRIPT_0x5e_SCENE_93: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x2c, 0xbc, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0x1a,  // $FA sceneLoad(0x1a)
];

/** SCRIPT_0x5e_SCENE_94 — 场景段94 (10B) */
export const SCRIPT_0x5e_SCENE_94: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x2c, 0xbc, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0xd4,  // $FA sceneLoad(0xd4)
];

/** SCRIPT_0x5e_SCENE_95 — 场景段95 (10B) */
export const SCRIPT_0x5e_SCENE_95: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x3d, 0xbc, 0x16, 0x17, 0x2d, 0x5f,  // text(6B)
  0xfa, 0xe8,  // $FA sceneLoad(0xe8)
];

/** SCRIPT_0x5e_SCENE_96 — 场景段96 (50B) */
export const SCRIPT_0x5e_SCENE_96: readonly number[] = [
  0xbb,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x3d, 0xbc, 0x70, 0x71, 0x72, 0x73, 0xbf, 0x3a,  // text(8B)
  0x3e,  // text(1B)
  0xe2,  // lineEdit(0xe2)
  0x02,  // text(1B)
  0xe8, 0x06,  // $E8 tableLoad(0x6)
  0xea,  // $EA fadeOutClear()
  0x0a,  // text(1B)
  0xe5,  // lineEdit(0xe5)
  0x0e,  // text(1B)
  0xe7,  // lineEdit(0xe7)
  0xa0, 0x3a,  // text(2B)
  0xe1,  // lineEdit(0xe1)
  0x3e,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0x02,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0x06,  // text(1B)
  0xeb,  // $EB animSeq()
  0x0a,  // text(1B)
  0xf0, 0x0e, 0xf2,  // $F0 textPos(0xe,0xf2)
  0xa1, 0x3a,  // text(2B)
  0xe4,  // lineEdit(0xe4)
  0x3e,  // text(1B)
  0xe6,  // lineEdit(0xe6)
  0x02,  // text(1B)
  0xec, 0x06, 0xee,  // $EC textSeq(0x6,0xee)
  0x0a,  // text(1B)
  0xf1, 0x0e, 0xf3,  // $F1 textPtr(0xe,0xf3)
  0xa2, 0x0e,  // text(2B)
  0xdd,  // wait(80帧)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_97 — 场景段97 (6B) */
export const SCRIPT_0x5e_SCENE_97: readonly number[] = [
  0x16, 0x17, 0x2d, 0x5f,  // text(4B)
  0xfa, 0x1a,  // $FA sceneLoad(0x1a)
];

/** SCRIPT_0x5e_SCENE_98 — 场景段98 (41B) */
export const SCRIPT_0x5e_SCENE_98: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x3d, 0xbc, 0x06, 0x07, 0x5e, 0x5f, 0xbf, 0x38, 0x42, 0xa0, 0x38, 0x43, 0x9f, 0xcc, 0x00, 0x44, 0xc4, 0x00, 0x45, 0x01, 0x47, 0x05, 0x51, 0x09, 0x53, 0xa1, 0x38, 0x41, 0x3d, 0x50, 0x00, 0x46, 0x01, 0x52, 0x05, 0x54, 0x09, 0x56,  // text(38B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_99 — 场景段99 (15B) */
export const SCRIPT_0x5e_SCENE_99: readonly number[] = [
  0x10, 0x11, 0x12, 0x5f, 0xbf, 0x1b, 0x7c, 0x1f, 0x7e, 0xa0, 0x1b, 0x7d, 0x1f, 0x7f,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_100 — 场景段100 (17B) */
export const SCRIPT_0x5e_SCENE_100: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xbf, 0x3a,  // text(6B)
  0xf9,  // $F9 flagBit()
  0x3e,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x81, 0xc0, 0x38,  // text(3B)
  0xef,  // $EF spriteFlip()
  0xc0, 0x18,  // text(2B)
  0xfa, 0xa0,  // $FA sceneLoad(0xa0)
];

/** SCRIPT_0x5e_SCENE_101 — 场景段101 (30B) */
export const SCRIPT_0x5e_SCENE_101: readonly number[] = [
  0x36, 0x74, 0x3a, 0x76, 0x3f, 0x7c, 0x02, 0x7e, 0x07, 0x72, 0x0b, 0x78, 0x0f, 0x7a, 0xa1, 0x36, 0x75, 0x3a, 0x77, 0x3f, 0x7d, 0x00, 0x7f, 0x07, 0x73, 0x0b, 0x79, 0x0f, 0x7b,  // text(29B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_102 — 场景段102 (38B) */
export const SCRIPT_0x5e_SCENE_102: readonly number[] = [
  0x6a, 0x6b, 0x7a, 0x7b, 0xbd, 0x02,  // text(6B)
  0xf1, 0x06, 0xf3,  // $F1 textPtr(0x6,0xf3)
  0xbe, 0x02,  // text(2B)
  0xf4, 0x06,  // $F4 subDispatch(0x6)
  0xf6, 0xbf,  // $F6 waitAnim(0xbf)
  0x3e,  // text(1B)
  0xdf,  // wait(240帧)
  0x02,  // text(1B)
  0xf5, 0x06,  // $F5 setPtr(0x6)
  0xf7,  // $F7 toggle()
  0xa0, 0x02,  // text(2B)
  0xf8, 0x06, 0xfa,  // $F8 external(0x6,0xfa)
  0xa1, 0x02,  // text(2B)
  0xf9,  // $F9 flagBit()
  0x06,  // text(1B)
  0xfb,  // $FB clearBuf()
  0xa2, 0x02,  // text(2B)
  0xfc,  // $FC vramAdvance()
  0x06,  // text(1B)
  0xfe, 0xff, 0x6a,  // $FE jump(0xff,0x6a)
];

/** SCRIPT_0x5e_SCENE_103 — 场景段103 (79B) */
export const SCRIPT_0x5e_SCENE_103: readonly number[] = [
  0x6b, 0x7a, 0x7b, 0xbf, 0x03, 0x5c, 0x03, 0x56, 0x07, 0x5e, 0x07, 0x70, 0x0b, 0x74, 0x0b, 0x5a, 0xa0, 0x03, 0x53, 0x07, 0x71, 0x0b, 0x5b, 0xa1, 0x43, 0x53, 0x47, 0x71, 0x4b, 0x5b, 0xa2, 0x43, 0x5c, 0x43, 0x56, 0x47, 0x5e, 0x47, 0x70, 0x4b, 0x74, 0x4b, 0x5a,  // text(43B)
  0xfb,  // $FB clearBuf()
  0x90, 0xbc, 0x6c, 0x6d, 0x6e, 0x6f, 0xbf, 0x3c, 0x02, 0x00, 0x03, 0x04, 0x02, 0xa0, 0x3c, 0x02, 0x40,  // text(17B)
  0xfd,  // $FD fillWait()
  0x04, 0x02, 0xa1, 0x3c, 0x02, 0x00,  // text(6B)
  0xfd,  // $FD fillWait()
  0x04, 0x02, 0xa2, 0x3c, 0x02, 0x00, 0x03, 0x04, 0x02,  // text(9B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_104 — 场景段104 (40B) */
export const SCRIPT_0x5e_SCENE_104: readonly number[] = [
  0x74, 0x75, 0x7b, 0x67, 0xbf, 0x3e,  // text(6B)
  0x02,  // text(1B)
  0xe2,  // lineEdit(0xe2)
  0x06,  // text(1B)
  0xe8, 0x0a,  // $E8 tableLoad(0xa)
  0xea,  // $EA fadeOutClear()
  0xa0, 0x3e,  // text(2B)
  0xe1,  // lineEdit(0xe1)
  0x02,  // text(1B)
  0xe3,  // lineEdit(0xe3)
  0x06,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0x0a,  // text(1B)
  0xeb,  // $EB animSeq()
  0xa1, 0x3e,  // text(2B)
  0xe4,  // lineEdit(0xe4)
  0x02,  // text(1B)
  0xe6,  // lineEdit(0xe6)
  0x06,  // text(1B)
  0xec, 0x0a, 0xee,  // $EC textSeq(0xa,0xee)
  0xa2, 0x3e,  // text(2B)
  0xe5,  // lineEdit(0xe5)
  0x02,  // text(1B)
  0xe7,  // lineEdit(0xe7)
  0x06,  // text(1B)
  0xed,  // $ED findSlot()
  0x0a,  // text(1B)
  0xef,  // $EF spriteFlip()
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_105 — 场景段105 (31B) */
export const SCRIPT_0x5e_SCENE_105: readonly number[] = [
  0x74, 0x75, 0x7b, 0x67, 0xbf, 0x81, 0xc4, 0x01, 0xae, 0x09, 0xaf, 0xa0, 0x39, 0xa4, 0x3d, 0xa6, 0x03, 0xac, 0xa1, 0x3d, 0xa7, 0x03, 0xad, 0x05, 0xa5, 0xa2, 0x05, 0xb0, 0x09, 0xb2,  // text(30B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_106 — 场景段106 (64B) */
export const SCRIPT_0x5e_SCENE_106: readonly number[] = [
  0x70, 0x71, 0x72, 0x73, 0xbc, 0x3f, 0x40, 0xbd, 0x3f, 0x41, 0x03, 0x43, 0xbe, 0x3f, 0x44, 0x03, 0x46, 0xbf, 0x3f, 0x45, 0x03, 0x47, 0xa0, 0x3f, 0x48, 0x03, 0x4a, 0x07, 0x70, 0xa1, 0x3f, 0x49, 0x03, 0x4b, 0x07, 0x71, 0xa2, 0x3f, 0x4c, 0x03, 0x4e, 0x07, 0x74, 0xa3, 0x3b, 0x72, 0x3f, 0x4d, 0x03, 0x4f, 0x07, 0x75, 0x0b, 0x76, 0xa4, 0x3b, 0x73, 0x03, 0x42, 0x07, 0x14, 0x0b, 0x77,  // text(63B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_107 — 场景段107 (18B) */
export const SCRIPT_0x5e_SCENE_107: readonly number[] = [
  0x74, 0x75, 0x76, 0x77, 0xa0, 0x30, 0x01, 0x34, 0x01, 0x38, 0x01, 0x3c, 0x01, 0x00, 0x01, 0x04, 0x01,  // text(17B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_108 — 场景段108 (79B) */
export const SCRIPT_0x5e_SCENE_108: readonly number[] = [
  0x74, 0x75, 0x7b, 0x67, 0xbe, 0x3c, 0x2d, 0x0f, 0x3e, 0xbf, 0x35, 0x30, 0x3b, 0x32, 0x3a, 0x44, 0x3c, 0x38, 0x00, 0x3a, 0x05, 0x34, 0x09, 0x36, 0x0f, 0x3f, 0x0d, 0x45, 0xa0, 0x9c, 0xca, 0x03, 0x2e, 0xc2, 0x03, 0x2f, 0x37, 0x31, 0x35, 0x46, 0x39, 0x33, 0x3b, 0x02, 0x3c, 0x39, 0x00, 0x3b, 0x05, 0x35, 0xa1, 0x35, 0x40, 0x3a, 0x42, 0x3c, 0x41, 0x00, 0x43, 0x05, 0x37, 0x82, 0xcf, 0x01, 0x3d, 0x0f, 0x3c, 0xc1, 0x01, 0x45, 0xa0, 0x9f, 0xcc, 0x03, 0x02, 0xc4, 0x03, 0x02,  // text(78B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_109 — 场景段109 (53B) */
export const SCRIPT_0x5e_SCENE_109: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xb9, 0x3d, 0x1a, 0xba, 0x3d, 0x1b, 0x01, 0x30, 0x05, 0x32, 0xbb, 0x3d, 0x1e, 0x01, 0x31, 0x05, 0x33, 0xbc, 0x3d, 0x1f, 0x05, 0x36, 0xa0, 0x3d, 0x18, 0x01, 0x34, 0xa1, 0x3d, 0x19, 0x01, 0x35, 0x05, 0x2b, 0xa2, 0x3d, 0x1c, 0x01, 0x37, 0x05, 0x2e, 0xa3, 0x3d, 0x1d, 0x01, 0x22, 0x05, 0x2f,  // text(52B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_110 — 场景段110 (48B) */
export const SCRIPT_0x5e_SCENE_110: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xb9, 0x01, 0x20, 0xba, 0x01, 0x21, 0x05, 0x23, 0xbb, 0x01, 0x24, 0x05, 0x26, 0xbc, 0x01, 0x25, 0x05, 0x36, 0xbf, 0x01, 0x28, 0xa0, 0x01, 0x29, 0xa1, 0x3d, 0x2a, 0x01, 0x2c, 0x05, 0x2b, 0xa2, 0x3d, 0x14, 0x01, 0x2d, 0x05, 0x2e, 0xa3, 0x3d, 0x15, 0x05, 0x2f,  // text(47B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_111 — 场景段111 (48B) */
export const SCRIPT_0x5e_SCENE_111: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xbe, 0x04, 0x08, 0x08, 0x0a, 0xbf, 0x00, 0x27, 0x04, 0x09, 0x08, 0x0b, 0xa0, 0x3c, 0x04, 0x00, 0x06, 0x04, 0x0c, 0x08, 0x0e, 0xa1, 0x38, 0x16, 0x3c, 0x05, 0x00, 0x07, 0x04, 0x0d, 0x08, 0x0f, 0xa2, 0x38, 0x17, 0x3c, 0x10, 0x00, 0x12, 0x04, 0x11, 0x08, 0x13,  // text(47B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_112 — 场景段112 (20B) */
export const SCRIPT_0x5e_SCENE_112: readonly number[] = [
  0x36, 0x37, 0x5e, 0x5f,  // text(4B)
  0xfb,  // $FB clearBuf()
  0x4e, 0xbc, 0x36, 0x37, 0x5e, 0x5f,  // text(6B)
  0xfb,  // $FB clearBuf()
  0x5a, 0xbc, 0x36, 0x37, 0x5e, 0x5f,  // text(6B)
  0xfa, 0x70,  // $FA sceneLoad(0x70)
];

/** SCRIPT_0x5e_SCENE_113 — 场景段113 (10B) */
export const SCRIPT_0x5e_SCENE_113: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x4e, 0xbc, 0x36, 0x37, 0x5e, 0x5f,  // text(6B)
  0xfa, 0x70,  // $FA sceneLoad(0x70)
];

/** SCRIPT_0x5e_SCENE_114 — 场景段114 (10B) */
export const SCRIPT_0x5e_SCENE_114: readonly number[] = [
  0xbc,  // text(1B)
  0xfb,  // $FB clearBuf()
  0x5a, 0xbc, 0x36, 0x37, 0x5e, 0x5f,  // text(6B)
  0xfa, 0x70,  // $FA sceneLoad(0x70)
];

/** SCRIPT_0x5e_SCENE_115 — 场景段115 (39B) */
export const SCRIPT_0x5e_SCENE_115: readonly number[] = [
  0xbc, 0xa0, 0x02, 0x7f, 0xa2, 0x36, 0x7f, 0x3e, 0x7f, 0x02, 0x7f, 0x06, 0x7f, 0xa3, 0x36, 0x7f, 0x3e, 0x7f, 0x06, 0x7f, 0xa5, 0x9e, 0xc4, 0x02, 0x7f, 0x80, 0xc4, 0x02, 0x7f, 0xa7, 0x02, 0x7f, 0xa9, 0x3a, 0x7f, 0xab, 0x02, 0x7f,  // text(38B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_116 — 场景段116 (11B) */
export const SCRIPT_0x5e_SCENE_116: readonly number[] = [
  0x68, 0x69, 0x6a, 0x6b, 0xbc, 0x2b, 0xc0, 0x2f,  // text(8B)
  0xfe, 0xbd, 0x2b,  // $FE jump(0xbd,0x2b)
];

/** SCRIPT_0x5e_SCENE_117 — 场景段117 (105B) */
export const SCRIPT_0x5e_SCENE_117: readonly number[] = [
  0xc1, 0x2f,  // text(2B)
  0xbe, 0x2b, 0xc4, 0x2f,  // text(4B)
  0xe1,  // lineEdit(0xe1)
  0xbf, 0x2b, 0xc5, 0xa0, 0x9f, 0xc4, 0x01,  // text(7B)
  0xf9,  // $F9 flagBit()
  0xa0, 0x80, 0xc4, 0x01,  // text(4B)
  0xfb,  // $FB clearBuf()
  0xa2, 0x2b, 0xc6, 0x2f,  // text(4B)
  0xe4,  // lineEdit(0xe4)
  0xa3, 0x2b, 0xc7, 0x2f,  // text(4B)
  0xe5,  // lineEdit(0xe5)
  0xfb,  // $FB clearBuf()
  0x74, 0xbc, 0x68, 0x69, 0x6a, 0x6b, 0xbc, 0x2b, 0xc8, 0x2f, 0xca, 0xbd, 0x2b, 0xc9, 0x2f, 0xcb, 0xbe, 0x27, 0xc2, 0x2b, 0xcc, 0x2f, 0xce, 0xbf, 0x27, 0xc3, 0xa0, 0x3e, 0xbc, 0x02, 0xbe, 0x03, 0x03, 0xa1, 0x3e, 0xbd, 0x02, 0xbf, 0x03, 0x03, 0xa2, 0x2b, 0xcd, 0x2f, 0xcf, 0xa3, 0x2b,  // text(47B)
  0xf8, 0x2f, 0xfa,  // $F8 external(0x2f,0xfa)
  0xfb,  // $FB clearBuf()
  0x74, 0xbc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  // text(22B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_118 — 场景段118 (11B) */
export const SCRIPT_0x5e_SCENE_118: readonly number[] = [
  0x68, 0x69, 0x6a, 0x6b, 0xbc, 0x2b, 0xc0, 0x2f,  // text(8B)
  0xfe, 0xbd, 0x2b,  // $FE jump(0xbd,0x2b)
];

/** SCRIPT_0x5e_SCENE_119 — 场景段119 (63B) */
export const SCRIPT_0x5e_SCENE_119: readonly number[] = [
  0xc1, 0x2f,  // text(2B)
  0xbe, 0x2b, 0xc4, 0x2f,  // text(4B)
  0xe1,  // lineEdit(0xe1)
  0xbf, 0x2b, 0xc5, 0xa0, 0x3e, 0xbc, 0x02, 0xbe, 0x03, 0x03, 0xa1, 0x3e, 0xbd, 0x02, 0xbf, 0x03, 0x03, 0xa2, 0x2b, 0xc6, 0x2f,  // text(21B)
  0xe4,  // lineEdit(0xe4)
  0xa3, 0x2b, 0xc7, 0x2f,  // text(4B)
  0xe5,  // lineEdit(0xe5)
  0xfb,  // $FB clearBuf()
  0x74, 0xbc, 0x68, 0x69, 0x6a, 0x6b, 0xbf, 0x3f, 0x71, 0x03, 0x73, 0x07, 0x79, 0xa0, 0x3f, 0x74, 0x03, 0x76, 0x07, 0x7c, 0xa1, 0x3f, 0x75, 0x03, 0x77, 0x07, 0x7d,  // text(27B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_120 — 场景段120 (38B) */
export const SCRIPT_0x5e_SCENE_120: readonly number[] = [
  0x18, 0x19, 0x1a, 0x1b, 0xa0, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  // text(37B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_121 — 场景段121 (40B) */
export const SCRIPT_0x5e_SCENE_121: readonly number[] = [
  0x28, 0x29, 0x2a, 0x2b, 0xa0, 0x3c, 0x01, 0x00, 0x01, 0xa1, 0x3c, 0x01, 0x00, 0x01, 0xa2, 0x3c, 0x01, 0x00, 0x01, 0xa3, 0x3c, 0x01, 0x00, 0x01, 0xa4, 0x3c, 0x01, 0x00, 0x01, 0xa5, 0x3c, 0x01, 0x00, 0x01, 0xa6, 0x3c, 0x01, 0x00, 0x01,  // text(39B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_122 — 场景段122 (41B) */
export const SCRIPT_0x5e_SCENE_122: readonly number[] = [
  0x6f, 0x69, 0x67, 0x7b, 0xa0, 0x01, 0xbb, 0xa1, 0x01, 0xbe,  // text(10B)
  0xfb,  // $FB clearBuf()
  0xa1, 0xbc, 0x6f, 0x69, 0x67, 0x7b, 0xa0, 0x01, 0x7e, 0xa1, 0x01, 0x7f,  // text(12B)
  0xfb,  // $FB clearBuf()
  0xa1, 0xbc, 0x6f, 0x69, 0x67, 0x7b, 0xa0, 0x3d, 0xc0, 0x01, 0xc2, 0xa1, 0x7d, 0xc0, 0x41, 0xc2,  // text(16B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_123 — 场景段123 (15B) */
export const SCRIPT_0x5e_SCENE_123: readonly number[] = [
  0x6f, 0x69, 0x67, 0x7b, 0xa0, 0x3d, 0xc1, 0x01, 0xc3, 0xa1, 0x7d, 0xc1, 0x41, 0xc3,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_124 — 场景段124 (15B) */
export const SCRIPT_0x5e_SCENE_124: readonly number[] = [
  0x6f, 0x69, 0x67, 0x7b, 0xa0, 0x3d, 0x28, 0x01, 0x2a, 0xa1, 0x7d, 0x28, 0x41, 0x2a,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_125 — 场景段125 (23B) */
export const SCRIPT_0x5e_SCENE_125: readonly number[] = [
  0x60, 0x61, 0x62, 0x63, 0xa0, 0x03, 0x4f, 0xa1, 0x03, 0x4f, 0xa2, 0x03, 0x4f, 0xa3, 0x03, 0x4f, 0xa4, 0x03, 0x4f, 0xa5, 0x03, 0x4f,  // text(22B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_126 — 场景段126 (15B) */
export const SCRIPT_0x5e_SCENE_126: readonly number[] = [
  0x60, 0x61, 0x76, 0x77, 0xa0, 0x03, 0x44, 0x07, 0x48, 0xa1, 0x03, 0x47, 0x07, 0x49,  // text(14B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_127 — 场景段127 (13B) */
export const SCRIPT_0x5e_SCENE_127: readonly number[] = [
  0x60, 0x61, 0x76, 0x77, 0xa0, 0x03,  // text(6B)
  0xf8, 0xa1, 0x03,  // $F8 external(0xa1,0x3)
  0xf9,  // $F9 flagBit()
  0x07,  // text(1B)
  0xfc,  // $FC vramAdvance()
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_128 — 场景段128 (8B) */
export const SCRIPT_0x5e_SCENE_128: readonly number[] = [
  0x70, 0x71, 0x72, 0x73, 0xa0, 0x03, 0x08,  // text(7B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_129 — 场景段129 (20B) */
export const SCRIPT_0x5e_SCENE_129: readonly number[] = [
  0x7c, 0x71, 0x52, 0x53, 0xa0, 0x03, 0x16, 0xa1, 0x03, 0x10, 0xa2, 0x03, 0x0d, 0xa3, 0x03, 0x30, 0xa4, 0x03, 0x31,  // text(19B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_130 — 场景段130 (82B) */
export const SCRIPT_0x5e_SCENE_130: readonly number[] = [
  0xbd, 0x9d, 0xc0, 0x11, 0x04, 0x11, 0x1a, 0x15, 0x30, 0x1b, 0x32, 0xbe, 0x9e, 0xc0, 0x35, 0x05, 0xc0, 0x15, 0x02, 0x09, 0x20, 0x83, 0xcf, 0x01, 0x22, 0xc7, 0x01, 0x23, 0x11, 0x1b, 0x15, 0x31, 0xbf, 0x39, 0x10, 0x3d, 0x03, 0x01, 0x09, 0x02, 0x0a, 0x81, 0xcd, 0x02, 0x0b, 0xc5, 0x02, 0x0e, 0x09, 0x21, 0xa0, 0x3d, 0x06, 0x01, 0x0c, 0x09, 0x24, 0x0d, 0x26, 0xa1, 0x3d, 0x07, 0x01, 0x0d, 0x81, 0xcd, 0x02, 0x0f, 0x09, 0x25, 0x0d, 0x27, 0x0f, 0x0a, 0x11, 0x08, 0xa2, 0x3d, 0x12, 0x01, 0x18,  // text(81B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_131 — 场景段131 (76B) */
export const SCRIPT_0x5e_SCENE_131: readonly number[] = [
  0xbd, 0x7d, 0x47, 0x41, 0x4d, 0xbe, 0x7d, 0x46, 0x41, 0x4c, 0x06, 0x11, 0xbf, 0x7d, 0x43, 0x41, 0x49, 0x06, 0x44, 0x82, 0xce, 0x01, 0x34, 0xc6, 0x01, 0x35, 0x83, 0xce, 0x01, 0x36, 0xc6, 0x01, 0x37, 0xc7, 0x3b, 0x0a, 0x09, 0x60, 0x0d, 0x62, 0x11, 0x1c, 0x1b, 0x1e, 0xa0, 0x79, 0x40, 0x7d, 0x42, 0x01, 0x64, 0x02, 0x41, 0x06, 0x45, 0x0d, 0x63, 0x11, 0x1d, 0x85, 0xce, 0x01, 0x48, 0x1b, 0x1f, 0xa1, 0x79, 0x15, 0x7d, 0x17, 0xa2, 0x79, 0x14, 0x7d, 0x16,  // text(75B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_132 — 场景段132 (86B) */
export const SCRIPT_0x5e_SCENE_132: readonly number[] = [
  0xbd, 0x7d, 0x12, 0x41, 0x18, 0xbe, 0x7d, 0x07, 0x41, 0x0d, 0x06, 0x11, 0x84, 0xcc, 0x01, 0x1a, 0xc4, 0x01, 0x1b, 0x85, 0xcc, 0x01, 0x30, 0xc4, 0x01, 0x31, 0x86, 0xcc, 0x03, 0x32, 0xbf, 0x7d, 0x06, 0x41, 0x0c, 0x06, 0x13, 0x82, 0xcc, 0x01, 0x20, 0xc4, 0x01, 0x21, 0x83, 0xcb, 0x01, 0x22, 0xc3, 0x01, 0x23, 0x0d, 0x26, 0xa0, 0x79, 0x10, 0x7d, 0x03, 0x41, 0x09, 0x42, 0x0a, 0x06, 0x19, 0x09, 0x25, 0x0d, 0x27, 0x0f, 0x0a, 0x11, 0x08, 0xa1, 0x9e, 0xc0, 0x75, 0x05, 0xc0, 0x55, 0x02, 0xa2, 0x9d, 0xc0, 0x51, 0x04,  // text(85B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_133 — 场景段133 (77B) */
export const SCRIPT_0x5e_SCENE_133: readonly number[] = [
  0xbd, 0x39, 0x14, 0x3d, 0x16, 0xbe, 0x39, 0x15, 0x3d, 0x17, 0x09, 0x34, 0x0d, 0x36, 0xbf, 0x39, 0x40, 0x3d, 0x42, 0x01, 0x09, 0x02, 0x0a, 0x09, 0x35, 0x0d, 0x37, 0x81, 0xca, 0x02, 0x4a, 0xc2, 0x02, 0x4b, 0xa0, 0x3d, 0x43, 0x01, 0x49, 0x81, 0xc2, 0x02, 0x4e, 0x09, 0x60, 0x0d, 0x62, 0xc9, 0x3b, 0x0a, 0x11, 0x1c, 0x1b, 0x1e, 0xa1, 0x3d, 0x46, 0x01, 0x4c, 0x09, 0x61, 0x0d, 0x63, 0x11, 0x1d, 0x85, 0xce, 0x01, 0x48, 0x1b, 0x1f, 0xa2, 0x3d, 0x47, 0x01, 0x4d,  // text(76B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_134 — 场景段134 (13B) */
export const SCRIPT_0x5e_SCENE_134: readonly number[] = [
  0xbc, 0x17, 0x5c, 0x1b, 0x5e, 0xbd, 0x17, 0x5d, 0x1b, 0x5f,  // text(10B)
  0xfe, 0xbb, 0x85,  // $FE jump(0xbb,0x85)
];

/** SCRIPT_0x5e_SCENE_135 — 场景段135 (21B) */
export const SCRIPT_0x5e_SCENE_135: readonly number[] = [
  0xc0, 0x3b,  // text(2B)
  0xf2, 0xc0,  // $F2 lineLen(0xc0)
  0x1b,  // text(1B)
  0xf4, 0xbc,  // $F4 subDispatch(0xbc)
  0x85, 0xc0, 0x3b,  // text(3B)
  0xf3, 0xc0,  // $F3 palette(0xc0)
  0x1b,  // text(1B)
  0xf5, 0x86,  // $F5 setPtr(0x86)
  0xcc, 0x03, 0x66,  // text(3B)
  0xfe, 0xbc, 0x17,  // $FE jump(0xbc,0x17)
];

/** SCRIPT_0x5e_SCENE_136 — 场景段136 (11B) */
export const SCRIPT_0x5e_SCENE_136: readonly number[] = [
  0x5c, 0x1b, 0x5e, 0xbd, 0x17, 0x5d, 0x1b, 0x5f,  // text(8B)
  0xfe, 0xbd, 0x85,  // $FE jump(0xbd,0x85)
];

/** SCRIPT_0x5e_SCENE_137 — 场景段137 (17B) */
export const SCRIPT_0x5e_SCENE_137: readonly number[] = [
  0xcc, 0x3b,  // text(2B)
  0xf2, 0xcc,  // $F2 lineLen(0xcc)
  0x1b,  // text(1B)
  0xf4, 0xc4,  // $F4 subDispatch(0xc4)
  0x3b,  // text(1B)
  0xf3, 0xc4,  // $F3 palette(0xc4)
  0x1b,  // text(1B)
  0xf5, 0x1b,  // $F5 setPtr(0x1b)
  0x66,  // text(1B)
  0xfe, 0xbd, 0x86,  // $FE jump(0xbd,0x86)
];

/** SCRIPT_0x5e_SCENE_138 — 场景段138 (92B) */
export const SCRIPT_0x5e_SCENE_138: readonly number[] = [
  0xcc, 0x03, 0x0e, 0xc4, 0x01, 0x0f, 0x87, 0xcc, 0x03, 0x25, 0xc4, 0x03, 0x30, 0xbe, 0x9c, 0xc0, 0x10, 0x2a, 0x11, 0x0c, 0x85, 0xcc, 0x01, 0x12, 0xc4, 0x01, 0x18, 0x86, 0xc4, 0x00, 0x1a, 0xbf, 0x33, 0x02, 0x37, 0x08, 0x39, 0x0a, 0x3d, 0x20, 0x01, 0x22, 0x05, 0x28, 0x06, 0x03, 0x0a, 0x04, 0x83, 0xcd, 0x01, 0x06, 0xc5, 0x00, 0x07, 0x11, 0x0d, 0xa0, 0x34, 0x09, 0x39, 0x0b, 0x3d, 0x21, 0x01, 0x23, 0x05, 0x29, 0x0a, 0x05, 0xa1, 0x3d, 0x24, 0x01, 0x26, 0x05, 0x2c, 0x0a, 0x10, 0xa2, 0x00, 0x27, 0x07, 0x2d, 0x0b, 0x2b, 0xa3, 0x08, 0x2e, 0x0c, 0x2f,  // text(91B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_139 — 场景段139 (33B) */
export const SCRIPT_0x5e_SCENE_139: readonly number[] = [
  0xbf, 0x03, 0x5c, 0x03, 0x56, 0x07, 0x5e, 0x07, 0x70, 0x0b, 0x74, 0x0b, 0x5a, 0xa0, 0x0b, 0x5b, 0xa1, 0x4b, 0x5b, 0xa2, 0x43, 0x5c, 0x43, 0x56, 0x47, 0x5e, 0x47, 0x70, 0x4b, 0x74, 0x4b, 0x5a,  // text(32B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_140 — 场景段140 (37B) */
export const SCRIPT_0x5e_SCENE_140: readonly number[] = [
  0x3a, 0x03, 0xa0, 0x36, 0x04, 0x3a, 0x06, 0x3e, 0x0c, 0x01, 0x0e, 0x05, 0x24, 0x09, 0x26, 0x0a, 0x2a, 0x0e, 0x2c, 0xa1, 0x36, 0x05, 0x3a, 0x07, 0x02, 0x0f, 0x06, 0x25, 0xa2, 0x37, 0x10, 0x02, 0x1a, 0xa3, 0x03, 0x1b,  // text(36B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_141 — 场景段141 (24B) */
export const SCRIPT_0x5e_SCENE_141: readonly number[] = [
  0xbd, 0x13, 0xb1, 0x0f, 0x9b, 0x0a, 0x99, 0xbe, 0x0b, 0x9c, 0x0f, 0x4b, 0x13, 0xb4, 0xbf, 0x0b, 0x9d, 0x09, 0x02, 0x0f, 0x9f,  // text(21B)
  0xfe, 0xbd, 0x17,  // $FE jump(0xbd,0x17)
];

/** SCRIPT_0x5e_SCENE_142 — 场景段142 (93B) */
export const SCRIPT_0x5e_SCENE_142: readonly number[] = [
  0x29, 0xbe, 0x15, 0x2b, 0x19, 0x0e, 0xbf, 0x0e, 0x04, 0x12, 0x06, 0x15, 0x0c, 0x19, 0x0f, 0xa0, 0x2f, 0x02, 0x30, 0x08, 0x34, 0x0a, 0x38, 0x20, 0x3d, 0x22, 0x01, 0x28, 0x0e, 0x05, 0x13, 0x07, 0x17, 0x0d, 0x18, 0x1a, 0xa1, 0x2f, 0x03, 0x33, 0x09, 0x37, 0x0b, 0x38, 0x41, 0x3d, 0x43, 0x01, 0x49, 0x0e, 0x10, 0x13, 0x12, 0x17, 0x18, 0xa2, 0x38, 0x44, 0x3c, 0x46, 0x3d, 0x27, 0x01, 0x4c, 0x05, 0x2f, 0x07, 0x2e, 0x09, 0x2a, 0x0f, 0x23, 0xa3, 0x38, 0x30, 0x3c, 0x32, 0x00, 0x4b, 0x04, 0x61, 0x08, 0x11, 0x0f, 0x21, 0xa4, 0x3c, 0x13, 0x00, 0x19, 0x04, 0x1b,  // text(92B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_143 — 场景段143 (14B) */
export const SCRIPT_0x5e_SCENE_143: readonly number[] = [
  0xbf, 0x07, 0x58, 0x0b, 0x5a, 0xa1, 0x0f, 0x74, 0xa0, 0x0f, 0x71,  // text(11B)
  0xfe, 0xa2, 0x07,  // $FE jump(0xa2,0x7)
];

/** SCRIPT_0x5e_SCENE_144 — 场景段144 (124B) */
export const SCRIPT_0x5e_SCENE_144: readonly number[] = [
  0x5d, 0x0b, 0x5f, 0xa1, 0x03, 0x57, 0xa0, 0x03, 0x55, 0x07, 0x59, 0x0b, 0x5b, 0xa1, 0x07, 0x5c, 0x0b, 0x5e,  // text(18B)
  0xfb,  // $FB clearBuf()
  0x06, 0xba, 0xa0, 0x0f, 0x37, 0x13, 0x3d, 0x17, 0x3f, 0xa1, 0x0f, 0x62, 0x13, 0x68, 0x17, 0x6a, 0xa2, 0x09, 0x61, 0x0d, 0x63, 0x13, 0x69, 0xa3, 0x05, 0x1d, 0x09, 0x1f, 0x0d, 0x35, 0xa4, 0x05, 0x48, 0x09, 0x4a, 0xa5, 0x2f, 0x66, 0x03, 0x43, 0x07, 0x49, 0xa6, 0x2e, 0x67, 0x33, 0x6d, 0x37, 0x6f, 0x3e, 0x44, 0x02, 0x46, 0x07, 0x4c, 0xa7, 0x33, 0x78, 0x35, 0x40, 0x39, 0x42, 0x3d, 0x45, 0x01, 0x47, 0x02, 0x50, 0x06, 0x4d, 0x0b, 0x4f, 0x0f, 0x65, 0xa8, 0x35, 0x41, 0x3d, 0x50, 0x01, 0x52, 0x06, 0x58, 0x0b, 0x5a, 0xa9, 0x3d, 0x51, 0x01, 0x53, 0x06, 0x59, 0xaa, 0x3d, 0x54, 0x03, 0x56, 0xab, 0x3f, 0x55, 0x03, 0x57,  // text(102B)
  0xfe, 0x37, 0x02,  // $FE jump(0x37,0x2)
];

/** SCRIPT_0x5e_SCENE_145 — 场景段145 (15B) */
export const SCRIPT_0x5e_SCENE_145: readonly number[] = [
  0x3b, 0x02, 0x3f, 0x02, 0x03, 0x02, 0x07, 0x02, 0x0b, 0x02, 0x0f, 0x02,  // text(12B)
  0xfe, 0xbd, 0x03,  // $FE jump(0xbd,0x3)
];

/** SCRIPT_0x5e_SCENE_146 — 场景段146 (88B) */
export const SCRIPT_0x5e_SCENE_146: readonly number[] = [
  0x22, 0x06, 0x28, 0xbe, 0x3f, 0x08, 0x03, 0x0a, 0x07, 0x20, 0xbf, 0x3f, 0x09, 0x3e, 0x02, 0x03, 0x0b, 0x07, 0x21,  // text(19B)
  0xfb,  // $FB clearBuf()
  0xcb, 0xb9, 0xbd, 0x38, 0x30, 0x3c, 0x32, 0x00, 0x38, 0x06, 0x3a, 0xbe, 0x38, 0x31, 0x3c, 0x01, 0x00, 0x3c, 0x07, 0x3b, 0xbf, 0x3a, 0x34, 0x3c, 0x01, 0x00, 0x3c, 0x07, 0x3e, 0xa0, 0x37, 0x1f, 0x3a, 0x35, 0x3e, 0x37, 0x01, 0x3d, 0x05, 0x3f, 0x09, 0x26, 0x0a, 0x2a, 0x0e, 0x2c, 0xa1, 0x37, 0x27, 0x3b, 0x2d, 0x03, 0x33, 0x02, 0x1e, 0x07, 0x39, 0x06, 0x2f, 0xa2, 0x37, 0x10, 0x03, 0x36, 0xa3, 0x03, 0x1b,  // text(67B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_147 — 场景段147 (72B) */
export const SCRIPT_0x5e_SCENE_147: readonly number[] = [
  0xbd, 0x00, 0x15, 0x04, 0x44, 0xbe, 0x3c, 0x11, 0x00, 0x29, 0x04, 0x2b, 0xbf, 0x3c, 0x14, 0x3e, 0x02, 0x00, 0x23, 0x07, 0x2e,  // text(21B)
  0xfb,  // $FB clearBuf()
  0xcb, 0xb9, 0xbd, 0x00, 0x15, 0x04, 0x17, 0x06, 0x1d, 0xbe, 0x3c, 0x11, 0x00, 0x29, 0x04, 0x46, 0xbf, 0x3c, 0x14, 0x3e, 0x02, 0x00, 0x45, 0x07, 0x3e,  // text(25B)
  0xfb,  // $FB clearBuf()
  0xcb, 0xb9, 0xbd, 0x0a, 0x90, 0x0e, 0x92, 0x12, 0x98, 0xbe, 0x09, 0x91, 0x0a, 0x02, 0x0e, 0x93, 0xbf, 0x09, 0x94, 0x0e, 0x96,  // text(21B)
  0xfe, 0xfa, 0xf0,  // $FE jump(0xfa,0xf0)
];

/** SCRIPT_0x5e_SCENE_148 — 场景段148 (6B) */
export const SCRIPT_0x5e_SCENE_148: readonly number[] = [
  0xb9, 0x13, 0xb5,  // text(3B)
  0xfe, 0xbc, 0x0f,  // $FE jump(0xbc,0xf)
];

/** SCRIPT_0x5e_SCENE_149 — 场景段149 (8B) */
export const SCRIPT_0x5e_SCENE_149: readonly number[] = [
  0x8d, 0x13, 0x8f, 0xbd, 0x13, 0x9a,  // text(6B)
  0xfa, 0xf3,  // $FA sceneLoad(0xf3)
];

/** SCRIPT_0x5e_SCENE_150 — 场景段150 (6B) */
export const SCRIPT_0x5e_SCENE_150: readonly number[] = [
  0xb9, 0x13, 0xb5,  // text(3B)
  0xfe, 0xbc, 0x0f,  // $FE jump(0xbc,0xf)
];

/** SCRIPT_0x5e_SCENE_151 — 场景段151 (8B) */
export const SCRIPT_0x5e_SCENE_151: readonly number[] = [
  0xac, 0x13, 0xae, 0xbd, 0x13, 0xaf,  // text(6B)
  0xfa, 0xf3,  // $FA sceneLoad(0xf3)
];

/** SCRIPT_0x5e_SCENE_152 — 场景段152 (6B) */
export const SCRIPT_0x5e_SCENE_152: readonly number[] = [
  0xb9, 0x13, 0xb5,  // text(3B)
  0xfe, 0xbe, 0x17,  // $FE jump(0xbe,0x17)
];

/** SCRIPT_0x5e_SCENE_153 — 场景段153 (3B) */
export const SCRIPT_0x5e_SCENE_153: readonly number[] = [
  0xa5,  // text(1B)
  0xfa, 0xf0,  // $FA sceneLoad(0xf0)
];

/** SCRIPT_0x5e_SCENE_154 — 场景段154 (8B) */
export const SCRIPT_0x5e_SCENE_154: readonly number[] = [
  0xb9, 0x13, 0xb0, 0x17, 0xb2,  // text(5B)
  0xfe, 0xbe, 0x17,  // $FE jump(0xbe,0x17)
];

/** SCRIPT_0x5e_SCENE_155 — 场景段155 (3B) */
export const SCRIPT_0x5e_SCENE_155: readonly number[] = [
  0xaa,  // text(1B)
  0xfa, 0xf0,  // $FA sceneLoad(0xf0)
];

/** SCRIPT_0x5e_SCENE_156 — 场景段156 (8B) */
export const SCRIPT_0x5e_SCENE_156: readonly number[] = [
  0xb9, 0x13, 0xb8, 0x17, 0xab,  // text(5B)
  0xfe, 0xa7, 0x38,  // $FE jump(0xa7,0x38)
];

/** SCRIPT_0x5e_SCENE_157 — 场景段157 (103B) */
export const SCRIPT_0x5e_SCENE_157: readonly number[] = [
  0x0c, 0xa8, 0x34, 0x07, 0x38, 0x0d, 0x3f, 0x0f, 0xa9, 0x34, 0x12, 0x38, 0x18, 0x3c, 0x1a,  // text(15B)
  0xfb,  // $FB clearBuf()
  0x88, 0xba, 0xa7, 0x38, 0x0c, 0xa8, 0x34, 0x11, 0x38, 0x13, 0x3f, 0x19, 0xa9, 0x34, 0x14, 0x38, 0x16, 0x3c, 0x1c, 0xaa, 0x30, 0x10, 0x34, 0x15, 0x38, 0x17,  // text(26B)
  0xfb,  // $FB clearBuf()
  0x88, 0xba, 0xa7, 0x38, 0x0e, 0xa8, 0x34, 0x20, 0x38, 0x22, 0x3f, 0x0f, 0xa9, 0x34, 0x21, 0x38, 0x23, 0x3c, 0x1a, 0xaa, 0x38, 0x26,  // text(22B)
  0xfb,  // $FB clearBuf()
  0x88, 0xba, 0xa7, 0x38, 0x38, 0xa8, 0x34, 0x3a, 0x38, 0x2c, 0x3f, 0x2e, 0xa9, 0x38, 0x2d, 0x3c, 0x2f,  // text(17B)
  0xfb,  // $FB clearBuf()
  0x88, 0xba, 0xbf, 0x13, 0x7d, 0x17, 0xbe, 0xa0, 0x17, 0xbf, 0xa1, 0x17, 0x6b, 0xa2, 0x13, 0x6c, 0x17, 0x6e,  // text(18B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_158 — 场景段158 (17B) */
export const SCRIPT_0x5e_SCENE_158: readonly number[] = [
  0xbf, 0x13, 0x7c, 0x17, 0x7e, 0xa0, 0x17, 0x7f, 0xa1, 0x17, 0x7a, 0xa2, 0x13, 0x79, 0x17, 0x7b,  // text(16B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_159 — 场景段159 (34B) */
export const SCRIPT_0x5e_SCENE_159: readonly number[] = [
  0xa5, 0x9e, 0xc4, 0x02, 0x7f, 0x80, 0xc4, 0x02, 0x7f,  // text(9B)
  0xfb,  // $FB clearBuf()
  0x63, 0xbc, 0xa5, 0x9e, 0xc4, 0x02, 0x7d, 0x80, 0xc4, 0x02, 0x7d, 0xa0, 0x02, 0x7f, 0xa4, 0x02, 0x7f, 0xa8, 0x3e, 0x7f, 0xac, 0x3e, 0x7f,  // text(23B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_160 — 场景段160 (6B) */
export const SCRIPT_0x5e_SCENE_160: readonly number[] = [
  0xad, 0x3a, 0x7f,  // text(3B)
  0xfe, 0x33, 0xe7,  // $FE jump(0x33,0xe7)
];

/** SCRIPT_0x5e_SCENE_161 — 场景段161 (26B) */
export const SCRIPT_0x5e_SCENE_161: readonly number[] = [
  0x37,  // text(1B)
  0xed,  // $ED findSlot()
  0x3b,  // text(1B)
  0xef,  // $EF spriteFlip()
  0xbd, 0x33,  // text(2B)
  0xe2,  // lineEdit(0xe2)
  0x37,  // text(1B)
  0xe8, 0x3b,  // $E8 tableLoad(0x3b)
  0xea,  // $EA fadeOutClear()
  0xbe, 0x33,  // text(2B)
  0xe3,  // lineEdit(0xe3)
  0x37,  // text(1B)
  0xe9,  // $E9 fadeIn()
  0x3b,  // text(1B)
  0xeb,  // $EB animSeq()
  0xa2, 0x33,  // text(2B)
  0xe6,  // lineEdit(0xe6)
  0x37,  // text(1B)
  0xec, 0x3b, 0xee,  // $EC textSeq(0x3b,0xee)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_162 — 场景段162 (17B) */
export const SCRIPT_0x5e_SCENE_162: readonly number[] = [
  0xbf, 0x3f, 0x50, 0xa0, 0x3b, 0x75, 0x3f, 0x51, 0xa1, 0x7b, 0x75, 0x7f, 0x51, 0xa2, 0x7f, 0x50,  // text(16B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_163 — 场景段163 (7B) */
export const SCRIPT_0x5e_SCENE_163: readonly number[] = [
  0xa0, 0x3d, 0xb9, 0xa1, 0x3d, 0xbc,  // text(6B)
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_164 — 场景段164 (1B) */
export const SCRIPT_0x5e_SCENE_164: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_165 — 场景段165 (1B) */
export const SCRIPT_0x5e_SCENE_165: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_166 — 场景段166 (1B) */
export const SCRIPT_0x5e_SCENE_166: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_167 — 场景段167 (1B) */
export const SCRIPT_0x5e_SCENE_167: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_168 — 场景段168 (1B) */
export const SCRIPT_0x5e_SCENE_168: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_169 — 场景段169 (1B) */
export const SCRIPT_0x5e_SCENE_169: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_170 — 场景段170 (1B) */
export const SCRIPT_0x5e_SCENE_170: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_171 — 场景段171 (1B) */
export const SCRIPT_0x5e_SCENE_171: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_172 — 场景段172 (1B) */
export const SCRIPT_0x5e_SCENE_172: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_173 — 场景段173 (1B) */
export const SCRIPT_0x5e_SCENE_173: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_174 — 场景段174 (1B) */
export const SCRIPT_0x5e_SCENE_174: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_175 — 场景段175 (1B) */
export const SCRIPT_0x5e_SCENE_175: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_176 — 场景段176 (1B) */
export const SCRIPT_0x5e_SCENE_176: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_177 — 场景段177 (1B) */
export const SCRIPT_0x5e_SCENE_177: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_178 — 场景段178 (1B) */
export const SCRIPT_0x5e_SCENE_178: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_179 — 场景段179 (1B) */
export const SCRIPT_0x5e_SCENE_179: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_180 — 场景段180 (1B) */
export const SCRIPT_0x5e_SCENE_180: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_181 — 场景段181 (1B) */
export const SCRIPT_0x5e_SCENE_181: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_182 — 场景段182 (1B) */
export const SCRIPT_0x5e_SCENE_182: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_183 — 场景段183 (1B) */
export const SCRIPT_0x5e_SCENE_183: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_184 — 场景段184 (1B) */
export const SCRIPT_0x5e_SCENE_184: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_185 — 场景段185 (1B) */
export const SCRIPT_0x5e_SCENE_185: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_186 — 场景段186 (1B) */
export const SCRIPT_0x5e_SCENE_186: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_187 — 场景段187 (1B) */
export const SCRIPT_0x5e_SCENE_187: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_188 — 场景段188 (1B) */
export const SCRIPT_0x5e_SCENE_188: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_189 — 场景段189 (1B) */
export const SCRIPT_0x5e_SCENE_189: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_190 — 场景段190 (1B) */
export const SCRIPT_0x5e_SCENE_190: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_191 — 场景段191 (1B) */
export const SCRIPT_0x5e_SCENE_191: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_192 — 场景段192 (1B) */
export const SCRIPT_0x5e_SCENE_192: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_193 — 场景段193 (1B) */
export const SCRIPT_0x5e_SCENE_193: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_194 — 场景段194 (1B) */
export const SCRIPT_0x5e_SCENE_194: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_195 — 场景段195 (1B) */
export const SCRIPT_0x5e_SCENE_195: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_196 — 场景段196 (1B) */
export const SCRIPT_0x5e_SCENE_196: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_197 — 场景段197 (1B) */
export const SCRIPT_0x5e_SCENE_197: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_198 — 场景段198 (1B) */
export const SCRIPT_0x5e_SCENE_198: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_199 — 场景段199 (1B) */
export const SCRIPT_0x5e_SCENE_199: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_200 — 场景段200 (1B) */
export const SCRIPT_0x5e_SCENE_200: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_201 — 场景段201 (1B) */
export const SCRIPT_0x5e_SCENE_201: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_202 — 场景段202 (1B) */
export const SCRIPT_0x5e_SCENE_202: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_203 — 场景段203 (1B) */
export const SCRIPT_0x5e_SCENE_203: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_204 — 场景段204 (1B) */
export const SCRIPT_0x5e_SCENE_204: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_205 — 场景段205 (1B) */
export const SCRIPT_0x5e_SCENE_205: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_206 — 场景段206 (1B) */
export const SCRIPT_0x5e_SCENE_206: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_207 — 场景段207 (1B) */
export const SCRIPT_0x5e_SCENE_207: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_208 — 场景段208 (1B) */
export const SCRIPT_0x5e_SCENE_208: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_209 — 场景段209 (1B) */
export const SCRIPT_0x5e_SCENE_209: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_210 — 场景段210 (1B) */
export const SCRIPT_0x5e_SCENE_210: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_211 — 场景段211 (1B) */
export const SCRIPT_0x5e_SCENE_211: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_212 — 场景段212 (1B) */
export const SCRIPT_0x5e_SCENE_212: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_213 — 场景段213 (1B) */
export const SCRIPT_0x5e_SCENE_213: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_214 — 场景段214 (1B) */
export const SCRIPT_0x5e_SCENE_214: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_215 — 场景段215 (1B) */
export const SCRIPT_0x5e_SCENE_215: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_216 — 场景段216 (1B) */
export const SCRIPT_0x5e_SCENE_216: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_217 — 场景段217 (1B) */
export const SCRIPT_0x5e_SCENE_217: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_218 — 场景段218 (1B) */
export const SCRIPT_0x5e_SCENE_218: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_219 — 场景段219 (1B) */
export const SCRIPT_0x5e_SCENE_219: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_220 — 场景段220 (1B) */
export const SCRIPT_0x5e_SCENE_220: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_221 — 场景段221 (1B) */
export const SCRIPT_0x5e_SCENE_221: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_222 — 场景段222 (1B) */
export const SCRIPT_0x5e_SCENE_222: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_223 — 场景段223 (1B) */
export const SCRIPT_0x5e_SCENE_223: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_224 — 场景段224 (1B) */
export const SCRIPT_0x5e_SCENE_224: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_225 — 场景段225 (1B) */
export const SCRIPT_0x5e_SCENE_225: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_226 — 场景段226 (1B) */
export const SCRIPT_0x5e_SCENE_226: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_227 — 场景段227 (1B) */
export const SCRIPT_0x5e_SCENE_227: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_228 — 场景段228 (1B) */
export const SCRIPT_0x5e_SCENE_228: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_229 — 场景段229 (1B) */
export const SCRIPT_0x5e_SCENE_229: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_230 — 场景段230 (1B) */
export const SCRIPT_0x5e_SCENE_230: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_231 — 场景段231 (1B) */
export const SCRIPT_0x5e_SCENE_231: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_232 — 场景段232 (1B) */
export const SCRIPT_0x5e_SCENE_232: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_233 — 场景段233 (1B) */
export const SCRIPT_0x5e_SCENE_233: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_234 — 场景段234 (1B) */
export const SCRIPT_0x5e_SCENE_234: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_235 — 场景段235 (1B) */
export const SCRIPT_0x5e_SCENE_235: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_236 — 场景段236 (1B) */
export const SCRIPT_0x5e_SCENE_236: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_237 — 场景段237 (1B) */
export const SCRIPT_0x5e_SCENE_237: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_238 — 场景段238 (1B) */
export const SCRIPT_0x5e_SCENE_238: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_239 — 场景段239 (1B) */
export const SCRIPT_0x5e_SCENE_239: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_240 — 场景段240 (1B) */
export const SCRIPT_0x5e_SCENE_240: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_241 — 场景段241 (1B) */
export const SCRIPT_0x5e_SCENE_241: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_242 — 场景段242 (1B) */
export const SCRIPT_0x5e_SCENE_242: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_243 — 场景段243 (1B) */
export const SCRIPT_0x5e_SCENE_243: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_244 — 场景段244 (1B) */
export const SCRIPT_0x5e_SCENE_244: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_245 — 场景段245 (1B) */
export const SCRIPT_0x5e_SCENE_245: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_246 — 场景段246 (1B) */
export const SCRIPT_0x5e_SCENE_246: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_247 — 场景段247 (1B) */
export const SCRIPT_0x5e_SCENE_247: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_248 — 场景段248 (1B) */
export const SCRIPT_0x5e_SCENE_248: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_249 — 场景段249 (1B) */
export const SCRIPT_0x5e_SCENE_249: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_250 — 场景段250 (1B) */
export const SCRIPT_0x5e_SCENE_250: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_251 — 场景段251 (1B) */
export const SCRIPT_0x5e_SCENE_251: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_252 — 场景段252 (1B) */
export const SCRIPT_0x5e_SCENE_252: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_253 — 场景段253 (1B) */
export const SCRIPT_0x5e_SCENE_253: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_254 — 场景段254 (1B) */
export const SCRIPT_0x5e_SCENE_254: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_255 — 场景段255 (1B) */
export const SCRIPT_0x5e_SCENE_255: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_256 — 场景段256 (1B) */
export const SCRIPT_0x5e_SCENE_256: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_257 — 场景段257 (1B) */
export const SCRIPT_0x5e_SCENE_257: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_258 — 场景段258 (1B) */
export const SCRIPT_0x5e_SCENE_258: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_259 — 场景段259 (1B) */
export const SCRIPT_0x5e_SCENE_259: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_260 — 场景段260 (1B) */
export const SCRIPT_0x5e_SCENE_260: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_261 — 场景段261 (1B) */
export const SCRIPT_0x5e_SCENE_261: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_262 — 场景段262 (1B) */
export const SCRIPT_0x5e_SCENE_262: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_263 — 场景段263 (1B) */
export const SCRIPT_0x5e_SCENE_263: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_264 — 场景段264 (1B) */
export const SCRIPT_0x5e_SCENE_264: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_265 — 场景段265 (1B) */
export const SCRIPT_0x5e_SCENE_265: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_266 — 场景段266 (1B) */
export const SCRIPT_0x5e_SCENE_266: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_267 — 场景段267 (1B) */
export const SCRIPT_0x5e_SCENE_267: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_268 — 场景段268 (1B) */
export const SCRIPT_0x5e_SCENE_268: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_269 — 场景段269 (1B) */
export const SCRIPT_0x5e_SCENE_269: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_270 — 场景段270 (1B) */
export const SCRIPT_0x5e_SCENE_270: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_271 — 场景段271 (1B) */
export const SCRIPT_0x5e_SCENE_271: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_272 — 场景段272 (1B) */
export const SCRIPT_0x5e_SCENE_272: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_273 — 场景段273 (1B) */
export const SCRIPT_0x5e_SCENE_273: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_274 — 场景段274 (1B) */
export const SCRIPT_0x5e_SCENE_274: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_275 — 场景段275 (1B) */
export const SCRIPT_0x5e_SCENE_275: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_276 — 场景段276 (1B) */
export const SCRIPT_0x5e_SCENE_276: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_277 — 场景段277 (1B) */
export const SCRIPT_0x5e_SCENE_277: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_278 — 场景段278 (1B) */
export const SCRIPT_0x5e_SCENE_278: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_279 — 场景段279 (1B) */
export const SCRIPT_0x5e_SCENE_279: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_280 — 场景段280 (1B) */
export const SCRIPT_0x5e_SCENE_280: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_281 — 场景段281 (1B) */
export const SCRIPT_0x5e_SCENE_281: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_282 — 场景段282 (1B) */
export const SCRIPT_0x5e_SCENE_282: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_283 — 场景段283 (1B) */
export const SCRIPT_0x5e_SCENE_283: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_284 — 场景段284 (1B) */
export const SCRIPT_0x5e_SCENE_284: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_285 — 场景段285 (1B) */
export const SCRIPT_0x5e_SCENE_285: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_286 — 场景段286 (1B) */
export const SCRIPT_0x5e_SCENE_286: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_287 — 场景段287 (1B) */
export const SCRIPT_0x5e_SCENE_287: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_288 — 场景段288 (1B) */
export const SCRIPT_0x5e_SCENE_288: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_289 — 场景段289 (1B) */
export const SCRIPT_0x5e_SCENE_289: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_290 — 场景段290 (1B) */
export const SCRIPT_0x5e_SCENE_290: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_291 — 场景段291 (1B) */
export const SCRIPT_0x5e_SCENE_291: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_292 — 场景段292 (1B) */
export const SCRIPT_0x5e_SCENE_292: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_293 — 场景段293 (1B) */
export const SCRIPT_0x5e_SCENE_293: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_294 — 场景段294 (1B) */
export const SCRIPT_0x5e_SCENE_294: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_295 — 场景段295 (1B) */
export const SCRIPT_0x5e_SCENE_295: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_296 — 场景段296 (1B) */
export const SCRIPT_0x5e_SCENE_296: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_297 — 场景段297 (1B) */
export const SCRIPT_0x5e_SCENE_297: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_298 — 场景段298 (1B) */
export const SCRIPT_0x5e_SCENE_298: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_299 — 场景段299 (1B) */
export const SCRIPT_0x5e_SCENE_299: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_300 — 场景段300 (1B) */
export const SCRIPT_0x5e_SCENE_300: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_301 — 场景段301 (1B) */
export const SCRIPT_0x5e_SCENE_301: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_302 — 场景段302 (1B) */
export const SCRIPT_0x5e_SCENE_302: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_303 — 场景段303 (1B) */
export const SCRIPT_0x5e_SCENE_303: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_304 — 场景段304 (1B) */
export const SCRIPT_0x5e_SCENE_304: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_305 — 场景段305 (1B) */
export const SCRIPT_0x5e_SCENE_305: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_306 — 场景段306 (1B) */
export const SCRIPT_0x5e_SCENE_306: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_307 — 场景段307 (1B) */
export const SCRIPT_0x5e_SCENE_307: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_308 — 场景段308 (1B) */
export const SCRIPT_0x5e_SCENE_308: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_309 — 场景段309 (1B) */
export const SCRIPT_0x5e_SCENE_309: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_310 — 场景段310 (1B) */
export const SCRIPT_0x5e_SCENE_310: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_311 — 场景段311 (1B) */
export const SCRIPT_0x5e_SCENE_311: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_312 — 场景段312 (1B) */
export const SCRIPT_0x5e_SCENE_312: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_313 — 场景段313 (1B) */
export const SCRIPT_0x5e_SCENE_313: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_314 — 场景段314 (1B) */
export const SCRIPT_0x5e_SCENE_314: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_315 — 场景段315 (1B) */
export const SCRIPT_0x5e_SCENE_315: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_316 — 场景段316 (1B) */
export const SCRIPT_0x5e_SCENE_316: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_317 — 场景段317 (1B) */
export const SCRIPT_0x5e_SCENE_317: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_318 — 场景段318 (1B) */
export const SCRIPT_0x5e_SCENE_318: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_319 — 场景段319 (1B) */
export const SCRIPT_0x5e_SCENE_319: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_320 — 场景段320 (1B) */
export const SCRIPT_0x5e_SCENE_320: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_321 — 场景段321 (1B) */
export const SCRIPT_0x5e_SCENE_321: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_322 — 场景段322 (1B) */
export const SCRIPT_0x5e_SCENE_322: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_323 — 场景段323 (1B) */
export const SCRIPT_0x5e_SCENE_323: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_324 — 场景段324 (1B) */
export const SCRIPT_0x5e_SCENE_324: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_325 — 场景段325 (1B) */
export const SCRIPT_0x5e_SCENE_325: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_326 — 场景段326 (1B) */
export const SCRIPT_0x5e_SCENE_326: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_327 — 场景段327 (1B) */
export const SCRIPT_0x5e_SCENE_327: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_328 — 场景段328 (1B) */
export const SCRIPT_0x5e_SCENE_328: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_329 — 场景段329 (1B) */
export const SCRIPT_0x5e_SCENE_329: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_330 — 场景段330 (1B) */
export const SCRIPT_0x5e_SCENE_330: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_331 — 场景段331 (1B) */
export const SCRIPT_0x5e_SCENE_331: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_332 — 场景段332 (1B) */
export const SCRIPT_0x5e_SCENE_332: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_333 — 场景段333 (1B) */
export const SCRIPT_0x5e_SCENE_333: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_334 — 场景段334 (1B) */
export const SCRIPT_0x5e_SCENE_334: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_335 — 场景段335 (1B) */
export const SCRIPT_0x5e_SCENE_335: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_336 — 场景段336 (1B) */
export const SCRIPT_0x5e_SCENE_336: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_337 — 场景段337 (1B) */
export const SCRIPT_0x5e_SCENE_337: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_338 — 场景段338 (1B) */
export const SCRIPT_0x5e_SCENE_338: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_339 — 场景段339 (1B) */
export const SCRIPT_0x5e_SCENE_339: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_340 — 场景段340 (1B) */
export const SCRIPT_0x5e_SCENE_340: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_341 — 场景段341 (1B) */
export const SCRIPT_0x5e_SCENE_341: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_342 — 场景段342 (1B) */
export const SCRIPT_0x5e_SCENE_342: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_343 — 场景段343 (1B) */
export const SCRIPT_0x5e_SCENE_343: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_344 — 场景段344 (1B) */
export const SCRIPT_0x5e_SCENE_344: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_345 — 场景段345 (1B) */
export const SCRIPT_0x5e_SCENE_345: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_346 — 场景段346 (1B) */
export const SCRIPT_0x5e_SCENE_346: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_347 — 场景段347 (1B) */
export const SCRIPT_0x5e_SCENE_347: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_348 — 场景段348 (1B) */
export const SCRIPT_0x5e_SCENE_348: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_349 — 场景段349 (1B) */
export const SCRIPT_0x5e_SCENE_349: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_350 — 场景段350 (1B) */
export const SCRIPT_0x5e_SCENE_350: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_351 — 场景段351 (1B) */
export const SCRIPT_0x5e_SCENE_351: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_352 — 场景段352 (1B) */
export const SCRIPT_0x5e_SCENE_352: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_353 — 场景段353 (1B) */
export const SCRIPT_0x5e_SCENE_353: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_354 — 场景段354 (1B) */
export const SCRIPT_0x5e_SCENE_354: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_355 — 场景段355 (1B) */
export const SCRIPT_0x5e_SCENE_355: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_356 — 场景段356 (1B) */
export const SCRIPT_0x5e_SCENE_356: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_357 — 场景段357 (1B) */
export const SCRIPT_0x5e_SCENE_357: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_358 — 场景段358 (1B) */
export const SCRIPT_0x5e_SCENE_358: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_359 — 场景段359 (1B) */
export const SCRIPT_0x5e_SCENE_359: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_360 — 场景段360 (1B) */
export const SCRIPT_0x5e_SCENE_360: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_361 — 场景段361 (1B) */
export const SCRIPT_0x5e_SCENE_361: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_362 — 场景段362 (1B) */
export const SCRIPT_0x5e_SCENE_362: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_363 — 场景段363 (1B) */
export const SCRIPT_0x5e_SCENE_363: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_364 — 场景段364 (1B) */
export const SCRIPT_0x5e_SCENE_364: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_365 — 场景段365 (1B) */
export const SCRIPT_0x5e_SCENE_365: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_366 — 场景段366 (1B) */
export const SCRIPT_0x5e_SCENE_366: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_367 — 场景段367 (1B) */
export const SCRIPT_0x5e_SCENE_367: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_368 — 场景段368 (1B) */
export const SCRIPT_0x5e_SCENE_368: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_369 — 场景段369 (1B) */
export const SCRIPT_0x5e_SCENE_369: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_370 — 场景段370 (1B) */
export const SCRIPT_0x5e_SCENE_370: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_371 — 场景段371 (1B) */
export const SCRIPT_0x5e_SCENE_371: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_372 — 场景段372 (1B) */
export const SCRIPT_0x5e_SCENE_372: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_373 — 场景段373 (1B) */
export const SCRIPT_0x5e_SCENE_373: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_374 — 场景段374 (1B) */
export const SCRIPT_0x5e_SCENE_374: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_375 — 场景段375 (1B) */
export const SCRIPT_0x5e_SCENE_375: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_376 — 场景段376 (1B) */
export const SCRIPT_0x5e_SCENE_376: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_377 — 场景段377 (1B) */
export const SCRIPT_0x5e_SCENE_377: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_378 — 场景段378 (1B) */
export const SCRIPT_0x5e_SCENE_378: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_379 — 场景段379 (1B) */
export const SCRIPT_0x5e_SCENE_379: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_380 — 场景段380 (1B) */
export const SCRIPT_0x5e_SCENE_380: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_381 — 场景段381 (1B) */
export const SCRIPT_0x5e_SCENE_381: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_382 — 场景段382 (1B) */
export const SCRIPT_0x5e_SCENE_382: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_383 — 场景段383 (1B) */
export const SCRIPT_0x5e_SCENE_383: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_384 — 场景段384 (1B) */
export const SCRIPT_0x5e_SCENE_384: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_385 — 场景段385 (1B) */
export const SCRIPT_0x5e_SCENE_385: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_386 — 场景段386 (1B) */
export const SCRIPT_0x5e_SCENE_386: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_387 — 场景段387 (1B) */
export const SCRIPT_0x5e_SCENE_387: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_388 — 场景段388 (1B) */
export const SCRIPT_0x5e_SCENE_388: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_389 — 场景段389 (1B) */
export const SCRIPT_0x5e_SCENE_389: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_390 — 场景段390 (1B) */
export const SCRIPT_0x5e_SCENE_390: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_391 — 场景段391 (1B) */
export const SCRIPT_0x5e_SCENE_391: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_392 — 场景段392 (1B) */
export const SCRIPT_0x5e_SCENE_392: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_393 — 场景段393 (1B) */
export const SCRIPT_0x5e_SCENE_393: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_394 — 场景段394 (1B) */
export const SCRIPT_0x5e_SCENE_394: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_395 — 场景段395 (1B) */
export const SCRIPT_0x5e_SCENE_395: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_396 — 场景段396 (1B) */
export const SCRIPT_0x5e_SCENE_396: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_397 — 场景段397 (1B) */
export const SCRIPT_0x5e_SCENE_397: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_398 — 场景段398 (1B) */
export const SCRIPT_0x5e_SCENE_398: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_399 — 场景段399 (1B) */
export const SCRIPT_0x5e_SCENE_399: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_400 — 场景段400 (1B) */
export const SCRIPT_0x5e_SCENE_400: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_401 — 场景段401 (1B) */
export const SCRIPT_0x5e_SCENE_401: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_402 — 场景段402 (1B) */
export const SCRIPT_0x5e_SCENE_402: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_403 — 场景段403 (1B) */
export const SCRIPT_0x5e_SCENE_403: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_404 — 场景段404 (1B) */
export const SCRIPT_0x5e_SCENE_404: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_405 — 场景段405 (1B) */
export const SCRIPT_0x5e_SCENE_405: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_406 — 场景段406 (1B) */
export const SCRIPT_0x5e_SCENE_406: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_407 — 场景段407 (1B) */
export const SCRIPT_0x5e_SCENE_407: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_408 — 场景段408 (1B) */
export const SCRIPT_0x5e_SCENE_408: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_409 — 场景段409 (1B) */
export const SCRIPT_0x5e_SCENE_409: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_410 — 场景段410 (1B) */
export const SCRIPT_0x5e_SCENE_410: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_411 — 场景段411 (1B) */
export const SCRIPT_0x5e_SCENE_411: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_412 — 场景段412 (1B) */
export const SCRIPT_0x5e_SCENE_412: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_413 — 场景段413 (1B) */
export const SCRIPT_0x5e_SCENE_413: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_414 — 场景段414 (1B) */
export const SCRIPT_0x5e_SCENE_414: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_415 — 场景段415 (1B) */
export const SCRIPT_0x5e_SCENE_415: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_416 — 场景段416 (1B) */
export const SCRIPT_0x5e_SCENE_416: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_417 — 场景段417 (1B) */
export const SCRIPT_0x5e_SCENE_417: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_418 — 场景段418 (1B) */
export const SCRIPT_0x5e_SCENE_418: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_419 — 场景段419 (1B) */
export const SCRIPT_0x5e_SCENE_419: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_420 — 场景段420 (1B) */
export const SCRIPT_0x5e_SCENE_420: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_421 — 场景段421 (1B) */
export const SCRIPT_0x5e_SCENE_421: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_422 — 场景段422 (1B) */
export const SCRIPT_0x5e_SCENE_422: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_423 — 场景段423 (1B) */
export const SCRIPT_0x5e_SCENE_423: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_424 — 场景段424 (1B) */
export const SCRIPT_0x5e_SCENE_424: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_425 — 场景段425 (1B) */
export const SCRIPT_0x5e_SCENE_425: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_426 — 场景段426 (1B) */
export const SCRIPT_0x5e_SCENE_426: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_427 — 场景段427 (1B) */
export const SCRIPT_0x5e_SCENE_427: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_428 — 场景段428 (1B) */
export const SCRIPT_0x5e_SCENE_428: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_429 — 场景段429 (1B) */
export const SCRIPT_0x5e_SCENE_429: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_430 — 场景段430 (1B) */
export const SCRIPT_0x5e_SCENE_430: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_431 — 场景段431 (1B) */
export const SCRIPT_0x5e_SCENE_431: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_432 — 场景段432 (1B) */
export const SCRIPT_0x5e_SCENE_432: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_433 — 场景段433 (1B) */
export const SCRIPT_0x5e_SCENE_433: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_434 — 场景段434 (1B) */
export const SCRIPT_0x5e_SCENE_434: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_435 — 场景段435 (1B) */
export const SCRIPT_0x5e_SCENE_435: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_436 — 场景段436 (1B) */
export const SCRIPT_0x5e_SCENE_436: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_437 — 场景段437 (1B) */
export const SCRIPT_0x5e_SCENE_437: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_438 — 场景段438 (1B) */
export const SCRIPT_0x5e_SCENE_438: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_439 — 场景段439 (1B) */
export const SCRIPT_0x5e_SCENE_439: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_440 — 场景段440 (1B) */
export const SCRIPT_0x5e_SCENE_440: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_441 — 场景段441 (1B) */
export const SCRIPT_0x5e_SCENE_441: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_442 — 场景段442 (1B) */
export const SCRIPT_0x5e_SCENE_442: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_443 — 场景段443 (1B) */
export const SCRIPT_0x5e_SCENE_443: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_444 — 场景段444 (1B) */
export const SCRIPT_0x5e_SCENE_444: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_445 — 场景段445 (1B) */
export const SCRIPT_0x5e_SCENE_445: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_446 — 场景段446 (1B) */
export const SCRIPT_0x5e_SCENE_446: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_447 — 场景段447 (1B) */
export const SCRIPT_0x5e_SCENE_447: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_448 — 场景段448 (1B) */
export const SCRIPT_0x5e_SCENE_448: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_449 — 场景段449 (1B) */
export const SCRIPT_0x5e_SCENE_449: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_450 — 场景段450 (1B) */
export const SCRIPT_0x5e_SCENE_450: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_451 — 场景段451 (1B) */
export const SCRIPT_0x5e_SCENE_451: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_452 — 场景段452 (1B) */
export const SCRIPT_0x5e_SCENE_452: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_453 — 场景段453 (1B) */
export const SCRIPT_0x5e_SCENE_453: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_454 — 场景段454 (1B) */
export const SCRIPT_0x5e_SCENE_454: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_455 — 场景段455 (1B) */
export const SCRIPT_0x5e_SCENE_455: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_456 — 场景段456 (1B) */
export const SCRIPT_0x5e_SCENE_456: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_457 — 场景段457 (1B) */
export const SCRIPT_0x5e_SCENE_457: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_458 — 场景段458 (1B) */
export const SCRIPT_0x5e_SCENE_458: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_459 — 场景段459 (1B) */
export const SCRIPT_0x5e_SCENE_459: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_460 — 场景段460 (1B) */
export const SCRIPT_0x5e_SCENE_460: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_461 — 场景段461 (1B) */
export const SCRIPT_0x5e_SCENE_461: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_462 — 场景段462 (1B) */
export const SCRIPT_0x5e_SCENE_462: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_463 — 场景段463 (1B) */
export const SCRIPT_0x5e_SCENE_463: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_464 — 场景段464 (1B) */
export const SCRIPT_0x5e_SCENE_464: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_465 — 场景段465 (1B) */
export const SCRIPT_0x5e_SCENE_465: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_466 — 场景段466 (1B) */
export const SCRIPT_0x5e_SCENE_466: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_467 — 场景段467 (1B) */
export const SCRIPT_0x5e_SCENE_467: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_468 — 场景段468 (1B) */
export const SCRIPT_0x5e_SCENE_468: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_469 — 场景段469 (1B) */
export const SCRIPT_0x5e_SCENE_469: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_470 — 场景段470 (1B) */
export const SCRIPT_0x5e_SCENE_470: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_471 — 场景段471 (1B) */
export const SCRIPT_0x5e_SCENE_471: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_472 — 场景段472 (1B) */
export const SCRIPT_0x5e_SCENE_472: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_473 — 场景段473 (1B) */
export const SCRIPT_0x5e_SCENE_473: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_474 — 场景段474 (1B) */
export const SCRIPT_0x5e_SCENE_474: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_475 — 场景段475 (1B) */
export const SCRIPT_0x5e_SCENE_475: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_476 — 场景段476 (1B) */
export const SCRIPT_0x5e_SCENE_476: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_477 — 场景段477 (1B) */
export const SCRIPT_0x5e_SCENE_477: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_478 — 场景段478 (1B) */
export const SCRIPT_0x5e_SCENE_478: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_479 — 场景段479 (1B) */
export const SCRIPT_0x5e_SCENE_479: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_480 — 场景段480 (1B) */
export const SCRIPT_0x5e_SCENE_480: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_481 — 场景段481 (1B) */
export const SCRIPT_0x5e_SCENE_481: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_482 — 场景段482 (1B) */
export const SCRIPT_0x5e_SCENE_482: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_483 — 场景段483 (1B) */
export const SCRIPT_0x5e_SCENE_483: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_484 — 场景段484 (1B) */
export const SCRIPT_0x5e_SCENE_484: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_485 — 场景段485 (1B) */
export const SCRIPT_0x5e_SCENE_485: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_486 — 场景段486 (1B) */
export const SCRIPT_0x5e_SCENE_486: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_487 — 场景段487 (1B) */
export const SCRIPT_0x5e_SCENE_487: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_488 — 场景段488 (1B) */
export const SCRIPT_0x5e_SCENE_488: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_489 — 场景段489 (1B) */
export const SCRIPT_0x5e_SCENE_489: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_490 — 场景段490 (1B) */
export const SCRIPT_0x5e_SCENE_490: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_491 — 场景段491 (1B) */
export const SCRIPT_0x5e_SCENE_491: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_492 — 场景段492 (1B) */
export const SCRIPT_0x5e_SCENE_492: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_493 — 场景段493 (1B) */
export const SCRIPT_0x5e_SCENE_493: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_494 — 场景段494 (1B) */
export const SCRIPT_0x5e_SCENE_494: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_495 — 场景段495 (1B) */
export const SCRIPT_0x5e_SCENE_495: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_496 — 场景段496 (1B) */
export const SCRIPT_0x5e_SCENE_496: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_497 — 场景段497 (1B) */
export const SCRIPT_0x5e_SCENE_497: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_498 — 场景段498 (1B) */
export const SCRIPT_0x5e_SCENE_498: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_499 — 场景段499 (1B) */
export const SCRIPT_0x5e_SCENE_499: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_500 — 场景段500 (1B) */
export const SCRIPT_0x5e_SCENE_500: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_501 — 场景段501 (1B) */
export const SCRIPT_0x5e_SCENE_501: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_502 — 场景段502 (1B) */
export const SCRIPT_0x5e_SCENE_502: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_503 — 场景段503 (1B) */
export const SCRIPT_0x5e_SCENE_503: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_504 — 场景段504 (1B) */
export const SCRIPT_0x5e_SCENE_504: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_505 — 场景段505 (1B) */
export const SCRIPT_0x5e_SCENE_505: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_506 — 场景段506 (1B) */
export const SCRIPT_0x5e_SCENE_506: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_507 — 场景段507 (1B) */
export const SCRIPT_0x5e_SCENE_507: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_508 — 场景段508 (1B) */
export const SCRIPT_0x5e_SCENE_508: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_509 — 场景段509 (1B) */
export const SCRIPT_0x5e_SCENE_509: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_510 — 场景段510 (1B) */
export const SCRIPT_0x5e_SCENE_510: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_511 — 场景段511 (1B) */
export const SCRIPT_0x5e_SCENE_511: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_512 — 场景段512 (1B) */
export const SCRIPT_0x5e_SCENE_512: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_513 — 场景段513 (1B) */
export const SCRIPT_0x5e_SCENE_513: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_514 — 场景段514 (1B) */
export const SCRIPT_0x5e_SCENE_514: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_515 — 场景段515 (1B) */
export const SCRIPT_0x5e_SCENE_515: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_516 — 场景段516 (1B) */
export const SCRIPT_0x5e_SCENE_516: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_517 — 场景段517 (1B) */
export const SCRIPT_0x5e_SCENE_517: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_518 — 场景段518 (1B) */
export const SCRIPT_0x5e_SCENE_518: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_519 — 场景段519 (1B) */
export const SCRIPT_0x5e_SCENE_519: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_520 — 场景段520 (1B) */
export const SCRIPT_0x5e_SCENE_520: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_521 — 场景段521 (1B) */
export const SCRIPT_0x5e_SCENE_521: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_522 — 场景段522 (1B) */
export const SCRIPT_0x5e_SCENE_522: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_523 — 场景段523 (1B) */
export const SCRIPT_0x5e_SCENE_523: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_524 — 场景段524 (1B) */
export const SCRIPT_0x5e_SCENE_524: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_525 — 场景段525 (1B) */
export const SCRIPT_0x5e_SCENE_525: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_526 — 场景段526 (1B) */
export const SCRIPT_0x5e_SCENE_526: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_527 — 场景段527 (1B) */
export const SCRIPT_0x5e_SCENE_527: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_528 — 场景段528 (1B) */
export const SCRIPT_0x5e_SCENE_528: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_529 — 场景段529 (1B) */
export const SCRIPT_0x5e_SCENE_529: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_530 — 场景段530 (1B) */
export const SCRIPT_0x5e_SCENE_530: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_531 — 场景段531 (1B) */
export const SCRIPT_0x5e_SCENE_531: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_532 — 场景段532 (1B) */
export const SCRIPT_0x5e_SCENE_532: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_533 — 场景段533 (1B) */
export const SCRIPT_0x5e_SCENE_533: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_534 — 场景段534 (1B) */
export const SCRIPT_0x5e_SCENE_534: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_535 — 场景段535 (1B) */
export const SCRIPT_0x5e_SCENE_535: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_536 — 场景段536 (1B) */
export const SCRIPT_0x5e_SCENE_536: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_537 — 场景段537 (1B) */
export const SCRIPT_0x5e_SCENE_537: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_538 — 场景段538 (1B) */
export const SCRIPT_0x5e_SCENE_538: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_539 — 场景段539 (1B) */
export const SCRIPT_0x5e_SCENE_539: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_540 — 场景段540 (1B) */
export const SCRIPT_0x5e_SCENE_540: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_541 — 场景段541 (1B) */
export const SCRIPT_0x5e_SCENE_541: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_542 — 场景段542 (1B) */
export const SCRIPT_0x5e_SCENE_542: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_543 — 场景段543 (1B) */
export const SCRIPT_0x5e_SCENE_543: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_544 — 场景段544 (1B) */
export const SCRIPT_0x5e_SCENE_544: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_545 — 场景段545 (1B) */
export const SCRIPT_0x5e_SCENE_545: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_546 — 场景段546 (1B) */
export const SCRIPT_0x5e_SCENE_546: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_547 — 场景段547 (1B) */
export const SCRIPT_0x5e_SCENE_547: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_548 — 场景段548 (1B) */
export const SCRIPT_0x5e_SCENE_548: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_549 — 场景段549 (1B) */
export const SCRIPT_0x5e_SCENE_549: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_550 — 场景段550 (1B) */
export const SCRIPT_0x5e_SCENE_550: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_551 — 场景段551 (1B) */
export const SCRIPT_0x5e_SCENE_551: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_552 — 场景段552 (1B) */
export const SCRIPT_0x5e_SCENE_552: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_553 — 场景段553 (1B) */
export const SCRIPT_0x5e_SCENE_553: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_554 — 场景段554 (1B) */
export const SCRIPT_0x5e_SCENE_554: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_555 — 场景段555 (1B) */
export const SCRIPT_0x5e_SCENE_555: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_556 — 场景段556 (1B) */
export const SCRIPT_0x5e_SCENE_556: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_557 — 场景段557 (1B) */
export const SCRIPT_0x5e_SCENE_557: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_558 — 场景段558 (1B) */
export const SCRIPT_0x5e_SCENE_558: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_559 — 场景段559 (1B) */
export const SCRIPT_0x5e_SCENE_559: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_560 — 场景段560 (1B) */
export const SCRIPT_0x5e_SCENE_560: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_561 — 场景段561 (1B) */
export const SCRIPT_0x5e_SCENE_561: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_562 — 场景段562 (1B) */
export const SCRIPT_0x5e_SCENE_562: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_563 — 场景段563 (1B) */
export const SCRIPT_0x5e_SCENE_563: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_564 — 场景段564 (1B) */
export const SCRIPT_0x5e_SCENE_564: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_565 — 场景段565 (1B) */
export const SCRIPT_0x5e_SCENE_565: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_566 — 场景段566 (1B) */
export const SCRIPT_0x5e_SCENE_566: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_567 — 场景段567 (1B) */
export const SCRIPT_0x5e_SCENE_567: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_568 — 场景段568 (1B) */
export const SCRIPT_0x5e_SCENE_568: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_569 — 场景段569 (1B) */
export const SCRIPT_0x5e_SCENE_569: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_570 — 场景段570 (1B) */
export const SCRIPT_0x5e_SCENE_570: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_571 — 场景段571 (1B) */
export const SCRIPT_0x5e_SCENE_571: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_572 — 场景段572 (1B) */
export const SCRIPT_0x5e_SCENE_572: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_573 — 场景段573 (1B) */
export const SCRIPT_0x5e_SCENE_573: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_574 — 场景段574 (1B) */
export const SCRIPT_0x5e_SCENE_574: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_575 — 场景段575 (1B) */
export const SCRIPT_0x5e_SCENE_575: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_576 — 场景段576 (1B) */
export const SCRIPT_0x5e_SCENE_576: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_577 — 场景段577 (1B) */
export const SCRIPT_0x5e_SCENE_577: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_578 — 场景段578 (1B) */
export const SCRIPT_0x5e_SCENE_578: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_579 — 场景段579 (1B) */
export const SCRIPT_0x5e_SCENE_579: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_580 — 场景段580 (1B) */
export const SCRIPT_0x5e_SCENE_580: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_581 — 场景段581 (1B) */
export const SCRIPT_0x5e_SCENE_581: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_582 — 场景段582 (1B) */
export const SCRIPT_0x5e_SCENE_582: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_583 — 场景段583 (1B) */
export const SCRIPT_0x5e_SCENE_583: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_584 — 场景段584 (1B) */
export const SCRIPT_0x5e_SCENE_584: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_585 — 场景段585 (1B) */
export const SCRIPT_0x5e_SCENE_585: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_586 — 场景段586 (1B) */
export const SCRIPT_0x5e_SCENE_586: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_587 — 场景段587 (1B) */
export const SCRIPT_0x5e_SCENE_587: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_588 — 场景段588 (1B) */
export const SCRIPT_0x5e_SCENE_588: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_589 — 场景段589 (1B) */
export const SCRIPT_0x5e_SCENE_589: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_590 — 场景段590 (1B) */
export const SCRIPT_0x5e_SCENE_590: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_591 — 场景段591 (1B) */
export const SCRIPT_0x5e_SCENE_591: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_592 — 场景段592 (1B) */
export const SCRIPT_0x5e_SCENE_592: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_593 — 场景段593 (1B) */
export const SCRIPT_0x5e_SCENE_593: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_594 — 场景段594 (1B) */
export const SCRIPT_0x5e_SCENE_594: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_595 — 场景段595 (1B) */
export const SCRIPT_0x5e_SCENE_595: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_596 — 场景段596 (1B) */
export const SCRIPT_0x5e_SCENE_596: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_597 — 场景段597 (1B) */
export const SCRIPT_0x5e_SCENE_597: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_598 — 场景段598 (1B) */
export const SCRIPT_0x5e_SCENE_598: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_599 — 场景段599 (1B) */
export const SCRIPT_0x5e_SCENE_599: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_600 — 场景段600 (1B) */
export const SCRIPT_0x5e_SCENE_600: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_601 — 场景段601 (1B) */
export const SCRIPT_0x5e_SCENE_601: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_602 — 场景段602 (1B) */
export const SCRIPT_0x5e_SCENE_602: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_603 — 场景段603 (1B) */
export const SCRIPT_0x5e_SCENE_603: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_604 — 场景段604 (1B) */
export const SCRIPT_0x5e_SCENE_604: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_605 — 场景段605 (1B) */
export const SCRIPT_0x5e_SCENE_605: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_606 — 场景段606 (1B) */
export const SCRIPT_0x5e_SCENE_606: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_607 — 场景段607 (1B) */
export const SCRIPT_0x5e_SCENE_607: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_608 — 场景段608 (1B) */
export const SCRIPT_0x5e_SCENE_608: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_609 — 场景段609 (1B) */
export const SCRIPT_0x5e_SCENE_609: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_610 — 场景段610 (1B) */
export const SCRIPT_0x5e_SCENE_610: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_611 — 场景段611 (1B) */
export const SCRIPT_0x5e_SCENE_611: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_612 — 场景段612 (1B) */
export const SCRIPT_0x5e_SCENE_612: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_613 — 场景段613 (1B) */
export const SCRIPT_0x5e_SCENE_613: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_614 — 场景段614 (1B) */
export const SCRIPT_0x5e_SCENE_614: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_615 — 场景段615 (1B) */
export const SCRIPT_0x5e_SCENE_615: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_616 — 场景段616 (1B) */
export const SCRIPT_0x5e_SCENE_616: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_617 — 场景段617 (1B) */
export const SCRIPT_0x5e_SCENE_617: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_618 — 场景段618 (1B) */
export const SCRIPT_0x5e_SCENE_618: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_619 — 场景段619 (1B) */
export const SCRIPT_0x5e_SCENE_619: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_620 — 场景段620 (1B) */
export const SCRIPT_0x5e_SCENE_620: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_621 — 场景段621 (1B) */
export const SCRIPT_0x5e_SCENE_621: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_622 — 场景段622 (1B) */
export const SCRIPT_0x5e_SCENE_622: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_623 — 场景段623 (1B) */
export const SCRIPT_0x5e_SCENE_623: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_624 — 场景段624 (1B) */
export const SCRIPT_0x5e_SCENE_624: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_625 — 场景段625 (1B) */
export const SCRIPT_0x5e_SCENE_625: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_626 — 场景段626 (1B) */
export const SCRIPT_0x5e_SCENE_626: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_627 — 场景段627 (1B) */
export const SCRIPT_0x5e_SCENE_627: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_628 — 场景段628 (1B) */
export const SCRIPT_0x5e_SCENE_628: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_629 — 场景段629 (1B) */
export const SCRIPT_0x5e_SCENE_629: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_630 — 场景段630 (1B) */
export const SCRIPT_0x5e_SCENE_630: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_631 — 场景段631 (1B) */
export const SCRIPT_0x5e_SCENE_631: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_632 — 场景段632 (1B) */
export const SCRIPT_0x5e_SCENE_632: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_633 — 场景段633 (1B) */
export const SCRIPT_0x5e_SCENE_633: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_634 — 场景段634 (1B) */
export const SCRIPT_0x5e_SCENE_634: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_635 — 场景段635 (1B) */
export const SCRIPT_0x5e_SCENE_635: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_636 — 场景段636 (1B) */
export const SCRIPT_0x5e_SCENE_636: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_637 — 场景段637 (1B) */
export const SCRIPT_0x5e_SCENE_637: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_638 — 场景段638 (1B) */
export const SCRIPT_0x5e_SCENE_638: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_639 — 场景段639 (1B) */
export const SCRIPT_0x5e_SCENE_639: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_640 — 场景段640 (1B) */
export const SCRIPT_0x5e_SCENE_640: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_641 — 场景段641 (1B) */
export const SCRIPT_0x5e_SCENE_641: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_642 — 场景段642 (1B) */
export const SCRIPT_0x5e_SCENE_642: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_643 — 场景段643 (1B) */
export const SCRIPT_0x5e_SCENE_643: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_644 — 场景段644 (1B) */
export const SCRIPT_0x5e_SCENE_644: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_645 — 场景段645 (1B) */
export const SCRIPT_0x5e_SCENE_645: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_646 — 场景段646 (1B) */
export const SCRIPT_0x5e_SCENE_646: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_647 — 场景段647 (1B) */
export const SCRIPT_0x5e_SCENE_647: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_648 — 场景段648 (1B) */
export const SCRIPT_0x5e_SCENE_648: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_649 — 场景段649 (1B) */
export const SCRIPT_0x5e_SCENE_649: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_650 — 场景段650 (1B) */
export const SCRIPT_0x5e_SCENE_650: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_651 — 场景段651 (1B) */
export const SCRIPT_0x5e_SCENE_651: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_652 — 场景段652 (1B) */
export const SCRIPT_0x5e_SCENE_652: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_653 — 场景段653 (1B) */
export const SCRIPT_0x5e_SCENE_653: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_654 — 场景段654 (1B) */
export const SCRIPT_0x5e_SCENE_654: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_655 — 场景段655 (1B) */
export const SCRIPT_0x5e_SCENE_655: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_656 — 场景段656 (1B) */
export const SCRIPT_0x5e_SCENE_656: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_657 — 场景段657 (1B) */
export const SCRIPT_0x5e_SCENE_657: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_658 — 场景段658 (1B) */
export const SCRIPT_0x5e_SCENE_658: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_659 — 场景段659 (1B) */
export const SCRIPT_0x5e_SCENE_659: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_660 — 场景段660 (1B) */
export const SCRIPT_0x5e_SCENE_660: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_661 — 场景段661 (1B) */
export const SCRIPT_0x5e_SCENE_661: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_662 — 场景段662 (1B) */
export const SCRIPT_0x5e_SCENE_662: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_663 — 场景段663 (1B) */
export const SCRIPT_0x5e_SCENE_663: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_664 — 场景段664 (1B) */
export const SCRIPT_0x5e_SCENE_664: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_665 — 场景段665 (1B) */
export const SCRIPT_0x5e_SCENE_665: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_666 — 场景段666 (1B) */
export const SCRIPT_0x5e_SCENE_666: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_667 — 场景段667 (1B) */
export const SCRIPT_0x5e_SCENE_667: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_668 — 场景段668 (1B) */
export const SCRIPT_0x5e_SCENE_668: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_669 — 场景段669 (1B) */
export const SCRIPT_0x5e_SCENE_669: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_670 — 场景段670 (1B) */
export const SCRIPT_0x5e_SCENE_670: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_671 — 场景段671 (1B) */
export const SCRIPT_0x5e_SCENE_671: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_672 — 场景段672 (1B) */
export const SCRIPT_0x5e_SCENE_672: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_673 — 场景段673 (1B) */
export const SCRIPT_0x5e_SCENE_673: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_674 — 场景段674 (1B) */
export const SCRIPT_0x5e_SCENE_674: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_675 — 场景段675 (1B) */
export const SCRIPT_0x5e_SCENE_675: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_676 — 场景段676 (1B) */
export const SCRIPT_0x5e_SCENE_676: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_677 — 场景段677 (1B) */
export const SCRIPT_0x5e_SCENE_677: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_678 — 场景段678 (1B) */
export const SCRIPT_0x5e_SCENE_678: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_679 — 场景段679 (1B) */
export const SCRIPT_0x5e_SCENE_679: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_680 — 场景段680 (1B) */
export const SCRIPT_0x5e_SCENE_680: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_681 — 场景段681 (1B) */
export const SCRIPT_0x5e_SCENE_681: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_682 — 场景段682 (1B) */
export const SCRIPT_0x5e_SCENE_682: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_683 — 场景段683 (1B) */
export const SCRIPT_0x5e_SCENE_683: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_684 — 场景段684 (1B) */
export const SCRIPT_0x5e_SCENE_684: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_685 — 场景段685 (1B) */
export const SCRIPT_0x5e_SCENE_685: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_686 — 场景段686 (1B) */
export const SCRIPT_0x5e_SCENE_686: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_687 — 场景段687 (1B) */
export const SCRIPT_0x5e_SCENE_687: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_688 — 场景段688 (1B) */
export const SCRIPT_0x5e_SCENE_688: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_689 — 场景段689 (1B) */
export const SCRIPT_0x5e_SCENE_689: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_690 — 场景段690 (1B) */
export const SCRIPT_0x5e_SCENE_690: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_691 — 场景段691 (1B) */
export const SCRIPT_0x5e_SCENE_691: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_692 — 场景段692 (1B) */
export const SCRIPT_0x5e_SCENE_692: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_693 — 场景段693 (1B) */
export const SCRIPT_0x5e_SCENE_693: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_694 — 场景段694 (1B) */
export const SCRIPT_0x5e_SCENE_694: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_695 — 场景段695 (1B) */
export const SCRIPT_0x5e_SCENE_695: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_696 — 场景段696 (1B) */
export const SCRIPT_0x5e_SCENE_696: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_697 — 场景段697 (1B) */
export const SCRIPT_0x5e_SCENE_697: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_698 — 场景段698 (1B) */
export const SCRIPT_0x5e_SCENE_698: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_699 — 场景段699 (1B) */
export const SCRIPT_0x5e_SCENE_699: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_700 — 场景段700 (1B) */
export const SCRIPT_0x5e_SCENE_700: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_701 — 场景段701 (1B) */
export const SCRIPT_0x5e_SCENE_701: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_702 — 场景段702 (1B) */
export const SCRIPT_0x5e_SCENE_702: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_703 — 场景段703 (1B) */
export const SCRIPT_0x5e_SCENE_703: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_704 — 场景段704 (1B) */
export const SCRIPT_0x5e_SCENE_704: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_705 — 场景段705 (1B) */
export const SCRIPT_0x5e_SCENE_705: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_706 — 场景段706 (1B) */
export const SCRIPT_0x5e_SCENE_706: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_707 — 场景段707 (1B) */
export const SCRIPT_0x5e_SCENE_707: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_708 — 场景段708 (1B) */
export const SCRIPT_0x5e_SCENE_708: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_709 — 场景段709 (1B) */
export const SCRIPT_0x5e_SCENE_709: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_710 — 场景段710 (1B) */
export const SCRIPT_0x5e_SCENE_710: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_711 — 场景段711 (1B) */
export const SCRIPT_0x5e_SCENE_711: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_712 — 场景段712 (1B) */
export const SCRIPT_0x5e_SCENE_712: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_713 — 场景段713 (1B) */
export const SCRIPT_0x5e_SCENE_713: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_714 — 场景段714 (1B) */
export const SCRIPT_0x5e_SCENE_714: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_715 — 场景段715 (1B) */
export const SCRIPT_0x5e_SCENE_715: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_716 — 场景段716 (1B) */
export const SCRIPT_0x5e_SCENE_716: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_717 — 场景段717 (1B) */
export const SCRIPT_0x5e_SCENE_717: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_718 — 场景段718 (1B) */
export const SCRIPT_0x5e_SCENE_718: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_719 — 场景段719 (1B) */
export const SCRIPT_0x5e_SCENE_719: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_720 — 场景段720 (1B) */
export const SCRIPT_0x5e_SCENE_720: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_721 — 场景段721 (1B) */
export const SCRIPT_0x5e_SCENE_721: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_722 — 场景段722 (1B) */
export const SCRIPT_0x5e_SCENE_722: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_723 — 场景段723 (1B) */
export const SCRIPT_0x5e_SCENE_723: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_724 — 场景段724 (1B) */
export const SCRIPT_0x5e_SCENE_724: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_725 — 场景段725 (1B) */
export const SCRIPT_0x5e_SCENE_725: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_726 — 场景段726 (1B) */
export const SCRIPT_0x5e_SCENE_726: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_727 — 场景段727 (1B) */
export const SCRIPT_0x5e_SCENE_727: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_728 — 场景段728 (1B) */
export const SCRIPT_0x5e_SCENE_728: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_729 — 场景段729 (1B) */
export const SCRIPT_0x5e_SCENE_729: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_730 — 场景段730 (1B) */
export const SCRIPT_0x5e_SCENE_730: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_731 — 场景段731 (1B) */
export const SCRIPT_0x5e_SCENE_731: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_732 — 场景段732 (1B) */
export const SCRIPT_0x5e_SCENE_732: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_733 — 场景段733 (1B) */
export const SCRIPT_0x5e_SCENE_733: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_734 — 场景段734 (1B) */
export const SCRIPT_0x5e_SCENE_734: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_735 — 场景段735 (1B) */
export const SCRIPT_0x5e_SCENE_735: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_736 — 场景段736 (1B) */
export const SCRIPT_0x5e_SCENE_736: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_737 — 场景段737 (1B) */
export const SCRIPT_0x5e_SCENE_737: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_738 — 场景段738 (1B) */
export const SCRIPT_0x5e_SCENE_738: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_739 — 场景段739 (1B) */
export const SCRIPT_0x5e_SCENE_739: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_740 — 场景段740 (1B) */
export const SCRIPT_0x5e_SCENE_740: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_741 — 场景段741 (1B) */
export const SCRIPT_0x5e_SCENE_741: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_742 — 场景段742 (1B) */
export const SCRIPT_0x5e_SCENE_742: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_743 — 场景段743 (1B) */
export const SCRIPT_0x5e_SCENE_743: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_744 — 场景段744 (1B) */
export const SCRIPT_0x5e_SCENE_744: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_745 — 场景段745 (1B) */
export const SCRIPT_0x5e_SCENE_745: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_746 — 场景段746 (1B) */
export const SCRIPT_0x5e_SCENE_746: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_747 — 场景段747 (1B) */
export const SCRIPT_0x5e_SCENE_747: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_748 — 场景段748 (1B) */
export const SCRIPT_0x5e_SCENE_748: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_749 — 场景段749 (1B) */
export const SCRIPT_0x5e_SCENE_749: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_750 — 场景段750 (1B) */
export const SCRIPT_0x5e_SCENE_750: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_751 — 场景段751 (1B) */
export const SCRIPT_0x5e_SCENE_751: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_752 — 场景段752 (1B) */
export const SCRIPT_0x5e_SCENE_752: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_753 — 场景段753 (1B) */
export const SCRIPT_0x5e_SCENE_753: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_754 — 场景段754 (1B) */
export const SCRIPT_0x5e_SCENE_754: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_755 — 场景段755 (1B) */
export const SCRIPT_0x5e_SCENE_755: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_756 — 场景段756 (1B) */
export const SCRIPT_0x5e_SCENE_756: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_757 — 场景段757 (1B) */
export const SCRIPT_0x5e_SCENE_757: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_758 — 场景段758 (1B) */
export const SCRIPT_0x5e_SCENE_758: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_759 — 场景段759 (1B) */
export const SCRIPT_0x5e_SCENE_759: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_760 — 场景段760 (1B) */
export const SCRIPT_0x5e_SCENE_760: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_761 — 场景段761 (1B) */
export const SCRIPT_0x5e_SCENE_761: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_762 — 场景段762 (1B) */
export const SCRIPT_0x5e_SCENE_762: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_763 — 场景段763 (1B) */
export const SCRIPT_0x5e_SCENE_763: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_764 — 场景段764 (1B) */
export const SCRIPT_0x5e_SCENE_764: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_765 — 场景段765 (1B) */
export const SCRIPT_0x5e_SCENE_765: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_766 — 场景段766 (1B) */
export const SCRIPT_0x5e_SCENE_766: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_767 — 场景段767 (1B) */
export const SCRIPT_0x5e_SCENE_767: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_768 — 场景段768 (1B) */
export const SCRIPT_0x5e_SCENE_768: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_769 — 场景段769 (1B) */
export const SCRIPT_0x5e_SCENE_769: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_770 — 场景段770 (1B) */
export const SCRIPT_0x5e_SCENE_770: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_771 — 场景段771 (1B) */
export const SCRIPT_0x5e_SCENE_771: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_772 — 场景段772 (1B) */
export const SCRIPT_0x5e_SCENE_772: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_773 — 场景段773 (1B) */
export const SCRIPT_0x5e_SCENE_773: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_774 — 场景段774 (1B) */
export const SCRIPT_0x5e_SCENE_774: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_775 — 场景段775 (1B) */
export const SCRIPT_0x5e_SCENE_775: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_776 — 场景段776 (1B) */
export const SCRIPT_0x5e_SCENE_776: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_777 — 场景段777 (1B) */
export const SCRIPT_0x5e_SCENE_777: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_778 — 场景段778 (1B) */
export const SCRIPT_0x5e_SCENE_778: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_779 — 场景段779 (1B) */
export const SCRIPT_0x5e_SCENE_779: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_780 — 场景段780 (1B) */
export const SCRIPT_0x5e_SCENE_780: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_781 — 场景段781 (1B) */
export const SCRIPT_0x5e_SCENE_781: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_782 — 场景段782 (1B) */
export const SCRIPT_0x5e_SCENE_782: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_783 — 场景段783 (1B) */
export const SCRIPT_0x5e_SCENE_783: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_784 — 场景段784 (1B) */
export const SCRIPT_0x5e_SCENE_784: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_785 — 场景段785 (1B) */
export const SCRIPT_0x5e_SCENE_785: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_786 — 场景段786 (1B) */
export const SCRIPT_0x5e_SCENE_786: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_787 — 场景段787 (1B) */
export const SCRIPT_0x5e_SCENE_787: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_788 — 场景段788 (1B) */
export const SCRIPT_0x5e_SCENE_788: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_789 — 场景段789 (1B) */
export const SCRIPT_0x5e_SCENE_789: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_790 — 场景段790 (1B) */
export const SCRIPT_0x5e_SCENE_790: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_791 — 场景段791 (1B) */
export const SCRIPT_0x5e_SCENE_791: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_792 — 场景段792 (1B) */
export const SCRIPT_0x5e_SCENE_792: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_793 — 场景段793 (1B) */
export const SCRIPT_0x5e_SCENE_793: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_794 — 场景段794 (1B) */
export const SCRIPT_0x5e_SCENE_794: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_795 — 场景段795 (1B) */
export const SCRIPT_0x5e_SCENE_795: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_796 — 场景段796 (1B) */
export const SCRIPT_0x5e_SCENE_796: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_797 — 场景段797 (1B) */
export const SCRIPT_0x5e_SCENE_797: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_798 — 场景段798 (1B) */
export const SCRIPT_0x5e_SCENE_798: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_799 — 场景段799 (1B) */
export const SCRIPT_0x5e_SCENE_799: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_800 — 场景段800 (1B) */
export const SCRIPT_0x5e_SCENE_800: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_801 — 场景段801 (1B) */
export const SCRIPT_0x5e_SCENE_801: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_802 — 场景段802 (1B) */
export const SCRIPT_0x5e_SCENE_802: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_803 — 场景段803 (1B) */
export const SCRIPT_0x5e_SCENE_803: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_804 — 场景段804 (1B) */
export const SCRIPT_0x5e_SCENE_804: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_805 — 场景段805 (1B) */
export const SCRIPT_0x5e_SCENE_805: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_806 — 场景段806 (1B) */
export const SCRIPT_0x5e_SCENE_806: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_807 — 场景段807 (1B) */
export const SCRIPT_0x5e_SCENE_807: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_808 — 场景段808 (1B) */
export const SCRIPT_0x5e_SCENE_808: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_809 — 场景段809 (1B) */
export const SCRIPT_0x5e_SCENE_809: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_810 — 场景段810 (1B) */
export const SCRIPT_0x5e_SCENE_810: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_811 — 场景段811 (1B) */
export const SCRIPT_0x5e_SCENE_811: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_812 — 场景段812 (1B) */
export const SCRIPT_0x5e_SCENE_812: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_813 — 场景段813 (1B) */
export const SCRIPT_0x5e_SCENE_813: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_814 — 场景段814 (1B) */
export const SCRIPT_0x5e_SCENE_814: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_815 — 场景段815 (1B) */
export const SCRIPT_0x5e_SCENE_815: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_816 — 场景段816 (1B) */
export const SCRIPT_0x5e_SCENE_816: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_817 — 场景段817 (1B) */
export const SCRIPT_0x5e_SCENE_817: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_818 — 场景段818 (1B) */
export const SCRIPT_0x5e_SCENE_818: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_819 — 场景段819 (1B) */
export const SCRIPT_0x5e_SCENE_819: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_820 — 场景段820 (1B) */
export const SCRIPT_0x5e_SCENE_820: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_821 — 场景段821 (1B) */
export const SCRIPT_0x5e_SCENE_821: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_822 — 场景段822 (1B) */
export const SCRIPT_0x5e_SCENE_822: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_823 — 场景段823 (1B) */
export const SCRIPT_0x5e_SCENE_823: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_824 — 场景段824 (1B) */
export const SCRIPT_0x5e_SCENE_824: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_825 — 场景段825 (1B) */
export const SCRIPT_0x5e_SCENE_825: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_826 — 场景段826 (1B) */
export const SCRIPT_0x5e_SCENE_826: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_827 — 场景段827 (1B) */
export const SCRIPT_0x5e_SCENE_827: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_828 — 场景段828 (1B) */
export const SCRIPT_0x5e_SCENE_828: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_829 — 场景段829 (1B) */
export const SCRIPT_0x5e_SCENE_829: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_830 — 场景段830 (1B) */
export const SCRIPT_0x5e_SCENE_830: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_831 — 场景段831 (1B) */
export const SCRIPT_0x5e_SCENE_831: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_832 — 场景段832 (1B) */
export const SCRIPT_0x5e_SCENE_832: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_833 — 场景段833 (1B) */
export const SCRIPT_0x5e_SCENE_833: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_834 — 场景段834 (1B) */
export const SCRIPT_0x5e_SCENE_834: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_835 — 场景段835 (1B) */
export const SCRIPT_0x5e_SCENE_835: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_836 — 场景段836 (1B) */
export const SCRIPT_0x5e_SCENE_836: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_837 — 场景段837 (1B) */
export const SCRIPT_0x5e_SCENE_837: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_838 — 场景段838 (1B) */
export const SCRIPT_0x5e_SCENE_838: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_839 — 场景段839 (1B) */
export const SCRIPT_0x5e_SCENE_839: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_840 — 场景段840 (1B) */
export const SCRIPT_0x5e_SCENE_840: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_841 — 场景段841 (1B) */
export const SCRIPT_0x5e_SCENE_841: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_842 — 场景段842 (1B) */
export const SCRIPT_0x5e_SCENE_842: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_843 — 场景段843 (1B) */
export const SCRIPT_0x5e_SCENE_843: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_844 — 场景段844 (1B) */
export const SCRIPT_0x5e_SCENE_844: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_845 — 场景段845 (1B) */
export const SCRIPT_0x5e_SCENE_845: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_846 — 场景段846 (1B) */
export const SCRIPT_0x5e_SCENE_846: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_847 — 场景段847 (1B) */
export const SCRIPT_0x5e_SCENE_847: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_848 — 场景段848 (1B) */
export const SCRIPT_0x5e_SCENE_848: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_849 — 场景段849 (1B) */
export const SCRIPT_0x5e_SCENE_849: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_850 — 场景段850 (1B) */
export const SCRIPT_0x5e_SCENE_850: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_851 — 场景段851 (1B) */
export const SCRIPT_0x5e_SCENE_851: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_852 — 场景段852 (1B) */
export const SCRIPT_0x5e_SCENE_852: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_853 — 场景段853 (1B) */
export const SCRIPT_0x5e_SCENE_853: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_854 — 场景段854 (1B) */
export const SCRIPT_0x5e_SCENE_854: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_855 — 场景段855 (1B) */
export const SCRIPT_0x5e_SCENE_855: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_856 — 场景段856 (1B) */
export const SCRIPT_0x5e_SCENE_856: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_857 — 场景段857 (1B) */
export const SCRIPT_0x5e_SCENE_857: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_858 — 场景段858 (1B) */
export const SCRIPT_0x5e_SCENE_858: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_859 — 场景段859 (1B) */
export const SCRIPT_0x5e_SCENE_859: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_860 — 场景段860 (1B) */
export const SCRIPT_0x5e_SCENE_860: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_861 — 场景段861 (1B) */
export const SCRIPT_0x5e_SCENE_861: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_862 — 场景段862 (1B) */
export const SCRIPT_0x5e_SCENE_862: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_863 — 场景段863 (1B) */
export const SCRIPT_0x5e_SCENE_863: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_864 — 场景段864 (1B) */
export const SCRIPT_0x5e_SCENE_864: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_865 — 场景段865 (1B) */
export const SCRIPT_0x5e_SCENE_865: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_866 — 场景段866 (1B) */
export const SCRIPT_0x5e_SCENE_866: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_867 — 场景段867 (1B) */
export const SCRIPT_0x5e_SCENE_867: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_868 — 场景段868 (1B) */
export const SCRIPT_0x5e_SCENE_868: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_869 — 场景段869 (1B) */
export const SCRIPT_0x5e_SCENE_869: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_870 — 场景段870 (1B) */
export const SCRIPT_0x5e_SCENE_870: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_871 — 场景段871 (1B) */
export const SCRIPT_0x5e_SCENE_871: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_872 — 场景段872 (1B) */
export const SCRIPT_0x5e_SCENE_872: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_873 — 场景段873 (1B) */
export const SCRIPT_0x5e_SCENE_873: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_874 — 场景段874 (1B) */
export const SCRIPT_0x5e_SCENE_874: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_875 — 场景段875 (1B) */
export const SCRIPT_0x5e_SCENE_875: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_876 — 场景段876 (1B) */
export const SCRIPT_0x5e_SCENE_876: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_877 — 场景段877 (1B) */
export const SCRIPT_0x5e_SCENE_877: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_878 — 场景段878 (1B) */
export const SCRIPT_0x5e_SCENE_878: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_879 — 场景段879 (1B) */
export const SCRIPT_0x5e_SCENE_879: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_880 — 场景段880 (1B) */
export const SCRIPT_0x5e_SCENE_880: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_881 — 场景段881 (1B) */
export const SCRIPT_0x5e_SCENE_881: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_882 — 场景段882 (1B) */
export const SCRIPT_0x5e_SCENE_882: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_883 — 场景段883 (1B) */
export const SCRIPT_0x5e_SCENE_883: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_884 — 场景段884 (1B) */
export const SCRIPT_0x5e_SCENE_884: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_885 — 场景段885 (1B) */
export const SCRIPT_0x5e_SCENE_885: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_886 — 场景段886 (1B) */
export const SCRIPT_0x5e_SCENE_886: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_887 — 场景段887 (1B) */
export const SCRIPT_0x5e_SCENE_887: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_888 — 场景段888 (1B) */
export const SCRIPT_0x5e_SCENE_888: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_889 — 场景段889 (1B) */
export const SCRIPT_0x5e_SCENE_889: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_890 — 场景段890 (1B) */
export const SCRIPT_0x5e_SCENE_890: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_891 — 场景段891 (1B) */
export const SCRIPT_0x5e_SCENE_891: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_892 — 场景段892 (1B) */
export const SCRIPT_0x5e_SCENE_892: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_893 — 场景段893 (1B) */
export const SCRIPT_0x5e_SCENE_893: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_894 — 场景段894 (1B) */
export const SCRIPT_0x5e_SCENE_894: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_895 — 场景段895 (1B) */
export const SCRIPT_0x5e_SCENE_895: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_896 — 场景段896 (1B) */
export const SCRIPT_0x5e_SCENE_896: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_897 — 场景段897 (1B) */
export const SCRIPT_0x5e_SCENE_897: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_898 — 场景段898 (1B) */
export const SCRIPT_0x5e_SCENE_898: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_899 — 场景段899 (1B) */
export const SCRIPT_0x5e_SCENE_899: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_900 — 场景段900 (1B) */
export const SCRIPT_0x5e_SCENE_900: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_901 — 场景段901 (1B) */
export const SCRIPT_0x5e_SCENE_901: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_902 — 场景段902 (1B) */
export const SCRIPT_0x5e_SCENE_902: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_903 — 场景段903 (1B) */
export const SCRIPT_0x5e_SCENE_903: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_904 — 场景段904 (1B) */
export const SCRIPT_0x5e_SCENE_904: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_905 — 场景段905 (1B) */
export const SCRIPT_0x5e_SCENE_905: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_906 — 场景段906 (1B) */
export const SCRIPT_0x5e_SCENE_906: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_907 — 场景段907 (1B) */
export const SCRIPT_0x5e_SCENE_907: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_908 — 场景段908 (1B) */
export const SCRIPT_0x5e_SCENE_908: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_909 — 场景段909 (1B) */
export const SCRIPT_0x5e_SCENE_909: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_910 — 场景段910 (1B) */
export const SCRIPT_0x5e_SCENE_910: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_911 — 场景段911 (1B) */
export const SCRIPT_0x5e_SCENE_911: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_912 — 场景段912 (1B) */
export const SCRIPT_0x5e_SCENE_912: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_913 — 场景段913 (1B) */
export const SCRIPT_0x5e_SCENE_913: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_914 — 场景段914 (1B) */
export const SCRIPT_0x5e_SCENE_914: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_915 — 场景段915 (1B) */
export const SCRIPT_0x5e_SCENE_915: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_916 — 场景段916 (1B) */
export const SCRIPT_0x5e_SCENE_916: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_917 — 场景段917 (1B) */
export const SCRIPT_0x5e_SCENE_917: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_918 — 场景段918 (1B) */
export const SCRIPT_0x5e_SCENE_918: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_919 — 场景段919 (1B) */
export const SCRIPT_0x5e_SCENE_919: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_920 — 场景段920 (1B) */
export const SCRIPT_0x5e_SCENE_920: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_921 — 场景段921 (1B) */
export const SCRIPT_0x5e_SCENE_921: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_922 — 场景段922 (1B) */
export const SCRIPT_0x5e_SCENE_922: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_923 — 场景段923 (1B) */
export const SCRIPT_0x5e_SCENE_923: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_924 — 场景段924 (1B) */
export const SCRIPT_0x5e_SCENE_924: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_925 — 场景段925 (1B) */
export const SCRIPT_0x5e_SCENE_925: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_926 — 场景段926 (1B) */
export const SCRIPT_0x5e_SCENE_926: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_927 — 场景段927 (1B) */
export const SCRIPT_0x5e_SCENE_927: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_928 — 场景段928 (1B) */
export const SCRIPT_0x5e_SCENE_928: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_929 — 场景段929 (1B) */
export const SCRIPT_0x5e_SCENE_929: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_930 — 场景段930 (1B) */
export const SCRIPT_0x5e_SCENE_930: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_931 — 场景段931 (1B) */
export const SCRIPT_0x5e_SCENE_931: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_932 — 场景段932 (1B) */
export const SCRIPT_0x5e_SCENE_932: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_933 — 场景段933 (1B) */
export const SCRIPT_0x5e_SCENE_933: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_934 — 场景段934 (1B) */
export const SCRIPT_0x5e_SCENE_934: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_935 — 场景段935 (1B) */
export const SCRIPT_0x5e_SCENE_935: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_936 — 场景段936 (1B) */
export const SCRIPT_0x5e_SCENE_936: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_937 — 场景段937 (1B) */
export const SCRIPT_0x5e_SCENE_937: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_938 — 场景段938 (1B) */
export const SCRIPT_0x5e_SCENE_938: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_939 — 场景段939 (1B) */
export const SCRIPT_0x5e_SCENE_939: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_940 — 场景段940 (1B) */
export const SCRIPT_0x5e_SCENE_940: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_941 — 场景段941 (1B) */
export const SCRIPT_0x5e_SCENE_941: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_942 — 场景段942 (1B) */
export const SCRIPT_0x5e_SCENE_942: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_943 — 场景段943 (1B) */
export const SCRIPT_0x5e_SCENE_943: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_944 — 场景段944 (1B) */
export const SCRIPT_0x5e_SCENE_944: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_945 — 场景段945 (1B) */
export const SCRIPT_0x5e_SCENE_945: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_946 — 场景段946 (1B) */
export const SCRIPT_0x5e_SCENE_946: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_947 — 场景段947 (1B) */
export const SCRIPT_0x5e_SCENE_947: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_948 — 场景段948 (1B) */
export const SCRIPT_0x5e_SCENE_948: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_949 — 场景段949 (1B) */
export const SCRIPT_0x5e_SCENE_949: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_950 — 场景段950 (1B) */
export const SCRIPT_0x5e_SCENE_950: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_951 — 场景段951 (1B) */
export const SCRIPT_0x5e_SCENE_951: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_952 — 场景段952 (1B) */
export const SCRIPT_0x5e_SCENE_952: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_953 — 场景段953 (1B) */
export const SCRIPT_0x5e_SCENE_953: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_954 — 场景段954 (1B) */
export const SCRIPT_0x5e_SCENE_954: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_955 — 场景段955 (1B) */
export const SCRIPT_0x5e_SCENE_955: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_956 — 场景段956 (1B) */
export const SCRIPT_0x5e_SCENE_956: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_957 — 场景段957 (1B) */
export const SCRIPT_0x5e_SCENE_957: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_958 — 场景段958 (1B) */
export const SCRIPT_0x5e_SCENE_958: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_959 — 场景段959 (1B) */
export const SCRIPT_0x5e_SCENE_959: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_960 — 场景段960 (1B) */
export const SCRIPT_0x5e_SCENE_960: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_961 — 场景段961 (1B) */
export const SCRIPT_0x5e_SCENE_961: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_962 — 场景段962 (1B) */
export const SCRIPT_0x5e_SCENE_962: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_963 — 场景段963 (1B) */
export const SCRIPT_0x5e_SCENE_963: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_964 — 场景段964 (1B) */
export const SCRIPT_0x5e_SCENE_964: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_965 — 场景段965 (1B) */
export const SCRIPT_0x5e_SCENE_965: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_966 — 场景段966 (1B) */
export const SCRIPT_0x5e_SCENE_966: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_967 — 场景段967 (1B) */
export const SCRIPT_0x5e_SCENE_967: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_968 — 场景段968 (1B) */
export const SCRIPT_0x5e_SCENE_968: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_969 — 场景段969 (1B) */
export const SCRIPT_0x5e_SCENE_969: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_970 — 场景段970 (1B) */
export const SCRIPT_0x5e_SCENE_970: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_971 — 场景段971 (1B) */
export const SCRIPT_0x5e_SCENE_971: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_972 — 场景段972 (1B) */
export const SCRIPT_0x5e_SCENE_972: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_973 — 场景段973 (1B) */
export const SCRIPT_0x5e_SCENE_973: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_974 — 场景段974 (1B) */
export const SCRIPT_0x5e_SCENE_974: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_975 — 场景段975 (1B) */
export const SCRIPT_0x5e_SCENE_975: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_976 — 场景段976 (1B) */
export const SCRIPT_0x5e_SCENE_976: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_977 — 场景段977 (1B) */
export const SCRIPT_0x5e_SCENE_977: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_978 — 场景段978 (1B) */
export const SCRIPT_0x5e_SCENE_978: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_979 — 场景段979 (1B) */
export const SCRIPT_0x5e_SCENE_979: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_980 — 场景段980 (1B) */
export const SCRIPT_0x5e_SCENE_980: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_981 — 场景段981 (1B) */
export const SCRIPT_0x5e_SCENE_981: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_982 — 场景段982 (1B) */
export const SCRIPT_0x5e_SCENE_982: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_983 — 场景段983 (1B) */
export const SCRIPT_0x5e_SCENE_983: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_984 — 场景段984 (1B) */
export const SCRIPT_0x5e_SCENE_984: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_985 — 场景段985 (1B) */
export const SCRIPT_0x5e_SCENE_985: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_986 — 场景段986 (1B) */
export const SCRIPT_0x5e_SCENE_986: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_987 — 场景段987 (1B) */
export const SCRIPT_0x5e_SCENE_987: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_988 — 场景段988 (1B) */
export const SCRIPT_0x5e_SCENE_988: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_989 — 场景段989 (1B) */
export const SCRIPT_0x5e_SCENE_989: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_990 — 场景段990 (1B) */
export const SCRIPT_0x5e_SCENE_990: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_991 — 场景段991 (1B) */
export const SCRIPT_0x5e_SCENE_991: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_992 — 场景段992 (1B) */
export const SCRIPT_0x5e_SCENE_992: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_993 — 场景段993 (1B) */
export const SCRIPT_0x5e_SCENE_993: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_994 — 场景段994 (1B) */
export const SCRIPT_0x5e_SCENE_994: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_995 — 场景段995 (1B) */
export const SCRIPT_0x5e_SCENE_995: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_996 — 场景段996 (1B) */
export const SCRIPT_0x5e_SCENE_996: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_997 — 场景段997 (1B) */
export const SCRIPT_0x5e_SCENE_997: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_998 — 场景段998 (1B) */
export const SCRIPT_0x5e_SCENE_998: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_999 — 场景段999 (1B) */
export const SCRIPT_0x5e_SCENE_999: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1000 — 场景段1000 (1B) */
export const SCRIPT_0x5e_SCENE_1000: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1001 — 场景段1001 (1B) */
export const SCRIPT_0x5e_SCENE_1001: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1002 — 场景段1002 (1B) */
export const SCRIPT_0x5e_SCENE_1002: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1003 — 场景段1003 (1B) */
export const SCRIPT_0x5e_SCENE_1003: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1004 — 场景段1004 (1B) */
export const SCRIPT_0x5e_SCENE_1004: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1005 — 场景段1005 (1B) */
export const SCRIPT_0x5e_SCENE_1005: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1006 — 场景段1006 (1B) */
export const SCRIPT_0x5e_SCENE_1006: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1007 — 场景段1007 (1B) */
export const SCRIPT_0x5e_SCENE_1007: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1008 — 场景段1008 (1B) */
export const SCRIPT_0x5e_SCENE_1008: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1009 — 场景段1009 (1B) */
export const SCRIPT_0x5e_SCENE_1009: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1010 — 场景段1010 (1B) */
export const SCRIPT_0x5e_SCENE_1010: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1011 — 场景段1011 (1B) */
export const SCRIPT_0x5e_SCENE_1011: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1012 — 场景段1012 (1B) */
export const SCRIPT_0x5e_SCENE_1012: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1013 — 场景段1013 (1B) */
export const SCRIPT_0x5e_SCENE_1013: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1014 — 场景段1014 (1B) */
export const SCRIPT_0x5e_SCENE_1014: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1015 — 场景段1015 (1B) */
export const SCRIPT_0x5e_SCENE_1015: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1016 — 场景段1016 (1B) */
export const SCRIPT_0x5e_SCENE_1016: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1017 — 场景段1017 (1B) */
export const SCRIPT_0x5e_SCENE_1017: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1018 — 场景段1018 (1B) */
export const SCRIPT_0x5e_SCENE_1018: readonly number[] = [
  0xff,  // $FF end()
];

/** SCRIPT_0x5e_SCENE_1019 — 场景段1019 (1B) */
export const SCRIPT_0x5e_SCENE_1019: readonly number[] = [
  0xff,  // $FF end()
];

/** 脚本 0x5e 的场景段列表 */
export const SCRIPT_0x5e: readonly (readonly number[])[] = [
  SCRIPT_0x5e_SCENE_0,
  SCRIPT_0x5e_SCENE_1,
  SCRIPT_0x5e_SCENE_2,
  SCRIPT_0x5e_SCENE_3,
  SCRIPT_0x5e_SCENE_4,
  SCRIPT_0x5e_SCENE_5,
  SCRIPT_0x5e_SCENE_6,
  SCRIPT_0x5e_SCENE_7,
  SCRIPT_0x5e_SCENE_8,
  SCRIPT_0x5e_SCENE_9,
  SCRIPT_0x5e_SCENE_10,
  SCRIPT_0x5e_SCENE_11,
  SCRIPT_0x5e_SCENE_12,
  SCRIPT_0x5e_SCENE_13,
  SCRIPT_0x5e_SCENE_14,
  SCRIPT_0x5e_SCENE_15,
  SCRIPT_0x5e_SCENE_16,
  SCRIPT_0x5e_SCENE_17,
  SCRIPT_0x5e_SCENE_18,
  SCRIPT_0x5e_SCENE_19,
  SCRIPT_0x5e_SCENE_20,
  SCRIPT_0x5e_SCENE_21,
  SCRIPT_0x5e_SCENE_22,
  SCRIPT_0x5e_SCENE_23,
  SCRIPT_0x5e_SCENE_24,
  SCRIPT_0x5e_SCENE_25,
  SCRIPT_0x5e_SCENE_26,
  SCRIPT_0x5e_SCENE_27,
  SCRIPT_0x5e_SCENE_28,
  SCRIPT_0x5e_SCENE_29,
  SCRIPT_0x5e_SCENE_30,
  SCRIPT_0x5e_SCENE_31,
  SCRIPT_0x5e_SCENE_32,
  SCRIPT_0x5e_SCENE_33,
  SCRIPT_0x5e_SCENE_34,
  SCRIPT_0x5e_SCENE_35,
  SCRIPT_0x5e_SCENE_36,
  SCRIPT_0x5e_SCENE_37,
  SCRIPT_0x5e_SCENE_38,
  SCRIPT_0x5e_SCENE_39,
  SCRIPT_0x5e_SCENE_40,
  SCRIPT_0x5e_SCENE_41,
  SCRIPT_0x5e_SCENE_42,
  SCRIPT_0x5e_SCENE_43,
  SCRIPT_0x5e_SCENE_44,
  SCRIPT_0x5e_SCENE_45,
  SCRIPT_0x5e_SCENE_46,
  SCRIPT_0x5e_SCENE_47,
  SCRIPT_0x5e_SCENE_48,
  SCRIPT_0x5e_SCENE_49,
  SCRIPT_0x5e_SCENE_50,
  SCRIPT_0x5e_SCENE_51,
  SCRIPT_0x5e_SCENE_52,
  SCRIPT_0x5e_SCENE_53,
  SCRIPT_0x5e_SCENE_54,
  SCRIPT_0x5e_SCENE_55,
  SCRIPT_0x5e_SCENE_56,
  SCRIPT_0x5e_SCENE_57,
  SCRIPT_0x5e_SCENE_58,
  SCRIPT_0x5e_SCENE_59,
  SCRIPT_0x5e_SCENE_60,
  SCRIPT_0x5e_SCENE_61,
  SCRIPT_0x5e_SCENE_62,
  SCRIPT_0x5e_SCENE_63,
  SCRIPT_0x5e_SCENE_64,
  SCRIPT_0x5e_SCENE_65,
  SCRIPT_0x5e_SCENE_66,
  SCRIPT_0x5e_SCENE_67,
  SCRIPT_0x5e_SCENE_68,
  SCRIPT_0x5e_SCENE_69,
  SCRIPT_0x5e_SCENE_70,
  SCRIPT_0x5e_SCENE_71,
  SCRIPT_0x5e_SCENE_72,
  SCRIPT_0x5e_SCENE_73,
  SCRIPT_0x5e_SCENE_74,
  SCRIPT_0x5e_SCENE_75,
  SCRIPT_0x5e_SCENE_76,
  SCRIPT_0x5e_SCENE_77,
  SCRIPT_0x5e_SCENE_78,
  SCRIPT_0x5e_SCENE_79,
  SCRIPT_0x5e_SCENE_80,
  SCRIPT_0x5e_SCENE_81,
  SCRIPT_0x5e_SCENE_82,
  SCRIPT_0x5e_SCENE_83,
  SCRIPT_0x5e_SCENE_84,
  SCRIPT_0x5e_SCENE_85,
  SCRIPT_0x5e_SCENE_86,
  SCRIPT_0x5e_SCENE_87,
  SCRIPT_0x5e_SCENE_88,
  SCRIPT_0x5e_SCENE_89,
  SCRIPT_0x5e_SCENE_90,
  SCRIPT_0x5e_SCENE_91,
  SCRIPT_0x5e_SCENE_92,
  SCRIPT_0x5e_SCENE_93,
  SCRIPT_0x5e_SCENE_94,
  SCRIPT_0x5e_SCENE_95,
  SCRIPT_0x5e_SCENE_96,
  SCRIPT_0x5e_SCENE_97,
  SCRIPT_0x5e_SCENE_98,
  SCRIPT_0x5e_SCENE_99,
  SCRIPT_0x5e_SCENE_100,
  SCRIPT_0x5e_SCENE_101,
  SCRIPT_0x5e_SCENE_102,
  SCRIPT_0x5e_SCENE_103,
  SCRIPT_0x5e_SCENE_104,
  SCRIPT_0x5e_SCENE_105,
  SCRIPT_0x5e_SCENE_106,
  SCRIPT_0x5e_SCENE_107,
  SCRIPT_0x5e_SCENE_108,
  SCRIPT_0x5e_SCENE_109,
  SCRIPT_0x5e_SCENE_110,
  SCRIPT_0x5e_SCENE_111,
  SCRIPT_0x5e_SCENE_112,
  SCRIPT_0x5e_SCENE_113,
  SCRIPT_0x5e_SCENE_114,
  SCRIPT_0x5e_SCENE_115,
  SCRIPT_0x5e_SCENE_116,
  SCRIPT_0x5e_SCENE_117,
  SCRIPT_0x5e_SCENE_118,
  SCRIPT_0x5e_SCENE_119,
  SCRIPT_0x5e_SCENE_120,
  SCRIPT_0x5e_SCENE_121,
  SCRIPT_0x5e_SCENE_122,
  SCRIPT_0x5e_SCENE_123,
  SCRIPT_0x5e_SCENE_124,
  SCRIPT_0x5e_SCENE_125,
  SCRIPT_0x5e_SCENE_126,
  SCRIPT_0x5e_SCENE_127,
  SCRIPT_0x5e_SCENE_128,
  SCRIPT_0x5e_SCENE_129,
  SCRIPT_0x5e_SCENE_130,
  SCRIPT_0x5e_SCENE_131,
  SCRIPT_0x5e_SCENE_132,
  SCRIPT_0x5e_SCENE_133,
  SCRIPT_0x5e_SCENE_134,
  SCRIPT_0x5e_SCENE_135,
  SCRIPT_0x5e_SCENE_136,
  SCRIPT_0x5e_SCENE_137,
  SCRIPT_0x5e_SCENE_138,
  SCRIPT_0x5e_SCENE_139,
  SCRIPT_0x5e_SCENE_140,
  SCRIPT_0x5e_SCENE_141,
  SCRIPT_0x5e_SCENE_142,
  SCRIPT_0x5e_SCENE_143,
  SCRIPT_0x5e_SCENE_144,
  SCRIPT_0x5e_SCENE_145,
  SCRIPT_0x5e_SCENE_146,
  SCRIPT_0x5e_SCENE_147,
  SCRIPT_0x5e_SCENE_148,
  SCRIPT_0x5e_SCENE_149,
  SCRIPT_0x5e_SCENE_150,
  SCRIPT_0x5e_SCENE_151,
  SCRIPT_0x5e_SCENE_152,
  SCRIPT_0x5e_SCENE_153,
  SCRIPT_0x5e_SCENE_154,
  SCRIPT_0x5e_SCENE_155,
  SCRIPT_0x5e_SCENE_156,
  SCRIPT_0x5e_SCENE_157,
  SCRIPT_0x5e_SCENE_158,
  SCRIPT_0x5e_SCENE_159,
  SCRIPT_0x5e_SCENE_160,
  SCRIPT_0x5e_SCENE_161,
  SCRIPT_0x5e_SCENE_162,
  SCRIPT_0x5e_SCENE_163,
  SCRIPT_0x5e_SCENE_164,
  SCRIPT_0x5e_SCENE_165,
  SCRIPT_0x5e_SCENE_166,
  SCRIPT_0x5e_SCENE_167,
  SCRIPT_0x5e_SCENE_168,
  SCRIPT_0x5e_SCENE_169,
  SCRIPT_0x5e_SCENE_170,
  SCRIPT_0x5e_SCENE_171,
  SCRIPT_0x5e_SCENE_172,
  SCRIPT_0x5e_SCENE_173,
  SCRIPT_0x5e_SCENE_174,
  SCRIPT_0x5e_SCENE_175,
  SCRIPT_0x5e_SCENE_176,
  SCRIPT_0x5e_SCENE_177,
  SCRIPT_0x5e_SCENE_178,
  SCRIPT_0x5e_SCENE_179,
  SCRIPT_0x5e_SCENE_180,
  SCRIPT_0x5e_SCENE_181,
  SCRIPT_0x5e_SCENE_182,
  SCRIPT_0x5e_SCENE_183,
  SCRIPT_0x5e_SCENE_184,
  SCRIPT_0x5e_SCENE_185,
  SCRIPT_0x5e_SCENE_186,
  SCRIPT_0x5e_SCENE_187,
  SCRIPT_0x5e_SCENE_188,
  SCRIPT_0x5e_SCENE_189,
  SCRIPT_0x5e_SCENE_190,
  SCRIPT_0x5e_SCENE_191,
  SCRIPT_0x5e_SCENE_192,
  SCRIPT_0x5e_SCENE_193,
  SCRIPT_0x5e_SCENE_194,
  SCRIPT_0x5e_SCENE_195,
  SCRIPT_0x5e_SCENE_196,
  SCRIPT_0x5e_SCENE_197,
  SCRIPT_0x5e_SCENE_198,
  SCRIPT_0x5e_SCENE_199,
  SCRIPT_0x5e_SCENE_200,
  SCRIPT_0x5e_SCENE_201,
  SCRIPT_0x5e_SCENE_202,
  SCRIPT_0x5e_SCENE_203,
  SCRIPT_0x5e_SCENE_204,
  SCRIPT_0x5e_SCENE_205,
  SCRIPT_0x5e_SCENE_206,
  SCRIPT_0x5e_SCENE_207,
  SCRIPT_0x5e_SCENE_208,
  SCRIPT_0x5e_SCENE_209,
  SCRIPT_0x5e_SCENE_210,
  SCRIPT_0x5e_SCENE_211,
  SCRIPT_0x5e_SCENE_212,
  SCRIPT_0x5e_SCENE_213,
  SCRIPT_0x5e_SCENE_214,
  SCRIPT_0x5e_SCENE_215,
  SCRIPT_0x5e_SCENE_216,
  SCRIPT_0x5e_SCENE_217,
  SCRIPT_0x5e_SCENE_218,
  SCRIPT_0x5e_SCENE_219,
  SCRIPT_0x5e_SCENE_220,
  SCRIPT_0x5e_SCENE_221,
  SCRIPT_0x5e_SCENE_222,
  SCRIPT_0x5e_SCENE_223,
  SCRIPT_0x5e_SCENE_224,
  SCRIPT_0x5e_SCENE_225,
  SCRIPT_0x5e_SCENE_226,
  SCRIPT_0x5e_SCENE_227,
  SCRIPT_0x5e_SCENE_228,
  SCRIPT_0x5e_SCENE_229,
  SCRIPT_0x5e_SCENE_230,
  SCRIPT_0x5e_SCENE_231,
  SCRIPT_0x5e_SCENE_232,
  SCRIPT_0x5e_SCENE_233,
  SCRIPT_0x5e_SCENE_234,
  SCRIPT_0x5e_SCENE_235,
  SCRIPT_0x5e_SCENE_236,
  SCRIPT_0x5e_SCENE_237,
  SCRIPT_0x5e_SCENE_238,
  SCRIPT_0x5e_SCENE_239,
  SCRIPT_0x5e_SCENE_240,
  SCRIPT_0x5e_SCENE_241,
  SCRIPT_0x5e_SCENE_242,
  SCRIPT_0x5e_SCENE_243,
  SCRIPT_0x5e_SCENE_244,
  SCRIPT_0x5e_SCENE_245,
  SCRIPT_0x5e_SCENE_246,
  SCRIPT_0x5e_SCENE_247,
  SCRIPT_0x5e_SCENE_248,
  SCRIPT_0x5e_SCENE_249,
  SCRIPT_0x5e_SCENE_250,
  SCRIPT_0x5e_SCENE_251,
  SCRIPT_0x5e_SCENE_252,
  SCRIPT_0x5e_SCENE_253,
  SCRIPT_0x5e_SCENE_254,
  SCRIPT_0x5e_SCENE_255,
  SCRIPT_0x5e_SCENE_256,
  SCRIPT_0x5e_SCENE_257,
  SCRIPT_0x5e_SCENE_258,
  SCRIPT_0x5e_SCENE_259,
  SCRIPT_0x5e_SCENE_260,
  SCRIPT_0x5e_SCENE_261,
  SCRIPT_0x5e_SCENE_262,
  SCRIPT_0x5e_SCENE_263,
  SCRIPT_0x5e_SCENE_264,
  SCRIPT_0x5e_SCENE_265,
  SCRIPT_0x5e_SCENE_266,
  SCRIPT_0x5e_SCENE_267,
  SCRIPT_0x5e_SCENE_268,
  SCRIPT_0x5e_SCENE_269,
  SCRIPT_0x5e_SCENE_270,
  SCRIPT_0x5e_SCENE_271,
  SCRIPT_0x5e_SCENE_272,
  SCRIPT_0x5e_SCENE_273,
  SCRIPT_0x5e_SCENE_274,
  SCRIPT_0x5e_SCENE_275,
  SCRIPT_0x5e_SCENE_276,
  SCRIPT_0x5e_SCENE_277,
  SCRIPT_0x5e_SCENE_278,
  SCRIPT_0x5e_SCENE_279,
  SCRIPT_0x5e_SCENE_280,
  SCRIPT_0x5e_SCENE_281,
  SCRIPT_0x5e_SCENE_282,
  SCRIPT_0x5e_SCENE_283,
  SCRIPT_0x5e_SCENE_284,
  SCRIPT_0x5e_SCENE_285,
  SCRIPT_0x5e_SCENE_286,
  SCRIPT_0x5e_SCENE_287,
  SCRIPT_0x5e_SCENE_288,
  SCRIPT_0x5e_SCENE_289,
  SCRIPT_0x5e_SCENE_290,
  SCRIPT_0x5e_SCENE_291,
  SCRIPT_0x5e_SCENE_292,
  SCRIPT_0x5e_SCENE_293,
  SCRIPT_0x5e_SCENE_294,
  SCRIPT_0x5e_SCENE_295,
  SCRIPT_0x5e_SCENE_296,
  SCRIPT_0x5e_SCENE_297,
  SCRIPT_0x5e_SCENE_298,
  SCRIPT_0x5e_SCENE_299,
  SCRIPT_0x5e_SCENE_300,
  SCRIPT_0x5e_SCENE_301,
  SCRIPT_0x5e_SCENE_302,
  SCRIPT_0x5e_SCENE_303,
  SCRIPT_0x5e_SCENE_304,
  SCRIPT_0x5e_SCENE_305,
  SCRIPT_0x5e_SCENE_306,
  SCRIPT_0x5e_SCENE_307,
  SCRIPT_0x5e_SCENE_308,
  SCRIPT_0x5e_SCENE_309,
  SCRIPT_0x5e_SCENE_310,
  SCRIPT_0x5e_SCENE_311,
  SCRIPT_0x5e_SCENE_312,
  SCRIPT_0x5e_SCENE_313,
  SCRIPT_0x5e_SCENE_314,
  SCRIPT_0x5e_SCENE_315,
  SCRIPT_0x5e_SCENE_316,
  SCRIPT_0x5e_SCENE_317,
  SCRIPT_0x5e_SCENE_318,
  SCRIPT_0x5e_SCENE_319,
  SCRIPT_0x5e_SCENE_320,
  SCRIPT_0x5e_SCENE_321,
  SCRIPT_0x5e_SCENE_322,
  SCRIPT_0x5e_SCENE_323,
  SCRIPT_0x5e_SCENE_324,
  SCRIPT_0x5e_SCENE_325,
  SCRIPT_0x5e_SCENE_326,
  SCRIPT_0x5e_SCENE_327,
  SCRIPT_0x5e_SCENE_328,
  SCRIPT_0x5e_SCENE_329,
  SCRIPT_0x5e_SCENE_330,
  SCRIPT_0x5e_SCENE_331,
  SCRIPT_0x5e_SCENE_332,
  SCRIPT_0x5e_SCENE_333,
  SCRIPT_0x5e_SCENE_334,
  SCRIPT_0x5e_SCENE_335,
  SCRIPT_0x5e_SCENE_336,
  SCRIPT_0x5e_SCENE_337,
  SCRIPT_0x5e_SCENE_338,
  SCRIPT_0x5e_SCENE_339,
  SCRIPT_0x5e_SCENE_340,
  SCRIPT_0x5e_SCENE_341,
  SCRIPT_0x5e_SCENE_342,
  SCRIPT_0x5e_SCENE_343,
  SCRIPT_0x5e_SCENE_344,
  SCRIPT_0x5e_SCENE_345,
  SCRIPT_0x5e_SCENE_346,
  SCRIPT_0x5e_SCENE_347,
  SCRIPT_0x5e_SCENE_348,
  SCRIPT_0x5e_SCENE_349,
  SCRIPT_0x5e_SCENE_350,
  SCRIPT_0x5e_SCENE_351,
  SCRIPT_0x5e_SCENE_352,
  SCRIPT_0x5e_SCENE_353,
  SCRIPT_0x5e_SCENE_354,
  SCRIPT_0x5e_SCENE_355,
  SCRIPT_0x5e_SCENE_356,
  SCRIPT_0x5e_SCENE_357,
  SCRIPT_0x5e_SCENE_358,
  SCRIPT_0x5e_SCENE_359,
  SCRIPT_0x5e_SCENE_360,
  SCRIPT_0x5e_SCENE_361,
  SCRIPT_0x5e_SCENE_362,
  SCRIPT_0x5e_SCENE_363,
  SCRIPT_0x5e_SCENE_364,
  SCRIPT_0x5e_SCENE_365,
  SCRIPT_0x5e_SCENE_366,
  SCRIPT_0x5e_SCENE_367,
  SCRIPT_0x5e_SCENE_368,
  SCRIPT_0x5e_SCENE_369,
  SCRIPT_0x5e_SCENE_370,
  SCRIPT_0x5e_SCENE_371,
  SCRIPT_0x5e_SCENE_372,
  SCRIPT_0x5e_SCENE_373,
  SCRIPT_0x5e_SCENE_374,
  SCRIPT_0x5e_SCENE_375,
  SCRIPT_0x5e_SCENE_376,
  SCRIPT_0x5e_SCENE_377,
  SCRIPT_0x5e_SCENE_378,
  SCRIPT_0x5e_SCENE_379,
  SCRIPT_0x5e_SCENE_380,
  SCRIPT_0x5e_SCENE_381,
  SCRIPT_0x5e_SCENE_382,
  SCRIPT_0x5e_SCENE_383,
  SCRIPT_0x5e_SCENE_384,
  SCRIPT_0x5e_SCENE_385,
  SCRIPT_0x5e_SCENE_386,
  SCRIPT_0x5e_SCENE_387,
  SCRIPT_0x5e_SCENE_388,
  SCRIPT_0x5e_SCENE_389,
  SCRIPT_0x5e_SCENE_390,
  SCRIPT_0x5e_SCENE_391,
  SCRIPT_0x5e_SCENE_392,
  SCRIPT_0x5e_SCENE_393,
  SCRIPT_0x5e_SCENE_394,
  SCRIPT_0x5e_SCENE_395,
  SCRIPT_0x5e_SCENE_396,
  SCRIPT_0x5e_SCENE_397,
  SCRIPT_0x5e_SCENE_398,
  SCRIPT_0x5e_SCENE_399,
  SCRIPT_0x5e_SCENE_400,
  SCRIPT_0x5e_SCENE_401,
  SCRIPT_0x5e_SCENE_402,
  SCRIPT_0x5e_SCENE_403,
  SCRIPT_0x5e_SCENE_404,
  SCRIPT_0x5e_SCENE_405,
  SCRIPT_0x5e_SCENE_406,
  SCRIPT_0x5e_SCENE_407,
  SCRIPT_0x5e_SCENE_408,
  SCRIPT_0x5e_SCENE_409,
  SCRIPT_0x5e_SCENE_410,
  SCRIPT_0x5e_SCENE_411,
  SCRIPT_0x5e_SCENE_412,
  SCRIPT_0x5e_SCENE_413,
  SCRIPT_0x5e_SCENE_414,
  SCRIPT_0x5e_SCENE_415,
  SCRIPT_0x5e_SCENE_416,
  SCRIPT_0x5e_SCENE_417,
  SCRIPT_0x5e_SCENE_418,
  SCRIPT_0x5e_SCENE_419,
  SCRIPT_0x5e_SCENE_420,
  SCRIPT_0x5e_SCENE_421,
  SCRIPT_0x5e_SCENE_422,
  SCRIPT_0x5e_SCENE_423,
  SCRIPT_0x5e_SCENE_424,
  SCRIPT_0x5e_SCENE_425,
  SCRIPT_0x5e_SCENE_426,
  SCRIPT_0x5e_SCENE_427,
  SCRIPT_0x5e_SCENE_428,
  SCRIPT_0x5e_SCENE_429,
  SCRIPT_0x5e_SCENE_430,
  SCRIPT_0x5e_SCENE_431,
  SCRIPT_0x5e_SCENE_432,
  SCRIPT_0x5e_SCENE_433,
  SCRIPT_0x5e_SCENE_434,
  SCRIPT_0x5e_SCENE_435,
  SCRIPT_0x5e_SCENE_436,
  SCRIPT_0x5e_SCENE_437,
  SCRIPT_0x5e_SCENE_438,
  SCRIPT_0x5e_SCENE_439,
  SCRIPT_0x5e_SCENE_440,
  SCRIPT_0x5e_SCENE_441,
  SCRIPT_0x5e_SCENE_442,
  SCRIPT_0x5e_SCENE_443,
  SCRIPT_0x5e_SCENE_444,
  SCRIPT_0x5e_SCENE_445,
  SCRIPT_0x5e_SCENE_446,
  SCRIPT_0x5e_SCENE_447,
  SCRIPT_0x5e_SCENE_448,
  SCRIPT_0x5e_SCENE_449,
  SCRIPT_0x5e_SCENE_450,
  SCRIPT_0x5e_SCENE_451,
  SCRIPT_0x5e_SCENE_452,
  SCRIPT_0x5e_SCENE_453,
  SCRIPT_0x5e_SCENE_454,
  SCRIPT_0x5e_SCENE_455,
  SCRIPT_0x5e_SCENE_456,
  SCRIPT_0x5e_SCENE_457,
  SCRIPT_0x5e_SCENE_458,
  SCRIPT_0x5e_SCENE_459,
  SCRIPT_0x5e_SCENE_460,
  SCRIPT_0x5e_SCENE_461,
  SCRIPT_0x5e_SCENE_462,
  SCRIPT_0x5e_SCENE_463,
  SCRIPT_0x5e_SCENE_464,
  SCRIPT_0x5e_SCENE_465,
  SCRIPT_0x5e_SCENE_466,
  SCRIPT_0x5e_SCENE_467,
  SCRIPT_0x5e_SCENE_468,
  SCRIPT_0x5e_SCENE_469,
  SCRIPT_0x5e_SCENE_470,
  SCRIPT_0x5e_SCENE_471,
  SCRIPT_0x5e_SCENE_472,
  SCRIPT_0x5e_SCENE_473,
  SCRIPT_0x5e_SCENE_474,
  SCRIPT_0x5e_SCENE_475,
  SCRIPT_0x5e_SCENE_476,
  SCRIPT_0x5e_SCENE_477,
  SCRIPT_0x5e_SCENE_478,
  SCRIPT_0x5e_SCENE_479,
  SCRIPT_0x5e_SCENE_480,
  SCRIPT_0x5e_SCENE_481,
  SCRIPT_0x5e_SCENE_482,
  SCRIPT_0x5e_SCENE_483,
  SCRIPT_0x5e_SCENE_484,
  SCRIPT_0x5e_SCENE_485,
  SCRIPT_0x5e_SCENE_486,
  SCRIPT_0x5e_SCENE_487,
  SCRIPT_0x5e_SCENE_488,
  SCRIPT_0x5e_SCENE_489,
  SCRIPT_0x5e_SCENE_490,
  SCRIPT_0x5e_SCENE_491,
  SCRIPT_0x5e_SCENE_492,
  SCRIPT_0x5e_SCENE_493,
  SCRIPT_0x5e_SCENE_494,
  SCRIPT_0x5e_SCENE_495,
  SCRIPT_0x5e_SCENE_496,
  SCRIPT_0x5e_SCENE_497,
  SCRIPT_0x5e_SCENE_498,
  SCRIPT_0x5e_SCENE_499,
  SCRIPT_0x5e_SCENE_500,
  SCRIPT_0x5e_SCENE_501,
  SCRIPT_0x5e_SCENE_502,
  SCRIPT_0x5e_SCENE_503,
  SCRIPT_0x5e_SCENE_504,
  SCRIPT_0x5e_SCENE_505,
  SCRIPT_0x5e_SCENE_506,
  SCRIPT_0x5e_SCENE_507,
  SCRIPT_0x5e_SCENE_508,
  SCRIPT_0x5e_SCENE_509,
  SCRIPT_0x5e_SCENE_510,
  SCRIPT_0x5e_SCENE_511,
  SCRIPT_0x5e_SCENE_512,
  SCRIPT_0x5e_SCENE_513,
  SCRIPT_0x5e_SCENE_514,
  SCRIPT_0x5e_SCENE_515,
  SCRIPT_0x5e_SCENE_516,
  SCRIPT_0x5e_SCENE_517,
  SCRIPT_0x5e_SCENE_518,
  SCRIPT_0x5e_SCENE_519,
  SCRIPT_0x5e_SCENE_520,
  SCRIPT_0x5e_SCENE_521,
  SCRIPT_0x5e_SCENE_522,
  SCRIPT_0x5e_SCENE_523,
  SCRIPT_0x5e_SCENE_524,
  SCRIPT_0x5e_SCENE_525,
  SCRIPT_0x5e_SCENE_526,
  SCRIPT_0x5e_SCENE_527,
  SCRIPT_0x5e_SCENE_528,
  SCRIPT_0x5e_SCENE_529,
  SCRIPT_0x5e_SCENE_530,
  SCRIPT_0x5e_SCENE_531,
  SCRIPT_0x5e_SCENE_532,
  SCRIPT_0x5e_SCENE_533,
  SCRIPT_0x5e_SCENE_534,
  SCRIPT_0x5e_SCENE_535,
  SCRIPT_0x5e_SCENE_536,
  SCRIPT_0x5e_SCENE_537,
  SCRIPT_0x5e_SCENE_538,
  SCRIPT_0x5e_SCENE_539,
  SCRIPT_0x5e_SCENE_540,
  SCRIPT_0x5e_SCENE_541,
  SCRIPT_0x5e_SCENE_542,
  SCRIPT_0x5e_SCENE_543,
  SCRIPT_0x5e_SCENE_544,
  SCRIPT_0x5e_SCENE_545,
  SCRIPT_0x5e_SCENE_546,
  SCRIPT_0x5e_SCENE_547,
  SCRIPT_0x5e_SCENE_548,
  SCRIPT_0x5e_SCENE_549,
  SCRIPT_0x5e_SCENE_550,
  SCRIPT_0x5e_SCENE_551,
  SCRIPT_0x5e_SCENE_552,
  SCRIPT_0x5e_SCENE_553,
  SCRIPT_0x5e_SCENE_554,
  SCRIPT_0x5e_SCENE_555,
  SCRIPT_0x5e_SCENE_556,
  SCRIPT_0x5e_SCENE_557,
  SCRIPT_0x5e_SCENE_558,
  SCRIPT_0x5e_SCENE_559,
  SCRIPT_0x5e_SCENE_560,
  SCRIPT_0x5e_SCENE_561,
  SCRIPT_0x5e_SCENE_562,
  SCRIPT_0x5e_SCENE_563,
  SCRIPT_0x5e_SCENE_564,
  SCRIPT_0x5e_SCENE_565,
  SCRIPT_0x5e_SCENE_566,
  SCRIPT_0x5e_SCENE_567,
  SCRIPT_0x5e_SCENE_568,
  SCRIPT_0x5e_SCENE_569,
  SCRIPT_0x5e_SCENE_570,
  SCRIPT_0x5e_SCENE_571,
  SCRIPT_0x5e_SCENE_572,
  SCRIPT_0x5e_SCENE_573,
  SCRIPT_0x5e_SCENE_574,
  SCRIPT_0x5e_SCENE_575,
  SCRIPT_0x5e_SCENE_576,
  SCRIPT_0x5e_SCENE_577,
  SCRIPT_0x5e_SCENE_578,
  SCRIPT_0x5e_SCENE_579,
  SCRIPT_0x5e_SCENE_580,
  SCRIPT_0x5e_SCENE_581,
  SCRIPT_0x5e_SCENE_582,
  SCRIPT_0x5e_SCENE_583,
  SCRIPT_0x5e_SCENE_584,
  SCRIPT_0x5e_SCENE_585,
  SCRIPT_0x5e_SCENE_586,
  SCRIPT_0x5e_SCENE_587,
  SCRIPT_0x5e_SCENE_588,
  SCRIPT_0x5e_SCENE_589,
  SCRIPT_0x5e_SCENE_590,
  SCRIPT_0x5e_SCENE_591,
  SCRIPT_0x5e_SCENE_592,
  SCRIPT_0x5e_SCENE_593,
  SCRIPT_0x5e_SCENE_594,
  SCRIPT_0x5e_SCENE_595,
  SCRIPT_0x5e_SCENE_596,
  SCRIPT_0x5e_SCENE_597,
  SCRIPT_0x5e_SCENE_598,
  SCRIPT_0x5e_SCENE_599,
  SCRIPT_0x5e_SCENE_600,
  SCRIPT_0x5e_SCENE_601,
  SCRIPT_0x5e_SCENE_602,
  SCRIPT_0x5e_SCENE_603,
  SCRIPT_0x5e_SCENE_604,
  SCRIPT_0x5e_SCENE_605,
  SCRIPT_0x5e_SCENE_606,
  SCRIPT_0x5e_SCENE_607,
  SCRIPT_0x5e_SCENE_608,
  SCRIPT_0x5e_SCENE_609,
  SCRIPT_0x5e_SCENE_610,
  SCRIPT_0x5e_SCENE_611,
  SCRIPT_0x5e_SCENE_612,
  SCRIPT_0x5e_SCENE_613,
  SCRIPT_0x5e_SCENE_614,
  SCRIPT_0x5e_SCENE_615,
  SCRIPT_0x5e_SCENE_616,
  SCRIPT_0x5e_SCENE_617,
  SCRIPT_0x5e_SCENE_618,
  SCRIPT_0x5e_SCENE_619,
  SCRIPT_0x5e_SCENE_620,
  SCRIPT_0x5e_SCENE_621,
  SCRIPT_0x5e_SCENE_622,
  SCRIPT_0x5e_SCENE_623,
  SCRIPT_0x5e_SCENE_624,
  SCRIPT_0x5e_SCENE_625,
  SCRIPT_0x5e_SCENE_626,
  SCRIPT_0x5e_SCENE_627,
  SCRIPT_0x5e_SCENE_628,
  SCRIPT_0x5e_SCENE_629,
  SCRIPT_0x5e_SCENE_630,
  SCRIPT_0x5e_SCENE_631,
  SCRIPT_0x5e_SCENE_632,
  SCRIPT_0x5e_SCENE_633,
  SCRIPT_0x5e_SCENE_634,
  SCRIPT_0x5e_SCENE_635,
  SCRIPT_0x5e_SCENE_636,
  SCRIPT_0x5e_SCENE_637,
  SCRIPT_0x5e_SCENE_638,
  SCRIPT_0x5e_SCENE_639,
  SCRIPT_0x5e_SCENE_640,
  SCRIPT_0x5e_SCENE_641,
  SCRIPT_0x5e_SCENE_642,
  SCRIPT_0x5e_SCENE_643,
  SCRIPT_0x5e_SCENE_644,
  SCRIPT_0x5e_SCENE_645,
  SCRIPT_0x5e_SCENE_646,
  SCRIPT_0x5e_SCENE_647,
  SCRIPT_0x5e_SCENE_648,
  SCRIPT_0x5e_SCENE_649,
  SCRIPT_0x5e_SCENE_650,
  SCRIPT_0x5e_SCENE_651,
  SCRIPT_0x5e_SCENE_652,
  SCRIPT_0x5e_SCENE_653,
  SCRIPT_0x5e_SCENE_654,
  SCRIPT_0x5e_SCENE_655,
  SCRIPT_0x5e_SCENE_656,
  SCRIPT_0x5e_SCENE_657,
  SCRIPT_0x5e_SCENE_658,
  SCRIPT_0x5e_SCENE_659,
  SCRIPT_0x5e_SCENE_660,
  SCRIPT_0x5e_SCENE_661,
  SCRIPT_0x5e_SCENE_662,
  SCRIPT_0x5e_SCENE_663,
  SCRIPT_0x5e_SCENE_664,
  SCRIPT_0x5e_SCENE_665,
  SCRIPT_0x5e_SCENE_666,
  SCRIPT_0x5e_SCENE_667,
  SCRIPT_0x5e_SCENE_668,
  SCRIPT_0x5e_SCENE_669,
  SCRIPT_0x5e_SCENE_670,
  SCRIPT_0x5e_SCENE_671,
  SCRIPT_0x5e_SCENE_672,
  SCRIPT_0x5e_SCENE_673,
  SCRIPT_0x5e_SCENE_674,
  SCRIPT_0x5e_SCENE_675,
  SCRIPT_0x5e_SCENE_676,
  SCRIPT_0x5e_SCENE_677,
  SCRIPT_0x5e_SCENE_678,
  SCRIPT_0x5e_SCENE_679,
  SCRIPT_0x5e_SCENE_680,
  SCRIPT_0x5e_SCENE_681,
  SCRIPT_0x5e_SCENE_682,
  SCRIPT_0x5e_SCENE_683,
  SCRIPT_0x5e_SCENE_684,
  SCRIPT_0x5e_SCENE_685,
  SCRIPT_0x5e_SCENE_686,
  SCRIPT_0x5e_SCENE_687,
  SCRIPT_0x5e_SCENE_688,
  SCRIPT_0x5e_SCENE_689,
  SCRIPT_0x5e_SCENE_690,
  SCRIPT_0x5e_SCENE_691,
  SCRIPT_0x5e_SCENE_692,
  SCRIPT_0x5e_SCENE_693,
  SCRIPT_0x5e_SCENE_694,
  SCRIPT_0x5e_SCENE_695,
  SCRIPT_0x5e_SCENE_696,
  SCRIPT_0x5e_SCENE_697,
  SCRIPT_0x5e_SCENE_698,
  SCRIPT_0x5e_SCENE_699,
  SCRIPT_0x5e_SCENE_700,
  SCRIPT_0x5e_SCENE_701,
  SCRIPT_0x5e_SCENE_702,
  SCRIPT_0x5e_SCENE_703,
  SCRIPT_0x5e_SCENE_704,
  SCRIPT_0x5e_SCENE_705,
  SCRIPT_0x5e_SCENE_706,
  SCRIPT_0x5e_SCENE_707,
  SCRIPT_0x5e_SCENE_708,
  SCRIPT_0x5e_SCENE_709,
  SCRIPT_0x5e_SCENE_710,
  SCRIPT_0x5e_SCENE_711,
  SCRIPT_0x5e_SCENE_712,
  SCRIPT_0x5e_SCENE_713,
  SCRIPT_0x5e_SCENE_714,
  SCRIPT_0x5e_SCENE_715,
  SCRIPT_0x5e_SCENE_716,
  SCRIPT_0x5e_SCENE_717,
  SCRIPT_0x5e_SCENE_718,
  SCRIPT_0x5e_SCENE_719,
  SCRIPT_0x5e_SCENE_720,
  SCRIPT_0x5e_SCENE_721,
  SCRIPT_0x5e_SCENE_722,
  SCRIPT_0x5e_SCENE_723,
  SCRIPT_0x5e_SCENE_724,
  SCRIPT_0x5e_SCENE_725,
  SCRIPT_0x5e_SCENE_726,
  SCRIPT_0x5e_SCENE_727,
  SCRIPT_0x5e_SCENE_728,
  SCRIPT_0x5e_SCENE_729,
  SCRIPT_0x5e_SCENE_730,
  SCRIPT_0x5e_SCENE_731,
  SCRIPT_0x5e_SCENE_732,
  SCRIPT_0x5e_SCENE_733,
  SCRIPT_0x5e_SCENE_734,
  SCRIPT_0x5e_SCENE_735,
  SCRIPT_0x5e_SCENE_736,
  SCRIPT_0x5e_SCENE_737,
  SCRIPT_0x5e_SCENE_738,
  SCRIPT_0x5e_SCENE_739,
  SCRIPT_0x5e_SCENE_740,
  SCRIPT_0x5e_SCENE_741,
  SCRIPT_0x5e_SCENE_742,
  SCRIPT_0x5e_SCENE_743,
  SCRIPT_0x5e_SCENE_744,
  SCRIPT_0x5e_SCENE_745,
  SCRIPT_0x5e_SCENE_746,
  SCRIPT_0x5e_SCENE_747,
  SCRIPT_0x5e_SCENE_748,
  SCRIPT_0x5e_SCENE_749,
  SCRIPT_0x5e_SCENE_750,
  SCRIPT_0x5e_SCENE_751,
  SCRIPT_0x5e_SCENE_752,
  SCRIPT_0x5e_SCENE_753,
  SCRIPT_0x5e_SCENE_754,
  SCRIPT_0x5e_SCENE_755,
  SCRIPT_0x5e_SCENE_756,
  SCRIPT_0x5e_SCENE_757,
  SCRIPT_0x5e_SCENE_758,
  SCRIPT_0x5e_SCENE_759,
  SCRIPT_0x5e_SCENE_760,
  SCRIPT_0x5e_SCENE_761,
  SCRIPT_0x5e_SCENE_762,
  SCRIPT_0x5e_SCENE_763,
  SCRIPT_0x5e_SCENE_764,
  SCRIPT_0x5e_SCENE_765,
  SCRIPT_0x5e_SCENE_766,
  SCRIPT_0x5e_SCENE_767,
  SCRIPT_0x5e_SCENE_768,
  SCRIPT_0x5e_SCENE_769,
  SCRIPT_0x5e_SCENE_770,
  SCRIPT_0x5e_SCENE_771,
  SCRIPT_0x5e_SCENE_772,
  SCRIPT_0x5e_SCENE_773,
  SCRIPT_0x5e_SCENE_774,
  SCRIPT_0x5e_SCENE_775,
  SCRIPT_0x5e_SCENE_776,
  SCRIPT_0x5e_SCENE_777,
  SCRIPT_0x5e_SCENE_778,
  SCRIPT_0x5e_SCENE_779,
  SCRIPT_0x5e_SCENE_780,
  SCRIPT_0x5e_SCENE_781,
  SCRIPT_0x5e_SCENE_782,
  SCRIPT_0x5e_SCENE_783,
  SCRIPT_0x5e_SCENE_784,
  SCRIPT_0x5e_SCENE_785,
  SCRIPT_0x5e_SCENE_786,
  SCRIPT_0x5e_SCENE_787,
  SCRIPT_0x5e_SCENE_788,
  SCRIPT_0x5e_SCENE_789,
  SCRIPT_0x5e_SCENE_790,
  SCRIPT_0x5e_SCENE_791,
  SCRIPT_0x5e_SCENE_792,
  SCRIPT_0x5e_SCENE_793,
  SCRIPT_0x5e_SCENE_794,
  SCRIPT_0x5e_SCENE_795,
  SCRIPT_0x5e_SCENE_796,
  SCRIPT_0x5e_SCENE_797,
  SCRIPT_0x5e_SCENE_798,
  SCRIPT_0x5e_SCENE_799,
  SCRIPT_0x5e_SCENE_800,
  SCRIPT_0x5e_SCENE_801,
  SCRIPT_0x5e_SCENE_802,
  SCRIPT_0x5e_SCENE_803,
  SCRIPT_0x5e_SCENE_804,
  SCRIPT_0x5e_SCENE_805,
  SCRIPT_0x5e_SCENE_806,
  SCRIPT_0x5e_SCENE_807,
  SCRIPT_0x5e_SCENE_808,
  SCRIPT_0x5e_SCENE_809,
  SCRIPT_0x5e_SCENE_810,
  SCRIPT_0x5e_SCENE_811,
  SCRIPT_0x5e_SCENE_812,
  SCRIPT_0x5e_SCENE_813,
  SCRIPT_0x5e_SCENE_814,
  SCRIPT_0x5e_SCENE_815,
  SCRIPT_0x5e_SCENE_816,
  SCRIPT_0x5e_SCENE_817,
  SCRIPT_0x5e_SCENE_818,
  SCRIPT_0x5e_SCENE_819,
  SCRIPT_0x5e_SCENE_820,
  SCRIPT_0x5e_SCENE_821,
  SCRIPT_0x5e_SCENE_822,
  SCRIPT_0x5e_SCENE_823,
  SCRIPT_0x5e_SCENE_824,
  SCRIPT_0x5e_SCENE_825,
  SCRIPT_0x5e_SCENE_826,
  SCRIPT_0x5e_SCENE_827,
  SCRIPT_0x5e_SCENE_828,
  SCRIPT_0x5e_SCENE_829,
  SCRIPT_0x5e_SCENE_830,
  SCRIPT_0x5e_SCENE_831,
  SCRIPT_0x5e_SCENE_832,
  SCRIPT_0x5e_SCENE_833,
  SCRIPT_0x5e_SCENE_834,
  SCRIPT_0x5e_SCENE_835,
  SCRIPT_0x5e_SCENE_836,
  SCRIPT_0x5e_SCENE_837,
  SCRIPT_0x5e_SCENE_838,
  SCRIPT_0x5e_SCENE_839,
  SCRIPT_0x5e_SCENE_840,
  SCRIPT_0x5e_SCENE_841,
  SCRIPT_0x5e_SCENE_842,
  SCRIPT_0x5e_SCENE_843,
  SCRIPT_0x5e_SCENE_844,
  SCRIPT_0x5e_SCENE_845,
  SCRIPT_0x5e_SCENE_846,
  SCRIPT_0x5e_SCENE_847,
  SCRIPT_0x5e_SCENE_848,
  SCRIPT_0x5e_SCENE_849,
  SCRIPT_0x5e_SCENE_850,
  SCRIPT_0x5e_SCENE_851,
  SCRIPT_0x5e_SCENE_852,
  SCRIPT_0x5e_SCENE_853,
  SCRIPT_0x5e_SCENE_854,
  SCRIPT_0x5e_SCENE_855,
  SCRIPT_0x5e_SCENE_856,
  SCRIPT_0x5e_SCENE_857,
  SCRIPT_0x5e_SCENE_858,
  SCRIPT_0x5e_SCENE_859,
  SCRIPT_0x5e_SCENE_860,
  SCRIPT_0x5e_SCENE_861,
  SCRIPT_0x5e_SCENE_862,
  SCRIPT_0x5e_SCENE_863,
  SCRIPT_0x5e_SCENE_864,
  SCRIPT_0x5e_SCENE_865,
  SCRIPT_0x5e_SCENE_866,
  SCRIPT_0x5e_SCENE_867,
  SCRIPT_0x5e_SCENE_868,
  SCRIPT_0x5e_SCENE_869,
  SCRIPT_0x5e_SCENE_870,
  SCRIPT_0x5e_SCENE_871,
  SCRIPT_0x5e_SCENE_872,
  SCRIPT_0x5e_SCENE_873,
  SCRIPT_0x5e_SCENE_874,
  SCRIPT_0x5e_SCENE_875,
  SCRIPT_0x5e_SCENE_876,
  SCRIPT_0x5e_SCENE_877,
  SCRIPT_0x5e_SCENE_878,
  SCRIPT_0x5e_SCENE_879,
  SCRIPT_0x5e_SCENE_880,
  SCRIPT_0x5e_SCENE_881,
  SCRIPT_0x5e_SCENE_882,
  SCRIPT_0x5e_SCENE_883,
  SCRIPT_0x5e_SCENE_884,
  SCRIPT_0x5e_SCENE_885,
  SCRIPT_0x5e_SCENE_886,
  SCRIPT_0x5e_SCENE_887,
  SCRIPT_0x5e_SCENE_888,
  SCRIPT_0x5e_SCENE_889,
  SCRIPT_0x5e_SCENE_890,
  SCRIPT_0x5e_SCENE_891,
  SCRIPT_0x5e_SCENE_892,
  SCRIPT_0x5e_SCENE_893,
  SCRIPT_0x5e_SCENE_894,
  SCRIPT_0x5e_SCENE_895,
  SCRIPT_0x5e_SCENE_896,
  SCRIPT_0x5e_SCENE_897,
  SCRIPT_0x5e_SCENE_898,
  SCRIPT_0x5e_SCENE_899,
  SCRIPT_0x5e_SCENE_900,
  SCRIPT_0x5e_SCENE_901,
  SCRIPT_0x5e_SCENE_902,
  SCRIPT_0x5e_SCENE_903,
  SCRIPT_0x5e_SCENE_904,
  SCRIPT_0x5e_SCENE_905,
  SCRIPT_0x5e_SCENE_906,
  SCRIPT_0x5e_SCENE_907,
  SCRIPT_0x5e_SCENE_908,
  SCRIPT_0x5e_SCENE_909,
  SCRIPT_0x5e_SCENE_910,
  SCRIPT_0x5e_SCENE_911,
  SCRIPT_0x5e_SCENE_912,
  SCRIPT_0x5e_SCENE_913,
  SCRIPT_0x5e_SCENE_914,
  SCRIPT_0x5e_SCENE_915,
  SCRIPT_0x5e_SCENE_916,
  SCRIPT_0x5e_SCENE_917,
  SCRIPT_0x5e_SCENE_918,
  SCRIPT_0x5e_SCENE_919,
  SCRIPT_0x5e_SCENE_920,
  SCRIPT_0x5e_SCENE_921,
  SCRIPT_0x5e_SCENE_922,
  SCRIPT_0x5e_SCENE_923,
  SCRIPT_0x5e_SCENE_924,
  SCRIPT_0x5e_SCENE_925,
  SCRIPT_0x5e_SCENE_926,
  SCRIPT_0x5e_SCENE_927,
  SCRIPT_0x5e_SCENE_928,
  SCRIPT_0x5e_SCENE_929,
  SCRIPT_0x5e_SCENE_930,
  SCRIPT_0x5e_SCENE_931,
  SCRIPT_0x5e_SCENE_932,
  SCRIPT_0x5e_SCENE_933,
  SCRIPT_0x5e_SCENE_934,
  SCRIPT_0x5e_SCENE_935,
  SCRIPT_0x5e_SCENE_936,
  SCRIPT_0x5e_SCENE_937,
  SCRIPT_0x5e_SCENE_938,
  SCRIPT_0x5e_SCENE_939,
  SCRIPT_0x5e_SCENE_940,
  SCRIPT_0x5e_SCENE_941,
  SCRIPT_0x5e_SCENE_942,
  SCRIPT_0x5e_SCENE_943,
  SCRIPT_0x5e_SCENE_944,
  SCRIPT_0x5e_SCENE_945,
  SCRIPT_0x5e_SCENE_946,
  SCRIPT_0x5e_SCENE_947,
  SCRIPT_0x5e_SCENE_948,
  SCRIPT_0x5e_SCENE_949,
  SCRIPT_0x5e_SCENE_950,
  SCRIPT_0x5e_SCENE_951,
  SCRIPT_0x5e_SCENE_952,
  SCRIPT_0x5e_SCENE_953,
  SCRIPT_0x5e_SCENE_954,
  SCRIPT_0x5e_SCENE_955,
  SCRIPT_0x5e_SCENE_956,
  SCRIPT_0x5e_SCENE_957,
  SCRIPT_0x5e_SCENE_958,
  SCRIPT_0x5e_SCENE_959,
  SCRIPT_0x5e_SCENE_960,
  SCRIPT_0x5e_SCENE_961,
  SCRIPT_0x5e_SCENE_962,
  SCRIPT_0x5e_SCENE_963,
  SCRIPT_0x5e_SCENE_964,
  SCRIPT_0x5e_SCENE_965,
  SCRIPT_0x5e_SCENE_966,
  SCRIPT_0x5e_SCENE_967,
  SCRIPT_0x5e_SCENE_968,
  SCRIPT_0x5e_SCENE_969,
  SCRIPT_0x5e_SCENE_970,
  SCRIPT_0x5e_SCENE_971,
  SCRIPT_0x5e_SCENE_972,
  SCRIPT_0x5e_SCENE_973,
  SCRIPT_0x5e_SCENE_974,
  SCRIPT_0x5e_SCENE_975,
  SCRIPT_0x5e_SCENE_976,
  SCRIPT_0x5e_SCENE_977,
  SCRIPT_0x5e_SCENE_978,
  SCRIPT_0x5e_SCENE_979,
  SCRIPT_0x5e_SCENE_980,
  SCRIPT_0x5e_SCENE_981,
  SCRIPT_0x5e_SCENE_982,
  SCRIPT_0x5e_SCENE_983,
  SCRIPT_0x5e_SCENE_984,
  SCRIPT_0x5e_SCENE_985,
  SCRIPT_0x5e_SCENE_986,
  SCRIPT_0x5e_SCENE_987,
  SCRIPT_0x5e_SCENE_988,
  SCRIPT_0x5e_SCENE_989,
  SCRIPT_0x5e_SCENE_990,
  SCRIPT_0x5e_SCENE_991,
  SCRIPT_0x5e_SCENE_992,
  SCRIPT_0x5e_SCENE_993,
  SCRIPT_0x5e_SCENE_994,
  SCRIPT_0x5e_SCENE_995,
  SCRIPT_0x5e_SCENE_996,
  SCRIPT_0x5e_SCENE_997,
  SCRIPT_0x5e_SCENE_998,
  SCRIPT_0x5e_SCENE_999,
  SCRIPT_0x5e_SCENE_1000,
  SCRIPT_0x5e_SCENE_1001,
  SCRIPT_0x5e_SCENE_1002,
  SCRIPT_0x5e_SCENE_1003,
  SCRIPT_0x5e_SCENE_1004,
  SCRIPT_0x5e_SCENE_1005,
  SCRIPT_0x5e_SCENE_1006,
  SCRIPT_0x5e_SCENE_1007,
  SCRIPT_0x5e_SCENE_1008,
  SCRIPT_0x5e_SCENE_1009,
  SCRIPT_0x5e_SCENE_1010,
  SCRIPT_0x5e_SCENE_1011,
  SCRIPT_0x5e_SCENE_1012,
  SCRIPT_0x5e_SCENE_1013,
  SCRIPT_0x5e_SCENE_1014,
  SCRIPT_0x5e_SCENE_1015,
  SCRIPT_0x5e_SCENE_1016,
  SCRIPT_0x5e_SCENE_1017,
  SCRIPT_0x5e_SCENE_1018,
  SCRIPT_0x5e_SCENE_1019,
];

/** bank10 全部脚本 (index = 区内脚本 id) */
export const SCRIPTS_BANK_10: readonly (readonly (readonly number[])[])[] = [
  SCRIPT_0x00,
  SCRIPT_0x01,
  SCRIPT_0x02,
  SCRIPT_0x03,
  SCRIPT_0x04,
  SCRIPT_0x05,
  SCRIPT_0x06,
  SCRIPT_0x07,
  SCRIPT_0x08,
  SCRIPT_0x09,
  SCRIPT_0x0a,
  SCRIPT_0x0b,
  SCRIPT_0x0c,
  SCRIPT_0x0d,
  SCRIPT_0x0e,
  SCRIPT_0x0f,
  SCRIPT_0x10,
  SCRIPT_0x11,
  SCRIPT_0x12,
  SCRIPT_0x13,
  SCRIPT_0x14,
  SCRIPT_0x15,
  SCRIPT_0x16,
  SCRIPT_0x17,
  SCRIPT_0x18,
  SCRIPT_0x19,
  SCRIPT_0x1a,
  SCRIPT_0x1b,
  SCRIPT_0x1c,
  SCRIPT_0x1d,
  SCRIPT_0x1e,
  SCRIPT_0x1f,
  SCRIPT_0x20,
  SCRIPT_0x21,
  SCRIPT_0x22,
  SCRIPT_0x23,
  SCRIPT_0x24,
  SCRIPT_0x25,
  SCRIPT_0x26,
  SCRIPT_0x27,
  SCRIPT_0x28,
  SCRIPT_0x29,
  SCRIPT_0x2a,
  SCRIPT_0x2b,
  SCRIPT_0x2c,
  SCRIPT_0x2d,
  SCRIPT_0x2e,
  SCRIPT_0x2f,
  SCRIPT_0x30,
  SCRIPT_0x31,
  SCRIPT_0x32,
  SCRIPT_0x33,
  SCRIPT_0x34,
  SCRIPT_0x35,
  SCRIPT_0x36,
  SCRIPT_0x37,
  SCRIPT_0x38,
  SCRIPT_0x39,
  SCRIPT_0x3a,
  SCRIPT_0x3b,
  SCRIPT_0x3c,
  SCRIPT_0x3d,
  SCRIPT_0x3e,
  SCRIPT_0x3f,
  SCRIPT_0x40,
  SCRIPT_0x41,
  SCRIPT_0x42,
  SCRIPT_0x43,
  SCRIPT_0x44,
  SCRIPT_0x45,
  SCRIPT_0x46,
  SCRIPT_0x47,
  SCRIPT_0x48,
  SCRIPT_0x49,
  SCRIPT_0x4a,
  SCRIPT_0x4b,
  SCRIPT_0x4c,
  SCRIPT_0x4d,
  SCRIPT_0x4e,
  SCRIPT_0x4f,
  SCRIPT_0x50,
  SCRIPT_0x51,
  SCRIPT_0x52,
  SCRIPT_0x53,
  SCRIPT_0x54,
  SCRIPT_0x55,
  SCRIPT_0x56,
  SCRIPT_0x57,
  SCRIPT_0x58,
  SCRIPT_0x59,
  SCRIPT_0x5a,
  SCRIPT_0x5b,
  SCRIPT_0x5c,
  SCRIPT_0x5d,
  SCRIPT_0x5e,
];
 

export default SCRIPTS_BANK_10;