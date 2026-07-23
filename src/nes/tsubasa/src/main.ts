/**
 * ============================================================================
 * 天使之翼2 — 通用游戏入口 (web 端 + 微信小程序共用)
 * 
 * 核心逻辑基于 disasm/ (100% ASM→TS 翻译)，不依赖外部 ROM 文件。
 * 平台差异通过 GamePlatform 接口适配。
 * ============================================================================
 */

import { renderPpuFrame } from './canvas/Renderer';
import { createTileCache, TileCache } from './canvas/TileCache';
import {
  NesRom, PpuState, Mmc3Regs,
  VRAM_SIZE, OAM_SIZE, BUTTON,
} from './types';

import { GameContext } from './disasm/_context';
import { allBanks } from './disasm/banks/index';
import type { RomReader, BankRomSlice } from './disasm/banks/_bank_types';
import { resolveBank, getBank } from './disasm/banks/_crossbank';
import { _cfg } from './disasm/banks/bank_00_dispatch';
import { bank_02 as nmiBank } from './disasm/banks/bank_02_nmi';
// Suppress verbose logging in production (speeds up frame loop dramatically)
_cfg.verbose = false;
_cfg.fastSceneLoad = false;
import { ROM as bank00 } from './disasm/banks/_romdata/bank_00_data';
import { initPaletteCache, getCacheStats } from './palette/PaletteCache';
import { romUint8Array } from './rom_data';
import { ROM as bank01 } from './disasm/banks/_romdata/bank_01_data';
import { ROM as bank02 } from './disasm/banks/_romdata/bank_02_data';
import { ROM as bank03 } from './disasm/banks/_romdata/bank_03_data';
import { ROM as bank04 } from './disasm/banks/_romdata/bank_04_data';
import { ROM as bank05 } from './disasm/banks/_romdata/bank_05_data';
import { ROM as bank06 } from './disasm/banks/_romdata/bank_06_data';
import { ROM as bank07 } from './disasm/banks/_romdata/bank_07_data';
import { ROM as bank08 } from './disasm/banks/_romdata/bank_08_data';
import { ROM as bank09 } from './disasm/banks/_romdata/bank_09_data';
import { ROM as bank10 } from './disasm/banks/_romdata/bank_10_data';
import { ROM as bank11 } from './disasm/banks/_romdata/bank_11_data';
import { ROM as bank12 } from './disasm/banks/_romdata/bank_12_data';
import { ROM as bank13 } from './disasm/banks/_romdata/bank_13_data';
import { ROM as bank14 } from './disasm/banks/_romdata/bank_14_data';
import { ROM as bank15 } from './disasm/banks/_romdata/bank_15_data';
import { ROM as bank16 } from './disasm/banks/_romdata/bank_16_data';
import { ROM as bank17 } from './disasm/banks/_romdata/bank_17_data';
import { ROM as bank18 } from './disasm/banks/_romdata/bank_18_data';
import { ROM as bank19 } from './disasm/banks/_romdata/bank_19_data';
import { ROM as bank20 } from './disasm/banks/_romdata/bank_20_data';
import { ROM as bank21 } from './disasm/banks/_romdata/bank_21_data';
import { ROM as bank22 } from './disasm/banks/_romdata/bank_22_data';
import { ROM as bank23 } from './disasm/banks/_romdata/bank_23_data';
import { ROM as bank24 } from './disasm/banks/_romdata/bank_24_data';
import { ROM as bank25 } from './disasm/banks/_romdata/bank_25_data';
import { ROM as bank26 } from './disasm/banks/_romdata/bank_26_data';
import { ROM as bank27 } from './disasm/banks/_romdata/bank_27_data';
import { ROM as bank28 } from './disasm/banks/_romdata/bank_28_data';
import { ROM as bank29 } from './disasm/banks/_romdata/bank_29_data';
import { ROM as bank30 } from './disasm/banks/_romdata/bank_30_data';
import { ROM as bank31 } from './disasm/banks/_romdata/bank_31_data';
import { ROM as bank32 } from './disasm/banks/_romdata/bank_32_data';
import { ROM as bank33 } from './disasm/banks/_romdata/bank_33_data';
import { ROM as bank34 } from './disasm/banks/_romdata/bank_34_data';
import { ROM as bank35 } from './disasm/banks/_romdata/bank_35_data';
import { ROM as bank36 } from './disasm/banks/_romdata/bank_36_data';
import { ROM as bank37 } from './disasm/banks/_romdata/bank_37_data';
import { ROM as bank38 } from './disasm/banks/_romdata/bank_38_data';
import { ROM as bank39 } from './disasm/banks/_romdata/bank_39_data';
import { ROM as bank40 } from './disasm/banks/_romdata/bank_40_data';
import { ROM as bank41 } from './disasm/banks/_romdata/bank_41_data';
import { ROM as bank42 } from './disasm/banks/_romdata/bank_42_data';
import { ROM as bank43 } from './disasm/banks/_romdata/bank_43_data';
import { ROM as bank44 } from './disasm/banks/_romdata/bank_44_data';
import { ROM as bank45 } from './disasm/banks/_romdata/bank_45_data';
import { ROM as bank46 } from './disasm/banks/_romdata/bank_46_data';
import { ROM as bank47 } from './disasm/banks/_romdata/bank_47_data';
const _romBanks = [
  bank00,
  bank01,
  bank02,
  bank03,
  bank04,
  bank05,
  bank06,
  bank07,
  bank08,
  bank09,
  bank10,
  bank11,
  bank12,
  bank13,
  bank14,
  bank15,
  bank16,
  bank17,
  bank18,
  bank19,
  bank20,
  bank21,
  bank22,
  bank23,
  bank24,
  bank25,
  bank26,
  bank27,
  bank28,
  bank29,
  bank30,
  bank31,
  bank32,
  bank33,
  bank34,
  bank35,
  bank36,
  bank37,
  bank38,
  bank39,
  bank40,
  bank41,
  bank42,
  bank43,
  bank44,
  bank45,
  bank46,
  bank47,
];

