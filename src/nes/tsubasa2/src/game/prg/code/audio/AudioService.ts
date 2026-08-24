/**
 * AudioService — NES APU 音频引擎 (bank12)
 *
 * 直接对接 PAPU（src/core/papu），完整 APU 模拟。
 *
 * BGM 数据头部格式（从 ROM 分析确认）：
 *   头部 = [chNum, trackLo, trackHi] × N（每通道 3 字节）
 *   chNum >= 0x80 或 $FF = 头部结束
 *   每通道有独立的乐谱数据流
 *
 * 通道映射：chNum 0-3 → 内部 ch 4-7（SQ1/SQ2/TRI/NOISE）
 *
 * 命令流格式（$83CB）：
 *   字节 < $80 → 音名（低4位=半音查$870D, 高4位=八度右移）
 *   字节 $80-$AF → 时值（AND #$3F 查 $8725 表，设置 tick，继续循环）
 *   字节 $B0-$DF → 速度（跳过参数，继续循环）
 *   字节 >= $E0 → 命令（$84C9 分发 32 命令）
 */
import type { DataStore } from '../../data/store/DataStore';
import { AudioRom } from '../../data/audio/audio-rom';

// PAPU 类型（松散类型，因为 papu 是 tsnes 移植代码）
export interface Papu {
  writeReg(addr: number, value: number): void;
  clockFrameCounter(nCycles: number, frameCounterAlreadyAdvanced?: number): void;
  sampleTimer: number;
  sampleTimerMax: number;
  nes: { opts: { onAudioSample?: (l: number, r: number) => void } };
}

// APU 寄存器
const APU_STATUS = 0x4015;

// 通道状态块基址（$0727，每通道 16 字节）
const CH_STATE_BASE = 0x0727;
// 计数器基址（$0707，每通道 4 字节）
const CH_COUNTER_BASE = 0x0707;

// 通道数
const NUM_CH = 8;

// $870D 频率表
function readFreq(idx: number): number { return AudioRom.readBank12U16(0x870D + idx * 2); }
// $8725 时值表
function readDur(idx: number): number { return AudioRom.readBank12Byte(0x8725 + idx); }
// $84DA 命令跳转表
function readCmd(idx: number): number { return AudioRom.readBank12U16(0x84DA + idx * 2); }

export class AudioService {
  private papu: Papu | null = null;
  protected store: DataStore;
  /** 当前播放曲目所在 bank（BGM=7, SE=13/14/15；替代原版 MMC3 R7 切换状态） */
  private trackBank: 7 | 13 | 14 | 15 = 7;

  constructor(store: DataStore) { this.store = store; }

  /** 注入 PAPU 实例 */
  attachPapu(papu: Papu): void { this.papu = papu; }

  // RAM 辅助
  protected rd(addr: number): number { return this.store.readByte(addr); }
  protected wr(addr: number, v: number): void { this.store.writeByte(addr, v & 0xFF); }
  protected rdPtr(lo: number, hi: number): number { return (this.rd(hi) << 8) | this.rd(lo); }
  protected wrPtr(lo: number, hi: number, v: number): void { this.wr(lo, v & 0xFF); this.wr(hi, (v >> 8) & 0xFF); }
  protected wrApu(addr: number, v: number): void { this.papu?.writeReg(addr, v & 0xFF); }

  // ════════════════════════════════════════════════════
  // 公共 API
  // ════════════════════════════════════════════════════

  update(): void {
    this.consumeQueue();
    // Phase 1: 8 通道 tick
    this.wrPtr(0x00F0, 0x00F1, CH_STATE_BASE);
    this.wr(0x00F2, 0);
    this.wr(0x00F3, NUM_CH);
    this.phase1();
    // Phase 2: APU 寄存器写入
    this.phase2();
    // PAPU 帧推进（小批量调用，模拟 CPU 指令级时钟）
    // 不清 extraCycles，让 PAPU 自然累积
    if (this.papu) {
      let remaining = 29830;
      while (remaining > 0) {
        const n = remaining > 7 ? 7 : remaining;
        this.papu.clockFrameCounter(n, 0);
        remaining -= n;
      }
    }
    // 全局静音
    if (this.rd(0x07E9) !== 0) this.wrApu(APU_STATUS, 0);
  }

