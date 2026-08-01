/**
 * Bank 12: Audio Engine / Sound Driver ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 * 功能: NES APU 音讯驱动引擎（音响效果、BGM 播放）
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（音讯主控）/ Service（APU 寄存器操作）
 * ═══════════════════════════════════════
 *   - NMI 期间由 bank02 → bank30 调用：音讯帧更新
 *   - 原始通过 MMC3 映射 bank 7/13/14/15 读取音频数据
 *     → 引擎数据表: 内联在 bank-12-audio-engine-data.ts
 *     → 音乐序列/曲谱: bank-13-code, bank-14-code, bank-15-code
 *   - 管理 6 个音讯通道（2 脉冲 + 1 三角 + 1 噪音 + 1 DPCM + 1 效果）
 *
 * ═══════════════════════════════════════
 * 6502 原始代码结构（共 6 个 CODE 段，约 1698 bytes）
 * ═══════════════════════════════════════
 *   CODE_$8000_$816C (365 bytes) — 主音讯更新循环
 *     - $8000-$805F: MMC3 bank 切换（6 通道），映射 bank 7/13/14/15
 *     - $8061-$80B8: 通道状态初始化
 *     - $80BA-$811B: 8 槽位主处理循环（每帧执行一次）
 *     - $811D-$8161: 3 槽位效果处理循环
 *     - $8163-$816C: APU 总开关检查 ($07E9)
 *   CODE_$816D_$8268 (252 bytes) — 通道 APU 寄存器更新
 *     - $816E-$81DA: 写入 $4000-$4003（音量/频率/长度计数器）
 *     - $81DB-$8256: 音量包络/速度处理
 *     - $8257-$8268: 效果分派表（基于 $07C7 的 arpeggio/pitch bend）
 *   CODE_$827D_$82E3 (103 bytes) — Type 1 效果处理（pitch bend ±1/±2, arpeggio cycle 0-9）
 *   CODE_$82F4_$83F3 (256 bytes) — Type 3 效果 + 通道初始化
 *     - $8349-$83CA: 从乐器表（$8BDA 指针表）初始化通道
 *     - $83CB-$83F3: MML 字节码解析 → 命令分派
 *   CODE_$83F4_$84E9 (246 bytes) — MML 命令解析器
 *     - 解析 $80-$BF 范围的音符/休止符/控制码
 *     - 查 $8725 表取音长
 *     - 查 $870D 表取频率
 *     - 写入 APU 频率寄存器
 *     - $84C9: 命令跳转表分派（$84DA 开始的跳转表）
 *   CODE_$851A_$86F5 (476 bytes) — 辅助函数集
 *     - $851A: 静音所有通道
 *     - $8532: 清除通道效果
 *     - $8544: 设置波形（查 $8754 表）
 *     - $855F: 设置音量
 *     - $8578: 跳转子序列
 *     - $8585/$85C6: 嵌套子序列调用/返回
 *     - $85AF: 从子序列返回
 *     - $85EF: 循环计数器递减
 *     - $8617: 设置 sweep 寄存器
 *     - $8641: 设置包络
 *     - $8655: 停音（DPCM 通道）
 *     - $8670: 设置音高偏移
 *     - $8681: 设置效果类型
 *     - $8690: 清除效果
 *     - $8699/$86B8/$86D7: 三种 DPCM 配置
 *
 * 数据段（35 个表，约 6,494 bytes）:
 *   - $8269: 效果分派表 (type 1, 10 entries × 2)
 *   - $82E4: 效果分派表 (type 2, 8 entries × 2)
 *   - $84EA: 命令分派表 (32 entries × 2)
 *   - $86F6: 命令处理器字节码
 *   - $870D: 音符频率表 (12 octave × 12 notes)
 *   - $8752: 波形表指针
 *   - $876A: 乐器定义指针表
 *   - $87CE-$8BB5: 乐器数据（音量包络、duty cycle）
 *   - $8BB6: 乐曲头指针表
 *   - $8C12: 乐曲头指针表（续）
 *   - $8C3C: DPCM 采样指针表
 *   - $8C6E: DPCM 采样指针表（续）
 *   - $8C92: 乐曲定义指针表
 *   - $8CC0-$9677: 主歌曲/音效数据 (2,488 bytes)
 *   - $9678-$9FFF: 更多音效/歌曲数据
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ ROM 数据 — 内联常数 bank-12-data.ts
 *   ✅ 数据表访问工具 — 音符频率、乐器定义、波形等
 *   ✅ CODE_$8000_$816C — 主音讯更新循环（bank12_audioFrame）
 *   ✅ CODE_$82F4_$83F3 — 通道初始化 (_channelInit)
 *   ✅ CODE_$83CB_$83F3 — MML 字节码解析入口
 *   ✅ CODE_$83F4_$84E9 — 音符解析器 (_readNextNote)
 *   ✅ CODE_$84DA_$8519 — 命令分派器 (_dispatchCommand + _execCommand)
 *   ✅ CODE_$80E8_$8109 — 序列字节读取 (_readNextSequenceBytes)
 *   ✅ CODE_$816D_$8268 — APU 寄存器更新 + 音量/包络处理 (_updateChannelAPU)
 *   ✅ CODE_$827D_$82E3 — Type 1 效果处理 (_dispatchEffectType1)
 *   ✅ CODE_$82F4_$83F3 — Type 2 效果处理 (_dispatchEffectType2)
 *   ✅ CODE_$851A_$86F5 — 辅助函数（静音/波形/音量/子序列/DPCM 等）
 *   ✅ 效果处理入口 (_processEffects)
 *   ✅ APU 寄存器写入 (_writeAPURegisters)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_12_audio.ts
 */

import {
  SystemState,
  writeMem,
} from '../system-state';

// ── 音乐序列/曲谱数据 bank（原始 MMC3 映射 bank 13/14/15） ──
import { getBank13Data } from './bank-13-code';
import { getBank14Data } from './bank-14-code';
import { getBank15Data } from './bank-15-code';

// ── 引擎数据表（bank-12 内部） ──
import {
  DATA_$8269_$827C,
  DATA_$82E4_$82F3,
  DATA_$84EA_$8519,
  DATA_$86F6_$870C,
  DATA_$870D_$8751,
  DATA_$8752_$8769,
  DATA_$876A_$87CD,
  DATA_$87CE_$8863,
  DATA_$8864_$886F,
  DATA_$8870_$89BF,
  DATA_$89C0_$89D9,
  DATA_$89DA_$89E5,
  DATA_$89E6_$8A69,
  DATA_$8A6A_$8A8B,
  DATA_$8A8C_$8B0B,
  DATA_$8B0C_$8B4B,
  DATA_$8B4C_$8B75,
  DATA_$8B76_$8B89,
  DATA_$8B8A_$8BB5,
  DATA_$8BB6_$8C11,
  DATA_$8C12_$8C3B,
  DATA_$8C3C_$8C6D,
  DATA_$8C6E_$8C91,
  DATA_$8C92_$8CBF,
  DATA_$8CC0_$9677,
  DATA_$9678_$96A1,
  DATA_$96A2_$96CB,
  DATA_$96CC_$97D5,
  DATA_$97D6_$9802,
  DATA_$9803_$981A,
  DATA_$981B_$9873,
  DATA_$9874_$9CB4,
  DATA_$9CB5_$9ED2,
  DATA_$9ED3_$9EF6,
  DATA_$9EF7_$9F45,
  DATA_$9F46_$9FFF,
} from './bank-12-audio-engine-data';

// ═════════════════════════════════════════════════
// ROM data chunk lookup (each chunk mapped by bank offset range)
// ═════════════════════════════════════════════════

/** 命令跳转表前 8 条目 ($84DA-$84E9, 16 bytes)
 *  在原始 ROM 中位于 CODE 段末尾，DATA 段从 $84EA 开始
 *  cmd 0=$8544(set waveform), 1=$8707(RTS), 2=$8641(set envelope),
 *  3=$855F(set volume), 4=$8617(set sweep), 5=$8670(set pitch offset),
 *  6=$8707, 7=$8707 */
const DATA_$84DA_$84E9: readonly number[] = [
  0x44, 0x85, 0x07, 0x87, 0x41, 0x86, 0x5F, 0x85,
  0x17, 0x86, 0x70, 0x86, 0x07, 0x87, 0x07, 0x87,
];

