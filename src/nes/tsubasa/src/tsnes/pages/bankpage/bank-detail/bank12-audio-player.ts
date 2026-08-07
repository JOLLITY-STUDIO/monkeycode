/**
 * Bank 12 Audio Player — 基于 Bank 12 ASM 音序器 + PAPU 仿真器的音频播放器
 *
 * 直接翻译 NES Bank 12 (Audio Engine) 的音序器逻辑，结合 PAPU (APU 仿真) 输出音频。
 * 不依赖 CPU 模拟。外部通过 play(id)/stop() 控制，onSample 回调获取音频数据。
 *
 * 数据格式:
 *   $8BDA-$8BFF: 音效指针表 (31 entries × 2B) — 音效ID→通道初始化列表指针
 *   通道初始化列表: [ch, ptrLo, ptrHi]×N, 以 ≥$80 字节终止
 *     - 若 track ptr 指向 terminator 后的数据: 该通道共享同一数据块，从不同偏移读取
 *     - $07AF (chType) 初始=0, 由 $EC 命令在音乐流中动态设置
 *   音符数据: <$80=duration, $80-$DF=note(duration+freq), $E0-$FF=command
 *   $870D-$8724: 频率表 (12 × 2B NES period)
 *   $8725-$8764: 时长表 (64B, 前~48条有效)
 *
 * ASM 对照:
 *   $8002-$80B8: 请求队列处理
 *   $80BA-$811B: 通道更新循环 (8 通道)
 *   $811D-$816D: APU 寄存器写入 (3 组)
 *   $816E-$81DA: 单通道 APU 寄存器写入
 *   $81DB-$8256: 音量/包络/序列处理
 *   $8349-$83CA: 音效初始化 (2 级间接表, terminator→$0F→$4015+RTS)
 *   $83CB-$84C8: 音序器 — 读取下一个音符 ($83E1 BPL→$83F4 duration)
 *   $84C9-$8698: 命令分发 ($E0-$EF)
 */
import PAPU from '../../../src/papu/index';
import { NES_PRG_ROM } from '../../../rom-data/index';

// ════════════════════════════════════════════════
// 常量
// ════════════════════════════════════════════════
const BANK_SIZE = 0x2000;
const CPU_FREQ = 1789772.5;
const CYCLES_PER_FRAME = Math.floor(CPU_FREQ / 60); // ~29830
const CHANNEL_COUNT = 8;
const REQUEST_SLOTS = 6;

// ROM 内偏移 (Bank 12 固定在 $8000-$9FFF)
const B12_OFF = 12 * BANK_SIZE;
const FREQ_TBL = 0x870D; // 12×2 字节 NES 音高周期表
const DUR_TBL = 0x8725; // 64 字节 音符时长表
const SE_MAP = 0x8BDA; // 2 级间接表: 音效ID → 2 字节指针 → 通道初始化列表

// ── Bank 偏移工具 ──
function b12Ofs(addr: number): number { return B12_OFF + (addr - 0x8000); }

/** 从 PRG-ROM 读取字节, 区分的固定 bank 12 窗口 ($8000-$9FFF) 和可切换数据窗口 ($A000-$BFFF) */
function romRead(dataBank: number, addr: number): number {
  if (addr >= 0x8000 && addr < 0xA000) {
    return NES_PRG_ROM[B12_OFF + (addr - 0x8000)];
  }
  if (addr >= 0xA000 && addr < 0xC000) {
    return NES_PRG_ROM[dataBank * BANK_SIZE + (addr - 0x8000)];
  }
  return 0;
}

/** 音效 ID → 辅助数据 bank */
function sidToBank(sid: number): number {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 0x0D;
  if (sid < 0x51) return 0x0E;
  if (sid < 0x5C) return 0x0F;
  return 12;
}

