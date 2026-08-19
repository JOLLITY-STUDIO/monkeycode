"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameCompositor = void 0;
const types_1 = require("../../types");
/** 帧缓冲像素数 (256×240) */
const BUFFER_PIXELS = types_1.NES_WIDTH * types_1.NES_HEIGHT;
/** 调色板颜色 → 0xRRGGBB */
function colorToUint32(c) {
    return ((c.r & 0xff) << 16) | ((c.g & 0xff) << 8) | (c.b & 0xff);
}
class FrameCompositor {
    constructor(store) {
        /** CHR 原始数据 [bankId] → Uint8Array */
        this._chrBanks = [];
        /** 调色板表 (每帧从 DataStore 同步) */
        this._paletteTable = null;
        /** 上次同步的调色板 hash (避免无谓重建) */
        this._palHash = '';
        /** 复用帧缓冲对象 (避免每帧分配) */
        this._buffer = new Uint32Array(BUFFER_PIXELS);
        this._store = store;
    }
    // ── CHR 管理 ──
    registerChrBank(bankId, data) {
        this._chrBanks[bankId] = data;
    }
    getChrBank(bankId) {
        return this._chrBanks[bankId] ?? null;
    }
    setPaletteTable(table) {
        this._paletteTable = {
            bgPalettes: table.bgPalettes.map(e => ({ colors: [...e.colors] })),
            sprPalettes: table.sprPalettes.map(e => ({ colors: [...e.colors] })),
        };
    }
    // ── 主入口 ──
    /**
     * 合成一帧。
     * 仅消费 DataStore NT/OAM/调色板 + CHR，不绘制任何外部 overlay。
     */
    compose() {
        const buf = this._buffer;
        this._syncPalette();
        // 1. 清屏 (backdrop 色 = BG palette 0 的 index0)
        buf.fill(this._backdropColor());
        // 2. 背景 (NameTable)
        this._drawNametable(buf);
        // 3. 精灵 (OAM)
        this._drawSprites(buf);
        return buf;
    }
    // ── 内部: 调色板同步 ──
    _syncPalette() {
        const tbl = this._store.paletteTable;
        const hash = JSON.stringify(tbl);
        if (hash === this._palHash)
            return;
        this._palHash = hash;
        this._paletteTable = {
            bgPalettes: tbl.bgPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })),
            sprPalettes: tbl.sprPalettes.map(e => ({ colors: e.colors.map(c => ({ ...c })) })),
        };
    }
    _backdropColor() {
        const pal = this._paletteTable?.bgPalettes[0];
        const c = pal?.colors[0];
        return c ? colorToUint32(c) : 0;
    }
    // ── 内部: BG 渲染 ──
    /** 绘制 NameTable 背景 (viewport 采样) */
    _drawNametable(buf) {
        this._store.eachVisibleTile((screenX, screenY, entry) => {
            this._drawTileToBuffer(buf, entry.bank, entry.tile, entry.palette, screenX, screenY, entry.flipH, entry.flipV);
        });
    }
    // ── 内部: 精灵渲染 ──
    /** 绘制精灵 (OAM) */
    _drawSprites(buf) {
        for (const spr of this._store.sprites) {
            if (!spr.active)
                continue;
            // TODO(真实 OAM): 精灵 palette 为 4-7 组; 背面/优先级未处理, 保持原 Renderer 行为
            const pal = spr.palette >= 4 ? spr.palette : spr.palette + 4;
            this._drawTileToBuffer(buf, spr.bank, spr.tile, pal, spr.x, spr.y, spr.flipH, spr.flipV, true);
        }
    }
    // ── 内部: Tile 解码 → 帧缓冲 ──
    /**
     * 将单个 CHR tile 解码并写入帧缓冲 (覆盖式)。
     * @param sprite true=精灵 (colorIdx0 透明跳过), false=背景 (colorIdx0 用该组 index0)
     */
    _drawTileToBuffer(buf, bankId, tileId, palIdx, x, y, flipH, flipV, sprite = false) {
        const chr = this._chrBanks[bankId];
        if (!chr)
            return;
        const off = tileId * 16;
        if (off + 16 > chr.length)
            return;
        const palTable = this._paletteTable;
        if (!palTable)
            return;
        const palEntry = palIdx < 4
            ? palTable.bgPalettes[palIdx]
            : palTable.sprPalettes[palIdx - 4];
        if (!palEntry)
            return;
        for (let row = 0; row < types_1.TILE_PX; row++) {
            const srcRow = flipV ? types_1.TILE_PX - 1 - row : row;
            const byte0 = chr[off + srcRow];
            const byte1 = chr[off + srcRow + 8];
            for (let col = 0; col < types_1.TILE_PX; col++) {
                const srcCol = flipH ? types_1.TILE_PX - 1 - col : col;
                const mask = 0x80 >> srcCol;
                const colorIdx = ((byte1 & mask) ? 2 : 0) | ((byte0 & mask) ? 1 : 0);
                if (colorIdx === 0) {
                    if (sprite)
                        continue; // 精灵透明
                    // 背景: 用该调色板组 index0 (backdrop) 覆盖
                }
                const pal = palEntry.colors[colorIdx] ?? palEntry.colors[0];
                const sx = x + col;
                const sy = y + row;
                if (sx < 0 || sx >= types_1.NES_WIDTH || sy < 0 || sy >= types_1.NES_HEIGHT)
                    continue;
                buf[sy * types_1.NES_WIDTH + sx] = colorToUint32(pal);
            }
        }
    }
}
exports.FrameCompositor = FrameCompositor;