const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x0269, data: DATA_$8269_$827C },
  { offset: 0x02E4, data: DATA_$82E4_$82F3 },
  { offset: 0x04DA, data: DATA_$84DA_$84E9 },
  { offset: 0x04EA, data: DATA_$84EA_$8519 },
  { offset: 0x06F6, data: DATA_$86F6_$870C },
  { offset: 0x070D, data: DATA_$870D_$8751 },
  { offset: 0x0752, data: DATA_$8752_$8769 },
  { offset: 0x076A, data: DATA_$876A_$87CD },
  { offset: 0x07CE, data: DATA_$87CE_$8863 },
  { offset: 0x0864, data: DATA_$8864_$886F },
  { offset: 0x0870, data: DATA_$8870_$89BF },
  { offset: 0x09C0, data: DATA_$89C0_$89D9 },
  { offset: 0x09DA, data: DATA_$89DA_$89E5 },
  { offset: 0x09E6, data: DATA_$89E6_$8A69 },
  { offset: 0x0A6A, data: DATA_$8A6A_$8A8B },
  { offset: 0x0A8C, data: DATA_$8A8C_$8B0B },
  { offset: 0x0B0C, data: DATA_$8B0C_$8B4B },
  { offset: 0x0B4C, data: DATA_$8B4C_$8B75 },
  { offset: 0x0B76, data: DATA_$8B76_$8B89 },
  { offset: 0x0B8A, data: DATA_$8B8A_$8BB5 },
  { offset: 0x0BB6, data: DATA_$8BB6_$8C11 },
  { offset: 0x0C12, data: DATA_$8C12_$8C3B },
  { offset: 0x0C3C, data: DATA_$8C3C_$8C6D },
  { offset: 0x0C6E, data: DATA_$8C6E_$8C91 },
  { offset: 0x0C92, data: DATA_$8C92_$8CBF },
  { offset: 0x0CC0, data: DATA_$8CC0_$9677 },
  { offset: 0x1678, data: DATA_$9678_$96A1 },
  { offset: 0x16A2, data: DATA_$96A2_$96CB },
  { offset: 0x16CC, data: DATA_$96CC_$97D5 },
  { offset: 0x17D6, data: DATA_$97D6_$9802 },
  { offset: 0x1803, data: DATA_$9803_$981A },
  { offset: 0x181B, data: DATA_$981B_$9873 },
  { offset: 0x1874, data: DATA_$9874_$9CB4 },
  { offset: 0x1CB5, data: DATA_$9CB5_$9ED2 },
  { offset: 0x1ED3, data: DATA_$9ED3_$9EF6 },
  { offset: 0x1EF7, data: DATA_$9EF7_$9F45 },
  { offset: 0x1F46, data: DATA_$9F46_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom12(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

/** ROM 数据访问 — 读取 16-bit 指针 (little-endian) */
function rom12Ptr16(offset: number): number {
  const lo = rom12(offset);
  const hi = rom12(offset + 1);
  return lo | (hi << 8);
}

// ═════════════════════════════════════════════════
// 音讯引擎零页变量定义（对应于 NES RAM $0700-$07FF 区域）
// ═════════════════════════════════════════════════
//
// 通道状态槽（每个 16 字节，共 6 个通道 × 16 = $60 字节）:
//   $0700-$0705: 音乐编号（每个音讯通道的当前播放曲目 ID）
//   $0706: 通道启用位掩码（bit 0-5 对应通道 0-5）
//   $0707-$0708: 当前音符长度计数器
//   $0709-$070A: 序列读取指针（(f6),(f7) 的低字节对）
//   $0727-$07A6: 通道数据区（16 字节/通道 × 8 通道）
//     +0: 包络指针 lo
//     +1: 包络指针 hi
//     +2: 当前音量
//     +3: 包络步进
//     +4: 波形/duty cycle
//     +5: 音量/效果标志（bit7-4: 音量, bit3-0: 效果步数）
//     +6: 当前包络值
//     +7: 频率 lo
//     +8: 频率 hi（bit7 = 音符活跃标志）
//     +9: 序列堆栈深度
//     +A: 音符计数器
//   $07A7-$07AE: 音高偏移（绝对）
//   $07AF-$07B6: 效果类型（0=无, 1=pitch bend, 2=arpeggio）
//   $07B7-$07BE: 当前频率 lo
//   $07BF-$07C6: 当前频率 hi
//   $07C7-$07CE: 效果步进
//   $07CF-$07D6: 音量包络计数器
//   $07D7-$07DE: 音量包络重载值
//   $07DF: 音量覆写标志
//   $07E0-$07E3: 上次写入 $4003 的值
//   $07E4-$07E7: Sweep 重载标志
//   $07E8: DPCM 模式标志 ($80 = enabled)
//   $07E9: APU 总开关（非零 = 静音）
//   $07EA-$07F1: 通道效果使能（非零 = 效果活跃）
//   $07F2: 全局静音标志
//   $07F4-$07FB: 音高滑音标志
//   $07FC-$07FF: MMC3 bank 寄存器镜像

// ═════════════════════════════════════════════════
// 标志位辅助
// ═════════════════════════════════════════════════

const FLAG_C = 0x01;
const FLAG_Z = 0x02;
const FLAG_N = 0x80;

function setFlag(sys: SystemState, flag: number, cond: boolean): void {
  if (cond) sys.regs.P |= flag;
  else sys.regs.P &= ~flag;
}

function updateNZ(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x80) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFF) === 0);
}

// ═════════════════════════════════════════════════
// APU 寄存器写入辅助
// ═════════════════════════════════════════════════

/** 写入 APU 寄存器（$4000-$4015） */
function writeAPU(sys: SystemState, reg: number, val: number): void {
  writeMem(sys, 0x4000 + (reg & 0x1F), val);
}

// ═════════════════════════════════════════════════
// 数据表访问
// ═════════════════════════════════════════════════

/** 音符频率表 ($870D-$8751, 69 bytes)
 *  每个条目 3 bytes: [freq_lo, freq_hi, length]
 *  12 个八度的 12 个半音（低 11 位有效）
 */
function getNoteFrequency(noteIndex: number): { freqLo: number; freqHi: number; length: number } {
  const base = 0x870D - 0x8000;
  const offset = (noteIndex & 0x7F) * 3;
  return {
    freqLo: rom12(base + offset),
    freqHi: rom12(base + offset + 1),
    length: rom12(base + offset + 2),
  };
}

/** 音符长度表 ($8725-$8751 中的长度部分) */
function getNoteLength(noteIdx: number): number {
  const base = 0x8725 - 0x8000;
  return rom12(base + (noteIdx & 0x3F));
}

/** 波形/乐器指针表 ($8752, 12 entries × 2 bytes) */
function getInstrumentPtr(instrumentId: number): number {
  const base = 0x8752 - 0x8000;
  return rom12Ptr16(base + (instrumentId & 0x0F) * 2);
}

/** 命令处理器跳转表 ($84EA, ~24 entries × 2 bytes) */
function getCommandHandler(cmd: number): number {
  const base = 0x84EA - 0x8000;
  return rom12Ptr16(base + (cmd & 0x1F) * 2);
}

// ═════════════════════════════════════════════════
// CODE_$8000_$8065 — 主音讯更新循环（音讯帧处理入口）
// ═════════════════════════════════════════════════
//
// 这是 bank 12 的主入口，每个 NMI 帧调用一次。
// 流程概览:
//   1. 6 通道 MMC3 bank 切换循环（根据不同通道映射 bank 7/13/14/15）
//   2. 通道状态检查与初始化（清除 $0700-$07DE 区域）
//   3. 主处理循环（8 个音讯槽位）
//   4. 效果处理循环（3 个效果槽位）
//   5. APU 状态更新
//
// 6502 原始调用:
//   $8000: LDX #$05 → 6 通道循环开始
//   $8002: LDY $0700,X → 检查通道状态
//   $8005: CPY #$32 → 判断音乐 ID 范围（切换不同数据 bank）
//   ...
//   $80BA: LDA #$27 / STA $F0 → 初始化引擎指针 ($F0 = $0727)
//   $80CA: 主循环开始
//   $811D: 效果循环开始
//   $8163: 检查 $07E9 → 控制 $4015 (APU 总开关)

/**
 * bank12_audioFrame — 音讯帧更新
 *
 * 这是 bank 12 的主入口函数。每个 NES 帧（60Hz NTSC）调用一次。
 * 在原始 6502 代码中，此函数从 $8000 开始执行。
 *
 * 对应 6502 代码: CODE_$8000_$816C
 */
