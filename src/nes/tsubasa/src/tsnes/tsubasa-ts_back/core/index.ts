/**
 * ============================================================================
 * core/index — 统一导出
 * ============================================================================
 */

export { parseHeader, MAGIC_NES } from './def/header.ts';
export { createPpuState, writeCtrl, writeMask, readStatus, writeScroll, writeVramAddr, writeVramData, tickFrame, consumeNmi, createNametable, SCANLINES, VBLANK_START, VISIBLE } from './engine/ppu.ts';
export { createMmc3State, write8000, write8001, writeA000, writeC000, writeC001, writeE000, writeE001, mapPrgAddr, mapChrAddr, readPrg as mmc3ReadPrg } from './engine/mapper-mmc3.ts';
export { createEngineState, gameTick, startLoop, stopLoop, pause, resume, displayListRect, displayListPalette, displayListOam, encodeJoypad } from './engine/engine.ts';
export { createBootState, bootSequence, warmReset, BootPhase, RESET_VECTOR_ADDR, SYSTEM_INIT_ENTRY, MAIN_LOOP_ENTRY } from '../boot.ts';
export { createNesSystem, attachPeripherals, readPrg, printSysState, ROM_HEADER, PRG_TOTAL_SIZE, CHR_TOTAL_SIZE } from './def/nes.ts';
// bus.ts exports
export { createBus } from './engine/bus.ts';
// cpu.ts exports — REMOVED (no 6502 CPU emulation needed)
// datacache.ts exports
export { DataCache } from './engine/datacache.ts';
// prg.ts / chr.ts 工具函数
export { readByte as prgReadByte, readWord as prgReadWord, readVectors, validateBanks as validatePrgBanks, getBanksByType, getCodeBanks, getDataBanks, findBank } from './def/prg.ts';
export { readVromByte, readTile, readGlobalTile, readPatternTable, decodeTilePixels, validateVromBanks } from './def/chr.ts';
// nametable.ts exports
export { createNametable as createNt, createNametableManager, resolveAddr, readTile as ntReadTile, writeTile as ntWriteTile, rectFill, getAttr, clearNametable, clearAll as clearAllNt, NT_WIDTH, NT_HEIGHT, NT_TILES, NT_COUNT } from './engine/nametable.ts';
// renderer.ts exports
export { Renderer, SCREEN_W, SCREEN_H, TILE as RENDERER_TILE, NT_COLS as RENDERER_NT_COLS, VISIBLE_COLS, VISIBLE_ROWS, SHEET_COLS, VROM_TILES } from './engine/renderer.ts';
// papu.ts exports
export { createApuState, writeReg, readStatus, clockFrameCounter, setPanning, setSampleCallback, getFrameIrq, getDmcIrq, APU_REG } from './engine/papu.ts';
