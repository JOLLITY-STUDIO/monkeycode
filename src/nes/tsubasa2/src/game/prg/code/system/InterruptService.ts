/**
 * InterruptService — 每帧中断/渲染管线（原 bank30 NMI $C76E + bank02 NMI 渲染 $8000）
 *
 * @bank 30 ($C76E) / 02 ($8000)
 *
 * 对应原始地址：
 *   $C76E: NMI 入口 — ram_001B bit6 决定走游戏逻辑路径（$C421）或主渲染路径（$C775）
 *   $C775: 主渲染 NMI — 关 NMI / OAM DMA / $C8FB 队列 / $3F00 清基址 / $C7B7 滚动 / MASK / $C9E9 CHR / $C9C5 / $C982 手柄
 *   $8000: bank02 NMI 渲染子程 — OAM DMA / $05E8 缓冲 / $3F00 基址 / $8062 滚动 / $80AF CHR / $80D7 手柄 / 帧计数
 *   $C8FB: $0498 渲染队列消费（3 字节条目 [bank, ptrLo, ptrHi]，LIFO，RLE 流）
 *   $C951: $0515 第二渲染队列消费（$04A5 RLE 数据块）
 *   $C9E9: CHR bank 请求表装载（MMC3）
 *
 * H5 语义：外层每帧调用 nmi()（手柄读取 + 场景逻辑），然后 renderCommit(ppu) 按
 * 原始 NMI 顺序提交渲染：OAM DMA → $0498 队列 → $0515 队列 → $05E8 缓冲 →
 * 滚动（bank02 $8062）→ CTRL/MASK → CHR。所有 MMC3 PRG 寄存器写省略（数据已 import）。
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
  /**
   * 装载 CHR 1KB bank 到 pattern table 指定 slot（MMC3 $8000/$8001 语义，原版 $C9E9）。
   * slot: 0-7 → PPU 地址 slot*$0400（$0000/$0400/.../$1C00）。
   * 由 runtime 实现（映射到 Mapper4.load1kVromBank）；未提供时跳过动态装载。
   */
  loadChrBank?(slot: number, bank1k: number): void;
}

export class InterruptService {
  private router: BootRouter | null = null;
  private audio: AudioService | null = null;

  /** 已应用 CHR 槽位缓存（$C9E9 每帧重放，仅装载变化槽位） */
  private readonly chrSlots: number[] = new Array(8).fill(-1);

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
   *
   * 逐指令对照 asm/bank30/code_main.s $C76E-$C772:
   *   $C76E: LDA $001B         ; A = ram_001B（NMI 标志位）
   *   $C770: BVC $C775        ; bit6=0（游戏逻辑 NMI）→ 走主渲染路径 $C775
   *   $C772: JMP $C421        ; bit6=1（游戏逻辑路径）→ 切 bank 调用帧更新 $C421
   *
   * H5 行为：bit6=0 时走主渲染（renderCommit），bit6=1 时走游戏逻辑（router.update）。
   * 当前实现：nmi() 只做手柄+场景+bit7；renderCommit() 做主渲染。
   * bit6 语义保留为 ram 视图（场景控制器可通过 ram_001B bit6 切换路径）。
   *
   * @param frame 帧号
   */
  nmi(frame: number): void {
    const store = this.store;
    store.frame = frame;
    // 1. 手柄读取（bank02 $80D7 语义）
    this.input.readControllers();
    // 2. 音频引擎帧推进（bank12 $80BA 语义）
    this.audio?.update();
    // 3. 场景帧更新（游戏逻辑，对应 $C421 路径）
    this.router?.update(frame);
    // 4. 主渲染路径标志（asm $C7EA: LDA $001B; ORA #$80; STA $001B）
    //    注意：asm 在 NMI 末尾 $C7EA 置 bit7，不是开头。
    //    H5 提前到 nmi() 末尾，renderCommit 依赖此标志决定是否提交。
    store.writeByte(0x001b, store.readByte(0x001b) | 0x80);
  }

