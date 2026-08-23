/**
 * InputService — 手柄输入读取（原 bank02 $80D7-$8115）
 *
 * 对应原始地址：
 *   $80D7-$8104: 读取 $4016/$4017（控制器 1/2），8 bit 移位到 $003F
 *   $8107-$8114: pressed = cur & ~prev → ram_001D/001F；cur → ram_001C/001E
 *   $8117-$8135: 帧计数器累加、ram_001B bit7 置位
 *
 * RAM 布局（与 asm 一致）：
 *   ram_001C = 控制器1 当前状态   ram_001E = 控制器1 按下沿
 *   ram_001D = 控制器2 当前状态   ram_001F = 控制器2 按下沿
 *
 * 按键位（NES 读取顺序）：bit0=A bit1=B bit2=Select bit3=Start
 *                          bit4=Up bit5=Down bit6=Left bit7=Right
 */
import type { DataStore } from '../../data/store/DataStore';

/** NES 按键位定义 */
export const enum Button {
  A = 0x01,
  B = 0x02,
  Select = 0x04,
  Start = 0x08,
  Up = 0x10,
  Down = 0x20,
  Left = 0x40,
  Right = 0x80,
}

export class InputService {
  /** 外部注入的控制器状态（P1/P2，与 core/controller 一致：state[] 每键 0x40=松开/0x41=按下） */
  private rawState: [number[], number[]] = [
    [0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40],
    [0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40],
  ];

  constructor(readonly store: DataStore) {}

  /** 每帧由外层注入手柄状态（core Controller.state） */
  setControllerState(controllerId: 1 | 2, state: number[]): void {
    this.rawState[controllerId - 1] = state;
  }

  /**
   * $80D7-$8115: 读取两控制器 → 更新 ram_001C/001D（当前）/ ram_001E/001F（按下沿）
   * 按下沿 = 当前 & ~上一帧（与 6502 `EOR; AND` 等价）
   */
  readControllers(): void {
    const store = this.store;
    // X=2 → 控制器2；X=1 → 控制器1
    for (let x = 2; x >= 1; x--) {
      const idx = x - 1;
      const state = this.rawState[idx];
      let cur = 0;
      for (let i = 0; i < 8; i++) {
        // state[i] 0x41=按下 → bit
        if (state[i] === 0x41) cur |= 1 << i;
      }
      const prev = store.readByte(0x001a + x); // 001C(1)/001D(2)
      store.writeByte(0x001c + x, cur); // cur → 001C/001D
      store.writeByte(0x001e + x, cur & ~prev); // pressed → 001E/001F
    }
  }

  /** 语义化查询：控制器 n（1/2）某键是否按下 */
  isDown(controller: 1 | 2, button: Button): boolean {
    return (this.store.readByte(controller === 1 ? 0x001c : 0x001d) & button) !== 0;
  }

  /** 语义化查询：控制器 n 某键本帧按下沿 */
  isPressed(controller: 1 | 2, button: Button): boolean {
    return (this.store.readByte(controller === 1 ? 0x001e : 0x001f) & button) !== 0;
  }
}
