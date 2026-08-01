/**
 * Bank 22: Sprite/OAM Engine ($8000-$9FFF)
 *
 * 精灵渲染引擎 — 完全脱离 ROM 字节解析。
 * data 文件提供强类型 LayoutItem[] JSON 对象，code 直接迭代。
 *
 * ═══════════════════════════════════════
 * 架构: Controller（精灵渲染引擎）
 * ═══════════════════════════════════════
 */

import type { SystemState } from '../system-state';
import { readMem } from '../system-state';
import { track } from '../debug-log';

// ── UI/背景/精灵数据 bank ──
import { getBank08Data } from './bank-08-code';
import { getBank18Data } from './bank-18-code';
import { getBank21Data } from './bank-21-code';

// ── 强类型数据 (直接消费) ──
import type { LayoutTile, LayoutItem } from './bank-22-sprite-engine-data';
import {
  Y_DELTA_TABLE,
  X_DELTA_TABLE,
  PTR_TABLE_1,
  PTR_TABLE_2,
  PTR_TABLE_3,
  PTR_TABLE_4,
  PTR_TABLE_5,
  LAYOUT_BY_ADDR,
} from './bank-22-sprite-engine-data';

// ═════════════════════════════════════════════════
// $8003: 精灵/OAM 坐标变换 — 主入口
// ═════════════════════════════════════════════════

export function bank22_spriteConvert(sys: SystemState): void {
  track('bank22_spriteConvert');

  // ── 初始化 ──
  sys.mem[0x003F] = 0;
  sys.mem[0x0041] = 0;

  // ── 读 sprite meta 指针 ──
  const ptr3C = (sys.mem[0x003D] << 8) | sys.mem[0x003C];
  const flagsByte = readMem(sys, ptr3C);

  // bit0 → $3F.7, bit1 → $41.7
  sys.mem[0x003F] = (flagsByte & 1) << 7;
  sys.mem[0x0041] = ((flagsByte >> 1) & 1) << 7;

  // AND #$60; ASL; EOR $0517 → $49 (翻转标志)
  let attrFlags = (flagsByte & 0x60) << 1;
  attrFlags ^= readMem(sys, 0x0517);
  sys.mem[0x0049] = attrFlags & 0xFF;

  // ── X 坐标计算 ──
  const xRaw = readMem(sys, (ptr3C + 8) & 0xFFFF);
  let xLo = (xRaw - 0x80) & 0xFF;
  let xHi = sys.mem[0x003F];

  // camera offset negation
  sys.mem[0x003F] = 0;
  const neg0538 = ((readMem(sys, 0x0538) ^ 0xFF) + 1) & 0xFF;
  sys.mem[0x003E] = neg0538;
  if (neg0538 & 0x80) sys.mem[0x003F] = 0xFF;

  // add
  const sumXLo = xLo + sys.mem[0x003E];
  xLo = sumXLo & 0xFF;
  xHi = (xHi + sys.mem[0x003F] + (sumXLo > 0xFF ? 1 : 0)) & 0xFF;

  // X mirror ($0517 bit6)
  if (readMem(sys, 0x0517) & 0x40) {
    xLo = ((xLo ^ 0xFF) + 1) & 0xFF;
    xHi = ((xHi ^ 0xFF) + 1 + (xLo === 0 ? 1 : 0)) & 0xFF;
  }

  // X -8 ($49 bit6)
  if (sys.mem[0x0049] & 0x40) {
    const val = ((xHi << 8) | xLo) - 8;
    xLo = val & 0xFF;
    xHi = (val >> 8) & 0xFF;
  }

  sys.mem[0x003E] = xLo;
  sys.mem[0x003F] = xHi;

  // ── Y 坐标计算 ──
  const yRaw = readMem(sys, (ptr3C + 0x0C) & 0xFFFF);
  let yLo: number; let carry = true;
  if (sys.mem[0x0049] & 0x80) {
    const r = yRaw - 0x88;
    yLo = r & 0xFF;
    carry = r >= 0;
  } else {
    yLo = yRaw & 0xFF;
  }
  sys.mem[0x0040] = yLo;
  sys.mem[0x0041] = (sys.mem[0x0041] - (carry ? 0 : 1)) & 0xFF;

  // ── 指针表 lookup → LayoutItem[] ──
  let rawIdx = readMem(sys, (ptr3C + 0x12) & 0xFFFF);
  const ptrTable = _selectPtrTable(rawIdx);
  rawIdx = (rawIdx & 0x7F); // clear bit7

  if (rawIdx >= ptrTable.length) {
    console.error(`[bank22] 指针表索引越界: ${rawIdx} >= ${ptrTable.length}`);
    return;
  }

  const layoutAddr = ptrTable[rawIdx];

  console.log(`[bank22] layout=$layoutAddr (rawIdx=${rawIdx.toString(16).toUpperCase()}, ptr3C=$${ptr3C.toString(16)})`);

  // 应用 delta 偏移
  _bank22_applyDeltas(sys, ptr3C);

  sys.mem[0x0048] = 0; // OAM count

  // 获取布局并迭代
  const layout = LAYOUT_BY_ADDR.get(layoutAddr);
  if (!layout) {
    // 未解码的布局入口 — 等待后续解码迭代
    console.warn(`[bank22] LAYOUT_BY_ADDR 缺少 0x${layoutAddr.toString(16).toUpperCase()}, 需要解码`);
    return;
  }

  _bank22_iterateLayout(sys, layout);
}

