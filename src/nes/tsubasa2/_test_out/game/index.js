"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = exports.DataStore = exports.PRG = exports.CHR_BANK_COUNT = exports.CHR_BANK_SIZE = exports.CHR_BANKS = exports.NES_CHR_ROM = exports.Mirroring = exports.CONFIG = exports.HEADER = void 0;
exports.rgbToNearestIndex = rgbToNearestIndex;
exports.writePalettes = writePalettes;
exports.writeOam = writeOam;
exports.writeScroll = writeScroll;
exports.writeBootChrPatterns = writeBootChrPatterns;
exports.writeStoreToPpu = writeStoreToPpu;
const GameSystemService_1 = require("./prg/code/system/GameSystemService");
const BootRouter_1 = require("./prg/code/system/BootRouter");
const InterruptService_1 = require("./prg/code/system/InterruptService");
const HardwareInitService_1 = require("./prg/code/system/HardwareInitService");
const SkillService_1 = require("./prg/code/skill/SkillService");
// 小程序编译器对 `export *` re-export 支持有限, 改为先 import 再 export (与 src/index.ts 一致)
const header_1 = require("./header");
Object.defineProperty(exports, "HEADER", { enumerable: true, get: function () { return header_1.HEADER; } });
Object.defineProperty(exports, "CONFIG", { enumerable: true, get: function () { return header_1.CONFIG; } });
Object.defineProperty(exports, "Mirroring", { enumerable: true, get: function () { return header_1.Mirroring; } });
const index_1 = require("./chr/index");
Object.defineProperty(exports, "NES_CHR_ROM", { enumerable: true, get: function () { return index_1.NES_CHR_ROM; } });
Object.defineProperty(exports, "CHR_BANKS", { enumerable: true, get: function () { return index_1.CHR_BANKS; } });
Object.defineProperty(exports, "CHR_BANK_SIZE", { enumerable: true, get: function () { return index_1.CHR_BANK_SIZE; } });
Object.defineProperty(exports, "CHR_BANK_COUNT", { enumerable: true, get: function () { return index_1.CHR_BANK_COUNT; } });
const rom_1 = require("./rom");
Object.defineProperty(exports, "PRG", { enumerable: true, get: function () { return rom_1.PRG; } });
const DataStore_1 = require("./prg/data/store/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
// ═══════════════════════════════════════════════════════════
// 直写函数 — "直接写内存": DataStore 结构化数据 → PPU 渲染内存字节
// ═══════════════════════════════════════════════════════════
/** RGB → 最近 NTSC 索引 (0-63), 基于 ppu.palTable.curTable (0xRRGGBB) */
function rgbToNearestIndex(curTable, r, g, b) {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < 64; i++) {
        const c = curTable[i];
        const dr = ((c >> 16) & 0xff) - r;
        const dg = ((c >> 8) & 0xff) - g;
        const db = (c & 0xff) - b;
        const d = dr * dr + dg * dg + db * db;
        if (d < bestD) {
            bestD = d;
            best = i;
        }
    }
    return best;
}
/** 写一个 NT (960 tile + 64 属性字节) 到 PPU VRAM ($2000/$2400 基址) */
function writeNameTable(ppu, base, nt) {
    for (let y = 0; y < 30; y++) {
        const row = nt[y];
        if (!row)
            continue;
        for (let x = 0; x < 32; x++) {
            ppu.writeMem(base + y * 32 + x, row[x].tile & 0xff);
        }
    }
    // 属性表: 每字节 = 4×4 tiles 的 4 个 2bit 调色板 (NES 布局)
    for (let ay = 0; ay < 8; ay++) {
        const y0 = ay * 4;
        const y1 = y0 + 2;
        for (let ax = 0; ax < 8; ax++) {
            const x0 = ax * 4;
            const x1 = x0 + 2;
            const p00 = nt[y0]?.[x0]?.palette ?? 0;
            const p01 = nt[y0]?.[x1]?.palette ?? 0;
            const p10 = nt[y1]?.[x0]?.palette ?? 0;
            const p11 = nt[y1]?.[x1]?.palette ?? 0;
            const v = (p00 & 3) | ((p01 & 3) << 2) | ((p10 & 3) << 4) | ((p11 & 3) << 6);
            ppu.writeMem(base + 0x3c0 + ay * 8 + ax, v);
        }
    }
}
/**
 * 直写调色板 — palWriteAll 语义 (注释要求的实现):
 * DataStore.paletteTable (RGB) → NTSC 索引 → ppu.writeMem($3F00-$3F1F)。
 * writeMem 在 $3F00 区触发 updatePalettes() → imgPalette/sprPalette。
 */