// ============================================================================
// 平台适配接口
// ============================================================================

export interface GamePlatform {
  /** Canvas 元素 (web: HTMLCanvasElement, 小程序: canvas node) */
  canvas: any;
  /** 获取当前手柄输入 (BUTTON bitmask) */
  getInput(): number;
  /** 请求下一帧回调 */
  requestFrame(callback: () => void): number | any;
  /** 取消帧回调 */
  cancelFrame(id: number | any): void;
  /** 更新状态文本 (可选) */
  setStatus?(text: string): void;
}

// ============================================================================
// ROM 常量
// ============================================================================

const PRG_BANK_SIZE = 0x2000;       // 8KB per bank
const TOTAL_PRG_BANKS = 48;         // 48 banks (fixed)
const CHR_RAM_SIZE = 0x2000;        // 8KB CHR RAM

// ============================================================================
// 引擎内部状态
// ============================================================================

let rom: NesRom;
let ctx: GameContext;
let ppu: PpuState;
let mmc3: Mmc3Regs;
let chrRam: Uint8Array;
/** 完整 CHR ROM 数据 (用于 MMC3 CHR bank 切换) */
let _fullChrRom: Uint8Array | null = null;
let tileCache: TileCache;

let running = false;
let animId: number | any = null;
let frameCount = 0;
let platform: GamePlatform;

// 诊断: CHR RAM 写入计数
const _chrDiag = { writes: 0, nonZeroWrites: 0, firstNonZeroAddr: -1, lastNonZeroAddr: -1 };

// 延迟调色板脏标记: 避免在 PPU bridge 中频繁调用 markPaletteDirty
let _paletteDirty = false;

// ★ 诊断: palette 写入计数
let _palWriteCount = 0;

// MMC3 bank 映射 (运行时可变)
let bank8000 = 0;
let bankA000 = 1;

// ============================================================================
// ROM 构建
// ============================================================================

function buildRom(): NesRom {
  // 从完整的 .nes ROM 提取 PRG 数据（避免 _romBanks 16KB→8KB 映射错误）
  const fullRom = romUint8Array();
  const prgUnits = fullRom[4];      // iNES header: PRG size in 16KB units
  const prgSize = prgUnits * 16384;  // PRG data length
  const prg = fullRom.slice(16, 16 + prgSize);

  // CHR RAM (8KB, 游戏运行时通过 PPU 写入)
  chrRam = new Uint8Array(CHR_RAM_SIZE);

  return {
    header: {
      prgSize: prgUnits,
      chrSize: 0,
      mapper: 4,
      mirroring: 'horizontal',
      battery: true,
      trainer: false,
    },
    prg,
    chr: chrRam,
  };
}

// ============================================================================
// ROM Reader — 适配 NesRom 到 BankRomSlice / RomReader
// ============================================================================

function bankSlice(bankNum: number): BankRomSlice {
  const base = bankNum * PRG_BANK_SIZE;
  const data = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) {
    data[i] = (base + i < rom.prg.length) ? rom.prg[base + i] : 0xFF;
  }
  return {
    u8(offset: number) { return data[offset] ?? 0; },
    u16le(offset: number) { return (this.u8(offset)) | (this.u8(offset + 1) << 8); },
    data,
    romBase: base,
  };
}

function createRomReader(): RomReader {
  const totalPrgBanks = Math.floor(rom.prg.length / PRG_BANK_SIZE);
  return {
    bank(addr: number): BankRomSlice {
      const cpuAddr = addr & 0xFFFF;
      let bn: number;
      if (cpuAddr >= 0xE000) {
        bn = totalPrgBanks - 1; // last PRG bank ($E000-$FFFF)
      } else if (cpuAddr >= 0xC000) {
        bn = totalPrgBanks - 2; // second-last ($C000-$DFFF)
      } else if (cpuAddr >= 0xA000) {
        bn = bankA000;
      } else {
        bn = bank8000;
      }
      return bankSlice(bn);
    },
    u8(addr: number): number {
      return this.bank(addr).u8(addr & 0x1FFF);
    },
    u16le(addr: number): number {
      return this.bank(addr).u16le(addr & 0x1FFF);
    },
  };
}

// ============================================================================
// PPU Bridge — 拦截 GameContext.ram 写操作，同步到 PpuState
// ============================================================================

