/**
 * RamViews — 具象化 RAM 命名空间视图（替代 readByte(0xXXXX) 业务 API）
 *
 * 翻译原则（v2）：
 *   - 禁止 Service 把 0xXXXX 字面量当业务状态 API（应通过具名 view 访问）
 *   - 允许：DataStore.readByte/writeByte 作为底层入口（仅硬件帧缓冲/VRAM 写透/中断内部用）
 *   - 命名空间视图按业务域分包：scene / palette / oam / ppuState / audioState / renderQueue
 *
 * 用法：
 *   store.scene.currentSceneId        // 等价 store.readByte(0x00ed)
 *   store.scene.scrollY              // 等价 store.readByte(0x0044)
 *   store.palette.bg[0]              // 等价 store.readByte(0x062a)
 *   store.oam.sprite(i).y            // 等价 store.readByte(0x0468 + i*4)
 *   store.audioState.bgmRequest      // 等价 store.readByte(0x0700)
 *
 * 历史：原 Service 直接 store.read('ram_005B') / writeByte(0x0079, ...) 满天飞，
 *       这种"用 16-bit RAM 地址当字段名"是 CPU 时代的产物，H5 必须用具名视图替代。
 */

import type { DataStore } from './DataStore';

/** 场景状态视图 */
export class SceneView {
  constructor(private readonly s: DataStore) {}

  /** 当前场景号（ram_00ED） */
  get currentSceneId(): number { return this.s.readByte(0x00ed); }
  set currentSceneId(v: number) { this.s.writeByte(0x00ed, v & 0xff); }

  /** 滚动标志（ram_0079：bit7 = 文本滚动路径） */
  get scrollFlag(): number { return this.s.readByte(0x0079); }
  set scrollFlag(v: number) { this.s.writeByte(0x0079, v & 0xff); }

  /** 滚动 X（ram_007A） */
  get scrollX(): number { return this.s.readByte(0x007a); }
  set scrollX(v: number) { this.s.writeByte(0x007a, v & 0xff); }

  /** 滚动 Y（ram_0044，最终 -1 = $007A/0044 路径） */
  get scrollY(): number { return this.s.readByte(0x0044); }
  set scrollY(v: number) { this.s.writeByte(0x0044, v & 0xff); }

  /** 主标志（ram_001B：bit0 = 标志 A，bit7 = 渲染路径） */
  get flags(): number { return this.s.readByte(0x001b); }
  set flags(v: number) { this.s.writeByte(0x001b, v & 0xff); }

  /** 数据段选择（ram_0077 = ram_0025） */
  get dataSegment(): number { return this.s.readByte(0x0077); }
  set dataSegment(v: number) { this.s.writeByte(0x0077, v & 0xff); }
}

/** 调色板视图（BG $062A-$0639 / SPR $063A-$0649） */
export class PaletteView {
  constructor(private readonly s: DataStore) {}

  /** 16 项 BG 调色板（ram_062A 起 16 字节） */
  get bg(): Uint8Array { return this.s.ram.subarray(0x062a, 0x063a); }

  /** 16 项 SPR 调色板（ram_063A 起 16 字节） */
  get spr(): Uint8Array { return this.s.ram.subarray(0x063a, 0x064a); }

  /** 装载 BG 调色板（16 字节 → ram_062A） */
  loadBg(palette: ReadonlyArray<number>): void {
    for (let i = 0; i < 0x10; i++) this.s.writeByte(0x062a + i, palette[i] & 0x3f);
  }

  /** 装载 SPR 调色板（16 字节 → ram_063A） */
  loadSpr(palette: ReadonlyArray<number>): void {
    for (let i = 0; i < 0x10; i++) this.s.writeByte(0x063a + i, palette[i] & 0x3f);
  }
}

/** 精灵 OAM 视图（影子 OAM $0468-$0567，每精灵 4 字节 [y, tile, attr, x]） */
export class OamView {
  constructor(private readonly s: DataStore) {}

  /** 64 个精灵（每精灵 4 字节） */
  get shadowOam(): Uint8Array { return this.s.ram.subarray(0x0468, 0x0568); }

  /** 实际 OAM 缓冲（$0200-$02FF） */
  get oam(): Uint8Array { return this.s.oamBuffer; }

