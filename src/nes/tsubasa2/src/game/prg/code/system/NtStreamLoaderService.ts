/**
 * NtStreamLoaderService — bank00 $82ED-$83A2 NT stream loader 翻译
 *
 * 翻译原则（v2）：
 *   - 不模拟 STA $B800,X 或 MMC3 bank 切换
 *   - 用 byte-stream parser 直接读 source bytes
 *   - 通过 PpuTransferService.writePpuBuffer 写 NT 缓冲
 *
 * 对应 PRG 段（docs/BANK00_ANALYSIS.md §2.1）：
 *   $82ED: NT stream loader 入口
 *   $82F0-$8381: parser 主循环（parseEntry: $E9/$EA/$EB/$EC/$ED/$EE work ptrs + 字节流）
 *   $838A: scene bank select helper (LDX #$02/JSR $C4B9/JSR $A215/LDX #$06/JSR $C4B9)
 *   $8464: PPU transfer cfg loader（由 PpuTransferService 单独承接）
 *   $8464-$8879: 32-op-code byte stream 解释器
 *
 * 数据表：
 *   $8398: 32-byte scene index → CHR bank 索引映射
 *   $83BA: 32-byte scene code → display cmd 映射
 *   $83DC-$8462: 多个 32-byte 表
 *
 * P2 重要：scene 流数据装载是开场/比赛的 NT 写入基础
 */
import type { DataStore } from '../../data/store/DataStore';
import { PpuTransferService } from './PpuTransferService';

/**
 * NT stream entry — 一条解析后的 NT cell 描述
 * - ptrLo/ptrHi: source PRG 指针
 * - count: 字节数
 * - paletteHi: 高 4-bit palette 字节（背景色）
 * - paletteLo: 低 4-bit palette 字节（前景色）
 */
export interface NtStreamEntry {
  ptrLo: number;
  ptrHi: number;
  count: number;
  paletteHi: number;
  paletteLo: number;
}

/**
 * Byte code stream 命令（PRG $84C6+ op-codes 翻译）
 * - 0..31: 32 个 op-code handlers（PRG $853C jump table）
 * - 0xD8..0xDF: 特殊 handler（PRG $8AE6 table）
 * - 0xE0: frame 结束
 * - 0xFC: row 结束
 * - 0xFE/0xFF: 终止符
 */
export type ByteCodeOp = number;

export class NtStreamLoaderService {
  constructor(
    readonly store: DataStore,
    private readonly ppu: PpuTransferService | null = null,
  ) {}

  // ──────────────────────── $82ED NT stream loader ────────────────────────

  /**
   * NT 流装载入口（PRG $82ED-$8381 翻译）。
   *
   * ROM 行为链：
   *   1. JSR $838A（scene bank select helper）
   *   2. LDA $004C / BPL back（= wait $4C >= 0）
   *   3. ASL / TAX / LDA $B800,X / STA $EC / LDA $B801,X / STA $ED
   *      = load ptr to bank24 stream
   *   4. Y=0 起 LDA ($EC),Y parse — high bit = $00 单 tile path，else 多 tile
   *
   * H5 语义：parseSceneStream 接收源字节流 → 输出 NtStreamEntry[] 数组
   *
   * @param cfgId cfg id (用于查 cfg table)
   * @returns 解析出的 entry 数组（空表示无数据）
   */
  parseSceneStream(cfgId: number): NtStreamEntry[] {
    if (!this.ppu) return [];
    // 先解析 cfg (复用 PpuTransferService)
    const cfg = this.ppu.resolveSceneCfg(cfgId);
    if (!cfg) return [];
    // 模拟 bank24 ($B800-$BFFF) stream — H5 用 RAM stub (穷尽 64 字节)
    const entries: NtStreamEntry[] = [];
    let y = 0;
    while (y < 64) {
      const b = this.store.readByte(((cfg.ptrHi & 0xff) << 8 | (cfg.ptrLo & 0xff)) + y) & 0xff;
      y++;
      if (b === 0xff || b === 0xfe) break;
      if (b === 0xe0) break; // frame terminator
      // 单 tile path: entry = (b, count)
      const count = this.store.readByte(0x062a + y) & 0xff;
      y++;
      entries.push({
        ptrLo: cfg.ptrLo,
        ptrHi: cfg.ptrHi,
        count: count & 0x3f,
        paletteHi: b & 0xf0,
        paletteLo: b & 0x0f,
      });
      y += count; // advance by count
    }
    return entries;
  }