function createPpuBridge() {
  return function ppuWriteHandler(addr: number, val: number): void {
    const reg = addr & 0x2007;
    switch (reg) {
      case 0x2000: // PPUCTRL
        ppu.ctrl = val;
        ppu.t = (ppu.t & 0xF3FF) | ((val & 0x03) << 10);
        break;
      case 0x2001: // PPUMASK
        ppu.mask = val;
        break;
      case 0x2003: // OAMADDR
        ppu.oamAddr = val;
        break;
      case 0x2004: // OAMDATA
        ppu.oam[ppu.oamAddr] = val;
        ppu.oamAddr = (ppu.oamAddr + 1) & 0xFF;
        break;
      case 0x2005: // PPUSCROLL
        if (ppu.w === 0) {
          ppu.x = val & 0x07;
          ppu.t = (ppu.t & 0xFFE0) | ((val >> 3) & 0x1F);
          ppu.w = 1;
        } else {
          ppu.t = (ppu.t & 0x8C1F) | ((val & 0x07) << 12) | ((val & 0xF8) << 2);
          ppu.w = 0;
        }
        break;
      case 0x2006: // PPUADDR
        if (ppu.w === 0) {
          ppu.t = (ppu.t & 0x00FF) | ((val & 0x3F) << 8);
          ppu.w = 1;
        } else {
          ppu.t = (ppu.t & 0xFF00) | val;
          ppu.v = ppu.t;
          ppu.w = 0;
        }
        break;
      case 0x2007: // PPUDATA
        if ((ppu.v & 0x3F00) === 0x3F00) {
          // Palette write
          const _palIdx = (ppu.v & 0x1F) % 32;
          ppu.palette[_palIdx] = val;
          _paletteDirty = true; // deferred: markPaletteDirty in frameLoop
          _palWriteCount++;
        } else if ((ppu.v & 0x2000) === 0x0000) {
          // CHR RAM pattern table write ($0000-$1FFF)
          const chrAddr = ppu.v & 0x1FFF;
          if (chrAddr < CHR_RAM_SIZE) {
            chrRam[chrAddr] = val;
            tileCache.markDirty(chrAddr);
            // 诊断日志
            _chrDiag.writes++;
            if (val !== 0) {
              _chrDiag.nonZeroWrites++;
              if (_chrDiag.firstNonZeroAddr < 0) _chrDiag.firstNonZeroAddr = chrAddr;
              _chrDiag.lastNonZeroAddr = chrAddr;
            }
          }
        } else {
          // Nametable / VRAM write ($2000-$3EFF)
          const ntAddr = ppu.v & 0x07FF;
          ppu.vram[ntAddr] = val;
        }
        ppu.v = (ppu.v + ((ppu.ctrl & 0x04) ? 32 : 1)) & 0x7FFF;
        break;
    }
  };
}

function installPpuBridge() {
  const orig = ctx.ram.setU8.bind(ctx.ram);
  const bridge = createPpuBridge();
  ctx.ram.setU8 = (addr: number, val: number) => {
    orig(addr, val);
    if (addr >= 0x2000 && addr <= 0x2007) {
      bridge(addr, val);
    }
    // Track MMC3 bank writes
    if (addr === 0x8000) {
      mmc3.bankSelect = val & 0x07;
      mmc3.prgBankMode = (val >> 6) & 1;
      mmc3.chrBankMode = (val >> 7) & 1;
    } else if (addr === 0x8001) {
      const prevBank = mmc3.bankData[mmc3.bankSelect];
      mmc3.bankData[mmc3.bankSelect] = val;
      if (mmc3.bankSelect === 6) bank8000 = val;
      if (mmc3.bankSelect === 7) bankA000 = val;
      // ★ CHR bank 切换: 将新 bank 数据从 ROM 拷贝到 chrRam
      if (_fullChrRom && val !== prevBank) {
        applyChrBank(mmc3.bankSelect, val);
      }
    }
  };
}

/** 将 MMC3 CHR bank 数据从完整 CHR ROM 拷贝到 chrRam */
function applyChrBank(regIdx: number, bankVal: number): void {
  if (!_fullChrRom) return;
  const chrBankSize = mmc3.chrBankMode ? 0x0800 : 0x0400; // 2KB or 1KB
  const bankOffset = bankVal * chrBankSize;
  const end = Math.min(bankOffset + chrBankSize, _fullChrRom.length);
  if (bankOffset >= _fullChrRom.length) return;

  let dstBase: number;
  if (mmc3.chrBankMode) {
    // 2KB mode: reg 2→$0000, 3→$0800, 4→$1000, 5→$1800
    const map2k: Record<number, number> = { 2: 0x0000, 3: 0x0800, 4: 0x1000, 5: 0x1800 };
    dstBase = map2k[regIdx] ?? -1;
  } else {
    // 1KB mode: reg 0→$0000, 1→$0400, 2→$0800, 3→$0C00, 4→$1000, 5→$1400
    dstBase = regIdx * 0x0400;
    if (regIdx > 5) return; // reg 6/7 are PRG only in 1KB mode
  }
  if (dstBase < 0 || dstBase >= CHR_RAM_SIZE) return;

  let copied = 0;
  for (let i = 0; i < chrBankSize && (dstBase + i) < CHR_RAM_SIZE; i++) {
    const srcIdx = bankOffset + i;
    if (srcIdx >= _fullChrRom.length) break;
    const oldVal = chrRam[dstBase + i];
    const newVal = _fullChrRom[srcIdx];
    if (oldVal !== newVal) {
      chrRam[dstBase + i] = newVal;
      tileCache.markDirty(dstBase + i);
      copied++;
    }
  }
  if (frameCount <= 3 || copied > 0) {
    console.log('[chrBank] reg%d=%d (mode=%dKB) → chrRam[$%s..$%s] from ROM[$%s..$%s], copied=%d changed bytes',
      regIdx, bankVal, mmc3.chrBankMode ? 2 : 1,
      dstBase.toString(16).toUpperCase().padStart(4,'0'),
      (dstBase + chrBankSize - 1).toString(16).toUpperCase().padStart(4,'0'),
      bankOffset.toString(16).toUpperCase().padStart(4,'0'),
      (bankOffset + chrBankSize - 1).toString(16).toUpperCase().padStart(4,'0'),
      copied);
  }
}

