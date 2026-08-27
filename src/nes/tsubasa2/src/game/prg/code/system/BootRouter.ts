/**
 * BootRouter — bank02 主循环路由 (PRG $A000-$BFFF 在 R7=2 时的 Scene0/Scene1+ 路由翻译)
 *
 * 翻译原则 (v3, 去 bank00 化):
 *   - **本类只承接 bank02 翻译**: scene 注册表 + changeScene + 当前 scene 调度
 *   - **不再**持有 MainRouterService / Bank00SchedulerService / 5-mode dispatcher
 *   - bank00 主循环 (5-mode dispatch + scheduler tail + boot logo) 翻译 = Bank00MainLoopService
 *   - 调度依赖 (PRG $9FA8 pushState) = SceneController base class 通过 attachScheduler() 注入
 *
 * 职责清晰切分:
 *   ┌─ Tsubasa2 组合根
 *   ├─ Bank00MainLoopService  (PRG $8000 主循环: 5-mode dispatch + wait/spin + audio req)
 *   ├─ BootRouter              (PRG $A000 bank02 Scene0 handler 入口路由, 当前文件)
 *   ├─ PpuTransferService     (PRG $8464 cfg 装载, 多 bank cfg 表)
 *   └─ SceneController[0..23] (各 scene handler 翻译)
 *
 * 对应 PRG 段 (docs/BANK02_ANALYSIS.md):
 *   $A203 (bank2 main loop body): scene dispatch → 切到当前 scene controller
 *   changeScene(sceneId):
 *     - 关 IRQ 计数器 (PRG $00E0 等)
 *     - 隐藏 OAM (hideOam)
 *     - 清 NT (clearNametable)
 *     - 初始化 PPU CTRL/MASK
 *     - 装载 $8464 cfg (PRG $8464 多 bank cfg 表 → PpuTransferService)
 *     - 切到目标 scene controller 调 onEnter
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from './InputService';
import type { PpuTransferService } from './PpuTransferService';
import type { Bank00SchedulerService } from './Bank00SchedulerService';
import type { Bank00MainLoopService } from './Bank00MainLoopService';
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
  OpeningSceneController, OPENING_SCENE_ID,
  TitleMenuSceneController, TITLE_MENU_SCENE_ID,
  MeetingSceneController, MEETING_SCENE_ID,
  MatchStartSceneController, MATCH_START_SCENE_ID,
} from '../scene/index';

/** 场景号枚举 (0-23 + Opening=100 + TitleMenu=200) */
export const enum SceneId {
  Scene0 = 0, Scene1 = 1, Scene2 = 2, Scene3 = 3, Scene4 = 4, Scene5 = 5,
  Scene6 = 6, Scene7 = 7, Scene8 = 8, Scene9 = 9, Scene10 = 10, Scene11 = 11,
  Scene12 = 12, Scene13 = 13, Scene14 = 14, Scene15 = 15, Scene16 = 16,
  Scene17 = 17, Scene18 = 18, Scene19 = 19, Scene20 = 20, Scene21 = 21,
  Scene22 = 22, Scene23 = 23,
  /** OpeningScene（片头序列，附加场景；播完自动切 Scene0；START 触发跳到 TitleMenu） */
  Opening = OPENING_SCENE_ID,
  /** TitleMenuScene（ROM 主菜单，附加场景；由 OpeningScene START 触发进入；静态显示） */
  TitleMenu = TITLE_MENU_SCENE_ID,
}

/** Scene0-23 + Opening + TitleMenu 控制器类列表 (顺序对应 sceneId), 用于自动统一 register */
const SCENE_CONTROLLERS: ReadonlyArray<new (store: DataStore, input: InputService) => SceneController> = [
  Scene0Controller,
  Scene1Controller, Scene2Controller, Scene3Controller, Scene4Controller,
  Scene5Controller, Scene6Controller, Scene7Controller, Scene8Controller,
  Scene9Controller, Scene10Controller, Scene11Controller, Scene12Controller,
  Scene13Controller,
  Scene14Controller, Scene15Controller, Scene16Controller, Scene17Controller,
  Scene18Controller, Scene19Controller, Scene20Controller, Scene21Controller,
  Scene22Controller, Scene23Controller,
  OpeningSceneController,
  TitleMenuSceneController,
  MeetingSceneController,
  MatchStartSceneController,
];

