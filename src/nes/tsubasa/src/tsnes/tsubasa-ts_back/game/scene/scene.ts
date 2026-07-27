/**
 * SceneManager — 場景調度器
 *
 * 管理遊戲場景生命週期：註冊、切換、每幀 update。
 * 對應 ROM 中 ZP_SCENE_ID ($26) / ZP_DISPATCH_INDEX ($27) 的控制邏輯，
 * 但用 OOP 場景物件替代 ROM 的分派表。
 *
 * 依賴：
 *   - scene/base.ts — 場景抽象基類
 *   - constants/scene_codes.ts — 場景 ID 常量
 */

import { Scene, SceneState, NO_INPUT } from './base';
import type { SceneId, JoypadInput } from './base';

// ============================================================
// §1 SceneManager
// ============================================================

export class SceneManager {
  /** 已註冊的場景 */
  private registry: Map<SceneId, Scene> = new Map();

  /** 當前場景 */
  current: Scene | null = null;

  /** 場景切換請求隊列 */
  private pendingTransition: SceneId | null = null;

  /** 是否初始化完成 */
  ready: boolean = false;

  // ---- 註冊 ----

  /** 註冊場景 */
  register(scene: Scene): void {
    this.registry.set(scene.id, scene);
  }

  /** 批量註冊 */
  registerAll(scenes: Scene[]): void {
    for (const s of scenes) {
      this.register(s);
    }
  }

  /** 獲取已註冊場景 */
  get(id: SceneId): Scene | undefined {
    return this.registry.get(id);
  }

  // ---- 切換 ----

  /**
   * 請求切換場景（幀末生效）
   * 當前場景先執行 exit()，下一幀新場景 enter()
   */
  request(id: SceneId): void {
    this.pendingTransition = id;
  }

  /** 立即切換（跳過 exit/enter 動畫，調試用） */
  async switchImmediate(id: SceneId): Promise<void> {
    if (this.current) {
      this.current.exit();
    }
    const next = this.registry.get(id);
    if (!next) {
      throw new Error(`Scene not registered: ${id}`);
    }
    next.enter();
    next.state = SceneState.RUNNING;
    this.current = next;
    this.pendingTransition = null;
  }

  // ---- 幀更新 ----

  /** 每幀調用 */
  update(input: JoypadInput = NO_INPUT): boolean {
    // 處理場景切換
    if (this.pendingTransition !== null) {
      this.doTransition(this.pendingTransition);
    }

    // 更新當前場景
    if (!this.current) return false;
    if (this.current.state !== SceneState.RUNNING) return false;

    this.current.frameCount++;
    return this.current.update(input);
  }

  private doTransition(id: SceneId): void {
    const next = this.registry.get(id);
    if (!next) {
      this.pendingTransition = null;
      return;
    }

    // 退出舊場景
    if (this.current && this.current.state === SceneState.RUNNING) {
      this.current.exit();
      this.current.state = SceneState.INACTIVE;
    }

    // 進入新場景
    next.enter();
    next.state = SceneState.RUNNING;
    this.current = next;
    this.pendingTransition = null;
    this.ready = true;
  }

  /** 場景名稱（調試用） */
  get currentName(): string {
    return this.current?.name ?? '(none)';
  }
}

// ============================================================
// §2 單例
// ============================================================

/** 全域 SceneManager 單例 */
let _instance: SceneManager | null = null;

export function getSceneManager(): SceneManager {
  if (!_instance) {
    _instance = new SceneManager();
  }
  return _instance;
}

export function resetSceneManager(): void {
  _instance = null;
}
