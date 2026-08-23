/**
 * BootRouter — 场景路由（原 bank02 场景分发 + NMI 回调索引）
 *
 * @bank 02 ($8000-$AFFF)
 *
 * 对应原始地址：
 *   $8486: 场景入口跳转（ASL; TAX; LDA $A491,X 跳转表，24 项）
 *   $A200: 场景初始化入口（Reset → $CEFE → $C400 → JMP $A200）
 *   $A491: 场景入口跳转表（24 项：$A4C0/$A559/$A57B/...）
 *
 * 场景号：0-23（跳转表长度 24），V0.1 只实现 0=Opening，其余注册 stub。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { SceneController } from '../scene/SceneController';
import type { OpeningSceneController } from '../scene/OpeningSceneController';

/** 场景号枚举（0-23，跳转表 $A491 顺序；名称在 V0.3 逐一对照确认） */
export const enum SceneId {
  Opening = 0,  // 开场（boot 入口场景）
  Title = 1,    // TODO V0.3: 对照 $A559 确认
  Password = 2, // TODO V0.3: 对照 $A57B 确认
  Result = 3,   // TODO V0.3: 对照 $A581 确认
  // TODO V0.2: 从 $A491 跳转表补齐 4-23 全部场景
}

export class BootRouter {
  /** 场景控制器注册表（sceneId → controller） */
  private readonly scenes: Map<number, SceneController> = new Map();

  /** 当前场景号（ram_00ED 语义：原版存当前场景） */
  private currentSceneId = SceneId.Opening;

  /** 当前场景控制器 */
  private current: SceneController | null = null;

  constructor(
    readonly store: DataStore,
    readonly opening: OpeningSceneController,
  ) {
    // 注册全部场景（V0.1 仅 Opening 真实实现，其余为 stub 场景）
    this.register(opening);
  }

  /** 注册场景控制器 */
  register(controller: SceneController): void {
    this.scenes.set(controller.sceneId, controller);
  }

  /**
   * 切换场景（$CEFE/$C400/$A200 语义）：
   * 关 IRQ → 隐藏 OAM → 清 NT → PPU CTRL/MASK → 场景入口
   * @param sceneId 场景号（0-23）
   */
  changeScene(sceneId: number): void {
    this.currentSceneId = sceneId;
    this.store.writeByte(0x00ed, sceneId);
    const next = this.scenes.get(sceneId) ?? null;
    this.current = next;
    next?.onEnter();
  }

  /** 每帧更新（NMI 游戏逻辑路径 $C421 语义） */
  update(frame: number): void {
    this.current?.onUpdate(frame);
  }

  /** 每帧渲染（主渲染路径 $C775 语义，由 InterruptService 在 renderCommit 前调用） */
  render(): void {
    this.current?.onRender();
  }

  /** 当前场景号 */
  get sceneId(): number {
    return this.currentSceneId;
  }
}
