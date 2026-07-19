"use strict";
/**
 * Plane 渲染器 — 处理 Plane A/B 的 Nametable + 滚动
 *
 * Nametable 每个 entry = 16-bit word:
 *   bit 15: Priority (0=高, 1=低)
 *   bit 14-13: Palette (0-3)
 *   bit 12: VFlip
 *   bit 11: HFlip
 *   bit 10-0: Tile index (0-2047)
 *
 * 滚动: HScroll (逐行/整屏) + VScroll (逐 cell)
 * VDP reg 设置 Plane Nametable 基地址(reg $02/$04), Size(reg $10)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = void 0;
const TileDecoder_1 = require("./TileDecoder");
const types_1 = require("../core/types");
class Plane {
    vdp;
    decoder;
    constructor(vdp) {
        this.vdp = vdp;
        this.decoder = new TileDecoder_1.TileDecoder(types_1.DISPLAY.WIDTH);
    }
    /**
     * 解析 Nametable entry (16-bit word)
     *
     * Genesis VDP 文档:
     * VRAM 中存储为大端序: vram[addr]=高字节, vram[addr+1]=低字节
     * TS VDP 中 VRAM write 按大端序存入, vram[0]=高位, vram[1]=低位
     * 所以解析: word = (vram[addr]<<8) | vram[addr+1]
     */
    static parseEntry(word) {
        return {
            tileIdx: word & 0x07FF, // bits 10-0
            hFlip: (word & 0x0800) !== 0, // bit 11
            vFlip: (word & 0x1000) !== 0, // bit 12
            palette: (word >> 13) & 0x03, // bits 13-14
            priority: (word & 0x8000) !== 0, // bit 15
        };
    }
    /**
     * 渲染 Plane A 到 ImageData
     */
    renderPlaneA(dst, vram, cram) {
        this.renderPlane(dst, vram, cram, this.vdp.planeAAddr, this.vdp.planeWidth, this.vdp.planeHeight, false);
    }
    /**
     * 渲染 Plane B
     */
    renderPlaneB(dst, vram, cram) {
        this.renderPlane(dst, vram, cram, this.vdp.planeBAddr, this.vdp.planeWidth, this.vdp.planeHeight, true);
    }
    /**
     * 通用 Plane 渲染 (按 8×8 tile 遍历)
     *
     * 注意: 之前实现按屏幕行遍历, 导致每个 tile 被重复绘制到错误的 Y 位置,
     * 整个 Plane 只显示背景色。现改为按 tile 坐标一次性解码整个 8×8 tile。
     */
    renderPlane(dst, vram, cram, nametableBase, planeWidth, planeHeight, _hiPriority) {
        const planeWidthPixels = planeWidth * 8;
        const planeHeightPixels = planeHeight * 8;
        // TODO: 读取 H/V scroll 值 (当前先 0)
        const scrollX = 0;
        const scrollY = 0;
        const sx = ((scrollX % planeWidthPixels) + planeWidthPixels) % planeWidthPixels;
        const sy = ((scrollY % planeHeightPixels) + planeHeightPixels) % planeHeightPixels;
        const startTileX = Math.floor(sx / 8);
        const startTileY = Math.floor(sy / 8);
        const startPixelX = sx % 8;
        const startPixelY = sy % 8;
        const tilesPerRow = Math.ceil((types_1.DISPLAY.WIDTH + startPixelX) / 8) + 1;
        const tilesPerCol = Math.ceil((types_1.DISPLAY.HEIGHT + startPixelY) / 8) + 1;
        for (let ty = 0; ty < tilesPerCol; ty++) {
            for (let tx = 0; tx < tilesPerRow; tx++) {
                const ntX = (startTileX + tx) % planeWidth;
                const ntY = (startTileY + ty) % planeHeight;
                const ntOffset = ntY * planeWidth + ntX;
                const wordAddr = nametableBase + ntOffset * 2;
                const word = vram.readWordLE(wordAddr);
                const entry = Plane.parseEntry(word);
                const tileAddr = entry.tileIdx * 32;
                const tileData = vram.readTileData(tileAddr);
                const tileScreenX = tx * 8 - startPixelX;
                const tileScreenY = ty * 8 - startPixelY;
                this.decoder.decodeToImageData(tileData, cram, entry.palette, false, // BG: color 0 显示背景色, 不透明
                dst, tileScreenX, tileScreenY, entry.hFlip, entry.vFlip);
            }
        }
    }
}
exports.Plane = Plane;