// ════════════════════════════════════════════════
// NES RAM 通道数据结构 (扁平的 Uint8Array 模拟)
// ════════════════════════════════════════════════
//
// 通道参数块布局 ($0707 起, 每通道 16 字节 stride):
//   +0 ($0707): dur_lo     — 当前音符剩余帧数 lo
//   +1 ($0708): dur_hi     — 当前音符剩余帧数 hi  (原代码用 16-bit)
//   +2 ($0709): nextDur_lo — 下个音符 duration lo
//   +3 ($070A): nextDur_hi — 下个音符 duration hi
//   +4 ($070B): ??? freq lookup ptr lo
//   +5 ($070C): ??? freq lookup ptr hi
//   +6 ($070D): vol_out    — 输出音量/衰减 byte (写 $4000)
//   +7 ($070E): freq_out_lo— 输出频率 lo (写 $4002)
//   +8 ($070F): freq_out_hi— 输出频率 hi (写 $4003)
//   +9 ($0710): ??? 
//   +10-15: 更多参数
//
// 单字节 per-channel 区域 (索引 = 8 - ch):
//   $07A7+idx: ?? 
//   $07AF+idx: channelType (0=off, 1=square/tri seq, 2=special)
//   $07B7+idx: baseFreqLo
//   $07BF+idx: baseFreqHi
//   $07C7+idx: seqIndex (0-9, 或 0-7)
//   $07CF+idx: volCounter
//   $07D7+idx: volTimerReset
//
// 全局:
//   $0700-0705: 请求队列 (6 slots)
//   $0706: channelActiveMask
//   $07E0-07E3: 上次 APU 写入缓存 (per group)
//   $07E4-07E7: 静音标志 (per group, 默认 $08=not muted)
//   $07E8: DMC 正在播放标志
//   $07E9: 全局静音

const STRIDE = 16; // 通道参数块步长
const RAM_BASE = 0x0700;

function chIdx(slot: number): number { return 8 - slot; } // NES 内 slot→ch 映射
function chSlot(ch: number): number { return 8 - ch; }

// ── RAM 封装 (key-value 风格, 对应 NES ZP+RAM 布局) ──
class NesRam {
  data: Uint8Array;
  constructor(size = 0x100) { this.data = new Uint8Array(size); }
  // 通道参数 (stride 16, base 0x0707)
  getCh(ch: number, off: number): number { return this.data[0x07 + ch * STRIDE + off] || 0; }
  setCh(ch: number, off: number, v: number) { this.data[0x07 + ch * STRIDE + off] = v; }
  // Per-channel vars (index = 8-ch)
  getPc(ch: number, off: number): number { return this.data[off + chSlot(ch)] || 0; }
  setPc(ch: number, off: number, v: number) { this.data[off + chSlot(ch)] = v; }
  // Global
  get(addr: number): number { return this.data[addr - RAM_BASE] || 0; }
  set(addr: number, v: number) { this.data[addr - RAM_BASE] = v; }
}

// ════════════════════════════════════════════════
// 主播放器
// ════════════════════════════════════════════════
export class Bank12AudioPlayer {
  papu!: PAPU;
  ram: NesRam;
  freqTable: number[]; // 12 条目 11-bit NES 周期
  durTable: number[]; // 64 条目帧数时长

  currentDataBank = 12;
  lastBankCache = 0xFF;
  frameCount = 0;
  playing = false;

  onSample: ((l: number, r: number) => void) | null = null;

  constructor() {
    this.ram = new NesRam(0x100);
    this.freqTable = [];
    this.durTable = [];
    this._initPapu();
    this._loadTables();
  }

  private _initPapu() {
    this.papu = new PAPU({
      opts: { sampleRate: 48000, onAudioSample: null as ((l: number, r: number) => void) | null },
      cpu: {
        requestIrq(_type: number) { },
        dataBus: 0,
        mmap: {
          load(addr: number): number {
            if (addr >= 0xC000) {
              const off = 0x1F * BANK_SIZE + (addr - 0xC000);
              return off < NES_PRG_ROM.length ? NES_PRG_ROM[off] : 0;
            }
            return 0;
          },
        },
      },
    });
  }

  private _loadTables() {
    for (let i = 0; i < 12; i++) {
      const lo = NES_PRG_ROM[b12Ofs(FREQ_TBL) + i * 2];
      const hi = NES_PRG_ROM[b12Ofs(FREQ_TBL) + i * 2 + 1];
      this.freqTable.push(lo | ((hi & 7) << 8));
    }
    for (let i = 0; i < 64; i++) {
      this.durTable.push(NES_PRG_ROM[b12Ofs(DUR_TBL) + i]);
    }
  }

  // ════════════════════════════════════════════════
  // 公共接口
  // ════════════════════════════════════════════════

  play(soundId: number) {
    // 写入请求队列 $0700 (port of ASM: STA ram_0700,X)
    for (let i = 0; i < REQUEST_SLOTS; i++) {
      if (this.ram.get(0x0700 + i) === 0) {
        this.ram.set(0x0700 + i, soundId);
        this.playing = true;
        return;
      }
    }
  }

  stop() {
    this.playing = false;
    this.papu.writeReg(0x4015, 0x0F);
    this.ram.set(0x0706, 0);
    for (let i = 0; i < REQUEST_SLOTS; i++) this.ram.set(0x0700 + i, 0);
  }

