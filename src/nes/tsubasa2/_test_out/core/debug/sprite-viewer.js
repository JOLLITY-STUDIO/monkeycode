"use strict";
// @ts-nocheck
/**
 * Sprite Viewer — 参照 FCEUX ppuViewer 的 oamPatternView / sprite 面板
 *
 * 显示 OAM 中所有 64 个精灵 (8×8 或 8×16) 的当前图案+调色板+位置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpriteData = getSpriteData;
/**
 * 渲染单个精灵到 RGBA buffer (8×8)
 * 参照 FCEUX: 使用精灵调色板和翻转标志
 */
function renderSpriteTile(ppu, tileIdx, paletteOffset, flipH, flipV, width = 8, height = 8) {
    const buf = new Uint32Array(width * height);
    const pal = ppu.sprPalette;
    const BACKDROP = 0x00000000; // alpha=0 透明背景
    const NO_TILE = 0xFF333333; // alpha=0xFF 无 tile 占位色
    const ptTile = ppu.ptTile[tileIdx];
    if (!ptTile || !ptTile.pix) {
        buf.fill(NO_TILE);
        return buf;
    }
    const pix = ptTile.pix;
    for (let py = 0; py < height; py++) {
        const srcPy = flipV ? (height - 1 - py) : py;
        for (let px = 0; px < width; px++) {
            const srcPx = flipH ? (width - 1 - px) : px;
            const colIdx = pix[srcPy * 8 + srcPx];
            // 精灵透明像素留空 (alpha=0)，实际颜色 OR 0xFF000000 标记不透明
            buf[py * width + px] = colIdx === 0
                ? BACKDROP
                : ((pal[colIdx + paletteOffset] ?? BACKDROP) | 0xFF000000);
        }
    }
    return buf;
}
/**
 * 读取所有精灵数据
 */
function getSpriteData(nes) {
    const ppu = nes.ppu;
    const is8x16 = ppu.f_spriteSize === 1;
    const sprites = [];
    for (let i = 0; i < 64; i++) {
        const sprX = ppu.sprX[i];
        const sprY = ppu.sprY[i];
        const sprTile = ppu.sprTile[i];
        // ppu.sprCol 已经是 palette offset (0/4/8/12)，与 renderSpritesPartially 中 palAdd 一致
        const sprCol = ppu.sprCol[i];
        const flipH = ppu.horiFlip[i] === 1;
        const flipV = ppu.vertFlip[i] === 1;
        const bgPri = ppu.bgPriority[i] === 1;
        if (is8x16) {
            // 8×16 精灵: bit 0 选 pattern table ($0000/$1000), bits 7-1 是 pair 编号
            // 实际上半 tile = pair×2, 下半 tile = pair×2+1（与 PPU renderSpritesPartially 一致）
            const upperTile = (sprTile & 0xfe) + ((sprTile & 1) << 8); // 上半: pair*2 + table
            const lowerTile = upperTile + 1; // 下半: pair*2+1
            const img = new Uint32Array(8 * 16);
            // 垂直翻转时整体上下 tile 也要交换
            const topTile = flipV ? lowerTile : upperTile;
            const bottomTile = flipV ? upperTile : lowerTile;
            const topBuf = renderSpriteTile(ppu, topTile, sprCol, flipH, flipV, 8, 8);
            const bottomBuf = renderSpriteTile(ppu, bottomTile, sprCol, flipH, flipV, 8, 8);
            for (let py = 0; py < 8; py++) {
                for (let px = 0; px < 8; px++) {
                    img[py * 8 + px] = topBuf[py * 8 + px];
                    img[(py + 8) * 8 + px] = bottomBuf[py * 8 + px];
                }
            }
            sprites.push({
                index: i,
                x: sprX, y: sprY,
                tileIndex: sprTile,
                palette: sprCol,
                flipH, flipV,
                bgPriority: bgPri,
                image: img,
                imgWidth: 8, imgHeight: 16,
            });
        }
        else {
            // 8×8 精灵：用 PPUCTRL 的 spPatternTable 选择表
            const tableOffset = ppu.f_spPatternTable << 8;
            const globalTile = sprTile + tableOffset;
            const img = renderSpriteTile(ppu, globalTile, sprCol, flipH, flipV, 8, 8);
            sprites.push({
                index: i,
                x: sprX, y: sprY,
                tileIndex: sprTile,
                palette: sprCol,
                flipH, flipV,
                bgPriority: bgPri,
                image: img,
                imgWidth: 8, imgHeight: 8,
            });
        }
    }
    return {
        sprites,
        is8x16,
        spTable: (ppu.f_spPatternTable ? 1 : 0),
    };
}
