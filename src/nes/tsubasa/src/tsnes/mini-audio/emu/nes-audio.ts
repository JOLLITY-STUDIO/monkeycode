/**
 * 音频专用 NES 类——仅 CPU + PPUStub + PAPU + Mapper。
 * 无输入、无视频渲染。帧循环由 PPUStub.frameEnded 驱动。
 */

import CPU from "./cpu"; 
import RomAudio from "./rom-audio";import { PPUStub } from "./ppu-stub";
import PAPU from "./papu/index";
import type { MapperAudio } from "./mapper-audio";

export class NesAudio {
  cpu!: CPU;
  mmap!: MapperAudio;
  rom!: RomAudio;
  ppu!: PPUStub;
  papu!: PAPU;
  opts: {
    emulateSound: boolean;
    sampleRate: number;
    onAudioSample: ((l: number, r: number) => void) | null;
    onBatteryRamWrite: (addr: number, val: number) => void;
  };

  constructor() {
    this.opts = {
      emulateSound: true,
      sampleRate: 48000,
      onAudioSample: null,
      onBatteryRamWrite: () => {},
    };
    this._resetInternals();
  }

  private _resetInternals(): void {
    this.cpu = new CPU(this);
    this.ppu = new PPUStub();
    (this.ppu as any).bindCPU(this.cpu);
    this.papu = new PAPU(this); 
     
  }

  /** 从 PRG / CHR 原始数组加载 ROM */
  loadROMArrays(prg: Uint8Array, chr: Uint8Array): void {
    this.rom = new RomAudio(this);
    this.rom.loadFromArrays(prg, chr);

    this._resetInternals();
    this.mmap = this.rom.createMapper();
    this.mmap.loadROM();
  }

  /** 运行一帧（~29780 个 CPU 周期） */
  frame(): void {
    const cpu = this.cpu;
    const papu = this.papu;
    const ppu = this.ppu;
   
    ppu.startFrame();

    try {
      for (;;) {
        if (cpu.cyclesToHalt === 0) {
          // 执行一条 CPU 指令。advanceDots 由 CPU 的 load/write/push/pull 内部完成。
          const cycles = cpu.emulate();

          if (this.opts.emulateSound) {
            papu.clockFrameCounter(cycles, cpu.apuCatchupCycles);
          }
          cpu.apuCatchupCycles = 0;

          if (ppu.frameEnded) {
            ppu.frameEnded = false;
            break;
          }
        } else {
          // DMA 暂停周期——PPU 和 APU 的定时仍然在走。
          const chunk = Math.min(cpu.cyclesToHalt, 8);
          // 每个 DMA 周期大约对应3个 PPU dot（近似值，对音频足够了）。
          ppu.advanceDots(chunk * 3);
          if (this.opts.emulateSound) {
            papu.clockFrameCounter(chunk);
          }
          cpu.cyclesToHalt -= chunk;
          (cpu as any)._cpuCycleBase += chunk;

          if (ppu.frameEnded) {
            ppu.frameEnded = false;
            break;
          }
        }
      }
    } catch (e) {
      console.error("[NesAudio] frame crash:", e);
      throw e;
    }
  }

  /** 运行指定帧数 */
  runFrames(n: number): void {
    for (let f = 0; f < n; f++) {
      this.frame();
    }
  }
}

export default NesAudio;
