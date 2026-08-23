/**
 * OpeningSceneController — 开场场景（场景号 0，boot 入口）
 *
 * @bank 02 ($A4C0) / 00 (渲染原语)
 *
 * 对应原始地址：$A4C0（跳转表第 0 项）— 开场动画：调色板装载、NT 填充、
 * 精灵显示、文本滚动，等待输入进入标题。
 *
 * V0.1 stub：注册契约；真实渲染在 V0.3（开场链路）覆盖。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

export class OpeningSceneController extends SceneController {
  readonly sceneId = 0;
  private audio: AudioService | null = null;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  /** 注入音频服务（开场 BGM 播放） */
  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    // TODO V0.3: 翻译 $A4C0 开场序列（调色板 / NT / OAM / 文本）
    // V0.6: 播放开场 BGM（BGM 编号待对照 asm 确认，暂用 0x01）
    this.audio?.playBgm(0x01);
  }

  onUpdate(frame: number): void {
    // TODO V0.3: 开场帧逻辑（渐显、滚动、等待 Start）
    void frame;
  }

  onRender(): void {
    // TODO V0.3: 开场渲染（写入 $05E8 缓冲 / OAM）
  }
}
