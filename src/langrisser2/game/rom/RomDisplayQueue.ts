/**
 * RomDisplayQueue — ROM 显示队列处理器 和 VDP 渲染任务调度
 *
 * 翻译自 ROM 68K 汇编 (Ghidra 反编译 + M68K 反汇编验证):
 *   - FUN_00008a6c ($8A6C): 显示队列命令处理器
 *     处理 0xFFF5-0xFFFF 范围的 VDP DMA/填充/复制命令
 *   - FUN_00009400 ($9400): 场景更新 → push 0xFFFA (CRAM DMA) 到队列
 *   - FUN_00009498 ($9498): 主任务列表迭代器
 *   - FUN_00009232 ($9232): 调色板插值 (per-color 渐近)
 *   - FUN_000093b0 ($93B0): push CRAM DMA 到显示列表
 *   - FUN_00008a20 ($8A20): 字符串/模式匹配
 *   - FUN_00008f3a ($8F3A): VDP DMA 完成等待
 *   - FUN_00008f4e ($8F4E): 控制器 DMA (CRAM 采样)
 *
 * 显示队列格式 (从 $FF81CC 开始, 每个命令可变长度):
 *   - 0xFFF5: VRAM fill        [FFF5, addr, src_ptr_hi, src_ptr_lo, count]
 *   - 0xFFF6: VRAM copy DMA    [FFF6, addr, src_ptr, ?, dma_param]
 *   - 0xFFF7: VRAM read→RAM   [FFF7, addr, dst_ptr, ?, count]
 *   - 0xFFF8: VRAM fill DMA   (变体)
 *   - 0xFFF9: VRAM DMA [FFF9, addr, src_ptr, ?, dma_param]  (ROM→VRAM)
 *   - 0xFFFA: CRAM DMA [FFFA, addr, src_ptr, ?, dma_param]
 *   - 0xFFFB: VSRAM DMA        [FFFB, addr, src_ptr, ?, dma_param]
 *   - 0xFFFC: VRAM fill single [FFFC, pattern, ?, dest_lo, dest_hi, cmd]
 *   - 0xFFFD: VSRAM fill       [FFFD, ?, ?, dest_lo, dest_hi, cmd]
 *   - 0xFFFE: VDP CTRL write   [FFFE, value]
 *   - 0xFFFF: VDP DATA write   [FFFF, value]
 *   - default: VRAM word write  [addr_ctrl, addr_hi, value]
 */

import { RomProgram, RAM_VARS } from './RomProgram';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';
import { ADDRESS_SPACE } from '../core/types';

// ============================================================
// 显示队列 RAM 地址
// ============================================================

/** 显示队列头指针 (读指针) */
const DQ_HEAD      = 0xFF81C0;
/** 显示队列写指针 (生产者更新) */
const DQ_WRITE     = 0xFF81C4;
/** 显示队列最大写位置 (调试/追踪) */
const DQ_MAX       = 0xFF81C8;
/** 显示队列命令数据起始地址 */
const DQ_DATA      = 0xFF81CC;
/** 显示队列容量上限 */
const DQ_LIMIT     = 0xFF8DCC;

/** 显示列表基址 (32 槽 × 8 dword × 4B = 128 bytes) */
const DISPLAY_LIST = 0xFFFF9422;
/** 显示列表活动标志 */
const DISPLAY_ACTIVE = 0xFFFF95AE;
/** 调色板过渡源指针 */
const PAL_SRC_PTR  = 0xFFFF941C;

/** 主任务列表基址 */
const TASK_LIST    = 0xFFFF95B8;
/** 主任务列表步长 */
const TASK_STRIDE  = 0xFFFF95B4;
/** 主任务列表计数 */
const TASK_COUNT   = 0xFFFF95B6;
/** 当前任务条目指针 */
const TASK_CURRENT = 0xFFFF95B0;

// ============================================================
// 显示队列命令常量
// ============================================================

const CMD_VRAM_FILL      = 0xFFF5;
const CMD_VRAM_COPY      = 0xFFF6;
const CMD_VRAM_READ      = 0xFFF7;
const CMD_VRAM_FILL_DMA  = 0xFFF8;
const CMD_VRAM_DMA       = 0xFFF9;
const CMD_CRAM_DMA       = 0xFFFA;
const CMD_VSRAM_DMA      = 0xFFFB;
const CMD_VRAM_FILL_SINGLE = 0xFFFC;
const CMD_VSRAM_FILL     = 0xFFFD;
const CMD_VDP_CTRL       = 0xFFFE;
const CMD_VDP_DATA       = 0xFFFF;