// ═════════════════════════════════════════════════
// 指针表选择
// ═════════════════════════════════════════════════
// 原始: 0x00-0x4D → PTR_TABLE_1 ($8280), 0x80-0xCD → PTR_TABLE_4 ($82E4)
// bit7=0 → TABLE_1 or TABLE_2 (根据范围)
// bit7=1 → TABLE_4 or TABLE_5

function _selectPtrTable(rawIdx: number): readonly number[] {
  if (rawIdx & 0x80) {
    // $82E4: 有 17 entries, 之后用 $8306
    const idx = rawIdx & 0x7F;
    return idx < PTR_TABLE_4.length ? PTR_TABLE_4 : PTR_TABLE_5;
  }
  // $8280: 有 15 entries, $829E: 14 entries, $82BA: 21 entries
  if (rawIdx < PTR_TABLE_1.length) return PTR_TABLE_1;
  const idx2 = rawIdx - PTR_TABLE_1.length;
  if (idx2 < PTR_TABLE_2.length) return PTR_TABLE_2;
  return PTR_TABLE_3;
}

// ═════════════════════════════════════════════════
// LayoutItem[] 迭代
// ═════════════════════════════════════════════════

function _bank22_iterateLayout(sys: SystemState, layout: readonly LayoutItem[]): void {
  for (const item of layout) {
    switch (item.type) {
      case 'GROUP':
        _handleGroup(sys, item);
        break;
      case 'OAM':
        _handleOAM(sys, item);
        break;
      case 'EXIT':
        return;
      case 'ADVANCE_PTR': {
        const next = LAYOUT_BY_ADDR.get(item.ptr);
        if (!next) {
          console.warn(`[bank22] ADVANCE_PTR → 未解码地址 0x${item.ptr.toString(16).toUpperCase()}, 跳过`);
          return;
        }
        _bank22_iterateLayout(sys, next);
        return;
      }
      case 'ADJUST_ANIM':
        // ADJUST_ANIM 之后的布局分支需要完整解码所有 anim frame 子布局
        // 当前仅标记并跳过
        console.warn('[bank22] ADJUST_ANIM: 子布局未完全解码, 需继续迭代');
        return;
    }
  }
}

// ═════════════════════════════════════════════════
// GROUP 处理
// ═════════════════════════════════════════════════

function _handleGroup(sys: SystemState, item: Extract<LayoutItem, { type: 'GROUP' }>): void {
  let yDelta = Y_DELTA_TABLE[item.yDeltaIdx % Y_DELTA_TABLE.length] || 0;

  if (sys.mem[0x0049] & 0x80) {
    yDelta = ((yDelta ^ 0xFF) + 1) & 0xFF;
  }

  const signExtY = (yDelta & 0x80) ? 0xFF : 0;
  const yPos = (yDelta + sys.mem[0x0040]) & 0xFF;
  const hiSum = signExtY + sys.mem[0x0041] + (yPos < yDelta ? 1 : 0);

  if (hiSum !== 0) return; // offscreen

  const minY = readMem(sys, 0x0540);
  const maxY = readMem(sys, 0x0541);
  if (yPos < minY || yPos > maxY) return; // clipped

  sys.mem[0x0046] = yPos;
  _writeTilesToOAM(sys, item.tiles);
}

