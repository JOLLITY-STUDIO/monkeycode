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
export const SCENE_END_BANK_TABLE = [
    // frame 0..340: BG font tile (124-127) + Tecmo logo SPR 层 (252/113/82/83)
    { fromFrame: 0, banks: [124, 125, 126, 127, 252, 113, 82, 83] },
    // frame 340+: 切 data tile (0-3) — Hold 结束渐隐后下一场景 BG
    { fromFrame: 340, banks: [0, 1, 2, 3, 252, 113, 82, 83] },
    // 后续场景 (1-23) 由 emulate 观察补全; 此处显式注释避免冷编译:
    //   scene 1 (LevelIntro), scene 3 (HalfTime), scene 7 (Match), ...
];
