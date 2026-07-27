// ============================================================================
// compiled_ppu.ts — 简易 PPU (纯 TS, 无 NES 依赖)
//
// 拦截 CPU 对 PPU 寄存器 ($2000-$2007, $4014) 的读写，
// 维护 VRAM/图案表/调色板状态，帧结束时渲染 256×240 帧缓冲。
// ============================================================================

const SCREEN_W = 256;
const SCREEN_H = 240;

// === PPU 寄存器 ===
class PpuRegs {
  ctrl   = 0;  // $2000
  mask   = 0;  // $2001
  status = 0;  // $2002
  oamAddr = 0; // $2003
  scrollX = 0; // $2005 第 1 次写
  scrollY = 0; // $2005 第 2 次写
  vaddr   = 0; // $2006 (VRAM 地址)
  latch   = false; // $2005/$2006 写锁存
  ppuDataBuf = 0; // $2007 读缓冲
}

// === 简易 PPU ===
export class CompiledPpu {
  // 寄存器
  regs = new PpuRegs();

  // PPU 内部 VRAM (4×1KB: 2×nametable + 2×mirror)
  vram = new Uint8Array(0x1000);

  // OAM (精灵属性内存, 256 字节)
  oam = new Uint8Array(256);

  // 调色板 (32 字节: 16 背景 + 16 精灵)
  palette = new Uint8Array(32);

  // 帧缓冲 (RGBA 32bit)
  frameBuffer = new Uint32Array(SCREEN_W * SCREEN_H);

  // CHR ROM (从外部注入, 32×4KB bank)
  chrRom: Uint8Array[] = [];

  // === 外部回调 ===
  onFrame: ((buf: Uint32Array) => void) | null = null;

  // === NMI 相关 ===
  vblankFlag = false;
  scanline = 0;

  // === 背景色 (来自 NES 调色板) ===
  static NES_PALETTE = [
    0xFF666666, 0xFF002A88, 0xFF1412A7, 0xFF3B00A4, 0xFF5C007E, 0xFF6E0040, 0xFF6C0600, 0xFF561D00,
    0xFF333500, 0xFF0B4800, 0xFF005200, 0xFF004F08, 0xFF00404D, 0xFF000000, 0xFF000000, 0xFF000000,
    0xFFADADAD, 0xFF155FD9, 0xFF4240FF, 0xFF7527FE, 0xFFA01ACC, 0xFFB71E7B, 0xFFB53120, 0xFF994E00,
    0xFF6B6D00, 0xFF388700, 0xFF0C9300, 0xFF008F32, 0xFF007C8D, 0xFF000000, 0xFF000000, 0xFF000000,
    0xFFFFFEFF, 0xFF64B0FF, 0xFF9290FF, 0xFFC676FF, 0xFFF36AFF, 0xFFFE6ECC, 0xFFFE8170, 0xFFEA9E22,
    0xFFBCBE00, 0xFF88D800, 0xFF5CE430, 0xFF45E082, 0xFF48CDDE, 0xFF4F4F4F, 0xFF000000, 0xFF000000,
    0xFFFFFEFF, 0xFFC0DFFF, 0xFFD3D2FF, 0xFFE8C8FF, 0xFFFBC2FF, 0xFFFEC4EA, 0xFFFECCC5, 0xFFF7D8A5,
    0xFFE4E594, 0xFFCFEF96, 0xFFBDF4AB, 0xFFB3F3CC, 0xFFB5EBF2, 0xFFB8B8B8, 0xFF000000, 0xFF000000,
  ];

  // ==================================================================
  // CPU 回调: 当 CPU 写入 PPU 地址时调用
  // ==================================================================

  handleWrite(addr: number, val: number): void {
    // 仅处理低 3 位
    const reg = addr & 7;
    switch (reg) {
      case 0: // $2000 — PPUCTRL
        this.regs.ctrl = val;
        break;
      case 1: // $2001 — PPUMASK
        this.regs.mask = val;
        break;
      case 2: // $2002 — PPUSTATUS (读, 不应写)
        break;
      case 3: // $2003 — OAMADDR
        this.regs.oamAddr = val;
        break;
      case 4: // $2004 — OAMDATA
        this.oam[this.regs.oamAddr] = val;
        this.regs.oamAddr = (this.regs.oamAddr + 1) & 0xFF;
        break;
      case 5: // $2005 — PPUSCROLL
        if (!this.regs.latch) {
          this.regs.scrollX = val;
        } else {
          this.regs.scrollY = val;
        }
        this.regs.latch = !this.regs.latch;
        break;
      case 6: // $2006 — PPUADDR
        if (!this.regs.latch) {
          this.regs.vaddr = ((val & 0x3F) << 8) | (this.regs.vaddr & 0xFF);
        } else {
          this.regs.vaddr = (this.regs.vaddr & 0xFF00) | val;
        }
        this.regs.latch = !this.regs.latch;
        break;
      case 7: // $2007 — PPUDATA
        this._writeVram(this.regs.vaddr, val);
        this.regs.vaddr += (this.regs.ctrl & 0x04) ? 32 : 1;
        break;
    }
  }