  playBgm(bgmId: number): void { this.wr(0x0700, bgmId & 0xFF); }
  playSe(seId: number): void {
    for (let s = 1; s <= 5; s++) { if (this.rd(0x0700 + s) === 0) { this.wr(0x0700 + s, seId & 0xFF); return; } }
    this.wr(0x0705, seId & 0xFF);
  }
  stopAll(): void {
    for (let i = 0; i < 6; i++) this.wr(0x0700 + i, 0);
    this.wrApu(APU_STATUS, 0);
    this.wr(0x0706, 0);
  }

  // ════════════════════════════════════════════════════
  // 请求队列消费
  // ════════════════════════════════════════════════════

  private consumeQueue(): void {
    const bgmReq = this.rd(0x0700);
    if (bgmReq !== 0 && bgmReq < 0x32) { this.startBgm(bgmReq); this.wr(0x0700, 0); }
    for (let slot = 1; slot <= 5; slot++) {
      const seReq = this.rd(0x0700 + slot);
      if (seReq === 0) continue;
      if (seReq >= 0x72) { this.wr(0x0700 + slot, 0); continue; }
      if (seReq === 0x31) { this.stopAllSe(); this.wr(0x0700 + slot, 0); continue; }
      this.startSe(seReq);
      this.wr(0x0700 + slot, 0);
    }
  }

  // ════════════════════════════════════════════════════
  // BGM 启动 — 解析头部，初始化各通道
  // ════════════════════════════════════════════════════

  private startBgm(bgmId: number): void {
    this.wr(0x0706, 0); // 清通道使能（BGM 重新开始）
    // BGM 乐谱数据位于 bank7（原版首循环 $8009-$8011 写入 R7=7 映射 $A000-$BFFF）
    this.trackBank = 7;
    // $8349 统一分发（BGM/SE 同例程）：主表 $8BDA[req-1] → 解析通道头
    this.startSong(bgmId);
  }

  /**
   * 对应原始 $8349：统一歌曲启动例程（BGM/SE 共用）。
   * 主表 $8BDA[requestId-1]（bank12 固定）→ 歌曲数据；
   * 解析通道头 [chNum, trackLo, trackHi]，chNum>=0x80 结束（$8360-$8362）。
   * 确认：request 0x01（开场）→ $8E42（bank12，8 通道头，轨道均 $8E5A）。
   */
  private startSong(requestId: number): void {
    const songAddr = AudioRom.readSePointer(requestId - 1); // $8BDA 主表
    if (songAddr === 0) return;
    // $8362: BPL — 首字节 bit7=1 → 仅使能通道后返回
    if ((AudioRom.readTrackData(songAddr, this.trackBank) & 0x80) !== 0) {
      this.wrApu(APU_STATUS, 0x0F);
      return;
    }
    // 逐条解析通道头（initChannel 内部 OR 累积通道使能位 $0706）
    for (let offset = 0; offset + 2 < 0x4000;) {
      const chNum = AudioRom.readTrackData(songAddr + offset, this.trackBank);
      if (chNum >= 0x80) break;
      const trackLo = AudioRom.readTrackData(songAddr + offset + 1, this.trackBank);
      const trackHi = AudioRom.readTrackData(songAddr + offset + 2, this.trackBank);
      offset += 3;
      const trackAddr = trackLo | (trackHi << 8);
      if (trackAddr < 0x8000 || trackAddr > 0xBFFF) continue;
      const internalCh = chNum >= 4 ? chNum : chNum + 4;
      this.initChannel(internalCh, trackAddr);
    }
    this.wrApu(APU_STATUS, 0x0F);
  }

  /** 初始化单个通道 */
  private initChannel(ch: number, trackAddr: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const counterBase = CH_COUNTER_BASE + ch * 4;

    // 通道状态块
    this.wrPtr(chBase, chBase + 1, trackAddr);      // offset 0-1: 数据指针
    this.wrPtr(chBase + 2, chBase + 3, trackAddr);  // offset 2-3: 音符表指针
    this.wr(chBase + 4, 0);                          // offset 4: 索引
    // volCtrl: ch5(Pulse2)=0x80, ch6(Triangle)=0x0F, 其他=0x00
    const pm = ch & 3;
    this.wr(chBase + 5, pm === 1 ? 0x80 : pm === 2 ? 0x0F : 0x00);
    this.wr(chBase + 6, 0x30);                       // apuVol
    this.wr(chBase + 7, 0);                          // freqLo
    this.wr(chBase + 8, 0x80);                       // freqHi (bit7=标志)
    this.wr(chBase + 9, 0x0F);                       // stkPtr

    // 计数器
    this.wr(counterBase, 1);     // durLo = 1
    this.wr(counterBase + 1, 1); // durHi = 1
    this.wr(counterBase + 2, 1); // noteDur
    this.wr(counterBase + 3, 0); // nextDurHi

    // 通道使能位
    let bit = 1;
    for (let i = 0; i < ch; i++) bit = (bit << 1) & 0xFF;
    this.wr(0x0706, this.rd(0x0706) | bit);

    // 立即触发音序器（durLo=1 → 第一帧 dl=(1-1)=0 → 触发 sub83CB）
    this.wr(counterBase, 1); // durLo=1
    this.wr(counterBase + 1, 1); // durHi=1
  }

