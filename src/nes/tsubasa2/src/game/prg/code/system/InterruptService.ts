/**
 * InterruptService — 每帧中断/渲染管线（用具名视图 + 类型化队列）
 *
 * 翻译原则（v2）：
 *   - 队列操作用具名 RamView（store.renderQueue.ntBuffer / queue1Count / ...）
 *   - NT 缓冲解析通过 RenderQueues.consumeNtBuffer 返回类型化条目（无字节流手解）
 *   - CHR 装载走 PpuTarget.loadChrBank 抽象（无 MMC3 寄存器直读）
 *   - 所有数据通过具名视图 store.ppuState / store.scene / store.fade 访问
 *
 * 流水线按原版 NMI 顺序提交，bank 切换寄存器写已彻底省略。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import type { BootRouter } from './BootRouter';
import type { AudioService } from '../audio/AudioService';
import { consumeNtBuffer } from '../../data/store/RenderQueues';

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
   * 由 runtime 实现（声明式 slot map；未提供时跳过动态装载）。
   */
  loadChrBank?(slot: number, bank1k: number): void;
}

/** PPU 帧缓冲（8 个 1KB slot 的 bank1k 索引） */
type ChrSlotIndex = ReadonlyArray<number>;

export class InterruptService {
  private router: BootRouter | null = null;
  private audio: AudioService | null = null;
  /** CHR 8 slot 已装载 bank1k 缓存（变更检测） */
  private readonly chrSlots: ChrSlotIndex = new Array(8).fill(-1);

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
   */
  nmi(frame: number): void {
    const store = this.store;
    store.frame = frame;
    this.input.readControllers();
    this.audio?.update();
    this.router?.update(frame);
    store.scene.flags |= 0x80;
  }

  /**
   * 渲染提交：
   * 1. flush VRAM（游戏逻辑期的 VRAM 直写落地）
   * 2. 关 NMI 并应用 CTRL
   * 3. OAM DMA（影子 → spriteMem）
   * 4. 渲染队列消费（LIFO）
   * 5. 主滚动
   * 6. MASK + CHR 装载
   * 7. 续段
   * 8. 恢复 NMI + 调色板兜底
   */
  renderCommit(ppu: PpuTarget): void {
    const store = this.store;
    // 1. flush VRAM 直写
    store.flushVram(ppu);

    // 2. 关 NMI 并应用
    const ctrlOff = store.ppuState.ctrl & 0x7f;
    store.ppuState.ctrl = ctrlOff;
    ppu.updateControlReg1(ctrlOff);

    // 3. OAM DMA（影子 → spriteMem）
    this.oamDma(ppu);

    // 4. 渲染队列消费（LIFO）
    this.flushRenderQueue(ppu);
    this.flushSecondQueue(ppu);

    // 5. 主滚动（X=ppuState.scrollTempX, Y=ppuState.scrollTempY）
    this.applyScrollC7B7(ppu);

    // 6. MASK + CHR + 帧计数器
    ppu.updateControlReg2(store.ppuState.mask);
    this.applyChrRequest(ppu);
    this.frameCounters();

    // 7. 续段
    this.oamDma(ppu);
    this.flushNtBuffer(ppu);
    this.applyScrollBank02(ppu);
    this.applyChrFrom009e(ppu);

    // 8. 恢复 NMI
    const ctrlOn = store.ppuState.ctrl | 0x80;
    store.ppuState.ctrl = ctrlOn;
    ppu.updateControlReg1(ctrlOn);

    // 调色板兜底：palette.bg/spr → $3F00/$3F10
    this.flushPalette(ppu);
  }

  /**
   * OAM DMA（影子 → spriteMem）。
   * 影子 $0468 中属性 bit2/3 非零 → X=$F8（隐藏）。
   *
   * ⚠ byte-order 注意事项：
   *   当前实现按 H5 内部约定写 oam[y..y+3] = [X, tile, attr, spriteY]（匹配
   *   PPU.spriteRamWriteUpdate 的 sprY/sprTile/sprAttr/sprX unpack 异常，
   *   此为已存在实现，本文不修 - 见 DEVLOG #5 / WBS Y4）。
   *   dumpOam 通过 ppu.sprY[] 读取时, byte-order 与 NES 标准 [Y, tile, attr, X] 不一致。
   */
  private oamDma(ppu: PpuTarget): void {
    const store = this.store;
    const oam = store.oam.oam;
    for (let y = 0; y < 0x100; y += 4) {
      let x = store.oam.spriteX(y);
      const attr = store.oam.spriteAttr(y);
      if ((attr & 0x0c) !== 0) x = 0xf8;
      oam[y] = x;
      oam[y + 1] = store.oam.spriteTile(y);
      oam[y + 2] = attr;
      oam[y + 3] = store.oam.spriteY(y);
    }
    for (let i = 0; i < 0x100; i++) ppu.spriteMem[i] = oam[i];
  }

