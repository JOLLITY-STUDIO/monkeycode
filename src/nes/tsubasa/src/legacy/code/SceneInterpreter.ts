/**
 * 天使之翼2 - 场景脚本 bytecode 解释器
 *
 * 对应原版 Bank $00:
 *   $8464: 场景入口/初始化 (sceneInit)
 *   $84E7: 主解释循环 (sceneInterpreter)
 *   $84EF: tile 写入分支 (op_TileWrite)
 *   $8504: 帧延时分支 (op_FrameDelay)
 *   $851C: 属性表跳转分支 (op_AttrJump)
 *   $8537-$8855: 24 种控制操作码分发
 *   $8879: 指针递增 (pcAdvance)
 *   $88CA: tile 写入到 VRAM 缓冲区 (writeTileToVram)
 *   $8EF0: 大块 tile 上传 (uploadTileBlock, 含 bank_08 访问)
 *
 * 场景脚本引擎通过逐字节解释 bytecode 驱动所有过场动画和数据加载。
 */

import { GameState } from '../types';
import { NesMemory } from './Memory';
import {
  switchMmc3Bank, waitVBlank, screenOff, screenOn,
  clearVram, setPpuAddr, readInput, screenInit,
  allocVramQueueEntry, commitVramQueueEntry,
} from './CoreUtils';
import { SceneConst, CtrlOpcode, FRAME_DELAY_TABLE, SCENE_BANK_THRESHOLDS } from './SceneData';

// ============================================================================
// $8A14 瓦片映射表 (256 bytes)
// 场景 bytecode tile 值 >= $A0 时，通过此表查得实际 PPU tile 索引
// ROM 数据: bank_00 offset $0A14-$0B13
// 仅偏移 $A0-$D7 有效 (对应 bytecode opcode 范围)
// ============================================================================
const TILE_MAPPING_8A14 = new Uint8Array(256);
(function init8A14() {
  const t = TILE_MAPPING_8A14;
  t[0xA0]=0x06;t[0xA1]=0x07;t[0xA2]=0x08;t[0xA3]=0x09;
  t[0xA4]=0x0A;t[0xA5]=0x0B;t[0xA6]=0x0C;t[0xA7]=0x0D;
  t[0xA8]=0x0E;t[0xA9]=0x0F;t[0xAA]=0x10;t[0xAB]=0x11;
  t[0xAC]=0x12;t[0xAD]=0x13;t[0xAE]=0x14;t[0xAF]=0x1A;
  t[0xB0]=0x1B;t[0xB1]=0x1C;t[0xB2]=0x1D;t[0xB3]=0x1E;
  t[0xB4]=0x46;t[0xB5]=0x47;t[0xB6]=0x48;t[0xB7]=0x49;
  t[0xB8]=0x4A;t[0xB9]=0x4B;t[0xBA]=0x4C;t[0xBB]=0x4D;
  t[0xBC]=0x4E;t[0xBD]=0x4F;t[0xBE]=0x50;t[0xBF]=0x51;
  t[0xC0]=0x52;t[0xC1]=0x53;t[0xC2]=0x54;t[0xC3]=0x5A;
  t[0xC4]=0x5B;t[0xC5]=0x5C;t[0xC6]=0x5D;t[0xC7]=0x5E;
  t[0xC8]=0x1A;t[0xC9]=0x1B;t[0xCA]=0x1C;t[0xCB]=0x1D;
  t[0xCC]=0x1E;t[0xCD]=0x5A;t[0xCE]=0x5B;t[0xCF]=0x5C;
  t[0xD0]=0x5D;t[0xD1]=0x5E;t[0xD2]=0x01;t[0xD3]=0x0A;
  t[0xD4]=0x14;t[0xD5]=0x28;t[0xD6]=0x3C;t[0xD7]=0x50;
})();

// ============================================================================
// 场景上下文 (对应原版 ZP 变量区间)
// ============================================================================
interface SceneContext {
  /** $4D/$4E: 场景脚本 bytecode 指针 (PC) */
  scriptLo: number;
  scriptHi: number;
  /** $4F: 精灵X坐标 / 滚动基准地址 */
  scrollBase: number;
  /** $50/$51: 数据源指针 (tile 数据的高/低字节) */
  dataSrcLo: number;
  dataSrcHi: number;
  /** $52/$53: 数据源指针 (辅助) */
  dataSrc2Lo: number;
  dataSrc2Hi: number;
  /** $54: nametable 属性表地址低字节 */
  attrAddrLo: number;
  /** $55: nametable 属性表地址高字节 */
  attrAddrHi: number;
  /** $56: 当前 PRG bank 编号 */
  prgBankNum: number;
  /** $ED: 光标/选中闪烁计数器, 在此复用为 bank 暂存 */
  bankTemp: number;
  /** $EC: VRAM 地址暂存 */
  vramTemp: number;
}