// ============================================================================
// CPU 执行桥 — 根据 PC 查找并调用实际函数
// ============================================================================

/**
 * 从 ctx.cpu.PC 解析 bank 编号并调用对应 fns 函数
 * @returns 是否成功执行 (1=成功, 0=未找到)
 */
function execFromPC(_ctx: GameContext, _reader: RomReader): number {
  const pc = _ctx.cpu.PC;
  if (pc < 0x8000) return 0;

  const bankNum = resolveBank(pc, bank8000, bankA000);
  if (bankNum < 0) {
    console.warn('[exec] cannot resolve PC=$%s', pc.toString(16).toUpperCase());
    return 0;
  }

  const bank = getBank(bankNum);
  if (!bank?.fns) {
    console.warn('[exec] bank_%d not loaded for PC=$%s', bankNum, pc.toString(16).toUpperCase());
    return 0;
  }

  // 尝试精确匹配
  let addrKey = '$' + pc.toString(16).toUpperCase();
  let fn = bank.fns[addrKey];

  // RTS 跳转表技巧: 6502 用 PHA+RTS 跳转, RTS 使 PC=addr+1
  if (!fn) {
    addrKey = '$' + (pc + 1).toString(16).toUpperCase();
    fn = bank.fns[addrKey];
  }

  if (fn) {
    console.log('[exec] PC=$%s → bank_%d.%s', pc.toString(16).toUpperCase(), bankNum, addrKey);
    fn(_ctx, _reader);
    return 1;
  }

  console.warn('[exec] no fn at PC=$%s (+1=$%s) in bank_%d',
    pc.toString(16).toUpperCase(), (pc + 1).toString(16).toUpperCase(), bankNum);
  return 0;
}

// ============================================================================
// 帧循环 (60fps)
// ============================================================================

// NMI 模拟辅助: 处理显示列表 (将 $05E8 的 PPU 写操作执行到 PPU 桥)
// 诊断: 跟踪 processDisplayListEntries 被跳过的情况
let _dlSkipCount = 0;
let _dlBusyCount = 0;
function processDisplayListEntries(): void {
  // 读取 $0628 (DISPLAY_LIST_END): 非零表示有待处理数据
  const endFlag = ctx.ram.u8(0x0628);
  if (endFlag === 0) {
    // 仅每 60 帧报告一次避免刷屏
    if (++_dlSkipCount <= 3 || _dlSkipCount % 60 === 0) {
      console.log('[displayList] SKIP endFlag=0 (count=%d), $0629=%s',
        _dlSkipCount, ctx.ram.u8(0x0629).toString(16).toUpperCase());
    }
    return;
  }

  // 读取 $0629 (控制旗标): bit6=busy
  const ctrlFlag = ctx.ram.u8(0x0629);
  if (ctrlFlag & 0x40) {
    if (++_dlBusyCount <= 3 || _dlBusyCount % 60 === 0) {
      console.log('[displayList] BUSY endFlag=%d $0629=%s (count=%d)',
        endFlag, ctrlFlag.toString(16).toUpperCase(), _dlBusyCount);
    }
    return;
  }

  // 诊断: 跟踪 display list 写入的 PPU 地址范围
  let _dlChrWrites = 0, _dlNtWrites = 0, _dlPalWrites = 0;

  // 遍历 $05E8 区域的条目
  // 格式: [控制字节][PPU低字节][PPU高字节]... 0x00 结束
  let pos = 0;
  while (pos < endFlag) {
    const ctrl = ctx.ram.u8(0x05E8 + pos);
    if (ctrl === 0) break; // 终止符

    // ppuAttrTransfer 写的格式: ctrl=0x20, then dataLo(低), dataHi(高)
    // 写入 PPUADDR: 先写高字节(dataHi), 再写低字节(dataLo) — NES 2006 写入顺序
    if (ctrl === 0x20 && pos + 2 < endFlag) {
      const dataLo = ctx.ram.u8(0x05E9 + pos);
      const dataHi = ctx.ram.u8(0x05EA + pos);
      // 高字节先写 → 低字节后写
      ctx.ram.setU8(0x2006, dataHi);
      ctx.ram.setU8(0x2006, dataLo);
      pos += 3; // 跳过 3 字节表头

      // 后续是 palette 数据字节, 写到 PPUDATA
      while (pos < endFlag) {
        const data = ctx.ram.u8(0x05E8 + pos);
        if (data === 0) break; // 终止符
        const _addr = ppu.v & 0x3FFF;
        if ((_addr & 0x3F00) === 0x3F00) _dlPalWrites++;
        else if ((_addr & 0x2000) === 0x0000) _dlChrWrites++;
        else _dlNtWrites++;
        ctx.ram.setU8(0x2007, data);
        pos += 1;
      }
    } else {
      // 其他类型的显示列表条目 (每3字节+1数据)
      if (pos + 3 < endFlag) {
        const lo = ctx.ram.u8(0x05E9 + pos);
        const hi = ctx.ram.u8(0x05EA + pos);
        // 高字节先写 → 低字节后写
        ctx.ram.setU8(0x2006, hi);
        ctx.ram.setU8(0x2006, lo);
        const data = ctx.ram.u8(0x05EB + pos);
        const _addr = ppu.v & 0x3FFF;
        if ((_addr & 0x3F00) === 0x3F00) _dlPalWrites++;
        else if ((_addr & 0x2000) === 0x0000) _dlChrWrites++;
        else _dlNtWrites++;
        ctx.ram.setU8(0x2007, data);
        pos += 4;
      } else {
        break;
      }
    }
  }

  // 清空显示列表标志
  ctx.ram.setU8(0x0628, 0);
  ctx.ram.setU8(0x0629, 0);

  // 诊断: 显示列表目标地址分布
  if (_dlChrWrites + _dlPalWrites + _dlNtWrites > 0) {
    // 检查写入后的 nametable / palette 状态
    let _ntNz = 0, _palNz = 0;
    for (let i = 0; i < 0x03C0; i++) { if (ppu.vram[i]) _ntNz++; }
    for (let i = 0; i < 32; i++) { if ((ppu.palette[i] & 0x3F) !== 0x0F) _palNz++; }
    console.log('[displayList] CHR=%d NT=%d PAL=%d (total=%d) | vram[0..3BF] nz=%d | pal non-0F=%d/32',
      _dlChrWrites, _dlNtWrites, _dlPalWrites, _dlChrWrites + _dlNtWrites + _dlPalWrites,
      _ntNz, _palNz);
  }
}

