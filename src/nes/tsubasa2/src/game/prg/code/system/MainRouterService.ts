/**
 * MainRouterService — bank00 $8000 5-entry dispatcher 翻译（纯派发表骨架）
 *
 * 翻译原则（v2, 去 CPU 化）:
 *   - 不模拟 6502 RTS 间接 JMP dispatcher table
 *   - 用 jumpTable[5] (action 0..4) 替代 RAM $800D-$8014
 *   - $0027 scene status code 改为 status mode number (0..4)
 *   - 5 个 handler action 改成 method dispatch (table-driven)
 *
 * ⚠ 职责范围 (清理后):
 *   - 仅负责 5-mode dispatch table + dispatchByMode 派发
 *   - **不再**持有 scheduler / boot intro / Start button / audio request /
 *     waitFrames / bootLogoLoad 等 bank00 main loop 周边职责
 *   - 这些已搬到 `Bank00MainLoopService` (PRG $8000 入口完整翻译)
 *
 * Boot link (boot handler + 主循环调度等) 在 Bank00MainLoopService 承接。
 *
 * 对应 PRG 段 (docs/BANK00_ANALYSIS.md §2.1):
 *   $8000: 6-byte dispatcher table jump (LDA $0027 / ASL TAX / LDA $800E,X / PHA / RTS)
 *   $800D: dispatcher table (5 entries × 2 byte → handler $A265 / $A28A / $A2AD / $A2B4 / $A2DA)
 */
import type { DataStore } from '../../data/store/DataStore';
import type { SceneController } from '../scene/SceneController';

/**
 * Status mode (PRG $0027 状态字节 0..4 翻译)
 * 0 = mode0 帧步进/装载
 * 1 = mode1 计时比较
 * 2 = mode2 步进场景
 * 3 = mode3 计时比较
 * 4 = mode4 计时 + 装载 + 渐隐
 */
export type StatusMode = 0 | 1 | 2 | 3 | 4;

/**
 * 5 entry dispatcher table (PRG $800D-$8014)
 * 替代 ROM `LDA $0027 / ASL TAX / LDA $800E,X / PHA / LDA $800D,X / PHA / RTS`
 * H5 上下文: 每个 entry 调 callback 函数, 跳过所有 bank 切换模型
 */
export type DispatchAction = (ctx: { mode: StatusMode; router: MainRouterService }) => void;

export class MainRouterService {
  /** 5 entry dispatcher table — mode 0..4 → action callback */
  private readonly dispatchTable: (DispatchAction | null)[] = new Array(5).fill(null);

  /** 当前 status mode ($0027) */
  private currentMode: StatusMode = 0;

  constructor(readonly store: DataStore) {}

  /**
   * 注册 dispatcher entry（PRG $800D table init 翻译）。
   *
   * ROM 行为: dispatcherTable[mode] = handler_addr
   * H5 行为: 直接覆盖 callback 引用
   *
   * @param mode status mode (0..4)
   * @param action handler callback
   */
  registerDispatchAction(mode: StatusMode, action: DispatchAction | null): void {
    if (mode < 0 || mode > 4) return;
    this.dispatchTable[mode] = action;
  }

  /**
   * 设置当前 status mode 并立即 dispatch（PRG $8000 翻译）。
   *
   * ROM 行为: LDA $0027 → JMP ($800E,X)
   * H5 行为: this.currentMode = mode → 调用对应 callback
   *
   * @param mode 要 dispatch 的 status mode
   */
  dispatchByMode(mode: StatusMode): void {
    this.currentMode = mode;
    const action = this.dispatchTable[mode];
    if (action) action({ mode, router: this });
  }

  /** 当前 status mode getter */
  getMode(): StatusMode {
    return this.currentMode;
  }

  /** 当前 scene 控制器引用 (兼容旧 API, 占位) */
  private currentScene: SceneController | null = null;

  setCurrentScene(scene: SceneController | null): void {
    this.currentScene = scene;
  }

  getCurrentScene(): SceneController | null {
    return this.currentScene;
  }
}