// ============================================================================
// $8464: 场景入口 — 初始化场景脚本
//
// 调用约定:
//   A = 场景索引
//   $8464(A) 通过 ROM 表定位脚本, 设置 $4D/$4E 为初始指针, 初始化 PPU 环境
//
// 查表逻辑:
//   1. Y=2,4,6,... 遍历 $8AEE[Y] 找到 sceneIdx < $8AEE[Y]
//   2. sceneIdx -= $8AEC[Y] 得到 bank 内偏移索引
//   3. X = $8AED[Y] 得到 PRG bank 编号
//   4. 偏移索引*2 + $A000 读取 2 字节指针, 得到脚本 ROM 地址
// ============================================================================
export function sceneInit(ctx: GameState, mem: NesMemory, sceneIdx: number): void {
  const ram = ctx.cpu.ram;
  const sc = getSceneRegs(ctx);

  // ── $00:8464-$00:847D: 查表定位场景脚本 ──
  let y = 2;
  while (sceneIdx >= SCENE_BANK_THRESHOLDS[y]) {
    y += 2;
  }

  const offsetInBank = sceneIdx - ((y - 2 >= 0 && y - 2 < SCENE_BANK_THRESHOLDS.length) ? SCENE_BANK_THRESHOLDS[y - 2] : 0);
  sc.prgBankNum = (y - 1 >= 0 && y - 1 < SCENE_BANK_THRESHOLDS.length) ? SCENE_BANK_THRESHOLDS[y - 1] : 0;
  sc.scriptLo = (offsetInBank << 1);
  sc.scriptHi = 0xA0;                     // 基地址 = $A000

  // ── $00:847F-$00:848D: 切换到场景 bank, 读脚本 2 字节指针 ──
  const savedBank = ctx.cpu.ram[0x25];
  ram[0xED] = savedBank;
  switchMmc3Bank(ctx, sc.prgBankNum, 6);

  const ptrLo = mem.read(0xA000 + sc.scriptLo);
  const ptrHi = mem.read(0xA000 + sc.scriptLo + 1);
  sc.scriptLo = ptrLo;
  sc.scriptHi = ptrHi;

  // ── $00:8494-$00:84AC: 初始化脚本执行环境 ──
  ram[0x0D] = 0;
  ram[0x0E] = 0;
  mem.ram[0x0652] = 0;

  // ── $00:84B0-$00:84C3: 设 PPU 属性和 bank 恢复 ──
  ram[0xE6] = 0xE0;
  ram[0xE7] = 0x23;

  switchMmc3Bank(ctx, savedBank, 6);

  // ── $00:84C6-$00:84E5: 初始化数据源指针 ──
  sc.attrAddrHi = 0x08;
  sc.scrollBase = 0x49;
  sc.dataSrcLo = 0x22;
  sc.dataSrcHi = sc.scrollBase;
  sc.attrAddrLo = sc.scrollBase & 0x1F;
  sc.dataSrc2Lo = sc.dataSrcLo;
  sc.dataSrc2Hi = sc.dataSrcHi;

  console.log(`[scene] Init scene #${sceneIdx.toString(16)} bank=$${sc.prgBankNum.toString(16)} script=$${sc.scriptHi.toString(16)}${sc.scriptLo.toString(16).padStart(2,'0')}`);
}

// ============================================================================
// $84E7: 主解释循环 — 逐字节执行
// 每次调用执行一条 bytecode 指令
// 返回 false 表示脚本还在执行, true 表示脚本已结束
// ============================================================================
export function sceneInterpreter(ctx: GameState, mem: NesMemory, sc: SceneContext): boolean {
  const ram = ctx.cpu.ram;

  if (sc.scriptHi === 0 && sc.scriptLo === 0) {
    return true;
  }

  // ── $84E7: LDY #0 / LDA ($4D),Y ── 读下一条操作码
  const opcode = mem.read((sc.scriptHi << 8) | sc.scriptLo);

  // ── $84EB-$84ED: 操作码分发 ──
  if (opcode < 0xD8) {
    op_TileWrite(ctx, mem, sc, opcode);
    pcAdvance(sc, 1);
    return false;
  }

  if (opcode < 0xE0) {
    op_FrameDelay(ctx, mem, sc, opcode);
    pcAdvance(sc, 1);
    return false;
  }

  if (opcode < 0xE8) {
    op_AttrJump(ctx, mem, sc, opcode);
    pcAdvance(sc, 1);
    return false;
  }

  const ctrlOp = opcode as CtrlOpcode;
  const adv = execControlOp(ctx, mem, sc, ctrlOp);
  if (adv < 0) return true;
  pcAdvance(sc, adv);
  return false;
}