function frameLoop(): void {
  if (!running) return;
  frameCount++;
  const _fc = frameCount;

  // ★ 重置 per-frame 诊断计数器
  _palWriteCount = 0;

  // VBlank 开始: 触发 NMI
  ppu.status |= 0x80;

  const reader = createRomReader();

  // ═══════════════════════════════════════════════════════════
  // ★ NMI 处理器 (bank_02 原版翻译, ASM $8000+)
  //
  // NMI 链: $8000(精灵DMA) → $800A(显示列表→PPU,内链$804D→$8073滚动)
  //                        → $8096(IRQ+CHR bank)
  // 手柄 ($80D7/$8116) 由平台层单独处理
  // 子状态分派 ($8160) 暂时跳过 (依赖未翻译的跨bank调用)
  // ═══════════════════════════════════════════════════════════

  // 1. 精灵 OAM DMA ($8000): $0468 → $0200
  nmiBank.fns['$8000']?.(ctx, reader);

  // 2. 显示列表 → PPU ($800A, 内链到 $804D → $8073 滚动设定)
  nmiBank.fns['$800A']?.(ctx, reader);

  // 3. IRQ 设置 + CHR bank 切换 ($8096)
  nmiBank.fns['$8096']?.(ctx, reader);

  // 诊断: NMI 后 $0628 (display list 是否被正确消费)
  if (_fc <= 3) {
    const dlEnd = ctx.ram.u8(0x0628);
    console.log('[NMI] after bank_02 NMI: $0628=%d $0629=%s $26=%d $27=%d $4A=%d $4B=%d',
      dlEnd,
      ctx.ram.u8(0x0629).toString(16).toUpperCase(),
      ctx.ram.u8(0x26), ctx.ram.u8(0x27),
      ctx.ram.u8(0x4A), ctx.ram.u8(0x4B));
  }

  // ═══════════════════════════════════════════════════════════
  // ★ 主游戏逻辑: bank_00 dispatch → 场景状态机 → 写显示列表
  // ═══════════════════════════════════════════════════════════
  if (bank8000 === 0) {
    const bank0 = allBanks[0];
    // ★ jsNes 对齐: F0=RESET(ff), F1=PPU预热(不变), F2=首次dispatch
    //   跳过 F1(即 _fc=1) 的 bank_00 逻辑, 此时 $27=ff, dispatch 会走
    //   JUMP_TABLE[5]→sceneLoopEntry 自动设置 $27=0
    if (_fc <= 1) {
      // PPU warmup frame: NMI only, no bank_00 dispatch
    } else {
      bank0?.dispatch(ctx, reader);
    }

    // ★ 诊断: 每帧 dispatch 后 dump $062A / $48-$4B / $26-$27
    if (_fc <= 10) {
      const palDump = [];
      for (let i = 0; i < 16; i++) palDump.push(ctx.ram.u8(0x062A + i).toString(16).padStart(2, '0'));
      const valid = palDump.map(h => parseInt(h, 16)).filter(v => v !== 0 && v !== 0x0F).length;
      console.log('[frame %d] POST-dispatch: $26=%d $27=%d $48=%d $49=%d $4A=%d $4B=%d $0628=%d valid=%d $062A[0..15]=[%s]',
        _fc,
        ctx.ram.u8(0x26), ctx.ram.u8(0x27),
        ctx.ram.u8(0x48), ctx.ram.u8(0x49), ctx.ram.u8(0x4A), ctx.ram.u8(0x4B),
        ctx.ram.u8(0x0628), valid, palDump.join(' '));
    }
  }

  // ═══════════════════════════════════════════════════════════
  // ★ PPU 同步 + 渲染
  // ═══════════════════════════════════════════════════════════

  // 同步 OAM: 从 $0200 复制到 PPU OAM
  for (let i = 0; i < OAM_SIZE; i++) {
    ppu.oam[i] = ctx.ram.u8(0x0200 + i);
  }

  // ═══════════════════════════════════════════════════════════
  // ★ 强制同步 $062A (ATTR_BUF) → ppu.palette
  //
  // 生产者: 场景初始化 (scenePreProcess) 和 bytecode 解释器
  //   产出数据到 $062A，通过 ppuAttrTransfer 写入 $2006/$2007
  //
  // 消费者: renderPpuFrame → renderBackground → TileCache.getTile
  //   读取 ppu.palette 渲染 tile 像素
  //
  // ★ 智能过滤: scene 状态机每次转换都重新调用 scenePreProcess，
  //   某些状态下的 ROM palette 数据为空（全 $00/$0F）。
  //   只有 $062A 包含非零/非$0F 数据时才更新 ppu.palette，
  //   保留上一个有效的调色板避免画面闪烁。
  // ═══════════════════════════════════════════════════════════
  {
    let _valid = 0;  // 有效 palette entry 计数 (非 $00 且非 $0F)
    const _newPal = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      const v = ctx.ram.u8(0x062A + i);
      _newPal[i] = v;
      if (v !== 0 && v !== 0x0F) _valid++;
    }
    // 只有 $062A 含有效 palette 数据时才更新
    // (至少 2 个非 0 且非 $0F 的 entry 视为有效的调色板)
    if (_valid >= 2) {
      let _changed = false;
      for (let i = 0; i < 32; i++) {
        if (ppu.palette[i] !== _newPal[i]) { _changed = true; break; }
      }
      if (_changed) {
        for (let i = 0; i < 32; i++) ppu.palette[i] = _newPal[i];
        tileCache.markPaletteDirty();
        _paletteDirty = false;
      }
      if (_fc <= 5 || _fc % 60 === 0) {
        console.log('[frame %d] PAL sync: $062A→ppu.palette valid=%d/32 [0..7]=[%s]',
          _fc, _valid,
          Array.from({length:8},(_,i)=>'$'+ppu.palette[i].toString(16).padStart(2,'0')).join(','));
      }
    } else {
      if (_fc <= 5) {
        console.log('[frame %d] PAL skip: $062A valid=%d/32 (not enough valid entries)',
          _fc, _valid);
      }
    }
    // ★ 如果 PPU 桥接直接写了调色板 (ppu.palette[x]=val)，但 $062A 未变化，
    //   PAL sync 不会进入 _changed 分支。此时需单独刷新 TileCache。
    if (_paletteDirty) {
      tileCache.markPaletteDirty();
      _paletteDirty = false;
      if (_fc <= 5) {
        console.log('[frame %d] PAL dirty: bridge-written palette, invalidating tile cache', _fc);
      }
    }
  }

  // 启用渲染 (使用 NMI 已写入的 PPUMASK 镜像值, 而不是强制 0x1E)
  const _ppuMaskMir = ctx.ram.u8(0x21);
  if (_ppuMaskMir !== 0) {
    ppu.mask = _ppuMaskMir;
  } else {
    ppu.mask = 0x1E; // fallback: show BG + sprites
  }

  // 诊断: 检查 CHR RAM 是否全零
  if (_fc <= 3 || _fc % 60 === 0) {
    let chrNonZeroCount = 0;
    for (let i = 0; i < CHR_RAM_SIZE; i++) {
      if (chrRam[i] !== 0) chrNonZeroCount++;
    }
    console.log('[frame %d] CHR DIAG: bridge writes=%d (nonZero=%d, src[$%s..$%s]) | chrRam nonZero bytes=%d/%d',
      _fc, _chrDiag.writes, _chrDiag.nonZeroWrites,
      (_chrDiag.firstNonZeroAddr >= 0 ? _chrDiag.firstNonZeroAddr.toString(16).toUpperCase() : '-'),
      (_chrDiag.lastNonZeroAddr >= 0 ? _chrDiag.lastNonZeroAddr.toString(16).toUpperCase() : '-'),
      chrNonZeroCount, CHR_RAM_SIZE);
  }

  // 渲染到 Canvas
  renderPpuFrame(ppu, tileCache, platform.canvas);

  // VBlank 结束
  ppu.status &= 0x7F;

  // Joypad 输入处理
  const prevJoy = ctx.ram.u8(0x1B) as number;
  ctx.ram.setU8(0x1E, prevJoy);
  const newJoy = platform.getInput();
  ctx.ram.setU8(0x1B, newJoy);
  ctx.ram.setU8(0x1C, (newJoy ^ prevJoy) & newJoy);

  // ★ COMPARE: 前 3 帧 dump 关键状态（跟 jsnes 同帧手动对比）
  if (_fc <= 3) {
    const ntId = ppu.ctrl & 0x03;
    const ntBase = (ntId << 10) & 0x07FF;
    // Display list buffer: $05E8-$0629
    const dlEnd = ctx.ram.u8(0x0628);
    let dlHex = '';
    for (let i = 0; i < Math.min(dlEnd, 64); i++) {
      dlHex += ctx.ram.u8(0x05E8 + i).toString(16).padStart(2, '0');
      if ((i + 1) % 16 === 0) dlHex += ' ';
    }
    // VRAM nametable first 128 bytes
    let ntHex = '';
    for (let i = 0; i < 128; i++) {
      ntHex += ppu.vram[(ntBase + i) & 0x07FF].toString(16).padStart(2, '0');
      if ((i + 1) % 32 === 0) ntHex += ' ';
    }
    // Palette 32 bytes
    let palHex = '';
    for (let i = 0; i < 32; i++) {
      palHex += ppu.palette[i].toString(16).padStart(2, '0');
      if ((i + 1) % 8 === 0) palHex += ' ';
    }
    // CHR RAM first 64 bytes
    let chrHex = '';
    for (let i = 0; i < 64; i++) {
      chrHex += chrRam[i].toString(16).padStart(2, '0');
      if ((i + 1) % 16 === 0) chrHex += ' ';
    }
    console.log('[cmp %d] DL:$0628=%d $0629=%s\n  DL:[%s]\n  NT[%d]:[%s]\n  PAL:[%s]\n  CHR:[%s]',
      _fc, dlEnd, ctx.ram.u8(0x0629).toString(16).toUpperCase(),
      dlHex || '(empty)',
      ntId, ntHex, palHex, chrHex);
  }

  // 每 60 帧打一次日志
  if (_fc <= 3 || _fc % 60 === 0) {
    const palCacheSz = getCacheStats().size;
    const pal0_3 = Array.from({length:4},(_,i)=>ppu.palette[i].toString(16).padStart(2,'0')).join(' ');
    console.log('[frame %d] bank8000=%d, jumpIdx($27)=%d, sceneState($26)=%d, nmiTrigger($E0)=%d, ppuCtrl=%s, joypad=0x%s | pal[0..3]=%s $48=%d $49=%d $4A=%d $4B=%d palWrites=%d palCache=%d',
      _fc, bank8000, ctx.ram.u8(0x27), ctx.ram.u8(0x26),
      ctx.ram.u8(0xE0), ppu.ctrl.toString(16), newJoy.toString(16),
      pal0_3,
      ctx.ram.u8(0x48), ctx.ram.u8(0x49), ctx.ram.u8(0x4A), ctx.ram.u8(0x4B),
      _palWriteCount, palCacheSz);
  }

  // 请求下一帧
  animId = platform.requestFrame(frameLoop);
}

