/**
 * InterruptService — 每帧中断/渲染管线
 *
 * 职责：
 *   1. nmi(frame) — 每帧入口：手柄读取 → 音频推进 → 场景路由更新 → 主渲染路径标志
 *   2. renderCommit(ppu) — 渲染提交：flush VRAM → OAM DMA → 渲染队列消费 →
 *      滚动 → CTRL/MASK → CHR 装载 → 调色板落地
 *
 * 协作：
 *   - PpuTarget：渲染目标抽象（写穿 + 扫描线参数；core PPU 满足该结构）
 *   - DataStore.flushVram：VRAM 直写语义（无目标时挂起，attach 后 flush）
 *   - loadChrBank(slot, bank1k)：CH pattern table 装载（runtime 注入；缺省跳过）
 *
 * 流水线按原版 NMI 顺序提交，所有 bank 切换寄存器写已省略（数据已声明式化）。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import type { BootRouter } from './BootRouter';
import type { AudioService } from '../audio/AudioService';

/** 渲染目标抽象 */
export interface PpuTarget {
  writeMem(address: number, value: number): void;
  spriteMem: Uint8Array;
  updateControlReg1(value: number): void;
  updateControlReg2(value: number): void;
  /** 滚动寄存器（可直接写） */
  regHT: number; regFH: number; regH: number;
  regV: number; regVT: number; regFV: number;
  /**
   * 装载 CHR 1KB bank 到 pattern table 指定 slot。
   * slot: 0-7 → PPU 地址 slot*$0400（$0000/$0400/.../$1C00）。
   * 由 runtime 实现（映射到 Mapper4.load1kVromBank）；未提供时跳过动态装载。
   */
  loadChrBank?(slot: number, bank1k: number): void;
}

export class InterruptService {
  private router: BootRouter | null = null;
  private audio: AudioService | null = null;