// ============================================================================
// $84EF: 操作码 $00-$D7 — Tile 写入
//
// 将 bytecode opcode 作为 tile 值, 通过 $88CA 写入 VRAM 缓冲区
// $53++ 推进数据源指针
// 如果 $55 != 0: 调用 $895D 做属性表检查
// ============================================================================
function op_TileWrite(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext, opcode: number
): void {
  // $84EF: LDX $52 / LDY $53 — 加载数据源指针 (PPU VRAM 坐标)
  // $84F3: JSR $88CA — 写入 tile 到 VRAM 队列 (A = opcode = tile 值)
  writeTileToVram(ctx, mem, sc.dataSrc2Lo, sc.dataSrc2Hi, opcode);

  // $84F6: INC $53 — 推进数据源高字节
  sc.dataSrc2Hi++;

  // $84F8-$84FC: 如果 $55 != 0 则 JSR $895D 做属性表写入逻辑
  if (sc.attrAddrHi !== 0) {
    doAttributeWrite(ctx, mem, sc);
  }
}

// ============================================================================
// $8504: 操作码 $D8-$DF — 帧延时
// opcode - $D8 索引查 $8AE6 表得延时 VBlank 帧数
// ============================================================================
function op_FrameDelay(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext, opcode: number
): void {
  const idx = opcode - SceneConst.DELAY_OP_MIN;
  const frames = FRAME_DELAY_TABLE[idx];

  disableIRQFlags(ctx);

  waitVBlank(ctx, mem, frames);
}

// ============================================================================
// $851C: 操作码 $E0-$E7 — 属性表跳转
// (opcode - $E1) ^ $FF + $53 → 更新数据源指针高字节
// ============================================================================
function op_AttrJump(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext, opcode: number
): void {
  const offset = (opcode - 0xE1) ^ 0xFF;
  sc.dataSrc2Hi = (sc.dataSrc2Hi + offset) & 0xFF;

  const newLine = sc.dataSrc2Hi & 0x1F;
  if (newLine < sc.attrAddrLo) {
    sc.attrAddrLo = newLine;
  }
}

