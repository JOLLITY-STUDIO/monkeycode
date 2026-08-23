/**
 * SpriteFrameService — 精灵帧/比赛场景数据（原 bank19）
 *
 * 行为翻译（去 CPU 化）：
 * - bank19 $8000 起始：大量 tile 数据 + 精灵帧序列
 * - $90xx 区域：精灵 OAM 布局（ram_04A5+ 精灵属性表）
 * - bank19 data_tables：精灵帧 tile 索引表
 *
 * bank 切换语义 = import SpriteFrameService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK19_SPRITE_FRAMES, BANK19_TILE_DATA, BANK19_SCENE_DATA } from '../../data/tables/sprite-frame-table';

/** 精灵帧定义 */
export interface SpriteFrame {
  readonly frameId: number;
  readonly tiles: ReadonlyArray<number>;
  readonly palette: number;
  readonly flipX: boolean;
  readonly flipY: boolean;
  readonly priority: number;
}

export class SpriteFrameService {
  constructor(readonly store: DataStore) {}

  /**
   * 加载精灵帧到 OAM 缓冲（原 bank19 $90xx 区域）
   *
   * 行为：读取精灵序列 → 写入 ram_04A5+（OAM 属性表）。
   * 序列通过 BANK19_SPRITE_FRAMES 查询，不读 CPU 地址。
   */
  loadSpriteFrame(frameId: number, baseAddr: number): void {
    const frame = BANK19_SPRITE_FRAMES.find(f => f.frameId === frameId);
    if (!frame) return;
    let offset = baseAddr;
    for (const tile of frame.tiles) {
      this.store.write(`ram_${offset.toString(16).padStart(4, '0')}`, tile);
      offset += 4;
    }
    this.store.write('ram_0515', 0x80);
  }

  /**
   * 解析精灵序列段（原 bank19 $90AF-$9122）
   *
   * 行为：从 ram_0088 间接指针读取 tile 值，$E0 终止。
   * 遇到非 $E0 则写入 OAM 并推进。
   */
  parseSpriteSegment(): number {
    let count = 0;
    let idx = this.store.read('ram_008A');
    while (true) {
      const tile = this.store.read(`ram_0088_${idx}`);
      if (tile >= 0xE0) break;
      idx++;
      count++;
      this.store.write('ram_0515', 1);
      if (this.store.read('ram_0515') !== 0) {
        this.store.write('ram_0515', 1);
      }
    }
    return count;
  }

  /**
   * 装载场景 tile 数据（原 bank19 data_tables）
   */
  loadSceneTiles(sceneId: number): ReadonlyArray<number> {
    return BANK19_SCENE_DATA[sceneId] ?? [];
  }

  /**
   * 查询 tile 数据（原 bank19 tile 表）
   */
  getTileData(tileId: number): number {
    return BANK19_TILE_DATA[tileId] ?? 0;
  }
}
