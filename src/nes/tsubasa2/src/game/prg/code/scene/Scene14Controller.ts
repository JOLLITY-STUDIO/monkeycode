/**
 * Scene14Controller — 场景 14 主游戏第一帧（进场）
 *
 * 行为：装载 NT 属性表 → 调色板装载+满渐显 → 等 1 帧 → 清 bit7 → $004C=$82 → 精灵装载
 * 完成后返回 2 (hub)
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene14Controller extends SceneController {
  readonly sceneId = 14;
  private readonly prim: RenderingPrimitivesService;
  private step = 0;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.step = 0;
  }
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    switch (this.step) {
      case 0: {
        // 装载 NT 属性表（$2400-$2BFF 区段简化版：属性字节填调色板索引）
        for (let addr = 0x2400; addr <= 0x2bff; addr++) {
          store.writeByte(addr, 0x55);
        }
        this.step = 1;
        return undefined;
      }
      case 1: {
        // 调色板装载 + 满渐显
        this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
        this.step = 2;
        return undefined;
      }
      case 2: {
        // 等 1 帧；清 bit7；$004C = $82
        store.writeByte(0x001b, store.readByte(0x001b) & 0x7f);
        store.writeByte(0x004c, 0x82);
        this.step = 3;
        return undefined;
      }
      case 3: {
        // 精灵装载（$0200-$02FF 由 NMI DMA 同步；此处设标记即可）
        store.writeByte(0x0568, 0);
        return NEXT;
      }
      default:
        return NEXT;
    }
  }
}
