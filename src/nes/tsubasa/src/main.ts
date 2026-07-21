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
import { ROM as bank00 } from './disasm/banks/_romdata/bank_00_data';
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
let tileCache: TileCache;

let running = false;
let animId: number | any = null;
let frameCount = 0;
let platform: GamePlatform;

// 诊断: CHR RAM 写入计数
const _chrDiag = { writes: 0, nonZeroWrites: 0, firstNonZeroAddr: -1, lastNonZeroAddr: -1 };

// MMC3 bank 映射 (运行时可变)
let bank8000 = 0;
let bankA000 = 1;

// ============================================================================
// ROM 构建
// ============================================================================

function buildRom(): NesRom {
  // 从 bank_XX.json 加载 PRG bank 数据
  const prg = new Uint8Array(TOTAL_PRG_BANKS * PRG_BANK_SIZE);
  for (let i = 0; i < TOTAL_PRG_BANKS; i++) {
    prg.set(_romBanks[i], i * PRG_BANK_SIZE);
  }
  // CHR RAM (8KB, 游戏运行时通过 PPU 写入)
  chrRam = new Uint8Array(CHR_RAM_SIZE);

  return {
    header: {
      prgSize: TOTAL_PRG_BANKS / 2, // 16KB units → 24
      chrSize: 0,                     // CHR RAM (no CHR ROM)
      mapper: 4,                      // MMC3
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
  return {
    bank(addr: number): BankRomSlice {
      const cpuAddr = addr & 0xFFFF;
      let bn: number;
      if (cpuAddr >= 0xE000) {
        bn = TOTAL_PRG_BANKS - 1; // last PRG bank ($E000-$FFFF)
      } else if (cpuAddr >= 0xC000) {
        bn = TOTAL_PRG_BANKS - 2; // second-last ($C000-$DFFF)
      } else if (cpuAddr >= 0xA000) {
        // 从 RAM $25 读取当前 $A000-$BFFF 映射的 bank
        // (这样 $C4B9 切换 bank 后, ROM 读操作能立即生效)
        bn = ctx.ram.u8(0x25);
      } else {
        // 从 RAM $24 读取当前 $8000-$9FFF 映射的 bank
        bn = ctx.ram.u8(0x24);
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
          // Palette write — 缓存无需失效 (渲染时按当前 palette 查询)
          ppu.palette[(ppu.v & 0x1F) % 32] = val;
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
      mmc3.bankData[mmc3.bankSelect] = val;
      if (mmc3.bankSelect === 6) bank8000 = val;
      if (mmc3.bankSelect === 7) bankA000 = val;
    }
  };
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
function processDisplayListEntries(): void {
  // 读取 $0628 (DISPLAY_LIST_END): 非零表示有待处理数据
  const endFlag = ctx.ram.u8(0x0628);
  if (endFlag === 0) return;

  // 读取 $0629 (控制旗标): bit6=busy
  const ctrlFlag = ctx.ram.u8(0x0629);
  if (ctrlFlag & 0x40) return; // 忙, 跳过

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
    console.log('[displayList] CHR=%d NT=%d PAL=%d (total=%d)',
      _dlChrWrites, _dlNtWrites, _dlPalWrites, _dlChrWrites + _dlNtWrites + _dlPalWrites);
  }
}

function frameLoop(): void {
  if (!running) return;
  frameCount++;
  const _fc = frameCount;

  // VBlank 开始: 触发 NMI
  ppu.status |= 0x80;

  const reader = createRomReader();

  // ★ 执行 NMI 逻辑: bank_00 dispatch 读取 $27 (jump index) → 调用场景处理器
  if (bank8000 === 0) {
    const bank0 = allBanks[0];
    if (_fc <= 1) {
      // 第一帧: 通过 sceneLoopEntry 调用 opening 初始化
      // (sceneLoopEntry 内部检查 $26 状态, 避免重复初始化)
      const loopEntry = bank0?.fns?.['$8017'];
      if (loopEntry) {
        console.log('[frame] calling sceneLoopEntry for opening init');
        try { loopEntry(ctx, reader); } catch (e) { console.error('[frame] sceneLoopEntry error:', e); }
      }
      // 处理显示列表 (scenePreProcess 写入了 palette 数据到 display list)
      processDisplayListEntries();
    } else {
      // 后续帧: 正常 dispatch
      bank0?.dispatch(ctx, reader);
      // 处理 dispatch 中产生的显示列表
      processDisplayListEntries();
    }
  }

  // ★ NMI 硬件模拟: 精灵 DMA — 将 OAM 缓冲区 ($0468) 复制到 DMA 页 ($0200)
  for (let i = 0; i < OAM_SIZE; i++) {
    ctx.ram.setU8(0x0200 + i, ctx.ram.u8(0x0468 + i));
  }

  // 同步 OAM: 从 $0200 复制到 PPU OAM
  for (let i = 0; i < OAM_SIZE; i++) {
    ppu.oam[i] = ctx.ram.u8(0x0200 + i);
  }

  // 启用渲染
  ppu.mask = 0x1E; // show BG + sprites

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

  // ★★★ 修复: 填充 nametable — ppuReset 清零 VRAM 后重新写入可见 tile ★★★
  // TODO: 彻底修复 ppuInitTransfer 后移除这段代码
  if (_fc <= 60) {
    // 填充 nametable (32×30 = 960 tiles)
    for (let row = 0; row < 30; row++) {
      const tileId = 1 + (row & 3); // tile 1-4 循环
      for (let col = 0; col < 32; col++) {
        ppu.vram[row * 32 + col] = tileId;
      }
    }
    // 填充 attribute table (64 bytes, 全用 palette 0)
    for (let i = 0x03C0; i < 0x0400; i++) {
      ppu.vram[i] = 0x00;
    }
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

  // 每 60 帧打一次日志
  if (_fc <= 3 || _fc % 60 === 0) {
    console.log('[frame %d] bank8000=%d, jumpIdx($27)=%d, sceneState($26)=%d, nmiTrigger($E0)=%d, ppuCtrl=%s, joypad=0x%s',
      _fc, bank8000, ctx.ram.u8(0x27), ctx.ram.u8(0x26),
      ctx.ram.u8(0xE0), ppu.ctrl.toString(16), newJoy.toString(16));
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
  console.log('[init] ROM built: PRG banks=%d, CHR RAM=%d bytes', TOTAL_PRG_BANKS, CHR_RAM_SIZE);

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
    prgBankMode: 0, chrBankMode: 0,
    mirroring: 0, prgRamProtect: false,
    irqLatch: 0, irqCounter: 0,
    irqReload: false, irqEnable: false,
  };

  // TileCache (预渲染 tile 像素缓存, 复用 chrRam)
  tileCache = createTileCache(chrRam);

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
