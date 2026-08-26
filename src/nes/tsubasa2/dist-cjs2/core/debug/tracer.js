"use strict";
// @ts-nocheck  // tsnes 移植核心，非翻译层，跳过类型检查
/**
 * Tracer — 可选的 CPU 指令级 trace + 硬件寄存器写入跟踪
 *
 * 功能:
 *   1. CPU 指令级 trace (类似 Mesen trace)
 *   2. 硬件寄存器写入跟踪 (按类别可选):
 *      - OAM: $2003/$2004/$4014 (精灵内存)
 *      - NT/属性表: $2006/$2007 写入 $2000-$2FFF (含镜像)
 *      - 调色板: $2006/$2007 写入 $3F00-$3FFF
 *      - PT (pattern table): $2006/$2007 写入 $0000-$1FFF (VRAM)
 *      - 音频: $4000-$4017 (APU 寄存器)
 *      - PPU 控制寄存器: $2000-$2002 (PPUCTRL/PPUMASK/PPUSTATUS)
 *
 * 格式参考 Mesen: `i{count}  ${bank}:{pc}: {bytes} {mnemonic} {operand} A:{a} X:{x} Y:{y} S:{s} P:{flags}`
 *
 * 用法:
 *   const nes = new NES({ ... });
 *   // 只跟踪 CPU 指令
 *   nes.enableTrace({ outputFile: 'trace.log', maxLines: 10000 });
 *   // 只跟踪 OAM 写入
 *   nes.enableTrace({ outputFile: 'oam.log', trackOAM: true, trackCPU: false });
 *   // 跟踪 NT + 调色板
 *   nes.enableTrace({ outputFile: 'nt_pal.log', trackNT: true, trackPalette: true, trackCPU: false });
 *   nes.frame();
 *   nes.disableTrace();
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
exports.Tracer = exports.FCEUX_DEFAULT_OPTIONS = exports.LOG_RTS_DECORATION = exports.LOG_MEM_DETAIL = exports.LOG_BANK_NUMBER = exports.LOG_INSTRUCTIONS_COUNT = exports.LOG_CYCLES_COUNT = exports.LOG_CODE_TABBING = exports.LOG_BREAKPOINTS = exports.LOG_MESSAGES = exports.LOG_FRAMES_COUNT = exports.LOG_TO_THE_LEFT = exports.LOG_NEW_DATA = exports.LOG_NEW_INSTRUCTIONS = exports.LOG_PROCESSOR_STATUS = exports.LOG_REGISTERS = void 0;
const fs = __importStar(require("fs"));
const disasm_1 = require("./disasm");
// ═══ FCEUX trace log 移植 (src/drivers/win/tracer.h LOG_* 位标志) ═══
// 输出行布局 (LOG_TO_THE_LEFT 时):
//   f{frame} c{cycles} i{instr} A:.. X:.. Y:.. S:.. P:.. [栈缩进] $bank:pc: bytes disasm {@ EA} {= 值}
// 参考格式见 docs/roms/opening-all/opening-all.log
exports.LOG_REGISTERS = 1; // A:X:Y:S 寄存器
exports.LOG_PROCESSOR_STATUS = 2; // P: 标志位 (NvubdizC)
exports.LOG_NEW_INSTRUCTIONS = 4; // CDL: 只记录首次执行到的代码 (跳过重复 → "(N lines skipped)")
exports.LOG_NEW_DATA = 8; // CDL: 只记录首次访问的数据地址
exports.LOG_TO_THE_LEFT = 16; // 寄存器列放在地址前 (FCEUX 默认)
exports.LOG_FRAMES_COUNT = 32; // f{frame} 列
exports.LOG_MESSAGES = 64; // 消息日志 (保留, 未用)
exports.LOG_BREAKPOINTS = 128; // 断点日志 (保留, 未用)
exports.LOG_CODE_TABBING = 512; // 按栈深 (0xFF-S)&31 加空格缩进 → 调用嵌套可视化
exports.LOG_CYCLES_COUNT = 1024; // c{cycles} 列
exports.LOG_INSTRUCTIONS_COUNT = 2048; // i{instr} 列
exports.LOG_BANK_NUMBER = 4096; // $bank:pc: 前缀 (PRG 显示 bank, RAM 显示 2 空格)
// ── tsnes 扩展 (FCEUX 通过 asm.cpp Disassemble 内建) ──
exports.LOG_MEM_DETAIL = 8192; // @ $EA 和 = #$val (执行前内存值), 仿 FCEUX asm.cpp
exports.LOG_RTS_DECORATION = 16384; // RTS 时显示 "(from $XXXX)" + 子程序结束分隔线
/** FCEUX 默认 log options (与 FCEUX 窗口默认一致: 寄存器|标志|左对齐|栈缩进) */
exports.FCEUX_DEFAULT_OPTIONS = exports.LOG_REGISTERS | exports.LOG_PROCESSOR_STATUS | exports.LOG_TO_THE_LEFT | exports.LOG_CODE_TABBING;
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
    if (addr < 0x8000)
        return 0;
    const mmap = nes.mmap;
    if (!mmap || !mmap.prgBankMap)
        return 0;
    let block8k;
    if (addr < 0xa000) {
        block8k = mmap.prgBankMap['8000'] ?? 0;
    }
    else if (addr < 0xc000) {
        block8k = mmap.prgBankMap['A000'] ?? 0;
    }
    else if (addr < 0xe000) {
        block8k = mmap.prgBankMap['C000'] ?? 30;
    }
    else {
        block8k = mmap.prgBankMap['E000'] ?? 31;
    }
    return Math.floor(block8k / 2);
}
/**
 * 纯内存读 (无总线副作用, 供 trace 计算 EA/值/CDL):
 * - RAM ($0000-$1FFF): cpu.mem
 * - PPU/APU 寄存器区 ($2000-$4017): 纯读路径 (见 readRegisterPeek), 绝对不走 mmap.load
 * - PRG/其他 (>= $4020): mmap.load 只读路径 (mapper 寄存器读无状态副作用)
 * FCEUX 对应 GetMem(), 但 trace 只读不改模拟器状态。
 */
