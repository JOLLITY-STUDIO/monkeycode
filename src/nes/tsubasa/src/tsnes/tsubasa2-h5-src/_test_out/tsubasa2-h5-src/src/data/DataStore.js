"use strict";
/**
 * 数据中心 (Model 层)
 *
 * 替代 NES 的 RAM/VRAM/OAM，采用 Key-Value 结构化存储：
 *   1. PPU NameTable → 32×30 tile 索引网格
 *   2. OAM → Sprite 对象数组
 *   3. RAM → 语义化 KV 表 (不再用地址映射)
 *   4. Palette → RGBA 颜色数组
 *
 * 外部通过 Service 接口读写，不直接操作底层地址。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = exports.RAM_KEYS = void 0;
const types_1 = require("../core/types");
const config_1 = require("../config");
const types_2 = require("../model/types");
const OamManager_1 = require("./OamManager");
// ── 内存 KV ──
/** 语义化内存键名 */
exports.RAM_KEYS = {
    // 游戏状态
    GAME_STATE: 'gameState',
    FRAME_COUNT: 'frameCount',
    // 控制器
    BTN_CUR: 'btnCurrent',
    BTN_PREV: 'btnPrevious',
    BTN_EDGE: 'btnEdge',
    // 比赛
    TIMER_L: 'timerLo',
    TIMER_H: 'timerHi',
    SCORE_A: 'scoreA',
    SCORE_B: 'scoreB',
    BALL_X: 'ballX',
    BALL_Y: 'ballY',
    BALL_OWNER: 'ballOwner',
    // 临时变量区 (Bank 之间传递参数)
    TEMP_00: 'temp00',
    TEMP_01: 'temp01',
    TEMP_02: 'temp02',
    // ... 按需添加
};
/** 数据中心 */
class DataStore {
    constructor() {
        /** 滚动偏移 (pixel 单位) */
        this.scrollX = 0;
        this.scrollY = 0;
        /** OAM 精灵列表 */
        this.sprites = [];
        /** 实时调色板表（BG×4 + SPR×4） */
        this.paletteTable = (0, types_2.createBlankPaletteTable)();
        // ── 语义化 RAM ──
        /**
         * OAM 总管 — 全局唯一精灵数据出口。
         * 所有 Bank 一律通过 oam.* 读写精灵, 不再各自维护 ram_04A5 键。
         */
        this.oam = new OamManager_1.OamManager();
        /** 内存 KV 表 (替代实地址) */
        this.ram = new Map();
        /** 零页暂存 (256 bytes，与 6502 兼容) */
        this.zp = new Uint8Array(256);
        this.nt0 = this._blankNT();
        this.nt1 = this._blankNT();
        this.oam.attach(this);
    }
    // ── NT 操作 ──
    /** 写 NT 入口 */
    writeNT(ntSelect, tileX, tileY, entry) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY < types_1.NT_ROWS && tileX < types_1.NT_COLS) {
            nt[tileY][tileX] = { ...entry };
        }
    }
    /** 读指定 NT 入口（调试用） */
    readNT(ntSelect, tileX, tileY) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY >= 0 && tileY < types_1.NT_ROWS && tileX >= 0 && tileX < types_1.NT_COLS) {
            return nt[tileY][tileX];
        }
        return null;
    }
    /** 世界坐标 → 取 tile（考虑 mirroring） */
    getWorldTile(worldTileX, worldTileY) {
        if (worldTileY < 0 || worldTileY >= types_1.NT_ROWS)
            return null;
        if (config_1.CONFIG.mirroring === config_1.Mirroring.Horizontal) {
            // NT0 左 / NT1 右 → 世界宽度 64 tile
            const wx = ((worldTileX % 64) + 64) % 64;
            if (wx < types_1.NT_COLS) {
                return this.nt0[worldTileY][wx];
            }
            else {
                return this.nt1[worldTileY][wx - types_1.NT_COLS];
            }
        }
        else {
            // Vertical: NT0 上 / NT1 下 → 世界高度 60 tile
            const wy = ((worldTileY % 60) + 60) % 60;
            if (wy < types_1.NT_ROWS) {
                return this.nt0[wy][worldTileX % types_1.NT_COLS];
            }
            else {
                return this.nt1[wy - types_1.NT_ROWS][worldTileX % types_1.NT_COLS];
            }
        }
    }
    /** viewport 可见 tile 列表（从 scroll 位置采样世界） */
    eachVisibleTile(cb) {
        const startTx = Math.floor(this.scrollX / types_1.TILE_PX);
        const startTy = Math.floor(this.scrollY / types_1.TILE_PX);
        const tilesWide = Math.ceil(types_1.NES_WIDTH / types_1.TILE_PX) + 1; // 跨 tile 边界 +1
        const tilesHigh = Math.ceil(240 / types_1.TILE_PX) + 1;
        for (let ty = 0; ty < tilesHigh; ty++) {
            for (let tx = 0; tx < tilesWide; tx++) {
                const worldTx = startTx + tx;
                const worldTy = startTy + ty;
                const entry = this.getWorldTile(worldTx, worldTy);
                if (!entry || entry.tile === 0)
                    continue;
                const screenX = (tx * types_1.TILE_PX) - (this.scrollX % types_1.TILE_PX);
                const screenY = (ty * types_1.TILE_PX) - (this.scrollY % types_1.TILE_PX);
                cb(screenX, screenY, entry);
            }
        }
    }
    // ── OAM ──
    /** 写入 Sprite (64 sprite 上限) */
    writeOAM(index, entry) {
        if (index >= 0 && index < 64) {
            this.sprites[index] = { ...entry };
        }
    }
    clearOAM() {
        this.oam.reset();
    }
    // ── 语义化内存 ──
    /** 通过键名读写 (替代 $xxxx 地址) */
    read(key) {
        return this.ram.get(key) ?? 0;
    }
    write(key, value) {
        this.ram.set(key, value & 0xFF);
    }
    /** 写入 16-bit 值到相邻两个 key */
    write16(keyLo, keyHi, value) {
        this.ram.set(keyLo, value & 0xFF);
        this.ram.set(keyHi, (value >> 8) & 0xFF);
    }
    read16(keyLo, keyHi) {
        const lo = this.ram.get(keyLo) ?? 0;
        const hi = this.ram.get(keyHi) ?? 0;
        return (hi << 8) | lo;
    }
    // ── 调色板操作 ──
    /** 写入单组 BG 调色板 */
    writeBgPalette(index, entry) {
        this.paletteTable.bgPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写入单组精灵调色板 */
    writeSprPalette(index, entry) {
        this.paletteTable.sprPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写入 BG 调色板中单个颜色 */
    writeBgColor(palIdx, colorIdx, color) {
        this.paletteTable.bgPalettes[palIdx].colors[colorIdx] = { ...color };
    }
    /** 写入精灵调色板中单个颜色 */
    writeSprColor(palIdx, colorIdx, color) {
        this.paletteTable.sprPalettes[palIdx].colors[colorIdx] = { ...color };
    }
    /**
     * 导出扁平化 RGBA 数组供渲染器使用
     * 返回 8 组调色板，每组 4 色 [[R,G,B,A],...]
     * 索引顺序: bgPalettes[0..3], sprPalettes[0..3]
     */
    exportPaletteRGBA() {
        const result = [];
        const all = [...this.paletteTable.bgPalettes, ...this.paletteTable.sprPalettes];
        for (const entry of all) {
            for (const c of entry.colors) {
                result.push([c.r, c.g, c.b, c.a]);
            }
        }
        return result;
    }
    /** 批量替换调色板表 */
    setPaletteTable(table) {
        this.paletteTable = {
            bgPalettes: table.bgPalettes.map(e => ({ colors: [...e.colors] })),
            sprPalettes: table.sprPalettes.map(e => ({ colors: [...e.colors] })),
        };
    }
    // ── 工具 ──
    _blankNT(rows = types_1.NT_ROWS) {
        const nt = [];
        for (let y = 0; y < rows; y++) {
            const row = [];
            for (let x = 0; x < types_1.NT_COLS; x++) {
                row.push({
                    tile: 0,
                    palette: 0,
                    bank: 0,
                    flipH: false,
                    flipV: false,
                    behindBg: false,
                });
            }
            nt.push(row);
        }
        return nt;
    }
    /** 重置所有状态 */
    reset() {
        this.nt0 = this._blankNT();
        this.nt1 = this._blankNT();
        this.scrollX = 0;
        this.scrollY = 0;
        this.sprites = [];
        this.paletteTable = (0, types_2.createBlankPaletteTable)();
        this.ram.clear();
        this.zp.fill(0);
    }
}
exports.DataStore = DataStore;
