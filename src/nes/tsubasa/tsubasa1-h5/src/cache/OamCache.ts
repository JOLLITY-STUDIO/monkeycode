/**
 * OAM 精灵缓存 - 管理64个精灵的属性
 * 对应 NES 的 $0200-$02FF 区域
 *
 * 每个精灵4字节:
 *   Byte 0: Y坐标 (屏幕坐标 + 1, 0xFF = 隐藏)
 *   Byte 1: Tile索引
 *   Byte 2: 属性 (bit7=VFlip, bit6=HFlip, bit5=Priority, bits1-0=Palette)
 *   Byte 3: X坐标
 */

import { SpriteEntry, SCREEN_HEIGHT } from '../core/types';

const SPRITE_COUNT = 64;
const SPRITE_SIZE = 4;

export class OamCache {
  /** 精灵原始数据 (256字节) */
  private data: Uint8Array;

  /** 解码后的精灵数组 (只读缓存) */
  private decoded: SpriteEntry[];

  /** 脏标记 */
  private dirty: boolean;

  constructor() {
    this.data = new Uint8Array(SPRITE_COUNT * SPRITE_SIZE);
    this.decoded = new Array(SPRITE_COUNT);
    this.dirty = true;
    this.clear();
  }

  /** 清空所有精灵 */
  clear(): void {
    this.data.fill(0);
    for (let i = 0; i < SPRITE_COUNT; i++) {
      this.decoded[i] = { y: 0xFF, tileIndex: 0, attributes: 0, x: 0 };
    }
    this.dirty = false;
  }

  /** 设置OAM地址 */
  private oamAddr: number = 0;

  setAddr(addr: number): void {
    this.oamAddr = addr & 0xFF;
  }

  /** 写入OAM数据 */
  writeData(value: number): void {
    this.data[this.oamAddr] = value & 0xFF;
    this.oamAddr = (this.oamAddr + 1) & 0xFF;
    this.dirty = true;
  }

  /** 批量DMA写入 (来自CPU RAM $0200-$02FF) */
  dmaWrite(source: Uint8Array): void {
    if (source.length !== SPRITE_COUNT * SPRITE_SIZE) {
      throw new Error(`DMA source must be 256 bytes, got ${source.length}`);
    }
    this.data.set(source);
    this.dirty = true;
  }

  /** 刷新解码缓存 */
  private refreshDecoded(): void {
    for (let i = 0; i < SPRITE_COUNT; i++) {
      const offset = i * SPRITE_SIZE;
      this.decoded[i] = {
        y: this.data[offset],
        tileIndex: this.data[offset + 1],
        attributes: this.data[offset + 2],
        x: this.data[offset + 3],
      };
    }
    this.dirty = false;
  }

  /** 获取所有解码后的精灵 */
  getSprites(): SpriteEntry[] {
    if (this.dirty) {
      this.refreshDecoded();
    }
    return this.decoded;
  }

  /** 获取可见精灵 (Y < SCREEN_HEIGHT - 8) */
  getVisibleSprites(): SpriteEntry[] {
    const sprites = this.getSprites();
    return sprites.filter(s => s.y < SCREEN_HEIGHT - 8);
  }

  /** 设置单个精灵 */
  setSprite(index: number, entry: SpriteEntry): void {
    if (index < 0 || index >= SPRITE_COUNT) {
      throw new Error(`Sprite index out of range: ${index}`);
    }
    const offset = index * SPRITE_SIZE;
    this.data[offset] = entry.y & 0xFF;
    this.data[offset + 1] = entry.tileIndex & 0xFF;
    this.data[offset + 2] = entry.attributes & 0xFF;
    this.data[offset + 3] = entry.x & 0xFF;
    this.dirty = true;
  }

  /** 获取原始数据 (用于DMA) */
  getRawData(): Uint8Array {
    return this.data;
  }
}