  /**
   * 渲染提交（$C775 + bank02 $8000 语义），顺序逐指令对照：
   *   1. 关 NMI（$C77A）→ OAM DMA（$C78B）
   *   2. $0498 渲染队列（$C8FB）+ $0515 第二队列（$C951）
   *   3. $3F00 基址复位（$C79F，H5 无操作——调色板走缓冲/直接写）
   *   4. $C7B7 滚动（$004A+$0538 / $004B）
   *   5. MASK（$C7C5）+ $C9E9 CHR + $C9C5 帧计数 + $C982 手柄（H5 手柄已读）
   *   6. bank02 $8000: OAM DMA / $05E8 缓冲 / $3F00 基址 / $8062 滚动 / $80AF CHR
   *   7. 恢复 NMI（$C810: $0020 |= $80）
   */
  renderCommit(ppu: PpuTarget): void {
    const store = this.store;
    // 0. 游戏逻辑期的 VRAM 直写（$2006/$2007 语义）先落地
    store.flushVram(ppu);

    // 1. $C77A: 关 NMI（$2000 bit7 clear）并应用
    const ctrlOff = store.readByte(0x0020) & 0x7f;
    store.writeByte(0x0020, ctrlOff);
    ppu.updateControlReg1(ctrlOff);

    // $C78B: OAM DMA（$0200 → spriteMem）
    this.oamDma(ppu);

    // 2. $C8FB: $0498 渲染队列（LIFO，每帧消费队尾一项）
    this.flushRenderQueue(ppu);
    // $C951: $0515 第二渲染队列（$04A5 RLE 块）
    this.flushSecondQueue(ppu);

    // 3. $C79F: $3F00 基址复位（asm 连写 4 次 $2006：$3F/$00/$00/$00）
    //    原版作用：重置 PPU VRAM 地址到 $3F00（调色板区），为后续调色板写做准备。
    //    H5：调色板由 flushPalette 直接写 $3F00-$3F1F，无需重置地址寄存器。
    //    但 VRAM 地址寄存器状态需保持一致（flushPalette 会写 $3F00+，等价重置）。

    // 4. $C7B7: 主滚动（X=$004A+$0538, Y=$004B）
    this.applyScrollC7B7(ppu);

    // 5. $C7C5: MASK
    ppu.updateControlReg2(store.readByte(0x0021) & 0xff);

    // $C9E9: CHR bank 请求表
    this.applyChrRequest(ppu);
    // $C7CD-$C7E3: IRQ 向量 bank（asm: LDX $008E; STX $008C/D; LDA $C8F7,X;
    //   AND #$7F; STA $C000/C001; LDX $0469; STA $E000,X）
    //   H5 省略 MMC3 IRQ 寄存器写（无硬件 IRQ 语义）。
    // $C9C5: 帧计数器更新（JSR $C9C5）
    this.frameCounters();

    // 6. bank02 $8000 续段
    //   OAM DMA（$8000，与 $C78B 重复——原始如此，H5 幂等）
    this.oamDma(ppu);
    //   $05E8 渲染缓冲（$8019-$804A）
    this.flushNtBuffer(ppu);
    //   $8062 滚动路径（$0079/$007A/$007B/$0044/$0045 → CTRL/滚动）——最终生效
    this.applyScrollBank02(ppu);
    //   $80AF: CHR $009E-$00A1 → MMC3 cmd 2-5
    this.applyChrFrom009e(ppu);
    //   $80D7 手柄读取（H5 已在 nmi() 完成，跳过）

    // 7. $C810: 恢复 NMI（$0020 |= $80），$0019 同步
    const ctrlOn = store.readByte(0x0020) | 0x80;
    store.writeByte(0x0020, ctrlOn & 0xff);
    store.writeByte(0x0019, ctrlOn & 0xff);
    ppu.updateControlReg1(ctrlOn & 0xff);

    // 调色板兜底：ram_062A/063A → $3F00/$3F10（$05E8 缓冲已含 fadeWrite 条目；此步保证一致）
    this.flushPalette(ppu);
  }

  /**
   * $C78B: OAM DMA（$0200-$02FF → PPU spriteMem）
   *
   * 逐指令对照 asm/bank30/code_main.s $C78B-$C792:
   *   $C78B: LDA #$00; STA $2003   ; OAM 地址 = 0
   *   $C78E: LDA #$02; STA $4014   ; DMA 源页 = $02（$0200-$02FF）
   * 原版直接 DMA $0200，不在此处做 $0468→$0200 同步。
   * 同步在 bank02 $88CE-$88FD（场景帧逻辑中调用）。
   *
   * bank02 $8000 续段也有 OAM DMA（重复，原版如此，H5 幂等）。
   *
   * $0468→$0200 同步逻辑（bank02 $88CE-$88FD）：
   *   $88D5: LDX $0468,Y（X 坐标）→ $88D8: LDA $046A,Y（属性）
   *   $88DB: AND #$0C; BEQ $88E1 — 属性 bit2/3 非零 → X=$F8（隐藏）
   *   $88E2-$88F4: X/Y/属性/图案 → $0200..$0203（64 精灵，Y+=4）
   * 此同步由场景控制器调用，不在 NMI 中。H5 统一在 oamDma 中做同步保证一致性。
   */
  private oamDma(ppu: PpuTarget): void {
    const store = this.store;
    const oam = store.oamBuffer;
    // bank02 $88CE-$88FD: $0468 → $0200 同步（H5 统一在此做，保证 DMA 前数据一致）
    for (let y = 0; y < 0x100; y += 4) {
      let x = store.readByte(0x0468 + y);
      const attr = store.readByte(0x046a + y);
      if ((attr & 0x0c) !== 0) x = 0xf8; // 隐藏：X=$F8（屏幕右侧外）
      oam[y] = x; // $0200+Y = X
      oam[y + 1] = store.readByte(0x0469 + y); // Y
      oam[y + 2] = attr; // 属性
      oam[y + 3] = store.readByte(0x046b + y); // 图案
    }
    // $C78B: DMA $0200 → spriteMem
    for (let i = 0; i < 0x100; i++) ppu.spriteMem[i] = oam[i];
  }

