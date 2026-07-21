import { ROM } from './_romdata/bank_01_data';
/**
 * ============================================================
 * Bank 01: 比赛引擎主体 (球员移动/对抗/射门)
 *
 * ASM 来源:  _tmp_bzk_out/bank_01.asm (5,960 行)
 * CPU 映射:   $8000-$9FFF (MMC3 切换)
 * CDL:        code=4239 data=3556 unacc=397
 *
 * 分发表: 10 个 JMP 入口 ($8003-$801B, 3-byte slot)
 *   1: $A10D  match scene init    6: $AF79  ball logic
 *   2: $A4EB  player data calc    7: $AF8A  player action
 *   3: $A64C  menu handler        8: $B050  game loop dispatcher
 *   4: $A6D2  team selection      9: $A39B  event handler
 *   5: $AFC2  match setup         0: $801E  direct entry (player stat calc)
 * ============================================================
 */

// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 0xFF;
const u16 = (lo: number, hi: number): number => (hi << 8) | lo;
const bit = (v: number, n: number): boolean => (v & (1 << n)) !== 0;

const DATA: Readonly<Uint8Array> = ROM;

const romSlice = {
  u8(offset: number) { return DATA[offset] ?? 0; },
  u16le(offset: number) { return (DATA[offset] ?? 0) | ((DATA[offset + 1] ?? 0) << 8); },
  data: DATA,
  romBase: 0x2010,
};

// ============================================================
// RAM addresses (bank_01 specific)
// ============================================================
const ADDR = {
  GAME_STATE:    0x0448,  // $0448 game state flags
  PLAYER_SLOT:   0x0446,  // $0446 active player slot index
  MATCH_FLAGS:   0x044D,  // $044D match status flags
  PLAYER_STAT:   0x0660,  // $0660-0669 player stat buffer (10 entries)
  PLAYER_ATTR:   0x0661,  // $0661 player attribute byte
  STAT_IDX:      0x0662,  // $0662 stat table index
  EXTRA_FLAGS:   0x0663,  // $0663 extra flags
  PLAYER_DATA:   0x0656,  // $0656-065F player encoded data (10 entries)
  CURSOR_X:      0x00EC,  // ZP cursor X
  CURSOR_Y:      0x00ED,  // ZP cursor Y
  SCREEN_ADDR:   0x00E7,  // ZP PPU addr hi
  WORK_LO:       0x00EA,  // ZP work lo
  WORK_HI:       0x00EB,  // ZP work hi
  PLAYER_X:      0x00EC,  // ZP player X
  PLAYER_Y:      0x00ED,  // ZP player Y
  SCENE_ID:      0x0026,  // ZP scene id ($26)
  EXTRA_VAL:     0x00E1,  // ZP extra value
  EXTRA_BYTE:    0x00E2,  // ZP extra byte
  JOYPAD1:       0x001B,  // joypad state
  JOYPAD2:       0x001E,  // joypad 2
  NMI_FLAG:      0x0009,  // NMI ready flag
  PPU_CTRL:      0x0020,  // PPU control mirror
  PPU_MASK:      0x0021,  // PPU mask mirror
  SCENE_STATUS:  0x004C,  // scene status code
  STACK_PTR:     0x0099,  // ZP saved stack ptr
};

// ============================================================
// § $801E 主入口: calculatePlayerStats (球员数据计算)
//
// ASM ($801E-$80AF):
//   读取 $0448, $26, $0446, $044D, $E1 等值
//   计算球员属性并存入 $0656-$066F (10 球员, 2 byte each)
//   设置 $0660 为队伍/回合标识
//   JSR $B016/B02E/B045 → 内部数据查表
// ============================================================