// ============================================================================
// $8537-$8855: 控制操作码分发 ($E8-$FF)
// 通过 RTS 式跳转表 (栈上压地址 + RTS) 分发到各处理函数
// ============================================================================
function execControlOp(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext, opcode: CtrlOpcode
): number {
  const ram = ctx.cpu.ram;

  switch (opcode) {
    // ── $E8: 直接 VRAM 地址写入 ($8575) ──
    case CtrlOpcode.SET_PPU_ADDR: {
      pcAdvance(sc, 1);
      const ppuAddr = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      setPpuAddr(ctx, ppuAddr & 1, ppuAddr >> 1);
      return 2;
    }

    // ── $E9: 等 2 帧 + 清输入状态 ($8580) ──
    case CtrlOpcode.WAIT_2FRAMES: {
      waitVBlank(ctx, mem, 2);
      return 1;
    }

    // ── $EA: 清屏 + 开 PPU + 填双 nametable ($858D) ──
    case CtrlOpcode.CLEAR_SCREEN: {
      screenOn(ctx, mem);

      ram[0xE6] = 0x00; ram[0xE7] = 0x20;
      ram[0xE6] = 0x00; ram[0xE7] = 0x24;

      sc.prgBankNum = 0;
      ram[0x4C] = 0;
      ram[0x7B] = 0;
      ram[0x0D] = 0;
      ram[0x0E] = 0;
      return 1;
    }

    // ── $EB: 关 PPU + 动画资源回收 ($85C4) ──
    case CtrlOpcode.PPU_OFF: {
      disableIRQFlags(ctx);
      return 1;
    }

    // ── $EC: 条件判断 ($85D2) ──
    case CtrlOpcode.CONDITION: {
      pcAdvance(sc, 1);
      const param = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      if (param === 0xFF) {
        mem.ram[0x0652] = 0;
      } else {
        checkSceneCondition(ctx, mem, param);
      }
      return 2;
    }

    // ── $ED: 场景队列写 ($85EC) ──
    case CtrlOpcode.SCENE_QUEUE: {
      pcAdvance(sc, 1);
      const sceneId = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      for (let i = 0; i < SceneConst.SCENE_QUEUE_SIZE; i++) {
        if (mem.ram[SceneConst.SCENE_QUEUE_ADDR + i] === 0) {
          mem.ram[SceneConst.SCENE_QUEUE_ADDR + i] = sceneId;
          break;
        }
      }
      return 2;
    }

    // ── $EE/$F1: 写 UI 面板 ($8604/$864A) ──
    case CtrlOpcode.UI_PANEL:
    case CtrlOpcode.UI_PANEL_2: {
      ram[0xE6] = 0x21; ram[0xE7] = 0x22;
      return 1;
    }

    // ── $EF: 切换音效标记 ($8618) ──
    case CtrlOpcode.TOGGLE_SOUND: {
      waitVBlank(ctx, mem, 2);
      ram[0x99] ^= 0x80;
      ram[0x99] |= 0x40;
      return 1;
    }

    // ── $F0: 加载新数据块 ($862C) ──
    case CtrlOpcode.LOAD_DATA_BLOCK: {
      pcAdvance(sc, 1);
      const paramLo = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      pcAdvance(sc, 1);
      const paramHi = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      sc.scrollBase = paramLo;
      sc.dataSrcHi = paramLo;
      sc.dataSrcLo = paramHi;
      sc.dataSrc2Lo = paramHi;

      sc.dataSrc2Lo = sc.dataSrcLo;
      sc.dataSrc2Hi = sc.dataSrcHi;
      return 3;
    }

    // ── $F2: 播放音乐 ($8659) ──
    case CtrlOpcode.PLAY_MUSIC: {
      pcAdvance(sc, 1);
      const musicIdx = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      console.log(`[scene] Play music #${musicIdx.toString(16)}`);
      return 2;
    }

    // ── $F3: 设属性表高字节 ($8678) ──
    case CtrlOpcode.SET_ATTR_HI: {
      pcAdvance(sc, 1);
      sc.attrAddrHi = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      return 2;
    }

    // ── $F4: 等待输入 ($8682) ──
    case CtrlOpcode.WAIT_INPUT: {
      pcAdvance(sc, 1);
      const param = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      if (param === 0) {
        readInput(ctx, mem);
        return 2;
      } else if (param === 0xFF) {
        pcAdvance(sc, 1);
        const keyMask = mem.read((sc.scriptHi << 8) | sc.scriptLo);
        return 4;
      } else if (param >= 0x80) {
        return 2;
      } else {
        return 2;
      }
    }

    // ── $F5: 子操作码分发 ($86B8) ──
    case CtrlOpcode.SUB_OP_F5: {
      pcAdvance(sc, 1);
      const subOp = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      execF5SubOp(ctx, mem, sc, subOp);
      return 2;
    }

    // ── $F6: 设精灵 Y ($87B8) ──
    case CtrlOpcode.SET_SPRITE_Y: {
      pcAdvance(sc, 1);
      let param = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      if (param !== 0xFF) {
        param |= 0x80;
      }
      ram[0x4C] = param;
      return 2;
    }

    // ── $F7: 参数帧延时 ($87CB) ──
    case CtrlOpcode.DELAY_PARAM: {
      disableIRQFlags(ctx);
      pcAdvance(sc, 1);
      const frames = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      waitVBlank(ctx, mem, frames);
      return 2;
    }

    // ── $F8: 滚屏开关 ($87D9) ──
    case CtrlOpcode.TOGGLE_SCROLL: {
      if (ram[0x09] !== 0) {
        // 特殊处理
      }
      ram[0x7B] ^= 0x01;
      ram[0x7A] = 0;
      ram[0x44] = 0;
      ram[0x45] = 0;
      return 1;
    }

    // ── $F9: 进入比赛引擎 ($87F8) ──
    case CtrlOpcode.ENTER_MATCH: {
      pcAdvance(sc, 1);
      const paramLo = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      pcAdvance(sc, 1);
      const paramHi = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      ram[0xED] = paramLo;
      ram[0xEC] = paramHi;

      switchMmc3Bank(ctx, 2, 6);
      switchMmc3Bank(ctx, sc.prgBankNum, 6);
      return 3;
    }

    // ── $FA/$FB: 播放音效 + 滚屏标志 ($8814/$881B) ──
    case CtrlOpcode.PLAY_SFX_SCROLL: {
      ram[0x5B] &= 0xFB;
      pcAdvance(sc, 1);
      const sfxId = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      console.log(`[scene] Play SFX #${sfxId.toString(16)}`);
      return 2;
    }
    case CtrlOpcode.PLAY_SFX_SCROLL2: {
      ram[0x5B] |= 0x04;
      pcAdvance(sc, 1);
      const sfxId = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      console.log(`[scene] Play SFX2 #${sfxId.toString(16)}`);
      return 2;
    }

    // ── $FC: 加载调色板数据块 ($8831) ──
    case CtrlOpcode.LOAD_PALETTE: {
      console.log('[scene] Load palette data block');
      return 1;
    }

    // ── $FD: 滚屏推进 ($8837) ──
    case CtrlOpcode.SCROLL_ADVANCE: {
      disableIRQFlags(ctx);
      waitVBlank(ctx, mem, 4);

      sc.dataSrcHi = (sc.dataSrcHi + 0x40) & 0xFF;
      sc.dataSrc2Lo = (sc.dataSrc2Lo + 0x00) & 0xFF;
      sc.dataSrc2Hi = (sc.dataSrc2Hi + 0x00) & 0xFF;

      pcAdvanceNoOp(sc);
      return 1;
    }

    // ── $FE: 关 PPU + 延迟 + 前进 ($8855) ──
    case CtrlOpcode.PPU_OFF_ADVANCE: {
      waitVBlank(ctx, mem, 4);
      pcAdvance(sc, 1);
      return 1;
    }

    // ── $FF: 场景结束/跳转 ($8862) ──
    case CtrlOpcode.SCENE_END: {
      pcAdvance(sc, 1);
      const newLo = mem.read((sc.scriptHi << 8) | sc.scriptLo);
      pcAdvance(sc, 1);
      const newHi = mem.read((sc.scriptHi << 8) | sc.scriptLo);

      if (newHi === 0 && newLo === 0) {
        sc.scriptLo = 0;
        sc.scriptHi = 0;
        return -1;
      }

      sc.scriptLo = newLo;
      sc.scriptHi = newHi;
      return 3;
    }

    default:
      console.warn(`[scene] Unknown control opcode: $${opcode.toString(16)}`);
      return 1;
  }
}

