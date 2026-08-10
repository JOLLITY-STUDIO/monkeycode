/**
 * BGM00Player — 完整翻译 Bank 12 音频引擎 ($8002-$870C)
 *
 * 严格对照 bank_12.asm 逐行翻译，直接消费 BGM00 轨道数据驱动 PAPU。
 * 不依赖 NES CPU、MMC3、ROM 读取。使用预提取的轨道数据。
 *
 * 核心循环 (每帧 tick):
 *   1. Phase 1 ($80C6-$811B): 遍历 8 通道，递减时长，到期调用 $83CB 音序器
 *   2. Phase 2 ($8129-$8161): 按 4 个 APU 组写入寄存器
 *   3. 每组通过 $816E 写入 $4000-$4003 (X = (3^group)*4)
 *
 * 用法:
 *   import { BGM00Player } from './BGM00Player';
 *   const player = new BGM00Player(48000, (l, r) => { ... });
 *   player.load(trackSQ1, trackSQ2, trackTRI, trackNOISE);
 *   player.start();
 *   setInterval(() => player.tick(), 1000/60);
 */
import PAPU from '../../src/papu/index';
import { TIMING_SUB_TABLES } from './_timing_data';

// ════════════════════════════════════════════════
// 常量 (Bank 12 ROM)
// ════════════════════════════════════════════════
const CPU_FREQ = 1789772.5;
const CYCLES_PER_FRAME = Math.floor(CPU_FREQ / 60); // ~29830
const NUM_CHANNELS = 8;
const CH_BLOCK_SIZE = 10; // per-channel param block size (offsets 0-9)

/**
 * 频率表 ($870D-$8724): 12 半音 × 2B NES period (little-endian)
 * 索引 0=C, 1=C#, 2=D, 3=D#, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=A#, 11=B
 */
const FREQ_TABLE: readonly number[] = [
  0x06AE, 0x064E, 0x05F3, 0x059E, 0x054D, 0x0501,
  0x04B9, 0x0475, 0x0435, 0x03F8, 0x03BF, 0x0389,
];

/** 时值表 ($8725-$8764): 64 entries, 帧数 */
const DUR_TABLE: readonly number[] = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0C, 0x0E, 0x0F, 0x10, 0x12,
  0x14, 0x15, 0x18, 0x1B, 0x1C, 0x1E, 0x20, 0x24, 0x28, 0x2A, 0x30, 0x36, 0x38, 0x3C, 0x40, 0x48,
  0x50, 0x54, 0x60, 0x6C, 0x70, 0x80, 0x90, 0xA0, 0xC0, 0xE0, 0x0B, 0x85, 0xA8, 0xFF, 0xF0, 0x52,
  0x89, 0x5C, 0x89, 0x6A, 0x89, 0x78, 0x89, 0x88, 0x89, 0xA0, 0x89, 0xB8, 0x89, 0xC0, 0x89, 0xC8,
];

// $82E4 频率修改跳转表 (type=1, 10-step sequence indexed by $07C7)
const SEQ_MOD_TABLE_TYPE1: ReadonlyArray<[number, number]> = [
  [0, 0],   // 0: no change
  [1, 0],   // 1: freq_lo+1
  [2, 0],   // 2: freq_lo+2
  [1, 0],   // 3: freq_lo+1 (dup of 1)
  [0, 0],   // 4: no change
  [3, 0],   // 5: freq_lo+3
  [6, 0],   // 6: freq_lo+6
  [3, 0],   // 7: freq_lo+3 (dup of 5)
];

// $82E4 频率修改跳转表 (type=2, 8-step sequence indexed by $07C7)
const SEQ_MOD_TABLE_TYPE2: ReadonlyArray<[number, number]> = [
  [0, 0],   // 0: no change
  [-1, 0],  // 1: freq_lo-1
  [-2, 0],  // 2: freq_lo-2
  [-1, 0],  // 3: same as 1
  [0, 0],   // 4: no change
  [3, 0],   // 5: freq_lo+3
  [6, 0],   // 6: freq_lo+6
  [3, 0],   // 7: same as 5
];

// ════════════════════════════════════════════════
// Per-channel 参数块 (对应 $0727+ch*16)
// ════════════════════════════════════════════════
interface ChBlock {
  /** +0: track_ptr_lo — 当前轨道读取位置低字节 */
  trackLo: number;
  /** +1: track_ptr_hi */
  trackHi: number;
  /** +2: timing_table_ptr_lo / next_dur_lo */
  timingLo: number;
  /** +3: timing_table_ptr_hi / next_dur_hi */
  timingHi: number;
  /** +4: timing_offset (递增+2) */
  timingOff: number;
  /** +5: vol_ctrl (bit4=sweep, bit5=rest, bits6-7=duty, bits0-3=vol) */
  volCtrl: number;
  /** +6: final volume byte written to $4000 ($81DB 计算结果) */
  apuVol: number;
  /** +7: freq_lo (NES period low) */
  freqLo: number;
  /** +8: freq_hi (NES period high, bit7 = dedup flag) */
  freqHi: number;
  /** +9: stack pointer / channel flags */
  stkPtr: number;
}

function createChBlock(): ChBlock {
  return {
    trackLo: 0, trackHi: 0,
    timingLo: 1, timingHi: 0,
    timingOff: 0,
    // $8349 init 清零 vol_ctrl（offset 5），offset 9 ($0730) = $0F
    volCtrl: 0x00,
    apuVol: 0x30,
    freqLo: 0, freqHi: 0x80,
    stkPtr: 0x0F,
  };
}

// ════════════════════════════════════════════════
// 全局工作区 (对应 $0706-$07FF)
// ════════════════════════════════════════════════
interface WorkArea {
  /** $0706: 通道活跃 bitmask (8 bits) */
  chMask: number;
  /** $0707+X: 通道 dur_lo (DEC 后触发音序器) */
  durLo: Uint8Array;
  /** $0709+X: 通道 next_dur_lo (DEC 后触发 timing table 读取) */
  durHi: Uint8Array;
  /** $070A+X: 通道 next_dur_hi (静态值，来自 timing table，用于音量计算) */
  nextDurHi: Uint8Array;
  /** $07AF-$07B6: 通道类型 (0/1/2) */
  chType: Uint8Array;
  /** $07B7-$07BE: 基础频率 lo */
  baseFreqLo: Uint8Array;
  /** $07BF-$07C6: 基础频率 hi */
  baseFreqHi: Uint8Array;
  /** $07C7-$07CE: 音序索引 0-9 */
  seqIdx: Uint8Array;
  /** $07CF-$07D6: 音量衰减计数器 */
  volDecay: Uint8Array;
  /** $07D7-$07DE: 音量衰减重载值 */
  volDecayReload: Uint8Array;
  /** $07E0-$07E3: 上次写入 $4003 的值 (4 groups) */
  last4003: Uint8Array;
  /** $07E4-$07E7: 通道静音标志 (4 groups) */
  muteFlags: Uint8Array;
  /** $07E8: DMC 活动标志 */
  dmcActive: number;
  /** $07EA-$07F1: portamento enable 标志 (0=off, 0x0F=on) */
  portamentoEn: Uint8Array;
  /** $07F4-$07FB: portamento/pitch 值 */
  portamentoVal: Int8Array;
  /** Dedup cache: 标记 freq_hi 是否需要重新写入 (替代 bit7 滥用) */
  freqDirty: Uint8Array;
  /** 保存最近一次时长前缀的值，供后续音符复用（不受 durHi timing table 重载影响） */
  noteDur: Uint8Array;
}