export function bank12_audioFrame(sys: SystemState): void {
  // ═══════════════════════════════════════════
  // 阶段 1: MMC3 Bank 切换（6 通道循环）
  // ═══════════════════════════════════════════
  //
  // 6502: LDX #$05 → for each channel 5..0
  //   LDY $0700,X       ; 读取通道音乐 ID
  //   CPY #$32          ; < $32 → bank 07
  //   CPY #$44          ; < $44 → bank 0D
  //   CPY #$51          ; < $51 → bank 0E
  //   CPY #$5C          ; < $5C → bank 0F
  //                     ; else → 保持当前 bank
  //
  // MMC3 操作: STA $8000 (bank select), STA $8001 (bank data)
  // 将 bank 7, 13, 14, 15 映射到 $8000-$9FFF 窗口
  //
  // 注意: 在翻译后的引擎中，MMC3 bank 切换由系统层处理，
  // 这里只需记录注释。实际数据已在 bankRomTable 中注册。

  for (let ch = 5; ch >= 0; ch--) {
    const musicId = sys.mem[0x0700 + ch];

    // 根据音乐 ID 范围决定切换哪个数据 bank
    // 这些 bank 通过 MMC3 映射提供音乐序列数据
    if (musicId < 0x32) {
      sys.mmc3Map[0] = 7;   // bank 7 → $8000 window
    } else if (musicId < 0x44) {
      sys.mmc3Map[0] = 13;  // bank 13 → $8000 window
    } else if (musicId < 0x51) {
      sys.mmc3Map[0] = 14;  // bank 14 → $8000 window
    } else if (musicId < 0x5C) {
      sys.mmc3Map[0] = 15;  // bank 15 → $8000 window（音乐序列数据）
    }
    // else: 保持当前 bank 映射
  }

  // ═══════════════════════════════════════════
  // 阶段 2: 通道状态初始化
  // ═══════════════════════════════════════════
  //
  // 6502: LDX #$05 → for each channel 5..0
  //   LDY $0700,X
  //   BEQ skip         ; 音乐 ID = 0 → 跳过
  //   CPY #$72
  //   BCS skip         ; 音乐 ID >= $72 → 跳过
  //   CPY #$31
  //   BNE call_init    ; 音乐 ID != $31 → 调用初始化
  //   ; 音乐 ID == $31 → 重置所有音量/效果状态
  //
  // $31 = "音乐停止" 命令
  // $32-$43: 使用 bank 07
  // $44-$50: 使用 bank 0D
  // $51-$5B: 使用 bank 0E
  // $5C-$71: 使用 bank 0F

  for (let ch = 5; ch >= 0; ch--) {
    const musicId = sys.mem[0x0700 + ch];

    if (musicId === 0 || musicId >= 0x72) {
      continue; // 跳过无效/空闲通道
    }

    if (musicId === 0x31) {
      // "音乐停止" — 重置所有音量/效果状态
      sys.mem[0x07DF] = 0x19;
      sys.mem[0x07CF] = 0x19;
      sys.mem[0x07D1] = 0x19;
      sys.mem[0x07D2] = 0x19;
      sys.mem[0x07D3] = 0x19;
      sys.mem[0x07D5] = 0x19;
      sys.mem[0x07D6] = 0x19;
      sys.mem[0x07D7] = 0x19;
      sys.mem[0x07D9] = 0x19;
      sys.mem[0x07DA] = 0x19;
      sys.mem[0x07DB] = 0x19;
      sys.mem[0x07DD] = 0x19;
      sys.mem[0x07DE] = 0x19;
      sys.mem[0x07D0] = 0x0A;
      sys.mem[0x07D4] = 0x0A;
      sys.mem[0x07D8] = 0x0A;
      sys.mem[0x07DC] = 0x0A;
      sys.mem[0x0700 + ch] = 0x00;
    } else {
      // 其他音乐 ID → 调用通道初始化
      _channelInit(sys, ch);
      sys.mem[0x0700 + ch] = 0x00;
    }
  }

  // ═══════════════════════════════════════════
  // 阶段 3: 主音讯处理循环（8 个槽位）
  // ═══════════════════════════════════════════
  //
  // 6502: LDA #$27 → STA $F0  (base pointer lo = $0727)
  //       LDA #$07 → STA $F1  (base pointer hi = $07)
  //       LDA #$00 → STA $F2  (channel index init)
  //       LDY #$08 → STY $F3  (8 slots to process)
  //
  // 每个槽位 (16 字节间隔):
  //   +0,+1: 音乐指针 (lo/hi)
  //   +2:    当前偏移
  //   +4:    音符计数器
  //   +5:    控制字节
  //   +6:    音量
  //   +7,+8: 频率 (lo/hi)
  //   +9:    堆栈深度
  //   +A:    序列指针
  //
  // 主循环流程（每个槽位）:
  //   - 检查 $0706（通道位掩码），跳过非活跃通道
  //   - 递减 $0707（音长计数器），到零时调用 $83CB 读取下个音符
  //   - 递减 $0709（序列指针），到零时读取下个序列字节对
  //   - 调用 $81DB（APU 寄存器更新）

  // 初始化引擎指针
  let f0_base = 0x0727; // $F0 指向音频引擎零页数据基址
  let f2 = 0;            // 当前处理通道索引
  let f3 = 8;            // 剩余槽位数

  // 检查 $0706 位掩码，标记活跃通道
  const channelMask = sys.mem[0x0706];
  const wasOdd = (channelMask & 0x01) !== 0;
  // 6502: LSR; BCC skip_ora; ORA #$80; STA $0706
  // 如果 bit0 = 1，则设置 bit7（帧交替标志）
  sys.mem[0x0706] = wasOdd ? (channelMask | 0x80) : (channelMask & 0x7F);

  if (wasOdd) {
    // 帧活跃：处理所有 8 个槽位
    do {
      // $F0/$F1 = channelDataPtr（指向当前槽位的 16 字节通道数据块）
      // $F2 = main loop index (0,4,8,...,28) 用于索引 $0707/$0709/$070A
      // $F3 = slot index (8,7,...,1) 用于索引 $07CF/$07EA/$07F4 等
      const channelDataPtr = f0_base;

      // 检查 $0707（音长计数器）— 递减并检查是否到期
      const timerAddr = 0x0707 + f2;
      sys.mem[timerAddr] = (sys.mem[timerAddr] - 1) & 0xFF;
      if (sys.mem[timerAddr] !== 0) {
        // 音长计数器未到期，跳过音符读取
      } else {
        _readNextNote(sys, channelDataPtr, f2, f3);
      }

      // 检查 $0709（序列指针）— 递减并检查是否到期
      const seqAddr = 0x0709 + f2;
      sys.mem[seqAddr] = (sys.mem[seqAddr] - 1) & 0xFF;
      if (sys.mem[seqAddr] !== 0) {
        // 序列指针未到期，跳过
      } else {
        _readNextSequenceBytes(sys, channelDataPtr, f2);
      }

      // 更新 APU 寄存器
      _updateChannelAPU(sys, channelDataPtr, f2, f3);

      // 下一个槽位: 指针 +16, 通道索引 +4
      f0_base += 0x10;
      f2 += 4;
      f3--;
    } while (f3 !== 0);
  }

  // ═══════════════════════════════════════════
  // 阶段 4: 效果处理循环（3 个效果槽位）
  // ═══════════════════════════════════════════
  //
  // 6502:
  //   LDA #$27 → STA $F0, $FC
  //   LDA #$07 → STA $F1, $FD
  //   LDA #$03 → STA $F2  (3 iterations)
  //   LDA #$11 → STA $F3  (bit mask: %00010001)
  //
  // 按位检查通道效果标志，每次 ASL $F3 左移
  // $F3 initial = $11 → check bit 0,4 then bit 1,5

  f0_base = 0x0727;
  let fc = 0x0727;
  f2 = 3;
  let f3Mask = 0x11;

  do {
    const chMask = sys.mem[0x0706] & f3Mask;
    if (chMask !== 0) {
      // 该位为活跃通道
      const lowBits = chMask & 0x0F;

      if (lowBits === 0) {
        // 通道在低区 → 指针 +0x40
        f0_base = fc + 0x40;
      }

      // 调用效果处理子程序 $816E
      _processEffects(sys, f0_base, f2);
    }

    // 下一个迭代
    fc += 0x10;
    f0_base = fc;
    f3Mask <<= 1;
    f2--;
  } while (f2 >= 0);

  // ═══════════════════════════════════════════
  // 阶段 5: APU 状态更新
  // ═══════════════════════════════════════════
  //
  // 6502: LDA $07E9 → BEQ +5 → LDA #$00 → STA $4015
  if (sys.mem[0x07E9] !== 0) {
    writeAPU(sys, 0x15, 0x00);
  }
}

// ═════════════════════════════════════════════════
// CODE_$8349_$83CA — 通道初始化子程序
// ═════════════════════════════════════════════════
//
// 6502 流程:
//   STX $F5               ; 保存 X（通道号）
//   LDA #$00 → STA $0700,X ; 清除音乐 ID
//   DEY → TYA → ASL → TAY ; Y = (通道号 * 2)
//   LDA $8BDA,Y / STA $F0 ; 取乐器定义指针 (16-bit)
//   LDA $8BDB,Y / STA $F1
//   LDY #$00
//   loop:
//     LDA ($F0),Y
//     BPL skip_end        ; bit7 = 0 → 数据字节
//     ; bit7 = 1 → 终结符，启停 APU
//     LDX #$0F / STX $4015
//     LDX $F5              ; 恢复 X
//     RTS                  ; 返回
//   skip_end:
//     STA $F4              ; 保存通道数
//     ; 清除该通道的所有状态变量
//     LDA #$00 → STA $07A7-$07F4 (多个地址)
//     ; ASL*4 → TAX → 读取乐器数据 (2 bytes) → STA $0727,X / $0728,X
//     ; STA $072C = 0, $0730 = $0F
//     ; 设置 $0707 = 1 (音长计数器初始化)
//     ; 更新 $0706 通道位掩码
//     INY → BPL loop       ; 继续下一个通道
//   end:
//     ; $83CB: 清除当前通道的 $07xx (volume) bit7-4
//     LDA #$CF / AND ($F0),Y / STA ($F0),Y

/**
 * _channelInit — 从乐器表初始化一个音讯通道
 *
 * 对应 6502: CODE_$82F4_$83F3 ($8349-$83CA)
 *
 * @param sys 系统状态
 * @param channel 通道号 (0-5)
 */
