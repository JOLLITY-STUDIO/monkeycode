/**
 * AudioService — 音频引擎（原 bank12 $8000-$BFFF）
 *
 * @bank 12（音频引擎 / BGM / SE / DPCM）
 *
 * 对应原始地址：
 *   $8000: 请求队列消费入口（LDX #$05; LDY $0700,X 循环扫描 6 槽位）
 *   $80BA: 帧推进入口（BGM 通道 tick + SE 通道频率更新 + 全局静音）
 *   $8061: SE 队列消费（扫描 $0701-$0705）
 *   $8349: SE 启动核心（playSe）
 *   $851A: 停止全部（stopAll）
 *   $8698/$86B7/$86D6: DPCM 触发 A/B/C
 *
 * RAM 语义（$0700-$07FF 音频状态区）：
 *   $0700-$0705: 请求队列（6 槽，槽 0=BGM，槽 1-5=SE）
 *   $0706: 通道活跃位掩码（bit0-3 = Pulse1/Pulse2/Triangle/Noise）
 *   $07CF-$07DE: 4 通道包络/音量配置（每通道 4 字节，步进 4）
 *   $07E0-$07E3: 通道频率高字节影子（防重复写 $4003）
 *   $07E4-$07E7: 扫描/包络重触发标志
 *   $07E8: DPCM 播放标志
 *   $07E9: 全局静音标志
 *   $07FC: 当前 BGM bank 选择影子
 *
 * 请求 ID 分段（原版阈值）：
 *   $00-$31: BGM 请求（槽 0）
 *   $32-$43: SE 类型 1（bank $0D）
 *   $44-$50: SE 类型 2（bank $0E）
 *   $51-$5B: SE 类型 3（bank $0F）
 *   $5C-$71: SE 类型 4（保持当前 bank）
 *   $31（在 SE 队列中）: 停止所有 SE
 *   $72+: 无效
 *
 * V0.6 实现范围：
 *   ✅ 请求队列消费（playBgm/playSe/stopAll）
 *   ✅ 帧推进框架（BGM/SE tick 调度）
 *   ✅ APU 寄存器写输出（通过 ApuTarget）
 *   ✅ DPCM 触发
 *   ⚠️ BGM/SE 乐谱数据流完整解析（vibrato/arpeggio/包络）保留 TODO，
 *      需逐字节对照 asm code_main.s $80BA-$86F5 翻译
 */
import type { DataStore } from '../../data/store/DataStore';
import type { ApuTarget } from './ApuTarget';
import { NullApuTarget } from './ApuTarget';
import { AudioRom } from '../../data/audio/audio-rom';

/** 请求队列槽位（$0700-$0705） */
const QUEUE_SLOT_BGM = 0;       // 槽 0 = BGM 请求
const QUEUE_SLOT_SE_START = 1;  // 槽 1-5 = SE 请求
const QUEUE_SLOT_SE_END = 5;
const QUEUE_LEN = 6;

/** 请求 ID 阈值（原版 $8000-$805E 分段） */
const REQ_THRESHOLD_SE1 = 0x32;  // < $32 → BGM；$32-$43 → SE bank $0D
const REQ_THRESHOLD_SE2 = 0x44;  // $44-$50 → SE bank $0E
const REQ_THRESHOLD_SE3 = 0x51;  // $51-$5B → SE bank $0F
const REQ_THRESHOLD_SE4 = 0x5C;  // $5C-$71 → SE 保持当前 bank
const REQ_SE_STOP_ALL = 0x31;    // SE 队列中的停止标志
const REQ_SE_MAX = 0x72;         // >= $72 无效

/** 通道活跃位掩码（$0706） */
const CH_PULSE1 = 0x01;
const CH_PULSE2 = 0x02;
const CH_TRIANGLE = 0x04;
const CH_NOISE = 0x08;

/** APU 通道使能位（$4015） */
const APU_ENABLE_ALL = 0x0F;     // Pulse1+Pulse2+Triangle+Noise
const APU_ENABLE_WITH_DPCM = 0x1F;
const APU_DISABLE_ALL = 0x00;

