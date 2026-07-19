/**
 * VDP 端口 I/O 处理器
 *
 * 模拟 68K CPU 对 VDP 端口的读写操作:
 * - $C00000: VDP 数据端口 (16-bit, word aligned)
 * - $C00004: VDP 控制端口 (16-bit)
 * - $C00008: HV 计数器 (只读)
 * - $C00011: PSG 端口
 *
 * 控制端口的 Word 协议:
 * - 第一字 (高位): CD1 CD0 A13 A12 ... A00
 * - 第二字 (低位): A15 A14 ... (8 bits unused)
 *
 * 寄存器写协议:
 * - 第一字: 1 0 tt tttt vvvv vvvv
 */

import { VDP_PORTS } from '../core/types';
import { VdpChip } from './VdpChip';

export class VdpPorts {
  private vdp: VdpChip;

  /** 控制端口 pending half-word (等待第二个字) */
  private ctrlPending: number = 0;
  private ctrlPhase: 0 | 1 = 0;

  constructor(vdp: VdpChip) {
    this.vdp = vdp;
  }

  // ============================================================
  // 端口读
  // ============================================================

  /** 读 VDP 端口 (16-bit word) */
  read(addr: number): number {
    switch (addr) {
      case VDP_PORTS.DATA:
        // 根据上次 CD 决定读 VRAM/CRAM/VSRAM
        if ((this.ctrlPending & 0xC000) === 0x0000) {
          return this.vdp.vram.readData();
        } else if ((this.ctrlPending & 0xC000) === 0x8000) {
          return this.vdp.cram.readColor();
        }
        // VSRAM 读 (CD=0100)
        return 0;

      case VDP_PORTS.CTRL:
        this.ctrlPhase = 0;
        return this.vdp.readStatus();

      case VDP_PORTS.HV:
        return this.vdp.readHV();

      default:
        return 0;
    }
  }

  // ============================================================
  // 端口写
  // ============================================================

  /** 写 VDP 端口 (16-bit word) */
  write(addr: number, value: number): void {
    switch (addr) {
      case VDP_PORTS.DATA:
        this.writeData(value);
        break;

      case VDP_PORTS.CTRL:
        this.writeCtrl(value);
        break;

      default:
        break;
    }
  }

  // ============================================================
  // 数据端口
  // ============================================================

  private writeData(value: number): void {
    const cd = (this.ctrlPending >> 14) & 0x03;
    switch (cd) {
      case 0x00: // VRAM 读 (通常不用)
        break;
      case 0x01: // VRAM 写
        this.vdp.vram.writeData(value);
        break;
      case 0x02: // CRAM 读
        break;
      case 0x03: // CRAM 写
        this.vdp.cram.writeColor(value);
        break;
    }
  }

  // ============================================================
  // 控制端口
  // ============================================================

  /**
   * 控制端口写 — 两阶段协议
   *
   * CD1 CD0 A13-A00 → 地址高位
   * 或 10 0 tt tttt vvvv vvvv → 寄存器写 (单阶段, bit13=0)
   * 或 10 1 0 00 AA AA AA AA → CRAM 写地址设置 (单阶段, bit13=1)
   *
   * Phase 0: 第一个字, 检查是否有单阶段命令
   * Phase 1: 第二个字 (完整地址的低位)
   */
  private writeCtrl(value: number): void {
    const cd = (value >> 14) & 0x03; // bits 15-14

    if (cd === 2) {
      // CD=10: 单阶段命令
      if ((value & 0x2000) === 0) {
        // bit13=0: Register write → 10 0 RS4-RS0 D7-D0
        const reg = (value >> 8) & 0x1F;
        const val = value & 0xFF;
        this.vdp.writeRegister(reg, val);
        // Store the write for DMA flag purposes (bits 5-4)
        this.ctrlPending = value;
        this.ctrlPhase = 0;
      } else {
        // bit13=1: CRAM write address setup → 10 1 0 00 AA9-AA0
        // Currently simplified — full CRAM address handling deferred
        this.vdp.vram.setCramAddress(value);
        this.ctrlPhase = 0;
      }
      return;
    }

    if (this.ctrlPhase === 0) {
      // CD=00 (VRAM rd), CD=01 (VRAM wr), CD=11 (CRAM rd)
      // Phase 1: store CD + A0-A13
      this.ctrlPending = value;
      this.ctrlPhase = 1;
    } else {
      // Phase 2: low 2 address bits A14-A15 + unused 6 bits
      this.ctrlPhase = 0;
      this.vdp.vram.setAddress(this.ctrlPending, value);
    }
  }

  /** 重置控制端口状态 */
  reset(): void {
    this.ctrlPending = 0;
    this.ctrlPhase = 0;
  }
}
