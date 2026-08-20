"use strict";
/**
 * Bank 30 Service — 硬件初始化 (H5 简化版)
 *
 * 数据已提取到 `data/prg/bank30-data.ts` (从 ASM code_data.s/code_sub.s),
 * 无 MMC3 bank 切换、无 PRG_BANK_30 原始字节残留。
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank30Service = void 0;
const paletteManager_1 = require("../data/prg/ppu/pallete/paletteManager");
const bank29_roster_service_1 = require("./bank29_roster.service");
const bank30_data_1 = require("../data/prg/bank30-data");
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
// ── 数学/查表子程序 RAM 键 ($CD3C 除法 / $CD77 名字区 / $CE99 搜索) ──
const KEY_006F = 'ram_006F'; // 16bit 被除数/余数 lo (div16)
const KEY_0070 = 'ram_0070'; // 16bit 被除数/余数 hi
const KEY_0071 = 'ram_0071'; // 16bit 除数 lo
const KEY_0072 = 'ram_0072'; // 16bit 商 lo
const KEY_0073 = 'ram_0073'; // 16bit 商 hi
const KEY_0074 = 'ram_0074'; // 16bit 除数 hi
const KEY_05FB = 'ram_05FB'; // 控球方/当前队伍索引 (名字区指针索引 ^0x0B)
const KEY_0441 = 'ram_0441'; // 活跃球员 A (CE99 跳过候选)
const KEY_0442 = 'ram_0442'; // 活跃球员 B (CE99 跳过候选)
const KEY_0635 = 'ram_0635'; // 球坐标 X (CE99 距离参考)
const KEY_0637 = 'ram_0637'; // 球坐标 Y (CE99 距离参考)
const KEY_046C = 'ram_046C'; // 调色板填充计数器 ($CC02)
const KEY_046F = 'ram_046F'; // 调色板输出区基址 (16B + X 偏移)
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
        // 注: 当前无调用者 (H5 由 boot._initRamDefaults 初始化), 保留仅供文档/调试。
        // 键名统一为真实 RAM 地址 (与 PRG 翻译层 ram_XXXX 一致)。
        s.write('ram_0060', 0); // 比赛时钟低位
        s.write('ram_0061', 0); // 比赛时钟高位
        s.write('ram_0028', 0); // 比分主队 $0028
        s.write('ram_0029', 0); // 比分客队 $0029
        s.write('ram_05FC', 0); // 持球球员 $05FC
        s.write('ram_0635', 0); // 球坐标 X $0635
        s.write('ram_0637', 0); // 球坐标 Y $0637
        s.write('ram_0600', 0); // 场上活跃球员数 $0600
        s.write('ram_0613', 0); // 回合计数 $0613
        s.write('ram_0614', 0x0A); // 动作时钟 $0614
        s.write('ram_0618', 0); // 移动计数器 $0618
        s.write('ram_0516', 0); // 场景/技能状态位 $0516
        s.write('ram_0517', 0); // 滚动方向 $0517
        s.write('ram_0515', 0); // 动画锁定 $0515
        s.write('ram_062A', 0xFF); // 区域标志 $062A
        s.write('ram_062D', 0); // 暂停/锁定 $062D
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
    /**
     * $D6DE 表 (10B): SHOWCASE_TYPE_TABLE [02 01 00 03 04 05 06 1E 1F 20] — 按 ram_043B 的演出类型映射。
     * 数据源 bank30-data.ts (从 code_data.s $D6DE 提取)。
     */
    readD6DE(idx) {
        return bank30_data_1.SHOWCASE_TYPE_TABLE[idx & 0x0f] ?? 0;
    }
    /** 读 RAM 语义键 (地址化访问, 与 Bank16 一致: ram_XXXX) */
    _readRamByte(addr) {
        return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
    }
    /** $D700 表 (15B): SHOOT_STATE_TABLE 射门演出方向/子状态表 (供 $D5D1/$D5DA 使用) */
    readD700(idx) {
        return bank30_data_1.SHOOT_STATE_TABLE[idx & 0x0f] ?? 0;
    }
    // ══════════════════════════════════════════════════════════════
    // 跳转表 API 补全 (batch 1)
    //   1. $CD3C div16       2. $CD77 namePtr
    //   3. $CDC9 linearToXY  4. $CDE2 pixelToIndex
    //   5. $CE08 valueToTile 6. $CE4A/$CE4D tableFB4C
    //   7. $CC02 paletteLoad 8. $CE99 findNearestPlayer
    //   9. $CBC2 mapCharCBC2 10. $CB99/$CB02/$CB0F/$CAE7
    // ══════════════════════════════════════════════════════════════
    /**
     * $CD3C — 16bit / 16bit 无符号恢复除法 (shift-subtract)。
     * 被跳转表 $C51E 引用, 数值显示链路 ($8C55) 核心依赖。
     *
     * asm (code_main.s $CD3C + code_sub.s $CD54-$CD76):
     *   TXA;PHA          ; 保存 X
     *   quotient($0072/0073)=0; LDX #$10  (16 轮)
     *   每轮 (恢复除法):
     *     ROL $0072/$0073   ; 高16位(部分余数)左移带进位
     *     BCS → 减 (溢出即>=除数)
     *     LDA $0073; CMP $0074   ; 高字节比较
     *     LDA $0072; CMP $0071   ; 低字节比较 (高相等时)
     *     若部分余数 >= 除数 → 减除数, 进位=1
     *     否则进位=0
     *     ROL $006F/$0070   ; 低16位(被除数)左移, 进位作为商位进入
     *   结束: 商=$0072/0073, 余数=$006F/0070
     *
     * 输入: dividend(16bit 被除数), divisor(16bit 除数, !=0)
     * 返回: 商 (16bit); 余数留在 ram_006F/0070。
     */
    div16(dividend, divisor) {
        const s = this._store;
        const d = dividend & 0xFFFF;
        const ds = divisor & 0xFFFF;
        // 写回输入 RAM (约定: 被除数 $006F/0070, 除数 $0071/0074)
        s.write(KEY_006F, d & 0xFF); // $006F = 被除数 lo
        s.write(KEY_0070, (d >> 8) & 0xFF); // $0070 = 被除数 hi
        s.write(KEY_0071, ds & 0xFF); // $0071 = 除数 lo
        s.write(KEY_0074, (ds >> 8) & 0xFF); // $0074 = 除数 hi
        // 32bit 组合寄存器: 低16位=被除数, 高16位=部分余数 (商位从低位进)
        let combined = d & 0xFFFF;
        for (let i = 0; i < 16; i++) { // LDX #$10 循环
            // ROL $0072/$0073 (高16位左移), 溢出位=高16位 MSB → 进位
            const overflow = (combined >> 31) & 1; // BCS $CD4E (ROL $0073 进位)
            combined = (combined << 1) & 0xFFFFFFFF;
            const hi16 = (combined >>> 16) & 0xFFFF; // 部分余数 (高16位)
            // 部分余数 >= 除数? (含溢出 → 必 >=)
            if (overflow || hi16 >= ds) {
                // LDA $0073;CMP $0074 / LDA $0072;CMP $0071 → 减法
                const rem = (hi16 - ds) & 0xFFFF; // SBC 减除数
                // ROL $006F (进位=商位=1 进入低16位 LSB)
                combined = ((rem << 16) & 0xFFFFFFFF) | (combined & 0xFFFF) | 1;
            }
            // 否则进位=0 → 低16位 LSB 保持 0 (shift 已清)
        }
        const quotient = combined & 0xFFFF; // 低16位 = 商
        const remainder = (combined >>> 16) & 0xFFFF; // 高16位 = 余数
        s.write(KEY_0072, quotient & 0xFF); // $0072 = 商 lo
        s.write(KEY_0073, (quotient >> 8) & 0xFF); // $0073 = 商 hi
        s.write(KEY_006F, remainder & 0xFF); // $006F = 余数 lo
        s.write(KEY_0070, (remainder >> 8) & 0xFF); // $0070 = 余数 hi
        return quotient;
    }
    /**
     * $CD77 — 名字区指针: A = ram_05FB ^ $0B → 查 $CD89 表 → ram_0034/0035。
     * 被跳转表 $C551 引用 (bank16 用 A=ram_05FB^$0B 查名字区指针)。
     *
     * asm (code_sub.s $CD77-$CD88):
     *   LDA ram_05FB; EOR #$0B; ASL; TAY
     *   LDA $CD89,Y → ram_0034 (lo); LDA $CD8A,Y → ram_0035 (hi); RTS
     *
     * 返回: 名字区 16bit 指针 (lo/hi 已写 ram_0034/0035)。
     */
    namePtr() {
        const s = this._store;
        const a = s.read(KEY_05FB) & 0xFF; // LDA ram_05FB
        return this._nameAreaPtrDirect(a ^ 0x0B); // EOR #$0B → ASL → 查表
    }
    /**
     * $CD7C (namePtr 内层) — A(ID) 直接查 $CD89 表 → ram_0034/0035。
     * 供 $CE99 搜索空位球员使用 (跳过 ram_05FB XOR, 直接以 A 为索引)。
     *
     * asm: $CD7C: ASL; TAY; LDA $CD89,Y → 0034; LDA $CD8A,Y → 0035; RTS
     * 返回: 名字区 16bit 指针。
     */
    _nameAreaPtrDirect(idx) {
        const s = this._store;
        const i = idx & 0xFF;
        // ASL 索引, 若超出表范围则回绕到表尾
        const n = i < bank30_data_1.NAME_AREA_PTR_TABLE_COUNT ? i : (bank30_data_1.NAME_AREA_PTR_TABLE_COUNT - 1);
        const ptr = bank30_data_1.NAME_AREA_PTR_TABLE[n] & 0xFFFF; // LDA $CD89,Y / $CD8A,Y (16bit LE)
        s.write(KEY_0034, ptr & 0xFF); // STA ram_0034
        s.write(KEY_0035, (ptr >> 8) & 0xFF); // STA ram_0035
        return ptr;
    }
    /**
     * $CDC9 — 线性索引 → [列,行] 场地坐标。
     * 被跳转表 $C536 引用 (bank11/16/20 用 A 线性索引→X/Y 坐标)。
     *
     * asm (code_sub.s $CDC9-$CDE1):
     *   LDX #$00
     *   循环: CMP #$0C; BCC → 跳出; SBC #$0C; INX; BNE 循环
     *       → X = A/12 (商), A = A%12 (余数)
     *   ASL×3; ADC #$54; TAY   → Y = (A%12)*8 + $54  (行)
     *   TXA; ASL×3; ADC #$34; TAX → X = (A/12)*8 + $34  (列)
     *
     * 返回 {x(列), y(行)}。
     */
    linearToXY(a) {
        let rem = a & 0xFF;
        let quotient = 0; // LDX #$00
        while (rem >= 0x0C) { // CMP #$0C; BCC → 跳出
            rem = (rem - 0x0C) & 0xFF; // SBC #$0C
            quotient++; // INX
        }
        const y = (((rem << 3) & 0xFF) + 0x54) & 0xFF; // ASL×3; ADC #$54 → 行
        const x = (((quotient << 3) & 0xFF) + 0x34) & 0xFF; // ASL×3; ADC #$34 → 列
        return { x, y };
    }
    /**
     * $CDE2 — (X,Y) 像素 → 精灵位置索引 (行号 + 12*列号)。
     * 被跳转表 $C539 引用 (bank11)。
     *
     * asm (code_sub.s $CDE2-$CE07):
     *   TXA; SEC; SBC #$30   → X-0x30, 借位 → $FF
     *   CMP #$A0; BCS → $FF  ; X>>3 = 列
     *   TYA; SEC; SBC #$50   → Y-0x50, 借位 → $FF
     *   CMP #$60; BCS → $FF  ; Y>>3 = 行
     *   DEX; BMI → $FF; 循环: CLC; ADC #$0C; BNE 循环  → 行 + 12*列
     *
     * 返回索引 (0-239), 越界返回 $FF。
     */
    pixelToIndex(x, y) {
        let a = x & 0xFF;
        if (a < 0x30)
            return 0xFF; // SBC #$30; BCC → $FF
        a = (a - 0x30) & 0xFF;
        if (a >= 0xA0)
            return 0xFF; // CMP #$A0; BCS → $FF
        const column = a >> 3; // LSR×3 → 列
        a = y & 0xFF;
        if (a < 0x50)
            return 0xFF; // SBC #$50; BCC → $FF
        a = (a - 0x50) & 0xFF;
        if (a >= 0x60)
            return 0xFF; // CMP #$60; BCS → $FF
        const row = a >> 3; // LSR×3 → 行
        return (row + 12 * column) & 0xFF; // DEX/BMI + ADC #$0C 循环 → 行+12*列
    }
    /**
     * $CE08 — 数值 → 图案 tile id (数值显示链路)。
     * 被跳转表 $C527 引用。
     *
     * asm (code_sub.s $CE08-$CE49):
     *   保存 bank 状态 → 切 Bank28 窗口 → JSR $8000 (Bank28 数值→图案)
     *   → 恢复 bank。
     * H5: 无 MMC3, bank 切换 no-op。数值→图案核心在 Bank28 $8000,
     * 数值显示链路约定 tile_id = 数字 + $33 (多位数由调用方逐位拆分)。
     * 这里直接返回该映射。
     */
    valueToTile(v) {
        // $CE08: TAY/PHA 保存 → 切 Bank28 → JSR $8000 → 恢复 (H5 no-op)
        return (v & 0xFF) + 0x33; // Bank28 $8000: 数字 + $33 → tile id
    }
    /**
     * $CE4A/$CE4D — $FB4C 表 16bit LE 有符号查找。
     * 被跳转表 $C545($CE4A) / $C542($CE4D) 引用 (动画偏移/速度表)。
     *
     * asm (code_sub.s $CE4A-$CE6D):
     *   $CE4D 入口: CLC; ADC #$40  (A += $40)
     *   $CE4A 入口: ASL            (A <<= 1, C=旧bit7, N=旧bit6)
     *   PHP; BPL → 跳过取反        (旧bit6=1 → EOR #$FF 取反索引)
     *   AND #$7E; TAX              (偶数索引)
     *   LDA $FB4D,X → Y(hi); LDA $FB4C,X → X(lo)
     *   PLP; BCC → 返回 (正)
     *   否则 (旧bit7=1): 16bit 补码取反 [lo,hi]
     *
     * @param mode 'CE4A' 不加 $40; 'CE4D' 先 A+$40。
     * @returns 16bit 小端 [lo, hi]
     */
    tableFB4C(a, mode) {
        let v = a & 0xFF;
        if (mode === 'CE4D')
            v = (v + 0x40) & 0xFF; // $CE4D: CLC; ADC #$40
        const negate = (v >> 7) & 1; // ASL 进位 = 旧 bit7
        const invertIdx = ((v << 1) >> 7) & 1; // ASL 后 N = 旧 bit6
        let idx = (v << 1) & 0xFF; // ASL
        if (invertIdx)
            idx = (~idx) & 0xFF; // EOR #$FF
        idx &= 0x7E; // AND #$7E (偶数索引)
        // LDA $FB4D,X (hi); LDA $FB4C,X (lo)
        let lo = bank30_data_1.TABLE_FB4C[idx] & 0xFF;
        let hi = bank30_data_1.TABLE_FB4C[idx + 1] & 0xFF;
        if (negate) {
            // 16bit 补码取反: X=~X+1; 若 X==0 则 Y=~Y+1
            lo = ((~lo) & 0xFF);
            hi = ((~hi) & 0xFF);
            lo = (lo + 1) & 0xFF;
            if (lo === 0)
                hi = (hi + 1) & 0xFF;
        }
        return { lo, hi };
    }
    /**
     * $CC02 — 调色板查表填充: A 查 $FBCC 表 (A*12) → 填 ram_046F+X 16B。
     * 被跳转表 $C530 引用 (bank19._fixedC530 等价)。
     *
     * asm (code_main.s $CC02-$CC45):
     *   计算表指针 = $FBCC + A*12 (A<<3 并入 $0066 高位)
     *   LDA #$10; STA ram_046C (计数器 16)
     *   LDY #$00; 循环 16 次:
     *     X&3==0 → LDA #$0F (每组第 0 色透明)
     *     否则   → LDA ($0065),Y; INY (读表连续字节)
     *     STA ram_046F,X; INX; DEC ram_046C; BNE 循环
     *   LDA #$20; STA ram_046C; RTS
     *
     * 调色板真实数据 (每项 12B) 在 Bank31 固定区 $FBCC (PALETTE_FBCC stub)。
     *
     * @param a 调色板索引
     * @param x ram_046F 输出偏移
     */
    paletteLoadByIndex(a, x) {
        const s = this._store;
        const entry = (a & 0xFF) * bank30_data_1.PALETTE_ENTRY_SIZE; // A*12 → 表偏移
        let src = entry & 0xFF; // ($0065),Y 低字节
        let out = x & 0xFF; // ram_046F,X 输出偏移
        s.write(KEY_046C, 0x10); // LDA #$10; STA ram_046C
        for (let i = 0; i < 16; i++) { // DEC ram_046C; BNE 循环 (16 次)
            let v;
            if ((out & 3) === 0) {
                v = 0x0F; // X&3==0 → LDA #$0F (透明)
            }
            else {
                v = bank30_data_1.PALETTE_FBCC[src] ?? 0x0F; // LDA ($0065),Y; INY
                src = (src + 1) & 0xFF;
            }
            s.write(`${KEY_046F}+${out}`, v); // STA ram_046F,X
            out = (out + 1) & 0xFF; // INX
        }
        s.write(KEY_046C, 0x20); // LDA #$20; STA ram_046C; RTS
    }
    /**
     * $CE99 — 搜索空位球员: 从 A+1 起搜名字区==0 且距 ram_0635/0637 半径内球员。
     * 被跳转表 $C548 引用。
     *
     * asm (code_sub.s $CE99-$CEFD):
     *   base = A+1; radius=8; 重试:
     *     candidate=base; attempts=10;
     *     循环: candidate==0441 || ==0442 → 跳过
     *           namePtr(candidate)+10 != 0 → 跳过 (已占用)
     *           $CED6 距离检查 (|x-0635|<radius 且 |y-0637|<radius) → 命中
     *           candidate++; attempts--; 直到 0
     *     radius += 8; 回到重试
     *
     * @param start 起始球员 ID
     * @returns 命中球员 ID; 无命中时返回最后一个候选 (radius 循环至溢出)。
     */
    findNearestPlayer(start) {
        const s = this._store;
        let base = (start + 1) & 0xFF; // INC $0046
        let radius = 8; // LDA #$08; STA $0047
        const refX = s.read(KEY_0635) & 0xFF; // ram_0635 (球 X)
        const refY = s.read(KEY_0637) & 0xFF; // ram_0637 (球 Y)
        const pA = s.read(KEY_0441) & 0xFF; // ram_0441
        const pB = s.read(KEY_0442) & 0xFF; // ram_0442
        for (;;) {
            let candidate = base; // LDA $0046; STA $0048
            let attempts = 10; // LDA #$0A; STA $0049
            while (true) {
                // CMP $0441 / $0442; BEQ → 跳过
                if (candidate !== pA && candidate !== pB) {
                    const ptr = this._nameAreaPtrDirect(candidate); // JSR $CD7C
                    // LDY #$0A; LDA ($0034),Y; BNE → 跳过 (已占用)
                    if (this._readRamByte(ptr + 10) === 0) {
                        // JSR $CED6; BCS → 命中返回
                        if (this._withinRadius(ptr, radius, refX, refY)) {
                            return candidate; // LDA $0048; RTS
                        }
                    }
                }
                candidate = (candidate + 1) & 0xFF; // INC $0048
                attempts--; // DEC $0049
                if (attempts === 0)
                    break; // BNE $CEA9 → 继续循环
            }
            radius = (radius + 8) & 0xFF; // LDA $0047; CLC; ADC #$08; STA $0047
            // JMP $CEA1 → 重试 (candidate/attempts 重置)
        }
    }
    /**
     * $CED6 — 距离检查: 球员 X/Y 坐标与参考 (ram_0635/0637) 的曼哈顿半径判定。
     * asm: |x - refX| < radius 且 |y - refY| < radius → 进位=1 (命中)。
     */
    _withinRadius(ptr, radius, refX, refY) {
        // LDY #$06; LDA ($0034),Y → X 坐标; SEC; SBC ram_0635
        const cx = this._readRamByte(ptr + 6);
        let dx = (cx - refX) & 0xFF;
        if ((dx & 0x80) !== 0)
            dx = ((~dx) & 0xFF) + 1 & 0xFF; // EOR #$FF; ADC #$01 (abs)
        if (dx >= radius)
            return false; // CMP $0047; BCS → 太远 (CLC; RTS)
        // LDY #$08; LDA ($0034),Y → Y 坐标; SEC; SBC ram_0637
        const cy = this._readRamByte(ptr + 8);
        let dy = (cy - refY) & 0xFF;
        if ((dy & 0x80) !== 0)
            dy = ((~dy) & 0xFF) + 1 & 0xFF; // abs
        if (dy >= radius)
            return false; // CMP $0047; BCS → 太远
        return true; // SEC; RTS (命中)
    }
    /**
     * $CBC2 — 假名/ASCII 编码 → [图案 tile, 属性]。
     * 被跳转表 $C524 引用 (bank19._mapCharC524 等价, 已本地实现)。
     *
     * asm (code_main.s $CBC2-$CBF0):
     *   A < $A0   → 直接返回 [A, $00]
     *   A >= $C8  → 属性 $95; v=A-$AE; v<$1F 返回; 否则 v-=$05 → +$40
     *   否则      → 属性 $94; carry= (A>=$B4); A>=$B4 → v-=$14; v-=$9A;
     *               v>=$15 → v+=$05; carry 清除 → 返回; 否则 +$40
     *
     * 返回 [tile, attr]。
     */
    mapCharCBC2(a) {
        const v0 = a & 0xFF;
        if (v0 < 0xa0)
            return [v0, 0x00]; // CBC4: BCC → 直接返回
        let attr = 0x94; // LDY #$94
        let v = v0;
        if (v0 >= 0xc8) { // CBCA: BCC → 跳 $CBDA
            attr = 0x95; // LDY #$95
            v = (v0 - 0xae) & 0xFF; // SBC #$AE
            if (v < 0x1f)
                return [v, attr]; // CBD4: BCC → 返回
            v = (v - 0x05) & 0xFF; // SBC #$05
            return [(v + 0x40) & 0xFF, attr]; // CBED: CLC; ADC #$40
        }
        // CBDA-$CBE8: A<0xC8 分支
        const carryB4 = v0 >= 0xb4; // CMP #$B4; PHP
        if (v0 >= 0xb4)
            v = (v - 0x14) & 0xFF; // BCS → SBC #$14
        v = (v - 0x9a) & 0xFF; // SEC; SBC #$9A
        if (v >= 0x15)
            v = (v + 0x05) & 0xFF; // CMP #$15; BCC → 跳过; ADC #$04(+C)
        if (!carryB4)
            return [v, attr]; // PLP; BCC → 返回
        return [(v + 0x40) & 0xFF, attr]; // CLC; ADC #$40
    }
    /**
     * $CB99 — 表跳转 (call via table)。
     * 被跳转表 $C509 引用 (bank11/16/19/20 已本地 switch)。
     * asm: ASL; TAY; PLA×2 取返回地址; 读 表[Y+2]/[Y+3] → JMP ($0036)。
     * H5: 调用方直接 switch 分派, 无需返回地址表跳转 → no-op。
     */
    tableJump(a) {
        void a; // $CB99: ASL/查表/JMP 已由调用方 switch 语义化, H5 no-op
    }
    /**
     * $CB02 — 槽位计数器: 若 ram_0001+X(hi)!=0 且 ram_0000+X(lo)==0 → lo 置 1。
     * 被跳转表 $C51B 引用。
     * asm: LDA $0001,X; BEQ → 返回; LDA $0000,X; BNE → 返回; INC $0000,X; RTS
     * (bank16 注释: hi!=0 且 lo==0 → lo 递增; 从 0 → 1)。
     */
    slotCounter(x) {
        const s = this._store;
        const hi = s.read(`ram_0001+${x}`) & 0xFF; // LDA $0001,X
        const lo = s.read(`ram_0000+${x}`) & 0xFF; // LDA $0000,X
        if (hi !== 0 && lo === 0) {
            s.write(`ram_0000+${x}`, (lo + 1) & 0xFF); // INC $0000,X → 1
        }
    }
    /**
     * $CB0F — 任务入队 (task enqueue)。
     * 被跳转表 $C515 引用 (H5 空实现, 同步由渲染层驱动)。
     * asm: 将当前 bank 状态与返回栈存入任务槽 $0000-X 区, JMP $CAA5 调度。
     * H5: 渲染同步由外层驱动, 任务槽调度无意义 → no-op。
     */
    taskEnqueue() {
        // $CB0F: TXA/PHA; TYA/PHA; 存 bank/栈; JMP $CAA5 → H5 no-op
    }
    /**
     * $CAE7 — 返回地址存储 (task slot)。
     * 被跳转表 $C50F 引用。
     * asm: PHA; 存 A/Y 到 $0101/$0102 (任务槽), ram_0000+X=$FF, RTS。
     * H5: 无任务栈, 返回地址由调用方直接持有 → no-op。
     */
    storeReturnAddr(a, x) {
        void a; // $CAE7: 存返回地址到任务槽 → H5 no-op
        void x;
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
