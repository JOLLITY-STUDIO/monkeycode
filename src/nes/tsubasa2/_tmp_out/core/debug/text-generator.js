"use strict";
/**
 * Debug 文本数据生成器 — 从 h5game.ts 抽离
 *
 * 生成 NT / SPT / SPR OAM / PAL 等调试文本，与 canvas 渲染解耦。
 * PT 文本生成器已在 pattern-table-viewer.ts 中 (generatePTDataText)。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNTDataText = generateNTDataText;
exports.generatePaletteDataText = generatePaletteDataText;
exports.generateSPOAMDataText = generateSPOAMDataText;
exports.generateSPTDataText = generateSPTDataText;
/**
 * 输出 4 个 nametable: 每个 tile 同时显示 NT index + CHR 内容状态
 *
 * 格子格式: "XXc"
 *   XX = nametable tile index (hex)
 *   c  = CHR 内容指示:
 *        █ = CHR tile 有内容（非零像素 >= 50%）
 *        ░ = CHR tile 稀疏内容
 *        · = CHR tile 全透明
 *        ! = ptTile 不存在（无 CHR 数据）
 */
function generateNTDataText(nes, frameCount) {
    const ppu = nes.ppu;
    const lines = [];
    const COL_HEADER = 'Row ';
    const bgTableBase = ppu.regS === 0 ? 0 : 256;
    const bgAddr = ppu.regS === 0 ? '$0000' : '$1000';
    const spAddr = ppu.f_spPatternTable ? '$1000' : '$0000';
    lines.push(`══════════════════════════════════════════════════════`);
    lines.push(`Frame: #${frameCount ?? '?'}  |  PPU $2000: regS=${ppu.regS} BG PT=${bgAddr}  SP PT=${spAddr}`);
    lines.push(`图例: █=有内容  ░=稀疏  ·=全透明  !=无CHR  格式: [tileIdx][CHR内容]`);
    lines.push(`══════════════════════════════════════════════════════`);
    lines.push('');
    for (let ni = 0; ni < 4; ni++) {
        const nt = ppu.nameTable[ni];
        const addr = 0x2000 + ni * 0x400;
        const hexAddr = addr.toString(16).toUpperCase().padStart(4, '0');
        lines.push(`── NT ${ni} (0x${hexAddr}) ──`);
        let header = COL_HEADER;
        for (let tx = 0; tx < 32; tx++) {
            header += tx.toString(16).toUpperCase().padStart(3, ' ');
        }
        lines.push(header);
        for (let ty = 0; ty < 30; ty++) {
            const row = [];
            for (let tx = 0; tx < 32; tx++) {
                const tileIdx = nt.tile[ty * 32 + tx];
                const ptSlot = bgTableBase + tileIdx;
                const ptTile = ppu.ptTile[ptSlot];
                const hex = tileIdx.toString(16).toUpperCase().padStart(2, '0');
                let chrStatus;
                if (!ptTile || !ptTile.pix) {
                    chrStatus = '!';
                }
                else {
                    let nonZero = 0;
                    for (let i = 0; i < 64; i++) {
                        if (ptTile.pix[i] !== 0)
                            nonZero++;
                    }
                    if (nonZero === 0)
                        chrStatus = '·';
                    else if (nonZero < 32)
                        chrStatus = '\u2591';
                    else
                        chrStatus = '\u2588';
                }
                row.push(hex + chrStatus);
            }
            lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(''));
        }
        // ── Palette groups ──
        lines.push('');
        lines.push(`  Palette: ` + COL_HEADER);
        let pHdr = '';
        for (let tx = 0; tx < 32; tx++) {
            pHdr += ' ' + (tx % 10).toString() + ' ';
        }
        lines.push('         ' + pHdr);
        for (let ty = 0; ty < 30; ty++) {
            const row = [];
            for (let tx = 0; tx < 32; tx++) {
                const attr = nt.attrib[ty * 32 + tx];
                row.push(' ' + (attr >> 2).toString() + ' ');
            }
            lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(''));
        }
        lines.push('');
        lines.push('');
    }
    // ── BG Palette ──
    lines.push(_formatPaletteBlock(ppu, 'bg'));
    return lines.join('\n');
}
/**
 * 输出 PPU 调色板数据 (FCEUX 风格)
 *
 * 格式:
 *   BG  Palette: 4 组 × 4 色 = 16 色
 *   SPR Palette: 4 组 × 4 色 = 16 色
 *   每色同时输出 raw index (VRAM $3Fxx) + 解析后的 RGB hex
 */