function createWorkArea(): WorkArea {
  return {
    chMask: 0,
    durLo: new Uint8Array(NUM_CHANNELS),
    durHi: new Uint8Array(NUM_CHANNELS),
    nextDurHi: new Uint8Array(NUM_CHANNELS),
    chType: new Uint8Array(NUM_CHANNELS),
    baseFreqLo: new Uint8Array(NUM_CHANNELS),
    baseFreqHi: new Uint8Array(NUM_CHANNELS),
    seqIdx: new Uint8Array(NUM_CHANNELS),
    volDecay: new Uint8Array(NUM_CHANNELS),
    volDecayReload: new Uint8Array(NUM_CHANNELS),
    last4003: new Uint8Array(4),
    muteFlags: new Uint8Array(4),
    dmcActive: 0,
    portamentoEn: new Uint8Array(NUM_CHANNELS),
    portamentoVal: new Int8Array(NUM_CHANNELS),
    freqDirty: new Uint8Array(NUM_CHANNELS),
    noteDur: new Uint8Array(NUM_CHANNELS),
  };
}

// ════════════════════════════════════════════════
// BGM00Player
// ════════════════════════════════════════════════
export class BGM00Player {
  papu: PAPU;
  sampleRate: number;
  onSample: ((l: number, r: number) => void) | null;

  private blocks: ChBlock[] = [];
  private w: WorkArea = createWorkArea();
  private tracks: (Uint8Array | null)[] = [];
  private isPlaying = false;
  private frameCount = 0;
  private totalChannels = 4; // SQ1=ch4, SQ2=ch5, TRI=ch6, NOISE=ch7

  /** Track start positions in sharedData (for restart on end-of-data) */
  private startOffsets: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  /** Shared BGM raw data for CALL/JUMP NES address resolution */
  private sharedData: Uint8Array | null = null;
  private bgmNesBase = 0; // NES base address of sharedData

  // $8623 EOR #$07 mapping: APU register X = (7-ch) * 4 & 0x0F
  // ch4(SQ1)→X=$0C, ch5(SQ2)→X=$08, ch6(TRI)→X=$04, ch7(NOISE)→X=$00
  // But in Phase 2: group=0→NOISE, group=1→TRI, group=2→SQ2, group=3→SQ1
  // X = (3^group)*4 → group0:0x0C, group1:0x08, group2:0x04, group3:0x00
  private static readonly APU_GROUP_BASE = [0x0C, 0x08, 0x04, 0x00];

  /** Optional: full PRG ROM for DMC sample fetching (32 × 8KB flat array) */
  private _prgRom: Uint8Array | null = null;

  constructor(sampleRate: number = 48000, onSample?: (l: number, r: number) => void) {
    this.sampleRate = sampleRate;
    this.onSample = onSample || null;

    // self-bound to capture 'this' for mmap.load
    const self = this;
    this.papu = new PAPU({
      opts: { sampleRate, onAudioSample: null as any },
      cpu: {
        requestIrq(_type: number) {},
        dataBus: 0,
        haltCycles(_n: number) {},
      },
      mmap: {
        load(addr: number): number {
          // $C000-$DFFF → PRG bank 30 (DMC samples)
          if (addr >= 0xC000 && addr < 0xE000) {
            if (self._prgRom) {
              const offset = 30 * 8192 + (addr - 0xC000);
              if (offset < self._prgRom.length) return self._prgRom[offset];
            }
            return 0;
          }
          // $E000-$FFFF → PRG bank 31
          if (addr >= 0xE000 && addr <= 0xFFFF) {
            if (self._prgRom) {
              const offset = 31 * 8192 + (addr - 0xE000);
              if (offset < self._prgRom.length) return self._prgRom[offset];
            }
            return 0;
          }
          return 0;
        },
      },
    });
    // PAPU 内部已按 1024*CPU_FREQ/sampleRate 计算 sampleTimerMax，
    // 与 clockFrameCounter 内的 nCycles<<10 固定点移位匹配。
    // 无需覆盖，直接使用 PAPU 默认值。
    this.papu.sampleRate = sampleRate;

    for (let i = 0; i < NUM_CHANNELS; i++) {
      this.blocks.push(createChBlock());
    }
    for (let i = 0; i < NUM_CHANNELS; i++) {
      this.tracks.push(null);
    }
  }

  setSampleCallback(cb: ((l: number, r: number) => void) | null): void {
    this.onSample = cb;
  }

  /**
   * 设置完整的 PRG ROM 数据（用于 DMC 采样读取）
   * @param prgRom 32 × 8KB = 262144 字节的扁平数组
   */
  setPrgRom(prgRom: readonly number[]): void {
    this._prgRom = new Uint8Array(prgRom);
  }

  // ════════════════════════════════════════════════
  // 公共接口
  // ════════════════════════════════════════════════

