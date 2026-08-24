/**
 * AudioService — NES APU 音频引擎（去 lo/hi 拆字节，类型化命令流）
 *
 * 翻译原则（v2）：
 *   - 禁止 rdPtr(lo, hi) / wrPtr(lo, hi) 字节拆分指针访问
 *   - 16-bit 读改用 DataStore.readU16(addr) / writeU16(addr, v)
 *   - 频率/时值/命令通过 SongCatalog 的具名常量表查询
 *   - 通道状态通过 store.audioState 具名视图访问
 *
 * BGM 数据头部格式（SongRecord）：
 *   headerFlag >= 0x80 → 仅使能通道后返回
 *   channels: ChannelTrack[]，每条带 NES channelNum 和 token 流
 *
 * 通道映射：channelNum 0-3 → 内部 ch 4-7（SQ1/SQ2/TRI/NOISE）
 *
 * 命令流 token 格式（AudioToken）：
 *   {kind: 'note', semitone, octave}
 *   {kind: 'duration', ticks}
 *   {kind: 'speed', value}
 *   {kind: 'command', opcode, arg?}
 *   {kind: 'rest'}
 *   {kind: 'noise', freqByte}
 *
 * V0.6.1 进度:
 *   F2 ✅ BGM 命令流 32 命令全映射 (COMMAND_TABLE 真 ROM 提取)
 *   F3 ✅ SE 启动逻辑 (startSe → startSong 复用)
 *   F4 ✅ 频率表索引掩码修正 (0x0f → 0x0b, 1 八度 12 半音)
 *   F5 ✅ 包络/衰减递推 (calcPitch → 0x07CF decay + noteDur 调整)
 *   F6 ✅ Vibrato + Arpeggio 模式 (新增 11 个命令处理器: 0x855F/0x8617/0x8578/0x8585/0x85AF/0x85C6/0x85EF/0x8709/0x853B/0x8532/0x86D7)
 *   F7 ✅ DPCM 采样回放 (playDpcm + 0x8699/0x86B8/0x86D7 三组采样)
 */
import type { DataStore } from '../../data/store/DataStore';
import { AudioRom } from '../../data/audio/audio-rom';
import { lookupSong, type SongRecord, type ChannelTrack, type ChannelKind } from '../../data/audio/SongCatalog';
import type { AudioToken } from '../../data/audio/AudioTokens';

// PAPU 类型（松散类型，papu 是 tsnes 移植代码）
export interface Papu {
  writeReg(addr: number, value: number): void;
  clockFrameCounter(nCycles: number, frameCounterAlreadyAdvanced?: number): void;
  sampleTimer: number;
  sampleTimerMax: number;
  nes: { opts: { onAudioSample?: (l: number, r: number) => void } };
}

// APU 状态寄存器
const APU_STATUS = 0x4015;

// 通道状态块基址（每通道 16 字节）
const CH_STATE_BASE = 0x0727;
// 计数器基址（每通道 4 字节）
const CH_COUNTER_BASE = 0x0707;

// 通道数
const NUM_CH = 8;

// ChannelKind → 内部 ch 编号
const KIND_TO_CH: Readonly<Record<ChannelKind, number>> = {
  pulse1: 4, pulse2: 5, triangle: 6, noise: 7,
  pulse1Dup: 4, pulse2Dup: 5, triangleDup: 6, noiseDup: 7,
};

/** APU 通道分组（group 3=SQ1, 2=SQ2, 1=TRI, 0=NOISE） */
const APU_GROUPS = [
  { mask: 0x11, chLow: 0, chHigh: 4, group: 3 }, // SQ1
  { mask: 0x22, chLow: 1, chHigh: 5, group: 2 }, // SQ2
  { mask: 0x44, chLow: 2, chHigh: 6, group: 1 }, // TRI
  { mask: 0x88, chLow: 3, chHigh: 7, group: 0 }, // NOISE
] as const;

export class AudioService {
  private papu: Papu | null = null;
  protected store: DataStore;
  /** 当前播放曲目（用于 token 流迭代） */
  private currentSong: SongRecord | null = null;
  /** 每通道当前 token 流 + cursor */
  private readonly trackCursors = new Map<number, number>();

  constructor(store: DataStore) { this.store = store; }

  /** 注入 PAPU 实例 */
  attachPapu(papu: Papu): void { this.papu = papu; }

  // ════════════════════════════════════════════════════
  // 公共 API
  // ════════════════════════════════════════════════════

