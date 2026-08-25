/**
 * BootRouter — 场景路由（用具名视图）
 *
 * 翻译原则（v2）：
 *   - scene.currentSceneId 具名视图（替代 readByte(0x00ed) / writeByte(0x00ed, ...)）
 *   - ppuState.ctrl / ppuState.mask 具名视图（替代寄存器字面量）
 *   - 集成 MainRouterService dispatch（PRG $8000 翻译）：按 $0027 mode 派发 5 entry action
 *
 * BootRouter 在构造后会自动调用 `autoRegisterDispatchActions()` 注册
 * 5 entry dispatcher table（mode 0..4）→ action callbacks，把旧的硬编码 if-else
 * mode dispatch 替换成可配置 table-driven 派发。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import { MainRouterService, StatusMode } from './MainRouterService';
import { PpuTransferService } from './PpuTransferService';
import {
  SceneController,
  Scene0Controller,
  Scene1Controller, Scene2Controller, Scene3Controller, Scene4Controller,
  Scene5Controller, Scene6Controller, Scene7Controller, Scene8Controller,
  Scene9Controller, Scene10Controller, Scene11Controller, Scene12Controller,
  Scene13Controller,
  Scene14Controller, Scene15Controller, Scene16Controller, Scene17Controller,
  Scene18Controller, Scene19Controller, Scene20Controller, Scene21Controller,
  Scene22Controller, Scene23Controller,
} from '../scene/index';

/** 场景号枚举（0-23） */
export const enum SceneId {
  Scene0 = 0, Scene1 = 1, Scene2 = 2, Scene3 = 3, Scene4 = 4, Scene5 = 5,
  Scene6 = 6, Scene7 = 7, Scene8 = 8, Scene9 = 9, Scene10 = 10, Scene11 = 11,
  Scene12 = 12, Scene13 = 13, Scene14 = 14, Scene15 = 15, Scene16 = 16,
  Scene17 = 17, Scene18 = 18, Scene19 = 19, Scene20 = 20, Scene21 = 21,
  Scene22 = 22, Scene23 = 23,
}

/** Scene0-23 控制器类列表（顺序对应 sceneId），用于自动统一 register */
const SCENE_CONTROLLERS: ReadonlyArray<new (store: DataStore, input: InputService) => SceneController> = [
  Scene0Controller,
  Scene1Controller, Scene2Controller, Scene3Controller, Scene4Controller,
  Scene5Controller, Scene6Controller, Scene7Controller, Scene8Controller,
  Scene9Controller, Scene10Controller, Scene11Controller, Scene12Controller,
  Scene13Controller,
  Scene14Controller, Scene15Controller, Scene16Controller, Scene17Controller,
  Scene18Controller, Scene19Controller, Scene20Controller, Scene21Controller,
  Scene22Controller, Scene23Controller,
];

export class BootRouter {
  /** 场景控制器注册表（sceneId → controller） */
  private readonly scenes: Map<number, SceneController> = new Map();

  /** bank00 $8000 主 dispatcher 翻译器（5 entry action table） */
  readonly mainRouter: MainRouterService;

  /** bank00 $8464 cfg 装载器（多 bank 装载入口，由 Tsubasa2 注入） */
  private ppuTransfer: PpuTransferService | null = null;