function writePalettes(ppu, paletteTable) {
    const cur = ppu.palTable.curTable;
    const bg = paletteTable.bgPalettes;
    const spr = paletteTable.sprPalettes;
    for (let p = 0; p < 4; p++) {
        const bpc = bg[p].colors;
        const spc = spr[p].colors;
        for (let c = 0; c < 4; c++) {
            ppu.writeMem(0x3f00 + p * 4 + c, rgbToNearestIndex(cur, bpc[c].r, bpc[c].g, bpc[c].b));
            ppu.writeMem(0x3f10 + p * 4 + c, rgbToNearestIndex(cur, spc[c].r, spc[c].g, spc[c].b));
        }
    }
}
/** 直写 OAM: ram_0200 硬件 OAM (ShadowOam.copyToHw 产物) → ppu.oamStore */
function writeOam(store, ppu) {
    for (let i = 0; i < 0x100; i++) {
        ppu.oamStore.set(i, store.read(0x0200 + i));
    }
}
/** 直写滚动: store.scrollX/Y (pixel) → PPU 滚动寄存器 (fine/tile/nt) */
function writeScroll(store, ppu) {
    const sx = store.scrollX & 0xff;
    const sy = store.scrollY & 0xff;
    const ss = ppu.scrollStore;
    ss.set('h_fine', sx & 7);
    ss.set('h_tile', (sx >> 3) & 31);
    ss.set('h_nt', (sx >> 8) & 1);
    ss.set('v_fine', sy & 7);
    ss.set('v_tile', (sy >> 3) & 31);
    ss.set('v_nt', (sy >> 8) & 1);
}
/**
 * 直写 BOOT 精灵 CHR pattern → PPU pattern table 1 (ptTile[0x100+tile])。
 * MMC3 映射 (去 CPU 化等价): SPR table=1, tile 0x40-0x7F → CHR bank 14,
 * tile 0xC0-0xFF → CHR bank 10。
 * 注意: BOOT_SPR_CHR_SEGMENTS 已删除 (模拟器 dump 数据), CHR pattern 由正常 CHR bank 切换管理。
 */
function writeBootChrPatterns(_ppu) {
    // 去CPU化: CHR pattern 由 mapper4 CHR bank 配置管理, 不再直写
}
/** 全量直写: DataStore → PPU 渲染内存 (CTRL/MASK/NT/调色板/OAM/滚动/精灵pattern) */
function writeStoreToPpu(store, ppu) {
    // PPU $2000/$2001 寄存器直写 (去 CPU 化后 CPU 写寄存器触发 updateControlReg 的等价):
    // ram_0020=PPU CTRL (NMI/精灵尺寸/背景图案表), ram_0021=PPU MASK (背景/精灵可见性)
    ppu.updateControlReg1(store.read('ram_0020'));
    ppu.updateControlReg2(store.read('ram_0021'));
    writeNameTable(ppu, 0x2000, store.nt0);
    writeNameTable(ppu, 0x2400, store.nt1);
    writePalettes(ppu, store.paletteTable);
    writeOam(store, ppu);
    writeScroll(store, ppu);
    writeBootChrPatterns(ppu);
}
// ═══════════════════════════════════════════════════════════
// Tsubasa2 — 组合根 (主类)
// ═══════════════════════════════════════════════════════════
class Tsubasa2 {
    constructor() {
        /** 帧计数 (NMI 帧号) */
        this._frame = 0;
        this.store = new DataStore_1.DataStore();
        this.system = new GameSystemService_1.GameSystemService(this.store);
        this.router = new BootRouter_1.BootRouter(this.store);
        this.skill = new SkillService_1.SkillService(this.store);
        this.interrupts = new InterruptService_1.InterruptService(this.store, this.system);
        this.hardware = new HardwareInitService_1.HardwareInitService(this.store, this.system, this.router, this.skill);
    }
    /** 启动: RESET → 硬件初始化 → resetScene(0) → 进入场景 (走正常场景装载流程) */
    boot() {
        this._frame = 0;
        this.store.reset();
        this.interrupts.reset();
        this.hardware.init();
        // BOOT 场景走正常 sceneLoad 流程 (GameSystemService.sceneLoad + NMI 回调),
        // 不再用模拟器 dump 的预存快照 (已删除 boot-scene.ts/OpeningSceneController)。
    }
    /** 每帧: NMI 推进游戏逻辑 → 直写 PPU 渲染内存 → PPU 扫描线渲染 */
    frame(nes) {
        this.interrupts.nmi(this._frame);
        writeStoreToPpu(this.store, nes.ppu);
        nes.frame();
        // NES.frame() 走 endScanline 循环, 不触发 VBlank set/endFrame (原由 advanceDots 触发);
        // 组合根补一次 startVBlank → endFrame → ui.writeFrame (onFrame 回调 → Canvas)
        nes.ppu.startVBlank();
        this._frame++;
    }
}
exports.Tsubasa2 = Tsubasa2;
exports.default = Tsubasa2;
