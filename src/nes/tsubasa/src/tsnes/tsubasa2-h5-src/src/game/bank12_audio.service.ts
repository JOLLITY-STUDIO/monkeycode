/**
 * Bank 12 — Audio Manager Service (音频引擎)
 *
 * CPU 映射: $8000-$9FFF (MMC3 R6 select)
 * PRG offset: 0x018010-0x01A00F
 *
 * 原始 6502 汇编翻译为 TypeScript H5 版本。
 * 不模拟 APU 寄存器，使用 IAudioOutput 接口输出音频事件。
 *
 * 架构:
 *   请求队列 ($0700-$0705) → NMI 每帧处理 → 通道状态机 → 音序读取 → APU 输出
 *
 * 原始入口:
 *   $8002: 音频主循环 — NMI 每帧调用，处理请求队列 + 活跃通道
 *   $8349: 音乐播放初始化 — 解析通道初始化列表
 *   $83CB: 音序读取器 — 读下一个音符/命令
 *   $84C9: 音频命令分发器 ($E0-$EF)
 *   $816E: APU 寄存器写入 — 写 $4000-$4013
 *   $81DB: 音量/衰减处理
 *   $8257: 频率计算 (类型1通道)
 */

import type { DataStore } from '../data/DataStore';

// ═══════════════════════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════════════════════

/** 单个音频通道波形类型 */
export enum ChannelType {
  OFF = 0,
  SQUARE_TRI = 1,  // 方波/三角波 — JMP $8257
  SPECIAL = 2,      // 特殊处理 — JMP $82D2
}

/** APU 输出事件（代替原始 $4000-$4013 写入） */
export interface ApuWriteEvent {
  addr: number;      // $4000-$4013
  value: number;     // 0x00-0xFF
}

/** 音频输出接口 — 外部实现（Web Audio API / Mock） */
export interface IAudioOutput {
  /** APU 寄存器写入事件 */
  writeApu(events: ApuWriteEvent[]): void;
  /** 设置通道状态 */
  setChannel(index: number, freq: number, volume: number, duty: number): void;
  /** 停止所有通道 */
  silenceAll(): void;
}

// ═══════════════════════════════════════════════════════════════
// 频率表 & 时长表 (Bank 12 $870D-$8764)
// ═══════════════════════════════════════════════════════════════

/**
 * NES APU 频率周期表 ($870D-$8724, 12 entries × 2B)
 * 12 半音一个八度，lo | ((hi & 7) << 8) 构成 11-bit 周期值
 */
const FREQ_TABLE_LO: number[] = [
  0xAE, 0x4E, 0xF3, 0x9D, 0x4C, 0x00, 0xB8, 0x74, 0x34, 0xF8, 0xBF, 0x89,
];

const FREQ_TABLE_HI: number[] = [
  0x06, 0x06, 0x05, 0x05, 0x05, 0x05, 0x04, 0x04, 0x04, 0x03, 0x03, 0x03,
];

/** 音符时长表 ($8725-$8764, 64B, 前 ~48 有效) */
const DURATION_TABLE: number[] = [
  0x00, // 0
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x08, 0x0A, 0x0C, // 1-9
  0x0E, 0x10, 0x12, 0x16, 0x1A, 0x1E, 0x22, 0x28, 0x2E, // 10-18
  0x34, 0x3A, 0x42, 0x4A, 0x52, 0x5A, 0x64, 0x6E, 0x78, // 19-27
  0x82, 0x8C, 0x96, 0xA0, 0xAA, 0xB4, 0xBE, 0xC8,      // 28-35
  0xD2, 0xDC, 0xE6, 0xF0, 0xFA,                         // 36-40
  0x04, 0x08, 0x0C, 0x10, 0x14, 0x18, 0x1C,              // 41-47 (extended)
  // Index 48-63: overlapping/noise, don't use
];

// ═══════════════════════════════════════════════════════════════
// 通道参数块 (8 channels × 16 bytes, stride 0x10, base $0707)
// ═══════════════════════════════════════════════════════════════