// ============================================================
// RomDisplayQueue
// ============================================================

export class RomDisplayQueue extends RomProgram {

  /** 处理过的命令计数 (调试) */
  cmdCount: number = 0;

  constructor(romData: Uint8Array, ram: Ram, vdp: VdpChip) {
    super(romData, ram, vdp);
  }

  // ================================================================
  // 主入口: 每帧调用 — 对应 ROM VBLANK 中 FUN_00008a6c
  // ================================================================

  /**
   * 处理显示队列中的所有待处理命令
   * 翻译自 FUN_00008a6c ($8A6C-$8F3A)
   *
   * ROM 原文流程:
   *   1. 锁 Z80 总线 (避免冲突)
   *   2. 读 $FF81C4 (写指针) → 知道有多少命令
   *   3. 遍历 $FF81CC → $FF81C4 之间的命令
   *   4. 重置 $FF81C4 = $FF81CC (清空队列)
   *   5. 释放 Z80 总线
   */
  processDisplayQueue(): void {
    const writePos = this.ram.read16(DQ_WRITE);
    if (writePos <= DQ_DATA) return; // 空队列

    // 确保写指针不越界
    if (writePos >= DQ_LIMIT) {
      console.warn(`[DisplayQueue] 写指针越界: $${writePos.toString(16)} >= $${DQ_LIMIT.toString(16)}`);
      this.ram.write16(DQ_WRITE, DQ_DATA);
      return;
    }

    // 更新最大写位置 (调试用)
    const maxPos = this.ram.read16(DQ_MAX);
    if (writePos > maxPos) {
      this.ram.write16(DQ_MAX, writePos);
    }

    // 逐命令处理
    this.cmdCount = 0;
    this._processCommands(writePos);

    // 重置写指针 = 清空队列
    this.ram.write16(DQ_WRITE, DQ_DATA);
  }

  // ================================================================
  // 命令解析器 (ROM switch 语句)
  // ================================================================

  private _processCommands(writePos: number): void {
    let readPtr = DQ_DATA; // puVar6 = &DAT_ffff81cc

    while (readPtr < writePos) {
      const cmd = this.ram.read16(readPtr);
      this.cmdCount++;

      switch (cmd) {
        case CMD_VRAM_FILL:       // $FFF5
          readPtr = this._cmdVramFill(readPtr);
          break;
        case CMD_VRAM_COPY:       // $FFF6
          readPtr = this._cmdVramCopy(readPtr);
          break;
        case CMD_VRAM_READ:       // $FFF7
          readPtr = this._cmdVramRead(readPtr);
          break;
        case CMD_VRAM_FILL_DMA:   // $FFF8
          readPtr = this._cmdVramFillDma(readPtr);
          break;
        case CMD_VRAM_DMA:        // $FFF9
          readPtr = this._cmdVramDma(readPtr);
          break;
        case CMD_CRAM_DMA:        // $FFFA
          readPtr = this._cmdCramDma(readPtr);
          break;
        case CMD_VSRAM_DMA:       // $FFFB
          readPtr = this._cmdVsramDma(readPtr);
          break;
        case CMD_VRAM_FILL_SINGLE:// $FFFC
          readPtr = this._cmdVramFillSingle(readPtr);
          break;
        case CMD_VSRAM_FILL:      // $FFFD
          readPtr = this._cmdVsramFill(readPtr);
          break;
        case CMD_VDP_CTRL:        // $FFFE
          readPtr = this._cmdVdpCtrl(readPtr);
          break;
        case CMD_VDP_DATA:        // $FFFF
          readPtr = this._cmdVdpData(readPtr);
          break;
        default:
          // 默认: VRAM word write (直接地址模式)
          readPtr = this._cmdVramDefault(readPtr, cmd);
          break;
      }
    }
  }

