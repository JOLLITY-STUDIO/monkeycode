"use strict";
/**
 * Pattern Table Viewer — 参照 FCEUX ppuViewer (src/drivers/Qt/ppuViewer.cpp)
 *
 * 显示两个图案表 (CHR-ROM / CHR-RAM)，每个 128×128 像素 (16×16 tiles)
 * 支持多种调色板选择查看
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPatternTable = renderPatternTable;
exports.renderBothPatternTables = renderBothPatternTables;
exports.pushChrSwitch = pushChrSwitch;
exports.drainChrSwitchLog = drainChrSwitchLog;
exports.getChrSwitchesInRange = getChrSwitchesInRange;
exports.buildFinalChrBankMap = buildFinalChrBankMap;
exports.buildChrBankMapByScanline = buildChrBankMapByScanline;
exports.renderPatternTableAtScanline = renderPatternTableAtScanline;
exports.renderBothPatternTablesAtScanline = renderBothPatternTablesAtScanline;
exports.generatePTDataText = generatePTDataText;
/**
 * CHR bank 边界线颜色 (每个 1KB slot 的 64-tile 边界)
 * slot 0-7 → 6 种颜色循环
 */
const BANK_BORDER_COLORS = [
    4294918208, // slot0/4: 红
    4282449728, // slot1/5: 绿
    4282401023, // slot2/6: 蓝
    4294953984, // slot3/7: 金
];
/** 在 128×128 的 pattern table 图上画 1KB bank 分隔线 (每 8 tiles = 64px 画一条) */
function drawBankBorders(buf, tableIdx) {
    // 每个 table 有 4 个 1KB slot (16×16 tiles / 4 = 每 4 行 tiles = 32px)
    // slot 边界在 tile row 4, 8, 12 → pixel Y 32, 64, 96
    for (let slot = 1; slot < 4; slot++) {
        const y = slot * 32;
        const color = BANK_BORDER_COLORS[((tableIdx * 4 + slot) - 1) % BANK_BORDER_COLORS.length];
        // 画一条 1px 高的水平线
        for (let x = 0; x < 128; x++) {
            buf[y * 128 + x] = color;
        }
    }
    // 垂直方向: 每个 table 就是一个 block，不画竖线在中间
}
/**
 * 渲染单个图案表
 * 参照 FCEUX ppuPatternView_t::paintEvent():
 * - 16×16 tiles 排列
 * - 每个 tile 8×8 pixels → 128×128 总大小
 * - 用指定的调色板 (前 4 色)
 *
 * @param nes - NES 实例
 * @param tableIdx - 0 (tiles 0-255) 或 1 (tiles 256-511)
 * @param paletteOffset - 使用的调色板偏移 (0-3, 对应 4 色组)
 * @param paletteSrc - 自定义调色板 (256 色)，不传则使用 imgPalette
 */
function renderPatternTable(nes, tableIdx, paletteOffset = 0, paletteSrc) {
    const ppu = nes.ppu;
    const baseTile = tableIdx * 256;
    const buf = new Uint32Array(128 * 128);
    const pal = paletteSrc || ppu.imgPalette;
    const offset = paletteOffset * 4;
    const backdrop = pal[0]; // 背景色 (透明)
    for (let ty = 0; ty < 16; ty++) {
        for (let tx = 0; tx < 16; tx++) {
            const tileIdx = baseTile + ty * 16 + tx;
            const ptTile = ppu.ptTile[tileIdx];
            const baseX = tx * 8;
            const baseY = ty * 8;
            if (ptTile && ptTile.pix) {
                const pix = ptTile.pix;
                for (let py = 0; py < 8; py++) {
                    for (let px = 0; px < 8; px++) {
                        const colIdx = pix[py * 8 + px];
                        buf[(baseY + py) * 128 + (baseX + px)] =
                            colIdx === 0 ? backdrop : (pal[colIdx + offset] ?? backdrop);
                    }
                }
            }
            else {
                // 空 tile — 灰色背景 (参照 FCEUX)
                for (let py = 0; py < 8; py++) {
                    for (let px = 0; px < 8; px++) {
                        buf[(baseY + py) * 128 + (baseX + px)] = 4282664004;
                    }
                }
            }
        }
    }
    // ── 画 CHR 1KB bank 边界线 ──
    drawBankBorders(buf, tableIdx);
    return { data: buf, width: 128, height: 128 };
}
/**
 * 渲染两个图案表 (参照 FCEUX 同时显示两种表)
 * @param palT0 - table0 的自定义调色板，不传则用 imgPalette
 * @param palT1 - table1 的自定义调色板，不传则用 imgPalette
 */
