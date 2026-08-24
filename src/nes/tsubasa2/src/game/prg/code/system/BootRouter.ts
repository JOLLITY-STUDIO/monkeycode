/**
 * BootRouter — 场景路由
 *
 * 以场景 ID 为键，通过场景表（SceneTable）分发；不按业务语义命名。
 * 场景 0-23 全部登记在场景表中，未翻译场景使用默认 stub（留在当前场景）。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import { SceneController } from '../scene/SceneController';
import { Scene0Controller } from '../scene/Scene0Controller';

/** 场景号枚举（0-23） */
export const enum SceneId {
  Scene0 = 0,   // 开场序列
  Scene1 = 1,
  Scene2 = 2,
  Scene3 = 3,
  Scene4 = 4,
  Scene5 = 5,
  Scene6 = 6,
  Scene7 = 7,
  Scene8 = 8,
  Scene9 = 9,
  Scene10 = 10,
  Scene11 = 11,
  Scene12 = 12,
  Scene13 = 13,
  Scene14 = 14,
  Scene15 = 15,
  Scene16 = 16,
  Scene17 = 17,
  Scene18 = 18,
  Scene19 = 19,
  Scene20 = 20,
  Scene21 = 21,
  Scene22 = 22,
  Scene23 = 23,
}

/** 未翻译场景的默认 stub（不流转，留在当前场景） */
class SceneStubController extends SceneController {
  readonly sceneId: number;
  constructor(store: DataStore, input: InputService, sceneId: number) {
    super(store, input);
    this.sceneId = sceneId;
  }
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    return undefined;
  }
}

export class BootRouter {
  /** 场景控制器注册表（sceneId → controller） */
  private readonly scenes: Map<number, SceneController> = new Map();

  /** 当前场景号 */
  private currentSceneId = SceneId.Scene0;

  /** 当前场景控制器 */
  private current: SceneController | null = null;

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
    scene0?: Scene0Controller,
  ) {
    // 场景 0 已翻译：注册真实控制器；其余场景未翻译时走默认 stub
    this.register(scene0 ?? new SceneStubController(this.store, this.input, SceneId.Scene0));
    for (let id = 1; id <= 23; id++) {
      this.scenes.set(id, new SceneStubController(this.store, this.input, id));
    }
  }

  /** 注册/覆盖场景控制器 */
  register(controller: SceneController): void {
    this.scenes.set(controller.sceneId, controller);
  }

  /** 获取场景控制器（未注册返回 stub） */
  getController(sceneId: number): SceneController {
    return this.scenes.get(sceneId) ?? new SceneStubController(this.store, this.input, sceneId);
  }

  /**
   * 切换场景：
   * - 前序：关 IRQ 计数器 / 隐藏 OAM / 清 NT
   * - PPU CTRL/MASK/bank 基址初始化
   * - 场景号存回 ram_00ED 并分发
   */
  changeScene(sceneId: number): void {
    const store = this.store;
    // 前序：关 IRQ 计数器 / 隐藏 OAM / 清 NT
    store.writeByte(0x0469, 0x00);
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, 0xf8);
    for (let addr = 0x2000; addr <= 0x23ff; addr++) store.writeByte(addr, 0);
    // PPU CTRL/MASK/bank 基址
    store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
    store.writeByte(0x0022, 0x00); // bank 基址 = 0（H5 无实际切换语义，兼容保留）
    // 场景号存回 ram_00ED 并分发
    this.currentSceneId = sceneId;
    store.writeByte(0x00ed, sceneId);
    const next = this.getController(sceneId);
    this.current = next;
    next?.onEnter();
  }

  /** 每帧更新；处理场景返回的下一个场景号 */
  update(frame: number): void {
    const next = this.current?.onUpdate(frame);
    if (next !== undefined) {
      this.changeScene(next);
    }
  }

  /** 每帧渲染（主渲染路径） */
  render(): void {
    this.current?.onRender();
  }

  /** 当前场景号 */
  get sceneId(): number {
    return this.currentSceneId;
  }
}