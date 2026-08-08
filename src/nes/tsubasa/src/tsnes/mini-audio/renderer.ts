/**
 * mini-audio/renderer.ts — 音频渲染模块
 * 封装 CPU + PAPU 仿真，生成可播放的 PCM 采样数据
 */

import CPU from "./cpu";
import PAPU from "./papu/index";
import PRG_BANK_12 from "../rom-data/prg-bank-12";
import PRG_BANK_13 from "../rom-data/prg-bank-13";
import PRG_BANK_14 from "../rom-data/prg-bank-14";
import PRG_BANK_15 from "../rom-data/prg-bank-15";
import PRG_BANK_31 from "../rom-data/prg-bank-31";

const CYCLES_PER_FRAME = 29830;
const SAMPLE_RATE = 48000;

// ─── 辅助 Bank 查找表 ──────────────────────────────────────────────
// MMC3 Bank 编号 → PRG_BANK 数据（只加载 BGM 需要的 0x0D/0x0E/0x0F）
const AUX_BANKS: Record<number, readonly number[]> = {
  0x0D: PRG_BANK_13,
  0x0E: PRG_BANK_14,
  0x0F: PRG_BANK_15,
};

// ─── RAM & MMC3 ───────────────────────────────────────────────────

function initAudioRam(mem: Uint8Array, seId: number) {
  for (let i = 0x0700; i < 0x0800; i++) mem[i] = 0;
  mem[0x0700] = seId;
  mem[0x07FC] = 0;
  for (let g = 0; g < 4; g++) mem[0x07E4 + g] = 0x08;
}

/**
 * MMC3 简化映射器
 * - $8000-$9FFF: R6 控制（默认 Bank 12）
 * - $A000-$BFFF: R7 控制（BGM 时为 0x0D/0x0E/0x0F）
 * - $C000-$FFFF: 固定 Bank 31（含中断向量表）
 */
function createMmc(mem: Uint8Array, papu: PAPU) {
  let bankSelectReg = 0;   // $8000 写入：选择哪个 MMC3 寄存器
  let regR6 = 12;           // R6 → $8000-$9FFF 窗口
  let regR7 = 0;            // R7 → $A000-$BFFF 窗口

  function getBank(addr: number): readonly number[] {
    if (addr < 0xA000) return PRG_BANK_12;                    // $8000-$9FFF: 固定 Bank 12
    if (addr < 0xC000) {
      const aux = AUX_BANKS[regR7];
      return aux || PRG_BANK_12;                              // $A000-$BFFF: R7 选 Bank
    }
    if (addr < 0xE000) return PRG_BANK_31;                    // $C000-$DFFF: 固定 Bank 31
    return PRG_BANK_31;                                        // $E000-$FFFF: 固定 Bank 31
  }

  return {
    load(addr: number): number {
      if (addr < 0x2000) return mem[addr & 0x7FF];
      if (addr >= 0x8000) {
        const bank = getBank(addr);
        const baseAddr = addr < 0xA000 ? 0x8000 : addr < 0xC000 ? 0xA000 : addr < 0xE000 ? 0xC000 : 0xE000;
        return bank[(addr - baseAddr) & 0x1FFF];
      }
      return 0;  // $2000-$7FFF open bus
    },

    write(addr: number, val: number): void {
      if (addr < 0x2000) { mem[addr & 0x7FF] = val & 0xFF; return; }
      if (addr >= 0x4000 && addr <= 0x4017) {
        papu.writeReg(addr, val);
        return;
      }
      // MMC3 寄存器: $8000-$FFFF 偶地址 = Bank Select, 奇地址 = Bank Data
      if (addr >= 0x8000) {
        if ((addr & 1) === 0) {
          bankSelectReg = val & 0x07;
        } else {
          if (bankSelectReg === 6) regR6 = val & 0x3F;
          if (bankSelectReg === 7) regR7 = val & 0x3F;
        }
      }
    },
  };
}

function createPpuStub() {
  return { advanceDots(_n: number) {} };
}