function renderBothPatternTables(nes, paletteOffset = 0, palT0, palT1) {
    return {
        table0: renderPatternTable(nes, 0, paletteOffset, palT0),
        table1: renderPatternTable(nes, 1, paletteOffset, palT1),
        bgTable: (nes.ppu.f_bgPatternTable ? 1 : 0),
        spTable: (nes.ppu.f_spPatternTable ? 1 : 0),
    };
}
/** 全局 CHR 切换日志（dump 工具写入，viewer 只读） */
const chrSwitchLog = [];
/** 推入一条切换记录（由 mapper 在 load1kVromBank 时调用） */
function pushChrSwitch(rec) {
    chrSwitchLog.push(rec);
}
/** 取并清空切换日志（dump 工具用） */
function drainChrSwitchLog() {
    const out = chrSwitchLog.slice();
    chrSwitchLog.length = 0;
    return out;
}
/** 按 scanline 范围取切换日志（不消费） */
function getChrSwitchesInRange(scanStart, scanEnd) {
    return chrSwitchLog.filter(r => r.scanline >= scanStart && r.scanline < scanEnd);
}
/** 把所有 switches 重放成"最终 banks"（忽略 scanline 分组），用于 H5 不区分 scanline 的场景 */
function buildFinalChrBankMap(switches, initialBanks) {
    const banks = new Uint8Array(initialBanks);
    for (const r of switches) {
        banks[r.slot] = r.bank1k & 0xff;
    }
    return banks;
}
/**
 * 把 [scanStart, scanEnd) 的 chrSwitchLog 重放成"每条 scanline 用的 8 个 1KB slot bank1k"表
 * 返回：Map<scanline, Uint8Array(8)>
 * 初始值 = 上一 scanline 的 bank map（最后切换沿用）
 */
function buildChrBankMapByScanline(switches, initialBanks) {
    const out = new Map();
    let banks = new Uint8Array(initialBanks);
    let curScan = -1;
    for (const r of switches) {
        if (r.scanline !== curScan) {
            if (curScan >= 0)
                out.set(curScan, new Uint8Array(banks));
            curScan = r.scanline;
        }
        banks[r.slot] = r.bank1k & 0xff;
    }
    if (curScan >= 0)
        out.set(curScan, new Uint8Array(banks));
    return out;
}
/**
 * 渲染指定 scanline 的 PT 视图（用该 scanline 激活的 8 个 1KB slot，从 ROM vromTile 取）
 * 跟 renderPatternTable 输出尺寸/格式一致，但 tile 数据来自 ROM 而非 ppu.ptTile 缓存
 *
 * @param nes         NES 实例
 * @param tableIdx    0 或 1（对应 $0000/$1000）
 * @param slotBanks   8 个 1KB slot 的 bank1k 编号（slot 0-7）
 * @param paletteOffset 同 renderPatternTable
 */
function renderPatternTableAtScanline(nes, tableIdx, slotBanks, paletteOffset = 0) {
    const ppu = nes.ppu;
    const buf = new Uint32Array(128 * 128);
    const pal = ppu.imgPalette;
    const offset = paletteOffset * 4;
    const backdrop = pal[0];
    const vromTile = nes.rom && nes.rom.vromTile;
    const slotBase = tableIdx * 4; // table0 用 slot 0-3，table1 用 slot 4-7
    for (let ty = 0; ty < 16; ty++) {
        for (let tx = 0; tx < 16; tx++) {
            const slot = slotBase + (ty >> 2); // ty / 4 决定 slot
            const tileInSlot = ((ty & 3) * 16) + tx;
            const bank1k = slotBanks[slot];
            const baseX = tx * 8, baseY = ty * 8;
            let tile = null;
            if (vromTile && bank1k != null) {
                const bank4k = (bank1k / 4) | 0;
                const offIn4k = (bank1k % 4) * 64 + tileInSlot;
                tile = vromTile[bank4k] ? vromTile[bank4k][offIn4k] : null;
            }
            if (tile && tile.pix) {
                const pix = tile.pix;
                for (let py = 0; py < 8; py++) {
                    for (let px = 0; px < 8; px++) {
                        const ci = pix[py * 8 + px];
                        buf[(baseY + py) * 128 + (baseX + px)] =
                            ci === 0 ? backdrop : (pal[ci + offset] ?? backdrop);
                    }
                }
            }
            else {
                for (let py = 0; py < 8; py++) {
                    for (let px = 0; px < 8; px++) {
                        buf[(baseY + py) * 128 + (baseX + px)] = 4282664004;
                    }
                }
            }
        }
    }
    drawBankBorders(buf, tableIdx);
    return { data: buf, width: 128, height: 128 };
}
/** 渲染指定 scanline 的双 PT 视图（table0+table1 横排 256×128） */
function renderBothPatternTablesAtScanline(nes, slotBanks, paletteOffset = 0) {
    return {
        table0: renderPatternTableAtScanline(nes, 0, slotBanks, paletteOffset),
        table1: renderPatternTableAtScanline(nes, 1, slotBanks, paletteOffset),
        bgTable: (nes.ppu.f_bgPatternTable ? 1 : 0),
        spTable: (nes.ppu.f_spPatternTable ? 1 : 0),
    };
}
/**
 * 生成 PT 数据文本：
 * - 两个 Pattern Table (16×16 tiles) 的 CHR 内容状态 + CHR bank 映射
 * - 格式参照 generateSPTDataText，额外加上每 1KB slot 对应的 CHR bank index
 */
