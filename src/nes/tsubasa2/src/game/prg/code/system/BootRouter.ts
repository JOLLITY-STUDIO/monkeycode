/**
 * BootRouter — 场景路由（用具名视图）
 *
 * 翻译原则（v2）：
 *   - scene.currentSceneId 具名视图（替代 readByte(0x00ed) / writeByte(0x00ed, ...)）
 *   - ppuState.ctrl / ppuState.mask 具名视图（替代寄存器字面量）
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import { SceneController } from '../scene/SceneController';
import { Scene0Controller } from '../scene/Scene0Controller';
import {
  Scene1Controller, Scene2Controller, Scene3Controller, Scene4Controller,
  Scene5Controller, Scene6Controller, Scene7Controller, Scene8Controller,
  Scene9Controller, Scene10Controller, Scene11Controller, Scene12Controller,
  Scene13Controller,
} from '../scene/SceneUtilitiesControllers';
import {
  Scene14Controller, Scene15Controller, Scene16Controller, Scene17Controller,
  Scene18Controller, Scene19Controller, Scene20Controller, Scene21Controller,
  Scene22Controller, Scene23Controller,
} from '../scene/Scene14to23Controllers';

/** 场景号枚举（0-23） */
export const enum SceneId {
  Scene0 = 0,
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

/** 未翻译场景的默认 stub */
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

  private currentSceneId = SceneId.Scene0;
  private current: SceneController | null = null;

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
    scene0?: Scene0Controller,
  ) {
    this.register(scene0 ?? new SceneStubController(this.store, this.input, SceneId.Scene0));
    this.register(new Scene1Controller(this.store, this.input));
    this.register(new Scene2Controller(this.store, this.input));
    this.register(new Scene3Controller(this.store, this.input));
    this.register(new Scene4Controller(this.store, this.input));
    this.register(new Scene5Controller(this.store, this.input));
    this.register(new Scene6Controller(this.store, this.input));
    this.register(new Scene7Controller(this.store, this.input));
    this.register(new Scene8Controller(this.store, this.input));
    this.register(new Scene9Controller(this.store, this.input));
    this.register(new Scene10Controller(this.store, this.input));
    this.register(new Scene11Controller(this.store, this.input));
    this.register(new Scene12Controller(this.store, this.input));
    this.register(new Scene13Controller(this.store, this.input));
    this.register(new Scene14Controller(this.store, this.input));
    this.register(new Scene15Controller(this.store, this.input));
    this.register(new Scene16Controller(this.store, this.input));
    this.register(new Scene17Controller(this.store, this.input));
    this.register(new Scene18Controller(this.store, this.input));
    this.register(new Scene19Controller(this.store, this.input));
    this.register(new Scene20Controller(this.store, this.input));
    this.register(new Scene21Controller(this.store, this.input));
    this.register(new Scene22Controller(this.store, this.input));
    this.register(new Scene23Controller(this.store, this.input));
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
   * - PPU CTRL/MASK 初始化
   * - scene.currentSceneId 具名写回并分发
   */
  changeScene(sceneId: number): void {
    const store = this.store;
    store.writeByte(0x0469, 0x00);
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, 0xf8);
    for (let addr = 0x2000; addr <= 0x23ff; addr++) store.writeByte(addr, 0);
    store.ppuState.ctrl = 0x08; // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.ppuState.mask = 0x1e; // PPU MASK: BG+SPR 可见
    store.ppuState.chrSelBase = 0x00;
    this.currentSceneId = sceneId;
    store.scene.currentSceneId = sceneId;
    const controller = this.getController(sceneId);
    this.current = controller;
    controller?.onEnter();
  }

  /** 每帧更新；处理场景返回的下一个场景号 */
  update(frame: number): void {
    const next = this.current?.onUpdate(frame);
    if (next !== undefined && next !== this.currentSceneId) {
      this.changeScene(next);
     }
    // 同一 scene 重复进入 (scene 2 等"占位 do-nothing"场景) 不触发 onEnter
    // 否则每帧 clearNametable + hideOam → 黑屏
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