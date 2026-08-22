"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsubasa2 = exports.DataStore = exports.PRG = exports.CHR_BANK_COUNT = exports.CHR_BANK_SIZE = exports.CHR_BANKS = exports.NES_CHR_ROM = exports.Mirroring = exports.CONFIG = exports.HEADER = void 0;
exports.countNtNonZero = countNtNonZero;
exports.rgbToNearestIndex = rgbToNearestIndex;
exports.writePalettes = writePalettes;
exports.writeOam = writeOam;
exports.writeScroll = writeScroll;
exports.writeBootChrPatterns = writeBootChrPatterns;
exports.writeStoreToPpu = writeStoreToPpu;
exports.writeApuToPapu = writeApuToPapu;
const GameSystemService_1 = require("./prg/code/system/GameSystemService");
const BootRouter_1 = require("./prg/code/system/BootRouter");
const InterruptService_1 = require("./prg/code/system/InterruptService");
const HardwareInitService_1 = require("./prg/code/system/HardwareInitService");
const SkillService_1 = require("./prg/code/skill/SkillService");
const AudioService_1 = require("./prg/code/audio/AudioService");
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
/** 统计 NT 网格非零 tile 数 (调试用) */
function countNtNonZero(nt) {
    let n = 0;
    for (let y = 0; y < 30; y++) {
        const row = nt[y];
        if (!row)
            continue;
        for (let x = 0; x < 32; x++) {
            if (row[x] && row[x].tile !== 0)
                n++;
        }
    }
    return n;
}
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
            const p00 = (_c = (_b = (_a = nt[y0]) === null || _a === void 0 ? void 0 : _a[x0]) === null || _b === void 0 ? void 0 : _b.palette) !== null && _c !== void 0 ? _c : 0;
            const p01 = (_f = (_e = (_d = nt[y0]) === null || _d === void 0 ? void 0 : _d[x1]) === null || _e === void 0 ? void 0 : _e.palette) !== null && _f !== void 0 ? _f : 0;
            const p10 = (_j = (_h = (_g = nt[y1]) === null || _g === void 0 ? void 0 : _g[x0]) === null || _h === void 0 ? void 0 : _h.palette) !== null && _j !== void 0 ? _j : 0;
            const p11 = (_m = (_l = (_k = nt[y1]) === null || _k === void 0 ? void 0 : _k[x1]) === null || _l === void 0 ? void 0 : _l.palette) !== null && _m !== void 0 ? _m : 0;
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
/** 直写 OAM: ram_0200 硬件 OAM (ShadowOam.copyToHw 产物) → ppu.spriteMem */
function writeOam(store, ppu) {
    for (let i = 0; i < 0x100; i++) {
        ppu.spriteMem[i] = store.read(0x0200 + i);
    }
}
/** 直写滚动: store.scrollX/Y (pixel) → PPU 滚动寄存器 (regV/regH/regVT/regHT) */
function writeScroll(store, ppu) {
    const sx = store.scrollX & 0xff;
    const sy = store.scrollY & 0xff;
    ppu.regHT = (sx >> 3) & 31; // 水平 tile
    ppu.regH = sx & 7; // 水平 fine
    ppu.regVT = (sy >> 3) & 31; // 垂直 tile
    ppu.regV = sy & 1; // 垂直 fine (简化)
    ppu.cntHT = ppu.regHT;
    ppu.cntH = ppu.regH;
    ppu.cntVT = ppu.regVT;
    ppu.cntV = ppu.regV;
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
    // 水平镜像 (ntable1=[0,0,1,1]): $2400-$27BF 映射 nameTable[0] (与 $2000 同一物理 NT)。
    // 若把 nt1 写到 $2400, 空 nt1 会清掉刚填充的 NT0 → 黑屏。
    // 正确目标: $2800 (物理 NT B, ntable1[2]=1 → nameTable[1])。
    writeNameTable(ppu, 0x2800, store.nt1);
    writePalettes(ppu, store.paletteTable);
    writeOam(store, ppu);
    writeScroll(store, ppu);
    writeBootChrPatterns(ppu);
}
/** 直写 APU: DataStore apu_XXXX → tsnes PAPU writeReg */
function writeApuToPapu(store, papu) {
    for (let addr = 0x4000; addr <= 0x4017; addr++) {
        const key = `apu_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
        const val = store.read(key);
        if (val !== undefined && val >= 0) {
            papu.writeReg(addr, val & 0xff);
        }
    }
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
        this.skill = new SkillService_1.SkillService(this.store, this.system);
        this.interrupts = new InterruptService_1.InterruptService(this.store, this.system);
        this.audio = new AudioService_1.AudioService(this.store);
        this.hardware = new HardwareInitService_1.HardwareInitService(this.store, this.system, this.router, this.skill);
        // 注入 bank30 引用到 GameSystemService, 供 $C5xx 派发表转发
        this.system.setHardwareInit(this.hardware);
        // 注入 bank02 NMI 渲染执行器到 InterruptService, 每帧 NMI 回放 $05E8 PPU buffer
        this.interrupts.attachRouter(this.router);
    }
    /** 启动: RESET → 硬件初始化 → resetScene(0) → 进入场景 (走正常场景装载流程) */
    boot() {
        this._frame = 0;
        this.store.reset();
        this.interrupts.reset();
        this.hardware.init();
        // BOOT 场景走正常 sceneLoad 流程 (GameSystemService.sceneLoad + NMI 回调),
        // 不再用模拟器 dump 的预存快照 (已删除 boot-scene.ts/OpeningSceneController)。
        console.log(`[Tsubasa2] boot() done. nt0=${countNtNonZero(this.store.nt0)}` +
            ` nt1=${countNtNonZero(this.store.nt1)} scrollX=${this.store.scrollX}` +
            ` scrollY=${this.store.scrollY} ram_00ED=${this.store.read('ram_00ED')}`);
    }
    /** 每帧: NMI 推进游戏逻辑 → 直写 PPU 渲染内存 → PPU 扫描线渲染 */
    frame(nes) {
        this.interrupts.nmi(this._frame);
        // AudioService 每帧推进 (bank12 音频引擎 update: 读 $0700 请求队列, 写 $4000-$400F APU 寄存器)
        this.audio.update();
        writeStoreToPpu(this.store, nes.ppu);
        // APU 同步: DataStore apu_XXXX → tsnes PAPU writeReg
        if (nes.papu) {
            writeApuToPapu(this.store, nes.papu);
        }
        nes.frame();
        // NES.frame() 走 endScanline 循环, 不触发 VBlank set/endFrame (原由 advanceDots 触发);
        // 组合根补一次 startVBlank → endFrame → ui.writeFrame (onFrame 回调 → Canvas)
        nes.ppu.startVBlank();
        this._frame++;
        // 调试日志: 每 30 帧输出渲染数据摘要 (黑屏排查用, 微信开发者工具控制台可观察)
        if (this._frame % 30 === 0) {
            const ppu = nes.ppu;
            const buf = ppu.buffer;
            let nz = 0;
            for (let i = 0; i < buf.length; i++)
                if (buf[i] !== 0)
                    nz++;
            console.log(`[Tsubasa2] frame=${this._frame} nt0=${countNtNonZero(this.store.nt0)}` +
                ` nt1=${countNtNonZero(this.store.nt1)} bgVis=${ppu.f_bgVisibility}` +
                ` sprVis=${ppu.f_spVisibility} bufNonZero=${nz}` +
                ` scrollX=${this.store.scrollX} scrollY=${this.store.scrollY}` +
                ` ram_0538=${this.store.read('ram_0538')}`);
        }
    }
}
exports.Tsubasa2 = Tsubasa2;
exports.default = Tsubasa2;
