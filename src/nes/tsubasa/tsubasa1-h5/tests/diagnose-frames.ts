/**
 * 无画布帧诊断脚本 — 逐帧 dump VRAM / 调色板 / OAM 数据
 *
 * 目的: 在不依赖 Canvas/微信 SDK 的环境下运行游戏逻辑，
 * 逐帧输出渲染数据，定位画面显示异常（tile 错乱、调色板缺失等）。
 *
 * 运行: npx ts-node tests/diagnose-frames.ts
 */

import { DataCache } from '../src/cache/DataCache';
import { OamCache } from '../src/cache/OamCache';
import { PpuQueue } from '../src/cache/PpuQueue';
import { BankManager } from '../src/cache/BankManager';
import { InputManager } from '../src/input/InputManager';
import { Renderer } from '../src/renderer/Renderer';
import { PpuDataFiller } from '../src/engine/NmiHandler';
import { StateMachine } from '../src/engine/StateMachine';
import { GameModel } from '../src/model/GameModel';
import { SceneComposer } from '../src/view/SceneComposer';
import {
  State00_InitTitle,
  State01_TitleLoop,
  State02_MenuSelect,
  State03_MemberSelect,
  State04_MatchMain,
  State05_MatchEvent,
} from '../src/engine/states/index';
import { NES_PALETTE, TILE_SIZE } from '../src/core/types';
import { MockPlatform, createMockCanvasContext } from './setup/MockPlatform';

// ============================================================
// 常量
// ============================================================
const FIELD_COLS = 32;
const FIELD_ROWS = 30;
const NES_PALETTE_NAMES: Record<number, string> = {
  0x00: '灰', 0x01: '深蓝', 0x02: '深蓝2', 0x03: '紫',
  0x04: '深紫', 0x05: '暗红', 0x06: '深红', 0x07: '棕',
  0x08: '深绿', 0x09: '绿', 0x0A: '绿2', 0x0B: '绿3',
  0x0C: '青', 0x0D: '黑', 0x0E: '黑', 0x0F: '黑',
  0x10: '浅灰', 0x11: '蓝', 0x12: '蓝2', 0x13: '浅紫',
  0x14: '品红', 0x15: '粉红', 0x16: '橙', 0x17: '浅棕',
  0x18: '黄褐', 0x19: '浅绿', 0x1A: '浅绿2', 0x1B: '亮绿',
  0x1C: '浅青', 0x1D: '黑', 0x1E: '黑', 0x1F: '黑',
  0x20: '白', 0x21: '天蓝', 0x22: '亮蓝', 0x23: '紫2',
  0x24: '浅品红', 0x25: '浅粉', 0x26: '浅橙', 0x27: '浅棕2',
  0x28: '黄', 0x29: '亮绿2', 0x2A: '绿4', 0x2B: '亮绿3',
  0x2C: '亮青', 0x2D: '深灰', 0x2E: '黑', 0x2F: '黑',
  0x30: '纯白', 0x31: '亮天蓝', 0x32: '浅紫2', 0x33: '浅紫3',
  0x34: '粉2', 0x35: '粉3', 0x36: '肉色', 0x37: '肤色',
  0x38: '浅黄', 0x39: '亮绿4', 0x3A: '亮绿5', 0x3B: '亮绿6',
  0x3C: '亮青2', 0x3D: '浅灰2', 0x3E: '黑', 0x3F: '黑',
};

// ============================================================
// 数字宏
// ============================================================ */
const DIAG_MAX_FRAMES = 1200; // 运行足够多帧以观察完整 5 页循环
const DUMP_NT_VERBOSE_THRESHOLD = 10; // 前 10 帧详细 dump
const SUMMARY_INTERVAL = 20; // 每 20 帧摘要输出

// ============================================================
// 工具函数
// ============================================================

function hex2(v: number): string {
  return v.toString(16).toUpperCase().padStart(2, '0');
}

function hex4(v: number): string {
  return v.toString(16).toUpperCase().padStart(4, '0');
}

function colorName(idx: number): string {
  const c = NES_PALETTE[idx] ?? 0;
  const r = (c >> 16) & 0xFF;
  const g = (c >> 8) & 0xFF;
  const b = c & 0xFF;
  const name = NES_PALETTE_NAMES[idx] ?? `0x${hex2(idx)}`;
  return `${name}(#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')})`;
}

/** 格式化非零 tile 组成的 ASCII-art 概览 */
function ntPreview(nt: Uint8Array): string {
  const lines: string[] = [];
  for (let y = 0; y < FIELD_ROWS; y++) {
    let line = `${y.toString().padStart(2)}|`;
    for (let x = 0; x < FIELD_COLS; x++) {
      const t = nt[y * FIELD_COLS + x];
      if (t === 0) {
        line += '.';
      } else if (t < 0x10) {
        line += hex2(t)[1];
      } else if (t < 0x80) {
        line += String.fromCharCode(0x41 + (t - 0x10) % 26);
      } else {
        line += '#';
      }
    }
    line += '|';
    lines.push(line);
  }
  return lines.join('\n');
}