interface ChannelParams {
  durLo: number;        // +0: 当前音符剩余帧数 lo
  durHi: number;        // +1: 当前音符剩余帧数 hi
  nextDurLo: number;    // +2: 下一音符帧数 lo
  nextDurHi: number;    // +3: 下一音符帧数 hi
  freqLo: number;       // +4: 音符频率 lo (带 pitch bend)
  freqHi: number;       // +5: 音符频率 hi
  volRaw: number;       // +6: 音量原始值
  freqRawLo: number;    // +7: 原始频率 lo (pitch bend 基准)
  freqRawHi: number;    // +8: 原始频率 hi
  chType: number;       // +9: 通道类型 (0/1/2)
  baseFreqLo: number;   // +10: base 频率 lo
  baseFreqHi: number;   // +11: base 频率 hi
  seqIndex: number;     // +12: 音序位置 (0-9)
  volMode: number;      // +13: 音量/模式衰减
  unk0E: number;        // +14: $07D7 area
  unk0F: number;        // +15: $07DF area
}

// ═══════════════════════════════════════════════════════════════
// Bank12 Audio Manager
// ═══════════════════════════════════════════════════════════════

export class Bank12AudioService {

  // ── 音频 RAM ($0700-$07FF) ──

  /** 请求队列: 6 个槽 ($0700-$0705) */
  private _reqQueue = new Uint8Array(6);

  /** 通道活动标志 ($0706): bitmask, bit=1 → 活跃 */
  private _chActive = 0;

  /** 通道参数: 8 个通道 (每通道 16B → 共 $0707-$0786) */
  private _chParams: ChannelParams[] = [];

  /** 末次 $4003 写入缓存 ($07E0-$07E3): 去重优化 */
  private _last4003 = new Uint8Array(4);

  /** DMC 播放标志 ($07E8) */
  private _dmcFlag = 0;

  /** Channel type array ($07AF-$07B6): 8 channels */
  private _chTypes = new Uint8Array(8);

  /** Base freq lo array ($07B7-$07BE): 8 channels */
  private _baseFreqLo = new Uint8Array(8);

  /** Base freq hi array ($07BF-$07C6): 8 channels */
  private _baseFreqHi = new Uint8Array(8);

  /** Sequence index array ($07C7-$07CE): 8 channels */
  private _seqIndexes = new Uint8Array(8);

  /** Volume/mode array ($07CF-$07D6): 8 channels */
  private _volModes = new Uint8Array(8);

  /** 每个通道的音序数据指针 ($0727+, 8×2B) */
  private _trackPtrs = new Uint16Array(8);

  /** 每个通道的音序数据 bank 号 */
  private _trackBanks = new Uint8Array(8);

  // ── 外部依赖 ──

  private _store: DataStore;
  private _audioOut: IAudioOutput;

  // ── Bank 数据 (直接引用，无 MMC3) ──

  /** Bank 0D: 音频数据 */
  private _bank0D: number[] = [];
  /** Bank 0E: 音频数据 */
  private _bank0E: number[] = [];
  /** Bank 0F: 音频数据 */
  private _bank0F: number[] = [];
  /** Bank 15: BGM 数据 */
  private _bank15: number[] = [];

  /** 音效指针表 (Bank 12 $8BDA, 31 entries × 2B) */
  private _seTable: number[] = [];

  // ── 工作变量 ──

  /** 当前通道索引 (0-7) */
  private _curChIndex = 0;

  /** 临时指针 ($00F0-F5) */
  private _tmpLo = 0;
  private _tmpHi = 0;
  private _tmpC = 0;

  constructor(store: DataStore, audioOut: IAudioOutput) {
    this._store = store;
    this._audioOut = audioOut;

    // 初始化通道参数
    for (let i = 0; i < 8; i++) {
      this._chParams.push(this._makeChannelParams());
    }
  }

  // ──────────────────────────────────────────────
  // Bank 数据注入 (外部调用，替代 MMC3 映射)
  // ──────────────────────────────────────────────

  /** 设置 Bank 0D/0E/0F/15 数据 + 音效指针表 */
  setBankData(params: {
    bank0D?: number[];
    bank0E?: number[];
    bank0F?: number[];
    bank15?: number[];
    seTable?: number[];
  }): void {
    if (params.bank0D) this._bank0D = params.bank0D;
    if (params.bank0E) this._bank0E = params.bank0E;
    if (params.bank0F) this._bank0F = params.bank0F;
    if (params.bank15) this._bank15 = params.bank15;
    if (params.seTable) this._seTable = params.seTable;
  }

  // ──────────────────────────────────────────────
  // 对外接口: 请求播放
  // ──────────────────────────────────────────────

