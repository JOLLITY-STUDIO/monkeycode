/**
 * AudioEngine - NES 音乐/音效引擎
 * 
 * 移植自 Bank 1 $9B00-$9FFF 音频引擎代码
 * 
 * 核心逻辑:
 * 1. 每帧 NMI 中调用 update() (对应 ASM $9B00 SoundFrameUpdate)
 * 2. 处理 4 个音频通道的音符播放 ($0759-$0798 通道状态)
 * 3. 从音乐序列数据中读取音符和命令
 * 4. 写入 APU 寄存器 → ApuSimulator → Web Audio API
 * 
 * 音乐数据格式 (每通道 16 字节, 地址 $0759+ch*$10):
 *   [0-1]: 音乐数据指针 (低/高字节)
 *   [2-3]: 循环点地址 (低/高)
 *   [4]:   循环计数器
 *   [5]:   通道属性 (bit4=静音标志, bit0-3=包络索引)
 *   [6]:   当前音量/包络值
 *   [7]:   频率低字节 ($4002)
 *   [8]:   频率高字节 + 音长标志 ($4003)
 *   [9-15]: 更多状态
 * 
 * 音乐指针表: $E1A8 (每个曲目 2 字节指针)
 * 
 * 跳转表: $DC64 (操作码分发, 8 条目)
 */

import { ApuSimulator, APU_REG, ApuChannel } from './ApuSimulator';
import {
  FREQ_PERIOD_TABLE,
  NOTE_DURATION_TABLE,
} from './MusicData';

// 通道状态大小 (对应 ASM $0759-$0798)
const CHANNEL_STATE_SIZE = 16;
const NUM_CHANNELS = 4;

// 通道状态偏移量
const OFFSET = {
  DATA_PTR_L: 0,       // 音乐数据指针低字节
  DATA_PTR_H: 1,       // 音乐数据指针高字节
  LOOP_PTR_L: 2,       // 循环点低字节
  LOOP_PTR_H: 3,       // 循环点高字节
  LOOP_COUNT: 4,       // 循环计数器
  CHANNEL_FLAGS: 5,    // 通道属性 (bit4=静音, bit0-3=包络)
  VOLUME_ENV: 6,       // 音量/包络值
  FREQ_L: 7,           // 频率低字节
  FREQ_H_LEN: 8,       // 频率高字节 + 音长
  TEMPO: 9,            // 速度
  NOTE_DUR: 10,        // 音符剩余时间
  // 11-15: 额外状态
} as const;

// 通道标志位
const CH_FLAGS = {
  HALT: 0x10,  // bit4: 静音/暂停标志
};

// 全局音频状态 (对应 ASM $0738-$0740 区域)
interface AudioState {
  /** 通道活跃位掩码 ($0738) */
  channelMask: number;
  /** 各通道音长计数器 ($0739-$073C, 4字节) */
  noteCounters: Uint8Array;
  /** 各通道包络步进计数器 ($073D-$0740, 4字节) (推测) */
  envCounters: Uint8Array;
}

/** 音乐曲目定义 */
export interface MusicTrack {
  name: string;
  /** 指向音乐序列数据的 ROM 偏移 */
  dataOffset: number;
  /** 描述 (可选) */
  desc?: string;
}

/** 音乐序列数据 (结构化) */
export type MusicSequenceData = Uint8Array;

// 操作码定义 (对应 $DC64 跳转表)
export enum MusicOpcode {
  /** $00-$7F: 音符 (音高索引, 查 $DFC8 表得音长) */
  NOTE = 0,
  /** $80-$AF: 休止符 */
  REST = 1,
  /** $B0-$BF: 控制命令 */
  CONTROL = 2,
  /** $C0-$DF: 设置音量/包络 */
  SET_VOLUME = 3,
  /** $E0-$FF: 特殊命令 (循环/结束/跳转) */
  SPECIAL = 4,
}

/**
 * 音频引擎
 * 每帧由 GameLoop 的阶段1 (NMI) 调用 update()
 */
export class AudioEngine {
  private apu: ApuSimulator;
  private channelState: Uint8Array; // $0759-$0798 (64字节)
  private state: AudioState;
  
  /** 音乐曲目表 */
  private tracks: MusicTrack[] = [];
  /** 音乐序列数据 (按偏移索引) */
  private sequences: Map<number, MusicSequenceData> = new Map();
  
  /** 当前播放曲目索引 (-1 = 停止) */
  private currentTrack: number = -1;
  
  /** 是否启用 */
  private enabled: boolean = true;

