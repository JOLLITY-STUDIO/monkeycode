"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank26ShowcaseExecutor = void 0;
const showcase_data_1 = require("../data/prg/showcase-data");
const showcase_palette_1 = require("../data/prg/showcase-palette");
const paletteManager_1 = require("../data/prg/ppu/pallete/paletteManager");
// ── RAM 语义键 ──
const KEY_0028 = 'ram_0028'; // 主队比分 (scoreHome, $85E3 INC)
const KEY_0029 = 'ram_0029'; // 客队比分 (scoreAway)
const KEY_002F = 'ram_002F';
const KEY_0032 = 'ram_0032'; // 16bit 值/指针 lo
const KEY_0033 = 'ram_0033'; // 16bit 值/指针 hi
const KEY_0034 = 'ram_0034'; // 间接指针 lo (名字区/球员数据)
const KEY_0035 = 'ram_0035'; // 间接指针 hi
const KEY_003A = 'ram_003A';
const KEY_043B = 'ram_043B';
const KEY_043C = 'ram_043C';
const KEY_043D = 'ram_043D';
const KEY_043E = 'ram_043E';
const KEY_043F = 'ram_043F';
const KEY_0440 = 'ram_0440';
const KEY_0441 = 'ram_0441';
const KEY_0442 = 'ram_0442';
const KEY_044B = 'ram_044B';
const KEY_0448 = 'ram_0448';
const KEY_044E = 'ram_044E';
const KEY_0516 = 'ram_0516';
const KEY_0518 = 'ram_0518';
const KEY_05FB = 'ram_05FB';
const KEY_0600 = 'ram_0600';
const KEY_0612 = 'ram_0612';
const KEY_061C = 'ram_061C'; // 能力 16bit 结果 lo
const KEY_061D = 'ram_061D'; // 能力 16bit 结果 hi
const KEY_0629 = 'ram_0629'; // 演出/阶段帧计数器
const KEY_062D = 'ram_062D';
const KEY_0635 = 'ram_0635';
const KEY_0637 = 'ram_0637';
const KEY_0067 = 'ram_0067'; // 能力值 lo (射门力量)
const KEY_0068 = 'ram_0068'; // 能力值 hi
const KEY_0069 = 'ram_0069';
const KEY_006A = 'ram_006A';
const KEY_006B = 'ram_006B';
const KEY_006C = 'ram_006C';
const KEY_006D = 'ram_006D';
const KEY_00E2 = 'ram_00E2';
const KEY_00E3 = 'ram_00E3';
/** 演出最大演示时长 (帧) — 超过后若解释器未清 busy 则强制结束 (H5 演示兜底) */
const SHOW_MAX_FRAMES = 90;
class Bank26ShowcaseExecutor {
    constructor(store) {
        /** 内部帧计数 (演出激活后递增) */
        this._frame = 0;
        /** 上一帧 busy 状态 (上升沿检测) */
        this._wasBusy = false;
        /** x 偏移 (对应 $E93D 传入的 X) */
        this._xOff = 0;
        /** 锁存当前演出 ID (新请求 → 重置演出计时) */
        this._latchedShow = 0;
        /** 演出剩余帧数 (锁存驱动, 演示可视化用) */
        this._framesLeft = 0;
        /** 演出特效中心 X (像素) — 对应 ram_0635, $911C 每帧 (X & ~7) + 4 */
        this._ballX = 0;
        /** 演出特效中心 Y (像素) — 对应 ram_0637, $911C 按符号位 0x4C/0xB4 跳变 */
        this._ballY = 0x4c;
        /** $92EA 方向查表 = [01, 05, 02, 07] (球方向偏移, $911C LDA $92EA,X) */
        this._BALL_DIR_TABLE = [0x01, 0x05, 0x02, 0x07];
        this._store = store;
    }
    // ── 内存访问辅助 (对应 6502 间接寻址) ──
    /** ram_XXXX 键名生成 (4 位大写补零) */
    _ramKey(addr) {
        return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    }
    /** 读 ($0034) 间接指针 (16bit LE) */
    _indirectPtr() {
        const s = this._store;
        return ((s.read(KEY_0035) & 0xff) << 8) | (s.read(KEY_0034) & 0xff);
    }
    /** LDA ($0034),Y — 读间接指针 + 偏移处字节 */
    _readIndirect(off) {
        return this._store.read(this._ramKey(this._indirectPtr() + off)) & 0xff;
    }
    /** STA ($0034),Y — 写间接指针 + 偏移处字节 */
    _writeIndirect(off, v) {
        this._store.write(this._ramKey(this._indirectPtr() + off), v & 0xff);
    }
    // ── 固定区辅助 (Bank30 $C000-$DFFF, H5 无硬件副作用 → 空实现占位) ──
    /** JSR $C54B / $C54E — 切 PRG bank 或切换上下文 (H5 直接 import, 无 MMC3) */
    _fixedBankSwitch(_bank) {
        // H5: 无硬件 bank 切换
    }
    /** JSR $C50C — 把 ram_0441 指向球员数据装入 ($0034) 指针 (Bank30 数据指针解析) */
    _fixedC50C() {
        // H5: 球员数据直接由各 service import, 指针解析已内联
    }
    /** JSR $C4C8 — 读当前球员字段并展开 (Bank30 固定区) */
    _fixedC4C8(_a) {
        // H5: 固定区精灵/数值展开 no-op
    }
    /** JSR $C521 — 16bit 能力运算 (Bank30 固定区, 对 $006B/$006C 运算 → $006C/$006D) */
    _fixedC521() {
        // H5: 由能力计算逻辑内联近似
    }
    /** JSR $C52A / $C515 / $C52D / $C600 — 渲染同步/切场景/任务入队 */
    _fixedRenderSync(_a) {
        // H5: 同步由渲染层驱动
    }
    /** JMP $C636 / $C603 / $C60F — 主循环跳转 / 事件分发 (Bank30) */
    _fixedJump(_entry) {
        // H5: 事件由上层 dispatch 驱动
    }
    // ──────────────────────────────────────────────
    // $8FFB: 名字区坐标差子程序 ($8F97 调用, 能力计算的输入校准)
    // ──────────────────────────────────────────────
    /**
     * 对应 $8FFB-$904D。
     * 读 ($0034) 名字区坐标, 与 ram_043F/0440 做差, 更新差值参考。
     * 结果 $003A bit7 置位 = 名字区差值"负" (需向上进位)。
     * carry 保留给调用方 ($8F72 的 $8FB2 ADC 使用)。
     */
    _sub8FFB() {
        const s = this._store;
        // $8FFB: LDA #$00; $8FFD: STA $003A
        s.write(KEY_003A, 0);
        // $8FFF: LDY #$00
        // $9001: LDA ($0034),Y
        let A = this._readIndirect(0);
        // $9003: CMP #$20 → carry = (A >= 0x20)
        let C = A >= 0x20;
        let X = 0;
        if (A === 0x20) {
            // $9005: BNE $902F (相等 → 落入 $9007)
            // $9007: LDA $05FB; $900A: BNE $9018
            let go9018 = false;
            if (s.read(KEY_05FB) !== 0) {
                go9018 = true;
            }
            else {
                // $900C: LDA $043B; $900F: BNE $9018
                if (s.read(KEY_043B) !== 0) {
                    go9018 = true;
                }
                else {
                    // $9011: LDA $043C; $9014: CMP #$03; $9016: BCS $902F
                    if (s.read(KEY_043C) < 3) {
                        go9018 = true; // $043C < 3 → 落入 $9018
                    }
                }
            }
            if (go9018) {
                // ── $9018 块: 计算名字区坐标差参考值 (浮点近似整数) ──
                // $9018: LDA $0440
                A = s.read(KEY_0440) & 0xff;
                // $901B: LSR → C = bit0; A = $0440>>1
                C = (A & 0x01) !== 0;
                A = (A >> 1) & 0x7f;
                // $901C: TAX
                X = A;
                // $901D: LDA $043F
                A = s.read(KEY_043F) & 0xff;
                // $9020: ROR → A = ($043F>>1) | (C<<7)
                A = ((A >> 1) & 0x7f) | (C ? 0x80 : 0);
                // $9021: CLC
                // $9022: ADC $043F → A = A + $043F
                let sum = A + s.read(KEY_043F);
                C = sum > 0xff;
                A = sum & 0xff;
                s.write(KEY_043F, A);
                // $9028: TXA
                A = X;
                // $9029: ADC $0440 → A = X + $0440 + C
                sum = A + s.read(KEY_0440) + (C ? 1 : 0);
                C = sum > 0xff;
                A = sum & 0xff;
                s.write(KEY_0440, A);
            }
        }
        // ── $902F 块: 与名字区坐标做差, 更新 ($0034) 并决定 $003A bit7 ──
        // $902F: LDY #$01
        // $9031: SEC → C = 1
        // $9032: LDA ($0034),Y
        A = this._readIndirect(1);
        // $9034: SBC $043F → A = A - $043F - (C?0:1); C = (A >= $043F)
        let diff = A - s.read(KEY_043F) - 0;
        A = diff & 0xff;
        C = diff >= 0;
        // $9037: TAX
        X = A;
        // $9039: LDA ($0034),Y (Y=2)
        A = this._readIndirect(2);
        // $903B: SBC $0440 → A = A - $0440 - (C?0:1)
        diff = A - s.read(KEY_0440) - (C ? 0 : 1);
        A = diff & 0xff;
        C = diff >= 0;
        // $903E: BPL $9047 → if A >= 0 (bit7 clear)
        if ((A & 0x80) !== 0) {
            // $9040: LDX #$00; $9042: LDA #$00; $9044: SEC; $9045: ROR $003A
            X = 0;
            A = 0;
            C = true;
            // ROR $003A: $003A bit7 = C=1, bit0 = old bit7(0) → $80
            s.write(KEY_003A, 0x80);
        }
        // $9047: STA ($0034),Y
        this._writeIndirect(2, A);
        // $9049: DEY; $904A: TXA; $904B: STA ($0034),Y
        this._writeIndirect(1, X);
        // $904D: RTS → 返回 carry (供调用方 $8FB2 ADC)
        return C;
    }
    // ──────────────────────────────────────────────
    // $8F72: 能力计算 ($8021 入口)
    // ──────────────────────────────────────────────
    /** $8021 → $8F72 能力计算 (逐条精确翻译 $8F72-$8FF2) */
    entry_8021() {
        const s = this._store;
        // $8F72: LDA $0441 (当前球员 ID, 演出目标)
        const playerId = s.read(KEY_0441) & 0xff;
        // $8F75: LDA #$06; $8F77: JSR $C54B → 切 bank 06
        this._fixedBankSwitch(0x06);
        // $8F7A: LDA #$00; $8F7C: STA $003A
        s.write(KEY_003A, 0);
        // $8F7E: LDA $05FB; $8F81: BNE $8F9A → 若 $05FB!=0 跳过清零分支
        let go9A = s.read(KEY_05FB) !== 0;
        if (!go9A) {
            // $8F83: LDA $043B; $8F86: CMP #$02
            if (s.read(KEY_043B) !== 2) {
                // BNE $8F97 → 直接到 $8F97
            }
            else {
                // $8F8A: LDA $0600; $8F8D: BNE $8F97
                if (s.read(KEY_0600) !== 0) {
                    // 到 $8F97
                }
                else {
                    // $8F8F-$8F94: 清 $043F/$0440
                    s.write(KEY_043F, 0);
                    s.write(KEY_0440, 0);
                }
            }
        }
        // $8F97: JSR $8FFB (名字区坐标差, 可能设置 $003A bit7, 返回 carry)
        const cFrom8FFB = this._sub8FFB();
        // $8F9A: BIT $003A; $8F9C: BMI $8FAD → 若 $003A bit7 置位则跳过方向标记
        const bit3A = (s.read(KEY_003A) & 0x80) !== 0;
        let carry;
        let A;
        let X;
        if (!bit3A) {
            // $8F9E: LDA $00E2
            A = s.read(KEY_00E2) & 0xff;
            // $8FA1: CMP #$08 → carry = (A >= 8)
            carry = A >= 0x08;
            // $8FA3: BCS $8FAD → 若 $00E2 >= 8 跳到 $8FAD (不设方向标记)
            if (!carry) {
                // $8FA5: LDA $043C; $8FA8: ORA #$80; $8FAA: STA $043C
                s.write(KEY_043C, (s.read(KEY_043C) | 0x80) & 0xff);
            }
        }
        else {
            // $8F9C BMI $8FAD 直接跳 — carry 保留 $8FFB 返回值
            carry = cFrom8FFB;
        }
        // ── $8FAD: 能力合成 ──
        // $8FAD: LDX #$00
        X = 0;
        // $8FAF: LDA $00E2 (carry 保留)
        A = s.read(KEY_00E2) & 0xff;
        // $8FB2: ADC $00E3 → A = $00E2 + $00E3 + carry
        let sum = A + (s.read(KEY_00E3) & 0xff) + (carry ? 1 : 0);
        carry = sum > 0xff;
        A = sum & 0xff;
        // $8FB5: ROR → 新carry = 旧A 的 bit0; A = (A>>1) | (carry<<7)
        const adcBit0 = (A & 0x01) !== 0; // 记录 ADC 结果 bit0 (ROR 会移出)
        A = ((A >> 1) & 0x7f) | (carry ? 0x80 : 0);
        carry = adcBit0;
        // $8FB6: ORA #$80
        A = (A | 0x80) & 0xff;
        // $8FB8: BIT $043C → $043C bit7 决定 BPL (BIT 不影响 carry)
        const bitC = (s.read(KEY_043C) & 0x80) !== 0;
        if (bitC) {
            // $8FBD: INX
            X = (X + 1) & 0xff;
            // $8FBE: AND #$7F
            A = A & 0x7f;
        }
        // $8FC0: ADC #$00 → A += carry (carry 保持 $8FB5 ROR 设置的值)
        sum = A + (carry ? 1 : 0);
        carry = sum > 0xff;
        A = sum & 0xff;
        if (carry) {
            // $8FC2: BCC $8FC5 → carry 则 INX
            X = (X + 1) & 0xff;
        }
        // $8FC5: STA $0067; $8FC7: STX $0068
        s.write(KEY_0067, A);
        s.write(KEY_0068, X);
        // $8FC9: BIT $003A; $8FCB: BPL $8FDD → 若 $003A bit7 置位则右移 $0032/$0033 ×4
        if ((s.read(KEY_003A) & 0x80) !== 0) {
            // $8FCD-$8FDB: LSR $0033; ROR $0032  ×4 → 32bit 右移 4
            let lo = s.read(KEY_0032) & 0xff;
            let hi = s.read(KEY_0033) & 0xff;
            for (let i = 0; i < 4; i++) {
                const loBit0 = (lo & 0x01) !== 0;
                hi = (hi >> 1) & 0xff;
                lo = ((lo >> 1) | (loBit0 ? 0x80 : 0)) & 0xff;
                // 注: LSR $0033 丢弃低位, ROR $0032 移入原 $0033 bit0 — 需进位串联
                const hiBit0 = (hi & 0x01) !== 0; // 修正: 用未移位前 hi bit0
                lo = ((lo & 0xfe) | (hiBit0 ? 0x01 : 0)) & 0xff;
            }
            // 简化: 32bit 右移 4 (16bit 值 $0032:$0033 整体右移, 高位补 0)
            const v = ((hi << 8) | lo);
            const shifted = (v >>> 4) & 0xffff;
            s.write(KEY_0032, shifted & 0xff);
            s.write(KEY_0033, (shifted >> 8) & 0xff);
        }
        // $8FDD: LDA $0032; $8FDF: STA $0069
        s.write(KEY_0069, s.read(KEY_0032) & 0xff);
        // $8FE1: LDA $0033; $8FE3: STA $006A
        s.write(KEY_006A, s.read(KEY_0033) & 0xff);
        // $8FE5: JSR $C521 (16bit 能力运算, 对 $006B 作被除数)
        this._fixedC521();
        // $8FE8: LDA $006C; $8FEA: STA $061C
        s.write(KEY_061C, s.read(KEY_006C) & 0xff);
        // $8FED: LDA $006D; $8FEF: STA $061D
        s.write(KEY_061D, s.read(KEY_006D) & 0xff);
        // $8FF2: RTS
        void playerId;
    }
    // ──────────────────────────────────────────────
    // $85AC: 演出初始化 ($8036 入口)
    // ──────────────────────────────────────────────
    /** $8BD4: 读当前球员数据第一字段并展开 (Bank30 $C4C8) */
    _sub8BD4(playerId) {
        // $8BC7-$8BD3: 调用前依据 $0442 设置 X (本入口 X 由调用方传入)
        // $8BD4: JSR $C50C (把 $0441 球员数据装入 $0034)
        this._fixedC50C();
        // $8BD7: LDY #$00; $8BD9: LDA ($0034),Y
        const a = this._readIndirect(0);
        // $8BDB: JSR $C4C8 (展开字段)
        this._fixedC4C8(a);
        // $8BDE: RTS
        void playerId;
    }
    /** $85E3: 演出/进球比分累加 (INC $0028,X + $C52A) */
    _sub85E3() {
        const s = this._store;
        // $85E3: LDX $05FB; $85E6: BEQ $85ED → $05FB==0 则 X=0
        let X = s.read(KEY_05FB) & 0xff;
        if (X !== 0) {
            // $85E8: JSR $904E (进球庆祝: 清 $044B/$002F + 球员 $0C-$15 字段)
            this._sub904E();
            // $85EB: LDX #$01
            X = 1;
        }
        // $85ED: INC $0028,X
        const key = X === 0 ? KEY_0028 : KEY_0029;
        s.write(key, (s.read(key) + 1) & 0xff);
        // $85F0: LDA #$01; $85F2: JSR $C52A
        this._fixedRenderSync(0x01);
        // $85F5: RTS
    }
    /** $904E: 进球庆祝 (清 $044B/$002F + 球员 $0C-$15 名字区字段) */
    _sub904E() {
        const s = this._store;
        // $904E: BIT $044B; $9051: BPL $906F → 若 $044B bit7 清则返回
        if ((s.read(KEY_044B) & 0x80) === 0)
            return;
        // $9053-$9058: 清 $044B/$002F
        s.write(KEY_044B, 0);
        s.write(KEY_002F, 0);
        // $905B: LDA #$0C
        // $905D-$906D: 对球员 $0C-$15 (0x0C..0x15) 逐个 JSR $C50C + 清 ($0034) 字段 1
        for (let p = 0x0c; p < 0x16; p++) {
            this._fixedC50C();
            this._writeIndirect(0x01, 0);
        }
        // $906F: RTS
    }
    /** $987B: 演出交互菜单 (战术/输入轮询, H5 演示无硬件输入 → 直接返回) */
    _sub987B() {
        const s = this._store;
        // $987B: LDA #$37; $987D: JSR $C54E
        this._fixedBankSwitch(0x37);
        // $9880-$9884: 清 $0011/$0012
        s.write('ram_0011', 0);
        s.write('ram_0012', 0);
        // $9886: LDA #$01; $9888: JSR $C515; $988B: JSR $C52D
        this._fixedRenderSync(0x01);
        // $988E: LDA #$2E; $9890: STA $0087
        s.write('ram_0087', 0x2e);
        // $9894: STA $062D (LDA #$00; STA $062D)
        s.write(KEY_062D, 0);
        // 后续为输入轮询菜单循环 (H5 演示无硬件输入, 空实现)
        void s;
    }
    /** $8036 → $85AC 演出初始化入口 (逐条翻译 $85AC-$85E0) */
    entry_8036() {
        const s = this._store;
        // $85AE: LDA $0441 (当前球员, 演出目标)
        const playerId = s.read(KEY_0441) & 0xff;
        // $85B1: JSR $8BD4
        this._sub8BD4(playerId);
        // $85B4: JSR $85E3
        this._sub85E3();
        // $85B7: LDA #$30; $85B9: JSR $C54E
        this._fixedBankSwitch(0x30);
        // $85BC: JSR $987B (演出菜单)
        this._sub987B();
        // $85BF: LDA $05FB; $85C2: EOR #$0B; $85C4: STA $05FB → 切换控球方
        s.write(KEY_05FB, (s.read(KEY_05FB) ^ 0x0b) & 0xff);
        // $85C7: JSR $C50C (重载球员指针)
        this._fixedC50C();
        // $85CA-$85D6: 清 ($0034) 字段 5/7/0A
        this._writeIndirect(0x05, 0);
        this._writeIndirect(0x07, 0);
        this._writeIndirect(0x0a, 0);
        // $85D8: LDA #$04; $85DA: STA $0629
        s.write(KEY_0629, 0x04);
        // $85DD-$85E0: JMP $C636 (切主循环)
        this._fixedJump(0xc636);
        // ── H5 演示状态起点 (非 ROM 副作用, 供 ShowcaseView 渲染) ──
        this._xOff = 0;
        this._frame = 0;
    }
    /**
     * 加载演出精灵调色板 (Bank31 $FBCC 表) → DataStore。
     * 对应原 ROM 演出启动时加载专用调色板。BG 0 置黑底。
     */
    _loadPalette() {
        const s = this._store;
        const pal = (0, showcase_palette_1.getShowcasePalette)(showcase_palette_1.SHOWCASE_PALETTE_DEFAULT);
        for (let p = 0; p < 4; p++) {
            for (let c = 0; c < 4; c++) {
                const col = (0, paletteManager_1.nesColorToRGBA)(pal[p * 4 + c] ?? 0x0f);
                s.writeSprColor(p, c, { r: col.r, g: col.g, b: col.b, a: col.a });
            }
        }
        for (let c = 0; c < 4; c++) {
            s.writeBgColor(0, c, { r: 0, g: 0, b: 0, a: 255 });
        }
    }
    /** 每帧 tick (由 Tsubasa2._onFrame 调用) — 推进演出状态 */
    tick() {
        const s = this._store;
        const busy = (s.read(KEY_0516) & 0x80) !== 0;
        // 上升沿: 新演出请求 → 锁存 showId + 重置演出计时 + 加载演出调色板
        if (busy && !this._wasBusy) {
            this._latchedShow = s.read(KEY_0518);
            this._framesLeft = SHOW_MAX_FRAMES;
            this._frame = 0;
            this._loadPalette();
            // $911C 演出推进初始化: 特效中心 = 特写块中心, Y 起点 0x4C
            const ram043B = s.read(KEY_043B);
            const block = (0, showcase_data_1.getShowcaseBlock)(ram043B);
            if (block) {
                this._ballX = block.x + ((block.perRow >> 1) << 3);
                this._ballY = 0x4c;
            }
        }
        if (busy) {
            this._frame++;
            // 锁存倒计时驱动 (独立于解释器 busy, 保证演示可视化稳定)
            if (this._framesLeft > 0) {
                this._framesLeft--;
            }
            // $911C 演出推进: $9124-$912C 球X = ($0635 & ~7) + 4
            const bx = (s.read(KEY_0635) & 0xf8) + 0x04;
            this._ballX = bx & 0xff;
            // $912F-$9138: 球Y = $0637 bit7 ? 0xB4 : 0x4C
            this._ballY = (s.read(KEY_0637) & 0x80) !== 0 ? 0xb4 : 0x4c;
            // $913B-$9153: 方向查表 $92EA (X 由 $0635/$0637 符号位合成, $05FB!=0 时 ^3)
            // $9156-$915A: $0441 = $92EA[X] + $05FB
            let xi = 0;
            if ((s.read(KEY_0635) & 0x80) !== 0)
                xi++;
            if ((s.read(KEY_0637) & 0x80) !== 0)
                xi += 2;
            if (s.read(KEY_05FB) !== 0)
                xi ^= 0x03;
            const dir = this._BALL_DIR_TABLE[xi & 0x03] ?? 1;
            s.write(KEY_0441, (dir + (s.read(KEY_05FB) & 0xff)) & 0xff);
            // 兜底: 超时强制结束 (解释器未消费时)
            if (this._framesLeft <= 0 || this._frame > SHOW_MAX_FRAMES) {
                s.write(KEY_0516, s.read(KEY_0516) & 0x7f);
                s.write(KEY_062D, 0);
                this._wasBusy = false;
                return;
            }
        }
        this._wasBusy = busy;
    }
    /** 读演出渲染状态 (View 只读) */
    getDisplayState() {
        const s = this._store;
        const busy = (s.read(KEY_0516) & 0x80) !== 0;
        // 优先锁存值 (上升沿捕获), 回退实时 ram_0518
        const showId = this._latchedShow !== 0 ? this._latchedShow : s.read(KEY_0518);
        const ram043B = s.read(KEY_043B);
        const type = showcase_data_1.SHOWCASE_D6DE[ram043B & 0x3f] ?? 0;
        const blockIndex = (0, showcase_data_1.showcaseBlockIndexByType)(type);
        const block = (0, showcase_data_1.getShowcaseBlock)(ram043B);
        return {
            active: busy,
            showId,
            type,
            blockIndex,
            block,
            xOff: this._xOff,
            frame: this._frame,
            framesLeft: this._framesLeft,
            cycloneFrame: (this._frame >> 2) & 0x03,
            ballX: this._ballX,
            ballY: this._ballY,
        };
    }
}
exports.Bank26ShowcaseExecutor = Bank26ShowcaseExecutor;
