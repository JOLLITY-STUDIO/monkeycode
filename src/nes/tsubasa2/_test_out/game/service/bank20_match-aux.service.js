"use strict";
/**
 * Bank 20 Service — 比赛辅助逻辑 (完整翻译)
 *
 * 数据已直接 import `prg-bank-20.ts`, 无 MMC3 切换, 无 CPU 模拟。
 * PRG offset: 0x028010-0x02A00F, 标注地址 $8000-$9FFF → 数组索引 = 地址-$8000。
 *
 * ── 窗口映射 (关键) ─────────────────────────────
 * asm 中 $A000-$BFFF 窗口引用 (如 $A1B4/$AC47/$B80C/$B6C7/$B767/$BA87/$BACF)
 * 实际指向物理 bank 21: 数组索引 = 地址-$A000。
 * 统一经 `_readBank21(addr)` 访问。
 *
 * ── 功能总览 ───────────────────────────────────
 * 1. $800F 主状态机: 按 ram_053C 选流 ($8968 表) 消费控制码流
 *    (字节 ≥$F0 → $8084 12 路分派; <$F0 → 延时计数 ram_053B)。
 * 2. $83D9/$84DC: 两条独立"每名字记录"计时状态机 (记录 +$10/+$11 计时),
 *    处理精灵动画/位置数据流 ($8438/$857A 控制码分派)。
 * 3. $8624: 比赛精灵 OAM 渲染 ($0200 缓冲, 每 4B 一个精灵)。
 * 4. $8796: 动画偏移计数 ($87A7/$87C7 经 $C542/$C545 查 bank21 $FB4C 表)。
 *
 * 外部通过 dispatch(index) 驱动 (0=$84DC 1=$83D9 2=$8624 3=$8796)。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank20Service = exports.NAME_MAP_TABLE = exports.MAIN_STREAM_TABLE = exports.T_88DF = exports.T_88DA = exports.T_88D0 = exports.T_88A8 = exports.T_885B = exports.T_83A6 = exports.T_82F6 = exports.T_8264 = exports.T_88E4 = exports.NAME_RECORD_TABLE = void 0;
const prg_bank_20_1 = __importDefault(require("../data/prg/prg-bank-20"));
const prg_bank_21_1 = __importDefault(require("../data/prg/prg-bank-21")); // $A000-$BFFF 窗口 → 物理 bank 21
const prg_bank_31_1 = __importDefault(require("../data/prg/prg-bank-31")); // 固定区 $FBCC/$FB4C 表
// ═══════════════════════════════════════════════════════════════
// 常量表 (标注地址 → 本 bank 数组索引 = 地址-$8000)
// ═══════════════════════════════════════════════════════════════
/** $CD89 (bank30): 名字记录指针表 (32 项 16bit, ID→RAM 地址) */
exports.NAME_RECORD_TABLE = [
    0x0300, 0x030C, 0x0318, 0x0324, 0x0330, 0x033C, 0x0348, 0x0354,
    0x0360, 0x036C, 0x0378, 0x0384, 0x0390, 0x039C, 0x03A8, 0x03B4,
    0x03C0, 0x03CC, 0x03D8, 0x03E4, 0x03F0, 0x03FC, 0x0408, 0x040C,
    0x0410, 0x0414, 0x0418, 0x041C, 0x0420, 0x0424, 0x0428, 0x042C,
];
/** $88E4: 6 个名字记录区 RAM 基址 (16bit LE) */
exports.T_88E4 = [0x0547, 0x055C, 0x0571, 0x0586, 0x059B, 0x05B0];
/** $8264: 3 个 bank21 调色板基址 (16bit LE, CPU $B80C/$B6C7/$B767) */
exports.T_8264 = [0xB80C, 0xB6C7, 0xB767];
/** $82F6: 32B 调色板补丁 */
exports.T_82F6 = [
    0x0F, 0x0F, 0x0F, 0x30, 0x0F, 0x21, 0x89, 0x8A,
    0x0F, 0x21, 0x8B, 0x8C, 0x0F, 0x21, 0x8D, 0x8E,
    0x0F, 0x0F, 0x80, 0x81, 0x0F, 0x0F, 0x82, 0x83,
    0x0F, 0x0F, 0x84, 0x85, 0x0F, 0x0F, 0x86, 0x87,
];
/** $83A6: 8B 精灵调色板 */
exports.T_83A6 = [0x0F, 0x0F, 0x00, 0x00, 0x0F, 0x0F, 0x30, 0x00];
/** $885B: 6B 动画 tile 表 */
exports.T_885B = [0x36, 0x37, 0x3D, 0x3D, 0x37, 0x36];
/** $88A8: 40B 计分板 tile 表 */
exports.T_88A8 = [
    0x30, 0x3A, 0x35, 0x25, 0x52, 0x7A, 0x58, 0x75, 0x55, 0x70,
    0x20, 0x2A, 0x25, 0x15, 0x51, 0x59, 0x46, 0x77, 0x44, 0x73,
    0x20, 0x2A, 0x25, 0x43, 0x51, 0x59, 0x47, 0x77, 0x55, 0x73,
    0x20, 0x2A, 0x24, 0x26, 0x45, 0x7A, 0x48, 0x75, 0x63, 0x42,
];
/** $88D0: 10B 计分板属性表 */
exports.T_88D0 = [0x1C, 0x1D, 0x1E, 0x1F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35];
/** $88DA: 5B Y 偏移 */
exports.T_88DA = [0x1D, 0xFD, 0xFD, 0xFD, 0xFD];
/** $88DF: 5B X 偏移 */
exports.T_88DF = [0x2C, 0xC7, 0xC7, 0xC7, 0xC7];
/** 主数据流指针表位置 (标注 $8968 → 数组索引 0x1968) */
exports.MAIN_STREAM_TABLE = 0x1968;
/** 名字映射表位置 (标注 $88F0 → 数组索引 0x8F0) */
exports.NAME_MAP_TABLE = 0x08F0;
// ═══════════════════════════════════════════════════════════════
// Bank20Service
// ═══════════════════════════════════════════════════════════════
class Bank20Service {
    constructor(_store) {
        this._store = _store;
        /** 主数据流指针 (PRG_BANK_20 数组索引, 对应 ram_004C/004D) */
        this._streamPtr = 0;
        /** $80A2 stop 标记 (PLA PLA → 停主状态机) */
        this._stopped = false;
    }
    // ──────────────────────────────────────────────
    // 数据访问 (原始字节)
    // ──────────────────────────────────────────────
    /** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF, 内部数据访问) */
    readByte(addr) {
        return prg_bank_20_1.default[addr - 0x8000] ?? 0xFF;
    }
    /** 读取本 bank 内 16bit 小端数值 */
    readU16(addr) {
        return this.readByte(addr) | (this.readByte(addr + 1) << 8);
    }
    /** 读取 bank21 ($A000-$BFFF 窗口) 原始字节 */
    _readBank21(addr) {
        return prg_bank_21_1.default[addr - 0xA000] ?? 0xFF;
    }
    get store() { return this._store; }
    /**
     * 每帧驱动 (对应原版 NMI 中断中 Bank20 的调用序列)。
     * 驱动两条计时状态机 ($83D9/$84DC) 与比赛精灵渲染 ($8624)。
     * 由 MatchEngine 在主循环每帧调用; 若 RAM 未初始化 (记录指针为 0) 则跳过。
     */
    frameTick() {
        const s = this._store;
        // 守卫: 比赛记录区未激活时跳过 ($0600 名单计数 / $0441 持球者)
        const recPtr = s.read('ram_003C') | (s.read('ram_003D') << 8);
        if (recPtr === 0)
            return;
        try {
            this.entry_83D9();
            this.entry_84DC();
            this.entry_8624();
        }
        catch {
            // 帧驱动不应中断主循环
        }
    }
    // ──────────────────────────────────────────────
    // RAM 读写辅助
    // ──────────────────────────────────────────────
    /** 生成 DataStore key: ram_XXXX (4 位大写 hex) */
    _ramKey(addr) {
        return 'ram_' + (addr & 0xffff).toString(16).toUpperCase().padStart(4, '0');
    }
    /** 读名字记录 (RAM 地址) 内偏移 off 的字节 */
    _readName(addr, off) {
        return this._store.read(this._ramKey(addr + off)) & 0xff;
    }
    /** 写名字记录 (RAM 地址) 内偏移 off 的字节 */
    _writeName(addr, off, v) {
        this._store.write(this._ramKey(addr + off), v & 0xff);
    }
    // ──────────────────────────────────────────────
    // 固定区例程 (bank30, H5 语义化)
    // ──────────────────────────────────────────────
    /** $C509 (bank30 $CB99): 表跳转 — H5 语义化为直接 switch, 无实现体 */
    _dispatchTable(_idx) {
        // 空 (各调用处直接 switch)
    }
    /**
     * $C50C (bank30 $CD7C): A(ID) → 名字记录指针
     *   表 $CD89 32 项 16bit LE; 写入 ram_0034/0035。
     */
    _queryNamePtr0034(id) {
        const ptr = exports.NAME_RECORD_TABLE[id & 0xff] ?? 0x0300;
        this._store.write('ram_0034', ptr & 0xff);
        this._store.write('ram_0035', (ptr >> 8) & 0xff);
        return ptr;
    }
    /** 读当前 ram_0034/0035 名字记录指针 */
    _namePtr() {
        const s = this._store;
        return (s.read('ram_0034') & 0xff) | ((s.read('ram_0035') & 0xff) << 8);
    }
    /** 读当前 ram_003C/003D 记录指针 ($83D9/$84DC 状态机记录基址) */
    _recPtr() {
        const s = this._store;
        return (s.read('ram_003C') & 0xff) | ((s.read('ram_003D') & 0xff) << 8);
    }
    /**
     * $C536 (bank30 $CDC9): A 线性索引 → [列坐标, 行坐标]
     *   X = A/12*8+$34 (列), Y = A%12*8+$54 (行)
     */
    _fixedC536(a) {
        let x = 0;
        let v = a & 0xff;
        while (v >= 0x0c) {
            v -= 0x0c;
            x++;
        }
        const col = ((v << 3) + 0x54) & 0xff;
        const row = ((x << 3) + 0x34) & 0xff;
        return [col, row];
    }
    /** $C515 渲染同步等待 — H5 空 (同步由渲染层驱动) */
    _fixedC515() {
        // H5 空
    }
    /** $C533 PPU 队列渲染 — H5 空 */
    _fixedC533() {
        // H5 空
    }
    /** $C530 (bank30 $CC02): A 查 $FBCC 表 (A*12) → 从 ram_046F+X 填 16B 调色板 */
    _fixedC530(x, a) {
        const s = this._store;
        const ptr = 0x1bcc + ((a * 12) & 0xff); // $FBCC-$E000 (PRG_BANK_31 数组索引)
        let y = 0;
        for (let i = 0; i < 16; i++) {
            let v;
            if ((x & 3) === 0) {
                v = 0x0f; // $CC2E: X&3==0 → 每组第 0 色透明
            }
            else {
                v = prg_bank_31_1.default[ptr + y] ?? 0x0f;
                y++;
            }
            s.write(`ram_046F+${x}`, v);
            x = (x + 1) & 0xff;
        }
        s.write('ram_046C', 0x20); // $CC42
    }
    /**
     * $C545 (bank30 $CE4D): A → $FB4C 表 16bit LE 查找, 返回 [低, 高]。
     *   ASL carry (A bit7) 时 16bit 取反+1 (求负)。
     */
    _fixedC545(a) {
        let v = (a << 1) & 0xff;
        const neg = (a & 0x80) !== 0; // ASL carry
        if (v >= 0x80)
            v = (~v) & 0xff; // BPL → EOR #$FF
        v &= 0x7e;
        const base = 0x1b4c; // $FB4C-$E000
        let lo = prg_bank_31_1.default[base + v] ?? 0;
        let hi = prg_bank_31_1.default[base + v + 1] ?? 0;
        if (neg) {
            lo = (~lo) & 0xff;
            hi = (~hi) & 0xff;
            lo = (lo + 1) & 0xff;
            if (lo === 0)
                hi = (hi + 1) & 0xff;
        }
        return [lo, hi];
    }
    /** $C542 (bank30 $CE4A): A+$40 → $C545 (CLC 恒为直接查表) */
    _fixedC542(a) {
        return this._fixedC545((a + 0x40) & 0xff);
    }
    // ──────────────────────────────────────────────
    // $8003: 入口跳转表 (4 路)
    // ──────────────────────────────────────────────
    /**
     * 跳转表分发 ($8003)
     *   [0]→$84DC  [1]→$83D9  [2]→$8624  [3]→$8796
     */
    dispatch(index) {
        switch (index) {
            case 0:
                this.entry_84DC();
                break;
            case 1:
                this.entry_83D9();
                break;
            case 2:
                this.entry_8624();
                break;
            case 3:
                this.entry_8796();
                break;
            default: break;
        }
    }
    // ──────────────────────────────────────────────
    // $800F: 主状态机
    // ──────────────────────────────────────────────
    /** $800F 主状态机: ram_053A 驱动 (0=停, 负=初始化, 正=递减计数) */
    entry_800F() {
        const s = this._store;
        const a = s.read('ram_053A') & 0xff;
        if (a === 0)
            return; // $8012 BEQ $8083 (RTS)
        if ((a & 0x80) === 0) { // $8014 BPL $8067 (正 → 仅递减)
            this._mainDec();
            return;
        }
        // ── 初始化 ($8016-$8064) ──
        s.write('ram_053A', 1);
        const sub = s.read('ram_053C') & 0xff;
        // $8020/$8024: ram_004C/4D = $8968; ASL ram_053C → 读 16bit 流指针
        const streamAddr = this.readU16(exports.MAIN_STREAM_TABLE + sub * 2); // CPU 地址 $8xxx
        this._streamPtr = (streamAddr - 0x8000) & 0x1fff;
        // $8036-$8044: 清 ram_0547+X, X=0,$15,...,$69
        for (let x = 0; x !== 0x7e; x = (x + 0x15) & 0xff) {
            s.write(`ram_0547+${x}`, 0);
        }
        s.write('ram_053B', 1);
        s.write('ram_053D', 0);
        s.write('ram_0540', 0);
        s.write('ram_0541', 0xff);
        s.write('ram_0543', 1);
        s.write('ram_0544', 0x23);
        s.write('ram_0545', 0x45);
        this._mainDec();
    }
    /** $8067-$806C: DEC ram_053B; BEQ $806D (进入流循环); RTS */
    _mainDec() {
        const s = this._store;
        const b = (s.read('ram_053B') - 1) & 0xff;
        s.write('ram_053B', b);
        if (b !== 0)
            return;
        this._mainStreamLoop();
    }
    /** $806D 流循环: 读字节 <$F0 → 计数; ≥$F0 → $8084 分派 */
    _mainStreamLoop() {
        const s = this._store;
        for (;;) {
            const byte = prg_bank_20_1.default[this._streamPtr] ?? 0xff;
            if (byte < 0xf0) {
                s.write('ram_053B', byte); // $807B
                this._advanceStream(1); // $807E-$8080: A=1; JSR $83CF
                return;
            }
            this.fn_8084(byte); // $8075
            if (this._stopped) {
                this._stopped = false;
                return;
            } // $80A2
            // $8078: JMP $806D (继续循环)
        }
    }
    /** $83CF: 数据流指针前进 A 字节 */
    _advanceStream(a) {
        this._streamPtr += a & 0xff;
    }
    // ──────────────────────────────────────────────
    // $8084: 主控制码分派 (12 路)
    // ──────────────────────────────────────────────
    /** $8084: SEC; SBC #$F0 → 跳转表 $808A (12 项) */
    fn_8084(ctrl) {
        const idx = (ctrl - 0xf0) & 0xff;
        switch (idx) {
            case 0:
                this.entry_80A2();
                break; // $80A2 stop
            case 1:
                this.entry_80AA();
                break; // $80AA init-scene
            case 2:
                this.entry_812B();
                break; // $812B (数据误标)
            case 3:
                this.entry_8138();
                break; // $8138 (数据误标)
            case 4:
                this.entry_8142();
                break; // $8142 copy 4
            case 5:
                this.entry_8153();
                break; // $8153 palette
            case 6:
                this.entry_83AE();
                break; // $83AE 清 ram_0547+X
            case 7:
                this.entry_83BD();
                break; // $83BD ram_0540/41
            case 8:
                this.entry_816F();
                break; // $816F 指针重置
            case 9:
                this.entry_817C();
                break; // $817C 备份指针
            case 10:
                this.entry_8195();
                break; // $8195 递减计数
            case 11:
                this.entry_81A9();
                break; // $81A9 复制 3 字节
            default: break;
        }
    }
    /** $80A2: stop — PLA PLA; ram_053A=0 (停止主状态机) */
    entry_80A2() {
        this._store.write('ram_053A', 0);
        this._stopped = true;
    }
    /** $812B (数据误标): ram_053E=0; ram_053D=1; A=1 → $83CF */
    entry_812B() {
        this._store.write('ram_053E', 0);
        this._store.write('ram_053D', 1);
        this._advanceStream(1);
    }
    /** $8138 (数据误标): ram_053D=0; A=1 → $83CF */
    entry_8138() {
        this._store.write('ram_053D', 0);
        this._advanceStream(1);
    }
    /**
     * $80AA: 场景初始化 — 按 stream+5 选记录区 ($88E4 表),
     *   填入 bank21 指针与参数, 清 0x15 字节。
     */
    entry_80AA() {
        const s = this._store;
        const b5 = this.readByte(0x8000 + this._streamPtr + 5) & 0xff;
        const idx = (b5 & 0x1c) >> 1; // $80AE: AND #$1C; LSR
        const rec = exports.T_88E4[idx] ?? 0x0547; // ram_003A/3B
        // 清记录区 0x15 字节
        for (let i = 0; i < 0x15; i++)
            s.write(this._ramKey(rec + i), 0);
        // stream+1 → bank21 $A1B4 表 2B → rec+2/+3
        const b1 = this.readByte(0x8000 + this._streamPtr + 1) & 0xff;
        this._writeName(rec, 2, this._readBank21(0xA1B4 + b1 * 2));
        this._writeName(rec, 3, this._readBank21(0xA1B4 + b1 * 2 + 1));
        // stream+2 → bank21 $AC47 表 2B → rec+4/+5
        const b2 = this.readByte(0x8000 + this._streamPtr + 2) & 0xff;
        this._writeName(rec, 4, this._readBank21(0xAC47 + b2 * 2));
        this._writeName(rec, 5, this._readBank21(0xAC47 + b2 * 2 + 1));
        // stream+3 → rec+8; stream+4 → rec+$0C
        this._writeName(rec, 8, this.readByte(0x8000 + this._streamPtr + 3));
        this._writeName(rec, 0x0c, this.readByte(0x8000 + this._streamPtr + 4));
        // stream+5 → rec+0 = (b5&3)|$80
        this._writeName(rec, 0, (b5 & 3) | 0x80);
        this._advanceStream(6);
    }
    /** $8142/$8144: 复制流+1..+4 → ram_0493+1..4; A=5 → $83CF */
    entry_8142() {
        const s = this._store;
        for (let y = 1; y < 5; y++) {
            s.write(`ram_0493+${y}`, this.readByte(0x8000 + this._streamPtr + y));
        }
        this._advanceStream(5);
    }
    /**
     * $8153: A=stream+1; 负 → $81BA (精灵分派); 非负 → $C530($10, A);
     *   $8164: JSR $C533; $816A: A=2 → $83CF
     */
    entry_8153() {
        const a = this.readByte(0x8000 + this._streamPtr + 1) & 0xff;
        if ((a & 0x80) !== 0) {
            this.fn_81BA(a); // $8159
        }
        else {
            this._fixedC530(0x10, a); // $815F-$8161
        }
        this._fixedC533(); // $8164
        this._advanceStream(2); // $816A: A=2 → $83CF
    }
    /** $816F: 流读 2 字节 → 重置数据流指针 (不推进) */
    entry_816F() {
        const lo = this.readByte(0x8000 + this._streamPtr) & 0xff;
        const hi = this.readByte(0x8000 + this._streamPtr + 1) & 0xff;
        this._streamPtr = (((hi << 8) | lo) - 0x8000) & 0x1fff;
    }
    /** $817C: A=stream+1 → ram_0542; 备份 ram_004E/4F=流+2; A=2 → $83CF */
    entry_817C() {
        const s = this._store;
        s.write('ram_0542', this.readByte(0x8000 + this._streamPtr + 1));
        // 备份指针 (ram_004E/4F = 当前流 + 2)
        const back = this._streamPtr + 2;
        s.write('ram_004E', back & 0xff);
        s.write('ram_004F', (back >> 8) & 0xff);
        this._advanceStream(2);
    }
    /** $8195: DEC ram_0542; BEQ → A=0 (原地); 否则恢复备份指针; A=0 → $83CF */
    entry_8195() {
        const s = this._store;
        const c = (s.read('ram_0542') - 1) & 0xff;
        s.write('ram_0542', c);
        if (c !== 0) {
            // $819C-$81A2: 恢复 ram_004C/4D = ram_004E/4F
            this._streamPtr = (s.read('ram_004E') & 0xff) | ((s.read('ram_004F') & 0xff) << 8);
        }
        this._advanceStream(0);
    }
    /** $81A9: 复制流 3 字节 → ram_0542+1..3; A=4 → $83CF */
    entry_81A9() {
        const s = this._store;
        for (let y = 1; y < 4; y++) {
            s.write(`ram_0542+${y}`, this.readByte(0x8000 + this._streamPtr + y));
        }
        this._advanceStream(4);
    }
    /** $83AE: A=stream+1 → X; ram_0547+X=0; A=2 → $83CF */
    entry_83AE() {
        const x = this.readByte(0x8000 + this._streamPtr + 1) & 0xff;
        this._store.write(`ram_0547+${x}`, 0);
        this._advanceStream(2);
    }
    /** $83BD: ram_0540=stream+1; ram_0541=stream+2; A=3 → $83CF */
    entry_83BD() {
        const s = this._store;
        s.write('ram_0540', this.readByte(0x8000 + this._streamPtr + 1));
        s.write('ram_0541', this.readByte(0x8000 + this._streamPtr + 2));
        this._advanceStream(3);
    }
    // ──────────────────────────────────────────────
    // $81BA: 精灵子分派 (8 路, AND #$7F)
    // ──────────────────────────────────────────────
    /** $81BA: AND #$7F → 跳转表 $81BF (8 项) */
    fn_81BA(a) {
        const idx = (a & 0x7f) & 0xff;
        switch (idx) {
            case 0:
                this._subDispatch(this._store.read('ram_0441') & 0xff);
                break; // $81CF
            case 1:
                this._subDispatch(this._store.read('ram_0442') & 0xff);
                break; // $81E9
            case 2:
                this._subDispatch(this._store.read('ram_05FB') & 0xff);
                break; // $81DB
            case 3:
                this._subDispatch((this._store.read('ram_05FB') ^ 0x0b) & 0xff);
                break; // $81E1
            case 4:
                this.entry_82BC();
                break; // $82BC 调色板填充
            case 5:
                this.entry_837F();
                break; // $837F×2
            case 6:
                this.entry_837F();
                break;
            case 7:
                this._subDispatch(this._store.read('ram_05FC') & 0xff);
                break; // $81D5
            default: break;
        }
    }
    /** $81EC: 名字ID → $C50C; $826A; 记录首字节判空 → $8282/ram_002B-3; 调色板 16B */
    _subDispatch(id) {
        const s = this._store;
        s.write('ram_003A', id); // $81EC
        const rec = this._queryNamePtr0034(id);
        this.fn_826A(); // $81F1
        let a;
        let x;
        const b0 = this._readName(rec, 0);
        if (b0 === 0) {
            // $8201: A = ram_002B-3; X = 2 (ID 0/$0B → 4)
            a = (s.read('ram_002B') - 3) & 0xff;
            const id0 = s.read('ram_003A') & 0xff;
            x = (id0 === 0 || id0 === 0x0b) ? 4 : 2;
        }
        else {
            // $81FA: JSR $8282 (X 内部选择)
            a = this.fn_8282(b0);
            x = 0;
        }
        s.write('ram_003A', a);
        s.write('ram_003B', 0);
        // A*5 (16bit)
        let lo = (a * 5) & 0xff;
        let hi = Math.floor(a * 5 / 0x100) & 0xff;
        // + $8264 基址 (bank21)
        const base = exports.T_8264[x] ?? 0xB80C;
        lo = (lo + (base & 0xff)) & 0xff;
        hi = (hi + ((base >> 8) & 0xff)) & 0xff;
        const ptr = (hi << 8) | lo; // bank21 CPU 地址
        const t0 = this._readBank21(ptr);
        let y = 1;
        for (let xx = 0; xx < 0x10; xx++) {
            const m = xx & 3;
            if (m === 0)
                continue; // $825D: 跳过
            let v;
            if (m === 1)
                v = 0x0f; // $8258
            else if (m === 2) {
                v = this._readBank21(ptr + y);
                y++;
            } // $8253
            else
                v = t0; // $824E: PLA PHA
            s.write(`ram_047F+${xx}`, v);
        }
    }
    /** $826A: (ram_0034),0 → $88F0 映射 → ram_0546 (ID $0B 且映射 0 → 4) */
    fn_826A() {
        const s = this._store;
        const rec = this._namePtr();
        const b0 = this._readName(rec, 0);
        let v = prg_bank_20_1.default[exports.NAME_MAP_TABLE + b0] ?? 0;
        if (b0 === 0) {
            const id = s.read('ram_003A') & 0xff;
            if (id === 0x0b)
                v = 4;
        }
        s.write('ram_0546', v);
    }
    /** $8282: X 选择 (A==1→1, $0F≤A<$17→2, 否则 0) → 3 项表 $829A */
    fn_8282(a) {
        this._store.write('ram_003B', a);
        let x;
        if (a === 1)
            x = 1;
        else if (a < 0x0f || a >= 0x17)
            x = 0;
        else
            x = 2;
        switch (x) {
            case 0: return this._store.read('ram_003B') & 0xff; // $82A0
            case 1: // $82A3: ram_002A==0 → 1, 否则 $76
                return (this._store.read('ram_002A') & 0xff) === 0 ? 1 : 0x76;
            default: // $82AD: ram_002A==1 → ram_003B, 否则 $68+ram_003B
                return (this._store.read('ram_002A') & 0xff) === 1
                    ? (this._store.read('ram_003B') & 0xff)
                    : ((0x68 + (this._store.read('ram_003B') & 0xff)) & 0xff);
        }
    }
    /** $82BC: 调色板填充 — stream+2 负 → $8316; A*16+$BACF (bank21) 32B */
    entry_82BC() {
        const s = this._store;
        const b2 = this.readByte(0x8000 + this._streamPtr + 2) & 0xff;
        if ((b2 & 0x80) !== 0) {
            this.fn_8316(b2); // $82C2
        }
        const base = (0x1ACF + b2 * 16) & 0x1fff; // $BACF-$A000 (bank21 数组索引)
        s.write('ram_003B', 0);
        for (let x = 0; x < 0x20; x++) {
            const p = prg_bank_20_1.default[0x2F6 + x] ?? 0; // $82F6 (数组索引 0x2F6)
            let v;
            if ((p & 0x80) !== 0) {
                v = this._readBank21(0xA000 + base + (p & 0x7f)); // 间接
            }
            else {
                v = p; // 直接
            }
            s.write(`ram_046F+${x}`, v);
        }
        this._advanceStream(1); // $82F1: A=1 → $83CF
    }
    /** $8316: AND #$7F → 跳转表 $831B (6 项) — 返回调色板 A */
    fn_8316(a) {
        const s = this._store;
        const idx = (a & 0x7f) & 0xff;
        switch (idx) {
            case 0: // $832B: ram_002A==0 → 0, 否则 1
                return (s.read('ram_002A') & 0xff) === 0 ? 0 : 1;
            case 1: // $8335: A=3 → $8337 (ram_002A==1 时 +1)
            case 3: // $8342: A=5 → $8337
            case 5: // $8365: A=$0B → $8337
                {
                    const base = idx === 1 ? 3 : (idx === 3 ? 5 : 0x0b);
                    return (s.read('ram_002A') & 0xff) === 1 ? base : ((base + 1) & 0xff);
                }
            case 2: // $8347: ram_002B==$12 或 ram_002A==1 → $2E, 否则 $07/$09
            case 4: // $8361: SEC 变体 (A=$2E/$07/$09)
                {
                    const ram2b = s.read('ram_002B') & 0xff;
                    const ram2a = s.read('ram_002A') & 0xff;
                    let v;
                    if (ram2b === 0x12 || ram2a === 1)
                        v = 0x2e;
                    else if (ram2a === 0)
                        v = 0x07;
                    else
                        v = 0x09;
                    // CLC 变体 (idx 2): +0; SEC 变体 (idx 4): +1
                    return idx === 2 ? v : ((v + 1) & 0xff);
                }
            default: return 0;
        }
    }
    /** $837F/$8381: 精灵调色板 8B → ram_047F; bank21 $BA87 表 2B → ram_0481/82 */
    entry_837F() {
        const s = this._store;
        const fb = s.read('ram_05FB') & 0xff;
        const idx = (fb !== 0 ? 1 : 0);
        const v = (s.read(`ram_002A+${idx}`) & 0xff) << 1; // ram_002A/002B << 1
        for (let x = 0; x < 8; x++) {
            s.write(`ram_047F+${x}`, exports.T_83A6[x] ?? 0);
        }
        s.write('ram_0481', this._readBank21(0xBA87 + v));
        s.write('ram_0482', this._readBank21(0xBA88 + v));
    }
    // ──────────────────────────────────────────────
    // $83D9: 计时状态机 (记录+$10 计时)
    // ──────────────────────────────────────────────
    /** 子流指针 (ram_003E/003F, CPU 地址, 可能指向 bank20 $8xxx 或 bank21 $Axxx) */
    _subStreamPtr() {
        const s = this._store;
        return (s.read('ram_003E') & 0xff) | ((s.read('ram_003F') & 0xff) << 8);
    }
    _setSubStream(ptr) {
        this._store.write('ram_003E', ptr & 0xff);
        this._store.write('ram_003F', (ptr >> 8) & 0xff);
    }
    /** 读子流字节 (ram_003E)+off — 双窗口: $A000-$BFFF→bank21, 其余→bank20 */
    _readSubStream(off) {
        const addr = (this._subStreamPtr() + off) & 0xffff;
        if (addr >= 0xa000)
            return prg_bank_21_1.default[addr - 0xa000] ?? 0xff;
        return prg_bank_20_1.default[addr - 0x8000] ?? 0xff;
    }
    /** 读子流 16bit 小端 */
    _readSubStream16(off) {
        return this._readSubStream(off) | (this._readSubStream(off + 1) << 8);
    }
    /**
     * $83D9: 记录+$10 计时驱动。
     *   $FF=冻结 / 0=到期推进子流 / 其他=递减后返回。
     */
    entry_83D9() {
        const rec = this._recPtr();
        const timer = this._readName(rec, 0x10);
        if (timer === 0xff)
            return; // $83DF-$83E1: BEQ $83E8 (冻结)
        if (timer !== 0) {
            this._writeName(rec, 0x10, timer - 1); // $83E3-$83E6: SEC SBC #$01
            return;
        }
        this._advance83D9(rec); // $83E9
    }
    /** $83E9: 计时到期 → 消费子流直至延时字节/终止控制码 */
    _advance83D9(rec) {
        const s = this._store;
        // $83E9-$83EF: rec+0 &= $9F (清 bit5/bit6)
        this._writeName(rec, 0, this._readName(rec, 0) & 0x9f);
        // $83F1-$83F8: rec+$13/$14 = 0
        this._writeName(rec, 0x13, 0);
        this._writeName(rec, 0x14, 0);
        // $83FA-$8405: ram_003E/F = rec+$03/$04 (子流指针)
        this._setSubStream(this._readName(rec, 3) | (this._readName(rec, 4) << 8));
        s.write('ram_0040', 0); // $8405-$8407
        // $8409 循环: 读字节 < $F0 延时 / ≥ $F0 控制码 $8438
        for (;;) {
            const off = s.read('ram_0040') & 0xff; // $8409: LDY ram_0040
            s.write('ram_0040', (off + 1) & 0xff); // $840B: INC ram_0040
            const b = this._readSubStream(off); // $840D
            if (b < 0xf0) { // $840F-$8411: BCC $8419
                // $8419-$8435: 延时 b → rec+$10; 预读 stream[off+1] → rec+$12;
                //   rec+$03/$04 += off+2 (16bit, SEC ADC 语义)
                this._writeName(rec, 0x12, this._readSubStream(off + 1)); // $841D-$8421
                this._writeName(rec, 0x10, b); // $8423-$8426
                const sum = this._subStreamPtr() + off + 2; // $8429-$8435
                this._writeName(rec, 3, sum & 0xff);
                this._writeName(rec, 4, (sum >> 8) & 0xff);
                return;
            }
            if (this._ctrl8438(rec, b))
                return; // $8413: JSR $8438 (PLA PLA 终止型)
        }
    }
    /**
     * $8438: 控制码分派 (SEC SBC #$F0 → 9 路表 $843E)。
     * @returns true = $8450/$84C7 终止路径 (PLA PLA 结束推进)
     */
    _ctrl8438(rec, ctrl) {
        const s = this._store;
        const idx = (ctrl - 0xf0) & 0xff; // $8438-$8439
        switch (idx) {
            case 0: // $8450: rec+$10=$FF 终止
                this._writeName(rec, 0x10, 0xff);
                return true;
            case 1: // $8459: rec+0 |= $20
                this._writeName(rec, 0, this._readName(rec, 0) | 0x20);
                return false;
            case 2: // $845D: rec+0 |= $40
                this._writeName(rec, 0, this._readName(rec, 0) | 0x40);
                return false;
            case 3: { // $8466: 换子流 (2B 指针), off=0
                const off = s.read('ram_0040') & 0xff;
                this._setSubStream(this._readSubStream16(off));
                s.write('ram_0040', 0);
                return false;
            }
            case 4: { // $8477: rec+$0D=stream[off]; rec+$0E/F=ptr+off+1
                const off = s.read('ram_0040') & 0xff;
                this._writeName(rec, 0x0d, this._readSubStream(off));
                s.write('ram_0040', (off + 1) & 0xff);
                const sum = this._subStreamPtr() + off + 1;
                this._writeName(rec, 0x0e, sum & 0xff);
                this._writeName(rec, 0x0f, (sum >> 8) & 0xff);
                return false;
            }
            case 5: { // $8496: rec+$0D 递减, 非零恢复子流
                const v = (this._readName(rec, 0x0d) - 1) & 0xff;
                if (v === 0)
                    return false; // $849F: RTS (零则不改)
                this._writeName(rec, 0x0d, v);
                this._setSubStream(this._readName(rec, 0x0e) | (this._readName(rec, 0x0f) << 8));
                s.write('ram_0040', 0);
                return false;
            }
            case 6: { // $84B3: rec+$0D/$14 = stream[off]/[off+1]
                const off = s.read('ram_0040') & 0xff;
                this._writeName(rec, 0x0d, this._readSubStream(off));
                this._writeName(rec, 0x14, this._readSubStream(off + 1));
                s.write('ram_0040', (off + 2) & 0xff);
                return false;
            }
            case 7: { // $84C7: rec+$12=stream[off] → $8450 终止
                const off = s.read('ram_0040') & 0xff;
                this._writeName(rec, 0x12, this._readSubStream(off));
                this._writeName(rec, 0x10, 0xff);
                return true;
            }
            case 8: { // $84D2: ram_0546 = stream[off]
                const off = s.read('ram_0040') & 0xff;
                s.write('ram_0040', (off + 1) & 0xff);
                s.write('ram_0546', this._readSubStream(off));
                return false;
            }
            default: return false; // 表 9 项, 越界不可达
        }
    }
    // ──────────────────────────────────────────────
    // $84DC: 计时状态机 (记录+$11 计时)
    // ──────────────────────────────────────────────
    /**
     * $84DC: 记录+$11 计时驱动。
     *   $FF=冻结 / 0=到期推进子流 / 其他=递减后仍执行坐标积分 ($852A)。
     */
    entry_84DC() {
        const s = this._store;
        const rec = this._recPtr();
        const timer = this._readName(rec, 0x11);
        if (timer === 0xff)
            return; // $84E2-$84E6
        if (timer !== 0) {
            this._writeName(rec, 0x11, timer - 1); // $84E7-$84EA
            this._posIntegrate(rec); // $84EC: JMP $852A
            return;
        }
        // $84EF: 到期推进子流
        s.write('ram_0040', 0);
        this._setSubStream(this._readName(rec, 1) | (this._readName(rec, 2) << 8));
        // $84FC-$850D: rec+0 bit4=1 → 子流指针 += 4 (16bit)
        if ((this._readName(rec, 0) & 0x10) !== 0) {
            this._setSubStream((this._subStreamPtr() + 4) & 0xffff);
        }
        this._writeName(rec, 0, this._readName(rec, 0) & 0xef); // $850F: 清 bit4
        this._ctrl857A(rec); // $8517: JSR $857A
        // $851A-$8528: rec+$01/$02 += ram_0040 (16bit)
        const sum = (this._readName(rec, 1) | (this._readName(rec, 2) << 8))
            + (s.read('ram_0040') & 0xff);
        this._writeName(rec, 1, sum & 0xff);
        this._writeName(rec, 2, (sum >> 8) & 0xff);
        this._posIntegrate(rec); // $852A
    }
    /**
     * $852A: 坐标积分 — ram_0041/42/43 位拆装 + $85F2 双四字节运动推进。
     */
    _posIntegrate(rec) {
        const s = this._store;
        s.write('ram_0042', 0); // $852A-$852E
        s.write('ram_0043', 0);
        const b0 = this._readName(rec, 0);
        s.write('ram_0041', b0 & 0xfc); // $8530-$8536
        // $8538-$853E: bit0→ram_0042, bit1→ram_0043 (LSR+ROL)
        s.write('ram_0042', b0 & 0x01);
        s.write('ram_0043', (b0 >> 1) & 0x01);
        this._add85F2(rec, 0, 5); // $8540-$8544: X=0 Y=5
        this._add85F2(rec, 1, 9); // $8547-$854B: X=1 Y=9
        // $854E-$8556: bit0/bit1 还原 (符号扩展可能翻转) → rec+0
        let a = ((s.read('ram_0043') & 1) << 1) | (s.read('ram_0042') & 1);
        s.write('ram_0042', (s.read('ram_0042') >> 1) & 0xff);
        s.write('ram_0043', (s.read('ram_0043') >> 1) & 0xff);
        a = (a | (s.read('ram_0041') & 0xff)) & 0xff;
        this._writeName(rec, 0, a);
        if ((a & 0x10) === 0)
            return; // $855C-$855E: BEQ $8579
        // $8560-$8576: 子流 4 字节速度 → rec+$05/$07 与 rec+$09/$0B
        this._setSubStream(this._readName(rec, 1) | (this._readName(rec, 2) << 8));
        this._add860D(rec, 5, 1); // X=5 Y=1
        this._add860D(rec, 9, 3); // X=9 Y=3
    }
    /**
     * $857A: 控制码分派 (5 路表 $8583, 索引=字节值本身)。
     *   0=$85A0 终止($FF)  1=$85A9 计时+坐标  2=$85D5 计时+标志
     *   3=$85E1 计时+坐标+标志  4=$858D 跳转子流(2B, 继续循环)
     */
    _ctrl857A(rec) {
        const s = this._store;
        for (;;) {
            const off = s.read('ram_0040') & 0xff; // $857A-$857C
            s.write('ram_0040', (off + 1) & 0xff);
            const code = this._readSubStream(off); // $857E
            switch (code) {
                case 0: // $85A0: rec+$11=$FF 终止
                    this._writeName(rec, 0x11, 0xff);
                    return;
                case 1: // $85A9
                    this._h85A9(rec);
                    return;
                case 2: // $85D5: $85E7 + rec+0|=$10
                    this._h85E7(rec);
                    this._writeName(rec, 0, this._readName(rec, 0) | 0x10);
                    return;
                case 3: // $85E1: $85A9 + rec+0|=$10
                    this._h85A9(rec);
                    this._writeName(rec, 0, this._readName(rec, 0) | 0x10);
                    return;
                case 4: // $858D: 换子流 (2B), off=0
                    this._setSubStream(this._readSubStream16(off + 1));
                    s.write('ram_0040', 0);
                    continue; // JMP $857A
                default: return; // 表 5 项, 越界安全退出
            }
        }
    }
    /** $85A9: 子流 3B → rec+$11 (新计时) / rec+$05 / rec+$07 */
    _h85A9(rec) {
        this._h85E7(rec); // $85A9: JSR $85E7
        const s = this._store;
        const off = s.read('ram_0040') & 0xff;
        const v1 = this._readSubStream(off); // $85AC-$85B1 → X
        const v2 = this._readSubStream(off + 1); // $85B2-$85B5
        s.write('ram_0040', (off + 2) & 0xff); // $85B5-$85B7
        this._writeName(rec, 7, v2); // $85B7-$85B9: Y=7
        this._writeName(rec, 5, v1); // $85BD-$85BE: Y=5
    }
    /** $85E7: 子流[off] → rec+$11 (新计时); off+1 */
    _h85E7(rec) {
        const s = this._store;
        const off = s.read('ram_0040') & 0xff;
        this._writeName(rec, 0x11, this._readSubStream(off));
        s.write('ram_0040', (off + 1) & 0xff);
    }
    /**
     * $85F2: 四字节运动积分 (X 选 ram_0042/43 累计器, Y 为记录偏移)。
     *   rec[Y+1] = rec[Y] + rec[Y+1]; (C 保留)
     *   rec[Y+2] ≥ $80 → ram_0042+X -= 1 (DEC 不影响 C);
     *   rec[Y+3] = rec[Y+2] + rec[Y+3] + C; ram_0042+X += 新 C。
     */
    _add85F2(rec, x, y) {
        const s = this._store;
        const key = 'ram_004' + (2 + x); // ram_0042 / ram_0043
        const t1 = this._readName(rec, y) + this._readName(rec, y + 1); // CLC ADC
        this._writeName(rec, y + 1, t1 & 0xff);
        const c1 = t1 > 0xff ? 1 : 0;
        const v2 = this._readName(rec, y + 2); // LDA (不影响 C)
        if (v2 >= 0x80) { // BPL 跳过 DEC
            s.write(key, (s.read(key) - 1) & 0xff);
        }
        const t2 = v2 + this._readName(rec, y + 3) + c1; // ADC (C=上次进位)
        this._writeName(rec, y + 3, t2 & 0xff);
        s.write(key, (s.read(key) + (t2 > 0xff ? 1 : 0)) & 0xff); // ADC #$00
    }
    /**
     * $860D: 子流 2 字节速度加到 rec+X / rec+X+2 (16bit 带进位)。
     *   rec[X] += stream[ys-1] (CLC); rec[X+2] += stream[ys] + C。
     */
    _add860D(rec, x, ys) {
        const s0 = this._readSubStream(ys - 1); // $8611-$8613 (DEY 读)
        const s1 = this._readSubStream(ys); // $860D-$860F
        const t1 = this._readName(rec, x) + s0; // CLC ADC
        this._writeName(rec, x, t1 & 0xff);
        const t2 = this._readName(rec, x + 2) + s1 + (t1 > 0xff ? 1 : 0);
        this._writeName(rec, x + 2, t2 & 0xff);
    }
    // ──────────────────────────────────────────────
    // $8624: 比赛精灵 OAM 渲染 ($0200 缓冲, 每 4B 一精灵)
    // ──────────────────────────────────────────────
    /**
     * $8624: 主渲染循环。
     *   ram_062D&0F==5 → $8861 计分板; 否则 $8753 背景 + 球员 0..$15
     *   (0 与 $0B 跳过), $86DB 判定渲染 (carry=1) 后写 4B 精灵。
     */
    entry_8624() {
        const s = this._store;
        const mode = s.read('ram_062D') & 0x0f; // $8624-$8627
        if (mode === 5) { // $8629-$862D
            this.entry_8864();
            return;
        }
        this.fn_8753(); // $8630
        s.write('ram_0046', 0); // $8633-$8635
        for (;;) { // $8637
            const i = s.read('ram_0046') & 0xff;
            if (i === 0 || i === 0x0b) { // $8639/$863E: 跳过
                if (this._nextPlayer8624())
                    return;
                continue;
            }
            const [tile, draw] = this.fn_86DB(i); // $8645
            if (!draw) { // $8648: BCS $864D
                if (this._nextPlayer8624())
                    return;
                continue;
            }
            let a = tile;
            const x = s.read('ram_003B') & 0xff; // $864D
            const name = this._namePtr();
            // $864F-$866B: name+$06 clamp $34-$CC + $88DA[mode] → OAM byte3
            let v = this._readName(name, 6);
            if (v < 0x34)
                v = 0x34; // CMP #$34; BCS
            if (v >= 0xcc)
                v = 0xcc; // CMP #$CC; BCC
            s.write(this._ramKey(0x0200 + x + 3), (v + exports.T_88DA[mode]) & 0xff);
            // $866E-$868A: name+$08 clamp $54-$AC + $88DF[mode] → OAM byte0
            v = this._readName(name, 8);
            if (v < 0x54)
                v = 0x54;
            if (v >= 0xac)
                v = 0xac;
            s.write(this._ramKey(0x0200 + x), (v + exports.T_88DF[mode]) & 0xff);
            s.write(this._ramKey(0x0200 + x + 2), 3); // $868D: attr=3
            // $8692-$86B2: tile 特殊化 (带球者闪烁 / 持球者标记)
            const flash = ((s.read('ram_0615') & 0x80) !== 0) // BIT; BPL
                && (s.read('ram_05FB') & 0xff) !== 0
                && i < 0x0b;
            if (flash) {
                a = this.entry_86F2(); // $86A2
            }
            else if (i === (s.read('ram_0441') & 0xff)) {
                a = this.fn_881D(x); // $86AF
            }
            // $86B5-$86C2: tile 重映射 (≥$0B 先 -1; +$11; ≥$20 再 +$10)
            let t = a & 0xff;
            if (t >= 0x0b)
                t = (t - 1) & 0xff; // CMP #$0B; BCC; SBC #$01
            t = (t + 0x11) & 0xff; // CLC; ADC #$11
            if (t >= 0x20)
                t = (t + 0x10) & 0xff; // CMP #$20; BCC; ADC #$0F (C=1)
            s.write(this._ramKey(0x0200 + x + 1), t); // $86C4
            s.write('ram_003B', (x + 4) & 0xff); // $86C7-$86CB
            s.write('ram_0048', (s.read('ram_0048') + 1) & 0xff); // $86CD
            if (this._nextPlayer8624())
                return;
        }
    }
    /** $86CF-$86D5: ram_0046++; ==$16 → true (结束主循环) */
    _nextPlayer8624() {
        const s = this._store;
        const n = (s.read('ram_0046') + 1) & 0xff;
        s.write('ram_0046', n);
        return n === 0x16;
    }
    /**
     * $86DB: 球员 i → [tile 基值, 是否渲染]。
     *   ram_062D&0F 查表 $86E6: 0/1/4→$871D (SEC, A=idx);
     *   2→$871F (i≥$0B / 持球者 / ram_0430 名单命中 → 渲染);
     *   3→$873B (持球者 / ram_0600 名单命中 → 渲染)。
     */
    fn_86DB(i) {
        this._queryNamePtr0034(i); // $86DB-$86DE: JSR $C50C
        const s = this._store;
        const idx = s.read('ram_062D') & 0x0f;
        switch (idx) {
            case 0:
            case 1:
            case 4: // $871D: SEC; RTS
                return [idx, true];
            case 2: { // $871F
                if (i >= 0x0b)
                    return [i, true]; // $8721-$8723
                if (i === (s.read('ram_0441') & 0xff))
                    return [i, true]; // $8725
                let x = s.read('ram_0430') & 0xff; // $872A-$872D
                while (x !== 0) {
                    if (i === (s.read(this._ramKey(0x0430 + x)) & 0xff))
                        return [i, true];
                    x = (x - 1) & 0xff; // $8734-$8735
                }
                return [i, false]; // $8737: CLC
            }
            case 3: { // $873B
                if (i === (s.read('ram_0441') & 0xff))
                    return [i, true]; // $8740
                let x = s.read('ram_0600') & 0xff; // $8742-$8745
                while (x !== 0) {
                    if (i === (s.read(this._ramKey(0x0600 + x)) & 0xff))
                        return [i, true];
                    x = (x - 1) & 0xff;
                }
                return [i, false]; // $874F: SEC
            }
            default: return [i, true]; // 表 6 项, idx≤4 有效
        }
    }
    /**
     * $86F2: 带球者闪烁 tile。
     *   i≠ram_05FD → 直接返回 i;
     *   i==ram_05FD: ram_062E==0 → ram_062D^=$40, ram_062E=7(bit6)/4;
     *   ram_062E--; bit6=0 → i+$0B (CLC ADC)。
     */
    entry_86F2() {
        const s = this._store;
        const i = s.read('ram_0046') & 0xff;
        if (i !== (s.read('ram_05FD') & 0xff))
            return i; // $86F2-$86F7
        if ((s.read('ram_062E') & 0xff) === 0) { // $86F9-$86FC
            s.write('ram_062D', s.read('ram_062D') ^ 0x40); // $8700-$8705
            s.write('ram_062E', (s.read('ram_062D') & 0x40) !== 0 ? 7 : 4); // $86FE-$870C
        }
        s.write('ram_062E', (s.read('ram_062E') - 1) & 0xff); // $870F
        if ((s.read('ram_062D') & 0x40) === 0) { // $8714-$8717: BVS
            return (i + 0x0b) & 0xff; // $8719-$871A
        }
        return i; // $871C
    }
    /**
     * $8753: 背景精灵 (ram_062D&0F 查表 $875B)。
     *   0/4→RTS  1→$8768 (ram_0624→$C536→$87E7)
     *   2→$8771 (ram_05FC 记录 name+$06/$08→$87E7)
     *   3→$8784 (ram_0624→$87A7/$87C7 滚动累计→$87E7)
     */
    fn_8753() {
        const s = this._store;
        const idx = s.read('ram_062D') & 0x0f;
        switch (idx) {
            case 0:
            case 4: return; // $8767: RTS
            case 1: { // $8768
                const [y54, x34] = this._fixedC536(s.read('ram_0624') & 0xff);
                this._writeOam87E7(x34, y54);
                return;
            }
            case 2: { // $8771
                this._queryNamePtr0034(s.read('ram_05FC') & 0xff);
                const name = this._namePtr();
                this._writeOam87E7(this._readName(name, 6), this._readName(name, 8));
                return;
            }
            case 3: { // $8784
                const v = s.read('ram_0624') & 0xff;
                const hiA = this.fn_87A7(v); // $8787: 结果 A (X 通道)
                const hiC = this.fn_87C7(v); // $878E: 结果 Y 通道
                this._writeOam87E7(hiA, hiC);
                return;
            }
            default: return;
        }
    }
    /**
     * $87E7: 写 4B 精灵 (X-3 → byte3, Y+$C7 → byte0;
     *   ram_062D==$83 → tile $11/attr 3, 否则 tile $3C/attr 1)。
     */
    _writeOam87E7(x34, y54) {
        const s = this._store;
        const x = s.read('ram_003B') & 0xff;
        s.write(this._ramKey(0x0200 + x + 3), (x34 + 0xfd) & 0xff); // $87E7-$87ED
        s.write(this._ramKey(0x0200 + x), (y54 + 0xc7) & 0xff); // $87F0-$87F4
        let tile = 0x3c, attr = 1; // $87F7/$87FF
        if ((s.read('ram_062D') & 0xff) === 0x83) { // $87F9-$8806: CPY #$83
            tile = 0x11;
            attr = 3;
        }
        s.write(this._ramKey(0x0200 + x + 1), tile);
        s.write(this._ramKey(0x0200 + x + 2), attr);
        s.write('ram_003B', (x + 4) & 0xff); // $880F-$8813
        s.write('ram_0048', (s.read('ram_0048') + 1) & 0xff); // $8815
        s.write('ram_0532', 1); // $8817-$8819
    }
    // ──────────────────────────────────────────────
    // $8796: 动画偏移计数 (滚动累计)
    // ──────────────────────────────────────────────
    /** $8796: ram_0635 = $87A7($10); ram_0637 = $87C7($10) */
    entry_8796() {
        const s = this._store;
        s.write('ram_0635', this.fn_87A7(0x10)); // $8796-$879B
        s.write('ram_0637', this.fn_87C7(0x10)); // $879E-$87A3
    }
    /**
     * $87A7: 滚动累计 — $C545(ram_062C) 速度 [lo,hi] 累加 n+1 次:
     *   x=ram_0639 += lo (进位传给 y); y=ram_0635 += hi。返回 y。
     */
    fn_87A7(n) {
        const s = this._store;
        const [lo, hi] = this._fixedC545(s.read('ram_062C') & 0xff); // $87A9-$87B1
        s.write('ram_003C', lo); // STX ram_003C
        s.write('ram_003D', hi); // STY ram_003D
        let x = s.read('ram_0639') & 0xff;
        let y = s.read('ram_0635') & 0xff;
        let cnt = n; // $87A7: STA ram_003E
        for (;;) {
            const t = x + lo; // $87B9-$87BD: CLC TXA ADC
            y = (y + hi + (t > 0xff ? 1 : 0)) & 0xff; // $87BE-$87C1: TYA ADC
            x = t & 0xff;
            cnt = (cnt - 1) & 0xff; // $87C2: DEC
            if ((cnt & 0x80) !== 0)
                break; // $87C4: BPL
        }
        return y;
    }
    /**
     * $87C7: 同 $87A7, 但速度查 $C542 (A+$40 → $C545),
     *   初值 x=ram_063B, y=ram_0637。返回 y。
     */
    fn_87C7(n) {
        const s = this._store;
        const [lo, hi] = this._fixedC542(s.read('ram_062C') & 0xff); // $87C9-$87D1
        s.write('ram_003C', lo);
        s.write('ram_003D', hi);
        let x = s.read('ram_063B') & 0xff;
        let y = s.read('ram_0637') & 0xff;
        let cnt = n;
        for (;;) {
            const t = x + lo; // $87D9-$87DD
            y = (y + hi + (t > 0xff ? 1 : 0)) & 0xff;
            x = t & 0xff;
            cnt = (cnt - 1) & 0xff; // $87E2: DEC
            if ((cnt & 0x80) !== 0)
                break; // $87E4: BPL
        }
        return y;
    }
    /**
     * $881D: 持球者标记 tile — ram_0640 帧计数 (0 时 ram_0641 = (帧+1)%3,
     * 重置 4); ram_05FB==0 → 帧+3 且 attr|$80; ram_0637 bit7=0 → 再 ^$80;
     * OR 进 OAM attr; tile = $885B[帧]。ram_0640--。
     */
    fn_881D(x) {
        const s = this._store;
        if ((s.read('ram_0640') & 0xff) === 0) { // $881D-$8820
            let f = ((s.read('ram_0641') & 0xff) + 1) & 0xff; // $8822-$8826
            if (f === 3)
                f = 0; // $8826-$882A
            s.write('ram_0641', f);
            s.write('ram_0640', 4); // $882F-$8831
        }
        let a = 0; // $8834
        let y = s.read('ram_0641') & 0xff; // $883A
        if ((s.read('ram_05FB') & 0xff) === 0) { // $8836-$883E (PHP/PLP Z 标志)
            y = (y + 3) & 0xff; // $8840-$8844
            a = 0x80; // $8845
        }
        if ((s.read('ram_0637') & 0x80) === 0)
            a ^= 0x80; // $8847-$884C: BMI
        const attrKey = this._ramKey(0x0200 + x + 2);
        s.write(attrKey, (s.read(attrKey) | a) & 0xff); // $884E-$8851
        const tile = exports.T_885B[y] ?? 0; // $8854
        s.write('ram_0640', (s.read('ram_0640') - 1) & 0xff); // $8857
        return tile;
    }
    /**
     * $8861 (stub 名 8864): 计分板渲染 (ram_062D&0F==5 通道)。
     *   X = ram_002C*10 (+bit5 进位) → $88A8 表基址; 10 精灵
     *   (tile=$88D0[行], byte3=(tv>>5)+$A0, byte0=(tv&$F)<<2+$A2, attr=0)。
     */
    entry_8864() {
        const s = this._store;
        const v = s.read('ram_002C') & 0xff; // $8861: LDA a: ram_002C
        const d2 = (v << 1) & 0xff;
        s.write('ram_0046', d2); // $8864-$8865
        // $8867-$8869: ASL×2 (第二次 C=v.bit5); ADC ram_0046 → v*10+C
        const c5 = (v & 0x20) !== 0 ? 1 : 0;
        let xi = ((((d2 << 1) & 0xff) << 1) & 0xff) + d2 + c5;
        s.write('ram_0046', 0); // $886C-$886E: 行计数=0
        for (;;) {
            const row = s.read('ram_0046') & 0xff; // $8870
            const x = s.read('ram_003B') & 0xff; // $8875
            s.write(this._ramKey(0x0200 + x + 1), exports.T_88D0[row] ?? 0); // $8872-$8877
            const tv = exports.T_88A8[xi] ?? 0; // $887A
            // $887E-$8884: (tv&$F0)>>1 + $A0 (CLC)
            s.write(this._ramKey(0x0200 + x + 3), (((tv & 0xf0) >> 1) + 0xa0) & 0xff);
            // $8887-$888E: (tv&$F)<<2 + $A2 (+ASL 进位, 恒 0)
            s.write(this._ramKey(0x0200 + x), (((tv & 0x0f) << 2) + 0xa2) & 0xff);
            s.write(this._ramKey(0x0200 + x + 2), 0); // $8891-$8893
            xi = (xi + 1) & 0xff; // $8896: INX
            s.write('ram_003B', (x + 4) & 0xff); // $8897-$889B
            s.write('ram_0048', (s.read('ram_0048') + 1) & 0xff); // $889D
            const n = (row + 1) & 0xff; // $889F
            s.write('ram_0046', n);
            if (n === 0x0a)
                return; // $88A1-$88A5
        }
    }
}
exports.Bank20Service = Bank20Service;