  // 工作变量 (对应 ASM 零页 $F0-$FF)
  private zpF0: number = 0; // 数据指针低字节
  private zpF1: number = 0; // 数据指针高字节
  private zpF2: number = 0; // 当前通道索引 (0-3)
  private zpF3: number = 0; // 活跃通道计数

  // 速度控制
  private tempoCounter: number = 0;
  private tempoDivider: number = 1; // 每 N 帧处理一个音符

  /** 音长表 ($DFC8) — 从ROM提取 (64条, 值→帧数) */
  private static readonly NOTE_LENGTH_TABLE: number[] = NOTE_DURATION_TABLE;

  constructor(apu: ApuSimulator) {
    this.apu = apu;
    this.channelState = new Uint8Array(CHANNEL_STATE_SIZE * NUM_CHANNELS);
    this.state = {
      channelMask: 0xFF, // 所有通道启用
      noteCounters: new Uint8Array(4),
      envCounters: new Uint8Array(4),
    };

    // 初始化通道状态
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      const base = ch * CHANNEL_STATE_SIZE;
      this.channelState[base + OFFSET.CHANNEL_FLAGS] = 0;
      this.channelState[base + OFFSET.VOLUME_ENV] = 15; // 最大音量
      this.channelState[base + OFFSET.NOTE_DUR] = 0;
    }
  }

  /** 注册音乐曲目 */
  registerTrack(track: MusicTrack, data: MusicSequenceData): void {
    this.tracks.push(track);
    this.sequences.set(track.dataOffset, data);
  }

  /** 播放指定曲目 (按索引) */
  playTrack(index: number): void {
    if (index < 0 || index >= this.tracks.length) return;
    this.currentTrack = index;
    this.stopAllChannels();
    this.initMusic(this.tracks[index].dataOffset);
  }

  /** 停止播放 */
  stopMusic(): void {
    this.currentTrack = -1;
    this.stopAllChannels();
    this.apu.writeRegister(APU_REG.APU_STATUS, 0x00);
  }

  /** 播放音效 (非阻塞, 叠加在当前音乐上) */
  playSfx(sfxIndex: number): void {
    // 音效系统暂用简化实现:
    // 查找空闲通道或最低优先级通道播放音效
    this.triggerSfx(sfxIndex);
  }

  // ========== 帧更新 (对应 $9B00 SoundFrameUpdate) ==========

  /**
   * 每帧更新 — 在 GameLoop 阶段1 (NMI) 中调用
   * 对应 ASM $9B00:
   *   LDX #$05
   *   loop: LDY $07F9,X / BEQ skip / JSR $DCEC  (音效处理)
   *   DEX / BPL loop
   *   ... 通道循环处理 ...
   */
  update(): void {
    if (!this.enabled) return;

    // 1. 处理音效通道 (对应 $9B00-$9B0C, X=5→0)
    // 简化: 音效通道 (X=5,4) 暂不实现

    // 2. 更新 APU 包络和长度计数器
    this.apu.updateFrame();

    // 3. 通道循环处理 (对应 $9B0D-$9B52)
    // 速度控制
    this.tempoCounter++;
    if (this.tempoCounter < this.tempoDivider) return;
    this.tempoCounter = 0;

    // 遍历 4 个音乐通道
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      if (!(this.state.channelMask & (1 << ch))) continue;

      this.zpF2 = ch;
      this.processChannel(ch);
    }
  }

  // ========== 通道处理 (对应 $9B68 通道循环) ==========

  /**
   * 处理单个通道的音符更新
   * 对应 ASM $9B68-$9B8C:
   *   DEC $0739,X  (音符计数器--)
   *   BNE done
   *   JSR $DCCA    (读取下一个音符)
   *   JSR $DC20    (播放音符 → $4000-$4003)
   */
  private processChannel(ch: number): void {
    const base = ch * CHANNEL_STATE_SIZE;

    // 检查通道是否活跃 (有音乐数据指针)
    const dataPtrL = this.channelState[base + OFFSET.DATA_PTR_L];
    const dataPtrH = this.channelState[base + OFFSET.DATA_PTR_H];
    if (dataPtrL === 0 && dataPtrH === 0) return;

    // 检查静音标志
    if (this.channelState[base + OFFSET.CHANNEL_FLAGS] & CH_FLAGS.HALT) {
      // 静音通道, 只更新包络
      this.updateChannelEnvelope(ch);
      return;
    }

    // 递减音符计数器
    let noteCounter = this.state.noteCounters[ch];
    if (noteCounter > 0) {
      noteCounter--;
      this.state.noteCounters[ch] = noteCounter;
      if (noteCounter > 0) return;
    }

    // 读取并播放下一个音符
    this.readNextNote(ch);
  }

  // ========== 读取音符 (对应 $DCCA) ==========

  /**
   * 从音乐数据中读取下一个字节并处理
   * 对应 ASM $DCCA-$DCEB:
   *   读取 (zpF0),Y → 根据值范围分发
   *   $00-$7F: 音符 (查 $DFC8 得音长)
   *   $80-$AF: 休止符
   *   $B0-$DF: 控制命令
   *   $E0-$FF: 特殊命令
   * 
   * 注意: 这是简化实现。完整实现需要分析 Bank 1 $DCCA-$DCEB 的全部逻辑。
   */
  private readNextNote(ch: number): void {
    const base = ch * CHANNEL_STATE_SIZE;
    const dataPtr = (this.channelState[base + OFFSET.DATA_PTR_H] << 8) |
                     this.channelState[base + OFFSET.DATA_PTR_L];

    // 查找当前曲目的序列数据
    const track = this.tracks[this.currentTrack];
    if (!track) return;

    const seq = this.sequences.get(track.dataOffset);
    if (!seq) return;

    // 计算当前读取偏移
    const readOffset = dataPtr - track.dataOffset;
    if (readOffset >= seq.length) {
      // 到达数据末尾, 尝试循环
      this.tryLoop(ch);
      return;
    }

    const byte = seq[readOffset];

    // 更新读取指针
    const newPtr = dataPtr + 1;
    this.channelState[base + OFFSET.DATA_PTR_L] = newPtr & 0xFF;
    this.channelState[base + OFFSET.DATA_PTR_H] = (newPtr >> 8) & 0xFF;

    // 根据字节值分发处理
    if (byte < 0x80) {
      // 音符 ($00-$7F): 查音长表
      const lengthIndex = byte & 0x3F;
      const noteLen = AudioEngine.NOTE_LENGTH_TABLE[lengthIndex] || 1;
      this.state.noteCounters[ch] = noteLen;

      // 播放音符 (写入 APU 寄存器)
      this.playNote(ch, byte);
    } else if (byte < 0xB0) {
      // 休止符 ($80-$AF): 静音
      this.restChannel(ch, byte & 0x0F);
    } else if (byte < 0xE0) {
      // 控制命令 ($B0-$DF)
      this.handleControl(ch, byte);
    } else {
      // 特殊命令 ($E0-$FF): 循环/结束
      this.handleSpecial(ch, byte);
    }
  }

  // ========== 音符播放 (对应 $9BAF/$DC20) ==========

  /**
   * 播放音符 — 写入 APU 寄存器
   *
   * 对应 ASM $9BAF-$9C1F + $9DC1-$9DFF:
   *
   * 音符格式 (单字节):
   *   byte: oooo pppp
   *         ^^^^ ^^^^
   *         |||| ++++-- pitch (0-11): FREQ_PERIOD_TABLE 索引
   *         ++++------- octave (0-15): period 右移位数
   *
   * 处理流程 (ASM $9DC1-$9DFF):
   *   1. TAX           ; X = noteByte
   *   2. AND #$0F      ; pitch = noteByte & 0x0F
   *   3. CMP #$0C      ; if pitch >= 12: special handling
   *   4. ASL / TAY     ; Y = pitch * 2
   *   5. LDA $DFB0,Y   ; period_lo
   *   6. STA $F4
   *   7. LDA $DFB1,Y   ; period_hi
   *   8. STA $F5
   *   9. TXA / AND #$F0 / LSR*4 ; octave shift
   *   10. LSR $F5 / ROR $F4
   *   11. STA $4002,X / STA $4003,X  ; 写入 APU
   */
  private playNote(ch: number, noteByte: number): void {
    const base = ch * CHANNEL_STATE_SIZE;

    // 解码音符: byte = oooo pppp
    const pitch = noteByte & 0x0F;

    // pitch >= 12 不是有效音符
    if (pitch >= 12) return;

    // 查频率表获取 NES period
    const octave = (noteByte & 0xF0) >> 4;
    let period = FREQ_PERIOD_TABLE[pitch];
    if (octave > 0) {
      period = period >> octave;
      if (period <= 0) period = 1;
    }

    const freqLow = period & 0xFF;
    const freqHigh = ((period >> 8) & 0x07) | 0x18; // 高3位 + length=8

    // 写入 APU 寄存器
    switch (ch) {
      case ApuChannel.PULSE1:
        this.apu.writeRegister(APU_REG.PULSE1_TIMER, freqLow);
        this.apu.writeRegister(APU_REG.PULSE1_LENGTH, freqHigh);
        this.apu.writeRegister(APU_REG.PULSE1_DUTY, 0x9F); // duty 50%, 音量 15
        break;
      case ApuChannel.PULSE2:
        this.apu.writeRegister(APU_REG.PULSE2_TIMER, freqLow);
        this.apu.writeRegister(APU_REG.PULSE2_LENGTH, freqHigh);
        this.apu.writeRegister(APU_REG.PULSE2_DUTY, 0x9F);
        break;
      case ApuChannel.TRIANGLE:
        this.apu.writeRegister(APU_REG.TRI_TIMER, freqLow);
        this.apu.writeRegister(APU_REG.TRI_LENGTH, freqHigh | 0x08); // Triangle linear counter
        break;
      case ApuChannel.NOISE:
        // Noise channel: period 低4位
        this.apu.writeRegister(APU_REG.NOISE_PERIOD, freqLow & 0x0F);
        this.apu.writeRegister(APU_REG.NOISE_LENGTH, 0x08);
        this.apu.writeRegister(APU_REG.NOISE_VOL, 0x0F);
        break;
    }

    // 保存通道状态
    this.channelState[base + OFFSET.FREQ_L] = freqLow;
    this.channelState[base + OFFSET.FREQ_H_LEN] = freqHigh;
  }

  // ========== 休止符 ==========

  /** 通道休息 (静音但保持活跃) */
  private restChannel(ch: number, duration: number): void {
    this.state.noteCounters[ch] = Math.max(duration, 1);
    // 不写入新的频率, 让当前音符自然衰减
  }

  // ========== 控制命令 ==========

  /**
   * 处理控制命令 ($B0-$DF)
   * 包括: 音量变化、包络设置、速度变化等
   */
  private handleControl(ch: number, byte: number): void {
    const cmd = (byte >> 4) & 0x03; // bit4-5
    const val = byte & 0x0F;        // bit0-3

    switch (cmd) {
      case 0: // $Bx: 设置音量
        this.setChannelVolume(ch, val);
        break;
      case 1: // $Cx: 设置包络
        this.setChannelEnvelope(ch, val);
        break;
      case 2: // $Dx: 设置速度
        this.setTempo(val);
        break;
      default:
        break;
    }
  }

  // ========== 特殊命令 ==========

  /**
   * 处理特殊命令 ($E0-$FF)
   * 包括: 循环、跳转、结束
   */
  private handleSpecial(ch: number, byte: number): void {
    const base = ch * CHANNEL_STATE_SIZE;

    switch (byte) {
      case 0xE0: // 返回到循环点
        this.tryLoop(ch);
        break;
      case 0xFE: // 无限循环
        this.tryLoop(ch);
        break;
      case 0xFF: // 通道结束
        this.stopChannel(ch);
        break;
      case 0xFB: // 设置循环点
        {
          // 保存当前位置作为循环点
          const dataPtrL = this.channelState[base + OFFSET.DATA_PTR_L];
          const dataPtrH = this.channelState[base + OFFSET.DATA_PTR_H];
          this.channelState[base + OFFSET.LOOP_PTR_L] = dataPtrL;
          this.channelState[base + OFFSET.LOOP_PTR_H] = dataPtrH;
        }
        break;
      default:
        break;
    }
  }

  // ========== 辅助方法 ==========

  /** 尝试循环 */
  private tryLoop(ch: number): void {
    const base = ch * CHANNEL_STATE_SIZE;
    const loopCount = this.channelState[base + OFFSET.LOOP_COUNT];

    if (loopCount > 0) {
      // 有剩余循环次数
      this.channelState[base + OFFSET.LOOP_COUNT] = loopCount - 1;
      // 跳转到循环点
      this.channelState[base + OFFSET.DATA_PTR_L] = this.channelState[base + OFFSET.LOOP_PTR_L];
      this.channelState[base + OFFSET.DATA_PTR_H] = this.channelState[base + OFFSET.LOOP_PTR_H];
    } else if (loopCount === 0) {
      // 无限循环 (0 = 不减少)
      this.channelState[base + OFFSET.DATA_PTR_L] = this.channelState[base + OFFSET.LOOP_PTR_L];
      this.channelState[base + OFFSET.DATA_PTR_H] = this.channelState[base + OFFSET.LOOP_PTR_H];
    } else {
      // 无循环设置, 停止通道
      this.stopChannel(ch);
    }
  }

  /** 设置通道音量 */
  private setChannelVolume(ch: number, volume: number): void {
    const base = ch * CHANNEL_STATE_SIZE;
    this.channelState[base + OFFSET.VOLUME_ENV] = volume;

    // 写入对应的 APU 寄存器
    const dutyByte = 0x80 | (this.channelState[base + OFFSET.CHANNEL_FLAGS] & 0x30) | volume;
    switch (ch) {
      case ApuChannel.PULSE1:
        this.apu.writeRegister(APU_REG.PULSE1_DUTY, dutyByte);
        break;
      case ApuChannel.PULSE2:
        this.apu.writeRegister(APU_REG.PULSE2_DUTY, dutyByte);
        break;
      case ApuChannel.NOISE:
        this.apu.writeRegister(APU_REG.NOISE_VOL, 0x10 | volume);
        break;
    }
  }

  /** 设置通道包络 */
  private setChannelEnvelope(_ch: number, _value: number): void {
    // 包络设置 - 简化实现
  }

  /** 设置速度 */
  private setTempo(val: number): void {
    this.tempoDivider = Math.max(1, (val & 0x0F) + 1);
  }

  /** 更新通道包络 (每帧步进) */
  private updateChannelEnvelope(_ch: number): void {
    // 包络更新 - 由 ApuSimulator.updateFrame() 处理
  }

  /** 停止单个通道 */
  private stopChannel(ch: number): void {
    const base = ch * CHANNEL_STATE_SIZE;
    this.channelState[base + OFFSET.DATA_PTR_L] = 0;
    this.channelState[base + OFFSET.DATA_PTR_H] = 0;

    // 停止对应的 APU 通道
    const statusMask = {
      [ApuChannel.PULSE1]: 0x01,
      [ApuChannel.PULSE2]: 0x02,
      [ApuChannel.TRIANGLE]: 0x04,
      [ApuChannel.NOISE]: 0x08,
    };

    // 关闭此通道
    const currentStatus = this.apu.readRegister(APU_REG.APU_STATUS);
    const newStatus = currentStatus & ~(statusMask[ch as ApuChannel] || 0);
    this.apu.writeRegister(APU_REG.APU_STATUS, newStatus);
  }

  /** 停止所有通道 */
  private stopAllChannels(): void {
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      this.stopChannel(ch);
    }
  }

  /** 初始化音乐播放 (对应 $9CEC SoundInit) */
  private initMusic(dataOffset: number): void {
    const seq = this.sequences.get(dataOffset);
    if (!seq) return;

    // 简化: 将序列数据指针分配给通道
    // 实际实现需要解析音乐序列头部来初始化各通道
    // 对应 ASM $9CEC-$9D5B:
    //   查 $E1A8 表获取音乐数据指针
    //   遍历各通道初始化 $0759-$0798 区域

    // 简化: 假设序列的前 N 字节是各通道初始化数据
    let offset = 0;
    for (let ch = 0; ch < NUM_CHANNELS; ch++) {
      const base = ch * CHANNEL_STATE_SIZE;
      // 设置数据指针 = dataOffset + 偏移
      const ptr = dataOffset + offset;
      this.channelState[base + OFFSET.DATA_PTR_L] = ptr & 0xFF;
      this.channelState[base + OFFSET.DATA_PTR_H] = (ptr >> 8) & 0xFF;
      this.channelState[base + OFFSET.VOLUME_ENV] = 15;
      this.channelState[base + OFFSET.NOTE_DUR] = 1;

      // 跳过通道头部 (简化: 每通道 4 字节头部)
      offset += 4;
    }

    // 启用所有 4 个 APU 通道
    this.apu.writeRegister(APU_REG.APU_STATUS, 0x0F);
  }

  /** 触发音效 */
  private triggerSfx(_sfxIndex: number): void {
    // 音效系统 - 待完整实现
    // 对应 ASM $DCEC SoundInit
  }

  // ========== 公共 API ==========

  /** 启用/禁用音频引擎 */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAllChannels();
      this.apu.writeRegister(APU_REG.APU_STATUS, 0x00);
    }
  }

  /** 获取当前曲目名称 */
  getCurrentTrackName(): string {
    if (this.currentTrack < 0 || this.currentTrack >= this.tracks.length) {
      return 'None';
    }
    return this.tracks[this.currentTrack].name;
  }

  /** 获取曲目列表 */
  getTrackList(): MusicTrack[] {
    return [...this.tracks];
  }
}
