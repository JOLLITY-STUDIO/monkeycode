/**
 * ============================================================================
 * H5 游戏页面 — 双引擎对比：CPU 模拟器 vs Bank 翻译引擎
 *
 * canvas0: CPU 模拟器 (参考)
 * canvas1: Bank 翻译引擎 (TypeScript 直译)
 *
 * Debug viewer: NT / PT / SPR / PAL / Disasm
 * 所有图形 viewer 使用 CPU 模拟器 PPU（数据准确），ASM 使用 Bank 引擎内存
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
import {
  renderAllNameTables,
  renderBothPatternTables,
  renderPatternTable,
  getSpriteData,
  renderPaletteImage,
  disassembleRange,
} from '../../src/debug/index';

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;
const SCRIPT_BUF = 2048;

// ── 精灵网格常量 ──
const SPR_CELL_W = 32;            // 每个精灵单元格宽 (像素)
const SPR_CELL_H = 32;            // 每个精灵单元格高 (像素)
const SPR_COLS = 8;
const SPR_ROWS = 8;

/**
 * 输出 4 个 nametable 的原始 tile index 和 palette 数据（可复制 hex 格式）
 */
function generateNTDataText(nes: any): string {
  const ppu = nes.ppu;
  const lines: string[] = [];
  const COL_HEADER = 'Row ';

  for (let ni = 0; ni < 4; ni++) {
    const nt = ppu.nameTable[ni];
    const addr = 0x2000 + ni * 0x400;
    const hexAddr = addr.toString(16).toUpperCase().padStart(4, '0');

    lines.push(`════ NT ${ni} (PPU 0x${hexAddr}) — Tile Indices ════`);
    // 列头
    let header = COL_HEADER;
    for (let tx = 0; tx < 32; tx++) {
      header += tx.toString(16).toUpperCase().padStart(3, ' ');
    }
    lines.push(header);

    for (let ty = 0; ty < 30; ty++) {
      const row: string[] = [];
      for (let tx = 0; tx < 32; tx++) {
        const tileIdx = nt.tile[ty * 32 + tx];
        row.push(tileIdx.toString(16).toUpperCase().padStart(2, '0'));
      }
      lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(' '));
    }

    lines.push('');
    lines.push(`── Palette groups (0-3) ──`);
    let pHdr = COL_HEADER;
    for (let tx = 0; tx < 32; tx++) {
      pHdr += ' ' + (tx % 10).toString();
    }
    lines.push(pHdr);

    for (let ty = 0; ty < 30; ty++) {
      const row: string[] = [];
      for (let tx = 0; tx < 32; tx++) {
        const attr = nt.attrib[ty * 32 + tx];
        row.push((attr >> 2).toString()); // 0-3
      }
      lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(''));
    }

    lines.push('');
    lines.push('');
  }

  return lines.join('\n');
}

interface CanvasSlot {
  canvas: any;
  ctx: any;
  imgData: any;
  frameBuf: Uint32Array | null;
}

