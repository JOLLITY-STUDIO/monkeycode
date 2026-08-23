/**
 * AudioService — NES APU 音频引擎 (bank12)
 *
 * 移植自 src-old + AudioRom 数据访问
 *
 * asm 结构:
 *   $8000: 请求分派 (BGM/SE ID → bankswitch → 通道初始化)
 *   $80BA: 帧推进 (两阶段: 8通道tick + 8通道APU写)
 *   $81DB: 音高计算 (包络衰减 + 频率偏移)
 *   $816E: APU 寄存器写入 ($4000-$4003)
 *   $83CB: 命令流解析 (时值/音名/命令)
 *   $8349: 通道初始化 (SE/BGM 指针表 → 通道参数)
 *   $84C9: 命令分发 ($84DA 跳转表 32 命令)
 */
import type { DataStore } from '../../data/store/DataStore';
import type { ApuTarget } from './ApuTarget';
import { NullApuTarget } from './ApuTarget';
import { AudioRom, SONG_REQUEST_IDS, SONG_COUNT } from '../../data/audio/audio-rom';

// APU 寄存器
const APU_PULSE1_CTRL = 0x4000;
const APU_PULSE2_CTRL = 0x4004;
const APU_TRI_CTRL = 0x4008;
const APU_NOISE_CTRL = 0x400C;
const APU_STATUS = 0x4015;

// 通道 APU 基址 (ch0=Pulse1, ch1=Pulse2, ch2=Noise, ch3=Noise备用)
const CHANNEL_APU_BASE: readonly number[] = [
  APU_PULSE1_CTRL, APU_PULSE2_CTRL, APU_NOISE_CTRL, APU_NOISE_CTRL,
];

// $870D 频率表 (bank12 固定)
function readFreq(idx: number): number { return AudioRom.readBank12U16(0x870D + idx * 2); }
// $8725 时值表 (bank12 固定)
function readDur(idx: number): number { return AudioRom.readBank12Byte(0x8725 + idx); }
// $84DA 命令跳转表 (bank12 固定)
function readCmd(idx: number): number { return AudioRom.readBank12U16(0x84DA + idx * 2); }

export class AudioService {
  private apu: ApuTarget = new NullApuTarget();
  protected store: DataStore;

  constructor(store: DataStore) { this.store = store; }
  attachApu(apu: ApuTarget): void { this.apu = apu; }

  // RAM 读写辅助
  protected rd(addr: number): number { return this.store.readByte(addr); }
  protected wr(addr: number, v: number): void { this.store.writeByte(addr, v & 0xFF); }
  protected rdPtr(lo: number, hi: number): number { return (this.rd(hi) << 8) | this.rd(lo); }
  protected wrPtr(lo: number, hi: number, v: number): void { this.wr(lo, v & 0xFF); this.wr(hi, (v >> 8) & 0xFF); }
  protected wrApu(addr: number, v: number): void { this.apu.writeRegister(addr, v & 0xFF); }

  // ════════════════════════════════════════════════════════════
  // 公共 API
  // ════════════════════════════════════════════════════════════

  update(): void {
    // 消费请求队列
    this.consumeQueue();
    // 帧推进阶段1 (通道 tick + 音符推进 + APU 写)
    this.wrPtr(0x00F0, 0x00F1, 0x0727);
    this.wr(0x00F2, 0x00);
    this.wr(0x00F3, 0x08);
    this.phase1Loop();
    // 阶段2 (sub816E APU 写) 暂时跳过 — phase1Loop 中的 writeChannelApu 已处理
    // this.phase2Loop();
    // 全局静音
    if (this.rd(0x07E9) !== 0) this.wrApu(APU_STATUS, 0x00);
  }

  playBgm(bgmId: number): void { this.wr(0x0700, bgmId & 0xFF); }
  playSe(seId: number): void {
    for (let s = 1; s <= 5; s++) { if (this.rd(0x0700 + s) === 0) { this.wr(0x0700 + s, seId & 0xFF); return; } }
    this.wr(0x0705, seId & 0xFF);
  }

  stopAll(): void {
    this.wr(0x07F2, 0);
    for (let i = 0; i < 6; i++) this.wr(0x0700 + i, 0);
    this.wrApu(APU_STATUS, 0x00);
    this.wr(0x0706, 0);
  }

