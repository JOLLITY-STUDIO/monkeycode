/**
 * HeadlessRuntime — 无头运行平台（CHR 装载改用具名 slot map）
 *
 * 翻译原则（v2）：
 *   - 移除 Mapper4 / MMC3 / load1kVromBank 的硬件窗口仿真
 *   - CHR 装载用声明式 CHR_SLOT_MAP：每个 PPU 1KB slot 直接指定 CHR bank1k
 *   - 不再走 MMC3 R6/R7 寄存器切换语义（H5 无此语义）
 *
 * 用法（即插即用）：
 *   const runtime = new HeadlessRuntime();
 *   const game = new Tsubasa2();
 *   game.boot();
 *   runtime.setButton(1, Button.A, true);
 *   runtime.frame(game);
 */
import PPU from '../../core/ppu/index';
import Tile from '../../core/tile';
import Controller from '../../core/controller';
import { CHR_BANKS } from '../chr/index';
/**
 * 初始 CHR 装载（替代原 INIT_CHR_BANKS 表）
 * 按 PPU 地址直接分配（每个 1KB slot = 64 tile）：
 *   BG $0000 = bank1k 0..3 / SPR $1000 = bank1k 124..127
 *
 * 实际游戏通过 InterruptService.applyChrRequest / applyChrFrom009e 会动态重写这些。
 * 这里的 bank1k 编号取模 128（CHR ROM 总大小 = 128KB = 16 bank × 8KB），\n * 越界值（如原 252/113/82/83）会被取模映射到 ROM 实际范围内。\n */