  /** 前进一帧 (~1/60s) */
  tickFrame() {
    const samples: { l: number; r: number }[] = [];
    this.papu.nes.opts.onAudioSample = (l: number, r: number) => {
      samples.push({ l, r });
    };

    if (this.playing) {
      this._processRequests();
      this._updateChannels();
      this._writeApuRegisters();
    }

    this.papu.clockFrameCounter(CYCLES_PER_FRAME);

    if (this.onSample) {
      for (const s of samples) this.onSample(s.l, s.r);
    }
    this.frameCount++;
  }

  // ════════════════════════════════════════════════
  // $8002-$80B8: 请求队列处理
  // ════════════════════════════════════════════════
  private _processRequests() {
    for (let x = REQUEST_SLOTS - 1; x >= 0; x--) {
      const rid = this.ram.get(0x0700 + x);
      if (rid === 0) continue;

      // 切换辅助 bank (port of $8002-$805D bank check logic)
      if (rid >= 0x32) {
        const nb = sidToBank(rid);
        if (nb !== this.lastBankCache) {
          this.lastBankCache = nb;
          this.currentDataBank = nb;
        }
      }

      if (rid === 0x31) {
        // 音量衰减初始化 (port of $8073-$808F)
        this._initVolDecay();
      } else if (rid <= 0x72) {
        this._initSound(rid);
      }

      this.ram.set(0x0700 + x, 0);
    }
  }

  /** $8073-$808F: 音量衰减计数器初始化 */
  private _initVolDecay() {
    // ram_07DF = 0x19; set most channels to 0x19, spares to 0x0A
    this.ram.set(0x07DF, 0x19);
    for (let ch = 0; ch < 8; ch++) {
      const v = (ch === 0 || ch === 1 || ch === 2 || ch === 3 || ch === 5 || ch === 6 || ch === 7) ? 0x19 : 0x0A;
      this.ram.setPc(ch, 0x07CF, v);
      this.ram.setPc(ch, 0x07D7, v);
    }
  }

  // ════════════════════════════════════════════════
  // $8349-$83CA: 音效初始化 (2 级间接表)
  // ════════════════════════════════════════════════
  private _initSound(soundId: number) {
    // 1. 2 级间接表: $8BDA + (soundId-1)*2 → 16-bit 指针
    const tblOff = b12Ofs(SE_MAP) + (soundId - 1) * 2;
    const ptrLo = NES_PRG_ROM[tblOff];
    const ptrHi = NES_PRG_ROM[tblOff + 1];
    const initPtr = ptrLo | (ptrHi << 8);

    if (initPtr < 0x8000 || initPtr >= 0xA000) return;

    // 清除所有通道状态
    this._clearAllChannels();

    // 2. 遍历通道初始化列表: [ch, ptrLo, ptrHi]×N, terminated by ≥$80
    //    ASM $8360: LDA (ram_00F0),Y → $8362: BPL $836C → 读到≥$80时写$0F到$4015并RTS
    let y = 0;
    while (true) {
      const ch = NES_PRG_ROM[b12Ofs(initPtr) + y];
      if (ch >= 0x80) {
        // ASM $8364: LDX #$0F / STX $4015 → write $0F and RTS
        this.papu.writeReg(0x4015, 0x0F);
        this.ram.set(0x07E8, 0);
        return;
      }

      const tLo = NES_PRG_ROM[b12Ofs(initPtr) + y + 1];
      const tHi = NES_PRG_ROM[b12Ofs(initPtr) + y + 2];
      y += 3;

      // Port of $836C-$83AE: set up channel params
      // Chase: $836E: LDA #$08; SBC ram_00F4 → slot = 8 - ch
      const slot = 8 - ch;
      if (slot < 0 || slot >= 8) continue;

      // $8376-$8391: clear per-channel state
      this.ram.setPc(ch, 0x07A7, 0);
      this.ram.setPc(ch, 0x07AF, 0);
      this.ram.set(0x07E3, 0);
      this.ram.set(0x07E2, 0);
      this.ram.setPc(ch, 0x07EA, 0);
      this.ram.setPc(ch, 0x07CF, 0);
      this.ram.setPc(ch, 0x07D7, 0);
      this.ram.set(0x07DF, 0);
      this.ram.setPc(ch, 0x07F4, 0);
      this.ram.set(0x07E8, 0);

      // $839C-$83A4: store track pointer at $0727 + ch*16
      this.ram.setCh(ch, 0, tLo); // $0727
      this.ram.setCh(ch, 1, tHi); // $0728

      // $83A7: clear $072C (offset 5 within param block)
      this.ram.setCh(ch, 5, 0);

      // $83AC: init volume = $0F at $0730 (offset 9)
      this.ram.setCh(ch, 9, 0x0F);

      // ★ 注意: ASM $8349-$83CA 不会手动设置 chType ($07AF)，
      //   $07AF 始终为 0，由 $EC 命令在音乐序列数据中动态设置。
      //   不手动设 chType，也不手动设 vol_out (param+6)=$0F。

      // $83B8: set dur = 1 at $0707 (offset 0, stride 4)
      this.ram.set(0x0707 + ch * 4, 1); // dur lo
      this.ram.set(0x0708 + ch * 4, 0); // dur hi

      // $83BB-$83C5: set active bit in mask
      let bit = 1;
      for (let i = 0; i < ch; i++) bit <<= 1;
      this.ram.set(0x0706, this.ram.get(0x0706) | bit);
    }
    // (never reached — terminator at ch>=0x80 always triggers return above)
  }