  /** 第 i 个精灵的 Y 坐标（$0468+i*4） */
  spriteY(i: number): number { return this.s.readByte(0x0468 + i * 4); }
  setSpriteY(i: number, v: number) { this.s.writeByte(0x0468 + i * 4, v & 0xff); }

  /** 第 i 个精灵的属性字节（$046A+i*4） */
  spriteAttr(i: number): number { return this.s.readByte(0x046a + i * 4); }
  setSpriteAttr(i: number, v: number) { this.s.writeByte(0x046a + i * 4, v & 0xff); }

  /** 第 i 个精灵的 X 坐标（$046B+i*4） */
  spriteX(i: number): number { return this.s.readByte(0x046b + i * 4); }
  setSpriteX(i: number, v: number) { this.s.writeByte(0x046b + i * 4, v & 0xff); }

  /** 第 i 个精灵的 tile 索引（$0469+i*4） */
  spriteTile(i: number): number { return this.s.readByte(0x0469 + i * 4); }
  setSpriteTile(i: number, v: number) { this.s.writeByte(0x0469 + i * 4, v & 0xff); }
}

/** PPU 状态视图（CTRL/MASK/bank 基址/滚动暂存） */
export class PpuStateView {
  constructor(private readonly s: DataStore) {}

  /** PPU CTRL（$0020：bit7 NMI, bit2-0 背景表/精灵/H8） */
  get ctrl(): number { return this.s.readByte(0x0020); }
  set ctrl(v: number) { this.s.writeByte(0x0020, v & 0xff); }

  /** PPU MASK（$0021：BG/SPR 可见 + 灰度 + 强化色） */
  get mask(): number { return this.s.readByte(0x0021); }
  set mask(v: number) { this.s.writeByte(0x0021, v & 0xff); }

  /** Bank 基址 / CHR 选择（$0022：bit0-2 cmd base, bit7 chrSel） */
  get chrSelBase(): number { return this.s.readByte(0x0022); }
  set chrSelBase(v: number) { this.s.writeByte(0x0022, v & 0xff); }

  /** 滚动 X 临时（$004A + $0538） */
  get scrollTempX(): number { return (this.s.readByte(0x004a) + this.s.readByte(0x0538)) & 0xff; }

  /** 滚动 Y 临时（$004B） */
  get scrollTempY(): number { return this.s.readByte(0x004b); }
}

/** 调色板渐变视图（$004A 渐显 BG / $004B 渐显 SPR） */
export class FadeView {
  constructor(private readonly s: DataStore) {}

  /** BG 渐显（$004A：$0F 最亮 → 0 最暗） */
  get bg(): number { return this.s.readByte(0x004a) & 0x0f; }
  set bg(v: number) { this.s.writeByte(0x004a, v & 0x0f); }

  /** SPR 渐显（$004B） */
  get spr(): number { return this.s.readByte(0x004b) & 0x0f; }
  set spr(v: number) { this.s.writeByte(0x004b, v & 0x0f); }
}

/** 音频状态视图（$0700 BGM 请求 / $0701-$0705 SE 请求 / $0706 通道使能 / $0707- 通道状态） */
export class AudioStateView {
  constructor(private readonly s: DataStore) {}

  /** BGM 请求（$0700） */
  get bgmRequest(): number { return this.s.readByte(0x0700); }
  set bgmRequest(v: number) { this.s.writeByte(0x0700, v & 0xff); }

  /** SE 请求（$0701-$0705） */
  get seRequest1(): number { return this.s.readByte(0x0701); }
  set seRequest1(v: number) { this.s.writeByte(0x0701, v & 0xff); }
  get seRequest2(): number { return this.s.readByte(0x0702); }
  set seRequest2(v: number) { this.s.writeByte(0x0702, v & 0xff); }
  get seRequest3(): number { return this.s.readByte(0x0703); }
  set seRequest3(v: number) { this.s.writeByte(0x0703, v & 0xff); }
  get seRequest4(): number { return this.s.readByte(0x0704); }
  set seRequest4(v: number) { this.s.writeByte(0x0704, v & 0xff); }
  get seRequest5(): number { return this.s.readByte(0x0705); }
  set seRequest5(v: number) { this.s.writeByte(0x0705, v & 0xff); }

  /** 全局静音标志（$07E9） */
  get muteAll(): number { return this.s.readByte(0x07e9); }
  set muteAll(v: number) { this.s.writeByte(0x07e9, v & 0xff); }

