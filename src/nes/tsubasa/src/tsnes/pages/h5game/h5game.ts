/**
 * ============================================================================
 * H5 游戏页面 — 使用 game-engine 的 createTsubasaNES 驱动游戏
 *
 * PRG-ROM + CHR-ROM 全部内建于 game-engine/data/ 中，无需外部 ROM 文件。
 * ============================================================================
 */

import { createTsubasaNES } from '../../game-engine/index';
import Controller from '../../game-engine/core/controller';
import type NES from '../../game-engine/core/nes';

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;
const SCRIPT_BUF = 2048;

// ── Canvas Slot ──────────────────────────────────────────
interface CanvasSlot {
  canvas: any;
  ctx: any;
  imgData: any;
  frameBuf: Uint32Array | null;
}

// ── 页面 ─────────────────────────────────────────────────
Page({
  data: {
    status: 'initializing...',
    fps: '--',
  },

  _nes: null as NES | null,
  _slot: null as CanvasSlot | null,
  _animId: -1 as number,
  _started: false,

  // ── Audio ──────────────────────────────────────────────
  _ring: null as Float32Array | null,
  _ringCap: SAMPLE_RATE * 4,
  _ringW: 0,
  _ringR: 0,
  _audioCtx: null as any,
  _audioNode: null as any,

  // ── 输入 ──────────────────────────────────────────────
  _dpadState: { up: false, down: false, left: false, right: false },
  _btnState: { a: false, b: false, start: false, select: false },

  // ── FPS ────────────────────────────────────────────────
  _fpsFrameCount: 0,
  _fpsLastTime: 0,

  // ================================================================
  // 生命周期
  // ================================================================

  onLoad() {
    console.log('[h5game] onLoad');
    this._ring = new Float32Array(this._ringCap);
  },

  onReady() {
    console.log('[h5game] onReady');
    this._initCanvas();
  },

  onUnload() {
    console.log('[h5game] onUnload');
    this._stopLoop();
    this._stopAudio();
    this._nes = null;
    this._slot = null;
  },

  // ================================================================
  // Canvas 初始化
  // ================================================================

  _initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#h5canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn('[h5game] canvas not found, retry in 300ms');
          setTimeout(() => this._initCanvas(), 300);
          return;
        }

        const cnv = res[0].node;
        cnv.width = SCREEN_W;
        cnv.height = SCREEN_H;

        this._slot = {
          canvas: cnv,
          ctx: cnv.getContext('2d'),
          imgData: null,
          frameBuf: null,
        };

        console.log('[h5game] Canvas ready:', SCREEN_W, 'x', SCREEN_H,
          '| display:', res[0].width, 'x', res[0].height);
        this._startEngine();
      });
  },

  // ================================================================
  // 启动引擎
  // ================================================================

  _startEngine() {
    try {
      this.setData({ status: 'loading ROM...' });

      const self = this;
      this._nes = createTsubasaNES({
        onFrame: (buffer: Uint32Array) => {
          if (self._slot) self._slot.frameBuf = buffer;
          self._renderSlot();
        },
        onAudioSample: (left: number, right: number) => {
          self._onAudioSample(left, right);
        },
        onStatusUpdate: (msg: string) => {
          console.log('[h5game/nes]', msg);
          self.setData({ status: msg });
        },
        emulateSound: true,
        sampleRate: SAMPLE_RATE,
      });

      console.log('[h5game] NES created: cpu=', !!this._nes.cpu, 'ppu=', !!this._nes.ppu, 'rom=', !!this._nes.rom);
      this.setData({ status: 'running' });
      this._started = true;

      this._startAudio();
      this._frameLoop();

    } catch (e: any) {
      const msg = e.message || String(e);
      console.error('[h5game] Engine start failed:', msg, e.stack);
      this.setData({ status: 'error: ' + msg.substring(0, 30) });
    }
  },

  // ================================================================
  // 帧循环 (递归 setTimeout)
  // ================================================================

  _frameLoop() {
    if (!this._nes || !this._started) return;

    try {
      this._applyInput();
      this._nes.frame();
    } catch (e: any) {
      console.error('[h5game] frame error:', e);
      this.setData({ status: 'crash: ' + (e.message || '').substring(0, 20) });
      return;
    }

    this._animId = setTimeout(() => this._frameLoop(), 16) as any;

    // FPS 统计
    this._fpsFrameCount++;
    const now = Date.now();
    if (!this._fpsLastTime) this._fpsLastTime = now;
    const elapsed = now - this._fpsLastTime;
    if (elapsed >= 1000) {
      const fps = Math.round(this._fpsFrameCount / (elapsed / 1000));
      this.setData({ fps: String(fps) });
      this._fpsFrameCount = 0;
      this._fpsLastTime = now;
    }
  },

  _stopLoop() {
    this._started = false;
    if (this._animId >= 0) {
      clearTimeout(this._animId);
      this._animId = -1;
    }
  },

  // ================================================================
  // 渲染
  // ================================================================

  _renderSlot() {
    const slot = this._slot;
    if (!slot || !slot.frameBuf || !slot.ctx) return;

    const ctx = slot.ctx;
    if (!slot.imgData) {
      slot.imgData = ctx.createImageData(SCREEN_W, SCREEN_H);
    }

    const data = slot.imgData.data;
    const src = slot.frameBuf;
    for (let i = 0, j = 0; i < src.length; i++, j += 4) {
      const p = src[i];
      data[j]     = p & 0xff;
      data[j + 1] = (p >> 8) & 0xff;
      data[j + 2] = (p >> 16) & 0xff;
      data[j + 3] = 0xff;
    }
    ctx.putImageData(slot.imgData, 0, 0);
  },

  // ================================================================
  // 输入
  // ================================================================

  _applyInput() {
    if (!this._nes) return;
    const d = this._dpadState;
    const b = this._btnState;
    const nes = this._nes;

    const doBtn = (key: number, pressed: boolean) => {
      if (pressed) nes.buttonDown(1, key as any);
      else nes.buttonUp(1, key as any);
    };

    doBtn(Controller.BUTTON_UP, d.up);
    doBtn(Controller.BUTTON_DOWN, d.down);
    doBtn(Controller.BUTTON_LEFT, d.left);
    doBtn(Controller.BUTTON_RIGHT, d.right);
    doBtn(Controller.BUTTON_A, b.a);
    doBtn(Controller.BUTTON_B, b.b);
    doBtn(Controller.BUTTON_START, b.start);
    doBtn(Controller.BUTTON_SELECT, b.select);
  },

  onBtnDown(e: any) {
    const btn = e.currentTarget.dataset.btn as string;
    if (btn === 'up' || btn === 'down' || btn === 'left' || btn === 'right') {
      (this._dpadState as any)[btn] = true;
    } else {
      (this._btnState as any)[btn] = true;
    }
  },

  onBtnUp(e: any) {
    const btn = e.currentTarget.dataset.btn as string;
    if (btn === 'up' || btn === 'down' || btn === 'left' || btn === 'right') {
      (this._dpadState as any)[btn] = false;
    } else {
      (this._btnState as any)[btn] = false;
    }
  },

  // ================================================================
  // 音频
  // ================================================================

  _onAudioSample(left: number, right: number) {
    const ring = this._ring;
    if (!ring) return;
    const cap = this._ringCap;
    const next = (this._ringW + 2) % cap;
    if (next === this._ringR) this._ringR = (this._ringR + 2) % cap;
    ring[this._ringW] = left;
    ring[this._ringW + 1] = right;
    this._ringW = next;
  },

  _startAudio() {
    if (this._audioCtx) return;
    try {
      const ctx = wx.createWebAudioContext();
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 2);
      const self = this;
      node.onaudioprocess = (e: any) => {
        const ring = self._ring;
        if (!ring) return;
        const outL = e.outputBuffer.getChannelData(0);
        const outR = e.outputBuffer.getChannelData(1);
        const len = outL.length;
        const cap = self._ringCap;
        let r = self._ringR;
        const w = self._ringW;
        for (let i = 0; i < len; i++) {
          if (r === w) {
            outL[i] = 0; outR[i] = 0;
          } else {
            outL[i] = ring[r];
            outR[i] = ring[r + 1];
            r = (r + 2) % cap;
          }
        }
        self._ringR = r;
      };
      node.connect(ctx.destination);
      this._audioCtx = ctx;
      this._audioNode = node;
      console.log('[h5game] Audio started');
    } catch (e: any) {
      console.warn('[h5game] Audio unavailable:', e.message);
    }
  },

  _stopAudio() {
    if (this._audioNode) {
      try { this._audioNode.disconnect(); this._audioNode.onaudioprocess = null; } catch (_) {}
      this._audioNode = null;
    }
    if (this._audioCtx) {
      try { this._audioCtx.close(); } catch (_) {}
      this._audioCtx = null;
    }
    this._ringW = 0;
    this._ringR = 0;
  },
});
