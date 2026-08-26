/**
 * Scene14Controller — 场景 14 主游戏第一帧（进场）
 *
 * @bank 02 ($A629 入口，CPU $A629-$A650)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   1. $8976 NT 纹理装载（X=$BD / Y=$23 参数）→ loadNtTexture
 *   2. $9A35 调色板装载 + 满渐显（BG=04 / SPR=$0025&$0F）
 *   3. $058F &= $7F（清中断标志）
 *   4. $004C = $82（滚动/分屏参数）
 *   5. 等 1 帧（$9FA8）
 *   6. $A82F 精灵属性清位：A=$C8(endIdx) / X=$20(startIdx) / Y=$28(外迭代 0x28 次)，
 *      每次外迭代 = { 内层 $0468+X 循环清 $046A bit2/3；等 1 帧 }
 *   7. 完成 → 返回 2 (hub)
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;
const OUTER = 0x28; // Y=$28

export class Scene14Controller extends SceneController {
  readonly sceneId = 14;
  private readonly prim: RenderingPrimitivesService;
  private outer = 0;
  /** 等 1 帧（$9FA8）后置 true — 驱动外迭代节奏 */
  private ready = false;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    const store = this.store;
    // $8976 NT 纹理装载
    this.prim.loadNtTexture(0xbd, 0x23);
    // $9A35 调色板装载 + 满渐显
    this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
    // 清中断标志 / 滚动参数
    store.writeByte(0x058f, store.readByte(0x058f) & 0x7f);
    store.writeByte(0x004c, 0x82);
    this.outer = 0;
    this.ready = false;
    // $A82F 入口：先等 1 帧
    this.scheduleAfter(1, () => { this.ready = true; });
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.ready) return undefined;
    if (this.outer >= OUTER) return NEXT;
    // $A82F 内层：X=$20..$C8 步长 4，$0468,X(y)<$82 → $046A,X &= ~$0C
    this.prim.a82fClearSpriteAttrIter(0xc8, 0x20);
    this.outer++;
    // 每次外迭代后等 1 帧
    this.ready = false;
    this.scheduleAfter(1, () => { this.ready = true; });
    return undefined;
  }
}
