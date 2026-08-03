/**
 * CPU 内存空间
 * 模拟 NES 的完整 64KB CPU 地址空间
 * 不是逐字节模拟，而是根据游戏逻辑需求提供结构化的读写接口
 */

import { MEMORY_MAP, ZP, RAM, PPU_REG, APU_REG } from '../rom/types';
import { Mmc1Mapper } from '../mapper/Mmc1Mapper';

/** 整个 64KB CPU 地址空间 */
const CPU_MEM_SIZE = 0x10000;

export class CpuMemory {
  /** 原始内存缓冲区 (用于 Zero Page / Stack / Work RAM) */
  readonly data: Uint8Array;

  /** PPU 寄存器镜像 */
  ppuCtrl: number = 0;     // $2000
  ppuMask: number = 0;     // $2001
  ppuStatus: number = 0;   // $2002
  oamAddr: number = 0;     // $2003
  oamData: number = 0;     // $2004
  ppuScroll: number = 0;   // $2005
  ppuAddr: number = 0;     // $2006
  ppuData: number = 0;     // $2007

  /** PPU 地址锁存器 (双写) */
  ppuAddrLatch: number = 0;  // 高字节先写
  ppuAddrTemp: number = 0;

  /** 手柄状态 */
  joypad1State: number = 0;
  joypad2State: number = 0;
  joypad1Strobe: number = 0;
  joypad2Strobe: number = 0;

  /** PRG-ROM 引用 */
  private prgRom: Uint8Array[];
  private mmc1: Mmc1Mapper;

  constructor(prgRom: Uint8Array[], mmc1: Mmc1Mapper) {
    this.data = new Uint8Array(CPU_MEM_SIZE);
    this.prgRom = prgRom;
    this.mmc1 = mmc1;
  }

  /** 读取内存 */
  read(address: number): number {
    address &= 0xFFFF;

    // Zero Page + Stack + Work RAM: $0000-$07FF
    if (address <= 0x07FF) {
      return this.data[address];
    }

    // PPU 寄存器: $2000-$2007
    if (address >= 0x2000 && address <= 0x2007) {
      return this.readPpuReg(address);
    }
    // PPU 镜像: $2008-$3FFF
    if (address <= 0x3FFF) {
      return this.readPpuReg(0x2000 + (address & 0x07));
    }

    // APU / 手柄: $4000-$4017
    if (address >= 0x4000 && address <= 0x4017) {
      return this.readApuReg(address);
    }

    // PRG-ROM: $8000-$FFFF
    if (address >= 0x8000) {
      return this.readPrgRom(address);
    }

    // 未映射区域返回 0
    return 0;
  }

  /** 写入内存 */
  write(address: number, value: number): void {
    address &= 0xFFFF;
    value &= 0xFF;

    // Zero Page + Stack + Work RAM: $0000-$07FF
    if (address <= 0x07FF) {
      this.data[address] = value;
      return;
    }

    // PPU 寄存器: $2000-$2007
    if (address >= 0x2000 && address <= 0x2007) {
      this.writePpuReg(address, value);
      return;
    }
    // PPU 镜像: $2008-$3FFF
    if (address <= 0x3FFF) {
      this.writePpuReg(0x2000 + (address & 0x07), value);
      return;
    }

    // APU / 手柄: $4000-$4017
    if (address >= 0x4000 && address <= 0x4017) {
      this.writeApuReg(address, value);
      return;
    }

    // MMC1: $8000-$FFFF (所有写入都会触发 MMC1)
    if (address >= 0x8000) {
      this.mmc1.write(address, value);
      return;
    }
  }

  private readPpuReg(address: number): number {
    switch (address) {
      case PPU_REG.PPUSTATUS:
        // 读取后清除 VBlank 标志
        const status = this.ppuStatus;
        this.ppuStatus &= 0x7F; // 清除 bit7
        this.ppuAddrLatch = 0;
        return status;
      case PPU_REG.OAMDATA:
        return this.oamData;
      case PPU_REG.PPUDATA:
        return this.ppuData;
      default:
        // 只写寄存器返回 0
        return 0;
    }
  }

  private writePpuReg(address: number, value: number): void {
    switch (address) {
      case PPU_REG.PPUCTRL:
        this.ppuCtrl = value;
        break;
      case PPU_REG.PPUMASK:
        this.ppuMask = value;
        break;
      case PPU_REG.OAMADDR:
        this.oamAddr = value;
        break;
      case PPU_REG.OAMDATA:
        this.oamData = value;
        break;
      case PPU_REG.PPUSCROLL:
        this.ppuScroll = value;
        break;
      case PPU_REG.PPUADDR:
        if (this.ppuAddrLatch === 0) {
          this.ppuAddrTemp = (value & 0x3F) << 8;
          this.ppuAddrLatch = 1;
        } else {
          this.ppuAddrTemp |= value;
          this.ppuAddr = this.ppuAddrTemp & 0x3FFF;
          this.ppuAddrLatch = 0;
        }
        break;
      case PPU_REG.PPUDATA:
        this.ppuData = value;
        // PPU 地址自动递增 (1 或 32，取决于 PPUCTRL bit2)
        const inc = (this.ppuCtrl & 0x04) ? 32 : 1;
        this.ppuAddr = (this.ppuAddr + inc) & 0x3FFF;
        break;
    }
  }