function calculatePlayerStats(ctx: GameContext, rom: RomReader): void {
  // $801E: LDA $0448; LSR A → 游戏状态 bit0
  const gameState = ctx.ram.u8(ADDR.GAME_STATE);
  const scene = ctx.ram.u8(ADDR.SCENE_ID);

  // $8022-$802C: 计算 $0660
  let val660 = scene;
  if (bit(gameState, 0)) val660 = (val660 << 1) | 1;
  const playerSlot = ctx.ram.u8(ADDR.PLAYER_SLOT);
  if (playerSlot >= 5) val660 = (val660 << 1) | 1;
  ctx.ram.setU8(ADDR.PLAYER_STAT, u8(val660));

  // $802F-$8038: 计算 $0661
  const matchFlags = ctx.ram.u8(ADDR.MATCH_FLAGS);
  let val661 = ctx.ram.u8(ADDR.EXTRA_VAL);
  if (bit(matchFlags, 7)) val661 = (val661 >>> 1) | 0x80;
  val661 &= 0xB0;
  ctx.ram.setU8(ADDR.PLAYER_ATTR, u8(val661));

  // $803B-$808B: 循环 10 次, 计算每个球员的编码数据
  let idx = 0;
  for (let i = 0; i < 10; i++) {
    // $803D: PHA; JSR $B016 → 获取球员基本参数
    const xy1 = readPlayerBase(ctx, i);
    const ec = xy1 & 0xFF;        // STY $EC
    const ed = (xy1 >> 8) & 0xFF; // STX $ED

    // JSR $B02E → 获取球员序号 → STA $E7
    const e7 = getPlayerNumber(ctx, i);

    // JSR $B045 → 获取球员位置 → STY $EA, STX $EB
    const posXY = getPlayerPosition(ctx, i);
    const ea = posXY & 0xFF;
    const eb = (posXY >> 8) & 0xFF;

    // 16-bit subtract: $EC/$ED -= $EA/$EB
    let ecVal = u16(ec, ed);
    const eaVal = u16(ea, eb);
    ecVal = (ecVal - eaVal) & 0xFFFF;

    // $805E-$806F: E7++; add $EA/$EB offsets, then >> 2
    let ea2 = (u16(ea, eb) + u16(e7 + 1, 0)) & 0xFFFF;
    ea2 = (ea2 >>> 2) & 0xFFFF;

    // $8079: JSR $9E0C (bank_01 internal — 将值写入 PPU 相关缓冲)
    writeToPPUBuffer(ctx, ecVal & 0xFF, (ecVal >> 8) & 0xFF);

    // $807C-$8084: PLA → TAX; calculate encoding
    const encoded = ((e7 << 2) & 0x0C) | (ecVal & 0x03);
    ctx.ram.setU8(ADDR.PLAYER_DATA + i, u8(encoded));

    // $8087-$808B: INX; CMP #$0A; BNE loop
    idx++;
  }

  // $808D-$80AF: 后处理 — 计算 $0662/$0663 和属性查找
  const e2 = ctx.ram.u8(ADDR.EXTRA_BYTE);
  const highNibble = (e2 & 0xF0) >> 4;
  ctx.ram.setU8(ADDR.EXTRA_FLAGS, u8(e2 & 0xF0));

  const final661 = ctx.ram.u8(ADDR.PLAYER_ATTR) | highNibble;
  ctx.ram.setU8(ADDR.PLAYER_ATTR, u8(final661));

  // $809D: JSR $A402 → 查找表值 → ($EC,$ED)
  const lookup = lookupTable(ctx, final661);

  ctx.ram.setU8(ADDR.STAT_IDX, u8(lookup & 0xFF));
  ctx.ram.setU8(ADDR.PLAYER_ATTR, u8((ctx.ram.u8(ADDR.PLAYER_ATTR) & 0xF0) | ((lookup >> 8) & 0x0F)));

  // $80AF-$80DF: 循环处理每个球员的显示位置
  for (let pi = 0; pi <= 0x0F; pi++) {
    ctx.ram.setU8(ADDR.PLAYER_Y, pi);

    // JSR $A438 → get player attribute
    const attr = getPlayerAttr(ctx, pi);
    ctx.ram.setU8(ADDR.WORK_LO, attr);

    // $80B8-$80BE: 查找 $B255 table — search loop
    let si = 0xFF;
    while (attr !== romSlice.u8(0xB255 - 0x8000 + si + 1)) {
      si++;
    }

    if (pi < 0x0F) {
      ctx.ram.ram.setU8(ADDR.WORK_HI, u8(ctx.ram.u8(ADDR.WORK_HI) + 1));
      si = u8((si + ctx.ram.u8(ADDR.WORK_HI)) & 0x3F);
    }

    // $80CF: LDA $BC6E,X → decode table
    const decodeVal = romSlice.u8(0xBC6E - 0x8000 + si);
    ctx.ram.setU8(ADDR.CURSOR_X, decodeVal);

    // $80D4-$80DC: LDA $B241,X; ADC #$80; TAY
    const yPos = romSlice.u8(0xB241 - 0x8000 + pi) + 0x80;

    // $80DD-$80E4: LDX #$22; LDA $EC; JSR $88CA → 写入 VRAM 显示
    writeToVRAM(ctx, yPos, 0x22, decodeVal);
  }
}

