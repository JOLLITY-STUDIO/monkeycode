/**
 * diagnose_engine.ts — 引擎诊断工具
 *
 * 可以在 Node.js 或微信小程序中调用，帮助诊断 tsubasanes 引擎状态。
 * 通过 onFrame 回调捕获每帧渲染输出，分析问题。
 */

import { Engine } from '../src/tsubasanes/engine';
import { setRomBuffer } from '../src/tsubasanes/scene/script_loader';
import { romUint8Array } from '../src/rom_data';
import { wram } from '../src/tsubasanes/core/memory';
import { NES_PALETTE } from '../src/tsubasanes/ppu/ppu';
import type { JoypadInput } from '../src/tsubasanes/scene/types';

// ═══════════════════════════════════════════════
// 诊断结果
// ═══════════════════════════════════════════════

export interface DiagResult {
  /** ROM 信息 */
  rom: {
    sizeBytes: number;
    prgPages: number;
    chrPages: number;
    hasChr: boolean;
    chrSize: number;
  };
  /** 引擎初始化 */
  init: {
    success: boolean;
    error?: string;
  };
  /** 场景信息 */
  scene: {
    id: number;
    name: string;
    state: string;
  };
  /** PPU 状态 */
  ppu: {
    ctrl: number;
    mask: number;
    scrollX: number;
    scrollY: number;
    bgEnabled: boolean;
    sprEnabled: boolean;
    chrBank0Size: number;
    chrBank1Size: number;
  };
  /** 帧运行信息 */
  frames: FrameDiag[];
  /** 总结 */
  summary: string;
}

export interface FrameDiag {
  frameNum: number;
  hasNonBlack: boolean;
  nonBlackCount: number;
  /** 前 10 个非黑像素示例 */
  samplePixels: string[];
  /** 调色板前 8 色 */
  paletteFirst8: number[];
  /** VRAM nametable 非零 tile 数 */
  vramNonZeroTiles: number;
  /** 字节码状态 */
  bytecode: {
    hasScript: boolean;
    scriptNum: number | null;
    waitFrames: number;
    status: number;
  };
  /** 场景帧计数 */
  sceneFrame: number;
  /** WRAM 关键地址 */
  wramKey: Record<string, number>;
}

// ═══════════════════════════════════════════════
// 诊断函数
// ═══════════════════════════════════════════════

/** 创建并诊断引擎 */
export function diagnoseEngine(maxFrames: number = 60): DiagResult {
  const result: DiagResult = {
    rom: { sizeBytes: 0, prgPages: 0, chrPages: 0, hasChr: false, chrSize: 0 },
    init: { success: false },
    scene: { id: -1, name: '', state: '' },
    ppu: { ctrl: 0, mask: 0, scrollX: 0, scrollY: 0, bgEnabled: false, sprEnabled: false, chrBank0Size: 0, chrBank1Size: 0 },
    frames: [],
    summary: '',
  };

  // --- ROM 诊断 ---
  try {
    const rom = romUint8Array();
    result.rom.sizeBytes = rom.length;
    result.rom.prgPages = rom[4];
    result.rom.chrPages = rom[5];
    result.rom.hasChr = rom[5] > 0;
    const chrStart = 16 + rom[4] * 16384;
    result.rom.chrSize = rom[5] * 8192;
    console.log(`[diagnose] ROM: ${rom.length} bytes, PRG=${rom[4]}*16KB, CHR=${rom[5]}*8KB`);
  } catch (e: any) {
    result.init.error = `ROM load failed: ${e.message}`;
    result.summary = 'ROM 加载失败';
    return result;
  }

  // --- 引擎初始化 ---
  setRomBuffer(romUint8Array());
  let engine: Engine;
  try {
    engine = new Engine({ autoStart: false });
    engine.reset();
    result.init.success = true;
    console.log('[diagnose] Engine initialized OK');
  } catch (e: any) {
    result.init.error = `Engine init failed: ${e.message}`;
    result.summary = `引擎初始化失败: ${e.message}`;
    return result;
  }

  // --- 场景信息 ---
  if (engine.scenes.current) {
    result.scene.id = engine.scenes.current.id;
    result.scene.name = engine.scenes.current.name;
    result.scene.state = ['INACTIVE', 'ENTERING', 'RUNNING', 'EXITING'][engine.scenes.current.state];
  }

  // --- PPU 状态 ---
  result.ppu.ctrl = engine.ppu.regs.ctrl;
  result.ppu.mask = engine.ppu.regs.mask;
  result.ppu.scrollX = engine.ppu.regs.scrollX;
  result.ppu.scrollY = engine.ppu.regs.scrollY;
  result.ppu.bgEnabled = (engine.ppu.regs.mask & 8) !== 0;
  result.ppu.sprEnabled = (engine.ppu.regs.mask & 16) !== 0;
  result.ppu.chrBank0Size = engine.ppu.chrBanks[0]?.length ?? 0;
  result.ppu.chrBank1Size = engine.ppu.chrBanks[1]?.length ?? 0;

  console.log(`[diagnose] PPU: ctrl=${result.ppu.ctrl.toString(16)}, mask=${result.ppu.mask.toString(16)}, ` +
    `chr0=${result.ppu.chrBank0Size}B, chr1=${result.ppu.chrBank1Size}B`);

  // --- 运行帧 ---
  for (let f = 0; f < maxFrames; f++) {
    engine.tick();

    const frameDiag = diagnoseFrame(engine, f);
    result.frames.push(frameDiag);

    // 每 15 帧打印一次
    if (f % 15 === 0 || (f < 5)) {
      console.log(`[diagnose] Frame ${f}: nonBlack=${frameDiag.nonBlackCount}, ` +
        `vramTiles=${frameDiag.vramNonZeroTiles}, sceneFrame=${frameDiag.sceneFrame}`);
    }
  }

  // --- 总结 ---
  const anyNonBlack = result.frames.some(f => f.nonBlackCount > 0);
  const anyVram = result.frames.some(f => f.vramNonZeroTiles > 0);
  const sceneProgress = result.frames[result.frames.length - 1]?.sceneFrame ?? 0;

  const issues: string[] = [];
  if (!anyVram) issues.push('VRAM nametable 始终为空 (无 tile 写入)');
  if (!anyNonBlack && anyVram) issues.push('VRAM 有数据但渲染全黑 (可能调色板全 0)');
  if (!anyNonBlack && !anyVram) issues.push('VRAM 和渲染输出均为空 (脚本可能未执行或写入了错误地址)');
  if (sceneProgress === 0) issues.push('场景帧计数未增长 (场景 update 可能未运行)');

  if (issues.length === 0) {
    result.summary = '引擎正常运行，渲染输出有效像素';
  } else {
    result.summary = issues.join('; ');
  }

  console.log(`[diagnose] SUMMARY: ${result.summary}`);
  return result;
}

