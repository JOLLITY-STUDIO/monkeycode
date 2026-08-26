"use strict";
// @ts-nocheck  // tsnes 移植核心，非翻译层，跳过类型检查
/**
 * Debug Panel 编排器 — 从 h5game.ts 抽离
 *
 * 职责：
 * - 管理 debug canvas 的初始化与绘制
 * - 协调所有 debug viewer (NT/PT/SPR/ASM) 的渲染
 * - 管理导出 canvas 与 SPR 导出
 * - 管理文本数据的生成和复制
 *
 * 纯逻辑，不依赖微信 Page 实例。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugPanel = void 0;
const nametable_viewer_1 = require("./nametable-viewer");
const pattern_table_viewer_1 = require("./pattern-table-viewer");
const sprite_viewer_1 = require("./sprite-viewer");
const disasm_1 = require("./disasm");
const text_generator_1 = require("./text-generator");
const debug_canvas_1 = require("./debug-canvas");
const gif_encoder_1 = require("./gif-encoder");
// ── 常量 ──
const SCREEN_W = 256;
const SCREEN_H = 240;
const SPR_CELL_W = 32;
const SPR_CELL_H = 32;
const SPR_COLS = 8;
const SPR_ROWS = 8;
/**
 * DebugPanel 封装所有 debug viewer 逻辑
 *
 * 用法:
 *   const panel = new DebugPanel(pageUpdater);
 *   panel.onTabSwitch(newTab);
 *   panel.renderFrame(nes, sys);  // 在帧循环中调用
 */