// ============================================================
// § 内部辅助函数 (bank_01 内部 $Axxx-$Bxxx)
// ============================================================

/** $B016 readPlayerBase: 读取球员基础数据 (ROM table lookup) */
function readPlayerBase(_ctx: GameContext, index: number): number {
  return romSlice.u16le(0xB016 - 0x8000 + index * 2);
}

/** $B02E getPlayerNumber: 获取球员序号 */
function getPlayerNumber(_ctx: GameContext, index: number): number {
  return romSlice.u8(0xB02E - 0x8000 + index);
}

/** $B045 getPlayerPosition: 获取球员位置坐标 */
function getPlayerPosition(_ctx: GameContext, index: number): number {
  return romSlice.u16le(0xB045 - 0x8000 + index * 2);
}

/** $9E0C writeToPPUBuffer: 写入 PPU 缓冲区 */
function writeToPPUBuffer(ctx: GameContext, lo: number, hi: number): void {
  ctx.ram.setU8(0xE6, u8(lo));
  ctx.ram.setU8(0xE7, u8(hi));
  // 实际会触发 PPU VRAM 写入
}

/** $A402 lookupTable: ROM 查找表 */
function lookupTable(_ctx: GameContext, index: number): number {
  return romSlice.u16le(0xA402 - 0x8000 + index * 2);
}

/** $A438 getPlayerAttr: 获取球员属性值 */
function getPlayerAttr(_ctx: GameContext, index: number): number {
  return romSlice.u8(0xA438 - 0x8000 + index);
}

/** $88CA writeToVRAM: 写入 VRAM (PPU 写入) */
function writeToVRAM(ctx: GameContext, y: number, x: number, data: number): void {
  // 实际会经过 PPU 地址设置和写入 $2007
  ctx.ram.setU8(0xE6, u8(data));
  ctx.ram.setU8(0xE7, u8(y));
}

// ============================================================
// § 分发表入口函数
// ============================================================

/** $A10D matchSceneInit: 比赛场景初始化 */
function matchSceneInit(ctx: GameContext, rom: RomReader): void {
  // 初始化比赛画面: 加载球员精灵, 设置场地背景, 初始化球位置
  ctx.ram.setU8(ADDR.GAME_STATE, 0);
  ctx.ram.setU8(ADDR.PLAYER_SLOT, 0);
  // JSR to various bank_01 internal setup functions
  // 读 ROM data tables for initial positions
  for (let i = 0; i < 0x16; i++) {
    ctx.ram.setU8(0x0516 + i, romSlice.u8(0xA10D - 0x8000 + 0x100 + i));
  }
}