  // ================================================================
  // 0xFFF5: VRAM Fill — 从 ROM/RAM 数据填充 VRAM
  //
  // ROM 汇编:
  //   VDP_CTRL = R1|$10        ; set display reg
  //   VDP_CTRL = *dst+$8F00    ; set increment
  //   VDP_CTRL = *src & $3FFF  ; set VRAM addr low
  //   VDP_CTRL = *src >> 14    ; set VRAM addr hi
  //   LOOP: VDP_DATA = *data_ptr++
  // ================================================================
  private _cmdVramFill(readPtr: number): number {
    // [FFF5, dest_word, src_ptr_hi, src_ptr_lo, count]
    const destWord = this.ram.read16(readPtr + 2);
    const srcPtrHi = this.ram.read16(readPtr + 4);
    const srcPtrLo = this.ram.read16(readPtr + 6);
    const count    = this.ram.read16(readPtr + 8);

    // 源地址 = 24-bit ROM 地址 (在 RAM 中存为大端序)
    // 实际: puVar8 = puVar6+2 (src_data_ptr), puVar9 = puVar6+3 (count-1?)
    // 命令格式: [FFF5][dest_addr_lo?][src_data_ptr...][count]
    // 重新解析: addr = puVar6[1] (dest VRAM addr low 14 bits)
    //           src_data = *puVar6[2] (ROM/RAM ptr)
    //           count = puVar6[3] (word count)
    const destAddr = destWord & 0x3FFF; // 14-bit address
    const countWords = count & 0xFFFF;

    // 源数据从命令中嵌入的指针位置读取
    const srcPtr = (srcPtrHi << 16) | srcPtrLo;
    this.vdpSetVramWrite(destAddr);
    for (let i = 0; i < countWords; i++) {
      // 源数据在 68K 地址空间: 如果是 ROM 区域直接读 ROM
      let val: number;
      if (srcPtr >= 0 && srcPtr < 0x200000) {
        val = this.rom16(srcPtr + i * 2);
      } else if (srcPtr >= ADDRESS_SPACE.RAM.start) {
        val = this.ram.read16(srcPtr + i * 2);
      } else {
        val = 0;
      }
      this.vdpWriteVram(val);
    }

    return readPtr + 10; // 5 words
  }

  // ================================================================
  // 0xFFF6: VRAM Copy — DMA 从 RAM 复制到 VRAM
  //
  // ROM 汇编:
  //   VDP_CTRL = R1|$10          ; display reg + $10
  //   VDP_CTRL = $8F80           ; auto-inc = $80
  //   VDP_CTRL = $93[src_lo]     ; DMA src lo
  //   VDP_CTRL = $94[src_mid]    ; DMA src mid
  //   VDP_CTRL = $95[len_lo]     ; DMA len lo
  //   VDP_CTRL = $96[len_hi]     ; DMA len hi
  //   VDP_CTRL = $97[src_hi&7F]  ; DMA src hi
  //   VDP_CTRL = dest & $3FFF    ; VRAM dest
  //   VDP_CTRL = dest >> 14 | $80; VRAM dest hi
  //   WAIT DMA
  // ================================================================
  private _cmdVramCopy(readPtr: number): number {
    // [FFF6, dest_word, src_ptr_hi, src_ptr_lo, dma_param]
    const destWord = this.ram.read16(readPtr + 2);
    const srcPtrHi = this.ram.read16(readPtr + 4);
    const srcPtrLo = this.ram.read16(readPtr + 6);
    // dma_param at readPtr+8

    const srcPtr = (srcPtrHi << 16) | srcPtrLo;
    const destAddr = destWord & 0x3FFF;

    // 命令中嵌入 DMA 参数: length 在 $95/$96 寄存器, src 在 $93/$94/$97
    // 简化: 从 RAM 指针逐 word 复制
    if (srcPtr >= ADDRESS_SPACE.RAM.start) {
      // 计算长度: 从 dma_param 或从队列文本
      const dmaParam = this.ram.read16(readPtr + 8);
      const lenWords = dmaParam & 0x7FF; // guess
      this.vdpDmaRamToVram(srcPtr, lenWords, destAddr);
    }

    return readPtr + 10; // 5 words
  }

