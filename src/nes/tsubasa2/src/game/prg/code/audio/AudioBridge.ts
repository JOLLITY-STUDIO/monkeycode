/**
 * AudioBridge — 音频后端抽象接口
 *
 * 翻译原则（v2）：
 *   - 业务侧 (Scene0/Opening/MeetingScene 等) 只依赖接口，不感知具体实现
 *   - 当前两套实现并存：
 *       AudioService    : H5 原 token 流 (F1-F7 完整，但 0x30-0x5B 数据是占位空)
 *       MiniAudioBridge : mini-audio 已测试的 byte-stream player (0x30-0x5B 真数据)
 *   - 组合根 (src/game/index.ts) 决定哪个实现跑；接口契约稳定即可
 *
 * 方法契约：
 *   playBgm(id)  : requestId (0x01-0x5B) → 后端自行决定如何处理 (mini-audio 只支持 0x30-0x5B)
 *   playSe(id)   : SE 请求 ID (0x32-0x71 / 0x31=stopAllSE) → 后端处理
 *   stopAll()    : 停所有播放
 *   update()     : 每帧从 game 主循环调一次 (内部 tick)
 */

export interface AudioBridge {
  /** 播放 BGM (requestId) */
  playBgm(id: number): void;
  /** 播放音效 (requestId)；0x31 = 停止所有 SE */
  playSe(id: number): void;
  /** 停所有播放 */
  stopAll(): void;
  /** 每帧推进 (内部 main loop tick) */
  update(): void;
}