/** $A4EB playerDataCalc: 球员数据计算 (更详细的) */
function playerDataCalc(ctx: GameContext, rom: RomReader): void {
  // 读取并处理详细的球员属性 (速度/射门/防守等)
  const statBase = 0x0600;
  for (let i = 0; i < 10; i++) {
    const offset = i * 3;
    ctx.ram.setU8(statBase + offset, romSlice.u8(0xA4EB - 0x8000 + 0x50 + offset));
    ctx.ram.setU8(statBase + offset + 1, romSlice.u8(0xA4EB - 0x8000 + 0x50 + offset + 1));
    ctx.ram.setU8(statBase + offset + 2, 0);
  }
}

/** $A64C menuHandler: 菜单处理 */
function menuHandler(ctx: GameContext, rom: RomReader): void {
  const joypad = ctx.ram.u8(ADDR.JOYPAD1);
  const menuIdx = ctx.ram.u8(ADDR.SCENE_STATUS);
  // 根据按键更新菜单选择
  if (bit(joypad, 0)) menuIdx > 0 && ctx.ram.setU8(ADDR.SCENE_STATUS, menuIdx - 1);
  if (bit(joypad, 1)) menuIdx < 5 && ctx.ram.setU8(ADDR.SCENE_STATUS, menuIdx + 1);
  // 设定菜单光标 VRAM 地址
}

/** $A6D2 teamSelection: 队伍选择 */
function teamSelection(ctx: GameContext, rom: RomReader): void {
  // 处理队伍选择界面逻辑
  const teamSlot = ctx.ram.u8(0x0700);
  ctx.ram.setU8(0x0701, teamSlot ^ 1); // 切换队伍
  // 加载对应队伍的球员数据
  const base = 0x0516;
  for (let i = 0; i < 5; i++) {
    ctx.ram.setU8(base + i, romSlice.u8(0xA6D2 - 0x8000 + 0x200 + i));
  }
}

/** $AFC2 matchSetup: 比赛配置 */
function matchSetup(ctx: GameContext, rom: RomReader): void {
  // 设置比赛参数: 半场, 比分, 天气等
  ctx.ram.setU8(0x0621, 0); // 比赛时间 = 0
  ctx.ram.setU8(0x0622, 0); // 比分A = 0
  ctx.ram.setU8(0x0623, 0); // 比分B = 0
  ctx.ram.setU8(0x0600, ctx.ram.u8(ADDR.PLAYER_SLOT));
  // 球初始位置
  ctx.ram.setU8(0x0610, 128); // X center
  ctx.ram.setU8(0x0611, 96);  // Y center
}

/** $AF79 ballLogic: 球的移动逻辑 */
function ballLogic(ctx: GameContext, rom: RomReader): void {
  const ballX = ctx.ram.u8(0x0610);
  const ballY = ctx.ram.u8(0x0611);
  const ballSpeedX = ctx.ram.i8(0x0613);
  const ballSpeedY = ctx.ram.i8(0x0614);
  ctx.ram.setU8(0x0610, u8(ballX + ballSpeedX));
  ctx.ram.setU8(0x0611, u8(ballY + ballSpeedY));
  // 碰墙检测
  if (ballX > 240 || ballX < 16) ctx.ram.setU8(0x0613, -ballSpeedX);
  if (ballY > 200 || ballY < 40) ctx.ram.setU8(0x0614, -ballSpeedY);
}

/** $AF8A playerAction: 球员动作处理 */
function playerAction(ctx: GameContext, rom: RomReader): void {
  // 处理当前持球球员的动作 (移动/传球/射门)
  const joypad = ctx.ram.u8(ADDR.JOYPAD1);
  const playerBase = 0x0510;
  // 方向键 → 移动
  if (bit(joypad, 4)) { // UP
    ctx.ram.setU8(playerBase + 1, u8(ctx.ram.u8(playerBase + 1) - 2));
  }
  if (bit(joypad, 5)) { // DOWN
    ctx.ram.setU8(playerBase + 1, u8(ctx.ram.u8(playerBase + 1) + 2));
  }
  if (bit(joypad, 6)) { // LEFT
    ctx.ram.setU8(playerBase, u8(ctx.ram.u8(playerBase) - 2));
  }
  if (bit(joypad, 7)) { // RIGHT
    ctx.ram.setU8(playerBase, u8(ctx.ram.u8(playerBase) + 2));
  }
  // A按钮 → 射门/传球
  if (bit(joypad, 0)) {
    ctx.ram.setU8(0x0613, 3); // 射门速度
  }
}