  // ================================================================
  // 0xFFF7: VRAM Read → RAM
  //
  // ROM 汇编:
  //   VDP_CTRL = $8F02           ; auto-inc = 2
  //   VDP_CTRL = src & $3FFF     ; set VRAM read addr
  //   VDP_CTRL = src >> 14       ;
  //   LOOP: *dst++ = VDP_DATA
  // ================================================================
  private _cmdVramRead(readPtr: number): number {
    // [FFF7, src_word, dst_ptr_hi, dst_ptr_lo, count]
    const srcWord  = this.ram.read16(readPtr + 2);
    const dstPtrHi = this.ram.read16(readPtr + 4);
    const dstPtrLo = this.ram.read16(readPtr + 6);
    const count    = this.ram.read16(readPtr + 8);

    const srcAddr = srcWord & 0x3FFF;
    const dstPtr = (dstPtrHi << 16) | dstPtrLo;
    const countWords = count & 0xFFFF;

    this.vdpSetVramRead(srcAddr);
    this.vdpReadVramBlock(dstPtr, countWords);

    return readPtr + 10; // 5 words
  }

  // ================================================================
  // 0xFFF8: VRAM Fill DMA — 类似 FFF6 但源固定
  // ================================================================
  private _cmdVramFillDma(readPtr: number): number {
    // [FFF8, dest_word, pattern_ptr_hi, pattern_ptr_lo, count]
    const destWord = this.ram.read16(readPtr + 2);
    const patternHi = this.ram.read16(readPtr + 4);
    const patternLo = this.ram.read16(readPtr + 6);
    const count     = this.ram.read16(readPtr + 8);

    const destAddr = destWord & 0x3FFF;
    const pattern = (patternHi << 16) | patternLo;
    const countWords = count & 0xFFFF;

    this.vdpSetVramWrite(destAddr);
    for (let i = 0; i < countWords; i++) {
      this.vdpWriteVram(pattern & 0xFFFF);
    }

    return readPtr + 10;
  }

  // ================================================================
  // 0xFFF9: VRAM DMA — ROM/RAM → VRAM (与 FFF6/F稿类似)
  //
  // ROM 汇编:
  //   VDP_CTRL = R1|$10
  //   VDP_CTRL = $8F02           ; auto-inc = 2
  //   VDP_CTRL = $93[extra]      ; DMA src setup
  //   VDP_CTRL = $94[extra]      ;
  //   VDP_CTRL = $95[len_lo]     ;
  //   VDP_CTRL = $96[len_hi]     ;
  //   VDP_CTRL = $97[src_hi&7F]  ;
  //   VDP_CTRL = dest & $3FFF    ;
  //   VDP_CTRL = dest>>14 | $80  ;
  //   WAIT DMA;
  //   Ram00c00004 = ...           ; trigger DMA
  // ================================================================
  private _cmdVramDma(readPtr: number): number {
    // [FFF9, dest_word, src_ptr_hi, src_ptr_lo, dma_param]
    const destWord = this.ram.read16(readPtr + 2);
    const srcPtrHi = this.ram.read16(readPtr + 4);
    const srcPtrLo = this.ram.read16(readPtr + 6);
    const dmaParam = this.ram.read16(readPtr + 8);

    const srcPtr = (srcPtrHi << 16) | srcPtrLo;
    const destAddr = destWord & 0x3FFF;
    // VDP DMA 长度寄存器 ($95/$96) 直接保存 word count
    let lenWords = dmaParam & 0xFFFF;

    // 源在 ROM → 从 ROM 拷贝到 VRAM
    if (srcPtr >= 0 && srcPtr < 0x200000 && lenWords > 0 && lenWords < 0x10000) {
      this.vdpDmaRomToVram(srcPtr & 0x1FFFFF, lenWords, destAddr);
    } else if (srcPtr >= ADDRESS_SPACE.RAM.start) {
      // 源在 RAM (解压缓冲区)
      this.vdpDmaRamToVram(srcPtr, lenWords, destAddr);
    }

    return readPtr + 10; // 5 words
  }