  /**
   * 请求播放音效/音乐 (对应外部写 ram_0700,X)。
   * H5: 找一个空槽写入请求 ID。
   *
   * @param seId 音效 ID (0x01-0x72)
   */
  requestPlay(seId: number): boolean {
    for (let i = 0; i < 6; i++) {
      if (this._reqQueue[i] === 0) {
        this._reqQueue[i] = seId;
        return true;
      }
    }
    return false; // 队列满
  }

  /** 停止所有播放 */
  stopAll(): void {
    this._reqQueue.fill(0);
    this._chActive = 0;
    for (let i = 0; i < 8; i++) {
      this._chParams[i] = this._makeChannelParams();
      this._chTypes[i] = 0;
      this._trackPtrs[i] = 0;
    }
    this._audioOut.silenceAll();
  }

  // ═══════════════════════════════════════════════════════════════
  // $8002: 音频主循环 — 每帧 NMI 调用
  // ═══════════════════════════════════════════════════════════════

  /**
   * 每帧调用 (对应 NMI $8002 入口)。
   * 处理请求队列 → 更新活跃通道 → 写 APU 输出。
   */
  update(): ApuWriteEvent[] {
    const events: ApuWriteEvent[] = [];

    // ── Step 1: 处理请求队列 ($8002-$805D) ──
    this._processReqQueue();

    // ── Step 2: 遍历活跃通道 ($8063-$80B7) ──
    this._processActiveChannels();

    // ── Step 3: 通道组处理 → 写 APU ($811D-$816D) ──
    this._writeApuGrouped(events);

    this._audioOut.writeApu(events);
    return events;
  }

  // ──────────────────────────────────────────────
  // $8002-$805D: 处理请求队列
  // ──────────────────────────────────────────────

  private _processReqQueue(): void {
    // 对应 $8002: LDX #$05 → loop X=5→0
    for (let x = 5; x >= 0; x--) {
      const req = this._reqQueue[x];
      if (req === 0) continue;

      // 范围检查: req > $72 → 跳过
      if (req > 0x72) {
        this._reqQueue[x] = 0;
        continue;
      }

      // BGM ID (0x31-0x35): 从 Bank15 直接初始化，不使用 SE 指针表
      if (req >= 0x31 && req <= 0x35) {
        // $31 特殊: 初始化音量值 (对应 $8070-$80A4)
        if (req === 0x31) this._initVolFor0x31();
        this._audioInitBgm(req);
        this._reqQueue[x] = 0;
        continue;
      }

      // 查找 bank: $32-$43→Bank 0D, $44-$50→Bank 0E, $51-$5B→Bank 0F
      let bankData: number[] | null = null;
      if (req >= 0x32 && req <= 0x43) bankData = this._bank0D;
      else if (req >= 0x44 && req <= 0x50) bankData = this._bank0E;
      else if (req >= 0x51 && req <= 0x5B) bankData = this._bank0F;

      // $8349: 音乐播放初始化
      this._audioInit(req, bankData);

      // 清除请求
      this._reqQueue[x] = 0;
    }
  }

  // ──────────────────────────────────────────────
  // $8349-$83CA: 音乐播放初始化
  // ──────────────────────────────────────────────

  /**
   * 对应 $8349: A=seId → 查 $8BDA 指针表 → 分配通道 → 初始化参数。
   */
  private _audioInit(seId: number, bankData: number[] | null): void {
    const idx = (seId - 1) * 2;
    if (idx + 1 >= this._seTable.length) return;

    const ptrLo = this._seTable[idx];
    const ptrHi = this._seTable[idx + 1];
    if (ptrLo === 0xFF && ptrHi === 0x00) return; // $FF00 哨兵

    // 通道初始化列表: [ch, ptrLo, ptrHi] × N, ≥$80 终止
    let pos = ptrLo | (ptrHi << 8);
    const bank = bankData ?? this._bank12Data();

    while (true) {
      // 读 ch 编号
      const ch = bank[pos - 0x8000] ?? 0;
      if (ch >= 0x80) {
        // 终止符 → $0F→$4015 (打开所有通道)
        break;
      }
      pos++;
      const tLo = bank[pos - 0x8000] ?? 0;
      pos++;
      const tHi = bank[pos - 0x8000] ?? 0;
      pos++;

      const trackPtr = tLo | (tHi << 8);
      const slot = 7 - ch; // 高位通道映射到低 slot

      // 清除 per-channel 状态
      this._chParams[slot] = this._makeChannelParams();
      this._chTypes[slot] = 0; // type=0→无输出，直到 $EC 命令激活
      this._baseFreqLo[slot] = 0;
      this._baseFreqHi[slot] = 0;
      this._seqIndexes[slot] = 0;
      this._volModes[slot] = 0x0F;

      // 存 track ptr
      this._trackPtrs[slot] = trackPtr;
      this._trackBanks[slot] = seId; // track bank identification

      // 初始化 volume=0x0F, duration=1
      const cp = this._chParams[slot];
      cp.volRaw = 0x0F;
      cp.durLo = 1;
      cp.durHi = 0;

      // 设 $0706 bitmask
      this._chActive |= (1 << slot);
    }
  }