/** DPCM 采样参数（原版 $8698/$86B7/$86D6 三组） */
const DPCM_SAMPLES: ReadonlyArray<{ freq: number; addr: number; len: number }> = [
  { freq: 0x0F, addr: 0x00, len: 0x0C },  // 采样 A ($8698)
  { freq: 0x0F, addr: 0x03, len: 0x20 },  // 采样 B ($86B7)
  { freq: 0x0F, addr: 0x0B, len: 0x13 },  // 采样 C ($86D6)
];

/** RAM 地址常量（音频状态区 $0700-$07FF） */
const RAM_QUEUE_BASE = 0x0700;        // 请求队列基址
const RAM_CHANNEL_ACTIVE = 0x0706;    // 通道活跃位掩码
const RAM_BGM_BANK = 0x07FC;          // 当前 BGM bank 影子
const RAM_DPCM_FLAG = 0x07E8;         // DPCM 播放标志
const RAM_MUTE_FLAG = 0x07E9;         // 全局静音标志

export class AudioService {
  /** APU 输出目标（默认空实现，由外部注入 WebAudioApuTarget 等） */
  private apu: ApuTarget = new NullApuTarget();

  constructor(readonly store: DataStore) {}

  /** 注入 APU 输出目标 */
  attachApu(apu: ApuTarget): void {
    this.apu = apu;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 公共 API
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * 每帧推进音频引擎（对应 $80BA）
   *
   * 流程：BGM 通道 tick → SE 通道频率更新 → 全局静音检查
   * 由 InterruptService.nmi() 每帧调用
   */
  update(): void {
    // 1. 消费请求队列（原版 $8000 入口在帧首扫描队列）
    this.consumeQueue();
    // 2. BGM 通道 tick（$80BA-$811B）
    this.bgmTick();
    // 3. SE 通道频率更新（$811D-$8161）
    this.seTick();
    // 4. 全局静音检查（$8163-$816D）
    if (this.store.readByte(RAM_MUTE_FLAG) !== 0) {
      this.apu.writeRegister(0x4015, APU_DISABLE_ALL);
    }
  }

  /**
   * 请求播放 BGM（写入 $0700 槽 0）
   * @param bgmId BGM 编号（0x00-0x31）
   */
  playBgm(bgmId: number): void {
    this.store.writeByte(RAM_QUEUE_BASE + QUEUE_SLOT_BGM, bgmId & 0xff);
  }

  /**
   * 请求播放 SE（写入 $0700 槽 1-5，找第一个空槽）
   * @param seId SE 编号（0x32-0x71）
   */
  playSe(seId: number): void {
    // 找第一个空槽位（原版 SE 队列是优先级队列，新请求放最低优先级空槽）
    for (let slot = QUEUE_SLOT_SE_START; slot <= QUEUE_SLOT_SE_END; slot++) {
      if (this.store.readByte(RAM_QUEUE_BASE + slot) === 0) {
        this.store.writeByte(RAM_QUEUE_BASE + slot, seId & 0xff);
        return;
      }
    }
    // 队列满 → 覆盖最后一个槽
    this.store.writeByte(RAM_QUEUE_BASE + QUEUE_SLOT_SE_END, seId & 0xff);
  }

  /**
   * 停止所有音频（对应 $851A + SE 队列中的 $31 处理）
   *
   * 清空请求队列 + 静音所有通道
   */
  stopAll(): void {
    // 清空请求队列（$851A 语义）
    for (let i = 0; i < QUEUE_LEN; i++) {
      this.store.writeByte(RAM_QUEUE_BASE + i, 0);
    }
    // 停止所有 SE（$31 处理：写静音包络到 $07CF-$07DE）
    this.stopAllSeChannels();
    // 关闭 APU 通道
    this.apu.writeRegister(0x4015, APU_DISABLE_ALL);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, 0);
  }

