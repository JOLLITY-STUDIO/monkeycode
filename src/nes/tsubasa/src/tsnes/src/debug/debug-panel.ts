/**
 * Debug Panel 编排器 — 从 h5game.ts 抽离
 *
 * 职责：
 * - 管理 debug canvas 的初始化与绘制
 * - 协调所有 debug viewer (NT/PT/SPR/PAL/ASM) 的渲染
 * - 管理导出 canvas 与 SPR 导出
 * - 管理文本数据的生成和复制
 *
 * 纯逻辑，不依赖微信 Page 实例。
 */

import { renderAllNameTables } from './nametable-viewer';
import { renderBothPatternTables, generatePTDataText } from './pattern-table-viewer';
import { renderPaletteImage } from './palette-viewer';
import { getSpriteData } from './sprite-viewer';
import { disassembleRange } from './disasm';

import {
  generateNTDataText,
  generateSPOAMDataText,
  generateSPTDataText,
} from './text-generator';

import { DebugCanvasManager } from './debug-canvas';

// ── 常量 ──
const SCREEN_W = 256;
const SCREEN_H = 240;
const SPR_CELL_W = 32;
const SPR_CELL_H = 32;
const SPR_COLS = 8;
const SPR_ROWS = 8;

export type DebugTab = '' | 'nametable' | 'patterntable' | 'sprite' | 'palette' | 'disasm';

export interface DebugDataUpdater {
  setData(data: Record<string, any>): void;
  getData(): Record<string, any>;
}

/**
 * DebugPanel 封装所有 debug viewer 逻辑
 *
 * 用法:
 *   const panel = new DebugPanel(pageUpdater);
 *   panel.onTabSwitch(newTab);
 *   panel.renderFrame(nes, sys);  // 在帧循环中调用
 */
export class DebugPanel {
  private debugCanvas = new DebugCanvasManager();
  private exportCanvas = new DebugCanvasManager();

  private sprExportData: any = {};
  private exporting = false;

  // 反汇编帧计数
  private fpsFrameCount = 0;
  private _ppuFramesLogged = 0;
  private _ppuStateChecked = false;
  private _ppuDeepChecked = false;

  constructor(private page: DebugDataUpdater) {}

  // ════════════════════════════════════════════════════════
  // Tab 切换
  // ════════════════════════════════════════════════════════

  onTabSwitch(tab: DebugTab, prevTab: DebugTab): void {
    const ntClear = (prevTab === 'nametable' && tab !== 'nametable') ? { ntDataText: '' } : {};
    const ptClear = (prevTab === 'patterntable' && tab !== 'patterntable') ? { ptDataText: '' } : {};
    const sptClear = (prevTab === 'sprite' && tab !== 'sprite') ? { sptDataText: '' } : {};
    this.page.setData({ debugTab: tab, debugLines: '', ...ntClear, ...ptClear, ...sptClear });
    if (tab === '' || tab !== 'disasm') {
      this.debugCanvas.reset();
    }
  }

  // ════════════════════════════════════════════════════════
  // 帧渲染
  // ════════════════════════════════════════════════════════

  renderFrame(nes: any, sys: any | null, frameCount: number): void {
    this.fpsFrameCount = frameCount;
    const tab = this.page.getData().debugTab as DebugTab;
    if (!tab) return;

    if (tab === 'disasm') {
      if (this.fpsFrameCount % 30 === 0) this._renderDisasm(sys);
    } else {
      this._renderGraphical(tab, nes);
    }
  }

  // ── 图形类 viewer ──
  private _renderGraphical(tab: DebugTab, nes: any): void {
    this.debugCanvas.init();

    if (!nes) return;
    try {
      switch (tab) {
        case 'nametable':    this._renderNT(nes); break;
        case 'patterntable': this._renderPT(nes); break;
        case 'sprite':       this._renderSprite(nes); break;
        case 'palette':      this._renderPalette(nes); break;
      }
    } catch (e: any) {
      console.warn('[debug] render error:', e.message);
    }
  }

  private _renderNT(nes: any): void {
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
    this.debugCanvas.blit(buf, CW, CH);
    this.page.setData({ ntDataText: generateNTDataText(nes) });
  }

