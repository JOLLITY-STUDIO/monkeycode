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
import { SCENE_END_BANK_TABLE } from '../../data/tables/scene-end-bank-table';

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
type ChrSlotIndex = number[];

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
  renderCommit(ppu: PpuTarget, frame: number = this.store.frame): void {
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
    // WBS L4+L5: mid-frame CHR switch — 按 $005E/$005F stream 解析 cmd 序列,
    //   在 VBlank 后期 (scanline 0..16) 一次性推进, 模拟 ROM 多次切 bank 行为
    this.midFrameChrSwitch(ppu, 0);
    this.frameCounters();

    // 7. 续段
    this.oamDma(ppu);
    this.flushNtBuffer(ppu);
    this.applyScrollBank02(ppu);
    this.applyChrFrom009e(ppu);
    // WBS L4 V2: per-scene end-of-frame CHR bank 强制覆盖（查表, 替代不稳定 stream parser）
    this.applySceneEndBankOverride(ppu, frame);

    // 8. 恢复 NMI
    const ctrlOn = store.ppuState.ctrl | 0x80;
    store.ppuState.ctrl = ctrlOn;
    ppu.updateControlReg1(ctrlOn);

    // 调色板兜底：palette.bg/spr → $3F00/$3F10
    this.flushPalette(ppu);
  }

  /**
   * OAM DMA（影子 → spriteMem）。
   *
   * Byte order: NES 标准 [Y, tile, attr, X] (PPU.spriteRamWriteUpdate 按此解)。
   * 之前的 [X, tile, attr, Y] 是反了, 现在修正.
   *
   * ⚠ attr mask 检查：
   *   原来 `(attr & 0x0c) !== 0 → X=0xF8` 是错的（0x0c 是 palette group 位），
   *   实际 NES 隐藏条件是 Y >= 0xEF；attr bit 不参与 X 隐藏。
   *   emu-reference frame 30 OAM idx 1-24 都是 attr=2 但 x 正常 → 验证此 mask 错。
   */
  private oamDma(ppu: PpuTarget): void {
    const store = this.store;
    const oam = store.oam.oam;
    for (let y = 0; y < 0x100; y += 4) {
      const yPos = store.oam.spriteY(y);
      const xPos = store.oam.spriteX(y);
      const attr = store.oam.spriteAttr(y);
      // NES 标准: Y >= 0xEF → 隐藏 (Y 自动 offscreen). X 字段不动.
      void yPos;
      oam[y] = yPos;                                  // NES byte 0 = Y
      oam[y + 1] = store.oam.spriteTile(y);           // NES byte 1 = tile
      oam[y + 2] = attr;                              // NES byte 2 = attr
      oam[y + 3] = xPos;                              // NES byte 3 = X
    }
    const updateFn = (ppu as any).spriteRamWriteUpdate;
    for (let i = 0; i < 0x100; i++) {
      ppu.spriteMem[i] = oam[i];
      if (typeof updateFn === 'function') updateFn.call(ppu, i, oam[i]);
    }
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
   * Boot 期 primeBootState — WBS_FRAME13 F4 + F5
   *
   * 把 boot 时已经计算好的 shadow OAM 与 调色板强制推到 PPU, 不等 renderCommit.
   * 替代方案: 等 frame 1 renderCommit 自然跑 (但 OAM DMA boot 顺序与 sprite count == 0
   * 时机冲突 — frame 1 早期 PPU 仍 0).
   *
   * ⚠ OAM 写入必须逐字节调 spriteRamWriteUpdate(), 让 PPU 同步 unpack sprY/sprTile/sprCol/sprX;
   * 直接写 spriteMem 不会触发 unpack (PPU dumpOam/sprY 仍 0).
   *
   * @param ppu PPU 渲染目标
   */
  primeBootState(ppu: PpuTarget): void {
    // 1. 调色板立即推 PPU palette RAM ($3F00-$3F1F)
    this.flushPalette(ppu);
    // 2. OAM 立即推 PPU spriteMem + 触发 unpack
    const oam = this.store.oam.oam;
    const updateFn = (ppu as any).spriteRamWriteUpdate;
    for (let i = 0; i < 0x100; i++) {
      ppu.spriteMem[i] = oam[i];
      if (typeof updateFn === 'function') updateFn.call(ppu, i, oam[i]);
    }
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
   * WBS L6：扩展到 cmd 0/1 (高 bank slots 0-3) + 跳过 cmd 6/7（PRG ROM page，H5 忽略）。
   */
  private applyChrFrom009e(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    const chrSel = (store.readByte(0x005d) >> 2) & 1;
    // cmd 2-5 (slot-pair 0/1 / 2/3 — bg→高 bank 区域)
    this.chrWrite(ppu, 2, chrSel, store.readByte(0x009e));
    this.chrWrite(ppu, 3, chrSel, store.readByte(0x009f));
    this.chrWrite(ppu, 4, chrSel, store.readByte(0x00a0));
    this.chrWrite(ppu, 5, chrSel, store.readByte(0x00a1));
    // WBS L6: 补 cmd 0/1 (banks slots 0/2 - 之前的覆盖范围未含)
    this.chrWrite(ppu, 0, chrSel, store.readByte(0x009c));
    this.chrWrite(ppu, 1, chrSel, store.readByte(0x009d));
    // cmd 6/7 = PRG ROM page select（H5 无 PRG bank 模拟 - 不处理）
  }

  // ──────────────────────────── WBS L4: Mid-frame CHR switch ──────────────

  /**
   * PRG $8BAB+ 翻译（V2）：mid-frame CHR switch 主入口。
   *
   * 在 renderCommit 时机从 $005E/$005F 读 stream 指针, 按 (cmdHi, arg)
   * 字节流解析 cmd 0..5 全部命令, 对每条调 chrWrite。当前粒度为单次推进 (不细化 per-scanline)。
   *
   * 关键观察：EMU 在同一 frame 中多次调用 writePrgBank8000/8001,
   *   一组 bankWrite 写入 4 个 slot (e.g. slot 0-3), 然后再写另一组 (slot 4-7)。
   *   H5 在 renderCommit 末尾一次性把 frame 内所有写入 applied,
   *   应用顺序 = 数组顺序, 最后一组 win。
   *
   * @param scanline  当前正在绘制的 scanline（0..240；0=刚进入 VBlank 写结束）
   * @returns 本次解析消耗的 entry 数量（用于调试 / 限流）
   */
  midFrameChrSwitch(ppu: PpuTarget, scanline: number): number {
    if (!ppu.loadChrBank) return 0;
    const store = this.store;
    const ptrLo = store.readByte(0x005e);
    const ptrHi = store.readByte(0x005f);
    if (ptrLo === 0 && ptrHi === 0) return 0;

    let consumed = 0;
    let off = (ptrHi << 8) | ptrLo;
    const chrSel = (store.readByte(0x005d) >> 2) & 1;
    // RLE entry: byte[0]=count 可选（不清零 = 终止）, byte[1]=(cmdHi|argHi), byte[2]=arg lo
    const limit = 64;
    while (consumed < limit) {
      // 我们采用 ROM 8BAB 的 RLE 解析：byte[Y+0]=count, byte[Y+1]=(cmd|high), byte[Y+2]=arg
      const b0 = store.readByte(off & 0x3fff);
      const b1 = store.readByte((off + 1) & 0x3fff);
      const b2 = store.readByte((off + 2) & 0x3fff);
      const cmdHi = (b1 >> 5) & 0x07;
      // 0 entry count = 终止; 或 cmdHi=0 也算终止
      if (b0 === 0 || cmdHi === 0) break;
      const cmd = cmdHi & 0x07;
      // cmd 0-5: CHR bank1k switch (覆盖 applyChrRequest 写的 8 slot)
      // cmd 6-7: PRG ROM page (H5 无 PRG bank 模拟, 跳过)
      if (cmd <= 5) {
        this.chrWrite(ppu, cmd, chrSel, b2);
      }
      // 入口长度：ROM 8BAB 每次循环加 6 byte (LDA #$00; STA $0060; LDY #$01; LDA ($0070),Y)
      //   但 RLE count 不同 entry 长度不同。这里按 3 byte/entry 推进（最小单位）。
      off = (off + 3) & 0x3fff;
      consumed++;
      if (scanline === 0) break;
    }
    // 不在 H5 中修改 $005E/$005F（由 ROM 自管）
    return consumed;
  }

  /**
   * WBS L5: 由 InterruptService 内部在 renderCommit 后触发 per-scanline 调度。
   * 默认按每 4 条 scanline 推进一次（L5 实现粒度可根据 emulator 观察调整）。
   */
  private triggerPerScanlineDispatch(_ppu: PpuTarget, _scanline: number): void {
    // 留作占位：H5 当前默认关闭 per-scanline, 改在 renderCommit 末尾一次性跑
    // midFrameChrSwitch(ppu, 0)；按 emulator 量化逐步加细 (L5 后续 WBS)。
  }

  /**
   * WBS L4 V2：per-scene end-of-frame CHR bank 强制覆盖。
   *
   * 替代 mid-frame stream parser 的不确定性, 直接按 scene 锁定终态 8 slot bank。
   * 在 renderCommit step 7 末尾调, 覆盖 applyChrFrom009e + midFrameChrSwitch 写的状态。
   *
   * 数据来源：scripts/_emu_reference.cjs 跑 ROM 各 scene, 取 state.json.chrBanks。
   * 每次新增 scene 终止 bank 时, 在 scene-end-bank-table.ts 加一行即可。
   */
  applySceneEndBankOverride(ppu: PpuTarget, frame: number): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    const sceneId = store.scene.currentSceneId & 0xff;
    const entry = SCENE_END_BANK_TABLE.find((e) => frame >= e.fromFrame);
    if (!entry) return;
    // 注意：bank1k 0-255, H5 loadChrSlot 自动 mod 128；EMU 是 256 bank 索引。
    // 跨场景转换安全：每帧 frame>=fromFrame 都有效, 直到新 entry 出现。
    void sceneId;
    for (let i = 0; i < 8; i++) {
      const b = entry.banks[i] & 0xff;
      this.loadChrSlot(ppu, i, b);
    }
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