  /** $C7B7: 滚动（X=$004A+$0538, Y=$004B） */
  private applyScrollC7B7(ppu: PpuTarget): void {
    const store = this.store;
    const sx = (store.readByte(0x004a) + store.readByte(0x0538)) & 0xff;
    const sy = store.readByte(0x004b) & 0xff;
    this.setScroll(ppu, sx, sy);
  }

  /**
   * bank02 $8062-$8090 滚动路径（最终生效）：
   *   $8062: LDA $0079; BPL $8073 — bit7 置位走文本滚动路径（$A091，本会话仅占位）
   *   $8073: LSR $0020 ×2 → ROL($0045 bit0) → ROL($007B bit0) → STA $2000
   *   $8086: LDA $007A; STA $2005   （滚动 X）
   *   $808B: LDX $0044; DEX; STX $2005（滚动 Y = $0044-1）
   */
  private applyScrollBank02(ppu: PpuTarget): void {
    const store = this.store;
    const s79 = store.readByte(0x0079) & 0xff;
    if ((s79 & 0x80) !== 0) {
      // 文本滚动路径（$8066-$806C: LDA $007B; STA $2006; LDA $007A; STA $2006; JMP $A091）
      // H5：设置 VRAM 地址基址（无后续 $2007 直写上下文，仅同步 ram 视图）
      return;
    }
    // $8073: LSR $0020 ×2
    let ctrl = (store.readByte(0x0020) >> 2) & 0xff;
    store.writeByte(0x0020, ctrl);
    // $8077: LDA $0045; LSR; ROL $0020
    ctrl = ((ctrl << 1) | (store.readByte(0x0045) & 1)) & 0xff;
    store.writeByte(0x0020, ctrl);
    // $807C: LDA $007B; LSR; ROL $0020
    ctrl = ((ctrl << 1) | (store.readByte(0x007b) & 1)) & 0xff;
    store.writeByte(0x0020, ctrl);
    ppu.updateControlReg1(ctrl);
    // $8086-$808E: 滚动 X=$007A, Y=$0044-1
    const sx = store.readByte(0x007a) & 0xff;
    const sy = (store.readByte(0x0044) - 1) & 0xff;
    this.setScroll(ppu, sx, sy);
  }

  /** 滚动值 → PPU 滚动寄存器（$2005 语义分解） */
  private setScroll(ppu: PpuTarget, sx: number, sy: number): void {
    ppu.regHT = (sx >> 3) & 31;
    ppu.regFH = sx & 7;
    ppu.regH = (sx >> 5) & 1;
    ppu.regVT = (sy >> 3) & 31;
    ppu.regFV = sy & 7;
    ppu.regV = (sy >> 5) & 1;
  }