// ============================================================================
// F5 子操作码分发
// 对应原版 $86B8-$86C5 (通过 RTS 跳转表)
// ============================================================================
function execF5SubOp(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext, subOp: number
): void {
  const ram = ctx.cpu.ram;

  switch (subOp) {
    case 0: break;    // $86D5: JSR $99D0
    case 1: break;    // $86DD: JSR $99D1
    case 2: break;    // $86E5: JSR $9A0D
    case 3: break;    // $86ED: JSR $9A1F
    case 4:
      ram[0xED] = 4;
      break;
    case 5:
      ram[0xED] = 0;
      break;
    case 6: break;    // $8733: 对话框/文本
    case 7: break;    // $879E: 滚屏动画效果
    default:
      console.warn(`[scene] Unknown F5 sub-op: ${subOp}`);
  }
}

// ============================================================================
// $88CA: 写入 tile 到 VRAM 缓冲区队列
//
// 6502 调用约定:
//   A = tile 值 (bytecode opcode, 0x00-0xD7)
//   X = PPU VRAM 地址高字节 ($52)
//   Y = PPU VRAM 地址低字节 ($53)
//
// 逻辑:
//   1. 分配 VRAM 队列条目 (ctrl=$82, 2-byte 模式)
//   2. 如果 tile >= $A0: 查 $8A14 映射表
//   3. 写入数据字节后提交队列
// ============================================================================
function writeTileToVram(
  ctx: GameState, mem: NesMemory,
  addrHi: number, addrLo: number,
  tile: number
): void {
  const ram = mem.ram;

  // $88CB: LDA #$82 — 控制字节: bit7=1(inc32 mode), count=2
  // $88CD: JSR $9B28 — 分配队列条目
  const dataPos = allocVramQueueEntry(mem, 0x82, addrHi, addrLo);
  if (dataPos < 0) {
    console.warn('[scene] VRAM queue overflow in writeTileToVram');
    return;
  }

  // $88D1: CMP #$A0 / BCC $88ED — 判断是否需要映射
  if (tile < 0xA0) {
    // $88ED: STA $05E9,X — 直接写入 tile
    // $88F0-$88F6: 设 control byte = $00, 写数据, INX×2
    ram[0x05E8 + dataPos] = 0x00;
    ram[0x05E9 + dataPos] = tile & 0xFF;
    commitVramQueueEntry(mem, dataPos + 2);
  } else {
    // $88D5-$88DC: 查表映射
    // CMP #$C8 → carry flag
    // LDA #$94; ADC #$00 → control = $94 (tile<$C8) or $95 (tile>=$C8)
    const mappedCtrl = (tile < 0xC8) ? 0x94 : 0x95;
    const mappedTile = TILE_MAPPING_8A14[tile & 0xFF];

    // $88DC: STA $05E8,X — 写 control
    // $88DF: INX
    // $88E5: STA $05E8,X — 写 mapped tile
    ram[0x05E8 + dataPos] = mappedCtrl;
    ram[0x05E9 + dataPos] = mappedTile;
    commitVramQueueEntry(mem, dataPos + 2);
  }
}