  private currentSceneId = SceneId.Scene0;
  private current: SceneController | null = null;

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
  ) {
    this.mainRouter = new MainRouterService(store);
    for (const Ctor of SCENE_CONTROLLERS) {
      this.register(new Ctor(store, input));
    }
    this.autoRegisterDispatchActions();
  }

  /**
   * 注入 PpuTransferService（PRG $8464 cfg loader 翻译）。
   * 由 Tsubasa2 boot() 在构造 BootRouter 之后调用，
   * 让 BootRouter.changeScene() 自动调 loadCfgBlock(sceneId) 装 cfg。
   *
   * 如不注入：changeScene() 跳过 cfg 装载（向后兼容 stub 模式）。
   */
  attachPpuTransfer(ppu: PpuTransferService): void {
    this.ppuTransfer = ppu;
  }

  /**
   * 自动注册 5 entry dispatcher actions（PRG $800D-$8014 翻译）。
   *
   * 每条 action 调对应的 PRG 段语义抽象方法（替代原 GameSystemService.update() 中
   * 硬编码 if-else mode 0/1/2/3/4 dispatch 的 stub）：
   *
   *   mode 0: 步进场景 — $0026 += 1（不对 Scene 做自动切换；让 Scene controller 自己决定 next）
   *   mode 1: 计时比较 — $0028 > $0029 → mainLoopStep
   *   mode 2: 立即 mainLoopStep（无条件推进）
   *   mode 3: 计时比较 — $0028 > $0029 → mainLoopStep（与 mode 1 同形）
   *   mode 4: 计时比较 + fade 装载 cfg 0x60 + 清 $0027 mode=0
   *
   * 在 update() 末尾按当前 $0027 派发。
   * PRG $0027 字节语义：mode 0=standby, 1/3=timer-wait, 2=advance, 4=fade
   */
  private autoRegisterDispatchActions(): void {
    const store = this.store;
    // mode 0 — 步进 frame counter；不自动切场景，让 Scene controller 自管
    this.mainRouter.registerDispatchAction(0 as StatusMode, () => {
      // $0026 step counter +1；不动 $0027（保持 mode 0 standby）
      const step = (store.readByte(0x0026) + 1) & 0xff;
      store.writeByte(0x0026, step);
      // 错位自检：若 $0026 跨越 $00E4 cap，则需要 scene 切换；
      // 当前 stub 模式：仅写 $0026 让 Scene controller 据此推进
    });
    // mode 1 — 计时比较 ($0028 > $0029) → mainLoopStep
    this.mainRouter.registerDispatchAction(1 as StatusMode, () => {
      if (store.readByte(0x0028) > store.readByte(0x0029)) {
        this.mainLoopStep();
      }
    });
    // mode 2 — 立即 mainLoopStep
    this.mainRouter.registerDispatchAction(2 as StatusMode, () => {
      this.mainLoopStep();
    });
    // mode 3 — 计时比较 + mainLoopStep（与 mode 1 等价）
    this.mainRouter.registerDispatchAction(3 as StatusMode, () => {
      if (store.readByte(0x0028) > store.readByte(0x0029)) {
        this.mainLoopStep();
      }
    });
    // mode 4 — 计时比较 + 装载 fade cfg 0x60 + 清 $0027
    this.mainRouter.registerDispatchAction(4 as StatusMode, () => {
      const a = store.readByte(0x0028);
      const b = store.readByte(0x0029);
      if (a !== b) {
        // 装载 fade out cfg 0x60（PRG $8464 多 bank cfg 装载）
        // cfg=0x60 → 解析不命中（超出已声明 cfg 表），fallback 不写
        // ROM 实际 = fade out 路径触发；H5 暂用 PpuTransferService 占位
        this.ppuTransfer?.loadCfgBlock(0x60);
      }
      // 清 mode → 让下一帧从 mode 0 重新开始
      store.writeByte(0x0027, 0);
    });
  }

  /**
   * 主循环步进（PRG $8267 JMP $C57B = $0026++ / $0027=0 翻译）。
   * 由 mode 1/2/3 action 调用；外部亦可主动调。
   *
   * 副作用：
   *   - $0026 (step counter) += 1
   *   - $0027 (status mode) = 0  → 下一帧从 mode 0 重新派发
   */
  mainLoopStep(): void {
    const store = this.store;
    const step = (store.readByte(0x0026) + 1) & 0xff;
    store.writeByte(0x0026, step);
    store.writeByte(0x0027, 0);
  }

  /** 注册/覆盖场景控制器 */
  register(controller: SceneController): void {
    this.scenes.set(controller.sceneId, controller);
  }

  /** 获取场景控制器（断言已注册 — Scene0-23 全部从 scene/index.ts 导入） */
  getController(sceneId: number): SceneController {
    const c = this.scenes.get(sceneId);
    if (!c) throw new Error(`BootRouter.getController: sceneId=${sceneId} 未注册`);
    return c;
  }

  /**
   * 切换场景：
   * - 前序：关 IRQ 计数器 / 隐藏 OAM / 清 NT
   * - PPU CTRL/MASK 初始化
   * - PRG $8464 cfg 装载（写 $004D/$004E/$0056/$00ED + NT fill 0x20=$55）
   *   → PpuTransferService.loadCfgBlock(sceneId)
   * - scene.currentSceneId 具名写回并分发到对应 controller
   */
  changeScene(sceneId: number): void {
    const store = this.store;
    store.writeByte(0x0469, 0x00);
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, 0xf8);
    for (let addr = 0x2000; addr <= 0x23ff; addr++) store.writeByte(addr, 0);
    store.ppuState.ctrl = 0x08; // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.ppuState.mask = 0x1e; // PPU MASK: BG+SPR 可见
    store.ppuState.chrSelBase = 0x00;
    // PRG $8464 cfg 装载（multi-bank）— 由 PpuTransferService 承接
    // 写 $004D/$004E (装载段 ptr) / $0056 (param) / $00ED (current row) + NT fill
    this.ppuTransfer?.loadCfgBlock(sceneId);
    this.currentSceneId = sceneId;
    store.scene.currentSceneId = sceneId;
    const controller = this.getController(sceneId);
    this.current = controller;
    controller?.onEnter();
  }

  /**
   * 每帧更新；处理场景返回的下一个场景号 + PRG $8000 mode dispatch。
   *
   * ROM 行为：
   *   1. 调 scene controller.onUpdate(frame) → 返回 next sceneId
   *   2. 若 next != current → changeScene(next)
   *   3. 末尾读 $0027 (= scene status mode 0..4) → MainRouterService.dispatchByMode(mode)
   *      由 5-entry dispatcher table 派发对应 action（PRG $8000 翻译）
   */
  update(frame: number): void {
    const next = this.current?.onUpdate(frame);
    if (next !== undefined && next !== this.currentSceneId) {
      this.changeScene(next);
    }
    // 同一 scene 重复进入 (scene 2 等"占位 do-nothing"场景) 不触发 onEnter
    // 否则每帧 clearNametable + hideOam → 黑屏
    // PRG $8000 dispatch — 按 $0027 mode 派发 5 entry action
    const mode = this.store.readByte(0x0027) & 0x07;
    if (mode >= 0 && mode <= 4) {
      this.mainRouter.dispatchByMode(mode as StatusMode);
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