Page({
  data: {
    status: 'initializing...',
    fps: '--',
    debugTab: '',        // '' | 'nametable' | 'patterntable' | 'sprite' | 'palette' | 'disasm'
    debugTabs: {
      '': '游戏',
      nametable: 'NT',
      patterntable: 'PT',
      sprite: '精灵',
      palette: '调色板',
      disasm: '汇编',
    } as Record<string, string>,
    debugLines: '',       // disasm 文本
    ntDataText: '',       // NT tile index + palette 文本
    paused: false,        // 暂停状态
    turboLevel: 0,        // 加速档位 0=1x, 1=2x, 2=4x
    showFpsBtn: false,    // FPS 按钮显示值
  },

  _nes: null as NES | null,
  _nes2: null as NES | null,
  _sys: null as SystemState | null,
  _slot: null as CanvasSlot | null,
  _slot2: null as CanvasSlot | null,
  _animId: -1 as number,
  _started: false,

  // ── Debug viewer ───────────────────────────────────────
  _debugCanvas: null as any,
  _debugCtx: null as any,
  _debugImgData: null as any,
  _debugQuerying: false,

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
  onLoad() {
    console.log('[h5game] onLoad');
    this._ring = new Float32Array(this._ringCap);
  },

  onReady() {
    console.log('[h5game] onReady');
    this._initCanvas();
  },

  onUnload() {
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
  _startEngine() {
    try {
      this.setData({ status: 'loading ROM...' });
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
      this._nes2 = new NES({
        emulateSound: false,
        onFrame: () => {},
        onStatusUpdate: () => {},
      });
      this._nes2.loadROM(buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS));
      this._sys = createSystemState(this._nes2.ppu, this._nes2.papu);
      this._nes2.cpu.mem = this._sys.mem;
      translate_BANK31_RESET(this._sys);

      this.setData({ status: 'running' });
      this._started = true;

      this._startAudio();
      this._frameLoop();
    } catch (e: any) {
      this.setData({ status: 'error: ' + (e.message || '').substring(0, 30) });
    }
  },

  // ================================================================
  _frameLoop() {
    if ((!this._nes && !this._sys) || !this._started) return;

    // 暂停时不跑模拟，但保持 loop 继续以便 debug viewer 仍然能渲染当前帧
    if ((this.data as any).paused) {
      // 暂停时仍跑 debug viewer（用当前冻结的 PPU 数据）
      const tab = (this.data as any).debugTab as string;
      if (tab && tab !== 'disasm') {
        try { this._renderDebugView(); } catch (_) {}
      }
      this._animId = setTimeout(() => this._frameLoop(), 200) as any;  // 暂停时低频轮询
      return;
    }

    try {
      this._applyInput();

      if (this._nes) {
        this._nes.frame();
      }

      if (this._sys && this._nes2) {
        this._applyInputToBank();
        tick_BANK31_mainLoop(this._sys);
        bank02_nmiHandler(this._sys);
        bank02_ppuScrollUpdate(this._sys);
        const buf = this._ppuStepFullFrame(this._nes2.ppu);
        if (this._slot2) {
          this._slot2.frameBuf = buf;
          this._renderSlot2();
        }
        // Debug 查看器
        const tab = (this.data as any).debugTab as string;
        if (tab) {
          if (tab === 'disasm') {
            if (this._fpsFrameCount % 30 === 0) this._renderDisasmDebug();
          } else {
            this._renderDebugView();
          }
        }
      }
    } catch (e: any) {
      this.setData({ status: 'crash: ' + (e.message || '').substring(0, 20) });
      return;
    }

    this._animId = setTimeout(() => this._frameLoop(), [16, 8, 4][(this.data as any).turboLevel]) as any;

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

  _ppuStepFullFrame(ppu: any): Uint32Array {
    ppu.startFrame();
    try {
      for (let scan = 0; scan < 262; scan++) {
        ppu.advanceDots(341);
        ppu.frameEnded = false;
      }
    } catch (e: any) {
      // ignore partial frame errors
    }
    ppu.frameEnded = false;
    return ppu.buffer;
  },

  _applyInputToBank() {
    if (!this._sys) return;
    const d = this._dpadState;
    const b = this._btnState;
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
  // 渲染游戏画面
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
  // Debug 查看器
  // ================================================================

  onDebugTab(e: any) {
    const tab = e.currentTarget.dataset.tab || '';
    this.setData({ debugTab: tab, debugLines: '', ntDataText: '' });
    if (tab === '' || tab !== 'disasm') {
      this._debugCtx = null;
      this._debugCanvas = null;
      this._debugImgData = null;
      this._debugQuerying = false;
    }
  },

  _initDebugCanvas() {
    if (this._debugCtx) return;
    if (this._debugQuerying) return;
    this._debugQuerying = true;
    const query = wx.createSelectorQuery();
    query.select('#debugCanvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        this._debugQuerying = false;
        const c = res && res[0];
        if (c && c.node) {
          this._debugCanvas = c.node;
          this._debugCtx = c.node.getContext('2d');
          this._debugImgData = null;
        }
      });
  },

  /**
   * 将源缓冲区 (w×h) 1:1 绘制到 canvas（像素尺寸 = w×h）
   * CSS 通过 image-rendering: pixelated + max-width/max-height 自动放大撑满面板
   */
  _blitToDebugCanvas(buf: Uint32Array, w: number, h: number) {
    const ctx = this._debugCtx;
    const canvas = this._debugCanvas;
    if (!ctx || !canvas) return;

    canvas.width = w;
    canvas.height = h;

    const imgData = ctx.createImageData(w, h);
    const pix = imgData.data;
    for (let i = 0, j = 0; i < buf.length; i++, j += 4) {
      const color = buf[i];
      pix[j]     = color & 0xff;
      pix[j + 1] = (color >> 8) & 0xff;
      pix[j + 2] = (color >> 16) & 0xff;
      pix[j + 3] = 0xff;
    }
    ctx.putImageData(imgData, 0, 0);
  },

  /** 主 debug 渲染入口 */
  _renderDebugView() {
    const tab = (this.data as any).debugTab as string;
    if (!tab || tab === 'disasm' || tab === '') return;

    if (!this._debugCtx) {
      this._initDebugCanvas();
      return;
    }

    // 图形 viewer 全部使用 CPU 模拟器 PPU（数据准确、调色板正确）
    const nes = this._nes as any;
    if (!nes) return;

    try {
      switch (tab) {
        case 'nametable':    this._renderNTDebug(nes); break;
        case 'patterntable': this._renderPTDebug(nes); break;
        case 'sprite':       this._renderSpriteDebug(nes); break;
        case 'palette':      this._renderPalDebug(nes); break;
      }
    } catch (e: any) {
      console.warn('[debug] render error:', e.message);
    }
  },

  // ── NT: 4 个 nametable 2×2 网格 + 原始 tile index / palette 数据文字 ──
  _renderNTDebug(nes: any) {
    const { nt } = renderAllNameTables(nes);
    const CW = 512, CH = 480;
    const bg = 0xff_0d0d22;
    const buf = new Uint32Array(CW * CH);
    buf.fill(bg);

    for (let ni = 0; ni < 4; ni++) {
      if (!nt[ni]) continue;
      const src = nt[ni].data;
      const ox = (ni % 2) * 256;
      const oy = Math.floor(ni / 2) * 240;
      for (let y = 0; y < 240; y++) {
        let di = (oy + y) * CW + ox;
        let si = y * 256;
        for (let x = 0; x < 256; x++) {
          buf[di++] = src[si++];
        }
      }
    }
    this._blitToDebugCanvas(buf, CW, CH);

    // 每 1 秒更新一次文字数据（避免每帧 setData）
    if (this._fpsFrameCount % 60 === 0) {
      const text = generateNTDataText(nes);
      this.setData({ ntDataText: text });
    }
  },

  // ── PT: 两个 pattern table 上下排列 (各 128×128, 中间 8px 分隔) ──
  // table0 用 imgPalette (BG), table1 用 sprPalette (精灵), 方便识别各自用途
  _renderPTDebug(nes: any) {
    const ppu = nes.ppu;
    const { bgTable, spTable } = renderBothPatternTables(nes);
    
    // FCEUX 风格: 两个表都渲染，但可以传自定义 palette
    // table0 ($0000) 是 BG table 时用 imgPalette，是 SP table 时用 sprPalette
    // table1 ($1000) 同理反向
    const pal0 = bgTable === 0 ? ppu.imgPalette : ppu.sprPalette;
    const pal1 = spTable === 1 ? ppu.sprPalette : ppu.imgPalette;
    
    const result = renderBothPatternTables(nes, 0, pal0, pal1);
    const table0 = result.table0;
    const table1 = result.table1;
    
    const CELL = 128;
    const GAP = 8;
    const CW = CELL;               // 128
    const CH = CELL * 2 + GAP;     // 264
    const buf = new Uint32Array(CW * CH);
    const bg = 0xff_0d0d22;
    buf.fill(bg);

    const copyTable = (src: Uint32Array, oy: number) => {
      for (let y = 0; y < CELL; y++) {
        let di = (oy + y) * CW;
        let si = y * CELL;
        for (let x = 0; x < CELL; x++) {
          buf[di++] = src[si++];
        }
      }
    };

    if (table0 && table0.data) copyTable(table0.data, 0);
    if (table1 && table1.data) copyTable(table1.data, CELL + GAP);

    this._blitToDebugCanvas(buf, CW, CH);
  },

  // ── SPR: FCEUX 风格 — 左: 64 精灵 tile 集合 / 右: 按真实位置拼合的 Preview ──
  _renderSpriteDebug(nes: any) {
    const ppu = nes.ppu;
    const { sprites } = getSpriteData(nes);

    // 左栏：64 精灵 tile 网格 (8×8, 256×256)
    const gridCols = SPR_COLS, gridRows = SPR_ROWS;
    const cellW = SPR_CELL_W, cellH = SPR_CELL_H;
    const gridW = gridCols * cellW;    // 256
    const gridH = gridRows * cellH;    // 256

    // 右栏：Preview (真实屏幕尺寸 256×240)
    const previewW = SCREEN_W;   // 256
    const previewH = SCREEN_H;   // 240

    const GAP = 16;
    const totalW = gridW + GAP + previewW;       // 528
    const totalH = Math.max(gridH, previewH);    // 256
    const buf = new Uint32Array(totalW * totalH);
    buf.fill(0xff_0d0d22);

    // ── 左侧：OAM 精灵 tile 集合 (按 OAM 索引 0~63 排列) ──
    for (let i = 0; i < Math.min(sprites.length, gridCols * gridRows); i++) {
      const spr = sprites[i];
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const bx = col * cellW;
      const by = row * cellH;
      const iw2 = spr.imgWidth;
      const ih2 = spr.imgHeight;

      // 居中缩放
      const scale = Math.min(Math.floor(cellW / iw2), Math.floor(cellH / ih2));
      const offsetX = Math.floor((cellW - iw2 * scale) / 2);
      const offsetY = Math.floor((cellH - ih2 * scale) / 2);

      for (let py = 0; py < ih2; py++) {
        for (let px = 0; px < iw2; px++) {
          const c = spr.image[py * iw2 + px];
          for (let sy = 0; sy < scale; sy++) {
            const dy = by + offsetY + py * scale + sy;
            if (dy >= totalH) continue;
            for (let sx = 0; sx < scale; sx++) {
              const dx = bx + offsetX + px * scale + sx;
              if (dx >= gridW) continue;
              buf[dy * totalW + dx] = c;
            }
          }
        }
      }
    }

    // ── 右侧：Preview — 按真实 X/Y 位置拼合所有精灵 ──
    const previewX = gridW + GAP;
    const previewY = 0;

    // Preview 背景（黑色）
    for (let y = 0; y < previewH; y++) {
      let di = (previewY + y) * totalW + previewX;
      for (let x = 0; x < previewW; x++) {
        buf[di++] = 0xff_000000;
      }
    }

    // NES PPU 从 OAM 63 画到 0，索引小的精灵后画、在上层
    for (let i = sprites.length - 1; i >= 0; i--) {
      const spr = sprites[i];
      const sx = spr.x;
      const sy = spr.y + 1;   // OAM Y 是屏幕 Y-1
      const iw = spr.imgWidth;
      const ih = spr.imgHeight;

      for (let py = 0; py < ih; py++) {
        const screenY = sy + py;
        if (screenY < 0 || screenY >= previewH) continue;
        for (let px = 0; px < iw; px++) {
          const screenX = sx + px;
          if (screenX < 0 || screenX >= previewW) continue;
          const c = spr.image[py * iw + px];
          // JSnes palette 颜色 alpha = 0x00，所以用 backdrop (0x00000000) 来判断透明
          if (c !== 0x00000000) {
            buf[(previewY + screenY) * totalW + previewX + screenX] = c;
          }
        }
      }
    }

    this._blitToDebugCanvas(buf, totalW, totalH);
  },

  // ── PAL: 调色板 ──
  _renderPalDebug(nes: any) {
    const img = renderPaletteImage(nes);
    this._blitToDebugCanvas(img.data, img.width, img.height);
  },

  // ── ASM: 反汇编 ──
  _renderDisasmDebug() {
    if (!this._sys) return;
    const sys = this._sys;
    const memRead = (addr: number) => sys.mem[addr & 0xffff] ?? 0;
    const pc = ((sys.mem[0xFFFC] ?? 0) | ((sys.mem[0xFFFD] ?? 0) << 8)) & 0xFFFF;
    try {
      const lines = disassembleRange(0x8000, 128, memRead);
      let text = '; ======== Disasm ($8000) ========\n';
      text += `; Reset vector: $${pc.toString(16).padStart(4, '0')}\n`;
      text += `; Frame: #${this._fpsFrameCount}   A=$${((sys.mem[0x1A] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  X=$${((sys.mem[0x1B] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  Y=$${((sys.mem[0x1C] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n`;
      text += `; SP=$${((sys.mem[0x19] ?? 0) & 0xFF).toString(16).padStart(2, '0')}   P=$${((sys.mem[0x1D] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n\n`;
      for (const line of lines) {
        const hex = line.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ');
        text += `$${line.addr.toString(16).padStart(4, '0')}:  ${hex.padEnd(9)} ${line.text}\n`;
      }
      this.setData({ debugLines: text });
    } catch (e: any) {
      this.setData({ debugLines: '; disasm error: ' + (e.message || '') });
    }
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

  onPause() {
    const paused = !(this.data as any).paused;
    this.setData({ paused });
  },

  onTurboToggle() {
    const level = (this.data as any).turboLevel as number;
    const next = (level + 1) % 3;
    this.setData({ turboLevel: next });
  },

  onFpsTap() {
    // already showing realtime fps in status bar, toggle button display
    this.setData({ showFpsBtn: !(this.data as any).showFpsBtn });
  },

  onReset() {
    this._stopLoop();
    this._started = false;
    this.setData({ status: 'restarting...', paused: false, turboLevel: 0 });
    setTimeout(() => this._startEngine(), 100);
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