  // ──────────────────────── $838A scene bank select helper ────────────────────────

  /**
   * 场景银行选择器（PRG $838A 翻译占位）。
   *
   * ROM 行为：选 bank24 ($B800-$BFFF) → 调 $A215 → 选 bank6
   *
   * H5 语义：占位 — 实际由调用方提供 source byte stream
   */
  selectSceneBank(): void {
    // H5 占位：选 bank2 / bank24 / bank6 等操作已由 BootRouter 接管
    // 本方法保留接口以备未来扩展
  }

  // ──────────────────────── $8464 byte-stream interpreter (32 op-codes) ────────────────────────

  /**
   * 字节流解释器主入口（PRG $84C6+ 32 op-codes 翻译占位）。
   *
   * ROM 行为：从 ($4D,$4E) ptr 起读字节，按 $853C jump table 派发 32 个 handler
   *
   * 32 op-code 部分（已抽样的 handler）：
   *   $8574: random palette update
   *   $8580: SPR palette load
   *   $858D: clear all sprites + load BG palette
   *   $85C4: scene render inner (调 $899A + $89A3 + $88B1)
   *   $85D2: load special bytes
   *   $85EC: scheduler palette bg/spr
   *   $8604: NT buffer fill
   *   $8618: palette toggle bit 7
   *   $862C: 4-byte copy ($4D-$4E → $4F/$50, advance ptr)
   *   $864A: NT buffer fill (alt)
   *   $8673: 2-byte lookup tbl
   *   $8678: $55 argument
   *   $8682: scene row buffer
   *   $868D: sub-dispatch
   *   $86F6: 4-iter NT stream pointer loop
   *   $8713: 4-iter ascending
   *   $8734: OAM reset
   *   $8766: scene 2 special
   *   $87B8: increment $+1 = FF → set $4C=0x80
   *   $87CB: special bytes (调 $899A + $9FA8)
   *   $87D9: scheduler cmd toggle
   *   $87E5: scheduler reset
   *   $87F8: $ED = Y / $EC = (Y+1) → 调 PpuTransferService.loadCfgBlock
   *   $8814: flag toggle $5B
   *   $8821: scene flag
   *   $8831: tile constructor
   *   $8837: scene loop
   *   $8855: scene render 2
   *   $8862: advance ptr ($4D+=2)
   *   $8870: clear ptr (= reset all)
   *   $8879: $4D += stream byte / $4E += carry
   *
   * H5 语义：占位实现 — 实际 op-codes 由 SceneController 在 onUpdate 中按需派发
   */
  runByteCode(_bytecode: ReadonlyArray<number>): void {
    // TODO(B0-5.1): 实现 32 个 op-code handler
    // 1. 查找 jump table [$853C] + 9 trailer
    // 2. iterate bytecode: each byte → ASL TAX → LDA $853C,X PHA / LDA $853D,X PHA / RTS
    // 3. handler 调具体 scene 操作
    void _bytecode;
  }

  // ──────────────────────── 应用 entry 到 NT buffer ────────────────────────

  /**
   * 应用 entry 集合到 NT buffer（PRG $8464+$82F0 翻译聚合）。
   *
   * @param entries 已解析 entry 数组
   * @returns 写入总数
   */
  applyEntries(entries: ReadonlyArray<NtStreamEntry>): number {
    if (!this.ppu) return 0;
    let total = 0;
    for (const e of entries) {
      this.ppu.writePpuBuffer(e.ptrLo, e.ptrHi, e.count);
      total += e.count;
    }
    return total;
  }
}
