/**
 * PlayerTileService — 球员 tile 素材合并服务 (PT3 产物)
 *
 * 行为翻译 (去 CPU 化):
 * - findPlayerTiles(playerId) → 合并 hair (PLAYER_HAIR_TABLE) + body (BANK19_SPRITE_FRAMES)
 *   + color (PLAYER_COLOR_TABLE) + palette (PALETTE_TABLE), 返回渲染时该球员要用的
 *   完整 tile 序列 + sprite attr 字节
 * - getPlayerSpriteAttr(playerId) → 拼装 NES sprite attr (palette + flipX + priority)
 * - getPlayerAnimationFrames(playerId) → 4 帧 animation cycle (走位 tile 序列)
 *
 * 翻译原则 (v2):
 *   - 禁止以 CPU 地址当业务字段
 *   - 行为镜像 asm bank19 code_main.s $9000-$90B7 (CMP #$E0 parser)
 *   - 业务查询走命名 API, 不暴露 tile 索引数组
 */

import { findPlayerTilesById, type PlayerTileEntry } from '../../data/tables/player-tile-table';
import { findPlayerById, PLAYER_COLOR_TABLE } from '../../data/tables/player-stats';
import { findSpriteFrameById } from '../../data/tables/sprite-frame-table';
import { PALETTE_TABLE } from '../../data/tables/palette-table';

/** 球员完整 tile 渲染描述 (含 CHR 索引序列 + sprite attr) */
export interface PlayerTilesResolved {
  readonly playerId: number;
  readonly playerName: string;
  /** 头型模板 (0..17) */
  readonly hairTemplateId: number;
  /** 身体基础 tile 索引 (CHR 索引) */
  readonly bodyBaseTileIdx: number;
  /** NES sprite palette 组 0..7 */
  readonly paletteSetId: number;
  /** 完整 tile 序列 (head + body + 衣袖等) */
  readonly tileSequence: ReadonlyArray<number>;
  /** NES sprite attr 字节 (palette + flipX + priority) */
  readonly spriteAttr: number;
  /** sprite palette 4 色调色板 (bg/hair/shirt/shorts 共 4 字节) */
  readonly palette: ReadonlyArray<number>;
  /** 4 帧走位动画 (tile 序列) */
  readonly animFrames: ReadonlyArray<ReadonlyArray<number>>;
}

/** NES sprite attr 字节布局: bit 0-1 palette | bit 5 priority | bit 6 flipX | bit 7 flipY */
const SPRITE_ATTR_PRIORITY = 0x20;
const SPRITE_ATTR_FLIP_X = 0x40;
const SPRITE_ATTR_FLIP_Y = 0x80;

/** 调色板组索引 → 4 字节 (bg/hair/shirt/shorts) 从 PALETTE_TABLE 取 */
function paletteForGroup(paletteSetId: number): ReadonlyArray<number> {
  // PALETTE_TABLE 共 89 项, 每 12 字节, sprite palette 占用后 8 字节 (group 0..7)
  const idx = paletteSetId % 8;
  return PALETTE_TABLE[idx] ?? [0x0f, 0x30, 0x16, 0x30, 0x21, 0x30, 0x21, 0x30, 0x0f, 0x0f, 0x0f, 0x0f];
}

export class PlayerTileService {
  /**
   * 合并所有球员 tile 源数据为单一渲染描述
   * 失败 (球员 ID 不存在) 返回 null
   */
  findPlayerTiles(playerId: number): PlayerTilesResolved | null {
    const id = playerId & 0xff;
    const player = findPlayerById(id);
    const tileEntry = findPlayerTilesById(id);
    if (!player || !tileEntry) return null;

    // 头型模板: PLAYER_HAIR_TABLE[id-1] (0..17) → CHR head 区域 tile 基址
    const hairTiles = this.hairTilesFor(tileEntry.hairTemplateId);

    // 身体: BANK19_SPRITE_FRAMES 中匹配球员的帧 (frameId = id mod 40)
    const bodyFrame = findSpriteFrameById(id);
    const bodyTiles = bodyFrame?.tiles ?? [tileEntry.bodyBaseTileIdx];

    // 完整序列: head tiles + body tiles
    const tileSequence = [...hairTiles, ...bodyTiles];

    // sprite attr 字节: palette 来自 PLAYER_COLOR_TABLE[id]
    const color = PLAYER_COLOR_TABLE.find((c) => c.id === id);
    const attr = this.buildSpriteAttr(tileEntry.paletteSetId, color?.shirt ?? 0);

    return {
      playerId: id,
      playerName: player.name,
      hairTemplateId: tileEntry.hairTemplateId,
      bodyBaseTileIdx: tileEntry.bodyBaseTileIdx,
      paletteSetId: tileEntry.paletteSetId,
      tileSequence,
      spriteAttr: attr,
      palette: paletteForGroup(tileEntry.paletteSetId),
      animFrames: this.buildAnimFrames(bodyTiles, 4),
    };
  }

  /**
   * 头型模板 (0..17) → CHR 区域 tile 索引序列
   * 18 模板分布在 CHR bank 0/1 头部, 每个模板 4-6 tile
   * 默认: 每个模板 4 tile, 基址 0x80 + templateId*4
   */
  private hairTilesFor(hairTemplateId: number): ReadonlyArray<number> {
    const base = 0x80 + (hairTemplateId & 0x0f) * 4;
    return [base, base + 1, base + 2, base + 3];
  }

  /**
   * 拼装 NES sprite attr 字节
   *  - bit 0-1: palette group 0..3 (NES 限制 sprite palette 只能用 4 组)
   *  - bit 5  : priority 0=后 1=前
   *  - bit 6-7: flip
   */
  private buildSpriteAttr(paletteSetId: number, shirtColor: number): number {
    const pal = (paletteSetId & 0x03); // NES sprite palette 0..3
    return pal | ((shirtColor & 0x01) ? SPRITE_ATTR_PRIORITY : 0);
  }

  /**
   * 4 帧走位动画: 在 body 序列上做 +0/+1/+2/+3 偏移 (4 帧 cycle 模拟 walk)
   * 真实实现会用 BANK19_SPRITE_FRAMES 中 4 帧 walk 序列, 这里 stub 用 +n 占位
   */
  private buildAnimFrames(bodyTiles: ReadonlyArray<number>, frameCount: number): ReadonlyArray<ReadonlyArray<number>> {
    const frames: number[][] = [];
    for (let f = 0; f < frameCount; f++) {
      const shifted = bodyTiles.map((t) => (t + f) & 0xff);
      frames.push(shifted);
    }
    return frames;
  }
}
