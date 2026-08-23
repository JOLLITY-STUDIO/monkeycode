import Controller from "./controller";
import type { ButtonKey } from "./controller";
import GameGenie from "./gamegenie";
import ROM from "./rom";
import type { CpuBus } from "./cpu-bus";
export type ControllerId = 1 | 2;
export interface EmulatorData {
    bus: CpuBus;
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
    /**
     * 去 CPU 化: 外部注入的内存/中断总线。
     * 替代原 cpuFactory + CPU 实例。
     * 若未提供, 构造一个最小默认 bus (64KB 零内存 + 空 IRQ/halt)。
     */
    bus?: CpuBus;
}
declare class NES {
    opts: NESOptions;
    ui: {
        writeFrame: (buffer: Uint32Array) => void;
        updateStatus: (status: string) => void;
    };
    /**
     * 去 CPU 化后的内存/中断总线。
     * PPU/PAPU/mapper 仍通过 `this.nes.cpu` 别名 getter 访问此对象,
     * 保持向下兼容, 但 NES 类自身不再 import CPU 类型。
     */
    bus: CpuBus;
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
    constructor(opts: NESOptions);
    /**
     * 兼容旧代码的 `nes.cpu` 访问 — 返回 bus。
     * PPU/PAPU/mapper 内部仍用 `this.nes.cpu.mem` / `this.nes.cpu.requestIrq` 等,
     * 此 getter 让那些引用透明地落到 bus 上, 无需逐个改 PPU/PAPU。
     */
    get cpu(): CpuBus;
    reset(): void;
    /**
     * 去 CPU 化的帧循环。
     *
     * 原始 jsnes: `for(;;) { cpu.emulate(); ppu 边沿; if(ppu.frameEnded) break; }`
     * 去 CPU 化后: NES 本身不跑 CPU 指令, 由外部驱动 (H5 Tsubasa2 主板的
     * InterruptService.nmi → Bank00Service.mainLoop 推进游戏逻辑, PpuSync.syncAll
     * 同步 PPU 寄存器/NT/OAM/调色板)。
     *
     * 此处仅完成"PPU 一帧的扫描线渲染": startFrame → 扫描线推进 → endFrame,
     * 供 Browser/H5 调用方在不跑 CPU 的情况下仍能产出图像帧。
     *
     * 若调用方仍需 CPU 指令循环 (例如纯模拟器场景), 应自行在外部循环调
     * `nes.bus` 相关指令驱动, 不再由 NES.frame 承担。
     */
    frame: () => void;
    buttonDown: (controller: ControllerId, button: ButtonKey) => void;
    buttonUp: (controller: ControllerId, button: ButtonKey) => void;
    zapperMove: (x: number, y: number) => void;
    zapperFireDown: () => void;
    zapperFireUp: () => void;
    getFPS(): number | null;
    reloadROM(): void;
    loadTsROM(romDef: {
        header: Uint8Array;
        prg: unknown;
        chr: Uint8Array;
    }): void;
    loadROM(data: Uint8Array | string | ArrayBuffer): void;
    setFramerate(rate: number): void;
    toJSON(): EmulatorData;
    fromJSON(s: any): void;
}
export default NES;
