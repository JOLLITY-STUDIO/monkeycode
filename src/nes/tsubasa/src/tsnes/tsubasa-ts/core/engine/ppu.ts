/**
 * ============================================================================
 * ppu — PPU 2C02 像素处理器
 *
 * 帧级抽象：只追踪扫描线/帧状态，不逐像素渲染。
 * 为后续 RenderBus / 实际渲染提供 VRAM/nmi 接口。
 * ============================================================================
 */

// ═══════════════ NTSC 时序常量 ═══════════════

/** 每帧扫描线数 (NTSC) */
export const SCANLINES = 262;
/** 每条扫描线的 PPU 周期 */
export const DOTS = 341;
/** 可见扫描线 */
export const VISIBLE = 240;
/** VBlank 开始扫描线 */
export const VBLANK_START = 241;
/** 预渲染扫描线 */
export const PRERENDER = 261;

/** 帧缓冲区: 61440 像素 (256 × 240) */
export const FRAME_W = 256;
export const FRAME_H = 240;
export const FRAME_SIZE = FRAME_W * FRAME_H;

/** NMI 在 VBlank 开始后哪个周期触发 (约 dot 1 of scanline 241) */
export const NMI_TRIGGER_DOT = 1;

// ═══════════════ 寄存器常量 ═══════════════

/** PPU 寄存器地址 */
export const ADDR_CTRL   = 8192;   // $2000
export const ADDR_MASK   = 8193;   // $2001
export const ADDR_STATUS = 8194;   // $2002
export const ADDR_OAM_ADDR = 8195; // $2003
export const ADDR_OAM_DATA = 8196; // $2004
export const ADDR_SCROLL   = 8197; // $2005
export const ADDR_VRAM_ADDR = 8198; // $2006
export const ADDR_VRAM_DATA = 8199; // $2007
export const ADDR_OAM_DMA   = 16404; // $4014

// ═══════════════ 工厂函数 ═══════════════

/**
 * 创建 PPU 状态
 * @returns {object}
 */
export function createPpuState() {
  return {
    /** 控制寄存器 $2000 */
    ctrl: {
      nametable: 0,    // nametable 基址 (0-3)
      increment: 1,    // VRAM 增量 (1 或 32)
      sprTbl: 0,       // 精灵图案表: 0=$0000, 1=$1000
      bgTbl:  0,       // 背景图案表: 0=$0000, 1=$1000
      sprSize: 8,      // 精灵尺寸 (8 或 16)
      nmi: false,      // NMI 启用
    },
    /** 掩码寄存器 $2001 */
    mask: {
      gray: false,         // 灰度
      bgLeft8: false,      // 背景左侧 8px
      sprLeft8: false,     // 精灵左侧 8px
      bgShow: false,       // 显示背景
      sprShow: false,      // 显示精灵
      red:   false,        // 强调红
      green: false,        // 强调绿
      blue:  false,        // 强调蓝
    },
    /** 状态寄存器 $2002 */
    status: {
      sprOverflow: false,  // 精灵溢出
      spr0Hit:     false,  // 精灵 0 命中
      vblank:      false,  // VBlank 激活
    },

    /** OAM 地址 */
    oamAddr: 0,
    /** OAM 内存 (256 字节) */
    oam: new Array(256).fill(0),

    /** 滚动参数 */
    scrollX: 0,
    scrollY: 0,

    /** VRAM 地址寄存器 (15-bit loopy) */
    v: 0, // 当前 VRAM 地址
    t: 0, // 临时 VRAM 地址
    fineX: 0, // 细 X 滚动
    w: false, // 地址写入 latch

    /** 扫描线/帧 */
    scanline: PRERENDER,
    dot: 0,
    frame: 0,
    oddFrame: false,

    /** NMI */
    nmiPending: false,
    nmiSuppress: true,

    /** 帧缓冲 (256×240, 每个像素 0-63 调色板索引) */
    frameBuffer: new Array(FRAME_SIZE).fill(0),

    /** VRAM (4 nametables × 1KB = 4KB) */
    vram: new Array(4096).fill(0),

    /** 调色板 (32 字节: 16 BG + 16 SPR) */
    palette: new Array(32).fill(0),

    /** read buffer (PPUDATA 读取缓冲) */
    readBuffer: 0,
  };
}

/**
 * 创建一个 nametable
 * @returns {number[]} 960 字节 (32×30 tile indices)
 */
export function createNametable() {
  return new Array(960).fill(0);
}

// ═══════════════ 寄存器操作 ═══════════════

/**
 * 写入 PPU_CTRL ($2000)
 * @param {object} ppu
 * @param {number} v
 */