function _channelInit(sys: SystemState, channel: number): void {
  const channelBase = 0x8BDA - 0x8000;

  // 读取乐器定义指针表
  const chIdx = channel * 2;
  const ptrLo = rom12(channelBase + chIdx);
  const ptrHi = rom12(channelBase + chIdx + 1);
  let f0 = ptrLo | (ptrHi << 8); // 乐器定义地址（在 bank 12 内的偏移）
  f0 -= 0x8000; // 转换为 bank 内偏移

  sys.mem[0x0700 + channel] = 0x00; // 清除通道音乐 ID

  let y = 0;
  while (true) {
    const byte = rom12(f0 + y);
    if (byte & 0x80) {
      // bit7 = 1 → 定义结束，初始化 APU
      writeAPU(sys, 0x15, 0x0F);
      return;
    }

    const chCount = byte; // bit0-6 = 该乐器使用的通道数
    sys.mem[0x0700 + channel] = 0x00;

    // 清除该通道的状态变量
    // 对应 6502: LDA #$08; SBC $F4; TAX → 计算要初始化的通道索引范围
    const startCh = 8 - chCount;
    for (let c = startCh; c < 8; c++) {
      sys.mem[0x07A7 + c] = 0x00;
      sys.mem[0x07AF + c] = 0x00;
      sys.mem[0x07EA + c] = 0x00;
      sys.mem[0x07CF + c] = 0x00;
      sys.mem[0x07D7 + c] = 0x00;
      sys.mem[0x07F4 + c] = 0x00;
    }
    sys.mem[0x07E3] = 0x00;
    sys.mem[0x07E2] = 0x00;
    sys.mem[0x07DF] = 0x00;
    sys.mem[0x07E8] = 0x00;

    // 读取乐器数据: +1, +2 → 存入通道数据区
    y++;
    const data1 = rom12(f0 + y);
    y++;
    const data2 = rom12(f0 + y);

    // 计算通道数据区偏移 (chCount << 4)
    const dataOffset = chCount << 4;
    sys.mem[0x0727 + dataOffset] = data1;
    sys.mem[0x0728 + dataOffset] = data2;
    sys.mem[0x072C + dataOffset] = 0x00;
    sys.mem[0x0730 + dataOffset] = 0x0F;

    // 设置音长计数器和通道位掩码
    const bitShift = chCount << 2;
    sys.mem[0x0707 + bitShift] = 0x01;

    // 更新通道启用位掩码
    let enableMask = 0;
    for (let i = chCount - 1; i >= 0; i--) {
      enableMask = (enableMask << 1) | 1;
    }
    sys.mem[0x0706] |= enableMask;

    y++;
    if (y >= 0x100) break; // BPL check: if Y wraps, stop
  }
}

// ═════════════════════════════════════════════════
// CODE_$83CB_$83F3 — 读取下一个音符/命令
// ═════════════════════════════════════════════════
//
// 6502 流程:
//   $83CB: LDA #$CF; AND ($F0),Y → 清除 bit4-5（音符活跃标志）
//   $83D3: LDY #$00 → 重置指针
//   loop:
//     LDA ($F4),Y       ; 读取 MML 字节
//     BPL process        ; bit7 = 0 → 处理数据
//     ; bit7 = 1 → 命令字节
//     CMP #$E0
//     BCC just_skip      ; < $E0 → 跳过一个字节
//     JSR $84C9          ; >= $E0 → 命令分派
//     BPL loop
//   just_skip:           ; $B0-$DF 范围 → 跳过 1 字节
//     INY → BNE loop
//   process:             ; $00-$AF 范围
//     AND #$3F → TAX    ; 取低 6 位作为音索引
//     LDA $8725,X       ; 查音长表
//     STA $0707,X
//     STA $0708,X
//   continue:
//     ; 更新指针保存回 $F0/$F1
//     ; 查频率表 → 写入 APU 频率寄存器

// ═════════════════════════════════════════════════
// CODE_$83CB_$83F3 + CODE_$83F4_$84E9 — MML 解析器
// ═════════════════════════════════════════════════
//
// 读取下一个音符/命令的主入口。
// 这实际上是两个紧耦合的子程序:
//   1. $83CB-$83F3: 读取指针 → 检查字节类型 → 分派
//   2. $83F4-$84C8: 解析音符字节($00-$AF) → 查表 → 计算频率
//   3. $84C9-$84D9: 命令分派器 → 跳转表分派

/**
 * _readNextNote — 从 MML 序列读取下一个音符/命令
 *
 * 对应 6502: CODE_$82F4_$83F3 ($83CB-$83F3) + CODE_$83F4_$84E9 ($83F4-$84C8)
 *
 * 流程:
 *   1. 清除通道控制字节 bit4-5（活跃标志）
 *   2. 循环读取 MML 字节:
 *      - bit7=0 ($00-$AF): 音符/休止符 → 查音长表 + 频率表 + 写入 APU 频率
 *      - $B0-$DF: 控制码 → 跳过一个字节
 *      - $E0-$FF: 命令码 → $84C9 分派
 *   3. 最后更新音长计数器和序列指针
 *
 * @param sys  系统状态
 * @param ptr  通道数据指针（零页 $F0/$F1 对应的 $07xx 绝对地址）
 * @param f2   主循环通道索引
 * @param f3   槽位号 (8..1)
 */
function _readNextNote(sys: SystemState, ptr: number, f2: number, f3: number): void {
  // ── $83CB-$83D1: 清除音符活跃标志 ──
  // LDA #$CF / AND ($F0),Y  (Y=5) → 清除 bit4-5
  const ctrlAddr = ptr + 5;
  sys.mem[ctrlAddr] = sys.mem[ctrlAddr] & 0xCF;

  // ── $83D3-$83DE: 初始化读取指针 ──
  // LDY #$00 → LDA ($F0),Y → STA $F4 (指针 lo)
  // INY → LDA ($F0),Y → STA $F5 (指针 hi)
  let f4 = sys.mem[ptr];       // 音乐指针 lo
  let f5 = sys.mem[ptr + 1];   // 音乐指针 hi
  let y = 0;

  // ── $83DF-$83F3: 主解析循环 ──
  // loop: LDA ($F4),Y → 检查 bit7
  while (true) {
    const mmlByte = readMMLByte(sys, f4, f5, y);

    if (!(mmlByte & 0x80)) {
      // ── bit7=0: 音符/休止符 ($00-$AF) ──
      // ── $83F4-$84C8: 音符解析 ──

      // AND #$3F → TAX (取音符索引 0-63)
      const noteIdx = mmlByte & 0x3F;

      // $83F7: LDA $8725,X → 查音长表 → 存入 $0707,X 和 $0708,X
      const length = getNoteLength(noteIdx);
      sys.mem[0x0707 + f2] = length;
      sys.mem[0x0708 + f2] = length;

      // $8402: BPL → 跳回 $83DF 主循环顶（音长 < $80 时分支；≥$80 时顺序进入 $8404）
      //
      // 6502 音符解析流程（$83F4-$84C8）:
      //   1. $83F4-$83FC: 从 $8725 表查音长 → 写入 $0707+X/$0708+X 计时器
      //   2. $8404-$8413: 消耗字节: INY + 更新通道指针 ($F0),Y 指向下一个 MML 字节
      //   3. $8415-$84A5: 解析半音 + 八度 → 查频率表 $870D → 写入通道
      //   4. $84A6-$84C8: 清效果标志, 重载音长, RTS（音符处理不走主循环分支）
      //
      // 命令 ($E0-$FF) 走另一路径: $83E8 JSR $84C9 + $83EB BPL 回循环

      // 现在 Y 仍然指向当前字节位置（还没 INY）
      // 消耗该字节: INY
      y++;
      const savedNote = mmlByte;

      // 保存新指针到通道数据 +0/+1
      const newPosLo = f4 + y;
      const newPosHi = f5 + (newPosLo > 0xFF ? 1 : 0);
      sys.mem[ptr] = newPosLo & 0xFF;
      sys.mem[ptr + 1] = newPosHi & 0xFF;

      // ── 音符频率解析 ($8415-$84A3) ──
      const noteByte = savedNote;
      let f4Freq: number, f5Freq: number;

      // $8416-$8420: 检查通道类型
      // LDX #$05 / CPX $F3 / BEQ → $F3=5: 噪音/DPCM 通道 → special
      // LDX #$01 / CPX $F3 / BCC → $F3<1: 脉冲通道 → special
      if (f3 === 5 || f3 < 1) {
        // 噪音/DPCM 或 脉冲通道特殊处理
        // $8422: CMP #$10
        if (noteByte === 0x10) {
          // $8435-$843D: 设置 bit5 (休止符/静音标志)
          sys.mem[ctrlAddr] = sys.mem[ctrlAddr] | 0x20;
          // 跳到 $84A6
          gotoUpdateTimersAndReturn(sys, ptr, f2, f3);
          return;
        }
        // $8426: 非 $10 → 作为纯休止 (频率=0)
        f4Freq = noteByte;
        f5Freq = 0;
        // $842C: BEQ → 跳到 $845C (频率=0, 无实际音高)
      } else {
        // 三角波通道 ($F3 >= 2, $F3 != 5)
        // $842E: TAX; AND #$0F → semitone
        const semitone = noteByte & 0x0F;
        // $8431: CMP #$0C
        if (semitone === 0x0C) {
          // $8435-$843D: 半音=$0C → 不发声 (set bit5)
          sys.mem[ctrlAddr] = sys.mem[ctrlAddr] | 0x20;
          gotoUpdateTimersAndReturn(sys, ptr, f2, f3);
          return;
        }
        // $843F-$845A: 查频率表 $870D 并移位八度
        // ASL A; TAY → 频率表索引 = semitone * 2
        const freqTableIdx = semitone * 2;
        f4Freq = rom12(0x870D - 0x8000 + freqTableIdx);
        f5Freq = rom12(0x870E - 0x8000 + freqTableIdx);

        // AND #$F0 / LSR*4 → 八度值
        let octave = (noteByte & 0xF0) >> 4;
        // 右移 octave 次（LSR f5 → ROR f4: carry 来自 f5 bit0 BEFORE 移位）
        while (octave > 0) {
          const carryBit = f5Freq & 1;
          f5Freq = f5Freq >> 1;
          f4Freq = (carryBit ? 0x80 : 0) | (f4Freq >> 1);
          octave--;
        }
      }

      // ── $845C-$84A3: 检查音高偏移并写入频率 ──
      // $845E: LDX $F3; DEX → 槽位索引
      const slotIdx = f3 - 1;
      let freqLo: number, freqHi: number;

      // $8461: LDY $07F4,X → 检查音高滑音标志
      if (sys.mem[0x07F4 + slotIdx] !== 0) {
        // 音高滑音模式: 频率减去偏移
        // $8467: SBC $07A7,X
        const rawFreqLo = f4Freq - sys.mem[0x07A7 + slotIdx];
        if (rawFreqLo < 0) {
          // 借位处理 ($8478-$8489)
          freqLo = rawFreqLo & 0xFF;
          freqHi = (f5Freq - 1) & 0xFF;
        } else {
          // $846C-$8475
          freqLo = rawFreqLo & 0xFF;
          freqHi = f5Freq & 0xFF;
        }
        // ORA #$80 → bit7=1 (音符活跃)
        freqHi = freqHi | 0x80;
      } else {
        // 正常模式: 频率加上偏移
        const rawFreqLo = f4Freq + sys.mem[0x07A7 + slotIdx];
        freqLo = rawFreqLo & 0xFF;
        freqHi = (f5Freq + (rawFreqLo > 0xFF ? 1 : 0)) & 0xFF;
        // ORA #$80
        freqHi = freqHi | 0x80;
      }

      // 写入通道数据 +7/+8
      sys.mem[ptr + 7] = freqLo;
      sys.mem[ptr + 8] = freqHi;
      sys.mem[0x07B7 + slotIdx] = freqLo;
      sys.mem[0x07BF + slotIdx] = freqHi;

      // ── $84A6-$84C8: 清理并更新音长计数器 ──
      gotoUpdateTimersAndReturn(sys, ptr, f2, f3);
      return;

    } else {
      // ── bit7=1: 命令或控制码 ──
      y++;
      if (mmlByte >= 0xE0) {
        // 命令码 ($E0-$FF) → 分派
        _dispatchCommand(sys, ptr, f4, f5, y, f2, f3, mmlByte);
        // 命令处理后可能修改了 f4/f5/y, 需要重新同步
        f4 = sys.mem[ptr];
        f5 = sys.mem[ptr + 1];
        y = 0;
      } else if (mmlByte >= 0xB0) {
        // $B0-$DF: 控制码 → 跳过 1 字节
        y++;
      }
      // else: $80-$AF with bit7=1 → 不应该出现（或作为特殊音符）
      // 继续循环
    }
  }
}

