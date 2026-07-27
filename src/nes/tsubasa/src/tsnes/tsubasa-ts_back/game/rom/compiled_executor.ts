// ============================================================================
// compiled_executor.ts — 编译后的 6502 CPU 执行器
//
// 加载所有 bank_X_compiled.ts 的 dispatch 表，
// 通过 Proxy 上的 memHook 拦截 PPU/MMC3 寄存器读写，
// 循环分派执行 CPU 函数直到帧边界。
// ============================================================================

import * as $ from './prg_banks/cpu_state';

import { CompiledPpu } from './compiled_ppu';

import { dispatch as d0,  init as _i0  } from './prg_banks/bank_0_compiled';
import { dispatch as d1,  init as _i1  } from './prg_banks/bank_1_compiled';
import { dispatch as d2,  init as _i2  } from './prg_banks/bank_2_compiled';
import { dispatch as d11, init as _i11 } from './prg_banks/bank_11_compiled';
import { dispatch as d12, init as _i12 } from './prg_banks/bank_12_compiled';
import { dispatch as d16, init as _i16 } from './prg_banks/bank_16_compiled';
import { dispatch as d19, init as _i19 } from './prg_banks/bank_19_compiled';
import { dispatch as d20, init as _i20 } from './prg_banks/bank_20_compiled';
import { dispatch as d22, init as _i22 } from './prg_banks/bank_22_compiled';
import { dispatch as d24, init as _i24 } from './prg_banks/bank_24_compiled';
import { dispatch as d26, init as _i26 } from './prg_banks/bank_26_compiled';
import { dispatch as d27, init as _i27 } from './prg_banks/bank_27_compiled';
import { dispatch as d28, init as _i28 } from './prg_banks/bank_28_compiled';
import { dispatch as d30, init as _i30 } from './prg_banks/bank_30_compiled';
import { dispatch as d31 } from './prg_banks/bank_31_compiled';

type Fn = () => void;
type DispatchTable = Record<number, Fn>;

// ════════════════════════════════════════════════════════════
// PRG Bank 索引 → Dispatch 表映射 (静态导入)
// ════════════════════════════════════════════════════════════

const BANK_DISPATCH: (DispatchTable | null)[] = new Array(32).fill(null);
BANK_DISPATCH[0]  = d0;
BANK_DISPATCH[1]  = d1;
BANK_DISPATCH[2]  = d2;
BANK_DISPATCH[11] = d11;
BANK_DISPATCH[12] = d12;
BANK_DISPATCH[16] = d16;
BANK_DISPATCH[19] = d19;
BANK_DISPATCH[20] = d20;
BANK_DISPATCH[22] = d22;
BANK_DISPATCH[24] = d24;
BANK_DISPATCH[26] = d26;
BANK_DISPATCH[27] = d27;
BANK_DISPATCH[28] = d28;
BANK_DISPATCH[30] = d30;
BANK_DISPATCH[31] = d31;

// Initialize all dispatch tables (populates dispatch records)
_i0(); _i1(); _i2(); _i11(); _i12(); _i16(); _i19(); _i20();
_i22(); _i24(); _i26(); _i27(); _i28(); _i30();

/** 每帧约 29780 CPU 周期 — 简化: 每帧约 8000 函数调用 */
const CALLS_PER_FRAME = 8000;

/** 平均每条编译函数调用的 CPU 周期数 (粗略估计) */
const AVG_CYCLES_PER_CALL = 4;

/** NTSC NES 每帧 CPU 周期数 (29780.5 取整) */
const CYCLES_PER_FRAME = 29780;

// ════════════════════════════════════════════════════════════
// 编译后的 CPU 执行器
// ════════════════════════════════════════════════════════════

export class CompiledExecutor {
  ppu: CompiledPpu;
  running = false;

  /** 帧回调 — 每帧输出 RGBA 帧缓冲 */
  onFrame: ((buf: Uint32Array) => void) | null = null;

  /** 帧内剩余调用次数 */
  private _callBudget = 0;

  /** 近似 CPU 周期计数器 (用于 VBlank 时序) */
  private _approxCycles = 0;

  /** 手柄 1 当前输入 (bit 0=A,1=B,2=Select,3=Start,4=Up,5=Down,6=Left,7=Right) */
  private _joy1 = 0x00;

  /** 上次写入的 joy strobe */
  private _joyStrobe = false;
  private _joyReadIdx = 0;

  // ============================================================
  // 构造 / 初始化
  // ============================================================

  constructor() {
    this.ppu = new CompiledPpu();
    this._setupMemHook();
  }

  /** 加载 ROM 并初始化 */
  init(prgBanks: Uint8Array[], chrBanks: Uint8Array[]): void {
    $.loadRom(prgBanks, chrBanks);
    this.ppu.loadChr(chrBanks);
    this._initPrgBanks();
    this.reset();
  }

