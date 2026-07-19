"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = exports.FLAG = void 0;
/** SR/CCR 标志位 */
exports.FLAG = {
    C: 0, // Carry
    V: 1, // Overflow
    Z: 2, // Zero
    N: 3, // Negative
    X: 4, // Extend
};
const FLAG_C = 1 << 0;
const FLAG_V = 1 << 1;
const FLAG_Z = 1 << 2;
const FLAG_N = 1 << 3;
const FLAG_X = 1 << 4;
/** Supervisor 模式 (SR bit 13) */
const SR_S = 1 << 13;
class Cpu {
    /** 数据寄存器 D0-D7 */
    d;
    /** 地址寄存器 A0-A7 (A7=SP) */
    a;
    /** 程序计数器 */
    pc = 0;
    /** SSP 管理栈指针 */
    ssp = 0;
    /** USP 用户栈指针 */
    usp = 0;
    /** 内存总线 */
    mem;
    /** 当前指令已执行的周期数 */
    cycles = 0;
    /** 总周期数 */
    totalCycles = 0;
    /** 停止标志 */
    halted = false;
    /** 跟踪 */
    trace = false;
    /** 调试日志 */
    debugLog = false;
    /** SR (16-bit): 高字节 = system byte, 低字节 = CCR */
    _sr = SR_S; // 从 Supervisor 模式启动
    constructor(mem) {
        this.mem = mem;
        this.d = new Int32Array(8);
        this.a = new Int32Array(8);
    }
    // ============================================================
    // SR / CCR 访问
    // ============================================================
    get sr() { return this._sr; }
    set sr(v) { this._sr = v & 0xFFFF; }
    get ccr() { return this._sr & 0x1F; }
    set ccr(v) { this._sr = (this._sr & 0xFFE0) | (v & 0x1F); }
    /** Supervisor 模式? */
    get supervisor() { return !!(this._sr & SR_S); }
    // 标志位读写
    getFlag(bit) { return !!(this._sr & (1 << bit)); }
    setFlag(bit, val) {
        if (val)
            this._sr |= (1 << bit);
        else
            this._sr &= ~(1 << bit);
    }
    // NZ 便捷设置
    setNZ(v, size) {
        const mask = (1 << (size * 8)) - 1;
        v &= mask;
        this.setFlag(exports.FLAG.N, (v >> (size * 8 - 1)) !== 0);
        this.setFlag(exports.FLAG.Z, v === 0);
    }
    setVCAdd(dst, src, result, size) {
        const mask = (1 << (size * 8)) - 1;
        dst &= mask;
        src &= mask;
        result &= mask;
        const bit = size * 8 - 1;
        // V: overflow when both operands have same sign and result has opposite sign
        this.setFlag(exports.FLAG.V, (((~(dst ^ src)) & (dst ^ result)) >>> bit) & 1 ? true : false);
        // C/X: carry out of MSB (unsigned overflow)
        this.setFlag(exports.FLAG.C, (dst + src) > mask);
        this.setFlag(exports.FLAG.X, this.getFlag(exports.FLAG.C));
    }
    setVCSub(dst, src, result, size) {
        const mask = (1 << (size * 8)) - 1;
        dst &= mask;
        src &= mask;
        result &= mask;
        const bit = size * 8 - 1;
        // V: overflow when operands have opposite signs and result has same sign as src
        this.setFlag(exports.FLAG.V, (((dst ^ src) & (dst ^ result)) >>> bit) & 1 ? true : false);
        // C/X: set if borrow (unsigned underflow)
        this.setFlag(exports.FLAG.C, dst < src);
        this.setFlag(exports.FLAG.X, this.getFlag(exports.FLAG.C));
    }
    // ============================================================
    // 存储器读
    // ============================================================
    read8(addr) { return this.mem.read8(addr & 0xFFFFFF); }
    read16(addr) { return this.mem.read16(addr & 0xFFFFFF); }
    read32(addr) { return this.mem.read32(addr & 0xFFFFFF); }
    write8(addr, v) { this.mem.write8(addr & 0xFFFFFF, v); }
    write16(addr, v) { this.mem.write16(addr & 0xFFFFFF, v); }
    write32(addr, v) { this.mem.write32(addr & 0xFFFFFF, v); }
    // ============================================================
    // 取指
    // ============================================================
    fetchWord() {
        const w = this.read16(this.pc);
        this.pc = (this.pc + 2) & 0xFFFFFF;
        return w;
    }
    fetchLong() {
        const l = this.read32(this.pc);
        this.pc = (this.pc + 4) & 0xFFFFFF;
        return l;
    }
    // ============================================================
    // 符号扩展
    // ============================================================
    signExt8(v) {
        return (v & 0x80) ? (v | 0xFFFFFF00) : (v & 0xFF);
    }
    signExt16(v) {
        return (v & 0x8000) ? (v | 0xFFFF0000) : (v & 0xFFFF);
    }
    // ============================================================
    // 栈操作
    // ============================================================
    push16(v) {
        this.a[7] = (this.a[7] - 2) >>> 0;
        this.write16(this.a[7], v & 0xFFFF);
    }
    pop16() {
        const v = this.read16(this.a[7]);
        this.a[7] = (this.a[7] + 2) >>> 0;
        return v;
    }
    push32(v) {
        this.a[7] = (this.a[7] - 4) >>> 0;
        this.write32(this.a[7], v >>> 0);
    }
    pop32() {
        const v = this.read32(this.a[7]);
        this.a[7] = (this.a[7] + 4) >>> 0;
        return v;
    }
    // ============================================================
    // 条件码求值
    // ============================================================
    evalCondition(cc) {
        switch (cc) {
            case 0x0: return true;
            case 0x1: return false;
            case 0x2: return !this.getFlag(exports.FLAG.C) && !this.getFlag(exports.FLAG.Z);
            case 0x3: return this.getFlag(exports.FLAG.C) || this.getFlag(exports.FLAG.Z);
            case 0x4: return !this.getFlag(exports.FLAG.C);
            case 0x5: return this.getFlag(exports.FLAG.C);
            case 0x6: return !this.getFlag(exports.FLAG.Z);
            case 0x7: return this.getFlag(exports.FLAG.Z);
            case 0x8: return !this.getFlag(exports.FLAG.V);
            case 0x9: return this.getFlag(exports.FLAG.V);
            case 0xA: return !this.getFlag(exports.FLAG.N);
            case 0xB: return this.getFlag(exports.FLAG.N);
            case 0xC: return this.getFlag(exports.FLAG.N) === this.getFlag(exports.FLAG.V);
            case 0xD: return this.getFlag(exports.FLAG.N) !== this.getFlag(exports.FLAG.V);
            case 0xE: return !this.getFlag(exports.FLAG.Z) && (this.getFlag(exports.FLAG.N) === this.getFlag(exports.FLAG.V));
            case 0xF: return this.getFlag(exports.FLAG.Z) || (this.getFlag(exports.FLAG.N) !== this.getFlag(exports.FLAG.V));
            default: return false;
        }
    }
    // ============================================================
    // 逻辑指令标志
    // ============================================================
    setVCLogic(_result, _size) {
        this.setFlag(exports.FLAG.V, false);
        this.setFlag(exports.FLAG.C, false);
    }
    // ============================================================
    // 复位
    // ============================================================
    reset() {
        // 读中断向量: SSP ← $000000, PC ← $000004
        this.ssp = this.read32(0x000000);
        this.pc = this.read32(0x000004);
        this.a[7] = this.ssp;
        this._sr = SR_S;
        this.halted = false;
        this.cycles = 0;
        this.totalCycles = 0;
        // [DEBUG] Dump ROM boot area
        const romDump = [];
        for (let a = 0x8000; a < 0x8030; a += 2) {
            romDump.push(this.read16(a).toString(16).padStart(4, '0'));
        }
        console.warn(`[Cpu] ROM dump $8000-$802F: ${romDump.join(' ')}`);
        console.log(`[Cpu] Reset: SSP=$${this.ssp.toString(16)}, PC=$${this.pc.toString(16)}`);
    }
    // ============================================================
    // 执行一步
    // ============================================================
    step() {
        if (this.halted)
            return 0;
        if (this.pc < 0 || this.pc >= 0x200000) {
            console.error(`[Cpu] PC 越界: $${this.pc.toString(16)} (raw=${this.pc}, 24bit=$0${(this.pc & 0xFFFFFF).toString(16)})`);
            this.halted = true;
            return 0;
        }
        const pcBeforeFetch = this.pc;
        const opcode = this.fetchWord();
        this.cycles = 0;
        // [DEBUG] 跟踪每条指令
        if (this.trace || this.totalCycles <= 100) {
            console.warn(`[Cpu] step PC=$${pcBeforeFetch.toString(16)} opcode=$${opcode.toString(16)} sr=$${this._sr.toString(16)} A7=$${this.a[7].toString(16)} D0=$${this.d[0].toString(16)}`);
        }
        try {
            this.execute(opcode);
        }
        catch (e) {
            console.error(`[Cpu] 指令执行错误 @ PC=$${(this.pc - 2).toString(16)}, opcode=$${opcode.toString(16)}:`, e);
            this.halted = true;
        }
        this.totalCycles += this.cycles;
        return this.cycles;
    }
    // ============================================================
    // 指令执行
    // ============================================================
    execute(opcode) {
        const hi = (opcode >> 12) & 0xF;
        switch (hi) {
            // 0xxx: Bit manipulation / ORI / ANDI / SUBI / ADDI / EORI / CMPI / BTST / BCHG / BCLR / BSET
            case 0:
                this.exec0xxx(opcode);
                break;
            // 1xxx: MOVE.B / MOVE.L
            case 1:
            case 2:
            case 3:
                this.execMOVE(opcode);
                break;
            // 4xxx: NEGX / CLR / NEG / NOT / ...
            case 4:
                this.exec4xxx(opcode);
                break;
            // 5xxx: ADDQ / SUBQ / Scc / DBcc
            case 5:
                // DBcc: bits 7-6=11, bits 5-3=001
                if ((opcode & 0x00F8) === 0x00C8) {
                    this.execDBcc(opcode);
                    // Scc: bits 7-6=11, bits 5-3 ≠ 001
                }
                else if ((opcode & 0x00C0) === 0x00C0) {
                    this.execScc(opcode);
                }
                else {
                    this.execADDQ_SUBQ(opcode);
                }
                break;
            // 6xxx: Bcc / BSR / BRA
            case 6:
                this.execBcc(opcode);
                break;
            // 7xxx: MOVEQ
            case 7:
                this.execMOVEQ(opcode);
                break;
            // 8xxx: OR / DIVU / SBCD / DIVS
            case 8:
                if ((opcode & 0x01C0) === 0x01C0) {
                    this.execDIVS(opcode);
                }
                else {
                    this.execOR(opcode);
                }
                break;
            // 9xxx: SUB / SUBX
            case 9:
                if ((opcode & 0x01C0) === 0x01C0) {
                    this.execSUBA(opcode);
                }
                else {
                    this.execSUB(opcode);
                }
                break;
            // Axxx: (line A — 未使用, 抛出异常)
            case 0xA:
                this.exceptionLineA();
                break;
            // Bxxx: CMP / EOR
            case 0xB:
                if ((opcode & 0x01C0) === 0x01C0) {
                    this.execCMPA(opcode);
                }
                else {
                    this.execCMP_EOR(opcode);
                }
                break;
            // Cxxx: AND / MULU / ABCD / EXG / MULS
            case 0xC:
                this.execAND_EXG(opcode);
                break;
            // Dxxx: ADD / ADDA
            case 0xD:
                if ((opcode & 0x01C0) === 0x01C0) {
                    this.execADDA(opcode);
                }
                else {
                    this.execADD(opcode);
                }
                break;
            // Exxx: Shift/Rotate / Bit field
            case 0xE:
                this.execExxx(opcode);
                break;
            // Fxxx: (line F — 未使用)
            case 0xF:
                this.exceptionLineF();
                break;
        }
    }
    // ============================================================
    // 0xxx — ORI / ANDI / SUBI / ADDI / EORI / CMPI / BTST / BCHG / BCLR / BSET
    // ============================================================
    exec0xxx(opcode) {
        const op = (opcode >> 9) & 0x7;
        const size = (opcode >> 6) & 0x3; // 0=byte, 1=word, 2=long
        const eaMode = opcode & 0x3F;
        switch (op) {
            case 0:
                this.immOp(eaMode, size, 'ORI');
                break;
            case 1:
                this.immOp(eaMode, size, 'ANDI');
                break;
            case 2:
                this.immOp(eaMode, size, 'SUBI');
                break;
            case 3:
                this.immOp(eaMode, size, 'ADDI');
                break;
            case 4:
                if ((opcode & 0x0100) === 0)
                    this.bitOp(opcode, 'BTST');
                else
                    this.execMOVEP(opcode);
                break;
            case 5:
                this.immOp(eaMode, size, 'EORI');
                break;
            case 6:
                this.immOp(eaMode, size, 'CMPI');
                break;
            case 7:
                this.bitOp(opcode, 'BSET');
                break;
        }
    }
    immOp(eaMode, size, op) {
        let imm;
        if (size === 2) {
            imm = this.fetchLong();
            const val = this.readEaLong(eaMode);
            const r = this.immEval(val, imm, op);
            this.updateImmFlags(eaMode, size, val, imm, r, op);
        }
        else if (size === 1) {
            imm = this.fetchWord();
            const val = this.readEaWord(eaMode);
            const r = this.immEval(val, imm, op);
            this.updateImmFlags(eaMode, size, val, imm, r, op);
        }
        else {
            imm = this.fetchWord() & 0xFF;
            const val = this.readEaByte(eaMode);
            const r = this.immEval(val, imm, op);
            this.updateImmFlags(eaMode, size, val, imm, r, op);
        }
    }
    updateImmFlags(eaMode, size, val, imm, r, op) {
        const sz = size === 0 ? 1 : size === 1 ? 2 : 4;
        if (op === 'CMPI') {
            this.setNZ(r, sz);
            this.setVCSub(val, imm, r, sz);
        }
        else if (op === 'ADDI') {
            this.writeEa(sz, eaMode, r);
            this.setNZ(r, sz);
            this.setVCAdd(val, imm, r, sz);
        }
        else if (op === 'SUBI') {
            this.writeEa(sz, eaMode, r);
            this.setNZ(r, sz);
            this.setVCSub(val, imm, r, sz);
        }
        else {
            // ORI, ANDI, EORI — logic ops: V=C=0
            this.writeEa(sz, eaMode, r);
            this.setNZ(r, sz);
            this.setVCLogic(r, sz);
        }
    }
    immEval(val, imm, op) {
        switch (op) {
            case 'ORI': return val | imm;
            case 'ANDI': return val & imm;
            case 'SUBI': return val - imm;
            case 'ADDI': return val + imm;
            case 'EORI': return val ^ imm;
            default: return val - imm; // CMPI
        }
    }
    bitOp(opcode, op) {
        const isStatic = !!(opcode & 0x0100);
        const eaMode = opcode & 0x3F;
        let bitNum;
        if (isStatic) {
            bitNum = this.fetchWord() & 0x1F; // for BSET/BCHG/BCLR static
        }
        else {
            bitNum = this.d[(opcode >> 9) & 0x7] & 0x1F;
        }
        const val = isStatic
            ? this.readEaByte(eaMode) // .B for static
            : this.readEaLong(eaMode); // .L for dynamic
        const mask = 1 << bitNum;
        if (op === 'BTST') {
            this.setFlag(exports.FLAG.Z, (val & mask) === 0);
        }
        else {
            let result;
            switch (op) {
                case 'BSET':
                    result = val | mask;
                    break;
                case 'BCLR':
                    result = val & ~mask;
                    break;
                case 'BCHG':
                    result = val ^ mask;
                    break;
                default: result = val;
            }
            if (isStatic) {
                this.setFlag(exports.FLAG.Z, (val & mask) === 0);
                this.writeEaByte(eaMode, result & 0xFF);
            }
            else {
                this.writeEaLong(eaMode, result);
            }
        }
    }
    // ============================================================
    // 1xxx/2xxx/3xxx — MOVE.B / MOVE.W / MOVE.L
    // ============================================================
    execMOVE(opcode) {
        const size = ((opcode >> 12) & 0x3);
        const sz = size === 1 ? 0 : size === 3 ? 1 : 2; // 1=byte, 3=word, 2=long
        const dstMode = (opcode >> 6) & 0x07;
        const dstReg = opcode & 0x07;
        const srcMode = (opcode >> 3) & 0x07;
        const srcReg = (opcode >> 9) & 0x07;
        if (sz === 1) {
            // MOVE.B
            const src = this.readSrcByte(srcMode, srcReg);
            this.writeDstByte(dstMode, dstReg, src);
            this.setNZ(src, 1);
            this.setFlag(exports.FLAG.V, false);
            this.setFlag(exports.FLAG.C, false);
        }
        else if (sz === 0) {
            // MOVE.W
            const src = this.readSrcWord(srcMode, srcReg);
            this.writeDstWord(dstMode, dstReg, src);
            this.setNZ(src, 2);
            this.setFlag(exports.FLAG.V, false);
            this.setFlag(exports.FLAG.C, false);
        }
        else {
            // MOVE.L
            const src = this.readSrcLong(srcMode, srcReg);
            this.writeDstLong(dstMode, dstReg, src);
            this.setNZ(src, 4);
            this.setFlag(exports.FLAG.V, false);
            this.setFlag(exports.FLAG.C, false);
        }
    }
    // ============================================================
    // 4xxx — NEGX / CLR / NEG / NOT / NBCD / SWAP / PEA / MOVEM / LEA / CHK
    // ============================================================
    exec4xxx(opcode) {
        // Special 4EXX single-word ops
        if ((opcode & 0xFFF0) === 0x4E70) {
            if (opcode === 0x4E71) {
                this.cycles = 4;
                return;
            } // NOP
            if (opcode === 0x4E73) {
                this.execRTE();
                return;
            }
            if (opcode === 0x4E75) {
                this.execRTS();
                return;
            }
            if (opcode === 0x4E76) {
                this.execTRAPV();
                return;
            }
            if (opcode === 0x4E77) {
                this.execRTR();
                return;
            }
            // 4E70 (RESET), 4E72 (STOP), 4E74 (RTD), etc.
            this.unimplemented('4E7x-other', opcode);
            return;
        }
        // JMP: 0x4EC0-0x4EFF, JSR: 0x4E80-0x4EBF
        if ((opcode & 0xFFC0) === 0x4EC0) {
            this.execJMP(opcode);
            return;
        }
        if ((opcode & 0xFFC0) === 0x4E80) {
            this.execJSR(opcode);
            return;
        }
        // LEA: 0100 RRR 111 MMM RRR → bits 8-6 = 111, bit 5 = 0
        if ((opcode & 0xF1C0) === 0x41C0) {
            this.execLEA(opcode);
            return;
        }
        // MOVEM: 0100_1D00_1S... 按 0xF780 掩码 (bit 11=D, bit 10=0, bits 9-8=0, bit 7=1)
        if ((opcode & 0xF780) === 0x4080) {
            this.execMOVEM(opcode);
            return;
        }
        // TRAP: 0100 1110 0100 xxxx
        if ((opcode & 0xFFF0) === 0x4E40) {
            this.execTRAP(opcode);
            return;
        }
        // LINK: 0100 1110 0101 0nnn
        if ((opcode & 0xFFF8) === 0x4E50) {
            this.execLINK(opcode);
            return;
        }
        // UNLK: 0100 1110 0101 1nnn
        if ((opcode & 0xFFF8) === 0x4E58) {
            this.execUNLK(opcode);
            return;
        }
        // MOVE An,USP / MOVE USP,An
        if ((opcode & 0xFFF0) === 0x4E60) {
            this.execMOVE_USP(opcode);
            return;
        }
        // CHK: 0100 RRR 110 ... (stub)
        if ((opcode & 0xF1C0) === 0x4180) {
            this.unimplemented('CHK', opcode);
            return;
        }
        // Fallthrough for sub=6, sub=7: also try PEA (0x4850-0x485F)
        if ((opcode & 0xFFC0) === 0x4850) {
            this.unimplemented('PEA-abs', opcode);
            return;
        }
        // CLR, NEG, NOT, etc. — sub = bits 11-9
        const sub = (opcode >> 9) & 0x7;
        const eaMode = opcode & 0x3F;
        switch (sub) {
            case 0:
                this.execNEGX(this.szFrom4x(opcode), eaMode);
                break;
            case 1:
                this.execCLR(this.szFrom4x(opcode), eaMode);
                break;
            case 2:
                this.execNEG(this.szFrom4x(opcode), eaMode);
                break;
            case 3:
                this.execNOT(this.szFrom4x(opcode), eaMode);
                break;
            case 4: // EXT / SWAP / NBCD / PEA
                if ((opcode & 0x01C0) === 0x0100)
                    this.execEXT(opcode);
                else if ((opcode & 0xFFF8) === 0x4840)
                    this.execSWAP(opcode);
                else
                    this.unimplemented('4xxx-NBCD/PEA', opcode);
                break;
            case 5: // TST
                this.execTST(this.szFrom4x(opcode), eaMode);
                break;
            default:
                // sub=6 ($4C00-$4DFF) and sub=7 ($4E00-$4FFF): all illegal on 68000
                // (4E40..4E7F / 4E80..4EFF already handled by earlier checks)
                this.exceptionIllegal();
        }
    }
    // ============================================================
    // 5xxx — ADDQ / SUBQ / Scc / DBcc
    // ============================================================
    execADDQ_SUBQ(opcode) {
        const data = ((opcode >> 9) & 0x07) || 8; // 0 → 8
        const isSub = !!(opcode & 0x0100);
        const size = (opcode >> 6) & 0x03;
        const eaMode = opcode & 0x3F;
        if (size === 0) {
            this.addqByte(data, isSub, eaMode);
        }
        else if (size === 1) {
            this.addqWord(data, isSub, eaMode);
        }
        else {
            this.addqLong(data, isSub, eaMode);
        }
    }
    addqByte(data, isSub, eaMode) {
        const val = this.readEaByte(eaMode);
        const result = isSub ? val - data : val + data;
        this.writeEaByte(eaMode, result);
        this.setNZ(result, 1);
        if (isSub) {
            this.setVCSub(val, data, result, 1);
        }
        else {
            this.setVCAdd(val, data, result, 1);
        }
    }
    addqWord(data, isSub, eaMode) {
        const val = this.readEaWord(eaMode);
        const result = isSub ? val - data : val + data;
        this.writeEaWord(eaMode, result);
        this.setNZ(result, 2);
        if (isSub) {
            this.setVCSub(val, data, result, 2);
        }
        else {
            this.setVCAdd(val, data, result, 2);
        }
    }
    addqLong(data, isSub, eaMode) {
        const val = this.readEaLong(eaMode);
        const result = isSub ? val - data : val + data;
        this.writeEaLong(eaMode, result);
        this.setNZ(result, 4);
        if (isSub) {
            this.setVCSub(val, data, result, 4);
        }
        else {
            this.setVCAdd(val, data, result, 4);
        }
    }
    // ADDQ/SUBQ 直接寄存器优化
    addqReg(sz, reg, data, isSub) {
        const mask = (1 << (sz * 8)) - 1;
        const val = this.d[reg] & mask;
        const result = isSub ? (val - data) & mask : (val + data) & mask;
        this.d[reg] = (this.d[reg] & ~mask) | result;
        this.setNZ(result, sz);
    }
    // ============================================================
    // Scc
    // ============================================================
    execScc(opcode) {
        const cc = (opcode >> 8) & 0x0F;
        const eaMode = opcode & 0x3F;
        const cond = this.evalCondition(cc);
        this.writeEaByte(eaMode, cond ? 0xFF : 0x00);
    }
    // ============================================================
    // DBcc
    // ============================================================
    execDBcc(opcode) {
        const cc = (opcode >> 8) & 0x0F;
        const reg = opcode & 0x07;
        const disp = this.fetchWord();
        const cond = this.evalCondition(cc);
        if (!cond) {
            // Condition false: decrement and possibly branch
            let val = (this.d[reg] & 0xFFFF) - 1;
            if (val < 0)
                val = 0xFFFF;
            this.d[reg] = (this.d[reg] & ~0xFFFF) | val;
            if (val !== 0xFFFF) {
                this.pc = (this.pc + this.signExt16(disp)) & 0xFFFFFF;
            }
        }
        // else: condition true → exit loop
    }
    // ============================================================
    // 6xxx — Bcc / BSR / BRA
    // ============================================================
    execBcc(opcode) {
        const cc = (opcode >> 8) & 0x0F;
        let disp;
        if (cc === 0) {
            // BRA (always)
            disp = opcode & 0xFF;
            if (disp === 0)
                disp = this.fetchWord();
            else
                disp = this.signExt8(disp);
            this.pc = (this.pc + disp) & 0xFFFFFF;
            this.cycles = 10;
            return;
        }
        if (cc === 1) {
            // BSR
            disp = opcode & 0xFF;
            if (disp === 0)
                disp = this.fetchWord();
            else
                disp = this.signExt8(disp);
            this.push32(this.pc);
            this.pc = (this.pc + disp) & 0xFFFFFF;
            this.cycles = 18;
            return;
        }
        // Conditional branch
        disp = opcode & 0xFF;
        if (disp === 0)
            disp = this.fetchWord();
        else
            disp = this.signExt8(disp);
        if (this.evalCondition(cc)) {
            // Take branch
            this.pc = (this.pc + disp) & 0xFFFFFF;
            this.cycles = 10;
        }
        else {
            this.cycles = 8;
        }
    }
    // ============================================================
    // 7xxx — MOVEQ
    // ============================================================
    execMOVEQ(opcode) {
        const reg = (opcode >> 9) & 0x07;
        const data = this.signExt8(opcode & 0xFF);
        this.d[reg] = data;
        this.setNZ(data, 4);
        this.setFlag(exports.FLAG.V, false);
        this.setFlag(exports.FLAG.C, false);
    }
    // ============================================================
    // 8xxx — OR
    // ============================================================
    execOR(opcode) {
        this.dyadicOp(opcode, 'OR');
    }
    // ============================================================
    // 9xxx — SUB / SUBA
    // ============================================================
    execSUB(opcode) {
        this.dyadicOp(opcode, 'SUB');
    }
    execSUBA(opcode) {
        this.dyadicAOp(opcode, 'SUB');
    }
    // ============================================================
    // Bxxx — CMP / EOR
    // ============================================================
    execCMP_EOR(opcode) {
        // bit 8: 0=CMP, 1=EOR
        if ((opcode >> 8) & 0x1) {
            this.dyadicOp(opcode, 'EOR');
        }
        else {
            this.dyadicOp(opcode, 'CMP');
        }
    }
    execCMPA(opcode) {
        this.dyadicAOp(opcode, 'CMP');
    }
    // ============================================================
    // Cxxx — AND / EXG
    // ============================================================
    execAND_EXG(opcode) {
        const reg = (opcode >> 9) & 0x7;
        const mode = (opcode >> 3) & 0x7;
        if (mode === 1 && (opcode & 0x0100) === 0) {
            // AND
            this.dyadicOp(opcode, 'AND');
        }
        else if (mode === 5 && (opcode & 0x0100) === 0) {
            // EXG Dn, Dm
            const rx = opcode & 0x7;
            const tmp = this.d[rx];
            this.d[rx] = this.d[reg];
            this.d[reg] = tmp;
        }
        else if (mode === 5 && (opcode & 0x0100)) {
            // EXG An, Am  (or EXG Dn, Am)
            this.unimplemented('EXG', opcode);
        }
        else {
            this.unimplemented('Cxxx', opcode);
        }
    }
    // ============================================================
    // Dxxx — ADD / ADDA
    // ============================================================
    execADD(opcode) {
        this.dyadicOp(opcode, 'ADD');
    }
    execADDA(opcode) {
        this.dyadicAOp(opcode, 'ADD');
    }
    // ============================================================
    // 8xxx — DIVS (stub)
    // ============================================================
    execDIVS(opcode) {
        this.unimplemented('DIVS', opcode);
    }
    // ============================================================
    // 通用双操作数指令
    // ============================================================
    dyadicOp(opcode, op) {
        const dir = !!(opcode & 0x0100) ? 'mem2reg' : 'reg2mem';
        const size = (opcode >> 6) & 0x3; // 0=byte, 1=word, 2=long
        const eaMode = opcode & 0x3F;
        const reg = (opcode >> 9) & 0x7;
        if (dir === 'reg2mem') {
            // <ea> ← <ea> op Dn
            if (size === 0) {
                const val = this.readEaByte(eaMode);
                const r = this.dyadicEval(val, this.d[reg] & 0xFF, op, 1);
                if (op !== 'CMP') {
                    this.writeEaByte(eaMode, r);
                }
            }
            else if (size === 1) {
                const val = this.readEaWord(eaMode);
                const r = this.dyadicEval(val, this.d[reg] & 0xFFFF, op, 2);
                if (op !== 'CMP') {
                    this.writeEaWord(eaMode, r);
                }
            }
            else {
                const val = this.readEaLong(eaMode);
                const r = this.dyadicEval(val, this.d[reg], op, 4);
                if (op !== 'CMP') {
                    this.writeEaLong(eaMode, r);
                }
            }
        }
        else {
            // Dn ← Dn op <ea>
            if (size === 0) {
                const val = this.readEaByte(eaMode);
                const r = this.dyadicEval(this.d[reg] & 0xFF, val, op, 1);
                if (op !== 'CMP') {
                    this.d[reg] = (this.d[reg] & ~0xFF) | (r & 0xFF);
                }
            }
            else if (size === 1) {
                const val = this.readEaWord(eaMode);
                const r = this.dyadicEval(this.d[reg] & 0xFFFF, val, op, 2);
                if (op !== 'CMP') {
                    this.d[reg] = (this.d[reg] & ~0xFFFF) | (r & 0xFFFF);
                }
            }
            else {
                const val = this.readEaLong(eaMode);
                const r = this.dyadicEval(this.d[reg], val, op, 4);
                if (op !== 'CMP') {
                    this.d[reg] = r;
                }
            }
        }
    }
    dyadicAOp(opcode, op) {
        const eaMode = opcode & 0x3F;
        const reg = (opcode >> 9) & 0x7;
        const size = (opcode >> 8) & 0x1 ? 2 : 4; // 0=word, 1=long (reversed from data reg)
        let val;
        if (size === 2) {
            // Word source: sign-extend to 32 bits per 68K spec for address reg ops
            val = this.signExt16(this.readEaWord(eaMode));
        }
        else {
            val = this.readEaLong(eaMode);
        }
        const dst = this.a[reg];
        const r = op === 'ADD' ? dst + val : dst - val;
        if (op !== 'CMP') {
            this.a[reg] = r;
        }
    }
    dyadicEval(a, b, op, size) {
        const mask = (1 << (size * 8)) - 1;
        a &= mask;
        b &= mask;
        let result;
        switch (op) {
            case 'OR':
                result = a | b;
                break;
            case 'AND':
                result = a & b;
                break;
            case 'EOR':
                result = a ^ b;
                break;
            case 'ADD':
                result = a + b;
                break;
            case 'SUB':
                result = a - b;
                break;
            case 'CMP':
                result = a - b;
                break;
            default: result = a;
        }
        const rmask = result & mask;
        this.setNZ(rmask, size);
        if (op === 'SUB' || op === 'CMP') {
            this.setVCSub(a, b, rmask, size);
        }
        else if (op === 'ADD') {
            this.setVCAdd(a, b, rmask, size);
        }
        else {
            this.setVCLogic(rmask, size);
        }
        return rmask;
    }
    // ============================================================
    // Exxx — LSL/LSR/ASL/ASR/ROL/ROR/ROXL/ROXR
    // ============================================================
    execExxx(opcode) {
        this.unimplemented('Exxx', opcode);
    }
    // ============================================================
    // MOVEP (stub)
    // ============================================================
    execMOVEP(opcode) {
        this.unimplemented('MOVEP', opcode);
    }
    // ============================================================
    // 4xxx — 执行方法
    // ============================================================
    execJMP(opcode) {
        const ea = opcode & 0x3F;
        this.pc = this.eaAddrLong(ea);
    }
    execJSR(opcode) {
        const ea = opcode & 0x3F;
        const target = this.eaAddrLong(ea);
        this.push32(this.pc);
        this.pc = target;
    }
    execLEA(opcode) {
        const reg = (opcode >> 9) & 0x7;
        const ea = opcode & 0x3F;
        this.a[reg] = this.eaAddrLong(ea);
    }
    execRTS() {
        this.pc = this.pop32();
    }
    execRTE() {
        this._sr = this.pop16();
        this.pc = this.pop32();
    }
    execRTR() {
        this.ccr = this.pop16() & 0x1F;
        this.pc = this.pop32();
    }
    execTRAPV() {
        if (this.getFlag(exports.FLAG.V)) {
            this.unimplemented('TRAPV exception', 0);
        }
    }
    execNEGX(size, eaMode) {
        const sizeEnum = size === 0 ? 1 : size === 1 ? 2 : 4;
        const mask = (1 << (sizeEnum * 8)) - 1;
        const val = this.readEa(sizeEnum, eaMode);
        const x = this.getFlag(exports.FLAG.X) ? 1 : 0;
        const result = (0 - val - x) & mask;
        this.writeEa(sizeEnum, eaMode, result);
        this.setNZ(result, sizeEnum);
        if (result !== 0)
            this.setFlag(exports.FLAG.C, true);
        // V: only set if val was 0x80 (byte) or 0x8000 (word) or 0x80000000 (long)
        const msb = 1 << (sizeEnum * 8 - 1);
        this.setFlag(exports.FLAG.V, (val & mask) === msb);
        this.setFlag(exports.FLAG.X, this.getFlag(exports.FLAG.C));
    }
    execCLR(size, eaMode) {
        const sizeEnum = size === 0 ? 1 : size === 1 ? 2 : 4;
        this.writeEa(sizeEnum, eaMode, 0);
        this.setFlag(exports.FLAG.N, false);
        this.setFlag(exports.FLAG.Z, true);
        this.setFlag(exports.FLAG.V, false);
        this.setFlag(exports.FLAG.C, false);
    }
    execNEG(size, eaMode) {
        const sizeEnum = size === 0 ? 1 : size === 1 ? 2 : 4;
        const mask = (1 << (sizeEnum * 8)) - 1;
        const val = this.readEa(sizeEnum, eaMode);
        const result = (0 - val) & mask;
        this.writeEa(sizeEnum, eaMode, result);
        this.setNZ(result, sizeEnum);
        this.setFlag(exports.FLAG.C, val !== 0);
        const msb = 1 << (sizeEnum * 8 - 1);
        this.setFlag(exports.FLAG.V, (val & mask) === msb);
        this.setFlag(exports.FLAG.X, this.getFlag(exports.FLAG.C));
    }
    execNOT(size, eaMode) {
        const sizeEnum = size === 0 ? 1 : size === 1 ? 2 : 4;
        const mask = (1 << (sizeEnum * 8)) - 1;
        const val = this.readEa(sizeEnum, eaMode);
        const result = (~val) & mask;
        this.writeEa(sizeEnum, eaMode, result);
        this.setNZ(result, sizeEnum);
        this.setVCLogic(result, sizeEnum);
    }
    execEXT(opcode) {
        const mode = (opcode >> 6) & 0x7; // 2=.W→.L, 3=.B→.W
        const reg = opcode & 0x7;
        if (mode === 2) {
            // EXT.W Dn: sign-extend .W → .L
            const val = this.d[reg] & 0xFFFF;
            this.d[reg] = this.signExt16(val);
            this.setNZ(this.d[reg], 4);
        }
        else if (mode === 3) {
            // EXT.B Dn: sign-extend .B → .W
            const val = this.d[reg] & 0xFF;
            this.d[reg] = (this.d[reg] & ~0xFFFF) | (this.signExt8(val) & 0xFFFF);
            this.setNZ(this.d[reg] & 0xFFFF, 2);
        }
        this.setVCLogic(0, 2);
    }
    execTST(size, eaMode) {
        const sizeEnum = size === 0 ? 1 : size === 1 ? 2 : 4;
        // [DEBUG] 从指令流窥探有效地址（不消费 PC，因为 readEa 后续会消费）
        const mode = this.eaMode(eaMode);
        const reg = this.eaReg(eaMode);
        let dbgAddr = null;
        if (mode === 7) {
            if (reg === 0)
                dbgAddr = this.read16(this.pc); // (xxx).W
            else if (reg === 1)
                dbgAddr = this.read32(this.pc); // (xxx).L
            else if (reg === 2)
                dbgAddr = (this.pc + this.signExt16(this.read16(this.pc))) & 0xFFFFFF; // (d16,PC)
            else if (reg === 4)
                dbgAddr = this.read32(this.pc); // #imm
        }
        const val = this.readEa(sizeEnum, eaMode);
        if (dbgAddr !== null) {
            console.warn(`[Cpu] TST.${sizeEnum === 1 ? 'B' : sizeEnum === 2 ? 'W' : 'L'} @ $${(dbgAddr & 0xFFFFFF).toString(16)} = $${val.toString(16)} → Z=${val === 0 ? 1 : 0}`);
        }
        this.setNZ(val, sizeEnum);
        this.setVCLogic(val, sizeEnum);
    }
    execSWAP(opcode) {
        const reg = opcode & 0x7;
        const lo = this.d[reg] & 0xFFFF;
        const hi = (this.d[reg] >> 16) & 0xFFFF;
        this.d[reg] = (lo << 16) | hi;
        this.setNZ(this.d[reg], 4);
        this.setVCLogic(0, 4);
    }
    // ============================================================
    // MOVEM  — 寄存器批量加载/存储
    // ============================================================
    execMOVEM(opcode) {
        const dr = (opcode >> 11) & 0x1; // 0=reg→mem, 1=mem→reg
        const sz = (opcode >> 6) & 0x1; // 0=word, 1=long
        const ea = opcode & 0x3F;
        const mask = this.fetchWord(); // 16-bit register list mask
        const size = sz ? 4 : 2;
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        if (dr === 0) {
            // 寄存器 → 内存 (预减量模式)
            if (mode === 4) {
                // -(An): 从最高编号位开始传输
                for (let i = 15; i >= 0; i--) {
                    if (mask & (1 << i)) {
                        this.a[reg] = ((this.a[reg] - size) >>> 0) & 0xFFFFFFFF;
                        if (i < 8) {
                            this.writeSized(this.a[reg], this.d[i], size);
                        }
                        else {
                            this.writeSized(this.a[reg], this.a[i - 8], size);
                        }
                    }
                }
            }
            else if (mode === 7 && reg <= 1) {
                // 绝对地址
                let addr = reg === 0 ? this.fetchWord() : this.fetchLong();
                addr = addr & 0xFFFFFF;
                for (let i = 15; i >= 0; i--) {
                    if (mask & (1 << i)) {
                        addr = ((addr - size) >>> 0) & 0xFFFFFF;
                        if (i < 8) {
                            this.writeSized(addr, this.d[i], size);
                        }
                        else {
                            this.writeSized(addr, this.a[i - 8], size);
                        }
                    }
                }
            }
            else {
                this.unimplemented('MOVEM reg→mem', opcode);
                return;
            }
        }
        else {
            // 内存 → 寄存器 (后增量模式)
            if (mode === 3) {
                // (An)+
                let addr = this.a[reg];
                for (let i = 0; i < 16; i++) {
                    if (mask & (1 << i)) {
                        const val = this.readSized(addr, size);
                        if (i < 8) {
                            if (sz) {
                                this.d[i] = val;
                            }
                            else {
                                this.d[i] = (this.d[i] & ~0xFFFF) | (val & 0xFFFF);
                            }
                        }
                        else {
                            this.a[i - 8] = sz ? val : this.signExt16(val & 0xFFFF);
                        }
                        addr += size;
                    }
                }
                this.a[reg] = addr;
            }
            else if (mode === 7 && reg <= 1) {
                // 绝对地址
                let addr = reg === 0 ? this.fetchWord() : this.fetchLong();
                addr = addr & 0xFFFFFF;
                for (let i = 0; i < 16; i++) {
                    if (mask & (1 << i)) {
                        const val = this.readSized(addr, size);
                        if (i < 8) {
                            if (sz) {
                                this.d[i] = val;
                            }
                            else {
                                this.d[i] = (this.d[i] & ~0xFFFF) | (val & 0xFFFF);
                            }
                        }
                        else {
                            this.a[i - 8] = sz ? val : this.signExt16(val & 0xFFFF);
                        }
                        addr += size;
                    }
                }
            }
            else {
                this.unimplemented('MOVEM mem→reg', opcode);
                return;
            }
        }
    }
    // ============================================================
    // LINK / UNLK  — 栈帧操作
    // ============================================================
    execLINK(opcode) {
        const reg = opcode & 0x7;
        const disp = this.signExt16(this.fetchWord());
        this.push32(this.a[reg]);
        this.a[reg] = this.a[7];
        this.a[7] = (this.a[7] + disp) >>> 0;
    }
    execUNLK(opcode) {
        const reg = opcode & 0x7;
        this.a[7] = this.a[reg];
        this.a[reg] = this.pop32();
    }
    // ============================================================
    // TRAP  — 软中断
    // ============================================================
    execTRAP(opcode) {
        const vector = opcode & 0xF;
        // 暂不实现完整的异常处理，从向量表取地址跳转
        const vecAddr = (0x80 + vector * 4) & 0xFFFFFF;
        this.push16(this._sr);
        this.push32(this.pc);
        this.pc = this.read32(vecAddr);
        this._sr |= SR_S;
    }
    // ============================================================
    // MOVE USP  — 用户栈指针操作 (特权指令)
    // ============================================================
    execMOVE_USP(opcode) {
        const reg = opcode & 0x7;
        if (opcode & 0x8) {
            // MOVE USP,An — 写 USP → An
            this.a[reg] = this.usp;
        }
        else {
            // MOVE An,USP — 读 An → USP
            this.usp = this.a[reg];
        }
    }
    // ============================================================
    // 按尺寸读/写内存辅助 (用于 MOVEM)
    // ============================================================
    readSized(addr, size) {
        return size === 4 ? this.read32(addr) : this.read16(addr);
    }
    writeSized(addr, value, size) {
        if (size === 4) {
            this.write32(addr, value);
        }
        else {
            this.write16(addr, value & 0xFFFF);
        }
    }
    /** szFrom4x: 从 4xxx 指令解码操作数尺寸 */
    szFrom4x(opcode) {
        return (opcode >> 6) & 0x3; // 0=byte, 1=word, 2=long
    }
    // ============================================================
    // CPU 异常处理 — 通用异常入口
    //   按 68K 规范: 保存 SR + PC 到 SSP, 从向量表取新 PC
    // ============================================================
    exception(vectorNum) {
        const vecAddr = (vectorNum * 4) & 0xFFFFFF;
        // 保存原始 PC（指向触发异常的指令）
        const faultPC = (this.pc - 2) & 0xFFFFFF;
        const spBefore = this.a[7];
        this._sr |= SR_S; // 进入 Supervisor 模式
        this.push16(this._sr);
        this.push32(faultPC);
        // [DEBUG] 读取异常向量表的原始字节
        const b0 = this.read8(vecAddr);
        const b1 = this.read8(vecAddr + 1);
        const b2 = this.read8(vecAddr + 2);
        const b3 = this.read8(vecAddr + 3);
        const handler = this.read32(vecAddr);
        console.warn(`[Cpu] 异常 #$${vectorNum.toString(16)} @ PC=$${faultPC.toString(16)} ` +
            `→ handler=$${handler.toString(16)} ` +
            `(raw bytes: ${b0.toString(16)} ${b1.toString(16)} ${b2.toString(16)} ${b3.toString(16)}) ` +
            `SP: $${spBefore.toString(16)}→$${this.a[7].toString(16)}`);
        if (handler === 0 || handler === 0xFFFFFFFF) {
            console.error(`[Cpu] 异常向量 $${vectorNum.toString(16).padStart(2, '0')} ` +
                `未初始化 @ PC=$${faultPC.toString(16)}`);
            this.halted = true;
            return;
        }
        console.warn(`[Cpu] 设置 PC: $${this.pc.toString(16)} → $${handler.toString(16)}`);
        this.pc = handler;
        console.warn(`[Cpu] 设置后 PC=$${this.pc.toString(16)}`);
    }
    // ============================================================
    // 异常/未实现处理
    // ============================================================
    exceptionLineA() {
        this.exception(0x0A); // Line 1010 Emulator
    }
    exceptionLineF() {
        this.exception(0x0B); // Line 1111 Emulator
    }
    exceptionIllegal() {
        this.exception(0x04); // Illegal Instruction
    }
    unimplemented(name, opcode) {
        console.warn(`[Cpu] 未实现指令 ${name} op=$0${opcode.toString(16)} @ PC=$0${(this.pc - 2).toString(16)}`);
    }
    // ============================================================
    // EA 辅助: 解码 mode/reg
    // ============================================================
    eaMode(ea) { return (ea >> 3) & 0x7; }
    eaReg(ea) { return ea & 0x7; }
    // ============================================================
    // EA 大小分发 (readEa / writeEa)
    // ============================================================
    readEa(size, ea) {
        if (size === 1)
            return this.readEaByte(ea);
        if (size === 2)
            return this.readEaWord(ea);
        return this.readEaLong(ea);
    }
    writeEa(size, ea, value) {
        if (size === 1)
            this.writeEaByte(ea, value);
        else if (size === 2)
            this.writeEaWord(ea, value);
        else
            this.writeEaLong(ea, value);
    }
    // ============================================================
    // EA 字节读写 (readEaByte / writeEaByte)
    // ============================================================
    readEaByte(ea) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        switch (mode) {
            case 0: return this.d[reg] & 0xFF;
            case 1: return this.a[reg] & 0xFF;
            case 2: return this.read8(this.a[reg]);
            case 3: {
                const v = this.read8(this.a[reg]);
                this.a[reg] = (reg === 7 ? this.a[reg] + 2 : this.a[reg] + 1) >>> 0;
                return v;
            }
            case 4: {
                this.a[reg] = (reg === 7 ? this.a[reg] - 2 : this.a[reg] - 1) >>> 0;
                return this.read8(this.a[reg]);
            }
            case 5: {
                const disp = this.fetchWord();
                return this.read8((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF);
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                return this.read8((this.a[reg] + xn + disp) & 0xFFFFFFFF);
            }
            case 7:
                switch (reg) {
                    case 0: {
                        const addr = this.fetchWord();
                        return this.read8(addr);
                    }
                    case 1: {
                        const addr = this.fetchLong();
                        return this.read8(addr);
                    }
                    case 4: {
                        const imm = this.fetchWord() & 0xFF;
                        return imm;
                    }
                    default: return 0;
                }
            default: return 0;
        }
    }
    writeEaByte(ea, value) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        const v = value & 0xFF;
        switch (mode) {
            case 0:
                this.d[reg] = (this.d[reg] & ~0xFF) | v;
                break;
            case 2:
                this.write8(this.a[reg], v);
                break;
            case 3:
                this.write8(this.a[reg], v);
                this.a[reg] = (reg === 7 ? this.a[reg] + 2 : this.a[reg] + 1) >>> 0;
                break;
            case 4:
                this.a[reg] = (reg === 7 ? this.a[reg] - 2 : this.a[reg] - 1) >>> 0;
                this.write8(this.a[reg], v);
                break;
            case 5: {
                const disp = this.fetchWord();
                this.write8((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF, v);
                break;
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                this.write8((this.a[reg] + xn + disp) & 0xFFFFFFFF, v);
                break;
            }
            case 7:
                if (reg === 0) {
                    const addr = this.fetchWord();
                    this.write8(addr, v);
                }
                else if (reg === 1) {
                    const addr = this.fetchLong();
                    this.write8(addr, v);
                }
                break;
        }
    }
    // ============================================================
    // EA 字读写 (readEaWord / writeEaWord)
    // ============================================================
    readEaWord(ea) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        switch (mode) {
            case 0: return this.d[reg] & 0xFFFF;
            case 1: return this.a[reg] & 0xFFFF;
            case 2: return this.read16(this.a[reg]);
            case 3: {
                const v = this.read16(this.a[reg]);
                this.a[reg] += 2;
                return v;
            }
            case 4: {
                this.a[reg] -= 2;
                return this.read16(this.a[reg]);
            }
            case 5: {
                const disp = this.fetchWord();
                return this.read16((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF);
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                return this.read16((this.a[reg] + xn + disp) & 0xFFFFFFFF);
            }
            case 7:
                switch (reg) {
                    case 0: {
                        const addr = this.fetchWord();
                        return this.read16(addr);
                    }
                    case 1: {
                        const addr = this.fetchLong();
                        return this.read16(addr);
                    }
                    case 2: {
                        const disp = this.fetchWord();
                        return this.read16((this.pc + this.signExt16(disp)) & 0xFFFFFF);
                    }
                    case 3: {
                        const ext = this.fetchWord();
                        const idxReg = (ext >> 12) & 0xF;
                        const idxSize = (ext & 0x800) ? 4 : 2;
                        const disp = this.signExt8(ext & 0xFF);
                        const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                        return this.read16((this.pc + xn + disp) & 0xFFFFFF);
                    }
                    case 4: return this.fetchWord();
                    default: return 0;
                }
            default: return 0;
        }
    }
    writeEaWord(ea, value) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        const v = value & 0xFFFF;
        switch (mode) {
            case 0:
                this.d[reg] = (this.d[reg] & ~0xFFFF) | v;
                break;
            case 1:
                this.a[reg] = (this.a[reg] & ~0xFFFF) | v;
                break;
            case 2:
                this.write16(this.a[reg], v);
                break;
            case 3:
                this.write16(this.a[reg], v);
                this.a[reg] += 2;
                break;
            case 4:
                this.a[reg] -= 2;
                this.write16(this.a[reg], v);
                break;
            case 5: {
                const disp = this.fetchWord();
                this.write16((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF, v);
                break;
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                this.write16((this.a[reg] + xn + disp) & 0xFFFFFFFF, v);
                break;
            }
            case 7:
                if (reg === 0) {
                    const addr = this.fetchWord();
                    this.write16(addr, v);
                }
                else if (reg === 1) {
                    const addr = this.fetchLong();
                    this.write16(addr, v);
                }
                break;
        }
    }
    // ============================================================
    // EA 长字读写 (readEaLong / writeEaLong)
    // ============================================================
    readEaLong(ea) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        switch (mode) {
            case 0: return this.d[reg];
            case 1: return this.a[reg];
            case 2: return this.read32(this.a[reg]);
            case 3: {
                const v = this.read32(this.a[reg]);
                this.a[reg] += 4;
                return v;
            }
            case 4: {
                this.a[reg] -= 4;
                return this.read32(this.a[reg]);
            }
            case 5: {
                const disp = this.fetchWord();
                return this.read32((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF);
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                return this.read32((this.a[reg] + xn + disp) & 0xFFFFFFFF);
            }
            case 7:
                switch (reg) {
                    case 0: {
                        const addr = this.fetchWord();
                        return this.read32(addr);
                    }
                    case 1: {
                        const addr = this.fetchLong();
                        return this.read32(addr);
                    }
                    case 2: {
                        const disp = this.fetchWord();
                        return this.read32((this.pc + this.signExt16(disp)) & 0xFFFFFF);
                    }
                    case 3: {
                        const ext = this.fetchWord();
                        const idxReg = (ext >> 12) & 0xF;
                        const idxSize = (ext & 0x800) ? 4 : 2;
                        const disp = this.signExt8(ext & 0xFF);
                        const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                        return this.read32((this.pc + xn + disp) & 0xFFFFFF);
                    }
                    case 4: return this.fetchLong();
                    default: return 0;
                }
            default: return 0;
        }
    }
    writeEaLong(ea, value) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        const v = value >>> 0;
        switch (mode) {
            case 0:
                this.d[reg] = v;
                break;
            case 1:
                this.a[reg] = v;
                break;
            case 2:
                this.write32(this.a[reg], v);
                break;
            case 3:
                this.write32(this.a[reg], v);
                this.a[reg] += 4;
                break;
            case 4:
                this.a[reg] -= 4;
                this.write32(this.a[reg], v);
                break;
            case 5: {
                const disp = this.fetchWord();
                this.write32((this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF, v);
                break;
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                this.write32((this.a[reg] + xn + disp) & 0xFFFFFFFF, v);
                break;
            }
            case 7:
                if (reg === 0) {
                    const addr = this.fetchWord();
                    this.write32(addr, v);
                }
                else if (reg === 1) {
                    const addr = this.fetchLong();
                    this.write32(addr, v);
                }
                break;
        }
    }
    // ============================================================
    // EA 地址计算 (仅计算地址，不读写)
    // ============================================================
    eaAddrLong(ea) {
        const mode = this.eaMode(ea);
        const reg = this.eaReg(ea);
        switch (mode) {
            case 2: return this.a[reg];
            case 5: {
                const disp = this.fetchWord();
                return (this.a[reg] + this.signExt16(disp)) & 0xFFFFFFFF;
            }
            case 6: {
                const ext = this.fetchWord();
                const idxReg = (ext >> 12) & 0xF;
                const idxSize = (ext & 0x800) ? 4 : 2;
                const disp = this.signExt8(ext & 0xFF);
                const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                return (this.a[reg] + xn + disp) & 0xFFFFFFFF;
            }
            case 7:
                switch (reg) {
                    case 0: return this.fetchWord();
                    case 1: return this.fetchLong();
                    case 2: {
                        const disp = this.fetchWord();
                        return (this.pc + this.signExt16(disp)) & 0xFFFFFF;
                    }
                    case 3: {
                        const ext = this.fetchWord();
                        const idxReg = (ext >> 12) & 0xF;
                        const idxSize = (ext & 0x800) ? 4 : 2;
                        const disp = this.signExt8(ext & 0xFF);
                        const xn = idxSize === 4 ? this.d[idxReg] : (ext & 0x8000 ? this.a[idxReg] : this.d[idxReg]);
                        return (this.pc + xn + disp) & 0xFFFFFF;
                    }
                    default: return 0;
                }
            default: return 0;
        }
    }
    // ============================================================
    // MOVE 源操作数读取
    // ============================================================
    readSrcByte(mode, reg) {
        return this.readEaByte((mode << 3) | reg);
    }
    readSrcWord(mode, reg) {
        return this.readEaWord((mode << 3) | reg);
    }
    readSrcLong(mode, reg) {
        return this.readEaLong((mode << 3) | reg);
    }
    // ============================================================
    // MOVE 目标操作数写入
    // ============================================================
    writeDstByte(mode, reg, value) {
        this.writeEaByte((mode << 3) | reg, value);
    }
    writeDstWord(mode, reg, value) {
        this.writeEaWord((mode << 3) | reg, value);
    }
    writeDstLong(mode, reg, value) {
        this.writeEaLong((mode << 3) | reg, value);
    }
}
exports.Cpu = Cpu;
