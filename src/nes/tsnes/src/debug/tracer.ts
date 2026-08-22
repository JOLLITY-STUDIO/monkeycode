/**
 * Tracer — 可选的 CPU 指令级 trace + 硬件寄存器写入跟踪
 *
 * 功能:
 *   1. CPU 指令级 trace (类似 Mesen trace)
 *   2. 硬件寄存器写入跟踪 (按类别可选):
 *      - OAM: $2003/$2004/$4014 (精灵内存)
 *      - NT/属性表: $2006/$2007 写入 $2000-$2FFF (含镜像)
 *      - 调色板: $2006/$2007 写入 $3F00-$3FFF
 *      - PT (pattern table): $2006/$2007 写入 $0000-$1FFF (VRAM)
 *      - 音频: $4000-$4017 (APU 寄存器)
 *      - PPU 控制寄存器: $2000-$2002 (PPUCTRL/PPUMASK/PPUSTATUS)
 *
 * 格式参考 Mesen: `i{count}  ${bank}:{pc}: {bytes} {mnemonic} {operand} A:{a} X:{x} Y:{y} S:{s} P:{flags}`
 *
 * 用法:
 *   const nes = new NES({ ... });
 *   // 只跟踪 CPU 指令
 *   nes.enableTrace({ outputFile: 'trace.log', maxLines: 10000 });
 *   // 只跟踪 OAM 写入
 *   nes.enableTrace({ outputFile: 'oam.log', trackOAM: true, trackCPU: false });
 *   // 跟踪 NT + 调色板
 *   nes.enableTrace({ outputFile: 'nt_pal.log', trackNT: true, trackPalette: true, trackCPU: false });
 *   nes.frame();
 *   nes.disableTrace();
 */

import * as fs from 'fs';

/** 指令名表 (INS_ 常量 → 助记符) */
const INS_NAMES: string[] = [
  'ADC', 'AND', 'ASL', 'BCC', 'BCS', 'BEQ', 'BIT', 'BMI', 'BNE', 'BPL',
  'BRK', 'BVC', 'BVS', 'CLC', 'CLD', 'CLI', 'CLV', 'CMP', 'CPX', 'CPY',
  'DEC', 'DEX', 'DEY', 'EOR', 'INC', 'INX', 'INY', 'JMP', 'JSR', 'LDA',
  'LDX', 'LDY', 'LSR', 'NOP', 'ORA', 'PHA', 'PHP', 'PLA', 'PLP', 'ROL',
  'ROR', 'RTI', 'RTS', 'SBC', 'SEC', 'SED', 'SEI', 'STA', 'STX', 'STY',
  'TAX', 'TAY', 'TSX', 'TXA', 'TXS', 'TYA', 'ALR', 'ANC', 'ARR', 'AXS',
  'LAX', 'SAX', 'DCP', 'ISC', 'RLA', 'RRA', 'SLO', 'SRE', 'SKB', 'IGN',
  '??', 'SHA', 'SHS', 'SHY', 'SHX', 'LAE', 'ANE', 'LXA',
];

export interface TraceOptions {
  // ── 输出 ──
  /** 输出文件路径 (不设则用 callback) */
  outputFile?: string;
  /** 每行回调 (当 outputFile 未设时使用) */
  callback?: (line: string) => void;
  /** 最多记录行数 (默认无限制) */
  maxLines?: number;

  // ── CPU 指令跟踪 ──
  /** 跟踪 CPU 指令 (默认 true) */
  trackCPU?: boolean;
  /** 只记录 PC 在此范围内的指令 [start, end) */
  addressRange?: [number, number];
  /** 只记录指定 16KB bank (Mesen 格式, 0-15) */
  bankFilter?: number;
  /** 是否记录操作数详情 (默认 true) */
  detailOperand?: boolean;