  /**
   * BGM 初始化: 从 Bank15 读取通道初始化列表。
   * BGM ID (0x31-0x35) 不使用 SE 指针表，而是直接按数组偏移查找 Bank15 数据。
   *
   * 通道初始化列表格式:
   *   [ch(0-7), ptrLo, ptrHi] × N, ≥$80 终止
   * ptrLo|ptrHi 为 Bank15 内 CPU 地址 ($Axxx)，存入时转成数组偏移。
   */
  private _audioInitBgm(bgmId: number): void {
    const { BGM_DATA_MAP } = require('./bank15_data.service');
    const offset = BGM_DATA_MAP[bgmId];
    if (offset === undefined || this._bank15.length === 0) {
      console.warn(`[Bank12] BGM 0x${bgmId.toString(16)}: Bank15 数据未加载`);
      this._audioInitBgmFallback();
      return;
    }

    const bank = this._bank15;
    let pos = offset;
    let chCount = 0;

    while (pos < offset + 64) { // 安全上限: 64 bytes
      const ch = bank[pos];
      if (ch === undefined || ch >= 0x80) break;
      pos++;
      const tLo = bank[pos] ?? 0; pos++;
      const tHi = bank[pos] ?? 0; pos++;

      // 原始数据中的指针是 Bank15 CPU 地址 ($A000-$BFFF)，转成数组偏移
      const cpuPtr = (tLo | (tHi << 8)) & 0xFFFF;
      const trackPtr = cpuPtr - 0xA000; // $A000 → 0, $B000 → 0x1000
      const slot = 7 - (ch & 0x07);

      this._chParams[slot] = this._makeChannelParams();
      this._chTypes[slot] = 0;
      this._baseFreqLo[slot] = 0;
      this._baseFreqHi[slot] = 0;
      this._seqIndexes[slot] = 0;
      this._volModes[slot] = 0x0F;

      this._trackPtrs[slot] = trackPtr;
      this._trackBanks[slot] = bgmId;

      const cp = this._chParams[slot];
      cp.volRaw = 0x0F;
      cp.durLo = 1;
      cp.durHi = 0;

      this._chActive |= (1 << slot);
      chCount++;
    }

    console.log(`[Bank12] BGM 0x${bgmId.toString(16)}: ${chCount} channels initialized (offset=0x${offset.toString(16)})`);
  }

  /**
   * BGM 初始化降级方案: 当 Bank15 数据缺失时，用测试频率模拟。
   * 仅用于验证音频管道连通性，不是真实游戏行为。
   * 槽位映射: slot 0=SQ1, slot 1=SQ2, slot 2=TRI (与 _writeApuGrouped 一致)
   */
  private _audioInitBgmFallback(): void {
    // freq = CPU_CLK / (16 * (timer + 1))
    // timer = CPU_CLK / (16 * freq) - 1
    // C4=262Hz → timer = 1789773/(16*262)-1 ≈ 425
    // G4=392Hz → timer = 1789773/(16*392)-1 ≈ 284
    const t1 = 425; // C4 timer
    const t2 = 284; // G4 timer
    const s0 = 0;
    this._chParams[s0] = this._makeChannelParams();
    this._chTypes[s0] = 1;
    this._baseFreqLo[s0] = t1 & 0xFF;
    this._baseFreqHi[s0] = (t1 >> 8) & 0x07;
    this._volModes[s0] = 0x0F;
    this._seqIndexes[s0] = 0;
    const cp0 = this._chParams[s0];
    cp0.volRaw = 0x0A;
    cp0.freqRawLo = t1 & 0xFF;
    cp0.freqRawHi = ((t1 >> 8) & 0x07) | 0x80; // key-on
    cp0.durLo = 120;
    cp0.durHi = 0;
    this._chActive |= 1;

    const s1 = 1;
    this._chParams[s1] = this._makeChannelParams();
    this._chTypes[s1] = 1;
    this._baseFreqLo[s1] = t2 & 0xFF;
    this._baseFreqHi[s1] = (t2 >> 8) & 0x07;
    this._volModes[s1] = 0x0F;
    this._seqIndexes[s1] = 0;
    const cp1 = this._chParams[s1];
    cp1.volRaw = 0x08;
    cp1.freqRawLo = t2 & 0xFF;
    cp1.freqRawHi = ((t2 >> 8) & 0x07) | 0x80; // key-on
    cp1.durLo = 120;
    cp1.durHi = 0;
    this._chActive |= 2;

    console.log('[Bank12] BGM fallback: test tones (SQ1:C4 + SQ2:G4) for audio pipeline verification');
  }