// ============================================================================
// $895D: 属性表检查/写入
// 检查 tile 是否需要写入属性表 (给 2×2 tile 组更新属性)
// ============================================================================
function doAttributeWrite(
  ctx: GameState, mem: NesMemory,
  sc: SceneContext
): void {
  // 属性表更新逻辑: 根据 nametable 位置更新 $23C0+ 属性表区域
  // TODO: 移植 $895D 完整逻辑
}

// ============================================================================
// $89D2: 条件判断 (配合 $EC 操作码)
// 切换到 Bank $06, 读取 $BD00 条件表, 更新 $0652/$0653 条件标志
// ============================================================================
function checkSceneCondition(
  ctx: GameState, mem: NesMemory,
  condIdx: number
): void {
  const ram = ctx.cpu.ram;

  switchMmc3Bank(ctx, 6, 6);

  ram[0x90] = 0;

  switchMmc3Bank(ctx, 0, 6);
}

// ============================================================================
// $899A: 关闭 IRQ 标志
// ============================================================================
function disableIRQFlags(ctx: GameState): void {
  const ram = ctx.cpu.ram;
  ram[0x99] = (ram[0x99] & 0x80) | 0x40;
}

// ============================================================================
// $8EF0-$8FCB: 大块 tile 上传函数 (meeting / 特殊场景)
//
// 6502 调用约定:
//   A = tile index 参数 (乘 17 得到 bank_08 偏移)
//   $5B bit0 → $EB 高字节初值
//   $5C/$5D → $67/$68 (PPU nametable 坐标)
//
// 流程:
//   1. 计算指针 = $A000 + index*17 + bit0($5B)*256
//   2. 切换 reg 7 → bank_08
//   3. 读 17 字节: 1 字节属性 + 16 字节 tile 数据 (4行×4列)
//   4. 每行作为一个 4 字节 VRAM 队列条目
//   5. 写入属性表条目
//   6. 恢复 reg 7 → bank_07
//
// 对应: meeting tile data (会见画面 tile 数据加载)
// ============================================================================
export function uploadTileBlock(
  ctx: GameState, mem: NesMemory,
  tileIndex: number
): void {
  const ram = ctx.cpu.ram;

  // $8EF1-$8EF7: 保存 nametable 坐标
  ram[0x67] = ram[0x5C];
  ram[0x68] = ram[0x5D];

  // $8EF9-$8EFD: 提取 $5B bit0 作为高位初值
  const bit0 = ram[0x5B] & 0x01;
  ram[0xEB] = bit0;

  // $8EFE-$8F1E: 计算指针 = index * 17 + bit0*256
  let ea = tileIndex & 0xFF;
  let eb = ram[0xEB]; // bit0

  // ×16: [ASL EA / ROL EB] ×4
  ea = (ea << 1) & 0xFF; if (ea & 0x100) eb = (eb + 1) & 0xFF;  // ASL×1
  ea = (ea << 1) & 0xFF; if (ea & 0x100) eb = (eb + 1) & 0xFF;  // ASL×2  
  ea = (ea << 1) & 0xFF; if (ea & 0x100) eb = (eb + 1) & 0xFF;  // ASL×3
  ea = (ea << 1) & 0xFF; if (ea & 0x100) eb = (eb + 1) & 0xFF;  // ASL×4

  // + 1 extra = ×17: CLC / ADC $EA
  ea = (ea + tileIndex) & 0xFF;

  // TYA / ADC $EB (high byte)
  eb = (bit0 + eb + (ea > 0xFF ? 1 : 0)) & 0xFF;

  // $8F19-$8F1E: $EA += 0, 进位加到 $EB
  // (already handled in the addition above)

  // $8F20-$8F24: $EB += $A0 → 基址 $A000
  ram[0xEA] = ea;
  ram[0xEB] = (eb + 0xA0) & 0xFF;

  // $8F26-$8F28: 切换 reg 7 → bank_08
  switchMmc3Bank(ctx, 7, 8);

  // $8F2B-$8F2F: 读第 1 字节 (tile 属性)
  const tileAttr = mem.read(0xA000 + (ram[0xEA] | (ram[0xEB] << 8) - 0xA0 /* bank_08 is at $A000 via reg 7 */));
  // Actually: the pointer $EA/$EB is at $A000 + offset. mem.read uses CPU address.
  // The pointer is: ($EB << 8) | $EA = addr within $A000-$BFFF range
  const ptr = (ram[0xEB] << 8) | ram[0xEA];
  const firstByte = mem.read(ptr);
  ram[0xE7] = firstByte;

  // $8F31: JSR $8FD1 — 写属性表条目 (处理 tile 属性的 PPU 写入)
  writeAttrTableEntry(ctx, mem);

  // $8F34-$8F38: 推进指针过第 1 字节
  ram[0xEA] = (ram[0xEA] + 1) & 0xFF;
  if (ram[0xEA] === 0) {
    ram[0xEB] = (ram[0xEB] + 1) & 0xFF;
  }

  // $8F3A: LDA #4 / STA $E8 — 4 轮循环 (4 行)
  for (let row = 0; row < 4; row++) {
    // $8F3E-$8F42: 取 current nametable 坐标
    const ntLo = ram[0x67];
    const ntHi = ram[0x68];

    // $8F44: JSR $9B28 — 分配 4 字节数据条目
    const dataPos = allocVramQueueEntry(mem, 0x04, ntHi, ntLo);
    if (dataPos < 0) {
      console.warn('[scene] VRAM queue overflow in uploadTileBlock');
      break;
    }

    // $8F47-$8F52: 复制 4 字节 tile 数据
    const bankAddr = (ram[0xEB] << 8) | ram[0xEA];
    for (let i = 0; i < 4; i++) {
      ram[0x05E8 + dataPos + i] = mem.read(bankAddr + i);
    }

    // $8F54: JSR $9B5E — 提交条目
    commitVramQueueEntry(mem, dataPos + 4);

    // $8F5B-$8F73: 指针 += 4, 坐标 += $20 (下一行)
    ram[0xEA] = (ram[0xEA] + 4) & 0xFF;
    ram[0x67] = (ram[0x67] + 0x20) & 0xFF;
    ram[0x68] = (ram[0x68] + ((ram[0x67] < 0x20) ? 1 : 0)) & 0xFF;
    // $8FEB already added at the top

    // $8F75-$8F7F: nametable 边界检查
    if ((ram[0x68] & 0x03) === 0x03) {
      if (ram[0x67] >= 0xC0) {
        // $8F81-$8F8C: 回绕到属性表区域 ($23C0+)
        ram[0x67] = (ram[0x67] - 0xC0) & 0xFF;
        ram[0x68] = (ram[0x68] - 0x03) & 0xFF;

        // $8F8E-$8FC8: 处理属性表写入
        const attrBits = ram[0xE7] >> 4;
        const attrIdx = (ram[0x67] >> 2) & 0x07;

        // $8F91-$8F9C: 构建属性表条目
        const isSecondPass = (ram[0x62] & 0xC0) === 0x40;

        if (!isSecondPass) {
          // $8FA5-$8FB1: 首次写入属性值
          ram[0x064A + attrIdx] = attrBits;
          const attrPos2 = allocVramQueueEntry(mem, 0x01, 0x23, ram[0xE6]);
          if (attrPos2 >= 0) {
            ram[0x05E8 + attrPos2] = attrBits;
            commitVramQueueEntry(mem, attrPos2 + 1);
          }
        } else {
          // $8FB8-$8FC4: 合并属性值
          const combined = attrBits | ram[0x064A + attrIdx];
          const attrPos2 = allocVramQueueEntry(mem, 0x01, 0x23, ram[0xE6]);
          if (attrPos2 >= 0) {
            ram[0x05E8 + attrPos2] = combined;
            commitVramQueueEntry(mem, attrPos2 + 1);
          }
        }
      }
    }
  }

  // $8FCB-$8FCD: 恢复 reg 7 → bank_07
  switchMmc3Bank(ctx, 7, 7);
}

