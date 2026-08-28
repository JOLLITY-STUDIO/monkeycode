// src/option/VideoConfig.ts
//
// video config 配置项定义 (移植自 fceux-2.6.6 SDL.SpecialFilter + 视频配置):
//   - SDL.SpecialFilter         → 这里 VideoConfig.scaler
//   - SDL.AutoScaleOnResize     → 这里 VideoConfig.autoScaleOnResize
//   - SDL.ForceAspectRatio      → 这里 VideoConfig.forceAspectRatio
//   - SDL.AspectSelect          → 这里 VideoConfig.aspectRatio (square/ntsc/pal/standard/widescreen)
//   - SDL.XScale                → 这里 VideoConfig.scaleX
//   - SDL.YScale                → 这里 VideoConfig.scaleY
//   - SDL.ClipSides             → 这里 VideoConfig.clipSides
//   - SDL.ShowFPS               → 这里 VideoConfig.showFps
//
// 选项持久化: localStorage key = `tsubasa2.videoConfig` (JSON 编码)
//
// 与 fceux 对应编号 (SDL.SpecialFilter):
//   0 = None
//   1 = hq2x
//   2 = scale2x
//   3 = NTSC 2x       (不实现, 小程序/WX 不需要 NTSC RF 滤镜)
//   4 = hq3x          → HP3X
//   5 = scale3x
//   6 = Prescale 2x   (等同 scale2x + bilinear, 提供给未来 OpenGL backend)
//   7 = Prescale 3x
//   8 = Prescale 4x
//   9 = PAL 3x        (不实现, 跟当前 nes NTSC 项目不一致)

export type VideoScalerId =
  | "none"
  | "hq2x"
  | "hq3x"
  | "scale2x"
  | "scale3x";

/** 单个 scaler 的"输出倍率" - 决定 canvas width/height 缩放比例 */
export const VIDEO_SCALER_SCALE: Record<VideoScalerId, 1 | 2 | 3> = {
  none: 1,
  hq2x: 2,
  scale2x: 2,
  hq3x: 3,
  scale3x: 3,
};

/** 与 fceux SDL.SpecialFilter 双向编码 (UI dropdown 数据用) */
export const SCALER_OPTIONS: { id: VideoScalerId; label: string; fexId: number }[] = [
  { id: "none", label: "None (1×)", fexId: 0 },
  { id: "hq2x", label: "hq2x (2× 高质量)", fexId: 1 },
  { id: "scale2x", label: "scale2x (2× 整数)", fexId: 2 },
  { id: "hq3x", label: "hq3x / HP3X (3× 高质量)", fexId: 4 },
  { id: "scale3x", label: "scale3x (3× 整数)", fexId: 5 },
];

/**
 * Aspect ratio preset (对应 fceux SDL.AspectSelect 0-4):
 *   square    = 1:1   (像素严格正方)
 *   ntsc      = 8:7   (NES NTSC 原生: 256:224 ≈ 8:7, 真实像素约 1.14:1)
 *   pal       = 11:8  (NES PAL 原生)
 *   standard  = 4:3   (CRT TV 4:3)
 *   widescreen= 16:9  (现代宽屏)
 *
 * ratio = 高度 / 宽度 (display rect 的 height / width).
 * 例如 NTSC 8:7 表示每个源像素宽:高 = 8:7, display 高度比宽度大 7/8.
 * 但 H5 canvas 已经按 width:height 画好了 (256x240), "aspect" 实际上指
 * "显示到屏幕时希望拉伸成的高/宽比". 设为 4:3 时画布 CSS 高度 / 宽度 = 4/3.
 */
export type AspectRatioId = "square" | "ntsc" | "pal" | "standard" | "widescreen";

