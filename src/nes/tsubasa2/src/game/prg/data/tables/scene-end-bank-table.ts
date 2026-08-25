/**
 * Scene-end CHR bank table — 每场景终态 8 slot bank1k 索引
 *
 * 数据来源：scripts/_emu_reference.ts 跑 ROM 30 帧后,
 *   output/emu-reference/frame-NNN/state.json → chrBanks 数组。
 *   chrBanks 是 EMU 当前 PPU 的实际 8 个 1KB slot bank1k。
 *
 * 翻译原则（v2）：
 *   - ROM mid-frame CHR switch 翻译采用「end-state 查表」而非 stream parser
 *     （per memory: 「在高级语言里就是 import + 直接函数调用 + 直接查表,
 *       根本不需要"整个 bank 加载/切换"概念」）
 *   - 终态唯一确定时（H5 已观察到 EMU 行为）→ 直接锁死
 *   - 不同 scene 立即换 bank 即可, 不引入 bankWrite/stream 模拟
 *
 * 数值含义：bank1k 0-255 → 256 个 CHR 1KB slot
 *   (H5 HeadlessRuntime.loadChrSlot 自动 mod 128, 因为 H5 只有 128 个 bank1k 可用)
 *
 * 周期间隔内不变 → 同一 entry 跨多帧共用
 */
export interface SceneBankEntry {
  /** 起始 frame index (inclusive) */
  readonly fromFrame: number;
  /** 8 个 1KB slot 的 bank1k 索引 */
  readonly banks: ReadonlyArray<number>;
}

/**
 * Scene-end CHR bank table — scene 0 frame 范围 (Tecmo Title → map3 NT)
 * 数据来源: emu-reference/frame-{030,060,300}/chr-switches.json (最后一行 scanline banks)
 *   frame 030  sc=6  banks=[124,125,126,127,252,113,82,83]  (boot 终态)
 *   frame 060  sc=150 banks=[0,1,2,3,252,113,82,83]         (LoadScene3Nt 后切回 BG default)
 *   frame 300  sc=11 banks=[124,125,126,127,252,113,82,83]  (Hold 终态)
 *
 * 之前单一 entry 错误值 [0,1,2,3,252,113,82,83] 来自 PT1 早期推断,
 *  导致 H5 frame 1-300 全程 slot 0-3 = 0,1,2,3 而不是 emu 的真实切换序列。
 */
export const SCENE_END_BANK_TABLE: ReadonlyArray<SceneBankEntry> = [
  // frame 0..29: boot 阶段, BG slot 0-3 = 124-127 (Tecmo title 字符)
  { fromFrame: 0, banks: [124, 125, 126, 127, 252, 113, 82, 83] },
  // frame 30..299: LoadScene3Nt (BG $046F) 切回 default; SPR slots 不变
  // 注: 实际 frame 30 emu 终态是 [124,...] 但 mid-scene 切到 [0,1,2,3,...]
  { fromFrame: 45, banks: [0, 1, 2, 3, 252, 113, 82, 83] },
  // frame 300: Hold 之后又切回 [124-127...] (emu-reference sc=11)
  { fromFrame: 300, banks: [124, 125, 126, 127, 252, 113, 82, 83] },
  // 后续场景 (1-23) 由 emulate 观察补全; 此处显式注释避免冷编译:
  //   scene 1 (LevelIntro), scene 3 (HalfTime), scene 7 (Match), ...
];