  private _clearAllChannels() {
    this.ram.set(0x0706, 0);
    for (let ch = 0; ch < 8; ch++) {
      this.ram.setCh(ch, 0, 0); // dur=0
      this.ram.setCh(ch, 1, 0);
      this.ram.setPc(ch, 0x07AF, 0); // type=0 (off)
    }
    // 初始化 mute 标志为 0x08 (not muted), per ASM convention
    for (let g = 0; g < 4; g++) this.ram.set(0x07E4 + g, 0x08);
    this.papu.writeReg(0x4015, 0x0F);
  }

  // ════════════════════════════════════════════════
  // $80BA-$811B: 通道更新循环 (8 通道)
  // ════════════════════════════════════════════════
  private _updateChannels() {
    // Port of $80BA-$811B:
    // ram_00F0 = $0727 (channel params base)
    // ram_00F2 = ch*4 (duration offset)
    // ram_00F3 = ch counter (8→1)

    let mask = this.ram.get(0x0706);

    for (let ch = 0; ch < 8; ch++) {
      const active = mask & 1;
      mask >>= 1;
      if (!active) continue;

      const durOff = 0x0707 + ch * 4;

      // $80D9: DEC ram_0707,X  (duration lo)
      let durLo = this.ram.get(durOff);
      durLo = (durLo - 1) & 0xFF;
      this.ram.set(durOff, durLo);

      if (durLo === 0) {
        // $80DE: JSR $83CB (sequencer)
        this._sequencerReadNext(ch);
      }

      // $80E3: DEC ram_0709,X
      let ndLo = this.ram.get(durOff + 2);
      ndLo = (ndLo - 1) & 0xFF;
      this.ram.set(durOff + 2, ndLo);

      if (ndLo === 0) {
        // $80E8-$8108: process next note timing
        this._nextNoteTiming(ch);
      }

      // $8109: JSR $81DB (volume/envelope)
      this._processVolume(ch);
    }
  }

  // ════════════════════════════════════════════════
  // $83CB-$84C8: 音序器 — 读取下一个音符/命令
  // ════════════════════════════════════════════════
  private _sequencerReadNext(ch: number) {
    // ram_00F4/00F5 = track pointer (stored at $0727+ch*16+0/+1)
    let tLo = this.ram.getCh(ch, 0);
    let tHi = this.ram.getCh(ch, 1);
    let tPtr = tLo | (tHi << 8);

    // $83D3-$83DE: read track data pointer from init data (after AND $CF fixup)
    // Then read from track stream
    const dataBank = this.currentDataBank;

    while (true) {
      const b = romRead(dataBank, tPtr);
      tPtr++;

      if (b >= 0x80) {
        // ASM $83E1: BPL → b<0x80→duration;  b>=0x80→check further
        if (b >= 0xE0) {
          // ASM $83E3: CMP #$E0 / BCC $83ED → b∈[$E0,$FF] dispatch
          const cmdResult = this._dispatchCommand(b, ch, dataBank, { tPtr });
          if (cmdResult.ret < 0) break;
          tPtr = cmdResult.tPtr;
          this.ram.setCh(ch, 0, tPtr & 0xFF);
          this.ram.setCh(ch, 1, (tPtr >> 8) & 0xFF);
          continue;
        }
        // ASM $83ED: CMP #$B0 / BCC $83F4 → b∈[$80,$DF] is a note
        // (Note: CDL trace confirms $B0+ code at $83F1 is UNACCESSED —
        //  the 3 bytes at $83F1-$83F3 are data, not code.
        //  ALL $80-$DF bytes fall through to the same $83F4 handler.)

        // ASM $83F4: AND #$3F; TAX; LDA $8725,X → duration lookup
        const durIdx = b & 0x3F;
        const dur = this.durTable[durIdx] || 1;
        this.ram.set(0x0707 + ch * 4, dur);
        this.ram.set(0x0709 + ch * 4, dur);

        // Frequency: ASM $8404-$845C branches based on note value.
        // Key path: $842E TAX / $842F AND #$0F / 0-11→FREQ_TBL, 12-15→octave shift
        const noteIdx = b & 0x0F;
        const period = this.freqTable[noteIdx % this.freqTable.length] || 0x07FF;
        const fLo = period & 0xFF;
        const fHi = (period >> 8) & 7;
        this.ram.setPc(ch, 0x07B7, fLo);
        this.ram.setPc(ch, 0x07BF, fHi);
        this.ram.setCh(ch, 7, fLo);
        this.ram.setCh(ch, 8, fHi | 0x08);

        this.ram.setCh(ch, 0, tPtr & 0xFF);
        this.ram.setCh(ch, 1, (tPtr >> 8) & 0xFF);
        break;
      }

      // ASM $83E1 BPL → b < 0x80: pure duration byte
      const dur = this.durTable[b & 0x3F] || 1;
      this.ram.set(0x0707 + ch * 4, dur);
      this.ram.set(0x0709 + ch * 4, dur);
      this.ram.setCh(ch, 0, tPtr & 0xFF);
      this.ram.setCh(ch, 1, (tPtr >> 8) & 0xFF);
      break;
    }
  }