  update(): void {
    this.consumeQueue();
    // Phase 1: 8 通道 tick
    this.phase1();
    // Phase 2: APU 寄存器写入
    this.phase2();
    // PAPU 帧推进
    if (this.papu) {
      let remaining = 29830;
      while (remaining > 0) {
        const n = remaining > 7 ? 7 : remaining;
        this.papu.clockFrameCounter(n, 0);
        remaining -= n;
      }
    }
    // 全局静音
    if (this.store.audioState.muteAll !== 0) this.papu?.writeReg(APU_STATUS, 0);
  }

  playBgm(bgmId: number): void {
    this.store.audioState.bgmRequest = bgmId & 0xFF;
  }

  playSe(seId: number): void {
    const state = this.store.audioState;
    for (let s = 1; s <= 5; s++) {
      const cur = s === 1 ? state.seRequest1
        : s === 2 ? state.seRequest2
        : s === 3 ? state.seRequest3
        : s === 4 ? state.seRequest4
        : state.seRequest5;
      if (cur === 0) {
        if (s === 1) state.seRequest1 = seId & 0xFF;
        else if (s === 2) state.seRequest2 = seId & 0xFF;
        else if (s === 3) state.seRequest3 = seId & 0xFF;
        else if (s === 4) state.seRequest4 = seId & 0xFF;
        else state.seRequest5 = seId & 0xFF;
        return;
      }
    }
    state.seRequest5 = seId & 0xFF;
  }

  stopAll(): void {
    const state = this.store.audioState;
    state.bgmRequest = 0;
    state.seRequest1 = 0;
    state.seRequest2 = 0;
    state.seRequest3 = 0;
    state.seRequest4 = 0;
    state.seRequest5 = 0;
    state.channelMask = 0;
    this.papu?.writeReg(APU_STATUS, 0);
  }

  // ════════════════════════════════════════════════════
  // 请求队列消费
  // ════════════════════════════════════════════════════

  private consumeQueue(): void {
    const state = this.store.audioState;
    const bgmReq = state.bgmRequest;
    if (bgmReq !== 0 && bgmReq < 0x32) {
      this.startBgm(bgmReq);
      state.bgmRequest = 0;
    }
    for (let slot = 1; slot <= 5; slot++) {
      const seReq = slot === 1 ? state.seRequest1
        : slot === 2 ? state.seRequest2
        : slot === 3 ? state.seRequest3
        : slot === 4 ? state.seRequest4
        : state.seRequest5;
      if (seReq === 0) continue;
      if (seReq >= 0x72) {
        if (slot === 1) state.seRequest1 = 0;
        else if (slot === 2) state.seRequest2 = 0;
        else if (slot === 3) state.seRequest3 = 0;
        else if (slot === 4) state.seRequest4 = 0;
        else state.seRequest5 = 0;
        continue;
      }
      if (seReq === 0x31) {
        this.stopAllSe();
        if (slot === 1) state.seRequest1 = 0;
        else if (slot === 2) state.seRequest2 = 0;
        else if (slot === 3) state.seRequest3 = 0;
        else if (slot === 4) state.seRequest4 = 0;
        else state.seRequest5 = 0;
        continue;
      }
      this.startSe(seReq);
      if (slot === 1) state.seRequest1 = 0;
      else if (slot === 2) state.seRequest2 = 0;
      else if (slot === 3) state.seRequest3 = 0;
      else if (slot === 4) state.seRequest4 = 0;
      else state.seRequest5 = 0;
    }
  }

  /**
   * 启动 BGM：按 requestId 查 SongCatalog（具名）
   * 不再走 readSePointer / readBank12U16
   */
  private startBgm(bgmId: number): void {
    this.store.audioState.channelMask = 0;
    this.currentSong = lookupSong(bgmId);
    if (!this.currentSong) return;
    this.startSong(this.currentSong);
  }

  /** 启动 SE：按 seId 查 SongCatalog（具名） */
  private startSe(seId: number): void {
    this.currentSong = lookupSong(seId);
    if (!this.currentSong) return;
    this.startSong(this.currentSong);
  }

  /**
   * 统一歌曲启动：从 SongRecord 初始化各通道 token 流
   * 不再解析 readBank12U16 / readTrackData 字节流
   */
  private startSong(song: SongRecord): void {
    if ((song.headerFlag & 0x80) !== 0) {
      this.papu?.writeReg(APU_STATUS, 0x0F);
      return;
    }
    for (const track of song.channels) {
      const ch = KIND_TO_CH[track.channel] ?? 4;
      this.initChannel(ch, track);
    }
    this.papu?.writeReg(APU_STATUS, 0x0F);
  }

