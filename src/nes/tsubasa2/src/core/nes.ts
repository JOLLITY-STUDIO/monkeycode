import Controller from "./controller";
import type { ButtonKey } from "./controller";
import PPU from "./ppu/index";
import PAPU from "./papu/index";
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

/**
 * 默认 CpuBus 实现 (无 CPU 指令循环, 仅内存 + 空操作中断)。
 * 适用于 H5 主板外部驱动 PPU 帧的场景。
 */
function createDefaultBus(): CpuBus {
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
    requestIrq(_type: number): void {},
    haltCycles(_n: number): void {},
  };
}

class NES {
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
  controllers: { 1: Controller; 2: Controller };
  fpsFrameCount: number;
  romData: Uint8Array | string | ArrayBuffer | null;
  rom!: ROM;
  lastFpsTime: number | null;
  crashed: boolean;

  constructor(opts: NESOptions) {
    this.opts = {
      onFrame: function () {},
      onAudioSample: null,
      onStatusUpdate: function () {},
      onBatteryRamWrite: function () {},

      emulateSound: true,
      sampleRate: 48000, // Sound sample rate in hz

      ...opts,
    };

    this.ui = {
      writeFrame: this.opts.onFrame!,
      updateStatus: this.opts.onStatusUpdate!,
    };
    this.bus = this.opts.bus ?? createDefaultBus();
    this.ppu = new PPU(this);
    this.papu = new PAPU(this);
    this.gameGenie = new GameGenie();
    // GameGenie 通常会调 cpu._updateCartridgeLoader; 去 CPU 化后此项无操作
    // (GameGenie 影响 PRG 替换, H5 走 DataStore 直接读写, 不依赖此回调)
    this.mmap = null;
    this.controllers = {
      1: new Controller(),
      2: new Controller(),
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
  get cpu(): CpuBus {
    return this.bus;
  }

  // Resets the system
  reset(): void {
    // 不再 new CPU; bus 保持 (外部注入的 bus 状态在 reset 后保留, 仅清 PPU/PAPU)
    this.ppu = new PPU(this);
    this.papu = new PAPU(this);

    if (this.mmap !== null) {
      this.mmap = this.rom.createMapper();
    }

    this.lastFpsTime = null;
    this.fpsFrameCount = 0;

    this.crashed = false;
  }

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
  frame = (): void => {
    if (this.crashed) {
      throw new Error(
        "Game has crashed. Call reset() or loadROM() to restart.",
      );
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
    } catch (e) {
      this.crashed = true;
      throw e;
    }
    this.fpsFrameCount++;
  };

  buttonDown = (controller: ControllerId, button: ButtonKey): void => {
    this.controllers[controller].buttonDown(button);
  };

  buttonUp = (controller: ControllerId, button: ButtonKey): void => {
    this.controllers[controller].buttonUp(button);
  };

  zapperMove = (x: number, y: number): void => {
    if (!this.mmap) return;
    this.mmap.zapperX = x;
    this.mmap.zapperY = y;
  };

  zapperFireDown = (): void => {
    if (!this.mmap) return;
    this.mmap.zapperFired = true;
  };

  zapperFireUp = (): void => {
    if (!this.mmap) return;
    this.mmap.zapperFired = false;
  };

  getFPS(): number | null {
    const now = Date.now();
    let fps: number | null = null;
    if (this.lastFpsTime) {
      fps = this.fpsFrameCount / ((now - this.lastFpsTime) / 1000);
    }
    this.fpsFrameCount = 0;
    this.lastFpsTime = now;
    return fps;
  }

  reloadROM(): void {
    if (this.romData !== null) {
      this.loadROM(this.romData);
    }
  }

  // 直接加载 TS 形式 ROM (header + 翻译 bank 类 + CHR 字节)。
  // romDef 来自 game/index.ts 的 ROM 定义 (header/prg/chr)。
  loadTsROM(romDef: { header: Uint8Array; prg: unknown; chr: Uint8Array }): void {
    this.rom = new ROM(this);
    this.rom.loadTs(romDef.header, romDef.prg, romDef.chr);

    this.reset();
    this.mmap = this.rom.createMapper();
    this.mmap.loadROM();
    this.ppu.setMirroring(this.rom.getMirroringType());
    this.romData = null;
  }

  // Loads a ROM file into the bus and PPU.
  // The ROM file is validated first.
  loadROM(data: Uint8Array | string | ArrayBuffer): void {
    // Load ROM file:
    this.rom = new ROM(this);
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
  setFramerate(rate: number): void {
    this.papu.setFrameRate(rate);
  }

  toJSON(): EmulatorData {
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

  fromJSON(s: any): void {
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
      if (s.controllers[1]) this.controllers[1].fromJSON(s.controllers[1]);
      if (s.controllers[2]) this.controllers[2].fromJSON(s.controllers[2]);
    }
  }
}

export default NES;
