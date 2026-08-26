/**
 * Debug 文本数据生成器 — 从 h5game.ts 抽离
 *
 * 生成 NT / SPT / SPR OAM / PAL 等调试文本，与 canvas 渲染解耦。
 * PT 文本生成器已在 pattern-table-viewer.ts 中 (generatePTDataText)。
 */
/**
 * 输出 4 个 nametable: 每个 tile 同时显示 NT index + CHR 内容状态
 *
 * 格子格式: "XXc"
 *   XX = nametable tile index (hex)
 *   c  = CHR 内容指示:
 *        █ = CHR tile 有内容（非零像素 >= 50%）
 *        ░ = CHR tile 稀疏内容
 *        · = CHR tile 全透明
 *        ! = ptTile 不存在（无 CHR 数据）
 */
export declare function generateNTDataText(nes: any, frameCount?: number): string;
/**
 * 输出 PPU 调色板数据 (FCEUX 风格)
 *
 * 格式:
 *   BG  Palette: 4 组 × 4 色 = 16 色
 *   SPR Palette: 4 组 × 4 色 = 16 色
 *   每色同时输出 raw index (VRAM $3Fxx) + 解析后的 RGB hex
 */
export declare function generatePaletteDataText(nes: any, frameCount?: number): string;
/**
 * 输出 OAM 精灵摘要（紧凑版，一行一条，只列可见精灵）
 */
export declare function generateSPOAMDataText(nes: any): string;
/**
 * 输出 2 个 Sprite Pattern Table: 16×16 tiles 网格
 *
 * 格子格式: "XXc"
 *   XX = 表内 tile index (hex, 00-FF)
 *   c  = CHR 内容指示:
 *        █ = CHR tile 有内容（非零像素 >= 50%）
 *        ░ = CHR tile 稀疏内容
 *        · = CHR tile 全透明
 *        ! = ptTile 不存在（无 CHR 数据）
 */
export declare function generateSPTDataText(nes: any): string;