  // ── 硬件寄存器写入跟踪 ──
  /** 跟踪 OAM 写入 ($2003/$2004/$4014) */
  trackOAM?: boolean;
  /** 跟踪 NT/属性表写入 ($2006/$2007 → $2000-$2FFF) */
  trackNT?: boolean;
  /** 跟踪调色板写入 ($2006/$2007 → $3F00-$3FFF) */
  trackPalette?: boolean;
  /** 跟踪 pattern table 写入 ($2006/$2007 → $0000-$1FFF) */
  trackPT?: boolean;
  /** 跟踪音频寄存器写入 ($4000-$4017) */
  trackAudio?: boolean;
  /** 跟踪 PPU 控制寄存器写入 ($2000-$2002) */
  trackPPURegs?: boolean;
  /** 跟踪 MMC3 bank 切换 ($8000/$8001 PRG + $A000/$A001 CHR/PRG-RAM) */
  trackMMC3?: boolean;
}

interface TraceContext {
  /** CPU 引用 (弱引用, 避免循环) */
  cpu: any;
  /** NES 引用 (用于查 bank 映射) */
  nes: any;
  /** 当前指令计数 */
  count: number;
  /** 已输出行数 */
  lines: number;
  /** 输出流 */
  stream: fs.WriteStream | null;
  /** 选项 */
  opts: Required<Pick<TraceOptions, 'trackCPU' | 'detailOperand'>> & TraceOptions;
  /** 是否已停止 */
  stopped: boolean;
  /** PPU $2006 地址锁存 (高字节) */
  ppuAddrLatch: number;
  /** PPU $2006 当前地址 (双写后) */
  ppuAddr: number;
  /** MMC3 当前选中的寄存器号 ($8000 写入后记住) */
  _mmc3Reg: number;
}

/**
 * 格式化标志位字符串 (Mesen 格式: NvUbdizc)
 */
function formatFlags(status: number): string {
  const n = (status >> 7) & 1 ? 'N' : 'n';
  const v = (status >> 6) & 1 ? 'V' : 'v';
  const u = (status >> 5) & 1 ? 'U' : 'u';
  const b = (status >> 4) & 1 ? 'B' : 'b';
  const d = (status >> 3) & 1 ? 'D' : 'd';
  const i = (status >> 2) & 1 ? 'I' : 'i';
  const z = (status >> 1) & 1 ? 'Z' : 'z';
  const c = status & 1 ? 'C' : 'c';
  return n + v + u + b + d + i + z + c;
}

/**
 * 计算 Mesen 16KB bank 编号 (从 CPU 地址)
 * MMC3: $8000-$9FFF = R6, $A000-$BFFF = R7, $C000-$DFFF = 固定 bank30, $E000-$FFFF = 固定 bank31
 * Mesen 16KB bank = 8KB block / 2
 */
function getMesenBank(cpu: any, nes: any, addr: number): number {
  if (addr < 0x8000) return 0;
  const mmap = nes.mmap;
  if (!mmap || !mmap.prgBankMap) return 0;
  let block8k: number;
  if (addr < 0xa000) {
    block8k = mmap.prgBankMap['8000'] ?? 0;
  } else if (addr < 0xc000) {
    block8k = mmap.prgBankMap['A000'] ?? 0;
  } else if (addr < 0xe000) {
    block8k = mmap.prgBankMap['C000'] ?? 30;
  } else {
    block8k = mmap.prgBankMap['E000'] ?? 31;
  }
  return Math.floor(block8k / 2);
}

/**
 * 格式化单条指令的 trace 行
 */