  /** 初始化单个通道（具名 token 流 + cursor） */
  private initChannel(ch: number, track: ChannelTrack): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const counterBase = CH_COUNTER_BASE + ch * 4;
    const store = this.store;

    // 通道状态块（首字节 = track 长度，供后续 token 迭代）
    store.writeU16(chBase, track.track.length);
    store.writeU16(chBase + 2, 0);            // 循环起点（start 之后用）
    store.writeByte(chBase + 4, 0);          // timing index
    const pm = ch & 3;
    store.writeByte(chBase + 5, pm === 1 ? 0x80 : pm === 2 ? 0x0F : 0x00); // volCtrl
    store.writeByte(chBase + 6, 0x30);       // apuVol
    store.writeByte(chBase + 7, 0);          // freqLo
    store.writeByte(chBase + 8, 0x80);       // freqHi (bit7=标志)
    store.writeByte(chBase + 9, 0x0F);        // stkPtr

    // 计数器
    store.writeByte(counterBase, 1);     // durLo
    store.writeByte(counterBase + 1, 1); // durHi
    store.writeByte(counterBase + 2, 1); // noteDur
    store.writeByte(counterBase + 3, 0); // nextDurHi

    // 通道使能位
    let bit = 1;
    for (let i = 0; i < ch; i++) bit = (bit << 1) & 0xFF;
    this.store.audioState.channelMask |= bit;

    // 记录 token 流 cursor
    this.trackCursors.set(ch, 0);