  /**
   * $8349 — 音乐播放初始化
   * 通道映射: SQ1→ch4, SQ2→ch5, TRI→ch6, NOISE→ch7
   * 
   * @param sharedRaw 可选: 完整BGM数据，用于CALL/JUMP NES地址转换
   * @param nesBase   共享数据的NES起始地址 (e.g. 0xB7AD for BGM00)
   */
  load(
    trackSQ1: readonly number[],
    trackSQ2: readonly number[],
    trackTRI: readonly number[],
    trackNOISE: readonly number[],
    sharedRaw?: readonly number[],
    nesBase?: number,
  ): boolean {
    this.stop();

    if (sharedRaw) {
      this.sharedData = new Uint8Array(sharedRaw);
      this.bgmNesBase = nesBase || 0;
    } else {
      this.sharedData = null;
      this.bgmNesBase = 0;
    }

    this.w.chMask = 0;

    // Parse 12B header from shared data to get NES address entry points.
    // Header: [ch4] [NES_lo hi] [ch5] [NES_lo hi] [ch6] [NES_lo hi] [ch7] [NES_lo hi] [FF]
    // The header NES addresses are the Bank 12 engine's channel start positions.
    if (this.sharedData) {
      const headerChannels: number[] = [];
      for (let i = 0; i < 4; i++) {
        const chNum = this.sharedData[i * 3];
        const lo = this.sharedData[i * 3 + 1];
        const hi = this.sharedData[i * 3 + 2];
        const nesAddr = lo | (hi << 8);
        headerChannels.push(chNum);
        const off = this._nesAddrToOffset(nesAddr);
        // Map header channel to our internal ch (4-7)
        if (chNum >= 4 && chNum <= 7) {
          if (chNum === 4) this._initChannel(4, trackSQ1, off);
          else if (chNum === 5) this._initChannel(5, trackSQ2, off);
          else if (chNum === 6) this._initChannel(6, trackTRI, off);
          else if (chNum === 7) this._initChannel(7, trackNOISE, off);
        }
      }
    } else {
      // No shared data: each channel uses its own track array, starting at 0
      this._initChannel(4, trackSQ1, 0);
      this._initChannel(5, trackSQ2, 0);
      this._initChannel(6, trackTRI, 0);
      this._initChannel(7, trackNOISE, 0);
    }

    this.totalChannels = 4;
    return true;
  }

  /** $8349 init for one channel */
  private _initChannel(ch: number, data: readonly number[], sharedStart = 0): void {
    if (data.length === 0) return;

    const useShared = this.sharedData !== null;

    this.startOffsets[ch] = useShared ? sharedStart : 0;

    const blk = this.blocks[ch];
    blk.trackLo = useShared ? (sharedStart & 0xFF) : 0;
    blk.trackHi = useShared ? ((sharedStart >> 8) & 0xFF) : 0;
    blk.timingLo = 1; // next_dur_lo = 1
    blk.timingHi = 0;
    blk.timingOff = 0;
    // $8349 in ASM is STX ram_00F5 + LDA #$00;STA ram_0700,X (zeros durHi, NOT volCtrl)
    // volCtrl defaults come from Bank 31 NMI init per channel:
    //   ch=4(SQ1): duty=00 → 0x00; ch=5(SQ2): duty=10(50%) → 0x80
    //   ch=6(TRI): linear counter=0x0F; ch=7(NOISE): 0x00
    blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
    blk.apuVol = 0x30;
    blk.freqLo = 0;
    blk.freqHi = 0x80;
    blk.stkPtr = 0x0F;  // $8349 init offset 9 = $0F

    this.w.durLo[ch] = 1;
    this.w.durHi[ch] = 1;
    this.w.noteDur[ch] = 1;
    this.w.nextDurHi[ch] = 1;   // $070A+X: next_dur_hi (static, from timing table)
    this.w.chType[ch] = 0;
    this.w.volDecay[ch] = 0;
    this.w.volDecayReload[ch] = 0;
    this.w.portamentoEn[ch] = 0;
    this.w.portamentoVal[ch] = 0;
    this.w.freqDirty[ch] = 0;

    this.tracks[ch] = new Uint8Array(data);

    // $83BE-$83C5: 设置 $0706 bitmask
    let bit = 1;
    for (let i = 0; i < ch; i++) bit <<= 1;
    this.w.chMask |= bit;
  }

  start(): boolean {
    if (this.w.chMask === 0) return false;
    this.isPlaying = true;
    this.frameCount = 0;
    this.w.dmcActive = 0;
    for (let g = 0; g < 4; g++) {
      // $07E4 muteFlags 原始初始化不强制 0x08；
      // 实际在 $816E 写入时由 vol_ctrl bit4 控制
      this.w.muteFlags[g] = 0;
      this.w.last4003[g] = 0;
    }
    this.papu.writeReg(0x4015, 0x0F);
    return true;
  }

  stop(): void {
    this.isPlaying = false;
    this.papu.writeReg(0x4015, 0x0F);
    this.w = createWorkArea();
    for (let i = 0; i < NUM_CHANNELS; i++) {
      this.blocks[i] = createChBlock();
      this.tracks[i] = null;
    }
    this.frameCount = 0;
  }