  /** 重置 CPU + PPU */
  reset(): void {
    $.A = 0; $.X = 0; $.Y = 0; $.SP = 0xFD;
    $.C = false; $.Z = false; $.I = true; $.D = false; $.V = false; $.N = false;
    $.PC = 0x0000;
    const raw = $.getRawRam();
    raw.fill(0);

    // 初始化 MMC3 为默认值: R6=0, R7=1, 固定 bank=C000/E000
    $.mmc3.banks.fill(0);
    $.mmc3.banks[6] = 0;
    $.mmc3.banks[7] = 1;
    $.mmc3.bankSelect = 0;
    $.mmc3.chrA12Invert = false;

    this._joy1 = 0x00;
    this._joyStrobe = false;
    this._joyReadIdx = 0;

    this._initPrgBanks();

    // 从复位向量读取 PC
    const lo = $.readRom(0xFFFC);
    const hi = $.readRom(0xFFFD);
    $.PC = (hi << 8) | lo;

    this.ppu.reset();
    this.running = true;
    this._callBudget = CALLS_PER_FRAME;
    this._approxCycles = 0;

    console.log('[compiled] Reset → PC=$' + $.PC.toString(16).padStart(4, '0'));
  }

  /** 设置手柄输入 (8 位: A,B,Select,Start,↑,↓,←,→) */
  setJoy1(mask: number): void {
    this._joy1 = mask;
  }

  // ============================================================
  // 帧循环 — 执行到帧边界
  // ============================================================

  /** 执行一帧 */
  frame(): void {
    if (!this.running) return;
    this._callBudget = CALLS_PER_FRAME;
    this._runUntilFrame();
  }