class DebugPanel {
    constructor(page) {
        this.page = page;
        this.debugCanvas = new debug_canvas_1.DebugCanvasManager();
        this.exportCanvas = new debug_canvas_1.DebugCanvasManager();
        this.sprExportData = {};
        this.exporting = false;
        // ── GIF 录制 ──
        this.recording = false;
        this.recordedFrames = [];
        this.recordTargetFrames = 0; // 目标帧数 (= 秒数 × 60)，0 = 手动停止
        this.recordFrameCount = 0;
        this.RECORD_MAX_FRAMES = 600; // 最多 10 秒
        this.RECORD_GIF_DELAY = 4; // GIF 帧延迟 (~25fps)
        // 反汇编帧计数
        this.fpsFrameCount = 0;
        this._ppuFramesLogged = 0;
        this._ppuStateChecked = false;
        this._ppuDeepChecked = false;
    }
    // ════════════════════════════════════════════════════════
    // Tab 切换
    // ════════════════════════════════════════════════════════
    onTabSwitch(tab, prevTab) {
        const ntClear = (prevTab === 'nametable' && tab !== 'nametable') ? { ntDataText: '' } : {};
        const ptClear = (prevTab === 'patterntable' && tab !== 'patterntable') ? { ptDataText: '' } : {};
        const sptClear = (prevTab === 'sprite' && tab !== 'sprite') ? { sptDataText: '' } : {};
        // 每个 tab 的 canvas 原始像素尺寸
        const canvasSizeMap = {
            '': null,
            'nametable': { w: 512, h: 480 },
            'patterntable': { w: 264, h: 128 },
            'sprite': { w: 528, h: 256 },
            'disasm': null,
        };
        this.page.setData({
            debugTab: tab,
            debugLines: '',
            debugCanvasStyle: '',
            ...ntClear,
            ...ptClear,
            ...sptClear,
        });
        if (tab === '' || tab === 'disasm') {
            this.debugCanvas.reset();
            return;
        }
        this.debugCanvas.reset();
        // 等下一帧 DOM 布局完成后再测量容器，按原始比例等比例撑满
        const size = canvasSizeMap[tab];
        if (size) {
            wx.nextTick(() => this._fitCanvasStyle(size.w, size.h));
        }
    }
    /** 查询 debug canvas 容器尺寸，按原始比例计算最大可显示尺寸 */
    _fitCanvasStyle(origW, origH) {
        const query = wx.createSelectorQuery();
        query.select('.debug-canvas-wrap, .nt-canvas-wrap, .pt-canvas-wrap, .spt-canvas-wrap')
            .boundingClientRect()
            .exec((res) => {
            const rect = res && res[0];
            if (!rect || !rect.width || !rect.height)
                return;
            const ratio = origW / origH;
            let w = rect.width;
            let h = w / ratio;
            if (h > rect.height) {
                h = rect.height;
                w = h * ratio;
            }
            this.page.setData({
                debugCanvasStyle: `width:${Math.floor(w)}px;height:${Math.floor(h)}px;`,
            });
        });
    }
    // ════════════════════════════════════════════════════════
    // 帧渲染
    // ════════════════════════════════════════════════════════
    renderFrame(nes, sys, frameCount) {
        this.fpsFrameCount = frameCount;
        const tab = this.page.getData().debugTab;
        if (!tab)
            return;
        if (tab === 'disasm') {
            if (this.fpsFrameCount % 30 === 0)
                this._renderDisasm(sys);
        }
        else {
            this._renderGraphical(tab, nes);
        }
    }
    // ── 图形类 viewer ──
    _renderGraphical(tab, nes) {
        this.debugCanvas.init();
        // init() 是异步的，ctx 可能还没 ready
        if (!this.debugCanvas.ctx)
            return;
        if (!nes)
            return;
        try {
            switch (tab) {
                case 'nametable':
                    this._renderNT(nes);
                    break;
                case 'patterntable':
                    this._renderPT(nes);
                    break;
                case 'sprite':
                    this._renderSprite(nes);
                    break;
            }
        }
        catch (e) {
            console.warn('[debug] render error:', e.message);
        }
    }
    _renderNT(nes) {
        const { nt, scrollX, scrollY, rawScrollX, rawScrollY, fromScrollWrite, scrolls } = (0, nametable_viewer_1.renderAllNameTables)(nes);
        const CW = 512, CH = 480;
        const bg = 4279045410;
        const buf = new Uint32Array(CW * CH);
        buf.fill(bg);
        for (let ni = 0; ni < 4; ni++) {
            if (!nt[ni])
                continue;
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
        // ── 视口矩形：当前屏幕在 4-NT 空间显示的区域 ──
        // 支持 split-screen：一帧内可能有多组 $2005 写入，每组一个视口框。
        const viewports = scrolls.length > 0 ? scrolls : [{ x: scrollX, y: scrollY, scanline: -1, source: fromScrollWrite ? '$2005' : 'reg' }];
        const VP_COLORS = [4294967040, 4278255615, 4278255360, 4294902015, 4294936576];
        const VP_HEX = ['#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff8800'];
        const drawRectEdges = (ox, oy, ow, oh, color) => {
            for (let y = 0; y < oh; y++) {
                const row = (oy + y) * CW;
                if (ox >= 0 && ox < CW)
                    buf[row + ox] = color;
                if (ox + ow - 1 >= 0 && ox + ow - 1 < CW)
                    buf[row + ox + ow - 1] = color;
            }
            const topRow = oy * CW;
            const botRow = (oy + oh - 1) * CW;
            for (let x = 0; x < ow; x++) {
                if (ox + x >= 0 && ox + x < CW) {
                    buf[topRow + ox + x] = color;
                    buf[botRow + ox + x] = color;
                }
            }
        };
        for (let vi = 0; vi < viewports.length; vi++) {
            const vp = viewports[vi];
            const vpX = vp.x % 512;
            const vpY = vp.y % 480;
            const vpW = 256, vpH = 240;
            const color = VP_COLORS[vi % VP_COLORS.length];
            const hWrap = vpX + vpW > CW ? CW - vpX : vpW;
            const hRest = vpW - hWrap;
            const vWrap = vpY + vpH > CH ? CH - vpY : vpH;
            const vRest = vpH - vWrap;
            drawRectEdges(vpX, vpY, hWrap, vWrap, color);
            if (hRest > 0)
                drawRectEdges(0, vpY, hRest, vWrap, color);
            if (vRest > 0) {
                drawRectEdges(vpX, 0, hWrap, vRest, color);
                if (hRest > 0)
                    drawRectEdges(0, 0, hRest, vRest, color);
            }
            const label = vp.scanline >= 0 ? `SL${vp.scanline}` : 'VBL';
            this.debugCanvas.drawTextOverlay(`${label}`, vpX + 2, vpY + 14 + vi * 10, 7, VP_HEX[vi % VP_HEX.length]);
        }
        this.debugCanvas.blit(buf, CW, CH);
        const scrollInfo = viewports.map((s, i) => `#${i} ${s.source} ${s.x},${s.y}${s.scanline >= 0 ? ' SL' + s.scanline : ''}`).join(' | ');
        this._drawFrameHUD(`Frame #${this.fpsFrameCount} ${scrollInfo}`, CW, CH);
        this._updatePaletteStrips(nes, ['bg']);
        this.page.setData({ ntDataText: (0, text_generator_1.generateNTDataText)(nes, this.fpsFrameCount) });
    }
    _renderPT(nes) {
        const ppu = nes.ppu;
        const { bgTable, spTable } = (0, pattern_table_viewer_1.renderBothPatternTables)(nes);
        const palT0 = bgTable === 0 ? ppu.imgPalette : ppu.sprPalette;
        const palT1 = spTable === 1 ? ppu.sprPalette : ppu.imgPalette;
        const result = (0, pattern_table_viewer_1.renderBothPatternTables)(nes, 0, palT0, palT1);
        const table0 = result.table0;
        const table1 = result.table1;
        const CELL = 128;
        const GAP = 8;
        const CW = CELL * 2 + GAP;
        const CH = CELL;
        const buf = new Uint32Array(CW * CH);
        buf.fill(4279045410);
        const copyTable = (src, ox) => {
            for (let y = 0; y < CELL; y++) {
                let di = y * CW + ox;
                let si = y * CELL;
                for (let x = 0; x < CELL; x++) {
                    buf[di++] = src[si++];
                }
            }
        };
        if (table0 && table0.data)
            copyTable(table0.data, 0);
        if (table1 && table1.data)
            copyTable(table1.data, CELL + GAP);
        this.debugCanvas.blit(buf, CW, CH);
        this._drawFrameHUD(`Frame #${this.fpsFrameCount}`, CW, CH);
        // 按 Table 左右顺序生成色条：T0 在左，T1 在右
        const ptTypes = [
            bgTable === 0 ? 'bg' : 'spr',
            bgTable === 1 ? 'bg' : 'spr',
        ];
        const ptAddrs = ['$0000', '$1000'];
        this._updatePaletteStrips(nes, ptTypes, ptAddrs);
        this.page.setData({ ptDataText: (0, pattern_table_viewer_1.generatePTDataText)(nes, this.fpsFrameCount) });
    }
    _renderSprite(nes) {
        const ppu = nes.ppu;
        const { sprites } = (0, sprite_viewer_1.getSpriteData)(nes);
        const gridW = SPR_COLS * SPR_CELL_W; // 256
        const gridH = SPR_ROWS * SPR_CELL_H; // 256
        const previewW = SCREEN_W; // 256
        const previewH = SCREEN_H; // 240
        const previewBoxH = gridH; // 256，与左侧 grid 等高
        const previewYOffset = Math.floor((previewBoxH - previewH) / 2); // 8
        const GAP = 16;
        const totalW = gridW + GAP + previewW; // 528
        const totalH = Math.max(gridH, previewBoxH); // 256
        const buf = new Uint32Array(totalW * totalH);
        buf.fill(4279045410);
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
                        if (dy >= totalH)
                            continue;
                        for (let sx = 0; sx < scale; sx++) {
                            const dx = bx + offsetX + px * scale + sx;
                            if (dx >= gridW)
                                continue;
                            buf[dy * totalW + dx] = c;
                        }
                    }
                }
            }
        }
        // 右侧：Preview 按真实位置拼合，垂直居中在 256×256 区域内
        const previewX = gridW + GAP;
        for (let y = 0; y < previewBoxH; y++) {
            let di = y * totalW + previewX;
            for (let x = 0; x < previewW; x++) {
                buf[di++] = 4278190080;
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
                if (screenY < 0 || screenY >= previewH)
                    continue;
                const destY = previewYOffset + screenY;
                for (let px = 0; px < iw; px++) {
                    const screenX = sx + px;
                    if (screenX < 0 || screenX >= previewW)
                        continue;
                    const c = spr.image[py * iw + px];
                    if (c !== 0x00000000) {
                        buf[destY * totalW + previewX + screenX] = c;
                    }
                }
            }
        }
        this.debugCanvas.blit(buf, totalW, totalH);
        // ── 左侧网格每个 cell 标注精灵索引 + 调色板组 ──
        for (let i = 0; i < Math.min(sprites.length, SPR_COLS * SPR_ROWS); i++) {
            const spr = sprites[i];
            const col = i % SPR_COLS;
            const row = Math.floor(i / SPR_COLS);
            const bx = col * SPR_CELL_W;
            const by = row * SPR_CELL_H;
            const isVisible = spr.y < 0xF0;
            const grp = spr.palette >> 2; // 0/4/8/12 → 0/1/2/3
            // 只标注可见精灵，但在网格左上角标注所有（不可见用暗色）
            const label = `G${grp}`;
            const labelColor = isVisible ? `hsl(${60 + grp * 90}, 100%, 60%)` : '#333';
            this.debugCanvas.drawTextOverlay(label, bx + 1, by + 2, 7, labelColor);
        }
        this._drawFrameHUD(`Frame #${this.fpsFrameCount}`, totalW, totalH);
        this._updatePaletteStrips(nes, ['spr']);
        const text = (0, text_generator_1.generateSPOAMDataText)(nes) + '\n\n' + (0, text_generator_1.generateSPTDataText)(nes);
        this.page.setData({ sptDataText: text });
        // ── 录制捕获 ──
        if (this.recording && sprites.length > 0) {
            this._capturePreviewFrame(sprites);
        }
    }
    // ── 调色板色条（嵌入 NT/PT/SPR 视图顶部，支持多条并存）──
    _updatePaletteStrips(nes, types, tableAddrs) {
        const ppu = nes.ppu;
        const vramMem = ppu?.vramMem;
        if (!vramMem)
            return;
        const strips = [];
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            const palSrc = type === 'bg' ? ppu.imgPalette : ppu.sprPalette;
            if (!palSrc)
                continue;
            const groups = [];
            const vramBase = type === 'bg' ? 0x3F00 : 0x3F10;
            for (let g = 0; g < 4; g++) {
                const group = [];
                for (let c = 0; c < 4; c++) {
                    const slot = g * 4 + c;
                    const color = palSrc[slot];
                    const r = (color >> 16) & 0xff;
                    const gv = (color >> 8) & 0xff;
                    const b = color & 0xff;
                    const rawIdx = vramMem[vramBase + slot] & 0x3F;
                    const addr = (vramBase + slot).toString(16).toUpperCase();
                    const colorIdx = rawIdx.toString(16).padStart(2, '0').toUpperCase();
                    group.push({ addr, colorIdx, color: `rgb(${r},${gv},${b})` });
                }
                groups.push(group);
            }
            strips.push({
                type: type.toUpperCase(),
                tableAddr: tableAddrs?.[i],
                groups,
            });
        }
        this.page.setData({ paletteStrips: strips });
    }
    _renderDisasm(sys) {
        if (!sys)
            return;
        const memRead = (addr) => sys.mem[addr & 0xffff] ?? 0;
        const pc = ((sys.mem[0xFFFC] ?? 0) | ((sys.mem[0xFFFD] ?? 0) << 8)) & 0xFFFF;
        try {
            const lines = (0, disasm_1.disassembleRange)(0x8000, 128, memRead);
            let text = '; ======== Disasm ($8000) ========\n';
            text += `; Reset vector: $${pc.toString(16).padStart(4, '0')}\n`;
            text += `; Frame: #${this.fpsFrameCount}   A=$${((sys.mem[0x1A] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  X=$${((sys.mem[0x1B] ?? 0) & 0xFF).toString(16).padStart(2, '0')}  Y=$${((sys.mem[0x1C] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n`;
            text += `; SP=$${((sys.mem[0x19] ?? 0) & 0xFF).toString(16).padStart(2, '0')}   P=$${((sys.mem[0x1D] ?? 0) & 0xFF).toString(16).padStart(2, '0')}\n\n`;
            for (const line of lines) {
                const hex = line.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ');
                text += `$${line.addr.toString(16).padStart(4, '0')}:  ${hex.padEnd(9)} ${line.text}\n`;
            }
            this.page.setData({ debugLines: text });
        }
        catch (e) {
            this.page.setData({ debugLines: '; disasm error: ' + (e.message || '') });
        }
    }
    // ── 帧计数 HUD 叠层 ────────
    _drawFrameHUD(text, cw, ch) {
        // 预留给文字的最小空间，避免在小画布上遮挡数据
        if (ch < 32)
            return;
        this.debugCanvas.drawTextOverlay(text, 4, 14, 12, '#ff0');
    }
    // ════════════════════════════════════════════════════════
    // 复制
    // ════════════════════════════════════════════════════════
    copyData(field, label) {
        const text = this.page.getData()[field];
        if (!text) {
            wx.showToast({ title: '无数据', icon: 'none' });
            return;
        }
        wx.setClipboardData({ data: text, success: () => wx.showToast({ title: label + ' 已复制', icon: 'success' }) });
    }
    // ════════════════════════════════════════════════════════
    // 保存文本到文件 (PC devtools 可访问 USER_DATA_PATH)
    // ════════════════════════════════════════════════════════
    saveDataToFile(field, filename, label) {
        const text = this.page.getData()[field];
        if (!text) {
            wx.showToast({ title: '无数据', icon: 'none' });
            return;
        }
        try {
            const fs = wx.getFileSystemManager();
            const filePath = `${wx.env.USER_DATA_PATH}/${filename}`;
            fs.writeFileSync(filePath, text, 'utf-8');
            wx.setClipboardData({
                data: filePath,
                success: () => wx.showToast({ title: `${label} 已保存！\n路径已复制到剪贴板`, icon: 'success', duration: 3000 }),
                fail: () => wx.showToast({ title: `${label} 已保存！`, icon: 'success' }),
            });
        }
        catch (e) {
            wx.showToast({ title: '保存失败: ' + (e.message || String(e)), icon: 'none' });
        }
    }
    // ════════════════════════════════════════════════════════
    // SPR Preview Buffer (共享：导出 / 录制)
    // ════════════════════════════════════════════════════════
    _buildPreviewBuf(sprites) {
        const buf = new Uint32Array(SCREEN_W * SCREEN_H);
        buf.fill(0x00000000);
        for (let i = sprites.length - 1; i >= 0; i--) {
            const spr = sprites[i];
            const sx = spr.x;
            const sy = spr.y + 1;
            const iw = spr.imgWidth;
            const ih = spr.imgHeight;
            for (let py = 0; py < ih; py++) {
                const screenY = sy + py;
                if (screenY < 0 || screenY >= SCREEN_H)
                    continue;
                for (let px = 0; px < iw; px++) {
                    const screenX = sx + px;
                    if (screenX < 0 || screenX >= SCREEN_W)
                        continue;
                    const c = spr.image[py * iw + px];
                    if (c !== 0x00000000) {
                        buf[screenY * SCREEN_W + screenX] = c;
                    }
                }
            }
        }
        return buf;
    }
    // ════════════════════════════════════════════════════════
    // GIF 录制
    // ════════════════════════════════════════════════════════
    /** 开始录制。durationSec = 0 手动停止，>0 自动停止 */
    startRecording(durationSec = 0) {
        if (this.recording)
            return;
        this.recording = true;
        this.recordedFrames = [];
        this.recordFrameCount = 0;
        this.recordTargetFrames = durationSec > 0
            ? Math.min(Math.ceil(durationSec * 60), this.RECORD_MAX_FRAMES)
            : this.RECORD_MAX_FRAMES;
        this.page.setData({ recording: true, sprRecordCount: 0 });
        console.log(`[record] 开始录制, 目标: ${this.recordTargetFrames} 帧`);
    }
    /** 停止录制并生成 GIF */
    async stopRecording(pageSetData) {
        if (!this.recording)
            return;
        this.recording = false;
        this.page.setData({ recording: false });
        const frames = this.recordedFrames;
        this.recordedFrames = [];
        this.recordFrameCount = 0;
        if (frames.length === 0) {
            wx.showToast({ title: '没有录制到任何帧', icon: 'none' });
            return;
        }
        pageSetData({ status: `正在生成 GIF (${frames.length} 帧)...` });
        try {
            const gifFrames = frames.map(pixels => ({
                pixels,
                width: SCREEN_W,
                height: SCREEN_H,
                delay: this.RECORD_GIF_DELAY,
            }));
            const gifData = (0, gif_encoder_1.encodeGif)(gifFrames, { loop: true });
            console.log(`[record] GIF 编码完成: ${gifData.length} bytes, ${frames.length} 帧, 头部: [${Array.from(gifData.subarray(0, 6)).map(b => String.fromCharCode(b)).join('')}]`);
            // 保存到文件（手动 base64，避免 wx.arrayBufferToBase64 对大 buffer 截断）
            const userDir = wx.env.USER_DATA_PATH;
            const gifPath = `${userDir}/sprite-record.gif`;
            const fs = wx.getFileSystemManager();
            fs.writeFileSync(gifPath, _uint8ArrayToBase64(gifData), 'base64');
            pageSetData({ status: `GIF 已保存 (${frames.length} 帧)` });
            // 尝试保存到相册（大部分系统相册支持 GIF）
            try {
                await this._saveToAlbum(gifData, 'gif');
            }
            catch (_) { /* 降级 */ }
            wx.setClipboardData({
                data: gifPath,
                success: () => wx.showToast({
                    title: `GIF (${frames.length}帧) 已保存！路径已复制`,
                    icon: 'success',
                    duration: 3000,
                }),
            });
            console.log(`[record] GIF 生成完成: ${frames.length} 帧, ${gifData.length} bytes`);
        }
        catch (e) {
            console.error('[record] error:', e);
            wx.showToast({ title: 'GIF 生成失败: ' + (e.message || String(e)), icon: 'none' });
        }
    }
    /** 录制中每帧调用，由 _renderSprite 触发 */
    _capturePreviewFrame(sprites) {
        const buf = this._buildPreviewBuf(sprites);
        this.recordedFrames.push(buf);
        this.recordFrameCount++;
        // 限频更新 UI (每 5 帧)
        if (this.recordFrameCount % 5 === 0) {
            this.page.setData({ sprRecordCount: this.recordFrameCount });
        }
        // 自动停止检查
        if (this.recordTargetFrames > 0 && this.recordFrameCount >= this.recordTargetFrames) {
            this.recording = false;
            this.page.setData({ recording: false, sprRecordCount: this.recordFrameCount });
            console.log('[record] 达到目标帧数，自动停止');
            // 延迟一帧执行避免递归
            setTimeout(() => this.stopRecording(this.page.setData.bind(this.page)), 100);
        }
    }
    // ════════════════════════════════════════════════════════
    // SPR Export
    // ════════════════════════════════════════════════════════
    async exportSprite(pageSetData) {
        if (this.exporting)
            return;
        this.exporting = true;
        pageSetData({ status: '正在保存 SPR preview...' });
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
            const previewBuf = this._buildPreviewBuf(sprites);
            // 手动写 canvas ImageData：alpha 直接取自 spr.image（不透明 = 0xFF, 透明 = 0x00）
            this.exportCanvas.canvas.width = SCREEN_W;
            this.exportCanvas.canvas.height = SCREEN_H;
            const imgData = this.exportCanvas.ctx.createImageData(SCREEN_W, SCREEN_H);
            const pix = imgData.data;
            for (let i = 0, j = 0; i < previewBuf.length; i++, j += 4) {
                const color = previewBuf[i];
                pix[j] = (color >> 16) & 0xff;
                pix[j + 1] = (color >> 8) & 0xff;
                pix[j + 2] = color & 0xff;
                pix[j + 3] = (color >>> 24) & 0xff;
            }
            this.exportCanvas.ctx.putImageData(imgData, 0, 0);
            const previewPng = await this._canvasToPng();
            // 保存到项目目录
            const userDir = wx.env.USER_DATA_PATH;
            const pngPath = `${userDir}/sprite-preview.png`;
            const fs2 = wx.getFileSystemManager();
            fs2.writeFileSync(pngPath, _uint8ArrayToBase64(previewPng), 'base64');
            pageSetData({ status: '已保存 sprite-preview.png' });
            // 同时尝试保存到相册
            try {
                await this._saveToAlbum(previewPng);
            }
            catch (_) { /* 相册不可用时静默降级 */ }
            // 自动复制路径到剪贴板，方便在文件管理器粘贴
            wx.setClipboardData({
                data: pngPath,
                success: () => {
                    wx.showToast({ title: '已保存！路径已复制，在文件管理器地址栏粘贴打开', icon: 'success', duration: 3000 });
                },
                fail: () => {
                    wx.showToast({ title: '已保存！\n' + pngPath, icon: 'success', duration: 3000 });
                },
            });
        }
        catch (e) {
            console.error('[export] error:', e);
            wx.showToast({ title: '导出失败: ' + (e.message || String(e)), icon: 'none' });
        }
        finally {
            this.exporting = false;
        }
    }
    _canvasToPng() {
        return new Promise((resolve, reject) => {
            wx.canvasToTempFilePath({
                canvas: this.exportCanvas.canvas,
                success: (res) => {
                    try {
                        const fs = wx.getFileSystemManager();
                        const data = fs.readFileSync(res.tempFilePath);
                        resolve(new Uint8Array(data));
                    }
                    catch (e) {
                        reject(e);
                    }
                },
                fail: (err) => reject(new Error(`canvasToTempFilePath failed: ${err.errMsg}`)),
            });
        });
    }
    /** 保存图片到系统相册 (仅真机有效，devtools 不支持) */
    _saveToAlbum(data, ext = 'png') {
        return new Promise((resolve, reject) => {
            const fs = wx.getFileSystemManager();
            const tmpPath = `${wx.env.USER_DATA_PATH}/_album_spr.${ext}`;
            try {
                fs.writeFileSync(tmpPath, _uint8ArrayToBase64(data), 'base64');
                wx.saveImageToPhotosAlbum({
                    filePath: tmpPath,
                    success: () => { console.log('[export] 已保存到相册'); resolve(); },
                    fail: (err) => reject(new Error(err.errMsg || 'saveImageToPhotosAlbum failed')),
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.DebugPanel = DebugPanel;
/** 手动 Uint8Array → Base64（避免 wx.arrayBufferToBase64 对大缓冲区截断） */
function _uint8ArrayToBase64(data) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    const len = data.length;
    for (let i = 0; i < len; i += 3) {
        const b0 = data[i];
        const b1 = i + 1 < len ? data[i + 1] : 0;
        const b2 = i + 2 < len ? data[i + 2] : 0;
        const tri = (b0 << 16) | (b1 << 8) | b2;
        result += chars[(tri >> 18) & 0x3F];
        result += chars[(tri >> 12) & 0x3F];
        result += i + 1 < len ? chars[(tri >> 6) & 0x3F] : '=';
        result += i + 2 < len ? chars[tri & 0x3F] : '=';
    }
    return result;
}