  private _renderPT(nes: any): void {
    const ppu = nes.ppu;
    const { bgTable, spTable } = renderBothPatternTables(nes);
    const pal0 = bgTable === 0 ? ppu.imgPalette : ppu.sprPalette;
    const pal1 = spTable === 1 ? ppu.sprPalette : ppu.imgPalette;
    const result = renderBothPatternTables(nes, 0, pal0, pal1);
    const table0 = result.table0;
    const table1 = result.table1;

    const CELL = 128;
    const GAP = 8;
    const CW = CELL;
    const CH = CELL * 2 + GAP;
    const buf = new Uint32Array(CW * CH);
    buf.fill(0xff_0d0d22);

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

    this.debugCanvas.blit(buf, CW, CH);
    this.page.setData({ ptDataText: generatePTDataText(nes) });
  }

  private _renderSprite(nes: any): void {
    const ppu = nes.ppu;
    const { sprites } = getSpriteData(nes);

    const gridW = SPR_COLS * SPR_CELL_W;   // 256
    const gridH = SPR_ROWS * SPR_CELL_H;   // 256
    const previewW = SCREEN_W;
    const previewH = SCREEN_H;
    const GAP = 16;
    const totalW = gridW + GAP + previewW;   // 528
    const totalH = Math.max(gridH, previewH); // 256
    const buf = new Uint32Array(totalW * totalH);
    buf.fill(0xff_0d0d22);

    // 左侧：OAM 精灵 tile 集合
    for (let i = 0; i < Math.min(sprites.length, SPR_COLS * SPR_ROWS); i++) {
      const spr = sprites[i];
      const col = i % SPR_COLS;
      const row = Math.floor(i / SPR_COLS);
      const bx = col * SPR_CELL_W;
      const by = row * SPR_CELL_H;
      const iw2 = spr.imgWidth;
      const ih2 = spr.imgHeight;
      const scale = Math.min(Math.floor(SPR_CELL_W / iw2), Math.floor(SPR_CELL_H / ih2));
      const offsetX = Math.floor((SPR_CELL_W - iw2 * scale) / 2);
      const offsetY = Math.floor((SPR_CELL_H - ih2 * scale) / 2);

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

    // 右侧：Preview 按真实位置拼合
    const previewX = gridW + GAP;
    for (let y = 0; y < previewH; y++) {
      let di = y * totalW + previewX;
      for (let x = 0; x < previewW; x++) {
        buf[di++] = 0xff_000000;
      }
    }

    for (let i = sprites.length - 1; i >= 0; i--) {
      const spr = sprites[i];
      const sx = spr.x;
      const sy = spr.y + 1;
      const iw = spr.imgWidth;
      const ih = spr.imgHeight;

      for (let py = 0; py < ih; py++) {
        const screenY = sy + py;
        if (screenY < 0 || screenY >= previewH) continue;
        for (let px = 0; px < iw; px++) {
          const screenX = sx + px;
          if (screenX < 0 || screenX >= previewW) continue;
          const c = spr.image[py * iw + px];
          if (c !== 0x00000000) {
            buf[(py === 0 ? 0 : screenY) * totalW + previewX + screenX] = c;
          }
        }
      }
    }

    this.debugCanvas.blit(buf, totalW, totalH);
    this.sprExportData = { sprites };

    const text = generateSPOAMDataText(nes) + '\n\n' + generateSPTDataText(nes);
    this.page.setData({ sptDataText: text });
  }

  private _renderPalette(nes: any): void {
    const img = renderPaletteImage(nes);
    this.debugCanvas.blit(img.data, img.width, img.height);
  }

  private _renderDisasm(sys: any | null): void {
    if (!sys) return;
    const memRead = (addr: number) => sys.mem[addr & 0xffff] ?? 0;
    const pc = ((sys.mem[0xFFFC] ?? 0) | ((sys.mem[0xFFFD] ?? 0) << 8)) & 0xFFFF;
    try {
      const lines = disassembleRange(0x8000, 128, memRead);
      let text = '; ======== Disasm ($8000) ========\n';
      text += `; Reset vector: $${pc.toString(16).padStart(4, '0')}\n`;
      text += `; Frame: #${this.fpsFrameCount}   A=$${((sys.mem[0x1A] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  X=$${((sys.mem[0x1B] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  Y=$${((sys.mem[0x1C] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n`;
      text += `; SP=$${((sys.mem[0x19] ?? 0) & 0xFF).toString(16).padStart(2, '0')}   P=$${((sys.mem[0x1D] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n\n`;
      for (const line of lines) {
        const hex = line.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ');
        text += `$${line.addr.toString(16).padStart(4, '0')}:  ${hex.padEnd(9)} ${line.text}\n`;
      }
      this.page.setData({ debugLines: text });
    } catch (e: any) {
      this.page.setData({ debugLines: '; disasm error: ' + (e.message || '') });
    }
  }

  // ════════════════════════════════════════════════════════
  // 复制
  // ════════════════════════════════════════════════════════

  copyData(field: string, label: string): void {
    const text = this.page.getData()[field];
    if (!text) { wx.showToast({ title: '无数据', icon: 'none' }); return; }
    wx.setClipboardData({ data: text, success: () => wx.showToast({ title: label + ' 已复制', icon: 'success' }) });
  }

  // ════════════════════════════════════════════════════════
  // SPR Export
  // ════════════════════════════════════════════════════════

  async exportSprite(pageSetData: (data: any) => void): Promise<void> {
    if (this.exporting) return;
    this.exporting = true;
    pageSetData({ status: '导出 preview...' });

    try {
      const { sprites } = this.sprExportData;
      if (!sprites || sprites.length === 0) {
        wx.showToast({ title: '无精灵数据，请先切到 SPR 面板', icon: 'none' });
        this.exporting = false;
        return;
      }

      this.exportCanvas.init('#exportCanvas');
      await new Promise(r => setTimeout(r, 50));
      if (!this.exportCanvas.ctx) {
        wx.showToast({ title: '导出 canvas 未就绪', icon: 'none' });
        this.exporting = false;
        return;
      }

      const previewW = SCREEN_W;
      const previewH = SCREEN_H;
      const previewBuf = new Uint32Array(previewW * previewH);
      previewBuf.fill(0x00000000);

      for (let i = sprites.length - 1; i >= 0; i--) {
        const spr = sprites[i];
        const sx = spr.x;
        const sy = spr.y + 1;
        const iw = spr.imgWidth;
        const ih = spr.imgHeight;
        for (let py = 0; py < ih; py++) {
          const screenY = sy + py;
          if (screenY < 0 || screenY >= previewH) continue;
          for (let px = 0; px < iw; px++) {
            const screenX = sx + px;
            if (screenX < 0 || screenX >= previewW) continue;
            const c = spr.image[py * iw + px];
            if (c !== 0x00000000) {
              previewBuf[screenY * previewW + screenX] = c;
            }
          }
        }
      }

      this.exportCanvas.blit(previewBuf, previewW, previewH);
      const previewPng = await this._canvasToPng();

      const userDir = wx.env.USER_DATA_PATH;
      const pngPath = `${userDir}/sprite-preview.png`;
      wx.getFileSystemManager().writeFileSync(
        pngPath,
        wx.arrayBufferToBase64(previewPng.buffer.slice(previewPng.byteOffset, previewPng.byteOffset + previewPng.byteLength)),
        'base64',
      );

      pageSetData({ status: 'SPR preview 导出完成' });

      wx.showModal({
        title: '导出成功',
        content: `sprite-preview.png (透明背景)\n\n${pngPath}\n\n复制路径后，到 Windows 文件管理器地址栏粘贴打开。`,
        confirmText: '复制路径',
        cancelText: '关闭',
        success: (r: any) => {
          if (r.confirm) {
            wx.setClipboardData({
              data: pngPath,
              success: () => wx.showToast({ title: '路径已复制', icon: 'none', duration: 3000 }),
            });
          }
        },
      });
    } catch (e: any) {
      console.error('[export] error:', e);
      wx.showToast({ title: '导出失败: ' + (e.message || String(e)), icon: 'none' });
    } finally {
      this.exporting = false;
    }
  }

  private _canvasToPng(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        canvas: this.exportCanvas.canvas,
        success: (res: any) => {
          try {
            const fs = wx.getFileSystemManager();
            const data = fs.readFileSync(res.tempFilePath);
            resolve(new Uint8Array(data));
          } catch (e: any) {
            reject(e);
          }
        },
        fail: (err: any) => reject(new Error(`canvasToTempFilePath failed: ${err.errMsg}`)),
      });
    });
  }
}