  /** 渲染到 Canvas */
  renderToCanvas(ctx: CanvasRenderingContext2D): void {
    if (!this.ppu.frameBuffer) return;
    // 创建 ImageData 直接写入
    const imgData = ctx.createImageData(256, 240);
    const dst = new Uint32Array(imgData.data.buffer);
    const src = this.ppu.frameBuffer;
    for (let i = 0; i < 256 * 240; i++) {
      dst[i] = src[i] | 0xFF000000;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  /** 获取帧缓冲快照 */
  getFrameBuffer(): Uint32Array | null {
    return this.ppu.frameBuffer;
  }

  // ============================================================
  // 内存钩子 (Proxy 回调)
  // ============================================================

  private _setupMemHook(): void {
    $.setMemHook((addr: number, val: number, isWrite: boolean): number | undefined => {
      // --- PPU 寄存器 ($2000-$2007) ---
      if (addr >= 0x2000 && addr < 0x2008) {
        if (isWrite) {
          this.ppu.handleWrite(addr, val);
        } else {
          return this.ppu.handleRead(addr);
        }
        return 0; // 不从 raw 读写
      }

      // --- OAM DMA ($4014) ---
      if (addr === 0x4014) {
        if (isWrite) {
          this.ppu.handleOamDma(val, $.getRawRam());
        }
        return 0;
      }

      // --- Joypad ($4016/$4017) ---
      if (addr === 0x4016) {
        if (isWrite) {
          this._joyStrobe = (val & 1) !== 0;
          if (this._joyStrobe) this._joyReadIdx = 0;
        } else {
          // 读手柄: 返回当前按钮状态
          if (this._joyReadIdx < 8) {
            const bit = (this._joy1 >> this._joyReadIdx) & 1;
            this._joyReadIdx++;
            return bit | 0x40; // bit 6=1 (标准手柄签名)
          }
          return 0x41;
        }
        return 0;
      }

      // --- MMC3 寄存器 ($8000-$FFFF) ---
      if (addr >= 0x8000) {
        if (isWrite) {
          this._handleMmc3Write(addr, val);
        } else {
          return this._handleMmc3Read(addr);
        }
        return 0;
      }

      // 其余地址 → 返回 undefined (由 Proxy 读写 raw)
      return undefined;
    });
  }

  // ============================================================
  // MMC3 映射处理
  // ============================================================

  /** 将 PRG ROM bank 数据预加载到 raw ram $8000-$FFFF */
  private _initPrgBanks(): void {
    const raw = $.getRawRam();
    this._mapPrgBank(0x8000, $.mmc3.banks[6]);
    this._mapPrgBank(0xA000, $.mmc3.banks[7]);
    this._mapPrgBank(0xC000, $.prgRom.length >= 2 ? $.prgRom.length - 2 : 0);
    this._mapPrgBank(0xE000, $.prgRom.length >= 1 ? $.prgRom.length - 1 : 0);
  }

  private _mapPrgBank(cpuAddr: number, bankIdx: number): void {
    if (bankIdx < 0 || bankIdx >= $.prgRom.length) return;
    const src = $.prgRom[bankIdx];
    const raw = $.getRawRam();
    const offset = cpuAddr & 0xE000;
    for (let i = 0; i < 0x2000 && i < src.length; i++) {
      raw[offset + i] = src[i];
    }
  }

  private _handleMmc3Write(addr: number, val: number): void {
    const even = (addr & 1) === 0;
    if ((addr & 0xE000) === 0x8000) {
      if (even) {
        // $8000 — bank select
        $.mmc3.bankSelect = val & 0x07;
        $.mmc3.chrA12Invert = (val & 0x80) !== 0;
      } else {
        // $8001 — bank data (写入后立即重新映射)
        $.mmc3.banks[$.mmc3.bankSelect] = val;
        // 仅 PRG bank (R6/R7) 重新映射
        const sel = $.mmc3.bankSelect;
        if (sel === 6) {
          this._mapPrgBank(0x8000, val);
        } else if (sel === 7) {
          this._mapPrgBank(0xA000, val);
        }
      }
    } else if ((addr & 0xE000) === 0xA000) {
      // $A000-$BFFF — mirroring/PRG RAM protect
      if (even) {
        // mirroring
      } else {
        $.mmc3.prgRamProtect = (val & 0x40) !== 0;
      }
    } else if (addr >= 0x6000 && addr < 0x8000) {
      // SRAM — write to raw
      $.getRawRam()[addr] = val;
    }
    // $C000-$FFFF — 固定 / IRQ, 不重新映射
  }

  private _handleMmc3Read(addr: number): number {
    return $.getRawRam()[addr];
  }

  // ============================================================
  // 内部: CPU 执行循环
  // ============================================================

  /** 解析当前 PC 对应的 dispatch 表 */
  private _getDispatch(pc: number): DispatchTable | null {
    const bankBase = pc & 0xE000;
    let bankIdx: number;
    switch (bankBase) {
      case 0x8000: bankIdx = $.mmc3.banks[6]; break;
      case 0xA000: bankIdx = $.mmc3.banks[7]; break;
      case 0xC000: bankIdx = $.prgRom.length - 2; break;
      case 0xE000: bankIdx = $.prgRom.length - 1; break;
      default: return null;
    }
    return BANK_DISPATCH[bankIdx] || null;
  }

  /** 尝试从 dispatch 表执行 (编译路径), 返回 true 表示成功 */
  private _tryCompiledExec(pc: number): boolean {
    const disp = this._getDispatch(pc);
    if (!disp) return false;
    const lookupPc = (pc & 0xE000) === 0xA000 ? (pc & 0x1FFF) | 0x8000 : pc;
    const fn = disp[lookupPc];
    if (!fn) return false;
    fn();
    this._callBudget--;
    this._approxCycles += AVG_CYCLES_PER_CALL;
    return true;
  }

  /** 执行函数调用直到帧边界 */
  private _runUntilFrame(): void {
    let safety = this._callBudget * 3;
    while (this._callBudget > 0 && safety > 0) {
      safety--;
      const pc = $.PC;

      if (!this._tryCompiledExec(pc)) {
        // fallback: 内联 6502 单步执行 (不依赖外部 cpu.ts)
        const cycles = this._inlineExec6502(pc);
        this._callBudget--;
        this._approxCycles += cycles;
      }

      // 注入 VBlank 信号
      if (this._approxCycles >= CYCLES_PER_FRAME) {
        this._approxCycles -= CYCLES_PER_FRAME;
        this._doVBlank();
        safety += 100;
      }
    }
  }

  /** 触发一次 VBlank 脉冲: 设置 VBlank → 给 CPU 机会检测 → 渲染 → 清除 */
  private _doVBlank(): void {
    // Step 1: 升起 VBlank 信号
    this.ppu.setVBlank();

    if (this.ppu.nmiTriggered) {
      // NMI 已启用 → 触发 NMI, 运行 handler
      this._triggerNmi();
      let nmiSafety = 500;
      while (nmiSafety > 0) {
        nmiSafety--;
        const pc = $.PC;
        if (!this._tryCompiledExec(pc)) {
          this._inlineExec6502(pc);
          if (this._callBudget > 0) this._callBudget--;
        }
      }
    } else {
      // NMI 未启用 → 运行一段 CPU 代码,
      // 让 CPU 通过 $2002 轮询检测到 VBlank 并消耗掉
      let vbSafety = 200;
      while (vbSafety > 0) {
        vbSafety--;
        const pc = $.PC;
        if (!this._tryCompiledExec(pc)) {
          this._inlineExec6502(pc);
          if (this._callBudget > 0) this._callBudget--;
        }
        // CPU 读取 $2002 会清除 bit 7, 一旦清除就不再等待
        if (!(this.ppu.regs.status & 0x80)) break;
      }
    }

    // Step 3: 清除 VBlank (如果还没被 CPU 消耗掉)
    this.ppu.clearVBlank();

    // Step 4: 渲染帧
    this.ppu.render();
    if (this.onFrame) {
      this.onFrame(this.ppu.frameBuffer);
    }
  }

  /** 触发 NMI */
  private _triggerNmi(): void {
    // 保存当前 PC + 状态
    $.pushWord($.PC);
    $.push($.getFlags());

    // 跳转到 NMI 向量
    const lo = $.readRom(0xFFFA);
    const hi = $.readRom(0xFFFB);
    $.PC = (hi << 8) | lo;
    $.I = true; // NMI 时禁用中断
  }
}
