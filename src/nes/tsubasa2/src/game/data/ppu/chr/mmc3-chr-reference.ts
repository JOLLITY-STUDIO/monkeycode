/**
 * MMC3 CHR bank 映射 — 参考实现 (仅校验, 不启用)
 *
 * 直接移植 tsnes mapper4.ts 的 CHR 部分 ($8000 bank select + $8001 bank data
 * → 8 个 1KB slot)。H5 游戏不启用此映射 (直接 import 16×8KB CHR bank),
 * 本模块仅用于:
 *   1. 校验反编译/转写过程中出现的 MMC3 寄存器写序列是否符合硬件语义
 *   2. 把 (chrBanks[8], tile, patternTable) 翻译成 H5 (bank, tile)
 *
 * 语义 (与 mapper4.ts 完全一致):
 *   $8000: value & 7 = command; bit7 = chrAddressSelect (0=前 4K 2×1K 可配)
 *   $8001: 按 command 写对应 slot
 *     cmd0: slot0/1 = arg/arg+1   (2×1K @ $0000)
 *     cmd1: slot2/3 = arg/arg+1   (2×1K @ $0800)
 *     cmd2: slot4   = arg         (1K @ $1000)
 *     cmd3: slot5   = arg         (1K @ $1400)
 *     cmd4: slot6   = arg         (1K @ $1800)
 *     cmd5: slot7   = arg         (1K @ $1C00)
 *   chrAddressSelect=1 时 cmd0/1 与 cmd2-5 的 4 个 slot 互换 (4K 页换位)。
 */

import { mapChrSlotToH5, type ChrSlotMapResult } from './chr-slot-mapper';

export const MMC3_CMD_2_1K_0000 = 0;
export const MMC3_CMD_2_1K_0800 = 1;
export const MMC3_CMD_1K_1000 = 2;
export const MMC3_CMD_1K_1400 = 3;
export const MMC3_CMD_1K_1800 = 4;
export const MMC3_CMD_1K_1C00 = 5;
export const MMC3_CMD_PRG_PAGE1 = 6;
export const MMC3_CMD_PRG_PAGE2 = 7;

/** MMC3 寄存器写日志条目 */
export interface Mmc3ChrWriteLog {
  /** CPU 地址 ($8000/$8001, 未掩码) */
  addr: number;
  value: number;
  /** 帧序号 */
  frame: number;
}

/** MMC3 CHR bank 参考状态快照 */
export interface Mmc3ChrSnapshot {
  command: number;
  chrAddressSelect: number;
  prgAddressSelect: number;
  /** 8 个 1KB slot */
  chrBanks: number[];
  /** 校验摘要: 与模拟器比对用 */
  digest: string;
}

/**
 * MMC3 CHR bank 参考状态机 (纯函数式, 无硬件依赖)。
 * 仅用于校验: 把模拟器 trace 的 $8000/$8001 写序列喂进来,
 * 输出与模拟器完全一致的 chrBanks 状态。
 */
export class Mmc3ChrReference {
  command = 0;
  chrAddressSelect = 0;
  prgAddressSelect = 0;
  prgAddressChanged = false;
  /** 8 个 1KB slot 值 (模拟器 chrBanks 语义) */
  chrBanks = new Uint8Array(8);
  /** 写日志 (校验用) */
  writeLog: Mmc3ChrWriteLog[] = [];

  /** 重置到初始状态 (与 mapper4.loadROM 后一致: 全部 slot = 0) */
  reset(): void {
    this.command = 0;
    this.chrAddressSelect = 0;
    this.prgAddressSelect = 0;
    this.prgAddressChanged = false;
    this.chrBanks.fill(0);
    this.writeLog.length = 0;
  }