export const ASPECT_RATIO_OPTIONS: { id: AspectRatioId; label: string; hPerW: number; fexId: number }[] = [
  { id: "square",     label: "Square Pixels (1:1 正方像素)", hPerW: 1.0,    fexId: 0 },
  { id: "ntsc",       label: "NTSC (8:7 NES 原生)",          hPerW: 8 / 7,  fexId: 1 },
  { id: "pal",        label: "PAL (11:8)",                   hPerW: 11 / 8, fexId: 2 },
  { id: "standard",   label: "Standard (4:3 CRT 电视)",      hPerW: 4 / 3,  fexId: 3 },
  { id: "widescreen", label: "Widescreen (16:9)",            hPerW: 16 / 9, fexId: 4 },
];

/** 给定 aspect id 查 height/width 比值 */
export function getAspectRatio(id: AspectRatioId): number {
  const o = ASPECT_RATIO_OPTIONS.find(a => a.id === id);
  return o ? o.hPerW : 8 / 7;
}

export interface VideoConfig {
  /** 视频缩放算法 */
  scaler: VideoScalerId;

  /** 窗口 resize 时自动按整数倍缩放到父容器 (类似 fceux SDL.AutoScaleOnResize) */
  autoScaleOnResize: boolean;
  /** 强制保持宽高比 (类似 fceux SDL.ForceAspectRatio). true 时忽略 scaleY 用 aspectRatio 算出 */
  forceAspectRatio: boolean;
  /** 宽高比预设 (square/ntsc/pal/standard/widescreen). 默认 ntsc (8:7) */
  aspectRatio: AspectRatioId;
  /** CSS 水平缩放 (1.0 = 原画布宽), 范围 0.1 - 16 */
  scaleX: number;
  /** CSS 垂直缩放 (1.0 = 原画布高), forceAspectRatio=false 时才生效 */
  scaleY: number;

  /** 左/右各裁 8 列像素 (NES overscan 模拟) */
  clipSides: boolean;
  /** 显示 FPS 叠加层 (左上角) */
  showFps: boolean;
  /** 帧序号叠加层 (FPS 下方) */
  showFrameCount: boolean;
}

export const DEFAULT_VIDEO_CONFIG: VideoConfig = {
  scaler: "none",
  autoScaleOnResize: true,
  forceAspectRatio: true,
  aspectRatio: "ntsc",
  scaleX: 1.0,
  scaleY: 1.0,
  clipSides: false,
  showFps: false,
  showFrameCount: false,
};

/** 合并用户 config + 默认值, 缺失字段补默认; 同时迁移旧字段 (fitWindow/maintainAspectRatio) */
export function normalizeVideoConfig(
  cfg: Partial<VideoConfig> | null | undefined,
): VideoConfig {
  if (!cfg || typeof cfg !== "object") return { ...DEFAULT_VIDEO_CONFIG };
  const merged: VideoConfig = { ...DEFAULT_VIDEO_CONFIG };
  for (const k of Object.keys(DEFAULT_VIDEO_CONFIG) as (keyof VideoConfig)[]) {
    const v = (cfg as any)[k];
    if (v !== undefined && v !== null) (merged as any)[k] = v;
  }
  // ─── 旧字段迁移: fitWindow / maintainAspectRatio → 新字段 ───
  // V0.7.3 之前用的是 fitWindow/maintainAspectRatio, 含义:
  //   fitWindow = 整数倍 fit (对应 fceux SDL.AutoScaleOnResize)
  //   maintainAspectRatio = 强制 NES 原生 8:7 (对应 forceAspectRatio)
  // V0.7.4 之后用 autoScaleOnResize + forceAspectRatio + aspectRatio.
  const old = cfg as any;
  if (old.fitWindow !== undefined && old.autoScaleOnResize === undefined) {
    merged.autoScaleOnResize = !!old.fitWindow;
  }
  if (old.maintainAspectRatio !== undefined && old.forceAspectRatio === undefined) {
    merged.forceAspectRatio = !!old.maintainAspectRatio;
  }
  // ─── clamp ───
  merged.scaleX = clampScale(merged.scaleX);
  merged.scaleY = clampScale(merged.scaleY);
  return merged;
}

function clampScale(v: any): number {
  const n = Number(v);
  if (!isFinite(n)) return 1.0;
  return Math.max(0.1, Math.min(16.0, n));
}