function generatePaletteDataText(nes, frameCount) {
    const ppu = nes.ppu;
    const lines = [];
    lines.push(`══════════════════════════════════════════════`);
    lines.push(`Frame: #${frameCount ?? '?'}  |  Palette Data`);
    lines.push(`══════════════════════════════════════════════`);
    lines.push('');
    // emphasis 位
    const emp = ppu.f_color & 0x07;
    const empDesc = [
        'None', 'R', 'G', 'RG', 'B', 'RB', 'GB', 'RGB',
    ][emp] ?? '?';
    lines.push(`Color Emphasis: ${emp} (0b${emp.toString(2).padStart(3, '0')} = ${empDesc})`);
    lines.push('');
    // 辅助: RGB → hex 字符串
    function rgbToHex(c) {
        const r = (c >>> 16) & 0xFF;
        const g = (c >>> 8) & 0xFF;
        const b = c & 0xFF;
        return `#${r.toString(16).toUpperCase().padStart(2, '0')}${g.toString(16).toUpperCase().padStart(2, '0')}${b.toString(16).toUpperCase().padStart(2, '0')}`;
    }
    // ── BG Palette ──
    lines.push('── BG Palette (VRAM $3F00-$3F0F) ──');
    for (let grp = 0; grp < 4; grp++) {
        const row = [];
        for (let i = 0; i < 4; i++) {
            const idx = grp * 4 + i;
            const addr = (0x3F00 + idx).toString(16).toUpperCase().padStart(4, '0');
            const rawIdx = ppu.vramMem[0x3F00 + idx] & 0x3F;
            const hex = '0x' + rawIdx.toString(16).toUpperCase().padStart(2, '0');
            const rgb = rgbToHex(ppu.imgPalette[idx]);
            row.push(`[$${addr}]${hex}${rgb}`);
        }
        lines.push(`  Group ${grp}:  ${row.join('  ')}`);
    }
    lines.push('');
    // ── SPR Palette ──
    lines.push('── SPR Palette (VRAM $3F10-$3F1F) ──');
    for (let grp = 0; grp < 4; grp++) {
        const row = [];
        for (let i = 0; i < 4; i++) {
            const idx = grp * 4 + i;
            const addr = (0x3F10 + idx).toString(16).toUpperCase().padStart(4, '0');
            const rawIdx = ppu.vramMem[0x3F10 + idx] & 0x3F;
            const hex = '0x' + rawIdx.toString(16).toUpperCase().padStart(2, '0');
            const rgb = rgbToHex(ppu.sprPalette[idx]);
            row.push(`[$${addr}]${hex}${rgb}`);
        }
        lines.push(`  Group ${grp}:  ${row.join('  ')}`);
    }
    lines.push('');
    // ── 纯索引表 (方便直接搜索/对比 bank 数据) ──
    lines.push('── Raw Indices (copy-friendly) ──');
    const rawBG = [];
    const rawSP = [];
    for (let i = 0; i < 16; i++) {
        rawBG.push('0x' + (ppu.vramMem[0x3F00 + i] & 0x3F).toString(16).toUpperCase().padStart(2, '0'));
        rawSP.push('0x' + (ppu.vramMem[0x3F10 + i] & 0x3F).toString(16).toUpperCase().padStart(2, '0'));
    }
    lines.push('  BG:  ' + rawBG.join(', '));
    lines.push('  SPR: ' + rawSP.join(', '));
    return lines.join('\n');
}
/**
 * 输出 OAM 精灵摘要（紧凑版，一行一条，只列可见精灵）
 */
function generateSPOAMDataText(nes) {
    const ppu = nes.ppu;
    const is8x16 = ppu.f_spriteSize === 1;
    const lines = [];
    lines.push(`── OAM 可见精灵 (${is8x16 ? '8×16' : '8×8'}) ──`);
    const visibleTiles = [];
    const visibleSprites = [];
    let visible = 0;
    for (let i = 0; i < 64; i++) {
        const y = ppu.sprY[i];
        if (y >= 0xF0)
            continue;
        const x = ppu.sprX[i];
        const tile = ppu.sprTile[i];
        const attr = ppu.sprCol[i]; // 完整属性字节 (bit7=VFlip, bit6=HFlip, bit5=Pri, bit1-0=调色板组)
        const palGroup = attr & 0x03;
        const isPri = !!(attr & 0x20);
        const isFlipH = !!(attr & 0x40);
        const isFlipV = !!(attr & 0x80);
        const pri = isPri ? 'P' : '.';
        const flipH = isFlipH ? 'H' : '.';
        const flipV = isFlipV ? 'V' : '.';
        const xs = x.toString(16).toUpperCase().padStart(3, '0');
        const ys = y.toString(16).toUpperCase().padStart(3, '0');
        const ts = tile.toString(16).toUpperCase().padStart(2, '0');
        const as = attr.toString(16).toUpperCase().padStart(2, '0');
        lines.push(`  #${String(i).padStart(2)} ($${xs},$${ys}) Tile=$${ts} Attr=$${as} Grp=${palGroup} ${pri}${flipH}${flipV}`);
        visibleTiles.push(tile);
        visibleSprites.push({ x, y, tile, attr, grp: palGroup, hflip: isFlipH, vflip: isFlipV, pri: isPri });
        visible++;
    }
    if (visible === 0) {
        lines.push('  (无可见精灵)');
    }
    else {
        // 添加可直接搜索复制的连续 tile 序列
        lines.push('');
        lines.push('── 搜索用 tile 连续序列（复制下面这行去 bank-22-data 搜索）──');
        lines.push(visibleTiles.map(t => '0x' + t.toString(16).toUpperCase().padStart(2, '0')).join(', '));
        lines.push('');
        lines.push('── 去重 tile 列表 ──');
        const unique = [...new Set(visibleTiles)].sort((a, b) => a - b);
        lines.push(unique.map(t => '0x' + t.toString(16).toUpperCase().padStart(2, '0')).join(', '));
        lines.push('');
        lines.push('── JSON 结构化输出（可直接复制使用）──');
        lines.push(JSON.stringify(visibleSprites, null, 1));
    }
    // ── SPR Palette ──
    lines.push('');
    lines.push(_formatPaletteBlock(ppu, 'spr'));
    return lines.join('\n');
}
/**
 * 输出 2 个 Sprite Pattern Table: 16×16 tiles 网格
 *
 * 格子格式: "XXc"
 *   XX = 表内 tile index (hex, 00-FF)
 *   c  = CHR 内容指示:
 *        █ = CHR tile 有内容（非零像素 >= 50%）
 *        ░ = CHR tile 稀疏内容
 *        · = CHR tile 全透明
 *        ! = ptTile 不存在（无 CHR 数据）
 */
