"use strict";
/**
 * Tracer — 可选的 CPU 指令级 trace 日志 (类似 Mesen trace)
 *
 * 功能: 按需记录每条 CPU 指令的执行信息, 输出到文件或回调。
 * 格式参考 Mesen: `i{count}  ${bank}:{pc}: {bytes} {mnemonic} {operand} A:{a} X:{x} Y:{y} S:{s} P:{flags}`
 *
 * 用法:
 *   const nes = new NES({ ... });
 *   const tracer = nes.enableTrace({ outputFile: 'trace.log', maxLines: 10000 });
 *   nes.frame();  // 执行的指令会被记录
 *   tracer.stop();
 *
 * 可选过滤:
 *   - addressRange: 只记录 [start, end) 范围内的 PC
 *   - bankFilter: 只记录指定 bank (16KB bank 编号)
 *   - maxLines: 最多记录多少行
 *   - callback: 每行回调 (不写文件)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracer = void 0;
const fs = __importStar(require("fs"));
/** 指令名表 (INS_ 常量 → 助记符) */
const INS_NAMES = [
    'ADC', 'AND', 'ASL', 'BCC', 'BCS', 'BEQ', 'BIT', 'BMI', 'BNE', 'BPL',
    'BRK', 'BVC', 'BVS', 'CLC', 'CLD', 'CLI', 'CLV', 'CMP', 'CPX', 'CPY',
    'DEC', 'DEX', 'DEY', 'EOR', 'INC', 'INX', 'INY', 'JMP', 'JSR', 'LDA',
    'LDX', 'LDY', 'LSR', 'NOP', 'ORA', 'PHA', 'PHP', 'PLA', 'PLP', 'ROL',
    'ROR', 'RTI', 'RTS', 'SBC', 'SEC', 'SED', 'SEI', 'STA', 'STX', 'STY',
    'TAX', 'TAY', 'TSX', 'TXA', 'TXS', 'TYA', 'ALR', 'ANC', 'ARR', 'AXS',
    'LAX', 'SAX', 'DCP', 'ISC', 'RLA', 'RRA', 'SLO', 'SRE', 'SKB', 'IGN',
    '??', 'SHA', 'SHS', 'SHY', 'SHX', 'LAE', 'ANE', 'LXA',
];
/** 地址模式名 (用于操作数格式化, 当前为简化版本) */
const MODE_NAMES = [
    '$', // 0: ZP
    '', // 1: REL
    '', // 2: IMP
    '$', // 3: ABS
    'A', // 4: ACC
    '#$', // 5: IMM
    '$,X', // 6: ZPX
    '$,Y', // 7: ZPY
    '$,X', // 8: ABSX
    '$,Y', // 9: ABSY
    '($,X)', // 10: PREIDXIND
    '($),Y', // 11: POSTIDXIND
    '($)', // 12: INDABS
];
/**
 * 格式化标志位字符串 (Mesen 格式: NvUbdizc)
 */
function formatFlags(status) {
    const n = (status >> 7) & 1 ? 'N' : 'n';
    const v = (status >> 6) & 1 ? 'V' : 'v';
    const u = (status >> 5) & 1 ? 'U' : 'u';
    const b = (status >> 4) & 1 ? 'B' : 'b';
    const d = (status >> 3) & 1 ? 'D' : 'd';
    const i = (status >> 2) & 1 ? 'I' : 'i';
    const z = (status >> 1) & 1 ? 'Z' : 'z';
    const c = status & 1 ? 'C' : 'c';
    return n + v + u + b + d + i + z + c;
}
/**
 * 计算 Mesen 16KB bank 编号 (从 CPU 地址)
 * MMC3: $8000-$9FFF = R6, $A000-$BFFF = R7, $C000-$DFFF = 固定 bank30, $E000-$FFFF = 固定 bank31
 * Mesen 16KB bank = 8KB block / 2
 */
function getMesenBank(cpu, nes, addr) {
    var _a, _b, _c, _d;
    if (addr < 0x8000)
        return 0; // RAM/IO 区, 不适用
    const mmap = nes.mmap;
    if (!mmap || !mmap.prgBankMap)
        return 0;
    // prgBankMap 格式: { '8000': R6值, 'A000': R7值, 'C000': 30, 'E000': 31 }
    let block8k;
    if (addr < 0xa000) {
        block8k = (_a = mmap.prgBankMap['8000']) !== null && _a !== void 0 ? _a : 0;
    }
    else if (addr < 0xc000) {
        block8k = (_b = mmap.prgBankMap['A000']) !== null && _b !== void 0 ? _b : 0;
    }
    else if (addr < 0xe000) {
        block8k = (_c = mmap.prgBankMap['C000']) !== null && _c !== void 0 ? _c : 30;
    }
    else {
        block8k = (_d = mmap.prgBankMap['E000']) !== null && _d !== void 0 ? _d : 31;
    }
    return Math.floor(block8k / 2);
}
/**
 * 格式化单条指令的 trace 行
 */