function writeBootstrap(mem: Uint8Array, seId: number) {
  // 入口流程：
  // 1. STA $0700 + STA $4015（初始化 APU）
  // 2. LDX #$05 + JSR $8002（MMC3 Bank 切换 + 队列分发）
  // 3. loop: JSR $80BA（通道更新）→ JMP loop
  // ──────────────────────────────────────────────────
  // 内存布局:
  // $0200: A9 seId     (LDA #SE_ID)
  // $0202: 8D 00 07    (STA $0700)
  // $0205: A9 0F       (LDA #$0F)
  // $0207: 8D 15 40    (STA $4015)
  // $020A: A2 05       (LDX #$05)
  // $020C: 20 02 80    (JSR $8002)      ← 返回后 PC=$020F
  // $020F: 20 BA 80    (JSR $80BA)      ← 循环起点
  // $0212: 4C 0F 02    (JMP $020F)      ← 跳回循环
  const code = [
    0xA9, seId,           // LDA #SE_ID
    0x8D, 0x00, 0x07,     // STA $0700
    0xA9, 0x0F,           // LDA #$0F
    0x8D, 0x15, 0x40,     // STA $4015
    0xA2, 0x05,           // LDX #$05       ← $8002 入口要求 X=5
    0x20, 0x02, 0x80,     // JSR $8002 (main: bank switch + queue dispatch)
    // loop:               // ← PC 返回此处
    0x20, 0xBA, 0x80,     // JSR $80BA (channel update)
    0x4C, 0x0F, 0x02,     // JMP $020F (back to JSR $80BA)
  ];
  for (let i = 0; i < code.length; i++) mem[0x0200 + i] = code[i];
}

// ─── 渲染接口 ─────────────────────────────────────────────────────

export interface AudioRenderResult {
  /** 混合后的单声道采样 (Float32, -1.0 ~ 1.0) */
  samples: Float32Array;
  /** 采样数 */
  sampleCount: number;
  /** 实际渲染的帧数 */
  framesRendered: number;
  /** 是否包含有效音频数据 */
  hasAudio: boolean;
}

/**
 * 为指定 SE ID 渲染一段音频
 * @param seId    声效 ID (如 0x30)
 * @param maxFrames  最大帧数（默认 90 帧 ≈ 1.5 秒）
 * @returns AudioRenderResult
 */
export function renderAudio(seId: number, maxFrames: number = 90): AudioRenderResult {
  const samples: number[] = [];
  let _cpu: any = null;
  let _papu: any = null;
  let _mmc: any = null;

  const nes: any = {
    opts: {
      sampleRate: SAMPLE_RATE,
      onAudioSample: (l: number, r: number) => {
        samples.push((l + r) * 0.5);  // 混合成单声道
      },
    },
    gameGenie: { enabled: false, applyCodes: (_a: number, v: number) => v },
    fpsFrameCount: 0,
    controllers: [0, 0],
    get cpu() { return _cpu; },
    get papu() { return _papu; },
    get mmap() { return _mmc; },
    get ppu() { return _ppu; },
  };

  const _ppu = createPpuStub();
  _cpu = new CPU(nes);
  _papu = new PAPU(nes);
  _mmc = createMmc(_cpu.mem, _papu);

  initAudioRam(_cpu.mem, seId);
  writeBootstrap(_cpu.mem, seId);

  _cpu.REG_SP = 0xFD;
  _cpu.REG_STATUS = 0x04;
  _cpu.setStatus(0x04);
  _cpu.REG_A = 0;
  _cpu.REG_X = 0;
  _cpu.REG_Y = 0;
  _cpu.REG_PC = 0x01FF;

  // 运行 maxFrames 帧
  for (let f = 0; f < maxFrames; f++) {
    let frameCycles = 0;
    while (frameCycles < CYCLES_PER_FRAME) {
      try {
        const cyc = _cpu.emulate();
        frameCycles += cyc;
        _papu.clockFrameCounter(cyc);

        const pc = _cpu.REG_PC;
        if (pc < 0x0200 || (pc >= 0x2000 && pc < 0x8000)) break;
      } catch (_e) {
        // 忽略个别 CPU 错误，继续跳帧
        break;
      }
    }
    nes.fpsFrameCount++;
  }

  return {
    samples: new Float32Array(samples),
    sampleCount: samples.length,
    framesRendered: maxFrames,
    hasAudio: samples.length > 100,
  };
}

/** 已知可用的 SE ID 列表 */
export const AVAILABLE_SE_IDS: number[] = [
  0x30, 0x34, 0x40, 0x48,
];

/**
 * 快速渲染：为随机 SE 渲染 60 帧，返回可循环播放的音频数据
 */
export function renderRandom(): AudioRenderResult {
  const idx = Math.floor(Math.random() * AVAILABLE_SE_IDS.length);
  const seId = AVAILABLE_SE_IDS[idx];
  return renderAudio(seId, 60);
}

export default { renderAudio, renderRandom, AVAILABLE_SE_IDS };