  // ──────────────────────────────────────────────
  // $8063-$80B7: 处理活跃通道
  // ──────────────────────────────────────────────

  /**
   * 对应 $8063: LDX #$05 → loop X=5→0。
   * 遍历活跃通道: dec 剩余时长 → 到期时读下一个音序字节。
   */
  private _processActiveChannels(): void {
    for (let x = 5; x >= 0; x--) {
      const req = this._reqQueue[x];
      if (req !== 0) continue;

      // Check channel active bit
      if (!(this._chActive & (1 << x))) continue;

      this._curChIndex = x;
      const cp = this._chParams[x];

      // 对应 $80BA: 检查 $0706 bitmask
      // DEC $0707: 减去剩余时长
      cp.durLo--;
      if (cp.durLo < 0) {
        cp.durLo = 0xFF;
        cp.durHi--;
        if (cp.durHi < 0) {
          cp.durHi = 0;
        }
      }

      // 时长到期？ → $83CB 读下一个音序字节
      if (cp.durLo === 0 && cp.durHi === 0) {
        this._readNextSeqByte(x);
      }

      // DEC $0709: 音符时长
      cp.nextDurLo--;
      if (cp.nextDurLo < 0) {
        cp.nextDurLo = 0xFF;
        cp.nextDurHi--;
        if (cp.nextDurHi < 0) {
          cp.nextDurHi = 0;
        }
      }

      if (cp.nextDurLo === 0 && cp.nextDurHi === 0) {
        // 读下一个音符 → $81DB 音量处理
        this._readNextNote(x);
      }
    }
  }

  // ──────────────────────────────────────────────
  // $83CB-$84C8: 音序读取器
  // ──────────────────────────────────────────────

  /**
   * 对应 $83CB: 从当前通道的 track_ptr 读取下一个音序字节。
   * <$80: 纯时长字节 → 写 $0707
   * $80-$DF: 音符 → AND #$3F 查时长表 + 频率计算
   * $E0-$EF: 命令 → $84C9 分发
   */
  private _readNextSeqByte(chIdx: number): void {
    const trackPtr = this._trackPtrs[chIdx];
    const bankData = this._getBankForTrack(chIdx);
    const b = bankData[trackPtr] ?? 0xFF;

    // 推进指针
    this._trackPtrs[chIdx] = trackPtr + 1;

    const cp = this._chParams[chIdx];

    if (b < 0xE0) {
      // 音符范围 [$80-$DF]: BPL→纯时长; CMP #$E0→命令
      // 实际上所有 $00-$DF 走时长+音符路径
      if (b >= 0x80) {
        // 音符: AND #$3F → 索引时长表
        const durIdx = b & 0x3F;
        const durVal = DURATION_TABLE[durIdx] ?? 1;
        cp.durLo = durVal;
        cp.durHi = 0;

        // 频率计算: 低 nibble 索引频率表 → offset+7/+8 (freqRawLo/Hi)
        // ROM 在 $83F4-$846C 解析音符字节的高低 nibble
        const noteIdx = b & 0x0F;
        const octave = (b & 0x30) >> 4; // bits 4-5 = octave shift
        if (noteIdx < 12) {
          let fLo = FREQ_TABLE_LO[noteIdx];
          let fHi = FREQ_TABLE_HI[noteIdx];
          // 八度偏移: ROR fHi, ROR fLo
          for (let o = 0; o < octave; o++) {
            const carry = (fLo & 1) << 7;
            fLo = (fLo >> 1) | carry;
            fHi = fHi >> 1;
          }
          cp.freqRawLo = fLo;
          cp.freqRawHi = fHi | 0x80; // bit7=1 → key-on (ROM ORA #$80 at $8484/$849F)
        }
      } else {
        // 纯时长字节 (<$80)
        cp.durLo = b;
        cp.durHi = 0;
      }
    } else {
      // $E0-$EF: 命令分发 → $84C9
      this._dispatchCommand(b, chIdx);
    }
  }

