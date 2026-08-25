/**
 * Scene16Controller — 场景 16 精灵放置（按标志复制精灵属性表 + 多组放置）
 *
 * 行为：若 $005B bit6=1 从 NT 属性表复制调色板到 OAM 高字节；然后从 $02A0 数据表读 16 字节组放置
 * 一次性，返回 2 (hub)
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene16Controller extends SceneController {
  readonly sceneId = 16;
  onEnter(): void {
    const store = this.store;
    if ((store.readByte(0x005b) & 0x40) !== 0) {
      for (let i = 0; i < 0x40; i++) {
        const palByte = store.readByte(0x0240 + i);
        store.writeByte(0x0203 + i * 4, palByte & 0x03);
      }
    }
    let addr = 0x02a0;
    while (addr < 0x0400) {
      const y = store.readByte(addr);
      if (y === 0xff) break;
      const tile = store.readByte(addr + 1);
      const attr = store.readByte(addr + 2);
      const x = store.readByte(addr + 3);
      const slot = (addr - 0x02a0) * 4;
      store.writeByte(0x0200 + slot, y);
      store.writeByte(0x0201 + slot, tile);
      store.writeByte(0x0202 + slot, attr);
      store.writeByte(0x0203 + slot, x);
      addr += 4;
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