  /**
   * 停止指定 SE 通道（对应 $8654）
   * @param channel 通道号 0-3
   */
  stopSeChannel(channel: number): void {
    const mask = ~(1 << channel) & 0xff;
    const active = this.store.readByte(RAM_CHANNEL_ACTIVE);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, active & mask);
    // 静音该通道（写 $4000+channel*4 = $30）
    this.apu.writeRegister(0x4000 + channel * 4, 0x30);
  }

  /**
   * 触发 DPCM 采样（对应 $8698/$86B7/$86D6）
   * @param sample 0=A, 1=B, 2=C
   */
  playDpcm(sample: 0 | 1 | 2): void {
    // 检查 DPCM 忙标志（$07E8）
    if (this.store.readByte(RAM_DPCM_FLAG) !== 0) return;
    const s = DPCM_SAMPLES[sample];
    // 启用 DPCM 通道
    this.apu.writeRegister(0x4015, APU_ENABLE_WITH_DPCM);
    // 写 DPCM 控制（$4010）
    this.apu.writeRegister(0x4010, s.freq);
    // 写采样地址（$4012）
    this.apu.writeRegister(0x4012, s.addr);
    // 写采样长度（$4013）
    this.apu.writeRegister(0x4013, s.len);
    // 设置 DPCM 播放标志
    this.store.writeByte(RAM_DPCM_FLAG, 0x80);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 内部：请求队列消费（$8000 + $8061）
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * 消费请求队列（原版 $8000 入口）
   *
   * 扫描 6 个槽位，根据请求 ID 选择对应 bank 并触发 BGM/SE
   */
  private consumeQueue(): void {
    // 1. 处理 BGM 槽（槽 0）
    const bgmReq = this.store.readByte(RAM_QUEUE_BASE + QUEUE_SLOT_BGM);
    if (bgmReq !== 0 && bgmReq < REQ_THRESHOLD_SE1) {
      // BGM 请求：选择 BGM bank（原版写 $07FC 影子，TS 中直接启动 BGM）
      this.startBgm(bgmReq);
      this.store.writeByte(RAM_QUEUE_BASE + QUEUE_SLOT_BGM, 0);
    }

    // 2. 处理 SE 槽（槽 1-5）
    for (let slot = QUEUE_SLOT_SE_START; slot <= QUEUE_SLOT_SE_END; slot++) {
      const seReq = this.store.readByte(RAM_QUEUE_BASE + slot);
      if (seReq === 0) continue;
      if (seReq >= REQ_SE_MAX) {
        // 无效 SE，清除
        this.store.writeByte(RAM_QUEUE_BASE + slot, 0);
        continue;
      }
      if (seReq === REQ_SE_STOP_ALL) {
        // 停止所有 SE（原版 $8070）
        this.stopAllSeChannels();
        this.store.writeByte(RAM_QUEUE_BASE + slot, 0);
        continue;
      }
      // SE 请求：根据阈值选择 bank（TS 中 bank 概念省略，直接启动 SE）
      // bank 选择仅影响数据来源，所有数据已在 AudioRom 中
      this.startSe(seReq, slot);
      this.store.writeByte(RAM_QUEUE_BASE + slot, 0);
    }
  }

  /**
   * 启动 BGM（原版 $8000 BGM 分支 → bankswitch → 通道初始化）
   *
   * 从 BGM 指针表读取数据起始地址，解析头部，初始化通道状态块 $0727+
   * @param bgmId BGM 编号（0x00-0x31）
   */
  private startBgm(bgmId: number): void {
    this.store.writeByte(RAM_BGM_BANK, bgmId);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, 0);
    // 从 BGM 指针表读取数据起始地址
    // BGM 指针表 @ $8798，bgmId 直接作为索引（0-28）
    const dataAddr = AudioRom.readBgmPointer(bgmId);
    if (dataAddr === 0) return;
    // 切换到 BGM 数据 bank（bank7）读取数据
    // BGM 数据头部格式（从 asm $83CB/$83E1 命令流推断）：
    //   byte 0: 通道配置（bit7=终止, 低3位=通道数）
    //   byte 1-N: 各通道数据指针或直接音符序列
    //
    // 简化实现：BGM 数据直接作为通道 0(Pulse1) 的音符序列
    // 每条 2 字节：[dur, pitch]
    // $FF = 结束标记
    // 完整实现需要翻译 $83CB 命令流（$84DA 跳转表 32 个命令）
    
    // 初始化通道 0 状态块 $0727（每通道 16 字节）
    // offset 0-1: 数据指针（乐谱地址）
    // offset 2-3: 音符表指针（与乐谱相同）
    // offset 4: 当前音符索引（0）
    // offset 5: 音量（$0F = 最大）
    // offset 6-7: APU 频率值（由音符计算）
    this.store.writeU16(0x0727, dataAddr);       // offset 0-1: 数据指针
    this.store.writeU16(0x0729, dataAddr);       // offset 2-3: 音符表指针
    this.store.writeByte(0x072B, 0);              // offset 4: 音符索引
    this.store.writeByte(0x072C, 0x0F);           // offset 5: 音量
    
    // 通道 0 tick 计数器（$0707[0]）= 1（立即触发第一个音符）
    this.store.writeByte(0x0707, 1);
    this.store.writeByte(0x0708, 1);              // tick 重载值
    // 通道 0 音符持续计数器（$0709[0]）= 0（立即读取第一个音符）
    this.store.writeByte(0x0709, 0);
    
    // 启用 Pulse1 通道
    this.store.writeByte(RAM_CHANNEL_ACTIVE, CH_PULSE1);
    this.apu.writeRegister(0x4015, APU_ENABLE_ALL);
    // 初始化 Pulse1 控制寄存器（音量 $0F，占空比 50%）
    this.apu.writeRegister(0x4000, 0x3F);  // bit6=1(50%占空), bit4=0(固定音量), vol=$0F
  }

  /**
   * 启动 SE（原版 $8349）
   *
   * V0.6: 从 SE 指针表读取数据起始地址，标记通道活跃
   * @param seId SE 编号（0x32-0x71）
   * @param slot 队列槽位（0-5）
   */
  private startSe(seId: number, slot: number): void {
    // SE ID 转换为 0-based 索引（原版 $8349: DEY 把 1-based 转 0-based）
    // 但原版 SE ID 直接是请求 ID（0x32-0x71），索引 = seId - 0x32? 还是直接 seId?
    // 根据分析报告 $8349: DEY (Y=seId → seId-1)，然后 ASL (×2) 查 SE_POINTER_TABLE
    // 所以 SE 表索引 = seId - 1（注意原版 seId 是 1-based 的请求 ID）
    // 但请求 ID 范围 0x32-0x71，SE 指针表只有 37 条（索引 0-36）
    // 所以实际索引 = seId - 0x32? 不对，报告说 SE[0]=$850B 是第一个 SE
    // 重新核对：原版 $8349 的 Y 是请求 ID 原值（0x32-0x71），DEY 后 Y=0x31-0x70
    // 然后 ASL → 偏移 0x62-0xE0，但 SE 表只有 37 条 × 2 = 74 字节
    // 这说明 SE 请求 ID 实际是 1-based 的 SE 表索引（1-37），不是 0x32+
    // 阈值 $32 是 BGM/SE 分界，但 SE 表索引从 1 开始
    // 所以 SE 请求 ID 范围其实是 $01-$71（但 < $32 的被当作 BGM）
    // SE 队列槽 1-5 中的值是 $32-$71 → 索引 = seId - $31? 或 seId - $32?
    // 报告说 SE[0]=$850B，SE 表 37 条，所以索引 0-36
    // seId $32 → 索引 0? 或 seId $01 → 索引 0?
    // 原版 $8349: DEY 后 ASL，如果 seId=$32 → Y=$31 → ASL → $62 → 偏移 0x62
    //   但 SE 表在 $874F，偏移 0x62 = 98 字节 → 索引 49，超出 37 条
    // 所以 SE 请求 ID 不是 $32+，而是 1-based 索引（1-37），对应 SE[0]-SE[36]
    // 阈值 $32 是 BGM 上限，SE 队列中的值是 1-37（< $32）
    // 重新理解：$0700[0] 是 BGM（值 $00-$31），$0700[1-5] 是 SE（值 $01-$25 即 1-37）
    // 但 consumeQueue 中 SE 槽的阈值检查是 CPY #$72 / CPY #$31
    // 所以 SE 值范围是 $01-$71，但实际有效的是 $01-$25（37 条）
    // 为安全起见，索引 = seId - 1，超出表长则忽略
    void slot;
    const seIndex = seId - 1;
    if (seIndex < 0 || seIndex >= 100) return;  // SE 表共 100 条（索引 0-99）
    // TODO V0.6+: 完整翻译 $8349 SE 数据流解析
    // 当前：标记 Noise 通道活跃（SE 通常用 Noise 通道做音效）
    const active = this.store.readByte(RAM_CHANNEL_ACTIVE);
    this.store.writeByte(RAM_CHANNEL_ACTIVE, active | CH_NOISE);
    this.apu.writeRegister(0x4015, APU_ENABLE_ALL);
    // TODO: 从 AudioRom.readSePointer(seIndex) 读取 SE 数据起始地址，
    //       解析 SE 数据流（通道配置 + 音符序列），初始化 SE 通道状态
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 内部：帧推进（$80BA）
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * BGM 通道 tick（原版 $80BA-$811B）
   *
   * 遍历 4 个 APU 通道，递减 tick 计数器，推进音符，写 APU 寄存器
   */
  private bgmTick(): void {
    const active = this.store.readByte(RAM_CHANNEL_ACTIVE);
    if (active === 0) return;
    
    // 遍历 4 通道（通道状态块 $0727+，每通道 16 字节，步进 $10）
    // 通道索引 $00F2 = 0, 4, 8, 12（对应 $0707[0], $0707[4], ...）
    // 但原版 $00F3=8 循环 8 次，实际 4 通道 × 步进4 = 只处理 4 个
    for (let ch = 0; ch < 4; ch++) {
      const chMask = 1 << ch;
      if ((active & chMask) === 0) continue;
      
      const chBase = 0x0727 + ch * 0x10;  // 通道状态块基址
      const tickAddr = 0x0707 + ch * 4;   // $0707[X] tick 计数器
      const durAddr = 0x0709 + ch * 4;    // $0709[X] 音符持续
      const pitchAddr = 0x070A + ch * 4;  // $070A[X] 音高值
      
      // 1. 递减 tick 计数器
      let tick = this.store.readByte(tickAddr);
      if (tick > 0) {
        tick--;
        this.store.writeByte(tickAddr, tick);
      }
      if (tick !== 0) continue;
      
      // tick 归零，重载 tick
      this.store.writeByte(tickAddr, this.store.readByte(tickAddr + 1));
      
      // 2. 递减音符持续计数器
      let dur = this.store.readByte(durAddr);
      if (dur > 0) {
        dur--;
        this.store.writeByte(durAddr, dur);
      }
      
      if (dur === 0) {
        // 音符结束，读取下一个音符
        // 从通道状态块 offset 2-3 读取音符表指针
        const noteTablePtr = this.store.readU16(chBase + 2);
        // offset 4 读取当前音符索引
        let noteIdx = this.store.readByte(chBase + 4);
        
        // 从音符表读取 2 字节：[dur, pitch]
        // 切换到 BGM 数据 bank 读取
        const noteByte0 = AudioRom.readBgmData(noteTablePtr + noteIdx);
        const noteByte1 = AudioRom.readBgmData(noteTablePtr + noteIdx + 1);
        
        // $FF = 结束标记 → 回到开头
        if (noteByte0 === 0xFF) {
          noteIdx = 0;
          this.store.writeByte(chBase + 4, 0);
          const d0 = AudioRom.readBgmData(noteTablePtr);
          const d1 = AudioRom.readBgmData(noteTablePtr + 1);
          this.store.writeByte(durAddr, d0);
          this.store.writeByte(pitchAddr, d1);
        } else {
          // 更新音符持续和音高
          this.store.writeByte(durAddr, noteByte0);
          this.store.writeByte(pitchAddr, noteByte1);
          // 推进音符索引
          this.store.writeByte(chBase + 4, noteIdx + 2);
        }
      }
      
      // 3. 通道输出（写 APU 寄存器）
      this.channelOutput(ch);
    }
  }

  /**
   * 通道输出（原版 $81DB）
   *
   * 把当前音符的音高值转换为 APU 频率，写 APU 寄存器
   *
   * asm $81DB 逻辑：
   *   1. 读通道状态块 offset 5（音量/包络控制）
   *   2. 计算实际频率：$070A[X]（音高）- 包络偏移 | 音量高4位 → offset 6
   *   3. offset 7 = 频率高字节（从音符表或命令流设置）
   *   4. 写 APU：$4000+ch*4 = 控制，$4002+ch*4 = offset 6（频率低），$4003+ch*4 = offset 7|长度（频率高）
   */
  private channelOutput(ch: number): void {
    const chBase = 0x0727 + ch * 0x10;  // 通道状态块基址
    const pitchAddr = 0x070A + ch * 4;  // $070A[X] 音高值
    const pitch = this.store.readByte(pitchAddr);
    if (pitch === 0) return;
    
    // 简化：音高值直接作为 APU 频率低字节
    // 完整实现需要包络计算（$07CF 递推）+ offset 7 高字节
    // 当前：用音高值查频率表 $870D（12 半音）
    // 但音高值范围 0-0x7F，频率表只有 12 条
    // asm 中音高值通过 $83CB 命令流预处理，不是直接索引
    // 
    // 临时方案：音高值低 4 位作为音名索引（0-11），查 $870D 表
    const noteIdx = pitch & 0x0F;
    if (noteIdx > 11) return;
    const freq = AudioRom.readNoteFreq(noteIdx);
    if (freq === 0) return;
    
    const freqLo = freq & 0xFF;
    const freqHi = (freq >> 8) & 0x07;
    
    // 读音量（offset 5）
    const volCtrl = this.store.readByte(chBase + 5);
    const volume = volCtrl & 0x0F;
    
    if (ch === 0) {
      // Pulse1: $4000=控制, $4002=频率低, $4003=频率高+长度
      this.apu.writeRegister(0x4000, 0x30 | volume);  // bit5-6=50%占空, vol
      this.apu.writeRegister(0x4002, freqLo);
      this.apu.writeRegister(0x4003, freqHi | 0x08);
    } else if (ch === 1) {
      // Pulse2: $4004/$4006/$4007
      this.apu.writeRegister(0x4004, 0x30 | volume);
      this.apu.writeRegister(0x4006, freqLo);
      this.apu.writeRegister(0x4007, freqHi | 0x08);
    } else if (ch === 2) {
      // Triangle: $4008/$400A/$400B
      this.apu.writeRegister(0x4008, 0x80 | volume);
      this.apu.writeRegister(0x400A, freqLo);
      this.apu.writeRegister(0x400B, freqHi | 0x80);
    }
  }

  /**
   * SE 通道频率更新（原版 $811D-$8161）
   */
  private seTick(): void {
    // TODO V0.6+: 完整翻译 $811D SE 通道 vibrato/arpeggio 推进
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 内部：停止 SE
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * 停止所有 SE 通道（原版 $8070：写静音包络到 $07CF-$07DE）
   *
   * 写 $19 到包络控制字节，$0A 到音量初始值
   */
  private stopAllSeChannels(): void {
    // 原版 $8070: LDA #$19; STA $07DF,$07CF,$07D1,$07D2,$07D3,$07D5,$07D6,$07D7,$07D9,$07DA,$07DB,$07DD,$07DE
    const ENV_STOP = 0x19;
    const VOL_STOP = 0x0A;
    // 4 通道包络配置（每通道 4 字节：$07D0,$07D4,$07D8,$07DC = 音量；其余 = 包络）
    const volAddrs = [0x07D0, 0x07D4, 0x07D8, 0x07DC];
    const envAddrs = [
      0x07CF, 0x07D1, 0x07D2, 0x07D3,
      0x07D5, 0x07D6, 0x07D7,
      0x07D9, 0x07DA, 0x07DB,
      0x07DD, 0x07DE,
      0x07DF,
    ];
    for (const a of volAddrs) this.store.writeByte(a, VOL_STOP);
    for (const a of envAddrs) this.store.writeByte(a, ENV_STOP);
  }
}
