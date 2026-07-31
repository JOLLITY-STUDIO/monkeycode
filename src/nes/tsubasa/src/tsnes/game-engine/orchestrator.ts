/**
 * 双引擎协调器 — 从 h5game.ts 抽离
 *
 * 职责：
 * - CPU 模拟器 + Bank 翻译引擎的初始化与生命周期
 * - 帧循环 (支持暂停/加速)
 * - 游戏 canvas 渲染 (slot0 / slot1)
 * - 音频、输入管理
 * - PPU 诊断日志 (debug)
 *
 * Debug viewer 渲染委托给 DebugPanel。
 */

import CPUNES from '../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';
import { createTsubasaNES } from './index';
import { tick_BANK31_mainLoop } from './native-game/tsubasa/banks/prg/bank-31-code';
import { bank02_nmiHandler, bank02_ppuScrollUpdate } from './native-game/tsubasa/banks/prg/bank-02-code';
import { AudioManager } from './audio-manager';
import { InputBridge } from './input-bridge';
import { CanvasSlot, makeGameSlot, renderGameSlot } from '../src/debug/debug-canvas';
import type { DebugPanel, DebugTab } from '../src/debug/debug-panel';

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;

export interface OrchestratorCallbacks {
  setData(data: Record<string, any>): void;
  getData(): Record<string, any>;
}

export class GameOrchestrator {
  // ── 引擎实例 ──
  private _nes: any | null = null;   // CPU 模拟器
  private _nes2: any | null = null;  // Bank 引擎
  private _sys: any | null = null;   // Bank 引擎内部系统

  // ── Canvas ──
  private _slot0: CanvasSlot | null = null;  // CPU 模拟器画面
  private _slot1: CanvasSlot | null = null;  // Bank 引擎画面

  // ── 子模块 ──
  readonly input = new InputBridge();
  readonly audio = new AudioManager();
  debugPanel?: DebugPanel;

  // ── 状态 ──
  private _started = false;
  private _animId: any = -1;
  private _fpsFrameCount = 0;
  private _fpsLastTime = 0;

  // PPU 诊断
  private _ppuStateChecked = false;
  private _ppuFramesLogged = 0;
  private _ppuDeepChecked = false;

  constructor(private callbacks: OrchestratorCallbacks) {
    this.audio.init();
  }

  // ════════════════════════════════════════════════════════
  // Canvas 初始化
  // ════════════════════════════════════════════════════════

  initCanvas(cnv0: any, cnv1: any): void {
    this._slot0 = makeGameSlot(cnv0, SCREEN_W, SCREEN_H);
    this._slot1 = makeGameSlot(cnv1, SCREEN_W, SCREEN_H);
  }

  // ════════════════════════════════════════════════════════
  // 引擎启动
  // ════════════════════════════════════════════════════════

  start(): void {
    try {
      this.callbacks.setData({ status: 'loading ROM...' });

      const header = new Uint8Array([0x4E, 0x45, 0x53, 0x1A, 16, 16, 0x40, 0x08, 0,0,0,0,0,0,0,1]);
      const prg = new Uint8Array(NES_PRG_ROM);
      const chr = new Uint8Array(NES_CHR_ROM);
      const rom = new Uint8Array(header.length + prg.length + chr.length);
      rom.set(header);
      rom.set(prg, header.length);
      rom.set(chr, header.length + prg.length);

      const self = this;

      // 左路: CPU 模拟器
      this._nes = new CPUNES({
        emulateSound: true,
        sampleRate: SAMPLE_RATE,
        onFrame: (buffer: Uint32Array) => {
          if (self._slot0) self._slot0.frameBuf = buffer;
          renderGameSlot(self._slot0, SCREEN_W, SCREEN_H);
        },
        onAudioSample: (left: number, right: number) => {
          self.audio.pushSample(left, right);
        },
        onStatusUpdate: (msg: string) => {
          console.log('[orchestrator/cpu]', msg);
        },
      });
      this._nes.loadROM(rom);

      // 右路: Bank 翻译引擎
      this._nes2 = createTsubasaNES({
        emulateSound: false,
        onFrame: () => {},
        onStatusUpdate: () => {},
      });
      this._sys = (this._nes2 as any).__tsSys;

      this.callbacks.setData({ status: 'running' });
      this._started = true;

      this.audio.start();
      this._frameLoop();
    } catch (e: any) {
      this.callbacks.setData({ status: 'error: ' + (e.message || '').substring(0, 30) });
    }
  }

  // ════════════════════════════════════════════════════════
  // 帧循环
  // ════════════════════════════════════════════════════════

  private _frameLoop(): void {
    if ((!this._nes && !this._sys) || !this._started) return;

    const data = this.callbacks.getData();
    const paused = data.paused as boolean;

    // 暂停时不跑模拟，但让 debug viewer 仍能渲染当前帧
    if (paused) {
      const tab = data.debugTab as DebugTab;
      if (tab && tab !== 'disasm' && this.debugPanel) {
        try { this.debugPanel.renderFrame(this._nes, this._sys, this._fpsFrameCount); } catch (_) {}
      }
      this._animId = setTimeout(() => this._frameLoop(), 200);
      return;
    }

    try {
      this.input.applyToCPU(this._nes);

      if (this._nes) {
        this._nes.frame();
      }

      if (this._sys && this._nes2) {
        this._stepBankEngine();
      }

      // Debug viewer
      const tab = data.debugTab as DebugTab;
      if (tab && this.debugPanel) {
        this.debugPanel.renderFrame(this._nes, this._sys, this._fpsFrameCount);
      }
    } catch (e: any) {
      this.callbacks.setData({ status: 'crash: ' + (e.message || '').substring(0, 20) });
      return;
    }

    const turboLevel = (data.turboLevel || 0) as number;
    this._animId = setTimeout(() => this._frameLoop(), [16, 8, 4][turboLevel]);

    // FPS 统计
    this._fpsFrameCount++;
    const now = Date.now();
    if (!this._fpsLastTime) this._fpsLastTime = now;
    const elapsed = now - this._fpsLastTime;
    if (elapsed >= 1000) {
      const fps = Math.round(this._fpsFrameCount / (elapsed / 1000));
      this.callbacks.setData({ fps: String(fps) });
      this._fpsFrameCount = 0;
      this._fpsLastTime = now;
    }
  }

