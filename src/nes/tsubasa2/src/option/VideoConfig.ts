// src/option/VideoConfig.ts
//
// video config 配置项定义 (移植自 fceux-2.6.6 SDL.SpecialFilter 配置体系):
//   - SDL.SpecialFilter (scaler) → 这里 VideoConfig.scaler
//   - SDL.IntFrameRate        → 这里 (deprecated, 不需要, nes NTSC 固定 60Hz)
//   - SDL.ClipSides           → 这里 VideoConfig.clipSides
//   - SDL.AutoScaleOnResize   → 这里 VideoConfig.fitWindow
//   - SDL.ForceAspectRatio    → 这里 VideoConfig.maintainAspectRatio
//   - SDL.ShowFPS             → 这里 VideoConfig.showFps
//   - SDL.NewPPU              → 这里 VideoConfig.newPpu (NES H5 不复用)
//   - SDL.DrawInputAids       → 这里 VideoConfig.drawInputAids (跳过, 跟 control 不耦合)
//
// 选项持久化: localStorage key = `tsubasa2.videoConfig` (JSON 编码)
//
// 与 fceux 对应编号 (SDL.SpecialFilter):
//   0 = None
//   1 = hq2x
//   2 = scale2x
//   3 = NTSC 2x       (不实现, 小程序/WX 不需要 NTSC RF 滤镜)
//   4 = hq3x          → 本次 PR 主目标
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

export interface VideoConfig {
  /** 视频缩放算法 */
  scaler: VideoScalerId;
  /** 窗口适配: true=按整数比缩放 (无变形), false=自由 fit (可能亚像素) */
  fitWindow: boolean;
  /** 强制 8:7 NES 原生宽高比 (256x240 ≈ 0.9375 ≈ 8/7) */
  maintainAspectRatio: boolean;
  /** 左/右各裁 8 列像素 (NES overscan 模拟) */
  clipSides: boolean;
  /** 显示 FPS 叠加层 (左上角) */
  showFps: boolean;
  /** 帧序号叠加层 (FPS 下方) */
  showFrameCount: boolean;
}

export const DEFAULT_VIDEO_CONFIG: VideoConfig = {
  scaler: "none",
  fitWindow: true,
  maintainAspectRatio: true,
  clipSides: false,
  showFps: false,
  showFrameCount: false,
};

/** 合并用户 config + 默认值, 缺失字段补默认 */
export function normalizeVideoConfig(cfg: Partial<VideoConfig> | null | undefined): VideoConfig {
  if (!cfg || typeof cfg !== "object") return { ...DEFAULT_VIDEO_CONFIG };
  const merged: VideoConfig = { ...DEFAULT_VIDEO_CONFIG };
  for (const k of Object.keys(DEFAULT_VIDEO_CONFIG) as (keyof VideoConfig)[]) {
    const v = (cfg as any)[k];
    if (v !== undefined && v !== null) (merged as any)[k] = v;
  }
  return merged;
}
