import CPU from "./cpu";
import Controller from "./controller";
import type { ButtonKey } from "./controller";
import GameGenie from "./gamegenie";
import ROM from "./rom";
import { Tracer, type TraceOptions } from "./debug/tracer";
export type ControllerId = 1 | 2;
export interface EmulatorData {
    cpu: any;
    mmap: any;
    ppu: any;
    papu: any;
}
export interface NESOptions {
    onFrame?: (buffer: Uint32Array) => void;
    onAudioSample?: (left: number, right: number) => void;
    onStatusUpdate?: (status: string) => void;
    onBatteryRamWrite?: (address: number, value: number) => void;
    emulateSound?: boolean;
    sampleRate?: number;
    /** 可选：自定义 CPU 工厂 (用于注入 TsubasaCpu 等替代实现) */
    cpuFactory?: (nes: any) => CPU;
    /** PC 进入非 ROM 区域时是否输出调试日志 (默认关闭，仅调试时需要) */
    debugNonROM?: boolean;
}
declare class NES {
    opts: NESOptions;
    ui: {
        writeFrame: (buffer: Uint32Array) => void;
        updateStatus: (status: string) => void;
    };
    cpu: CPU;
    ppu: any;
    papu: any;
    gameGenie: GameGenie;
    mmap: any;
    controllers: {
        1: Controller;
        2: Controller;
    };
    fpsFrameCount: number;
    romData: Uint8Array | string | ArrayBuffer | null;
    rom: ROM;
    lastFpsTime: number | null;
    crashed: boolean;
    /** CPU 指令级 trace (可选, 默认关闭) */
    tracer: Tracer;
    constructor(opts: NESOptions);
    reset(): void;
    frame: () => void;
    buttonDown: (controller: ControllerId, button: ButtonKey) => void;
    buttonUp: (controller: ControllerId, button: ButtonKey) => void;
    zapperMove: (x: number, y: number) => void;
    zapperFireDown: () => void;
    zapperFireUp: () => void;
    getFPS(): number | null;
    /**
     * 启用 CPU 指令级 trace (类似 Mesen trace 功能)
     *
     * 用法:
     *   nes.enableTrace({ outputFile: 'trace.log', maxLines: 10000 });
     *   nes.frame();  // 执行的指令会被记录
     *   nes.disableTrace();
     *
     * 过滤选项:
     *   - addressRange: 只记录 [start, end) 范围内的 PC
     *   - bankFilter: 只记录指定 16KB bank (Mesen 编号, 0-15)
     *   - maxLines: 最多记录多少行
     *   - callback: 每行回调 (不写文件)
     */
    enableTrace(opts?: TraceOptions): Tracer;
    /** 停止 trace, 关闭文件流 */
    disableTrace(): void;
    reloadROM(): void;
    loadROM(data: Uint8Array | string | ArrayBuffer): void;
    setFramerate(rate: number): void;
    toJSON(): EmulatorData;
    fromJSON(s: any): void;
}
export default NES;