  /**
   * 读下一个音符 ($83DF-$83E3): 从 track 读字节，调用音量处理
   */
  private _readNextNote(chIdx: number): void {
    const trackPtr = this._trackPtrs[chIdx];
    const bankData = this._getBankForTrack(chIdx);
    let b = bankData[trackPtr] ?? 0xFF;
    this._trackPtrs[chIdx] = trackPtr + 1;

    const cp = this._chParams[chIdx];

    // BPL → b<$80 是纯时长
    if (b < 0x80) {
      cp.nextDurLo = cp.durLo;
      cp.nextDurHi = cp.durHi;
      cp.durLo = b;
      cp.durHi = 0;
      return;
    }

    // CMP #$E0 → b<$E0 是音符
    if (b < 0xE0) {
      // 音符 → 时长 + 频率 → offset+7/+8
      const durIdx = b & 0x3F;
      cp.durLo = DURATION_TABLE[durIdx] ?? 1;
      cp.durHi = 0;

      const noteIdx = b & 0x0F;
      const octave = (b & 0x30) >> 4;
      if (noteIdx < 12) {
        let fLo = FREQ_TABLE_LO[noteIdx];
        let fHi = FREQ_TABLE_HI[noteIdx];
        for (let o = 0; o < octave; o++) {
          const carry = (fLo & 1) << 7;
          fLo = (fLo >> 1) | carry;
          fHi = fHi >> 1;
        }
        cp.freqRawLo = fLo;
        cp.freqRawHi = fHi | 0x80; // key-on
      }

      // 音量处理
      this._processVolume(chIdx);
    }
  }

  // ──────────────────────────────────────────────
  // $84C9-$8698: 音频命令分发器
  // ──────────────────────────────────────────────

  /**
   * 对应 $84C9: 根据命令字节 ($E0-$EF) 分发。
   */
  private _dispatchCommand(cmd: number, chIdx: number): void {
    const tp = this._trackPtrs[chIdx];
    const bankData = this._getBankForTrack(chIdx);

    switch (cmd) {
    case 0xE0: { // 音符时长设置
      const val = bankData[tp] ?? 0x27;
      this._trackPtrs[chIdx] = tp + 1;
      this._chParams[chIdx].nextDurLo = val;
      break;
    }
    case 0xE2: { // 音量/包络设置
      const val = bankData[tp] ?? 0;
      this._trackPtrs[chIdx] = tp + 1;
      this._chParams[chIdx].volRaw = val;
      break;
    }
    case 0xE3: { // 直接设置音量
      const val = bankData[tp] ?? 0x0A;
      this._trackPtrs[chIdx] = tp + 1;
      this._chParams[chIdx].volRaw = val;
      this._volModes[chIdx] = val;
      break;
    }
    case 0xE4: { // 子调用
      const subLo = bankData[tp] ?? 0;
      const subHi = bankData[tp + 1] ?? 0x80;
      this._trackPtrs[chIdx] = subLo | (subHi << 8);
      break;
    }
    case 0xE5: // 返回 — 简化: 丢弃
      break;

    case 0xE8: // 子序列跳转 (不保存返回)
      {
        const jLo = bankData[tp] ?? 0;
        const jHi = bankData[tp + 1] ?? 0x80;
        // CPU 地址 → 数组偏移
        const cpuPtr = jLo | (jHi << 8);
        this._trackPtrs[chIdx] = cpuPtr - 0xA000;
      }
      break;

    case 0xE9: // 相对跳转
      {
        const offset = bankData[tp] ?? 0;
        const signed8 = offset < 0x80 ? offset : offset - 256;
        this._trackPtrs[chIdx] = tp + signed8;
      }
      break;

    case 0xEA: // 包络/滑动 — 待完善
      break;
    case 0xEB: { // 音量衰减
      const val = bankData[tp] ?? 0;
      this._trackPtrs[chIdx] = tp + 1;
      this._chParams[chIdx].volMode = val;
      break;
    }
    case 0xEC: { // 效果控制 — 设置通道类型
      const val = bankData[tp] ?? 0;
      this._trackPtrs[chIdx] = tp + 1;
      this._chTypes[chIdx] = val;
      // ROM: 从 channel 块 offset+7/+8 (freqRawLo/Hi) 复制到 $07B7/$07BF (baseFreq)
      this._baseFreqLo[chIdx] = this._chParams[chIdx].freqRawLo;
      this._baseFreqHi[chIdx] = this._chParams[chIdx].freqRawHi & 0x7F; // strip key-on
      break;
    }
    case 0xED: // DMC 采样ID — 待完善
      break;
    case 0xEE: // Fade 方向 — 待完善
      break;
    case 0xEF: { // CMD_EF
      const val = bankData[tp] ?? 0;
      this._trackPtrs[chIdx] = tp + 1;
      break;
    }
    default:
      // Unknown command
      break;
    }
  }

