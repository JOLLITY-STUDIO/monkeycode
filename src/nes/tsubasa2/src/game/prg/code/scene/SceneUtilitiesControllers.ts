/**
 * SceneUtilitiesControllers — 场景 1-13 工具型控制器（批量实现）
 *
 * 这些场景都是「单操作立即返回下一场景」的简单工具：
 *   Scene 1  数学工具（16bit 取补 → 返回 3）
 *   Scene 2  清精灵扩展表（$0568/$0588/$05A8/$05C8 = 0）→ 返回 2
 *   Scene 3  清 NT0/NT1 ($2000-$2BFF 填 0) → 返回 2
 *   Scene 4  隐藏全部 OAM ($0200-$02FF 填 $F8) → 返回 2
 *   Scene 5  $0009 延迟计数器（仅返回 2）
 *   Scene 6  $0009 标志处理（仅返回 2）
 *   Scene 7  标记置 $FF → 返回 2
 *   Scene 8  ram_001B 清 bit6 → 返回 2
 *   Scene 9  ram_001B 置 bit6 → 返回 2
 *   Scene 10 装载 CHR 配置 0 + 装载场景数据 5 → 返回 2
 *   Scene 11 若 $000D≠0：清 $000D/$000E；否则 装载 CHR + 场景数据 6 → 返回 2
 *   Scene 12 若 $000D≠0：清 $000D/$000E；否则 装载 CHR + 场景数据 8 → 返回 2
 *   Scene 13 装载 CHR 配置 + 装载场景数据 7 → 返回 2
 *
 * 翻译原则（v2）：
 *   - 每帧 onUpdate 返回下一场景号（2 = 默认下一场景）或 undefined
 *   - 行为语义等价原 asm，但用 store 具名视图，不暴露 6502 字面量
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02; // 默认下一场景号

// ────────────────────────────────────────────────
// Scene 1 — 数学工具（16bit 取补 → 返回 3）
// ────────────────────────────────────────────────
export class Scene1Controller extends SceneController {
  readonly sceneId = 1;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    // $A55A: 数学工具 $00EC>>2 取补（s16→s32 扩展）。语义：把符号位扩展到 16bit
    // 不修改运行时状态（仅作为下一个场景调度），直接返回下一场景
    void this.prim; // 占位依赖，避免 lint 警告未使用
    return 0x03;
  }
}

// ────────────────────────────────────────────────
// Scene 2 — 清精灵扩展表（$0568/$0588/$05A8/$05C8 = 0）
// ────────────────────────────────────────────────
export class Scene2Controller extends SceneController {
  readonly sceneId = 2;
  onEnter(): void {
    const store = this.store;
    // 4 组影子 OAM 扩展字节清零（高 64 字节的 y-pos 偏移等）
    for (const addr of [0x0568, 0x0588, 0x05a8, 0x05c8]) {
      store.writeByte(addr, 0);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 3 — 清 NT0/NT1 ($2000-$2BFF 填 0)
// ────────────────────────────────────────────────
export class Scene3Controller extends SceneController {
  readonly sceneId = 3;
  onEnter(): void {
    const store = this.store;
    // NT0 ($2000-$23FF) + NT1 ($2400-$27FF) + 属性 ($2800-$2BFF)
    for (let addr = 0x2000; addr <= 0x2bff; addr++) {
      store.writeByte(addr, 0);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 4 — 隐藏全部 OAM ($0200-$02FF 填 $F8)
// ────────────────────────────────────────────────
export class Scene4Controller extends SceneController {
  readonly sceneId = 4;
  onEnter(): void {
    const store = this.store;
    // OAM 256 字节全部填 $F8 (y=248 → 屏外)
    for (let addr = 0x0200; addr <= 0x02ff; addr++) {
      store.writeByte(addr, 0xf8);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 5 — $0009 延迟计数器（仅返回 2）
// ────────────────────────────────────────────────
export class Scene5Controller extends SceneController {
  readonly sceneId = 5;
  onEnter(): void {
    // 占位：$0009 延迟计数逻辑在 NMI 中处理
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 6 — $0009 标志处理（仅返回 2）
// ────────────────────────────────────────────────
export class Scene6Controller extends SceneController {
  readonly sceneId = 6;
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 7 — 标记置 $FF
// ────────────────────────────────────────────────
export class Scene7Controller extends SceneController {
  readonly sceneId = 7;
  onEnter(): void {
    // $0099 = $FF (NMI 帧末标志)
    this.store.writeByte(0x0099, 0xff);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 8 — ram_001B 清 bit6
// ────────────────────────────────────────────────
export class Scene8Controller extends SceneController {
  readonly sceneId = 8;
  onEnter(): void {
    this.store.writeByte(0x001b, this.store.readByte(0x001b) & 0xbf);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 9 — ram_001B 置 bit6
// ────────────────────────────────────────────────
export class Scene9Controller extends SceneController {
  readonly sceneId = 9;
  onEnter(): void {
    this.store.writeByte(0x001b, this.store.readByte(0x001b) | 0x40);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 10 — 装载 CHR 配置 0 + 装载场景数据 5
// ────────────────────────────────────────────────
export class Scene10Controller extends SceneController {
  readonly sceneId = 10;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
    this.prim.loadSceneData(5);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 11 — 若 $000D≠0：清 $000D/$000E；否则 装载 CHR + 场景数据 6
// ────────────────────────────────────────────────
export class Scene11Controller extends SceneController {
  readonly sceneId = 11;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    const store = this.store;
    if (store.readByte(0x000d) !== 0) {
      store.writeByte(0x000d, 0);
      store.writeByte(0x000e, 0);
    } else {
      this.prim.loadChrConfig(0x00);
      this.prim.loadSceneData(6);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 12 — 同 11，但装载场景数据 8
// ────────────────────────────────────────────────
export class Scene12Controller extends SceneController {
  readonly sceneId = 12;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    const store = this.store;
    if (store.readByte(0x000d) !== 0) {
      store.writeByte(0x000d, 0);
      store.writeByte(0x000e, 0);
    } else {
      this.prim.loadChrConfig(0x00);
      this.prim.loadSceneData(8);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 13 — 装载 CHR 配置 + 装载场景数据 7
// ────────────────────────────────────────────────
export class Scene13Controller extends SceneController {
  readonly sceneId = 13;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
    this.prim.loadSceneData(7);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