/**
 * BootRouter — bank02 主循环路由 (PRG $A000-$BFFF).
 *
 * ⚠ 与 bank00 职责严格分离:
 *   - bank00 (PRG $8000-$9FFF) 主循环 / 5-mode dispatch / boot logo → Bank00MainLoopService
 *   - bank02 (PRG $A000-$BFFF) Scene0+ handler 路由 → 当前类
 */
export class BootRouter {
  /** 场景控制器注册表 (sceneId → controller) */
  private readonly scenes: Map<number, SceneController> = new Map();

  /** PPU transfer cfg loader (PRG $8464 多 bank 装载) — 由 Tsubasa2 构造时注入 */
  private ppuTransfer: PpuTransferService | null = null;

  /** ⚠️ bank14 $C500 6-slot recurring timer dispatcher (v2 stub 接入点, 不绑死 slot) */
  private mainLoop: Bank00MainLoopService | null = null;

  private currentSceneId = SceneId.Scene0;
  private current: SceneController | null = null;

  constructor(
    readonly store: DataStore,
    readonly input: InputService,
  ) {
    for (const Ctor of SCENE_CONTROLLERS) {
      this.register(new Ctor(store, input));
    }
  }

  /**
   * 注入 PpuTransferService (PRG $8464 cfg loader 翻译)。
   * 由 Tsubasa2 boot() 在构造 BootRouter 之后调用, 让 BootRouter.changeScene()
   * 自动调 loadCfgBlock(sceneId) 装 cfg.
   *
   * 如不注入: changeScene() 跳过 cfg 装载 (向后兼容 stub 模式).
   */
  attachPpuTransfer(ppu: PpuTransferService): void {
    this.ppuTransfer = ppu;
  }

  /**
   * 注入 bank00 scheduler (PRG $9FA8 pushState 翻译)。
   * 由 Tsubasa2 boot() 调用, 让 SceneController.scheduleAfter() 能 pushState.
   * bank00 scheduler 本身由 Bank00MainLoopService 持有 (push 入队),
   * 这里只是把同一引用透传到所有 scene controller base class.
   */
  attachScheduler(scheduler: Bank00SchedulerService): void {
    for (const c of this.scenes.values()) {
      c.attachScheduler(scheduler);
    }
  }

  /**
   * ⚠️ v2 stub — 注入 Bank00MainLoopService (PRG $C500 6-slot recurring dispatcher 翻译)
   *
   * 与 attachScheduler 的区别:
   *   - attachScheduler: 一次性 pushState, 等 N 帧 callback 触发一次后消费 (one-shot)
   *   - **attachMainLoop: 周期触发 slot handler (recurring)** — 每 N 帧持续触发现场 controller.onSlotTick()
   *
   * 当前 stub 仅持有引用, 不注册任何 slot. 待 Bank00MainLoopService 在 Tsubasa2.boot() 末尾接入后,
   * 再由调用方决定:
   *   - slot 0 → scene0.onSlotTick() (period=12, initialDelay=270 — 按 BANK02_ANALYSIS.md 实证)
   *   - slot 1 → scene2.onSlotTick() (period=不规则, 71 次)
   *   - ... 其他 slot 各自 scene
   *
   * 注意: 当前 BootRouter.update() 仍按每帧调 current.onUpdate() 旧路径工作,
   *       mainLoop 接入后才是 slot 驱动. **未启用, 行为不退化**.
   */
  attachMainLoop(mainLoop: Bank00MainLoopService): void {
    this.mainLoop = mainLoop;
    // TODO: 等 trace 完全定位各 scene slot 配置后, 在此处注册 slot
    // (目前不绑死任何场景, 留空 stub)
  }