function generatePTDataText(nes, frameCount) {
    const ppu = nes.ppu;
    if (!ppu)
        return '';
    // 从 mapper 获取当前 CHR bank 映射 (NES 实例用 mmap 属性名)
    const mapper = nes.mmap;
    const isMmc1 = mapper && typeof mapper.vromSwitchingSize === 'number';
    // MMC3 风格: 8 个 1KB slot
    const chrBanks = mapper && mapper.chrBanks
        ? Array.from(mapper.chrBanks)
        : null;
    const lines = [];
    const COL_HEADER = 'Row ';
    const spTable = ppu.f_spPatternTable ? 1 : 0;
    const spAddr = spTable === 0 ? '$0000' : '$1000';
    const bgAddr = ppu.regS === 0 ? '$0000' : '$1000';
    lines.push(`══════════════════════════════════════════════════════════════`);
    lines.push(`Frame: #${frameCount ?? '?'}  |  Pattern Tables  (BG PT=${bgAddr}  SP PT=${spAddr})`);
    // ── MMC1 CHR bank 映射 ──
    if (isMmc1) {
        const modeStr = mapper.vromSwitchingSize === 0 ? '8KB' : '4KB';
        lines.push(`MMC1 CHR: ${modeStr} mode  (vromSwitchingSize=${mapper.vromSwitchingSize})`);
        lines.push(`  Table0 ($0000-$0FFF) → 4KB CHR bank #${String(mapper.chrBank4k_0000 ?? '?').padStart(2)}  [Reg 1: $0000]`);
        lines.push(`  Table1 ($1000-$1FFF) → 4KB CHR bank #${String(mapper.chrBank4k_1000 ?? '?').padStart(2)}  [Reg 2: $1000]`);
    }
    else if (chrBanks) {
        // MMC3 风格: 8 个 1KB slot
        lines.push(`CHR 1KB bank mapping:`);
        lines.push(`  Table0 ($0000): B0=#${String(chrBanks[0]).padStart(2)}  B1=#${String(chrBanks[1]).padStart(2)}  B2=#${String(chrBanks[2]).padStart(2)}  B3=#${String(chrBanks[3]).padStart(2)}`);
        lines.push(`  Table1 ($1000): B4=#${String(chrBanks[4]).padStart(2)}  B5=#${String(chrBanks[5]).padStart(2)}  B6=#${String(chrBanks[6]).padStart(2)}  B7=#${String(chrBanks[7]).padStart(2)}`);
    }
    else {
        lines.push(`CHR banks: (no mapper info available)`);
    }
    lines.push(`图例: █=有内容  ░=稀疏  ·=全透明  !=无CHR  格式: bank:offset  边界色: 红/绿/蓝/金=4个1KB slot分界`);
    lines.push(`══════════════════════════════════════════════════════════════`);
    lines.push('');
    const BANK_BORDER_LABELS_DESK = ['▲ B0', '▲ B1', '▲ B2'];
    const BANK_BORDER_LABELS_TBL1 = ['▲ B4', '▲ B5', '▲ B6'];
    const SEP_WIDTH = 81; // 16 cols × 5 chars
    for (let tableIdx = 0; tableIdx < 2; tableIdx++) {
        const addr = tableIdx === 0 ? '$0000' : '$1000';
        const role = tableIdx === spTable ? 'SP' : 'BG';
        const borderLabels = tableIdx === 0 ? BANK_BORDER_LABELS_DESK : BANK_BORDER_LABELS_TBL1;
        const slotBase = tableIdx * 4;
        const labels = [];
        for (let ty = 0; ty <= 16; ty++) {
            if (ty === 4)
                labels.push(borderLabels[0]);
            else if (ty === 8)
                labels.push(borderLabels[1]);
            else if (ty === 12)
                labels.push(borderLabels[2]);
            else if (ty === 0 || ty === 16)
                labels.push('─'.repeat(SEP_WIDTH));
            else
                labels.push('');
        }
        lines.push(`── Table ${tableIdx} (${addr}, ${role})  slots=${slotBase}~${slotBase + 3} ──`);
        let header = COL_HEADER;
        for (let tx = 0; tx < 16; tx++) {
            header += '  ' + tx.toString(16).toUpperCase().padStart(3, ' ');
        }
        lines.push(header);
        for (let ty = 0; ty < 16; ty++) {
            if (labels[ty])
                lines.push(`     ${labels[ty]}`);
            const slot = Math.floor(ty / 4);
            const bankId = chrBanks ? chrBanks[slotBase + slot] : null;
            const bankStr = bankId != null ? bankId.toString(16).toUpperCase().padStart(2, '0') : '??';
            const row = [];
            for (let tx = 0; tx < 16; tx++) {
                const tileIdx = tableIdx * 256 + ty * 16 + tx;
                const ptTile = ppu.ptTile[tileIdx];
                const offset = (ty % 4) * 16 + tx;
                const offStr = offset.toString(16).toUpperCase().padStart(2, '0');
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
                row.push(bankStr + ':' + offStr + chrStatus);
            }
            lines.push(ty.toString().padStart(3, ' ') + ' ' + row.join(''));
        }
        lines.push('');
        lines.push('');
    }
    return lines.join('\n');
}