// ============================================================================
// $8FD1: 属性表条目写入 (被 $8EF0 调用)
// 检查 $67 bit7, 如果设置则需要对属性表做更复杂的处理
// ============================================================================
function writeAttrTableEntry(
  ctx: GameState, mem: NesMemory
): void {
  const ram = ctx.cpu.ram;

  // $8FD4: BIT $67 — 检查 bit7
  if ((ram[0x67] & 0x80) === 0) {
    // $903A-$9047: 简单路径 — 直接写 1 字节到 VRAM 队列
    const pos = allocVramQueueEntry(mem, 0x01, 0x23, ram[0x67]);
    if (pos >= 0) {
      ram[0x05E8 + pos] = ram[0xE7] & 0xFF;
      commitVramQueueEntry(mem, pos + 1);
    }
    return;
  }

  // $8FD8-$8FDE: 复杂路径 — 需要处理两个属性条目
  // $9049 → 计算属性表地址
  const e6 = ((ram[0x67] & 0x9C) >> 2);
  const attrByteOff = (e6 & 0x20) >> 2 | e6;
  const attrAddr = (attrByteOff & 0x0F) | ((ram[0x68] << 4) & 0x30) | 0xC0;

  // $8FDE: 分配 1 字节条目
  const pos = allocVramQueueEntry(mem, 0x01, 0x23, attrAddr);
  if (pos < 0) return;

  const isCombined = (ram[0x62] & 0xC0) === 0x40;
  const attrIdx = (ram[0x67] >> 2) & 0x07;

  if (isCombined) {
    // $900B-$9028: 合并路径 — 已有一个属性值
    const prevVal = ram[0xE7] << 4;
    const combined = (ram[0xE7] >> 4) | ram[0x064A + attrIdx];
    ram[0x064A + attrIdx] = prevVal & 0xF0;
    ram[0x05E8 + pos] = combined;
    commitVramQueueEntry(mem, pos + 1);

    // 写第二个属性值
    const pos2 = allocVramQueueEntry(mem, 0x01, 0x23, attrAddr + 8);
    if (pos2 >= 0) {
      ram[0x05E8 + pos2] = (prevVal >> 4) & 0x0F;
      commitVramQueueEntry(mem, pos2 + 1);
    }
  } else {
    // $8FF0-$9008: 首次写入
    ram[0x064A + attrIdx] = ram[0xE7] & 0xFF;
    ram[0x05E8 + pos] = ram[0xE7] & 0xFF;
    commitVramQueueEntry(mem, pos + 1);
  }
}

