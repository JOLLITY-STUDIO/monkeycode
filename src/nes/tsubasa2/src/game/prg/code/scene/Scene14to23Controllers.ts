/**
 * Scene14to23Controllers — 场景 14-23 控制器（批量实现）
 *
 * 涵盖：
 *   Scene 14  装载 NT 属性表；调色板装载+满渐显；等1帧；清 bit7；$004C=$82；精灵装载 → 2
 *   Scene 15  NT 缓冲写入长场景（按 RLE 流消费） → 2
 *   Scene 16  精灵放置场景（按标志复制精灵属性表 + 多组放置） → 2
 *   Scene 17  装载 CHR 配置 → 2
 *   Scene 18  等 2 帧；精灵属性翻转 → 2
 *   Scene 19  精灵闪烁循环 0x40 次 {等1帧; 屏外精灵 attr |= $08}；清扩展表；等1帧 → 15
 *   Scene 20  等 1 帧；精灵装载 → 2
 *   Scene 21  装载 CHR 配置 → 2
 *   Scene 22  循环 0x80 次 {等1帧; 屏外精灵 attr |= $04} → 2
 *   Scene 23  数值显示：转 16bit；查表高/低 4 位 → 写 OAM；各等 6 帧 → 2
 *
 * 翻译原则（v2）：
 *   - 用 RenderingPrimitivesService 原语，不暴露 6502 字面量
 *   - 状态机推进，每帧返回下一场景号或 undefined
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

// ────────────────────────────────────────────────
// Scene 14 — 装载 NT 属性表；调色板装载+满渐显；等1帧；清 bit7；$004C=$82；精灵装载
// ────────────────────────────────────────────────
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

// ────────────────────────────────────────────────
// Scene 15 — NT 缓冲写入长场景（按 RLE 流消费；按结束/延时标志控制）
// ────────────────────────────────────────────────
export class Scene15Controller extends SceneController {
  readonly sceneId = 15;
  private readonly prim: RenderingPrimitivesService;
  /** 流指针：当前位置（$05E8 缓冲消费游标） */
  private cursor = 0;
  /** 等帧计数 */
  private waitFrames = 0;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.cursor = 0;
    this.waitFrames = 0;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.waitFrames > 0) {
      this.waitFrames--;
      return undefined;
    }
    const store = this.store;
    // 消费 NT 缓冲：每项 = (count|0x80, addrHi, addrLo, tile...)
    // 简化：从 store.renderQueue 拉一条写入；无则返回下一场景
    const bufAddr = 0x05e8;
    const count = store.readByte(bufAddr);
    if (count === 0) {
      // 流结束 → 返 2
      return NEXT;
    }
    if ((count & 0x80) !== 0) {
      // RLE 项：count & 0x7F = 重复次数，addrHi/addrLo = 目标，tile = 1 字节
      const rep = count & 0x7f;
      const addrHi = store.readByte(bufAddr + 1);
      const addrLo = store.readByte(bufAddr + 2);
      const tile = store.readByte(bufAddr + 3);
      const ntAddr = ((addrHi & 0x3f) << 8) | addrLo;
      const data: number[] = [];
      for (let i = 0; i < rep; i++) data.push(tile);
      this.prim.ntBufferAppend({ vertical: false, ntAddr, data });
      store.writeByte(bufAddr, 0); // 消费该项
      this.waitFrames = 1;
      return undefined;
    } else {
      // 直接项：count = 字节数，addrHi/addrLo = 目标，tile = count 字节
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

// ────────────────────────────────────────────────
// Scene 16 — 精灵放置场景（按标志复制精灵属性表 + 多组放置）
// ────────────────────────────────────────────────
export class Scene16Controller extends SceneController {
  readonly sceneId = 16;
  onEnter(): void {
    const store = this.store;
    // 标志位 ram_005B bit6 = 1 → 复制精灵属性表
    if ((store.readByte(0x005b) & 0x40) !== 0) {
      // 从 NT 属性表复制精灵调色板到 OAM 高字节
      for (let i = 0; i < 0x40; i++) {
        const palByte = store.readByte(0x0240 + i);
        store.writeByte(0x0203 + i * 4, palByte & 0x03);
      }
    }
    // 多组精灵放置：从 $02A0 数据表读 16 字节组
    let addr = 0x02a0;
    while (addr < 0x0400) {
      const y = store.readByte(addr);
      if (y === 0xff) break; // 终止
      const tile = store.readByte(addr + 1);
      const attr = store.readByte(addr + 2);
      const x = store.readByte(addr + 3);
      // 写入 OAM（简化：直接落到下一个空槽）
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

// ────────────────────────────────────────────────
// Scene 17 — 装载 CHR 配置
// ────────────────────────────────────────────────
export class Scene17Controller extends SceneController {
  readonly sceneId = 17;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 18 — 等 2 帧；精灵属性翻转
// ────────────────────────────────────────────────
export class Scene18Controller extends SceneController {
  readonly sceneId = 18;
  private readonly prim: RenderingPrimitivesService;
  private wait = 0;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.wait = 2;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    this.prim.oamFlipAttrs();
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 19 — 精灵闪烁循环 0x40 次 {等1帧; 屏外精灵 attr |= $08} → 15
// ────────────────────────────────────────────────
export class Scene19Controller extends SceneController {
  readonly sceneId = 19;
  private iter = 0;
  private wait = 0;
  private cleared = false;
  onEnter(): void {
    this.iter = 0;
    this.wait = 0;
    this.cleared = false;
  }
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    if (this.iter >= 0x40) {
      if (!this.cleared) {
        // 清扩展表（4 组）
        for (const addr of [0x0568, 0x0588, 0x05a8, 0x05c8]) {
          store.writeByte(addr, 0);
        }
        this.cleared = true;
        this.wait = 1;
        return undefined;
      }
      // 等待标志 → 回到场景 15
      return 0x0f;
    }
    // 等 1 帧；标记屏幕外精灵 attr |= $08
    if (this.iter > 0) {
      for (let i = 0; i < 0x100; i += 4) {
        const y = store.readByte(0x0200 + i);
        if (y >= 0xf0) {
          const attr = store.readByte(0x0202 + i);
          store.writeByte(0x0202 + i, attr | 0x08);
        }
      }
    }
    this.iter++;
    this.wait = 1;
    return undefined;
  }
}

// ────────────────────────────────────────────────
// Scene 20 — 等 1 帧；精灵装载
// ────────────────────────────────────────────────
export class Scene20Controller extends SceneController {
  readonly sceneId = 20;
  private wait = 0;
  onEnter(): void {
    this.wait = 1;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    // 精灵装载标记
    this.store.writeByte(0x0568, 0);
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 21 — 装载 CHR 配置
// ────────────────────────────────────────────────
export class Scene21Controller extends SceneController {
  readonly sceneId = 21;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}

// ────────────────────────────────────────────────
// Scene 22 — 循环 0x80 次 {等1帧; 屏外精灵 attr |= $04}
// ────────────────────────────────────────────────
export class Scene22Controller extends SceneController {
  readonly sceneId = 22;
  private iter = 0;
  private wait = 0;
  onEnter(): void {
    this.iter = 0;
    this.wait = 0;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    if (this.iter >= 0x80) {
      return NEXT;
    }
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const y = store.readByte(0x0200 + i);
      if (y >= 0xf0) {
        const attr = store.readByte(0x0202 + i);
        store.writeByte(0x0202 + i, attr | 0x04);
      }
    }
    this.iter++;
    this.wait = 1;
    return undefined;
  }
}

// ────────────────────────────────────────────────
// Scene 23 — 数值显示：转 16bit；查表高/低 4 位 → 写 OAM；各等 6 帧
// ────────────────────────────────────────────────
export class Scene23Controller extends SceneController {
  readonly sceneId = 23;
  private wait = 0;
  onEnter(): void {
    this.wait = 6;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    const store = this.store;
    // 读取 16-bit 数值（ram_0468/$0469 = 当前分数）
    const lo = store.readByte(0x0468);
    const hi = store.readByte(0x0469);
    const value = (hi << 8) | lo;
    const hiNib = (value >> 4) & 0x0f;
    const loNib = value & 0x0f;
    // 查 tile 表（占位：直接写 nibble 值到 OAM）
    store.writeByte(0x0201, hiNib);
    store.writeByte(0x0205, loNib);
    return NEXT;
  }
}