  // ================================================================
  // 0xFFFA: CRAM DMA — RAM → CRAM (调色板传输)
  //
  // ROM 汇编:
  //   VDP_CTRL = R1|$10
  //   VDP_CTRL = $8F02
  //   VDP_CTRL = $93[extra]
  //   VDP_CTRL = $94[extra]
  //   VDP_CTRL = $95[len_lo]
  //   VDP_CTRL = $96[len_hi]
  //   VDP_CTRL = $97[src_hi&7F]
  //   VDP_CTRL = dest | $C000      ; CRAM 写 (CD=11)
  //   VDP_CTRL = dest>>14 | $80    ;
  //   WAIT DMA;
  //   Ram00c00004 = (dest, dest>>14) | $C0000000  ; CRAM DMA trigger
  // ================================================================
  private _cmdCramDma(readPtr: number): number {
    // [FFFA, dest_word, src_ptr_hi, src_ptr_lo, dma_param]
    const destWord = this.ram.read16(readPtr + 2);
    const srcPtrHi = this.ram.read16(readPtr + 4);
    const srcPtrLo = this.ram.read16(readPtr + 6);
    const dmaParam = this.ram.read16(readPtr + 8);

    const srcPtr = (srcPtrHi << 16) | srcPtrLo;
    // dest uses word address in CRAM: cramAddr = destWord / 2
    const cramAddr = (destWord & 0x7E) >> 1;
    let lenWords = (dmaParam >> 1) & 0x7FF;

    if (srcPtr >= ADDRESS_SPACE.RAM.start && lenWords > 0) {
      this.vdpSetCramWrite(cramAddr * 2);
      this.vdpWriteCramBlock(srcPtr, lenWords);
    }

    return readPtr + 10; // 5 words
  }

  // ================================================================
  // 0xFFFB: VSRAM DMA — RAM → VSRAM
  //
  // ROM 汇编:
  //   类似 CRAM DMA, 但目标地址使用 $4000|$0010 模式
  //   CD=01, bit13=1 → VSRAM write
  // ================================================================
  private _cmdVsramDma(readPtr: number): number {
    // [FFFB, dest_word, src_ptr_hi, src_ptr_lo, dma_param]
    const destWord = this.ram.read16(readPtr + 2);
    const srcPtrHi = this.ram.read16(readPtr + 4);
    const srcPtrLo = this.ram.read16(readPtr + 6);
    const dmaParam = this.ram.read16(readPtr + 8);

    const srcPtr = (srcPtrHi << 16) | srcPtrLo;
    const vsramAddr = destWord & 0x7F;
    let lenWords = (dmaParam >> 1) & 0x7FF;

    if (srcPtr >= ADDRESS_SPACE.RAM.start && lenWords > 0) {
      this.vdpSetVsramWrite(vsramAddr);
      this.vdpDmaRamToVsram(srcPtr, lenWords);
    }

    return readPtr + 10;
  }

  // ================================================================
  // 0xFFFC: VRAM Fill Single — 单个 pattern 填充 VRAM
  //
  // ROM 汇编:
  //   VDP_CTRL = R1|$10
  //   VDP_CTRL = pattern & $8F00   ; auto-inc = pattern lo?
  //   VDP_CTRL = dest_lo | $9300
  //   VDP_CTRL = dest_hi | $9400
  //   VDP_CTRL = $9780             ; DMA src hi = $80 (ROM)
  //   VDP_CTRL = cmd & $3FFF
  //   VDP_CTRL = cmd>>14 | $80
  //   VDP_DATA = fill_value
  //   WAIT DMA
  // ================================================================
  private _cmdVramFillSingle(readPtr: number): number {
    // [FFFC, fill_value, ?, dest_lo, dest_hi, cmd_word]
    const fillValue = this.ram.read16(readPtr + 2);
    const destLo = this.ram.read16(readPtr + 6);
    const destHi = this.ram.read16(readPtr + 8);

    // dest_lo&FF | dest_hi<<8 → full 16-bit VRAM address
    // 简化: 设 VRAM 地址, 写值
    const vramAddr = ((destHi & 0xFF) << 8) | (destLo & 0xFF);
    this.vdpWriteVramAt(vramAddr & 0xFFFF, fillValue);

    return readPtr + 10;
  }

  // ================================================================
  // 0xFFFD: VSRAM Fill
  // ================================================================
  private _cmdVsramFill(readPtr: number): number {
    // [FFFD, ?, ?, dest_lo, dest_hi, cmd_word]
    const destLo = this.ram.read16(readPtr + 6);
    const destHi = this.ram.read16(readPtr + 8);
    const cmdWord = this.ram.read16(readPtr + 10);

    const vsramAddr = ((destHi & 0xFF) << 8) | (destLo & 0xFF);
    this.vdpSetVsramWrite(vsramAddr & 0x7F);
    this.vdpWriteVsram(cmdWord);

    return readPtr + 12;
  }