  /** Song loop restart: reinits all channels to their start offsets */
  private _restartSong(): void {
    // Rebuild chMask and reset all active channels to start positions
    this.w.chMask = 0;
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      if (!this.tracks[ch]) continue;
      const blk = this.blocks[ch];
      const startOff = this.startOffsets[ch] || 0;
      blk.trackLo = startOff & 0xFF;
      blk.trackHi = (startOff >> 8) & 0xFF;
      blk.timingLo = 1;
      blk.timingHi = 0;
      blk.timingOff = 0;
      // Per-channel volCtrl default (duty from Bank 31 NMI init)
      blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
      blk.apuVol = 0x30;
      blk.freqLo = 0;
      blk.freqHi = 0x80;
      blk.stkPtr = 0x0F;
      this.w.durLo[ch] = 1;
      this.w.durHi[ch] = 1;
      this.w.noteDur[ch] = 1;
      this.w.nextDurHi[ch] = 1;
      this.w.chType[ch] = 0;
      this.w.seqIdx[ch] = 0;
      this.w.volDecay[ch] = 0;
      this.w.volDecayReload[ch] = 0;
      this.w.portamentoEn[ch] = 0;
      this.w.portamentoVal[ch] = 0;
      this.w.freqDirty[ch] = 0;
      this._callStacks[ch] = [];
      this._loopStacks[ch] = [];
      // Set bit in chMask
      let bit = 1;
      for (let i = 0; i < ch; i++) bit <<= 1;
      this.w.chMask |= bit;
    }
    // Reset global state
    this.w.dmcActive = 0;
    for (let g = 0; g < 4; g++) {
      this.w.muteFlags[g] = 0;
      this.w.last4003[g] = 0;
    }
  }

  get progress(): { frame: number; seconds: number; playing: boolean } {
    return {
      frame: this.frameCount,
      seconds: Math.round(this.frameCount / 60 * 10) / 10,
      playing: this.isPlaying,
    };
  }

  // ════════════════════════════════════════════════
  // 每帧更新 ($8002 入口)
  // ════════════════════════════════════════════════

  tick(): void {
    if (!this.isPlaying) return;
    if (this.w.chMask === 0) {
      // All channels stopped — restart song loop from header
      this._restartSong();
      return;
    }

    // ── Phase 1 ($80C6-$811B): 遍历 8 通道 ──
    let mask = this.w.chMask;
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      const chBit = 1 << ch;
      if (!(mask & chBit)) continue;

      const blk = this.blocks[ch];
      const track = this.tracks[ch];
      if (!track) continue;

      // $80D9-$80E1: DEC dur_lo → if 0: $83CB
      let dl = (this.w.durLo[ch] - 1) & 0xFF;
      this.w.durLo[ch] = dl;
      if (dl === 0) {
        this._sequencerTick(ch, blk, track);
      }

      // $80E3-$8106: DEC next_dur → if 0: read from timing table
      let nd = (this.w.durHi[ch] - 1) & 0xFF;
      this.w.durHi[ch] = nd;
      if (nd === 0) {
        // $80E8-$8108: Read next entry from timing table if enabled
        // blk.timingHi = 0xFF means $E0 has been called (enabled)
        if (blk.timingHi === 0xFF) {
          const subTable = TIMING_SUB_TABLES[blk.timingLo];
          if (subTable && subTable.length > 0) {
            // timingOff / 2 = entry index (each entry is 2 bytes)
            let entryIdx = blk.timingOff >> 1;
            if (entryIdx >= subTable.length) entryIdx = 0;
            const [newDurLo, newNextDurHi] = subTable[entryIdx];
            nd = newDurLo;
            this.w.durHi[ch] = newDurLo;
            // $070A+X: next_dur_hi for volume calculation
            this.w.nextDurHi[ch] = newNextDurHi || 0;
            // Advance timing table offset by 2 bytes
            blk.timingOff = (blk.timingOff + 2) & 0xFF;
          } else {
            // SubTable not found/empty: reload from durLo (preserves last prefix duration)
            nd = this.w.durLo[ch] || 1;
            this.w.durHi[ch] = nd;
          }
        } else {
          // No timing table: reload durHi from durLo (simple repeat mode)
          nd = this.w.durLo[ch] || 1;
          this.w.durHi[ch] = nd;
        }
      }

      // $8109: JSR $81DB — 音量处理
      this._processVolume(ch);
    }

    // ── Phase 2 ($8129-$8161): 4 组 APU 寄存器写入 ──
    // 严格对照 bank_12.asm $8129-$8161:
    //   循环方向: g=3→2→1→0, mask=$11→$22→$44→$88
    //   X = (3^g)*4: g=3→$00(SQ1) g=2→$04(SQ2) g=1→$08(TRI) g=0→$0C(NOISE)
    //   每组的通道对: (ch_g, ch_g+4), 优先低通道
    const groupSlots = [
      { g: 3, mask: 0x11, chLow: 0, chHigh: 4 },  // → SQ1 ($4000)
      { g: 2, mask: 0x22, chLow: 1, chHigh: 5 },  // → SQ2 ($4004)
      { g: 1, mask: 0x44, chLow: 2, chHigh: 6 },  // → TRI ($4008)
      { g: 0, mask: 0x88, chLow: 3, chHigh: 7 },  // → NOISE ($400C)
    ];
    for (const slot of groupSlots) {
      if (!(this.w.chMask & slot.mask)) continue;
      const ch = (this.w.chMask & (1 << slot.chLow)) ? slot.chLow : slot.chHigh;
      // $816E: 写入 APU 寄存器
      this._writeApuReg(ch, slot.g);
    }

    // ── Audio rendering ──
    // PAPU clockFrameCounter 设计为每指令/每扫描线粒度调用（典型 nCycles=2~113）。
    // 直接传 29830 会触发 extraCycles 缓冲机制，导致绝大多数周期被延迟到下帧，
    // 实际每帧只处理约 38 个周期（而不是 29830），音频采样严重不足。
    // 解决方法：将帧周期切成 32-cycle 小块，逐块送入 PAPU。
    this.papu.nes.opts.onAudioSample = this.onSample;

    let remaining = CYCLES_PER_FRAME;
    const CHUNK = 32;
    while (remaining > 0) {
      const n = remaining < CHUNK ? remaining : CHUNK;
      this.papu.clockFrameCounter(n);
      remaining -= n;
    }
    // _advanceFrameSteps 内部已完成 frameCycleCounter 的周期复位，
    // 无需手动清零。

    this.papu.nes.opts.onAudioSample = null;

    this.frameCount++;
  }

  /** 批量渲染 PCM */
  renderAll(maxFrames: number = 3000): Float32Array {
    const pcm: number[] = [];
    const origCb = this.onSample;
    this.onSample = (l, r) => { pcm.push((l + r) * 0.5); };

    for (let f = 0; f < maxFrames && this.isPlaying; f++) {
      this.tick();
    }

    this.onSample = origCb;
    return new Float32Array(pcm);
  }

  // ════════════════════════════════════════════════
  // $83CB: 音序器 — 读取下一个音符/命令
  // ════════════════════════════════════════════════

  private _sequencerTick(ch: number, blk: ChBlock, track: Uint8Array): void {
    // $83CB-$83D1: AND #$CF on vol_ctrl (clear bits 4+5)
    blk.volCtrl &= 0xCF;

    // Use shared data if available (for CALL/JUMP NES address resolution)
    const data = this.sharedData || track;
    const maxLen = data.length;

    while (true) {
      const pos = blk.trackLo | (blk.trackHi << 8);
      if (pos >= maxLen) {
        // End of track data — restart from start offset (song loop)
        const restartOff = this.startOffsets[ch] || 0;
        blk.trackLo = restartOff & 0xFF;
        blk.trackHi = (restartOff >> 8) & 0xFF;
        // Reset channel state for fresh loop
        blk.volCtrl &= 0xCF;
        blk.timingOff = 0;
        blk.timingLo = 1;
        blk.timingHi = 0;
        this.w.chType[ch] = 0;
        this.w.seqIdx[ch] = 0;
        this.w.portamentoEn[ch] = 0;
        this.w.portamentoVal[ch] = 0;
        // Clear call/loop stacks
        this._callStacks[ch] = [];
        this._loopStacks[ch] = [];
        // Set durLo=1 to immediately process first byte
        this.w.durLo[ch] = 1;
        this.w.durHi[ch] = 1;
        this.w.noteDur[ch] = 1;
        return;
      }

      const b = data[pos];
      this._advanceTrack(blk, 1);

      // $83E1: BPL → b < $80 = 音符字节 (频率数据)
      if (b < 0x80) {
        this._parseNote(ch, blk, b);
        // $84A6-$84C8
        if (this.w.portamentoEn[ch] === 0) {
          blk.timingOff = 0;
        }
        // $84C2-$84C5: dur_lo = saved duration (noteDur unaffected by timing table)
        // noteDur stores the last duration prefix value; durHi is managed by timing table
        // for volume envelope and gets reloaded independently
        this.w.durLo[ch] = this.w.noteDur[ch] || 1;
        return;
      }

      // $83E4: CMP #$E0 → b >= $E0 = 命令分发
      if (b >= 0xE0) {
        const ok = this._dispatchCmd(ch, blk, data, b);
        if (!ok) return; // command ended the sequence (e.g. $FF)
        continue;
      }

      // $83ED-$8402: b ∈ [$80,$DF] = 时长前缀
      const durIdx = b & 0x3F;
      const dur = DUR_TABLE[durIdx] || 1;
      this.w.durLo[ch] = dur;
      this.w.durHi[ch] = dur;
      this.w.noteDur[ch] = dur;  // save for note reuse (unaffected by timing table reload)
      // loop to read next byte (which should be a note byte)
    }
  }

  // ════════════════════════════════════════════════
  // $8404-$848D: 音符频率计算
  // ════════════════════════════════════════════════

  /**
   * 频率编码方式取决于通道索引 (ram_00F3 in original Phase 1):
   *   ram_00F3=8→ch0, 7→ch1, 6→ch2, 5→ch3(DIRECT), 4→ch4, 3→ch5, 2→ch6, 1→ch7(DIRECT)
   * 即: ch∈{3,7} → 直接编码; ch∈{0,1,2,4,5,6} → 半音+八度编码
   */
  private _parseNote(ch: number, blk: ChBlock, noteByte: number): void {
    const isDirect = (ch === 3 || ch === 7);

    if (isDirect) {
      // $8422-$842C: 直接频率编码
      // ASM: CMP #$10 / BEQ $8435 / STA ram_00F4 ($8426) — NO masking!
      // Full byte → freq_lo. PAPU masks internally: bits 0-3=period, bit7=randomMode.
      if (noteByte === 0x10) {
        // $8435-$843D: rest
        blk.volCtrl |= 0x20;
        return;
      }

      // NOTE: Full byte preserved (ASM $8426 STA ram_00F4, no AND #$0F).
      // For noise ($400E): bit7=randomMode (0=long,1=short/metallic/drum).
      let fLo = noteByte;
      let fHi = 0;

      // Apply portamento offset ($07A7) — adjust lower nibble only for noise
      if (this.w.portamentoVal[ch] !== 0) {
        const upper = fLo & 0xF0;
        const lower = (fLo + this.w.portamentoVal[ch]) & 0x0F;
        fLo = upper | lower;
      }

      this.w.baseFreqLo[ch] = fLo;
      this.w.baseFreqHi[ch] = fHi;
      blk.freqLo = fLo;
      blk.freqHi = fHi | 0x80;  // set bit7 (dirty) — ASM _parseNote does ORA #$80
      this.w.freqDirty[ch] = 0xFF;
      return;
    }

    // $842E-$845B: 半音 + 八度编码
    const semitone = noteByte & 0x0F;
    if (semitone >= 0x0C) {
      // $8435: rest (invalid note)
      blk.volCtrl |= 0x20;
      return;
    }

    // $843F-$844B: 查 FREQ_TABLE
    let period = FREQ_TABLE[semitone];
    let fLo = period & 0xFF;
    let fHi = (period >> 8) & 7;

    // $844C-$845A: 八度右移 (LSR fHi → ROR fLo, NES 16-bit period)
    const octave = (noteByte & 0xF0) >> 4;
    for (let o = 0; o < octave; o++) {
      const carry = fHi & 1;  // Save fHi bit0 BEFORE shift (6502 LSR puts bit0→C)
      fHi >>= 1;
      fLo = (fLo >> 1) | (carry << 7);  // 6502 ROR fLo: C→bit7
      fHi &= 7;
    }
    if (fLo < 2 && fHi === 0) fLo = 2;

    // $845C-$848D: 应用 portamento 偏移 ($07A7/$07F4)
    const portVal = this.w.portamentoVal[ch];
    const portEn = this.w.portamentoEn[ch];

    if (portEn !== 0 && this.w.baseFreqLo[ch] !== 0) {
      // Portamento enabled: compute relative to base frequency
      // $8466-$848D
      let baseLo = this.w.baseFreqLo[ch];
      let baseHi = this.w.baseFreqHi[ch] & 0x7F;

      // Compute base period value
      let basePeriod = baseLo | (baseHi << 8);

      // Adjust by portamento amount
      if (portVal < 0) {
        basePeriod += (-portVal);
      } else {
        basePeriod += portVal;
      }

      fLo = basePeriod & 0xFF;
      fHi = (basePeriod >> 8) & 7;
      if (fLo === 0 && fHi === 0) fLo = 1;
    } else {
      // No portamento: apply static offset
      fLo = (fLo + (portVal & 0xFF)) & 0xFF;
      if (fLo < 2 && fHi === 0) fLo = 2;
    }

    this.w.baseFreqLo[ch] = fLo;
    this.w.baseFreqHi[ch] = fHi;
    blk.freqLo = fLo;
    blk.freqHi = fHi | 0x80;  // set bit7 (dirty) — ASM _parseNote does ORA #$80
    this.w.freqDirty[ch] = 0xFF;
  }

  // ════════════════════════════════════════════════
  // $84C9: 命令分发 ($E0-$FF)
  // cmdByte has already been consumed from track (pointer advanced past it)
  // ════════════════════════════════════════════════

  private _dispatchCmd(ch: number, blk: ChBlock, data: Uint8Array, cmdByte: number): boolean {
    const read = (): number => {
      const pos = blk.trackLo | (blk.trackHi << 8);
      if (pos < data.length) {
        this._advanceTrack(blk, 1);
        return data[pos];
      }
      return 0;
    };

    const cmdIdx = cmdByte & 0x1F;

    switch (cmdIdx) {
      // $E0 → $8544: SET_TIMING_TABLE_PTR
      // Reads next byte as index → lookup TIMING_SUB_TABLES
      // Stores index at blk.timingLo, marks enabled via timingHi=0xFF
      // Pre-seed nextDurHi from first timing entry for immediate volume calc
      case 0x00: {
        const tblIdx = read();
        blk.timingLo = tblIdx;      // Store index into SUB_TABLES
        blk.timingHi = 0xFF;        // Enable flag
        blk.timingOff = 0;          // Reset offset (NOT consumed yet, durHi=0 will consume)
        // Pre-seed nextDurHi for correct volume in frames before first durHi expiry
        const subTable = TIMING_SUB_TABLES[tblIdx];
        if (subTable && subTable.length > 0) {
          this.w.nextDurHi[ch] = subTable[0][1] || 0;
        }
        return true;
      }

      // $E1: NOP (INY;RTS in original)
      case 0x01: {
        return true;
      }

      // $E2 → $8641: SET_VOLUME_ENV (bits 0-3 of vol_ctrl)
      case 0x02: {
        const param = read();
        blk.volCtrl = (blk.volCtrl & 0xF0) | (param & 0x0F);
        return true;
      }

      // $E3 → $855F: OR_VOLUME_CTRL (vol_ctrl |= next byte)
      case 0x03: {
        const param = read();
        if (this.w.dmcActive === 0) {
          blk.volCtrl |= param;
        }
        return true;
      }

      // $E4 → $8617: ENABLE_SWEEP
      case 0x04: {
        const param = read();
        blk.volCtrl |= 0x10;
        const apuX = ((7 - ch) * 4) & 0x0F;
        if (apuX < 0x08) {
          this.papu.writeReg(0x4001 + apuX, param);
        }
        const grp = ch & 3;
        this.w.muteFlags[grp] = 0;
        return true;
      }

      // $E5 → $8670: SET_PORTAMENTO_AMOUNT
      case 0x05: {
        const param = read();
        const shifted = (param << 1) & 0xFF;
        if (!(param & 0x80)) {
          this.w.portamentoEn[ch] = shifted;
        }
        this.w.portamentoVal[ch] = param >> 1;
        return true;
      }

      // $E6, $E7: NOP
      case 0x06:
      case 0x07: {
        return true;
      }

      // $E8 → $8578: JUMP (absolute, 2 bytes — NES addr → shared data offset)
      case 0x08: {
        const lo = read();
        const hi = read();
        const target = this._nesAddrToOffset(lo | (hi << 8));
        blk.trackLo = target & 0xFF;
        blk.trackHi = (target >> 8) & 0xFF;
        return true;
      }

      // $E9 → $8585: CALL (push return address, jump to 2-byte abs addr)
      case 0x09: {
        const lo = read();
        const hi = read();
        const target = this._nesAddrToOffset(lo | (hi << 8));
        // Push current position as return address
        this._pushReturn(blk);
        blk.trackLo = target & 0xFF;
        blk.trackHi = (target >> 8) & 0xFF;
        return true;
      }

      // $EA → $85AF: RETURN (pop return address)
      case 0x0A: {
        const addr = this._popReturn(blk);
        if (addr !== null) {
          blk.trackLo = addr & 0xFF;
          blk.trackHi = (addr >> 8) & 0xFF;
        } else {
          // No return address — continue normally
          this.w.durLo[ch] = 1;
        }
        return true;
      }

      // $EB → $85C6: LOOP_START (1B count)
      case 0x0B: {
        const count = read();
        this._pushLoop(blk, count);
        return true;
      }

      // $EC → $85EF: LOOP_END
      case 0x0C: {
        const result = this._popLoop(blk);
        if (result !== null) {
          blk.trackLo = result & 0xFF;
          blk.trackHi = (result >> 8) & 0xFF;
        }
        return true;
      }

      // $ED → $8681: SET_CHANNEL_TYPE (ram_07AF)
      case 0x0D: {
        const param = read();
        this.w.chType[ch] = param;
        this.w.seqIdx[ch] = 0;
        return true;
      }

      // $EE → $8690: CLEAR_CHANNEL_TYPE (ram_07AF=0)
      case 0x0E: {
        this.w.chType[ch] = 0;
        this.w.seqIdx[ch] = 0;
        return true;
      }

      // $EF → $8699: DMC init A
      case 0x0F: {
        this._dmcInit(0x00, 0x0C);
        return true;
      }

      // $F0 → $86B8: DMC init B
      case 0x10: {
        this._dmcInit(0x03, 0x20);
        return true;
      }

      // $F1 → $86D7: DMC init C
      case 0x11: {
        this._dmcInit(0x0B, 0x13);
        return true;
      }

      // $F2 → $851A: STOP ALL — NOP for standalone
      case 0x12: {
        return true;
      }

      // $F3 → $853B: PORTAMENTO ON (ram_07EA = 0x0F)
      case 0x13: {
        this.w.portamentoEn[ch] = 0x0F;
        return true;
      }

      // $F4 → $8532: PORTAMENTO OFF (ram_07EA = 0)
      case 0x14: {
        this.w.portamentoEn[ch] = 0;
        return true;
      }

      // $F5-$F8: NOP
      case 0x15: case 0x16: case 0x17: case 0x18: {
        return true;
      }

      // $F9 → In BGM00 data used as REST (short rest, 1 frame)
      case 0x19: {
        blk.volCtrl |= 0x20;
        this.w.durLo[ch] = 1;
        return true;
      }

      // $FA → REST_DURATION (1B duration)
      case 0x1A: {
        const dur = read();
        blk.volCtrl |= 0x20;
        this.w.durLo[ch] = dur;
        return true;
      }

      // $FB-$FE: NOP / various DMC variants
      case 0x1B: case 0x1C: case 0x1D: case 0x1E: {
        return true;
      }

      // $FF → $8655: STOP CHANNEL
      // In Bank 12 engine, channels auto-restart from header entry when stopped
      case 0x1F: {
        // Restart this channel from its header offset
        const restartOff = this.startOffsets[ch] || 0;
        blk.trackLo = restartOff & 0xFF;
        blk.trackHi = (restartOff >> 8) & 0xFF;
        blk.timingLo = 1;
        blk.timingHi = 0;
        blk.timingOff = 0;
        // Restore per-channel volCtrl default (duty from Bank 31 NMI init)
        blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
        blk.apuVol = 0x30;
        blk.freqLo = 0;
        blk.freqHi = 0x80;
        blk.stkPtr = 0x0F;
        this.w.durLo[ch] = 1;
        this.w.durHi[ch] = 1;
        this.w.noteDur[ch] = 1;
        this.w.nextDurHi[ch] = 1;
        this.w.chType[ch] = 0;
        this.w.seqIdx[ch] = 0;
        this.w.volDecay[ch] = 0;
        this.w.volDecayReload[ch] = 0;
        this.w.portamentoEn[ch] = 0;
        this.w.portamentoVal[ch] = 0;
        this.w.freqDirty[ch] = 0;
        this._callStacks[ch] = [];
        this._loopStacks[ch] = [];
        return false;
      }
    }
    return true;
  }

  // ════════════════════════════════════════════════
  // $81DB: 音量/包络处理
  // ════════════════════════════════════════════════

  /**
   * $81DB-$8256: 音量/包络处理
   *
   * $81E0-$81E2: hiNib = volCtrl & 0xF0 (存入 ram_00F6)
   * $81E4-$81EC: rest (bit5) → vol = 0x0F (存入 ram_00F7)
   * $81EE-$81F1: 非 rest → vol = volCtrl & 0x0F (存入 ram_00F7)
   * $81F3-$8230: 音量衰减计数器 volDecay → 递增 vol → 写回 volCtrl
   *                衰减结束 (vol 到 0x0F) → dmcActive=0x80
   * $8233-$8243: apuVol = (durHi - vol) | hiNib, clamp ≥ 0
   */
  private _processVolume(ch: number): void {
    const blk = this.blocks[ch];
    const volByte = blk.volCtrl;
    const hiNib = volByte & 0xF0;   // $81E0-$81E2: ram_00F6
    let vol: number;

    // $81E4-$81F1: 处理 rest
    if (hiNib & 0x20) {
      vol = 0x0F;                    // $81E8-$81EA: 设置 vol=0x0F
    } else {
      vol = volByte & 0x0F;         // $81EE-$81F1: vol = volCtrl & 0x0F
    }

    // $81F3-$8230: 音量衰减计数器
    let vc = this.w.volDecay[ch];
    if (vc !== 0) {
      vc--;
      this.w.volDecay[ch] = vc;

      if (vc === 0) {
        vol++;                       // $8205: ADC #$01
        if (vol > 0x0F) {           // $8207-$8214: vol == 0x10 → clamp
          vol = 0x0F;
          this.w.volDecayReload[ch] = 0;
          this.w.dmcActive = 0x80;
        }
        // $8217-$821E: 写回 volCtrl = hiNib | vol
        blk.volCtrl = hiNib | vol;
      }

      // $8225-$8230: 重载衰减计数器
      vc = this.w.volDecay[ch];
      if (vc === 0 && this.w.volDecayReload[ch] !== 0) {
        this.w.volDecay[ch] = this.w.volDecayReload[ch];
      }
    }

    // ═══ $8233-$8243: 最终 APU 音量 ═══
    // apuVol = (next_dur_hi - volume) | hiNib, clamp ≥ 0
    // next_dur_hi ($070A+X) 是静态值（从 timing table 读取），不随时间变化
    // 当前 BGM00Player 未实现完整 timing table，next_dur_hi 固定为 1
    const nxtDurHi = this.w.nextDurHi[ch];
    let finalVol = nxtDurHi - vol;
    if (finalVol < 0) finalVol = 0;  // $823B-$823D: BPL / LDA #$00
    finalVol |= hiNib;               // $823F: ORA ram_00F6
    blk.apuVol = finalVol;           // $8243: STA (ram_00F0),Y

    // $8245-$8256: Channel type processing
    const cht = this.w.chType[ch];

    // Apply frequency modification based on channel type
    if (cht === 1) {
      this._applyFreqModType1(ch);
    } else if (cht === 2) {
      this._applyFreqModType2(ch);
    }

    // $8255-$825B: Common tail — ORA #$80 on freqHi for non-TRI channels
    // Bank 12 uses APU base X=(7-ch)*4&0xF: TRI ch2/6→X=0x04, skip ORA.
    // SQ1/SQ2/NOISE channels get freq written every frame (via this ORA + _processVolume).
    // TRI only writes freq on _parseNote (no per-frame re-trigger).
    const apuX = ((7 - ch) * 4) & 0x0F;
    if (apuX !== 0x04) {
      blk.freqHi |= 0x80;
      this.w.freqDirty[ch] = 0xFF;
    }
  }

  // $8257-$82B3: 频率修改 (type=1)
  private _applyFreqModType1(ch: number): void {
    const blk = this.blocks[ch];
    let si = this.w.seqIdx[ch];
    if (si >= SEQ_MOD_TABLE_TYPE1.length) si = 0;

    const [dLo, dHi] = SEQ_MOD_TABLE_TYPE1[si];
    let fLo = (this.w.baseFreqLo[ch] + dLo) & 0xFF;
    let fHi = (this.w.baseFreqHi[ch] + dHi) & 7;

    if (fLo > 0xFF) { fHi++; fLo &= 0xFF; }

    blk.freqLo = fLo;
    blk.freqHi = fHi | 0x80;  // ORA #$80 sets dirty flag
    // Bank 12 ASM ORA #$80 sets dirty flag, triggering APU write every frame
    this.w.freqDirty[ch] = 0xFF;

    si = (si + 1) % SEQ_MOD_TABLE_TYPE1.length;
    this.w.seqIdx[ch] = si;
  }

  // $82D2-$8348: 频率修改 (type=2)
  private _applyFreqModType2(ch: number): void {
    const blk = this.blocks[ch];
    let si = this.w.seqIdx[ch];
    if (si >= SEQ_MOD_TABLE_TYPE2.length) si = 0;

    const [dLo, dHi] = SEQ_MOD_TABLE_TYPE2[si];
    let fLo = this.w.baseFreqLo[ch];
    let fHi = this.w.baseFreqHi[ch] & 7;

    if (dHi < 0 || dLo < 0) {
      // Subtract
      const val = ((-dLo) & 0xFF) | ((dHi < 0 ? -dHi : 0) << 8);
      let period = fLo | (fHi << 8);
      period -= val;
      if (period < 2) period = 2;
      fLo = period & 0xFF;
      fHi = (period >> 8) & 7;
    } else {
      fLo = (fLo + dLo) & 0xFF;
      fHi = (fHi + dHi) & 7;
      if (fLo > 0xFF) { fHi++; fLo &= 0xFF; }
    }

    blk.freqLo = fLo;
    blk.freqHi = fHi | 0x80;  // ORA #$80 sets dirty flag
    // Bank 12 ASM ORA #$80 sets dirty flag
    this.w.freqDirty[ch] = 0xFF;

    si = (si + 1) % SEQ_MOD_TABLE_TYPE2.length;
    this.w.seqIdx[ch] = si;
  }

  // ════════════════════════════════════════════════
  // $816E: APU 寄存器写入
  // ════════════════════════════════════════════════

  /**
   * $816E: X = (3^group)*4
   *   group=0 → X=0x0C ($400C — NOISE)
   *   group=1 → X=0x08 ($4008 — TRI)
   *   group=2 → X=0x04 ($4004 — SQ2)
   *   group=3 → X=0x00 ($4000 — SQ1)
   *
   * 严格对照 bank_12.asm $816E-$81DA：
   * 1. 无条件写入 $4000+X（音量/控制）。
   * 2. 检查 vol_ctrl bit4（sweep 使能）：
   *    - 为 0：设置 $07E4,Y=8，并向 $4001+X 写入 $08（禁用 sweep）。
   *    - 为 1：不做额外操作。
   * 3. 检查 freqHi bit7（dirty）：写入 $4002+X 与 $4003+X。
   *    - group 0/1 不去做重；group 2/3 比较上次 $4003 值。
   *    - 写完后若 $07E4,Y != 0，清零 last4003 强制下帧重新触发。
   */
  private _writeApuReg(ch: number, group: number): void {
    const blk = this.blocks[ch];
    const isTri = group === 1;
    const apuBase = BGM00Player.APU_GROUP_BASE[group];
    const apuAddr = 0x4000 + apuBase;

    // $8175-$81A4: 写入 $4000+X（音量/控制）
    // Bank 12 ASM: $8175 LDA (ram_00F0),Y — reads vol_ctrl directly from RAM
    // For TRI: vol_ctrl gives linear counter value (used directly, not through apuVol)
    // For SQ/NOISE: apuVol already contains (durHi-vol)|hiNib which includes duty & volume
    const volByte = isTri ? blk.volCtrl : blk.apuVol;
    if (isTri) {
      // $8182-$8187: AND #$0F, ORA #$80（TRI linear counter enable）
      this.papu.writeReg(apuAddr, (volByte & 0x0F) | 0x80);
    } else {
      // SQ & NOISE: ORA #$30（constant volume + env disabled）
      // duty bits 6-7 已在 vol_ctrl/apuVol 中保留
      this.papu.writeReg(apuAddr, volByte | 0x30);
    }

    // $818F-$81A1: sweep 检查
    if (!(blk.volCtrl & 0x10)) {
      this.w.muteFlags[group] = 0x08;
      // SQ 通道 ($4001/$4005) 和 NOISE ($400D, NES ignores it but Bank12 writes it)
      if (apuBase < 0x08 || group === 0) {
        this.papu.writeReg(apuAddr + 1, 0x08);
      }
    }

    // $81A7-$81DA: 写入频率
    // Bank 12 ASM: $81A7: LDA $51,x; $81A9: BPL skip — check freqHi bit7 directly
    if (blk.freqHi & 0x80) {
      // $81B1: LDA (ram_00F0),Y → read freqHi
      // $81B3: AND #$7F → clear bit7 (dirty flag)
      // $81B5: STA (ram_00F0),Y → write back cleared freqHi
      // $81B8: AND #$07 → keep only bits 0-2
      // $81BA: ORA #$18 → set length counter
      // $81BC: STA $4003,X
      blk.freqHi &= 0x7F;  // clear bit7 dirty flag
      this.w.freqDirty[ch] = 0;

      // $81B3-$81B5: freq_lo → $4002+X
      this.papu.writeReg(apuAddr + 2, blk.freqLo);

      // $81B8-$81CA: (freqHi & 7) | 0x18 → $4003+X
      const fh = blk.freqHi & 7;
      const fhLen = fh | 0x18;

      // $81C5-$81C8: SQ 通道做 $4003 去重；NOISE/TRI 不做
      if (group >= 2 && fhLen === this.w.last4003[group]) {
        return;
      }

      this.papu.writeReg(apuAddr + 3, fhLen);
      this.w.last4003[group] = fhLen;

      // $81D0-$81D7: muteFlags==0 时清零 last4003 强制下帧重新触发 $4003；
      // muteFlags!=0 时保留绕过 dedup 限制（sweep 未启用时 dedup）
      if (this.w.muteFlags[group] === 0) {
        this.w.last4003[group] = 0;
      }
    }
  }

  // ════════════════════════════════════════════════
  // DMC helpers
  // ════════════════════════════════════════════════

  private _dmcInit(sampleAddr: number, sampleLen: number): void {
    this.papu.writeReg(0x4015, 0x0F);
    if (this.w.dmcActive === 0) {
      this.papu.writeReg(0x4010, 0x0F);
      this.papu.writeReg(0x4012, sampleAddr);
      this.papu.writeReg(0x4013, sampleLen);
      this.papu.writeReg(0x4015, 0x1F);
    }
  }

  // ════════════════════════════════════════════════
  // Call stack helpers
  // ════════════════════════════════════════════════

  // Per-channel call stack (stores return addresses)
  private _callStacks: Array<number[]> = Array.from({ length: NUM_CHANNELS }, () => []);

  private _pushReturn(blk: ChBlock): void {
    const ch = this.blocks.indexOf(blk);
    if (ch < 0) return;
    const addr = blk.trackLo | (blk.trackHi << 8);
    if (this._callStacks[ch].length < 8) {
      this._callStacks[ch].push(addr);
    }
  }

  private _popReturn(blk: ChBlock): number | null {
    const ch = this.blocks.indexOf(blk);
    if (ch < 0) return null;
    const stk = this._callStacks[ch];
    if (stk.length === 0) return null;
    return stk.pop()!;
  }

  // Per-channel loop stack (stores loop count + return address)
  private _loopStacks: Array<Array<{ count: number; addr: number }>> =
    Array.from({ length: NUM_CHANNELS }, () => []);

  private _pushLoop(blk: ChBlock, count: number): void {
    const ch = this.blocks.indexOf(blk);
    if (ch < 0) return;
    const addr = blk.trackLo | (blk.trackHi << 8);
    if (this._loopStacks[ch].length < 8) {
      this._loopStacks[ch].push({ count, addr });
    }
  }

  private _popLoop(blk: ChBlock): number | null {
    const ch = this.blocks.indexOf(blk);
    if (ch < 0) return null;
    const stk = this._loopStacks[ch];
    if (stk.length === 0) return null;
    const frame = stk[stk.length - 1];
    frame.count--;
    if (frame.count > 0) {
      return frame.addr;
    } else {
      stk.pop();
      return null;
    }
  }

  // ════════════════════════════════════════════════
  // Track pointer helpers
  // ════════════════════════════════════════════════

  /** Advance track pointer by N bytes */
  private _advanceTrack(blk: ChBlock, n: number): void {
    let addr = blk.trackLo | (blk.trackHi << 8);
    addr += n;
    blk.trackLo = addr & 0xFF;
    blk.trackHi = (addr >> 8) & 0xFF;
  }

  /** Convert NES absolute address → offset within shared data */
  private _nesAddrToOffset(nesAddr: number): number {
    if (this.sharedData) {
      const offset = (nesAddr - this.bgmNesBase) & 0xFFFF;
      if (offset < this.sharedData.length) return offset;
    }
    // Fallback: treat address as-is (old behavior for non-shared mode)
    return nesAddr;
  }
}