  handleRead(addr: number): number | undefined {
    const reg = addr & 7;
    switch (reg) {
      case 2: { // $2002 — PPUSTATUS
        const s = this.regs.status;
        this.regs.status &= ~0x80; // 读后清 vblank
        this.regs.latch = false;
        return s | (this.regs.ppuDataBuf & 0x1F);
      }
      case 4: // $2004 — OAMDATA
        return this.oam[this.regs.oamAddr];
      case 7: { // $2007 — PPUDATA
        const v = this.regs.ppuDataBuf;
        const addr = this.regs.vaddr;
        if (addr >= 0x3F00) {
          // 调色板区: 直接返回
          const palAddr = (addr & 0x1F);
          const p = (palAddr & 3) === 0
            ? (palAddr & 0xF0) | (palAddr & 0x0C) >> 2
            : palAddr;
          this.regs.ppuDataBuf = this.palette[p & 0x1F];
        } else {
          this.regs.ppuDataBuf = this._readVram(addr);
        }
        this.regs.vaddr += (this.regs.ctrl & 0x04) ? 32 : 1;
        return v;
      }
    }
    return undefined;
  }

  // ==================================================================
  // OAM DMA ($4014)
  // ==================================================================

  handleOamDma(pageVal: number, cpuRam: Uint8Array): void {
    const base = pageVal << 8;
    for (let i = 0; i < 256; i++) {
      this.oam[i] = cpuRam[base + i];
    }
  }

  // ==================================================================
  // VRAM 读写
  // ==================================================================

  private _vramAddr(a: number): number {
    let addr = a & 0x3FFF;
    if (addr >= 0x3000) addr -= 0x1000; // mirror $3000→$2000
    // 水平/垂直镜像 (由 $2000 bit 0/1 决定)
    const mirror = this.regs.ctrl & 1; // 简化: 0=水平, 1=垂直
    if (addr >= 0x2000 && addr < 0x3000) {
      const ntIdx = (addr >> 10) & 3;
      const offset = addr & 0x3FF;
      if (mirror === 0) { // 水平: 0↔1, 2↔3
        return ((ntIdx & 1) << 10) | offset;
      } else { // 垂直: 0↔2, 1↔3
        return ((ntIdx & 2) << 9) | offset;
      }
    }
    return addr & 0x0FFF;
  }

  private _readVram(a: number): number {
    return this.vram[this._vramAddr(a)];
  }

  private _writeVram(a: number, v: number): void {
    const addr = a & 0x3FFF;
    if (addr >= 0x3F00) {
      // 调色板
      const palAddr = addr & 0x1F;
      const p = (palAddr & 3) === 0
        ? (palAddr & 0xF0) | (palAddr & 0x0C) >> 2
        : palAddr;
      this.palette[p & 0x1F] = v;
    } else {
      this.vram[this._vramAddr(a)] = v;
    }
  }

  // ==================================================================
  // 帧渲染
  // ==================================================================

