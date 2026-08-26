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
export declare const LOG_REGISTERS = 1;
export declare const LOG_PROCESSOR_STATUS = 2;
export declare const LOG_NEW_INSTRUCTIONS = 4;
export declare const LOG_NEW_DATA = 8;
export declare const LOG_TO_THE_LEFT = 16;
export declare const LOG_FRAMES_COUNT = 32;
export declare const LOG_MESSAGES = 64;
export declare const LOG_BREAKPOINTS = 128;
export declare const LOG_CODE_TABBING = 512;
export declare const LOG_CYCLES_COUNT = 1024;
export declare const LOG_INSTRUCTIONS_COUNT = 2048;
export declare const LOG_BANK_NUMBER = 4096;
export declare const LOG_MEM_DETAIL = 8192;
export declare const LOG_RTS_DECORATION = 16384;
/** FCEUX 默认 log options (与 FCEUX 窗口默认一致: 寄存器|标志|左对齐|栈缩进) */
export declare const FCEUX_DEFAULT_OPTIONS: number;
export interface TraceOptions {
    /** 输出文件路径 (不设则用 callback) */
    outputFile?: string;
    /** 每行回调 (当 outputFile 未设时使用) */
    callback?: (line: string) => void;
    /** 最多记录行数 (默认无限制) */
    maxLines?: number;
    /** 行格式: mesen = i{count} $bank:pc: ... (默认) / fceux = f{frame} c{cycle} i{count} ... (与 FCEUX opening-all.log 同款) */
    format?: 'mesen' | 'fceux';
    /** 指令计数起始值 (默认 0; 跨帧续接时用 Tracer.instructionCount) */
    initialCount?: number;
    /** 跟踪 CPU 指令 (默认 true) */
    trackCPU?: boolean;
    /** 只记录 PC 在此范围内的指令 [start, end) */
    addressRange?: [number, number];
    /** 只记录指定 16KB bank (Mesen 格式, 0-15) */
    bankFilter?: number;
    /** 是否记录操作数详情 (默认 true) */
    detailOperand?: boolean;
    /**
     * FCEUX LOG_* 位标志组合, 控制输出哪些列。
     * format='fceux' 时默认: FRAMES|CYCLES|INSTRUCTIONS|REGISTERS|PROCESSOR_STATUS|BANK_NUMBER|TO_THE_LEFT|MEM_DETAIL|RTS_DECORATION
     */
    fceuxLogOptions?: number;
    /** 跟踪 OAM 写入 ($2003/$2004/$4014) */
    trackOAM?: boolean;
    /** 跟踪 NT/属性表写入 ($2006/$2007 → $2000-$2FFF) */
    trackNT?: boolean;
    /** 跟踪调色板写入 ($2006/$2007 → $3F00-$3FFF) */
    trackPalette?: boolean;
    /** 跟踪 pattern table 写入 ($2006/$2007 → $0000-$1FFF) */
    trackPT?: boolean;
    /** 跟踪音频寄存器写入 ($4000-$4017) */
    trackAudio?: boolean;
    /** 跟踪 PPU 控制寄存器写入 ($2000-$2002) */
    trackPPURegs?: boolean;
    /** 跟踪 MMC3 bank 切换 ($8000/$8001 PRG + $A000/$A001 CHR/PRG-RAM) */
    trackMMC3?: boolean;
}
export declare class Tracer {
    private ctx;
    /** 跨 start/stop 累计的指令计数 (fceux 全量 trace 续接用) */
    private _persistentCount;
    /** 当前已记录的指令总数 (跨帧累计) */
    get instructionCount(): number;
    /** 启动 trace */
    start(nes: any, opts?: TraceOptions): void;
    /** 停止 trace, 关闭文件流 */
    stop(): void;
    /** 是否正在 trace */
    get active(): boolean;
    /** 输出一行 */
    private emit;
    /** 检查行数限制 */
    private checkMaxLines;
    /**
     * 记录一条 CPU 指令 (由 CPU.emulate() 调用)
     */
    trace(instrPC: number, opcode: number, opinfo: any, opbytes: number[]): void;
    /**
     * 记录硬件寄存器写入 (由 CPU.write() 调用)
     * @param addr 写入地址 (CPU 地址总线)
     * @param val 写入值
     */
    traceWrite(addr: number, val: number): void;
}