  // ──────────────────────────────────────────────
  // $81DB-$81DA: 音量/衰减处理
  // ──────────────────────────────────────────────

  private _processVolume(chIdx: number): void {
    const cp = this._chParams[chIdx];

    // 递减衰减计数器
    cp.volMode--;
    if (cp.volMode <= 0) {
      // 音量 +1
      cp.volRaw = Math.min(cp.volRaw + 1, 0x0F);
      cp.volMode = 0; // reset
    }
  }

  // ──────────────────────────────────────────────
  // $8257-$828D 频率计算 (类型1通道)
  // ──────────────────────────────────────────────

  /**
   * 对应 $8257: 根据 $07C7 音序索引(0-9) 查 $82E4 跳转表。
   * 对 base 频率 ±1, ±2, ±3, ±6，结果写入 offset+7/+8 (freqRawLo/Hi)。
   * ROM 的 channel block: offset+7=freqLo→$4002, offset+8=freqHi→$4003。
   */
  private _calcFreqType1(chIdx: number): void {
    const cp = this._chParams[chIdx];
    let idx = this._seqIndexes[chIdx];
    const baseLo = this._baseFreqLo[chIdx];
    const baseHi = this._baseFreqHi[chIdx];

    // $82E4 跳转表简化: [不变,+1,+2,+1,不变,+3,+6,+3]
    const mods = [0, 1, 2, 1, 0, 3, 6, 3];
    const mod = mods[idx % 8];

    let freq = baseLo | (baseHi << 8);
    freq += mod;
    // 写入 offset+7 (freqRawLo) 和 offset+8 (freqRawHi) — ROM 从这两个偏移写 $4002/$4003
    cp.freqRawLo = freq & 0xFF;
    cp.freqRawHi = ((freq >> 8) & 0x07) | 0x80; // bit7=1 → key-on

    // 递增音序索引 (0-9 循环)
    idx++;
    if (idx > 9) idx = 0;
    this._seqIndexes[chIdx] = idx;
  }

  // ──────────────────────────────────────────────
  // $811D-$816E: 按通道组写 APU 输出
  // ──────────────────────────────────────────────

