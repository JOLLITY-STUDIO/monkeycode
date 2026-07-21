import CPU from "./cpu";
import Controller from "./controller";
import PPU from "./ppu/index";
import PAPU from "./papu/index";
import GameGenie from "./gamegenie";
import ROM from "./rom";
import type { ButtonKey } from "./controller";

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
}

class NES {
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
    this.cpu = new CPU(this);
    this.ppu = new PPU(this);
    this.papu = new PAPU(this);
    this.gameGenie = new GameGenie();
    this.gameGenie.onChange = () => this.cpu._updateCartridgeLoader();
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

  // Resets the system
  reset(): void {
    this.cpu = new CPU(this);
    this.ppu = new PPU(this);
    this.papu = new PAPU(this);

    if (this.mmap !== null) {
      this.mmap = this.rom.createMapper();
    }

    this.lastFpsTime = null;
    this.fpsFrameCount = 0;

    this.crashed = false;
  }

  // The frame loop. PPU is advanced inline after every CPU bus operation
  // (in cpu.load/write/push/pull). APU is clocked in bulk after each
  // instruction for compatibility with its sample timing logic.
  frame = (): void => {
    if (this.crashed) {
      throw new Error(
        "Game has crashed. Call reset() or loadROM() to restart.",
      );
    }
    this.controllers[1].clock();
    this.controllers[2].clock();
    this.ppu.startFrame();
    let cycles: number;
    const cpu = this.cpu;
    const ppu = this.ppu;
    const papu = this.papu;
    try {
      for (;;) {
        if (cpu.cyclesToHalt === 0) {
          // Execute a CPU instruction. PPU advancement happens inline
          // inside the bus operations (load/write/push/pull).
          cycles = cpu.emulate();

          // Clock APU with the full cycle count. The frame counter portion
          // subtracts any cycles already advanced by APU catch-up.
          if (this.opts.emulateSound) {
            papu.clockFrameCounter(cycles, cpu.apuCatchupCycles);
          }
          cpu.apuCatchupCycles = 0;

          // Check if VBlank fired during inline PPU stepping.
          if (ppu.frameEnded) {
            ppu.frameEnded = false;
            break;
          }
        } else {
          // DMA halt cycles: step PPU per cycle. APU is clocked in bulk.
          let chunk = Math.min(cpu.cyclesToHalt, 8);
          for (let i = 0; i < chunk; i++) {
            ppu.advanceDots(3);
          }
          if (this.opts.emulateSound) {
            papu.clockFrameCounter(chunk);
          }
          cpu.cyclesToHalt -= chunk;
          cpu._cpuCycleBase += chunk;

          if (ppu.frameEnded) {
            ppu.frameEnded = false;
            break;
          }
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

  // Loads a ROM file into the CPU and PPU.
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
  // frequently per CPU cycle so each frame still fills the audio buffer.
  setFramerate(rate: number): void {
    this.papu.setFrameRate(rate);
  }

  toJSON(): EmulatorData {
    return {
      // romData: this.romData,
      cpu: this.cpu.toJSON(),
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
    this.cpu.fromJSON(s.cpu);
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