  /** Debug: 拿到 mainLoop 引用 */
  getMainLoop(): Bank00MainLoopService | null {
    return this.mainLoop;
  }

  // ✅ BUG #014 + OpeningScene 接管 (2026-08):
  //   boot logo + 完整片头（NES f10-f3599）由 OpeningSceneController（sceneId=100）
  //   按 OpeningScreenTable GT 数据播放（Tecmo logo / NTV / 10 屏字幕 / story_cup），
  //   播完 changeScene(0)。Scene0 从真实窗口 f3600 起（BgFadeOut 起，无 boot FadeIn）。
  //   Bank00MainLoopService.bootLogoLoad() 为 ROM 逐指令参考实现（hooks 未驱动）。

  /** 注册/覆盖场景控制器 */
  register(controller: SceneController): void {
    this.scenes.set(controller.sceneId, controller);
  }

  /** 获取场景控制器 (断言已注册 — Scene0-23 全部从 scene/index.ts 导入) */
  getController(sceneId: number): SceneController {
    const c = this.scenes.get(sceneId);
    if (!c) throw new Error(`BootRouter.getController: sceneId=${sceneId} 未注册`);
    return c;
  }

  /**
   * 切换场景 (PRG $A203 bank2 main loop body 翻译).
   *
   * - 前序: 关 IRQ 计数器 / 隐藏 OAM / 清 NT
   * - PPU CTRL/MASK 初始化
   * - PRG $8464 cfg 装载 (写 $004D/$004E/$0056/$00ED + NT fill 0x20=$55)
   *   → PpuTransferService.loadCfgBlock(sceneId)
   * - scene.currentSceneId 具名写回并分发到对应 controller
   */
  changeScene(sceneId: number): void {
    const store = this.store;
    console.log(`[BootRouter] changeScene(${sceneId}) from=${this.currentSceneId}`);
    store.writeByte(0x0469, 0x00);
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, 0xf8);
    for (let addr = 0x2000; addr <= 0x23ff; addr++) store.writeByte(addr, 0);
    store.ppuState.ctrl = 0x08; // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.ppuState.mask = 0x1e; // PPU MASK: BG+SPR 可见
    store.ppuState.chrSelBase = 0x00;
    // PRG $8464 cfg 装载 (multi-bank) — 由 PpuTransferService 承接
    // 写 $004D/$004E (装载段 ptr) / $0056 (param) / $00ED (current row) + NT fill
    this.ppuTransfer?.loadCfgBlock(sceneId);
    this.currentSceneId = sceneId;
    store.scene.currentSceneId = sceneId;
    const controller = this.getController(sceneId);
    this.current = controller;
    console.log(`[BootRouter] changeScene(${sceneId}) -> controller=${controller?.sceneId} 0x00ED=${store.readByte(0x00ed)}`);
    controller?.onEnter();
    console.log(`[BootRouter] changeScene(${sceneId}) -> after onEnter 0x00ED=${store.readByte(0x00ed)}`);
  }

  /**
   * 每帧更新 (bank02 Scene0 主循环 dispatch).
   *
   * 1. 调当前 scene controller.onUpdate(frame) → 返回 next sceneId
   * 2. 若 next != current → changeScene(next)
   * 3. 注: bank00 5-mode dispatch 由 Bank00MainLoopService.tickFrame() 触发,
   *    此方法不重复 dispatch.
   */
  update(frame: number): void {
    const next = this.current?.onUpdate(frame);
    if (next !== undefined && next !== this.currentSceneId) {
      this.changeScene(next);
    }
    // 同一 scene 重复进入 (scene 2 等"占位 do-nothing"场景) 不触发 onEnter
    // 否则每帧 clearNametable + hideOam → 黑屏
  }

  /** 每帧渲染 (主渲染路径) */
  render(): void {
    this.current?.onRender();
  }

  /** 当前场景号 */
  get sceneId(): number {
    return this.currentSceneId;
  }
}
