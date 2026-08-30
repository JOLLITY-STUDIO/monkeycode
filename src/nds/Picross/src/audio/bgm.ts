/**
 * BGM 模块 —— 包装 SSEQ 播放器（真实 NDS ROM 音乐）
 * 兼容旧 API：bgm.start(kind) / bgm.stop() / bgm.setMuted()
 *
 * 背景：ROM 0x1924800 处隐藏标准 SDAT（S87/G6 定案），含 27 首 BGM + 完整乐器/波形库。
 * 之前的合成 BGM 已替换为本模块 → SSEQ 播放器（src/audio/sseq-player.ts）。
 *
 * 平台：
 *   - 微信小程序：wx.createWebAudioContext() (基础库 2.19.0+)
 *   - HTML 测试：window.AudioContext
 *   - 不支持环境：静默降级
 */
import { sseqPlayer } from './sseq-player';

export type BgmKind = 'title' | 'game' | 'tutorial' | 'clear' | 'over' | 'complete';

const KIND_MAP: Record<BgmKind, string> = {
  title: 'title',
  game: 'stage_jazz',
  tutorial: 'how_to_play',
  clear: 'game_clear_jingle',
  over: 'game_over_jingle',
  complete: 'complete_jingle',
};

export class Bgm {
  private muted = false;
  private current: BgmKind | null = null;

  /** 启动 BGM（幂等） */
  start(kind: BgmKind = 'game'): void {
    if (this.current === kind && sseqPlayer.isPlaying()) return;
    const name = KIND_MAP[kind] || 'stage_jazz';
    sseqPlayer.play(name, { loop: true }).catch(() => { /* 静默失败 */ });
    this.current = kind;
  }

  /** 停止 */
  stop(): void {
    sseqPlayer.stop();
    this.current = null;
  }

  /** 静音切换 */
  setMuted(m: boolean): void {
    this.muted = m;
    sseqPlayer.setMuted(m);
  }

  isMuted(): boolean { return this.muted; }
  getKind(): BgmKind | null { return this.current; }
}

/** 全局单例 */
export const bgm = new Bgm();
