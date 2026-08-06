/**
 * H5 游戏页面 — CPU 模拟器 (纯 tsnes-src)
 *
 * 直接使用 src/nes.ts 创建 NES 实例，加载 ROM 并渲染。
 * 不依赖 game-engine 或任何 Bank 翻译引擎。
 */

import NES from '../../src/nes';
import Controller from '../../src/controller';
import { DebugPanel } from '../../src/debug/debug-panel';
import type { DebugTab } from '../../src/debug/debug-panel';
import { NES_PRG_ROM, NES_CHR_ROM } from '../../rom-data/index';
import { makeGameSlot, renderGameSlot, type CanvasSlot } from '../../src/debug/debug-canvas';

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;
/** ScriptProcessorNode buffer size（越小延迟越低） */
const SCRIPT_BUF = 2048;

// ── NES ROM Header (MMC3, horizontal mirror) ──
const NES_HEADER = new Uint8Array([
  0x4E, 0x45, 0x53, 0x1A,   // NES␚
  0x10,                       // PRG: 16×16KB = 256KB
  0x10,                       // CHR: 16×8KB  = 128KB
  0x40,                       // mapper 4, horizontal mirror
  0x08,                       // mapper 4 high nibble
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x01,   // NTSC
]);

/** 拼接完整 .nes 文件 */
function buildROM(): Uint8Array {
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(NES_HEADER.length + prg.length + chr.length);
  rom.set(NES_HEADER, 0);
  rom.set(prg, NES_HEADER.length);
  rom.set(chr, NES_HEADER.length + prg.length);
  return rom;
}

