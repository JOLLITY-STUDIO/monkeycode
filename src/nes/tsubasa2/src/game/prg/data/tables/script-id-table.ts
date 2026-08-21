/**
 * 脚本 ID 表 $8AEC — 脚本 id → (脚本 bank, 区内偏移)
 *
 * 原始表 ($8AEE 起为阈值, $8AEF 起为 bank):
 *   scriptId < 0x10 (16) → bank 3, 区内偏移 = scriptId - 0
 *   scriptId < 0x20 (32) → bank 4, 区内偏移 = scriptId - 16
 *   scriptId < 0x60 (96) → bank 5, 区内偏移 = scriptId - 32
 *   scriptId < 0xFF      → bank 6, 区内偏移 = scriptId - 96
 *
 * 与 $8464 scriptLoader 逻辑一致。
 */
export interface ScriptIdEntry {
  /** 脚本所在 bank (3-6) */
  bank: number;
  /** 区内偏移 (进入该 bank $A000 指针表的下标*2) */
  offset: number;
}

const SCRIPT_ID_THRESHOLDS: readonly number[] = [0x00, 0x10, 0x20, 0x60, 0xff];
const SCRIPT_ID_BANKS: readonly number[] = [0x03, 0x04, 0x05, 0x06];

/** 脚本 id → (bank, 偏移) 映射 */
export function scriptIdLookup(scriptId: number): ScriptIdEntry | undefined {
  const id = scriptId & 0xff;
  for (let i = 0; i < SCRIPT_ID_BANKS.length; i++) {
    const lo = SCRIPT_ID_THRESHOLDS[i];
    const hi = SCRIPT_ID_THRESHOLDS[i + 1];
    if (id >= lo && id < hi) {
      return { bank: SCRIPT_ID_BANKS[i], offset: id - lo };
    }
  }
  return undefined;
}

/** 脚本 id → 判定 bank (<0x10→3 / <0x20→4 / <0x60→5 / else→6) */
export function scriptIdToBank(scriptId: number): number {
  const id = scriptId & 0xff;
  if (id < 0x10) return 3;
  if (id < 0x20) return 4;
  if (id < 0x60) return 5;
  return 6;
}