/** 列出全零行外的非零 tile 位置 */
function ntNonZeroStats(nt: Uint8Array): { nonZeroCount: number; details: string[] } {
  let count = 0;
  const details: string[] = [];

  for (let y = 0; y < FIELD_ROWS; y++) {
    const rowTiles: { x: number; t: number }[] = [];
    for (let x = 0; x < FIELD_COLS; x++) {
      const t = nt[y * FIELD_COLS + x];
      if (t !== 0) {
        count++;
        if (rowTiles.length < 8) {
          rowTiles.push({ x, t });
        }
      }
    }
    if (rowTiles.length > 0) {
      const tileStr = rowTiles
        .map(({ x, t }) => `${x}:$${hex2(t)}`)
        .join(' ');
      const more = count > rowTiles.length && rowTiles.length >= 8 ? ' ...' : '';
      if (rowTiles.length > 0) {
        details.push(`   行${y.toString().padStart(2)}: ${tileStr}${more}`);
      }
    }
  }

  return { nonZeroCount: count, details };
}

// ============================================================
// 构建环境
// ============================================================

function buildEnv() {
  const platform = new MockPlatform();
  const ctx = createMockCanvasContext();

  const dataCache = new DataCache();
  const oamCache = new OamCache();
  const ppuQueue = new PpuQueue();
  const bankManager = new BankManager();
  const inputManager = new InputManager();
  const renderer = new Renderer(platform, ctx);
  renderer.setBankManager(bankManager);

  // 诊断模式: 禁止 Canvas 绘制
  renderer.skipCanvasDraw = true;

  const gameModel = new GameModel();
  const sceneComposer = new SceneComposer(renderer, oamCache);

  const stateMachine = new StateMachine(
    dataCache, inputManager, renderer,
    oamCache, bankManager, ppuQueue,
    gameModel,
  );

  stateMachine.registerStates([
    new State00_InitTitle(stateMachine),
    new State01_TitleLoop(stateMachine),
    new State02_MenuSelect(stateMachine),
    new State03_MemberSelect(stateMachine),
    new State04_MatchMain(stateMachine),
    new State05_MatchEvent(stateMachine),
  ]);

  const ppuFiller = new PpuDataFiller(
    dataCache, oamCache, ppuQueue,
    inputManager, renderer,
  );

  return {
    platform, dataCache, oamCache, ppuQueue,
    bankManager, inputManager, renderer,
    stateMachine, ppuFiller, gameModel, sceneComposer,
  };
}

function initGame(env: ReturnType<typeof buildEnv>): void {
  const { dataCache, bankManager, stateMachine, renderer } = env;

  // 模拟 ROM 加载: 标记 CHR 可用（即使没有真实图片，也标记为可用以便验证逻辑）
  renderer.skipCanvasDraw = true;

  bankManager.setInitialConfig();
  dataCache.ppuCtrl = 0x10;
  dataCache.ppuMask = 0x06;
  dataCache.scrollX = 0;
  dataCache.scrollY = 0;
  dataCache.bankLock = 0;
  dataCache.write(0x03CB, 0);
  dataCache.write(0x03CC, 0);
  stateMachine.transitionTo(0);
}

function executeFrame(env: ReturnType<typeof buildEnv>): void {
  env.ppuFiller.fillPpuData();
  if (env.dataCache.bankLock === 0) {
    env.stateMachine.update();
  }
  env.sceneComposer.compose(env.gameModel, env.stateMachine.getCurrentStateId());
}

// ============================================================
// Dump 函数
// ============================================================