  // ════════════════════════════════════════════════════
  // SE 启动
  // ════════════════════════════════════════════════════

  private startSe(seId: number): void {
    // SE 数据按请求范围分属 bank13/14/15（原版 $8017-$8052 首循环按范围写 R7）
    let seBank: 7 | 13 | 14 | 15 = 13;
    if (seId >= 0x44 && seId < 0x51) seBank = 14;
    else if (seId >= 0x51) seBank = 15;
    this.trackBank = seBank;
    // $8349 统一分发（与 BGM 同例程）：主表 $8BDA[req-1] → 解析通道头
    this.startSong(seId);
  }

  // ════════════════════════════════════════════════════
  // Phase 1: 8 通道 tick（$80CA-$811B）
  // ════════════════════════════════════════════════════

  private phase1(): void {
    const mask = this.rd(0x0706);
    for (let ch = 0; ch < NUM_CH; ch++) {
      const chBit = 1 << ch;
      if (!(mask & chBit)) continue;

      const x = ch * 4;
      // DEC durLo
      let dl = (this.rd(0x0707 + x) - 1) & 0xFF;
      this.wr(0x0707 + x, dl);
      if (dl === 0) {
        this.sub83CB(ch);
      }
      // DEC durHi
      let dh = (this.rd(0x0708 + x) - 1) & 0xFF;
      this.wr(0x0708 + x, dh);
      if (dh === 0) {
        this.wr(0x0708 + x, this.rd(0x0707 + x) || 1);
      }
      // 音高计算
      this.sub81DB(ch);
    }
  }

  // ════════════════════════════════════════════════════
  // Phase 2: APU 寄存器写入（$8129-$8161）
  // ════════════════════════════════════════════════════

  private phase2(): void {
    // 4 组 APU 写入
    const groups = [
      { g: 3, mask: 0x11, chLow: 0, chHigh: 4 }, // SQ1
      { g: 2, mask: 0x22, chLow: 1, chHigh: 5 }, // SQ2
      { g: 1, mask: 0x44, chLow: 2, chHigh: 6 }, // TRI
      { g: 0, mask: 0x88, chLow: 3, chHigh: 7 }, // NOISE
    ];
    const chMask = this.rd(0x0706);
    for (const slot of groups) {
      if (!(chMask & slot.mask)) continue;
      const ch = (chMask & (1 << slot.chLow)) ? slot.chLow : slot.chHigh;
      this.writeApuReg(ch, slot.g);
    }
  }

  /** $816E: 写 APU 寄存器 */
  private writeApuReg(ch: number, group: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const isTri = group === 1;
    // APU 基址: group 3→$4000(SQ1), 2→$4004(SQ2), 1→$4008(TRI), 0→$400C(NOISE)
    const apuBase = 0x4000 + (group ^ 3) * 4;

    const volByte = isTri ? this.rd(chBase + 5) : this.rd(chBase + 6);
    if (isTri) {
      this.wrApu(apuBase, (volByte & 0x0F) | 0x80);
    } else {
      this.wrApu(apuBase, volByte | 0x30);
    }

    // sweep 检查
    const sweepEnabled = (this.rd(chBase + 5) & 0x10) !== 0;
    if (!sweepEnabled) {
      this.wrApu(apuBase + 1, 0x08);
    }

    // 频率写入（sweep 禁用时直接写，sweep 使能时检查 freqHi bit7）
    if (!sweepEnabled || (this.rd(chBase + 8) & 0x80) !== 0) {
      if (sweepEnabled) {
        this.wr(chBase + 8, this.rd(chBase + 8) & 0x7F);
      }
      const freqLo = this.rd(chBase + 7);
      const freqHi = this.rd(chBase + 8) & 0x07;
      this.wrApu(apuBase + 2, freqLo);
      this.wrApu(apuBase + 3, freqHi | 0x18);
    }
  }

