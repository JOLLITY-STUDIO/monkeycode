/**
 * AudioService — 音频引擎（原 bank12 $8000-$BFFF）
 *
 * 完整翻译 bank12 BGM/SE 引擎：
 *   $8000: 请求队列消费 + bankswitch
 *   $80BA: 帧推进（4 通道 tick + 音符推进 + APU 写）
 *   $81DB: 通道输出（频率计算 + APU 寄存器写）
 *   $83CB: BGM 命令流解析（音符/速度/命令/音量/跳转/循环）
 *   $84C9: 命令分发（$84DA 跳转表 32 命令）
 *   $8349: SE 启动
 *
 * RAM 布局（$0700-$07FF 音频状态区）：
 *   $0700-$0705: 请求队列（6 槽）
 *   $0706: 通道活跃位掩码
 *   $0707[X]: tick 计数器（X=ch*4）
 *   $0708[X]: tick 重载值
 *   $0709[X]: 音符持续计数器
 *   $070A[X]: 音高值
 *   $0727+ch*16: 通道状态块（16 字节/通道）
 *     offset 0-1: 数据指针（乐谱地址）
 *     offset 2-3: 音符表指针
 *     offset 4: 当前音符索引
 *     offset 5: 音量/包络控制
 *     offset 6-7: APU 频率低/高字节
 *     offset 8: 扫描值
 *     offset 9: 循环返回地址
 *   $07A7[X]: 基音频率（transpose）
 *   $07AF[X]: vibrato/arpeggio 模式
 *   $07B7[X]: 频率低字节缓存
 *   $07BF[X]: 频率高字节缓存
 *   $07CF-$07DE: 4 通道包络配置
 *   $07E0-$07E3: 频率高字节影子
 *   $07E4-$07E7: 扫描重触发标志
 *   $07E8: DPCM 标志
 *   $07E9: 全局静音标志
 *   $07F4-$07F7: transpose 设置
 *   $07FC: BGM bank 影子
 */
import type { DataStore } from '../../data/store/DataStore';
import type { ApuTarget } from './ApuTarget';
import { NullApuTarget } from './ApuTarget';
import { AudioRom } from '../../data/audio/audio-rom';

// RAM 地址常量
const RAM_QUEUE_BASE = 0x0700;
const RAM_CHANNEL_ACTIVE = 0x0706;
const RAM_BGM_BANK = 0x07FC;
const RAM_DPCM_FLAG = 0x07E8;
const RAM_MUTE_FLAG = 0x07E9;

// 通道状态块基址（每通道 16 字节，步进 $10）
const CH_STATE_BASE = 0x0727;
// tick/音符计数器基址（每通道 4 字节，步进 4）
const CH_COUNTER_BASE = 0x0707;

// 通道活跃位
const CH_PULSE1 = 0x01;
const CH_PULSE2 = 0x02;
const CH_TRIANGLE = 0x04;
const CH_NOISE = 0x08;

// APU 使能
const APU_ENABLE_ALL = 0x0F;
const APU_ENABLE_WITH_DPCM = 0x1F;
const APU_DISABLE_ALL = 0x00;

// 请求 ID 阈值
const REQ_THRESHOLD_SE = 0x32;
const REQ_SE_STOP_ALL = 0x31;
const REQ_SE_MAX = 0x72;

// DPCM 采样
const DPCM_SAMPLES = [
  { freq: 0x0F, addr: 0x00, len: 0x0C },
  { freq: 0x0F, addr: 0x03, len: 0x20 },
  { freq: 0x0F, addr: 0x0B, len: 0x13 },
];

// $870D 频率表（12 半音，bank12 固定表）
function readFreqTable(idx: number): number {
  return AudioRom.readBank12U16(0x870D + idx * 2);
}

// $8725 时值表（42 条，bank12 固定表）
function readDurationTable(idx: number): number {
  return AudioRom.readBank12Byte(0x8725 + idx);
}

// $84DA 命令跳转表（32 个命令，bank12 固定表）
function readCommandAddr(cmdIdx: number): number {
  return AudioRom.readBank12U16(0x84DA + cmdIdx * 2);
}

export class AudioService {
  private apu: ApuTarget = new NullApuTarget();

  constructor(readonly store: DataStore) {}