  private readApuReg(address: number): number {
    switch (address) {
      case APU_REG.JOY1:
        return this.readJoypad(1);
      case APU_REG.JOY2:
        return this.readJoypad(2);
      default:
        return 0;
    }
  }

  private writeApuReg(address: number, value: number): void {
    switch (address) {
      case APU_REG.OAMDMA:
        // OAM DMA: 从 CPU 内存复制 256 字节到 OAM
        const srcAddr = value << 8;
        for (let i = 0; i < 256; i++) {
          this.data[MEMORY_MAP.OAM_BUFFER_START + i] = this.data[srcAddr + i];
        }
        break;
      case APU_REG.JOY1:
        // $4016 写入: bit0 控制 strobe
        if (value & 0x01) {
          this.joypad1Strobe = 0;
          this.joypad2Strobe = 0;
        }
        break;
    }
  }

  /** 读取手柄 (模拟 $4016/$4017 移位寄存器) */
  private readJoypad(player: number): number {
    const state = player === 1 ? this.joypad1State : this.joypad2State;
    const strobe = player === 1 ? this.joypad1Strobe : this.joypad2Strobe;

    if (strobe >= 8) {
      return 1; // 所有按钮读完后返回 1
    }

    const bit = (state >> strobe) & 1;
    if (player === 1) this.joypad1Strobe++;
    else this.joypad2Strobe++;
    return bit | 0x40; // bit6 通常为 1 (标准手柄)
  }

  /** 读取 PRG-ROM */
  private readPrgRom(address: number): number {
    if (address < 0xC000) {
      // $8000-$BFFF: 可切换 Bank
      const bank = this.mmc1.getPrgBank();
      return this.prgRom[bank][address - 0x8000];
    } else {
      // $C000-$FFFF: 固定 Bank (最后一个)
      const bank = this.mmc1.getFixedPrgBank();
      return this.prgRom[bank][address - 0xC000];
    }
  }

  // ===== 便捷访问器 =====

  /** 读取 Zero Page */
  get zp(): Uint8Array {
    return this.data.subarray(0, 0x100);
  }

  /** 读取堆栈 */
  get stack(): Uint8Array {
    return this.data.subarray(0x100, 0x200);
  }

  /** 读取 OAM 缓冲区 */
  get oam(): Uint8Array {
    return this.data.subarray(0x200, 0x300);
  }

  /** 读取工作 RAM */
  get workRam(): Uint8Array {
    return this.data.subarray(0x300, 0x800);
  }

  /** 帧计数器 */
  get frameCounter(): number {
    return this.data[RAM.FRAME_COUNTER];
  }

  /** 游戏状态 */
  get gameState(): number {
    return this.data[RAM.GAME_STATE];
  }

  set gameState(v: number) {
    this.data[RAM.GAME_STATE] = v;
  }

  /** 场景状态 */
  get sceneState(): number {
    return this.data[RAM.SCENE_STATE];
  }

  set sceneState(v: number) {
    this.data[RAM.SCENE_STATE] = v;
  }

  /** 手柄1当前帧 */
  get joy1Current(): number {
    return this.data[RAM.JOY1_CUR];
  }

  set joy1Current(v: number) {
    this.data[RAM.JOY1_CUR] = v;
  }

  /** 手柄1前一帧 */
  get joy1Previous(): number {
    return this.data[RAM.JOY1_PREV];
  }

  set joy1Previous(v: number) {
    this.data[RAM.JOY1_PREV] = v;
  }

  /** 滚动 X */
  get scrollX(): number {
    return this.data[ZP.SCROLL_X];
  }

  /** 滚动 Y */
  get scrollY(): number {
    return this.data[ZP.SCROLL_Y];
  }

  /** PPU MASK 缓存 */
  get ppuMaskCache(): number {
    return this.data[ZP.PPU_MASK_CACHE];
  }

  /** PPU CTRL 缓存 */
  get ppuCtrlCache(): number {
    return this.data[ZP.PPU_CTRL_CACHE];
  }

  /** MMC1 写入锁 */
  get mmc1Lock(): number {
    return this.data[ZP.MMC1_LOCK];
  }

  set mmc1Lock(v: number) {
    this.data[ZP.MMC1_LOCK] = v;
  }

  /** 清零内存区域 */
  clearRange(start: number, end: number): void {
    this.data.fill(0, start, end);
  }
}
