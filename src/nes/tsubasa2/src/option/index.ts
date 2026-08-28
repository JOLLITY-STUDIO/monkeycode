// src/option/index.ts
//
// option 模块入口 - 视频 / 音频 / 输入 等用户可见配置集中地
// 当前版本仅暴露 video config (HP3X / scaler 选项).
// 后续 PR: AudioConfig, InputConfig, NetworkConfig 等陆续补齐.

export * from "./VideoConfig";
export * from "./VideoConfigStorage";
