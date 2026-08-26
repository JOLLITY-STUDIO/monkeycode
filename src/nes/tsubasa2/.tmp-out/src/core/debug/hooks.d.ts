/**
 * Debug hooks — 参照 FCEUX 的 X6502_Debug() / CPUHook 模式
 *
 * 在 CPU 指令执行后注入回调，供 debug 插件使用。
 * 不做断点/单步调试 — 调试器功能太复杂且 tsnes 暂不需要。
 */
import type NES from '../nes';
export interface DebugInstrInfo {
    /** 指令起始地址 */
    pc: number;
    /** 操作码 */
    opcode: number;
    /** 指令消耗周期 (含中断) */
    cycles: number;
    /** 帧计数 */
    frameCount: number;
    /** 累计指令数 */
    instrCount: number;
    /** CPU 寄存器快照 */
    reg: {
        A: number;
        X: number;
        Y: number;
        S: number;
        P: number;
    };
}
export type PostInstrHook = (info: DebugInstrInfo) => void;
export type FrameHook = (frame: number) => void;
export declare class DebugHookManager {
    private _postHooks;
    private _frameHooks;
    private _nes;
    private _enabled;
    instrCount: number;
    onPostInstr(hook: PostInstrHook): void;
    offPostInstr(hook: PostInstrHook): void;
    onFrame(hook: FrameHook): void;
    offFrame(hook: FrameHook): void;
    attach(nes: NES): void;
    detach(): void;
    get nes(): NES | null;
    get enabled(): boolean;
}
/** 全局单例 (参照 FCEUX FCEUI_Debugger) */
export declare const debugHooks: DebugHookManager;
