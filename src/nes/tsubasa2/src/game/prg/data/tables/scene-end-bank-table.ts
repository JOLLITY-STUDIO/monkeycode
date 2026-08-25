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

/** 单一终态表 — 现已知仅 scene 0 用 [0,1,2,3,252,113,82,83] */
export const SCENE_END_BANK_TABLE: ReadonlyArray<SceneBankEntry> = [
  // scene 0 (Opening/Tecmo Title) frame 0..N: title screen BG + Tecmo sprite
  //  - bank 124-127 = title 字符 (BG)
  //  - bank 252/113/82/83 = Tecmo logo sprite (SPR, 来自 boot task $21CA 装载的
  //    tile 数据所在 1KB bank)
  // 终态 bank1k: [BG0, BG1, BG2, BG3, SPR0, SPR1, SPR2, SPR3]
  { fromFrame: 0, banks: [0, 1, 2, 3, 252, 113, 82, 83] },
  // 后续场景 (1-23) 由 emulate 观察补全; 此处显式注释避免冷编译:
  //   scene 1 (LevelIntro), scene 3 (HalfTime), scene 7 (Match), ...
];