  // ════════════════════════════════════════════════════
  // $81DB: 音高计算（包络衰减 + 频率偏移）
  // ════════════════════════════════════════════════════

  private sub81DB(ch: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const volCtrl = this.rd(chBase + 5);
    const hiNib = volCtrl & 0xF0;
    let vol: number;

    if (hiNib & 0x20) {
      vol = 0x0F; // 振动标志
    } else {
      vol = volCtrl & 0x0F;
      // 包络衰减
      const decayIdx = ch; // 简化
      const decay = this.rd(0x07CF + decayIdx);
      if (decay !== 0) {
        const newDecay = (decay - 1) & 0xFF;
        this.wr(0x07CF + decayIdx, newDecay);
        if (newDecay === 0) {
          vol = (vol + 1) & 0xFF;
          if (vol > 0x0F) vol = 0x0F;
        }
      }
    }

    // 频率偏移
    const noteDur = this.rd(0x0709 + ch * 4); // nextDurHi
    let finalVol = noteDur - vol;
    if (finalVol < 0) finalVol = 0;
    finalVol |= hiNib;
    this.wr(chBase + 6, finalVol);
  }

  // ════════════════════════════════════════════════════
  // $83CB: 命令流解析
  // ════════════════════════════════════════════════════

  private sub83CB(ch: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const counterBase = CH_COUNTER_BASE + ch * 4;

    // 清 offset 5 bit4+5
    this.wr(chBase + 5, this.rd(chBase + 5) & 0xCF);

    // 读 offset 0-1 → 数据指针
    let dataPtr = this.rdPtr(chBase, chBase + 1);
    if (dataPtr === 0) return;

    let y = 0;
    for (let safety = 0; safety < 512; safety++) {
      const b = AudioRom.readTrackData(dataPtr + y, this.trackBank);

      if (b < 0x80) {
        // $8404: 音名处理
        y++;
        // 更新数据指针
        this.wrPtr(chBase, chBase + 1, (dataPtr + y) & 0xFFFF);

        // 直通通道（ch 3=NOISE, ch 7=NOISE）
        if (ch === 3 || ch === 7) {
          if (b === 0x10) {
            this.wr(chBase + 5, this.rd(chBase + 5) | 0x20); // 休止
          } else {
            this.wr(chBase + 7, b); // 直接作频率低字节
            this.wr(chBase + 8, 0x80);
          }
          this.wr(0x07F4 + ch, 0);
          this.wr(0x0708 + ch * 4, 1);
          return;
        }

        // 半音通道
        const semitone = b & 0x0F;
        if (semitone >= 0x0C) {
          // 休止符
          this.wr(chBase + 5, this.rd(chBase + 5) | 0x20);
          this.wr(0x07F4 + ch, 0);
          this.wr(0x0708 + ch * 4, 1);
          return;
        }

        // 查频率表
        let period = readFreq(semitone);
        let fLo = period & 0xFF;
        let fHi = (period >> 8) & 0x07;

        // 八度右移
        const octave = (b >> 4) & 0x0F;
        for (let o = 0; o < octave; o++) {
          const carry = fHi & 1;
          fHi = (fHi >> 1) & 0x07;
          fLo = ((fLo >> 1) | (carry << 7)) & 0xFF;
        }
        if (fLo < 2 && fHi === 0) fLo = 2;

        // transpose
        const portamentoVal = this.rd(0x07F4 + ch);
        const portamentoScratch = this.rd(0x07A7 + ch);
        if (portamentoVal !== 0) {
          // 减法
          let r = fLo - portamentoScratch;
          if (r < 0) { fLo = r & 0xFF; fHi = (fHi - 1) & 0x07; }
          else { fLo = r & 0xFF; }
        } else {
          // 加法
          let r = fLo + portamentoScratch;
          fLo = r & 0xFF;
          fHi = (fHi + (r > 0xFF ? 1 : 0)) & 0x07;
        }
        fHi |= 0x80; // bit7 = 频率更新标志

        // 写入通道状态块
        this.wr(chBase + 7, fLo);  // freqLo
        this.wr(chBase + 8, fHi);  // freqHi
        this.wr(0x07B7 + ch, fLo);
        this.wr(0x07BF + ch, fHi);

        // 清 portamentoVal
        this.wr(0x07F4 + ch, 0);
        this.wr(0x0708 + ch * 4, 1); // durHi = 1
        return;
      }

      if (b >= 0xE0) {
        // 命令分发
        y++;
        const cmdIdx = b & 0x1F;
        const cmdAddr = readCmd(cmdIdx);
        y = this.execCmd(ch, chBase, dataPtr, y, cmdAddr);
        continue;
      }

      if (b >= 0xB0) {
        // 速度，跳过参数
        y++;
        continue;
      }

      // $80-$AF: 时值
      const durIdx = b & 0x3F;
      const tick = readDur(durIdx);
      this.wr(0x0707 + ch * 4, tick);
      this.wr(0x0708 + ch * 4, tick);
      y++;
      continue;
    }
  }