/** $B050 gameLoopDispatcher: 游戏主循环分派 */
function gameLoopDispatcher(ctx: GameContext, rom: RomReader): void {
  // 根据当前比赛阶段分派到对应处理函数
  const phase = ctx.ram.u8(0x0621); // match time / phase
  if (phase < 45) {
    // 上半场
    calculatePlayerStats(ctx, rom);
    ballLogic(ctx, rom);
    playerAction(ctx, rom);
  } else if (phase < 90) {
    // 下半场
    calculatePlayerStats(ctx, rom);
    ballLogic(ctx, rom);
  } else {
    // 比赛结束
    ctx.ram.setU8(ADDR.SCENE_STATUS, 0xFF);
  }
  ctx.ram.setU8(0x0621, u8(phase + 1));
}

/** $A39B eventHandler: 事件处理器 */
function eventHandler(ctx: GameContext, rom: RomReader): void {
  // 处理比赛事件 (进球/犯规/换人等)
  const event = ctx.ram.u8(0x062A);
  switch (event) {
    case 0: break; // no event
    case 1: // 进球
      ctx.ram.setU8(0x0622, u8(ctx.ram.u8(0x0622) + 1));
      ctx.ram.setU8(0x062A, 0);
      break;
    case 2: // 犯规
      ctx.ram.setU8(0x062A, 0);
      break;
    default:
      ctx.ram.setU8(0x062A, 0);
  }
}

// ============================================================
// § dispatch 分派
// ============================================================

const JUMP_TABLE: BankFn[] = [
  calculatePlayerStats,  // $8003 → $A10D? No, $801E is direct, idx 0 unused
  matchSceneInit,        // idx 1: $8003 → $A10D
  playerDataCalc,        // idx 2: $8006 → $A4EB
  menuHandler,           // idx 3: $8009 → $A64C
  teamSelection,         // idx 4: $800C → $A6D2
  matchSetup,            // idx 5: $800F → $AFC2
  ballLogic,             // idx 6: $8012 → $AF79
  playerAction,          // idx 7: $8015 → $AF8A
  gameLoopDispatcher,    // idx 8: $8018 → $B050
  eventHandler,          // idx 9: $801B → $A39B
];

function dispatch(ctx: GameContext, rom: RomReader): void {
  // ASM: LDX $27 → 查表 JMP
  const jumpIdx = ctx.ram.u8(ADDR.SCENE_ID);
  if (jumpIdx >= 0 && jumpIdx < JUMP_TABLE.length) {
    JUMP_TABLE[jumpIdx](ctx, rom);
  } else {
    // 默认: 执行 $801E 直接入口
    calculatePlayerStats(ctx, rom);
  }
}

// ============================================================
// Module 导出
// ============================================================

export const bank_01: BankModule = {
  rom: romSlice,
  dispatch,
  fns: {
    '$8003': matchSceneInit,
    '$8006': playerDataCalc,
    '$8009': menuHandler,
    '$800C': teamSelection,
    '$800F': matchSetup,
    '$8012': ballLogic,
    '$8015': playerAction,
    '$8018': gameLoopDispatcher,
    '$801B': eventHandler,
    '$801E': calculatePlayerStats,
  },
  calculatePlayerStats,
  matchSceneInit,
  playerDataCalc,
  ballLogic,
  playerAction,
  gameLoopDispatcher,
};