  /** 已应用 CHR 槽位缓存（仅装载变化槽位） */
  private readonly chrSlots: number[] = new Array(8).fill(-1);

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
  ) {}

  /** 注入场景路由 */
  attachRouter(router: BootRouter): void {
    this.router = router;
  }

  /** 注入音频服务（每帧推进音频引擎） */
  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  /**
   * 每帧 NMI：
   * 1. 手柄读取
   * 2. 音频引擎帧推进
   * 3. 场景帧更新（游戏逻辑路径）
   * 4. 主渲染路径标志置位
   * @param frame 帧号
   */
  nmi(frame: number): void {
    const store = this.store;
    store.frame = frame;
    this.input.readControllers();
    this.audio?.update();
    this.router?.update(frame);
    store.writeByte(0x001b, store.readByte(0x001b) | 0x80);
  }

  /**
   * 渲染提交：
   * 1. flush VRAM（游戏逻辑期的 VRAM 直写落地）
   * 2. 关 NMI + 应用 CTRL
   * 3. OAM DMA（影子 → spriteMem）
   * 4. 渲染队列消费（第一/第二队列，LIFO，每帧消费队尾一项）
   * 5. 主滚动（X=$004A+$0538, Y=$004B）
   * 6. MASK + CHR 装载 + 帧计数器
   * 7. 续段：OAM DMA（幂等）+ NT 缓冲 + 滚动路径（最终生效）+ bank02 CHR
   * 8. 恢复 NMI + 调色板兜底
   */
  renderCommit(ppu: PpuTarget): void {
    const store = this.store;
    // 1. flush VRAM 直写
    store.flushVram(ppu);

    // 2. 关 NMI 并应用
    const ctrlOff = store.readByte(0x0020) & 0x7f;
    store.writeByte(0x0020, ctrlOff);
    ppu.updateControlReg1(ctrlOff);

    // 3. OAM DMA（影子 $0468 → $0200 → spriteMem）
    this.oamDma(ppu);

    // 4. 渲染队列消费（LIFO）
    this.flushRenderQueue(ppu);
    this.flushSecondQueue(ppu);

    // 5. 主滚动（X=$004A+$0538, Y=$004B）
    this.applyScrollC7B7(ppu);

    // 6. MASK + CHR + 帧计数器
    ppu.updateControlReg2(store.readByte(0x0021) & 0xff);
    this.applyChrRequest(ppu);
    this.frameCounters();

    // 7. 续段
    this.oamDma(ppu);                     // OAM DMA（幂等）
    this.flushNtBuffer(ppu);              // NT 渲染缓冲
    this.applyScrollBank02(ppu);          // 滚动路径（最终生效）
    this.applyChrFrom009e(ppu);           // bank02 CHR

    // 8. 恢复 NMI
    const ctrlOn = store.readByte(0x0020) | 0x80;
    store.writeByte(0x0020, ctrlOn & 0xff);
    store.writeByte(0x0019, ctrlOn & 0xff);
    ppu.updateControlReg1(ctrlOn & 0xff);

    // 调色板兜底：ram_062A/063A → $3F00/$3F10
    this.flushPalette(ppu);
  }

  /**
   * OAM DMA（$0468 影子 → $0200 → spriteMem）。
   * 影子 $0468 中属性 bit2/3 非零 → X=$F8（隐藏）。
   */
  private oamDma(ppu: PpuTarget): void {
    const store = this.store;
    const oam = store.oamBuffer;
    for (let y = 0; y < 0x100; y += 4) {
      let x = store.readByte(0x0468 + y);
      const attr = store.readByte(0x046a + y);
      if ((attr & 0x0c) !== 0) x = 0xf8;
      oam[y] = x;
      oam[y + 1] = store.readByte(0x0469 + y);
      oam[y + 2] = attr;
      oam[y + 3] = store.readByte(0x046b + y);
    }
    for (let i = 0; i < 0x100; i++) ppu.spriteMem[i] = oam[i];
  }

  /** 主滚动：X=$004A+$0538, Y=$004B */
  private applyScrollC7B7(ppu: PpuTarget): void {
    const store = this.store;
    const sx = (store.readByte(0x004a) + store.readByte(0x0538)) & 0xff;
    const sy = store.readByte(0x004b) & 0xff;
    this.setScroll(ppu, sx, sy);
  }

  /**
   * 滚动路径（最终生效）：
   * - $0079 bit7 → 文本滚动路径（设置 VRAM 地址基址）
   * - 否则：CTRL bit2 ← $0045 bit0 ← $007B bit0 → PPU CTRL
   * - X=$007A, Y=$0044-1
   */
  private applyScrollBank02(ppu: PpuTarget): void {
    const store = this.store;
    const s79 = store.readByte(0x0079) & 0xff;
    if ((s79 & 0x80) !== 0) {
      // 文本滚动路径
      return;
    }
    let ctrl = (store.readByte(0x0020) >> 2) & 0xff;
    store.writeByte(0x0020, ctrl);
    ctrl = ((ctrl << 1) | (store.readByte(0x0045) & 1)) & 0xff;
    store.writeByte(0x0020, ctrl);
    ctrl = ((ctrl << 1) | (store.readByte(0x007b) & 1)) & 0xff;
    store.writeByte(0x0020, ctrl);
    ppu.updateControlReg1(ctrl);
    const sx = store.readByte(0x007a) & 0xff;
    const sy = (store.readByte(0x0044) - 1) & 0xff;
    this.setScroll(ppu, sx, sy);
  }

  /** 滚动值 → PPU 滚动寄存器 */
  private setScroll(ppu: PpuTarget, sx: number, sy: number): void {
    ppu.regHT = (sx >> 3) & 31;
    ppu.regFH = sx & 7;
    ppu.regH = (sx >> 5) & 1;
    ppu.regVT = (sy >> 3) & 31;
    ppu.regFV = sy & 7;
    ppu.regV = (sy >> 5) & 1;
  }

  /**
   * 帧计数器更新：
   * - 累加器 = (ram_0300+X + ram_0700+X) 带进位 → ADC ram_00E2 → SBC ram_0780+X → ADC ram_00E1
   * - INC ram_00E1
   * 注：进位来自前一步 ADC 结果，STA $00E2 存的是加法结果。
   */
  private frameCounters(): void {
    const store = this.store;
    let c = 0;
    const e1 = store.readByte(0x00e1);
    let sum = store.readByte(0x0300 + e1) + store.readByte(0x0700 + e1) + c;
    let a = sum & 0xff;
    c = sum > 0xff ? 1 : 0;
    let e2 = store.readByte(0x00e2);
    const cRol1 = (e2 >> 7) & 1;
    e2 = ((e2 << 1) | c) & 0xff;
    a ^= 0xff;
    const cRol2 = (e2 >> 7) & 1;
    e2 = ((e2 << 1) | cRol1) & 0xff;
    sum = a + e2 + cRol2;
    a = sum & 0xff;
    c = sum > 0xff ? 1 : 0;
    store.writeByte(0x00e2, a);
    let s = a - store.readByte(0x0780 + e1) - (1 - c);
    a = s & 0xff;
    c = s >= 0 ? 1 : 0;
    sum = a + e1 + c;
    a = sum & 0xff;
    store.writeByte(0x00e3, a);
    store.writeByte(0x00e1, (e1 + 1) & 0xff);
  }

  /**
   * NT 渲染缓冲消费（64 字节，[count|0x80, addrLo, addrHi, data×count...]）：
   * - bit7=0 行模式（count 字节顺序写）
   * - bit7=1 列模式（count&0x3F 字节按 +32 步长写）
   * - 终止标 0
   * 渲染期间临时 MASK=0，完成后由后续 MASK 步骤恢复。
   */
  private flushNtBuffer(ppu: PpuTarget): void {
    const store = this.store;
    if (store.readByte(0x0628) === 0) return;
    if ((store.readByte(0x0629) & 0x40) !== 0) return;
    const savedMask = store.readByte(0x0021);
    store.writeByte(0x0021, 0);
    ppu.updateControlReg2(0);
    const buf = store.ntRenderBuffer;
    let x = 0;
    while (x + 3 <= 0x40) {
      const b0 = buf[x] & 0xff;
      if (b0 === 0) break;
      const vertical = (b0 & 0x80) !== 0;
      const count = vertical ? (b0 & 0x3f) : b0;
      const ctrl = vertical ? 0x84 : 0x80;
      ppu.updateControlReg1(ctrl);
      store.writeByte(0x0020, ctrl);
      const addr = (buf[x + 2] << 8) | buf[x + 1];
      const step = vertical ? 32 : 1;
      for (let i = 0; i < count && x + 3 + i < 0x40; i++) {
        ppu.writeMem((addr + i * step) & 0x3fff, buf[x + 3 + i]);
      }
      x += 3 + count;
    }
    store.writeByte(0x0628, 0);
    store.writeByte(0x0021, savedMask);
  }

  /**
   * 第一渲染队列消费：
   * - 计数>0 → DEC；index=(count-1)*3；条目 [bank][ptrLo][ptrHi]
   * - 流格式：RLE 块 [count][addrLo][addrHi][data×count]，0 终止
   * - 流仅指向工作 RAM（PRG 流已提取为声明式表，无 ROM 字节读取）
   * - 每帧消费队尾一项（LIFO）
   */
  private flushRenderQueue(ppu: PpuTarget): void {
    const store = this.store;
    const count = store.readByte(0x0498);
    if (count === 0) return;
    store.writeByte(0x0498, (count - 1) & 0xff);
    const idx = (count - 1) * 3;
    const bank = store.readByte(0x0499 + idx);
    const lo = store.readByte(0x049a + idx);
    const hi = store.readByte(0x049b + idx);
    const ptr = (hi << 8) | lo;
    void bank;
    let p = ptr;
    for (;;) {
      const b0 = this.readStreamByte(bank, p);
      if (b0 === 0) break;
      const aLo = this.readStreamByte(bank, p + 1);
      const aHi = this.readStreamByte(bank, p + 2);
      p += 3;
      const addr = (aHi << 8) | aLo;
      for (let i = 0; i < b0; i++) {
        ppu.writeMem(addr & 0x3fff, this.readStreamByte(bank, p + i));
      }
      p += b0;
    }
  }

  /**
   * 流字节读取（仅指向工作 RAM）。
   * - $0000-$07FF: 工作 RAM
   * - $2000-$3FFF: PPU 寄存器/未映射区不作为流
   */
  private readStreamByte(bank: number, addr: number): number {
    void bank;
    if (addr < 0x2000) {
      return this.store.readByte(addr & 0x7ff);
    }
    return 0;
  }

  /**
   * 第二渲染队列消费：
   * - $0515 bit7 置位（待消费）→ 清标志；$04A5 起 RLE 块 [count][addrLo][addrHi][data×count]
   */
  private flushSecondQueue(ppu: PpuTarget): void {
    const store = this.store;
    const flag = store.readByte(0x0515);
    if ((flag & 0x80) === 0) return;
    store.writeByte(0x0515, 0);
    let x = 0;
    for (;;) {
      const cnt = store.readByte(0x04a5 + x);
      if (cnt === 0) break;
      const aLo = store.readByte(0x04a5 + x + 1);
      const aHi = store.readByte(0x04a5 + x + 2);
      x += 3;
      const addr = (aHi << 8) | aLo;
      for (let i = 0; i < cnt; i++) {
        ppu.writeMem(addr & 0x3fff, store.readByte(0x04a5 + x + i));
      }
      x += cnt;
    }
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

  /**
   * CHR 装载（基于 ram_0022  + ram_0490-$0497 请求表）：
   * - $0022 bit0-2 cmd 基址；bit7 chrSel
   * - 装载 8 个 1KB slot 到 PPU pattern table
   */
  private applyChrRequest(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    const base = store.readByte(0x0022);
    const cmdBase = base & 7;
    const chrSel = (base >> 7) & 1;
    let x = chrSel !== 0 ? 4 : 0;
    this.mmc3ChrWrite(ppu, cmdBase, chrSel, store.readByte(0x0490 + x));
    this.mmc3ChrWrite(ppu, cmdBase | 1, chrSel, store.readByte(0x0491 + x));
    x ^= 4;
    for (let y = 2; y <= 5; y++) {
      this.mmc3ChrWrite(ppu, y | base, chrSel, store.readByte(0x0490 + x));
      x++;
    }
  }

  /**
   * bank02 CHR：cmd 2-5 ← $009E-$00A1（chrSel=0 → slots 4-7）。
   */
  private applyChrFrom009e(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    this.mmc3ChrWrite(ppu, 2, 0, store.readByte(0x009e));
    this.mmc3ChrWrite(ppu, 3, 0, store.readByte(0x009f));
    this.mmc3ChrWrite(ppu, 4, 0, store.readByte(0x00a0));
    this.mmc3ChrWrite(ppu, 5, 0, store.readByte(0x00a1));
  }

  /** CHR 写解码：cmd 0-5 选择 slot，cmd 6/7 为 PRG ROM page（H5 无语义） */
  private mmc3ChrWrite(ppu: PpuTarget, cmd: number, chrSel: number, arg: number): void {
    const bank = arg & 0xff;
    switch (cmd & 7) {
      case 0:
        if (chrSel === 0) { this.loadChrSlot(ppu, 0, bank); this.loadChrSlot(ppu, 1, bank + 1); }
        else { this.loadChrSlot(ppu, 4, bank); this.loadChrSlot(ppu, 5, bank + 1); }
        break;
      case 1:
        if (chrSel === 0) { this.loadChrSlot(ppu, 2, bank); this.loadChrSlot(ppu, 3, bank + 1); }
        else { this.loadChrSlot(ppu, 6, bank); this.loadChrSlot(ppu, 7, bank + 1); }
        break;
      case 2: this.loadChrSlot(ppu, chrSel === 0 ? 4 : 0, bank); break;
      case 3: this.loadChrSlot(ppu, chrSel === 0 ? 5 : 1, bank); break;
      case 4: this.loadChrSlot(ppu, chrSel === 0 ? 6 : 2, bank); break;
      case 5: this.loadChrSlot(ppu, chrSel === 0 ? 7 : 3, bank); break;
      default: break; // cmd 6/7 = PRG ROM page，H5 无语义
    }
  }

  /** 装载单个 1KB CHR slot（值未变化时跳过，避免每帧重复拷贝） */
  private loadChrSlot(ppu: PpuTarget, slot: number, bank1k: number): void {
    const b = bank1k & 0xff;
    if (this.chrSlots[slot] === b) return;
    this.chrSlots[slot] = b;
    ppu.loadChrBank!(slot, b);
  }
}