function formatInstruction(ctx, instrPC, opcode, opinfo, opbytes) {
    var _a;
    const cpu = ctx.cpu;
    const nes = ctx.nes;
    const a = cpu.REG_ACC & 0xff;
    const x = cpu.REG_X & 0xff;
    const y = cpu.REG_Y & 0xff;
    const s = cpu.REG_SP & 0xff;
    const status = cpu.getStatus();
    const mesenBank = getMesenBank(cpu, nes, instrPC);
    // 指令字节
    const bytesStr = opbytes
        .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
        .join(' ');
    // 助记符
    const insName = (_a = INS_NAMES[opinfo.ins]) !== null && _a !== void 0 ? _a : '???';
    // 操作数 (简化: 直接显示字节)
    let operandStr = '';
    if (opinfo.size > 1) {
        const operandBytes = opbytes.slice(1);
        if (operandBytes.length === 1) {
            operandStr = '#$' + operandBytes[0].toString(16).toUpperCase().padStart(2, '0');
        }
        else if (operandBytes.length === 2) {
            const val = operandBytes[0] | (operandBytes[1] << 8);
            operandStr = '$' + val.toString(16).toUpperCase().padStart(4, '0');
        }
    }
    return (`i${ctx.count}  ` +
        `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
        instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ' +
        bytesStr.padEnd(8, ' ') + ' ' +
        insName + ' ' + operandStr +
        ' A:' + a.toString(16).toUpperCase().padStart(2, '0') +
        ' X:' + x.toString(16).toUpperCase().padStart(2, '0') +
        ' Y:' + y.toString(16).toUpperCase().padStart(2, '0') +
        ' S:' + s.toString(16).toUpperCase().padStart(2, '0') +
        ' P:' + formatFlags(status));
}
class Tracer {
    constructor() {
        this.ctx = null;
    }
    /** 启动 trace */
    start(nes, opts = {}) {
        const cpu = nes.cpu;
        let stream = null;
        if (opts.outputFile) {
            stream = fs.createWriteStream(opts.outputFile, { flags: 'w' });
        }
        this.ctx = {
            cpu,
            nes,
            count: 0,
            lines: 0,
            stream,
            opts: Object.assign({ detailOperand: true }, opts),
            stopped: false,
        };
    }
    /** 停止 trace, 关闭文件流 */
    stop() {
        if (this.ctx) {
            if (this.ctx.stream) {
                this.ctx.stream.end();
            }
            this.ctx.stopped = true;
            this.ctx = null;
        }
    }
    /** 是否正在 trace */
    get active() {
        return this.ctx !== null && !this.ctx.stopped;
    }
    /**
     * 记录一条指令 (由 CPU.emulate() 调用)
     * @param instrPC 指令 PC
     * @param opcode 操作码
     * @param opinfo OpInfo (ins/mode/size/cycles)
     * @param opbytes 指令字节 [opcode, operand1, operand2?]
     */
    trace(instrPC, opcode, opinfo, opbytes) {
        const ctx = this.ctx;
        if (!ctx || ctx.stopped)
            return;
        // 地址范围过滤
        if (ctx.opts.addressRange) {
            const [start, end] = ctx.opts.addressRange;
            if (instrPC < start || instrPC >= end)
                return;
        }
        // bank 过滤
        if (ctx.opts.bankFilter !== undefined) {
            const bank = getMesenBank(ctx.cpu, ctx.nes, instrPC);
            if (bank !== ctx.opts.bankFilter)
                return;
        }
        // 最大行数限制
        if (ctx.opts.maxLines !== undefined && ctx.lines >= ctx.opts.maxLines) {
            this.stop();
            return;
        }
        ctx.count++;
        ctx.lines++;
        const line = formatInstruction(ctx, instrPC, opcode, opinfo, opbytes);
        if (ctx.stream) {
            ctx.stream.write(line + '\n');
        }
        else if (ctx.opts.callback) {
            ctx.opts.callback(line);
        }
    }
}
exports.Tracer = Tracer;
