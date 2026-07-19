/**
 * 场景接口
 */
export interface IScene {
  /** 进入场景 */
  enter(): void;
  /** 每帧更新 (60Hz) */
  update(): void;
  /** 渲染 (输出到 Canvas) */
  render(): void;
  /** 离开场景 */
  leave(): void;
}

/** 场景管理器 */
export class SceneManager {
  private current: IScene | null = null;
  private nextScene: IScene | null = null;

  /** 切换到新场景 (延迟到帧结束) */
  switchTo(scene: IScene): void {
    this.nextScene = scene;
  }

  /** 立即切换 */
  switchImmediate(scene: IScene): void {
    if (this.current) {
      this.current.leave();
    }
    this.current = scene;
    this.nextScene = null;
    scene.enter();
  }

  /** 每帧处理场景切换 */
  update(): void {
    if (this.nextScene) {
      if (this.current) {
        this.current.leave();
      }
      this.current = this.nextScene;
      this.nextScene = null;
      this.current.enter();
    }

    if (this.current) {
      this.current.update();
    }
  }

  /** 渲染当前场景 */
  render(): void {
    if (this.current) {
      this.current.render();
    }
  }

  get currentScene(): IScene | null {
    return this.current;
  }
}