  /**
   * $C7CD-$C7E3 + $C9C5: IRQ 向量 bank（H5 省略）+ 帧计数器更新。
   * 逐指令对照 asm/bank30/code_main.s $C9C5-$C9E8：
   *   LDX $00E1; LDA $0300,X; ADC $0700,X; ROL $00E2; EOR #$FF;
   *   ROL $00E2; ADC $00E2; STA $00E2; SBC $0780,X; ADC $00E1;
   *   STA $00E3; INC $00E1; RTS
   * 注意：ROL 的 C 来自前一步 ADC 进位；STA $00E2 存的是 ADC 结果（A），
   * 不是 ROL 后的 e2（原实现两处错误：进位恒 0、$00E2 写入错误值）。
   */
  private frameCounters(): void {
    const store = this.store;
    // $C7CD-$C7E1: LDX $008E; STX $008C; STX $008D + MMC3 IRQ 写（H5 省略）
    // $C9C5 入口 C=0（前序 LDA 类指令不影响 C）
    let c = 0;
    const e1 = store.readByte(0x00e1);
    // LDA $0300,X; ADC $0700,X
    let sum = store.readByte(0x0300 + e1) + store.readByte(0x0700 + e1) + c;
    let a = sum & 0xff;
    c = sum > 0xff ? 1 : 0;
    // ROL $00E2（C=ADC 进位；C←旧 bit7）
    let e2 = store.readByte(0x00e2);
    const cRol1 = (e2 >> 7) & 1;
    e2 = ((e2 << 1) | c) & 0xff;
    // EOR #$FF（不影响 C）
    a ^= 0xff;
    // ROL $00E2（C=cRol1；C←新 bit7）
    const cRol2 = (e2 >> 7) & 1;
    e2 = ((e2 << 1) | cRol1) & 0xff;
    // ADC $00E2; STA $00E2（$00E2 = A = 加法结果）
    sum = a + e2 + cRol2;
    a = sum & 0xff;
    c = sum > 0xff ? 1 : 0;
    store.writeByte(0x00e2, a);
    // SBC $0780,X（A -= M + !C）
    let s = a - store.readByte(0x0780 + e1) - (1 - c);
    a = s & 0xff;
    c = s >= 0 ? 1 : 0;
    // ADC $00E1; STA $00E3
    sum = a + e1 + c;
    a = sum & 0xff;
    store.writeByte(0x00e3, a);
    // INC $00E1
    store.writeByte(0x00e1, (e1 + 1) & 0xff);
  }