  playDpcm(sample: 0 | 1 | 2): void {
    if (this.rd(0x07E8) !== 0) return;
    const s = [{f:0x0F,a:0x00,l:0x0C},{f:0x0F,a:0x03,l:0x20},{f:0x0F,a:0x0B,l:0x13}][sample];
    this.wrApu(APU_STATUS, 0x1F);
    this.wrApu(0x4010, s.f); this.wrApu(0x4012, s.a); this.wrApu(0x4013, s.l);
    this.wr(0x07E8, 0x80);
  }

  // ════════════════════════════════════════════════════════════
  // 请求队列消费 ($8000 + $8061)
  // ════════════════════════════════════════════════════════════

  private consumeQueue(): void {
    // BGM 槽
    const bgmReq = this.rd(0x0700);
    if (bgmReq !== 0 && bgmReq < 0x32) {
      this.startBgm(bgmReq);
      this.wr(0x0700, 0);
    }
    // SE 槽
    for (let slot = 1; slot <= 5; slot++) {
      const seReq = this.rd(0x0700 + slot);
      if (seReq === 0) continue;
      if (seReq >= 0x72) { this.wr(0x0700 + slot, 0); continue; }
      if (seReq === 0x31) { this.stopAllSe(); this.wr(0x0700 + slot, 0); continue; }
      this.startSe(seReq, slot);
      this.wr(0x0700 + slot, 0);
    }
  }

  // ════════════════════════════════════════════════════════════
  // BGM 启动 (原版 $8000 → bankswitch → $8349 通道初始化)
  // ════════════════════════════════════════════════════════════

  private startBgm(bgmId: number): void {
    // 写 $07FC (BGM 数据组索引)
    let bgmGroup: number;
    if (bgmId < 0x32) bgmGroup = 0x07;
    else if (bgmId < 0x44) bgmGroup = 0x0D;
    else if (bgmId < 0x51) bgmGroup = 0x0E;
    else if (bgmId < 0x5C) bgmGroup = 0x0F;
    else bgmGroup = 0x07;
    this.wr(0x07FC, bgmGroup);

    // 从 BGM 指针表读取数据起始地址
    const dataAddr = AudioRom.readBgmPointer(bgmId);
    if (dataAddr === 0) return;

    // 跳过 $00 头部，找到第一个 >= $80 的字节
    let offset = 0;
    for (let i = 0; i < 64; i++) {
      const b = AudioRom.readBgmData(dataAddr + i);
      if (b >= 0x80) { offset = i; break; }
    }
    const streamAddr = dataAddr + offset;

    // 初始化通道 0 (Pulse1) — 其他通道从数据流命令设置
    const chBase = 0x0727;
    this.wrPtr(chBase, chBase + 1, streamAddr);     // offset 0-1: 数据流指针
    this.wrPtr(chBase + 2, chBase + 3, streamAddr); // offset 2-3: 音符表指针
    this.wr(chBase + 4, 0);                          // offset 4: 音符索引
    this.wr(chBase + 5, 0x0F);                       // offset 5: 音量
    this.wr(chBase + 6, 0);                          // offset 6: 控制
    this.wr(chBase + 7, 0);                          // offset 7: 频率低
    this.wr(chBase + 8, 0);                          // offset 8: 频率高

    // tick 计数器
    this.wr(0x0707, 1);    // tick
    this.wr(0x0708, 1);    // tick 重载
    this.wr(0x0709, 0);    // 包络计数器
    this.wr(0x070A, 0);    // 音高值

    // 通道使能
    this.wr(0x0706, 0x01);  // Pulse1

    // 执行命令流预处理
    this.sub83CB();

    // 启用 APU
    this.wrApu(APU_STATUS, 0x0F);
    this.wrApu(APU_PULSE1_CTRL, 0x3F);  // 50%占空 + 最大音量
  }

  // ════════════════════════════════════════════════════════════
  // SE 启动 ($8349)
  // ════════════════════════════════════════════════════════════

  private startSe(seId: number, slot: number): void {
    void slot;
    const seIndex = seId - 1;
    if (seIndex < 0 || seIndex >= 100) return;
    const seDataAddr = AudioRom.readSePointer(seIndex);
    if (seDataAddr === 0) return;

    // SE 数据在 bank13/14/15
    // 简化：标记 Noise 通道
    this.wr(0x0706, this.rd(0x0706) | 0x08);
    this.wrApu(APU_STATUS, 0x0F);
  }