  // ════════════════════════════════════════════════
  // $84C9-$8698: 命令分发
  // ════════════════════════════════════════════════
  private _dispatchCommand(cmd: number, ch: number, dataBank: number, state: { tPtr: number }): { ret: number; tPtr: number } {
    const cmdIdx = cmd & 0x1F;
    let tPtr = state.tPtr;

    switch (cmdIdx) {
      case 0x00: // $E0: SET_NOTE_LENGTH
        if (tPtr < 0xC000) {
          tPtr++; // skip length byte (simplified)
        }
        return { ret: 1, tPtr };

      case 0x01: // $E1
        return { ret: 1, tPtr };

      case 0x02: // $E2: SET_VOLUME_ENV
        if (tPtr < 0xC000) {
          const v = romRead(dataBank, tPtr);
          tPtr++;
          this.ram.setCh(ch, 6, v); // vol_out
        }
        return { ret: 1, tPtr };

      case 0x03: // $E3: SET_VOLUME
        if (tPtr < 0xC000) {
          const v = romRead(dataBank, tPtr);
          tPtr++;
          this.ram.setCh(ch, 6, v);
          this.ram.setPc(ch, 0x07CF, v);
        }
        return { ret: 1, tPtr };

      case 0x04: // $E4: SUB_CALL
        if (tPtr < 0xC000) {
          const lo = romRead(dataBank, tPtr);
          const hi = romRead(dataBank, tPtr + 1);
          tPtr += 2;
          // Push return address (simplified: store tPtr in stack area)
          // For now: just jump
          tPtr = lo | (hi << 8);
        }
        return { ret: 1, tPtr };

      case 0x05: // $E5: SUB_RETURN
        // Return to caller (simplified)
        return { ret: -1, tPtr };

      case 0x06: // $E6
      case 0x07: // $E7
        return { ret: 1, tPtr };

      case 0x08: // $E8: JUMP
        if (tPtr < 0xC000) {
          const lo = romRead(dataBank, tPtr);
          const hi = romRead(dataBank, tPtr + 1);
          tPtr = lo | (hi << 8);
        }
        return { ret: 1, tPtr };

      case 0x09: // $E9: RELATIVE_JUMP
        if (tPtr < 0xC000) {
          const off = romRead(dataBank, tPtr);
          tPtr++;
          tPtr += (off & 0x80) ? (off - 256) : off;
        }
        return { ret: 1, tPtr };

      case 0x0A: // $EA: ENV_SLIDE
        if (tPtr < 0xC000) tPtr++;
        return { ret: 1, tPtr };

      case 0x0B: // $EB: VOLUME_FADE
        if (tPtr < 0xC000) {
          const v = romRead(dataBank, tPtr);
          tPtr++;
          this.ram.setPc(ch, 0x07CF, v);
        }
        return { ret: 1, tPtr };

      case 0x0C: // $EC: EFFECT_CTRL
        if (tPtr < 0xC000) {
          const v = romRead(dataBank, tPtr);
          tPtr++;
          this.ram.setPc(ch, 0x07AF, v);
        }
        return { ret: 1, tPtr };

      case 0x0D: // $ED: DMC
        if (tPtr < 0xC000) {
          const sid = romRead(dataBank, tPtr);
          tPtr++;
          this._initDmc(sid);
        }
        return { ret: 1, tPtr };

      case 0x0E: // $EE
      case 0x0F: // $EF
        if (tPtr < 0xC000) tPtr++;
        return { ret: 1, tPtr };

      default:
        return { ret: 1, tPtr };
    }
  }

