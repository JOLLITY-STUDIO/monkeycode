/**
 * Scene14Controller — 场景 14 主游戏第一帧（进场）
 *
 * @bank 02 ($862A 入口，CPU $862A-$8650)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   1. $8976 行构建装载（X=$BD / Y=$23 参数，经 $00E7/$00E8 入流头）→ buildSceneRows([$BD,$23])
 *   2. $9A35 调色板装载 + 满渐显（BG=04 / SPR=$0025&$0F）
 *   3. $058F &= $7F（清中断标志）
 *   4. $004C = $82（滚动/分屏参数）
 *   5. 等 1 帧（$9FA8）
 *   6. $A82F 精灵属性清位：A=$C8(endIdx) / X=$20(startIdx) / Y=$28(外迭代 0x28 次)，
 *      每次外迭代 = { 内层 $0468+X 循环清 $046A bit2/3；等 1 帧 }
 *   7. 完成 → 返回 Scene15 (主游戏 prep 链)
 *
 * V0.6 fix: 改用 frame counter 不再依赖 scheduler.pushState 路径
 *   (Bank00SchedulerService 测试时发现 IDLE:t=0 残留 — tickDispatch 不被
 *    这里稳定调起; 用 frame 计数做"等 N 帧"语义最简单且 ROM 等价)
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x0f; // → Scene15 (主游戏 prep 链)
const OUTER = 0x28; // Y=$28
const WAIT_FRAMES = 1;

export class Scene14Controller extends SceneController {
  readonly sceneId = 14;
  private readonly prim: RenderingPrimitivesService;
  private outer = 0;
  /** 已等够的帧数 — 进入已 "ready" 即开始外迭代 */
  private waitCounter = 0;
  /** 已完成外迭代次数（用于判断 chain advance 条件） */
  private outerDone = 0;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  onEnter(): void {
    const store = this.store;
    // $8976 行构建装载（X=$BD / Y=$23 → $00E7/$00E8 → 流头）
    this.prim.buildSceneRows([0xbd, 0x23]);
    // $9A35 调色板装载 + 满渐显
    this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
    // 清中断标志 / 滚动参数
    store.writeByte(0x058f, store.readByte(0x058f) & 0x7f);
    store.writeByte(0x004c, 0x82);
    this.outer = 0;
    this.outerDone = 0;
    this.waitCounter = 0;
  }

  onUpdate(_frame: number): number | undefined {
    if (this.outerDone >= OUTER) return NEXT;
    if (this.waitCounter < WAIT_FRAMES) {
      this.waitCounter++;
      return undefined;
    }
    // $A82F 内层：X=$20..$C8 步长 4，$0468,X(y)<$82 → $046A,X &= ~$0C
    this.prim.a82fClearSpriteAttrIter(0xc8, 0x20);
    this.outer++;
    this.outerDone++;
    // 每次外迭代后等 1 帧
    this.waitCounter = 0;
    return undefined;
  }
}
