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
 * 数据来源: emu-reference/frame-{013,030,060,300}/chr-switches.json (mid-frame bank switch)
 *
 * emu 真实 mid-frame bank switch 时序:
 *   - frame 30/60/90/120/150: sc=6 用 [124-127,252,113,82,83] (上半 NT 用 font tile)
 *                              sc=150 切 [0-3,252,113,82,83]  (下半 NT 用 data tile)
 *
 * 历史 BUG: v1 用 `[0,1,2,3,252,113,82,83]` 给 H5 frame 0-300 全程覆盖 — 这跟
 *   emu frame 30 sc=6 真值 [124,125,126,127,252,113,82,83] 不符 → NT row 0-13
 *   字体渲染错。修正:
 *   - frame 0-340: BG slot 0-3 = [124,125,126,127] (font tile bank — 上半 NT)
 *                slot 4-7 = [252,113,82,83] (Tecmo logo SPR layer)
 *   - frame 340+: 切 [0,1,2,3] (data tile bank — 下半 NT / 渐隐后切换)
 *
 * ⚠ H5 当前架构 rasterize 用单 PT sheet, 不能 per-scanline 切 bank;
 *   此处选 BG=124-127 (覆盖 emu sc=6 一致, 即 font tile 字体对) 优于 0-3。
 *   后续升级到 per-scanline rasterizer 后再加 [0,1,2,3,252,113,82,83] sheet。
 */
export declare const SCENE_END_BANK_TABLE: ReadonlyArray<SceneBankEntry>;