  // ================================================================
  // 0xFFFE: VDP CTRL Write — 直接写 VDP 控制端口
  // ================================================================
  private _cmdVdpCtrl(readPtr: number): number {
    const value = this.ram.read16(readPtr + 2);
    this.vdp.ports.write(0xC00004, value);
    return readPtr + 4; // 2 words
  }

  // ================================================================
  // 0xFFFF: VDP DATA Write — 直接写 VDP 数据端口
  // ================================================================
  private _cmdVdpData(readPtr: number): number {
    const value = this.ram.read16(readPtr + 2);
    this.vdp.ports.write(0xC00000, value);
    return readPtr + 4; // 2 words
  }

  // ================================================================
  // DEFAULT: VRAM Word Write (地址在 cmd 本身)
  //
  // ROM 汇编:
  //   VDP_CTRL = cmd & $3FFF | $4000   ; VRAM write addr
  //   VDP_CTRL = cmd >> 14             ; addr hi bits
  //   VDP_DATA = next_word             ; data
  // ================================================================
  private _cmdVramDefault(readPtr: number, cmd: number): number {
    const data = this.ram.read16(readPtr + 2);
    const addr = cmd & 0x3FFF;
    this.vdpWriteVramAt(addr, data);
    return readPtr + 4; // 2 words
  }

  // ================================================================
  // FUN_00009400: 场景更新 — push CRAM DMA 命令到显示队列
  //
  // ROM 原文:
  //   *DAT_ffff81c4 = 0xFFFA;
  //   DAT_ffff81c4[1] = 0;            // CRAM 起始地址 = palette 0
  //   *(DAT_ffff81c4 + 2) = &DAT_ffff9422;  // 源 = 显示列表
  //   DAT_ffff81c4[4] = 0x40;         // 长度 = 64 words (128 bytes = 全 CRAM)
  //   DAT_ffff81c4 += 5;              // 前进写指针
  //   DAT_ffff95ae = 0;               // 清活动标志
  // ================================================================
  pushSceneCramUpdate(): void {
    let wPtr = this.ram.read16(DQ_WRITE);
    if (wPtr < DQ_DATA) wPtr = DQ_DATA;
    if (wPtr + 20 > DQ_LIMIT) {
      console.warn('[DisplayQueue] pushSceneCramUpdate: 队列满, 强制处理');
      this.processDisplayQueue();
      wPtr = this.ram.read16(DQ_WRITE);
    }

    // 命令: 0xFFFA, 0, *DISPLAY_LIST, 0, 0x40
    this.ram.write16(wPtr + 0,  CMD_CRAM_DMA);      // cmd
    this.ram.write16(wPtr + 2,  0);                  // dest = CRAM $00
    this.ram.write32(wPtr + 4,  DISPLAY_LIST);       // src ptr (32-bit)
    this.ram.write16(wPtr + 8,  0x40);               // count = 64 words (全 CRAM)
    this.ram.write16(wPtr + 10, 0x40);               // dma_param

    wPtr += 12; // 6 words for CRAM DMA command

    this.ram.write16(DQ_WRITE, wPtr);
    this.ram.write16(DISPLAY_ACTIVE, 0); // 清除活动标志
  }

  // ================================================================
  // FUN_000093b0: push CRAM DMA 命令 (通用)
  //
  // ROM 原文:
  //   FUN_0000955c(); // remove old entries
  //   *writePtr = 0x450;  // wait, this is different...
  //   *(writePtr+1) = srcPtr;
  //   writePtr[3] = param;
  //   writePtr[4] = D0;
  //   writePtr[5] = D0;
  //   writePtr[6] = D1;
  // ================================================================
  pushCramDmaCommand(srcRam: number, cramDest: number, countWords: number, extraParam: number): void {
    let wPtr = this.ram.read16(DQ_WRITE);
    if (wPtr + 14 > DQ_LIMIT) {
      this.processDisplayQueue();
      wPtr = this.ram.read16(DQ_WRITE);
    }

    this.ram.write16(wPtr + 0,  CMD_CRAM_DMA);
    this.ram.write16(wPtr + 2,  cramDest & 0x7E);
    this.ram.write32(wPtr + 4,  srcRam);
    this.ram.write16(wPtr + 8,  countWords);
    this.ram.write16(wPtr + 10, extraParam);

    wPtr += 12; // 6 words
    this.ram.write16(DQ_WRITE, wPtr);
  }

