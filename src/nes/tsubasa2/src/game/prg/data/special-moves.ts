/**
 * 角色必杀技表 (真实 ROM 提取)
 *
 * 来源: ROM修改参考.txt Character Edit 段
 * 每角色 7 项技能 (Shot/Pass/Dribble/1-2/Block/Tackle/PassCut), 每项 2 字节:
 *   - 第1字节: RAM $0430 (技能数量上限, Max 03)
 *   - 第2字节: 技能 ID (见 SHOT_DIGITS/DRIBBLE_DIGITS/PASS_DIGITS)
 *
 * ROM 地址布局: 每角色 baseRom + fieldIndex*2
 *   Tsubasa Shot: ROM 0x38F27/0x38F28
 *   Tsubasa Pass: ROM 0x38F29/0x38F2A
 *   ... (步进 2 字节)
 *
 * 数据来源文档: docs/rom-data-locations.md
 */

/** 必杀技字段 */
export type SpecialMoveField = 'shot' | 'pass' | 'dribble' | 'oneTwo' | 'block' | 'tackle' | 'passCut';

/** 角色必杀技定义 (真实 ROM 字节) */
export interface CharacterSpecialMoves {
  id: number;
  name: string;
  /** ROM 基址 (Shot 第1字节) */
  baseRom: number;
  /** 7 项技能, 每项 [数量上限, 技能ID] (真实 ROM 字节) */
  moves: Record<SpecialMoveField, readonly [number, number]>;
}

/** 射门技能 ID→名称 */
export const SHOT_DIGITS: ReadonlyMap<number, string> = new Map([
  [0x00, 'Normal'], [0x01, 'Volley'], [0x02, 'Head'], [0x03, 'Drive Shot'],
  [0x04, 'Drive Bicycle'], [0x05, 'Falcon Shot'], [0x06, 'Falcon Volley'],
  [0x07, 'Razor Shot'], [0x08, 'Skylab Huracan'], [0x09, 'Twin Shot'],
  [0x0A, 'Skylab 2X Shot'], [0x0B, 'Eagle Shot'], [0x0C, 'Tiger Shot'],
  [0x0D, 'Neo Tiger Shot'], [0x0E, 'Bicycle Kick'], [0x0F, 'Hyper Bicycle Kick'],
  [0x10, 'Jumping Volley'], [0x11, 'Drive Tiger'], [0x12, 'Cyclone'],
  [0x13, 'Sano Combo'], [0x14, 'Banana Shot'], [0x15, 'Buster Shot'],
  [0x16, 'Mirage Shot'], [0x17, 'Mach Shot'], [0x18, 'Side Wind'],
  [0x19, 'Slider Shot'], [0x1A, 'Cannon Shot'], [0x1B, 'Fire Shot'],
  [0x1C, 'Dyna Head'], [0x1D, 'Cyclone Head'], [0x1E, 'Rocket Head'],
  [0x1F, 'Red Dragons'], [0x20, 'Back Shot'], [0x21, 'Slider Cannon'],
  [0x22, 'Double Eel'],
]);

/** 盘带技能 ID→名称 */
export const DRIBBLE_DIGITS: ReadonlyMap<number, string> = new Map([
  [0x00, 'Normal'], [0x01, 'High Lift'], [0x02, 'Force Dribble'],
  [0x03, 'Fake Dribble'], [0x04, 'Speed Dribble'], [0x05, 'Fast Dribble'],
  [0x06, 'Super Dribble'],
]);

/** 传球技能 ID→名称 */
export const PASS_DIGITS: ReadonlyMap<number, string> = new Map([
  [0x00, 'Normal'], [0x01, 'Drive Pass'], [0x02, 'Razor Pass'], [0x03, 'Top Spin Pass'],
]);

