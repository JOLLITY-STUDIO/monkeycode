"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingPrimitivesService = void 0;
const opening_data_1 = require("../../data/scene/opening-data");
class RenderingPrimitivesService {
    constructor(store) {
        this.store = store;
    }
    // ──────────────────────────── $9DEE 8bit × 8bit 乘法 ────────────────────────────
    /**
     * 对应原始 $9DEE: $00EC:$00ED = A * X（无符号 16-bit 结果）。
     */
    multiplyU8(a, x) {
        return ((a & 0xff) * (x & 0xff)) & 0xffff;
    }
    // ──────────────────────────── $05E8 NT 渲染缓冲 ────────────────────────────
    /**
     * 对应原始 $9B28: 在 $05E8 缓冲写入一个条目。
     * @param count  字节数（≤ 0x3F，bit7 由调用方控制；普通行模式 bit7=0）
     * @param addrLo 目标地址低字节
     * @param addrHi 目标地址高字节
     * @returns 当前写入位置 x（下一条数据应写入 $05E8+x）
     */
    ntBufferEntry(count, addrLo, addrHi) {
        const store = this.store;
        const pos = store.readByte(0x0628) & 0xff;
        if (pos + 3 + (count & 0x7f) > 0x3d) {
            // 容量不足：原版会等待 NMI 消费；H5 直接丢弃（理论上不应发生）
            return pos;
        }
        store.writeByte(0x05e8 + pos, count & 0xff);
        store.writeByte(0x05e9 + pos, addrLo & 0xff);
        store.writeByte(0x05ea + pos, addrHi & 0xff);
        store.writeByte(0x0629, (count & 0xff) | 0x40); // 忙标志（H5 中仅用于语义兼容）
        return pos + 3;
    }
    /** 在条目写入位置追加一个数据字节（调用方负责循环） */
    ntBufferDataByte(pos, value) {
        this.store.writeByte(0x05e8 + pos, value & 0xff);
    }
    /**
     * 对应原始 $9B5E: 结束当前 $05E8 条目并更新指针。
     * @param pos 下一个空闲位置
     */
    ntBufferEnd(pos) {
        this.store.writeByte(0x05e8 + pos, 0);
        this.store.writeByte(0x0628, pos & 0xff);
        this.store.writeByte(0x0629, 0);
    }
    /** 将 count 字节数据追加到缓冲区，返回新的 pos */
    ntBufferAppend(pos, data) {
        for (const b of data) {
            this.store.writeByte(0x05e8 + pos, b & 0xff);
            pos++;
        }
        return pos;
    }
    // ──────────────────────────── 调色板原语 ────────────────────────────
    /**
     * 对应原始 $9AB8: BG 调色板装载。
     * $B000 + index*16 → ram_062A（16 字节）。
     */
    loadBgPalette(index) {
        const pal = opening_data_1.OPENING_BG_PALETTES[index & 0x0f] ?? opening_data_1.OPENING_BG_PALETTES[0];
        for (let i = 0; i < 0x10; i++) {
            this.store.writeByte(0x062a + i, pal[i] & 0x3f);
        }
    }
    /**
     * 对应原始 $9ADA: SPR 调色板装载。
     * $B300 + index*16 → ram_063A（16 字节）。
     */
    loadSprPalette(index) {
        const pal = opening_data_1.OPENING_SPR_PALETTES[index & 0x0f] ?? opening_data_1.OPENING_SPR_PALETTES[0];
        for (let i = 0; i < 0x10; i++) {
            this.store.writeByte(0x063a + i, pal[i] & 0x3f);
        }
    }
    /**
     * 对应原始 $9AA2: 查渐显表计算单个颜色。
     * new = $9EA2[(pal & $30) + fade] | (pal & $0F)
     */
    fadeLookup(pal, fade) {
        const idx = ((pal & 0x30) + (fade & 0x0f)) & 0x3f;
        return (opening_data_1.OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
    }
    /**
     * 对应原始 $9A71: 将 ram_062A/063A 按当前 $004A/$004B 渐显后写入 $05E8 缓冲（$3F00）。
     * @returns 新的缓冲位置 pos
     */
    fadeWrite() {
        const store = this.store;
        const fadeA = store.readByte(0x004a) & 0x0f;
        const fadeB = store.readByte(0x004b) & 0x0f;
        let pos = this.ntBufferEntry(0x20, 0x00, 0x3f); // 32 字节 → $3F00
        for (let i = 0; i < 0x10; i++) {
            const pal = store.readByte(0x062a + i);
            this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeA));
        }
        for (let i = 0; i < 0x10; i++) {
            const pal = store.readByte(0x063a + i);
            this.ntBufferDataByte(pos++, this.fadeLookup(pal, fadeB));
        }
        this.ntBufferEnd(pos);
        return pos;
    }
    // ──────────────────────────── OAM 原语 ────────────────────────────
    /**
     * 对应原始 $9B7F: 隐藏全部影子 OAM（$0468/$0200 写 $F8，并清零扩展表）。
     */
    hideOam() {
        const store = this.store;
        for (let i = 0; i < 0x100; i += 4) {
            store.writeByte(0x0468 + i, 0xf8);
            store.writeByte(0x0200 + i, 0xf8);
        }
        store.writeByte(0x0568, 0);
        store.writeByte(0x0588, 0);
        store.writeByte(0x05a8, 0);
        store.writeByte(0x05c8, 0);
    }
    /**
     * 对应原始 $890C: 所有精灵 Y 坐标 += amount（$0468+4i）。
     */
    oamDrift(amount) {
        const store = this.store;
        const add = amount & 0xff;
        for (let i = 0; i < 0x100; i += 4) {
            const y = (store.readByte(0x0468 + i) + add) & 0xff;
            store.writeByte(0x0468 + i, y);
        }
    }
    /**
     * 对应原始 $88FB: 所有精灵属性 ^= $20（水平翻转位）。
     */
    oamFlipAttrs() {
        const store = this.store;
        for (let i = 0; i < 0x100; i += 4) {
            const attr = store.readByte(0x046a + i) ^ 0x20;
            store.writeByte(0x046a + i, attr);
        }
    }
    // ──────────────────────────── 清屏 / 填充 ────────────────────────────
    /**
     * 对应原始 $98A0: 关闭 NMI/MASK，整屏清 0，再恢复 MASK/NMI。
     * H5 语义：将 NT $2000-$23FF 与属性表 $23C0-$23FF 清零；CTRL/MASK 直接写 ram。
     */
    clearNametable() {
        const store = this.store;
        // 关 NMI（bit7 clear）
        store.writeByte(0x0020, store.readByte(0x0020) & 0x7f);
        // 关显示 MASK（bit3/4 clear）
        store.writeByte(0x0021, store.readByte(0x0021) & 0xe7);
        // 清 NT + 属性表（$2000-$23FF）
        for (let addr = 0x2000; addr <= 0x23ff; addr++) {
            store.writeByte(addr, 0);
        }
        // 恢复 MASK
        store.writeByte(0x0021, store.readByte(0x0021) | 0x18);
        // 恢复 NMI
        store.writeByte(0x0020, store.readByte(0x0020) | 0x80);
    }
    /**
     * 对应原始 $98EA: 填充 Y 行 × X 列（每行 32 字节）的 NT/ATTR 区域。
     * 直接写入 DataStore（原版 fade=0 时直接写 PPU；H5 统一走 ram 视图）。
     */
    fillNametableRows(addrLo, addrHi, rows, cols, value) {
        const store = this.store;
        let addr = ((addrHi & 0xff) << 8) | (addrLo & 0xff);
        const v = value & 0xff;
        for (let r = 0; r < (rows & 0xff); r++) {
            for (let c = 0; c < (cols & 0xff); c++) {
                store.writeByte((addr + c) & 0x3fff, v);
            }
            addr = (addr + 0x20) & 0x3fff;
        }
    }
    // ──────────────────────────── 渐显 / 渐隐（单步，配合场景状态机） ────────────────────────────
    /**
     * 对应原始 $9A0D（仅 BG 渐隐一步）：
     *   LDA $004A; BEQ RTS; DEC $004A; JSR $9A71; wait 1 帧; JMP $9A0D
     * fade=$0F 最亮 → fade=0 最暗（黑）。
     * @returns true 表示 $004A 已为 0（循环结束）
     */
    fadeBgStep() {
        const store = this.store;
        const a = store.readByte(0x004a) & 0x0f;
        if (a === 0)
            return true;
        store.writeByte(0x004a, a - 1);
        this.fadeWrite();
        return false;
    }
    /**
     * 对应原始 $99F0（BG+SPR 渐隐一步）：
     *   LDA $004A; ORA $004B; BEQ RTS; DEC $004A; LDA $004B; BEQ skip; DEC $004B;
     *   JSR $9A71; wait 1 帧; JMP $99F0
     * @returns true 表示 $004A|$004B == 0（循环结束）
     */
    fadeOutStep() {
        const store = this.store;
        const a = store.readByte(0x004a) & 0x0f;
        const b = store.readByte(0x004b) & 0x0f;
        if ((a | b) === 0)
            return true;
        if (a !== 0)
            store.writeByte(0x004a, a - 1);
        if (b !== 0)
            store.writeByte(0x004b, b - 1);
        this.fadeWrite();
        return false;
    }
    // ──────────────────────────── $9A35 调色板装载 + 满渐显 ────────────────────────────
    /**
     * 对应原始 $9A35：装载 BG/SPR 调色板并设置 fade=$0F 后写满亮调色板。
     * 原版 A=$0048（BG 组）、X=$0049（SPR 组）；H5 直接参数化。
     */
    loadPalettesAndFade(bgIndex, sprIndex) {
        const store = this.store;
        this.loadBgPalette(bgIndex); // $9AB8
        this.loadSprPalette(sprIndex); // $9ADA
        store.writeByte(0x004a, 0x0f); // LDA #$0F; STA $004A
        store.writeByte(0x004b, 0x0f); // STA $004B
        this.fadeWrite(); // JMP $9A71
    }
    // ──────────────────────────── $8920 场景数据装载 ────────────────────────────
    /**
     * 对应原始 $8920：场景号 × 19 → 基址 $BF00 → 拷贝 19 字节。
     * [0]→ram_0079（滚动标志），[1..18]→ram_007C..ram_008D；ram_007A=0。
     * MMC3 切 bank（JSR $C4B9）在 H5 中省略。
     */
    loadSceneData(sceneId) {
        const entry = opening_data_1.OPENING_SCENE_TABLE[sceneId & 0x0f] ?? opening_data_1.OPENING_SCENE_TABLE[0];
        const store = this.store;
        store.writeByte(0x0079, entry.scrollFlag);
        store.writeByte(0x007a, 0);
        for (let i = 0; i < 0x12; i++) {
            store.writeByte(0x007c + i, entry.data[i] ?? 0);
        }
    }
    // ──────────────────────────── $8AF7 CHR 配置读取（配置副作用） ────────────────────────────
    /**
     * 对应原始 $8AF7（配置部分）：
     * - 清零 $0009/$000A/$000D/$000E；$005B bit7 清除
     * - $0075/$0076 = cfg[0]/[1]（起始 tile/参数）
     * - $0048 = cfg[2] & 0x3F（BG 调色板索引）
     * - $005B bit7 = cfg[2] bit6（翻转标志）
     * - $005E/$005F = cfg[3]/[4]（宽/高）
     * - $005C/$005D = cfg[5] 编码的 nametable 基址（ASL/ROL ×4 展开）
     * - $008E/$008F = cfg[0]/[1]（后续 $0090/$0091 的源）
     * tile→NT 展开（$8B93+）由场景渲染单独处理。
     */
    loadChrConfig(configId) {
        const store = this.store;
        const cfg = opening_data_1.OPENING_CHR_CONFIGS[configId & 0x1f] ?? opening_data_1.OPENING_CHR_CONFIGS[0];
        store.writeByte(0x0009, 0);
        store.writeByte(0x000a, 0);
        store.writeByte(0x000d, 0);
        store.writeByte(0x000e, 0);
        store.writeByte(0x005b, store.readByte(0x005b) & 0x7f);
        store.writeByte(0x0075, cfg[0]);
        store.writeByte(0x0076, cfg[1]);
        store.writeByte(0x0048, cfg[2] & 0x3f);
        // $8B4F: LSR $005B; ROL; ROL $005B → $005B bit7 = cfg[2] bit6
        const flip = (cfg[2] >> 6) & 1;
        store.writeByte(0x005b, (store.readByte(0x005b) & 0x7f) | (flip << 7));
        store.writeByte(0x005e, cfg[3]);
        store.writeByte(0x005f, cfg[4]);
        // $8B5F-$8B7F: $005C/$005D = (($02 << 8) | (cfg[5] & $F8)) << 2 → 16bit
        let v = ((0x02 << 8) | (cfg[5] & 0xf8)) << 2;
        // $8B71-$8B7D: c |= (cfg[5] & $07); 再 <<2
        v = ((v & 0xff00) | ((v & 0xff) | (cfg[5] & 0x07))) << 2;
        store.writeByte(0x005c, v & 0xff);
        store.writeByte(0x005d, (v >> 8) & 0xff);
        store.writeByte(0x008e, cfg[0]);
        store.writeByte(0x008f, cfg[1]);
    }
    // ──────────────────────────── 场景 3 NT 数据（开场背景） ────────────────────────────
    /**
     * 场景 3 开场背景：OPENING_SCENE3_TILES（6×8 pattern）每个 pattern 按
     * OPENING_TILE_PATTERNS 展开为 4×4 tile（[1..16]，0xFF=跳过），共 24×32 tiles。
     * 从 $2000 起逐行写入 $05E8 渲染缓冲（renderCommit 消费后写 PPU）。
     * @param fromRow 起始行（0-31）
     * @param rows    本次写入行数
     */
    queueScene3NametableRows(fromRow, rows) {
        const store = this.store;
        for (let r = 0; r < rows; r++) {
            const row = fromRow + r;
            if (row >= 32)
                break;
            const line = new Array(32).fill(0);
            for (let c = 0; c < 6; c++) {
                const patIdx = opening_data_1.OPENING_SCENE3_TILES[Math.floor(row / 4) * 6 + c] ?? 0;
                const pattern = opening_data_1.OPENING_TILE_PATTERNS[patIdx] ?? opening_data_1.OPENING_TILE_PATTERNS[0];
                const pr = row % 4;
                for (let pc = 0; pc < 4; pc++) {
                    const v = pattern[1 + pr * 4 + pc];
                    if (v !== 0xff)
                        line[c * 4 + pc] = v;
                }
            }
            const addr = 0x2000 + row * 32;
            let pos = this.ntBufferEntry(0x20, addr & 0xff, (addr >> 8) & 0xff);
            for (const b of line)
                this.ntBufferDataByte(pos++, b);
            this.ntBufferEnd(pos);
        }
        void store;
    }
}
exports.RenderingPrimitivesService = RenderingPrimitivesService;