// ═════════════════════════════════════════════════
// OAM 批量处理
// ═════════════════════════════════════════════════

function _handleOAM(sys: SystemState, item: Extract<LayoutItem, { type: 'OAM' }>): void {
  _writeTilesToOAM(sys, item.tiles);
}

function _writeTilesToOAM(sys: SystemState, tiles: readonly LayoutTile[]): void {
  const flipMask = sys.mem[0x0049];
  const xPosLo = sys.mem[0x003E];
  const xPosHi = sys.mem[0x003F];
  const yPosVal = sys.mem[0x0046];
  let oamSlot = sys.mem[0x003B];

  for (const tile of tiles) {
    let xDelta = X_DELTA_TABLE[(0x0A + tile.xDeltaIdx) % X_DELTA_TABLE.length] || 0;

    if (flipMask & 0x40) {
      xDelta = ((xDelta ^ 0xFF) + 1) & 0xFF;
    }

    const signExtX = (xDelta & 0x80) ? 0xFF : 0;
    const xPos = (xDelta + xPosLo) & 0xFF;
    const xHiSum = signExtX + xPosHi + (xPos < xDelta ? 1 : 0);

    if (xHiSum !== 0) {
      sys.mem[0x0200 + oamSlot] = 0xF8; // hide
    } else {
      sys.mem[0x0200 + oamSlot] = yPosVal;
      sys.mem[0x0200 + oamSlot + 1] = tile.value;
      sys.mem[0x0200 + oamSlot + 2] = (tile.palette & 0x03) | (flipMask & 0xC0);
      sys.mem[0x0200 + oamSlot + 3] = xPos;
      sys.mem[0x0048] = (sys.mem[0x0048] + 1) & 0xFF;
    }

    oamSlot = (oamSlot + 4) & 0xFF;
  }

  sys.mem[0x003B] = oamSlot;
}

// ═════════════════════════════════════════════════
// $8187-$81D1: 应用 X/Y delta 偏移
// ═════════════════════════════════════════════════

function _bank22_applyDeltas(sys: SystemState, metaPtr: number): void {
  const flags = readMem(sys, metaPtr);
  const flipBit = (flags ^ readMem(sys, 0x0517)) & 0x40;

  // X delta (byte 19)
  let dx = readMem(sys, (metaPtr + 0x13) & 0xFFFF);
  if (dx !== 0) {
    dx &= 0xFF;
    if (flipBit !== 0) dx = ((dx ^ 0xFF) + 1) & 0xFF;
    const sx = (dx & 0x80) ? 0xFF : 0;
    const nxLo = (sys.mem[0x003E] + dx) & 0xFF;
    const cx = (sys.mem[0x003E] + dx) > 0xFF ? 1 : 0;
    sys.mem[0x003E] = nxLo;
    sys.mem[0x003F] = (sys.mem[0x003F] + sx + cx) & 0xFF;
  }

  // Y delta (byte 20)
  let dy = readMem(sys, (metaPtr + 0x14) & 0xFFFF);
  if (dy !== 0) {
    dy &= 0xFF;
    if (flipBit !== 0) dy = ((dy ^ 0xFF) + 1) & 0xFF;
    const sy = (dy & 0x80) ? 0xFF : 0;
    const nyLo = (sys.mem[0x0040] + dy) & 0xFF;
    const cy = (sys.mem[0x0040] + dy) > 0xFF ? 1 : 0;
    sys.mem[0x0040] = nyLo;
    sys.mem[0x0041] = (sys.mem[0x0041] + sy + cy) & 0xFF;
  }
}

// ═════════════════════════════════════════════════
// OAM 清空
// ═════════════════════════════════════════════════

export function bank22_clearOAM(sys: SystemState): void {
  for (let i = 0; i < 0x100; i += 4) {
    sys.mem[0x0200 + i] = 0xF8;
  }
}

// ═════════════════════════════════════════════════
// UI/Sprite 数据存取
// ═════════════════════════════════════════════════

export { getBank08Data as bank22_getTilemapData08 } from './bank-08-code';
export { getBank18Data as bank22_getUIData18 } from './bank-18-code';
export { getBank21Data as bank22_getOAMData21 } from './bank-21-code';

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank22_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank22_spriteConvert,
  0x03: bank22_clearOAM,
};

console.log(`[bank22] ✅ LayoutItem[] 驱动 — 已解码 ${LAYOUT_BY_ADDR.size} 个布局入口`);