  render(): void {
    if (this.chrRom.length === 0) return;

    const buf = this.frameBuffer;
    const mergedChr = this.chrRom[0]; // 合并后的 CHR 数组

    // --- 渲染背景 ---
    if (this.regs.mask & 0x08) {
      const bgTable = (this.regs.ctrl & 0x10) ? 0x1000 : 0x0000;
      const ntSelect = this.regs.ctrl & 3;
      const vMirror = (this.regs.ctrl & 2) !== 0;

      for (let tileY = 0; tileY < 30; tileY++) {
        for (let tileX = 0; tileX < 32; tileX++) {
          // 实际 nametable + scroll
          const scrTileX = tileX - Math.floor(this.regs.scrollX / 8);
          const scrTileY = tileY - Math.floor(this.regs.scrollY / 8);

          // 确定属于哪个 nametable
          const ntX = scrTileX < 0 ? ((scrTileX % 32) + 32) % 32 : scrTileX % 32;
          const ntY = scrTileY < 0 ? ((scrTileY % 30) + 30) % 30 : scrTileY % 30;
          const ntCol = scrTileX < 0 ? Math.floor((scrTileX - 31) / 32) : Math.floor(scrTileX / 32);
          const ntRow = scrTileY < 0 ? Math.floor((scrTileY - 29) / 30) : Math.floor(scrTileY / 30);

          let ntIdx: number;
          if (vMirror) {
            ntIdx = (ntRow & 1) ? ((ntCol & 1) ? 3 : 2) : ((ntCol & 1) ? 1 : 0);
          } else {
            ntIdx = (ntCol & 1) ? ((ntRow & 1) ? 3 : 1) : ((ntRow & 1) ? 2 : 0);
          }
          // baseNT = 0 if ntSelect corresponds... simplified for now
          ntIdx = (ntSelect + ntIdx) & 3;

          const ntAddr = ntIdx * 0x400 + ntY * 32 + ntX;
          const tileIdx = this.vram[ntAddr];

          // Attribute
          const attrAddr = ntIdx * 0x400 + 0x3C0 + (ntY >> 2) * 8 + (ntX >> 2);
          const attr = this.vram[attrAddr];
          const shift = ((ntY & 2) << 1) | ((ntX & 2) >> 1);
          const pBase = ((attr >> shift) & 3) * 4;

          // 像素在屏幕上的位置
          const baseX = tileX * 8 - (this.regs.scrollX & 7);
          const baseY = tileY * 8 - (this.regs.scrollY & 7);

          for (let py = 0; py < 8; py++) {
            const sy = baseY + py;
            if (sy < 0 || sy >= SCREEN_H) continue;
            for (let px = 0; px < 8; px++) {
              const sx = baseX + px;
              if (sx < 0 || sx >= SCREEN_W) continue;

              const lo = mergedChr[bgTable + tileIdx * 16 + py];
              const hi = mergedChr[bgTable + tileIdx * 16 + py + 8];
              const bit = 7 - px;
              const ci = ((hi >> bit) & 1) << 1 | ((lo >> bit) & 1);

              let palIdx: number;
              if (ci === 0) {
                palIdx = this.palette[0] & 0x3F;
              } else {
                palIdx = this.palette[pBase + ci] & 0x3F;
              }
              buf[sy * SCREEN_W + sx] = CompiledPpu.NES_PALETTE[palIdx] | 0xFF000000;
            }
          }
        }
      }
    } else {
      // 背景关闭 → 使用背景色填充
      const bgPal = CompiledPpu.NES_PALETTE[this.palette[0] & 0x3F] | 0xFF000000;
      buf.fill(bgPal);
    }

    // --- 渲染精灵 ---
    if (this.regs.mask & 0x10) {
      const sprTable = (this.regs.ctrl & 0x08) ? 0x1000 : 0x0000;
      const sprSize = (this.regs.ctrl & 0x20) ? 16 : 8;

      for (let i = 63; i >= 0; i--) {
        const oamIdx = i * 4;
        const oamY = this.oam[oamIdx];
        if (oamY >= 0xEF) continue; // 屏幕外

        let tileIdx = this.oam[oamIdx + 1];
        const attr = this.oam[oamIdx + 2];
        const oamX = this.oam[oamIdx + 3];

        const y = oamY + 1; // 精灵 Y 偏移 +1
        const x = oamX;

        if (y >= SCREEN_H || x >= SCREEN_W || y + sprSize <= 0 || x + 8 <= 0) continue;

        const flipH = (attr & 0x40) !== 0;
        const flipV = (attr & 0x80) !== 0;
        const behindBg = (attr & 0x20) !== 0;
        const spPBase = ((attr & 3) * 4) + 0x10;

        for (let py = 0; py < sprSize; py++) {
          const sy = flipV ? (y + sprSize - 1 - py) : (y + py);
          if (sy < 0 || sy >= SCREEN_H) continue;

          let tile: number;
          let row: number;
          if (sprSize === 16) {
            tile = (tileIdx & 0xFE) + (py < 8 ? 0 : 1);
            row = flipV ? (7 - (py & 7)) : (py & 7);
          } else {
            tile = tileIdx;
            row = flipV ? (7 - py) : py;
          }

          const base = sprTable + tile * 16;
          const lo = mergedChr[base + row];
          const hi = mergedChr[base + row + 8];

          for (let px = 0; px < 8; px++) {
            const sx = flipH ? (x + 7 - px) : (x + px);
            if (sx < 0 || sx >= SCREEN_W) continue;

            const bit = 7 - px;
            const ci = ((hi >> bit) & 1) << 1 | ((lo >> bit) & 1);
            if (ci === 0) continue; // 透明

            if (behindBg) {
              // 仅背景色 (palette[0]) 才可穿透
              const bgIdx = sy * SCREEN_W + sx;
              const bgColor = buf[bgIdx] & 0xFFFFFF;
              const backdrop = CompiledPpu.NES_PALETTE[this.palette[0] & 0x3F] & 0xFFFFFF;
              if (bgColor !== backdrop) continue;
            }

            const palIdx = this.palette[spPBase + ci] & 0x3F;
            buf[sy * SCREEN_W + sx] = CompiledPpu.NES_PALETTE[palIdx] | 0xFF000000;
          }
        }
      }
    }
  }

  /** 开始 VBlank */
  setVBlank(): void {
    this.vblankFlag = true;
    this.regs.status |= 0x80;
  }

  /** 结束 VBlank (通常在 NMI 处理完后调用) */
  clearVBlank(): void {
    this.vblankFlag = false;
    this.regs.status &= ~0x80;
  }

  /** NMI 是否应该触发 */
  get nmiTriggered(): boolean {
    return this.vblankFlag && (this.regs.ctrl & 0x80) !== 0;
  }

  // ==================================================================
  // 初始化
  // ==================================================================

  /** 加载 CHR ROM */
  loadChr(chrBanks: Uint8Array[]): void {
    this.chrRom = chrBanks;
  }

  /** 重置 PPU */
  reset(): void {
    this.regs = new PpuRegs();
    this.regs.status = 0;
    this.vblankFlag = false;
    this.vram.fill(0);
    this.oam.fill(0xFF);
    this.palette.fill(0);
    this.frameBuffer.fill(0xFF000000);
  }
}
