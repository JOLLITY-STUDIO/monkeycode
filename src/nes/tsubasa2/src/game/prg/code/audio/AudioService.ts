/**
 * AudioService — NES APU 音频引擎 (bank12)
 * @bank 12 ($8000-$9FFF, MMC3 R6 可切)
 *
 * 职责: BGM/SE 播放请求, 通道状态管理, 帧推进 (APU 寄存器 $4000-$4017 写入)。
 *
 * asm 结构:
 *   code_main.s $8000-$8252: 主入口 (BGM/SE 请求分派, 帧推进主循环)
 *   code_sub.s  $8253-$84A2: 音符解析/音高计算/包络/振动等子程
 *   code_data.s $84A3-$8BFF: 内联数据 + 通道初始化/音符表查询
 *
 * RAM 布局 ($0700-$07FF 音频专用区):
 *   $0700-$0705: BGM/SE 请求队列 (6 项)
 *   $0706: 通道使能位掩码 (bit0-3 = 方波1/2+三角+噪音)
 *   $0707-$070A: 各通道音符计数器
 *   $0727-$07FF: 通道参数区 (每通道 16 字节, 共 8 通道)
 *   $07A7-$07B7: 音高偏移/频率低字节
 *   $07BF-$07C7: 频率高字节/音色索引
 *   $07CF-$07DF: 包络衰减计数器
 *   $07E0-$07E8: APU 寄存器缓存 ($4003/$4007 等)
 *   $07E9: BGM 播放标志
 *   $07EA-$07F4: 通道状态标志
 *   $07FC: 当前 BGM bank 选择 ($07/$0D/$0E/$0F)
 *
 * APU 寄存器映射:
 *   $4000/$4004/$400C: 方波1/2/噪音 控制 (包络+占空比)
 *   $4001/$4005/$400D: 方波1/2/噪音 扫描
 *   $4002/$4006/$400E: 频率低字节
 *   $4003/$4007/$400F: 频率高字节+长度计数器
 *   $4008/$400A/$400B: 三角波控制/频率
 *   $4015: 通道使能
 *   $4017: 帧 IRQ 控制
 *
 * 数据来源: bank13/14/15 (纯数据 bank, BGM 乐谱 + 音色表)
 */
import { DataStore } from '../../data/store/DataStore';

/**
 * SE (音效) 指针表 (原 bank12 $8BDA, 8 项 × 2byte LE)。
 * 每项指向 bank12 内的 SE 数据块。
 * 由 ROM dump (bank12 偏移 0x0BDA) 提取。
 * TODO: 从 ROM 填充真实指针
 */
export const SE_POINTER_TABLE: Readonly<Record<number, number>> = {
  0x00: 0x0000, // TODO: ROM 提取
};

/**
 * BGM bank 选择表 (原 bank12 $0700 区逻辑)。
 * BGM ID → bank13/14/15 选择 ($07/$0D/$0E/$0F)。
 */
export const BGM_BANK_TABLE: Readonly<Record<number, number>> = {
  // BGM 0x00-0x31 → bank 13 ($0D)
  // BGM 0x32-0x43 → bank 14 ($0E)
  // BGM 0x44-0x50 → bank 15 ($0F)
  // BGM 0x51+    → bank 13 ($0D, 默认)
};

/**
 * BGM 数据映射 (ID → bank + 描述)。
 * bank13/14/15 是纯数据 bank, 各含 BGM 乐谱数据。
 */
export const BGM_DATA_MAP: Readonly<Record<number, string>> = {
  // TODO: 从 bank13-15 提取 BGM 名称映射
};

/** APU 通道枚举 */
export enum ApuChannel {
  PULSE1 = 0,   // 方波1 ($4000-$4003)
  PULSE2 = 1,   // 方波2 ($4004-$4007)
  TRIANGLE = 2, // 三角波 ($4008-$400B)
  NOISE = 3,    // 噪音 ($400C-$400F)
  DPCM = 4,     // DPCM ($4010-$4013)
}

/** APU 寄存器地址常量 */
const APU_PULSE1_CTRL = 0x4000;
const APU_PULSE1_SWEEP = 0x4001;
const APU_PULSE1_FREQ_LO = 0x4002;
const APU_PULSE1_LEN = 0x4003;
const APU_PULSE2_CTRL = 0x4004;
const APU_PULSE2_SWEEP = 0x4005;
const APU_PULSE2_FREQ_LO = 0x4006;
const APU_PULSE2_LEN = 0x4007;
const APU_TRI_CTRL = 0x4008;
const APU_TRI_FREQ_LO = 0x400A;
const APU_TRI_LEN = 0x400B;
const APU_NOISE_CTRL = 0x400C;
const APU_NOISE_FREQ_LO = 0x400E;
const APU_NOISE_LEN = 0x400F;
const APU_STATUS = 0x4015;
const APU_FRAME_IRQ = 0x4017;

