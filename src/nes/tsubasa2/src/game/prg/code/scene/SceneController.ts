/**
 * SceneController — 场景控制器抽象基类（MVC: Controller）
 *
 * 生命周期：onEnter（进入场景）→ onUpdate（每帧逻辑）→ onRender（每帧渲染）
 * 每帧由 BootRouter 调度。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export abstract class SceneController {
  /** 场景号（0-23） */
  abstract readonly sceneId: number;

  constructor(
    protected readonly store: DataStore,
    protected readonly input: InputService,
  ) {}

  /** 进入场景 */
  abstract onEnter(): void;

  /**
   * 每帧游戏逻辑。
   * @returns 下一场景号；undefined 表示留在当前场景。
   */
  abstract onUpdate(frame: number): number | undefined;

  /** 每帧渲染（写入渲染缓冲/调色板） */
  onRender(): void {
    // 默认空实现；场景无渲染需求时无需覆盖
  }
}