// ============================================================================
// 辅助函数
// ============================================================================

/** $8879: 递增脚本指针 $4D/$4E */
function pcAdvance(sc: SceneContext, count: number): void {
  sc.scriptLo = (sc.scriptLo + count) & 0xFF;
  if (sc.scriptLo < count) {
    sc.scriptHi = (sc.scriptHi + 1) & 0xFF;
  }
}

/** 仅递增不读 (带进位检查) */
function pcAdvanceNoOp(sc: SceneContext): void {
  sc.scriptLo = (sc.scriptLo + 1) & 0xFF;
  if (sc.scriptLo === 0) {
    sc.scriptHi = (sc.scriptHi + 1) & 0xFF;
  }
}

/** 从 GameState 提取场景上下文 (对应 ZP 变量) */
export function getSceneRegs(ctx: GameState): SceneContext {
  const ram = ctx.cpu.ram;
  return {
    scriptLo: ram[0x4D],
    scriptHi: ram[0x4E],
    scrollBase: ram[0x4F],
    dataSrcLo: ram[0x50],
    dataSrcHi: ram[0x51],
    dataSrc2Lo: ram[0x52],
    dataSrc2Hi: ram[0x53],
    attrAddrLo: ram[0x54],
    attrAddrHi: ram[0x55],
    prgBankNum: ram[0x56],
    bankTemp: ram[0xED],
    vramTemp: ram[0xEC],
  };
}

/** 保存场景上下文回 GameState */
export function saveSceneRegs(ctx: GameState, sc: SceneContext): void {
  const ram = ctx.cpu.ram;
  ram[0x4D] = sc.scriptLo;
  ram[0x4E] = sc.scriptHi;
  ram[0x4F] = sc.scrollBase;
  ram[0x50] = sc.dataSrcLo;
  ram[0x51] = sc.dataSrcHi;
  ram[0x52] = sc.dataSrc2Lo;
  ram[0x53] = sc.dataSrc2Hi;
  ram[0x54] = sc.attrAddrLo;
  ram[0x55] = sc.attrAddrHi;
  ram[0x56] = sc.prgBankNum;
  ram[0xED] = sc.bankTemp;
  ram[0xEC] = sc.vramTemp;
}