function generateSPTDataText(nes) {
    const ppu = nes.ppu;
    const lines = [];
    const COL_HEADER = 'Row ';
    const spTable = ppu.f_spPatternTable ? 1 : 0;
    const spAddr = spTable === 0 ? '$0000' : '$1000';
    const bgAddr = ppu.regS === 0 ? '$0000' : '$1000';
    lines.push(`═══════════════════════════════════════════════════`);
    lines.push(`SPR Pattern Tables (2 × 16×16 tiles = 512 × 8×8 tiles)`);
    lines.push(`SP PT=${spAddr}  BG PT=${bgAddr}  f_spPatternTable=${ppu.f_spPatternTable}`);
    lines.push(`图例: █=有内容  ░=稀疏  ·=全透明  !=无CHR  格式: [tileIdx][CHR内容]`);
    lines.push(`═══════════════════════════════════════════════════`);
    lines.push('');
    for (let tableIdx = 0; tableIdx < 2; tableIdx++) {
        const addr = tableIdx === 0 ? '$0000' : '$1000';
        const role = tableIdx === spTable ? 'SP' : 'BG';
        lines.push(`── Table ${tableIdx} (${addr}, ${role} table) ──`);
        let header = COL_HEADER;
        for (let tx = 0; tx < 16; tx++) {
            header += tx.toString(16).toUpperCase().padStart(3, ' ');
        }
        lines.push(header);
        for (let ty = 0; ty < 16; ty++) {
            const row = [];
            for (let tx = 0; tx < 16; tx++) {
                const tileIdx = tableIdx * 256 + ty * 16 + tx;
                const ptTile = ppu.ptTile[tileIdx];
                const localIdx = ty * 16 + tx;
                const hex = localIdx.toString(16).toUpperCase().padStart(2, '0');
                let chrStatus;
                if (!ptTile || !ptTile.pix) {
                    chrStatus = '!';
                }
                else {
                    let nonZero = 0;
                    for (let i = 0; i < 64; i++) {
                        if (ptTile.pix[i] !== 0)
                            nonZero++;
                    }
                    if (nonZero === 0)
                        chrStatus = '·';
                    else if (nonZero < 32)
                        chrStatus = '\u2591';
                    else
                        chrStatus = '\u2588';
                }
                row.push(hex + chrStatus);
            }
            lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(''));
        }
        lines.push('');
    }
    return lines.join('\n');
}
/** 格式化调色板数据块（紧凑版，供 NT/SPR 文本内嵌使用） */
function _formatPaletteBlock(ppu, type) {
    const vramBase = type === 'bg' ? 0x3F00 : 0x3F10;
    const palSrc = type === 'bg' ? ppu.imgPalette : ppu.sprPalette;
    const lines = [];
    lines.push(`── ${type.toUpperCase()} Palette (VRAM $${vramBase.toString(16).toUpperCase().padStart(4, '0')}-$${(vramBase + 15).toString(16).toUpperCase().padStart(4, '0')}) ──`);
    for (let grp = 0; grp < 4; grp++) {
        const row = [];
        for (let i = 0; i < 4; i++) {
            const slot = grp * 4 + i;
            const addr = (vramBase + slot).toString(16).toUpperCase().padStart(4, '0');
            const rawIdx = ppu.vramMem[vramBase + slot] & 0x3F;
            const color = palSrc[slot];
            const r = (color >>> 16) & 0xFF;
            const g = (color >>> 8) & 0xFF;
            const b = color & 0xFF;
            row.push(`[$${addr}]0x${rawIdx.toString(16).toUpperCase().padStart(2, '0')} #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        }
        lines.push(`  Group ${grp}:  ${row.join('  ')}`);
    }
    return lines.join('\n');
}