// ── $84C9-$84D7: 命令分派器 ──

// 命令跳转表位于 $84DA-$8519 (64 bytes = 32 entries × 2 bytes)
// 前 8 个条目在 CODE_$83F4_$84E9 尾部 ($84DA-$84E9 = 16 bytes)
// 后 24 个条目在 DATA_$84EA_$8519 ($84EA-$8519 = 48 bytes)

/** 获取命令处理器地址（从 $84DA 跳转表） */
function getCmdHandlerAddr(cmdIndex: number): number {
  // 命令索引 = 字节 & 0x1F
  const offset = 0x84DA - 0x8000 + cmdIndex * 2;
  return rom12Ptr16(offset);
}

/**
 * _dispatchCommand — 命令分派
 *
 * 对应 6502: $84C9-$84D7
 * AND #$1F; ASL A; TAX → 表偏移
 * LDA $84DA,X → STA $F6
 * LDA $84DB,X → STA $F7
 * JMP ($00F6)
 */
function _dispatchCommand(
  sys: SystemState,
  ptr: number,
  f4: number,
  f5: number,
  y: number,
  f2: number,
  f3: number,
  cmdByte: number
): void {
  const cmdIndex = cmdByte & 0x1F;
  const handlerAddr = getCmdHandlerAddr(cmdIndex);
  // handlerAddr 是 bank 12 内偏移 (0x8000-based)
  // 直接调用对应的子程序
  _execCommand(sys, ptr, f4, f5, y, f2, f3, cmdIndex, handlerAddr);
}

/**
 * 命令处理器总表执行
 *
 * 根据 handlerAddr 执行对应的命令。
 * 命令索引 -> 功能:
 *   0 ($8544): 设置波形
 *   2 ($8641): 设置包络
 *   3 ($855F): 设置音量
 *   4 ($8617): 设置 sweep
 *   5 ($8670): 设置音高偏移
 *   8 ($8578): 跳转到子序列
 *   9 ($8585): 嵌套子序列调用
 *  10 ($85AF): 子序列返回
 *  11 ($85C6): 嵌套调用变体
 *  12 ($85EF): 循环计数器递减
 *  13 ($8681): 设置效果类型
 *  15 ($8690): 清除效果
 *  18 ($851A): 静音所有通道
 *  19 ($853B): 设置效果使能
 *  20 ($8532): 清除通道效果
 *  25 ($8699): DPCM 配置 #1
 *  26 ($86B8): DPCM 配置 #2
 *  27 ($86D7): DPCM 配置 #3
 *  30 ($86F6): 内联命令字节码
 *  31 ($8655): 停止音符 (DPCM)
 *  其他 ($8707+): 短命令字节码/RTS
 */