  // ════════════════════════════════════════════════════
  // 命令执行
  // ════════════════════════════════════════════════════

  private execCmd(ch: number, chBase: number, dataPtr: number, y: number, cmdAddr: number): number {
    const readByte = (): number => {
      const b = AudioRom.readTrackData(dataPtr + y, this.trackBank);
      return b;
    };
    const advance = (): number => { const b = readByte(); y++; return b; };

    switch (cmdAddr) {
      case 0x8544: { // $E0: 设置音符表指针
        const idx = advance();
        this.wr(chBase + 4, idx); // timingLo
        this.wr(chBase + 5, this.rd(chBase + 5) | 0x80); // timingHi = $FF 标志
        return y;
      }
      case 0x8707: return y; // NOP
      case 0x8641: { // $E2: 设置音量
        const param = advance();
        this.wr(chBase + 5, (this.rd(chBase + 5) & 0xF0) | (param & 0x0F));
        return y;
      }
      case 0x8670: { // $E5: 设置 portamento
        const param = advance();
        if (!(param & 0x80)) this.wr(0x07F4 + ch, (param << 1) & 0xFF);
        this.wr(0x07A7 + ch, param);
        return y;
      }
      case 0x8681: { // $ED: 设置通道类型
        const param = advance();
        this.wr(0x07AF + ch, param);
        this.wr(0x07C7 + ch, 0);
        return y;
      }
      case 0x8690: { // $EF: 清除通道类型
        this.wr(0x07AF + ch, 0);
        return y;
      }
      case 0x851A: { // $F2: 停止
        this.stopAll();
        return y;
      }
      case 0x8699: { this.playDpcm(0); return y; }
      case 0x86B8: { this.playDpcm(1); return y; }
      case 0x86D6: { this.playDpcm(2); return y; }
      case 0x86F6: { // $FE: 设置 volDecay
        const decay = advance();
        this.wr(0x07CF + ch, decay);
        this.wr(0x07D7 + ch, decay);
        return y;
      }
      case 0x8655: { // $FF: 停止通道 / 循环
        // 回到起点
        this.wrPtr(chBase, chBase + 1, this.rdPtr(chBase + 2, chBase + 3));
        this.wr(chBase + 4, 0);
        return y;
      }
      default: return y; // 未实现命令
    }
  }

  // ════════════════════════════════════════════════════
  // DPCM
  // ════════════════════════════════════════════════════

  playDpcm(sample: 0 | 1 | 2): void {
    const params = [{ a: 0x00, l: 0x0C }, { a: 0x03, l: 0x20 }, { a: 0x0B, l: 0x13 }];
    const s = params[sample];
    this.wrApu(APU_STATUS, 0x0F);
    this.wrApu(0x4010, 0x0F);
    this.wrApu(0x4012, s.a);
    this.wrApu(0x4013, s.l);
    this.wrApu(APU_STATUS, 0x1F);
  }

  // ════════════════════════════════════════════════════
  // 停止 SE
  // ════════════════════════════════════════════════════

  private stopAllSe(): void {
    const ENV_STOP = 0x19, VOL_STOP = 0x0A;
    for (const a of [0x07D0, 0x07D4, 0x07D8, 0x07DC]) this.wr(a, VOL_STOP);
    for (const a of [0x07CF, 0x07D1, 0x07D2, 0x07D3, 0x07D5, 0x07D6, 0x07D7,
      0x07D9, 0x07DA, 0x07DB, 0x07DD, 0x07DE, 0x07DF]) this.wr(a, ENV_STOP);
  }
}
