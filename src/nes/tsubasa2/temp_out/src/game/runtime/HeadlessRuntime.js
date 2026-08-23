"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlessRuntime = void 0;
/**
 * HeadlessRuntime — 无头运行平台（核心 PPU 复用，不跑 CPU）
 *
 * 提供：
 *  - headless PPU（256×240 帧缓冲，直接驱动扫描线渲染）
 *  - CHR pattern 装载（初始 MMC3 配置，真实渲染基础）
 *  - 两套核心控制器（buttonDown/buttonUp）
 *
 * 用法（即插即用）：
 *   const runtime = new HeadlessRuntime();
 *   const game = new Tsubasa2();
 *   game.boot();
 *   runtime.setButton(1, Button.A, true); // 按下 A
 *   runtime.frame(game);                  // 跑一帧 → runtime.ppu.buffer 可绘制
 */
const index_1 = __importDefault(require("../../core/ppu/index"));
const tile_1 = __importDefault(require("../../core/tile"));
const controller_1 = __importDefault(require("../../core/controller"));
const mapper4_1 = __importDefault(require("../../core/mappers/mapper4"));
const index_2 = require("../chr/index");
/** MMC3 初始 CHR bank 配置（bank30 INIT_CHR，$C9E9 语义；V0.3 对照 asm 复核） */
const INIT_CHR_BANKS = [
    { bank1k: 4, addr: 0x0000 }, // BG 表 0, tile 0x00-0x3F
    { bank1k: 5, addr: 0x0400 }, // BG 表 0, tile 0x40-0x7F
    { bank1k: 6, addr: 0x0800 }, // BG 表 0, tile 0x80-0xBF
    { bank1k: 7, addr: 0x0c00 }, // BG 表 0, tile 0xC0-0xFF
    { bank1k: 14, addr: 0x1000 }, // SPR 表 1, tile 0x00-0x3F
    { bank1k: 10, addr: 0x1400 }, // SPR 表 1, tile 0x40-0x7F
    { bank1k: 14, addr: 0x1800 }, // SPR 表 1, tile 0x80-0xBF
    { bank1k: 10, addr: 0x1c00 }, // SPR 表 1, tile 0xC0-0xFF
];
/** 从 CHR_BANKS（16×8KB）构建核心 ROM 的 vrom（32×4KB）与 vromTile */
function buildChrRom() {
    var _a;
    const vrom = [];
    const vromTile = [];
    for (let b = 0; b < 16; b++) {
        const bank8k = index_2.CHR_BANKS[b];
        for (let half = 0; half < 2; half++) {
            const start = half * 4096;
            const bank4k = new Uint8Array(4096);
            for (let i = 0; i < 4096; i++)
                bank4k[i] = (_a = bank8k[start + i]) !== null && _a !== void 0 ? _a : 0xff;
            vrom.push(bank4k);
            // 构建 256 个 Tile（与 core ROM.load 相同的 setScanline 逻辑）
            const tiles = [];
            for (let t = 0; t < 256; t++)
                tiles.push(new tile_1.default());
            for (let i = 0; i < 4096; i++) {
                const tileIndex = i >> 4;
                const leftOver = i % 16;
                if (leftOver < 8) {
                    tiles[tileIndex].setScanline(leftOver, bank4k[i], bank4k[i + 8]);
                }
                else {
                    tiles[tileIndex].setScanline(leftOver - 8, bank4k[i - 8], bank4k[i]);
                }
            }
            vromTile.push(tiles);
        }
    }
    return { vrom, vromTile, vromCount: 32 };
}
class HeadlessRuntime {
    constructor() {
        this.controllers = { 1: new controller_1.default(), 2: new controller_1.default() };
        const chr = buildChrRom();
        // 最小 nes 骨架（仅满足 PPU/Mapper4 读依赖，CPU 不运行）
        const nes = {
            rom: Object.assign(Object.assign({ HORIZONTAL_MIRRORING: 1, VERTICAL_MIRRORING: 0, FOURSCREEN_MIRRORING: 2, SINGLESCREEN_MIRRORING: 3, SINGLESCREEN_MIRRORING2: 4, SINGLESCREEN_MIRRORING3: 5, SINGLESCREEN_MIRRORING4: 6, CHRROM_MIRRORING: 7 }, chr), { romCount: 16, batteryRam: null, valid: true, rom: [] }),
            cpu: {
                mem: new Uint8Array(0x10000),
                dataBus: 0,
                nmiRaised: false,
                nmiRaisedAtCycle: 0,
                instrBusCycles: 0,
                nmiDotsRemainingInStep: 0,
                requestIrq: () => { },
            },
            mmap: null,
            ui: { writeFrame: () => { }, updateStatus: () => { } },
            controllers: this.controllers,
            opts: {},
            ppu: null,
        };
        this.nes = nes;
        const ppu = new index_1.default(nes);
        // 镜像设置（真实 header：Horizontal；core 常量 HORIZONTAL_MIRRORING=1）
        ppu.setMirroring(nes.rom.HORIZONTAL_MIRRORING);
        this.ppu = ppu;
        nes.ppu = ppu;
        this.mapper = new mapper4_1.default(nes);
        nes.mmap = this.mapper;
        // 初始 CHR 装载（真实渲染基础）
        this.loadInitChr();
    }
    /** 初始 MMC3 CHR bank 配置装载 */
    loadInitChr() {
        for (const e of INIT_CHR_BANKS) {
            this.mapper.load1kVromBank(e.bank1k, e.addr);
        }
    }
    /** 按控制器/按钮设置按下/松开（core Controller 语义） */
    setButton(controllerId, button, down) {
        const c = this.controllers[controllerId];
        if (down)
            c.buttonDown(button);
        else
            c.buttonUp(button);
    }
    /** 跑一帧（游戏逻辑 + PPU 扫描线渲染），渲染结果在 ppu.buffer */
    frame(game) {
        game.frame(this);
    }
}
exports.HeadlessRuntime = HeadlessRuntime;