  // ════════════════════════════════════════════════════════════
  // 帧推进阶段1 ($80CA-$811B): 8 通道 tick
  // ════════════════════════════════════════════════════════════

  private phase1Loop(): void {
    while (this.rd(0x00F3) > 0) {
      const enable = this.rd(0x0706);
      if ((enable & 1) !== 0) {
        this.wr(0x0706, enable | 0x80);
        const x = this.rd(0x00F2);
        // DEC $0707,X (音符计数器)
        const noteCnt = (this.rd(0x0707 + x) - 1) & 0xFF;
        this.wr(0x0707 + x, noteCnt);
        if (noteCnt === 0) {
          this.sub83CB();  // 音符结束，读下一个
          // sub83CB 设置了频率，立即写 APU
          this.writeChannelApu(x >> 2);  // x/4 = 通道号
        }
        // DEC $0709,X (包络计数器)
        const x2 = this.rd(0x00F2);
        const envCnt = (this.rd(0x0709 + x2) - 1) & 0xFF;
        this.wr(0x0709 + x2, envCnt);
        if (envCnt === 0) {
          this.reloadEnvelope(x2);
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

  /** 直接写通道 APU 寄存器（频率+控制） */
  private writeChannelApu(ch: number): void {
    const chBase = 0x0727 + ch * 0x10;
    const apuBase = CHANNEL_APU_BASE[ch] ?? APU_PULSE1_CTRL;
    const ctrl = this.rd(chBase + 6);
    const freqLo = this.rd(chBase + 7);
    const freqHi = this.rd(chBase + 8) & 0x7F;  // 去掉 bit7 标志
    const volume = this.rd(chBase + 5) & 0x0F;

    if (ch === 0 || ch === 1) {
      // Pulse1/Pulse2
      this.wrApu(apuBase, 0x30 | volume);  // 50%占空 + 固定音量
      this.wrApu(apuBase + 1, 0x08);       // 清除扫描
      this.wrApu(apuBase + 2, freqLo);     // 频率低
      this.wrApu(apuBase + 3, freqHi | 0x08);  // 频率高 + 长度计数器
    } else if (ch === 2) {
      // Triangle
      this.wrApu(0x4008, 0x80 | volume);
      this.wrApu(0x400A, freqLo);
      this.wrApu(0x400B, freqHi | 0x80);
    } else if (ch === 3) {
      // Noise
      this.wrApu(0x400C, 0x30 | volume);
      this.wrApu(0x400E, freqLo & 0x0F);
      this.wrApu(0x400F, 0x08);
    }
  }

  // ════════════════════════════════════════════════════════════
  // 帧推进阶段2 ($811D-$8162): 8 通道 APU 写
  // ════════════════════════════════════════════════════════════

  private phase2Loop(): void {
    this.wrPtr(0x00F0, 0x00F1, 0x0727);
    this.wr(0x00FC, 0x27); this.wr(0x00FD, 0x07);
    this.wr(0x00F2, 0x03); this.wr(0x00F3, 0x11);
    while (true) {
      const f3 = this.rd(0x00F3);
      const mask = f3 & 0x0F;
      if (mask !== 0) {
        const f0 = this.rdPtr(0x00F0, 0x00F1);
        this.wrPtr(0x00F0, 0x00F1, (f0 + 0x40) & 0xFFFF);
        this.sub816E();
      }
      const fc = this.rdPtr(0x00FC, 0x00FD);
      this.wrPtr(0x00FC, 0x00FD, (fc + 0x10) & 0xFFFF);
      this.wrPtr(0x00F0, 0x00F1, this.rdPtr(0x00FC, 0x00FD));
      this.wr(0x00F3, (this.rd(0x00F3) << 1) & 0xFF);
      const f2 = (this.rd(0x00F2) - 1) & 0xFF;
      this.wr(0x00F2, f2);
      if ((f2 & 0x80) !== 0) break;
    }
  }

  // ════════════════════════════════════════════════════════════
  // $81DB: 音高计算 (包络衰减 + 频率偏移)
  // ════════════════════════════════════════════════════════════

  private sub81DB(): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const p5 = this.rd(paramPtr + 5);
    let f6 = p5 & 0xF0;
    let f7: number;
    if ((p5 & 0x20) !== 0) {
      f7 = 0x0F;  // 振动标志
    } else {
      f7 = p5 & 0x0F;
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
    const combined = f7 | f6;
    this.wr(paramPtr + 5, combined);
    f7 = combined & 0x0F;
    // 频率偏移: $070A,X - f7
    const x = this.rd(0x00F2);
    let a = this.rd(0x070A + x);
    a = (a - f7) & 0xFF;
    if ((a & 0x80) !== 0) a = 0;
    a = a | f6;
    this.wr(paramPtr + 6, a);
  }

  // ════════════════════════════════════════════════════════════
  // $816E: APU 寄存器写入
  // ════════════════════════════════════════════════════════════

  private sub816E(): void {
    const ch = this.rd(0x00F2);
    const apuBase = CHANNEL_APU_BASE[(3 ^ ch) & 0x03];
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    let ctrl = this.rd(paramPtr + 6);
    this.wr(0x00FB, ch);
    if (ch === 1) {
      ctrl = (ctrl & 0x0F) | 0x80;
    } else {
      ctrl = ctrl | 0x30;
    }
    this.wrApu(apuBase, ctrl);
    // 扫描寄存器（清除扫描）
    this.wrApu(apuBase + 1, 0x08);
    // 频率写入：检查 offset 8 的 bit7（频率更新标志）
    const flag8 = this.rd(paramPtr + 8);
    if ((flag8 & 0x80) !== 0) {
      // 清 bit7
      this.wr(paramPtr + 8, flag8 & 0x7F);
      // 写频率低字节
      const freqLo = this.rd(paramPtr + 7);
      this.wrApu(apuBase + 2, freqLo);
      // 写频率高字节 + 长度计数器
      const freqHi = this.rd(paramPtr + 8) | 0x18;
      const fb = this.rd(0x00FB);
      if (fb !== 0 && fb !== 1) {
        const cached = this.rd(0x07E0 + fb);
        if (freqHi === cached) return;
      }
      this.wrApu(apuBase + 3, freqHi);
      this.wr(0x07E0 + this.rd(0x00FB), freqHi);
    }
  }

  // ════════════════════════════════════════════════════════════
  // $83CB: 命令流解析 (音符结束时调用)
  // ════════════════════════════════════════════════════════════

  private sub83CB(): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    // 清 offset 5 bit4+5
    this.wr(paramPtr + 5, this.rd(paramPtr + 5) & 0xCF);
    // 读 offset 0-1 → 数据指针
    const dataPtr = this.rdPtr(paramPtr, paramPtr + 1);
    if (dataPtr === 0) return;

    let y = 0;
    for (let safety = 0; safety < 512; safety++) {
      const dataByte = AudioRom.readBgmData(dataPtr + y);

      if (dataByte < 0x80) {
        // $8404: 音名处理
        y++;
        // 更新 offset 0-1 = dataPtr + y
        this.wrPtr(paramPtr, paramPtr + 1, (dataPtr + y) & 0xFFFF);

        // 音名低4位 → 查 $870D 频率表
        const noteName = dataByte & 0x0F;
        if (noteName === 0x0C) {
          // 休止符
          this.wr(paramPtr + 5, this.rd(paramPtr + 5) | 0x20);
          return;
        }
        // 查频率表
        let freq = readFreq(noteName);
        let freqLo = freq & 0xFF;
        let freqHi = (freq >> 8) & 0xFF;
        // 八度右移
        const octave = (dataByte >> 4) & 0x0F;
        for (let i = 0; i < octave; i++) {
          const carry = freqHi & 1;
          freqHi = (freqHi >> 1) & 0x7F;
          freqLo = ((freqLo >> 1) | (carry << 7)) & 0xFF;
        }
        // transpose
        const ch = this.rd(0x00F2) >> 2;  // 通道号
        const transposeFlag = this.rd(0x07F4 + ch);
        const transposeVal = this.rd(0x07A7 + ch);
        let finalLo, finalHi;
        if (transposeFlag !== 0) {
          let r = freqLo - transposeVal;
          if (r < 0) { finalLo = r & 0xFF; finalHi = (freqHi - 1) & 0xFF; }
          else { finalLo = r & 0xFF; finalHi = freqHi; }
        } else {
          let r = freqLo + transposeVal;
          finalLo = r & 0xFF;
          finalHi = (freqHi + (r > 0xFF ? 1 : 0)) & 0xFF;
        }
        // 写 offset 6-7 (参数[6]=控制, 参数[7]=频率低)
        // 注意: asm 写 offset 7 = 频率低, offset 8 = 频率高
        this.wr(paramPtr + 7, finalLo);
        this.wr(0x07B7 + ch, finalLo);
        this.wr(paramPtr + 8, finalHi | 0x80);
        this.wr(0x07BF + ch, finalHi);
        // 设置 $070A (音高值，用于 sub81DB 频率偏移)
        this.wr(0x070A + this.rd(0x00F2), finalLo);
        return;
      }

      if (dataByte >= 0xE0) {
        // 命令分发
        y++;
        const cmdIdx = dataByte & 0x1F;
        const cmdAddr = readCmd(cmdIdx);
        y = this.executeCommand(ch >> 2, cmdAddr, dataPtr, y);
        continue;
      }

      if (dataByte >= 0xB0) {
        // 速度设置，跳过参数
        y++;
        continue;
      }

      // $80-$AF: 时值设置
      const durIdx = dataByte & 0x3F;
      const tick = readDur(durIdx);
      const x = this.rd(0x00F2);
      this.wr(0x0707 + x, tick);
      this.wr(0x0708 + x, tick);
      y++;
      continue;
    }
  }

  // ════════════════════════════════════════════════════════════
  // 命令执行 ($84C9 分发)
  // ════════════════════════════════════════════════════════════

  private executeCommand(ch: number, cmdAddr: number, dataPtr: number, y: number): number {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);

    if (cmdAddr === 0x8544) {
      // 设置音符表指针
      const songNo = AudioRom.readBgmData(dataPtr + y);
      y++;
      const tablePtr = AudioRom.readBank12U16(0x8754 + songNo * 2);
      this.wrPtr(paramPtr + 2, paramPtr + 3, tablePtr);
      return y;
    }
    if (cmdAddr === 0x851A) { this.stopAll(); return y; }
    if (cmdAddr === 0x8707) { return y; }
    if (cmdAddr === 0x8641) {
      const vol = AudioRom.readBgmData(dataPtr + y); y++;
      this.wr(paramPtr + 5, (this.rd(paramPtr + 5) & 0x3F) | (vol & 0xC0));
      return y;
    }
    if (cmdAddr === 0x8670) {
      const t = AudioRom.readBgmData(dataPtr + y); y++;
      this.wr(0x07F4 + ch, (t >> 7) & 1);
      this.wr(0x07A7 + ch, (t >> 1) & 0x7F);
      return y;
    }
    if (cmdAddr === 0x8681) {
      const m = AudioRom.readBgmData(dataPtr + y); y++;
      this.wr(0x07AF + ch, m);
      this.wr(0x07C7 + ch, 0);
      return y;
    }
    if (cmdAddr === 0x8690) { this.wr(0x07AF + ch, 0); return y; }
    if (cmdAddr === 0x8699) { this.playDpcm(0); return y; }
    if (cmdAddr === 0x86B8) { this.playDpcm(1); return y; }
    if (cmdAddr === 0x86D6) { this.playDpcm(2); return y; }
    return y;
  }

  // ════════════════════════════════════════════════════════════
  // 包络重载
  // ════════════════════════════════════════════════════════════

  private reloadEnvelope(x: number): void {
    const paramPtr = this.rdPtr(0x00F0, 0x00F1);
    const envPtrLo = this.rd(paramPtr + 2);
    const envPtrHi = this.rd(paramPtr + 3);
    const envOff = this.rd(paramPtr + 4);
    this.wr(paramPtr + 4, (envOff + 2) & 0xFF);
    const envPtr = (envPtrHi << 8) | envPtrLo;
    const envVal = AudioRom.readBgmData(envPtr + envOff);
    this.wr(0x0709 + x, envVal);
    this.wr(0x070A + x, AudioRom.readBgmData(envPtr + envOff + 1));
  }

  // ════════════════════════════════════════════════════════════
  // 停止 SE
  // ════════════════════════════════════════════════════════════

  private stopAllSe(): void {
    const ENV_STOP = 0x19, VOL_STOP = 0x0A;
    for (const a of [0x07D0, 0x07D4, 0x07D8, 0x07DC]) this.wr(a, VOL_STOP);
    for (const a of [0x07CF, 0x07D1, 0x07D2, 0x07D3, 0x07D5, 0x07D6, 0x07D7,
      0x07D9, 0x07DA, 0x07DB, 0x07DD, 0x07DE, 0x07DF]) this.wr(a, ENV_STOP);
  }
}