const CHR_SLOT_MAP = [
    { slot: 0, bank1k: 0 }, // BG $0000, tile 0x00-0x3F
    { slot: 1, bank1k: 1 }, // BG $0400, tile 0x40-0x7F
    { slot: 2, bank1k: 2 }, // BG $0800, tile 0x80-0xBF
    { slot: 3, bank1k: 3 }, // BG $0C00, tile 0xC0-0xFF
    { slot: 4, bank1k: 124 }, // SPR $1000, tile 0x00-0x3F
    { slot: 5, bank1k: 125 }, // SPR $1400, tile 0x40-0x7F
    { slot: 6, bank1k: 126 }, // SPR $1800, tile 0x80-0xBF
    { slot: 7, bank1k: 127 }, // SPR $1C00, tile 0xC0-0xFF
];
/** 从 CHR_BANKS（16×8KB）构建核心 ROM 的 vrom（32×4KB）与 vromTilesByBank1k（256 slot × 64 tile） */
function buildChrRom() {
    const vrom = [];
    /** 256 个 1KB slot，每个 64 tile（按原版 bank1k 编号 0-255 直查） */
    const vromTilesByBank1k = [];
    for (let slot = 0; slot < 256; slot++) {
        const arr = [];
        for (let t = 0; t < 64; t++)
            arr.push(new Tile());
        vromTilesByBank1k.push(arr);
    }
    /**
     * 把 bank8k 内 byte 区间 [offset, offset+length) 解码为 tile 写入 vromTilesByBank1k。
     * 每个 tile 16 byte：前 8 byte = plane0（行 0-7），后 8 byte = plane1（行 0-7）。
     * 1KB slot 装 64 tile；8KB bank 装 8 个连续 bank1k。
     */
    const feed = (bank8k, bankBase8k, // bank8k 在全局 bank1k 编号空间的起始偏移（按 1KB 为单位）
    subOffset, // bank8k 内的字节偏移（0..8192）
    length) => {
        // 每 16 字节一个 tile（plane0 = 前 8 byte，plane1 = 后 8 byte）
        for (let i = 0; i < length; i += 16) {
            const absPos = subOffset + i; // bank8k 内 tile 起始字节
            const slot = bankBase8k + (absPos >> 10); // (absPos/1024) → bank1k 编号
            const tileInSlot = ((absPos & 0x3ff) >> 4) & 0x3f; // (absPos%1024)/16 → 64 tile 索引
            const t = vromTilesByBank1k[slot][tileInSlot];
            // 一次写入整个 tile 的 8 行（plane0[i] + plane1[i] 对应行 i）
            t.initialized = true;
            for (let row = 0; row < 8; row++) {
                t.setScanline(row, bank8k[absPos + row], bank8k[absPos + row + 8]);
            }
        }
    };
    for (let b = 0; b < 16; b++) {
        const bank8k = CHR_BANKS[b];
        // 8KB → 2 × 4KB vrom（保留给 core ROM）
        for (let half = 0; half < 2; half++) {
            const start = half * 4096;
            const bank4k = new Uint8Array(4096);
            for (let i = 0; i < 4096; i++)
                bank4k[i] = bank8k[start + i] ?? 0xff;
            vrom.push(bank4k);
        }
        // 8KB → 8 × 1KB，按 bank1k 全局编号排列（bank b 的起始 bank1k = b * 8）
        const bankBase8k = b * 8;
        feed(bank8k, bankBase8k, 0, 8192);
    }
    return { vrom, vromTilesByBank1k, vromCount: 32 };
}
export class HeadlessRuntime {
    constructor() {
        /** bank1k → 256 个 Tile（供 loadChrSlot 直接写入 ppu.ptTile） */
        this.vromTilesByBank1k = [];
        /** 当前装载到 PPU 8 slot 的 bank1k（用于变更检测） */
        this.chrSlots = new Array(8).fill(-1);
        /** 本帧 per-scanline CHR 切换计划（sceneId=100 Opening 逐帧 GT 驱动） */
        this.perScanlineChrPlan = [];
        this.controllers = { 1: new Controller(), 2: new Controller() };
        const chr = buildChrRom();
        this.vromTilesByBank1k = chr.vromTilesByBank1k;
        // nes 在 PPU 创建前先把 mmap: null 占位，等 PPU 就位后再装 mapper stub（stub 需要闭包 ppu）
        const nes = {
            rom: {
                HORIZONTAL_MIRRORING: 1,
                VERTICAL_MIRRORING: 0,
                FOURSCREEN_MIRRORING: 2,
                SINGLESCREEN_MIRRORING: 3,
                SINGLESCREEN_MIRRORING2: 4,
                SINGLESCREEN_MIRRORING3: 5,
                SINGLESCREEN_MIRRORING4: 6,
                CHRROM_MIRRORING: 7,
                ...chr,
                romCount: 16,
                batteryRam: null,
                valid: true,
                rom: [],
                // 暴露给 pattern-table-viewer 的 vromTile 源（按 1KB bank1k 索引）
                vromTile: chr.vromTilesByBank1k,
            },
            cpu: {
                mem: new Uint8Array(0x10000),
                dataBus: 0,
                nmiRaised: false,
                nmiRaisedAtCycle: 0,
                instrBusCycles: 0,
                nmiDotsRemainingInStep: 0,
                requestIrq: () => { },
            },
            mmap: null, // 后续注入（需先有 ppu 引用）
            ui: { writeFrame: () => { }, updateStatus: () => { } },
            controllers: this.controllers,
            opts: {},
            ppu: null,
        };
        const ppu = new PPU(nes);
        ppu.setMirroring(nes.rom.HORIZONTAL_MIRRORING);
        this.ppu = ppu;
        nes.ppu = ppu;
        // mapper stub — 闭包 ppu，提供 PPU sprite 0 hit 检测需要的真实 Tile
        // HeadlessRuntime 不模拟 MMC3 的 bank 切换；ppu.ptTile 始终是最新 CHR 视图
        // （由 loadChrSlot 写入），所以直接按 tile index 取即可
        const mmapStub = {
            clockIrqCounter: () => { },
            latchAccess: (_addr) => { },
            canWriteChr: (_addr) => false,
            onSpriteRender: () => {
                this.applyChrPlanAt(this.perScanlineChrPlan.length > 0 ? this.perScanlineChrPlan[0].s : 0);
            },
            onBgRender: () => { },
            onBgRenderScanline: (scan) => {
                this.applyChrPlanAt(scan);
            },
            // PPU checkSprite0 调用签名：(index) — 8x8/8x16 都只传 1 个最终 tile index
            getSpritePatternTile: (_isSprite8x8OrIndex, _table, _tile) => {
                const index = typeof _isSprite8x8OrIndex === 'number' ? _isSprite8x8OrIndex : (_tile ?? 0);
                return ppu.ptTile[index | 0];
            },
            // 8x16 模式偶尔也通过 (table, tile) 取 — ptTile 编号制已统一 0..511
            getBgPatternTile: (_table, tile) => {
                return ppu.ptTile[tile | 0];
            },
        };
        nes.mmap = mmapStub;
        // 声明式 CHR slot map → 直接装配 PPU vrom（无 Mapper4 / 无 load1kVromBank）
        ppu.loadChrBank = (slot, bank1k) => {
            this.loadChrSlot(slot, bank1k & 0xff);
        };
        this.loadInitialChr();
    }
    /** 装载单个 1KB CHR slot（声明式，无切换语义；直接写入 ppu.ptTile[slot*64 + tileIdx]） */
    loadChrSlot(slot, bank1k) {
        const s = slot & 7;
        // bank1k 取模 128（CHR ROM 0..127 bank1k，越界映射到尾部）
        const b = (bank1k & 0xff) % 128;
        if (this.chrSlots[s] === b)
            return;
        this.chrSlots[s] = b;
        const ppu = this.ppu;
        if (!ppu.ptTile)
            return;
        const tiles = this.vromTilesByBank1k[b];
        if (!tiles)
            return;
        const baseTileIdx = s * 64;
        for (let i = 0; i < 64; i++) {
            const dst = ppu.ptTile[baseTileIdx + i];
            const src = tiles[i];
            if (!dst || !src)
                continue;
            dst.initialized = true;
            dst.opaque.set(src.opaque);
            dst.pix.set(src.pix);
        }
        // 记账：跟 mapper4 走同样的 pushChrSwitch，方便按 scanline 重建 PT 视图
        // H5 不跑 PPU cycle，ppu.scanline 由 renderFramePartially 推进
        try {
            const { pushChrSwitch } = require('../../core/debug/pattern-table-viewer');
            pushChrSwitch({ scanline: (ppu.scanline | 0), slot: s, bank1k: b });
        }
        catch (_) { /* viewer 未加载，忽略 */ }
    }
    /** 初始 CHR 装载（按 CHR_SLOT_MAP 声明） */
    loadInitialChr() {
        for (const e of CHR_SLOT_MAP) {
            this.loadChrSlot(e.slot, e.bank1k);
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
    /**
     * Boot 期 CHR bank 立即装载（WBS_FRAME13 F6）。
     *
     * 在 frame=0 时, PPU ptTile 还没有任何非零 tile 数据。
     * BUG #005 已经修过 SCENE_END_BANK_TABLE,
     * 但 `HeadlessRuntime.loadChrSlot()` 仅在 `renderCommit()` 链路被触发, 而 frame 0
     * 还没到 renderCommit → ppu.ptTile 全 0.
     *
     * 修法: 让外部 (Tsubasa2.boot(runtime)) 直接调本方法, 把 frame=0 的 8 slot 立即推 PPU.
     * 真值 (emu frame 1-13): banks = [0,1,2,3,252,113,82,83].
     */
    bootInitialChrBanks() {
        const bootSlots = [0, 1, 2, 3, 252, 113, 82, 83];
        for (let s = 0; s < 8; s++) {
            this.loadChrSlot(s, bootSlots[s]);
        }
    }
    /** 设置本帧 per-scanline CHR 切换计划（Opening GT 逐帧驱动） */
    setPerScanlineChrPlan(plan) {
        this.perScanlineChrPlan = plan;
    }
    /** 按 scanline 应用 CHR 计划（找到 s <= scanline 的最后一组 bank） */
    applyChrPlanAt(scanline) {
        if (this.perScanlineChrPlan.length === 0)
            return;
        let banks = this.perScanlineChrPlan[0].b;
        for (const e of this.perScanlineChrPlan) {
            if (e.s <= scanline)
                banks = e.b;
            else
                break;
        }
        for (let s = 0; s < 8; s++) {
            this.loadChrSlot(s, banks[s] & 0xff);
        }
    }
    /** 跑一帧（游戏逻辑 + PPU 扫描线渲染），渲染结果在 ppu.buffer */
    frame(game) {
        game.frame(this);
    }
}
