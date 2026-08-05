/**
 * Nametable Debug 页面 - 调试 nametable + CHR Bank 映射效果 + 精灵叠加
 *
 * 渲染完整的 32×30 nametable + 56 OAM sprites 到 256×240 Canvas，验证：
 *   1. RLE 解码的 tile 数据是否正确
 *   2. CHR Bank 30 (0x1E) vs 31 (0x1F) 的映射效果
 *   3. VRAM offset $20A8 偏移是否正确
 *   4. 精灵 (sprites) 叠加效果
 *
 * 使用 ImageData 一次性渲染，高效稳定。
 */
import { getGlobalTileStore, nesColorToRgba } from '../../src/debug/DebugRenderer';
import { OPENING_PAGES } from '../../src/data/OpeningRleData';

declare const wx: any;

// ================================================================
// 常量
// ================================================================
const SCREEN_W = 256;
const SCREEN_H = 240;
const TILE_PX = 8;
const NT_COLS = 32;
const NT_ROWS = 30;
const NT_TOTAL = 960;

// ================================================================
// Frame #225 实际调色板 (来自 PPU Viewer)
// ================================================================

/** BG 调色板 (VRAM $3F00-$3F0F) */
const BG_PALETTE: number[] = [
  0x0F, 0x21, 0x36, 0x30,  // Group 0: 黑, 蓝, 粉, 白
  0x0F, 0x19, 0x10, 0x36,  // Group 1: 黑, 绿, 灰, 粉
  0x0F, 0x19, 0x11, 0x21,  // Group 2: 黑, 绿, 蓝, 蓝
  0x0F, 0x19, 0x10, 0x11,  // Group 3: 黑, 绿, 灰, 蓝
];

/** SPR 调色板 (VRAM $3F10-$3F1F) */
const SPR_PALETTE: number[] = [
  0x0F, 0x0F, 0x36, 0x11,  // Group 0: 黑/透, 黑/透, 粉, 蓝
  0x0F, 0x0F, 0x36, 0x30,  // Group 1: 黑/透, 黑/透, 粉, 白
  0x0F, 0x0F, 0x11, 0x30,  // Group 2: 黑/透, 黑/透, 蓝, 白
  0x0F, 0x0F, 0x10, 0x30,  // Group 3: 黑/透, 黑/透, 灰, 白
];

// ================================================================
// OAM 可见精灵数据 (Frame #225, SP PT=$0000)
// ================================================================

interface OamSprite {
  y: number;      // 屏幕 Y 坐标 (已含 NES -1 偏移)
  x: number;      // 屏幕 X 坐标
  tile: number;   // 图块索引
  pal: number;    // 精灵调色板组 (0-3)
  hflip: boolean; // 水平翻转
  vflip: boolean; // 垂直翻转
  behind: boolean;// 是否在背景后
}

/**
 * 解析 PPU Viewer OAM dump 行:
 *   "# 1 ($058,$06F) Tile=$30 Pal=$c .."
 *   "#11 ($068,$06F) Tile=$31 Pal=$c H."
 *
 * ⚠️ PPU Viewer 输出格式: 括号内是 (X, Y) — 与 NES 内部 OAM 字节顺序 (Y,Tile,Attr,X) 不同!
 *    FCEUX / Mesen / Nestopia 的 PPU Viewer 都用 (X, Y) 显示
 *    如需切回 (Y, X) 解析,使用 data.swapOamYX
 *
 * Pal 编码: Pal >> 2 = sprite palette group (0-3)
 *           Pal & 3 可能包含属性标志
 * 后缀: ".." = 无翻转, "H." = 水平翻转, ".V" = 垂直翻转, "HV" = 双翻转
 */
function parseOamDump(dump: string, swapYX: boolean = false): OamSprite[] {
  const sprites: OamSprite[] = [];
  const re = /#\s*\d+\s*\(\$([0-9A-Fa-f]+),\s*\$([0-9A-Fa-f]+)\)\s*Tile=\$([0-9A-Fa-f]+)\s*Pal=\$([0-9A-Fa-f]+)\s*(H?)(\.?)(V?)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(dump)) !== null) {
    // PPU Viewer 输出: (X, Y) — 第一个 hex 是 X, 第二个是 Y
    const x = parseInt(m[1], 16);
    const y = parseInt(m[2], 16);
    const tile = parseInt(m[3], 16);
    const palRaw = parseInt(m[4], 16);
    const palGroup = (palRaw >> 2) & 3;
    const hasH = m[5] === 'H';
    const hasV = m[7] === 'V';
    if (swapYX) {
      // 测试模式: 把 X/Y 互换,用于某些 PPU Viewer 的 (Y, X) 输出
      sprites.push({ y: x, x: y, tile, pal: palGroup, hflip: hasH, vflip: hasV, behind: false });
    } else {
      sprites.push({ y, x, tile, pal: palGroup, hflip: hasH, vflip: hasV, behind: false });
    }
  }
  return sprites;
}