function readMemRaw(cpu, addr) {
    const a = addr & 0xffff;
    if (a < 0x2000)
        return cpu.mem[a & 0x7ff];
    if (a < 0x4020)
        return readRegisterPeek(cpu, a);
    if (cpu.nes && cpu.nes.mmap)
        return cpu.nes.mmap.load(a) & 0xff;
    return cpu.mem[a & 0xffff];
}
/**
 * PPU/APU 寄存器区 ($2000-$4017) 的纯读 (peek)。
 *
 * 为什么不能走 mmap.load (regLoad):
 *   - $2002 读 → readStatusRegister() → 清 VBlank 标志 + NMI 输出边沿更新 (改模拟状态!)
 *   - $2004 读 → sramLoad() (渲染中相位相关)
 *   - $2006/$2007 读 → vramLoad() → _incrementVramAddress() (VRAM 地址自增!)
 *   - $4016/$4017 读 → joypad 移位 (消费串行位!)
 * 这些读副作用会让"只是打 trace"改变整个模拟状态, 导致 vblank 轮询等行为分叉。
 *
 * 纯读策略 (与 FCEUX trace 用 GetMem peek 一致):
 *   - $2002: 直接取 cpu.mem[0x2002] 原始状态位 (PPU setStatusFlag 维护), 不清任何标志
 *   - 其余寄存器: 返回 open bus latch 值 (trace 里 `LDA $XXXX` 的 = 值注解, 精确值不重要,
 *     关键是模拟状态不被污染; $2000/$2001/$2003/$2005/$2006/$4014 本就是写寄存器,
 *     读返回 open bus 是硬件正确行为)
 */
function readRegisterPeek(cpu, a) {
    if (a === 0x2002)
        return cpu.mem[0x2002];
    const ppu = cpu.nes && cpu.nes.ppu;
    if (ppu && typeof ppu.openBusLatch === 'number')
        return ppu.openBusLatch;
    return 0;
}
/**
 * 计算指令有效地址 (EA), 参照 FCEUX x6502.h optype 宏 + asm.cpp Disassemble。
 * 只读计算, 无模拟器副作用。无 EA 的寻址模式 (IMP/ACC/IMM/REL) 返回 null。
 */
