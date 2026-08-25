/**
 * Scene15Controller — 场景 15 NT 缓冲写入长场景
 *
 * 行为：消费 NT 缓冲流（$05E8 起的 RLE 项）→ 写完返回 2 (hub)
 *
 * RLE 项之间"等 1 帧"用基类 scheduleAfter(1, cb) 替代 this.waitFrames-- 模式。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene15Controller extends SceneController {
  readonly sceneId = 15;
  private readonly prim: RenderingPrimitivesService;
  private cursor = 0;
  /** RLE 项之间等 1 帧 — scheduler 派发回调后置 true */
  private waitDone = true;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.cursor = 0;
    this.waitDone = true;
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.waitDone) return undefined;
    const store = this.store;
    const bufAddr = 0x05e8;
    const count = store.readByte(bufAddr);
    if (count === 0) return NEXT; // 流结束 → hub
    if ((count & 0x80) !== 0) {
      // RLE 项：count & 0x7F = 重复次数
      const rep = count & 0x7f;
      const addrHi = store.readByte(bufAddr + 1);
      const addrLo = store.readByte(bufAddr + 2);
      const tile = store.readByte(bufAddr + 3);
      const ntAddr = ((addrHi & 0x3f) << 8) | addrLo;
      const data: number[] = [];
      for (let i = 0; i < rep; i++) data.push(tile);
      this.prim.ntBufferAppend({ vertical: false, ntAddr, data });
      store.writeByte(bufAddr, 0);
      // PRG $9FA8 pushState 翻译：RLE 项后等 1 帧
      this.waitDone = false;
      this.scheduleAfter(1, () => { this.waitDone = true; });
      return undefined;
    } else {
      // 直接项：count = 字节数
      const len = count;
      const addrHi = store.readByte(bufAddr + 1);
      const addrLo = store.readByte(bufAddr + 2);
      const ntAddr = ((addrHi & 0x3f) << 8) | addrLo;
      const data: number[] = [];
      for (let i = 0; i < len; i++) data.push(store.readByte(bufAddr + 3 + i));
      this.prim.ntBufferAppend({ vertical: false, ntAddr, data });
      store.writeByte(bufAddr, 0);
      return undefined;
    }
  }
}