  /** 通道使能位（$0706：8 通道 bit） */
  get channelMask(): number { return this.s.readByte(0x0706); }
  set channelMask(v: number) { this.s.writeByte(0x0706, v & 0xff); }

  /** 第 ch 通道的计数（$0707+ch*4 起 4 字节） */
  channelCounter(ch: number): { durLo: number; durHi: number; noteDur: number; nextDurHi: number } {
    const x = 0x0707 + ch * 4;
    return {
      durLo: this.s.readByte(x),
      durHi: this.s.readByte(x + 1),
      noteDur: this.s.readByte(x + 2),
      nextDurHi: this.s.readByte(x + 3),
    };
  }
  setChannelCounter(ch: number, c: { durLo?: number; durHi?: number; noteDur?: number; nextDurHi?: number }): void {
    const x = 0x0707 + ch * 4;
    if (c.durLo !== undefined) this.s.writeByte(x, c.durLo & 0xff);
    if (c.durHi !== undefined) this.s.writeByte(x + 1, c.durHi & 0xff);
    if (c.noteDur !== undefined) this.s.writeByte(x + 2, c.noteDur & 0xff);
    if (c.nextDurHi !== undefined) this.s.writeByte(x + 3, c.nextDurHi & 0xff);
  }
}

/** 渲染队列视图（$0498 第一队列 / $0515+$04A5 第二队列 / $05E8 NT 缓冲） */
export class RenderQueueView {
  constructor(private readonly s: DataStore) {}

  /** 第一队列计数（$0498，0 = 空） */
  get queue1Count(): number { return this.s.readByte(0x0498); }
  setQueue1Count(v: number) { this.s.writeByte(0x0498, v & 0xff); }

  /** 第一队列第 i 项 (bank, ptrLo, ptrHi)（$0499+i*3 起 3 字节） */
  queue1Entry(i: number): { bank: number; addr: number } | null {
    const cnt = this.queue1Count;
    if (i < 0 || i >= cnt) return null;
    const x = 0x0499 + i * 3;
    const bank = this.s.readByte(x);
    const lo = this.s.readByte(x + 1);
    const hi = this.s.readByte(x + 2);
    return { bank, addr: (hi << 8) | lo };
  }

  /** 第二队列挂起标志（$0515 bit7） */
  get queue2Pending(): boolean { return (this.s.readByte(0x0515) & 0x80) !== 0; }
  setQueue2Pending(v: boolean) {
    const cur = this.s.readByte(0x0515) & 0x7f;
    this.s.writeByte(0x0515, v ? (cur | 0x80) : cur);
  }

  /** NT 渲染缓冲写入位置（$0628） */
  get ntBufferPos(): number { return this.s.readByte(0x0628) & 0xff; }
  setNtBufferPos(v: number) { this.s.writeByte(0x0628, v & 0xff); }

  /** NT 渲染缓冲忙标志（$0629 bit6） */
  get ntBufferBusy(): boolean { return (this.s.readByte(0x0629) & 0x40) !== 0; }
  setNtBufferBusy(v: boolean) {
    const cur = this.s.readByte(0x0629) & 0xbf;
    this.s.writeByte(0x0629, v ? (cur | 0x40) : cur);
  }

  /** NT 渲染缓冲（$05E8-$0627，共 64 字节） */
  get ntBuffer(): Uint8Array { return this.s.ram.subarray(0x05e8, 0x0628); }
}

/**
 * 比赛回合视图（$05E3-$05FF 区间业务状态）
 *
 * 业务字段（替代 'ram_05E3' / 'ram_05E4' / 'ram_05E5' / 'ram_05E9' / 'ram_05F4' 字符串键）：
 * - active：是否进行中（$05E3）
 * - sequence：段序号（$05E4）
 * - counter：段内倒计时（$05E9）
 * - typeId：类型 ID（$05E5）
 * - paramId：参数 ID（$05F4）
 * - nextEventId（$0600+，扩展位）
 */
export class MatchRoundView {
  constructor(private readonly s: DataStore) {}

  get active(): number { return this.s.readByte(0x05e3); }
  set active(v: number) { this.s.writeByte(0x05e3, v & 0xff); }

  get sequence(): number { return this.s.readByte(0x05e4); }
  set sequence(v: number) { this.s.writeByte(0x05e4, v & 0xff); }