function resolveEA(cpu, mode, opbytes) {
    const b1 = opbytes[1] ?? 0;
    const b2 = opbytes[2] ?? 0;
    const x = cpu.REG_X & 0xff;
    const y = cpu.REG_Y & 0xff;
    switch (mode) {
        case 0: return b1; // ZP
        case 3: return (b1 | (b2 << 8)) & 0xffff; // ABS
        case 6: return (b1 + x) & 0xff; // ZP,X
        case 7: return (b1 + y) & 0xff; // ZP,Y
        case 8: return ((b1 | (b2 << 8)) + x) & 0xffff; // ABS,X
        case 9: return ((b1 | (b2 << 8)) + y) & 0xffff; // ABS,Y
        case 10: { // (ZP,X) 前变址间接
            const ptr = (b1 + x) & 0xff;
            return (readMemRaw(cpu, ptr) | (readMemRaw(cpu, (ptr + 1) & 0xff) << 8)) & 0xffff;
        }
        case 11: { // (ZP),Y 后变址间接
            const base = readMemRaw(cpu, b1) | (readMemRaw(cpu, (b1 + 1) & 0xff) << 8);
            return (base + y) & 0xffff;
        }
        case 12: { // (ABS) JMP 间接
            const ptr = b1 | (b2 << 8);
            const hi = (ptr & 0xff00) | (((ptr & 0xff) + 1) & 0xff); // 6502 bug: 高字节跨页不 +1 进位
            return (readMemRaw(cpu, ptr) | (readMemRaw(cpu, hi) << 8)) & 0xffff;
        }
        default: return null; // IMP(2)/ACC(4)/IMM(5)/REL(1)
    }
}
/**
 * CDL 物理 key: PRG (>= $8000) 用 8KB 块号<<13 | 块内偏移 (bank 切换无关);
 * RAM/IO (< $8000) 用 0x80000000|addr 前缀区分。
 */
function cdlKey(cpu, addr) {
    if (addr < 0x8000)
        return 0x80000000 | (addr & 0xffff);
    const mmap = cpu.nes && cpu.nes.mmap;
    let block8k;
    if (mmap && mmap.prgBankMap) {
        if (addr < 0xa000)
            block8k = mmap.prgBankMap['8000'] ?? 0;
        else if (addr < 0xc000)
            block8k = mmap.prgBankMap['A000'] ?? 0;
        else if (addr < 0xe000)
            block8k = mmap.prgBankMap['C000'] ?? 30;
        else
            block8k = mmap.prgBankMap['E000'] ?? 31;
    }
    else {
        block8k = 0;
    }
    return (block8k << 13) | (addr & 0x1fff);
}
/**
 * RTS (0x60) 装饰: 读栈上返回地址, 若返回地址-2 处是 JSR (0x20) 则标注调用来源。
 * 参照 FCEUX tracer.cpp: caller_addr = GetMem((S+1)|0x100) + (GetMem((S+2)|0x100)<<8) - 2
 */
function rtsDecoration(ctx, opcode) {
    if (opcode !== 0x60)
        return '';
    const cpu = ctx.cpu;
    const sp = cpu.REG_SP & 0xff;
    const ret = readMemRaw(cpu, 0x100 | ((sp + 1) & 0xff)) |
        (readMemRaw(cpu, 0x100 | ((sp + 2) & 0xff)) << 8);
    const caller = (ret - 2) & 0xffff;
    if (readMemRaw(cpu, caller) === 0x20) {
        const target = readMemRaw(cpu, (caller + 1) & 0xffff) |
            (readMemRaw(cpu, (caller + 2) & 0xffff) << 8);
        return ` (from $${target.toString(16).toUpperCase().padStart(4, '0')})`;
    }
    return '';
}
/**
 * 格式化单条指令的 trace 行
 * mesen: `i{count}  ${bank}:${pc}: {bytes} {mnemonic} {operand} A:.. X:.. Y:.. S:.. P:..`
 * fceux: 列布局由 fceuxLogOptions (LOG_*) 控制, 与 FCEUX tracer.cpp FCEUD_TraceInstruction 同款。
 *   默认: f{frame} c{cycle} i{count} A:.. X:.. Y:.. S:.. P:.. [栈缩进] $bank:pc: bytes disasm {@ EA} {= 值}
 *   例 (与 docs/roms/opening-all/opening-all.log 一致):
 *     f435 c12930214 i4124119 A:01 X:04 Y:2A S:C8 P:nvUbdizc $00:91D8: 7D 6B 04 ADC $046B,X @ $046F = #$62
 */
