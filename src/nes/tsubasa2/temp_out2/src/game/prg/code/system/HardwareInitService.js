"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareInitService = void 0;
const ram_init_table_1 = require("../../data/tables/ram-init-table");
const opening_data_1 = require("../../data/scene/opening-data");
class HardwareInitService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Reset 序列（$C64E-$C6BB）：
     * 1. RAM $0000-$07FF 清零
     * 2. ram_0020=$08 / ram_0021 初始 / ram_0022=$00 / ram_0469=$00
     * 3. OAM 全部 $F8（$CB8B）
     * 4. 场景号 A=0 → 场景调度（$CEFE）
     */
    reset() {
        const store = this.store;
        store.reset();
        store.loadInitTable(ram_init_table_1.RAM_INIT_TABLE);
        // $CB8B: OAM 隐藏
        for (let i = 0x200; i < 0x300; i++)
            store.writeByte(i, ram_init_table_1.OAM_HIDE_VALUE);
        // 开场 CHR 请求表（$C9E9 装载；ground truth = 模拟器探针 chrBanks [0,1,2,3,252,113,82,83]）
        // 原版 boot $CA22-$CA2F 置 ram_0490=0/ram_0491=2；SPR 区（252/113/82/83）为开场实际值
        store.writeByte(0x0022, opening_data_1.OPENING_CHR_CMD);
        for (let i = 0; i < opening_data_1.OPENING_CHR_REQUEST.length; i++) {
            store.writeByte(0x0490 + i, opening_data_1.OPENING_CHR_REQUEST[i]);
        }
        // 帧计数归零
        store.frame = 0;
    }
    /**
     * $CB35: 清空 NameTable 0/1（写入 $2000/$2400 两屏，960 tile + 64 属性）
     * 在 H5 渲染中由渲染管线直接清空 NT 缓冲。
     */
    clearNameTables() {
        // TODO V0.3: 对接渲染层 NT 缓冲清零（当前渲染管线以 PPU VRAM 为准）
    }
    /**
     * $CEFE + $C400: 场景切换前序
     * - 关 IRQ（ram_0469=0）
     * - 隐藏 OAM
     * - 清 NT
     * - PPU CTRL=$08 / MASK=$1E
     * - bank 选择 → 场景入口
     * @param sceneId 场景号（0-0x22）
     */
    prepareScene(sceneId) {
        const store = this.store;
        store.writeByte(0x0469, 0x00); // IRQ 计数器
        for (let i = 0x200; i < 0x300; i++)
            store.writeByte(i, ram_init_table_1.OAM_HIDE_VALUE);
        this.clearNameTables();
        store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
        store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
        store.writeByte(0x0022, 0x00); // MMC3 bank 基址 = 0
    }
}
exports.HardwareInitService = HardwareInitService;
