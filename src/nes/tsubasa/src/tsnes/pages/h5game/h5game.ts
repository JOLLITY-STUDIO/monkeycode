/**
 * ============================================================================
 * H5 游戏页面 — 双引擎对比：CPU 模拟器 vs Bank 翻译引擎
 *
 * 左画布: CPU 模拟器 (参考)
 * 右画布: Bank 翻译引擎 (TypeScript 直译, 不经 opcode)
 *
 * PRG-ROM + CHR-ROM 全部内建于 game-engine/data/ 中，无需外部 ROM 文件。
 * ============================================================================
 */

import { createTsubasaNES } from '../../game-engine/index';
import Controller from '../../game-engine/core/controller';
import NES from '../../game-engine/core/nes';
import type { SystemState } from '../../game-engine/banks/system-state';
import { createSystemState, registerAllBanks } from '../../game-engine/banks/system-state';
import { PRG_ROM_BANKS } from '../../game-engine/data/rom-data';
import { CHR_ROM_BANKS } from '../../game-engine/data/chr-data';
import { buildRomBuffer } from '../../tsubasa-hex2asm/rom_header';
import { translate_BANK31_RESET, tick_BANK31_mainLoop } from '../../game-engine/banks/bank-31';
import { bank02_nmiHandler, bank02_ppuScrollUpdate } from '../../game-engine/banks/bank-02';

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
  _nes2: null as NES | null,  // 第二 NES（仅为 bank 引擎提供独立 PPU）
  _sys: null as SystemState | null,  // bank 翻译引擎 SystemState
  _slot: null as CanvasSlot | null,
  _slot2: null as CanvasSlot | null, // 右画布 (bank 翻译)
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
    this._nes2 = null;
    this._sys = null;
    this._slot = null;
    this._slot2 = null;
  },

  // ================================================================
  // Canvas 初始化
  // ================================================================

  _initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#h5canvas')
      .fields({ node: true, size: true })
      .select('#h5canvas2')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        const c0 = res && res[0];
        const c1 = res && res[1];
        if (!c0 || !c0.node || !c1 || !c1.node) {
          console.warn('[h5game] canvas not found, retry in 300ms');
          setTimeout(() => this._initCanvas(), 300);
          return;
        }

        const cnv0 = c0.node;
        cnv0.width = SCREEN_W;
        cnv0.height = SCREEN_H;
        this._slot = {
          canvas: cnv0,
          ctx: cnv0.getContext('2d'),
          imgData: null,
          frameBuf: null,
        };

        const cnv1 = c1.node;
        cnv1.width = SCREEN_W;
        cnv1.height = SCREEN_H;
        this._slot2 = {
          canvas: cnv1,
          ctx: cnv1.getContext('2d'),
          imgData: null,
          frameBuf: null,
        };

        console.log('[h5game] Dual canvas ready:', SCREEN_W, 'x', SCREEN_H);
        this._startEngine();
      });
  },

  // ================================================================
  // 启动引擎
  // ================================================================

  _startEngine() {
    try {
      this.setData({ status: 'loading ROM...' });

      // ── 注册所有 32 个 PRG-ROM bank (MMC3 bank 切换必需) ──
      registerAllBanks(PRG_ROM_BANKS);

      // ── 左路: CPU 模拟器 ──
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
          console.log('[h5game/cpu]', msg);
        },
        emulateSound: true,
        sampleRate: SAMPLE_RATE,
      });

      // ── 右路: Bank 翻译引擎 (独立 PPU) ──
      // 关键: 必须给 onFrame/onStatusUpdate 否则 endFrame() 里
      //   this.nes.ui.writeFrame(buffer) 调用 undefined 直接抛错
      this._nes2 = new NES({
        emulateSound: false,
        onFrame: () => { /* no-op — bank 引擎自己取 buffer 渲染 */ },
        onStatusUpdate: () => { /* no-op */ },
      });
      this._nes2.loadROM(buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS));
      this._sys = createSystemState(this._nes2.ppu, this._nes2.papu);
      // 统一内存: 让 PPU 内部的 this.nes.cpu.mem 指向 sys.mem,
      // 这样 PPU 的 $2002 status register、OAM DMA ($4014) 等
      // 全部和 bank code 共用同一个 Uint8Array, 不再各写各的。
      this._nes2.cpu.mem = this._sys.mem;
      translate_BANK31_RESET(this._sys);

      console.log('[h5game] Dual engine ready: cpu=', !!this._nes?.cpu, 'bank=', !!this._sys);
      console.log('[h5game] Bank PPU ctrl=', this._nes2.ppu.f_nmiOnVblank,
        'bgVis=', this._nes2.ppu.f_bgVisibility, 'spVis=', this._nes2.ppu.f_spVisibility);
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
    if ((!this._nes && !this._sys) || !this._started) return;

    try {
      this._applyInput();

      // ── 左路: CPU 模拟器 ──
      if (this._nes) {
        this._nes.frame();
      }

      // ── 右路: Bank 翻译引擎 ──
      if (this._sys && this._nes2) {
        // 注入手柄输入
        this._applyInputToBank();
        // 游戏逻辑 tick
        tick_BANK31_mainLoop(this._sys);
        // NMI handler + 滚屏更新
        bank02_nmiHandler(this._sys);
        bank02_ppuScrollUpdate(this._sys);
        // 推动 PPU 渲染完整一帧
        const buf = this._ppuStepFullFrame(this._nes2.ppu);
        // 渲染
        if (this._slot2) {
          this._slot2.frameBuf = buf;
          this._renderSlot2();
        }
        // 前 5 帧打印 PPU 内部状态诊断
        if (this._fpsFrameCount < 5) {
          const ppu = this._nes2.ppu;

          // 1) ptTile 取样: 检查 tile 0/64/128/192/256 的第一行像素
          const tileInfo: string[] = [];
          [0, 64, 128, 192, 256].forEach(idx => {
            const t = ppu.ptTile[idx];
            const nonZero = t ? t.pix.filter((v: number) => v !== 0).length : 0;
            tileInfo.push(`t${idx}=${nonZero}/64`);
          });

          // 2) nametable 0 前 8 tile indices (看有沒有數據)
          const nt0 = (ppu as any).nameTable[0];
          const nt0Head = nt0 ? Array.from(nt0.tile.slice(0, 8)).join(',') : 'NULL';

          // 3) palette RAM ($3F00-$3F0F)
          const palHead = Array.from(ppu.vramMem.slice(0x3F00, 0x3F00 + 8) as any as number[]).map((v: number) => v.toString(16).padStart(2, '0')).join(' ');

          // 4) imgPalette[0-3] — 最终 RGB 颜色
          const imgP = Array.from(ppu.imgPalette.slice(0, 4) as any as number[]).map((v: number) => v.toString(16)).join(' ');

          // 5) MMC3 状态
          const mmap = (this._nes2 as any).mmap;
          const cmd = mmap?.command;
          const prgMode = mmap?.prgAddressSelect;
          const chrMode = mmap?.chrAddressSelect;

          console.log('[h5game/bank] frame', this._fpsFrameCount,
            'NMI=', ppu.f_nmiOnVblank, 'bgVis=', ppu.f_bgVisibility,
            'bgPt=', ppu.f_bgPatternTable, 'scan=', ppu.scanline);
          console.log('  ptTile nonZero:', tileInfo.join(' '));
          console.log('  nt0[0-7]:', nt0Head);
          console.log('  pal $3F00:', palHead, 'imgPal:', imgP);
          console.log('  MMC3 cmd=', cmd, 'prgMode=', prgMode, 'chrMode=', chrMode);
        }
      }
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

  /** 推动独立 PPU 完整一帧, 返回 pixel buffer */
  _ppuStepFullFrame(ppu: any): Uint32Array {
    ppu.startFrame();
    try {
      // 固定跑 262 个 scanline，不能用 frameEnded 判断。
      // frameEnded 在 scanline 0 dot 1 就被 VBlank set 置位，
      // 是给 NES CPU 循环用的退出信号——bank 引擎不跑 CPU，
      // 必须靠我们手动推完所有 scanline。
      for (let scan = 0; scan < 262; scan++) {
        ppu.advanceDots(341);
        ppu.frameEnded = false;
      }
    } catch (e: any) {
      console.warn('[h5game/bank] PPU step error at scanline', ppu.scanline, ':', e.message);
    }
    ppu.frameEnded = false;
    return ppu.buffer;
  },

  /** 将触屏输入写入 bank 引擎的 sys.mem */
  _applyInputToBank() {
    if (!this._sys) return;
    const d = this._dpadState;
    const b = this._btnState;
    // 构建位掩码: bit7=Right, bit6=Left, bit5=Down, bit4=Up, bit3=Start, bit2=Select, bit1=B, bit0=A
    let mask = 0;
    if (d.up)    mask |= 0x10;
    if (d.down)  mask |= 0x20;
    if (d.left)  mask |= 0x40;
    if (d.right) mask |= 0x80;
    if (b.start) mask |= 0x08;
    if (b.select)mask |= 0x04;
    if (b.b)     mask |= 0x02;
    if (b.a)     mask |= 0x01;
    this._sys.mem[0x4016] = mask & 0xFF;
    this._sys.mem[0x4017] = mask & 0xFF;
    // 同步零页手柄变量 (bank-02 读的)
    this._sys.mem[0x1E] = mask & 0xFF;
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

  _renderSlot2() {
    const slot = this._slot2;
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