/** 通道 APU 寄存器基址表 (4 通道, 每通道 4 寄存器) */
const CHANNEL_APU_BASE: readonly number[] = [
  APU_PULSE1_CTRL, // ch0 = 方波1
  APU_PULSE2_CTRL, // ch1 = 方波2
  APU_NOISE_CTRL,  // ch2 = 噪音 (asm $818C: LDA #$03; EOR; ASL×2 → $400C)
  APU_NOISE_CTRL,  // ch3 = 噪音 (备用)
];

export class AudioService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  // ════════════════════════════════════════════════════════════
  // RAM 读写辅助 ($0700-$07FF 音频区)
  // ════════════════════════════════════════════════════════════
  protected rd(addr: number): number {
    return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
  }
  protected wr(addr: number, v: number): void {
    this._store.write(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`, v & 0xFF);
  }
  protected rdPtr(lo: number, hi: number): number {
    return (this.rd(hi) << 8) | this.rd(lo);
  }
  protected wrPtr(lo: number, hi: number, v: number): void {
    this.wr(lo, v & 0xFF);
    this.wr(hi, (v >> 8) & 0xFF);
  }

  /** 写 APU 寄存器 (通过 DataStore KV 'apu_XXXX') */
  protected wrApu(addr: number, v: number): void {
    this._store.write(`apu_${addr.toString(16).toUpperCase().padStart(4, '0')}`, v & 0xFF);
  }
  protected rdApu(addr: number): number {
    return this._store.read(`apu_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
  }

  // ════════════════════════════════════════════════════════════
  // $8000: 主入口 (BGM/SE 请求分派)
  // asm $8000-$805E: LDX #$05; LDY $0700,X; CPY #$32/$44/$51/$5C;
  //   按 BGM ID 范围选 bank ($07/$0D/$0E/$0F); STA $07FC; JMP $805E
  // ════════════════════════════════════════════════════════════

  /**
   * 主入口: 处理 BGM/SE 请求队列。
   * asm $8000: 遍历 $0700[0-5], 按 ID 选 bank, 调 $805E 播放。
   * @return true = 有请求被处理
   */
  requestPlay(id: number): boolean {
    // asm $805E 入口: 设 BGM bank, 调 $8349 初始化通道
    this.wr(0x0700, id & 0xFF);
    // 按 ID 范围选 bank
    let bank: number;
    if (id < 0x32) {
      bank = 0x07; // bank13
    } else if (id < 0x44) {
      bank = 0x0D; // bank14
      this.wr(0x07FC, 0x0D);
    } else if (id < 0x51) {
      bank = 0x0E; // bank15
      this.wr(0x07FC, 0x0E);
    } else if (id < 0x5C) {
      bank = 0x0F;
      this.wr(0x07FC, 0x0F);
    } else {
      bank = 0x07;
    }
    this.wr(0x07FC, bank);
    // $805E: 调 $8349 (通道初始化)
    this.sub8349(id);
    return true;
  }

  /**
   * $805E-$80B7: BGM 请求处理 (遍历 $0700[5], 检查 ID 范围)。
   * asm: LDX #$05; LDY $0700,X; BEQ $80B7 (无请求跳);
   *   CPY #$72; BCS $80B7; CPY #$31; BNE $80AF;
   *   $31 特殊: 设 $07DF/$07CF 等 = $19, $07D0/$07D4 = $0A;
   *   $80AF: JSR $8349 (通道初始化); 清 $0700,X
   */
  protected sub805E(): void {
    for (let x = 5; x >= 0; x--) {
      const id = this.rd(0x0700 + x);
      if (id === 0) continue;
      if (id >= 0x72) {
        this.wr(0x0700 + x, 0);
        continue;
      }
      if (id !== 0x31) {
        this.sub8349(id);
        this.wr(0x0700 + x, 0);
        continue;
      }
      // $31 特殊: 鼓点/节奏模式
      const v = 0x19;
      this.wr(0x07DF, v);
      this.wr(0x07CF, v);
      this.wr(0x07D1, v);
      this.wr(0x07D2, v);
      this.wr(0x07D3, v);
      this.wr(0x07D5, v);
      this.wr(0x07D6, v);
      this.wr(0x07D7, v);
      this.wr(0x07D9, v);
      this.wr(0x07DA, v);
      this.wr(0x07DB, v);
      this.wr(0x07DD, v);
      this.wr(0x07DE, v);
      this.wr(0x07D0, 0x0A);
      this.wr(0x07D4, 0x0A);
      this.wr(0x07D8, 0x0A);
      this.wr(0x07DC, 0x0A);
      this.wr(0x0700 + x, 0);
    }
  }

  // ════════════════════════════════════════════════════════════
  // $80BA-$816D: 帧推进主循环 (8 通道 × 4 参数遍历)
  // ════════════════════════════════════════════════════════════

  /**
   * 帧推进: 遍历所有通道, 更新音符计数器, 写 APU 寄存器。
   * asm $80BA: 设 $00F0/$00F1 = $0727 (通道参数基址);
   *   $00F2 = 0 (通道索引); $00F3 = 8 (通道数);
   *   $80CA: LDA $0706 (使能位); LSR; BCC $80D2 (禁用跳);
   *     ORA #$80; STA $0706; BCC $810C
   *   $80D7: LDX $00F2; DEC $0707,X (音符计数器-1); BNE $80E1
   *     JSR $83CB (音符结束处理); 重新读音符数据
   *   $80E1: DEC $0709,X (包络计数器-1); BNE $8109
   *     读包络数据, 设 $0709/$070A; JSR $81DB (音高计算)
   *   $8109: JSR $81DB (音高更新)
   *   $810C: $00F0 += $10; $00F2 += 4; DEC $00F3; BNE $80CA
   *   $811D: 第二阶段 (8 通道 × $40 步长, $00F2 递减)
   */
  update(): void {
    // 阶段1: 遍历 8 通道 (每通道 16 字节参数, $00F2 += 4)
    this.wrPtr(0x00F0, 0x00F1, 0x0727);
    this.wr(0x00F2, 0x00);
    this.wr(0x00F3, 0x08);
    this._phase1Loop();
    // 阶段2: 遍历 8 通道 (步长 $40, $00F2 递减)
    this._phase2Loop();
    // $8163: LDA $07E9; BEQ $816D (BGM 标志=0 跳)
    if (this.rd(0x07E9) !== 0) {
      // LDA #$00; STA $4015 (清 APU 状态) — .byte $A9,$00,$8D,$15,$40
      this.wrApu(APU_STATUS, 0x00);
    }
  }

  /** $80CA-$811B: 阶段1 单通道更新 */
  protected _phase1Loop(): void {
    while (this.rd(0x00F3) > 0) {
      const enable = this.rd(0x0706);
      if ((enable & 1) !== 0) {
        // 通道使能
        this.wr(0x0706, enable | 0x80);
        const x = this.rd(0x00F2);
        // DEC $0707,X (音符计数器-1)
        const noteCnt = (this.rd(0x0707 + x) - 1) & 0xFF;
        this.wr(0x0707 + x, noteCnt);
        if (noteCnt === 0) {
          // JSR $83CB (音符结束, 重新读音符数据)
          this.sub83CB();
        }
        // DEC $0709,X (包络计数器-1)
        const envCnt = (this.rd(0x0709 + this.rd(0x00F2)) - 1) & 0xFF;
        const x2 = this.rd(0x00F2);
        this.wr(0x0709 + x2, envCnt);
        if (envCnt === 0) {
          // 读包络数据, 设 $0709/$070A
          this._reloadEnvelope(x2);
        }
        // JSR $81DB (音高计算)
        this.sub81DB();
      }
      // $00F0 += $10; $00F2 += 4; DEC $00F3
      const f0 = this.rdPtr(0x00F0, 0x00F1);
      this.wrPtr(0x00F0, 0x00F1, (f0 + 0x10) & 0xFFFF);
      this.wr(0x00F2, (this.rd(0x00F2) + 4) & 0xFF);
      this.wr(0x00F3, (this.rd(0x00F3) - 1) & 0xFF);
    }
  }

  /** $811D-$8162: 阶段2 (步长 $40, $00F2 递减) */
  protected _phase2Loop(): void {
    this.wrPtr(0x00F0, 0x00F1, 0x0727);
    this.wr(0x00FC, 0x27);
    this.wr(0x00FD, 0x07);
    this.wr(0x00F2, 0x03);
    this.wr(0x00F3, 0x11);
    while (true) {
      const f3 = this.rd(0x00F3);
      const mask = f3 & 0x0F;
      if (mask !== 0) {
        // $00F0 += $40; $00F1 += carry
        const f0 = this.rdPtr(0x00F0, 0x00F1);
        this.wrPtr(0x00F0, 0x00F1, (f0 + 0x40) & 0xFFFF);
        // JSR $816E (APU 寄存器写入)
        this.sub816E();
      }
      // $00FC += $10; $00F0 = $00FC; $00FD += carry; $00F1 = $00FD
      const fc = this.rdPtr(0x00FC, 0x00FD);
      this.wrPtr(0x00FC, 0x00FD, (fc + 0x10) & 0xFFFF);
      this.wrPtr(0x00F0, 0x00F1, this.rdPtr(0x00FC, 0x00FD));
      // ASL $00F3; DEC $00F2; BPL $8131
      this.wr(0x00F3, (this.rd(0x00F3) << 1) & 0xFF);
      const f2 = (this.rd(0x00F2) - 1) & 0xFF;
      this.wr(0x00F2, f2);
      if ((f2 & 0x80) !== 0) break;
    }
  }

  /**
   * $816E: APU 寄存器写入 (按通道索引写 $4000/$4004/$400C 等)。
   * asm: LDA #$03; EOR $00F2; ASL; ASL; TAX (X = (3 ^ $00F2) × 4)
   *   LDY #$06; LDA ($00F0),Y (读通道参数[6]); PHA
   *   LDA $00F2; STA $00FB; CMP #$01; BNE $8189
   *   $01 通道: PLA; AND #$0F; ORA #$80; BNE $81A4
   *   其他: PLA; ORA #$30; STA $4000,X (控制寄存器)
   *   LDA #$10; LDY #$05; AND ($00F0),Y; BNE $81A7
   *   LDA #$08; LDY $00FB; STA $07E4,Y; STA $4001,X (扫描)
   *   JMP $81B1
   *   $81A4: STA $4000,X
   *   $81A7: LDY #$08; LDA ($00F0),Y; BPL $81DA
   *     AND #$7F; STA ($00F0),Y
   *   LDY #$07; LDA ($00F0),Y; STA $4002,X (频率低)
   *   INY; LDA ($00F0),Y; ORA #$18
   *   LDY $00FB; BEQ $81CA; CPY #$01; BEQ $81CA
   *   CMP $07E0,Y; BEQ $81DA (与缓存相同跳)
   *   STA $4003,X (频率高+长度); STA $07E0,Y (缓存)
   *   LDA $07E4,Y; BNE $81DA
   *   LDA #$00; STA $07E0,Y
   *   RTS
   */
  protected sub816E(): void {
    const ch = this.rd(0x00F2);
    const apuBase = CHANNEL_APU_BASE[(3 ^ ch) & 0x03];
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    // LDY #$06; LDA ($00F0),Y (参数[6] = 控制+占空比)
    let ctrl = this.rd(paramPtr + 6);
    this.wr(0x00FB, ch);
    if (ch === 1) {
      ctrl = (ctrl & 0x0F) | 0x80;
    } else {
      ctrl = ctrl | 0x30;
    }
    this.wrApu(apuBase, ctrl);
    // LDA #$10; LDY #$05; AND ($00F0),Y (扫描标志)
    const sweepFlag = this.rd(paramPtr + 5) & 0x10;
    if (sweepFlag === 0) {
      const fb = this.rd(0x00FB);
      this.wr(0x07E4 + fb, 0x08);
      this.wrApu(apuBase + 1, 0x08);
    } else {
      // $81A7: LDY #$08; LDA ($00F0),Y; BPL $81DA
      const flag8 = this.rd(paramPtr + 8);
      if ((flag8 & 0x80) !== 0) {
        this.wr(paramPtr + 8, flag8 & 0x7F);
        // LDY #$07; LDA ($00F0),Y; STA $4002,X (频率低)
        const freqLo = this.rd(paramPtr + 7);
        this.wrApu(apuBase + 2, freqLo);
        // INY; LDA ($00F0),Y; ORA #$18
        let freqHi = this.rd(paramPtr + 8) | 0x18;
        const fb = this.rd(0x00FB);
        if (fb !== 0 && fb !== 1) {
          const cached = this.rd(0x07E0 + fb);
          if (freqHi === cached) return;
        }
        this.wrApu(apuBase + 3, freqHi);
        this.wr(0x07E0 + this.rd(0x00FB), freqHi);
        const e4 = this.rd(0x07E4 + this.rd(0x00FB));
        if (e4 === 0) {
          this.wr(0x07E0 + this.rd(0x00FB), 0);
        }
      }
    }
  }

  // ════════════════════════════════════════════════════════════
  // $81DB-$8252: 音高计算 + 振动/包络
  // ════════════════════════════════════════════════════════════

  /**
   * $81DB: 音高计算 (读包络, 算频率偏移, 写通道参数)。
   * asm $81DB-$8252:
   *   LDY #$05; LDA ($00F0),Y; TAX; AND #$F0; STA $00F6
   *   AND #$20; BEQ $81EE (bit5=振动标志)
   *   LDA #$0F; STA $00F7; BNE $8233
   *   $81EE: TXA; AND #$0F; STA $00F7 (包络值)
   *   LDY $00F3; DEY; LDX $07CF,Y; BEQ $8233
   *   DEX; TXA; STA $07CF,Y; BNE $8233
   *   LDA $00F7; CLC; ADC #$01; CMP #$0F; STA $00F7; BNE $8217
   *   LDA #$00; STA $07D7,Y; LDA #$80; STA $07E8
   *   $8217: LDA $00F7; ORA $00F6; TAX; LDY #$05; STA ($00F0),Y
   *   TXA; AND #$0F; STA $00F7; LDY $00F3; DEY; LDX $07CF,Y
   *   BNE $8233; LDA $07D7,Y; STA $07CF,Y
   *   $8233: LDX $00F2; LDA $070A,X; SEC; SBC $00F7; BPL $823F
   *   LDA #$00; ORA $00F6; LDY #$06; STA ($00F0),Y
   *   LDX $00F3; DEX; LDA $07AF,X; CMP #$01; BEQ $8257; CMP #$02; BNE $8256
   */
  protected sub81DB(): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    // LDY #$05; LDA ($00F0),Y (参数[5])
    const p5 = this.rd(paramPtr + 5);
    let f6 = p5 & 0xF0;
    let f7: number;
    if ((p5 & 0x20) !== 0) {
      // 振动标志
      f7 = 0x0F;
    } else {
      f7 = p5 & 0x0F;
      // 包络衰减
      const f3 = this.rd(0x00F3);
      const y = (f3 - 1) & 0xFF;
      const decay = this.rd(0x07CF + y);
      if (decay !== 0) {
        const newDecay = (decay - 1) & 0xFF;
        this.wr(0x07CF + y, newDecay);
        if (newDecay === 0) {
          f7 = (f7 + 1) & 0xFF;
          if (f7 >= 0x0F) {
            f7 = 0;
            this.wr(0x07D7 + y, 0);
            this.wr(0x07E8, 0x80);
          }
        }
      }
    }
    // $8217: LDA $00F7; ORA $00F6; TAX; LDY #$05; STA ($00F0),Y
    const combined = f7 | f6;
    this.wr(paramPtr + 5, combined);
    f7 = combined & 0x0F;
    // $8233: LDX $00F2; LDA $070A,X; SEC; SBC $00F7
    const x = this.rd(0x00F2);
    let a = this.rd(0x070A + x);
    a = (a - f7) & 0xFF;
    if ((a & 0x80) !== 0) a = 0;
    a = a | f6;
    this.wr(paramPtr + 6, a);
  }

  // ════════════════════════════════════════════════════════════
  // $8257-$84A2: 音符解析 + 音色表查询
  // ════════════════════════════════════════════════════════════

  /**
   * $8257: 音符事件分派 (查 $8269 跳转表)。
   * asm: LDA $07C7,X; ASL; TAY; LDA $8269,Y; STA $00F9;
   *   LDA $826A,Y; STA $00FA; JMP ($00F9)
   */
  protected sub8257(): void {
    const x = this.rd(0x00F2);
    const idx = (this.rd(0x07C7 + x) << 1) & 0xFF;
    // 查 $8269 表 (bank12 内联数据)
    const tableOff = 0x8269 - 0x8000;
    // stub: 跳转表 8 项, 指向 $8297/$8297/$82B4/$82C9/$82B4/$8297/$8297/$827D
    const targets = [0x8297, 0x8297, 0x82B4, 0x82C9, 0x82B4, 0x8297, 0x8297, 0x827D];
    const target = targets[(idx >> 1) & 0x07] ?? 0x8297;
    switch (target) {
      case 0x827D: this.sub827D(); break;
      case 0x8297: this.sub8297(); break;
      case 0x82B4: this.sub82B4(); break;
      case 0x82C9: this.sub82C9(); break;
    }
  }

  /** $827D: 音符频率设置 (+0 偏移) */
  protected sub827D(): void {
    // .byte $A9,$01,$18 → LDA #$01; CLC
    // ADC $07B7,X; LDY #$07; STA ($00F0),Y
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (1 + this.rd(0x07B7 + x)) & 0xFF;
    this.wr(paramPtr + 7, lo);
    // LDA $07BF,X; ADC #$00; INY; STA ($00F0),Y
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    // JMP $82A4
    this.sub82A4();
  }

  /** $8297: 音符频率设置 (+2 偏移) */
  protected sub8297(): void {
    // .byte $A9,$02 → LDA #$02; JMP $827F
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (2 + this.rd(0x07B7 + x)) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub82A4();
  }

  /** $82B4: 音符频率设置 (-1 偏移) */
  protected sub82B4(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (this.rd(0x07B7 + x) - 1) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub82A4();
  }

  /** $82C9: 音符频率设置 (-2 偏移) */
  protected sub82C9(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (this.rd(0x07B7 + x) - 2) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub82A4();
  }

  /** $82A4: 通道计数器递增 + 环绕 */
  protected sub82A4(): void {
    const x = this.rd(0x00F2);
    let a = this.rd(0x07C7 + x);
    a = (a + 1) & 0xFF;
    if (a >= 0x0A) a = 0;
    this.wr(0x07C7 + x, a);
  }

  /** $82D2: 音符事件分派2 (查 $82E4 表) */
  protected sub82D2(): void {
    const x = this.rd(0x00F2);
    const idx = (this.rd(0x07C7 + x) << 1) & 0xFF;
    const targets = [0x830E, 0x832B, 0x8340, 0x832B, 0x830E, 0x82F4, 0x8309, 0x82F4];
    const target = targets[(idx >> 1) & 0x07] ?? 0x830E;
    switch (target) {
      case 0x82F4: this.sub82F4(); break;
      case 0x8309: this.sub8309(); break;
      case 0x830E: this.sub830E(); break;
      case 0x832B: this.sub832B(); break;
      case 0x8340: this.sub8340(); break;
    }
  }

  /** $82F4: 音符频率 (+3 偏移) */
  protected sub82F4(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (3 + this.rd(0x07B7 + x)) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub831B();
  }

  /** $8309: 音符频率 (+6 偏移) */
  protected sub8309(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (6 + this.rd(0x07B7 + x)) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub831B();
  }

  /** $830E: 音符频率 (直接设) */
  protected sub830E(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    this.wr(paramPtr + 7, this.rd(0x07B7 + x));
    this.wr(paramPtr + 8, this.rd(0x07BF + x));
    this.sub831B();
  }

  /** $831B: 通道计数器递增 + 环绕 (上限 8) */
  protected sub831B(): void {
    const x = this.rd(0x00F2);
    let a = this.rd(0x07C7 + x);
    a = (a + 1) & 0xFF;
    if (a >= 0x08) a = 0;
    this.wr(0x07C7 + x, a);
  }

  /** $832B: 音符频率 (-3 偏移) */
  protected sub832B(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (this.rd(0x07B7 + x) - 3) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub831B();
  }

  /** $8340: 音符频率 (-6 偏移) */
  protected sub8340(): void {
    const x = this.rd(0x00F2);
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const lo = (this.rd(0x07B7 + x) - 6) & 0xFF;
    this.wr(paramPtr + 7, lo);
    const hi = this.rd(0x07BF + x);
    this.wr(paramPtr + 8, hi);
    this.sub831B();
  }

  // ════════════════════════════════════════════════════════════
  // $8349-$84A2: 通道初始化 + BGM 数据加载
  // ════════════════════════════════════════════════════════════

  /**
   * $8349: BGM/SE 通道初始化。
   * asm $8349-$83CA:
   *   STX $00F5; LDA #$00; STA $0700,X; DEY; TYA; ASL; TAY
   *   LDA $8BDA,Y; STA $00F0; LDA $8BDB,Y; STA $00F1 (查 SE 指针表)
   *   LDY #$00; LDA ($00F0),Y; BPL $836C (负值=结束)
   *   LDX #$0F; STX $4015 (启用所有通道); LDX $00F5; RTS
   *   $836C: STA $00F4; LDA #$08; SBC $00F4; TAX
   *   清零通道参数区 ($07A7/$07AF/$07E3/$07E2/$07EA/$07CF/$07D7/$07DF/$07F4/$07E8)
   *   LDA $00F4; ASL×4; TAX; INY; LDA ($00F0),Y; STA $0727,X
   *   INY; LDA ($00F0),Y; STA $0728,X
   *   LDA #$00; STA $072C,X; LDA #$0F; STA $0730,X
   *   LDA $00F4; ASL×2; TAX; LDA #$01; STA $0707,X
   *   LSR; LDX $00F4; ROL; DEX; BPL $83BE; ORA $0706; STA $0706
   *   INY; BPL $8360 (循环读通道参数)
   */
  protected sub8349(id: number): void {
    this.wr(0x00F5, id & 0xFF);
    // 查 SE 指针表 $8BDA (stub: 用 id 作索引)
    const ptr = SE_POINTER_TABLE[id] ?? 0;
    this.wrPtr(0x00F0, 0x00F1, ptr);
    // LDY #$00; LDA ($00F0),Y
    const firstByte = 0; // stub
    if ((firstByte & 0x80) !== 0) {
      // 负值 = 结束, 启用所有通道
      this.wrApu(APU_STATUS, 0x0F);
      return;
    }
    // $836C: 通道参数初始化循环
    this.wr(0x00F4, firstByte);
    let x = (0x08 - firstByte) & 0xFF;
    // 清零参数区
    this.wr(0x07A7 + x, 0);
    this.wr(0x07AF + x, 0);
    this.wr(0x07E3, 0);
    this.wr(0x07E2, 0);
    this.wr(0x07EA + x, 0);
    this.wr(0x07CF + x, 0);
    this.wr(0x07D7 + x, 0);
    this.wr(0x07DF, 0);
    this.wr(0x07F4 + x, 0);
    this.wr(0x07E8, 0);
    // 通道参数块 ($0727+X)
    const x4 = (firstByte << 4) & 0xFF;
    // INY; LDA ($00F0),Y; STA $0727,X; INY; LDA ($00F0),Y; STA $0728,X
    // LDA #$00; STA $072C,X; LDA #$0F; STA $0730,X
    this.wr(0x072C + x4, 0);
    this.wr(0x0730 + x4, 0x0F);
    // 通道使能位
    const x2 = (firstByte << 2) & 0xFF;
    this.wr(0x0707 + x2, 0x01);
    // 设 $0706 使能位
    let enable = 0;
    for (let i = firstByte; i >= 0; i--) {
      enable = (enable << 1) | 1;
    }
    this.wr(0x0706, this.rd(0x0706) | enable);
  }

  /**
   * $83CB: 音符结束处理 (读下一音符数据)。
   * asm $83CB-$83EB:
   *   LDA #$CF; LDY #$05; AND ($00F0),Y; STA ($00F0),Y (清 bit6/7)
   *   LDY #$00; LDA ($00F0),Y; STA $00F4; INY; LDA ($00F0),Y; STA $00F5
   *   DEY; LDA ($00F4),Y; BPL $8404 (负值=控制字节)
   *   INY; CMP #$E0; BCC $83ED; JSR $84C9 (≥$E0 跳转)
   *   CMP #$B0; BCC $83F4 (≥$B0 跳)
   *   INY; BPL $83DF (循环)
   *   $83F4: AND #$3F; TAX; LDA $8725,X (查音符表)
   *   LDX $00F2; STA $0707,X; STA $0708,X; BPL $83DF
   */
  protected sub83CB(): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    // LDA #$CF; AND ($00F0),Y (清参数[5] 的 bit6/7)
    const p5 = this.rd(paramPtr + 5) & 0xCF;
    this.wr(paramPtr + 5, p5);
    // 读音符数据指针
    const lo = this.rd(paramPtr);
    const hi = this.rd(paramPtr + 1);
    this.wrPtr(0x00F4, 0x00F5, (hi << 8) | lo);
    // 循环读音符字节
    let y = 0;
    while (true) {
      const data = this.rd(((hi << 8) | lo) + y);
      if ((data & 0x80) !== 0) {
        // 控制字节
        y++;
        if (data >= 0xE0) {
          // JSR $84C9 (扩展命令)
          this.sub84C9(data);
        } else if (data >= 0xB0) {
          // INY; BPL (跳过参数字节)
          y++;
        } else {
          // $83F4: AND #$3F; TAX; LDA $8725,X (查音符表)
          const noteIdx = data & 0x3F;
          const noteVal = 0; // ROM $8725 表 stub
          const x2 = this.rd(0x00F2);
          this.wr(0x0707 + x2, noteVal);
          this.wr(0x0708 + x2, noteVal);
        }
      } else {
        // 正数 = 音符值
        const noteIdx = data & 0x3F;
        const noteVal = 0; // ROM $8725 表 stub
        const x2 = this.rd(0x00F2);
        this.wr(0x0707 + x2, noteVal);
        this.wr(0x0708 + x2, noteVal);
        break;
      }
    }
  }

  /**
   * $84C9: 扩展命令分派 (查 $84DA 跳转表)。
   * asm: AND #$1F; ASL; TAX; LDA $84DA,X; STA $00F6;
   *   LDA $84DB,X; STA $00F7; JMP ($00F6)
   */
  protected sub84C9(data: number): void {
    const idx = ((data & 0x1F) << 1) & 0xFF;
    // 查 $84DA 表 (bank12 内联, stub)
    void idx;
  }

  // ════════════════════════════════════════════════════════════
  // $84A3-$8BFF: 通道状态管理 + 数据表
  // ════════════════════════════════════════════════════════════

  /**
   * $84A3: 通道参数写入 (设 $07BF,X + 清标志)。
   * asm: STA $07BF,X; LDX $00F3; DEX; LDA #$00; STA $07F4,X
   *   LDA $07EA,X; BNE $84C0; LDX $00F2; LDA #$01; STA $0709,X
   *   LDA #$00; LDY #$04; STA ($00F0),Y
   *   $84C0: LDX $00F2; LDA $0708,X; STA $0707,X; RTS
   */
  protected sub84A3(a: number): void {
    const x = this.rd(0x00F2);
    this.wr(0x07BF + x, a & 0xFF);
    const x3 = (this.rd(0x00F3) - 1) & 0xFF;
    this.wr(0x07F4 + x3, 0);
    if (this.rd(0x07EA + x3) === 0) {
      this.wr(0x0709 + x, 0x01);
      const paramPtr = this.rdPtr(0x00F0, 0x00F1);
      this.wr(paramPtr + 4, 0);
    }
    this.wr(0x0707 + x, this.rd(0x0708 + x));
  }

  /**
   * $851A: 全部停止 (清 $07F2/$0700-$0705)。
   * asm: LDA #$00; STA $07F2; STA $0700-$0705; RTS
   */
  stopAll(): void {
    this.wr(0x07F2, 0);
    for (let i = 0; i < 6; i++) {
      this.wr(0x0700 + i, 0);
    }
  }

  /**
   * $8533: 单通道停止 (清 $07EA,X)。
   * asm: LDX $00F3; DEX; LDA #$00; STA $07EA,X; RTS
   */
  protected sub8533(): void {
    const x = (this.rd(0x00F3) - 1) & 0xFF;
    this.wr(0x07EA + x, 0);
  }

  /**
   * $853D: 设通道音量 (LDA #$0F; STA $07EA,X 等)。
   * asm: LDX $00F3; DEX; LDA #$0F; STA $07EA,X; ...
   */
  protected sub853D(): void {
    const x = (this.rd(0x00F3) - 1) & 0xFF;
    this.wr(0x07EA + x, 0x0F);
    // 后续设音量参数 (stub)
  }

  /** 重新加载包络数据 (从 $00F0 指针读) */
  protected _reloadEnvelope(x: number): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    // LDY #$02; LDA ($00F0),Y → $00F6 (包络指针低)
    const envPtrLo = this.rd(paramPtr + 2);
    this.wr(0x00F6, envPtrLo);
    // INY; LDA ($00F0),Y → $00F7 (包络指针高)
    const envPtrHi = this.rd(paramPtr + 3);
    this.wr(0x00F7, envPtrHi);
    // INY; LDA ($00F0),Y → PHA; CLC; ADC #$02; STA ($00F0),Y (偏移+2)
    const envOff = this.rd(paramPtr + 4);
    this.wr(paramPtr + 4, (envOff + 2) & 0xFF);
    // PLA; TAY; LDA ($00F6),Y → $0709,X (包络值)
    const envPtr = (envPtrHi << 8) | envPtrLo;
    const envVal = this.rd(envPtr + envOff);
    this.wr(0x0709 + x, envVal);
    // INY; LDA ($00F6),Y → $070A,X (包络长度)
    this.wr(0x070A + x, this.rd(envPtr + envOff + 1));
  }
}

export default AudioService;