  // ================================================================
  // FUN_00009498: 主任务列表迭代器
  //
  // ROM 原文:
  //   psVar1 = &DAT_ffff95b8 + D0;    // 列表起始 + offset
  //   DAT_ffff95b4 = D1;              // 步长
  //   DAT_ffff95b6 = D2;              // 计数
  //   do {
  //     DAT_ffff95b0 = psVar1;        // 当前条目指针
  //     if (*psVar1 != 0) {
  //       (*psVar1)();                // 调用任务
  //     }
  //     psVar1 = psVar1 + stride;     // 下一条目
  //     count--;
  //   } while (count != 0);
  //
  // 这是一个回调驱动函数。在 ROM 中, 任务函数是 68K 代码。
  // 在 TS 中, 我们使用回调数组。
  // ================================================================
  iterateTaskList(
    offset: number,
    stride: number,
    count: number,
    callbacks: Array<(() => void) | null>,
  ): void {
    this.ram.write16(TASK_STRIDE, stride);
    this.ram.write16(TASK_COUNT, count);

    let entryPtr = TASK_LIST + offset;
    for (let i = 0; i < count && i < callbacks.length; i++) {
      this.ram.write32(TASK_CURRENT, entryPtr);

      const cb = callbacks[i];
      if (cb) {
        // 写任务地址到当前条目 (模拟 ROM 中的任务指针)
        this.ram.write16(entryPtr, 1); // 标记活跃
        cb();
      } else {
        this.ram.write16(entryPtr, 0); // 标记空闲
      }

      entryPtr += stride;
    }

    // 循环结束后清空计数 (ROM 中的 dbf 效果)
    this.ram.write16(TASK_COUNT, 0);
  }

  // ================================================================
  // FUN_00009232: 调色板插值 (per-color 渐近过渡)
  //
  // ROM 原文:
  //   对显示列表槽位中的 16 个颜色, 逐通道 (RGB 各 3 bit) 向目标颜色过渡
  //   - 红色通道: bits 1-3 (mask 0x0E)
  //   - 绿色通道: bits 5-7 (mask 0xE0)
  //   - 蓝色通道: bits 9-11 (mask 0xE00)
  //   每通道每次最多变化 1 步 (2 on the scale)
  // ================================================================
  paletteInterpolate(slotIndex: number, targetPalRam: number, changeMask: number): boolean {
    const slotAddr = DISPLAY_LIST + slotIndex * 32; // 32 bytes = 8 dwords per slot
    let anyChanged = false;

    for (let ci = 0; ci < 16; ci++) {
      const bit = 15 - ci;
      if ((changeMask & (1 << bit)) === 0) continue;

      const current = this.ram.read16(slotAddr + ci * 2);
      const target  = this.ram.read16(targetPalRam + ci * 2);
      if (current === target) continue;

      // 逐通道过渡 (每个通道 3 bits, step = 0x02)
      let red   = current & 0x000E;
      let green = current & 0x00E0;
      let blue  = current & 0x0E00;

      const tRed   = target & 0x000E;
      const tGreen = target & 0x00E0;
      const tBlue  = target & 0x0E00;

      if (red !== tRed) {
        red = (red < tRed) ? (red + 2) : (red - 2);
      }
      if (green !== tGreen) {
        green = (green < tGreen) ? (green + 0x20) : (green - 0x20);
      }
      if (blue !== tBlue) {
        blue = (blue < tBlue) ? (blue + 0x200) : (blue - 0x200);
      }

      const newColor = red | green | blue;
      if (newColor !== current) {
        anyChanged = true;
        this.ram.write16(slotAddr + ci * 2, newColor);
      }
    }

    if (anyChanged) {
      this.ram.write16(DISPLAY_ACTIVE, 0x0001);
    }
    return anyChanged;
  }