/** 角色必杀技表 (真实 ROM 字节提取) */
export const CHARACTER_SPECIAL_MOVES: readonly CharacterSpecialMoves[] = [
  { id: 0x1, name: 'Tsubasa', baseRom: 0x38f27, moves: {shot:[0,0],pass:[0,0],dribble:[39,148],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[0,0]} },
  { id: 0x1B, name: 'Souta', baseRom: 0x38f97, moves: {shot:[0,0],pass:[18,148],dribble:[0,0],oneTwo:[59,148],block:[76,148],tackle:[0,0],passCut:[125,147]} },
  { id: 0x1C, name: 'Jitou', baseRom: 0x38fa5, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[0,0]} },
  { id: 0x14, name: 'Ishizaki', baseRom: 0x38f43, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[96,147]} },
  { id: 0x1D, name: 'Matsuyama', baseRom: 0x38fb3, moves: {shot:[0,0],pass:[0,0],dribble:[47,148],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[128,147]} },
  { id: 0x17, name: 'Masao', baseRom: 0x38f5f, moves: {shot:[0,0],pass:[0,0],dribble:[43,148],oneTwo:[57,148],block:[72,148],tackle:[92,148],passCut:[114,147]} },
  { id: 0x18, name: 'Kazuo', baseRom: 0x38f6d, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[116,147]} },
  { id: 0x11, name: 'Misaki', baseRom: 0x38f35, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[54,148],block:[0,0],tackle:[0,0],passCut:[93,147]} },
  { id: 0x1A, name: 'Hyuga', baseRom: 0x38f89, moves: {shot:[11,148],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[75,148],tackle:[0,0],passCut:[122,147]} },
  { id: 0x15, name: 'Nitta', baseRom: 0x38f51, moves: {shot:[0,0],pass:[0,0],dribble:[41,148],oneTwo:[55,148],block:[70,148],tackle:[90,148],passCut:[105,147]} },
  { id: 0x19, name: 'Sano', baseRom: 0x38f7b, moves: {shot:[0,0],pass:[17,148],dribble:[45,148],oneTwo:[0,0],block:[74,148],tackle:[0,0],passCut:[120,147]} },
  { id: 0x1F, name: 'Sawada', baseRom: 0x38fc1, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[130,147]} },
  { id: 0x20, name: 'Misugi', baseRom: 0x38fcf, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[132,147]} },
  { id: 0x57, name: 'Napoleon', baseRom: 0x3921b, moves: {shot:[0,0],pass:[0,0],dribble:[52,148],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[231,147]} },
  { id: 0x58, name: 'Pierr', baseRom: 0x39229, moves: {shot:[0,0],pass:[0,0],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[233,147]} },
  { id: 0x60, name: 'Dias', baseRom: 0x3927d, moves: {shot:[0,0],pass:[32,148],dribble:[0,0],oneTwo:[68,148],block:[88,148],tackle:[0,0],passCut:[241,147]} },
  { id: 0x63, name: 'Schneider', baseRom: 0x39299, moves: {shot:[0,0],pass:[33,148],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[0,0]} },
  { id: 0x68, name: 'Kapilman', baseRom: 0x392c3, moves: {shot:[0,0],pass:[34,148],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[249,147]} },
  { id: 0x6A, name: 'Carlos', baseRom: 0x392d1, moves: {shot:[0,0],pass:[35,148],dribble:[0,0],oneTwo:[0,0],block:[0,0],tackle:[0,0],passCut:[251,147]} },
  { id: 0x75, name: 'Coimbra', baseRom: 0x3934f, moves: {shot:[18,37],pass:[17,72],dribble:[74,73],oneTwo:[68,26],block:[3,37],tackle:[1,58],passCut:[65,3]} },
];

/** 按角色 ID 查找必杀技 */
export function getSpecialMoves(id: number): CharacterSpecialMoves | null {
  return CHARACTER_SPECIAL_MOVES.find(s => s.id === id) ?? null;
}

/** 按角色 ID 获取某项技能的 [数量上限, 技能ID] */
export function getSpecialMove(id: number, field: SpecialMoveField): readonly [number, number] | null {
  return getSpecialMoves(id)?.moves[field] ?? null;
}