  /** $80E8-$8108: 下个音符时序处理 */
  private _nextNoteTiming(ch: number) {
    // Port of $80E8-$8108
    // Read 3 bytes from param block +2/3/4: ptr_lo, ptr_hi, offset
    const ptrLo = this.ram.getCh(ch, 2); // $0709
    const ptrHi = this.ram.getCh(ch, 3); // $070A
    // Next byte: offset into timing table at ptrLo|ptrHi
    let timingOff = this.ram.getCh(ch, 4); // $070B
    const timingBase = ptrLo | (ptrHi << 8);
    if (timingBase >= 0x8000 && timingBase < 0xA000) {
      const durLo = romRead(12, timingBase + timingOff);
      const durHi = romRead(12, timingBase + timingOff + 1);
      this.ram.set(0x0709 + ch * 4, durLo); // next dur lo
      this.ram.set(0x070A + ch * 4, durHi || 0); // next dur hi
      timingOff += 2;
      this.ram.setCh(ch, 4, timingOff);
    }
  }

  // ════════════════════════════════════════════════
  // $81DB-$8256: 音量/包络/序列处理
  // ════════════════════════════════════════════════
  private _processVolume(ch: number) {
    // $81DB-$81E1: read volume byte at $0727 + ch*16 + 5 (vol/ctrl)
    const volByte = this.ram.getCh(ch, 5); // $072C
    const hiNib = volByte & 0xF0;
    const loNib = volByte & 0x0F;

    // Check type
    const chType = this.ram.getPc(ch, 0x07AF);
    if (chType === 0) return;

    if (hiNib & 0x20) {
      // Immediate volume
      this.ram.setCh(ch, 6, 0x0F);
      return;
    }

    // $81EE-$8256: volume decay logic
    let vol = loNib;

    // $81F6-$8200: check and decrement volCounter
    let volCounter = this.ram.getPc(ch, 0x07CF);
    if (volCounter > 0) {
      volCounter--;
      this.ram.setPc(ch, 0x07CF, volCounter);
      if (volCounter !== 0) {
        // Still counting down
      } else {
        // Counter hit 0: increase volume
        vol++;
        if (vol > 0x0F) vol = 0x0F;
      }
    } else {
      // Counter already 0
      const volTimer = this.ram.getPc(ch, 0x07D7);
      if (volTimer === 0) {
        vol++;
        if (vol > 0x0F) vol = 0x0F;
      } else {
        this.ram.setPc(ch, 0x07CF, volTimer);
      }
    }

    // $8217-$821E: combine hi nibble + new volume, store back
    this.ram.setCh(ch, 5, hiNib | vol);

    // $8233-$8256: apply to output (subtract from dur timings)
    this.ram.setCh(ch, 6, vol | hiNib);

    // $8248-$8256: handle channel type 1 (sequence) or type 2 (special)
    if (chType === 1) {
      this._processSequence(ch);
    }
  }

  /** $8257-$82D1 / $82D2-$833D: 音序处理 (portamento/vibrato) */
  private _processSequence(ch: number) {
    const seqIdx = this.ram.getPc(ch, 0x07C7);
    const baseLo = this.ram.getPc(ch, 0x07B7);
    const baseHi = this.ram.getPc(ch, 0x07BF);
    let freqLo = baseLo;
    let freqHi = baseHi;

    // $8257-$8266: jump table based on seqIdx
    // Simplified: cycle through sequence positions
    // Sequence positions: 0-9 (type 1) or 0-7 (type 2)
    switch (seqIdx) {
      case 0: freqLo = baseLo; break;           // base
      case 1: freqLo = baseLo; break;           // base
      case 2: freqLo = baseLo + 1; break;       // +1
      case 3: freqLo = baseLo + 2; break;       // +2
      case 4: freqLo = baseLo + 1; break;       // +1
      case 5: freqLo = baseLo; break;           // base
      case 6: freqLo = baseLo; break;           // base
      case 7: freqLo = baseLo - 1; break;       // -1
      case 8: freqLo = baseLo - 2; break;       // -2
      case 9: freqLo = baseLo - 1; break;       // -1
    }

    // Fixup freqHi on borrow/carry
    if (freqLo > 0xFF) { freqHi++; freqLo &= 0xFF; }
    if (freqLo < 0) { freqHi--; freqLo = (freqLo + 256) & 0xFF; }

    // Store output freq
    this.ram.setCh(ch, 7, freqLo);
    this.ram.setCh(ch, 8, freqHi);

    // Advance seqIdx
    let nextIdx = seqIdx + 1;
    if (nextIdx >= 10) nextIdx = 0;
    this.ram.setPc(ch, 0x07C7, nextIdx);
  }