function dumpFrame(env: ReturnType<typeof buildEnv>, frameIdx: number, verbose: boolean): void {
  const {
    dataCache, oamCache, renderer, stateMachine, bankManager,
  } = env;

  const stateId = stateMachine.getCurrentStateId();
  const subState = dataCache.read(0x03CB);
  const stepCounter = dataCache.read(0x03CC);
  const fc = dataCache.frameCount;
  const ppuCtrl = dataCache.ppuCtrl;
  const ppuMask = dataCache.ppuMask;
  const bankLock = dataCache.bankLock;

  console.log(`\n${'─'.repeat(70)}`);
  console.log(
    `📐 Frame #${frameIdx} (NES fc=$${hex2(fc)}) | ` +
    `State=${stateId} | Bank1 sub=$${hex2(subState)} step=$${hex2(stepCounter)} | ` +
    `bankLock=$${hex2(bankLock)}`
  );
  console.log(
    `   PPU: ctrl=$${hex2(ppuCtrl)} mask=$${hex2(ppuMask)} | ` +
    `scroll=(${dataCache.scrollX},${dataCache.scrollY})`
  );

  // Bank 配置
  const bk = bankManager.getConfig();
  const chrInfo = renderer.getChrBankInfo();
  console.log(
    `   Banks: PRG(${bk.prgBank0}/${bk.prgBank1}) CHR(${bk.chrBank0}=$${hex2(bk.chrBank0)}, ${bk.chrBank1}=$${hex2(bk.chrBank1)}) ` +
    `mmc=($${hex2(dataCache.mmcBankReg0)},$${hex2(dataCache.mmcBankReg1)},$${hex2(dataCache.mmcBankReg2)}) ` +
    `usingChrImg=${chrInfo.useChrImages}`
  );

  // 调色板
  const pal = renderer.getPalette();
  console.log(`   🎨 Palette:`);
  console.log(`      BG [0]: ${pal.slice(0, 4).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      BG [1]: ${pal.slice(4, 8).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      BG [2]: ${pal.slice(8, 12).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      BG [3]: ${pal.slice(12, 16).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      SPR[0]: ${pal.slice(16, 20).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      SPR[1]: ${pal.slice(20, 24).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      SPR[2]: ${pal.slice(24, 28).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);
  console.log(`      SPR[3]: ${pal.slice(28, 32).map((v, i) => `$${hex2(v)}(${colorName(v)})`).join(' ')}`);

  // 名称表 NT0
  const nt0 = renderer.getNametable(0);
  const { nonZeroCount: nz, details } = ntNonZeroStats(nt0);
  console.log(`   📋 NT0: ${nz}/960 非零 tile`);

  if (verbose && nz > 0 && nz < 200) {
    // 详细模式: 打印非零 tile 所在行列
    for (const d of details) {
      console.log(d);
    }
  } else if (nz > 0) {
    // 缩略模式: 只打印第一行和最后一行有内容的行
    const relevant = details.filter(d => !d.includes('行'));
    if (relevant.length <= 12) {
      for (const d of details) console.log(d);
    } else {
      for (const d of details.slice(0, 6)) console.log(d);
      console.log('      ... (省略中间行) ...');
      for (const d of details.slice(-6)) console.log(d);
    }
  }

  // 名称表 ASCII-art 预览 (仅前 5 帧或非零 tile 较多时)
  if (verbose || (nz > 0 && nz < 400)) {
    console.log(`   📊 NT0 预览:\n${ntPreview(nt0)}`);
  }

  // 属性表 AT0 (仅 verbose)
  if (verbose) {
    const attr0 = renderer.getAttributes(0);
    const nonZeroAttr = Array.from(attr0).filter(v => v !== 0);
    if (nonZeroAttr.length > 0) {
      console.log(`   🗺️  AT0: ${nonZeroAttr.length}/64 非零字节`);
      // 以 8x8 布局打印
      let atLine = '';
      for (let i = 0; i < 64; i++) {
        if (i % 8 === 0) atLine += '\n     ';
        atLine += `$${hex2(attr0[i])} `;
      }
      console.log(atLine);
    }
  }

  // OAM 精灵
  const sprites = oamCache.getSprites();
  const visible = sprites.filter(s => s.y < 240 && s.tileIndex !== 0);
  if (visible.length > 0) {
    console.log(`   👾 OAM: ${visible.length} 可见精灵`);
    for (const s of visible.slice(0, 6)) {
      const attr = s.attributes;
      const palIdx = attr & 0x03;
      const flipH = (attr & 0x40) ? 'H' : ' ';
      const flipV = (attr & 0x80) ? 'V' : ' ';
      const behind = (attr & 0x20) ? 'BG' : 'FG';
      console.log(
        `     (${s.x},${s.y}) tile=$${hex2(s.tileIndex)} ` +
        `pal=${palIdx} ${flipH}${flipV} ${behind}`
      );
    }
  }

  // PPU 队列
  const queuedCmds = (env.ppuQueue as any).commands;
  if (queuedCmds && queuedCmds.length > 0) {
    console.log(`   📦 PPU Queue: ${queuedCmds.length} pending commands`);
  }
}

// ============================================================
// 主函数
// ============================================================

function main(): void {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  天使之翼 H5 - 无画布帧诊断 v0.9.0                          ║
║  逐帧 dump VRAM / Palette / OAM / NT / AT                    ║
╚══════════════════════════════════════════════════════════════╝
`);

  const env = buildEnv();
  initGame(env);

  let lastSubState = -1;
  let lastStateId = -1;

  for (let frame = 1; frame <= DIAG_MAX_FRAMES; frame++) {
    executeFrame(env);

    const subState = env.dataCache.read(0x03CB);
    const stateId = env.stateMachine.getCurrentStateId();
    const verbose = frame <= DUMP_NT_VERBOSE_THRESHOLD;

    // 只 dump 前 10 帧 + 状态变更帧 + 每 20 帧的摘要
    if (verbose || subState !== lastSubState || stateId !== lastStateId || frame % SUMMARY_INTERVAL === 0) {
      dumpFrame(env, frame, verbose);
    }

    lastSubState = subState;
    lastStateId = stateId;
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`  诊断完成: ${DIAG_MAX_FRAMES} 帧已处理`);
  console.log(`  当前状态: State ${env.stateMachine.getCurrentStateId()}`);
  console.log(`  Bank1 sub-state: $${hex2(env.dataCache.read(0x03CB))}`);
  console.log(`${'='.repeat(70)}\n`);
}

main();