// ============================================================================
// 初始化
// ============================================================================

async function init(): Promise<void> {
  console.log('[init] Building ROM...');
  rom = buildRom();
  console.log('[init] ROM built: PRG banks=%d, CHR RAM=%d bytes', rom.prg.length / PRG_BANK_SIZE, CHR_RAM_SIZE);

  // ★ 加载完整 CHR ROM 数据到 _fullChrRom (用于 MMC3 CHR bank 切换)
  //   iNES: header=16, PRG=16×16KB=262144, CHR=16×8KB=131072
  //   chrRam 不再预加载 — 由 applyChrBank 在 MMC3 bank 切换时动态拷贝
  try {
    const fullRom = romUint8Array();
    const chrOffset = 16 + rom.prg.length; // 16 header + PRG data
    const chrLen = fullRom.length - chrOffset;
    if (chrLen > 0) {
      _fullChrRom = new Uint8Array(chrLen);
      for (let i = 0; i < chrLen; i++) _fullChrRom[i] = fullRom[chrOffset + i];
      let nz = 0;
      for (let i = 0; i < chrLen; i++) if (_fullChrRom[i] !== 0) nz++;
      console.log('[init] Full CHR ROM loaded: %d bytes (nonZero=%d)', chrLen, nz);
    } else {
      console.warn('[init] No CHR ROM data found');
    }
  } catch (e) {
    console.warn('[init] Failed to load CHR ROM:', e);
  }

  // 初始化调色板缓存 ($9EA2 lookup 表)
  initPaletteCache(bank00);
  console.log('[init] Palette cache initialized (bank_00 $9EA2 lookup)');

  // PPU 状态
  ppu = {
    ctrl: 0, mask: 0, status: 0, oamAddr: 0,
    scroll: 0, addr: 0,
    v: 0, t: 0, x: 0, w: 0,
    vram: new Uint8Array(VRAM_SIZE),
    palette: new Uint8Array(32),
    oam: new Uint8Array(OAM_SIZE),
    oamDma: new Uint8Array(OAM_SIZE),
    frameBuffer: new Uint32Array(256 * 240),
  };
  console.log('[init] PPU state created');

  // MMC3 状态
  mmc3 = {
    bankSelect: 0,
    bankData: [0, 0, 0, 0, 0, 0, 0, 0],
    prgBankMode: 0, chrBankMode: 1, // ★ 开场动画使用 2KB CHR bank 模式
    mirroring: 0, prgRamProtect: false,
    irqLatch: 0, irqCounter: 0,
    irqReload: false, irqEnable: false,
  };

  // TileCache (预渲染 tile 像素缓存, 复用 chrRam)
  tileCache = createTileCache(chrRam);

  // ★ 初始化 CHR bank: 将 bank 0 拷贝到所有 CHR 窗口
  //   (NMI $8096 会在第一帧用 ZP $9E-$A1 的实际值覆盖)
  if (_fullChrRom) {
    applyChrBank(2, 0); // CHR $0000-$07FF
    applyChrBank(3, 0); // CHR $0800-$0FFF
    applyChrBank(4, 0); // CHR $1000-$17FF
    applyChrBank(5, 0); // CHR $1800-$1FFF
    console.log('[init] Initial CHR banks applied from ROM');
  }

  // GameContext
  ctx = new GameContext();
  console.log('[init] GameContext created, jumpIdx($27)=%d, sceneState($26)=%d, sceneBank($25)=%d',
    ctx.ram.u8(0x27), ctx.ram.u8(0x26), ctx.ram.u8(0x25));

  // 初始 MMC3 bank: $8000 → bank 0, $A000 → bank 1
  bank8000 = 0;
  bankA000 = 1;
  ctx.ram.setU8(0x24, bank8000);
  ctx.ram.setU8(0x25, bankA000);

  // 安装 PPU 桥接
  installPpuBridge();

  // 启动: 调用 bank_31 RESET ($FFF0)
  const reader = createRomReader();
  const bank31 = allBanks[31];
  console.log('[init] bank_31 loaded: %s, fns keys=%s, has $FFF0=%s',
    !!bank31,
    bank31?.fns ? Object.keys(bank31.fns).slice(0,5).join(',') : 'NONE',
    !!bank31?.fns?.['$FFF0']);
  if (bank31?.fns?.['$FFF0']) {
    bank31.fns['$FFF0'](ctx, reader);
    console.log('[init] RESET done, PC=%s, bank8000=%d',
      '$' + ctx.cpu.PC.toString(16).toUpperCase(), bank8000);
    // ★ 补: resetHandler 只设 PC=$C503 不执行 bank_30 初始化
    const didExec = execFromPC(ctx, reader);
    console.log('[init] execFromPC result=%d, PC=%s', didExec,
      '$' + ctx.cpu.PC.toString(16).toUpperCase());
  } else {
    bank31?.dispatch(ctx, reader);
    execFromPC(ctx, reader);
  }

  // 注入默认调色板
  const colors = [
    0x0F, 0x2C, 0x11, 0x30, 0x0F, 0x16, 0x27, 0x18,
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F,
    0x0F, 0x01, 0x21, 0x31, 0x0F, 0x0F, 0x0F, 0x0F,
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F,
  ];
  for (let i = 0; i < 32; i++) ppu.palette[i] = colors[i];

  // ★★★ 修复: 预填充 CHR RAM tile 图案 — ppuReset 只清 VRAM 不动 CHR RAM ★★★
  // 原因: ppuInitTransfer($C503) 是桩代码，未从 ROM 加载 CHR 数据
  // TODO: 修复 bank_30 $C503 从 PRG ROM 正确加载 CHR pattern table
  {
    // tile 1: 纯色条纹 (plane 0 = 0xFF, plane 1 = 0x00 → color index 1 = light blue)
    for (let row = 0; row < 8; row++) {
      chrRam[16 + row] = 0xFF;        // plane 0
      chrRam[16 + 8 + row] = 0x00;    // plane 1
    }
    // tile 2: 棋盘格
    for (let row = 0; row < 8; row++) {
      chrRam[32 + row] = (row & 1) ? 0xAA : 0x55;      // plane 0
      chrRam[32 + 8 + row] = (row & 1) ? 0x55 : 0xAA;  // plane 1
    }
    // tile 3: 竖条纹
    for (let row = 0; row < 8; row++) {
      chrRam[48 + row] = 0xF0;       // plane 0
      chrRam[48 + 8 + row] = 0x0F;   // plane 1
    }
    // tile 4: 斜线
    for (let row = 0; row < 8; row++) {
      chrRam[64 + row] = 0x80 >> row;       // plane 0
      chrRam[64 + 8 + row] = (0x01 << row); // plane 1
    }
    console.log('[init] CHR RAM pre-filled: tiles 1-4 have test patterns');
  }

  console.log('[init] Complete. vram size=%d, palette[0-3]=[%s]',
    VRAM_SIZE, [ppu.palette[0],ppu.palette[1],ppu.palette[2],ppu.palette[3]].join(','));
  platform.setStatus?.('ROM 已初始化 (48 banks)');
}

// ============================================================================
// 公开 API
// ============================================================================

/** 创建并启动游戏 */
export async function startGame(p: GamePlatform): Promise<void> {
  console.log('[main] startGame called, platform=%s', typeof p.canvas);
  // ★ 防止重复注册 frameLoop 回调（如微信小程序热启动）
  if (animId !== null) {
    console.warn('[main] startGame: already running (animId=%s), stopping first', animId);
    stopGame();
  }
  platform = p;
  await init();
  running = true;
  console.log('[main] Starting frame loop...');
  animId = platform.requestFrame(frameLoop);
  console.log('[main] Frame loop started, animId=%s', animId);
}

/** 暂停游戏 */
export function stopGame(): void {
  running = false;
  if (animId !== null) {
    platform.cancelFrame(animId);
    animId = null;
  }
  platform.setStatus?.('已停止');
}

/** 重置游戏 */
export async function resetGame(): Promise<void> {
  stopGame();
  await init();
  running = true;
  animId = platform.requestFrame(frameLoop);
}

/** 获取当前帧数 */
export function getFrameCount(): number {
  return frameCount;
}

/** 获取运行状态 */
export function isRunning(): boolean {
  return running;
}


