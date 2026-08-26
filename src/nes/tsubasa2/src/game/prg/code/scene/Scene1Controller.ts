/**
 * Scene1Controller — 场景 1 数学工具（bank02 $855A-$857B 实证）
 *
 * 行为（PRG $855A）：
 *   $0060 = 0；A = $00EC；LSR/ROR $0060 ×2 → $0060:$0061 = $00EC >> 2（16bit 逻辑右移）
 *   BIT $0062；BMI 跳过取负；否则 $0060:$0061 = 0 - value（16bit 取补）
 *   返回 3 = Scene3
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene1Controller extends SceneController {
  readonly sceneId = 1;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    // LDA #$00 / STA $0060（高字节清零）
    let hi = 0;
    let a = store.readByte(0x00ec);
    // LSR; ROR $0060 ×2：16bit 逻辑右移 2 位
    for (let i = 0; i < 2; i++) {
      const carry = a & 1;
      a = (a >> 1) & 0x7f;
      hi = (((carry << 7) | (hi >> 1)) & 0xff);
    }
    store.writeByte(0x0061, a); // 低字节
    store.writeByte(0x0060, hi); // 高字节
    // BIT $0062 / BMI 跳过：$0062 bit7=1 → 保持正值
    if ((store.readByte(0x0062) & 0x80) === 0) {
      // LDA #$00; SEC; SBC $0060/$0061 ×2 → 16bit 取负
      const v = ((hi << 8) | a) & 0xffff;
      const neg = (0x10000 - v) & 0xffff;
      store.writeByte(0x0060, (neg >> 8) & 0xff);
      store.writeByte(0x0061, neg & 0xff);
    }
    return 0x03; // → Scene3
  }
}