/** Frame #225 OAM 原始 dump */
const OAM_DUMP_RAW = `
  # 1 ($058,$06F) Tile=$30 Pal=$c ..
  # 2 ($058,$077) Tile=$32 Pal=$c ..
  # 3 ($058,$07F) Tile=$38 Pal=$c ..
  # 4 ($058,$087) Tile=$3A Pal=$c ..
  # 5 ($060,$06F) Tile=$31 Pal=$c ..
  # 6 ($060,$077) Tile=$33 Pal=$c ..
  # 7 ($060,$07F) Tile=$39 Pal=$c ..
  # 8 ($060,$087) Tile=$3B Pal=$c ..
  # 9 ($068,$057) Tile=$04 Pal=$4 ..
  #10 ($068,$05F) Tile=$06 Pal=$4 ..
  #11 ($068,$06F) Tile=$31 Pal=$c H.
  #12 ($068,$077) Tile=$33 Pal=$c H.
  #13 ($068,$07F) Tile=$3C Pal=$c ..
  #14 ($068,$087) Tile=$3E Pal=$c ..
  #15 ($070,$057) Tile=$05 Pal=$4 ..
  #16 ($070,$05F) Tile=$07 Pal=$4 ..
  #17 ($070,$06F) Tile=$30 Pal=$c H.
  #18 ($070,$077) Tile=$37 Pal=$c ..
  #19 ($070,$07F) Tile=$3D Pal=$c ..
  #20 ($070,$087) Tile=$3F Pal=$c ..
  #21 ($078,$03F) Tile=$08 Pal=$0 ..
  #22 ($078,$047) Tile=$0A Pal=$0 ..
  #23 ($078,$04F) Tile=$20 Pal=$4 ..
  #24 ($078,$057) Tile=$22 Pal=$4 ..
  #25 ($078,$05F) Tile=$28 Pal=$8 ..
  #26 ($078,$067) Tile=$2A Pal=$0 ..
  #27 ($078,$06F) Tile=$10 Pal=$0 ..
  #28 ($078,$077) Tile=$12 Pal=$0 ..
  #29 ($078,$07F) Tile=$1E Pal=$0 ..
  #30 ($080,$03F) Tile=$09 Pal=$0 ..
  #31 ($080,$047) Tile=$01 Pal=$0 ..
  #32 ($080,$04F) Tile=$21 Pal=$4 ..
  #33 ($080,$057) Tile=$23 Pal=$4 ..
  #34 ($080,$05F) Tile=$29 Pal=$8 ..
  #35 ($080,$067) Tile=$2B Pal=$0 ..
  #36 ($080,$06F) Tile=$11 Pal=$0 ..
  #37 ($088,$03F) Tile=$0C Pal=$0 ..
  #38 ($088,$047) Tile=$01 Pal=$0 ..
  #39 ($088,$04F) Tile=$24 Pal=$4 ..
  #40 ($088,$057) Tile=$26 Pal=$8 ..
  #41 ($088,$05F) Tile=$2C Pal=$c ..
  #42 ($088,$067) Tile=$2E Pal=$0 ..
  #43 ($088,$06F) Tile=$03 Pal=$0 ..
  #44 ($088,$077) Tile=$16 Pal=$0 ..
  #45 ($090,$03F) Tile=$0D Pal=$0 ..
  #46 ($090,$047) Tile=$0F Pal=$0 ..
  #47 ($090,$04F) Tile=$25 Pal=$4 ..
  #48 ($090,$057) Tile=$27 Pal=$c ..
  #49 ($090,$05F) Tile=$2D Pal=$c ..
  #50 ($090,$067) Tile=$2F Pal=$0 ..
  #51 ($090,$06F) Tile=$15 Pal=$0 ..
  #52 ($090,$077) Tile=$17 Pal=$0 ..
  #53 ($090,$07F) Tile=$1A Pal=$8 ..
  #54 ($098,$077) Tile=$19 Pal=$8 ..
  #55 ($098,$07F) Tile=$1B Pal=$8 ..
  #56 ($0A0,$07F) Tile=$1E Pal=$0 ..
`;

