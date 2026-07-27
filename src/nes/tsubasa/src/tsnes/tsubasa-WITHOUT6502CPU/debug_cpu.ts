/**
 * ============================================================================
 * DebugCpu — 带 MMC3 CHR 写入追踪的 CPU
 *
 * 重写 write() 方法：当 CPU 写 $8000/$8001 时，记录当前 PC 和寄存器状态。
 * 写 $9E-$A1（ZP 中 CHR bank 镜像）时也记录。
 * 用于反向分析原始 ROM 中哪段 PRG 代码触发了 CHR bank 切换。
 * ============================================================================
 */

import { TsubasaCpu } from './cpu';

export interface Mmc3WriteRecord {
  /** CPU 执行到该指令时的 PC */
  pc: number;
  /** 当前帧号 (外部注入) */
  frame: number;
  /** 写地址: 0x8000 或 0x8001 */
  addr: number;
  /** 写入值 */
  val: number;
  /** 如果是 0x8000: command number (低3位) + prgSelect (bit6) + chrSelect (bit7) */
  command?: number;
  prgSelect?: number;
  chrSelect?: number;
  /** 如果是 0x8001: 被选的 bank 号 */
  bankNumber?: number;
  /** 当时的 A/X/Y 寄存器 (用于推断参数来源) */
  regA: number;
  regX: number;
  regY: number;
  /** 当时的栈指针 */
  regSP: number;
  /** 当前 CHR bank 镜像 ($9E-$A1) */
  chrBanks: string;
}

export interface ChrZPWriteRecord {
  pc: number;
  frame: number;
  addr: number; // 0x9E-0xA1
  val: number;
  regA: number;
  regX: number;
  regY: number;
}

export type TraceCallback = (record: Mmc3WriteRecord | ChrZPWriteRecord) => void;

export class DebugCpu extends TsubasaCpu {
  /** 外部回调，每次 MMC3/CHR bank 写入时触发 */
  onTrace: TraceCallback | null = null;
  /** 外部注入的当前帧号 */
  currentFrame: number = 0;
  /** 上次记录到的 MMC3 command */
  private _lastCommand: number = -1;

  write(addr: number, val: number): void {
    // 在父类 write 之前记录（因为父类会隐式修改 PPU cycle，但 PC 不变）
    const doLog = (
      addr === 0x8000 ||
      addr === 0x8001 ||
      (addr >= 0x9E && addr <= 0xA1)
    );

    let record: Mmc3WriteRecord | ChrZPWriteRecord | null = null;

    if (doLog && this.onTrace) {
      if (addr === 0x8000 || addr === 0x8001) {
        const cmd = addr === 0x8000 ? (val & 7) : this._lastCommand;
        const prgSel = addr === 0x8000 ? ((val >> 6) & 1) : undefined;
        const chrSel = addr === 0x8000 ? ((val >> 7) & 1) : undefined;

        record = {
          pc: this._instrPC,
          frame: this.currentFrame,
          addr,
          val,
          command: cmd,
          prgSelect: prgSel,
          chrSelect: chrSel,
          bankNumber: addr === 0x8001 ? val : undefined,
          regA: this.REG_ACC,
          regX: this.REG_X,
          regY: this.REG_Y,
          regSP: this.REG_SP,
          chrBanks: '', // 在回调后填充
        };

        if (addr === 0x8000) {
          this._lastCommand = cmd;
        }
      } else if (addr >= 0x9E && addr <= 0xA1) {
        record = {
          pc: this._instrPC,
          frame: this.currentFrame,
          addr,
          val,
          regA: this.REG_ACC,
          regX: this.REG_X,
          regY: this.REG_Y,
        };
      }
    }

    // 执行原始写操作
    super.write(addr, val);

    // 写完后回调（此时可读取 mem 中的 CHR bank 镜像）
    if (record && this.onTrace) {
      if ('chrBanks' in record) {
        const mem = this.mem;
        record.chrBanks = [0x9E, 0x9F, 0xA0, 0xA1]
          .map(a => mem[a])
          .map(v => v.toString(16).toUpperCase().padStart(2, '0'))
          .join(' ');
      }
      this.onTrace(record);
    }
  }
}

/**
 * 工厂函数：创建 DebugCpu
 * 通过 TsubasaNes 的 cpuFactory 注入
 */
export function createDebugCpu(nes: any): DebugCpu {
  return new DebugCpu(nes);
}