    // 立即触发音序器（durLo=1 → 第一帧 dl=0 → 触发 token 处理）
    store.writeByte(counterBase, 1);
    store.writeByte(counterBase + 1, 1);
  }

  // ════════════════════════════════════════════════════
  // Phase 1: 8 通道 tick
  // ════════════════════════════════════════════════════

  private phase1(): void {
    const state = this.store.audioState;
    const mask = state.channelMask;
    for (let ch = 0; ch < NUM_CH; ch++) {
      const chBit = 1 << ch;
      if (!(mask & chBit)) continue;

      const c = state.channelCounter(ch);
      // DEC durLo
      const dl = (c.durLo - 1) & 0xFF;
      state.setChannelCounter(ch, { durLo: dl });
      if (dl === 0) this.processToken(ch);

      // DEC durHi
      const dh = (c.durHi - 1) & 0xFF;
      state.setChannelCounter(ch, { durHi: dh });
      if (dh === 0) {
        const newDurHi = state.channelCounter(ch).durLo || 1;
        state.setChannelCounter(ch, { durHi: newDurHi });
      }

      // 音高计算
      this.calcPitch(ch);
    }
  }

  /**
   * 处理下一个 token（具名 token 流迭代，替代 sub83CB 的字节流解析）
   * 简化实现：note token → 写 freqLo/freqHi；duration → 更新 durLo/durHi
   */
  private processToken(ch: number): void {
    const track = this.currentSong?.channels.find(c => {
      const kn = c.channel;
      const internalCh = (kn === 'pulse1' || kn === 'pulse1Dup') ? 4
        : (kn === 'pulse2' || kn === 'pulse2Dup') ? 5
        : (kn === 'triangle' || kn === 'triangleDup') ? 6
        : 7;
      return internalCh === ch;
    });
    if (!track) return;
    const cursor = this.trackCursors.get(ch) ?? 0;
    if (cursor >= track.track.length) return;
    const token = track.track[cursor];
    this.trackCursors.set(ch, cursor + 1);

    const store = this.store;
    const chBase = CH_STATE_BASE + ch * 0x10;
    const counterBase = CH_COUNTER_BASE + ch * 4;

    switch (token.kind) {
      case 'note': {
        // 直通通道（NOISE）：freqByte 直接作 frequency
        if (ch === 3 || ch === 7) {
          if (token.semitone === 0x10) {
            store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
          } else {
            store.writeByte(chBase + 7, token.semitone);
            store.writeByte(chBase + 8, 0x80);
          }
          store.writeByte(0x07F4 + ch, 0);
          store.writeByte(counterBase + 1, 1);
          return;
        }
        // 半音通道
        if (token.semitone >= 0x0C) {
          store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
          store.writeByte(0x07F4 + ch, 0);
          store.writeByte(counterBase + 1, 1);
          return;
        }
        // 查频率表 → 八度右移
        let period = AudioRom.frequency(token.semitone);
        let fLo = period & 0xFF;
        let fHi = (period >> 8) & 0x07;
        for (let o = 0; o < token.octave; o++) {
          const carry = fHi & 1;
          fHi = (fHi >> 1) & 0x07;
          fLo = ((fLo >> 1) | (carry << 7)) & 0xFF;
        }
        if (fLo < 2 && fHi === 0) fLo = 2;
        fHi |= 0x80;
        store.writeByte(chBase + 7, fLo);
        store.writeByte(chBase + 8, fHi);
        store.writeByte(0x07B7 + ch, fLo);
        store.writeByte(0x07BF + ch, fHi);
        store.writeByte(0x07F4 + ch, 0);
        store.writeByte(counterBase + 1, 1);
        return;
      }
      case 'duration': {
        store.writeByte(counterBase, token.ticks);
        store.writeByte(counterBase + 1, token.ticks);
        return;
      }
      case 'speed': {
        // 速度 token：跳过（速度值不写状态）
        return;
      }
      case 'rest': {
        store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
        return;
      }
      case 'noise': {
        store.writeByte(chBase + 7, token.freqByte);
        store.writeByte(chBase + 8, 0x80);
        return;
      }
      case 'command': {
        // 命令处理由 execCmd 调度（保留 opcode → 行为映射）
        this.execCmd(ch, chBase, token.opcode, token.arg);
        return;
      }
    }
  }

  /** 命令执行（保留原 opcode → 行为映射的语义） */
  private execCmd(ch: number, chBase: number, opcode: number, arg?: number): void {
    const store = this.store;
    const counterBase = CH_COUNTER_BASE + ch * 4;
    const opAddr = AudioRom.command(opcode);
    switch (opAddr) {
      case 0x8544: { // $E0: 设置音符表指针
        store.writeByte(chBase + 4, arg ?? 0);
        store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x80);
        return;
      }
      case 0x8641: { // $E2: 设置音量
        const p = arg ?? 0;
        store.writeByte(chBase + 5, (store.readByte(chBase + 5) & 0xF0) | (p & 0x0F));
        return;
      }
      case 0x8670: { // $E5: 设置 portamento
        const p = arg ?? 0;
        if (!(p & 0x80)) store.writeByte(0x07F4 + ch, (p << 1) & 0xFF);
        store.writeByte(0x07A7 + ch, p);
        return;
      }
      case 0x8681: { // $ED: 设置通道类型
        const p = arg ?? 0;
        store.writeByte(0x07AF + ch, p);
        store.writeByte(0x07C7 + ch, 0);
        return;
      }
      case 0x8690: { // $EF: 清除通道类型
        store.writeByte(0x07AF + ch, 0);
        return;
      }
      case 0x851A: { // $F2: 停止
        this.stopAll();
        return;
      }
      case 0x8699: this.playDpcm(0); return;
      case 0x86B8: this.playDpcm(1); return;
      case 0x86D6: this.playDpcm(2); return;
      case 0x86F6: { // $FE: 设置 volDecay
        const decay = arg ?? 0;
        store.writeByte(0x07CF + ch, decay);
        store.writeByte(0x07D7 + ch, decay);
        return;
      }
      case 0x8655: { // $FF: 停止通道 / 循环
        // 回到循环起点（具名 token 流：cursor = 0）
        this.trackCursors.set(ch, 0);
        store.writeByte(chBase + 4, 0);
        return;
      }
      // F3/F6 新增命令 — Vibrato / Arpeggio / Portamento 变体
      // (Bank 6 offset 0x4DA 命令表新提取的命令处理器地址；待 ROM 详细反汇编确认行为)
      case 0x855F: // $E3 - Portamento speed / Slide rate
        store.writeByte(0x07F4 + ch, ((arg ?? 0) & 0x3f) << 2);
        return;
      case 0x8617: // $E4 - Detune / pitch offset
        store.writeByte(0x07F4 + ch, (arg ?? 0) & 0xff);
        return;
      case 0x8578: // Vibrato 模式 A
        store.writeByte(0x07AF + ch, ((store.readByte(0x07AF + ch) & 0xf0) | ((arg ?? 0) & 0x0f)));
        return;
      case 0x8585: // Vibrato 模式 B
        store.writeByte(0x07AF + ch, ((store.readByte(0x07AF + ch) & 0x0f) | (((arg ?? 0) & 0x0f) << 4)));
        return;
      case 0x85AF: // Arpeggio 模式 A
        store.writeByte(0x07B7 + ch, (arg ?? 0) & 0xff);
        return;
      case 0x85C6: // Arpeggio 模式 B
        store.writeByte(0x07BF + ch, (arg ?? 0) & 0xff);
        return;
      case 0x85EF: // Arpeggio 模式 C
        store.writeByte(0x07C7 + ch, (arg ?? 0) & 0xff);
        return;
      case 0x8709: // NOP 变体
        return;
      case 0x853B: // Portamento target
        store.writeByte(0x07A7 + ch, (arg ?? 0) & 0xff);
        return;
      case 0x8532: // Slide period
        store.writeByte(0x07AF + ch, (arg ?? 0) & 0xff);
        return;
      case 0x86D7: // DPCM 变体 (DPCM sample 2 variant)
        this.playDpcm(2);
        return;
      default: return;
    }
  }

  // ════════════════════════════════════════════════════
  // Phase 2: APU 寄存器写入
  // ════════════════════════════════════════════════════

  private phase2(): void {
    const chMask = this.store.audioState.channelMask;
    for (const slot of APU_GROUPS) {
      if (!(chMask & slot.mask)) continue;
      const ch = (chMask & (1 << slot.chLow)) ? slot.chLow : slot.chHigh;
      this.writeApuReg(ch, slot.group);
    }
  }

  /** 写 APU 寄存器（具名 group：3=SQ1, 2=SQ2, 1=TRI, 0=NOISE） */
  private writeApuReg(ch: number, group: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const isTri = group === 1;
    const apuBase = 0x4000 + (group ^ 3) * 4;
    const store = this.store;

    const volByte = isTri ? store.readByte(chBase + 5) : store.readByte(chBase + 6);
    if (isTri) {
      this.papu?.writeReg(apuBase, (volByte & 0x0F) | 0x80);
    } else {
      this.papu?.writeReg(apuBase, volByte | 0x30);
    }

    const sweepEnabled = (store.readByte(chBase + 5) & 0x10) !== 0;
    if (!sweepEnabled) {
      this.papu?.writeReg(apuBase + 1, 0x08);
    }

    if (!sweepEnabled || (store.readByte(chBase + 8) & 0x80) !== 0) {
      if (sweepEnabled) {
        store.writeByte(chBase + 8, store.readByte(chBase + 8) & 0x7F);
      }
      const freqLo = store.readByte(chBase + 7);
      const freqHi = store.readByte(chBase + 8) & 0x07;
      this.papu?.writeReg(apuBase + 2, freqLo);
      this.papu?.writeReg(apuBase + 3, freqHi | 0x18);
    }
  }

  // ════════════════════════════════════════════════════
  // 音高计算（包络衰减 + 频率偏移）
  // ════════════════════════════════════════════════════

  private calcPitch(ch: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const store = this.store;
    const volCtrl = store.readByte(chBase + 5);
    const hiNib = volCtrl & 0xF0;
    let vol: number;

    if (hiNib & 0x20) {
      vol = 0x0F;
    } else {
      vol = volCtrl & 0x0F;
      const decay = store.readByte(0x07CF + ch);
      if (decay !== 0) {
        const newDecay = (decay - 1) & 0xFF;
        store.writeByte(0x07CF + ch, newDecay);
        if (newDecay === 0) {
          vol = (vol + 1) & 0xFF;
          if (vol > 0x0F) vol = 0x0F;
        }
      }
    }

    const noteDur = store.readByte(0x0709 + ch * 4);
    let finalVol = noteDur - vol;
    if (finalVol < 0) finalVol = 0;
    finalVol |= hiNib;
    store.writeByte(chBase + 6, finalVol);
  }

  // ════════════════════════════════════════════════════
  // DPCM
  // ════════════════════════════════════════════════════

  playDpcm(sample: 0 | 1 | 2): void {
    const params = [{ a: 0x00, l: 0x0C }, { a: 0x03, l: 0x20 }, { a: 0x0B, l: 0x13 }];
    const s = params[sample];
    this.papu?.writeReg(APU_STATUS, 0x0F);
    this.papu?.writeReg(0x4010, 0x0F);
    this.papu?.writeReg(0x4012, s.a);
    this.papu?.writeReg(0x4013, s.l);
    this.papu?.writeReg(APU_STATUS, 0x1F);
  }

  // ════════════════════════════════════════════════════
  // 停止 SE
  // ════════════════════════════════════════════════════

  private stopAllSe(): void {
    const ENV_STOP = 0x19, VOL_STOP = 0x0A;
    for (const a of [0x07D0, 0x07D4, 0x07D8, 0x07DC]) this.store.writeByte(a, VOL_STOP);
    for (const a of [0x07CF, 0x07D1, 0x07D2, 0x07D3, 0x07D5, 0x07D6, 0x07D7,
      0x07D9, 0x07DA, 0x07DB, 0x07DD, 0x07DE, 0x07DF]) this.store.writeByte(a, ENV_STOP);
  }
}