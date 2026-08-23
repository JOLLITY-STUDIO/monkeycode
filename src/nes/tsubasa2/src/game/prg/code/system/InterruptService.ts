/**
 * InterruptService — 每帧中断/渲染管线（原 bank30 NMI $C76E + bank02 NMI 渲染 $8000）
 *
 * @bank 30 ($C76E) / 02 ($8000)
 *
 * 对应原始地址：
 *   $C76E: NMI 入口 — ram_001B bit6 决定走游戏逻辑路径（$C421）或主渲染路径（$C775）
 *   $C775: 主渲染 NMI — OAM DMA / $0498 渲染缓冲队列 / 调色板 / 滚动 / MASK / CHR bank
 *   $8000: bank02 NMI 渲染子程 — $05E8 渲染缓冲 / 滚动 / 手柄读取 / 帧计数
 *   $C9E9: CHR bank 配置（MMC3）
 *
 * H5 语义：外层每帧调用 nmi()；本服务负责
 *   1. 手柄读取（bank02 语义）
 *   2. 场景帧更新（游戏逻辑，经由 BootRouter）
 *   3. 渲染提交：$05E8 缓冲 / $0498 队列 / OAM / 调色板 / 滚动 / CTRL/MASK
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import type { BootRouter } from './BootRouter';
import type { AudioService } from '../audio/AudioService';

/** 渲染目标抽象（H5 下由 core PPU 实现；测试可注入假目标） */
export interface PpuTarget {
  writeMem(address: number, value: number): void;
  spriteMem: Uint8Array;
  updateControlReg1(value: number): void;
  updateControlReg2(value: number): void;
  /** 滚动寄存器（可直接写） */
  regHT: number; regFH: number; regH: number;
  regV: number; regVT: number; regFV: number;
}

export class InterruptService {
  private router: BootRouter | null = null;
  private audio: AudioService | null = null;

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
  ) {}

  /** 注入场景路由（BootRouter） */
  attachRouter(router: BootRouter): void {
    this.router = router;
  }

  /** 注入音频服务（每帧推进音频引擎） */
  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  /**
   * 每帧 NMI（$C76E 语义）
   * @param frame 帧号
   */
  nmi(frame: number): void {
    const store = this.store;
    store.frame = frame;
    // 1. 手柄读取（bank02 $80D7 语义）
    this.input.readControllers();
    // 2. 音频引擎帧推进（bank12 $80BA 语义）
    this.audio?.update();
    // 3. 场景帧更新（游戏逻辑；v0.1 场景为 stub）
    this.router?.update(frame);
    // 4. 主渲染路径标志（$C775: ram_001B bit7 置位）
    store.writeByte(0x001b, store.readByte(0x001b) | 0x80);
  }

  /**
   * 渲染提交（$C775 + bank02 $8000 语义）：
   * CTRL/MASK → 滚动 → $05E8 缓冲 → $0498 队列 → OAM → 调色板
   */
  renderCommit(ppu: PpuTarget): void {
    const store = this.store;
    // PPU CTRL/MASK
    ppu.updateControlReg1(store.readByte(0x0020));
    ppu.updateControlReg2(store.readByte(0x0021));
    // 滚动：X = ram_004A + ram_0538（$C7B7 语义），Y = ram_004B
    const sx = (store.readByte(0x004a) + store.readByte(0x0538)) & 0xff;
    const sy = store.readByte(0x004b) & 0xff;
    ppu.regHT = (sx >> 3) & 31;
    ppu.regFH = sx & 7;
    ppu.regH = (sx >> 5) & 1;
    ppu.regVT = (sy >> 3) & 31;
    ppu.regFV = sy & 7;
    ppu.regV = (sy >> 5) & 1;
    // $05E8 渲染缓冲（bank02 $8019 语义）：[count|0x80, addrLo, addrHi, data×count...]，0 终止
    this.flushNtBuffer(ppu);
    // $0498 延迟缓冲队列（$C8FB 语义）
    this.flushRenderQueue(ppu);
    // OAM $0200 → spriteMem（$C78B OAM DMA 语义）
    const oam = store.oamBuffer;
    for (let i = 0; i < 0x100; i++) ppu.spriteMem[i] = oam[i];
    // 调色板：ram_062A（BG）/ ram_063A（SPR）→ PPU $3F00/$3F10
    this.flushPalette(ppu);
  }

  /** $05E8 渲染缓冲：entries [count|0x80, addrLo, addrHi, data...]，byte0=0 结束 */
  private flushNtBuffer(ppu: PpuTarget): void {
    const buf = this.store.ntRenderBuffer;
    let x = 0;
    while (x + 3 <= 0x18) {
      const b0 = buf[x] & 0xff;
      if ((b0 & 0x80) === 0) break; // 结束标记
      const count = b0 & 0x3f;
      const addr = (buf[x + 2] << 8) | buf[x + 1];
      for (let i = 0; i < count && x + 3 + i < 0x18; i++) {
        ppu.writeMem(addr + i, buf[x + 3 + i]);
      }
      x += 3 + count;
    }
    // 缓冲消费后清零（原版 NMI 末尾 STA $0628=0 语义）
    this.store.writeByte(0x0628, 0);
  }

  /** $0498 渲染缓冲队列（$C8FB）：每项 3 字节 [bank|0x80, ptrLo, ptrHi] */
  private flushRenderQueue(_ppu: PpuTarget): void {
    const store = this.store;
    const count = store.readByte(0x0498);
    if (count === 0) return;
    // TODO V0.2/V0.3: 完整翻译 $C8FB 数据流（渲染命令流解析）
    store.writeByte(0x0498, 0);
  }

  /** 调色板：ram_062A+16（BG）→ $3F00；ram_063A+16（SPR）→ $3F10 */
  private flushPalette(ppu: PpuTarget): void {
    const store = this.store;
    for (let i = 0; i < 0x10; i++) {
      ppu.writeMem(0x3f00 + i, store.readByte(0x062a + i));
    }
    for (let i = 0; i < 0x10; i++) {
      ppu.writeMem(0x3f10 + i, store.readByte(0x063a + i));
    }
  }
}