  // ════════════════════════════════════════════════
  // $811D-$816D: APU 寄存器写入
  // ════════════════════════════════════════════════
  private _writeApuRegisters() {
    // 4 组: SQ1 (ch0,1) → $4000-4003
    //       SQ2 (ch2,3) → $4004-4007
    //       TRI   (ch4) → $4008-400B
    //       NOISE (ch5) → $400C-400F
    // Port of $8129-$816D

    const groups = [
      { mask: 0x03, apuBase: 0x4000 }, // bits 0+1 → SQ1 ($4000)
      { mask: 0x0C, apuBase: 0x4004 }, // bits 2+3 → SQ2 ($4004)
      { mask: 0x10, apuBase: 0x4008 }, // bit 4 → TRI ($4008)
      { mask: 0x20, apuBase: 0x400C }, // bit 5 → NOISE ($400C)
    ];

    for (let grpIdx = 0; grpIdx < groups.length; grpIdx++) {
      const grp = groups[grpIdx];
      const activeMask = this.ram.get(0x0706);

      if ((activeMask & grp.mask) === 0) continue;

      // Find first active channel in this group
      let firstCh = -1;
      for (let b = 0; b < 8; b++) {
        if (grp.mask & (1 << b)) {
          if (activeMask & (1 << b)) {
            firstCh = b;
            break;
          }
        }
      }
      if (firstCh < 0) continue;

      const ch = firstCh;
      const chType = this.ram.getPc(ch, 0x07AF);
      if (chType === 0) continue;

      // Check mute flag
      const mute = this.ram.get(0x07E4 + grpIdx);
      if (mute !== 0 && mute !== 0x08) {
        // Channel muted — skip OR write silence
        this.papu.writeReg(grp.apuBase, 0x30); // silence with constant vol=0
        if (grp.apuBase <= 0x4004) {
          this.papu.writeReg(grp.apuBase + 1, 0x08); // sweep off (square only)
        }
        continue;
      }

      // $816E-$81DA: write channel APU registers
      this._writeChannelApu(ch, grp, grpIdx);
    }
  }

  /** $816E-$81DA: 写单个通道到 APU */
  private _writeChannelApu(ch: number, grp: { mask: number; apuBase: number }, grpIdx: number) {
    const apuBase = grp.apuBase;
    const isTri = apuBase === 0x4008;
    const isNoise = apuBase === 0x400C;

    // $8177: read volume byte from param+6
    const volByte = this.ram.getCh(ch, 6);

    if (isTri) {
      // Triangle: volume & 0x0F | 0x80 (bit7=halt)
      this.papu.writeReg(apuBase, (volByte & 0x0F) | 0x80);
    } else if (isNoise) {
      // Noise: $400C = volume/control (constant vol + duty/vol bits)
      this.papu.writeReg(apuBase, (volByte & 0x0F) | 0x30);
    } else {
      // Square: volume | 0x30 (duty 50% + constant vol mode)
      this.papu.writeReg(apuBase, (volByte & 0x0F) | 0x30);
    }

    // $8191-$81A0: check vol control bit $10 (at param+5)
    const ctrlByte = this.ram.getCh(ch, 5);
    if (ctrlByte & 0x10) {
      // Sweep: write $08 (square only; noise $400D / tri $4009 are unused)
      this.ram.set(0x07E4 + grpIdx, 0x08);
      if (!isNoise && !isTri) {
        this.papu.writeReg(apuBase + 1, 0x08);
      }
    }

    // $81A7-$81AA: read freq byte at param+7/8
    const freqLo = this.ram.getCh(ch, 7);
    const freqHi = this.ram.getCh(ch, 8);

    // Check if freq was already written (byte at param+8, bit7)
    if (!(freqHi & 0x80)) {
      // $81B3-$81B4: write freq lo
      this.papu.writeReg(apuBase + 2, freqLo);

      // $81B8-$81CA: write freq hi | 0x18 (length counter)
      const fhLen = (freqHi & 7) | 0x18;
      this.papu.writeReg(apuBase + 3, fhLen);

      // Cache last written value
      this.ram.set(0x07E0 + grpIdx, fhLen);
    }
  }

