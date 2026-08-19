/**
 * 影子 OAM 数据访问对象 (Model 层)
 *
 * 对应 NES $0468-$0567 影子精灵表 (64 槽 × 4B: Y/tile/attr/X) +
 * $0200-$02FF 硬件 OAM 区 (sub_88CE 拷贝产物)。
 *
 * 所有 Bank 的场景精灵写入一律走本类, 不再直接拼 ram_XXXX KV 键。
 * 渲染出口: OamView 每帧调用 readByte/readSlot 解析为 SpriteEntry[]。
 *
 * 槽格式 (与 NES 一致, 每槽 4B):
 *   [0] $0468+X  Y 坐标
 *   [1] $0469+X  tile 索引
 *   [2] $046A+X  属性 (attr bit2-3 ≠ 0 → 屏幕外隐藏)
 *   [3] $046B+X  X 坐标
 */
import type { DataStore } from './DataStore';

/** 影子 OAM 基址 ($0468) */
const SHADOW_BASE = 0x0468;
/** 影子 OAM 字节数 (64 槽 × 4B) */
const SHADOW_BYTES = 256;
/** 精灵尾数据基址 ($0460, OAM 表前 8 字节辅助数据) */
const TAIL_BASE = 0x0460;
/** 精灵尾数据字节数 */
const TAIL_BYTES = 8;
/** 坐标累积变量 X ($04E4, 相对 $0468 = $7C) — _subA72C 精灵坐标累加 */
const OFF_COORD_X = 0x04e4 - SHADOW_BASE;
/** 坐标累积变量 Y ($04E7, 相对 $0468 = $7F) — _subA72C 精灵坐标累加 */
const OFF_COORD_Y = 0x04e7 - SHADOW_BASE;
/** 硬件 OAM 基址 ($0200, sub_88CE 拷贝目标) */
const HW_BASE = 0x0200;
/** 每精灵字节数 (Y, tile, attr, X) */
const SPR_BYTES = 4;
/** 屏幕外 Y 值 */
const Y_HIDDEN = 0xf8;

/** KV 键名构造 (ram_XXXX) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16)}`;
}

export class ShadowOam {
  /** 持有 DataStore 引用, 由 DataStore 构造时注入 */
  private _store: DataStore | null = null;

  attach(store: DataStore): void {
    this._store = store;
  }

  // ── 单字节读写 (rel 相对 $0468, 越界忽略/返回 0) ──

  /** 读影子 OAM 单字节 */
  readByte(rel: number): number {
    const s = this._store;
    if (!s || rel < 0 || rel >= SHADOW_BYTES) return 0;
    return s.read(ramKey(SHADOW_BASE + rel));
  }

  /** 写影子 OAM 单字节 */
  writeByte(rel: number, v: number): void {
    const s = this._store;
    if (!s || rel < 0 || rel >= SHADOW_BYTES) return;
    s.write(ramKey(SHADOW_BASE + rel), v);
  }

  // ── 精灵槽读写 ──

  /** 读精灵槽 (rel 为槽起始相对偏移) → [y, tile, attr, x] */
  readSlot(rel: number): [number, number, number, number] {
    return [
      this.readByte(rel),
      this.readByte(rel + 1),
      this.readByte(rel + 2),
      this.readByte(rel + 3),
    ];
  }

  /**
   * 写精灵槽 (对应 STA $0468+X / $0469+X / $046A+X / $046B+X 序列)。
   * @param rel  槽起始相对偏移 ($0468 起, 步进 4)
   */
  writeSlot(rel: number, y: number, tile: number, attr: number, x: number): void {
    this.writeByte(rel, y);
    this.writeByte(rel + 1, tile);
    this.writeByte(rel + 2, attr);
    this.writeByte(rel + 3, x);
  }

  /** attr |= mask (rel 指向 attr 相对偏移, 即槽起始 +2) */
  attrOr(rel: number, mask: number): void {
    this.writeByte(rel, this.readByte(rel) | mask);
  }

  /** attr &= mask (rel 指向 attr 相对偏移, 即槽起始 +2) */
  attrAnd(rel: number, mask: number): void {
    this.writeByte(rel, this.readByte(rel) & mask);
  }

  // ── 精灵尾数据区 ($0460-$0467, OAM 表前 8 字节辅助数据) ──

  /** 读尾数据单字节 (off 相对 $0460, 0-7) */
  readTailByte(off: number): number {
    const s = this._store;
    if (!s || off < 0 || off >= TAIL_BYTES) return 0;
    return s.read(ramKey(TAIL_BASE + off));
  }

  /** 写尾数据单字节 (off 相对 $0460, 0-7) */
  writeTailByte(off: number, v: number): void {
    const s = this._store;
    if (!s || off < 0 || off >= TAIL_BYTES) return;
    s.write(ramKey(TAIL_BASE + off), v);
  }

  // ── 坐标累积变量 ($04E4/$04E7, _subA72C 精灵坐标累加) ──

  /** 读累积 X ($04E4) */
  readCoordX(): number {
    return this.readByte(OFF_COORD_X);
  }

  /** 写累积 X ($04E4) */
  writeCoordX(v: number): void {
    this.writeByte(OFF_COORD_X, v);
  }

  /** 读累积 Y ($04E7) */
  readCoordY(): number {
    return this.readByte(OFF_COORD_Y);
  }

  /** 写累积 Y ($04E7) */
  writeCoordY(v: number): void {
    this.writeByte(OFF_COORD_Y, v);
  }

  // ── 区域清空 ──

  /** 清影子 OAM (256B 填 fill, 默认 $F8 屏幕外) */
  clearAll(fill: number = Y_HIDDEN): void {
    for (let i = 0; i < SHADOW_BYTES; i++) this.writeByte(i, fill);
  }

  /** 清硬件 OAM 区 ($0200-$02FF 填 fill, 默认 $F8) */
  clearHw(fill: number = Y_HIDDEN): void {
    const s = this._store;
    if (!s) return;
    for (let i = 0; i < 0x100; i++) s.write(ramKey(HW_BASE + i), fill);
  }

  // ── 影子 → 硬件 OAM (sub_88CE) ──

  /**
   * 影子 OAM → 硬件 OAM ($0200) — 对应 NES sub_88CE:
   *   attr bit2-3 ≠ 0 的精灵 Y 置 $F8 (屏幕外隐藏), 其余原样拷贝。
   */
  copyToHw(): void {
    const s = this._store;
    if (!s) return;
    for (let rel = 0; rel < SHADOW_BYTES; rel += SPR_BYTES) {
      let y = this.readByte(rel);
      const tile = this.readByte(rel + 1);
      const attr = this.readByte(rel + 2);
      const x = this.readByte(rel + 3);
      if ((attr & 0x0c) !== 0) y = Y_HIDDEN;
      s.write(ramKey(HW_BASE + rel), y);
      s.write(ramKey(HW_BASE + rel + 1), tile);
      s.write(ramKey(HW_BASE + rel + 2), attr);
      s.write(ramKey(HW_BASE + rel + 3), x);
    }
  }
}