Page({
  data: {
    status: 'initializing...',
    fps: '--',
    debugTab: '' as string,
    debugTabs: {
      '': '游戏',
      nametable: 'NT',
      patterntable: 'PT',
      sprite: '精灵',
    } as Record<string, string>,
    debugLines: '',
    ntDataText: '',
    ptDataText: '',
    sptDataText: '',
    paletteStrips: [] as any,
    debugCanvasStyle: '',
    paused: false,
    turboLevel: 0,
    showFpsBtn: false,
    sprRecording: false,
    sprRecordCount: 0,
    sprRecordDur: '',
  },

  // ── 实例 ──
  _nes: null as NES | null,
  _slot: null as CanvasSlot | null,
  _debugPanel: null as DebugPanel | null,

  // ── 音频 ──
  _audioCtx: null as any,
  _audioNode: null as any,
  _ringCap: SAMPLE_RATE << 2,          // 48000 采样 × 2 声道 ≈ 200ms
  _ring: new Float32Array(SAMPLE_RATE << 2),
  _ringR: 0,
  _ringW: 0,

  // 帧计数
  _totalFrames: 0,
  _fpsFrames: 0,
  _fpsLastTime: 0,

  // 帧循环
  _animId: -1 as any,
  _started: false,

  // ================================================================
  // 生命周期
  // ================================================================

  onLoad() {
    console.log('[h5game] onLoad');

    this._debugPanel = new DebugPanel({
      setData: (d: any) => this.setData(d),
      getData: () => this.data,
    });
  },

  onReady() {
    console.log('[h5game] onReady');
    this._initCanvas();
  },

  onUnload() {
    this._stop();
    this._debugPanel = null;
  },

  // ================================================================
  // Canvas 初始化
  // ================================================================

  _initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#h5canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const c = res?.[0];
        if (!c?.node) {
          setTimeout(() => this._initCanvas(), 300);
          return;
        }
        this._slot = makeGameSlot(c.node, SCREEN_W, SCREEN_H);
        console.log('[h5game] Canvas ready');
        this._start();
      });
  },

  // ================================================================
  // 引擎启动 & 帧循环
  // ================================================================

  _start() {
    try {
      this.setData({ status: 'loading ROM...' });

      const rom = buildROM();

      this._nes = new NES({
        emulateSound: true,
        sampleRate: SAMPLE_RATE,
        onFrame: (buffer: Uint32Array) => {
          if (this._slot) {
            this._slot.frameBuf = buffer;
            renderGameSlot(this._slot, SCREEN_W, SCREEN_H);
          }
        },
        onAudioSample: (left: number, right: number) => {
          this._onAudioSample(left, right);
        },
        onStatusUpdate: (msg: string) => {
          console.log('[nes]', msg);
        },
      });
      this._nes.loadROM(rom);

      // 第一个用户交互（或直接）启动音频
      this._startAudio();

      this._started = true;
      this.setData({ status: 'running' });
      this._frameLoop();
    } catch (e: any) {
      console.error('[h5game] start error:', e?.message, e?.stack);
      this.setData({ status: 'error: ' + (e.message || '').substring(0, 30) });
    }
  },

  _frameLoop() {
    if (!this._started || !this._nes) return;

    const data = this.data;

    if (data.paused) {
      this._animId = setTimeout(() => this._frameLoop(), 200);
      return;
    }

    try {
      // 输入已在 onBtnDown/Up 中实时写入，无需额外同步
      this._nes.frame();

      // Debug viewer
      const tab = data.debugTab as DebugTab;
      if (tab && this._debugPanel) {
        this._debugPanel.renderFrame(this._nes, null, this._totalFrames);
      }
    } catch (e: any) {
      this.setData({ status: 'crash: ' + (e.message || '').substring(0, 20) });
      return;
    }

    const turbo = [16, 8, 4][data.turboLevel || 0];
    this._animId = setTimeout(() => this._frameLoop(), turbo);

    // FPS
    this._totalFrames++;
    this._fpsFrames++;
    const now = Date.now();
    if (!this._fpsLastTime) this._fpsLastTime = now;
    if (now - this._fpsLastTime >= 1000) {
      const fps = Math.round(this._fpsFrames / ((now - this._fpsLastTime) / 1000));
      this.setData({ fps: String(fps) });
      this._fpsFrames = 0;
      this._fpsLastTime = now;
    }
  },

  _stop() {
    this._started = false;
    if (this._animId >= 0) {
      clearTimeout(this._animId);
      this._animId = -1;
    }
    this._stopAudio();
    this._nes = null;
    this._slot = null;
  },

  // ================================================================
  // Debug 标签切换
  // ================================================================

  onDebugTab(e: any) {
    const tab = (e.currentTarget.dataset.tab || '') as DebugTab;
    if (tab === 'disasm') return; // ASM tab removed（无 Bank 引擎）
    const prevTab = this.data.debugTab as DebugTab;
    this._debugPanel?.onTabSwitch(tab, prevTab);
  },

  onCopyNTData()  { this._debugPanel?.copyData('ntDataText', 'NT 数据'); },
  onCopyPTData()  { this._debugPanel?.copyData('ptDataText', 'PT 数据'); },
  onCopySPRData() { this._debugPanel?.copyData('sptDataText', 'SPR 数据'); },
  onSaveNTData()  { this._debugPanel?.saveDataToFile('ntDataText', 'nt-debug.txt', 'NT 数据'); },
  onSavePTData()  { this._debugPanel?.saveDataToFile('ptDataText', 'pt-debug.txt', 'PT 数据'); },
  onSaveSPRData() { this._debugPanel?.saveDataToFile('sptDataText', 'spr-debug.txt', 'SPR 数据'); },

  async onExportSprite() {
    await this._debugPanel?.exportSprite((d: any) => this.setData(d));
  },

  onStartRecord() {
    if (!this._debugPanel) return;
    const dur = parseFloat(this.data.sprRecordDur as string) || 0;
    this._debugPanel.startRecording(dur);
    this.setData({ sprRecording: true, sprRecordCount: 0 });
  },

  async onStopRecord() {
    if (!this._debugPanel) return;
    await this._debugPanel.stopRecording((d: any) => this.setData(d));
    this.setData({ sprRecording: false, sprRecordCount: 0 });
  },

  onRecordDurInput(e: any) {
    this.setData({ sprRecordDur: e.detail.value });
  },

  // ================================================================
  // 控制
  // ================================================================

  onPause() {
    this.setData({ paused: !this.data.paused });
  },

  onTurboToggle() {
    this.setData({ turboLevel: (this.data.turboLevel + 1) % 3 });
  },

  onFpsTap() {
    this.setData({ showFpsBtn: !this.data.showFpsBtn });
  },

  onReset() {
    this._stop();
    this._debugPanel = new DebugPanel({
      setData: (d: any) => this.setData(d),
      getData: () => this.data,
    });
    this.setData({
      status: 'restarting...',
      paused: false,
      turboLevel: 0,
      fps: '--',
    });
    setTimeout(() => this.onReady(), 100);
  },

  // ================================================================
  // 输入 — 直接操作 NES Controller
  // ================================================================

  onBtnDown(e: any) {
    const nes = this._nes;
    if (!nes) return;
    const btn = e.currentTarget.dataset.btn as string;
    const key = this._btnKey(btn);
    if (key !== null) nes.buttonDown(1, key as any);
  },

  onBtnUp(e: any) {
    const nes = this._nes;
    if (!nes) return;
    const btn = e.currentTarget.dataset.btn as string;
    const key = this._btnKey(btn);
    if (key !== null) nes.buttonUp(1, key as any);
  },

  _btnKey(btn: string): number | null {
    switch (btn) {
      case 'up':     return Controller.BUTTON_UP;
      case 'down':   return Controller.BUTTON_DOWN;
      case 'left':   return Controller.BUTTON_LEFT;
      case 'right':  return Controller.BUTTON_RIGHT;
      case 'a':      return Controller.BUTTON_A;
      case 'b':      return Controller.BUTTON_B;
      case 'start':  return Controller.BUTTON_START;
      case 'select': return Controller.BUTTON_SELECT;
      default:       return null;
    }
  },

  // ================================================================
  // 音频管线（微信 WebAudioContext + ring buffer）
  // ================================================================

  /** APU 采样 → 环形缓冲 */
  _onAudioSample(left: number, right: number): void {
    const cap = this._ringCap;
    if (cap === 0) return;
    const next = (this._ringW + 2) % cap;
    if (next === this._ringR) {
      // 缓冲满，丢掉最旧样本保持实时
      this._ringR = (this._ringR + 2) % cap;
    }
    this._ring[this._ringW] = left;
    this._ring[this._ringW + 1] = right;
    this._ringW = next;
  },

  /** 启动 WebAudioContext → ScriptProcessorNode */
  _startAudio(): void {
    if (this._audioCtx) return;
    try {
      const ctx = (wx as any).createWebAudioContext();
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 2);
      const self = this;

      node.onaudioprocess = (e: any) => {
        const outL = e.outputBuffer.getChannelData(0);
        const outR = e.outputBuffer.getChannelData(1);
        const len = outL.length;
        const cap = self._ringCap;

        let r = self._ringR;
        let w = self._ringW;

        for (let i = 0; i < len; i++) {
          if (r === w) {
            outL[i] = 0;
            outR[i] = 0;
          } else {
            outL[i] = self._ring[r];
            outR[i] = self._ring[r + 1];
            r = (r + 2) % cap;
          }
        }
        self._ringR = r;
      };

      node.connect(ctx.destination);
      this._audioCtx = ctx;
      this._audioNode = node;
      console.log('[h5game] audio started via WebAudioContext');
    } catch (e: any) {
      console.warn('[h5game] WebAudioContext unavailable:', e.message);
    }
  },

  /** 停止音频 */
  _stopAudio(): void {
    if (this._audioNode) {
      try {
        this._audioNode.disconnect();
        this._audioNode.onaudioprocess = null;
      } catch (_) { /* ignore */ }
      this._audioNode = null;
    }
    this._audioCtx = null;
    this._ring = new Float32Array(SAMPLE_RATE << 2);
    this._ringR = 0;
    this._ringW = 0;
  },
});
