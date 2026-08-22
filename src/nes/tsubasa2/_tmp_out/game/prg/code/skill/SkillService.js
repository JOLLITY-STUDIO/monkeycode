"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const skill_table_1 = require("../../data/tables/skill-table");
class SkillService {
    constructor(store, system) {
        this._store = store;
        this._system = system;
    }
    // ════════════════════════════════════════════════════════════
    // RAM 读写辅助
    // ════════════════════════════════════════════════════════════
    rd(addr) {
        return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
    }
    wr(addr, v) {
        this._store.write(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`, v & 0xFF);
    }
    rdPtr(lo, hi) {
        return (this.rd(hi) << 8) | this.rd(lo);
    }
    wrPtr(lo, hi, v) {
        this.wr(lo, v & 0xFF);
        this.wr(hi, (v >> 8) & 0xFF);
    }
    // ════════════════════════════════════════════════════════════
    // 必杀技查询 (数据层, 已有)
    // ════════════════════════════════════════════════════════════
    getMove(moveId) {
        const scriptPtr = (0, skill_table_1.getMovePtr)(moveId);
        return { moveId, scriptPtr };
    }
    getCharacterSkills(charIndex) {
        return (0, skill_table_1.getCharacterSkills)(charIndex);
    }
    // ════════════════════════════════════════════════════════════
    // $8000-$8020: 脚本指针跳转表查询
    // ════════════════════════════════════════════════════════════
    /**
     * $8000: 主入口 — 查 $BF89+X 指针表, 设脚本指针。
     * asm: LDX #$89; LDA $0518; ASL; TAY; BCC $8010; INX
     *   LDA #$BF; STA $005D; STX $005E; LDA ($005D),Y; TAX; INY;
     *   LDA ($005D),Y; STA $005E; STX $005D; RTS
     */
    entry() {
        const idx = this.rd(0x0518);
        const y = (idx << 1) & 0xFF;
        let x = 0x89;
        if (idx >= 0x80)
            x = (x + 1) & 0xFF;
        this.wr(0x005D, 0xBF);
        this.wr(0x005E, x);
        // 查 $BF89+X 指针表 (bank16 ROM, stub)
        const ptr = this.rdPtr(0x005D, 0x005E);
        void ptr;
    }
    /**
     * $8021: 脚本执行入口。
     * asm: LDA $0517; STA $052A; LDA $0516; AND #$FB; STA $0516;
     *   LDA #$00; STA $052B/$052D/$052C/$0530/$003A
     *   $803F: LDY $003A; INC $003A; LDA ($005D),Y; CMP #$F0; BCC $804F
     *   JSR $80A9 (指令分派); JMP $803F
     *   $804F: STA $0523; LDA $0516; ORA #$40; AND #$EF; STA $0516
     *   读参数2/3/4 (JSR $8991/$899C/$89A7); 算新指针; 调 $C50F
     */
    execute() {
        this.wr(0x052A, this.rd(0x0517));
        this.wr(0x0516, this.rd(0x0516) & 0xFB);
        this.wr(0x052B, 0);
        this.wr(0x052D, 0);
        this.wr(0x052C, 0);
        this.wr(0x0530, 0);
        this.wr(0x003A, 0);
        // 指令解析循环
        this._parseLoop();
    }
    /** $803F-$80A8: 指令解析循环 */
    _parseLoop() {
        while (true) {
            let y = this.rd(0x003A);
            this.wr(0x003A, (y + 1) & 0xFF);
            const ptr = this.rdPtr(0x005D, 0x005E);
            const opcode = 0; // ROM ($005D),Y stub
            if (opcode >= 0xF0) {
                // JSR $80A9 (指令分派)
                this.sub80A9(opcode);
                continue;
            }
            // $804F: STA $0523 (事件ID)
            this.wr(0x0523, opcode);
            this.wr(0x0516, (this.rd(0x0516) | 0x40) & 0xEF);
            // 读参数2/3/4
            y = this.rd(0x003A);
            this.wr(0x003A, (y + 1) & 0xFF);
            const p2 = 0; // stub
            if (p2 >= 0xF0)
                this.sub8991();
            this.wr(0x0524, p2);
            y = this.rd(0x003A);
            this.wr(0x003A, (y + 1) & 0xFF);
            const p3 = 0;
            if (p3 >= 0xF0)
                this.sub899C();
            this.wr(0x0528, p3);
            y = this.rd(0x003A);
            this.wr(0x003A, (y + 1) & 0xFF);
            const p4 = 0;
            if (p4 >= 0xF0)
                this.sub89A7();
            this.wr(0x0529, p4);
            // 算新指针
            const a = this.rd(0x003A);
            const sum = (a + this.rd(0x005D)) & 0xFFFF;
            this.wr(0x005D, sum & 0xFF);
            if (sum > 0xFF)
                this.wr(0x005E, (this.rd(0x005E) + 1) & 0xFF);
            // LDX #$15; LDA #$F0; STA $0001,X; LDA #$0B; STA $0002,X
            // LDA #$80; LDY #$08; JSR $C50F
            this._system.subC509(0x80);
            break;
        }
    }
    /**
     * $80A9: 指令分派 (SEC; SBC #$F0; JSR $C509; 查跳转表)。
     * asm: SEC; SBC #$F0; JSR $C509
     *   跳转表 $80AF: $80D4/$80D4/$80F4/$8105/$87E0/$87E6/$87EC/$87F5
     *     $87FF/$8809/$8812/$881B/$8853/$8858/$885F/$8866/$886A
     */
    sub80A9(opcode) {
        var _a;
        const cmd = (opcode - 0xF0) & 0xFF;
        const idx = this._system.subC509(cmd);
        const table = [
            0x80D4, 0x80D4, 0x80F4, 0x8105, 0x87E0, 0x87E6, 0x87EC, 0x87F5,
            0x87FF, 0x8809, 0x8812, 0x881B, 0x8853, 0x8858, 0x885F, 0x8866, 0x886A,
        ];
        const target = (_a = table[idx & 0xFF]) !== null && _a !== void 0 ? _a : 0x80D4;
        switch (target) {
            case 0x80D4:
                this.sub80D4();
                break;
            case 0x80F4:
                this.sub80F4();
                break;
            case 0x8105:
                this.sub8105();
                break;
            case 0x87E0:
                this.sub87E0();
                break;
            case 0x87E6:
                this.sub87E6();
                break;
            case 0x87EC:
                this.sub87EC();
                break;
            case 0x87F5:
                this.sub87F5();
                break;
            case 0x87FF:
                this.sub87FF();
                break;
            case 0x8809:
                this.sub8809();
                break;
            case 0x8812:
                this.sub8812();
                break;
            case 0x881B:
                this.sub881B();
                break;
            case 0x8853:
                this.sub8853();
                break;
            case 0x8858:
                this.sub8858();
                break;
            case 0x885F:
                this.sub885F();
                break;
            case 0x8866:
                this.sub8866();
                break;
            case 0x886A:
                this.sub886A();
                break;
        }
    }
    // ════════════════════════════════════════════════════════════
    // $80A9 跳转表目标子程
    // ════════════════════════════════════════════════════════════
    /**
     * $80D4: 初始化事件 (设 $052A=0, $0516 bit3, 清 $0522)。
     * asm: LDA #$00; STA $052A; LDA #$08; BIT $0516; BNE $80E6;
     *   ORA $0516; STA $0516; LDX #$05; JSR $C51B
     *   $80E6: LDA #$00; STA $0522; LDA $0021; AND #$1E; STA $0021; PLA; PLA; RTS
     */
    sub80D4() {
        this.wr(0x052A, 0);
        if ((this.rd(0x0516) & 0x08) === 0) {
            this.wr(0x0516, this.rd(0x0516) | 0x08);
            // LDX #$05; JSR $C51B
        }
        this.wr(0x0522, 0);
        this.wr(0x0021, this.rd(0x0021) & 0x1E);
    }
    /**
     * $80F4: 读指针+跳转 (查 $005D+Y 指针表)。
     * asm: LDY $003A; LDA ($005D),Y; TAX; INY; LDA ($005D),Y;
     *   STA $005E; STX $005D; LDA #$00; STA $003A; RTS
     */
    sub80F4() {
        const ptr = this.rdPtr(0x005D, 0x005E);
        void ptr;
        this.wr(0x003A, 0);
    }
    /**
     * $8105: 条件跳转 (读偏移, JSR $816E 分派, 跳转)。
     * asm: LDY $003A; LDA ($005D),Y; PHA; JSR $816E; PLA; BPL $812F
     *   TXA; SEC; ADC $003A; CLC; ADC $005D; STA $005D; BCC $811D; INC $005E
     *   LDY #$00; LDA ($005D),Y; CLC; ADC $005D; STA $005D; BCC $812A; INC $005E
     *   LDA #$00; STA $003A; RTS
     *   $812F: TXA; ASL; SEC; ADC $003A; TAY; JMP $80F6
     */
    sub8105() {
        const cond = this.sub816E();
        if (cond >= 0) {
            // 跳转
            const ptr = this.rdPtr(0x005D, 0x005E);
            void ptr;
            this.wr(0x003A, 0);
        }
    }
    /**
     * $816E: 条件判断 (AND #$7F; JSR $C509; 查跳转表)。
     * asm: AND #$7F; JSR $C509
     *   跳转表 $8172: 大量子程 (条件检查: 球员位置/方向/比分/时间等)
     */
    sub816E() {
        const cond = 0; // stub
        const idx = this._system.subC509(cond & 0x7F);
        // 跳转表 ~60 项, 各条件检查子程
        void idx;
        return 0;
    }
    /** $87E0: 设 $052A = $40 */
    sub87E0() {
        this.wr(0x052A, 0x40);
    }
    /** $87E6: 设 $052A = $00 */
    sub87E6() {
        this.wr(0x052A, 0x00);
    }
    /** $87EC: $052A ^= $40 */
    sub87EC() {
        this.wr(0x052A, this.rd(0x052A) ^ 0x40);
    }
    /** $87F5: 读 $005D+Y → $052B (参数1) */
    sub87F5() {
        const y = this.rd(0x003A);
        this.wr(0x003A, (y + 1) & 0xFF);
        this.wr(0x052B, 0); // stub
    }
    /** $87FF: 读 $005D+Y → $052C (参数2) */
    sub87FF() {
        const y = this.rd(0x003A);
        this.wr(0x003A, (y + 1) & 0xFF);
        this.wr(0x052C, 0); // stub
    }
    /** $8809: 读 $005D+Y → $0530/$0531 (16bit 参数) */
    sub8809() {
        this.wr(0x0530, 0); // stub
        this.wr(0x0531, 0);
        const y = (this.rd(0x003A) + 2) & 0xFF;
        this.wr(0x003A, y);
    }
    /**
     * $881B: 脚本调用 (压栈 $051A/$051B, 跳新指针)。
     * asm: LDX $0522; LDA $003A; TAY; CLC; ADC #$02; ADC $005D;
     *   STA $051A,X; LDA $005E; ADC #$00; STA $051B,X; INX; INX; STX $0522;
     *   JMP $80F6
     */
    sub881B() {
        let x = this.rd(0x0522);
        const a = this.rd(0x003A);
        const sum = (a + 2 + this.rd(0x005D)) & 0xFFFF;
        this.wr(0x051A + x, sum & 0xFF);
        this.wr(0x051B + x, (this.rd(0x005E) + (sum > 0xFF ? 1 : 0)) & 0xFF);
        x = (x + 2) & 0xFF;
        this.wr(0x0522, x);
        // JMP $80F6 (跳新指针)
        this.sub80F4();
    }
    /**
     * $8836: 脚本返回 (弹栈 $051A/$051B)。
     * asm: LDX $0522; DEX; DEX; STX $0522; BPL $8844; JMP $80CF
     *   $8844: LDA $051A,X; STA $005D; LDA $051B,X; STA $005E; LDA #$00; STA $003A; RTS
     */
    sub8853() {
        let x = (this.rd(0x0522) - 2) & 0xFF;
        this.wr(0x0522, x);
        if ((x & 0x80) !== 0) {
            // JMP $80CF (脚本结束)
            return;
        }
        this.wr(0x005D, this.rd(0x051A + x));
        this.wr(0x005E, this.rd(0x051B + x));
        this.wr(0x003A, 0);
    }
    /** $8858: 读 $005D+Y → $052D */
    sub8858() {
        const y = this.rd(0x003A);
        this.wr(0x003A, (y + 1) & 0xFF);
        this.wr(0x052D, 0); // stub
    }
    /** $885F: 读 $005D+Y → JSR $886A → STX $052A */
    sub885F() {
        const y = this.rd(0x003A);
        this.wr(0x003A, (y + 1) & 0xFF);
        const x = this.sub886A();
        this.wr(0x052A, x & 0xFF);
    }
    /**
     * $886A: 事件查表 (JSR $C509; 查跳转表)。
     * asm: JSR $C509; 跳转表 $886A: $8877/$88AA/$88B5/$88BF/$88D9
     */
    sub886A() {
        var _a;
        const idx = this._system.subC509(0);
        const table = [0x8877, 0x88AA, 0x88B5, 0x88BF, 0x88D9];
        const target = (_a = table[idx & 0xFF]) !== null && _a !== void 0 ? _a : 0x8877;
        switch (target) {
            case 0x8877: return this.sub8877();
            case 0x88AA: return this.sub88AA();
            case 0x88B5: return this.sub88B5();
            case 0x88BF: return this.sub88BF();
            case 0x88D9: return this.sub88D9();
        }
        return 0;
    }
    /**
     * $8877: 球员位置检查 (查球员数据, 算方向)。
     * asm: LDA #$00; STA $003B; LDA $0441; JSR $C50C;
     *   LDA $0638; JSR $C536; TYA; LDY #$08; SEC; SBC ($0034),Y; BCS $8891; INC $003B
     *   TXA; LDY #$06; SEC; SBC ($0034),Y; BCS $889D; INC $003B; INC $003B
     *   LDX #$40; LDA $003B; BEQ $88A9; CMP #$03; BEQ $88A9; LDX #$00; RTS
     */
    sub8877() {
        this.wr(0x003B, 0);
        // LDA $0441; JSR $C50C; LDA $0638; JSR $C536
        // 算方向偏移
        const b = this.rd(0x003B);
        if (b === 0 || b === 3)
            return 0x40;
        return 0;
    }
    /** $88AA: 球员计数器检查 (LDA $0616; LSR; BCC; LDX #$40) */
    sub88AA() {
        if ((this.rd(0x0616) & 1) !== 0)
            return 0x40;
        return 0;
    }
    /** $88B5: 比赛阶段检查 (LDA $05FB; BEQ; LDX #$40) */
    sub88B5() {
        if (this.rd(0x05FB) !== 0)
            return 0x40;
        return 0;
    }
    /**
     * $88BF: 球员 Y 坐标检查。
     * asm: LDA $0441; JSR $C50C; LDY #$08; LDA ($0034),Y;
     *   LDX $05FB; BEQ $88D0; EOR #$FF; LDX #$00; CMP #$80; BCS $88D8; LDX #$40
     */
    sub88BF() {
        // JSR $C50C; 读球员 Y 坐标
        const phase = this.rd(0x05FB);
        let a = 0; // stub: 球员 Y 坐标
        if (phase !== 0)
            a = a ^ 0xFF;
        if (a >= 0x80)
            return 0;
        return 0x40;
    }
    /** $88D9: $062C 方向检查 (BIT $062C; BPL; LDX #$40) */
    sub88D9() {
        if ((this.rd(0x062C) & 0x80) !== 0)
            return 0x40;
        return 0;
    }
    /** $88E5: 读 $005D+Y → $0539 */
    sub8866() {
        const y = this.rd(0x003A);
        this.wr(0x003A, (y + 1) & 0xFF);
        this.wr(0x0539, 0); // stub
    }
    // ════════════════════════════════════════════════════════════
    // $8991/$899C/$89A7: 参数扩展 (SBC #$F0; JSR $C509)
    // ════════════════════════════════════════════════════════════
    /** $8991: 参数2扩展 (SEC; SBC #$F0; JSR $C509; 查表) */
    sub8991() {
        const cmd = 0; // stub
        const idx = this._system.subC509((cmd - 0xF0) & 0xFF);
        void idx;
    }
    /** $899C: 参数3扩展 */
    sub899C() {
        const cmd = 0;
        const idx = this._system.subC509((cmd - 0xF0) & 0xFF);
        void idx;
    }
    /** $89A7: 参数4扩展 */
    sub89A7() {
        const cmd = 0;
        const idx = this._system.subC509((cmd - 0xF0) & 0xFF);
        void idx;
    }
    // ════════════════════════════════════════════════════════════
    // code_sub.s $833C-$8676: 球员选择/方向/动画辅助
    // ════════════════════════════════════════════════════════════
    /** $833C: INC $0616 (球员计数器+1) */
    sub833C() {
        this.wr(0x0616, (this.rd(0x0616) + 1) & 0xFF);
    }
    /** $8341: JSR $835C; LDA #$02; STA $043C */
    sub8341() {
        this.sub835C();
        this.wr(0x043C, 0x02);
    }
    /** $8350: LDA $05FB; EOR #$0B; JSR $C548; STA $0442 */
    sub8350() {
        const a = this.rd(0x05FB) ^ 0x0B;
        this._system.subC509(a);
        this.wr(0x0442, a & 0xFF);
    }
    /** $835C: LDA $05FB; JSR $C548; STA $0441 */
    sub835C() {
        const a = this.rd(0x05FB);
        this._system.subC509(a);
        this.wr(0x0441, a & 0xFF);
    }
    /** $8366: LDX $043B (队伍索引) */
    sub8366() {
        return this.rd(0x043B);
    }
    /** $836E: LDX $0612 (动作类型) */
    sub836E() {
        return this.rd(0x0612);
    }
    /**
     * $8370: 球员方向检查。
     * asm: LDX #$00; LDA $043B; CMP #$01; BEQ $837B; JSR $8677; INX; RTS
     */
    sub8370() {
        let x = 0;
        if (this.rd(0x043B) !== 1) {
            this.sub8677();
            x = (x + 1) & 0xFF;
        }
        return x;
    }
    /** $838B: LDA $0612; JSR $C509 (动作类型查表) */
    sub838B() {
        return this._system.subC509(this.rd(0x0612));
    }
    /** $8395: LDA $05FB; EOR #$0B; JSR $C548; STA $0442 */
    sub8395() {
        const a = this.rd(0x05FB) ^ 0x0B;
        this._system.subC509(a);
        this.wr(0x0442, a & 0xFF);
    }
    /** $83A8: LDY $043D; LDX $83AF,Y (查表) */
    sub83A8() {
        var _a;
        const y = this.rd(0x043D);
        const table = [0xFF, 0xFF, 0x00, 0xFF, 0x01];
        return (_a = table[y & 0x07]) !== null && _a !== void 0 ? _a : 0xFF;
    }
    /** $83B4: LDY $043B; LDX $83BB,Y (查表) */
    sub83B4() {
        var _a;
        const y = this.rd(0x043B);
        const table = [0xFF, 0x00, 0xFF, 0xFF, 0x01, 0xFF, 0x02];
        return (_a = table[y & 0x07]) !== null && _a !== void 0 ? _a : 0xFF;
    }
    /** $83C5: LDA $0441; JSR $8207; CMP #$1C/$48 */
    sub83C5() {
        this.sub8207(this.rd(0x0441));
        const a = 0; // stub
        if (a === 0x1C || a === 0x48) {
            // INX
        }
    }
    /** $83D5: LDA $043E; AND #$7F; TAX */
    sub83D5() {
        return this.rd(0x043E) & 0x7F;
    }
    /** $83E7: LDA $043E; AND #$7F; TAX */
    sub83E7() {
        return this.rd(0x043E) & 0x7F;
    }
    /** $83ED: LDA $043C; AND #$7F; TAX; JSR $8211 */
    sub83ED() {
        const x = this.rd(0x043C) & 0x7F;
        this.sub8211(x);
    }
    /** $83F5: LDA #$01; JSR $8211; LDA $043C; AND #$7F; TAX */
    sub83F5() {
        this.sub8211(1);
        return this.rd(0x043C) & 0x7F;
    }
    /** $8403: LDA $043C; AND #$7F; TAX; JMP $8211 */
    sub8403() {
        const x = this.rd(0x043C) & 0x7F;
        this.sub8211(x);
    }
    /** $8409: LDX $043B (队伍索引) */
    sub8409() {
        return this.rd(0x043B);
    }
    /** $840D: LDA $05FB; EOR #$0B; JSR $8207; LDX #$02; 条件 DEX */
    sub840D() {
        const a = this.rd(0x05FB) ^ 0x0B;
        this.sub8207(a);
        let x = 2;
        const v = 0; // stub
        if (v === 0x74 || v === 0x22 || v === 0x39 || v === 0x4C) {
            x = (x - 1) & 0xFF;
        }
        else {
            x = (x - 2) & 0xFF;
        }
        return x;
    }
    /** $842C: LDX #$00; LDA $061C; CMP #$60; BCC; INX */
    sub842C() {
        let x = 0;
        if (this.rd(0x061C) >= 0x60)
            x = 1;
        return x;
    }
    /** $8437: LDX $05FB; BEQ; LDX #$01 */
    sub8437() {
        if (this.rd(0x05FB) === 0)
            return 0;
        return 1;
    }
    /** $843F: LDX $002A (比分) */
    sub843F() {
        return this.rd(0x002A);
    }
    /** $8443: LDA $0441; JSR $8207; CMP #$60; DEX if != */
    sub8443() {
        this.sub8207(this.rd(0x0441));
    }
    /** $844F: LDX $0447; BNE; INC $0447 */
    sub844F() {
        if (this.rd(0x0447) === 0) {
            this.wr(0x0447, (this.rd(0x0447) + 1) & 0xFF);
        }
    }
    /**
     * $8457: 比分检查 (LDA $002B; CMP #$22; 比分差判断)。
     * asm: LDX #$00; LDA $002B; CMP #$22; BNE $847D;
     *   LDY #$00; LDA $0028; SEC; SBC $0029; BCC $847A; BEQ $847A;
     *   LDY #$80; LDA #$CA; STA $03FE; LDA $05FB; BNE $847A; INX;
     *   STY $03FD; RTS
     */
    sub8457() {
        let x = 0;
        if (this.rd(0x002B) === 0x22) {
            const diff = (this.rd(0x0028) - this.rd(0x0029)) & 0xFF;
            if (diff !== 0 && (diff & 0x80) === 0) {
                this.wr(0x03FE, 0xCA);
                if (this.rd(0x05FB) === 0)
                    x = 1;
                this.wr(0x03FD, 0x80);
            }
        }
        return x;
    }
    /**
     * $847D: 球员1必杀检查 (LDA $0442; JSR $8207; 查 $86F4 表)。
     * asm: LDA $0442; JSR $8207; TAY; LDX $86F4,Y; BEQ $8497;
     *   LDA $0441; JSR $8207; TAY; LDX $86F4,Y; JSR $8211
     */
    sub847D() {
        this.sub8207(this.rd(0x0442));
        // 查 $86F4 表
        const v1 = 0; // stub
        if (v1 !== 0) {
            this.sub8207(this.rd(0x0441));
            this.sub8211(0);
        }
    }
    /** $8497: 球员2必杀检查 (与 $847D 对称) */
    sub8497() {
        this.sub8207(this.rd(0x0441));
        const v1 = 0; // stub
        if (v1 !== 0) {
            this.sub8207(this.rd(0x0442));
            this.sub8211(0);
        }
    }
    /** $84B1: LDX #$00; BIT $043E; BPL; 球员方向检查 */
    sub84B1() {
        if ((this.rd(0x043E) & 0x80) !== 0) {
            this.sub8207(this.rd(0x0442));
            this.sub8211(0);
        }
    }
    /**
     * $84C7: 球员数据读取 (LDA $0441; LDX $05FB; JSR $C50C; 读球员数据)。
     * asm: LDA $0441; LDX $05FB; BEQ $84D2; LDA $0442
     *   JSR $C50C; LDX #$00; LDY #$01; LDA ($0034),Y; SEC; SBC #$64; ...
     */
    sub84C7() {
        let a = this.rd(0x0441);
        if (this.rd(0x05FB) !== 0)
            a = this.rd(0x0442);
        this._system.subC50C();
        // 读球员数据[1], 减 $64, 检查条件
    }
    // ════════════════════════════════════════════════════════════
    // $8207/$8211: 球员数据查询辅助
    // ════════════════════════════════════════════════════════════
    /**
     * $8207: 读球员数据[0] (JSR $C50C; LDY #$00; LDA ($0034),Y)。
     * @param playerId 球员 ID
     * @returns 球员数据[0]
     */
    sub8207(playerId) {
        this._system.subC50C();
        // LDY #$00; LDA ($0034),Y
        return 0; // stub: 球员数据[0]
    }
    /**
     * $8211: 球员方向设置 (BEQ $821B; 设 $0516 bit2)。
     * @param dir 方向
     */
    sub8211(dir) {
        if (dir === 0) {
            this.wr(0x0516, this.rd(0x0516) | 0x04);
        }
    }
    // ════════════════════════════════════════════════════════════
    // $8138-$816D: 方向差计算
    // ════════════════════════════════════════════════════════════
    /**
     * $8138: 方向差计算 (AND #$FC; LSR; 比较球门方向)。
     * asm: AND #$FC; BEQ $814D; LSR; STA $003B;
     *   LDA $00E2; CMP $003B; BCC $814B; SBC $003B; JMP $8142;
     *   ADC $003B; LDX #$00; RTS
     */
    sub8138(direction) {
        let a = direction & 0xFC;
        if (a === 0)
            return 0;
        a = a >> 1;
        this.wr(0x003B, a);
        const e2 = this.rd(0x00E2);
        if (e2 < a) {
            // SBC
            return (e2 - a) & 0xFF;
        }
        return (e2 + a) & 0xFF;
    }
    /**
     * $8150: 球员距离计算 (JSR $C50C; 读球员数据; 减偏移)。
     * asm: JSR $C50C; LDY #$01; LDA ($0034),Y; SEC; SBC #$40; TAX;
     *   INY; LDA ($0034),Y; SBC #$00; BPL $8165; LDX #$00; TXA;
     *   STA ($0034),Y; DEY; TXA; STA ($0034),Y; LDX #$01; RTS
     */
    sub8150(playerId) {
        this._system.subC50C();
        // 读球员数据[1], 减 $40
        return 1; // stub
    }
    // ════════════════════════════════════════════════════════════
    // $82BC-$8335: 事件计数器 + 距离判断
    // ════════════════════════════════════════════════════════════
    /**
     * $82BC: 事件距离判断 (LDA $0443; CMP #$06; BEQ; 查 $062C 方向)。
     * asm: LDA $0443; CMP #$06; BEQ $82DA;
     *   LDA $062C; BPL $82CB; EOR #$FF; CLC; ADC #$01; CMP #$40; BCC $82D3;
     *   EOR #$FF; AND #$3F; CMP #$20; BCC $82DA; INC $0443
     *   $82DA: LDA $0443; ASL; ASL; ADC $0443; TAY; LDX #$00;
     *   LDA $00E3; CMP $8308,Y; BCS $82F3; BEQ $82F3; INX; INY; BNE $82E8;
     *   TXA; PHA; JSR $82FB; PLA; TAX; RTS
     */
    sub82BC() {
        const cnt = this.rd(0x0443);
        if (cnt !== 6) {
            let dir = this.rd(0x062C);
            if ((dir & 0x80) !== 0) {
                dir = ((dir ^ 0xFF) + 1) & 0xFF;
                if (dir >= 0x40) {
                    dir = (dir ^ 0xFF) & 0x3F;
                    if (dir >= 0x20) {
                        this.wr(0x0443, (cnt + 1) & 0xFF);
                    }
                }
            }
        }
        // 查 $8308 表 (距离判断)
        const newCnt = this.rd(0x0443);
        const y = (newCnt << 2) + newCnt;
        const e3 = this.rd(0x00E3);
        // 查表比较
        this._system.subC509(0);
        return 0;
    }
    /** $82FB: JSR $C509; 查 $8308 表 (距离阈值) */
    sub82FB() {
        this._system.subC509(0);
    }
    /** $8330: LDA #$02; STA $0612 (设动作类型=2) */
    sub8330() {
        this.wr(0x0612, 0x02);
    }
    /** $8336: LDA #$02; STA $0612 (设动作类型=2) */
    sub8336() {
        this.wr(0x0612, 0x02);
    }
    // ════════════════════════════════════════════════════════════
    // $8677+: code_data 事件处理子程
    // ════════════════════════════════════════════════════════════
    /**
     * $8677: 球员1方向检查 (LDX #$00; LDA $0444; JSR $8138)。
     * asm: LDX #$00; LDA $0444; JSR $8138; CMP #$80; BCC $8689;
     *   LDA $0442; JSR $8150; RTS
     */
    sub8677() {
        const a = this.sub8138(this.rd(0x0444));
        if (a >= 0x80) {
            this.sub8150(this.rd(0x0442));
        }
    }
    /**
     * $8689: 球员ID查表 (LDA $0441; JSR $8207; 查 $86A6 表)。
     * asm: LDA $0441; JSR $8207; LDY #$00; CMP $86A6,Y; BEQ $869D;
     *   INY; INY; CPY #$0E; BNE $8692; LDX $86A7,Y; LDA #$01; JSR $8211
     */
    sub8689() {
        var _a;
        const id = this.sub8207(this.rd(0x0441));
        const table = [0x1A, 0x00, 0x41, 0x00, 0x36, 0x01, 0x1C, 0x02, 0x48, 0x02, 0x2E, 0x03, 0x57, 0x04];
        let y = 0;
        while (y < 0x0E) {
            if (id === table[y])
                break;
            y += 2;
        }
        const x = (_a = table[y + 1]) !== null && _a !== void 0 ? _a : 0x05;
        this.sub8211(1);
        void x;
    }
    /** $86B7: 动作类型查表 (LDA $043C; AND #$7F; CMP $86C8,X) */
    sub86B7() {
        const table = [0x08, 0x0A, 0x10, 0x1F];
        const a = this.rd(0x043C) & 0x7F;
        for (let x = 0; x < 4; x++) {
            if (a === table[x])
                return x;
        }
        return 4;
    }
    /** $86CE: 球员ID查表2 (LDA $0441; JSR $8207; 查 $86E3 表, 17 项) */
    sub86CE() {
        const id = this.sub8207(this.rd(0x0441));
        const table = [0x01, 0x11, 0x1A, 0x41, 0x36, 0x1F, 0x38, 0x17, 0x18, 0x46, 0x47, 0x30, 0x31, 0x60, 0x5E, 0x58, 0x57];
        for (let x = 0; x < 0x11; x++) {
            if (id === table[x]) {
                this.sub8211(x);
                return;
            }
        }
        this.sub8211(0x11);
    }
    /**
     * $88F0: 参数扩展 (JSR $C509; 查跳转表)。
     * asm: LDY $003A; LDA ($005D),Y; JSR $C509
     *   跳转表 $88F0: $88FC/$890D/$893D/$8942
     */
    sub88F0() {
        var _a;
        const idx = this._system.subC509(0);
        const table = [0x88FC, 0x890D, 0x893D, 0x8942];
        const target = (_a = table[idx & 0x03]) !== null && _a !== void 0 ? _a : 0x88FC;
        switch (target) {
            case 0x88FC:
                this.sub88FC();
                break;
            case 0x890D:
                this.sub890D();
                break;
            case 0x893D:
                this.sub893D();
                break;
            case 0x8942:
                this.sub8942();
                break;
        }
    }
    /** $88FC: 球员数据[0] 检查 (LDA $0441; JSR $C50C; 读[0]; CMP #$60) */
    sub88FC() {
        this._system.subC50C();
        // 读球员数据[0], 循环检查
    }
    /**
     * $890D: 比赛阶段+球员检查 (LDA $05FB; BNE; 球员数据循环)。
     * asm: LDA $05FB; BNE $898E; LDA #$01; PHA; JSR $C50C;
     *   LDY #$00; LDA ($0034),Y; TAY; LDX #$00; PLA; CPY #$1A; BEQ $8964;
     *   CLC; ADC #$01; CMP #$0B; BNE $894C; BEQ $898E;
     *   $8964: LDA $043C; CMP #$03; BCC $898E; BIT $0449; BMI $898E;
     *   INC $0449; CMP #$02; BNE $898E; LDA #$00; LDY $00E2; CPY #$20; BCS $898B;
     *   LDA #$1E; STA $044A; LDA #$80; INX; STA $0449; JMP $812F
     */
    sub890D() {
        if (this.rd(0x05FB) !== 0)
            return;
        // 球员数据循环
        this._system.subC50C();
        // 检查球员数据[0] == $1A
        const v43C = this.rd(0x043C);
        if (v43C < 3)
            return;
        if ((this.rd(0x0449) & 0x80) !== 0)
            return;
        this.wr(0x0449, (this.rd(0x0449) + 1) & 0xFF);
        if (this.rd(0x0449) !== 2)
            return;
        const e2 = this.rd(0x00E2);
        if (e2 < 0x20) {
            this.wr(0x044A, 0x1E);
            this.wr(0x0449, 0x80);
        }
    }
    /** $893D: LDX #$00; JMP $812F */
    sub893D() {
        // JMP $812F (条件跳转)
    }
    /** $8942: LDA $05FB; BNE; 球员检查 (与 $890D 类似) */
    sub8942() {
        this.sub890D();
    }
}
exports.SkillService = SkillService;
exports.default = SkillService;