  /**
   * Bank 引擎一帧的推进: mainLoop + NMI + PPU 滚动 + PPU 渲染
   */
  private _stepBankEngine(): void {
    if (!this._ppuStateChecked) {
      this._ppuStateChecked = true;
      const ppu = this._nes2.ppu;
      console.warn(`[ppu-diag] state: f_bgVis=${ppu.f_bgVisibility}, f_spVis=${ppu.f_spVisibility}, scanline=${ppu.scanline}, curX=${ppu.curX}, vblankFlag=${ppu.vblankFlag}, dispType=${ppu.f_dispType}`);
    }

    this.input.applyToBank(this._sys);
    tick_BANK31_mainLoop(this._sys);
    bank02_nmiHandler(this._sys);
    bank02_ppuScrollUpdate(this._sys);

    const ppu = this._nes2.ppu;
    const buf = this._ppuStepFullFrame(ppu);

    this._logPPUDiag(buf, ppu);

    if (this._slot1) {
      this._slot1.frameBuf = buf;
      renderGameSlot(this._slot1, SCREEN_W, SCREEN_H);
    }
  }

  private _ppuStepFullFrame(ppu: any): Uint32Array {
    ppu.startFrame();
    try {
      let safety = 0;
      while (!ppu.frameEnded && safety < 1000) {
        ppu.advanceDots(341);
        safety++;
      }
    } catch (_) { /* ignore partial frame errors */ }
    ppu.frameEnded = false;
    return ppu.buffer;
  }

  /** PPU 诊断日志 (仅前 3 帧) */
  private _logPPUDiag(buf: Uint32Array, ppu: any): void {
    if (this._ppuFramesLogged < 3) {
      console.warn(`[ppu-diag] title-mode? $0700=0x${this._sys.mem[0x0700]?.toString(16)}, $0628=0x${this._sys.mem[0x0628]?.toString(16)}, $062A=0x${this._sys.mem[0x062A]?.toString(16)}`);
      this._ppuFramesLogged++;
      let nonZero = 0;
      for (let i = 0; i < buf.length; i++) { if (buf[i] !== 0) nonZero++; }
      console.warn(`[ppu-diag] frame#${this._ppuFramesLogged} buf: len=${buf.length}, nonZero=${nonZero}, buf[0]=0x${buf[0]?.toString(16)}, vblankFlag=${ppu.vblankFlag}, scanline=${ppu.scanline}`);
    }
    if (this._ppuFramesLogged === 3 && !this._ppuDeepChecked) {
      this._ppuDeepChecked = true;
      const pal: number[] = [];
      for (let i = 0; i < 16; i++) pal.push(ppu.imgPalette[i]);
      console.warn(`[ppu-diag] palette[0..15]: [${pal.map(v=>'0x'+v.toString(16)).join(', ')}]`);
      const nt: number[] = [];
      for (let i = 0; i < 32; i++) nt.push(ppu.vramMem[0x2000 + i] ?? -1);
      console.warn(`[ppu-diag] nametable[0x2000..0x201F]: [${nt.map(v=>'0x'+v.toString(16)).join(', ')}]`);
      const tiles: string[] = [];
      for (let t = 0; t < 4; t++) {
        const tile = ppu.ptTile[t];
        if (!tile) { tiles.push('null'); continue; }
        let row = '';
        for (let p = 0; p < 8; p++) row += tile.pix[p]?.toString(16) || '?';
        tiles.push('[' + row + ']');
      }
      console.warn(`[ppu-diag] ptTile[0..3] scanline0 pix: ${tiles.join(' | ')}`);
      const oam: number[] = [];
      for (let i = 0; i < 8; i++) oam.push(this._sys.mem[0x0000 + i] ?? -1);
      console.warn(`[ppu-diag] ZP $00..$07: [${oam.map(v=>'0x'+v.toString(16)).join(', ')}]`);
      console.warn(`[ppu-diag] reg $2000=0x${this._sys.mem[0x2000]?.toString(16)}, $2001=0x${this._sys.mem[0x2001]?.toString(16)}`);
    }
  }

  // ════════════════════════════════════════════════════════
  // 生命周期
  // ════════════════════════════════════════════════════════

  stop(): void {
    this._started = false;
    if (this._animId >= 0) {
      clearTimeout(this._animId);
      this._animId = -1;
    }
    this.audio.stop();
  }

  /** 获取 CPU 模拟器实例 (供 debug viewer 使用) */
  get cpuNES(): any | null { return this._nes; }

  /** 获取 Bank 引擎系统 (供反汇编等) */
  get bankSys(): any | null { return this._sys; }
}
