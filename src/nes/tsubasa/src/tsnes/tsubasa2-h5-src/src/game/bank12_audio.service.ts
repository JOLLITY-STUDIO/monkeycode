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

  /** Bank 12: SE 音序数据 (指针表 $8BDA 指向此处) */
  private _bank12: number[] = [];
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

  /** 设置 Bank 0D/0E/0F/12/15 数据 + 音效指针表 */
  setBankData(params: {
    bank0D?: number[];
    bank0E?: number[];
    bank0F?: number[];
    bank12?: number[];
    bank15?: number[];
    seTable?: number[];
  }): void {
    if (params.bank0D) this._bank0D = params.bank0D;
    if (params.bank0E) this._bank0E = params.bank0E;
    if (params.bank0F) this._bank0F = params.bank0F;
    if (params.bank12) this._bank12 = params.bank12;
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
   *
   * ROM 槽位规则 (已对照汇编 $836E/$8394):
   *   - 通道块 ($0727 + ch*16) 与时长数组 ($0707 + ch*4): 索引 = ch
   *   - 状态数组 ($07A7/$07AF/$07CF/$07D7/$07EA/$07F4): 索引 = 8-ch
   * H5 统一用 slot = ch (通道块语义)，状态数组经 _stateIdx() 换算。
   */
  private _audioInit(seId: number, bankData: number[] | null): void {
    const idx = (seId - 1) * 2;
    if (idx + 1 >= this._seTable.length) return;

    const ptrLo = this._seTable[idx];
    const ptrHi = this._seTable[idx + 1];
    if (ptrLo === 0xFF && ptrHi === 0x00) return; // $FF00 哨兵

    // 通道初始化列表: [ch, ptrLo, ptrHi] × N, ≥$80 终止
    let pos = ptrLo | (ptrHi << 8); // CPU 地址 ($8000-$9FFF)
    const bank = bankData ?? this._bank12Data();

    // 安全上限: 最多 8 通道 + 终止符，防止数据异常时死循环
    for (let guard = 0; guard < 9; guard++) {
      const ch = bank[pos - 0x8000] ?? 0xFF;
      if (ch >= 0x80 || ch < 0) {
        break; // 终止符
      }
      pos++;
      const tLo = bank[pos - 0x8000] ?? 0;
      pos++;
      const tHi = bank[pos - 0x8000] ?? 0;
      pos++;

      // trackPtr 是 CPU 地址 → 转数组偏移 (SE 数据区 $8000-$9FFF)
      const trackPtr = (tLo | (tHi << 8)) - 0x8000;
      if (trackPtr < 0 || trackPtr >= bank.length) continue;

      // 清除 per-channel 状态 (通道块索引 = ch)
      this._chParams[ch] = this._makeChannelParams();
      this._chTypes[ch] = 0; // type=0→无输出，直到 $EC 命令激活
      this._baseFreqLo[ch] = 0;
      this._baseFreqHi[ch] = 0;
      this._seqIndexes[ch] = 0;
      this._volModes[ch] = 0x0F;

      // 存 track ptr
      this._trackPtrs[ch] = trackPtr;
      this._trackBanks[ch] = seId; // track bank identification

      // 初始化 volume=0x0F, duration=1
      const cp = this._chParams[ch];
      cp.volRaw = 0x0F;
      cp.durLo = 1;
      cp.durHi = 0;

      // 设 $0706 bitmask (bit = ch)
      this._chActive |= (1 << ch);
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
      const slot = ch & 0x07;

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
   * 对应 ROM $80CA-$811B: 遍历 8 个活跃通道。
   * $80CA: LDA $0706 → LSR → 逐位检查 bit0-7 (通道 0-7)。
   * 每通道: DEC $0707 (dur) → 到期 JSR $83CB 读音序;
   *         DEC $0709 (nextDur) → 到期读下一音符 → JSR $81DB 音量。
   */
  private _processActiveChannels(): void {
    for (let ch = 0; ch < 8; ch++) {
      // 对应 $80CA: LSR $0706 — bit 0 = 通道 0
      if (!(this._chActive & (1 << ch))) continue;

      this._curChIndex = ch;
      const cp = this._chParams[ch];

      // 对应 $80D9: DEC $0707 (剩余时长 lo)
      cp.durLo--;
      if (cp.durLo < 0) {
        cp.durLo = 0xFF;
        cp.durHi--;
        if (cp.durHi < 0) {
          cp.durHi = 0;
        }
      }

      // 时长到期 → $80DE: JSR $83CB 读下一个音序字节
      if (cp.durLo === 0 && cp.durHi === 0) {
        this._readNextSeqByte(ch);
      }

      // 对应 $80E3: DEC $0709 (音符时长)
      cp.nextDurLo--;
      if (cp.nextDurLo < 0) {
        cp.nextDurLo = 0xFF;
        cp.nextDurHi--;
        if (cp.nextDurHi < 0) {
          cp.nextDurHi = 0;
        }
      }

      if (cp.nextDurLo === 0 && cp.nextDurHi === 0) {
        // $80E8: 读下一个音符 → $8109: JSR $81DB 音量处理
        this._readNextNote(ch);
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
   * $E0-$EF: 命令 → $84C9 分发 → 循环读下一个字节 (ROM $83EB: BPL $83DF)
   *
   * ROM 关键: 命令处理后不回退到帧循环，而是立即读后续字节，
   * 直到遇到音符/时长才结束。$EC+note 在同一帧完成，避免卡死。
   */
  private _readNextSeqByte(chIdx: number): void {
    // ROM: $83DF-$83EB 循环 — 读字节直到遇到音符或纯时长
    for (let safety = 0; safety < 64; safety++) {
      const trackPtr = this._trackPtrs[chIdx];
      const bankData = this._getBankForTrack(chIdx);
      const b = bankData[trackPtr] ?? 0xFF;

      // 推进指针
      this._trackPtrs[chIdx] = trackPtr + 1;

      const cp = this._chParams[chIdx];

      if (b >= 0xE0) {
        // $E0-$EF: 命令分发 → ROM $83EB: BPL $83DF 循环回读
        this._dispatchCommand(b, chIdx);
        continue;
      }

      // $80-$DF: 音符 → BPL 判定
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
        return;
      }

      // 纯时长字节 (<$80)
      cp.durLo = b;
      cp.durHi = 0;
      return;
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
      this._trackPtrs[chIdx] = this._cpuToOffset(subLo | (subHi << 8), chIdx);
      break;
    }
    case 0xE5: // 返回 — 简化: 丢弃
      break;

    case 0xE8: // 子序列跳转 (不保存返回)
      {
        const jLo = bankData[tp] ?? 0;
        const jHi = bankData[tp + 1] ?? 0x80;
        // CPU 地址 → 数组偏移 (按 track 所属 bank 换算)
        const cpuPtr = jLo | (jHi << 8);
        this._trackPtrs[chIdx] = this._cpuToOffset(cpuPtr, chIdx);
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
   * ROM $8131-$8161: F2=3,2,1,0 循环 4 次, 掩码 0x11/0x22/0x44/0x88
   * (通道对 {ch, ch+4})。X = (3^F2)*4 → $4000/$4004/$4008/$400C:
   *   - 掩码 $11 (ch0/ch4) → $4000 (SQ1)   去重: 是 ($07E0+3)
   *   - 掩码 $22 (ch1/ch5) → $4004 (SQ2)   去重: 是 ($07E0+2)
   *   - 掩码 $44 (ch2/ch6) → $4008 (TRI)   $80|vol, 无去重
   *   - 掩码 $88 (ch3/ch7) → $400C (NOISE) 无去重
   *
   * $816E 逻辑:
   *   - 读通道块 +6 (volRaw): SQ/NOISE → $30|vol, TRI → $80|vol
   *   - 块 +5 bit4=0 → 写 $4001/$4005 sweep disable ($08)
   *   - 块 +7 → $4002 freqLo; 块 +8 bit7=1 (key-on) → $4003 = (freqHi&$7F)|$18
   *   - 去重 (FB=2/3): 与上次 $4003 相同则跳过
   */
  private _writeApuGrouped(events: ApuWriteEvent[]): void {
    // ROM $83C2: $0F → $4015 (启用所有通道)
    if (this._chActive !== 0) {
      events.push({ addr: 0x4015, value: 0x0F });
    }

    const groups = [
      { mask: 0x11, base: 0x4000, chLo: 0, chHi: 4, isTri: false, fb: 3 }, // SQ1
      { mask: 0x22, base: 0x4004, chLo: 1, chHi: 5, isTri: false, fb: 2 }, // SQ2
      { mask: 0x44, base: 0x4008, chLo: 2, chHi: 6, isTri: true,  fb: 1 }, // TRI
      { mask: 0x88, base: 0x400C, chLo: 3, chHi: 7, isTri: false, fb: 0 }, // NOISE
    ];

    for (const g of groups) {
      const pair = this._chActive & g.mask;
      if (pair === 0) continue;

      // ROM $8138: AND #$0F → 低 nibble 非零用低通道块, 否则高通道块
      const useHi = (pair & 0x0F) === 0;
      const chIdx = useHi ? g.chHi : g.chLo;
      if (!(this._chActive & (1 << chIdx))) continue;
      if (this._chTypes[chIdx] === 0) continue;

      const cp = this._chParams[chIdx];

      // 频率计算 (type 1 → $8257, type 2 → $82D2)
      if (this._chTypes[chIdx] === 1) {
        this._calcFreqType1(chIdx);
      }

      // $816E: vol = 块+6, TRI → $80|vol, 其他 → $30|vol
      const reg0 = g.isTri ? (0x80 | (cp.volRaw & 0x0F)) : (0x30 | (cp.volRaw & 0x0F));
      events.push({ addr: g.base, value: reg0 });

      // $8191-$819E: sweep — 块+5 bit4=0 → 写 $4001 sweep disable
      // (仅 SQ 通道; 块+5 对应 freqHi)
      if (!g.isTri && (cp.freqHi & 0x10) === 0) {
        events.push({ addr: g.base + 1, value: 0x08 });
      }

      // $81B1-$81B4: $4002 = 块+7 (freqRawLo)
      events.push({ addr: g.base + 2, value: cp.freqRawLo });

      // $81A7-$81DA: 块+8 bit7=1 (key-on) 时写 $4003
      if (cp.freqRawHi & 0x80) {
        const reg3 = (cp.freqRawHi & 0x7F) | 0x18;
        // 清除 key-on 标识 (ROM: AND #$7F 后写回)
        cp.freqRawHi &= 0x7F;

        // $81BD-$81C8: 去重 — FB=0/1 直写, FB=2/3 与 $07E0[FB] 比较
        if (g.fb >= 2) {
          if (this._last4003[g.fb] === reg3) continue; // 无变化，跳过整组
          this._last4003[g.fb] = reg3;
        }

        events.push({ addr: g.base + 3, value: reg3 });
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

  /**
   * 获取通道对应的音频 Bank 数据。
   * BGM (0x31-0x35) 音序在 Bank 15; SE (1-0x1F) 音序在 Bank 12。
   */
  private _getBankForTrack(chIdx: number): number[] {
    const id = this._trackBanks[chIdx];
    if (id >= 0x31 && id <= 0x35) return this._bank15;
    return this._bank12;
  }

  /** Bank 12 自身数据 (SE 指针表 + 音序数据) */
  private _bank12Data(): number[] {
    return this._bank12;
  }

  /**
   * CPU 地址 → 数组偏移。
   * BGM (bank15) 映射 $A000-$BFFF, SE (bank12) 映射 $8000-$9FFF。
   */
  private _cpuToOffset(cpuAddr: number, chIdx: number): number {
    const id = this._trackBanks[chIdx];
    if (id >= 0x31 && id <= 0x35) return cpuAddr - 0xA000;
    return cpuAddr - 0x8000;
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