function formatInstruction(ctx, instrPC, opcode, opinfo, opbytes) {
    const cpu = ctx.cpu;
    const a = cpu.REG_ACC & 0xff;
    const x = cpu.REG_X & 0xff;
    const y = cpu.REG_Y & 0xff;
    const s = cpu.REG_SP & 0xff;
    const status = cpu.getStatus();
    const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);
    const bytesStr = opbytes
        .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
        .join(' ');
    // 反汇编文本 (FCEUX asm.cpp Disassemble 同款, 支持全部寻址模式: ZP $XX / IMM #$XX / REL 目标 / 间接等)
    const disasmBase = (0, disasm_1.disassemble)(instrPC, (a) => readMemRaw(cpu, a));
    const mode = opinfo.mode;
    if (ctx.opts.format === 'fceux') {
        const opt = ctx.fceuxOptions;
        const frame = (cpu.nes && cpu.nes.fpsFrameCount) | 0;
        // FCEUX: c 列 = 当前总周期 - trace 起始基准 (相对偏移)
        const cycle = ((cpu._cpuCycleBase ?? 0) - ctx.startCycleBase) >>> 0;
        // 寄存器列 (FCEUX str_axystate + str_procstatus)
        let regCol = '';
        if (opt & exports.LOG_REGISTERS) {
            regCol += ' A:' + a.toString(16).toUpperCase().padStart(2, '0') +
                ' X:' + x.toString(16).toUpperCase().padStart(2, '0') +
                ' Y:' + y.toString(16).toUpperCase().padStart(2, '0') +
                ' S:' + s.toString(16).toUpperCase().padStart(2, '0');
        }
        if (opt & exports.LOG_PROCESSOR_STATUS) {
            regCol += ' P:' + formatFlags(status);
        }
        if (regCol)
            regCol += ' ';
        // 反汇编: disasm {@ EA} {= 值} (仿 FCEUX asm.cpp Disassemble)
        let disasm = disasmBase.text;
        const wantDetail = (opt & exports.LOG_MEM_DETAIL) !== 0;
        const isJmpInd = opcode === 0x6c;
        const isJmp = opinfo.ins === 27; // JMP
        const isJsr = opinfo.ins === 28; // JSR (跳转不读数据, 无 = 值)
        if (wantDetail && mode !== 2 && mode !== 4 && mode !== 5 && mode !== 1) {
            const ea = resolveEA(cpu, mode, opbytes);
            if (ea !== null) {
                const valStr = '#$' + readMemRaw(cpu, ea).toString(16).toUpperCase().padStart(2, '0');
                if (isJmpInd) {
                    // JMP ($XXXX): 显示间接目标 (仿 FCEUX "JMP ($XXXX) = $XXXX")
                    const target = readMemRaw(cpu, ea) |
                        (readMemRaw(cpu, (ea & 0xff00) | (((ea & 0xff) + 1) & 0xff)) << 8);
                    disasm += ` = $${target.toString(16).toUpperCase().padStart(4, '0')}`;
                }
                else if (!isJmp && !isJsr && (mode === 0 || mode === 3)) {
                    // ZP / ABS: FCEUX 无 @, 直接 `= #$val` (读写指令显示执行前内存值)
                    disasm += ` = ${valStr}`;
                }
                else if (!isJmp && !isJsr) {
                    disasm += ` @ $${ea.toString(16).toUpperCase().padStart(4, '0')} = ${valStr}`;
                }
            }
        }
        // RTS 装饰: (from $XXXX) + 子程序结束分隔线
        if (opt & exports.LOG_RTS_DECORATION && opcode === 0x60) {
            disasm += rtsDecoration(ctx, opcode);
            disasm +=
                ' -------------------------------------------------------------------------------------------------------------------------';
        }
        // ── 列布局 (FCEUX FCEUD_TraceInstruction) ──
        let line = '';
        if (opt & exports.LOG_FRAMES_COUNT)
            line += `f${frame}`.padEnd(8);
        if (opt & exports.LOG_CYCLES_COUNT)
            line += `c${cycle}`.padEnd(13);
        if (opt & exports.LOG_INSTRUCTIONS_COUNT)
            line += `i${ctx.count}`.padEnd(13);
        // LOG_TO_THE_LEFT: 寄存器列放地址前 (仿 FCEUX FCEUD_TraceInstruction)
        if (opt & exports.LOG_TO_THE_LEFT) {
            line += regCol;
        }
        // 栈缩进 (LOG_CODE_TABBING): (0xFF - S) & 31 空格 → 调用嵌套可视化
        // 独立于 LEFT 开关 (FCEUX 里 tabbing 在寄存器列之后、地址列之前)
        if (opt & exports.LOG_CODE_TABBING) {
            line += ' '.repeat((0xff - s) & 31);
        }
        else if (opt & exports.LOG_TO_THE_LEFT) {
            line += ' ';
        }
        // 地址列: $bank:pc: (PRG) 或 2 空格 + $pc: (RAM), 仿 FCEUX LOG_BANK_NUMBER
        if (opt & exports.LOG_BANK_NUMBER) {
            if (instrPC >= 0x8000) {
                line += `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
                    instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ';
            }
            else {
                line += '  $' + instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ';
            }
        }
        else {
            line += '$' + instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ';
        }
        line += bytesStr.padEnd(9, ' ') + disasm;
        // 非 LEFT: 寄存器列放最后
        if (!(opt & exports.LOG_TO_THE_LEFT)) {
            line += regCol;
        }
        return line;
    }
    return (`i${ctx.count}  ` +
        `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
        instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ' +
        bytesStr.padEnd(8, ' ') + ' ' +
        disasmBase.text +
        ' A:' + a.toString(16).toUpperCase().padStart(2, '0') +
        ' X:' + x.toString(16).toUpperCase().padStart(2, '0') +
        ' Y:' + y.toString(16).toUpperCase().padStart(2, '0') +
        ' S:' + s.toString(16).toUpperCase().padStart(2, '0') +
        ' P:' + formatFlags(status));
}
/** 格式化硬件寄存器写入行 */
function formatHwWrite(ctx, category, addr, val, extra) {
    const cpu = ctx.cpu;
    // REG_PC 惯例 = 操作码地址 - 1, 展示时 +1 才是真实指令地址
    const instrPC = ((cpu._instrPC ?? 0) + 1) & 0xffff;
    const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);
    const pcStr = `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
        instrPC.toString(16).toUpperCase().padStart(4, '0');
    const addrStr = '$' + addr.toString(16).toUpperCase().padStart(4, '0');
    const valStr = '#$' + (val & 0xff).toString(16).toUpperCase().padStart(2, '0');
    let line = `[${category}] i${ctx.count} ${pcStr} STA ${addrStr} = ${valStr}`;
    if (extra)
        line += ' ' + extra;
    return line;
}
/** NT 镜像地址 → NT 编号 + 偏移 */
function ntMirrorInfo(addr) {
    const vramAddr = addr & 0x2fff; // 去掉镜像位
    const ntIdx = (vramAddr >> 10) & 3;
    const row = (vramAddr >> 5) & 0x1f;
    const col = vramAddr & 0x1f;
    const isAttr = (vramAddr & 0x3c0) === 0x3c0;
    if (isAttr) {
        const attrRow = (vramAddr >> 7) & 7; // hmm 实际是 (addr-0x23c0) >> 3
        const attrIdx = vramAddr & 0x3f;
        return `NT${ntIdx} attr[${attrIdx}]`;
    }
    return `NT${ntIdx} [${row},${col}]`;
}
class Tracer {
    constructor() {
        this.ctx = null;
        /** 跨 start/stop 累计的指令计数 (fceux 全量 trace 续接用) */
        this._persistentCount = 0;
    }
    /** 当前已记录的指令总数 (跨帧累计) */
    get instructionCount() {
        return this.ctx ? this.ctx.count : this._persistentCount;
    }
    /** 启动 trace */
    start(nes, opts = {}) {
        const cpu = nes.cpu;
        let stream = null;
        if (opts.outputFile) {
            stream = fs.createWriteStream(opts.outputFile, { flags: 'w' });
        }
        const initialCount = opts.initialCount ?? 0;
        this._persistentCount = initialCount;
        // fceux 格式默认开全列 + 内存详情 + RTS 装饰 (与 opening-all.log 同款)
        const fceuxOptions = opts.fceuxLogOptions ??
            (opts.format === 'fceux'
                ? exports.LOG_FRAMES_COUNT | exports.LOG_CYCLES_COUNT | exports.LOG_INSTRUCTIONS_COUNT |
                    exports.LOG_REGISTERS | exports.LOG_PROCESSOR_STATUS | exports.LOG_BANK_NUMBER |
                    exports.LOG_TO_THE_LEFT | exports.LOG_MEM_DETAIL | exports.LOG_RTS_DECORATION
                : 0);
        this.ctx = {
            cpu,
            nes,
            count: initialCount,
            lines: 0,
            stream,
            opts: {
                trackCPU: true,
                detailOperand: true,
                ...opts,
            },
            stopped: false,
            ppuAddrLatch: 0,
            ppuAddr: 0,
            _mmc3Reg: 0,
            fceuxOptions,
            cdlCode: new Set(),
            cdlData: new Set(),
            unloggedLines: 0,
            startCycleBase: (cpu._cpuCycleBase ?? 0),
        };
    }
    /** 停止 trace, 关闭文件流 */
    stop() {
        if (this.ctx) {
            this._persistentCount = this.ctx.count;
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
    /** 输出一行 */
    emit(line) {
        const ctx = this.ctx;
        if (ctx.stream) {
            ctx.stream.write(line + '\n');
        }
        else if (ctx.opts.callback) {
            ctx.opts.callback(line);
        }
    }
    /** 检查行数限制 */
    checkMaxLines() {
        const ctx = this.ctx;
        if (ctx.opts.maxLines !== undefined && ctx.lines >= ctx.opts.maxLines) {
            this.stop();
            return true;
        }
        return false;
    }
    /**
     * 记录一条 CPU 指令 (由 CPU.emulate() 调用)
     */
    trace(instrPC, opcode, opinfo, opbytes) {
        const ctx = this.ctx;
        if (!ctx || ctx.stopped || !ctx.opts.trackCPU)
            return;
        if (ctx.opts.addressRange) {
            const [start, end] = ctx.opts.addressRange;
            if (instrPC < start || instrPC >= end)
                return;
        }
        if (ctx.opts.bankFilter !== undefined) {
            const bank = getMesenBank(ctx.cpu, ctx.nes, instrPC);
            if (bank !== ctx.opts.bankFilter)
                return;
        }
        // ── FCEUX CDL 模式 (LOG_NEW_INSTRUCTIONS/LOG_NEW_DATA): 只记录首次执行/访问的地址 ──
        // 参照 FCEUX tracer.cpp: 比较 codecount/datacount, 无变化则跳过并累计 "(N lines skipped)"
        const cdlOpt = ctx.fceuxOptions & (exports.LOG_NEW_INSTRUCTIONS | exports.LOG_NEW_DATA);
        if (cdlOpt) {
            const codeKey = cdlKey(ctx.cpu, instrPC);
            const isNewCode = !ctx.cdlCode.has(codeKey);
            let isNewData = false;
            let dataKey = -1;
            if (ctx.fceuxOptions & exports.LOG_NEW_DATA) {
                const ea = resolveEA(ctx.cpu, opinfo.mode, opbytes);
                if (ea !== null) {
                    dataKey = cdlKey(ctx.cpu, ea);
                    isNewData = !ctx.cdlData.has(dataKey);
                }
            }
            const newSomething = ((ctx.fceuxOptions & exports.LOG_NEW_INSTRUCTIONS) && isNewCode) ||
                ((ctx.fceuxOptions & exports.LOG_NEW_DATA) && isNewData);
            if (!newSomething) {
                ctx.unloggedLines++;
                return;
            }
            if (ctx.fceuxOptions & exports.LOG_NEW_INSTRUCTIONS)
                ctx.cdlCode.add(codeKey);
            if (dataKey >= 0 && (ctx.fceuxOptions & exports.LOG_NEW_DATA))
                ctx.cdlData.add(dataKey);
            if (ctx.unloggedLines > 0) {
                this.emit(`(${ctx.unloggedLines} lines skipped)`);
                ctx.unloggedLines = 0;
            }
        }
        if (this.checkMaxLines())
            return;
        ctx.count++;
        ctx.lines++;
        this.emit(formatInstruction(ctx, instrPC, opcode, opinfo, opbytes));
    }
    /**
     * 记录硬件寄存器写入 (由 CPU.write() 调用)
     * @param addr 写入地址 (CPU 地址总线)
     * @param val 写入值
     */
    traceWrite(addr, val) {
        const ctx = this.ctx;
        if (!ctx || ctx.stopped)
            return;
        // ── PPU 控制寄存器 $2000-$2002 ──
        if (ctx.opts.trackPPURegs && addr >= 0x2000 && addr <= 0x2002) {
            if (this.checkMaxLines())
                return;
            ctx.count++;
            ctx.lines++;
            const names = { 0x2000: 'PPUCTRL', 0x2001: 'PPUMASK', 0x2002: 'PPUSTATUS' };
            this.emit(formatHwWrite(ctx, 'PPU_REG', addr, val, names[addr]));
            return;
        }
        // ── OAM 写入 $2003/$2004/$4014 ──
        if (ctx.opts.trackOAM && (addr === 0x2003 || addr === 0x2004 || addr === 0x4014)) {
            if (this.checkMaxLines())
                return;
            ctx.count++;
            ctx.lines++;
            const names = { 0x2003: 'OAMADDR', 0x2004: 'OAMDATA', 0x4014: 'OAMDMA' };
            let extra = names[addr] ?? '';
            if (addr === 0x2004) {
                // OAMDATA 写入时显示 OAM 地址 + 精灵槽位
                const ppu = ctx.nes.ppu;
                const oamAddr = ppu?.sramAddress ?? 0;
                const spriteIdx = (oamAddr >> 2) & 0x3f;
                const byteIdx = oamAddr & 3;
                const byteNames = ['Y', 'Tile', 'Attr', 'X'];
                extra += ` oamAddr=$${oamAddr.toString(16).toUpperCase()} spr#${spriteIdx}.${byteNames[byteIdx]}`;
            }
            else if (addr === 0x4014) {
                extra += ` DMA page=$${val.toString(16).toUpperCase().padStart(2, '0')} (src=$${(val << 8).toString(16).toUpperCase().padStart(4, '0')})`;
            }
            this.emit(formatHwWrite(ctx, 'OAM', addr, val, extra));
            return;
        }
        // ── $2006 (PPUADDR) — 锁存地址 ──
        if (addr === 0x2006) {
            if (ctx.ppuAddrLatch === 0) {
                // 第一次写 (高字节)
                ctx.ppuAddrLatch = 1;
                ctx.ppuAddr = (ctx.ppuAddr & 0x00ff) | ((val & 0x3f) << 8);
            }
            else {
                // 第二次写 (低字节) — 地址完整
                ctx.ppuAddr = (ctx.ppuAddr & 0xff00) | val;
                ctx.ppuAddrLatch = 0;
                // 如果跟踪 NT/Palette/PT, 记录地址设置
                const ppuAddr = ctx.ppuAddr;
                const trackThis = (ctx.opts.trackNT && ppuAddr >= 0x2000 && ppuAddr < 0x3000) ||
                    (ctx.opts.trackPalette && ppuAddr >= 0x3f00 && ppuAddr < 0x4000) ||
                    (ctx.opts.trackPT && ppuAddr < 0x2000);
                if (trackThis) {
                    if (this.checkMaxLines())
                        return;
                    ctx.count++;
                    ctx.lines++;
                    let cat = 'PPU_ADDR';
                    if (ppuAddr >= 0x3f00)
                        cat = 'PAL_ADDR';
                    else if (ppuAddr >= 0x2000)
                        cat = 'NT_ADDR';
                    else
                        cat = 'PT_ADDR';
                    const extra = `→ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')}` +
                        (ppuAddr >= 0x2000 && ppuAddr < 0x3000 ? ` (${ntMirrorInfo(ppuAddr)})` : '');
                    this.emit(formatHwWrite(ctx, cat, 0x2006, val, extra));
                }
            }
            return;
        }
        // ── $2007 (PPUDATA) — VRAM/NT/Palette/PT 数据写入 ──
        if (addr === 0x2007) {
            const ppuAddr = ctx.ppuAddr;
            const ppu = ctx.nes.ppu;
            const increment = (ppu?.f_vramIncrement === 1) ? 32 : 1;
            // 分类跟踪
            if (ctx.opts.trackNT && ppuAddr >= 0x2000 && ppuAddr < 0x3000) {
                if (this.checkMaxLines())
                    return;
                ctx.count++;
                ctx.lines++;
                this.emit(formatHwWrite(ctx, 'NT_WRITE', 0x2007, val, `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} (${ntMirrorInfo(ppuAddr)}) tile=#$${(val & 0xff).toString(16).toUpperCase().padStart(2, '0')}`));
            }
            else if (ctx.opts.trackPalette && ppuAddr >= 0x3f00 && ppuAddr < 0x4000) {
                if (this.checkMaxLines())
                    return;
                ctx.count++;
                ctx.lines++;
                const palIdx = ppuAddr & 0x1f;
                const palType = palIdx < 16 ? 'BG' : 'SPR';
                const colorIdx = palIdx & 0x0f;
                const isMirror = palIdx >= 0x10 && (palIdx & 0x0f) === 0;
                this.emit(formatHwWrite(ctx, 'PAL_WRITE', 0x2007, val, `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} ${palType}[${colorIdx}]${isMirror ? ' (mirror)' : ''} color=#$${(val & 0x3f).toString(16).toUpperCase().padStart(2, '0')}`));
            }
            else if (ctx.opts.trackPT && ppuAddr < 0x2000) {
                if (this.checkMaxLines())
                    return;
                ctx.count++;
                ctx.lines++;
                const ptBank = ppuAddr >> 12; // 0=BG PT, 1=SPR PT
                const tileIdx = (ppuAddr >> 3) & 0xff;
                const rowIdx = ppuAddr & 7;
                this.emit(formatHwWrite(ctx, 'PT_WRITE', 0x2007, val, `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} ${ptBank === 0 ? 'BG' : 'SPR'} tile#${tileIdx} row${rowIdx}`));
            }
            // 更新 PPU 地址 (增量)
            ctx.ppuAddr = (ctx.ppuAddr + increment) & 0x3fff;
            return;
        }
        // ── 音频寄存器 $4000-$4017 ──
        if (ctx.opts.trackAudio && addr >= 0x4000 && addr <= 0x4017) {
            if (this.checkMaxLines())
                return;
            ctx.count++;
            ctx.lines++;
            const names = {
                0x4000: 'SQ1_VOL', 0x4001: 'SQ1_SWEEP', 0x4002: 'SQ1_LO', 0x4003: 'SQ1_HI',
                0x4004: 'SQ2_VOL', 0x4005: 'SQ2_SWEEP', 0x4006: 'SQ2_LO', 0x4007: 'SQ2_HI',
                0x4008: 'TRI_LINEAR', 0x4009: 'TRI_UNUSED', 0x400a: 'TRI_LO', 0x400b: 'TRI_HI',
                0x400c: 'NOISE_VOL', 0x400d: 'NOISE_UNUSED', 0x400e: 'NOISE_LO', 0x400f: 'NOISE_HI',
                0x4010: 'DMC_FREQ', 0x4011: 'DMC_RAW', 0x4012: 'DMC_ADDR', 0x4013: 'DMC_LEN',
                0x4014: 'OAMDMA', 0x4015: 'APU_STATUS', 0x4016: 'JOY1', 0x4017: 'APU_FRAME',
            };
            const name = names[addr] ?? 'UNKNOWN';
            this.emit(formatHwWrite(ctx, 'AUDIO', addr, val, name));
            return;
        }
        // ── MMC3 bank 切换 ($8000-$8001 PRG + $A000-$A001 CHR/PRG-RAM) ──
        // $8000: 写寄存器选择 (bit0-2: 寄存器号, bit6: PRG mode, bit7: CHR mode)
        // $8001: 写寄存器值 (PRG bank / CHR bank)
        // $A000: CHR bank 选择 / NT 镜像
        // $A001: PRG-RAM 控制
        if (ctx.opts.trackMMC3 && (addr === 0x8000 || addr === 0x8001 || addr === 0xA000 || addr === 0xA001)) {
            if (this.checkMaxLines())
                return;
            ctx.count++;
            ctx.lines++;
            const cpu = ctx.cpu;
            // REG_PC 惯例 = 操作码地址 - 1
            const instrPC = ((cpu._instrPC ?? 0) + 1) & 0xffff;
            const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);
            const pcStr = '$' + mesenBank.toString(16).toUpperCase().padStart(2, '0') + ':' +
                instrPC.toString(16).toUpperCase().padStart(4, '0');
            if (addr === 0x8000) {
                // $8000: 选寄存器号 + CHR/PRG mode
                const reg = val & 0x07;
                const chrMode = (val >> 7) & 1;
                const prgMode = (val >> 6) & 1;
                const regNames = ['R0:CHR_A0', 'R1:CHR_A1', 'R2:CHR_A2', 'R3:CHR_A3',
                    'R4:CHR_B0', 'R5:CHR_B1', 'R6:PRG_8000', 'R7:PRG_A000'];
                const extra = `select ${regNames[reg] ?? 'R' + reg} chrMode=${chrMode} prgMode=${prgMode}`;
                this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8000 = #$${val.toString(16).toUpperCase().padStart(2, '0')} ${extra}`);
                ctx._mmc3Reg = reg; // 记住当前选的寄存器
            }
            else if (addr === 0x8001) {
                // $8001: 写寄存器值
                const reg = ctx._mmc3Reg ?? 0;
                const regNames = ['CHR_A0', 'CHR_A1', 'CHR_A2', 'CHR_A3', 'CHR_B0', 'CHR_B1', 'PRG_8000', 'PRG_A000'];
                const regName = regNames[reg] ?? 'R' + reg;
                let extra = `${regName}=#$${val.toString(16).toUpperCase().padStart(2, '0')}`;
                // 解释 PRG bank 值
                if (reg === 6) {
                    const block8k = val & 0x3f;
                    extra += ` → $8000窗口=8KB块${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
                }
                else if (reg === 7) {
                    const block8k = val & 0x3f;
                    extra += ` → $A000窗口=8KB块${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
                }
                else {
                    extra += ` → CHR bank ${val & 0x3f}`;
                }
                this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8001 = #$${val.toString(16).toUpperCase().padStart(2, '0')} ${extra}`);
            }
            else if (addr === 0xA000) {
                // $A000: NT 镜像模式
                const mirror = (val & 1) === 0 ? 'vertical' : 'horizontal';
                this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A000 = #$${val.toString(16).toUpperCase().padStart(2, '0')} NT mirror=${mirror}`);
            }
            else if (addr === 0xA001) {
                // $A001: PRG-RAM 控制
                const ramEnable = (val & 0x80) !== 0;
                const ramProtect = (val & 0x40) !== 0;
                this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A001 = #$${val.toString(16).toUpperCase().padStart(2, '0')} PRG-RAM enable=${ramEnable} protect=${ramProtect}`);
            }
            return;
        }
    }
}
exports.Tracer = Tracer;