function _execCommand(
  sys: SystemState, ptr: number, f4: number, f5: number,
  y: number, f2: number, f3: number,
  _cmdIndex: number, handlerAddr: number
): void {
  // 保存当前的 Y (当前在 ($F4),Y 中的偏移)
  // 命令处理器通常会在返回前修改 ($F0),Y 中的指针

  // ── 命令跳转分派 ──
  const cmdOff = handlerAddr - 0x8000;
  const slotIdx = f3 - 1;

  switch (cmdOff) {
    case 0x8544 - 0x8000: {
      // ── $8544: 设置波形 ──
      // LDA ($F4),Y; INY → 读波形索引
      const waveIdx = readMMLByte(sys, f4, f5, y);
      y++;
      // ASL A; TAX → 查 $8754 表
      const tblOff = 0x8754 - 0x8000 + (waveIdx << 1);
      const dutyLo = rom12(tblOff);
      const dutyHi = rom12(tblOff + 1);
      // 写入通道数据 +2/+3
      sys.mem[ptr + 2] = dutyLo;
      sys.mem[ptr + 3] = dutyHi;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8641 - 0x8000: {
      // ── $8641: 设置包络 ──
      // LDA ($F4),Y; INY → 读包络值
      const envVal = readMMLByte(sys, f4, f5, y);
      y++;
      // STA $F7 → AND #$3F → ORA → 写入 +5
      sys.mem[ptr + 5] = (sys.mem[ptr + 5] & 0x3F) | envVal;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x855F - 0x8000: {
      // ── $855F: 设置音量 ──
      // LDA ($F4),Y; INY → 读音量值
      const volVal = readMMLByte(sys, f4, f5, y);
      y++;
      if (sys.mem[0x07DF] === 0) {
        // STA $F7 → AND #$F0 | ORA $F7 → 写入 +5
        sys.mem[ptr + 5] = (sys.mem[ptr + 5] & 0xF0) | (volVal & 0x0F);
      }
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8617 - 0x8000: {
      // ── $8617: 设置 sweep 寄存器 ──
      // 设置 bit4 (sweep enable) → ORA #$10
      sys.mem[ptr + 5] = sys.mem[ptr + 5] | 0x10;
      // 计算 APU 寄存器偏移
      const apuOff = ((slotIdx ^ 7) << 2) & 0x0F;
      // LDA ($F4),Y → STA $4001,X
      const sweepVal = readMMLByte(sys, f4, f5, y);
      writeAPU(sys, 0x01 + (apuOff & 0x0C), sweepVal); // $4001, $4005
      y++;
      // 清除 sweep 重载标志
      const sweepIdx = slotIdx & 0x03;
      sys.mem[0x07E4 + sweepIdx] = 0;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8670 - 0x8000: {
      // ── $8670: 设置音高偏移 ──
      // LDA ($F4),Y; INY → 读偏移值
      const pitchVal = readMMLByte(sys, f4, f5, y);
      y++;
      // ASL A → BCS (bit7 检查)
      if (pitchVal & 0x80) {
        // bit7=1 → 清除滑音标志
        sys.mem[0x07F4 + slotIdx] = 0;
      } else {
        sys.mem[0x07F4 + slotIdx] = pitchVal & 0x7E;
      }
      // LSR A → STA $07A7,X
      sys.mem[0x07A7 + slotIdx] = pitchVal >> 1;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8681 - 0x8000: {
      // ── $8681: 设置效果类型 ──
      // LDA ($F4),Y → STA $07AF,X
      sys.mem[0x07AF + slotIdx] = readMMLByte(sys, f4, f5, y);
      // LDA #$00 → STA $07C7,X (清除效果步数)
      sys.mem[0x07C7 + slotIdx] = 0;
      y++;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8690 - 0x8000: {
      // ── $8690: 清除效果 ──
      // LDA #$00 → STA $07AF,X
      sys.mem[0x07AF + slotIdx] = 0;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x851A - 0x8000: {
      // ── $851A: 静音所有通道 ──
      sys.mem[0x07F2] = 0;
      sys.mem[0x0700] = 0;
      sys.mem[0x0701] = 0;
      sys.mem[0x0702] = 0;
      sys.mem[0x0703] = 0;
      sys.mem[0x0704] = 0;
      sys.mem[0x0705] = 0;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x853B - 0x8000: {
      // ── $853B: 设置效果使能 ──
      sys.mem[0x07EA + slotIdx] = 0x0F;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8532 - 0x8000: {
      // ── $8532: 清除通道效果 ──
      sys.mem[0x07EA + slotIdx] = 0;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8655 - 0x8000: {
      // ── $8655: 停止音符 / 停音 (DPCM) ──
      // AND #$7F → 清除 bit7
      sys.mem[0x0706] = sys.mem[0x0706] & 0x7F;
      // 写入 $30 到 APU (mute)
      const apuOff2 = ((slotIdx ^ 7) << 2) & 0x0F;
      writeAPU(sys, 0x00 + (apuOff2 & 0x0C), 0x30); // $4000, $4004, $400C
      // PLA; PLA → 清栈并返回（在 TS 中只需 return）
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x8578 - 0x8000: {
      // ── $8578: 跳转到子序列 ──
      // LDA ($F4),Y; INY → TAX (新指针 lo)
      const newPtrLo = readMMLByte(sys, f4, f5, y);
      y++;
      // LDA ($F4),Y (新指针 hi)
      const newPtrHi = readMMLByte(sys, f4, f5, y);
      // STX $F4; STA $F5 → 更新指针
      f4 = newPtrLo;
      f5 = newPtrHi;
      // LDY #$00 → 重置 Y
      y = 0;
      // 保存新指针到通道数据
      sys.mem[ptr] = f4;
      sys.mem[ptr + 1] = f5;
      break;
    }
    case 0x8585 - 0x8000: {
      // ── $8585: 嵌套子序列调用 (带返回) ──
      // LDA ($F4),Y; INY → TAX (新指针 lo)
      // LDA ($F4),Y; INY → 新指针 hi; PHA
      // TYA → PHA (保存返回地址)
      // LDY #$09 → LDA ($F0),Y → TAY (取堆栈深度)
      // → 在堆栈中保存返回地址和新指针
      const retAddrLo = readMMLByte(sys, f4, f5, y);
      y++;
      const retAddrHi = readMMLByte(sys, f4, f5, y);
      y++;

      const stackDepth = sys.mem[ptr + 9];
      const stackBase = ptr + 0x0A;

      // 保存: 返回偏移(Y) + 返回指针(f4..f5..)
      // 格式 at stack[stackDepth..]:
      //   +0: 返回偏移 lo (= Y + f4)
      //   +1: 返回偏移 hi (= f5)
      //   +2: 新指针 lo (retAddrLo)
      //   +3: 新指针 hi (retAddrHi)
      // 然后堆栈深度 += 4
      const stackOff = stackBase + stackDepth;
      const retOffLo = (f4 + y) & 0xFF;
      sys.mem[stackOff] = retOffLo;
      sys.mem[stackOff + 1] = f5;
      sys.mem[stackOff + 2] = retAddrLo;
      sys.mem[stackOff + 3] = retAddrHi;
      sys.mem[ptr + 9] = stackDepth + 4;

      // 设置新 $F4/$F5
      f4 = retAddrLo;
      f5 = retAddrHi;
      y = 0;
      sys.mem[ptr] = f4;
      sys.mem[ptr + 1] = f5;
      break;
    }
    case 0x85AF - 0x8000: {
      // ── $85AF: 从子序列返回 ──
      // LDY #$09 → LDA ($F0),Y → TAY
      const sd = sys.mem[ptr + 9];
      const sb = ptr + 0x0A;
      // INY (*3): 偏移到返回数据
      // $85B5: LDA ($F0),Y → 取返回指针 hi
      // $85B7: INY → LDA ($F0),Y → 取返回指针 lo
      const retPtrHi = sys.mem[sb + sd - 3]; // 回退 3 个位置 (_execCommand 中堆栈布局)
      const retPtrLo = sys.mem[sb + sd - 2];
      // 更新堆栈深度
      sys.mem[ptr + 9] = sd - 4;
      // 设置返回指针
      f4 = retPtrLo;
      f5 = retPtrHi;
      y = 0;
      sys.mem[ptr] = f4;
      sys.mem[ptr + 1] = f5;
      break;
    }
    case 0x85C6 - 0x8000: {
      // ── $85C6: 嵌套调用变体 ──
      // 类似 $8585 但布局不同
      const nl = readMMLByte(sys, f4, f5, y);
      y++;
      const tySaved = y;
      const sDepth = sys.mem[ptr + 9];
      const sBase = ptr + 0x0A;
      // 保存当前指针 + Y
      const offLo = (f4 + y) & 0xFF;
      sys.mem[sBase + sDepth] = offLo;
      sys.mem[sBase + sDepth + 1] = f5;
      sys.mem[sBase + sDepth + 2] = nl;
      sys.mem[sBase + sDepth + 3] = sDepth; // 特殊: 保存旧的堆栈深度
      sys.mem[ptr + 9] = sDepth + 4;
      f4 = nl;
      // f5 stays same
      y = 0;
      sys.mem[ptr] = f4;
      sys.mem[ptr + 1] = f5;
      break;
    }
    case 0x85EF - 0x8000: {
      // ── $85EF: 循环计数器递减 ──
      // STY $F6 → 保存 Y
      // LDY #$09 → LDA ($F0),Y → TAY → INY
      const cd = sys.mem[ptr + 9];
      const cb = ptr + 0x0A;
      // LDA ($F0),Y → DEC → STA ($F0),Y
      sys.mem[cb + cd + 1] = (sys.mem[cb + cd + 1] - 1) & 0xFF;
      if (sys.mem[cb + cd + 1] === 0) {
        // 计数器归零 → 跳过循环体 (前进指针)
        // $860D: INY; INY; TYA → 更新堆栈深度
        sys.mem[ptr + 9] = cd + 2;
        // 不改变 f4/f5/y（继续下一个字节）
        // 恢复 Y
        y = 0;
      } else {
        // 计数器未归零 → 重新跳转到循环体
        // $8600: INY; LDA ($F0),Y → $F5; INY; LDA ($F0),Y → $F4
        f5 = sys.mem[cb + cd + 2];
        f4 = sys.mem[cb + cd + 3];
        y = 0;
        sys.mem[ptr] = f4;
        sys.mem[ptr + 1] = f5;
      }
      break;
    }
    case 0x8699 - 0x8000: {
      // ── $8699: DPCM 配置 #1 ──
      writeAPU(sys, 0x15, 0x0F);
      if (sys.mem[0x07E8] === 0) {
        writeAPU(sys, 0x10, 0x0F);
        writeAPU(sys, 0x12, 0x00);
        writeAPU(sys, 0x13, 0x0C);
        writeAPU(sys, 0x15, 0x1F);
      }
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x86B8 - 0x8000: {
      // ── $86B8: DPCM 配置 #2 ──
      writeAPU(sys, 0x15, 0x0F);
      if (sys.mem[0x07E8] === 0) {
        writeAPU(sys, 0x10, 0x0F);
        writeAPU(sys, 0x12, 0x03);
        writeAPU(sys, 0x13, 0x20);
        writeAPU(sys, 0x15, 0x1F);
      }
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x86D7 - 0x8000: {
      // ── $86D7: DPCM 配置 #3 ──
      writeAPU(sys, 0x15, 0x0F);
      if (sys.mem[0x07E8] === 0) {
        writeAPU(sys, 0x10, 0x0F);
        writeAPU(sys, 0x12, 0x0B);
        writeAPU(sys, 0x13, 0x13);
        writeAPU(sys, 0x15, 0x1F);
      }
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    case 0x86F6 - 0x8000: {
      // ── $86F6: 内联命令字节码 ──
      // 在 DATA_$86F6_$870C 中: [B1 F4 C8 84 F6 A6 F3 CA 9D CF 07 9D D7 07 A4 F6 60 C8 60 C8 C8 C8 60]
      // 这是直接执行的内联字节码，主要操作:
      //   LDA ($F4),Y; INY; STY $F6; LDX $F3; DEX; STA $07CF,X; STA $07D7,X; LDY $F6; RTS
      // 即: 读取下一字节 → 设置包络计数器
      const envByte = readMMLByte(sys, f4, f5, y);
      y++;
      sys.mem[0x07CF + slotIdx] = envByte;
      sys.mem[0x07D7 + slotIdx] = envByte;
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
    default: {
      // 其他句柄 (指向 $8707+) → 短命令
      // $8707: INY; RTS (跳过一字节)
      // $8709: INY; INY; INY; RTS (跳过三字节)
      // 大多数是简单的 RTS
      // 最安全: 保存指针并返回
      savePtrAndReturn(sys, ptr, f4, f5, y);
      break;
    }
  }
}

// ── 辅助函数 ──

/** 保存指针到通道数据并返回 */
function savePtrAndReturn(
  _sys: SystemState, ptr: number, f4: number, f5: number, y: number
): void {
  _sys.mem[ptr] = (f4 + y) & 0xFF;
  _sys.mem[ptr + 1] = f5 + ((f4 + y) > 0xFF ? 1 : 0);
}

/** 从 MML 序列读取字节（bank 12 内数据，或通过 MMC3 映射的其他 bank 数据） */
function readMMLByte(_sys: SystemState, ptrLo: number, ptrHi: number, offset: number): number {
  // MML 数据存储在通过 MMC3 映射的 bank 中 ($8000-$BFFF)
  // bank 12 自身的数据通过 rom12() 访问
  const addr = ((ptrHi << 8) | ptrLo) + offset;
  return rom12(addr & 0x1FFF);
}

/** 更新音长计数器并返回 ($84A6-$84C8 的尾部) */
function gotoUpdateTimersAndReturn(
  sys: SystemState, ptr: number, f2: number, f3: number
): void {
  const slotIdx = f3 - 1;
  // $84A9: LDA #$00 → STA $07F4,X (清除音高滑音标志)
  sys.mem[0x07F4 + slotIdx] = 0;

  // $84AE: LDA $07EA,X → BNE $84C0 (检查效果使能)
  if (sys.mem[0x07EA + slotIdx] === 0) {
    // 无效果 → 重置序列指针
    // $84B3-$84BE
    sys.mem[0x0709 + f2] = 1;
    sys.mem[ptr + 4] = 0; // 清除序列偏移
  }

  // $84C0-$84C5: 重载音长计数器
  sys.mem[0x0707 + f2] = sys.mem[0x0708 + f2];
}

// ═════════════════════════════════════════════════
// CODE_$80E8_$8109 — 读取序列字节对
// ═════════════════════════════════════════════════
//
// 6502 流程:
//   $80E8: LDY #$02 → LDA ($F0),Y → STA $F6 (序列指针 lo)
//   $80EE: INY → LDA ($F0),Y → STA $F7 (序列指针 hi)
//   $80F3: INY → LDA ($F0),Y → PHA (当前偏移)
//   $80F7: CLC; ADC #$02 → STA ($F0),Y (偏移 +2)
//   $80FC: PLA → TAY
//   $80FE: LDA ($F6),Y → 读取序列字节 lo → STA $0709,X
//   $8103: INY → LDA ($F6),Y → 读取序列字节 hi → STA $070A,X
//
// 通道数据布局:
//   +0: 音乐指针 lo
//   +1: 音乐指针 hi
//   +2: 序列指针 lo ($F6)
//   +3: 序列指针 hi ($F7)
//   +4: 当前序列偏移

/**
 * _readNextSequenceBytes — 读取下一个序列字节对
 *
 * 对应 6502: CODE_$8000_$816C ($80E8-$8109)
 *
 * 从序列数据中读取 2 字节（音长/音量增量对），
 * 存入 $0709/$070A 作为定时器值。
 *
 * @param sys 系统状态
 * @param ptr 通道数据指针（零页绝对地址）
 * @param f2  主循环通道索引
 */
function _readNextSequenceBytes(sys: SystemState, ptr: number, f2: number): void {
  // 读取序列指针 (+2: lo, +3: hi)
  const seqPtrLo = sys.mem[ptr + 2];
  const seqPtrHi = sys.mem[ptr + 3];
  const seqAddr = (seqPtrHi << 8) | seqPtrLo;

  // 读取当前偏移 (+4)
  const curOffset = sys.mem[ptr + 4];

  // 从序列读取 2 字节 (bank 12 内 ROM 数据)
  const byteLo = rom12((seqAddr + curOffset) & 0x1FFF);
  const byteHi = rom12((seqAddr + curOffset + 1) & 0x1FFF);

  // 存入 $0709/$070A
  sys.mem[0x0709 + f2] = byteLo;
  sys.mem[0x070A + f2] = byteHi;

  // 偏移 +2
  sys.mem[ptr + 4] = (curOffset + 2) & 0xFF;
}

// ═════════════════════════════════════════════════
// CODE_$81DB_$8268 — 通道 APU 寄存器更新
// ═════════════════════════════════════════════════
//
// 6502 流程 ($81DB-$8268):
//   - 读取通道控制字节 +5 → 分离音量 nibble 和效果步数
//   - 处理音量包络递减 ($81EE-$8232)
//   - 计算最终 APU 音量 ($8233-$8243)
//   - 效果分派 ($8245-$8268)
//
// 另含 $816E-$81DA: APU 寄存器写入

/**
 * _updateChannelAPU — 更新通道 APU 寄存器
 *
 * 对应 6502: CODE_$816D_$8268 ($81DB-$8268 用于音量,
 *                              $816E-$81DA 用于 APU 写入)
 *
 * @param sys 系统状态
 * @param ptr 通道数据指针
 * @param f2  主循环通道索引
 * @param f3  槽位号 (8..1)
 */
function _updateChannelAPU(sys: SystemState, ptr: number, f2: number, f3: number): void {
  // ── $81DB-$81E9: 读取控制字节 ──
  // LDY #$05; LDA ($F0),Y; TAX
  const ctrlByte = sys.mem[ptr + 5];
  let f6 = ctrlByte & 0xF0; // 音量 nibble
  let f7: number;

  // AND #$20 → BEQ (检查 bit5: 休止/固定音量标志)
  if (ctrlByte & 0x20) {
    // bit5=1 → 固定音量 $0F
    // $81E8: LDA #$0F → STA $F7
    f7 = 0x0F;
  } else {
    // ── $81EE-$8232: 音量包络处理 ──
    // AND #$0F → STA $F7 (效果步数)
    f7 = ctrlByte & 0x0F;

    // LDY $F3; DEY → LDX $07CF,Y (包络计数器)
    const slotIdx = f3 - 1;
    let envCounter = sys.mem[0x07CF + slotIdx];

    if (envCounter !== 0) {
      // $81FB-$8200: DEX → 递减包络计数器
      envCounter = (envCounter - 1) & 0xFF;
      sys.mem[0x07CF + slotIdx] = envCounter;

      if (envCounter === 0) {
        // ── $8202-$8216: 包络到期 → 音量递增 ──
        // $8202-$8206: CLC; ADC #$01
        f7 = (f7 + 1) & 0xFF;
        // $8207: CMP #$0F → 检查是否达到最大值
        if (f7 >= 0x0F) {
          // $820D-$8214: 音量达到 $0F → 清除重载, 设置 DPCM 标志
          sys.mem[0x07D7 + slotIdx] = 0;
          sys.mem[0x07E8] = 0x80;
          f7 = 0x0F;
        }
        // $8217-$821E: 更新控制字节 → STA ($F0),Y
        const newCtrl = (ctrlByte & 0xF0) | (f7 & 0x0F);
        sys.mem[ptr + 5] = newCtrl;
      }
    } else {
      // ── $8225-$8230: 包络计数器归零 → 从重载值重新装入 ──
      const reloadVal = sys.mem[0x07D7 + slotIdx];
      if (reloadVal !== 0) {
        sys.mem[0x07CF + slotIdx] = reloadVal;
      }
    }
  }

  // ── $8233-$8243: 计算最终 APU 音量 ──
  // LDX $F2; LDA $070A,X (序列定时器 hi)
  let seqTimerHi = sys.mem[0x070A + f2];
  // SEC; SBC $F7 (减去效果步数/音量)
  seqTimerHi = seqTimerHi - f7;
  if (seqTimerHi < 0) seqTimerHi = 0;
  // ORA $F6 (结合音量 nibble)
  const finalVolume = (seqTimerHi & 0xFF) | f6;
  // LDY #$06 → STA ($F0),Y (存入通道数据 +6)
  sys.mem[ptr + 6] = finalVolume;

  // ── $816E-$81DA: 写入 APU 寄存器 ──
  _writeAPURegisters(sys, ptr, f2, finalVolume);

  // ── $8245-$8268: 效果分派 ──
  const slotIdx = f3 - 1;
  const effectType = sys.mem[0x07AF + slotIdx];
  if (effectType === 1) {
    // Type 1 效果 → $8257 分派 ($8269 跳转表)
    _dispatchEffectType1(sys, ptr, slotIdx);
  } else if (effectType === 2) {
    // Type 2 效果 → $82D2 分派 ($82E4 跳转表)
    _dispatchEffectType2(sys, ptr, slotIdx);
  }
  // else: 无效果 → RTS
}

/**
 * _writeAPURegisters — 写入 APU 寄存器
 *
 * 对应 6502: $816E-$81DA
 *
 * @param sys   系统状态
 * @param ptr   通道数据指针
 * @param f2    通道类型索引
 * @param volume APU 音量字节
 */
function _writeAPURegisters(sys: SystemState, ptr: number, f2: number, volume: number): void {
  // $816E-$8174: 计算 APU 寄存器偏移
  // LDA #$03; EOR $F2 → (3-f2); ASL*2 → X
  const apuOffset = ((3 - f2) & 0xFF) * 4;

  // $8175-$8179: 保存音量 + 通道类型
  const channelType = f2;

  // $817E-$81A4: 检查通道类型
  if (channelType === 1) {
    // 噪音/特殊通道 → AND #$0F; ORA #$80
    writeAPU(sys, apuOffset >> 2, (volume & 0x0F) | 0x80);
  } else {
    // 普通通道 → ORA #$30 → STA $4000,X
    writeAPU(sys, apuOffset >> 2, volume | 0x30);

    // $818F-$81A1: 检查 sweep 标志
    // LDA #$10; AND ($F0),Y (Y=5)
    if (!(sys.mem[ptr + 5] & 0x10)) {
      // sweep 未使能 → 写 sweep 寄存器
      const sweepVal = 0x08;
      sys.mem[0x07E4 + channelType] = sweepVal;
      writeAPU(sys, 0x01 + (apuOffset & 0x0C), sweepVal);
    }
  }

  // ── $81A7-$81DA: 写频率寄存器 ──
  // LDY #$08; LDA ($F0),Y → 频率 hi
  const freqHi = sys.mem[ptr + 8];
  // BPL → RTS (bit7=0 即无活跃音符)
  if (!(freqHi & 0x80)) return;

  // AND #$7F → 清除 bit7 → STA ($F0),Y
  sys.mem[ptr + 8] = freqHi & 0x7F;

  // 写频率 lo → $4002,X
  const freqLo = sys.mem[ptr + 7];
  writeAPU(sys, 0x02 + (apuOffset & 0x0C), freqLo);

  // 写频率 hi + 长度计数器 → $4003,X
  const freqHiForAPU = (freqHi & 0x7F) | 0x18; // length counter load
  writeAPU(sys, 0x03 + (apuOffset & 0x0C), freqHiForAPU);

  // 保存上次写入 $4003 的值 ($81CD-$81D9)
  sys.mem[0x07E0 + channelType] = freqHiForAPU;

  // 检查 sweep 重载
  if (sys.mem[0x07E4 + channelType] === 0) {
    sys.mem[0x07E0 + channelType] = 0;
  }
}

// ═════════════════════════════════════════════════
// CODE_$827D_$82E3 — Type 1 效果处理
// ═════════════════════════════════════════════════
//
// 效果类型 1 跳转表 ($8269-$827C, 10 entries × 2 bytes):
//   0: $8297 (reset)  ← arpeggio cycle position 0
//   1: $8297 (reset)  ← arpeggio cycle position 1
//   2: $82B4 (-1)
//   3: $82C9 (-2)
//   4: $82B4 (-1)
//   5: $8297 (reset)
//   6: $8297 (reset)
//   7: $827D (+1)
//   8: $8292 (+2)
//   9: $827D (+1)

/** Type 1 效果分派: arpeggio / pitch bend (±1, ±2) */
function _dispatchEffectType1(sys: SystemState, ptr: number, slotIdx: number): void {
  const step = sys.mem[0x07C7 + slotIdx];
  // 查 $8269 跳转表
  const tblBase = 0x8269 - 0x8000;
  const handler = rom12Ptr16(tblBase + step * 2);

  // 根据 handler 分派
  const off = handler - 0x8000;
  switch (off) {
    case 0x827D: { // pitch bend +1
      _effectPitchBend(sys, ptr, slotIdx, 1, 10);
      break;
    }
    case 0x8292: { // pitch bend +2
      _effectPitchBend(sys, ptr, slotIdx, 2, 10);
      break;
    }
    case 0x8297: { // reset to base freq
      sys.mem[ptr + 7] = sys.mem[0x07B7 + slotIdx];
      sys.mem[ptr + 8] = sys.mem[0x07BF + slotIdx];
      _effectIncrementStep(sys, slotIdx, 10);
      break;
    }
    case 0x82B4: { // pitch bend -1
      _effectPitchBend(sys, ptr, slotIdx, -1, 10);
      break;
    }
    case 0x82C9: { // pitch bend -2
      _effectPitchBend(sys, ptr, slotIdx, -2, 10);
      break;
    }
  }
}

// ═════════════════════════════════════════════════
// CODE_$82F4_$83F3 — Type 2 效果处理
// ═════════════════════════════════════════════════
//
// 效果类型 2 跳转表 ($82E4-$82F3, 8 entries × 2 bytes):
//   0: $830E (reset)  ← arpeggio cycle position 0
//   1: $832B (-3)
//   2: $8340 (-6)
//   3: $832B (-3)
//   4: $830E (reset)  ← arpeggio cycle position 4
//   5: $82F4 (+3)
//   6: $8309 (+6)
//   7: $82F4 (+3)

/** Type 2 效果分派: arpeggio / pitch bend (±3, ±6) */
function _dispatchEffectType2(sys: SystemState, ptr: number, slotIdx: number): void {
  const step = sys.mem[0x07C7 + slotIdx];
  // 查 $82E4 跳转表
  const tblBase = 0x82E4 - 0x8000;
  const handler = rom12Ptr16(tblBase + step * 2);

  const off = handler - 0x8000;
  switch (off) {
    case 0x82F4: { // pitch bend +3
      _effectPitchBend(sys, ptr, slotIdx, 3, 8);
      break;
    }
    case 0x8309: { // pitch bend +6
      _effectPitchBend(sys, ptr, slotIdx, 6, 8);
      break;
    }
    case 0x830E: { // reset to base freq
      sys.mem[ptr + 7] = sys.mem[0x07B7 + slotIdx];
      sys.mem[ptr + 8] = sys.mem[0x07BF + slotIdx];
      _effectIncrementStep(sys, slotIdx, 8);
      break;
    }
    case 0x832B: { // pitch bend -3
      _effectPitchBend(sys, ptr, slotIdx, -3, 8);
      break;
    }
    case 0x8340: { // pitch bend -6
      _effectPitchBend(sys, ptr, slotIdx, -6, 8);
      break;
    }
  }
}

// ═════════════════════════════════════════════════
// 效果处理辅助函数
// ═════════════════════════════════════════════════

/** 音高偏移效果 (pitch bend +/- offset) */
function _effectPitchBend(
  sys: SystemState, ptr: number, slotIdx: number,
  offset: number, cycleMax: number
): void {
  const baseLo = sys.mem[0x07B7 + slotIdx];
  const baseHi = sys.mem[0x07BF + slotIdx];

  let freqLo: number, freqHi: number;
  if (offset > 0) {
    freqLo = (baseLo + offset) & 0xFF;
    freqHi = baseHi + (freqLo < offset ? 1 : 0);
  } else {
    const absOff = -offset;
    freqLo = baseLo - absOff;
    freqHi = baseHi;
    if (freqLo < 0) {
      freqLo = freqLo + 256;
      freqHi = freqHi - 1;
    }
    // 在 6502 中，借位时: LDA freqHi; SBC #$00
    if (baseLo < absOff) freqHi--;
  }

  // 保护 hi byte 不被溢出
  freqHi = freqHi & 0xFF;
  freqLo = freqLo & 0xFF;

  sys.mem[ptr + 7] = freqLo;
  sys.mem[ptr + 8] = freqHi;
  _effectIncrementStep(sys, slotIdx, cycleMax);
}

/** 效果步数递增 (循环回绕) */
function _effectIncrementStep(sys: SystemState, slotIdx: number, cycleMax: number): void {
  let step = (sys.mem[0x07C7 + slotIdx] + 1) & 0xFF;
  if (step >= cycleMax) step = 0;
  sys.mem[0x07C7 + slotIdx] = step;
}

// ═════════════════════════════════════════════════
// CODE_$827D_$82E3 + CODE_$82F4_$83F3 — 效果处理入口
// ═════════════════════════════════════════════════
//
// 效果处理由主循环的阶段 4 调用 ($811D-$8161)。
// 每个效果槽位调用一次，使用 $816E 作为入口。

/**
 * _processEffects — 效果处理
 *
 * 对应 6502: $816E (APU 写入 + 效果分派入口)
 *
 * @param sys     系统状态
 * @param basePtr 效果槽位的通道数据指针
 * @param f2      效果循环索引 (0-2)
 */
function _processEffects(sys: SystemState, basePtr: number, f2: number): void {
  // $816E-$8174: 计算 APU 偏移
  // LDA #$03; EOR $F2; ASL*2 → TAX
  const apuOff = ((3 - f2) & 0xFF) * 4;

  // $8175-$8179: 读取音量 → PHA
  const volumeByte = sys.mem[basePtr + 6];

  // $817A-$817C: 保存通道类型
  const channelType = f2;

  // $817E-$81DA: APU 写入 (已在 _writeAPURegisters 中实现)
  // 效果处理中只更新 APU 寄存器，不改变音量计算
  if (channelType === 1) {
    writeAPU(sys, apuOff >> 2, (volumeByte & 0x0F) | 0x80);
  } else {
    writeAPU(sys, apuOff >> 2, volumeByte | 0x30);

    if (!(sys.mem[basePtr + 5] & 0x10)) {
      const sv = 0x08;
      sys.mem[0x07E4 + channelType] = sv;
      writeAPU(sys, 0x01 + (apuOff & 0x0C), sv);
    }
  }

  const freqHi = sys.mem[basePtr + 8];
  if (!(freqHi & 0x80)) return;

  sys.mem[basePtr + 8] = freqHi & 0x7F;
  writeAPU(sys, 0x02 + (apuOff & 0x0C), sys.mem[basePtr + 7]);
  writeAPU(sys, 0x03 + (apuOff & 0x0C), (freqHi & 0x7F) | 0x18);

  sys.mem[0x07E0 + channelType] = (freqHi & 0x7F) | 0x18;
  if (sys.mem[0x07E4 + channelType] === 0) {
    sys.mem[0x07E0 + channelType] = 0;
  }
}

// ═════════════════════════════════════════════════
// 公开 API — 音讯引擎入口
// ═════════════════════════════════════════════════

/**
 * 初始化音讯引擎
 *
 * 对应 6502: CODE_$851A_$86F5 ($851A-$8531) — 静音所有通道
 */
export function bank12_init(sys: SystemState): void {
  sys.mem[0x07F2] = 0;
  sys.mem[0x0700] = 0;
  sys.mem[0x0701] = 0;
  sys.mem[0x0702] = 0;
  sys.mem[0x0703] = 0;
  sys.mem[0x0704] = 0;
  sys.mem[0x0705] = 0;
  writeAPU(sys, 0x15, 0x0F); // 启用所有 APU 通道
}

/**
 * 音讯引擎帧更新入口
 * 应由 NMI handler (bank02) 每帧调用
 */
export function bank12_update(sys: SystemState): void {
  bank12_audioFrame(sys);
}

// ═════════════════════════════════════════════════
// 音乐序列/曲谱数据存取（bank 13/14/15）
// ═════════════════════════════════════════════════

/** 获取 bank-13 音乐序列数据（曲谱/MML-like 字节码） */
export { getBank13Data as bank12_getMusicSeq13 } from './bank-13-code';

/** 获取 bank-14 音乐序列数据（曲谱/MML-like 字节码） */
export { getBank14Data as bank12_getMusicSeq14 } from './bank-14-code';

/** 获取 bank-15 音乐序列数据（曲谱/MML-like 字节码） */
export { getBank15Data as bank12_getMusicSeq15 } from './bank-15-code';