function formatInstruction(
  ctx: TraceContext,
  instrPC: number,
  opcode: number,
  opinfo: any,
  opbytes: number[],
): string {
  const cpu = ctx.cpu;
  const a = cpu.REG_ACC & 0xff;
  const x = cpu.REG_X & 0xff;
  const y = cpu.REG_Y & 0xff;
  const s = cpu.REG_SP & 0xff;
  const status = cpu.getStatus();
  const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);

  const bytesStr = opbytes
    .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');

  const insName = INS_NAMES[opinfo.ins] ?? '???';

  let operandStr = '';
  if (opinfo.size > 1) {
    const operandBytes = opbytes.slice(1);
    if (operandBytes.length === 1) {
      operandStr = '#$' + operandBytes[0].toString(16).toUpperCase().padStart(2, '0');
    } else if (operandBytes.length === 2) {
      const val = operandBytes[0] | (operandBytes[1] << 8);
      operandStr = '$' + val.toString(16).toUpperCase().padStart(4, '0');
    }
  }

  return (
    `i${ctx.count}  ` +
    `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
    instrPC.toString(16).toUpperCase().padStart(4, '0') + ': ' +
    bytesStr.padEnd(8, ' ') + ' ' +
    insName + ' ' + operandStr +
    ' A:' + a.toString(16).toUpperCase().padStart(2, '0') +
    ' X:' + x.toString(16).toUpperCase().padStart(2, '0') +
    ' Y:' + y.toString(16).toUpperCase().padStart(2, '0') +
    ' S:' + s.toString(16).toUpperCase().padStart(2, '0') +
    ' P:' + formatFlags(status)
  );
}

/** 格式化硬件寄存器写入行 */
function formatHwWrite(
  ctx: TraceContext,
  category: string,
  addr: number,
  val: number,
  extra?: string,
): string {
  const cpu = ctx.cpu;
  const instrPC = cpu._instrPC ?? 0;
  const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);
  const pcStr = `$${mesenBank.toString(16).toUpperCase().padStart(2, '0')}:` +
    instrPC.toString(16).toUpperCase().padStart(4, '0');
  const addrStr = '$' + addr.toString(16).toUpperCase().padStart(4, '0');
  const valStr = '#$' + (val & 0xff).toString(16).toUpperCase().padStart(2, '0');
  let line = `[${category}] i${ctx.count} ${pcStr} STA ${addrStr} = ${valStr}`;
  if (extra) line += ' ' + extra;
  return line;
}

/** NT 镜像地址 → NT 编号 + 偏移 */
function ntMirrorInfo(addr: number): string {
  const vramAddr = addr & 0x2fff; // 去掉镜像位
  const ntIdx = (vramAddr >> 10) & 3;
  const row = (vramAddr >> 5) & 0x1f;
  const col = vramAddr & 0x1f;
  const isAttr = (vramAddr & 0x3c0) === 0x3c0;
  if (isAttr) {
    const attrRow = (vramAddr >> 7) & 7; // hmm 实际是 (addr-0x23c0) >> 3
    const attrIdx = vramAddr & 0x3f;
    return `NT${ntIdx} attr[${attrIdx}]`;
  }
  return `NT${ntIdx} [${row},${col}]`;
}

export class Tracer {
  private ctx: TraceContext | null = null;

  /** 启动 trace */
  start(nes: any, opts: TraceOptions = {}): void {
    const cpu = nes.cpu;
    let stream: fs.WriteStream | null = null;
    if (opts.outputFile) {
      stream = fs.createWriteStream(opts.outputFile, { flags: 'w' });
    }
    this.ctx = {
      cpu,
      nes,
      count: 0,
      lines: 0,
      stream,
      opts: {
        trackCPU: true,
        detailOperand: true,
        ...opts,
      },
      stopped: false,
      ppuAddrLatch: 0,
      ppuAddr: 0,
      _mmc3Reg: 0,
    };
  }

  /** 停止 trace, 关闭文件流 */
  stop(): void {
    if (this.ctx) {
      if (this.ctx.stream) {
        this.ctx.stream.end();
      }
      this.ctx.stopped = true;
      this.ctx = null;
    }
  }

  /** 是否正在 trace */
  get active(): boolean {
    return this.ctx !== null && !this.ctx.stopped;
  }

  /** 输出一行 */
  private emit(line: string): void {
    const ctx = this.ctx!;
    if (ctx.stream) {
      ctx.stream.write(line + '\n');
    } else if (ctx.opts.callback) {
      ctx.opts.callback(line);
    }
  }

  /** 检查行数限制 */
  private checkMaxLines(): boolean {
    const ctx = this.ctx!;
    if (ctx.opts.maxLines !== undefined && ctx.lines >= ctx.opts.maxLines) {
      this.stop();
      return true;
    }
    return false;
  }

  /**
   * 记录一条 CPU 指令 (由 CPU.emulate() 调用)
   */
  trace(instrPC: number, opcode: number, opinfo: any, opbytes: number[]): void {
    const ctx = this.ctx;
    if (!ctx || ctx.stopped || !ctx.opts.trackCPU) return;

    if (ctx.opts.addressRange) {
      const [start, end] = ctx.opts.addressRange;
      if (instrPC < start || instrPC >= end) return;
    }

    if (ctx.opts.bankFilter !== undefined) {
      const bank = getMesenBank(ctx.cpu, ctx.nes, instrPC);
      if (bank !== ctx.opts.bankFilter) return;
    }

    if (this.checkMaxLines()) return;

    ctx.count++;
    ctx.lines++;
    this.emit(formatInstruction(ctx, instrPC, opcode, opinfo, opbytes));
  }

  /**
   * 记录硬件寄存器写入 (由 CPU.write() 调用)
   * @param addr 写入地址 (CPU 地址总线)
   * @param val 写入值
   */
  traceWrite(addr: number, val: number): void {
    const ctx = this.ctx;
    if (!ctx || ctx.stopped) return;

    // ── PPU 控制寄存器 $2000-$2002 ──
    if (ctx.opts.trackPPURegs && addr >= 0x2000 && addr <= 0x2002) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names: Record<number, string> = { 0x2000: 'PPUCTRL', 0x2001: 'PPUMASK', 0x2002: 'PPUSTATUS' };
      this.emit(formatHwWrite(ctx, 'PPU_REG', addr, val, names[addr]));
      return;
    }

    // ── OAM 写入 $2003/$2004/$4014 ──
    if (ctx.opts.trackOAM && (addr === 0x2003 || addr === 0x2004 || addr === 0x4014)) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names: Record<number, string> = { 0x2003: 'OAMADDR', 0x2004: 'OAMDATA', 0x4014: 'OAMDMA' };
      let extra = names[addr] ?? '';
      if (addr === 0x2004) {
        // OAMDATA 写入时显示 OAM 地址 + 精灵槽位
        const ppu: any = ctx.nes.ppu;
        const oamAddr = ppu?.sramAddress ?? 0;
        const spriteIdx = (oamAddr >> 2) & 0x3f;
        const byteIdx = oamAddr & 3;
        const byteNames = ['Y', 'Tile', 'Attr', 'X'];
        extra += ` oamAddr=$${oamAddr.toString(16).toUpperCase()} spr#${spriteIdx}.${byteNames[byteIdx]}`;
      } else if (addr === 0x4014) {
        extra += ` DMA page=$${val.toString(16).toUpperCase().padStart(2, '0')} (src=$${(val << 8).toString(16).toUpperCase().padStart(4, '0')})`;
      }
      this.emit(formatHwWrite(ctx, 'OAM', addr, val, extra));
      return;
    }

    // ── $2006 (PPUADDR) — 锁存地址 ──
    if (addr === 0x2006) {
      if (ctx.ppuAddrLatch === 0) {
        // 第一次写 (高字节)
        ctx.ppuAddrLatch = 1;
        ctx.ppuAddr = (ctx.ppuAddr & 0x00ff) | ((val & 0x3f) << 8);
      } else {
        // 第二次写 (低字节) — 地址完整
        ctx.ppuAddr = (ctx.ppuAddr & 0xff00) | val;
        ctx.ppuAddrLatch = 0;
        // 如果跟踪 NT/Palette/PT, 记录地址设置
        const ppuAddr = ctx.ppuAddr;
        const trackThis =
          (ctx.opts.trackNT && ppuAddr >= 0x2000 && ppuAddr < 0x3000) ||
          (ctx.opts.trackPalette && ppuAddr >= 0x3f00 && ppuAddr < 0x4000) ||
          (ctx.opts.trackPT && ppuAddr < 0x2000);
        if (trackThis) {
          if (this.checkMaxLines()) return;
          ctx.count++;
          ctx.lines++;
          let cat = 'PPU_ADDR';
          if (ppuAddr >= 0x3f00) cat = 'PAL_ADDR';
          else if (ppuAddr >= 0x2000) cat = 'NT_ADDR';
          else cat = 'PT_ADDR';
          const extra = `→ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')}` +
            (ppuAddr >= 0x2000 && ppuAddr < 0x3000 ? ` (${ntMirrorInfo(ppuAddr)})` : '');
          this.emit(formatHwWrite(ctx, cat, 0x2006, val, extra));
        }
      }
      return;
    }

    // ── $2007 (PPUDATA) — VRAM/NT/Palette/PT 数据写入 ──
    if (addr === 0x2007) {
      const ppuAddr = ctx.ppuAddr;
      const ppu: any = ctx.nes.ppu;
      const increment = (ppu?.f_vramIncrement === 1) ? 32 : 1;

      // 分类跟踪
      if (ctx.opts.trackNT && ppuAddr >= 0x2000 && ppuAddr < 0x3000) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        this.emit(formatHwWrite(ctx, 'NT_WRITE', 0x2007, val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} (${ntMirrorInfo(ppuAddr)}) tile=#$${(val & 0xff).toString(16).toUpperCase().padStart(2, '0')}`));
      } else if (ctx.opts.trackPalette && ppuAddr >= 0x3f00 && ppuAddr < 0x4000) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        const palIdx = ppuAddr & 0x1f;
        const palType = palIdx < 16 ? 'BG' : 'SPR';
        const colorIdx = palIdx & 0x0f;
        const isMirror = palIdx >= 0x10 && (palIdx & 0x0f) === 0;
        this.emit(formatHwWrite(ctx, 'PAL_WRITE', 0x2007, val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} ${palType}[${colorIdx}]${isMirror ? ' (mirror)' : ''} color=#$${(val & 0x3f).toString(16).toUpperCase().padStart(2, '0')}`));
      } else if (ctx.opts.trackPT && ppuAddr < 0x2000) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        const ptBank = ppuAddr >> 12; // 0=BG PT, 1=SPR PT
        const tileIdx = (ppuAddr >> 3) & 0xff;
        const rowIdx = ppuAddr & 7;
        this.emit(formatHwWrite(ctx, 'PT_WRITE', 0x2007, val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, '0')} ${ptBank === 0 ? 'BG' : 'SPR'} tile#${tileIdx} row${rowIdx}`));
      }

      // 更新 PPU 地址 (增量)
      ctx.ppuAddr = (ctx.ppuAddr + increment) & 0x3fff;
      return;
    }

    // ── 音频寄存器 $4000-$4017 ──
    if (ctx.opts.trackAudio && addr >= 0x4000 && addr <= 0x4017) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names: Record<number, string> = {
        0x4000: 'SQ1_VOL', 0x4001: 'SQ1_SWEEP', 0x4002: 'SQ1_LO', 0x4003: 'SQ1_HI',
        0x4004: 'SQ2_VOL', 0x4005: 'SQ2_SWEEP', 0x4006: 'SQ2_LO', 0x4007: 'SQ2_HI',
        0x4008: 'TRI_LINEAR', 0x4009: 'TRI_UNUSED', 0x400a: 'TRI_LO', 0x400b: 'TRI_HI',
        0x400c: 'NOISE_VOL', 0x400d: 'NOISE_UNUSED', 0x400e: 'NOISE_LO', 0x400f: 'NOISE_HI',
        0x4010: 'DMC_FREQ', 0x4011: 'DMC_RAW', 0x4012: 'DMC_ADDR', 0x4013: 'DMC_LEN',
        0x4014: 'OAMDMA', 0x4015: 'APU_STATUS', 0x4016: 'JOY1', 0x4017: 'APU_FRAME',
      };
      const name = names[addr] ?? 'UNKNOWN';
      this.emit(formatHwWrite(ctx, 'AUDIO', addr, val, name));
      return;
    }

    // ── MMC3 bank 切换 ($8000-$8001 PRG + $A000-$A001 CHR/PRG-RAM) ──
    // $8000: 写寄存器选择 (bit0-2: 寄存器号, bit6: PRG mode, bit7: CHR mode)
    // $8001: 写寄存器值 (PRG bank / CHR bank)
    // $A000: CHR bank 选择 / NT 镜像
    // $A001: PRG-RAM 控制
    if (ctx.opts.trackMMC3 && (addr === 0x8000 || addr === 0x8001 || addr === 0xA000 || addr === 0xA001)) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const cpu = ctx.cpu;
      const instrPC = cpu._instrPC ?? 0;
      const mesenBank = getMesenBank(cpu, ctx.nes, instrPC);
      const pcStr = '$' + mesenBank.toString(16).toUpperCase().padStart(2, '0') + ':' +
        instrPC.toString(16).toUpperCase().padStart(4, '0');

      if (addr === 0x8000) {
        // $8000: 选寄存器号 + CHR/PRG mode
        const reg = val & 0x07;
        const chrMode = (val >> 7) & 1;
        const prgMode = (val >> 6) & 1;
        const regNames = ['R0:CHR_A0', 'R1:CHR_A1', 'R2:CHR_A2', 'R3:CHR_A3',
                          'R4:CHR_B0', 'R5:CHR_B1', 'R6:PRG_8000', 'R7:PRG_A000'];
        const extra = `select ${regNames[reg] ?? 'R' + reg} chrMode=${chrMode} prgMode=${prgMode}`;
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8000 = #$${val.toString(16).toUpperCase().padStart(2, '0')} ${extra}`);
        ctx._mmc3Reg = reg; // 记住当前选的寄存器
      } else if (addr === 0x8001) {
        // $8001: 写寄存器值
        const reg = ctx._mmc3Reg ?? 0;
        const regNames = ['CHR_A0', 'CHR_A1', 'CHR_A2', 'CHR_A3', 'CHR_B0', 'CHR_B1', 'PRG_8000', 'PRG_A000'];
        const regName = regNames[reg] ?? 'R' + reg;
        let extra = `${regName}=#$${val.toString(16).toUpperCase().padStart(2, '0')}`;
        // 解释 PRG bank 值
        if (reg === 6) {
          const block8k = val & 0x3f;
          extra += ` → $8000窗口=8KB块${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
        } else if (reg === 7) {
          const block8k = val & 0x3f;
          extra += ` → $A000窗口=8KB块${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
        } else {
          extra += ` → CHR bank ${val & 0x3f}`;
        }
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8001 = #$${val.toString(16).toUpperCase().padStart(2, '0')} ${extra}`);
      } else if (addr === 0xA000) {
        // $A000: NT 镜像模式
        const mirror = (val & 1) === 0 ? 'vertical' : 'horizontal';
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A000 = #$${val.toString(16).toUpperCase().padStart(2, '0')} NT mirror=${mirror}`);
      } else if (addr === 0xA001) {
        // $A001: PRG-RAM 控制
        const ramEnable = (val & 0x80) !== 0;
        const ramProtect = (val & 0x40) !== 0;
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A001 = #$${val.toString(16).toUpperCase().padStart(2, '0')} PRG-RAM enable=${ramEnable} protect=${ramProtect}`);
      }
      return;
    }
  }
}