  get typeId(): number { return this.s.readByte(0x05e5); }
  set typeId(v: number) { this.s.writeByte(0x05e5, v & 0xff); }

  get counter(): number { return this.s.readByte(0x05e9); }
  set counter(v: number) { this.s.writeByte(0x05e9, v & 0xff); }

  get paramId(): number { return this.s.readByte(0x05f4); }
  set paramId(v: number) { this.s.writeByte(0x05f4, v & 0xff); }
}

/**
 * 比赛事件视图（$053A-$055E 区间业务状态）
 *
 * 业务字段（替代 'ram_053A' / 'ram_053B' / 'ram_053D' / 'ram_0540' / 'ram_0541' 等字符串键）：
 */
export class MatchEventView {
  constructor(private readonly s: DataStore) {}

  get typeId(): number { return this.s.readByte(0x053a); }
  set typeId(v: number) { this.s.writeByte(0x053a, v & 0xff); }

  get counter(): number { return this.s.readByte(0x053b); }
  set counter(v: number) { this.s.writeByte(0x053b, v & 0xff); }

  get phase(): number { return this.s.readByte(0x053d); }
  set phase(v: number) { this.s.writeByte(0x053d, v & 0xff); }

  get flag0(): number { return this.s.readByte(0x0540); }
  set flag0(v: number) { this.s.writeByte(0x0540, v & 0xff); }

  get flag1(): number { return this.s.readByte(0x0541); }
  set flag1(v: number) { this.s.writeByte(0x0541, v & 0xff); }

  get counter3(): number { return this.s.readByte(0x0543); }
  set counter3(v: number) { this.s.writeByte(0x0543, v & 0xff); }

  get paramLo(): number { return this.s.readByte(0x0544); }
  set paramLo(v: number) { this.s.writeByte(0x0544, v & 0xff); }

  get paramHi(): number { return this.s.readByte(0x0545); }
  set paramHi(v: number) { this.s.writeByte(0x0545, v & 0xff); }

  get targetX(): number { return this.s.readByte(0x0547); }
  set targetX(v: number) { this.s.writeByte(0x0547, v & 0xff); }

  get targetY(): number { return this.s.readByte(0x0548); }
  set targetY(v: number) { this.s.writeByte(0x0548, v & 0xff); }
}

/**
 * 球员移动视图（$003E-$0044 / $0517 区间业务状态）
 *
 * 业务字段（替代 'ram_003E' / 'ram_003F' / 'ram_0042' / 'ram_0044' / 'ram_0517' 字符串键）：
 * - flipX：方向翻转（$0517 bit6）
 * - directionFlag：方向位域（$0517）
 * - curX / curY：当前坐标（$003E/$003F）
 * - segmentPtr / segmentCursor：段指针与游标（$0042/$0044）
 */
export class PlayerMoveView {
  constructor(private readonly s: DataStore) {}

  get directionFlag(): number { return this.s.readByte(0x0517); }
  set directionFlag(v: number) { this.s.writeByte(0x0517, v & 0xff); }

  get flipX(): boolean { return (this.directionFlag & 0x40) !== 0; }

  get curX(): number { return this.s.readByte(0x003e); }
  set curX(v: number) { this.s.writeByte(0x003e, v & 0xff); }

  get curY(): number { return this.s.readByte(0x003f); }
  set curY(v: number) { this.s.writeByte(0x003f, v & 0xff); }

  get segmentPtr(): number { return this.s.readByte(0x0042); }
  set segmentPtr(v: number) { this.s.writeByte(0x0042, v & 0xff); }

  get segmentCursor(): number { return this.s.readByte(0x0044); }
  set segmentCursor(v: number) { this.s.writeByte(0x0044, v & 0xff); }
}

/**
 * 球员名字视图（$062A / $002C 区间业务状态）
 *
 * 业务字段（替代 'ram_062A' / 'ram_002C' 字符串键）：
 * - segmentIndex：名字段索引（$062A & 0x7F）
 * - charIndex：字符字符位（$002C）
 */
export class PlayerNameView {
  constructor(private readonly s: DataStore) {}

  get segmentIndex(): number { return this.s.readByte(0x062a) & 0x7f; }
  set segmentIndex(v: number) { this.s.writeByte(0x062a, v & 0x7f); }

  get charIndex(): number { return this.s.readByte(0x002c); }
  set charIndex(v: number) { this.s.writeByte(0x002c, v & 0xff); }
}