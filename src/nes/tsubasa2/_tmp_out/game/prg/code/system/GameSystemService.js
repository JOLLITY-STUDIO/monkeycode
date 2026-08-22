"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSystemService = void 0;
const bank00_tables_1 = require("../../data/tables/bank00-tables");
const bank07_scenes_metatile_1 = require("../../data/tables/bank07-scenes-metatile");
const bank06_palette_1 = require("../../data/tables/bank06-palette");
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class GameSystemService {
    constructor(store) {
        /** bank30 (HardwareInitService) 引用 — 用于 $C5xx 派发表转发 */
        this._hw = null;
        // 脚本状态缓存 (对应零页 $004D/$004E 等, 由 ScriptEngine 共享)
        this._scriptPtr = 0; // $004D/$004E
        this._scriptBank = 0; // $0056
        this._textBufPtr = 0; // $004F/$0050
        this._textVramPtr = 0; // $0051/$0052
        this._textPos = 0; // $0053
        this._textLineLen = 0; // $0054
        this._lineCount = 0; // $0055
        // ════════════════════════════════════════════════
        // 协程调度器 ($9EED-$9FFF)
        // 协程槽结构 ($0000+X, X=1/5/9/13/17/21, 每槽 4 字节):
        //   [0]: 计数器 (递减到 0 = 就绪)
        //   [1]: 栈指针 (H5: 回调索引)
        //   [2]: R6 bank 号
        //   [3]: R7 bank 号
        // H5 替代: 用回调函数表 (_coroutines) 替代 6502 栈+RTS
        // ════════════════════════════════════════════════
        /** 协程回调表: 索引 → 回调函数 (替代 $0101+Y 回调指针) */
        this._coroutines = [];
        /** 协程上下文: $E6-$ED (8字节, 替代 6502 栈压栈/弹栈) */
        this._coroutineCtx = [];
        /** 当前协程槽索引 (对应 $0000 存的 X 值) */
        this._currentSlot = 0;
        /** 协程让出时的等待帧数 (对应 $0019) */
        this._yieldWait = 0;
        this._store = store;
        // 注册协程回调 (索引 0 = $9148 场景初始化)
        this._coroutines[0] = () => this.sub9148();
    }
    /** 注入 bank30 (HardwareInitService) 引用, 供 $C5xx 派发表转发 */
    setHardwareInit(hw) {
        this._hw = hw;
    }
    // ════════════════════════════════════════════════
    // 零页读/写辅助
    // ════════════════════════════════════════════════
    rd(addr) {
        return this._store.read(ramKey(addr));
    }
    wr(addr, v) {
        this._store.write(ramKey(addr), v);
    }
    rdPtr(lo, hi) {
        return this.rd(lo) | (this.rd(hi) << 8);
    }
    wrPtr(lo, hi, v) {
        this.wr(lo, v & 0xff);
        this.wr(hi, (v >> 8) & 0xff);
    }
    // ════════════════════════════════════════════════
    // $9FA8 waitCounter — 等待 vblank 帧边界 (原 $9FA8)
    // 实现: 轮询 ram_001E bit4 (vblank 标志), 帧合成器设置。
    // ════════════════════════════════════════════════
    waitCounter() {
        // $9FA8: LDA #$00; STA $0019; 压栈 X/Y/E6-ED; 保存调度器栈帧 → 挂起当前协程
        this.wr(0x0019, 0);
        // 在翻译版帧模型中, 同步等待 vblank 由帧循环调度; 这里仅为语义占位。
        // 真实 H5 帧循环在调用 update() 前已保证处于 vblank 帧边界。
        void this.rd(0x0019);
    }
    // ════════════════════════════════════════════════
    // $98EA ppuFill — 用 A 填充 (ram_00E7<<8|ram_00E6) VRAM 区域
    // 入口: A=填充值, ram_00E6/00E7=VRAM 地址, X=列数, Y=行数
    // $98EA 是带调色板渐隐版本; $98F2 起核心循环。
    // ════════════════════════════════════════════════
    ppuFill(fill, vramAddr, cols, rows) {
        // $98EA: LDA #$00; STA $00EB
        this.wr(0x00EB, 0);
        // $98EC: LDA $004A; ORA $004B; BEQ $992C  (若正在渐隐则跳过直接模式)
        if ((this.rd(0x004A) | this.rd(0x004B)) === 0) {
            this.ppuFillDirect(fill, vramAddr, cols, rows);
            return;
        }
        // $98F2 缓冲模式: 用 PPU buffer 逐块填充
        this.ppuFillBuffered(fill, vramAddr, cols, rows);
    }
    /** $98F2-$9929 缓冲模式 (PPU buffer) */
    ppuFillBuffered(fill, vramAddr, cols, rows) {
        this.wr(0x00E8, rows & 0xff);
        this.wr(0x00E9, cols & 0xff);
        let e9 = cols & 0xff;
        const rowCount = rows & 0xff;
        let addr = vramAddr;
        for (let r = 0; r < rowCount; r++) {
            let x = this.ppuBufAlloc(fill, e9, addr & 0xff);
            let n = e9;
            while (n > 0) {
                this.writePpuBuf(x, 0);
                x = (x + 1) & 0xff;
                n--;
            }
            this.ppuBufEnd(x);
            addr += 0x20;
        }
    }
    /** $992C-$9979 直接模式 (不建 PPU buffer, 直写 NT) */
    ppuFillDirect(fill, vramAddr, cols, rows) {
        // $992C-$993C: 写 $2000/$2001 寄存器 (渲染开启) — 翻译版 no-op (帧合成器渲染)
        this.wr(0x00E9, cols & 0xff);
        this.wr(0x00E8, rows & 0xff);
        // $9942-$9965: 写 NT 网格
        let addr = vramAddr;
        for (let r = 0; r < (rows & 0xff); r++) {
            for (let c = 0; c < (cols & 0xff); c++) {
                this.writeNTByte(addr, fill);
                addr++;
            }
            addr += 0x20 - (cols & 0xff);
        }
    }
    /** $98E8 — ppuFill 入口别名 (A 已置好, ram_00E6/00E7/00E9/X/Y) */
    ppuFill98E8() {
        // $98E8: LDY #$00; LDA #$00; STA $00EB (与 $98EA 相同入口)
        this.wr(0x00EB, 0);
        const vramAddr = this.rdPtr(0x00E6, 0x00E7);
        const cols = this.rd(0x00E9);
        const rows = this.rd(0x00E8);
        void vramAddr;
        void cols;
        void rows;
    }
    /** 写单个 NT 字节 (地址 → 网格坐标) */
    writeNTByte(vramAddr, val) {
        const a = vramAddr & 0x3ff;
        const nt = vramAddr < 0x2400 ? 0 : 1;
        const x = a % 32;
        const y = (a / 32) | 0;
        if (x < 32 && y < 30) {
            this._store.writeNT(nt, x, y, { tile: val, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        }
    }
    // ════════════════════════════════════════════════
    // $98A0 ntClear — 清空 NT0 ($2000-$23FF)
    // ════════════════════════════════════════════════
    ntClear() {
        // $98A0-$98B9: 关渲染写寄存器
        // $98BC-$98C8: 写 0x800 (2 NT) 个 tile = 0
        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 32; x++) {
                this._store.writeNT(0, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                this._store.writeNT(1, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
            }
        }
    }
    // ════════════════════════════════════════════════
    // $9B11 ntAttrClear — 清调色板 fade 计数器 + 属性区
    // ════════════════════════════════════════════════
    ntAttrClear() {
        // $9B11-$9B19: $0048/$0049/$004A/$004B = 0
        this.wr(0x0048, 0);
        this.wr(0x0049, 0);
        this.wr(0x004A, 0);
        this.wr(0x004B, 0);
        // $9B1B: A=0x0F; $9B1F-$9B23: $054A-$063F = 0x0F
        this._store.copy(ramKey(0x054A), new Uint8Array(0xF6).fill(0x0F), 0xF6);
        // $9B25: JMP $9A71 (paletteWriteAll)
        this.paletteWriteAll();
    }
    // ════════════════════════════════════════════════
    // $9B28 ppuBufAlloc — 分配 PPU buffer 槽 (A=控制, X=长度, Y=目标)
    // 返回: 写入后的 X 索引 (下一槽起始)
    // ════════════════════════════════════════════════
    ppuBufAlloc(ctrl, len, dst) {
        // $9B29 BIT $0629; BVC → 若忙则等一帧重试
        // 翻译版: 忙时轮询 (语义上由帧循环保证非忙)
        let x = this.rd(0x0628);
        while ((this.rd(0x0629) & 0x40) !== 0) {
            // $9B2E-$9B34: 等帧后重试
            this.waitCounter();
            x = this.rd(0x0628);
        }
        // $9B37: A = (A & 0x3F) + $0628; if >= 0x3D 等帧重试
        const c = (ctrl & 0x3f) + this.rd(0x0628);
        if (c >= 0x3d) {
            this.waitCounter();
            return this.ppuBufAlloc(ctrl, len, dst);
        }
        // $9B42: $0629 |= (A | 0x40)
        this.wr(0x0629, ((ctrl & 0x3f) | 0x40) & 0xff);
        x = this.rd(0x0628);
        // $9B47-$9B57: $05EA+X = X-reg(源高), $05E9+X = Y(源低), $05E8+X = A(控制)
        this.writePpuBuf(x, ctrl & 0x3f);
        this.writePpuBuf(x + 1, dst & 0xff);
        this.writePpuBuf(x + 2, (dst >> 8) & 0xff);
        this.wr(0x0629, (this.rd(0x0629) & 0xbf) & 0xff);
        x = (x + 3) & 0xff;
        this.wr(0x0628, x);
        return x;
    }
    /** $9B5E ppuBufEnd — 结束 PPU buffer (写终止符) */
    ppuBufEnd(x) {
        this.writePpuBuf(x, 0);
        this.wr(0x0628, x);
        this.wr(0x0629, this.rd(0x0629) & 0xbf);
    }
    /** 写 PPU buffer 字节 $05E8+X */
    writePpuBuf(x, v) {
        this._store.write(ramKey(0x05E8 + x), v);
    }
    readPpuBuf(x) {
        return this._store.read(ramKey(0x05E8 + x));
    }
    // ════════════════════════════════════════════════
    // $9B91 oamFlagClear — 清精灵组计数标志 ($0568/$0588/$05A8/$05C8)
    // ════════════════════════════════════════════════
    oamFlagClear() {
        this.wr(0x0568, 0);
        this.wr(0x0588, 0);
        this.wr(0x05A8, 0);
        this.wr(0x05C8, 0);
    }
    // ════════════════════════════════════════════════
    // $9B7F initHelper — 清空全部精灵 (影子 OAM + 硬件 OAM + 组计数)
    // ════════════════════════════════════════════════
    initHelper() {
        // $9B81-$9B8F: 影子 OAM $0468-$0567 与 硬件 OAM $0200-$02FF 全填 $F8
        this._store.oamShadow.clearAll(0xf8);
        this._store.oamShadow.clearHw(0xf8);
        // $9B91 oamFlagClear
        this.oamFlagClear();
        // 原版 oamClear ($9B7F) 之后, bank31 $EC3C-$EC4A 立即归零 $0532/$0534/$0536/$0538/$0539
        // (场景滚动/坐标累加寄存器), 这是游戏的"清屏后归零"不变式。
        // 翻译版无 bank31 主循环, 在此补齐, 否则 $0538=$F8 会被 NMI 滚动计算
        // (scrollX=$004A+$0538) 当成 248 → h_tile=31 → 黑屏。
        this.wr(0x0532, 0);
        this.wr(0x0534, 0);
        this.wr(0x0536, 0);
        this.wr(0x0538, 0);
        this.wr(0x0539, 0);
    }
    // ════════════════════════════════════════════════
    // $9A71 paletteWriteAll — 写调色板到 PPU buffer ($3F00)
    // 读取 $062A 起的调色板数据, 用 PAL_HELPER_TABLE 做渐显偏移。
    // ════════════════════════════════════════════════
    paletteWriteAll() {
        // $9A71: LDA #$20 (长度 0x20 = 32)
        let x = this.ppuBufAlloc(0x20, 0x20, 0x3f00);
        this.wr(0x00E7, x);
        // $9A7E-$9A9B: 32 字节调色板
        for (let y = 0; y < 0x20; y++) {
            const v = this.rd(0x062A + y) & 0x30;
            const a = y < 0x10 ? this.rd(0x004A) : this.rd(0x004B);
            this.paletteWriteByte(y, v + a);
        }
        // $9A9C: LDX $00E7; JSR $9B5E
        this.ppuBufEnd(this.rd(0x00E7));
    }
    /** $9AA2 paletteWriteByte — 写单个调色板字节到 buffer */
    paletteWriteByte(y, val) {
        var _a;
        let x = this.rd(0x00E7);
        // $9AA3: LDA $9EA2,X 查表
        const base = (_a = bank00_tables_1.PAL_HELPER_TABLE[val & 0xff]) !== null && _a !== void 0 ? _a : 0;
        // $9AA8: 值 = ($062A+Y & 0x0F) | 表
        const b = (this.rd(0x062A + y) & 0x0f) | base;
        this.writePpuBuf(x, b);
        this.wr(0x00E7, x + 1);
    }
    // ════════════════════════════════════════════════
    // $9AB8 paletteLoadBG — 从 bank06 读 BG 调色板到 $062A
    // $9ADA paletteLoadSPR — 从 bank06 读 SPR 调色板到 $063A
    // 调色板数据已从 bank06 提取为 PALETTE_BG_06 / PALETTE_SPR_06, 直接 import 读取。
    // ════════════════════════════════════════════════
    paletteLoadBG() {
        // $9AB8: 索引 = $0048; 每组 16 字节; 从 PALETTE_BG_06[索引*16 .. +16] → $062A
        const idx = this.rd(0x0048);
        this.paletteCopy16(bank06_palette_1.PALETTE_BG_06, idx, 0x062A);
    }
    paletteLoadSPR() {
        // $9ADA: 索引 = $0049; 每组 16 字节; 从 PALETTE_SPR_06[索引*16 .. +16] → $063A
        const idx = this.rd(0x0049);
        this.paletteCopy16(bank06_palette_1.PALETTE_SPR_06, idx, 0x063A);
    }
    /** 从调色板组表复制一组 (16 字节) 到指定 RAM 区 (索引 → 组) */
    paletteCopy16(table, idx, dst) {
        var _a, _b;
        const grp = (_a = table[idx & 0xff]) !== null && _a !== void 0 ? _a : [];
        for (let i = 0; i < 0x10; i++) {
            this.wr(dst + i, (_b = grp[i]) !== null && _b !== void 0 ? _b : 0);
        }
    }
    // ════════════════════════════════════════════════
    // $9A43 paletteSetFull — 立即置满调色板渐显 ($004A/$004B=$0F)
    // ════════════════════════════════════════════════
    paletteSetFull() {
        this.wr(0x004A, 0x0f);
        this.wr(0x004B, 0x0f);
        this.paletteWriteAll();
    }
    // ════════════════════════════════════════════════
    // $9A31 mainInitParam — 初始化调色板并置满 (对应 $9A31)
    // 入口 A=BG索引, X=SPR索引
    // ════════════════════════════════════════════════
    mainInitParam(bgIdx, sprIdx) {
        this.wr(0x0048, bgIdx);
        this.wr(0x0049, sprIdx);
        this.paletteLoadBG();
        this.paletteLoadSPR();
        this.paletteSetFull();
    }
    // ════════════════════════════════════════════════
    // $9A35 mainLoopInit2 — 初始化调色板 (仅 BG 索引)
    // ════════════════════════════════════════════════
    mainLoopInit2(bgIdx) {
        this.wr(0x0048, bgIdx);
        this.paletteLoadBG();
        this.paletteSetFull();
    }
    /** $9A4C mainInitParamBgOnly — 仅 BG 置满 */
    mainInitParamBgOnly(bgIdx) {
        this.wr(0x0048, bgIdx);
        this.paletteLoadBG();
        this.wr(0x004A, 0x0f);
        this.paletteWriteAll();
    }
    /** $9A60 mainInitParamSprOnly — 仅 SPR 置满 */
    mainInitParamSprOnly(sprIdx) {
        this.wr(0x0049, sprIdx);
        this.paletteLoadSPR();
        this.wr(0x004B, 0x0f);
        this.paletteWriteAll();
    }
    // ════════════════════════════════════════════════
    // $9B07 bankSwitch — 已移除 (原 JSR $C4B9 切 PRG bank)
    // 去CPU化: H5 直接 import 各 bank 数据, 无需切 bank.
    // 原 ram_0025 (当前 bank 号) / ram_00E9 (bankSwitch 复用) 语义已废弃.
    // ════════════════════════════════════════════════
    // ════════════════════════════════════════════════
    // $99F0 fadeOut — 调色板渐隐 (递减 $004A/$004B)
    // ════════════════════════════════════════════════
    fadeOut() {
        // $99F0-$9A0C 循环
        while (true) {
            const a = this.rd(0x004A);
            const b = this.rd(0x004B);
            if ((a | b) === 0)
                break;
            if (a !== 0)
                this.wr(0x004A, a - 1);
            if (this.rd(0x004B) !== 0)
                this.wr(0x004B, this.rd(0x004B) - 1);
            this.paletteWriteAll();
            this.waitCounter();
        }
    }
    // ════════════════════════════════════════════════
    // $997A fadeIn — 调色板渐显 (递增加载调色板至满)
    // ════════════════════════════════════════════════
    fadeIn() {
        this.paletteLoadBG();
        this.paletteLoadSPR();
        // $998C-$99AB 循环递增
        while (true) {
            const a = this.rd(0x004A);
            const b = this.rd(0x004B);
            if (a < 0x0f)
                this.wr(0x004A, a + 1);
            if (this.rd(0x004B) < 0x0f)
                this.wr(0x004B, this.rd(0x004B) + 1);
            this.paletteWriteAll();
            this.waitCounter();
            if (this.rd(0x004A) + this.rd(0x004B) >= 0x1e)
                break;
        }
    }
    // ════════════════════════════════════════════════
    // $99D1 fadeInSpr — 仅 SPR 渐显
    // ════════════════════════════════════════════════
    fadeInSpr() {
        this.paletteLoadSPR();
        while (true) {
            const b = this.rd(0x004B);
            if (b >= 0x0f)
                break;
            this.wr(0x004B, b + 1);
            this.paletteWriteAll();
            this.waitCounter();
        }
    }
    // ════════════════════════════════════════════════
    // $9BA0 waitVBlank — 渐隐 + 清屏 + 清精灵 (场景切换前)
    // ════════════════════════════════════════════════
    waitVBlank() {
        this.fadeOut();
        this.ntClear();
        this.initHelper();
    }
    // ════════════════════════════════════════════════
    // $9F69 dataWriteHelper(a, y, x) — 调度器栈帧构建
    // 原 $9F69: STA $0002,X; DEY; LDA $0000,X; STA $0101,Y;
    //   LDA $0001,X; STA $0102,Y; STY $0001,X; LDA #$FF; STA $0000,X
    // 调用方需传零页基址 x。等价于把回调指针挂到调度器栈。
    // ════════════════════════════════════════════════
    dataWriteHelper(a, y, x) {
        this.wr(0x0002 + x, a);
        y = (y - 1) & 0xff;
        this.wr(0x0101 + y, this.rd(0x0000 + x));
        this.wr(0x0102 + y, this.rd(0x0001 + x));
        this.wr(0x0001 + x, y);
        this.wr(0x0000 + x, 0xff);
    }
    // ════════════════════════════════════════════════
    // $8920 tableLoad — 从 bank06 加载 19 字节场景表到 $0079/$007B
    // 原 $8920: LDX #$13; JSR $9DEE; 指针=$A0BF+...; 读 bank06
    // ════════════════════════════════════════════════
    tableLoad(a) {
        var _a, _b, _c;
        // $9DEE: $00ED=A; $00EC=0; 乘 0x13 (19)
        let ec = 0;
        let ed = a;
        for (let i = 0; i < 8; i++) {
            ec <<= 1;
            ed <<= 1;
            if (ed & 0x100) {
                ec += 0x13;
                ed &= 0xff;
            }
            ec &= 0xff;
            ed &= 0xff;
        }
        // 指针 = $A000 + ec/ed + $BF00 调整 → 实际 bank06 表
        // bank06 数据区由 bank06 侧提供 (KV: sceneTable)
        const tbl = (_a = this._store.get(`sceneTable_${(ed & 0xff).toString(16)}`)) !== null && _a !== void 0 ? _a : [];
        this.wr(0x0079, (_b = tbl[0]) !== null && _b !== void 0 ? _b : 0);
        this.wr(0x007A, 0);
        for (let i = 1; i < 19; i++) {
            this.wr(0x007B + (i - 1), (_c = tbl[i]) !== null && _c !== void 0 ? _c : 0);
        }
    }
    // ════════════════════════════════════════════════
    // $8AF7 sceneLoad — 场景装载
    // 入口: A=场景 id → ram_00ED
    // ════════════════════════════════════════════════
    sceneLoad(sceneId) {
        this.wr(0x00ED, sceneId);
        this.wr(0x0009, 0);
        this.wr(0x000A, 0);
        this.wr(0x000D, 0);
        this.wr(0x000E, 0);
        this.wr(0x005B, this.rd(0x005B) & 0x7f);
        // $8B09-$8B0F: 切 bank07 读场景数据 — 去CPU化: H5 直接 import bank07 数据, 无需切 bank
        // $8B12-$8B1A: 清 $0552-$063F
        for (let i = 0; i < 0xEE; i++)
            this.wr(0x0552 + i, 0);
        // $8B1C-$8B39: 查 SCENE_PTR_TABLE[sceneId] 得场景数据入口, 读前 6 字节 SceneData
        const sceneData = this.getSceneData(sceneId);
        if (sceneData) {
            this.applySceneData(sceneData);
        }
        // $8CB7: 切回场景 bank — 去CPU化: 无需切回, H5 数据始终可见
    }
    /**
     * 从 bank07 场景表读场景数据 (原 asm $8B1C-$8B6B)。
     * 查 SCENE_PTR_TABLE 得入口地址, 读前 6 字节解析为 SceneData。
     */
    getSceneData(sceneId) {
        if (sceneId < 0 || sceneId >= bank07_scenes_metatile_1.SCENE_PTR_TABLE.length)
            return null;
        // 场景原始字节 (从 bank07-tables 获取)
        const raw = this.getSceneRawBytes(sceneId);
        if (!raw || raw.length < 6)
            return null;
        // $8B3D-$8B6B: 解析前 6 字节
        const ptrLo = raw[0];
        const ptrHi = raw[1];
        const ctrl = raw[2];
        const palette = ctrl & 0x3F;
        const dir = (ctrl >> 6) & 0x03;
        const w = raw[3];
        const h = raw[4];
        const pos = raw[5];
        return { ptrLo, ptrHi, palette, dir, w, h, pos, ctrl };
    }
    /** 获取场景原始字节 (从 bank07 完整 8KB 数据按指针表提取) */
    getSceneRawBytes(sceneId) {
        return (0, bank07_scenes_metatile_1.getSceneData)(sceneId);
    }
    /** 应用场景数据 (从 bank07 场景表) */
    applySceneData(sd) {
        this.wr(0x0075, sd.ptrLo);
        this.wr(0x0076, sd.ptrHi);
        this.wr(0x0048, sd.palette);
        // $005B bit0 (方向)
        this.wr(0x005B, (this.rd(0x005B) & 0xfe) | (sd.dir & 1));
        // $005E/$005F 尺寸
        this.wr(0x005E, sd.w);
        this.wr(0x005F, sd.h);
        this.wr(0x005C, sd.pos & 0xff);
        this.wr(0x005D, (sd.pos >> 8) & 0xff);
        this.wr(0x0060, sd.dir);
        this.wr(0x0062, sd.ctrl);
        void sd;
    }
    // ════════════════════════════════════════════════
    // 每帧推进 (原 mainLoop $9EED 分发)
    // ════════════════════════════════════════════════
    update(frame) {
        void frame;
        // mainLoop 核心: 遍历调度器任务槽, 递减计数器, 执行就绪协程。
        // 翻译版由外部帧循环驱动; 这里委托调度协程执行。
        this.scheduleStep();
    }
    /** $9EEF-$9FFF 调度器单步 (协程调度器主循环) */
    scheduleStep() {
        // $9EED: LDX #$01; 遍历协程槽 (X=1,5,9,13,17,21)
        for (let slot = 1; slot < 0x19; slot += 4) {
            const c = this.rd(0x0000 + slot);
            // $9EF1: BEQ $9EFB (空槽跳过)
            if (c === 0)
                continue;
            // $9EF3: CMP #$FF; BEQ $9F52 (特殊值: 轻量恢复)
            if (c === 0xff) {
                this._resumeCoroutine(slot, true);
                return;
            }
            // $9EF7: DEC $0000,X; BEQ $9F0F (递减, =0 就绪)
            this.wr(0x0000 + slot, c - 1);
            if (c - 1 === 0) {
                this._resumeCoroutine(slot, false);
                return;
            }
        }
        // $9F04: LDA $001B; BPL $9F04 (等 VBlank)
        // H5: 帧循环自动驱动, 不需要忙等
        // $9F08: AND #$7F; STA $001B (清帧完成标志)
        if ((this.rd(0x001B) & 0x80) !== 0) {
            this.wr(0x001B, this.rd(0x001B) & 0x7f);
        }
    }
    /**
     * $9F0F/$9F52: 恢复协程上下文并执行
     * @param slot 协程槽基址 ($0000+X)
     * @param light true=$9F52 轻量恢复 (不恢复 E6-ED), false=$9F0F 完整恢复
     */
    _resumeCoroutine(slot, light) {
        // $9F0F: STX $0000 (存当前槽)
        this._currentSlot = slot;
        // $9F11-$9F1E: 切 R7 bank (槽[3] → $0025 → $8001)
        const r7bank = this.rd(0x0003 + slot);
        this.wr(0x0025, r7bank);
        // $9F21-$9F2E: 切 R6 bank (槽[2] → $0024 → $8001)
        const r6bank = this.rd(0x0002 + slot);
        this.wr(0x0024, r6bank);
        // $9F31-$9F34: 恢复栈指针 (槽[1]) — H5: 回调索引
        const callbackIdx = this.rd(0x0001 + slot);
        if (!light) {
            // $9F35-$9F50: PLA 恢复 $E6-$ED, Y, X
            // H5: 从 _coroutineCtx 恢复
            const ctx = this._coroutineCtx[slot];
            if (ctx) {
                this.wr(0x00E6, ctx.e6);
                this.wr(0x00E7, ctx.e7);
                this.wr(0x00E8, ctx.e8);
                this.wr(0x00E9, ctx.e9);
                this.wr(0x00EA, ctx.ea);
                this.wr(0x00EB, ctx.eb);
                this.wr(0x00EC, ctx.ec);
                this.wr(0x00ED, ctx.ed);
            }
        }
        // $9F51: RTS → 跳到协程代码 — H5: 调用回调
        const cb = this._coroutines[callbackIdx];
        if (cb) {
            cb();
        }
    }
    /**
     * $9FA8: 协程让出 (yield)
     * asm: 存 A→$0019; 压栈 X/Y/$ED-$E6; 存栈指针/R6/R7 到槽; 设计数器; JMP $9EFB
     * H5: 保存上下文到 _coroutineCtx, 设计数器, 返回到调度循环
     * @param a 让出参数 (1=等1帧, $FF=特殊等1帧, 0=等$FE帧)
     */
    _coroutineYieldImpl(a) {
        const slot = this._currentSlot;
        // $9FA8: STA $0019 (存让出参数)
        this._yieldWait = a;
        // $9FAA-$9FC5: 压栈 X/Y/$ED/$EC/$EB/$EA/$E9/$E8/$E7/$E6
        // H5: 存到 _coroutineCtx
        this._coroutineCtx[slot] = {
            e6: this.rd(0x00E6), e7: this.rd(0x00E7),
            e8: this.rd(0x00E8), e9: this.rd(0x00E9),
            ea: this.rd(0x00EA), eb: this.rd(0x00EB),
            ec: this.rd(0x00EC), ed: this.rd(0x00ED),
            y: 0, x: 0,
        };
        // $9FC6-$9FCA: TSX; TXA; LDX $0000; STA $0001,X (存栈指针到槽[1])
        // H5: 栈指针 = 回调索引 (不变, 下次恢复时还用同一个回调)
        // $9FCC-$9FD4: 存 $0024 (R6) → 槽[2], $0025 (R7) → 槽[3]
        this.wr(0x0002 + slot, this.rd(0x0024));
        this.wr(0x0003 + slot, this.rd(0x0025));
        // $9FD6-$9FE0: 设计数器
        // LDA $0019; BEQ $9FDE (a=0 → 设 $FE); CMP #$FF; BNE $9FE0 (a≠$FF → 设 a); LDA #$FE
        let count = a;
        if (a === 0)
            count = 0xfe;
        else if (a === 0xff)
            count = 0xfe;
        this.wr(0x0000 + slot, count & 0xff);
        // $9FE2: JMP $9EFB (回调度循环) — H5: 返回, 由帧循环驱动
    }
    /**
     * $9F69: 注册协程
     * @param slot 协程槽基址 ($0000+X)
     * @param r6bank R6 bank 号
     * @param callbackIdx 回调索引 (对应 $0101+Y)
     * @param ctx 初始上下文 ($E6-$ED)
     */
    registerCoroutine(slot, r6bank, callbackIdx, ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // $9F69: STA $0002,X (存 R6 bank 到槽[2])
        this.wr(0x0002 + slot, r6bank);
        // $9F6B-$9F77: DEY×2; 存回调指针到 $0101+Y; STY $0001,X (存 Y 到槽[1])
        this.wr(0x0001 + slot, callbackIdx);
        // $9F79: LDA #$FF; STA $0000,X (设计数器=$FF → 下一帧立即就绪)
        this.wr(0x0000 + slot, 0xff);
        // 存初始上下文
        if (ctx) {
            this._coroutineCtx[slot] = {
                e6: (_a = ctx.e6) !== null && _a !== void 0 ? _a : 0, e7: (_b = ctx.e7) !== null && _b !== void 0 ? _b : 0,
                e8: (_c = ctx.e8) !== null && _c !== void 0 ? _c : 0, e9: (_d = ctx.e9) !== null && _d !== void 0 ? _d : 0,
                ea: (_e = ctx.ea) !== null && _e !== void 0 ? _e : 0, eb: (_f = ctx.eb) !== null && _f !== void 0 ? _f : 0,
                ec: (_g = ctx.ec) !== null && _g !== void 0 ? _g : 0, ed: (_h = ctx.ed) !== null && _h !== void 0 ? _h : 0,
                y: (_j = ctx.y) !== null && _j !== void 0 ? _j : 0, x: (_k = ctx.x) !== null && _k !== void 0 ? _k : 0,
            };
        }
    }
    /**
     * $9F7E: 清协程槽
     * @param slot 协程槽基址
     */
    clearCoroutine(slot) {
        this.wr(0x0000 + slot, 0);
        this.wr(0x0001 + slot, 0);
    }
    /**
     * $9F89: 检查协程槽状态
     * @returns 0=空, 1=忙, 2=就绪
     */
    checkCoroutine(slot) {
        if (this.rd(0x0001 + slot) === 0)
            return 0;
        if (this.rd(0x0000 + slot) !== 0)
            return 1;
        // $9F91: LDA #$01; STA $0000,X (设就绪)
        this.wr(0x0000 + slot, 1);
        return 2;
    }
    // ════════════════════════════════════════════════════════════
    // $9148: 场景初始化协程 (开场回调索引 0)
    // asm $9148-$9200: 读场景数据流 ($0094),Y, 按数据类型分派
    //   <$80: JMP $94C1 (NT buffer 写入循环)
    //   ≥$80: TAX → 查表设精灵位置/属性 ($974A/$975B)
    // ════════════════════════════════════════════════════════════
    /** $9148: 场景初始化协程回调 */
    sub9148() {
        // $9148: LDA #$68; STA $0094; LDA #$05; STA $0095 (指针 = $0568)
        this.wr(0x0094, 0x68);
        this.wr(0x0095, 0x05);
        // $9150: LDA #$04; STA $0096 (计数器 = 4)
        this.wr(0x0096, 0x04);
        // $9154: LDY #$00; LDA ($0094),Y (读第一个字节)
        let y = 0;
        const ptr94 = this.rdPtr(0x0094, 0x0095);
        let a = this.rdMemByte(ptr94 + y);
        // $9158: BMI $915D (≥$80 → 精灵设置)
        if ((a & 0x80) !== 0) {
            // $915D: TAX; LDY #$04; JSR $974A (读场景数据[4])
            const x = a;
            this.sub974A(0x04);
            // $9163: LDY #$06; JSR $974A (读场景数据[6])
            this.sub974A(0x06);
            // $9168: TXA; AND #$10; BNE $91A6 (bit4 → $91A6)
            if ((x & 0x10) !== 0) {
                this.sub91A6(x);
            }
            else if ((x & 0x20) !== 0) {
                // $9175: LDX #$04; LDY #$0A; JSR $975B
                this.sub975B(0x04, 0x0A);
                // $917C: LDA $009A; STA $00E6
                this.wr(0x00E6, this.rd(0x009A));
                // $9180: LDY #$04; JSR $974A
                this.sub974A(0x04);
                // $9185: LDA $009A; SEC; SBC $00E6; STA $00E6
                this.wr(0x00E6, (this.rd(0x009A) - this.rd(0x00E6)) & 0xFF);
                // $918C: LDX #$06; LDY #$0E; JSR $975B
                this.sub975B(0x06, 0x0E);
                // $9193: LDA $009C; STA $00E8
                this.wr(0x00E8, this.rd(0x009C));
                // $9197: LDY #$06; JSR $974A
                this.sub974A(0x06);
                // $919C: LDA $009C; SEC; SBC $00E8; STA $00E8
                this.wr(0x00E8, (this.rd(0x009C) - this.rd(0x00E8)) & 0xFF);
                // JMP $91B4
                this.sub91B4();
            }
            else {
                // $9172: JMP $91F3
                this.sub91F3();
            }
        }
        else {
            // $915A: JMP $94C1 (NT 写入循环)
            this.sub94C1(a);
        }
    }
    /** $974A: 读场景数据 ($0094),Y → $009A/$009B */
    sub974A(y) {
        const ptr = this.rdPtr(0x0094, 0x0095);
        this.wr(0x009A, this.rdMemByte(ptr + y));
        this.wr(0x009B, this.rdMemByte(ptr + y + 1));
    }
    /** $975B: 读场景数据 ($0094),Y → $009C/$009D */
    sub975B(_x, y) {
        const ptr = this.rdPtr(0x0094, 0x0095);
        this.wr(0x009C, this.rdMemByte(ptr + y));
        this.wr(0x009D, this.rdMemByte(ptr + y + 1));
    }
    /** $91A6: 精灵位置设置 (bit4 路径) */
    sub91A6(_x) {
        // $91A6: LDA #$00; SEC; SBC $0046; STA $00E6
        this.wr(0x00E6, (0 - this.rd(0x0046)) & 0xFF);
        // $91AD: LDA #$00; SEC; SBC $0047; STA $00E8
        this.wr(0x00E8, (0 - this.rd(0x0047)) & 0xFF);
        // $91B4: 精灵数据循环
        this.sub91B4();
    }
    /** $91B4: 精灵数据循环 (读 ($0094),Y 写 $0468 区) */
    sub91B4() {
        const ptr = this.rdPtr(0x0094, 0x0095);
        let y = 0x10;
        // $91B6: LDA ($0094),Y; TAX; INY; LDA ($0094),Y; LSR×2; TAY
        let a = this.rdMemByte(ptr + y);
        let x = a;
        y++;
        let y2 = this.rdMemByte(ptr + y) >> 2;
        // $91BF: 循环
        while (y2 !== 0) {
            // LDA $00E6; CLC; ADC $0468,X; STA $0468,X
            this.wr(0x0468 + x, (this.rd(0x00E6) + this.rd(0x0468 + x)) & 0xFF);
            // ROR; EOR $00E6; BPL $91D5
            const ror = ((this.rd(0x0468 + x) >> 7) | (this.rd(0x00E6) << 1)) & 0xFF;
            if (((ror ^ this.rd(0x00E6)) & 0x80) !== 0) {
                this.wr(0x046A + x, this.rd(0x046A + x) ^ 0x08);
            }
            // $91D5: LDA $00E8; CLC; ADC $046B,X; STA $046B,X
            this.wr(0x046B + x, (this.rd(0x00E8) + this.rd(0x046B + x)) & 0xFF);
            const ror2 = ((this.rd(0x046B + x) >> 7) | (this.rd(0x00E8) << 1)) & 0xFF;
            if (((ror2 ^ this.rd(0x00E8)) & 0x80) !== 0) {
                this.wr(0x046A + x, this.rd(0x046A + x) ^ 0x04);
            }
            // $91EB: TXA; CLC; ADC #$04; TAX; DEY; BNE $91BF
            x = (x + 4) & 0xFF;
            y2--;
        }
        // $91F3: JMP $91F3 (后续处理)
        this.sub91F3();
    }
    /** $91F3: 场景数据后续处理 */
    sub91F3() {
        // $91F3: LDY #$01; LDA ($0094),Y; SEC; SBC #$01; STA ($0094),Y
        const ptr = this.rdPtr(0x0094, 0x0095);
        let v = this.rdMemByte(ptr + 1);
        v = (v - 1) & 0xFF;
        this.wrMemByte(ptr + 1, v);
        // $91FC: BEQ $9201 (计数器=0 → 下一场景段)
        if (v === 0) {
            // $9201: LDY #$00; LDA ($0094),Y; AND #$01; CLC; ADC #$09; TAX
            const a = this.rdMemByte(ptr) & 0x01;
            const x = (a + 0x09) & 0xFF;
            // 后续: 读下一场景段地址, 调 $94C1 或让出
            void x;
            // 让出协程 (等下一帧)
            this.coroutineYield(1);
        }
        else {
            // $91FE: JMP $94C1 (继续 NT 写入)
            this.sub94C1(0);
        }
    }
    /** $94C1: NT buffer 写入循环 (读场景数据写 $05E8 PPU buffer) */
    sub94C1(a) {
        // $94C1: LDA $0094; CLC; ADC #$20; STA $0094 (指针 += $20)
        let lo = this.rd(0x0094);
        let hi = this.rd(0x0095);
        lo = (lo + 0x20) & 0xFF;
        if (lo < 0x20)
            hi = (hi + 1) & 0xFF;
        this.wr(0x0094, lo);
        this.wr(0x0095, hi);
        // 读场景数据, 写 $05E8 buffer
        // 每条: [count, addrLo, addrHi, tile×count]
        // 简化: 读 ($0094),Y 数据流, 转成 PPU buffer 条目
        let y = 0;
        let off = 0;
        while (true) {
            const ptr = this.rdPtr(0x0094, 0x0095);
            const count = this.rdMemByte(ptr + y);
            y++;
            if (count === 0)
                break; // 结束
            const addrLo = this.rdMemByte(ptr + y);
            y++;
            const addrHi = this.rdMemByte(ptr + y);
            y++;
            // 写 $05E8 buffer: [count, addrLo, addrHi, tile×count]
            this.wr(0x05E8 + off, count);
            off++;
            this.wr(0x05E9 + off, addrLo);
            off++;
            this.wr(0x05EA + off, addrHi);
            off++;
            for (let i = 0; i < count; i++) {
                const tile = this.rdMemByte(ptr + y);
                y++;
                this.wr(0x05EB + off, tile);
                off++;
            }
        }
        // 结束标记
        this.wr(0x05E8 + off, 0);
        // 设 NT buffer 更新标志
        this.wr(0x0628, 0x80);
        // 让出协程 (等 NMI 渲染消费 buffer)
        void a;
        this.coroutineYield(1);
    }
    /** 读 RAM 字节 (addr < 0x0800) */
    rdMemByte(addr) {
        if (addr < 0x0800)
            return this.rd(addr);
        return 0;
    }
    /** 写 RAM 字节 */
    wrMemByte(addr, val) {
        if (addr < 0x0800)
            this.wr(addr, val);
    }
    // ════════════════════════════════════════════════════════════
    // bank30 $C500-$C54E 派发表 — 转发到 HardwareInitService (bank30)
    // 真实实现已迁移到 HardwareInitService, 这里保留转发壳供旧调用方
    // (this._system.subC5xx) 兼容, 避免改动 6 个 match service 构造函数。
    // ════════════════════════════════════════════════════════════
    /** $C515 协程让出 — 转发到协程调度器实现 */
    coroutineYield(a = 1) {
        this._coroutineYieldImpl(a);
    }
    /** $C50C 比赛阶段→RAM指针查表 — 转发 bank30 */
    subC50C() {
        var _a;
        (_a = this._hw) === null || _a === void 0 ? void 0 : _a.subC50C();
    }
    /** $C524 坐标变换 — 转发 bank30 */
    subC524(a) {
        return this._hw ? this._hw.subC524(a) : a;
    }
    /** $C52D 精灵批初始化 — 转发 bank30 */
    subC52D() {
        var _a;
        (_a = this._hw) === null || _a === void 0 ? void 0 : _a.subC52D();
    }
    /** $C530 NT 填充 — 转发 bank30 */
    subC530(x, a) {
        var _a;
        (_a = this._hw) === null || _a === void 0 ? void 0 : _a.subC530(x, a);
    }
    /** $C533 NT 刷新 — 转发 bank30 */
    subC533() {
        var _a;
        (_a = this._hw) === null || _a === void 0 ? void 0 : _a.subC533();
    }
    /** $C54E 读数据+设精灵 — 转发 bank30 */
    subC54E(a) {
        var _a;
        (_a = this._hw) === null || _a === void 0 ? void 0 : _a.subC54E(a);
    }
}
exports.GameSystemService = GameSystemService;
exports.default = GameSystemService;
