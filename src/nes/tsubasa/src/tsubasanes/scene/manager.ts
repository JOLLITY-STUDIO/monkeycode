// ============================================================================
// scene/manager.ts — 场景管理器
//
// 替代 ROM 中 ZP_SCENE_ID / ZP_DISPATCH_INDEX 的分派逻辑。
// 管理场景生命周期: 注册 → 切换 → 每帧 update + 进度表自动加载
//
// ROM Bank 0 $81D4+ 进度表集成:
//   场景切换时自动查四张触发表 → 加载字节码 → 处理自动跳转
// ============================================================================

import { Scene, SceneState, NO_INPUT } from './types';
import type { SceneId, JoypadInput } from './types';
import { loadSceneScripts } from './progress';
import type { BytecodeInterpreter } from './bytecode';

export class SceneManager {
  /** 已注册的场景 */
  private registry: Map<SceneId, Scene> = new Map();

  /** 当前场景 */
  current: Scene | null = null;

  /** 场景切换请求队列 */
  private pendingTransition: SceneId | null = null;

  /** 是否初始化完成 */
  ready: boolean = false;

  /** 字节码解释器引用 (引擎注入) */
  bytecode: BytecodeInterpreter | null = null;

  // ---- 注册 ----

  register(scene: Scene): void {
    this.registry.set(scene.id, scene);
  }

  registerAll(scenes: Scene[]): void {
    for (const s of scenes) this.register(s);
  }

  get(id: SceneId): Scene | undefined {
    return this.registry.get(id);
  }

  // ---- 切换 ----

  /** 请求切换场景 (帧末生效) */
  request(id: SceneId): void {
    this.pendingTransition = id;
  }

  /** 立即切换 (跳过动画, 调试用) */
  switchImmediate(id: SceneId): void {
    if (this.current) {
      this.current.exit();
      this.current.state = SceneState.INACTIVE;
    }
    const next = this.registry.get(id);
    if (!next) throw new Error(`Scene not registered: ${id}`);
    next.enter();
    next.state = SceneState.RUNNING;
    this.current = next;
    this.pendingTransition = null;
    this.ready = true;

    // 场景进入 → 自动加载字节码 (对应 ROM $8017 进度表查表)
    this._onSceneEnter(id);
  }

  // ---- 帧更新 ----

  /** 每帧调用 — 先处理场景切换, 再 update 当前场景 */
  update(input: JoypadInput = NO_INPUT): boolean {
    // 1. 处理待切换
    if (this.pendingTransition !== null) {
      this._doTransition(this.pendingTransition);
    }

    // 2. 更新当前场景
    if (!this.current) return false;
    if (this.current.state !== SceneState.RUNNING) return false;

    this.current.frameCount++;
    return this.current.update(input);
  }

  private _doTransition(id: SceneId): void {
    const next = this.registry.get(id);
    if (!next) {
      this.pendingTransition = null;
      return;
    }

    if (this.current && this.current.state === SceneState.RUNNING) {
      this.current.exit();
      this.current.state = SceneState.INACTIVE;
    }

    next.enter();
    next.state = SceneState.RUNNING;
    this.current = next;
    this.pendingTransition = null;
    this.ready = true;

    // 场景进入 → 自动加载字节码
    this._onSceneEnter(id);
  }

  // ================================================================
  // 进度表集成 — 对应 ROM Bank 0 $81D4-$83DB
  // ================================================================

  /**
   * 场景进入时自动查进度表加载字节码
   *
   * ROM 流程:
   *   $814D: LDX $26 / LDA $83DC,X → 查表 1
   *   $816C: LDX $26 / LDA $83FE,X → 查表 2
   *   $81FD: LDX $26 / LDA $8420,X → 查表 3
   *   $820D: LDX $26 / LDA $8442,X → 查表 4
   *   $81E4: LDX $26 / LDA $8398,X → 场景跳转
   *
   * 每个非零值 → $8464(scriptNum)
   */
  private _onSceneEnter(sceneId: number): void {
    if (!this.bytecode) return;

    const { loaded, autoTransition } = loadSceneScripts(sceneId, this.bytecode);

    if (autoTransition !== null && autoTransition !== sceneId) {
      // $8398 表触发的自动跳转
      // 延迟到下一帧执行，避免在 enter() 期间套娃
      this.request(autoTransition as SceneId);
    }
  }

  get currentName(): string {
    return this.current?.name ?? '(none)';
  }
}

// ---- 单例 ----

let _instance: SceneManager | null = null;

export function getSceneManager(): SceneManager {
  if (!_instance) _instance = new SceneManager();
  return _instance;
}

export function resetSceneManager(): void {
  _instance = null;
}