  /**
   * 喂入一条 CPU 写 (地址自动按 $E001 掩码分发)。
   * 仅处理 $8000/$8001; 其他地址记录但忽略。
   */
  write(addr: number, value: number, frame = 0): void {
    this.writeLog.push({ addr: addr & 0xffff, value, frame });
    switch (addr & 0xe001) {
      case 0x8000:
        this.command = value & 7;
        this.prgAddressChanged = (value >> 6) & 1 !== this.prgAddressSelect;
        this.prgAddressSelect = (value >> 6) & 1;
        this.chrAddressSelect = (value >> 7) & 1;
        break;
      case 0x8001:
        this.executeCommand(this.command, value);
        break;
      default:
        break;
    }
  }

  /** 执行 $8001 bank data (CHR 部分; PRG cmd 6/7 仅记录) */
  executeCommand(cmd: number, arg: number): void {
    const swap = this.chrAddressSelect === 1;
    switch (cmd) {
      case MMC3_CMD_2_1K_0000:
        if (!swap) {
          this.chrBanks[0] = arg & 0xff;
          this.chrBanks[1] = (arg + 1) & 0xff;
        } else {
          this.chrBanks[4] = arg & 0xff;
          this.chrBanks[5] = (arg + 1) & 0xff;
        }
        break;
      case MMC3_CMD_2_1K_0800:
        if (!swap) {
          this.chrBanks[2] = arg & 0xff;
          this.chrBanks[3] = (arg + 1) & 0xff;
        } else {
          this.chrBanks[6] = arg & 0xff;
          this.chrBanks[7] = (arg + 1) & 0xff;
        }
        break;
      case MMC3_CMD_1K_1000:
        if (!swap) this.chrBanks[4] = arg & 0xff;
        else this.chrBanks[0] = arg & 0xff;
        break;
      case MMC3_CMD_1K_1400:
        if (!swap) this.chrBanks[5] = arg & 0xff;
        else this.chrBanks[1] = arg & 0xff;
        break;
      case MMC3_CMD_1K_1800:
        if (!swap) this.chrBanks[6] = arg & 0xff;
        else this.chrBanks[2] = arg & 0xff;
        break;
      case MMC3_CMD_1K_1C00:
        if (!swap) this.chrBanks[7] = arg & 0xff;
        else this.chrBanks[3] = arg & 0xff;
        break;
      case MMC3_CMD_PRG_PAGE1:
      case MMC3_CMD_PRG_PAGE2:
        // PRG 映射 — H5 不启用, 记录即可
        break;
    }
  }

  /** 当前状态快照 (含摘要) */
  snapshot(): Mmc3ChrSnapshot {
    const arr = Array.from(this.chrBanks);
    return {
      command: this.command,
      chrAddressSelect: this.chrAddressSelect,
      prgAddressSelect: this.prgAddressSelect,
      chrBanks: arr,
      digest: arr.map((v) => v.toString(16).padStart(2, '0')).join(''),
    };
  }

  /** 与模拟器 chrBanks (Uint8Array|number[]) 比对, 返回是否一致 */
  matches(emuChrBanks: Uint8Array | number[]): boolean {
    if (emuChrBanks.length !== 8) return false;
    for (let i = 0; i < 8; i++) {
      if (this.chrBanks[i] !== (emuChrBanks[i] & 0xff)) return false;
    }
    return true;
  }

  /**
   * 把 (tile, patternTable) 翻译成 H5 (bank, tile)。
   * 委托给 chr-slot-mapper.mapChrSlotToH5。
   */
  mapToH5(tile: number, patternTable: 0 | 1): ChrSlotMapResult | null {
    return mapChrSlotToH5(this.chrBanks, tile, patternTable);
  }
}

/** 便捷工厂: 从模拟器 chrBanks 构建参考对象 (校验时对比用) */
export function fromEmuChrBanks(emu: Uint8Array | number[]): Mmc3ChrReference {
  const ref = new Mmc3ChrReference();
  for (let i = 0; i < 8; i++) ref.chrBanks[i] = emu[i] & 0xff;
  return ref;
}