  /**
   * $05E8 渲染缓冲消费（bank02 $8000-$804A）。
   *
   * 逐指令对照 asm/bank02/code_main.s $8000-$804A:
   *   $800A: LDA $0628; BEQ $805D     ; 缓冲空 → 跳过
   *   $800F: BIT $0629; BVS $805D     ; 忙标志 bit6 → 跳过
   *   $8014: LDA #$00; STA $2001      ; MASK=0（关显示，渲染期间不可见）
   *   $8019: LDX #$00                 ; 缓冲索引 X=0
   *   $801B: LDY #$80                 ; 默认 CTRL=$80（行模式）
   *   $801D: LDA $05E8,X; BPL $8026   ; bit7=0 → 行模式
   *   $8022: AND #$3F; LDY #$84       ; bit7=1 → 列模式 count&=$3F, CTRL=$84
   *   $8026: STY $2000                ; 写 PPU CTRL
   *   $8029: TAY                      ; Y = count
   *   $802A: LDA $05EA,X; STA $2006   ; PPU 地址 hi
   *   $8030: LDA $05E9,X; STA $2006   ; PPU 地址 lo
   *   $8036: LDA $05EB,X; STA $2007   ; 写数据
   *   $803C: INX; DEY; BNE $8036      ; 循环 count 次
   *   $8040: INX×3                    ; X += 3（跳过 addr/count 头）
   *   $8043: LDA $05E8,X; BNE $801B   ; 下一条目
   *   $8048: STA $0628=0              ; 清缓冲指针
   *
   * H5 行为：写透到 PPU VRAM（ppu.writeMem），CTRL/MASK 由后续步骤覆盖。
   */
  private flushNtBuffer(ppu: PpuTarget): void {
    const store = this.store;
    if (store.readByte(0x0628) === 0) return;
    if ((store.readByte(0x0629) & 0x40) !== 0) return; // 忙标志：BVS bit6
    // $8014: MASK=0（关显示，渲染期间）— H5 由后续 $C7C5 恢复 MASK
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
      // $8026: STY $2000 — PPU CTRL（列模式 $84，行模式 $80）
      const ctrl = vertical ? 0x84 : 0x80;
      ppu.updateControlReg1(ctrl);
      store.writeByte(0x0020, ctrl);
      // $802A-$8033: PPU 地址 = addrHi, addrLo
      const addr = (buf[x + 2] << 8) | buf[x + 1];
      const step = vertical ? 32 : 1;
      // $8036-$803E: 循环写 $2007
      for (let i = 0; i < count && x + 3 + i < 0x40; i++) {
        ppu.writeMem((addr + i * step) & 0x3fff, buf[x + 3 + i]);
      }
      x += 3 + count;
    }
    // $8048: 清缓冲指针
    store.writeByte(0x0628, 0);
    // 恢复 MASK（H5：渲染完成，由后续 $C7C5 统一设置）
    store.writeByte(0x0021, savedMask);
  }

  /**
   * $C8FB $0498 渲染队列消费：
   *   计数>0 → DEC；index=(count-1)*3；条目 [bank][ptrLo][ptrHi]。
   *   ptrHi bit7 置位 → MMC3 PRG bank 切换（H5 省略）。
   *   流格式：RLE 块 [count][addrLo][addrHi][data×count]，0 终止。
   *   流数据仅指向工作 RAM（如 $046C 调色板流）；PRG 流数据已全部提取为
   *   声明式表，不再有 ROM 字节读取路径（readStreamByte 仅读 RAM）。
   *   每帧消费队尾一项（LIFO），一项的流全部渲染完才返回。
   */
  private flushRenderQueue(ppu: PpuTarget): void {
    const store = this.store;
    const count = store.readByte(0x0498);
    if (count === 0) return;
    store.writeByte(0x0498, (count - 1) & 0xff); // DEC $0498
    const idx = (count - 1) * 3;
    const bank = store.readByte(0x0499 + idx); // TAY
    const lo = store.readByte(0x049a + idx);   // $0077
    const hi = store.readByte(0x049b + idx);   // $0078
    const ptr = (hi << 8) | lo;                // 流指针（CPU 地址）
    // $C919: BPL $C92C — hi bit7 置位时原版先做 MMC3 PRG 切换（H5 省略）
    void bank;
    let p = ptr;
    for (;;) {
      const b0 = this.readStreamByte(bank, p);
      if (b0 === 0) break; // $C930: BEQ $C950 结束
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
   * $C92E LDA ($0077),Y — CPU 内存读取（流仅指向工作 RAM）。
   *   $0000-$07FF: 工作 RAM（如 $046C 调色板流 → 直写 $3F00）
   *   $8000-$FFFF: PRG ROM 已全部提取为声明式表（禁止 ROM 字节读取），返回 0。
   */
  private readStreamByte(bank: number, addr: number): number {
    void bank;
    if (addr < 0x2000) {
      return this.store.readByte(addr & 0x7ff);
    }
    return 0; // PPU 寄存器/未映射区不作为流
  }

  /**
   * $C951 $0515 第二渲染队列消费：
   *   $0515 bit7 置位（待消费）→ 清标志；$04A5 起 RLE 块
   *   [count][addrLo][addrHi][data×count]，0 终止。
   */
  private flushSecondQueue(ppu: PpuTarget): void {
    const store = this.store;
    const flag = store.readByte(0x0515);
    if ((flag & 0x80) === 0) return; // BPL $C981
    store.writeByte(0x0515, 0);      // LDX #$00; STX $0515
    let x = 0;
    for (;;) {
      const cnt = store.readByte(0x04a5 + x);
      if (cnt === 0) break;          // BEQ $C981
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
   * $C9E9 CHR bank 请求表装载（MMC3，逐指令对照 asm/bank30/code_main.s $C9E9-$CA21）。
   * 由 ram_0022（命令基址 + chrSel）+ ram_0490-$0497（8 字节请求表）解码为 8 个 1KB slot。
   */
  private applyChrRequest(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    const base = store.readByte(0x0022);
    const cmdBase = base & 7;
    const chrSel = (base >> 7) & 1;
    let x = chrSel !== 0 ? 4 : 0;
    // $C9F1: $8000=cmd, $8001=ram_0490+X；$8000=cmd|1, $8001=ram_0491+X
    this.mmc3ChrWrite(ppu, cmdBase, chrSel, store.readByte(0x0490 + x));
    this.mmc3ChrWrite(ppu, cmdBase | 1, chrSel, store.readByte(0x0491 + x));
    x ^= 4;
    // $CA0F: for Y=2..5: $8000=Y|ram_0022, $8001=ram_0490+X++
    for (let y = 2; y <= 5; y++) {
      this.mmc3ChrWrite(ppu, y | base, chrSel, store.readByte(0x0490 + x));
      x++;
    }
  }

  /**
   * bank02 $80AF: MMC3 cmd 2-5 ← $009E-$00A1（不并入 $0022，chrSel=0 → slots 4-7）。
   * 原版 $8000=#$02/#$03/#$04/#$05，$8001=$009E/$009F/$00A0/$00A1。
   */
  private applyChrFrom009e(ppu: PpuTarget): void {
    if (!ppu.loadChrBank) return;
    const store = this.store;
    this.mmc3ChrWrite(ppu, 2, 0, store.readByte(0x009e));
    this.mmc3ChrWrite(ppu, 3, 0, store.readByte(0x009f));
    this.mmc3ChrWrite(ppu, 4, 0, store.readByte(0x00a0));
    this.mmc3ChrWrite(ppu, 5, 0, store.readByte(0x00a1));
  }

  /** MMC3 $8000/$8001 CHR 写解码（Mapper4.executeCommand 语义；cmd 6/7=PRG 无语义） */
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
