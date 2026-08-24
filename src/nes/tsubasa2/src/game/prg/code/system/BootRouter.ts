/**
 * BootRouter — 场景路由（原 bank02 场景分发 $8486 + 跳转表 $A491）
 *
 * @bank 02 ($8000-$AFFF)
 *
 * 对应原始地址：
 *   $8486: 场景入口跳转（ASL; TAX; LDA $A492,X 跳转表，24 项）
 *   $A200: 场景初始化入口（Reset → $CEFE → $C400 → JMP $A200）
 *   $A491: 场景入口跳转表（24 项，见 SceneTable）
 *
 * 组织原则：以场景 ID 为键，通过场景表（SceneTable）分发；不按业务语义命名。
 * 场景 0-23 全部登记在场景表中，未翻译场景使用默认 stub（留在当前场景）。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import { SceneController } from '../scene/SceneController';
import { Scene0Controller } from '../scene/Scene0Controller';

/** 场景号枚举（0-23，跳转表 $A491 顺序） */
export const enum SceneId {
  Scene0 = 0,   // $A4C0/$A4C1（boot 入口）
  Scene1 = 1,   // $A559/$A55A
  Scene2 = 2,   // $A57B/$A57C
  Scene3 = 3,   // $A581/$A582
  Scene4 = 4,   // $A5A2/$A5A3
  Scene5 = 5,   // $A5A8/$A5A9
  Scene6 = 6,   // $A5B0/$A5B1
  Scene7 = 7,   // $A5B8/$A5B9
  Scene8 = 8,   // $A5BF/$A5C0
  Scene9 = 9,   // $A5CD/$A5CE
  Scene10 = 10, // $A5DB/$A5DC
  Scene11 = 11, // $A5E8/$A5E9
  Scene12 = 12, // $A602/$A603
  Scene13 = 13, // $A61C/$A61D
  Scene14 = 14, // $A629/$A62A
  Scene15 = 15, // $A650/$A651
  Scene16 = 16, // $A69C/$A69D
  Scene17 = 17, // $A77A/$A77B
  Scene18 = 18, // $A782/$A783
  Scene19 = 19, // $A78D/$A78E
  Scene20 = 20, // $A7BD/$A7BE
  Scene21 = 21, // $A7CE/$A7CF
  Scene22 = 22, // $A7D6/$A7D7
  Scene23 = 23, // $A7FA/$A7FB
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

  /** 当前场景号（ram_00ED 语义：原版存当前场景） */
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
   * 切换场景（$CEFE/$C400/$A200 语义）：
   * $CEFE：关 IRQ → 隐藏 OAM → 清 NT
   * $C400：PPU CTRL=$08 / MASK=$1E / bank 基址=0
   * $A200：场景入口（设置 $00ED → 场景初始化）
   * @param sceneId 场景号（0-23）
   */
  changeScene(sceneId: number): void {
    const store = this.store;
    // $CEFE 前序：关 IRQ 计数器 / 隐藏 OAM / 清 NT（ram 视图）
    store.writeByte(0x0469, 0x00); // IRQ 计数器清零
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, 0xf8); // OAM 全隐藏
    for (let addr = 0x2000; addr <= 0x23ff; addr++) store.writeByte(addr, 0); // NT+属性表
    // $C400：PPU CTRL/MASK/bank 基址
    store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
    store.writeByte(0x0022, 0x00); // MMC3 bank 基址 = 0（H5 无实际语义，兼容保留）
    // $A200：场景号存回 ram_00ED 并分发
    this.currentSceneId = sceneId;
    store.writeByte(0x00ed, sceneId);
    const next = this.getController(sceneId);
    this.current = next;
    next?.onEnter();
  }

  /** 每帧更新（NMI 游戏逻辑路径 $C421 语义）；处理场景返回的下一个场景号 */
  update(frame: number): void {
    const next = this.current?.onUpdate(frame);
    if (next !== undefined) {
      this.changeScene(next);
    }
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
