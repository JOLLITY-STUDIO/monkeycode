/**
 * SceneController — 场景控制器抽象基类（MVC: Controller）
 *
 * 生命周期：onEnter（进入场景）→ onUpdate（每帧逻辑）→ onRender（每帧渲染）
 * 与 bank02 场景入口跳转表（$A491）一一对应，每帧由 BootRouter 调度。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export abstract class SceneController {
  /** 场景号（0-23，跳转表索引） */
  abstract readonly sceneId: number;

  constructor(
    protected readonly store: DataStore,
    protected readonly input: InputService,
  ) {}

  /** 进入场景（原版 JMP $A200 场景入口语义） */
  abstract onEnter(): void;

  /** 每帧游戏逻辑（原版场景 update 语义） */
  abstract onUpdate(frame: number): void;

  /** 每帧渲染（原版场景 render 语义；写入 $05E8/$0498/OAM/调色板缓冲） */
  onRender(): void {
    // 默认空实现；场景无渲染需求时无需覆盖
  }
}
