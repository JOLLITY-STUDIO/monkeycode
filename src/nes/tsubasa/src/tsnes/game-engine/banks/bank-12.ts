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
 *   - 消费 bank 15（音乐序列数据），输出到 APU 寄存器 ($4000-$4015)
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
 *   ✅ 注册 — registerBankRom(12)
 *   ✅ 数据表访问工具 — 音符频率、乐器定义、波形等
 *   🔄 6502 代码翻译 — CODE_$8000_$816C（主更新循环）基础框架
 *   ⏳ 其余 CODE 段翻译 — 待完成
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_12_audio.ts
 */

import {
  SystemState,
  writeMem,
} from './system-state';
import { registerBankRom } from './system-state';
import { PRG_BANK_12 } from './bank-12-data';

// 注册 ROM 数据
registerBankRom(12, new Uint8Array(PRG_BANK_12));

// ═════════════════════════════════════════════════
// ROM 数据访问工具
// ═════════════════════════════════════════════════

/** ROM 数据直接访问 */
function rom12(offset: number): number {
  return PRG_BANK_12[offset & 0x1FFF] ?? 0;
}

/** 读取 16-bit little-endian 指针 */
function rom12Ptr16(offset: number): number {
  return rom12(offset) | (rom12(offset + 1) << 8);
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
      const ptr = f0_base + f2;

      // 检查 $0707（音长计数器）— 递减并检查是否到期
      const timerAddr = 0x0707 + f2;
      sys.mem[timerAddr] = (sys.mem[timerAddr] - 1) & 0xFF;
      if (sys.mem[timerAddr] !== 0) {
        // 音长计数器未到期，跳过音符读取
      } else {
        _readNextNote(sys, f2);
      }

      // 检查 $0709（序列指针）— 递减并检查是否到期
      const seqAddr = 0x0709 + f2;
      sys.mem[seqAddr] = (sys.mem[seqAddr] - 1) & 0xFF;
      if (sys.mem[seqAddr] !== 0) {
        // 序列指针未到期，跳过
      } else {
        _readNextSequenceBytes(sys, ptr, f2);
      }

      // 更新 APU 寄存器
      _updateChannelAPU(sys, f2, ptr);

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

/**
 * _readNextNote — 从 MML 序列读取下一个音符/命令
 *
 * 对应 6502: CODE_$82F4_$83F3 ($83CB-$83F3) + CODE_$83F4_$84E9 ($83F4-$84C8)
 *
 * @param sys 系统状态
 * @param f2 通道索引
 */
function _readNextNote(sys: SystemState, f2: number): void {
  // TODO: 完整翻译 MML 解析器
  // 这是音讯引擎的核心部分 —— 解析 MML 字节流并转换为 APU 寄存器写入。
  //
  // 主要处理的字节码范围:
  //   $00-$AF: 音符/休止符 (bit7=0)
  //   $B0-$DF: 控制码（跳过模式）
  //   $E0-$FF: 命令码（E0=换通道, E2=换音量, E3=换乐器, EB/EC=重复,
  //            ED=时值, E8=跳转表, F3/F4=连音线, EF=终止等）
  //
  // 实现待完成。当前保留原始逻辑通过 CPU 模拟器路径执行。
}

/** 读取下一个序列字节对 (处理 $0709/$070A 到期) */
function _readNextSequenceBytes(sys: SystemState, ptr: number, f2: number): void {
  // TODO: 实现 CODE_$8000_$816C 中的 $80E8-$8109 段
  // 从音乐指针读取 2 字节（序列增量），更新 $0709/$070A
}

/** 更新通道 APU 寄存器 */
function _updateChannelAPU(sys: SystemState, f2: number, ptr: number): void {
  // TODO: 实现 CODE_$816D_$8268 段
  // 写入 $4000-$4003（音量/duty/频率/长度）
}

/** 效果处理 */
function _processEffects(sys: SystemState, basePtr: number, f2: number): void {
  // TODO: 实现 CODE_$816D_$8268 + CODE_$827D_$82E3 段
  // 处理 arpeggio 和 pitch bend 效果
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

/**
 * 获取 ROM 数据的原始引用（供外部 bank 通过 MMC3 映射访问）
 */
export function getBank12Data(): readonly number[] {
  return PRG_BANK_12;
}