  /** 主滚动：X = ppuState.scrollTempX, Y = ppuState.scrollTempY */
  private applyScrollC7B7(ppu: PpuTarget): void {
    const store = this.store;
    const sx = store.ppuState.scrollTempX & 0xff;
    const sy = store.ppuState.scrollTempY & 0xff;
    this.setScroll(ppu, sx, sy);
  }

  /**
   * 滚动路径（最终生效）：
   * - scene.scrollFlag bit7 → 文本滚动路径
   * - 否则：CTRL bit2 ← $0045 bit0 ← $007B bit0 → PPU CTRL
   * - X=scene.scrollX, Y=scene.scrollY-1
   */
  private applyScrollBank02(ppu: PpuTarget): void {
    const store = this.store;
    const scrollFlag = store.scene.scrollFlag;
    if ((scrollFlag & 0x80) !== 0) return;
    let ctrl = (store.ppuState.ctrl >> 2) & 0xff;
    store.ppuState.ctrl = ctrl;
    ctrl = ((ctrl << 1) | (store.readByte(0x0045) & 1)) & 0xff;
    store.ppuState.ctrl = ctrl;
    ctrl = ((ctrl << 1) | (store.readByte(0x007b) & 1)) & 0xff;
    store.ppuState.ctrl = ctrl;
    ppu.updateControlReg1(ctrl);
    const sx = store.scene.scrollX & 0xff;
    const sy = (store.scene.scrollY - 1) & 0xff;
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

  /** 帧计数器更新（具名视图访问） */
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
   * NT 渲染缓冲消费（类型化 RenderQueues.consumeNtBuffer）
   * 渲染期间临时 MASK=0，完成后由后续 MASK 步骤恢复。
   */
  private flushNtBuffer(ppu: PpuTarget): void {
    const store = this.store;
    if (store.renderQueue.ntBufferBusy) return;
    const entries = consumeNtBuffer(store.renderQueue);
    if (entries.length === 0) return;
    const savedMask = store.ppuState.mask;
    store.ppuState.mask = 0;
    ppu.updateControlReg2(0);
    for (const entry of entries) {
      const ctrl = entry.vertical ? 0x84 : 0x80;
      ppu.updateControlReg1(ctrl);
      store.ppuState.ctrl = ctrl;
      for (let i = 0; i < entry.data.length; i++) {
        const step = entry.vertical ? 32 : 1;
        ppu.writeMem((entry.ntAddr + i * step) & 0x3fff, entry.data[i]);
      }
    }
    store.renderQueue.setNtBufferPos(0);
    store.ppuState.mask = savedMask;
  }

  /**
   * 第一渲染队列消费（LIFO，每帧消费队尾一项）
   * 流格式：RLE 块 [count][addrLo][addrHi][data×count]，0 终止
   */
  private flushRenderQueue(ppu: PpuTarget): void {
    const store = this.store;
    const rq = store.renderQueue;
    const count = rq.queue1Count;
    if (count === 0) return;
    rq.setQueue1Count((count - 1) & 0xff);
    const entry = rq.queue1Entry(count - 1);
    if (!entry) return;
    let p = entry.addr;
    for (;;) {
      const b0 = this.readStreamByte(p);
      if (b0 === 0) break;
      const aLo = this.readStreamByte(p + 1);
      const aHi = this.readStreamByte(p + 2);
      p += 3;
      const addr = (aHi << 8) | aLo;
      for (let i = 0; i < b0; i++) {
        ppu.writeMem(addr & 0x3fff, this.readStreamByte(p + i));
      }
      p += b0;
    }
  }

  /**
   * 流字节读取（仅指向工作 RAM）。
   * - $0000-$07FF: 工作 RAM
   */
  private readStreamByte(addr: number): number {
    if (addr < 0x2000) return this.store.readByte(addr & 0x7ff);
    return 0;
  }

  /**
   * 第二渲染队列消费：
   * - renderQueue.queue2Pending 置位（待消费）→ 清标志；$04A5 起 RLE 块
   */
  private flushSecondQueue(ppu: PpuTarget): void {
    const store = this.store;
    const rq = store.renderQueue;
    if (!rq.queue2Pending) return;
    rq.setQueue2Pending(false);
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

  /** 调色板：palette.bg → $3F00；palette.spr → $3F10 */
  private flushPalette(ppu: PpuTarget): void {
    const store = this.store;
    const bg = store.palette.bg;
    const spr = store.palette.spr;
    for (let i = 0; i < 0x10; i++) ppu.writeMem(0x3f00 + i, bg[i]);
    for (let i = 0; i < 0x10; i++) ppu.writeMem(0x3f10 + i, spr[i]);
  }

  /**
   * CHR 装载（基于 loadChrConfig 写入的 6 字节 cfg → 8 slot bank1k 推算）：
   * - $0075 (cfg[0]) = BG 区域 slot 0 bank1k 起始（slot 0-3 连续 4 个）
   * - $0076 (cfg[1]) = SPR 区域 slot 4 bank1k 起始（slot 4-7 连续 4 个）
   * - 其他 4 字节 cfg[2..5] 是参数（flip/width/offset），不直接映射 bank
   * - chrSel 由 $005D bit 2 决定（切高位 4-7 还是低位 0-3）
   *
   * 注：ROM 真实行为是 VBlank 期间多次切 bank（frame 30 切 276 次），
   *     此处只用 cfg 字节做"单次声明式"装载（每帧调一次）。
   *     后续若需要 mid-frame 切换，需翻译 ROM $8BAB 之后那段循环。
   */
  private applyChrRequest(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    const bg = store.readByte(0x0075) & 0xff;
    const spr = store.readByte(0x0076) & 0xff;
    const chrSel = (store.readByte(0x005d) >> 2) & 1;
    if (chrSel === 0) {
      this.loadChrSlot(ppu, 0, bg);
      this.loadChrSlot(ppu, 1, bg + 1);
      this.loadChrSlot(ppu, 2, bg + 2);
      this.loadChrSlot(ppu, 3, bg + 3);
      this.loadChrSlot(ppu, 4, spr);
      this.loadChrSlot(ppu, 5, spr + 1);
      this.loadChrSlot(ppu, 6, spr + 2);
      this.loadChrSlot(ppu, 7, spr + 3);
    } else {
      this.loadChrSlot(ppu, 4, bg);
      this.loadChrSlot(ppu, 5, bg + 1);
      this.loadChrSlot(ppu, 6, bg + 2);
      this.loadChrSlot(ppu, 7, bg + 3);
      this.loadChrSlot(ppu, 0, spr);
      this.loadChrSlot(ppu, 1, spr + 1);
      this.loadChrSlot(ppu, 2, spr + 2);
      this.loadChrSlot(ppu, 3, spr + 3);
    }
  }

  /**
   * bank02 CHR：cmd 2-5 ← $009E-$00A1（chrSel=0 → slots 4-7）。
   */
  private applyChrFrom009e(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    this.chrWrite(ppu, 2, 0, store.readByte(0x009e));
    this.chrWrite(ppu, 3, 0, store.readByte(0x009f));
    this.chrWrite(ppu, 4, 0, store.readByte(0x00a0));
    this.chrWrite(ppu, 5, 0, store.readByte(0x00a1));
  }

  /** CHR 写解码：cmd 0-5 选择 slot，cmd 6/7 为 PRG ROM page（H5 无语义） */
  private chrWrite(ppu: PpuTarget, cmd: number, chrSel: number, arg: number): void {
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
      default: break;
    }
  }

  /** 装载单个 1KB CHR slot（值未变化时跳过） */
  private loadChrSlot(ppu: PpuTarget, slot: number, bank1k: number): void {
    const b = bank1k & 0xff;
    if (this.chrSlots[slot] === b) return;
    this.chrSlots[slot] = b;
    ppu.loadChrBank!(slot, b);
  }
}