// ═══════════════════════════════════════════════
// 单帧诊断
// ═══════════════════════════════════════════════

function diagnoseFrame(engine: Engine, frameNum: number): FrameDiag {
  const buf = engine.ppu.frameBuffer;
  const len = 256 * 240;

  let nonBlackCount = 0;
  const samples: string[] = [];
  for (let i = 0; i < len; i++) {
    if (buf[i] !== 0xFF000000) {
      nonBlackCount++;
      if (samples.length < 10) {
        samples.push(`[${i % 256},${Math.floor(i / 256)}]=0x${buf[i].toString(16)}`);
      }
    }
  }

  // 调色板
  const palFirst8: number[] = [];
  for (let i = 0; i < 8; i++) {
    palFirst8.push(engine.ppu.palette[i]);
  }

  // VRAM nametable 非零 tile 计数 (nt0: $2000-$23BF, 960 bytes of tiles)
  let vramNonZero = 0;
  const vram = engine.ppu.vram;
  for (let i = 0; i < 960; i++) {
    if (vram[i] !== 0) vramNonZero++;
  }

  // 字节码状态
  const bc = engine.bytecode;
  const bcState = bc.state;

  // 场景
  const scene = engine.scenes.current;

  // WRAM 关键地址
  const wramKey: Record<string, number> = {
    'frameCtr(0x3A)': wram[0x3A],
    'sceneId(0x26)': wram[0x26],
    'dispIdx(0x27)': wram[0x27],
    'joyHeld(0x1C)': wram[0x1C],
    'joyEdge(0x1E)': wram[0x1E],
    'nmiFlag(0x1B)': wram[0x1B],
  };

  return {
    frameNum,
    hasNonBlack: nonBlackCount > 0,
    nonBlackCount,
    samplePixels: samples,
    paletteFirst8: palFirst8,
    vramNonZeroTiles: vramNonZero,
    bytecode: {
      hasScript: bc['currentScript'] !== null,
      scriptNum: bc['currentScript']?.num ?? null,
      waitFrames: bcState.waitFrames,
      status: bcState.status,
    },
    sceneFrame: scene?.frameCount ?? 0,
    wramKey,
  };
}

// ═══════════════════════════════════════════════
// 快速诊断 (适合在页面中调用)
// ═══════════════════════════════════════════════

export interface QuickDiag {
  frameCount: number;
  sceneName: string;
  sceneFrame: number;
  nonBlackPixels: number;
  totalPixels: number;
  nonBlackPct: string;
  paletteNonZero: number[];
  vramNonZero: number;
  vramTotal: number;
  scriptName: string | null;
  scriptStatus: string;
  error?: string;
}

/** 获取引擎当前帧的快速诊断 */
export function quickDiagnose(engine: Engine): QuickDiag {
  const buf = engine.ppu.frameBuffer;
  const len = 256 * 240;
  let nonBlack = 0;
  for (let i = 0; i < len; i++) {
    if (buf[i] !== 0xFF000000) nonBlack++;
  }

  const pnz: number[] = [];
  for (let i = 0; i < 32; i++) {
    const p = engine.ppu.palette[i] & 63;
    if (p !== 0) pnz.push(p);
  }

  let vramNZ = 0;
  for (let i = 0; i < 960; i++) {
    if (engine.ppu.vram[i] !== 0) vramNZ++;
  }

  const bc = engine.bytecode;

  return {
    frameCount: engine.frameCount,
    sceneName: engine.scenes.currentName,
    sceneFrame: engine.scenes.current?.frameCount ?? 0,
    nonBlackPixels: nonBlack,
    totalPixels: len,
    nonBlackPct: ((nonBlack / len) * 100).toFixed(2) + '%',
    paletteNonZero: pnz,
    vramNonZero: vramNZ,
    vramTotal: 960,
    scriptName: bc['currentScript'] ? `script_${bc['currentScript']!.num}` : null,
    scriptStatus: `ptr=${bc.state.ptrHi.toString(16)}:${bc.state.ptrLo.toString(16)} wait=${bc.state.waitFrames} status=${bc.state.status.toString(16)}`,
  };
}
