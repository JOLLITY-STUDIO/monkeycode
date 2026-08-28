// src/core/browser/scalers/index.ts
//
// 视频缩放器统一入口.
// 注册顺序: 由具体实现模块 import 时序保证 (先 VideoScaler, 再各 scaler 实现)

import {
  SCALER_REGISTRY,
  registerScaler,
  getScaler,
  IdentityScaler,
  NearestScaleScaler,
} from "./VideoScaler";
import { Hq3xScaler } from "./hqx/Hq3xScaler";

// 自动注册 Hq3x (本 PR 主目标)
registerScaler(new Hq3xScaler());

export {
  SCALER_REGISTRY,
  getScaler,
  registerScaler,
  IdentityScaler,
  NearestScaleScaler,
  Hq3xScaler,
};

export type { VideoScaler } from "./VideoScaler";
