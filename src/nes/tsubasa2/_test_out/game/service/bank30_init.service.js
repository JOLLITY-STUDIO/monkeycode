"use strict";
/**
 * Bank 30 Service — 硬件初始化 (H5 简化版)
 *
 * 数据已直接 import `rom-data/prg-bank-30.ts`, 无 MMC3 bank 切换。
 * PRG offset: 0x3C010-0x3E00F
 *
 * 原始 Bank 30 是核心系统库，包含:
 *   - RESET/NMI/IRQ 中断向量跳转
 *   - 公共 API 跳转表 ($C509-$C5FF, ~80 entries)
 *   - 数学运算、球员数据处理等
 *
 * H5 版本: 不需要 MMC3、不需要 NMI/IRQ 模拟、
 * 不需要 CPU 指令执行。Bank30 只做初始化工作，
 * 然后直接将控制权交给 Bank02。
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank30Service = void 0;
const paletteManager_1 = require("../data/ppu/pallete/paletteManager");
const bank29_roster_service_1 = require("./bank29_roster.service");
const prg_bank_30_1 = __importDefault(require("../data/prg-bank-30"));
// ── RAM 语义键 (Bank30 演出链 $043C 区域 + 演出请求) ──
const KEY_0034 = 'ram_0034'; // 名字区指针 lo
const KEY_0035 = 'ram_0035'; // 名字区指针 hi
const KEY_0005 = 'ram_0005'; // $CBB0 写入的任务参数
const KEY_043B = 'ram_043B'; // 演出类型 (0-6, 0x1E-0x20)
const KEY_043C = 'ram_043C'; // 特殊技能 ID (043C 演出链核心)
const KEY_043F = 'ram_043F'; // 位置差值参考 X
const KEY_0440 = 'ram_0440'; // 位置差值参考 Y
const KEY_0448 = 'ram_0448'; // Cyclone 触发标志
const KEY_0449 = 'ram_0449'; // 演出 #11 清空目标
const KEY_044A = 'ram_044A';
const KEY_044E = 'ram_044E'; // 043C<3 时的技能 ID 替换源
const KEY_0516 = 'ram_0516'; // 演出/技能状态位 (bit7=busy, bit6=技能命令待执行, bit3=退出)
const KEY_0518 = 'ram_0518'; // 演出脚本表索引 (Bank16 表 H/I)
const KEY_062D = 'ram_062D'; // 暂停/演出锁标志
// ═══════════════════════════════════════════════════════════════
// Bank 30 Service
// ═══════════════════════════════════════════════════════════════
class Bank30Service {
    constructor(_store, _bank00, _bank02, _bank16, _bank29) {
        this._store = _store;
        this._bank00 = _bank00;
        this._bank02 = _bank02;
        this._bank16 = _bank16;
        this._bank29 = _bank29;
    }
    // ── 公开接口 ──
    get store() { return this._store; }
    /** 注入 Bank26 演出执行器 (对应切 Bank26 窗口) */
    setShowcaseExecutor(executor) {
        this._executor = executor;
    }
    // ──────────────────────────────────────────────
    // $C503 → $C64E: RESET 硬件初始化
    // ──────────────────────────────────────────────
    /**
     * 对应原始 $FFF0 (Bank31) → $C503 (Bank30) → $C64E:
     *
     * 完整 RESET 初始化链 (~190 bytes):
     *   SEI / CLD / LDX #$FF; TXS          → 禁止中断/十进制/设栈
     *   等待 PPU VBlank ×2                 → frame sync
     *   LDA #$C0; STA $A001                → MMC3 protect (H5: no-op)
     *   清零 $0000-$07FF (8 页)            → store 重置
     *   PPUCTRL=$08, PPUMASK=$06           → 设 PPU 镜像
     *   STA $4010=0 (禁止 DMC)             → H5: no-op
     *   STA $4017=$40 (APU Frame)          → H5: no-op
     *   JSR $CB35 (NT/VRAM 清零)           → bank00.ntClear()
     *   JSR $CB8B (OAM 清零)               → store.clearOAM()
     *   STA $E000 (MMC3 R6=Bank00); CLI    → H5: no-op
     *   LDA #$00; JMP $CEFE                → state save
     *   $CEFE: PHA; STX $30; STY $31; JMP $C400
     *   $C400: TAY(Y=0) → PPU($2000=$08,$2001=$1E) → $22=0
     *          → JSR $C4B2(init) → LDX #$02;JSR $C4B9(切Bank02)
     *          → TYA(A=0);JMP $A200
     *
     * 最后 JMP $A200 → Bank02.$A200: JMP $A21B → scene init
     */
    init() {
        // ── 1. 对应 $C64E-$C658: CPU 状态初始化 ──
        // SEI / CLD / TXS → H5: 不需要
        // ── 2. 对应 $C658-$C661: 等待 PPU VBlank ×2 ──
        // H5: 不需要轮询 $2002
        // ── 3. 对应 $C662-$C666: MMC3 PRG RAM protect ──
        // H5: no-op (不需要 MMC3)
        // ── 4. 对应 $C667-$C679: 清零 $0000-$07FF (8 页) ──
        // H5: DataStore.reset() 已清 zp + ram
        this._store.zp.fill(0);
        this._store.ram.clear();
        // ── 5. 对应 $C67A-$C686: PPU 镜像设置 ──
        // $20=$08 (PPUCTRL 镜像: NMI on, 使用 NT0)
        this._store.write('ppuctrl', 0x08);
        // $21=$06 (PPUMASK 镜像: 禁用渲染)
        this._store.write('ppumask', 0x06);
        // ── 6. 对应 $C687-$C69E: APU 初始化 ──
        // STA $4010=0 (禁止 DMC), STA $4017=$40 (APU Frame Counter)
        // H5: APU 由 mini-audio 模块独立处理
        // ── 7. 对应 $C6A5: JSR $CB35 — NT/VRAM 清零 ──
        this._bank00.ntClear();
        // ── 8. 对应 $C6A8: JSR $CB8B — OAM 清零 (LDA #$F8 填充) ──
        // 走 OAM 总管: 清空全部精灵槽 (渲染出口默认 y=0xF8 屏幕外)
        this._store.oam.reset();
        // ── 9. 对应 $C6B5: STA $E000 (MMC3 R6=Bank00); CLI ──
        // H5: 不需要 MMC3 bank 映射。Bank00 已经作为构造参数注入。
        // 调色板初始化
        (0, paletteManager_1.palReset)();
        // ── 10. 对应 $C6BB: LDA #$00; JMP $CEFE → $CEFE → JMP $C400 ──
        // $CEFE: PHA; STX $30; STY $31 → H5: 不需要保存/恢复
        this._initC400();
    }
    // ──────────────────────────────────────────────
    // $C400: 最终 PPU 配置 + 跳 Bank02
    // ──────────────────────────────────────────────
    /**
     * 对应原始 $C400:
     *   TAY(Y=0)                            // 保存 A=0 到 Y
     *   PPU 配置: $2000=$08, $2001=$1E      // NMI on, BG+SPR on
     *   $22=0                               // 清零 Bank 切换状态
     *   JSR $C4B2(init)                     // 未知 init
     *   LDX #$02; JSR $C4B9(切 Bank02)      // H5: 直接调 bank02
     *   TYA(A=0); JMP $A200                 // A=0 → Bank02.$A200
     */
    _initC400() {
        const s = this._store;
        // PPU 最终配置
        s.write('ppuctrl', 0x08); // NMI on, NT0
        s.write('ppumask', 0x1E); // BG on, SPR on, 允许左8px渲染
        // $22=0: Bank 切换状态清零
        s.write('ram_0022', 0);
        // JSR $C4B2: 未知 init (可能是音频或 PPU 相关)
        // 待进一步分析
        // LDX #$02; JSR $C4B9: 切 Bank02
        // H5: 不需要切 bank，直接调 bank02.resetEntry(A=0)
        // TYA(A=0); JMP $A200: A=0 进入 Bank02 → JMP $A21B
        this._bank02.resetEntry(0);
    }
    // ──────────────────────────────────────────────
    // $C557: 场景控制器入口 (被 Bank02 entryB JMP $C557 调用)
    // ──────────────────────────────────────────────
    /**
     * 对应原始 $C557: 场景控制器。
     * Bank02 $82E5: JMP $C557 → 进入 Bank30 的场景控制器循环。
     * TODO: 待从 bank_30 汇编翻译完整场景控制逻辑。
     */
    sceneCtrl557() {
        // TODO: Bank30 $C557 场景控制器
    }
    // ──────────────────────────────────────────────
    // $C4B2/$C4B9/$C4BD: MMC3 bank 窗口选择写入
    // ──────────────────────────────────────────────
    /**
     * 对应原始 $C4BD (含 $C4B2/$C4B9 两个前导入口):
     * ```
     * $C4B2: STX ram_0024; LDA #$06; JMP $C4BD   // 记录 R6, 选 $8000 窗口寄存器
     * $C4B9: STX ram_0025; LDA #$07; JMP $C4BD   // 记录 R7, 选 $A000 窗口寄存器
     * $C4BD: ORA ram_0022; STA ram_0023          // ram_0023 = A | ram_0022
     *        STA $8000; STX $8001                 // MMC3 bank select/data (H5: no-op)
     *        RTS
     * ```
     * H5: 无 MMC3 硬件窗口, $8000/$8001 写入为 no-op,
     * 仅记录 ram_0023 (当前选中 bank 寄存器值) 供逻辑消费。
     */
    bankSelect(a, x) {
        const v = (a | this._store.read('ram_0022')) & 0xFF;
        this._store.write('ram_0023', v);
        void x; // $8001 bank data — H5 no-op
    }
    // ──────────────────────────────────────────────
    // $CE08: 加载 Bank28($8000) + Bank29($A000) 窗口
    // ──────────────────────────────────────────────
    /**
     * 对应 bank_30 $CE08 (asm):
     *   TAY / PHA 保存 ram_0024/0025
     *   LDA #$1C / STA ram_0024   → R6 = Bank28 → $8000-$9FFF
     *   LDA #$1D / STA ram_0025   → R7 = Bank29 → $A000-$BFFF
     *   JSR $CE2D                 → MMC3 写 $8000/$8001 切换
     *   JSR $8000                 → 调用 Bank28 $8000 入口
     *   PLA / PLA / JMP $CE2D     → 恢复原 bank
     *
     * H5: 无 MMC3。Bank29 数据已内嵌 (data/team/roster.ts),
     * Bank29RosterService 即窗口 $A000 的等价物。
     * 返回 bank29 service 供调用方直接消费数据。
     */
    loadBank29() {
        if (!this._bank29) {
            this._bank29 = new bank29_roster_service_1.Bank29RosterService(this._store);
        }
        // 对应 asm: STA ram_0022 状态保持 (H5: 记录窗口状态)
        this._store.write('ram_0022', 0);
        this._store.write('ram_0024', 0x1C); // Bank28 (数据消费方)
        this._store.write('ram_0025', 0x1D); // Bank29 (阵容/战术数据)
        return this._bank29;
    }
    // ── 辅助: 设置默认 RAM 值 ──
    /**
     * 初始化比赛相关 RAM 默认值（从 bank30_analysis ramMap 提取）。
     * 仅在进入比赛模式时调用。
     */
    initMatchDefaults() {
        const s = this._store;
        s.write('gameState', 0);
        s.write('timerLo', 0);
        s.write('timerHi', 0x18); // 1800秒 = 30分钟
        s.write('scoreA', 0);
        s.write('scoreB', 0);
        s.write('ballOwner', 0);
        s.write('ballX', 0);
        s.write('ballY', 0);
        s.write('nearCount', 0); // $0600
        s.write('roundCount', 0); // $0613
        s.write('actionClock', 0x0A); // $0614
        s.write('bpmCounter', 0); // $0618
        s.write('ctrlStatus', 0); // $0516
        s.write('scrollDir', 0); // $0517
        s.write('animLock', 0); // $0515
        s.write('zoneFlag', 0xFF); // $062A
        s.write('pauseFlag', 0); // $062D
    }
    // ══════════════════════════════════════════════════════════════
    // $CBB0 演出请求 API + $043C 演出链 (Bank30)
    //
    // 链路 (原始 ROM):
    //   $CBB0(id): ram_0518=id; ram_0516|=0x80; ram_0005=0; JSR $CB0F
    //              → Bank16 $8008 按 ram_0518 查表 H/I → 脚本指针
    //              → Bank16 $8021 解释器执行演出决策脚本
    //   $D67C: 读 $D6DE[ram_043B] → ram_043C=0 → $E93D → 判定/切 bank
    //   $D717: $D76B 状态检查 → LDA #$3D; JSR $CBB0 (特写演出)
    //   $D792: 043C<3 → 用 ram_044E 替换; ==0x12 → 演出 #46 (Cyclone);
    //          ==0x11 → 清 ram_0449/044A
    //   $D7E8: LDA #$38; JSR $CBB0 (演出 #38)
    // ══════════════════════════════════════════════════════════════
    /** 读 Bank30 原始字节 (CPU $C000-$DFFF → PRG_BANK_30 索引) */
    _b30(addr) {
        return prg_bank_30_1.default[addr - 0xC000] ?? 0;
    }
    /** $D6DE 表 (10B): [02 01 00 03 04 05 06 1E 1F 20] — 按 ram_043B 的演出类型映射 */
    readD6DE(idx) {
        return this._b30(0xD6DE + (idx & 0x3f));
    }
    /** 读 RAM 语义键 (地址化访问, 与 Bank16 一致: ram_XXXX) */
    _readRamByte(addr) {
        return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
    }
    /** $D700 表 (37B): 射门演出方向/子状态表 (供 $D5D1/$D5DA 使用) */
    readD700(idx) {
        return this._b30(0xD700 + (idx & 0x3f));
    }
    /**
     * $CBB0 — 演出请求 API:
     *   STA ram_0518 / LDA #$80; ORA ram_0516; STA ram_0516 / LDA #$00; STA ram_0005
     *   JSR $CB0F; RTS
     * H5: $CB0F 任务入队 → 直接调 Bank16 解释器消费 ram_0518 (脚本决策链)。
     */
    requestShowcase(id) {
        // TODO: $CB0F 槽位调度语义 (ram_0000-XX 6槽×4B) — H5 直连解释器, busy 生命周期由 0516 bit7 表达
        const s = this._store;
        s.write(KEY_0518, id & 0xff); // STA ram_0518
        s.write(KEY_0516, (s.read(KEY_0516) | 0x80) & 0xff); // ram_0516 bit7 = busy
        s.write(KEY_0005, 0); // LDA #$00; STA ram_0005
        this._bank16.entry_8021(); // $CB0F → Bank16 解释器
    }
    /**
     * $D76B — 状态检查: 名字区(ram_0034 指针)+1/+2 与 ram_043F/0440 差值 → 有差(负)。
     * 原始 ROM: LDA (ram_0034),Y 读名字区坐标字节, 与 ram_043F/0440 做差值, 符号位=负 → 触发特写。
     * TODO: 精确差值与阈值待对照 $D76B-$D7B0 完整汇编 (当前为符号位近似)。
     */
    _d76bCheck() {
        const s = this._store;
        const ptr = ((s.read(KEY_0035) & 0xff) << 8) | (s.read(KEY_0034) & 0xff);
        const n1 = this._readRamByte(ptr + 1); // 名字区坐标/朝向 X
        const n2 = this._readRamByte(ptr + 2); // 名字区坐标/朝向 Y
        const dx = (n1 - (s.read(KEY_043F) & 0xff)) & 0xff;
        const dy = (n2 - (s.read(KEY_0440) & 0xff)) & 0xff;
        if ((dx & 0x80) !== 0)
            return true; // 差值负数 → 有差
        if ((dy & 0x80) !== 0)
            return true;
        return dx !== 0 || dy !== 0;
    }
    /**
     * $D684 — STX ram_043C; JSR $E93D (写技能 ID + 刷新演出精灵)。
     * $E93D (Bank31): 演出期精灵刷新任务, 走 OAM 影子缓冲 (ram_04A5 区)。
     * H5: oam.emitSprites() 把影子缓冲导出到渲染出口 (DataStore.sprites)。
     * TODO: $E93D 精灵动画帧推进逻辑待 Bank31 完整翻译。
     */
    entry_D684(x) {
        this._store.write(KEY_043C, x & 0xff); // STX ram_043C
        this._store.oam.emitSprites(); // JSR $E93D (H5 简化: 导出 OAM)
    }
    /**
     * $D717 — 特写演出触发 (ROM 语义):
     *   JSR $D76B 状态检查 → N 标志=负 (有差) 才继续, BPL (非负) → 跳过
     *   ram_043B == 0 || == 3 → 直接触发 #3D
     *   否则 ram_043C != 0 → 触发 #3D
     * TODO: $D745 之后的 $8012 Bank28 入口分支未 TS 化。
     */
    entry_D717() {
        const s = this._store;
        if (!this._d76bCheck())
            return; // BPL $D745 → 跳过
        const t = s.read(KEY_043B);
        if (t === 0 || t === 3) { // 直接触发
            this.requestShowcase(0x3d);
            return;
        }
        if (s.read(KEY_043C) !== 0) { // 043C!=0 触发
            this.requestShowcase(0x3d);
        }
    }
    /**
     * $D792 — 技能名判定链 (ROM 语义):
     *   ram_043C < 3  → 用 ram_044E 替换 (写回 ram_043C)
     *   CMP #$12 / #$11 用替换前的原值比较 (A 寄存器)
     *   == 0x12 → 查 ram_0448 (已触发过则跳过) → INC ram_0448
     *             → ram_062D=0 → JSR $CBB0(#46) → 切 Bank26 → $8021 → $8036
     *   == 0x11 → 清 ram_0449/044A
     */
    entry_D792() {
        const s = this._store;
        const orig = s.read(KEY_043C); // 原值 (A 寄存器)
        if (orig < 3) {
            const c = s.read(KEY_044E);
            s.write(KEY_043C, c); // 替换写回
        }
        if (orig === 0x12) {
            // Cyclone 旋风波: 演出 #46
            if (s.read(KEY_0448) !== 0)
                return; // 已触发过 → 跳过
            s.write(KEY_0448, (s.read(KEY_0448) + 1) & 0xff); // INC ram_0448
            s.write(KEY_062D, 0);
            this.requestShowcase(0x46);
            this._executor?.entry_8021(); // 切 Bank26 $8021 (能力计算)
            this._executor?.entry_8036(); // 切 Bank26 $8036 (演出状态机)
        }
        else if (orig === 0x11) {
            s.write(KEY_0449, 0);
            s.write(KEY_044A, 0);
        }
    }
    /**
     * $D7E8 — 演出 #38 触发:
     *   LDA #$81; STA ram_062D (暂停/演出锁)
     *   LDA #$1F; STA ram_0494 (演出状态)
     *   LDA #$38; JSR $CBB0 → 演出 #38
     * TODO: $D7E8-$D84B 完整链 (Bank26 执行器) 未 TS 化。
     */
    entry_D7E8() {
        const s = this._store;
        s.write(KEY_062D, 0x81);
        s.write('ram_0494', 0x1F);
        this.requestShowcase(0x38);
    }
    /**
     * $D67C — 射门演出主流程:
     *   读 $D6DE[ram_043B] 演出类型 → entry_D684(0) 写 ram_043C=0 + $E93D
     *   → $D717 特写判定 (演出 #3D) → $D792 技能名判定 (#46 Cyclone / #11 清状态)
     * TODO: $D67C-$D6C4 完整链 (含 $E93D、$8009 Bank28 入口、ram_0430 判定) 未 TS 化。
     */
    entry_D67C() {
        const s = this._store;
        const t = s.read(KEY_043B);
        const type = this.readD6DE(t); // $D6DE[ram_043B] → 演出类型 (含 0x1E-0x20 特写类)
        void type;
        this.entry_D684(0); // STX ram_043C = 0; JSR $E93D
        this.entry_D717(); // 特写演出判定 → #3D
        this.entry_D792(); // 技能名判定 → #46 / #11
    }
    /** H5 演示入口: 直接触发指定演出 (0x3D 特写 / 0x46 Cyclone / 0x38 等) */
    triggerShowcase(id) {
        this.requestShowcase(id);
    }
}
exports.Bank30Service = Bank30Service;
