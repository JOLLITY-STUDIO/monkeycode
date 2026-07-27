// ============================================================================
// ppu.ts — 图像处理单元（纯 TS, 去掉 CPU 依赖）
//
// 维护 VRAM / 图案表 / 调色板，帧结束时渲染 256×240 帧缓冲。
// CHR ROM 从外部注入，VRAM 由游戏逻辑写入。

// 注意: 在完整语义化重写中，PPU 寄存器操作会被替换为直接调用
// 如 writeVRAM(addr, data) / setScroll(x, y) / setPalette(idx, color)
// 此处保留与原有 NES 行为兼容的低层实现
// ============================================================================

// CHR 图案表由游戏逻辑通过 setChrBank() 注入，无需导入 ROM 数据

const SCREEN_W = 256;
const SCREEN_H = 240;

// ==================================================================
// NES 标准 64 色调色板 (RGBA)
// ==================================================================

export const NES_PALETTE: readonly number[] = [
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
// PPU 寄存器状态
// ==================================================================

export interface PpuRegs {
  ctrl: number;      // 8192: PPUCTRL
  mask: number;      // 8193: PPUMASK
  status: number;    // 8194: PPUSTATUS
  oamAddr: number;   // 8195: OAMADDR
  scrollX: number;   // 8197 第 1 次写
  scrollY: number;   // 8197 第 2 次写
  vaddr: number;     // 8198: VRAM 地址
  latch: boolean;    // 8197/8198 写锁存
  ppuDataBuf: number; // 8199: 读缓冲
}

export function createPpuRegs(): PpuRegs {
  return {
    ctrl: 0,
    mask: 0,
    status: 0,
    oamAddr: 0,
    scrollX: 0,
    scrollY: 0,
    vaddr: 0,
    latch: false,
    ppuDataBuf: 0,
  };
}

// ==================================================================
// PPU 核心类
// ==================================================================

export class Ppu {
  /** PPU 寄存器 */
  regs: PpuRegs = createPpuRegs();

  /** VRAM — 4KB: 2 nametable × 1024 + 2 mirror × 1024 */
  vram = new Uint8Array(4096);

  /** OAM — 精灵属性内存 (256 bytes) */
  oam = new Uint8Array(256);

  /** 调色板 — 32 bytes: 16 背景 + 16 精灵 */
  palette = new Uint8Array(32);

  /** 帧缓冲 (RGBA) */
  frameBuffer = new Uint32Array(SCREEN_W * SCREEN_H);

  /** CHR 图案表 bank [bg, spr] — 每个 4096 bytes, 由 setChrBank() 注入 */
  chrBanks: (Uint8Array | null)[] = [null, null];

  /** VBlank 标志 */
  vblankFlag = false;

  // ==============================================================
  // 寄存器读写 (模拟 $2000-$2007 / $4014)
  // ==============================================================

  /** CPU 写入 PPU 寄存器 */
  writeReg(addr: number, val: number): void {
    const reg = addr & 7;
    switch (reg) {
      case 0: // 8192 — PPUCTRL
        this.regs.ctrl = val;
        break;
      case 1: // 8193 — PPUMASK
        this.regs.mask = val;
        break;
      case 2: // 8194 — PPUSTATUS (不应写, 忽略)
        break;
      case 3: // 8195 — OAMADDR
        this.regs.oamAddr = val;
        break;
      case 4: // 8196 — OAMDATA
        this.oam[this.regs.oamAddr] = val;
        this.regs.oamAddr = (this.regs.oamAddr + 1) & 255;
        break;
      case 5: // 8197 — PPUSCROLL
        if (!this.regs.latch) {
          this.regs.scrollX = val;
        } else {
          this.regs.scrollY = val;
        }
        this.regs.latch = !this.regs.latch;
        break;
      case 6: // 8198 — PPUADDR
        if (!this.regs.latch) {
          this.regs.vaddr = ((val & 63) << 8) | (this.regs.vaddr & 255);
        } else {
          this.regs.vaddr = (this.regs.vaddr & 65280) | val;
        }
        this.regs.latch = !this.regs.latch;
        break;
      case 7: // 8199 — PPUDATA
        this.writeVRAM(this.regs.vaddr, val);
        this.regs.vaddr += (this.regs.ctrl & 4) ? 32 : 1;
        break;
    }
  }

  /** CPU 读取 PPU 寄存器 */
  readReg(addr: number): number {
    const reg = addr & 7;
    switch (reg) {
      case 2: { // 8194 — PPUSTATUS
        const s = this.regs.status;
        this.regs.status &= 127; // 读后清 vblank bit
        this.regs.latch = false;
        return s | (this.regs.ppuDataBuf & 31);
      }
      case 4: // 8196 — OAMDATA
        return this.oam[this.regs.oamAddr];
      case 7: { // 8199 — PPUDATA
        const v = this.regs.ppuDataBuf;
        const addr = this.regs.vaddr;
        if (addr >= 16128) {
          // 调色板区 (16128-16383)
          const palAddr = addr & 31;
          const p = (palAddr & 3) === 0
            ? (palAddr & 240) | ((palAddr & 12) >> 2)
            : palAddr;
          this.regs.ppuDataBuf = this.palette[p & 31];
        } else {
          this.regs.ppuDataBuf = this.vram[this.vramAddr(this.regs.vaddr)];
        }
        this.regs.vaddr += (this.regs.ctrl & 4) ? 32 : 1;
        return v;
      }
      default: return 0;
    }
  }

  /** OAM DMA (16404) */
  oamDma(pageVal: number, cpuRam: Uint8Array): void {
    const base = pageVal << 8;
    for (let i = 0; i < 256; i++) {
      this.oam[i] = cpuRam[base + i];
    }
  }

  // ==============================================================
  // VRAM 直接读写
  // ==============================================================

  /** 直接写 VRAM (语义化接口) */
  writeVRAM(addr: number, val: number): void {
    const a = addr & 16383;
    if (a >= 16128) {
      // 调色板区
      const palAddr = a & 31;
      const p = (palAddr & 3) === 0
        ? (palAddr & 240) | ((palAddr & 12) >> 2)
        : palAddr;
      this.palette[p & 31] = val;
    } else {
      this.vram[this.vramAddr(a)] = val;
    }
  }

  /** 直接读 VRAM (语义化接口) */
  readVRAM(addr: number): number {
    const a = addr & 16383;
    if (a >= 16128) {
      const palAddr = a & 31;
      const p = (palAddr & 3) === 0
        ? (palAddr & 240) | ((palAddr & 12) >> 2)
        : palAddr;
      return this.palette[p & 31];
    }
    return this.vram[this.vramAddr(a)];
  }

  // ==============================================================
  // VRAM 地址映射 (nametable 镜像)
  // ==============================================================

  private vramAddr(addr: number): number {
    let a = addr & 16383;
    if (a >= 12288) a -= 4096; // mirror 12288-16383 → 8192-12287
    const mirror = this.regs.ctrl & 1; // 0=水平, 1=垂直
    if (a >= 8192 && a < 12288) {
      const ntIdx = (a >> 10) & 3;
      const offset = a & 1023;
      if (mirror === 0) {
        // 水平镜像: 0↔1, 2↔3
        return ((ntIdx & 1) << 10) | offset;
      } else {
        // 垂直镜像: 0↔2, 1↔3
        return ((ntIdx & 2) << 9) | offset;
      }
    }
    return a & 4095;
  }

  // ==============================================================
  // 帧渲染
  // ==============================================================

  /** 注入 CHR 图案表 bank */
  setChrBank(bankIdx: number, data: Uint8Array): void {
    this.chrBanks[bankIdx] = data;
  }

  /** 直接设置滚动 (语义化接口) */
  setScroll(x: number, y: number): void {
    this.regs.scrollX = x & 0xFF;
    this.regs.scrollY = y & 0xFF;
  }

  /** 渲染整帧到 frameBuffer */
  render(): void {
    const bgBank = this.chrBanks[0];
    const sprBank = this.chrBanks[1];
    if (!bgBank && !sprBank) return;

    // 合并 CHR 供渲染器使用
    const chr = new Uint8Array(8192);
    if (bgBank) chr.set(bgBank, 0);
    if (sprBank) chr.set(sprBank, 4096);

    const buf = this.frameBuffer;

    // --- 背景渲染 ---
    if (this.regs.mask & 8) {
      this.renderBackground(buf, chr);
    } else {
      const bgPal = NES_PALETTE[this.palette[0] & 63] | 0xFF000000;
      buf.fill(bgPal);
    }

    // --- 精灵渲染 ---
    if (this.regs.mask & 16) {
      this.renderSprites(buf, chr);
    }
  }

  /** 渲染背景层 */
  private renderBackground(buf: Uint32Array, chr: Uint8Array): void {
    const bgTable = (this.regs.ctrl & 16) ? 4096 : 0;
    const ntSelect = this.regs.ctrl & 3;
    const vMirror = (this.regs.ctrl & 2) !== 0;

    for (let tileY = 0; tileY < 30; tileY++) {
      for (let tileX = 0; tileX < 32; tileX++) {
        // 实际位置 (考虑 scroll)
        const scrTileX = tileX - Math.floor(this.regs.scrollX / 8);
        const scrTileY = tileY - Math.floor(this.regs.scrollY / 8);

        // 确定 nametable 索引
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
        ntIdx = (ntSelect + ntIdx) & 3;

        // 读 nametable tile 索引
        const ntAddr = ntIdx * 1024 + ntY * 32 + ntX;
        const tileIdx = this.vram[ntAddr];

        // 读 attribute
        const attrAddr = ntIdx * 1024 + 960 + (ntY >> 2) * 8 + (ntX >> 2);
        const attr = this.vram[attrAddr];
        const shift = ((ntY & 2) << 1) | ((ntX & 2) >> 1);
        const palBase = ((attr >> shift) & 3) * 4;

        // 屏幕位置
        const baseX = tileX * 8 - (this.regs.scrollX & 7);
        const baseY = tileY * 8 - (this.regs.scrollY & 7);

        for (let py = 0; py < 8; py++) {
          const sy = baseY + py;
          if (sy < 0 || sy >= SCREEN_H) continue;
          for (let px = 0; px < 8; px++) {
            const sx = baseX + px;
            if (sx < 0 || sx >= SCREEN_W) continue;

            const lo = chr[bgTable + tileIdx * 16 + py];
            const hi = chr[bgTable + tileIdx * 16 + py + 8];
            const bit = 7 - px;
            const ci = ((hi >> bit) & 1) << 1 | ((lo >> bit) & 1);

            let palIdx: number;
            if (ci === 0) {
              palIdx = this.palette[0] & 63;
            } else {
              palIdx = this.palette[palBase + ci] & 63;
            }
            buf[sy * SCREEN_W + sx] = NES_PALETTE[palIdx] | 0xFF000000;
          }
        }
      }
    }
  }

  /** 渲染精灵层 */
  private renderSprites(buf: Uint32Array, chr: Uint8Array): void {
    const sprTable = (this.regs.ctrl & 8) ? 4096 : 0;
    const sprSize = (this.regs.ctrl & 32) ? 16 : 8;

    // 精灵优先级: OAM 索引小的优先 (倒序绘制)
    for (let i = 63; i >= 0; i--) {
      const oamIdx = i * 4;
      const oamY = this.oam[oamIdx];
      if (oamY >= 239) continue; // 屏幕外

      let tileIdx = this.oam[oamIdx + 1];
      const attr = this.oam[oamIdx + 2];
      const oamX = this.oam[oamIdx + 3];

      const y = oamY + 1; // 精灵 Y 偏移
      const x = oamX;

      if (y >= SCREEN_H || x >= SCREEN_W || y + sprSize <= 0 || x + 8 <= 0) continue;

      const flipH = (attr & 64) !== 0;
      const flipV = (attr & 128) !== 0;
      const behindBg = (attr & 32) !== 0;
      const sprPalBase = ((attr & 3) * 4) + 16;

      for (let py = 0; py < sprSize; py++) {
        const sy = flipV ? (y + sprSize - 1 - py) : (y + py);
        if (sy < 0 || sy >= SCREEN_H) continue;

        let tile: number;
        let row: number;
        if (sprSize === 16) {
          tile = (tileIdx & 254) + (py < 8 ? 0 : 1);
          row = flipV ? (7 - (py & 7)) : (py & 7);
        } else {
          tile = tileIdx;
          row = flipV ? (7 - py) : py;
        }

        const base = sprTable + tile * 16;
        const lo = chr[base + row];
        const hi = chr[base + row + 8];

        for (let px = 0; px < 8; px++) {
          const sx = flipH ? (x + 7 - px) : (x + px);
          if (sx < 0 || sx >= SCREEN_W) continue;

          const bit = 7 - px;
          const ci = ((hi >> bit) & 1) << 1 | ((lo >> bit) & 1);
          if (ci === 0) continue; // 透明

          if (behindBg) {
            // 仅背景色可穿透
            const bgIdx = sy * SCREEN_W + sx;
            const bgColor = buf[bgIdx] & 16777215;
            const backdrop = NES_PALETTE[this.palette[0] & 63] & 16777215;
            if (bgColor !== backdrop) continue;
          }

          const palIdx = this.palette[sprPalBase + ci] & 63;
          buf[sy * SCREEN_W + sx] = NES_PALETTE[palIdx] | 0xFF000000;
        }
      }
    }
  }

  // ==============================================================
  // VBlank 控制
  // ==============================================================

  setVBlank(): void {
    this.vblankFlag = true;
    this.regs.status |= 128;
  }

  clearVBlank(): void {
    this.vblankFlag = false;
    this.regs.status &= 127;
  }

  /** NMI 是否应该触发 */
  get nmiTriggered(): boolean {
    return this.vblankFlag && (this.regs.ctrl & 128) !== 0;
  }

  // ==============================================================
  // 初始化 / 重置
  // ==============================================================

  reset(): void {
    this.regs = createPpuRegs();
    this.vblankFlag = false;
    this.vram.fill(0);
    this.oam.fill(255);
    this.palette.fill(0);
    this.frameBuffer.fill(0xFF000000);
  }
}
