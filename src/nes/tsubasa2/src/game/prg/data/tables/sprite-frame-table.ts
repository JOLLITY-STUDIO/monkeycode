/**
 * 精灵帧数据表 — 原 bank19 精灵/场景数据（声明式表结构）
 *
 * 从 asm/bank19/data_tables.s + data_tail.s 提取。
 * bank19 含：tile 索引表、精灵帧序列、场景背景数据。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 精灵帧定义 */
export interface SpriteFrameEntry {
  readonly frameId: number;
  readonly tiles: ReadonlyArray<number>;
  readonly palette: number;
  readonly flipX: boolean;
  readonly flipY: boolean;
}

/** 精灵帧表 */
export const BANK19_SPRITE_FRAMES: ReadonlyArray<SpriteFrameEntry> = [
  // TODO B19: 从 asm/bank19/code_main.s 提取精灵帧序列
];

/** tile 索引数据（原 bank19 data_tables） */
export const BANK19_TILE_DATA: ReadonlyArray<number> = [
  // TODO B19: 从 asm/bank19/data_tables.s 提取 .byte 序列
];

/** 场景背景数据（原 bank19 data_tail） */
export const BANK19_SCENE_DATA: ReadonlyArray<ReadonlyArray<number>> = [
  // TODO B19: 从 asm/bank19/data_tail.s 提取场景段
];