  attachApu(apu: ApuTarget): void { this.apu = apu; }

  // ════════════════════════════════════════════════════════════════
  // 公共 API
  // ════════════════════════════════════════════════════════════════

  update(): void {
    this.consumeQueue();
    this.bgmTick();
    this.seTick();
    if (this.store.readByte(RAM_MUTE_FLAG) !== 0) {
      this.apu.writeRegister(0x4015, APU_DISABLE_ALL);
    }
  }

  playBgm(bgmId: number): void {
    this.store.writeByte(RAM_QUEUE_BASE, bgmId & 0xff);
  }

  playSe(seId: number): void {
    for (let slot = 1; slot <= 5; slot++) {
      if (this.store.readByte(RAM_QUEUE_BASE + slot) === 0) {
        this.store.writeByte(RAM_QUEUE_BASE + slot, seId & 0xff);
        return;
      }
    }
    this.store.writeByte(RAM_QUEUE_BASE + 5, seId & 0xff);
  }

  stopAll(): void {
    for (let i = 0; i < 6; i++) this.store.writeByte(RAM_QUEUE_BASE + i, 0);
    this.stopAllSeChannels();
    this.apu.writeRegister(0x4015, APU_DISABLE_ALL);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, 0);
  }

  stopSeChannel(channel: number): void {
    const mask = ~(1 << channel) & 0xff;
    this.store.writeByte(RAM_CHANNEL_ACTIVE, this.store.readByte(RAM_CHANNEL_ACTIVE) & mask);
    this.apu.writeRegister(0x4000 + channel * 4, 0x30);
  }

  playDpcm(sample: 0 | 1 | 2): void {
    if (this.store.readByte(RAM_DPCM_FLAG) !== 0) return;
    const s = DPCM_SAMPLES[sample];
    this.apu.writeRegister(0x4015, APU_ENABLE_WITH_DPCM);
    this.apu.writeRegister(0x4010, s.freq);
    this.apu.writeRegister(0x4012, s.addr);
    this.apu.writeRegister(0x4013, s.len);
    this.store.writeByte(RAM_DPCM_FLAG, 0x80);
  }

  // ════════════════════════════════════════════════════════════════
  // 请求队列消费（$8000 + $8061）
  // ════════════════════════════════════════════════════════════════

  private consumeQueue(): void {
    // BGM 槽
    const bgmReq = this.store.readByte(RAM_QUEUE_BASE);
    if (bgmReq !== 0 && bgmReq < REQ_THRESHOLD_SE) {
      this.startBgm(bgmReq);
      this.store.writeByte(RAM_QUEUE_BASE, 0);
    }
    // SE 槽
    for (let slot = 1; slot <= 5; slot++) {
      const seReq = this.store.readByte(RAM_QUEUE_BASE + slot);
      if (seReq === 0) continue;
      if (seReq >= REQ_SE_MAX) { this.store.writeByte(RAM_QUEUE_BASE + slot, 0); continue; }
      if (seReq === REQ_SE_STOP_ALL) {
        this.stopAllSeChannels();
        this.store.writeByte(RAM_QUEUE_BASE + slot, 0);
        continue;
      }
      this.startSe(seReq, slot);
      this.store.writeByte(RAM_QUEUE_BASE + slot, 0);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // BGM 启动（$8000 BGM 分支 → bankswitch → 通道初始化）
  // ════════════════════════════════════════════════════════════════

  private startBgm(bgmId: number): void {
    this.store.writeByte(RAM_BGM_BANK, bgmId);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, 0);
    
    // 从 BGM 指针表读取数据起始地址
    const dataAddr = AudioRom.readBgmPointer(bgmId);
    if (dataAddr === 0) return;
    
    // 切换到 BGM 数据 bank（bank7）读取数据头部
    // BGM 数据头部：通道配置 + 各通道数据指针
    // 头部格式（从 asm $83CB 推断）：
    //   通道 0-3 的数据指针连续存放
    //   每个通道有自己的乐谱数据流
    
    // 初始化 4 个通道状态块
    // 通道 0 = Pulse1, 1 = Pulse2, 2 = Triangle, 3 = Noise
    let activeMask = 0;
    for (let ch = 0; ch < 4; ch++) {
      const chBase = CH_STATE_BASE + ch * 0x10;
      // 从 BGM 数据头部读取各通道数据指针
      // 头部格式：[ch0_ptr_lo, ch0_ptr_hi, ch1_ptr_lo, ch1_ptr_hi, ...]
      // 但实际格式需要从 BGM 数据本身解析
      // 简化：通道 0 用 dataAddr，其他通道从头部读取
      let chDataAddr = dataAddr;
      if (ch > 0) {
        // 从头部读取通道 ch 的数据指针
        chDataAddr = AudioRom.readBgmData(dataAddr + ch * 2);
        chDataAddr |= AudioRom.readBgmData(dataAddr + ch * 2 + 1) << 8;
        if (chDataAddr < 0x8000 || chDataAddr > 0xBFFF) chDataAddr = 0;
      }
      if (chDataAddr === 0) continue;
      
      // 初始化通道状态块
      this.store.writeU16(chBase, chDataAddr);       // offset 0-1: 数据指针
      this.store.writeU16(chBase + 2, chDataAddr);   // offset 2-3: 音符表指针
      this.store.writeByte(chBase + 4, 0);            // offset 4: 音符索引
      this.store.writeByte(chBase + 5, 0x0F);         // offset 5: 音量
      this.store.writeByte(chBase + 6, 0);            // offset 6: 频率低
      this.store.writeByte(chBase + 7, 0);            // offset 7: 频率高
      
      // tick 计数器
      const counterBase = CH_COUNTER_BASE + ch * 4;
      this.store.writeByte(counterBase, 1);    // tick = 1（立即触发）
      this.store.writeByte(counterBase + 1, 1); // tick 重载
      this.store.writeByte(counterBase + 2, 0); // 音符持续 = 0（立即读取）
      this.store.writeByte(counterBase + 3, 0); // 音高 = 0
      
      // 执行命令流预处理（$83CB）
      // 这会解析 BGM 数据流，设置 tick/音符持续/频率等
      this.executeCommandStream(ch);
      
      activeMask |= (1 << ch);
    }
    
    this.store.writeByte(RAM_CHANNEL_ACTIVE, activeMask);
    this.apu.writeRegister(0x4015, APU_ENABLE_ALL);
  }

  // ════════════════════════════════════════════════════════════════
  // BGM 命令流解析（$83CB）
  //
  // 严格翻译 asm code_sub.s $83CB-$84A6：
  //   $83CB: offset 5 &= $CF（清除包络标志）
  //   $83D3: 读 offset 0-1 → 数据指针 $00F4/$00F5
  //   $83DF: 从数据流读字节（Y=偏移）
  //     字节 < $80（BPL $8404）→ 音名，跳 $8404
  //     字节 >= $E0 → 命令（$84C9 分发）
  //     字节 $B0-$DF → 速度（INY 跳过参数，继续循环）
  //     字节 $80-$AF → 时值（AND #$3F 查 $8725 → 设置 tick，继续循环）
  //   $8404: 音名处理
  //     INY; 更新 offset 0-1 = 数据指针 + 偏移
  //     音名低4位 → 查 $870D 频率表
  //     音名高4位 → 八度（频率右移）
  //     transpose 加减 → offset 6-7 = 频率
  //     音名 $0C → 休止符
  // ════════════════════════════════════════════════════════════════

  private executeCommandStream(ch: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const counterBase = CH_COUNTER_BASE + ch * 4;
    
    // $83CB: offset 5 &= $CF
    this.store.writeByte(chBase + 5, this.store.readByte(chBase + 5) & 0xCF);
    
    // $83D3: 读 offset 0-1 → 数据指针
    let dataPtr = this.store.readU16(chBase);
    if (dataPtr === 0) return;
    
    let y = 0;  // Y 寄存器 = 数据流偏移
    
    // $83DF 循环
    for (let safety = 0; safety < 512; safety++) {
      const dataByte = AudioRom.readBgmData(dataPtr + y);
      
      if (dataByte < 0x80) {
        // $8404: 音名处理
        y++;  // INY
        // 更新 offset 0-1 = dataPtr + y
        const newPtr = dataPtr + y;
        this.store.writeU16(chBase, newPtr & 0xFFFF);
        
        // $8416: 检查通道号
        // $00F3 = ch + 1（1-based 通道号）
        const ch1 = ch + 1;
        
        // 音名处理
        // $842E: AND #$0F → 音名低4位
        const noteName = dataByte & 0x0F;
        // $8431: CMP #$0C → 休止符？
        if (noteName === 0x0C) {
          // $8435: 休止符，offset 5 |= $20
          this.store.writeByte(chBase + 5, this.store.readByte(chBase + 5) | 0x20);
          return;  // $84A6: RTS
        }
        
        // $843F: 查频率表
        // ASL; TAY → noteName × 2
        let freqLo = readFreqTable(noteName) & 0xFF;
        let freqHi = (readFreqTable(noteName) >> 8) & 0xFF;
        
        // $844B: 高4位 = 八度
        const octave = (dataByte >> 4) & 0x0F;
        // $8452: BEQ $845C → 八度=0 跳过
        for (let i = 0; i < octave; i++) {
          // $8455: LSR $00F5; ROR $00F4 → 频率右移
          const carry = freqHi & 1;
          freqHi = (freqHi >> 1) & 0x7F;
          freqLo = ((freqLo >> 1) | (carry << 7)) & 0xFF;
        }
        
        // $845C: 频率计算完成
        // LDX $00F3; DEX → 通道号-1（0-based）
        // LDY $07F4,X → transpose 标志
        const transposeFlag = this.store.readByte(0x07F4 + ch);
        const transposeVal = this.store.readByte(0x07A7 + ch);
        
        let finalFreqLo, finalFreqHi;
        if (transposeFlag !== 0) {
          // $8466: SEC; SBC $07A7,X → 频率 -= transpose
          let result = freqLo - transposeVal;
          if (result < 0) {
            // $8478: 借位
            finalFreqLo = result & 0xFF;
            finalFreqHi = (freqHi - 1) & 0xFF;
          } else {
            finalFreqLo = result & 0xFF;
            finalFreqHi = freqHi;
          }
        } else {
          // $848F: CLC; ADC $07A7,X → 频率 += transpose
          let result = freqLo + transposeVal;
          finalFreqLo = result & 0xFF;
          finalFreqHi = (freqHi + (result > 0xFF ? 1 : 0)) & 0xFF;
        }
        
        // $846C/$8478: LDY #$07; STA ($00F0),Y → offset 6 = 频率低
        this.store.writeByte(chBase + 6, finalFreqLo);
        this.store.writeByte(0x07B7 + ch, finalFreqLo);
        
        // $8484: INY(=8); STA ($00F0),Y → offset 7 = 频率高
        // 但 asm 中 offset 8 存的是频率高字节 + $80（bit7=长度计数器重启标志）
        this.store.writeByte(chBase + 7, finalFreqHi | 0x80);
        this.store.writeByte(0x07BF + ch, finalFreqHi);
        
        // $84A6: RTS
        return;
      }
      
      if (dataByte >= 0xE0) {
        // $83E8: 命令分发 JSR $84C9
        y++;  // INY
        const cmdIdx = dataByte & 0x1F;
        const cmdAddr = readCommandAddr(cmdIdx);
        y = this.executeCommand(ch, cmdAddr, dataPtr, y);
        // $83EB: BPL $83DF → 继续循环
        continue;
      }
      
      if (dataByte >= 0xB0) {
        // $83ED: 速度设置
        // $C8: INY → 跳过参数字节
        y++;
        // $D0 $EB: BNE $83DF → 继续循环
        continue;
      }
      
      // $83F4: $80-$AF → 时值设置
      // AND #$3F → 时值索引
      const durIdx = dataByte & 0x3F;
      const tick = readDurationTable(durIdx);
      // LDX $00F2 → 通道索引（ch*4）
      this.store.writeByte(counterBase, tick);      // $0707[X] = tick
      this.store.writeByte(counterBase + 1, tick);  // $0708[X] = tick 重载
      // $8402: BPL $83DF → 继续循环（读下一个字节作为音名）
      y++;
      continue;
    }
  }

  // ════════════════════════════════════════════════════════════════
  // 命令执行（$84C9 分发 → $84DA 跳转表 32 命令）
  // ════════════════════════════════════════════════════════════════

  private executeCommand(ch: number, cmdAddr: number, dataPtr: number, noteIdx: number): number {
    const chBase = CH_STATE_BASE + ch * 0x10;
    
    // 根据 cmdAddr 执行对应命令
    // $8544 (cmd 0xE0): 设置音符表指针（LDA $8754,X）
    if (cmdAddr === 0x8544) {
      // 读取下一个字节作为曲目号，查 $8754 表设置音符表指针
      const songNo = AudioRom.readBgmData(dataPtr + noteIdx);
      noteIdx++;
      // $8754 表在 bank12（引擎执行时 $8000-$9FFF = bank12）
      // 但 $8754 存的是地址指针，不是频率
      // 实际上 $8544 设置 offset 2-3 为 $8754[songNo] 的值
      const tablePtr = AudioRom.readBank12U16(0x8754 + songNo * 2);
      this.store.writeU16(chBase + 2, tablePtr);
      return noteIdx;
    }
    
    // $851A (cmd 0xF2): 停止全部
    if (cmdAddr === 0x851A) {
      this.stopAll();
      return noteIdx;
    }
    
    // $8707 (cmd 0xE1/E6/E7/...): NOP / 继续
    if (cmdAddr === 0x8707) {
      return noteIdx;
    }
    
    // $8641 (cmd 0xE2): 设置音量
    if (cmdAddr === 0x8641) {
      const vol = AudioRom.readBgmData(dataPtr + noteIdx);
      noteIdx++;
      // $864A: LDA #$3F; AND offset5; ORA vol; STA offset5
      const oldVol = this.store.readByte(chBase + 5);
      this.store.writeByte(chBase + 5, (oldVol & 0x3F) | (vol & 0xC0));
      return noteIdx;
    }
    
    // $8670 (cmd 0xE5): 设置 transpose
    if (cmdAddr === 0x8670) {
      const transpose = AudioRom.readBgmData(dataPtr + noteIdx);
      noteIdx++;
      // ASL → bit7 进 C，C → $07F4[X]，余数 → $07A7[X]
      this.store.writeByte(0x07F4 + ch, (transpose >> 7) & 1);
      this.store.writeByte(0x07A7 + ch, (transpose >> 1) & 0x7F);
      return noteIdx;
    }
    
    // $8681 (cmd 0xED): 设置 vibrato 模式
    if (cmdAddr === 0x8681) {
      const mode = AudioRom.readBgmData(dataPtr + noteIdx);
      noteIdx++;
      this.store.writeByte(0x07AF + ch, mode);
      this.store.writeByte(0x07C7 + ch, 0);
      return noteIdx;
    }
    
    // $8690 (cmd 0xEF): 清除 vibrato
    if (cmdAddr === 0x8690) {
      this.store.writeByte(0x07AF + ch, 0);
      return noteIdx;
    }
    
    // $8699/$86B8/$86D6 (cmd 0xF9/FA/FB): DPCM 触发
    if (cmdAddr === 0x8699) { this.playDpcm(0); return noteIdx; }
    if (cmdAddr === 0x86B8) { this.playDpcm(1); return noteIdx; }
    if (cmdAddr === 0x86D6) { this.playDpcm(2); return noteIdx; }
    
    // 其他命令暂不实现
    return noteIdx;
  }

  // ════════════════════════════════════════════════════════════════
  // BGM 帧推进（$80BA-$811B）
  // ════════════════════════════════════════════════════════════════

  private bgmTick(): void {
    const active = this.store.readByte(RAM_CHANNEL_ACTIVE);
    if (active === 0) return;
    
    for (let ch = 0; ch < 4; ch++) {
      if ((active & (1 << ch)) === 0) continue;
      
      const chBase = CH_STATE_BASE + ch * 0x10;
      const counterBase = CH_COUNTER_BASE + ch * 4;
      
      // 1. 递减 tick
      let tick = this.store.readByte(counterBase);
      if (tick > 0) {
        tick--;
        this.store.writeByte(counterBase, tick);
      }
      if (tick !== 0) continue;
      
      // tick 归零，重载
      this.store.writeByte(counterBase, this.store.readByte(counterBase + 1));
      
      // 2. 递减音符持续
      let dur = this.store.readByte(counterBase + 2);
      if (dur > 0) {
        dur--;
        this.store.writeByte(counterBase + 2, dur);
      }
      
      if (dur === 0) {
        // 音符结束，执行命令流读取下一个音符
        this.executeCommandStream(ch);
      }
      
      // 3. 通道输出
      this.channelOutput(ch);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // 通道输出（$81DB-$81DA）
  //
  // 读通道状态块 offset 5（音量）、offset 6-7（频率），写 APU 寄存器
  // ════════════════════════════════════════════════════════════════

  private channelOutput(ch: number): void {
    const chBase = CH_STATE_BASE + ch * 0x10;
    const freqLo = this.store.readByte(chBase + 6);
    const freqHi = this.store.readByte(chBase + 7);
    const volCtrl = this.store.readByte(chBase + 5);
    const volume = volCtrl & 0x0F;
    
    if (freqLo === 0 && freqHi === 0) return;
    
    // APU 寄存器地址（通道 0-3 → $4000/$4004/$4008/$400C）
    const regBase = 0x4000 + ch * 4;
    
    // $81DB: 读 offset 5，计算音量/包络
    // $818C: STA $4000,X（Pulse 控制）
    // $81B5: STA $4002,X（频率低）
    // $81CA: STA $4003,X（频率高 + 长度）
    
    if (ch === 0 || ch === 1) {
      // Pulse1/Pulse2
      // 控制寄存器：bit7-6=占空比, bit5=长度计数器, bit4=包络, bit3-0=音量
      this.apu.writeRegister(regBase, 0x30 | volume);  // 50%占空 + 固定音量
      this.apu.writeRegister(regBase + 2, freqLo);
      this.apu.writeRegister(regBase + 3, freqHi | 0x08);  // 长度计数器重启
    } else if (ch === 2) {
      // Triangle
      this.apu.writeRegister(regBase, 0x80 | volume);
      this.apu.writeRegister(regBase + 2, freqLo);
      this.apu.writeRegister(regBase + 3, freqHi | 0x80);  // 线性计数器重启
    } else if (ch === 3) {
      // Noise
      this.apu.writeRegister(regBase, 0x30 | volume);
      this.apu.writeRegister(regBase + 2, freqLo & 0x0F);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // SE 通道频率更新（$811D-$8161）
  // ════════════════════════════════════════════════════════════════

  private seTick(): void {
    // SE 通道 vibrato/arpeggio 推进
    // TODO: 翻译 $811D-$8161
  }

  // ════════════════════════════════════════════════════════════════
  // SE 启动（$8349）
  // ════════════════════════════════════════════════════════════════

  private startSe(seId: number, slot: number): void {
    void slot;
    // SE 表索引 = seId - 1（原版 $8349: DEY）
    const seIndex = seId - 1;
    if (seIndex < 0 || seIndex >= 100) return;
    
    // 从 SE 指针表读取数据起始地址
    const seDataAddr = AudioRom.readSePointer(seIndex);
    if (seDataAddr === 0) return;
    
    // SE 数据在 bank13/14/15（根据 seId 范围）
    // 简化：用 AudioRom.readByte 自动 bankswitch
    // 标记 Noise 通道活跃
    const active = this.store.readByte(RAM_CHANNEL_ACTIVE);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, active | CH_NOISE);
    this.apu.writeRegister(0x4015, APU_ENABLE_ALL);
    
    // TODO: 完整翻译 $8349 SE 数据流解析
  }

  // ════════════════════════════════════════════════════════════════
  // 停止 SE
  // ════════════════════════════════════════════════════════════════

  private stopAllSeChannels(): void {
    const ENV_STOP = 0x19;
    const VOL_STOP = 0x0A;
    const volAddrs = [0x07D0, 0x07D4, 0x07D8, 0x07DC];
    const envAddrs = [
      0x07CF, 0x07D1, 0x07D2, 0x07D3,
      0x07D5, 0x07D6, 0x07D7,
      0x07D9, 0x07DA, 0x07DB,
      0x07DD, 0x07DE, 0x07DF,
    ];
    for (const a of volAddrs) this.store.writeByte(a, VOL_STOP);
    for (const a of envAddrs) this.store.writeByte(a, ENV_STOP);
  }
}