  /** 初始化 DMC 通道 ($8699/$86B8/$86D7) */
  private _initDmc(sampleId: number) {
    this.papu.writeReg(0x4015, 0x0F);
    if (this.ram.get(0x07E8)) return;

    this.papu.writeReg(0x4010, 0x0F);
    this.papu.writeReg(0x4012, 0); // sample address offset
    this.papu.writeReg(0x4013, 0x0C); // sample length
    this.papu.writeReg(0x4015, 0x1F);
  }

  /** 导出 5 个 APU 通道实时状态 (供 UI 显示) */
  getApuChannelStates(): ApuChannelState[] {
    const sq1 = this.papu.square1;
    const sq2 = this.papu.square2;
    const tri = this.papu.triangle;
    const noise = this.papu.noise;
    const dmc = this.papu.dmc;
    const regs = this.papu.regValues;

    // NES 频率 → 近似音高 (Hz)
    const nesFreqHz = (period: number) =>
      period > 0 ? Math.round(CPU_FREQ / (16 * (period + 1))) : 0;
    const h2 = (v: number) => '$' + v.toString(16).toUpperCase().padStart(4, '0');
    const b = (addr: number) => regs[addr - 0x4000].toString(16).toUpperCase().padStart(2, '0');
    const rb = (base: number) => `${b(base)} ${b(base + 1)} ${b(base + 2)} ${b(base + 3)}`;

    return [
      {
        name: 'SQ1',
        regBase: '$4000',
        enabled: sq1.isEnabled,
        volume: sq1.envVolume,
        volumeHex: h2(sq1.envVolume),
        frequency: sq1.progTimerMax,
        freqHex: h2(sq1.progTimerMax),
        freqHz: nesFreqHz(sq1.progTimerMax),
        duty: sq1.dutyMode,
        lengthCounter: sq1.lengthCounter,
        extra: sq1.sweepActive ? `SW${sq1.sweepShiftAmount}` : '',
        regs: rb(0x4000),
      },
      {
        name: 'SQ2',
        regBase: '$4004',
        enabled: sq2.isEnabled,
        volume: sq2.envVolume,
        volumeHex: h2(sq2.envVolume),
        frequency: sq2.progTimerMax,
        freqHex: h2(sq2.progTimerMax),
        freqHz: nesFreqHz(sq2.progTimerMax),
        duty: sq2.dutyMode,
        lengthCounter: sq2.lengthCounter,
        extra: sq2.sweepActive ? `SW${sq2.sweepShiftAmount}` : '',
        regs: rb(0x4004),
      },
      {
        name: 'TRI',
        regBase: '$4008',
        enabled: tri.isEnabled && tri.sampleCondition,
        volume: tri.linearCounter,
        volumeHex: h2(tri.linearCounter),
        frequency: tri.progTimerMax,
        freqHex: h2(tri.progTimerMax),
        freqHz: nesFreqHz(tri.progTimerMax),
        duty: -1,
        lengthCounter: tri.lengthCounter,
        extra: tri.lcHalt ? 'HALT' : '',
        regs: rb(0x4008),
      },
      {
        name: 'NOISE',
        regBase: '$400C',
        enabled: noise.isEnabled,
        volume: noise.envVolume,
        volumeHex: h2(noise.envVolume),
        frequency: noise.progTimerMax,
        freqHex: h2(noise.progTimerMax),
        freqHz: 0,
        duty: -1,
        lengthCounter: noise.lengthCounter,
        extra: noise.randomMode === 0 ? '93-bit' : '32767-bit',
        regs: rb(0x400C),
      },
      {
        name: 'DMC',
        regBase: '$4010',
        enabled: dmc.isEnabled,
        volume: dmc.sample,
        volumeHex: h2(dmc.sample),
        frequency: dmc.dmaFrequency,
        freqHex: h2(dmc.dmaFrequency),
        freqHz: dmc.dmaFrequency > 0 ? Math.round(CPU_FREQ / dmc.dmaFrequency) : 0,
        duty: -1,
        lengthCounter: dmc.playLengthCounter,
        extra: dmc.hasSample ? 'SAMPLE' : dmc.isEnabled ? 'WAIT' : '',
        regs: `${b(0x4010)} ${b(0x4011)} ${b(0x4012)} ${b(0x4013)} $4015=${b(0x4015)}`,
      },
    ];
  }
}

/** APU 通道状态 (供 UI 消费) */
export interface ApuChannelState {
  name: string;
  regBase: string;
  enabled: boolean;
  volume: number;
  volumeHex: string;
  frequency: number;
  freqHex: string;
  freqHz: number;
  duty: number;
  lengthCounter: number;
  extra: string;
  regs: string;
}
