"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const index_1 = __importDefault(require("./ppu/index"));
const index_2 = __importDefault(require("./papu/index"));
const gamegenie_1 = __importDefault(require("./gamegenie"));
const rom_1 = __importDefault(require("./rom"));
/**
 * 默认 CpuBus 实现 (无 CPU 指令循环, 仅内存 + 空操作中断)。
 * 适用于 H5 主板外部驱动 PPU 帧的场景。
 */
function createDefaultBus() {
    return {
        mem: new Uint8Array(0x10000),
        dataBus: 0,
        instrBusCycles: 0,
        _cpuCycleBase: 0,
        apuCatchupCycles: 0,
        cyclesToHalt: 0,
        nmiRaised: false,
        nmiRaisedAtCycle: 0,
        nmiDotsRemainingInStep: 0,
        requestIrq(_type) { },
        haltCycles(_n) { },
    };
}
class NES {
    constructor(opts) {
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
        this.frame = () => {
            if (this.crashed) {
                throw new Error("Game has crashed. Call reset() or loadROM() to restart.");
            }
            this.controllers[1].clock();
            this.controllers[2].clock();
            this.ppu.startFrame();
            // 去 CPU 化: 不再 cpu.emulate() 指令循环。
            // 直接驱动 PPU 一帧的扫描线 (262 行 × 341 dots 简化为按扫描线推进)。
            // PPU.endScanline 内部会在 VBlank 置位 frameEnded。
            // 注: 此处假定 PPU 已由外部 (PpuSync/InterruptService) 灌入正确寄存器/NT/OAM。
            try {
                // 262 扫描线 (0-260), 每条 endScanline 推进 PPU 状态机
                for (let sl = 0; sl < 262; sl++) {
                    this.ppu.endScanline();
                    if (this.ppu.frameEnded) {
                        this.ppu.frameEnded = false;
                        break;
                    }
                }
            }
            catch (e) {
                this.crashed = true;
                throw e;
            }
            this.fpsFrameCount++;
        };
        this.buttonDown = (controller, button) => {
            this.controllers[controller].buttonDown(button);
        };
        this.buttonUp = (controller, button) => {
            this.controllers[controller].buttonUp(button);
        };
        this.zapperMove = (x, y) => {
            if (!this.mmap)
                return;
            this.mmap.zapperX = x;
            this.mmap.zapperY = y;
        };
        this.zapperFireDown = () => {
            if (!this.mmap)
                return;
            this.mmap.zapperFired = true;
        };
        this.zapperFireUp = () => {
            if (!this.mmap)
                return;
            this.mmap.zapperFired = false;
        };
        this.opts = {
            onFrame: function () { },
            onAudioSample: null,
            onStatusUpdate: function () { },
            onBatteryRamWrite: function () { },
            emulateSound: true,
            sampleRate: 48000, // Sound sample rate in hz
            ...opts,
        };
        this.ui = {
            writeFrame: this.opts.onFrame,
            updateStatus: this.opts.onStatusUpdate,
        };
        this.bus = this.opts.bus ?? createDefaultBus();
        this.ppu = new index_1.default(this);
        this.papu = new index_2.default(this);
        this.gameGenie = new gamegenie_1.default();
        // GameGenie 通常会调 cpu._updateCartridgeLoader; 去 CPU 化后此项无操作
        // (GameGenie 影响 PRG 替换, H5 走 DataStore 直接读写, 不依赖此回调)
        this.mmap = null;
        this.controllers = {
            1: new controller_1.default(),
            2: new controller_1.default(),
        };
        this.fpsFrameCount = 0;
        this.romData = null;
        this.lastFpsTime = null;
        this.crashed = false;
        this.ui.updateStatus("Ready to load a ROM.");
    }
    /**
     * 兼容旧代码的 `nes.cpu` 访问 — 返回 bus。
     * PPU/PAPU/mapper 内部仍用 `this.nes.cpu.mem` / `this.nes.cpu.requestIrq` 等,
     * 此 getter 让那些引用透明地落到 bus 上, 无需逐个改 PPU/PAPU。
     */
    get cpu() {
        return this.bus;
    }
    // Resets the system
    reset() {
        // 不再 new CPU; bus 保持 (外部注入的 bus 状态在 reset 后保留, 仅清 PPU/PAPU)
        this.ppu = new index_1.default(this);
        this.papu = new index_2.default(this);
        if (this.mmap !== null) {
            this.mmap = this.rom.createMapper();
        }
        this.lastFpsTime = null;
        this.fpsFrameCount = 0;
        this.crashed = false;
    }
    getFPS() {
        const now = Date.now();
        let fps = null;
        if (this.lastFpsTime) {
            fps = this.fpsFrameCount / ((now - this.lastFpsTime) / 1000);
        }
        this.fpsFrameCount = 0;
        this.lastFpsTime = now;
        return fps;
    }
    reloadROM() {
        if (this.romData !== null) {
            this.loadROM(this.romData);
        }
    }
    // 直接加载 TS 形式 ROM (header + 翻译 bank 类 + CHR 字节)。
    // romDef 来自 game/index.ts 的 ROM 定义 (header/prg/chr)。
    loadTsROM(romDef) {
        this.rom = new rom_1.default(this);
        this.rom.loadTs(romDef);
        this.reset();
        this.mmap = this.rom.createMapper();
        this.mmap.loadROM();
        this.ppu.setMirroring(this.rom.getMirroringType());
        this.romData = null;
    }
    // Loads a ROM file into the bus and PPU.
    // The ROM file is validated first.
    loadROM(data) {
        // Load ROM file:
        this.rom = new rom_1.default(this);
        this.rom.load(data);
        this.reset();
        this.mmap = this.rom.createMapper();
        this.mmap.loadROM();
        this.ppu.setMirroring(this.rom.getMirroringType());
        this.romData = data;
    }
    // Adjust audio sample timing for a non-standard host frame rate. At the
    // default 60fps each frame() produces ~800 samples at 48kHz. If the host
    // calls frame() less often (e.g. 30fps), the sample timer must fire more
    // frequently per cycle so each frame still fills the audio buffer.
    setFramerate(rate) {
        this.papu.setFrameRate(rate);
    }
    toJSON() {
        return {
            // romData: this.romData,
            // 去 CPU 化: 序列化 bus 的内存与中断状态 (而非 CPU 内部寄存器)
            bus: this.bus,
            mmap: this.mmap.toJSON(),
            ppu: this.ppu.toJSON(),
            papu: this.papu.toJSON(),
            controllers: {
                1: this.controllers[1].toJSON(),
                2: this.controllers[2].toJSON(),
            },
        };
    }
    fromJSON(s) {
        this.reset();
        // this.romData = s.romData;
        // 去 CPU 化: 恢复 bus (外部应注入实现了 CpuBus 的对象)
        if (s.bus) {
            this.bus = s.bus;
        }
        this.mmap.fromJSON(s.mmap);
        this.ppu.fromJSON(s.ppu);
        this.papu.fromJSON(s.papu);
        if (s.controllers) {
            if (s.controllers[1])
                this.controllers[1].fromJSON(s.controllers[1]);
            if (s.controllers[2])
                this.controllers[2].fromJSON(s.controllers[2]);
        }
    }
}
exports.default = NES;