  // ================================================================
  // FUN_000092e6: 调色板淡入淡出驱动
  //
  // ROM 原文:
  //   递减延迟计数器, 每次到期时调用 FUN_00009232
  //   根据标志切换两个调色板源之间交替
  // ================================================================
  paletteFadeDriver(
    stateRam: number,  // 指向 {flags, delay, ...} 结构的 RAM 地址
    palA: number,      // 调色板 A 地址
    palB: number,      // 调色板 B 地址
    slotIndex: number, // 显示列表槽位
    delayInit: number, // 延迟初始值
    extraDelay: number, // 额外延迟
    changeMask: number, // 变化掩码
  ): boolean {
    const delay = this.ram.read8(stateRam + 1);

    if (delay === 0) {
      // 重新加载延迟
      this.ram.write8(stateRam + 1, delayInit & 0xFF);

      const useB = (this.ram.read8(stateRam) & 1) !== 0;
      const srcPal = useB ? palB : palA;
      this.ram.write32(PAL_SRC_PTR, srcPal);

      const changed = this.paletteInterpolate(slotIndex, srcPal, changeMask);
      if (!changed) {
        // 没有更多变化 → 切换标志 + 增加延迟
        this.ram.write8(stateRam + 1, (delayInit + extraDelay) & 0xFF);
        this.ram.write8(stateRam, this.ram.read8(stateRam) ^ 1);
      }
      return changed;
    } else {
      this.ram.write8(stateRam + 1, delay - 1);
      this.ram.write16(DISPLAY_ACTIVE, 0x0001);
      return false;
    }
  }

  // ================================================================
  // FUN_00008a20: 字符串/序列匹配
  //
  // ROM 原文:
  //   sVar1 = *A0 - 1;              // count = first word
  //   psVar2 = A0 + 1;              // src data ptr
  //   pcVar3 = &DAT_ffff8188 + (0x20 - *A0);  // dest in RAM
  //   do {
  //     if (*pcVar3 != *(char*)psVar2) return;
  //     sVar1--;
  //     psVar2++;
  //     pcVar3++;
  //   } while (sVar1 != -1);
  // ================================================================
  sequenceMatch(romDataPtr: number, ramPatternAddr: number, count?: number): boolean {
    const actualCount = count ?? this.rom16(romDataPtr);
    let srcOff = romDataPtr + 2;
    let dstOff = ramPatternAddr + (0x20 - actualCount);

    for (let i = 0; i < actualCount; i++) {
      const romByte = this.rom8(srcOff);
      const ramByte = this.ram.read8(dstOff);
      if (romByte !== ramByte) return false;
      srcOff++;
      dstOff++;
    }
    return true;
  }

  // ================================================================
  // FUN_0000942a: 任务列表结构清零
  // (用于 RomInits 和任务重初始化)
  // ================================================================
  clearTaskLists(): void {
    // 区域1: $FF95B8-$FF95E1 (1 entry × $2A = 42 bytes)
    for (let addr = 0xFF95B8; addr <= 0xFF95E1; addr += 0x2A) {
      this.ram.write16(addr, 0);
    }
    // 区域2: $FF95E2-$FF9B61 (64 entries × $16)
    for (let addr = 0xFF95E2; addr <= 0xFF9B61; addr += 0x16) {
      this.ram.write16(addr, 0);
    }
    // 区域3: $FF9B62-$FF9CC1 (16 entries × $16)
    for (let addr = 0xFF9B62; addr <= 0xFF9CC1; addr += 0x16) {
      this.ram.write16(addr, 0);
    }
    // 区域4: $FF9CC2-$FF9CEF (1 entry × $2E)
    for (let addr = 0xFF9CC2; addr <= 0xFF9CEF; addr += 0x2E) {
      this.ram.write16(addr, 0);
    }
    // 区域5: $FF9CF0-$FFA61B (16 entries × $22)
    for (let addr = 0xFF9CF0; addr <= 0xFFA61B; addr += 0x22) {
      this.ram.write16(addr, 0);
    }
  }

  // ================================================================
  // 工具: 检查显示队列是否为非空
  // ================================================================
  get hasPendingCommands(): boolean {
    return this.ram.read16(DQ_WRITE) > DQ_DATA;
  }

  // ================================================================
  // 工具: 获取队列当前状态
  // ================================================================
  dumpQueueState(): string {
    const wPtr = this.ram.read16(DQ_WRITE);
    const mPtr = this.ram.read16(DQ_MAX);
    const pending = wPtr > DQ_DATA ? wPtr - DQ_DATA : 0;
    return `DQ: write=$${wPtr.toString(16)} max=$${mPtr.toString(16)} pending=${pending}B cmds=${this.cmdCount}`;
  }
}