  /**
   * 对应 ROM $811D-$816D 通道组处理 + $816E-$81DA APU 寄存器写入。
   *
   * ROM 将 $0706 活跃位掩码分为 3 组，每组对应一个 APU 物理通道：
   *   - 掩码 $11 (ch0/ch4) → $4004 (SQ2)
   *   - 掩码 $22 (ch1/ch5) → $4008 (TRI)
   *   - 掩码 $44 (ch2/ch6) → $400C (NOISE)
   *
   * $816E 逻辑:
   *   - $4000/$4004/$400C: $30 | (vol_control_byte & 0x0F)  [常数音量+Duty=00]
   *   - $4008 (TRI):           $80 | (vol_control_byte & 0x0F)  [线性计数器加载]
   *   - $4001/$4005 (Sweep):   $08 [关闭 sweep]，由 offset+5 bit 4 控制
   *   - $4002/$4006/$400A:     freqRawLo (offset+7)
   *   - $4003/$4007/$400B:     (freqRawHi & 0x7F) | $18, 仅 freqRawHi bit7 置位时写入
   *   - $4003 去重:            SQ2 组与上次 $4003 比较，相同则跳过
   */
  private _writeApuGrouped(events: ApuWriteEvent[]): void {
    // ROM 3 组通道定义
    const groups = [
      { mask: 0x11, base: 0x4004, chLo: 0, chHi: 4, isTri: false, dedupIdx: 0 },
      { mask: 0x22, base: 0x4008, chLo: 1, chHi: 5, isTri: true,  dedupIdx: -1 },
      { mask: 0x44, base: 0x400C, chLo: 2, chHi: 6, isTri: false, dedupIdx: -1 },
    ];

    for (const g of groups) {
      const active = this._chActive & g.mask;
      if (active === 0) continue;

      // 选活跃的那个子通道 (chLo / chHi)
      const useHi = (active & 0xF0) !== 0;
      const chIdx = useHi ? g.chHi : g.chLo;
      if (!(this._chActive & (1 << chIdx))) continue;
      if (this._chTypes[chIdx] === 0) continue;

      const cp = this._chParams[chIdx];

      // 频率计算 (type 1 → $8257, type 2 → $82D2)
      if (this._chTypes[chIdx] === 1) {
        this._calcFreqType1(chIdx);
      }

      // $4000/$4004/$4008/$400C: vol/env
      // ROM: $816E 读 channel 块 offset+6 = vol_control_byte
      // TRI: $80|vol,  SQ/NOISE: $30|vol
      const volCtrl = cp.volRaw & 0x0F;
      const reg0 = g.isTri ? (0x80 | volCtrl) : (0x30 | volCtrl);
      events.push({ addr: g.base, value: reg0 });

      // $4001/$4005: sweep — ROM 检查 offset+5 bit 4
      // (offset+5 = vol/status 组合字节，bit4 为 sweep 控制)
      // 简化: 仅 SQ2 组写 sweep off
      if (g.chHi === 4 && !g.isTri) {
        events.push({ addr: g.base + 1, value: 0x08 });
      }

      // $4002/$4006/$400A: freqLo from offset+7 (freqRawLo)
      events.push({ addr: g.base + 2, value: cp.freqRawLo });

      // $4003/$4007/$400B: freqHi from offset+8 (freqRawHi)
      // ROM: ORA #$18 设置 bits 3-4 (Length Counter 索引)
      //      仅 bit7=1 (key-on) 时才写入
      if (cp.freqRawHi & 0x80) {
        const reg3 = (cp.freqRawHi & 0x7F) | 0x18;

        // ROM: 仅 SQ2 ($F2=2) 做 $4003 去重 (CMP $07E0,Y)
        if (g.dedupIdx >= 0) {
          const lastV = this._last4003[g.dedupIdx];
          if (reg3 === lastV) continue; // 无变化，跳过整组
          this._last4003[g.dedupIdx] = reg3;
        }

        events.push({ addr: g.base + 3, value: reg3 });
        // 清除 key-on 标识 (ROM: AND #$7F 后写回)
        cp.freqRawHi &= 0x7F;
      }
    }
  }

  // ──────────────────────────────────────────────
  // 辅助方法
  // ──────────────────────────────────────────────

  private _makeChannelParams(): ChannelParams {
    return {
      durLo: 0, durHi: 0,
      nextDurLo: 0, nextDurHi: 0,
      freqLo: 0, freqHi: 0,
      volRaw: 0,
      freqRawLo: 0, freqRawHi: 0,
      chType: 0,
      baseFreqLo: 0, baseFreqHi: 0,
      seqIndex: 0,
      volMode: 0,
      unk0E: 0, unk0F: 0,
    };
  }

  /** 获取通道对应的音频 Bank 数据 */
  private _getBankForTrack(chIdx: number): number[] {
    const seId = this._trackBanks[chIdx];
    return this._bank15; // 简化: 当前仅支持 Bank 15
  }

  /** Bank 12 自身数据 (调色板等，暂空) */
  private _bank12Data(): number[] {
    return [];
  }

  /** 初始化 $31 请求的音量值 */
  private _initVolFor0x31(): void {
    // $8070-$80A4: STA $19 → $07DF, $07CF, $07D1-$07D3, etc.
    for (const idx of [0xCF, 0xD1, 0xD2, 0xD3, 0xD5, 0xD6, 0xD7, 0xD9, 0xDA, 0xDB, 0xDD, 0xDE, 0xDF]) {
      this._volModes[idx - 0xCF] = 0x19;
    }
    for (const idx of [0xD0, 0xD4, 0xD8, 0xDC]) {
      this._volModes[idx - 0xCF] = 0x0A;
    }
  }

  // ──────────────────────────────────────────────
  // 调试接口
  // ──────────────────────────────────────────────

  /** 获取当前通道状态（调试用） */
  getDebugState(): object {
    return {
      reqQueue: Array.from(this._reqQueue),
      chActive: this._chActive,
      chTypes: Array.from(this._chTypes),
      trackPtrs: Array.from(this._trackPtrs),
      volModes: Array.from(this._volModes),
    };
  }
}