/** 预解析的 OAM 精灵数组 (PPU Viewer 输出 (X, Y) 格式) */
const OAM_SPRITES: OamSprite[] = parseOamDump(OAM_DUMP_RAW, false);

/** 默认属性表: 所有 tile 使用 palette group 0 */
function defaultAttr(): Uint8Array {
  const attr = new Uint8Array(64);
  for (let i = 0; i < 64; i++) attr[i] = 0;
  return attr;
}

Page({
  data: {
    SCREEN_W: SCREEN_W,   // 256 — 供模板使用
    SCREEN_H: SCREEN_H,   // 240 — 供模板使用
    bankSelect: 30,       // BG CHR bank: 0 (bank 31) or 1 (bank 30)
    pageSelect: 0,        // RLE page: 0-3
    spriteBank: 31,       // 精灵 CHR bank (SP PT=$0000, opening scene chrBank0=0x1F=31)
    showGrid: false,
    showBg: true,
    showSprites: true,
    spriteYOffset: 0,     // 精灵 Y 偏移 (-2,-1,0,+1,+2) — 调试 PPU 1-pixel 延迟
    swapOamYX: false,     // 交换 OAM 解析顺序: true=(Y,X), false=(X,Y) [PPU Viewer 默认]
    globalVFlip: false,   // 全局垂直翻转 (调试方向问题)
    globalHFlip: false,   // 全局水平翻转 (调试方向问题)
    spritePalGroup: 0,    // 精灵调色板预览组 (0-3)
    statusText: '',
    stats: '',
    spriteCount: OAM_SPRITES.length,
  },

  _parsedSprites: OAM_SPRITES,

  onLoad() {
    const tileStore = getGlobalTileStore();
    console.log('[NT-Debug] Page loaded, TileStore ready:', tileStore.ready);
    console.log(`[NT-Debug] Parsed ${OAM_SPRITES.length} OAM sprites (PPU Viewer format: X,Y)`);
    this.setData({ statusText: '加载中...' });
    // 延迟渲染，确保 canvas 节点已就绪
    setTimeout(() => this.renderScreen(), 200);
  },

  onBankSelect(e: any) {
    const v = parseInt(e.currentTarget.dataset.bank, 10);
    this.setData({ bankSelect: v });
    setTimeout(() => this.renderScreen(), 50);
  },

  onPageSelect(e: any) {
    const v = parseInt(e.currentTarget.dataset.page, 10);
    this.setData({ pageSelect: v });
    setTimeout(() => this.renderScreen(), 50);
  },

  onSpriteBankSelect(e: any) {
    const v = parseInt(e.currentTarget.dataset.bank, 10);
    this.setData({ spriteBank: v });
    setTimeout(() => this.renderScreen(), 50);
  },

  onToggleGrid() {
    this.setData({ showGrid: !this.data.showGrid });
    setTimeout(() => this.renderScreen(), 50);
  },

  onToggleBg() {
    this.setData({ showBg: !this.data.showBg });
    setTimeout(() => this.renderScreen(), 50);
  },

  onToggleSprites() {
    this.setData({ showSprites: !this.data.showSprites });
    setTimeout(() => this.renderScreen(), 50);
  },

  onYOffset(e: any) {
    const v = parseInt(e.currentTarget.dataset.y, 10);
    this.setData({ spriteYOffset: v });
    setTimeout(() => this.renderScreen(), 50);
  },

  onGlobalVFlip() {
    this.setData({ globalVFlip: !this.data.globalVFlip });
    setTimeout(() => this.renderScreen(), 50);
  },

  onGlobalHFlip() {
    this.setData({ globalHFlip: !this.data.globalHFlip });
    setTimeout(() => this.renderScreen(), 50);
  },

  onSwapOamYX() {
    // 重新解析 OAM 并重渲染
    const newSprites = parseOamDump(OAM_DUMP_RAW, !this.data.swapOamYX);
    this._parsedSprites = newSprites;
    this.setData({ swapOamYX: !this.data.swapOamYX });
    console.log(`[NT-Debug] OAM YX swap: ${this.data.swapOamYX} (${this._parsedSprites.length} sprites)`);
    setTimeout(() => this.renderScreen(), 50);
  },

  // ============================================================
  // 渲染
  // ============================================================

  renderScreen() {
    const query = wx.createSelectorQuery();
    query.select('#nt-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.error('[NT-Debug] Canvas node not found');
          this.setData({ statusText: 'Canvas 节点未找到' });
          return;
        }

        const canvas = res[0].node;
        canvas.width = SCREEN_W;
        canvas.height = SCREEN_H;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          this.setData({ statusText: '无法获取 2D 上下文' });
          return;
        }

        const startTime = Date.now();
        this.drawScreen(ctx);
        const elapsed = Date.now() - startTime;

    const bankLabel = this.data.bankSelect === 0
      ? 'Bank 31 (0x1F)' : 'Bank 30 (0x1E)';
    const sprLabel = `SprBank=${this.data.spriteBank}`;
    this.setData({
      statusText: `CHR ${bankLabel} | ${sprLabel} | Page ${this.data.pageSelect} | ${this.data.swapOamYX ? 'YX-swap' : 'XY'}`,
      stats: `渲染: ${elapsed}ms | ${NT_COLS}×${NT_ROWS} tiles | ${this._parsedSprites.length} sprites`,
    });
      });
  },

  /**
   * 渲染背景 nametable + 精灵 (使用 ImageData 一次写入)
   */
  drawScreen(ctx: any) {
    const tileStore = getGlobalTileStore();
    const bgChrBank = this.data.bankSelect;    // BG: 0=bank31, 1=bank30
    const sprChrBank = this.data.spriteBank;    // SP: PT0 CHR bank
    const pageIdx = this.data.pageSelect;

    if (pageIdx >= OPENING_PAGES.length) {
      this.setData({ statusText: '数据页超出范围' });
      return;
    }

    const pageData = OPENING_PAGES[pageIdx];
    const tiles = pageData.tiles;

    // 构建 ImageData
    // ⚠️ 直接使用 imgData.data (Uint8ClampedArray)，
    // 避免 new Uint8Array(buffer) 在 wx 环境下可能的 byteOffset 问题
    const imgData = ctx.createImageData(SCREEN_W, SCREEN_H);
    const data = imgData.data;

    const NT_OFFSET = 0xA8; // ROM 写入起始偏移

    // ============================================================
    // 1. 预计算 BG 调色板 RGBA
    // ============================================================
    const bgPalRGBA = new Uint8Array(16 * 4);
    for (let pg = 0; pg < 4; pg++) {
      const base = pg * 4;
      for (let ci = 0; ci < 4; ci++) {
        const nesIdx = BG_PALETTE[base + ci] & 0x3F;
        const [r, g, b, a] = nesColorToRgba(nesIdx);
        const off = (pg * 4 + ci) * 4;
        bgPalRGBA[off + 0] = r;
        bgPalRGBA[off + 1] = g;
        bgPalRGBA[off + 2] = b;
        bgPalRGBA[off + 3] = a;
      }
    }

    // ============================================================
    // 2. 预计算 SPR 调色板 RGBA
    // ============================================================
    const sprPalRGBA = new Uint8Array(16 * 4);
    for (let pg = 0; pg < 4; pg++) {
      const base = pg * 4;
      for (let ci = 0; ci < 4; ci++) {
        const nesIdx = SPR_PALETTE[base + ci] & 0x3F;
        const [r, g, b, a] = nesColorToRgba(nesIdx);
        const off = (pg * 4 + ci) * 4;
        sprPalRGBA[off + 0] = r;
        sprPalRGBA[off + 1] = g;
        sprPalRGBA[off + 2] = b;
        sprPalRGBA[off + 3] = a;
      }
    }

    let bgTiles = 0;
    let sprPixels = 0;

    // ============================================================
    // 3. 渲染背景 (先画，精灵覆盖在上面)
    // ============================================================
    if (this.data.showBg) {
      const attrs = defaultAttr();
      for (let row = 0; row < NT_ROWS; row++) {
        for (let col = 0; col < NT_COLS; col++) {
          const ntIdx = row * NT_COLS + col;
          const tileSrcIdx = (ntIdx - NT_OFFSET + NT_TOTAL) % NT_TOTAL;
          const tileNum = tileSrcIdx < tiles.length ? tiles[tileSrcIdx] : 0;

          if (tileNum === 0) continue;
          bgTiles++;

          // 属性表 → palette group
          const attrX = Math.floor(col / 4);
          const attrY = Math.floor(row / 4);
          const attrByte = attrs[attrY * 8 + attrX];
          const attrShift = ((col % 4) < 2 ? 0 : 2) + ((row % 4) < 2 ? 0 : 4);
          const palGroup = (attrByte >> attrShift) & 0x03;
          const palBase = palGroup * 16;

          for (let py = 0; py < TILE_PX; py++) {
            const tileRow = tileStore.getTileRow(bgChrBank, tileNum, py);
            const dstY = row * TILE_PX + py;
            const rowBase = dstY * SCREEN_W * 4;

            for (let px = 0; px < TILE_PX; px++) {
              const colorIdx = tileRow[px] & 3;
              const srcOff = palBase + colorIdx * 4;
              const dstOff = rowBase + (col * TILE_PX + px) * 4;

              data[dstOff + 0] = bgPalRGBA[srcOff + 0];
              data[dstOff + 1] = bgPalRGBA[srcOff + 1];
              data[dstOff + 2] = bgPalRGBA[srcOff + 2];
              data[dstOff + 3] = bgPalRGBA[srcOff + 3];
            }
          }
        }
      }
    }

    // ============================================================
    // 4. 渲染精灵 (在背景上叠加)
    // ============================================================
    if (this.data.showSprites) {
      for (const spr of this._parsedSprites) {
        this.drawSpriteToBuffer(
          data, sprPalRGBA, tileStore,
          sprChrBank, spr,
        );
        sprPixels++;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // ============================================================
    // 5. 网格叠加
    // ============================================================
    if (this.data.showGrid) {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 0.5;
      for (let r = 0; r <= NT_ROWS; r++) {
        const y = r * TILE_PX;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(SCREEN_W, y);
        ctx.stroke();
      }
      for (let c = 0; c <= NT_COLS; c++) {
        const x = c * TILE_PX;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, SCREEN_H);
        ctx.stroke();
      }
      // 高亮 $20A8 偏移线 (行5)
      ctx.strokeStyle = 'rgba(255,255,0,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 5 * TILE_PX);
      ctx.lineTo(SCREEN_W, 5 * TILE_PX);
      ctx.stroke();
    }

    console.log(
      `[NT-Debug] BG: ${bgTiles} tiles, SP: ${this._parsedSprites.length} sprites ` +
      `(bgBank=${bgChrBank}, sprBank=${sprChrBank}, page=${pageIdx}, yxSwap=${this.data.swapOamYX})`
    );
  },

  /**
   * 将一个 8×8 精灵渲染到 ImageData 缓冲区
   *
   * NES 精灵约定:
   *   - 颜色索引 0 = 透明 (不绘制)
   *   - 精灵位置 Y = OAM_Y (屏幕坐标, 已含 +1 偏移)
   *   - 精灵在屏幕外的部分不绘制
   */
  drawSpriteToBuffer(
    data: Uint8Array,
    sprPalRGBA: Uint8Array,
    tileStore: any,
    sprChrBank: number,
    spr: OamSprite,
  ): void {
    const palBase = spr.pal * 16; // 4 colors × 4 bytes

    // 应用全局调试开关
    const yOff = this.data.spriteYOffset || 0;
    const finalVFlip = (spr.vflip !== this.data.globalVFlip);
    const finalHFlip = (spr.hflip !== this.data.globalHFlip);

    // 全局水平翻转时调整 X 坐标: dstX = (255 - X) - 7 + px
    // 这样 sprite 在翻转后会出现在 (255 - 原右边) 位置
    const baseX = this.data.globalHFlip
      ? (SCREEN_W - 1 - spr.x - (TILE_PX - 1))
      : spr.x;

    for (let py = 0; py < TILE_PX; py++) {
      const srcRowIdx = finalVFlip ? (TILE_PX - 1 - py) : py;
      const tileRow = tileStore.getTileRow(sprChrBank, spr.tile, srcRowIdx);
      const dstY = spr.y + py + yOff;
      if (dstY < 0 || dstY >= SCREEN_H) continue;
      const rowBase = dstY * SCREEN_W * 4;

      for (let px = 0; px < TILE_PX; px++) {
        const srcColIdx = finalHFlip ? (TILE_PX - 1 - px) : px;
        const colorIdx = tileRow[srcColIdx] & 3;
        if (colorIdx === 0) continue; // 透明像素

        const dstX = baseX + px;
        if (dstX < 0 || dstX >= SCREEN_W) continue;

        const srcOff = palBase + colorIdx * 4;
        const dstOff = rowBase + dstX * 4;

        data[dstOff + 0] = sprPalRGBA[srcOff + 0];
        data[dstOff + 1] = sprPalRGBA[srcOff + 1];
        data[dstOff + 2] = sprPalRGBA[srcOff + 2];
        data[dstOff + 3] = sprPalRGBA[srcOff + 3];
      }
    }
  },
});