export function writeCtrl(ppu, v) {
  ppu.ctrl.nametable = v & 3;
  ppu.ctrl.increment = (v & 4) ? 32 : 1;
  ppu.ctrl.sprTbl    = (v & 8)  ? 4096 : 0;
  ppu.ctrl.bgTbl     = (v & 16) ? 4096 : 0;
  ppu.ctrl.sprSize   = (v & 32) ? 16 : 8;
  ppu.ctrl.nmi       = (v & 128) !== 0;

  // 低位 nametable 赋值到 loopy_t
  ppu.t = (ppu.t & ~(3 << 10)) | ((v & 3) << 10);

  // 如果 NMI 设为 on 且当前正在 VBlank，立即触发
  if (ppu.ctrl.nmi && ppu.status.vblank) {
    ppu.nmiPending = true;
  }
}

/**
 * 写入 PPU_MASK ($2001)
 */
export function writeMask(ppu, v) {
  ppu.mask.gray     = (v & 1) !== 0;
  ppu.mask.bgLeft8  = (v & 2) !== 0;
  ppu.mask.sprLeft8 = (v & 4) !== 0;
  ppu.mask.bgShow   = (v & 8) !== 0;
  ppu.mask.sprShow  = (v & 16) !== 0;
  ppu.mask.red      = (v & 32) !== 0;
  ppu.mask.green    = (v & 64) !== 0;
  ppu.mask.blue     = (v & 128) !== 0;
}

/**
 * 读取 PPU_STATUS ($2002) — 清除 VBlank
 */
export function readStatus(ppu) {
  let v = 0;
  if (ppu.status.sprOverflow) v = v | 32;
  if (ppu.status.spr0Hit)     v = v | 64;
  if (ppu.status.vblank)      v = v | 128;

  // 清除 VBlank
  ppu.status.vblank = false;
  // 禁止本帧 NMI
  ppu.nmiSuppress = true;
  // 重置地址 latch
  ppu.w = false;

  return v;
}

/**
 * 写入 PPU_SCROLL ($2005)
 */
export function writeScroll(ppu, v) {
  if (!ppu.w) {
    // 第一次写入: X 滚动
    ppu.fineX = v & 7;
    ppu.t = (ppu.t & ~31) | ((v >>> 3) & 31);
    ppu.w = true;
  } else {
    // 第二次写入: Y 滚动
    ppu.t = (ppu.t & ~(31 << 5))  | ((v & 7) << 12)  | ((v >>> 3) << 5);
    ppu.w = false;
  }
}

/**
 * 写入 PPU_ADDR ($2006)
 */
export function writeVramAddr(ppu, v) {
  if (!ppu.w) {
    // 高字节
    ppu.t = (ppu.t & 255) | ((v & 63) << 8);
    ppu.w = true;
  } else {
    // 低字节
    ppu.t = (ppu.t & 65280) | (v & 255);
    ppu.v = ppu.t;
    ppu.w = false;
  }
}

/**
 * 写入 PPU_DATA ($2007)
 */
export function writeVramData(ppu, v, chrBanks) {
  const addr = ppu.v & 16383;
  if (addr < 8192) {
    // Pattern tables → CHR-ROM (只读, 实际忽略写入)
  } else if (addr < 12288) {
    // Nametables
    const ntIdx = (addr - 8192) & 1023;
    ppu.vram[(addr - 8192) & 4095] = v;
  } else if (addr < 16384) {
    // 调色板
    const palIdx = (addr - 12288) & 31;
    ppu.palette[palIdx] = v & 63;
  }
  ppu.v = (ppu.v + ppu.ctrl.increment) & 16383;
}

// ═══════════════ 帧推进 ═══════════════

/**
 * 推进一帧 (示意性 — 真实渲染在 RenderBus 层)
 * 每帧: scanline 0 → 261, VBlank 241-260, NMI 在 241 dot 1
 * @param {object} ppu
 * @returns {{ vblank: boolean, nmi: boolean }}
 */
export function tickFrame(ppu) {
  ppu.frame++;
  ppu.oddFrame = ppu.frame % 2 !== 0;

  // VBlank 开始 (scanline 241 dot 1)
  ppu.status.vblank = true;
  if (!ppu.nmiSuppress && ppu.ctrl.nmi) {
    ppu.nmiPending = true;
  }
  ppu.nmiSuppress = false;

  return {
    vblank: true,
    nmi: ppu.nmiPending,
  };
}

/**
 * 消费 NMI 信号
 */
export function consumeNmi(ppu) {
  ppu.nmiPending = false;
}
